<!--
 * @author <hurr@1yongcloud.com>
 * @date 2019/3/1
 * @Description: *itemsUnderIt 判断所属项目 1.肺肠项目，2.早诊   肺肠  *resultEnterStatus 录入状态：1 已录入，2未录入 *评估状态
     注：1.判断为肺肠的项目，2，判断是否未录入，如为，先判断fit码，再判断录入结果 3，已录入，按钮显示查看
        1.判断为早诊的项目，2，先判断是否评估，未评估，未录入，显示录入结果，未评估，已录入显示修改，3.已评估显示未查看
-->

<template>
    <div>
        <table-com :propsData="tableProps" :tableData="tableData">
            <template slot="operating">
                <el-table-column label="操作" fixed="right" width="120">
                    <template slot-scope="scope">
                        <template v-if="scope.row.itemsUnderIt ==1">
                            <el-button type="text" size="small"
                                       v-if="scope.row.resultEnterStatus ==2 && scope.row.codeEntryStatus==2"
                                       @click="buttonClick(scope.row,1)">录入编码
                            </el-button>
                            <el-button type="text" size="small"
                                       v-if="scope.row.resultEnterStatus ==2 && scope.row.codeEntryStatus==1"
                                       @click="buttonClick(scope.row,2)">录入结果
                            </el-button>
                            <el-button type="text" size="small" v-if="scope.row.resultEnterStatus ==1"
                                       @click="buttonClick(scope.row,3)">查看
                            </el-button>
                        </template>
                        <template v-else>
                            <el-button type="text" size="small" v-if="scope.row.resultEnterStatus ==2"
                                       @click="buttonClick(scope.row,4)">录入结果
                            </el-button>
                            <el-button type="text" size="small"
                                       v-if="scope.row.resultEnterStatus ==1 && (scope.row.evaluateStatus ==2 || scope.row.evaluateStatus ==1)"
                                       @click="buttonClick(scope.row,5)">修改
                            </el-button>
                            <el-button type="text" size="small" v-if="scope.row.evaluateStatus ==4"
                                       @click="buttonClick(scope.row,6)">查看
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </template>
        </table-com>
        <el-dialog
                :title="`FIT${showForm.name}`"
                :visible.sync="dialogFitVisible"
                width="570px"
                :before-close="handleClose">
            <el-form :model="fitTableForm" :rules="rules" ref="fitTableForm" label-width="100px"
                     class="demo-fitTableForm">
                <el-form-item label="所属项目：" prop="name">
                    <span>{{fitTableForm.itemsUnderIt | itemsUnderItFilter}}</span>
                </el-form-item>
                <el-form-item label="结果日期：" prop="resultDate" v-if="showForm.resultDate">
                    <el-date-picker v-model="fitTableForm.resultDate" value-format="yyyy-MM-dd" type="date"
                                    placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="FIT编码：" prop="fitCode" v-if="showForm.fitCode">
                    <el-input v-model="fitTableForm.fitCode" style="max-width: 220px;"></el-input>
                </el-form-item>
                <el-form-item label="发放日期：" prop="sendCodeDate" v-if="showForm.sendCodeDate">
                    <el-date-picker v-model="fitTableForm.sendCodeDate" value-format="yyyy-MM-dd" type="date"
                                    placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="FIT编码：" prop="fitCodeLook" v-if="showForm.fitCodeLook">
                    <span>{{fitTableForm.fitCode}}</span>
                </el-form-item>
                <el-form-item label="FIT类型：" prop="fitType" v-if="showForm.fitType">
                    <el-radio-group v-model="fitTableForm.fitType" @change="fitTableForm.fitCheckNum=''">
                        <template v-for="item in showForm.optionType">
                            <el-radio :label="item.label">{{item.name}}</el-radio>
                        </template>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="FIT结果：" prop="result" v-if="showForm.result">
                    <el-radio-group v-model="fitTableForm.result">
                        <template v-for="item in showForm.option">
                            <el-radio :label="item.label">{{item.name}}</el-radio>
                        </template>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="FIT检测具体结果为（ughb/ml）：" prop="fitCheckNum" v-if="showForm.fitCheckNum && fitTableForm.fitType==1" label-width="250px">
                    <el-input
                     v-model="fitTableForm.fitCheckNum" 
                     style="max-width: 220px;" 
                     v-numberInt:2="fitTableForm.fitCheckNum"
                     :disabled="showForm.type==6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
           <el-button @click="cancel" v-if="!(showForm.type ==3 || showForm.type ==6)" size="small">取 消</el-button>
          <el-button type="primary" v-if="!(showForm.type ==3 || showForm.type ==6)" @click="submitResult" size="small">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    import {jcxm} from '@/filters/index'
    import {sexFilter, resultStatusFilter, resultFilter} from "@/filters/filter"
    import {tableProps} from '../recruitmentPoint/fit/fitConfig'

      const floatValidate = (rule, value, callback) => {
          if (value && !(/^([1-9]\d{0,3}|0)(\.\d{2}){0,1}$/.test(value))) {
              callback(new Error('请输入0.01-9999之间的数字'))
          }else if(Number(value)>9999 || Number(value)<0.01){
              callback(new Error('请输入0.01-9999之间的数字'))
          }else {
              callback();
          }
      };

    export default {
        name: 'fitTable',
        props: ["tableData"],
        data() {
            return {
                dialogFitVisible: false,
                fitResult: null,
                id: null,
                resultStatus: null,
                tableProps: tableProps,
                value1: '',
                fitTableForm: {
                    result: ''
                },
                showForm: {
                    name: '录入',
                    resultDate: false,
                    fitCode: false,
                    sendCodeDate: false,
                    fitCodeLook: false,
                    result: false,
                    fitType: false,
                    fitCheckNum: false,
                    option: [],
                    optionType: [],
                },
                rules: {
                    fitCode: [
                        {required: true, message: 'FIT编码不能为空', trigger: 'blur'},
                        {required: true, message: 'FIT编码不能为空', trigger: 'change'},
                    ],
                    resultDate: [
                        {required: true, message: '请选择结果日期', trigger: 'change'}
                    ],
                    sendCodeDate: [
                        {required: true, message: '请选择发放日期', trigger: 'change'}
                    ],
                    result: [
                        {required: true, message: '请选择FIT结果', trigger: 'change'}
                    ],
                    fitType: [
                        {required: true, message: '请选择FIT类型', trigger: 'change'}
                    ],
                    fitCheckNum: [
                        {required: true, message: 'FIT检测具体结果不能为空', trigger: 'blur'},
                        {required: true, message: 'FIT检测具体结果不能为空', trigger: 'change'},
                        { trigger: 'blur', validator: floatValidate},
                        { trigger: 'change', validator: floatValidate},
                    ],
                }
            }
        },
        methods: {
            buttonClick(obj, type) {
                this.fitTableForm = {
                    result: '',
                    fitType: '',
                    fitCheckNum: '',
                }
                this.fitTableForm.itemsUnderIt = obj.itemsUnderIt
                this.fitTableForm.id = obj.id
                this.fitTableForm.personId = obj.personId
                this.fitTableForm.surverId = obj.surverId
                if (type === 1) {
                    this.showForm = {
                        type: 1,
                        name: '编码录入',
                        resultDate: false,
                        fitCode: true,
                        sendCodeDate: true,
                        fitCodeLook: false,
                        fitType: false,
                        result: false,
                        fitCheckNum: false,
                    }
                } else if (type === 2) {
                    this.showForm = {
                        type: 2,
                        name: '结果录入',
                        resultDate: false,
                        fitCode: false,
                        sendCodeDate: true,
                        fitCodeLook: false,
                        fitType: false,
                        result: true,
                        fitCheckNum: false,
                        option: [{
                            label: '1',
                            name: '阴性'
                        }, {
                            label: '2',
                            name: '阳性'
                        }, {
                            label: '3',
                            name: '无效'
                        }]
                    }
                } else if (type === 3) {
                    this.fitTableForm.fitCode = obj.fitCode
                    this.fitTableForm.result = String(obj.result)
                    this.showForm = {
                        type: 3,
                        name: '结果',
                        resultDate: false,
                        fitCode: false,
                        sendCodeDate: false,
                        fitCodeLook: true,
                        fitType: false,
                        result: true,
                        fitCheckNum: false,
                        option: this.getOption(obj.result)
                    }
                } else if (type === 4) {
                    this.showForm = {
                        type: 4,
                        name: '结果录入',
                        resultDate: false,
                        fitCode: false,
                        sendCodeDate: false,
                        fitCodeLook: false,
                        fitType: true,
                        result: true,
                        fitCheckNum: true,
                        option: [{
                            label: '1',
                            name: '阴性'
                        }, {
                            label: '2',
                            name: '阳性'
                        }],
                        optionType: [{
                            label: '1',
                            name: '定量化检测'
                        }, {
                            label: '2',
                            name: '定性化检测'
                        }]
                    }
                } else if (type === 5) {
                    this.showForm = {
                        type: 5,
                        name: '结果修改',
                        resultDate: false,
                        fitCode: false,
                        sendCodeDate: false,
                        fitCodeLook: false,
                        fitType: true,
                        result: true,
                        fitCheckNum: true,
                        option: [{
                            label: '1',
                            name: '阴性'
                        }, {
                            label: '2',
                            name: '阳性'
                        }],
                        optionType: [{
                            label: '1',
                            name: '定量化检测'
                        }, {
                            label: '2',
                            name: '定性化检测'
                        }]
                    }
                    this.fitTableForm.result = String(obj.result)
                    this.fitTableForm.fitType = String(obj.fitType)
                    this.fitTableForm.fitCheckNum = obj.fitCheckNum

                } else if (type === 6) {
                    this.fitTableForm.result = String(obj.result)
                    this.fitTableForm.fitType = String(obj.fitType)
                    this.fitTableForm.fitCheckNum = obj.fitCheckNum
                    this.showForm = {
                        type: 6,
                        name: '结果',
                        resultDate: false,
                        fitCode: false,
                        sendCodeDate: false,
                        fitCodeLook: false,
                        fitType: true,
                        result: true,
                        fitCheckNum: true,
                        option: this.getOption(obj.result),
                        optionType: this.getOptionType(obj.fitType)
                    }
                }
                this.dialogFitVisible = true
            },
            getOption(number) {
                let data = [{
                    label: '1',
                    name: '阴性'
                }, {
                    label: '2',
                    name: '阳性'
                }, {
                    label: '3',
                    name: '无效'
                }]
                let filterData = data.filter(obj => {
                    return obj.label == number
                });
                return filterData
            },
            getOptionType(number) {
                let data = [{
                    label: '1',
                    name: '定量化检测'
                }, {
                    label: '2',
                    name: '定性化检测'
                }]
                let filterData = data.filter(obj => {
                    return obj.label == number
                });
                return filterData
            },
            submitResult() {
                this.$refs['fitTableForm'].validate((valid) => {
                    if (valid) {
                        if (this.showForm.type === 2) {
                            this.fitTableForm.resultEnterStatus = 1
                            this.fcResult('肺肠筛查项目，FIT结果录入后无法修改；\n' +
                                '请确认FIT编码及结果输入是否正确?', this.submit)
                        } else if (this.showForm.type === 1) {
                            this.fitTableForm.codeEntryStatus = 1
                            this.fcResult(`当前录入编码为“${this.fitTableForm.fitCode}”，确认后无法修改;
                                请确认录入是否正确?`, this.submit)
                        } else if (this.showForm.type === 4 || this.showForm.type === 5) {
                            this.fitTableForm.resultEnterStatus = 1
                            this.submit()
                        } else {
                            this.dialogFitVisible = false;
                            return false
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submit() {
                this.$axios_http({
                    url: "/base/fit/result/code/entry",
                    data: this.fitTableForm,
                    vueObj: this
                }).then((res) => {
                    let mes = this.showForm.name + '成功'
                    if (res.data.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: mes
                        });
                        this.dialogFitVisible = false;
                        this.$emit('refreshList');
                        this.$refs['fitTableForm'].resetFields();
                    }
                })
            },
            fcResult(text, callback) {
                this.$confirm(text, '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    callback()
                }).catch(() => {

                });
            },
            cancel() {
                this.dialogFitVisible = false;
                this.fitResult = null;
                this.$refs['fitTableForm'].resetFields();
            },
            handleClose(done) {
                done();
                this.$refs['fitTableForm'].resetFields();
                this.fitTableForm = {
                    result: ''
                }
            }
        }
    }
</script>
