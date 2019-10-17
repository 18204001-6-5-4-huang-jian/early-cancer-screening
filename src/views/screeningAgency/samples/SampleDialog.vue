<!--
 * @date 2019/3/21
 * @Description: 注意事项   早诊和肺肠的样本id位数不一样
-->

<template>
    <el-dialog
            :visible.sync="sampleDialogVisible"
            width="70%"
            :before-close="closeDialog">
          <span slot="title" class="dialog-footer">
             <p>姓名：{{listName}} <span style="margin-left: 50px;">所属项目：{{project}}</span></p>
         </span>
        <el-row>
            <el-col :span="12">
                <el-form
                        :model="formData"
                        :rules="formRules"
                        ref="form"
                        label-width="150px">
                    <el-form-item label="样本ID:" prop="sampleId">
                        <!--<el-input v-model.trim="formData.sampleId" size="small" clearable style="width: 200px;"-->
                        <!--maxlength="13" @blur="checkSampleId"></el-input>-->
                        <el-input v-model.trim="formData.sampleId" size="small" clearable
                                  style="width: 200px;"></el-input>
                    </el-form-item>
                    <el-form-item label="冷冻盒编号:" prop="boxCode">
                        <el-input v-model.trim="formData.boxCode" size="small" clearable style="width: 200px;"
                                  @change="getBoxCode"></el-input>
                    </el-form-item>
                    <el-form-item label="采样日期:" prop="collectStatusDate">
                        <cancer-date-picker :data="formData.collectStatusDate"
                                            @getDate="val => formData.collectStatusDate = val" style="width: 200px;"
                                            ref="timePicker"></cancer-date-picker>
                    </el-form-item>
                    <el-form-item label="样本类型:">
                        <span>{{formData.sampleType | sampleTypeFilter}}</span>
                    </el-form-item>
                    <el-form-item label="备注(选填):">
                        <el-input v-model="formData.remark" size="small" clearable style="width: 200px;"
                                  type="textarea"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <frozen-box ref="entryFrozen" :useReason="1"></frozen-box>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="cancer-margin--t15">
            <el-button size="small" @click="submitDialog" type="primary">提交</el-button>
            <el-button size="small" @click="closeDialog">关闭</el-button>
        </el-row>
    </el-dialog>
