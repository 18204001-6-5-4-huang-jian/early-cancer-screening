<template>
        <cancer-widget>
            <div class="zmscreeningCollectView">
                <div class="form-title" id="print">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <div class="filter-container content-search">
                       <el-button class="return-home" @click="goBack()">返 回</el-button>
                       <el-button class="return-home" style="float:right;" @click="printFromContent('print')">打 印</el-button>
                    </div>
                    <el-tab-pane :label="title+'结果报告'" name="1" v-if="$route.query.reportId != '' && $route.query.reportId != null">
                         <h3 style="text-align: center;">{{title}}筛查报告</h3>
                        <el-form :model="personDetail" label-width="130px" ref="zmscreeningCollectView" :inline="true"  class="demo-zmscreeningCollectView">
                        <el-row>
                            <el-col :span="8">
                            <el-form-item label="SID/问卷ID：">
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
                                {{personDetail.age}}岁
                            </el-form-item>
                            </el-col>
                        <el-col :span="8">
                            <el-form-item label="检查日期：">
                                {{personDetail.checkDate | dateformat}}
                            </el-form-item>
                            </el-col>
                            <el-col :span="8">
                            <el-form-item label="报告日期：">
                                {{personDetail.reportDate | dateformat}}
                            </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                            <el-form-item label="身份证号：">
                                {{personDetail.idCard}}
                            </el-form-item>
                            </el-col>
                        </el-row>
                        </el-form>
                        <el-form :model="form" ref="form"  class="demo-form">
                        <p class="subtit" style="margin-top:10px;">{{form.checkTime}}</p>
                        <h2>检查所见</h2>
                        <div class="block">
                            <el-row>
                            <el-form-item label="" prop="checkText" class="blockTit">
                                <el-input v-model="form.checkText" :disabled="$route.query.flag==0" type="textarea" :autosize="{minRows:4}"></el-input>
                            </el-form-item>
                            </el-row>
                        </div>
                        <h2>内镜下诊断（仅供参考）</h2>
                        <div class="block">
                            <el-row>
                            <!-- sxhdnj -->
                            <el-form-item label="" prop="imagingDiagnosis" class="blockTit" v-if="$route.query.type == 'sxhdnj'">
                                <el-input v-model="form.imagingDiagnosis" :disabled="$route.query.flag==0" type="textarea" :autosize="{minRows:4}"></el-input>
                            </el-form-item>
                            <!-- cj -->
                            <el-form-item label="" prop="njxDiagnosis" class="blockTit" v-if="$route.query.type == 'cj'">
                                <el-input v-model="form.njxDiagnosis" :disabled="$route.query.flag==0" type="textarea" :autosize="{minRows:4}"></el-input>
                            </el-form-item>
                            </el-row>
                        </div>
                        <h2>填表信息</h2>
                        <el-row>
                            <el-col :span="12">
                            <el-form-item label="报告医师" labelWidth="80px" prop="reportDoctor" class="inline">
                                <el-input v-model.trim="form.reportDoctor" size="mini" style="width: 200px;" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                            </el-col>
                            <el-col :span="12">
                             <!-- sxhdnj -->
                            <el-form-item label="审核医师" labelWidth="80px" prop="checkDoctor" class="inline" v-if="$route.query.type == 'sxhdnj'">
                                <el-input v-model.trim="form.checkDoctor" size="mini" style="width: 200px;" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                            <!-- cj -->
                            <el-form-item label="审核医师" labelWidth="80px" prop="examineDoctor" class="inline" v-if="$route.query.type == 'cj'">
                                <el-input v-model.trim="form.examineDoctor" size="mini" style="width: 200px;" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                            </el-col>
                        </el-row>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane :label="title+'病理报告'" name="2" v-if="$route.query.PathologyId != '' && $route.query.PathologyId != null">
                        <h3 style="text-align: center;">{{title}}病理报告</h3>
                        <el-form :model="personDetail" label-width="130px" ref="zmscreeningCollectView" :inline="true"  class="demo-zmscreeningCollectView">
                        <el-row>
                            <el-col :span="8">
                            <el-form-item label="SID/问卷ID：">
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
                                {{personDetail.age}}岁
                            </el-form-item>
                            </el-col>
                        <el-col :span="8">
                            <el-form-item label="检查日期：">
                                {{personDetail.checkDate | dateformat}}
                            </el-form-item>
                            </el-col>
                            <el-col :span="8">
                            <el-form-item label="报告日期：">
                                {{personDetail.reportDate | dateformat}}
                            </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                            <el-form-item label="身份证号：">
                                {{personDetail.idCard}}
                            </el-form-item>
                            </el-col>
                        </el-row>
                        </el-form>
                        <el-form :model="form1"  ref="form1"  class="demo-form">
                        <p class="subtit" style="margin-top:10px;">{{form1.checkTime}}</p>
                        <h2>病理可见</h2>
                        <div class="block">
                            <el-row>
                            <!-- sxhdnj -->
                            <el-form-item label="" prop="checkText" class="blockTit" v-if="$route.query.type == 'sxhdnj'">
                                <el-input v-model="form1.checkText" :disabled="$route.query.flag==0" type="textarea" :autosize="{minRows:4}"></el-input>
                            </el-form-item>
                            <!-- cj -->
                            <el-form-item label="" prop="bjText" class="blockTit" v-if="$route.query.type == 'cj'">
                                <el-input v-model="form1.bjText" :disabled="$route.query.flag==0" type="textarea" :autosize="{minRows:4}"></el-input>
                            </el-form-item>
                            </el-row>
                        </div>
                        <h2>填表信息</h2>
                        <el-row>
                            <el-col :span="12">
                            <el-form-item label="报告医师" labelWidth="80px" prop="reportDoctor" class="inline">
                                <el-input v-model.trim="form1.reportDoctor" size="mini" style="width: 200px;" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                            </el-col>
                            <el-col :span="12">
                            <!-- sxhdnj -->
                            <el-form-item label="审核医师" labelWidth="80px" prop="checkDoctor" class="inline" v-if="$route.query.type == 'sxhdnj'">
                                <el-input v-model.trim="form1.checkDoctor" size="mini" style="width: 200px;" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                            <!-- cj -->
                            <el-form-item label="审核医师" labelWidth="80px" prop="examineDoctor" class="inline" v-if="$route.query.type == 'cj'">
                                <el-input v-model.trim="form1.examineDoctor" size="mini" style="width: 200px;" :disabled="$route.query.flag==0"></el-input>
                            </el-form-item>
                            </el-col>
                        </el-row>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
             </div>
        </cancer-widget>
