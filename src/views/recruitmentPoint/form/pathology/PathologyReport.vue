<template>
<div>
  <!--<div class="logs" @click="openLogs" v-if="$route.query.flag == 0">操作日志</div>-->
    <!--&lt;!&ndash; 操作日志弹窗 &ndash;&gt;-->
    <!--<el-dialog-->
      <!--title="操作日志"-->
      <!--:visible.sync="logsDialog"-->
      <!--width="50%"-->
      <!--:before-close="handleClose">-->
      <!--<div class="tips">-->
          <!--<p v-for="item in logs" :key="item.id">账号{{item.operatePersonName}}，{{item.operateType}}，时间{{item.operateTime}}</p>-->
        <!--</div>-->
    <!--</el-dialog>-->
  <div class="reportBox">
    <cancer-widget>
      <div style="margin-bottom: 20px;" v-if="$route.query.flag==0">
        <el-button size="mini" @click="$router.go(-1)">返 回</el-button>
        <el-button size="small" style="float: right;" @click="printFromContent('print')">打印</el-button>
      </div>
      <div id="print">
        <h1 style="text-align: center;">结直肠内镜病理筛查报告</h1>
        <el-form :model="personDetail" ref="personDetail"  class="demo-personDetail">
          <el-row>
            <el-col :span="8">
              <el-form-item label="SID/问卷ID：" prop="name">
                {{personDetail.surverId}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓　　　名：">
                {{personDetail.name}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
        <el-form :model="form" :rules="formRules"  ref="form"  class="demo-form">
          <h2>病理可见</h2>
          <el-row>
            <el-form-item label="" prop="bjText" class="blockTit">
              <el-input v-model="form.bjText" type="textarea" :autosize="{minRows:4}" :disabled="$route.query.flag==0"></el-input>
            </el-form-item>
          </el-row>
          <h2>填表信息</h2>
          <el-row>
            <el-col :span="12">
              <el-form-item label="报告医师" labelWidth="80px" prop="reportDoctor" class="inline">
                <el-input v-model.trim="form.reportDoctor" size="mini" style="width: 200px;" :disabled="$route.query.flag==0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核医师" labelWidth="80px" prop="examineDoctor" class="inline">
                <el-input v-model.trim="form.examineDoctor" size="mini" style="width: 200px;" :disabled="$route.query.flag==0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    <div class="btns" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
      <el-button type="primary"  @click="submitForm" v-if="$route.query.flag!=0" v-dbClick>提交</el-button>
    </div>
    </cancer-widget>
   </div>
  </div>
</template>

<script>
  import VALIDATE from '@/utils/validate'
  import mixin from '@/mixins/mixins'
  import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
  export default {
    mixins: [ mixin,getPersonDetail ],
    data() {
      return {
          personDetail:{},
          checkDate:new Date(),
          reportDate:new Date(),
          form:{
              bjText:null,
              reportDoctor:null,
              examineDoctor:null
          },
          formRules:{
              bjText:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              reportDoctor:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              examineDoctor:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
          }
      };
    },
    mounted(){
        this.getPersonDetailFun(this.$route.query.personId,this.$route.query.surverId);
        this.queryReport()
    },
    methods: {
        queryReport(){
           this.$axios_http({
                url: '/base/cj/find/cjPathologyReportResult/'+this.$route.query.pathologyReportId,
                data: {},
                vueObj: this
            }).then((res) => {
                if (res.data.status == "SUCCESS") {
                  let obj=res.data.result
                  this.form=obj;
                  this.checkDate = obj.checkDate;
                  this.reportDate = obj.reportDate;
                }
            })
      },
        //提交表单
        submitForm(){
          this.$refs.form.validate((valid,obj) => {
                if(valid){
                 this.$axios_http({
                      url: '/base/cj/add/submitCjPathologyReport',
                      data: {
                        id:Number(this.$route.query.pathologyReportId),
                        checkDate:new Date(this.checkDate).getTime(),
                        reportDate:new Date(this.reportDate).getTime(),
                        bjText:this.form.bjText,
                        reportDoctor:this.form.reportDoctor,
                        examineDoctor:this.form.examineDoctor
                      },
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
                }
            })
        },

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .reportBox{
    width: 100%;
    h1{
      font-size: 18px;
      color: #333;
      line-height: 1;
      padding-bottom: 15px;
      text-align: center;
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
</style>
<style>
  .el-form-item__error{
    position: relative!important;
  }
</style>
