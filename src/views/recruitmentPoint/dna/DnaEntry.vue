<template>
  <div class="reportBox">
    <cancer-widget>
      <el-form :model="form" :rules="rules" ref="form" :inline="true">
        <div>
                <h2>基本信息</h2>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="SID/参加者ID：" prop="surverId">
                            <el-input 
                                v-model.trim="form.surverId" 
                                size="mini" 
                                maxlength="20" 
                                :disabled="readOnly"
                                @blur="findBySurverId(form.surverId)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="姓名：">
                        {{form.name}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="性别：">
                        {{form.sex | sexFilter}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="年龄：">
                        {{form.age}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="身份证号：">
                        {{form.idCard}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所属机构：">
                        {{form.deptName}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所属项目：">
                        {{form.itemsUnderIt | itemsUnderItFilter}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="分组状态：">
                        {{form.entryCategory | groupStatusFilter}}
                        </el-form-item>
                    </el-col>
                </el-row>
        </div>

        <div>
            <h2>粪便DNA信息</h2>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="粪便DNA编码：" prop="dnaCode">
                        <el-input
                         v-model.trim="form.dnaCode" 
                         size="mini" 
                         :disabled="readOnly"
                         @blur="checkDnaCode(form.dnaCode)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="检测盒发放日期：" prop="checkBoxDate">
                        <el-date-picker
                                type="date"
                                :clearable="false"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="timestamp"
                                size="mini"
                                :disabled="readOnly"
                                v-model="form.checkBoxDate"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="发放地点：" prop="sendPlace">
                        <el-input v-model.trim="form.sendPlace" size="mini" maxlength="50" :disabled="readOnly"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="发放经手人工作编码：" prop="senderCode">
                        <el-input v-model.trim="form.senderCode" size="mini" maxlength="20" :disabled="readOnly"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
        <div class="btns" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
            <el-button type="primary"  @click="submitForm" v-if="readOnly==false" v-dbClick>确定</el-button> 
            <el-button type="default" @click="cancel">取消</el-button> 
        </div>
      </el-form>
    </cancer-widget>
   </div>
</template>

<script>
export default {
  data() {
    let validate_sid = (rule, value, callback) => {
      if (value && this.surverIdFlag == false) {
        callback(new Error("请输入正确的SID/参加者ID"));
      } else {
        callback();
      }
    };
    let validate_dna = (rule, value, callback) => {
      if (value && value.length != 12) {
        callback(new Error("请输入正确的粪便DNA编码"));
      } else if (this.checkDnaFlag == false) {
        callback(new Error("粪便DNA编码重复，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      surverIdFlag: true,
      checkDnaFlag: true,
      readOnly: false,
      form: {
        personId: null,
        surverId: null,
        name: null,
        sex: null,
        age: null,
        idCard: null,
        deptName: null,
        itemsUnderIt: null,
        entryCategory: null,
        dnaCode: null,
        checkBoxDate: null,
        sendPlace: sessionStorage.getItem("deptName"),
        senderCode: sessionStorage.getItem("loginName")
      },
      rules: {
        surverId: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_sid, trigger: "blur" }
        ],
        dnaCode: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_dna, trigger: "blur" }
        ],
        checkBoxDate: [{ required: true, message: "必填", trigger: "change" }],
        sendPlace: [{ required: true, message: "必填", trigger: "blur" }],
        senderCode: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.readOnly = true;
      this.queryResult();
    }

    if(this.$route.query.sid) {
      this.form.surverId = this.$route.query.sid
      this.findBySurverId(this.$route.query.sid)
    }
  },
  methods: {
    // 查询
    queryResult() {
      this.$axios_http({
        url: "/base/measurement/find/result",
        data: {
          id: this.$route.query.id
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.form = res.data.result;
        }
      });
    },
    submitForm() {
      this.$refs.form.validate((valid, obj) => {
        if (valid) {
          this.$axios_http({
            url: "/base/measurement/saveOrUpdate/DNA",
            data: Object.assign({}, this.form),
            vueObj: this
          }).then(res => {
            if (res.data.status == "SUCCESS") {
              this.$message.success("保存成功");
              this.$router.push("/dna/index");
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "有未填项"
          });
        }
      });
    },
    cancel() {
      this.$router.push({ path: "/dna/index" });
    },
    findBySurverId(value) {
      if (value) {
        this.$axios_http({
          url: "/base/measurement/findBySurverId",
          data: {
            surverId: value
          },
          vueObj: this
        }).then(res => {
          if (res.data.status == "SUCCESS") {
            let _result = res.data.result;
            this.surverIdFlag = true;
            this.form.name = _result.name;
            this.form.personId = _result.personId;
            this.form.sex = _result.sex;
            this.form.age = _result.age;
            this.form.idCard = _result.idCard;
            this.form.deptName = _result.deptName;
            this.form.itemsUnderIt = _result.itemsUnderIt;
            this.form.entryCategory = _result.entryCategory;
          } else if (res.data.code == "SURVERID_QUERY_ERROR") {
            this.surverIdFlag = false;
            this.form.name = null;
            this.form.personId = null;
            this.form.sex = null;
            this.form.age = null;
            this.form.idCard = null;
            this.form.deptName = null;
            this.form.itemsUnderIt = null;
            this.form.entryCategory = null;
          }
          this.$refs["form"].validateField("surverId");
        });
      }
    },
    // 去重dna编码
    checkDnaCode(value) {
      if (value && value.length==12) {
        this.$axios_http({
          url: "/base/measurement/findDnaCode",
          data: {
            dnaCode: value
          },
          vueObj: this
        }).then(res => {
          if (res.data.status == "SUCCESS") {
            let _result = res.data.result;
            if (_result == false) {
              // 编码重复
              this.checkDnaFlag = false;
            } else {
              this.checkDnaFlag = true;
            }
          }
          this.$refs["form"].validateField("dnaCode");
        });
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
h2 {
  background: #f7fafc;
  font-size: 16px;
  color: #333;
  font-weight: 700;
  line-height: 48px;
  padding-left: 20px;
}
.el-row {
  padding: 10px 0 10px 20px;
}
</style>
