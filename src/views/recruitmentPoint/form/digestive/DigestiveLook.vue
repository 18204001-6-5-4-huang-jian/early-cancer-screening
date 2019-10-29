<template>
<div>
  <div class="reportBox j_content">
    <cancer-widget>
      <h1>上消化道内镜检查记录表</h1>
      <el-form>
        <el-row>
          <el-col :span="6">
            <el-form-item label="SID/问卷ID：">
              {{personDetail.surverId}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="筛查ID：">
              {{$route.query.screeningId}}
            </el-form-item>
          </el-col>
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
        </el-row>
        <el-row>
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
          <el-col :span="6">
            <el-form-item label="联系电话：">
              {{personDetail.phone}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="评估日期：">
                  {{personDetail.evaluateDate | dateFilter}}
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="formData" :rules="formDataRules" ref="formData">
        <h2>观察记录</h2>
        <el-row>
          <el-form-item label="1. 食管及贲门是否有异常病变：" prop="item1">
            <el-radio-group disabled v-model="formData.item1">
              <el-radio :label="1">1.有</el-radio>
              <el-radio :label="2">2.无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="1. 胃部是否有异常病变：" prop="item2">
            <el-radio-group disabled v-model="formData.item2">
              <el-radio :label="1">1.有</el-radio>
              <el-radio :label="2">2.无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <div v-for="x,index in formData.hosSxhdEsophagusInfoPOS">
          <h2>食管及贲门病变记录</h2>
          <!-- <div class="add-tuber">
            <el-button @click="pushEsophagus()"  type="text">添加</el-button>
            <el-button @click="deleteEsophagus(index)" type="text" :disabled="index<1">删除</el-button>
          </div> -->
            <el-form  :inline="true" :model="x" :ref="'esophagusInfo'+index" :rules="esophagusRules">
              <el-row>
                <el-form-item label="1. 选择部位：" prop="item1">
                  <el-radio-group :disabled="true" v-model="x.item1">
                    <el-radio :label="1">1，食道</el-radio>
                    <el-radio :label="2">2，贲门</el-radio>
                    <el-radio :label="3">3，其他</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="2. 距离（厘米）：" prop="item3">
                    <el-input :disabled="true" v-model.trim="x.item3" size="mini"></el-input>
                  </el-form-item>
                  <el-form-item label="至：">
                  </el-form-item>
                  <el-form-item label="" prop="item3A">
                    <el-input :disabled="true" v-model.trim="x.item3A" size="mini"></el-input>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="3. 点位为（点）：" prop="item4">
                    <el-input :disabled="true" v-model.trim="x.item4" size="mini"></el-input>
                  </el-form-item>
                  <el-form-item label="至：">
                  </el-form-item>
                  <el-form-item label="" prop="item4A">
                    <el-input :disabled="true" v-model.trim="x.item4A" size="mini"></el-input>
                  </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="4. 病变分类："  class="blockTit" prop="item5Array">
                  <el-checkbox-group :disabled="true" v-model="x.item5Array">
                    <el-checkbox label="1">1，红区</el-checkbox>
                    <el-checkbox label="2">2，白区</el-checkbox>
                    <el-checkbox label="3">3，黏膜增厚和透明度改变</el-checkbox>
                    <el-checkbox label="4">4，血管网结构改变</el-checkbox>
                    <el-checkbox label="5">5，糜烂</el-checkbox>
                    <el-checkbox label="6">6，斑块</el-checkbox>
                    <el-checkbox label="7">7，粗糙或不规则</el-checkbox>
                    <el-checkbox label="8">8，结节</el-checkbox>
                    <el-checkbox label="9">9，肿物</el-checkbox>
                    <el-checkbox label="10">10，溃疡</el-checkbox>
                    <el-checkbox label="11">11，狭窄</el-checkbox>
                    <el-checkbox label="12">12，充血</el-checkbox>
                    <el-checkbox label="13">13，粗糙</el-checkbox>
                    <el-checkbox label="14">14，颗粒状</el-checkbox>
                    <el-checkbox label="15">15，正常</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="5. 染色观察（染色后表现）：" prop="item6">
                  <el-radio-group :disabled="true" v-model="x.item6">
                    <el-radio :label="0">0，正常着色</el-radio>
                    <el-radio :label="1">1，重度不着色</el-radio>
                    <el-radio :label="2">2，中度不着色</el-radio>
                    <el-radio :label="3">3，轻度不着色</el-radio>
                    <el-radio :label="4">4，未染色</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="6. 取材部位：" prop="item7">
                  <el-input :disabled="true" v-model.trim="x.item7" size="mini"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
        </div>

        <div v-for="x,index in formData.hosSxhdStomachInfoPOS">
          <h2>胃的病变记录</h2>
          <!-- <div class="add-tuber">
            <el-button @click="pushStomach()"  type="text">添加</el-button>
            <el-button @click="deleteStomach(index)" type="text" :disabled="index<1">删除</el-button>
          </div> -->
            <el-form  :inline="true" :model="x" :ref="'stomachInfo'+index" :rules="stomachRules">
              <el-row>
                <el-form-item label="1. 部位：" prop="item1" class="blockTit">
                  <el-radio-group :disabled="true" v-model="x.item1">
                    <el-radio :label="1">1，胃底</el-radio>
                    <el-radio :label="2">2，胃体前壁</el-radio>
                    <el-radio :label="3">3，胃体后壁</el-radio>
                    <el-radio :label="4">4，胃体小弯</el-radio>
                    <el-radio :label="5">5，胃体大弯</el-radio>
                    <el-radio :label="6">6，胃角</el-radio>
                    <el-radio :label="7">7，胃窦前壁</el-radio>
                    <el-radio :label="8">8，胃窦后壁</el-radio>
                    <el-radio :label="9">9，胃窦小弯</el-radio>
                    <el-radio :label="10">10，胃窦大弯</el-radio>
                    <el-radio :label="11">11，幽门</el-radio>
                    <el-radio :label="13">12，胃窦</el-radio>
                    <el-radio :label="14">13，胃体</el-radio>
                    <el-radio :label="12">14，其他部位</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="2. 距离（厘米）：" prop="item2">
                    <el-input :disabled="true" v-model.trim="x.item2" size="mini"></el-input>
                  </el-form-item>
                  <el-form-item label="至：">
                  </el-form-item>
                  <el-form-item label="" prop="item2A">
                    <el-input :disabled="true" v-model.trim="x.item2A" size="mini"></el-input>
                  </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="3. 病变分类："  class="blockTit" prop="item3Array">
                  <el-checkbox-group :disabled="true" v-model="x.item3Array">
                    <el-checkbox label="1">1，肿瘤</el-checkbox>
                    <el-checkbox label="2">2，息肉</el-checkbox>
                    <el-checkbox label="3">3，溃疡</el-checkbox>
                    <el-checkbox label="4">4，充血</el-checkbox>
                    <el-checkbox label="5">5，花斑</el-checkbox>
                    <el-checkbox label="6">6，淤点</el-checkbox>
                    <el-checkbox label="7">7，黏液</el-checkbox>
                    <el-checkbox label="8">8，水肿</el-checkbox>
                    <el-checkbox label="9">9，颗粒</el-checkbox>
                    <el-checkbox label="10">10，结节</el-checkbox>
                    <el-checkbox label="11">11，血管</el-checkbox>
                    <el-checkbox label="12">12，糜烂</el-checkbox>
                    <el-checkbox label="13">13，出血</el-checkbox>
                    <el-checkbox label="14">14，正常</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="4. 染色观察（靛胭脂染色后表现）：" prop="item4">
                  <el-radio-group :disabled="true" v-model="x.item4">
                    <el-radio :label="0">0，正常着色</el-radio>
                    <el-radio :label="1">1，着色略不均匀,分界模糊</el-radio>
                    <el-radio :label="2">2，介于1和3之间</el-radio>
                    <el-radio :label="3">3，着色不均匀，分界清晰</el-radio>
                    <el-radio :label="4">4，未染色</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="5. 取材部位：" prop="item5">
                  <el-input :disabled="true" v-model.trim="x.item5" size="mini"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
        </div>
        <h2>病理</h2>
        <el-row>
          <el-form-item label="1. 是否有病理诊断？ " prop="isPathology" class="blockTit">
            <el-radio-group :disabled="true" v-model="formData.isPathology">
              <el-radio :label="0">0，无</el-radio>
              <el-radio :label="1">1，有</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <h2>诊断</h2>
        <el-row>
          <el-form-item label="1. 内镜下诊断： " prop="endoscopicDiagnosis">
            <el-input :disabled="true" type="textarea" v-model.trim="formData.endoscopicDiagnosis" size="mini" maxlength="100" style="width: 95%;min-width: 500px;margin-left:25px;"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="2. 诊断医生： " prop="diagnosisDoctor">
              <el-input :disabled="true" v-model.trim="formData.diagnosisDoctor" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="3. 诊断日期：" prop="diagnosisDate">
              <el-date-picker
                      type="date"
                      :disabled="true"
                      :clearable="false"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      size="mini"
                      v-model="formData.diagnosisDate"
                      :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <h2>会诊</h2>
          <el-row>
            <el-form-item label="1. 是否需要国家癌症中心会诊？ " prop="isMeeting">
              <el-radio-group disabled v-model="formData.isMeeting">
                <el-radio :label="1">1.否</el-radio>
                <el-radio :label="2">2.是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
        <h2>填表信息</h2>
        <el-row>
            <el-col :span="12">
                <el-form-item label="填表人员:" prop="inputUser" >
                    <el-input :disabled="true" size="mini"  v-model="formData.inputUser"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="录入时间：" prop="inputTime">
                <el-date-picker
                        type="date"
                        :disabled="true"
                        :clearable="false"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp"
                        size="mini"
                        v-model="formData.inputTime">
                </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <!-- <el-button type="primary"  @click="submitForm(3)" size="small">保存草稿</el-button>   
      <el-button type="primary"  @click="submitForm(1)" size="small">提交</el-button>  -->
      <div class="btns" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
        <router-link v-if="$route.query.source!='gj' && $route.query.reportInputStatus!=1" :to="{path:'/form/digestiveentry',query:{
          screeningId:$route.query.screeningId,
          id:$route.query.id,
          surverId:$route.query.surverId,
          personId:$route.query.personId,
          resultFormId:$route.query.resultFormId,
          signedDate:$route.query.signedDate,
          source:'look'
          }}">
          <el-button type="primary">编辑</el-button>
        </router-link>
      </div>
    </cancer-widget>
   </div>
  </div>
