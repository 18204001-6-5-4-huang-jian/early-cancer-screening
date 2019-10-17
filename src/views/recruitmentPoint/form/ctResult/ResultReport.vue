<template>
<div>
  <div class="reportBox">
    <cancer-widget>
      <h1>胸部基线低剂量CT检查</h1>
      <el-form :model="personDetail" :rules="rules" ref="personDetail"  class="demo-personDetail">
        <el-row>
          <el-col :span="6">
            <el-form-item label="SID/问卷ID：" prop="name">
              {{personDetail.surverId}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="筛查ID：" prop="sex">
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
            <el-form-item label="评价日期：" >
              <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="timestamp"
                      :clearable="false"
                      size="mini"
                      v-model="reportDate">
              </el-date-picker>
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
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系电话：">
              {{personDetail.phone}}
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="地址：">
              {{personDetail.czAddress}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="form" :rules="formRules"  ref="form"  class="demo-form">
      <h2><span class="red">*&nbsp;</span>检查所见</h2>
      <el-row>
          <el-form-item label="" class="blockTit">
              <el-input v-model="form.checkText"  type="textarea" :autosize="{minRows:4}"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="" class="blockTit">
              <el-input v-model="form.checkTestOther"  type="textarea" :autosize="{minRows:4}"></el-input>
          </el-form-item>
      </el-row>
      <h2><span class="red">*&nbsp;</span>影像学诊断</h2>
      <el-row>
        <el-form-item label="" prop="imagingDiagnosis" class="blockTit">
          <el-input v-model="form.imagingDiagnosis" type="textarea" :autosize="{minRows:4}"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
          <el-form-item label="报告医师" labelWidth="80px" prop="reportDoctor" class="inline">
              <el-input v-model.trim="form.reportDoctor" size="mini" style="width: 200px;"></el-input>
          </el-form-item>
      </el-row>
      <el-row>
          <el-form-item label="审核医师" labelWidth="80px" prop="examineDoctor" class="inline">
              <el-input v-model.trim="form.examineDoctor" size="mini" style="width: 200px;"></el-input>
          </el-form-item>
      </el-row>
    </el-form>
      <div class="btns" v-if="$route.query.flag!=0 &&  $route.query.flag!=2">
        <el-button type="primary" size="small"  @click="submitForm('1','add')" v-if="!$route.query.id" v-dbClick>提交</el-button>
        <el-button type="primary" size="small"  @click="submitForm('1','edit')" v-if="$route.query.id" v-dbClick>提交</el-button>
      </div>
    </cancer-widget>
   </div>
  </div>
</template>

<script>
import VALIDATE from "@/utils/validate";
import getPersonDetail from "@/views/recruitmentPoint/form/getPersonDetail";
import getCTReport from "@/views/recruitmentPoint/form/ctResult/CTForm";
export default {
  mixins: [getPersonDetail, getCTReport],
  data() {
    return {
      //是否显示录入结节
      tuberState: false,
      personDetail: {},
      checkDate: "",
      reportDate: new Date(),
      hosPersonInfoPO: {},
      rules: {},
      form: {
        checkText: "",
        checkTestOther: "",
        imagingDiagnosis: "",
        reportDoctor: "",
        examineDoctor: ""
      },
      formRules: {
        imagingDiagnosis: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        reportDoctor: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        examineDoctor: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getPersonDetailFun(
      this.$route.query.personId,
      this.$route.query.surverId
    );
    this.getCTReport(this.$route.query.reportId);
  },
  methods: {
    //提交表单
    submitForm(type, flag) {
      this.$refs.form.validate((valid, obj) => {
        if (valid) {
          if(!this.form.checkText && !this.form.checkTestOther){
            this.$message({
              type:'error',
              message:'检查所见至少填写一个'
            })
          } else {
            this.submitCTReport(1);
          }
        }
      });
    },
    submitCTReport(type) {
      this.form.inputStatus = type;
      this.form.reportDate = this.reportDate;
      this.form.checkDate = this.checkDate;
      this.$axios_http({
        url: "/base/ct/update/report",
        data: this.form,
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.$router.push("/cancer/lunglist");
        }
      });
    }
  }
};
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
    border-bottom: 1px solid #f6f6f6;
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
  border-bottom: 1px dashed #f6f6f6;
}
.el-form-item {
  margin-bottom: 0;
}
.el-form-item__label {
  color: #666;
  // font-weight: bold;
  font-size: 16px;
}
.el-form-item .el-input,
.el-form-item .el-date-editor.el-input,
.el-form-item .el-date-editor.el-input__inner {
  width: 190px;
}
.other .el-form-item {
  float: left;
  min-width: 290px;
}
h2 {
  background: #f7fafc;
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
.btns {
  padding-top: 10px;
  border-top: 1px dashed rgb(220, 223, 230);
  text-align: center;
}
</style>
<style>
.el-form-item__error {
  position: relative !important;
}
</style>