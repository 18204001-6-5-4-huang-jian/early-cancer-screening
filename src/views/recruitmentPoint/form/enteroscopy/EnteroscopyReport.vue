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
      <h1>结直肠内镜筛查报告</h1>
      <el-form :model="personDetail" :rules="rules" ref="personDetail"  class="demo-personDetail">
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
            <el-form-item label="评估日期：" >
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
      <el-form :model="form" :rules="formRules"  ref="form"  class="demo-form">
      <h2>检查所见</h2>
      <el-row>
          <el-form-item label="" prop="checkText" class="blockTit">
              <el-input v-model="form.checkText" type="textarea" :autosize="{minRows:4}"></el-input>
          </el-form-item>
      </el-row>
      <h2>内镜下诊断（仅供参考）</h2>
      <el-row>
        <el-form-item label="" prop="njxDiagnosis" class="blockTit">
          <el-input v-model="form.njxDiagnosis" type="textarea" :autosize="{minRows:4}"></el-input>
        </el-form-item>
      </el-row>
      <h2>填表信息</h2>
      <el-row>
        <el-col :span="12">
          <el-form-item label="报告医师" labelWidth="80px" prop="reportDoctor" class="inline">
              <el-input v-model.trim="form.reportDoctor" size="mini" style="width: 200px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核医师" labelWidth="80px" prop="examineDoctor" class="inline">
              <el-input v-model.trim="form.examineDoctor" size="mini" style="width: 200px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
      <!-- $route.query.flag 0:来源评估管理查看问卷 ，1:来源评估管理修改问卷，2:来源质控管理查看问卷  -->
      <div class="btns" v-if="$route.query.flag!=0 &&  $route.query.flag!=2">
        <el-button type="primary" size="small" @click="submitForm('1','add')" v-if="!$route.query.id" v-dbClick>提交</el-button>
        <el-button type="primary" size="small" @click="submitForm('1','edit')" v-if="$route.query.id" v-dbClick>提交</el-button>
      </div>
    </cancer-widget>
   </div>
  </div>
</template>

<script>
  import VALIDATE from '@/utils/validate'
  import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
  import getEnteroscopyReport from '@/views/recruitmentPoint/form/ctResult/CTForm'
  export default {
    mixins: [ getPersonDetail,getEnteroscopyReport ],
    data() {
      return {

          //是否显示录入结节
          tuberState:false,
          personDetail:{},
          checkDate:new Date(),
          reportDate:new Date(),
          hosPersonInfoPO:{

          },
          rules:{

          },
          form:{
              checkText:'',
              njxDiagnosis:'',
              reportDoctor:'',
              examineDoctor:''
          },
          formRules:{
              checkText:[
                  { required: true, message: '必填', trigger: 'change' },
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              njxDiagnosis:[
                  { required: true, message: '必填', trigger: 'change' },
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              reportDoctor:[
                  { required: true, message: '必填', trigger: 'change' },
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              examineDoctor:[
                  { required: true, message: '必填', trigger: 'change' },
                  { required: true, message: '必填', trigger: 'blur' },
              ],
          }
      };
    },
    mounted(){
        this.getPersonDetailFun(this.$route.query.personId,this.$route.query.surverId);
        this.getEnteroscopyReport(this.$route.query.reportId)
    },
    methods: {
        //提交表单
        submitForm(type,flag) {
            this.$refs.form.validate((valid,obj) => {
                if(valid){
                 this.submitCTReport(1)
                }
            })
        },
        submitCTReport(type){
            this.form.reportDate = this.reportDate
            this.form.checkDate = this.checkDate
            this.$axios_http({
                url: '/base/cj/add/submitCjReport',
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