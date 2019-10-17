<template>
  <div id="ctExaminationReport">
    <div class="filter-container content-search">
      <el-button size="mini" class="return-home" @click="goBack()">返 回</el-button>
      <el-button size="small" class="print" @click="printContent('print')" v-if="button == 2 && showDataState">打印</el-button>
    </div>
    <div class="ctExaminationReport-content">
      <!-- <div class="title">
      <h2>城市癌症早诊早治项目</h2>
    </div> -->
      <el-form :model="form" :rules="rules" ref="form" class="form-body">
        <!-- 查看打印页面begin -->
        <div id="print" v-if="showDataState">
          <h3 style="text-align: center;">城市癌症早诊早治项目</h3>
          <div class="booking-list1" style="padding-bottom: 0px;">
            <el-row class="booking-list1-item">
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  ID编号: {{form.screeningId}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  姓名： {{form.hosPersonInfoPO.name}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  性别：{{form.hosPersonInfoPO.sex | sexFilter}}
                </div>
              </el-col>
            </el-row>
            <el-row class="booking-list1-item">
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  年龄：{{form.hosPersonInfoPO.age}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  身份证号：{{form.hosPersonInfoPO.idCard}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  检查日期: {{form.checkTime}}
                </div>
              </el-col>
            </el-row>
            <el-row class="booking-list1-item">
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  报告日期： {{form.reportDate}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  联系电话：{{form.hosPersonInfoPO.phone}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  联系地址: {{form.hosPersonInfoPO.czAddress}}
                </div>
              </el-col>
            </el-row>
          </div>
          <h3 style="text-align: center;">胸部低剂量CT检查</h3>
          <div class="booking-list1">
            <!-- <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <span>检查所见：</span>
                </div>
              </el-col>
            </el-row> -->
            <h4 style="margin-bottom:10px;">检查所见：</h4>
            <el-row>
              <el-col :span="24">
                <div v-if="form.tubercle1!=null" class="tubercle" v-html="$options.filters.msg(form.tubercle1)"></div>
                <div v-if="form.tubercle2!=null" class="tubercle" v-html="$options.filters.msg(form.tubercle2)"></div>
                <div v-if="form.tubercle3!=null" class="tubercle" v-html="$options.filters.msg(form.tubercle3)"></div>
                <div v-if="form.tubercle4!=null" class="tubercle" v-html="$options.filters.msg(form.tubercle4)"></div>
                <div v-if="form.tubercle5!=null" class="tubercle" v-html="$options.filters.msg(form.tubercle5)"></div>
                <div v-if="form.tubercle6!=null" class="tubercle" v-html="$options.filters.msg(form.tubercle6)"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <div v-if="form.anomalousEvent!=null" class="anomalousEvent" v-html="$options.filters.msg(form.anomalousEvent)"></div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <div v-if="form.unanomalousEvent!=null" class="anomalousEvent" v-html="$options.filters.msg(form.unanomalousEvent)"></div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="booking-list1">
            <h4 style="margin:20px 0 10px 0;">影像学诊断：</h4>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-light">
                  <span v-html="$options.filters.msg(form.imagingDiagnosis)"></span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="booking-list1">
            <el-row class="booking-list1-item">
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  报告医师： {{form.reportDoctor}}
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  审核医师：{{form.examineDoctor}}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 查看打印页面end -->
        <div  v-if="!showDataState">
          <h3 style="text-align: center;">城市癌症早诊早治项目</h3>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="ID编号：" prop="value">
                <span>{{form.screeningId}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名：" prop="value">
                <span>{{form.hosPersonInfoPO.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：" prop="value">
                <span>{{form.hosPersonInfoPO.sex | sexFilter}}</span>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="年龄：">
                <span>{{form.hosPersonInfoPO.age}}岁</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="身份证号：">
                  <span>{{form.hosPersonInfoPO.idCard}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="检查日期：">
                  <span>{{form.checkTime}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="报告日期:" prop="reportDate">
                  <el-date-picker
                    v-model="form.reportDate"
                    type="date"
                    size="small"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    style="width: 200px;"
                    ref="reportDate"
                    :disabled="showDataState">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="联系电话:">
                  <span>{{form.hosPersonInfoPO.phone}}</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="联系地址:">
                  <span>{{form.hosPersonInfoPO.czAddress}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <h3 style="text-align: center;">胸部低剂量CT检查</h3>
          <div class="tubercle-content">
            <h4 style="margin-bottom:10px;">检查所见：</h4>
            <!-- <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="检查所见：" prop="value"></el-form-item>
                </div>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple" v-if="form.tubercle1 != null">
                  <el-form-item label="" prop="tubercle1">
                    <el-input v-model="form.tubercle1" type="textarea" placeholder="" :disabled="showDataState" ref="tubercle1"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple" v-if="form.tubercle2 != null">
                  <el-form-item label="" prop="tubercle2">
                    <el-input v-model="form.tubercle2" type="textarea" placeholder="" :disabled="showDataState" ref="tubercle2"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple" v-if="form.tubercle3 != null">
                  <el-form-item label="" prop="tubercle3">
                    <el-input v-model="form.tubercle3" type="textarea" placeholder="" :disabled="showDataState" ref="tubercle3"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple" v-if="form.tubercle4 != null">
                  <el-form-item label="" prop="tubercle4">
                    <el-input v-model="form.tubercle4" type="textarea" placeholder="" :disabled="showDataState" ref="tubercle4"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple" v-if="form.tubercle5 != null">
                  <el-form-item label="" prop="tubercle5">
                    <el-input v-model="form.tubercle5" type="textarea" placeholder="" :disabled="showDataState" ref="tubercle5"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple" v-if="form.tubercle6 != null">
                  <el-form-item label="" prop="tubercle6">
                    <el-input v-model="form.tubercle6" type="textarea" placeholder="" :disabled="showDataState" ref="tubercle6"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 异常情况 -->
          <div class="anomalous">
            <el-row v-if="form.anomalousEvent">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="" prop="anomalousEvent">
                    <el-input
                      type="textarea"
                      ref="anomalousEvent"
                      :autosize="{ minRows: 2, maxRows: 14}"
                      placeholder="请输入内容"
                      :disabled="showDataState"
                      resize="none"
                      v-model="form.anomalousEvent">
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="form.unanomalousEvent">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <el-form-item label="" prop="unanomalousEvent">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 14}"
                      placeholder="请输入内容"
                      :disabled="showDataState"
                      resize="none"
                      v-model="form.unanomalousEvent">
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <h4 style="margin:20px 0 10px 0;">影像学诊断：</h4>
                <el-form-item label="" prop="imagingDiagnosis">
                  <el-input
                    type="textarea"
                    ref="imagingDiagnosis"
                    :autosize="{ minRows: 2, maxRows: 14}"
                    placeholder="请输入内容"
                    :disabled="showDataState"
                    v-model="form.imagingDiagnosis">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
            <!-- <el-col :span="24" v-if="$route.query.meetingResultStatus == 1 || $route.query.meetingStatus == 1 ||$route.query.flag == 2" >
              <div class="grid-content bg-purple" v-if="button != 2">
                <el-form-item label="会诊意见：" prop="meetingOpinion">
                  <el-input
                    type="textarea"
                    ref="meetingOpinion"
                    :autosize="{ minRows: 2, maxRows: 14}"
                    placeholder="请输入内容"
                    :disabled="showDataState"
                    v-model="form.meetingOpinion">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="24" v-if="$route.query.flag == 2" >
              <div class="grid-content bg-purple">
                <el-form-item label="会诊意见：" prop="meetingOpinion">
                  <el-input
                    type="textarea"
                    ref="meetingOpinion"
                    :autosize="{ minRows: 2, maxRows: 14}"
                    placeholder="请输入内容"
                    :disabled="showDataState"
                    v-model="form.meetingOpinion">
                  </el-input>
                </el-form-item>
              </div>
            </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报告医师：" prop="reportDoctor">
              <el-input style="width:200px;"
                :disabled="showDataState"
                v-model="form.reportDoctor">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核医师：" prop="examineDoctor">
              <el-input
                style="width:200px;"
                :disabled="showDataState"
                v-model="form.examineDoctor">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-form-item style="margin-top: 20px;margin-bottom: 20px;text-align: center;" v-if="!showDataState">
            <el-button type="primary" @click="submit('form')" v-dbClick>保存</el-button>
            <el-button @click="goBack()">返回</el-button>
          </el-form-item>
        </div>
        
      </el-form>
    </div>
  </div>
</template>
<script>
import mixin from '@/mixins/mixins';
  export default{
    mixins: [ mixin ],
    props:[
      "id",
      "type",
      "button"
    ],
    name: 'informing',
    filters:{
        msg: function(msg) {
            return msg && msg.replace(/\n/g, "<br>").replace(/\r/g, "<br>") ;
        }
      },
    data() {
      return {
        CTexaminationReport_page: false,
        date: '',
        tableTubercleList: [],
        //表单数据
        form: {
          meetingOpinion:'',
          hosPersonInfoPO:{},
          reportDate:'',
          flabImageDeep:'',
          flabImageShallow:'',
          imagingDiagnosis:'',
          anomalousEvent:'',
          tubercle1:'',
          tubercle2:'',
          tubercle3:'',
          tubercle4:'',
          tubercle5:'',
          tubercle6:'',
          reportDoctor:'',
          examineDoctor:'',
        },
        rules:{
          reportDate: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          imagingDiagnosis: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          anomalousEvent: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          unanomalousEvent: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle1: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle2: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle3: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle4: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle5: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle6: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle7: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle8: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle9: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          tubercle10: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          meetingOpinion: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          reportDoctor: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
          examineDoctor: [
            {required: true, message: '必填', trigger: 'blur'},
          ],
        },
        showDataState: false,
      }
    },
    watch: {
      type: function(val) {
        if(val == 1){
          this.showDataState = false
        }else if(val == 2){
          this.showDataState = true
        }
      },
    },
    created(){
      if(this.type == 1){
        this.showDataState = false
      }else if(this.type == 2){
        this.showDataState = true
      }
      this.getCTReport(this.$route.query.reportId)
    },
    methods: {
      printContent: function (element) {
        let subOutputRankPrint = document.getElementById(element);
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
      //根据id查看受试者ct报告
      getCTReport(id){
        this.$axios_http({
          url: "/base/ct/select/newReport",
          data: {
            id: id,
          },
          vueObj: this
        }).then((res) => {
          this.form = res.data.result
          this.form.reportDate = this.getDate(this.form.reportDate)
          this.form.checkTime = this.getDate(this.form.checkTime)
        })

      },
      buttonChange(value){
         if(value == 2){
           this.getCTReport(this.$route.query.areaId)
         } else {
           this.getCTReport(this.$route.query.id)
         }
      },
      //保存ct报告
      submit(formName){
        this.$refs[formName].validate((valid, obj) => {
          if (!valid) {
            for (var item in obj) {
              if (this.$refs[item].focus) {
                this.$refs[item].focus();
              } else {
                this.$refs[item].$el.focus();
              }
              break;
            }

          }
          if (valid) {
            // if (this.$store.state.hospitalType == 3) {
            //   this.form.type = 2   筛查机构
            // } else if (this.$store.state.hospitalType == 1) {
            //   this.form.type = 1   国家
            // }
            this.form.id = this.id
            this.$axios_http({
              url: "/base/ct/saveOrUpdateNewReport",
              data: Object.assign({}, this.form , {inputStatus: 1, checkInfoId: this.$route.query.id, id: this.$route.query.reportId}),
              vueObj: this
            }).then((res) => {
              if(res.data.status=="SUCCESS"){
                this.$message({
                  type:'success',
                  message: "保存成功"
                })
                this.$router.push({path: '/cancer/lunglist'})
              }
            })
          }
        });


      },
      //入组时间
      getDate(value){
        if (value != '' && value != null && value != undefined) {
          var value = new Date(value)
          return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        }
        return value
      },
    }

  }
</script>

<style scoped>
  #ctExaminationReport {
    background: #fff;
    padding-bottom: 20px;
  }

  .title {
    margin-bottom: 20px;
    text-align: center;
  }

  .ctExaminationReport-content {
    margin: auto;
    padding-top: 20px;
  }

  .weight-font {
    font-weight: 600;
  }

  .tubercle-content {
    margin-top: 20px;
  }
  .booking-list1 {
    font-size:14px;
    margin: 40px auto;
    width: 100%;
  }
  .booking-list1-item {
    height: 40px;
    /*line-height: 40px;*/
  }

  .anomalous{
    border:1px solid #dcdfe6;
    border-radius: 4px;
    min-height: 60px;
  }
  .anomalousEvent{
    margin-top: 10px;
  }
  #print{
    margin:auto;
    /* display: none; */
  }
  #print h3 {
    text-align: center;
  }
  .print {
    float: right;
  }
  .form-body{
    max-width: 1200px;
    margin:40px auto;
    /*border:1px solid #e5e5e5;*/
    padding:20px;
  }
</style>
<style>
  .content-page .el-textarea.is-disabled .el-textarea__inner{
    background: #fff;
    color: #000!important;
  }
  .content-page .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    color: #000;
  }
  .content-page .anomalous .el-textarea__inner{
    border-color:#fff !important;
  }
</style>