</template>

<script>
var signedDate='';
  import VALIDATE from '@/utils/validate'
  import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
  import { sexFilter } from '@/filters/filter'
  export default {
    mixins: [ getPersonDetail ],
    data() {
      return {
          pickerOptions:{
            disabledDate(time) {
              return time.getTime() > Date.now() || (signedDate-24*60*60*1000) > time.getTime();
            }
          },
          personDetail:{},    //用户基本信息
          checkDate:new Date(),
          deptName:sessionStorage.getItem('deptName'),    //检查医院
          formData:{
            checkInfoId:Number(this.$route.query.id),
            isPathology:null,
            endoscopicDiagnosis:null,
            diagnosisDoctor:null,
            diagnosisDate:null,
            inputUser:sessionStorage.getItem('trueName'),
            inputTime: new Date(), 
            isMeeting:1,
            hosSxhdEsophagusInfoPOS:[{
              item1:null,
              item3:null,
              item3A:null,
              item4:null,
              item4A:null,
              item5Array:[],
              item5:null,
              item6:null,
              item7:null
            }],
            hosSxhdStomachInfoPOS:[{
              item1:null,
              item2:null,
              item2A:null,
              item3Array:[],
              item3:null,
              item4:null,
              item5:null
            }]
          },
          formDataRules:{
             endoscopicDiagnosis:[
                  { required: true, message: '必填', trigger: 'blur' },
                  // { trigger: 'blur', validator: VALIDATE.checkFontH}
              ],
              isPathology:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              diagnosisDoctor:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              diagnosisDate:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              isMeeting: [{ required: true, message: '必填', trigger: 'change' }],
          },
          //验证规则
          esophagusRules:{
              item1:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item3:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat0100}
              ],
              item3A:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat0100}
              ],
              item4:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countInit12}
              ],
              item4A:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countInit12}
              ],
              item5Array:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item6:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countInit20}
              ]
          },
          stomachRules:{
              item1:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item2:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat0100}
              ],
              item2A:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat0100}
              ],
              item3Array:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item4:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item5:[
                  { required: true, message: '必填', trigger: 'blur' },
                   { trigger: 'blur', validator: VALIDATE.countInit20}
              ]
          },
      };
    },
    created(){
      signedDate=this.$route.query.signedDate
        this.getPersonDetailFun(this.$route.query.personId,this.$route.query.surverId);
        if(this.$route.query.resultFormId){
          this.getResultInfo();
        }
    },
    mounted(){

    },
    methods: {
        //提交表单
        submitForm(type,flag) {
            let validd = true;
        this.formData.hosSxhdEsophagusInfoPOS.filter( item => {
          if(typeof item.item5Array=="object" && item.item5Array.length>0){
            item.item5 = item.item5Array.join(',')
          }
        })
        this.formData.hosSxhdStomachInfoPOS.filter( item => {
          if(typeof item.item3Array=="object" && item.item3Array.length>0){
            item.item3 = item.item3Array.join(',')
          }
        })
        // 保存草稿传id
        // if(this.$route.query.resultFormId){
        //   this.hosGaResultInfoPO.id=Number(this.$route.query.resultFormId);
        // }
        this.formData.inputStatus=type;
        let _formData=this.formData;
          if(type==1){
            // 提交
            this.$refs.formData.validate((valid,obj) => {
              if(!valid){
                 validd = false
              }
              // 食管校验判断
              if(this.formData.hosSxhdEsophagusInfoPOS.length>0){
                for(var i=0;i<this.formData.hosSxhdEsophagusInfoPOS.length;i++){
                  this.$refs['esophagusInfo'+i][0].validate((valid) => {
                    if (!valid){
                      validd = false
                    }
                  })
                }
              }
              // 胃校验判断
              if(this.formData.hosSxhdStomachInfoPOS.length>0){
                for(var i=0;i<this.formData.hosSxhdStomachInfoPOS.length;i++){
                  this.$refs['stomachInfo'+i][0].validate((valid) => {
                    if (!valid){
                      validd = false
                    }
                  })
                }
              }
              // 全部通过提交
              if(validd){
                this.submitGanResult(type,flag,_formData);
              }
          })

          }else if(type==3){
            // 保存草稿
            this.submitGanResult(type,flag,_formData);
          }
            
        },
        submitGanResult(type,flag,formData){
          this.$axios_http({
            url: '/base/sxhd/add/result',
            data: formData,
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              if(type==3){
                this.formData.id=res.data.result;
              }
              if(type==1){
                this.$router.go(-1);
              }
            }
          })
        },
        //添加食管
        pushEsophagus(){
            let obj = {
              item1:null,
              item2:null,
              item3:null,
              item3A:null,
              item4:null,
              item4A:null,
              item5Array:[],
              item5:null,
              item6:null,
              item7:null       
          }
            this.formData.hosSxhdEsophagusInfoPOS.push(obj)
        },
        //添加胃
        pushStomach(){
            let obj = {
              item1:null,
              item2:null,
              item2A:null,
              item3Array:[],
              item3:null,
              item4:null,
              item5:null    
          }
            this.formData.hosSxhdStomachInfoPOS.push(obj)
        },
        //删除食管
        deleteEsophagus(index){
            this.formData.hosSxhdEsophagusInfoPOS.splice(index,1)
        },
        //删除胃
        deleteStomach(index){
            this.formData.hosSxhdStomachInfoPOS.splice(index,1)
        },

          //  查询结果
      getResultInfo(){
          this.$axios_http({
            url: '/base/sxhd/find/result/'+this.$route.query.resultFormId,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              let result=res.data.result;
              // 处理食管病变
              result.hosSxhdEsophagusInfoPOS.filter( item => {
                if(!item.item5){
                  item.item5Array = new Array();
                }else if(item.item5 && typeof item.item5=='string'){
                  item.item5Array=item.item5.split(',')
                }
              })
              // 处理胃病变
              result.hosSxhdStomachInfoPOS.filter( item => {
                if(!item.item3){
                  item.item3Array = new Array();
                }else if(item.item3 && typeof item.item3=='string'){
                  item.item3Array=item.item3.split(',')
                }
              })
              // 处理时间
              result.diagnosisDate=new Date(result.diagnosisDate)
              this.formData=result;
            }
          })
      }

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
  .add-tuber{
    text-align: right;
    position: relative;
    top:-45px;
    float: right;
  }
  .blockTit .el-radio{
    height: 40px;
  }
</style>
<style>
  .el-form-item__error{
    position: relative!important;
  }
   .j_content .el-radio__input.is-disabled.is-checked+span.el-radio__label {
    color: #409EFF;
  }
  .j_content .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .j_content .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #f5f7fa;
  }
  .j_content .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
  .j_content .el-input.is-disabled.grayInput .el-input__inner{
    background:#ededed;
  }
  .j_content .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
  .j_content .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
    color: #409EFF;
    cursor: not-allowed;
  }
  .j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }
  .reportBox .el-checkbox,.reportBox .el-radio{
    margin-left: 0;
    margin-right: 30px;
  }
</style>