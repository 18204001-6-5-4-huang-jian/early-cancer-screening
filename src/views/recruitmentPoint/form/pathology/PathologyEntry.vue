<template>
    <div>
        <div class="reportBox">
            <cancer-widget>
                <h1>结直肠癌筛查病理诊断表</h1>
                <el-form :model="personDetail" :rules="rules" ref="personDetail" :inline="true"
                         class="demo-personDetail">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="SID/问卷ID：" prop="name">
                                {{personDetail.surverId}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="筛查ID：" prop="sex" v-if="personDetail.itemsUnderIt == 2">
                                {{$route.query.screeningId}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="检查日期：">
                                <el-date-picker
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="timestamp"
                                        :clearable="false"
                                        size="mini"
                                        v-model="checkDate">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="评估日期：">
                                {{personDetail.evaluateDate | dateFilter}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓　　　名：">
                                {{personDetail.name}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="性　别：">
                                {{personDetail.sex | sexFilter}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="年　　龄：">
                                {{personDetail.age}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="身份证号：">
                                {{personDetail.idCard}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <el-form :model="form" :rules="formRules" ref="form" class="demo-form" :inline="true">
                    <el-row>
                        <div class="add-tuber1" v-if="form.pathologyDiagnosisRecordPOList.length == 0">
                            <el-button @click="pushLesions()"  type="text">添加病变部位</el-button>
                        </div>
                    </el-row>
                    <div v-for="x,index in form.pathologyDiagnosisRecordPOList">
                    <h2>病理诊断记录表</h2>
                    <div class="add-tuber">
                        <el-button @click="pushLesions()"  type="text">添加病变部位</el-button>
                        <el-button @click="deleteLesions(index)"  type="text">删除病变部位</el-button>
                    </div>
                    <div>
                        <el-row>
                            <el-form-item label="1. 病理标本号：" :prop="'pathologyDiagnosisRecordPOList.'+index+'.item1'" :rules="lesionsRecordListRules.item1"  >
                                <el-input v-model="x.item1"  size="small"  :ref="'ref'+index"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="2. 活检部位：" :prop="'pathologyDiagnosisRecordPOList.'+index+'.item2'" :rules="lesionsRecordListRules.item2">
                                <el-select v-model="x.item2" placeholder="请选择" size="small">
                                    <el-option
                                            v-for="item in partmentoptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="3. 活检位置距肛门距离（厘米）:" :prop="'pathologyDiagnosisRecordPOList.'+index+'.item3'" :rules="lesionsRecordListRules.item3">
                                <el-input v-model="x.item3"  size="small"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="4. 病理诊断编码:" :prop="'pathologyDiagnosisRecordPOList.'+index+'.item4'" :rules="lesionsRecordListRules.item4">
                                <el-checkbox-group v-model="x.item4">
                                    <el-checkbox label="01">01.正常/大致正常结直肠粘膜</el-checkbox>
                                    <el-checkbox label="02">02.慢性结肠/直肠炎</el-checkbox>
                                    <el-checkbox label="03">03.慢性活动性结肠/直肠炎</el-checkbox>
                                    <el-checkbox label="04">04.慢性肉芽肿性结肠/直肠炎</el-checkbox>
                                    <el-checkbox label="05">05.非腺瘤性息肉</el-checkbox>
                                    <el-checkbox label="06">06.增生性息肉</el-checkbox>
                                    <el-checkbox label="07">07.无蒂锯齿状腺瘤</el-checkbox>
                                    <el-checkbox label="08">08.传统锯齿状腺瘤</el-checkbox>
                                    <el-checkbox label="09">09.锯齿状息肉不能分类</el-checkbox>
                                    <el-checkbox label="10">10.管状腺瘤</el-checkbox>
                                    <el-checkbox label="11">11.绒毛状腺瘤</el-checkbox>
                                    <el-checkbox label="12">12.管状绒毛状腺瘤</el-checkbox>
                                    <el-checkbox label="13">13.腺上皮低级别上皮内瘤变（异型增生）</el-checkbox>
                                    <el-checkbox label="14">14.腺上皮高级别上皮内瘤变（异型增生）</el-checkbox>
                                    <el-checkbox label="15">15.腺上皮高级别上皮内瘤变（粘膜内腺癌）</el-checkbox>
                                    <el-checkbox label="16">16.腺上皮上皮内瘤变不能分级</el-checkbox>
                                    <el-checkbox label="17">17.浸润性腺癌</el-checkbox>
                                    <el-checkbox label="18">18.癌不能分类</el-checkbox>
                                    <el-checkbox label="19">19.恶性肿瘤不能分类</el-checkbox>
                                    <el-checkbox label="20">20.其它</el-checkbox>
                                    <el-checkbox label="21">21.不足以作诊断</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="5. 高级别上皮内瘤变比例（%）：" style="margin-bottom:0;margin-right: 0;" :prop="'pathologyDiagnosisRecordPOList.'+index+'.item5'" :rules="lesionsRecordListRules.item5">
                                <el-input v-model="x.item5" size="small" style="width:82px;"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="6. 腺瘤性息肉管状比例（%）：" style="margin-bottom:0;margin-right: 0;" :prop="'pathologyDiagnosisRecordPOList.'+index+'.item61'" :rules="lesionsRecordListRules.item61">
                                <el-input v-model="x.item61" size="small" style="width:82px;"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="7. 腺瘤性息肉绒毛状比例（%）："  :prop="'pathologyDiagnosisRecordPOList.'+index+'.item62'" :rules="lesionsRecordListRules.item62">
                                <el-input v-model="x.item62" size="small" style="width:82px;"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="8. 备注：" class="blockTit">
                                <el-input v-model="x.item7" type="textarea" :autosize="{minRows:3}" style="width: 100%;min-width: 500px;margin-left:18px;"></el-input>
                            </el-form-item>
                        </el-row>
                    </div>
                    </div>
                    <h2>处理意见</h2>
                    <el-row>
                        <el-form-item label="1. 是否需要国家癌症中心会诊（复阅）？" prop="item1">
                            <el-radio-group v-model="form.item1">
                                <el-radio :label="1">1.是</el-radio>
                                <el-radio :label="2">2.否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="2. 是否诊断为结直肠癌前病变：" prop="item2">
                            <el-radio-group v-model="form.item2">
                                <el-radio :label="1">1.是</el-radio>
                                <el-radio :label="2">2.否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="3. 是否诊断为结直肠癌：" prop="item3">
                            <el-radio-group v-model="form.item3">
                                <el-radio :label="1">1.是</el-radio>
                                <el-radio :label="2">2.否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <h2>填表信息</h2>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="诊断日期：" prop="inputTime">
                                <el-date-picker
                                        v-model="form.inputTime"
                                        :clearable="false"
                                        type="date"
                                        size="mini"
                                        format="yyyy年MM月dd日"
                                        value-format="timestamp"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="医师签名："  prop="inputUser">
                                <el-input v-model="form.inputUser"  size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="btns" v-if="$route.query.flag!=0 &&  $route.query.flag!=2" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
                    <el-button type="primary"  @click="submitForm('1','add')" v-if="!$route.query.id" v-dbClick>提交</el-button>
                    <el-button type="primary"  @click="submitForm('1','edit')" v-if="$route.query.id" v-dbClick>提交</el-button>
                </div>
            </cancer-widget>
        </div>
    </div>
</template>

<script>
    import VALIDATE from '@/utils/validate'
    import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
    import getPathologyForm from '@/views/recruitmentPoint/form/ctResult/CTForm'
    import {sexFilter} from '@/filters/filter'
    import mixins from '@/mixins/mixins'
    export default {
        mixins: [getPersonDetail,getPathologyForm,mixins],
        data() {
            const item3 = (rule, value, callback) => {
                if (value != null && value != "" || value == undefined) {
                    if(value>=0){
                        const that = this
                        this.form.pathologyDiagnosisRecordPOList.filter((item)=> {
                            if(item.item3 != null && item.item3 != '' && item.item3 != undefined)
                                that.$set(item ,['item3'], (item.item3 * 1).toFixed(1))
                        })
                        callback()
                    }else{
                        callback(new Error('请输入非负数'))
                    }
                }else{
                    callback(new Error('请输入!'))
                }
            }
            const item5 = (rule, value, callback) => {
                if(value == null || value == "" || value == undefined){
                    callback()
                }else {
                    if(value>=0 &&value <=  100){
                        const that = this
                        this.form.pathologyDiagnosisRecordPOList.filter((item)=> {
                            if(item.item5 != null && item.item5 != '' && item.item5 != undefined)
                                that.$set(item ,['item5'], (item.item5 * 1).toFixed(1))
                        })
                        callback()
                    }else{
                        callback(new Error('比例:0-100%'))
                    }
                }
            }
            const item6_1 = (rule, value, callback) => {
                if(value == null || value == "" || value == undefined){
                    callback()
                }else{
                    if(value>=0 &&value <=100){
                        const that = this
                        this.form.pathologyDiagnosisRecordPOList.filter((item)=> {
                            if(item.item61 != null && item.item61 != '' && item.item61 != undefined)
                                that.$set(item ,['item61'], (item.item61 * 1).toFixed(1))
                        })
                        callback()
                    }else{
                        callback(new Error('比例:0-100%!'))
                    }
                }
            }
            const item6_2 = (rule, value, callback) => {
                if(value == null || value == "" || value == undefined){
                    callback()
                }else{
                    if(value>=0 && value<= 100){
                        const that = this
                        this.form.pathologyDiagnosisRecordPOList.filter((item)=> {
                            if(item.item62 != null && item.item62 != '' && item.item62 != undefined)
                                that.$set(item ,['item62'], (item.item62 * 1).toFixed(1))
                        })
                        callback()
                    }else{
                        callback(new Error('比例:0-100%!'))
                    }
                }
            }
            return {

                //是否显示录入结节
                tuberState: false,
                checkDate: new Date(),      //评价日期
                evaluateDate: new Date(),     //评价日期
                personDetail: {},   //受试者基本信息
                rules: {},
                form: {
                    item1:'',
                    item2:'',
                    item3:'',
                    inputUser:'',
                    inputTime:'',
                    pathologyDiagnosisRecordPOList:[]
                },
                lesionsRecordListRules:{
                    item1:[
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    item2:[
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    item3:[
                        { required: true, message: '请输入', trigger: 'change' },
                        { message: '请输入非负数', trigger: 'blur',validator:item3 }
                    ],
                    item4:[
                        { required: false, message: '请输入', trigger: 'change' },

                    ],
                    item5:[
                        { required: false, message: '请输入', trigger: 'blur' },
                        { message: '比例:0-100%', trigger: 'blur',validator:item5 }
                    ],
                    item61:[
                        { required: false, message: '请输入', trigger: 'blur' },
                        { message: '比例:0-100%', trigger: 'blur',validator:item6_1 }
                    ],
                    item62:[
                        { required: false, message: '请输入', trigger: 'blur' },
                        { message: '比例:0-100%', trigger: 'blur',validator:item6_2 }
                    ],
                },
                formRules: {
                    item1:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item2:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item3:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    inputTime:[
                        { required: true, message: '必选', trigger: 'change' },
                        { required: true, message: '请输入', trigger: 'blur'},
                    ],
                    inputUser:[
                        { required: true, message: '必选', trigger: 'change' },
                        { required: true, message: '请输入', trigger: 'blur'},
                    ],
                },
                partmentoptions: [{
                    value: '1',
                    label: '回肠末端'
                }, {
                    value: '2',
                    label: '回盲瓣'
                }, {
                    value: '3',
                    label: '升结肠'
                }, {
                    value: '4',
                    label: '肝曲'
                }, {
                    value: '5',
                    label: '横结肠'
                }, {
                    value: '6',
                    label: '脾曲'
                }, {
                    value: '7',
                    label: '降结肠'
                }, {
                    value: '8',
                    label: '降乙交界'
                }, {
                    value: '9',
                    label: '乙状结肠'
                }, {
                    value: '10',
                    label: '直乙交界'
                }, {
                    value: '11',
                    label: '直肠'
                }],
            };
        },
        created(){
            this.getPersonDetailFun(this.$route.query.personId, this.$route.query.surverId);
            if (this.$route.query.pathologyId) {
                this.getPathologyForm(this.$route.query.pathologyId)
            }
        },
        mounted(){

        },
        methods: {
            //提交表单
            submitForm(type, flag) {
                if (type == 1) {
                    this.$refs.form.validate((valid, obj) => {
                        if (valid) {
                            this.submitCTResult(1)
                        } else {
                            this.$message({
                                type: 'error',
                                message: '有未填项'
                            })
                        }
                    })
                } else if (type == 0) {
                    this.submitCTResult(3)
                }

            },
            submitCTResult(type){
                this.form.inputStatus = type
                if (this.$route.query.id) {
                    this.form.checkInfoId = this.$route.query.id
                }
                this.form.checkDate = this.checkDate
                this.form.pathologyDiagnosisRecordPOList.filter(item => {
                    item.item4 = this.sortArray(item.item4).toString()
                })
                this.$axios_http({
                    url: '/base/cj/add/cjPathologyResult',
                    data: this.form,
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        this.$router.push('/cancer/colorectal/list');
                    }
                })

            },
            //根据条件清空
            clearItem(val, data, count){
                if (count == 2) {
                    if (val != 2) {
                        for (let item in data) {
                            this.form[data[item]] = ''
                        }
                    }
                } else if (count == 1) {
                    if (val == 1) {
                        for (let item in data) {
                            this.form[data[item]] = []
                        }
                    }
                } else if (count == 3) {
                    if (val != 1) {
                        for (let item in data) {
                            this.form[data[item]] = []
                        }
                    }
                } else if (count == 4) {
                    if (val != 1) {
                        for (let item in data) {
                            this.form[data[item]] = ''
                        }
                    }
                }else if (count == 5) {
                    if (val != 5) {
                        for (let item in data) {
                            this.form[data[item]] = ''
                        }
                    }
                }

            },
            isArray(arr){
                if (Array.isArray) {
                    return Array.isArray(arr);
                } else {
                    return Object.prototype.toString.call(arr) == '[object Array]';
                }

            },
            //添加数组进入病变部位
            pushLesions(){
                var obj = {
                    item1:'',
                    item2:'',
                    item3:'',
                    item4:[],
                    item5:'',
                    item61:'',
                    item62:'',
                    item7:'',
                }
                this.form.pathologyDiagnosisRecordPOList.push(obj)
                this.$nextTick(() => {
                    let a = 'ref'+(this.form.pathologyDiagnosisRecordPOList.length-1) +''
                    this.$refs[a][0].focus()
                })
            },
            //删除病变部位
            deleteLesions(index){
                this.form.pathologyDiagnosisRecordPOList.splice(index,1)
            },

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .reportBox {
        width: 100%;
        h1 {
            font-size: 18px;
            color: #333;
            line-height: 1;
            padding-bottom: 15px;
            text-align: center;
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
        padding: 5px 0 5px 20px;
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
        border-top: 1px solid #f6f6f6;
        border-bottom: 1px solid #f6f6f6;
        margin-top: -1px;
    }

    .smallTit {
        margin-top: 10px;
        display: block;
    }
    .add-tuber{
        text-align: right;
        width: 300px;
        position: absolute;
        right:60px;
        margin-top: -45px;
        float: right;
        display: inline-block;
    }
    .add-tuber1{
        text-align: left;
    }
    .txsm {
        font-size: 14px;
        margin: 10px 50px;
    }
    .el-checkbox{
        margin-left:0;
        margin-right: 20px;
        width:300px;
    }
</style>
<style>
    .el-form-item__error {
        position: relative !important;
    }
</style>