</template>
<script>
    import mixin from '@/mixins/mixins'
    import service from '@/views/screeningAgency/samples/sample-dialog-service'
    import FrozenBox from '@/views/common/frozenBox'

    export default {
        name: 'sample-dialog',
        props: {
            sampleDialogVisible: {
                type: Boolean
            },
            listName: {
                type: String
            },
            itemsUnderIt: {
                type: Number
            }
        },
        mixins: [mixin, service],
        data() {
            var validateID = (rule, value, callback) => {
                // console.log(rule, value, this.rowObj.itemsUnderIt)
                if (value === '') {
                    callback(new Error('请输入样本ID'));
                } else {
                    if (this.rowObj.itemsUnderIt === 1 || this.itemsUnderIt === 1) {
                        if (value.length !== 13) {
                            callback(new Error('肺肠生物样本ID长度为13位'));
                        } else {
                            this.validID().then(res => {
                                if (res) {
                                    callback();
                                } else {
                                    this.boxType = -1
                                    callback(new Error('肺肠生物样本id校验失败!!'));
                                }
                            })
                        }
                    } else if (this.rowObj.itemsUnderIt === 2 || this.itemsUnderIt === 2) {
                        if (value.length !== 12) {
                            callback(new Error('早诊样本ID长度为12位'));
                        } else {
                            this.validID().then(res => {
                                if (res) {
                                    callback();
                                } else {
                                    this.boxType = -1
                                    callback(new Error('早诊生物样本id校验失败!!'));
                                }
                            })
                        }
                    } else {
                        callback(new Error('获取所属项目失败，请刷新重试'));
                    }
                }
            };
            var validateBoxCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入冷冻盒编号'));
                } else {
                    if (this.boxType == 0 || this.boxType == 1 || this.boxType == 2) {
                        callback()
                    } else {
                        callback(new Error('请正确输入样本ID再输入冷冻盒编号'));
                    }
                }
            };
            return {
                mainSampleId: null,
                formData: {
                    sampleId: null,
                    boxCode: null,
                    collectStatusDate: null,
                    sampleType: null,
                    remark: null
                },
                surverId: null,
                personId: null,
                arr: Object.keys(Array.apply(null, {length: 100})),
                columnId: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K',],
                locations: null,
                boxFlag: null,
                rowObj: {},
                formRules: {
                    sampleId: [{required: true, message: '必填', trigger: 'change'},
                        {validator: validateID, trigger: 'blur'}
                    ],
                    boxCode: [{required: true, message: '必填', trigger: 'change'},
                        {validator: validateBoxCode, trigger: 'blur'},
                        {validator: validateBoxCode, trigger: 'change'}
                    ],
                    collectStatusDate: [{required: true, message: '必填', trigger: 'blur'}],
                },
                boxType: -1,
                submitType: -1
            }
        },
        computed: {
            project() {
                if (this.rowObj.itemsUnderIt === 1 || this.itemsUnderIt === 1) {
                    return '肺肠项目'
                } else if (this.rowObj.itemsUnderIt === 2 || this.itemsUnderIt === 2) {
                    return '早诊早治'
                } else {
                    return '-'
                }
            }
        },
        components: {
            FrozenBox
        },
        methods: {
            // 取消
            closeDialog() {
                this.clearForm();
                this.$refs['form'] && this.$refs['form'].clearValidate()
                this.$emit('closeDialog', false);
                this.rowObj = {}
            },

            async clearForm() {
                Object.keys(this.formData).map(key => {
                    this.formData[key] = null
                })
                await this.$nextTick()
                this.$refs['timePicker'].cancel()
            },

            // 校验样本ID
            checkSampleId() {
                this.formData.sampleId && this.checkSampleType(this.formData.sampleId)
            },
            // 获取样本类型
            checkSampleType(value) {
                if(JSON.stringify(this.rowObj)!='{}'){
                    this.getSampleIdData(this.rowObj.itemsUnderIt, this.rowObj.mainSampleId, this.formData.sampleId)
                } else {
                    this.getSampleIdData(this.itemsUnderIt, this.formData.sampleId.substring(0,11), this.formData.sampleId)
                }
                
            },
            validID() {
                if(JSON.stringify(this.rowObj)!='{}'){
                    //来源于列表上每行的录入
                   return this.getSampleIdData(this.rowObj.itemsUnderIt, this.rowObj.mainSampleId, this.formData.sampleId)
                } else {
                   // 来源于表格上的总录入
                   return this.getSampleIdData(this.itemsUnderIt, this.formData.sampleId.substring(0,11), this.formData.sampleId)
                }
            },
            // 获取冷冻盒编号
            getBoxCode() {
                this.$refs.form.validateField('sampleId', (val) => {
                    if (!val) {
                        let type = this.boxType + 1
                        if (this.formData.boxCode && type) {
                            this.getBoxCodeData(this.formData.boxCode, type)
                        }
                    }
                });
            },
            async other() {
                let entryFrozenObj = await this.$refs['entryFrozen']
                if (entryFrozenObj) {
                    if (this.rowObj.itemsUnderIt === 2 || this.itemsUnderIt === 2) {
                        entryFrozenObj.init(true, 0, [], true)
                    } else {
                        entryFrozenObj.init(false)
                    }
                } else {
                    this.other()
                }
            },
            // 查看详情
            async sampleWriteData(row, fun) {
                this.rowObj = Object.assign({}, row)
                await this.$nextTick(function () {
                    this.formData.sampleId = row.mainSampleId
                    this.other()
                    fun()
                })
            },

            // table上方的总录入
            async writeData(val, surverId, personId, fun) {
                await this.$nextTick(function () {
                    this.mainSampleId = val
                    this.formData.sampleId = val
                    this.surverId = surverId
                    this.personId = personId
                    this.other()
                    fun()
                })
            },

            // 提交
            submitDialog() {
                let validd = true;
                this.submitType = 1
                this.$refs.form.validate((valid, obj) => {
                    if (!valid) {
                        validd = false
                        this.submitType = -1
                    }
                    if (validd) {
                        this.submitData()
                        this.rowObj = {}
                    }
                })
            }
        }
    }
</script>
<style scoped lang="scss">
    .title-style {
        font-size: 16px;
        color: #333;
    }

    .wrap-bottom {
        border-bottom: 1px solid #ddd;
    }

</style>

