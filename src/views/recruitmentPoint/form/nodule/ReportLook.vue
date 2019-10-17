<template>
<div>
  <div class="reportBox">
    <cancer-widget>
        <div style="margin-bottom: 20px;">
            <el-button size="mini" @click="$router.go(-1)">返 回</el-button>
            <el-button size="small" class="print" @click="printFromContent('print')">打印</el-button>
        </div>
      <div id="print">
        <h1 style="text-align: center;">胸部基线低剂量CT检查</h1>
        <el-form :model="personDetail" :rules="rules" ref="personDetail" :inline="true"  class="demo-personDetail">
          <el-row>
            <el-col :span="8">
              <el-form-item label="SID/问卷ID：" prop="name">
                {{personDetail.surverId}}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="筛查ID：" prop="sex">
                {{$route.query.screeningId}}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="检查日期：">
                  <span>{{checkDate | dateFilter}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
                  <el-form-item label="评价日期：" >
                      <span>{{reportDate | dateFilter}}</span>
                  </el-form-item>
              </el-col>
            <el-col :span="10">
              <el-form-item label="姓　　　名：">
                {{personDetail.name}}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性　别：">
                {{personDetail.sex | sexFilter}}
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="年　　龄：">
                        {{personDetail.age}}
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="身份证号：">
                        {{personDetail.idCard}}
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="联系电话：">
                    {{personDetail.phone}}
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="地址：">
                  {{personDetail.czAddress}}
                </el-form-item>
              </el-col>
        </el-row>
        </el-form>
        <el-form :model="form" ref="form"  class="demo-form">
          <h2>检查所见</h2>
          <el-row>
            <div v-html="$options.filters.msg(form.checkText)" class="textareaBlock" v-if="form.checkText"></div>
            <!-- <el-form-item label="" prop="checkText" class="blockTit" v-if="form.checkText">
              <el-input v-model.trim="form.checkText" disabled type="textarea" :autosize="{minRows:4,maxRows: 106}"></el-input>
            </el-form-item> -->
            <br v-if="form.checkText">
            <div v-html="$options.filters.msg(form.checkTestOther)" class="textareaBlock" v-if="form.checkTestOther"></div>
          <!-- <el-form-item label="" prop="checkTestOther" class="blockTit" v-if="form.checkTestOther">
              <el-input v-model.trim="form.checkTestOther" disabled type="textarea" :autosize="{minRows:4}"></el-input>
          </el-form-item> -->
          </el-row>
          <h2>影像学诊断</h2>
          <el-row>
            <el-form-item label="" prop="imagingDiagnosis" class="blockTit">
              <el-input v-model.trim="form.imagingDiagnosis" disabled type="textarea" :autosize="{minRows:4}"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="报告医师" labelWidth="80px" prop="reportDoctor" class="inline">
              <el-input v-model.trim="form.reportDoctor" disabled size="mini" style="width: 200px;"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="审核医师" labelWidth="80px" prop="examineDoctor" class="inline">
              <el-input v-model.trim="form.examineDoctor" disabled size="mini" style="width: 200px;"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <!-- <div class="btns">
          <router-link :to="{path:'/form/resultreport',query:{
          screeningId:$route.query.screeningId,
          id:$route.query.id,
          surverId:$route.query.surverId,
          personId:$route.query.personId,
          reportId:$route.query.reportId,
          source:'look'}}">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
        </div> -->
      </div>
    </cancer-widget>
   </div>
  </div>
</template>

<script>
  import VALIDATE from '@/utils/validate'
  import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
  import getCTReport from '@/views/recruitmentPoint/form/ctResult/CTForm'
  import mixin from '@/mixins/mixins'
  export default {
    mixins: [ mixin,getPersonDetail,getCTReport ],
    filters:{
        msg: function(msg) {
            return msg.replace(/\n/g, "<br>").replace(/\r/g, "<br>") ;
        }
      },
    data() {
      return {

          //是否显示录入结节
          tuberState:false,
          personDetail:{},
          checkDate:'',
          reportDate:'',
          hosPersonInfoPO:{

          },
          rules:{

          },
          form:{
              checkText:'',
              checkTestOther: '',
              imagingDiagnosis:'',
              reportDoctor:'',
              examineDoctor:''
          }
      };
    },
    mounted(){
        this.getPersonDetailFun(this.$route.query.personId,this.$route.query.surverId);
        this.getCTReport(this.$route.query.reportId)

    },
    methods: {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .reportBox{
    width: 100%;
    .print {
          float: right;
      }
    h1{
      font-size: 18px;
      color: #333;
      line-height: 1;
      padding-bottom: 15px;
      text-align: center;
      border-bottom:1px solid #f6f6f6;
    }

    .title{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .red{
      color: red;
    }
  }
  .el-row{
    padding:5px 0 5px 20px;
    border-bottom:1px dashed #f6f6f6;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .el-form-item__label{
    color: #666;
    // font-weight: bold;
    font-size: 16px;
  }
  .el-form-item .el-input,.el-form-item .el-date-editor.el-input, .el-form-item .el-date-editor.el-input__inner{
    width: 190px;
  }
  .other .el-form-item{
    float: left;
    min-width: 290px;
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
  }
  .smallTit{
    margin-top: 10px;
    display: block;
  }
  .textareaBlock{
    border:1px solid #DCDFE6;
    border-radius: 4px;
    font-size: 14px;
    color: #606266;
    line-height: 1.5;
    padding: 5px 15px;
  }
</style>
<style>
  .el-form-item__error{
    position: relative!important;
  }

    .el-textarea.is-disabled .el-textarea__inner {
        width: 100%;
        overflow: auto;
        word-break: break-all;
    }
</style>