</template>
<script>
import mixin from '@/mixins/mixins'
  export default {
    mixins: [ mixin ],
    data(){
        return{
            title:'',
            personDetail:{},
            activeName:'1',
            form:{},
            form1:{}
        }
    },
    mounted() {
        if(this.$route.query.type == 'sxhdnj'){
           this.title = '上消化道内镜'
        }else if(this.$route.query.type == 'cj'){
           this.title = '结直肠镜'
        }
        this.query()
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        },
        print(){

        },
        query(){
            this.$axios_http({
                url: "/base/re/booking/qurey/getPersonDetails",
                data: {
                    personId: this.$route.query.personId,
                    surverId: this.$route.query.surverId
                },
                vueObj: this
            }).then(res => {
                this.personDetail = res.data.result;
            });
            if(this.$route.query.type == 'sxhdnj'){
                this.$axios_http({
                    url: "/base/sxhd/find/report/" + this.$route.query.reportId,
                    data: {},
                    vueObj: this
                }).then(res => {
                    if(res.data.status == "SUCCESS") {
                        //结果报告
                        this.form = res.data.result;
                    }
                });
                this.$axios_http({
                    url: '/base/sxhd/find/report/pathology/'+this.$route.query.PathologyId,
                    data: {},
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        //病理报告
                        this.form1 =res.data.result;
                    }
                })
            }else if(this.$route.query.type == 'cj'){
                this.$axios_http({
                    url: "/base/cj/find/cjReportResult/" + this.$route.query.reportId,
                    data: {},
                    vueObj: this
                }).then(res => {
                    if(res.data.status == "SUCCESS") {
                        //结果报告
                        this.form = res.data.result;
                    }
                });
                this.$axios_http({
                    url: '/base/cj/find/cjPathologyReportResult/'+this.$route.query.PathologyId,
                    data: {},
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        //病理报告
                        this.form1 =res.data.result;
                    }
                })
            }
        },
        handleClick(){

        }
    },
}
</script>
<style lang="css" scoped>
  .zmscreeningCollectView{
      background: #fff;
      padding: 20px;
   }
   .form-title {
      /* padding-top: 20px; */
    }
    .demo-zmscreeningCollectView{
        margin-top: 20px;
    }
    h2{
    background: #F7FAFC;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    line-height: 48px;
    padding-left: 20px;
    border-top: 1px solid #f6f6f6;
    border-bottom: 1px solid #f6f6f6;
    margin-top: -1px;
    margin-bottom:10px;
  }
  .subtit{
    padding-left:20px;
    margin-bottom: 10px;
    color: #000;
  }
</style>