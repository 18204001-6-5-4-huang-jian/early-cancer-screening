<template>
    <div>
        <div class="reportBox">
            <cancer-widget>
                <div style="margin-bottom: 20px;" v-if="$route.query.flag==0">
                    <el-button size="mini" @click="$router.go(-1)">返 回</el-button>
                    <el-button size="small" class="print" @click="printFromContent('print')">打印</el-button>
                </div>
                <div id="print">
                    <h1 style="text-align: center;">乳腺X线摄影报告</h1>
                    <el-form :model="personDetail" ref="personDetail" :inline="true" class="demo-personDetail">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="SID/问卷ID：" prop="name">
                                    {{personDetail.surverId}}
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="姓名：">
                                    {{personDetail.name}}
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="性别：">
                                    {{personDetail.sex | sexFilter}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="年龄：">
                                    {{personDetail.age}}
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="检查日期：">
                                    <span v-if="$route.query.flag==0">{{checkDate | dateFilter}}</span>
                                    <template v-else>
                                        <el-date-picker
                                                type="date"
                                                placeholder="选择日期"
                                                format="yyyy 年 MM 月 dd 日"
                                                value-format="timestamp"
                                                :clearable="false"
                                                size="mini"
                                                v-model="checkDate">
                                        </el-date-picker>
                                    </template>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="报告日期：" >
                                    <span v-if="$route.query.flag==0">{{reportDate | dateFilter}}</span>
                                    <template v-else>
                                        <el-date-picker
                                                type="date"
                                                placeholder="选择日期"
                                                format="yyyy 年 MM 月 dd 日"
                                                value-format="timestamp"
                                                :clearable="false"
                                                size="mini"
                                                v-model="reportDate">
                                        </el-date-picker>
                                    </template>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="9">
                                <el-form-item label="身份证号：">
                                    {{personDetail.idCard}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-form :model="form" :rules="formRules" ref="form" class="demo-form">
                        <p class="subtit" style="margin-top:10px;">{{form.reportNum}}</p>
                        <h2>检查所见 </h2>
                        <div class="block">
                            <el-row>
                                <el-form-item label="" prop="checkText" class="blockTit">
                                    <el-input :disabled="$route.query.flag==0" v-model="form.checkText"
                                              type="textarea" :autosize="{minRows:4}"></el-input>
                                </el-form-item>
                            </el-row>
                        </div>
                        <h2>影像评估结果 </h2>
                        <div class="block">
                            <el-row>
                                <el-form-item label="" prop="imagingEvaluateResult" class="blockTit">
                                    <el-input :disabled="$route.query.flag==0" v-model="form.imagingEvaluateResult"
                                              type="textarea" :autosize="{minRows:4}"></el-input>
                                </el-form-item>
                            </el-row>
                        </div>
                        <h2>检查结论(仅供参考)</h2>
                        <div class="block">
                            <el-row>
                                <el-form-item label="" prop="checkConclusion" class="blockTit">
                                    <el-input :disabled="$route.query.flag==0" v-model="form.checkConclusion"
                                              type="textarea" :autosize="{minRows:4}"></el-input>
                                </el-form-item>
                            </el-row>
                        </div>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="报告医师" labelWidth="80px" prop="reportDoctor" class="inline"
                                              style="display:inline-block;float:left;width:30%;">
                                    <el-input :disabled="$route.query.flag==0" v-model.trim="form.reportDoctor"
                                              size="mini" style="width: 200px;"></el-input>
                                </el-form-item>
                            </el-col>
                            <!-- </el-row> -->
                            <!-- <el-row> -->
                            <el-col :span="12">
                                <el-form-item label="审核医师" labelWidth="80px" prop="checkDoctor" class="inline"
                                              style="display:inline-block;float:left;width:30%;">
                                    <el-input :disabled="$route.query.flag==0" v-model.trim="form.checkDoctor"
                                              size="mini" style="width: 200px;"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <el-button type="primary" @click="submitForm" size="small" v-if="$route.query.flag!=0" v-dbClick>提交</el-button>
            </cancer-widget>
        </div>
    </div>
</template>

<script>
    import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
    import mixin from '@/mixins/mixins'

    export default {
        mixins: [mixin, getPersonDetail],
        data() {
            return {
                personDetail: {},
                checkDate: new Date(),
                reportDate: new Date(),
                form: {
                    reportNum: null,
                    checkText: null,
                    imagingEvaluateResult: null,
                    checkConclusion: null,
                    checkDoctor: null,
                    bloodExamination: null
                },
                formRules: {
                    checkText: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],
                    imagingEvaluateResult: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],
                    checkConclusion: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],
                    reportDoctor: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],
                    checkDoctor: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],
                }
            };
        },
        mounted() {
            this.getPersonDetailFun(this.$route.query.personId, this.$route.query.surverId);
            this.queryReport();
        },
        methods: {
            // 查询报告
            queryReport() {
                this.$axios_http({
                    url: '/base/rxxx/get/rxxxReportById',
                    data: {id: this.$route.query.reportId},
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        let obj = res.data.result
                        this.form = obj;
                        this.reportDate = obj.reportDate
                        this.checkDate = obj.checkDate
                    }
                })
            },
            //提交表单
            submitForm() {
                this.$refs.form.validate((valid, obj) => {
                    if (valid) {
                        this.$axios_http({
                            url: '/base/rxxx/update/rxxxReport',
                            data: {
                                inputStatus: 1,
                                id: Number(this.$route.query.reportId),
                                surverId: this.$route.query.surverId,
                                screeningId: this.$route.query.screeningId,
                                personId: Number(this.$route.query.personId),
                                checkInfoId: Number(this.$route.query.id),
                                checkDate: new Date(this.checkDate).getTime(),
                                reportDate: new Date(this.reportDate).getTime(),
                                checkText: this.form.checkText,
                                imagingEvaluateResult: this.form.imagingEvaluateResult,
                                checkConclusion: this.form.checkConclusion,
                                reportDoctor: this.form.reportDoctor,
                                checkDoctor: this.form.checkDoctor
                            },
                            vueObj: this
                        }).then((res) => {
                            if (res.data.status == "SUCCESS") {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功!'
                                });
                                this.$router.go(-1);
                            }
                        })
                    }
                })
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .reportBox {
        width: 100%;
        .print {
            float: right;
        }
        h1 {
            font-size: 18px;
            color: #333;
            line-height: 1;
            padding-bottom: 15px;
            text-align: center;
            // border-bottom:1px solid #f6f6f6;
        }

        .title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .red {
            color: red;
        }
    }

    .el-row {
        padding: 10px 0 10px 20px;
        // border-bottom:1px dashed #f6f6f6;
    }

    .el-form-item {
        margin-bottom: 0;
    }

    .el-form-item__label {
        color: #666;
        // font-weight: bold;
        font-size: 16px;
    }

    .el-form-item .el-input, .el-form-item .el-date-editor.el-input, .el-form-item .el-date-editor.el-input__inner {
        width: 190px;
    }

    .other .el-form-item {
        float: left;
        min-width: 290px;
    }

    h2 {
        background: #F7FAFC;
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        line-height: 48px;
        padding-left: 20px;
        // border-top: 1px solid #f6f6f6;
        // border-bottom: 1px solid #f6f6f6;
        margin-top: -1px;
        margin-bottom: 10px;
    }

    .subtit {
        padding-left: 20px;
        margin-bottom: 10px;
        color: #000;
    }

    .block {
        margin-bottom: 30px;
    }
</style>
<style>
    .el-form-item__error {
        position: relative !important;
    }
</style>
