<template>
  <div class="reportBox">
    <cancer-widget>
      <h1>上消化道病理诊断表</h1>
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
        <div v-for="x,index in formData.hosSxhdPathologyRecordPOS">
          <h2>病理诊断表</h2>
          <div class="add-tuber">
            <el-button @click="pushSxhdPathology()"  type="text">添加</el-button>
            <el-button @click="deleteSxhdPathology(index)" type="text" :disabled="index<1">删除</el-button>
          </div>
          <el-form  :inline="true" :model="x" :ref="'sxhdPathology'+index" :rules="sxhdPathologyRules">
              <el-row>
                <el-form-item label="1. 病理部位：" prop="pathologyType">
                  <el-radio-group v-model="x.pathologyType" @change="clearItem(x)">
                    <el-radio :label="1">1.胃</el-radio>
                    <el-radio :label="2">2.食管</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row v-if="x.pathologyType==2">
                  <el-form-item label="1.1. 距食管活检位置（厘米）：" prop="item3A">
                    <el-input v-model.trim="x.item3A" v-numberInt:2="x.item3A" size="mini"></el-input>
                  </el-form-item>
                  <el-form-item label="至：">
                  </el-form-item>
                  <el-form-item label="" prop="item3B">
                    <el-input v-model.trim="x.item3B" size="mini"  v-numberInt:2="x.item3B"></el-input>
                  </el-form-item>
              </el-row>
              <el-row v-if="x.pathologyType==2">
                  <el-form-item label="1.2. 食管活检位置点位：" prop="item4A">
                    <el-input v-model.trim="x.item4A" size="mini"></el-input>
                  </el-form-item>
                  <el-form-item label="至：">
                  </el-form-item>
                  <el-form-item label="" prop="item4B">
                    <el-input v-model.trim="x.item4B" size="mini"></el-input>
                  </el-form-item>
              </el-row>
              <el-row v-if="x.pathologyType==1">
                <el-form-item label="1.1. 胃活检部位：" prop="item5">
                  <el-select size="small" v-model="x.item5" placeholder="请选择">
                    <el-option label="5.贲门" value="5"></el-option>
                    <el-option label="6.胃底" value="6"></el-option>
                    <el-option label="7.胃体前壁" value="7"></el-option>
                    <el-option label="8.胃体后壁" value="8"></el-option>
                    <el-option label="9.胃体小弯" value="9"></el-option>
                    <el-option label="10.胃体大弯" value="10"></el-option>
                    <el-option label="11.胃角" value="11"></el-option>
                    <el-option label="12.胃窦前壁" value="12"></el-option>
                    <el-option label="13.胃窦后壁" value="13"></el-option>
                    <el-option label="14.胃窦小弯" value="14"></el-option>
                    <el-option label="15.胃窦大弯" value="15"></el-option>
                    <el-option label="16.幽门" value="16"></el-option>
                    <el-option label="17.胃窦" value="17"></el-option>
                    <el-option label="18.胃体" value="18"></el-option>
                    <el-option label="其它部位" value="OTHER"></el-option>
                  </el-select>
                  <!-- <el-input v-model.trim="x.item5" size="mini" maxlength="10"></el-input> -->
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="2. 病理号：" prop="item1">
                  <el-input v-model.trim="x.item1" size="mini" maxlength="15"></el-input>
                </el-form-item>
              </el-row>

              <div>
                <el-row>
                  <el-form-item label="3. 标本号：" prop="item2" class="text-indent">
                    <el-input v-model.trim="x.item2" size="mini" maxlength="3"></el-input>
                  </el-form-item>
                </el-row>
                
                <el-row>
                  <el-form-item label="4. 固有膜：" prop="item6" class="text-indent">
                    <el-radio-group v-model="x.item6">
                      <el-radio :label="0">0.无</el-radio>
                      <el-radio :label="1">1.有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>
              </div>
              
              <el-row>
                <el-form-item label="5. 病理诊断："  class="blockTit" prop="item7Array">
                  <el-checkbox-group v-model="x.item7Array" @change="item7ArrayChange">
                    <el-checkbox label="01">01.正常鳞状上皮</el-checkbox>
                    <el-checkbox label="04">04.基底细胞增生</el-checkbox>
                    <el-checkbox label="05">05.轻度食管炎</el-checkbox>
                    <el-checkbox label="06">06.中度食管炎</el-checkbox>
                    <el-checkbox label="07">07.重度食管炎</el-checkbox>
                    <el-checkbox label="08">08.鳞状上皮低级别上皮内瘤变</el-checkbox>
                    <el-checkbox label="10">10.鳞状上皮高级别上皮内瘤变</el-checkbox>
                    <el-checkbox label="11">11.鳞状上皮上皮内瘤变不能分类(NOS)</el-checkbox>
                    <el-checkbox label="13">13.鳞状上皮高级别上皮内瘤变可疑浸润</el-checkbox>
                    <el-checkbox label="14">14.黏膜内鳞状细胞癌</el-checkbox>
                    <el-checkbox label="15">15.浸润性鳞状细胞癌</el-checkbox>
                    <el-checkbox label="16">16.正常腺上皮</el-checkbox>
                    <el-checkbox label="17">17.非萎缩性胃炎</el-checkbox>
                    <el-checkbox label="18">18.萎缩性胃炎</el-checkbox>
                    <el-checkbox label="19">19.不确定的腺上皮上皮内瘤变</el-checkbox>
                    <el-checkbox label="20">20.腺上皮低级别上皮内瘤变</el-checkbox>
                    <el-checkbox label="21">21.腺上皮高级别上皮内瘤变</el-checkbox>
                    <el-checkbox label="22">22.腺上皮黏膜内腺癌</el-checkbox>
                    <el-checkbox label="23">23.浸润性腺癌</el-checkbox>
                    <el-checkbox label="24">24.腺癌不能分类（NOS）</el-checkbox>
                    <el-checkbox label="25">25.腺鳞癌</el-checkbox>
                    <el-checkbox label="26">26.其他</el-checkbox>
                    <el-checkbox label="99">99.不足以作诊断</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
              <div v-if="x.pathologyType==2">
                <el-row>
                  <el-form-item label="6. 食管炎诊断依据：" prop="item8" class="blockTit" :ref="`item8_${index}`"
                    :rules="(x.item7Array.includes('05') || x.item7Array.includes('06') || x.item7Array.includes('07')) ? sxhdPathologyRules.item8:[]">
                    <el-radio-group v-model="x.item8">
                      <el-radio :label="1">1.乳头高度占上皮层厚度2/3以上</el-radio>
                      <el-radio :label="2">2.基底细胞层占上皮层厚度15%以上</el-radio>
                      <el-radio :label="3">3.上皮内中性粒细胞浸润</el-radio>
                      <el-radio :label="4">4.上皮内嗜酸性细胞浸润</el-radio>
                      <el-radio :label="5">5.上皮内灶性淋巴细胞浸润</el-radio>
                      <el-radio :label="6">6.固有层内中性粒细胞浸润</el-radio>
                      <el-radio :label="7">7.固有层内密集淋巴细胞浸润</el-radio>
                      <el-radio :label="8">8.上皮内弥漫性淋巴细胞浸润</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>
              </div>
              
              <el-row v-if="x.pathologyType==1">
                <el-form-item label="7. 胃炎诊断依据（胃炎类型）：" prop="item9A" :ref="`item9A_${index}`"
                  :rules="(x.item7Array.includes('17') || x.item7Array.includes('18')) ? sxhdPathologyRules.item9A:[]">
                  <el-radio-group v-model="x.item9A">
                    <el-radio :label="0">0.无</el-radio>
                    <el-radio :label="1">1.慢性&nbsp;&nbsp;&nbsp;</el-radio>
                    <el-radio :label="2">2.慢性活动性</el-radio>
                    <el-radio :label="3">3.急性</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row v-if="x.pathologyType==1">
                <el-form-item label="8. 胃炎诊断依据（炎症程度）：" prop="item9B" :ref="`item9B_${index}`"
                  :rules="(x.item7Array.includes('17') || x.item7Array.includes('18')) ? sxhdPathologyRules.item9B:[]">
                  <el-radio-group v-model="x.item9B">
                    <el-radio :label="0">0.无</el-radio>
                    <el-radio :label="1">1.轻度&nbsp;&nbsp;&nbsp;</el-radio>
                    <el-radio :label="2">2.重度</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row v-if="x.pathologyType==1">
                <el-form-item label="9. 胃炎诊断依据（炎症深度）：" prop="item9C" :ref="`item9C_${index}`"
                  :rules="(x.item7Array.includes('17') || x.item7Array.includes('18')) ? sxhdPathologyRules.item9C:[]">
                  <el-radio-group v-model="x.item9C">
                    <el-radio :label="0">0.无</el-radio>
                    <el-radio :label="1">1.浅表层</el-radio>
                    <el-radio :label="2">2.全层</el-radio>
                    <el-radio :label="3">3.不确定</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row v-if="x.pathologyType==1">
                <el-form-item label="10. 胃炎诊断依据（萎缩）：" prop="item9D" label-width="220px" :ref="`item9D_${index}`"
                  :rules="(x.item7Array.includes('17') || x.item7Array.includes('18')) ? sxhdPathologyRules.item9D:[]">
                  <el-radio-group v-model="x.item9D">
                    <el-radio :label="0">0.无</el-radio>
                    <el-radio :label="1">1.有</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row v-if="x.pathologyType==1">
                <el-form-item label="11. 胃炎诊断依据（化生）：" prop="item9E" label-width="220px"  :ref="`item9E_${index}`"
                  :rules="(x.item7Array.includes('17') || x.item7Array.includes('18')) ? sxhdPathologyRules.item9E:[]">
                  <el-radio-group v-model="x.item9E">
                    <el-radio :label="0">0.无</el-radio>
                    <el-radio :label="1">1.肠上皮化生</el-radio>
                    <el-radio :label="2">2.假幽门腺化生</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="12. 备注： " prop="desc" class="blockTit text-indent" >
                  <el-input type="textarea" v-model="x.desc" size="mini" maxlength="20" style="width: 100%;min-width: 500px;margin-left:35px;"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
          <div>
            <h2>诊断</h2>
              <el-row>
                <el-col :span="12">
                    <el-form-item label="1. 诊断医生： " prop="diagnosisDoctor">
                      <el-input v-model.trim="formData.diagnosisDoctor" size="mini" maxlength="20"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="2. 诊断日期：" prop="diagnosisDate">
                      <el-date-picker
                              type="date"
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
              <h2>填表信息</h2>
              <el-row>
                <el-col :span="12">
                    <el-form-item label="填表人员:" prop="inputUser" >
                        <el-input size="mini"  v-model="formData.inputUser"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="录入时间：" prop="inputTime">
                    <el-date-picker
                            type="date"
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
          </div>
      </el-form>
      <!-- <el-button type="primary"  @click="submitForm(3)" size="small">保存草稿</el-button>    -->
      <div class="btns" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
        <el-button type="primary"  @click="submitForm(1)" v-dbClick>提交</el-button> 
      </div>
      <!-- <div class="tipsBlock">
        <p class="red">填写说明：</p>
        <p>1.本表仅供有病理诊断者填写.每个筛查对象单独填写一页此表；</p>
        <p>2.本表中“筛查ID”与“姓名”必须与上消化道内镜检查记录表中一致；</p>
        <p>3.“病理号”为本医院原有标本病理编号；</p>
        <p>4.“胃活检部位”直接填写文字；</p>
        <p>5.“病理诊断”可填写多个编码.编码间以分号间隔；</p>
        <p>6. 食管癌前病变指发生在食管的鳞状上皮上皮内瘤变或腺上皮上皮内瘤变；</p>
        <p>7. 胃癌前病变指发生在胃部的腺上皮上皮内瘤变；</p>
        <p>8. 食管癌指发生在食管的鳞状细胞癌、腺癌或其他恶性肿瘤；</p>
        <p>9. 胃癌指发生在胃部的腺癌或其他恶性肿瘤；</p>
        <p>10.“鳞状上皮上皮内瘤变”的定义：病理诊断编码为08/10/11/13（09、12取消.详见编码说明）；</p>
        <p>11.“腺上皮上皮内瘤变”的定义：病理诊断编码为20/21；</p>
        <p>12.“鳞状细胞癌”的定义：病理诊断编码为14/15；</p>
        <p>13.“腺癌”的定义：病理诊断编码为22/23/24。</p>
        <p>14.“其他恶性肿瘤”的定义：病理诊断编码为25/26（需注明）。</p>
      </div> -->
    </cancer-widget>
   </div>
</template>

<script>
var signedDate='';
  import VALIDATE from '@/utils/validate'
  import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
  import { sexFilter } from '@/filters/filter'
  import mixins from '@/mixins/mixins'
  export default {
    mixins: [ getPersonDetail, mixins ],
    data() {
      return {
          pickerOptions:{
            disabledDate(time) {
              // return time.getTime() > Date.now() || (signedDate-24*60*60*1000) > time.getTime();
              // 2019/8/30晓丹要求改成当天以前的限制
              return time.getTime() > Date.now();
            }
          },
          personDetail:{},    //用户基本信息
          checkDate:new Date(),
          deptName:sessionStorage.getItem('deptName'),    //检查医院
          formData:{
            checkInfoId:Number(this.$route.query.id),
            diagnosisDoctor:null,
            diagnosisDate:new Date(),
            inputUser:sessionStorage.getItem('trueName'),
            inputTime:new Date(),
            hosSxhdPathologyRecordPOS:[{
              sort:null,
              pathologyType:null,
              item1:null,
              item2:null,
              item3A:null,
              item3B:null,
              item4A:null,
              item4B:null,
              item5:null,
              item6:null,
              item7Array:[],
              item7:null,
              item8:null,
              item9A:null,
              item9B:null,
              item9C:null,
              item9D:null,
              item9E:null,
              desc:null
            }]
          },
          formDataRules:{
              diagnosisDoctor:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              diagnosisDate:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
          },
          //验证规则
          sxhdPathologyRules:{
              pathologyType:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item1:[
                { required: true, message: '必填', trigger: 'blur' },
              ],
              item3A:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.add0100}
              ],
              item3B:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.add0100}
              ],
              item4A:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countInit012}
              ],
              item4B:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countInit012}
              ],
              item5:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7Array:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item8:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item9A:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item9B:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item9C:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item9D:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item9E:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
          }
      };
    },
    created(){
      signedDate=this.$route.query.signedDate
      this.getPersonDetailFun(this.$route.query.personId,this.$route.query.surverId);
      if(this.$route.query.pathologyId){
        this.getResultInfo();
      }else{
        //录入查询上消表单对应题目值
        this.queryPathologyInfo()
      }
    },
    mounted(){

    },
    methods: {
        //提交表单
        submitForm(type,flag) {
            let validd = true;
        this.formData.hosSxhdPathologyRecordPOS.filter( (item,i) => {
          if(typeof item.item7Array=="object" && item.item7Array.length>0){
            item.item7 = this.sortArray(item.item7Array).join(',')
          }
          item.sort = i;
        })
        this.formData.inputStatus=type;
        let _formData=this.formData;
          if(type==1){
            // 提交
            this.$refs.formData.validate((valid,obj) => {
              if(!valid){
                 validd = false
              }
              // 校验判断
              if(this.formData.hosSxhdPathologyRecordPOS.length>0){
                for(var i=0;i<this.formData.hosSxhdPathologyRecordPOS.length;i++){
                  this.$refs['sxhdPathology'+i][0].validate((valid) => {
                    if (!valid){
                      validd = false
                    }
                  })
                }
              }
              // 全部通过提交
              if(validd){
                this.submitResult(type,flag,_formData);
              }
          })

          }
            
        },
        submitResult(type,flag,formData){
          this.$axios_http({
            url: '/base/sxhd/add/pathology/result',
            data: formData,
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.$router.push('/cancer/digestivelist')
            }
          })
        },
        //添加
        pushSxhdPathology(){
            let obj = {
              pathologyType:null,
              item1:null,
              item2:null,
              item3A:null,
              item3B:null,
              item4A:null,
              item4B:null,
              item5:null,
              item6:null,
              item7Array:[],
              item7:null,
              item8:null,
              item9A:null,
              item9B:null,
              item9C:null,
              item9D:null,
              item9E:null,
              desc:null
            }
            this.formData.hosSxhdPathologyRecordPOS.push(obj)
        },
        //删除
        deleteSxhdPathology(index){
            this.formData.hosSxhdPathologyRecordPOS.splice(index,1)
        },
            //  查询结果
      getResultInfo(){
          this.$axios_http({
            url: '/base/sxhd/find/pathology/result/'+this.$route.query.pathologyId,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              let result=res.data.result;
              // 处理诊断信息
              result.hosSxhdPathologyRecordPOS.filter( item => {
                if(!item.item7){
                  item.item7Array = new Array();
                }else if(item.item7 && typeof item.item7=='string'){
                  item.item7Array=item.item7.split(',')
                }
              })
              // 处理时间
              result.diagnosisDate=new Date(result.diagnosisDate)
              this.formData=result;
            }
          })
      },
      // 查询病理关联的题
      queryPathologyInfo(){
          this.$axios_http({
            url: '/base/sxhd/find/pathologyInfo',
            data: {
              id: this.$route.query.resultFormId
            },
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              let $esophagusList = [...res.data.result.esophagusList,...res.data.result.stomachList]
              $esophagusList.filter( item => {
                if(!item.item7){
                  item.item7Array = new Array();
                }else if(item.item7 && typeof item.item7=='string'){
                  item.item7Array=item.item7.split(',')
                }
              })
              this.formData.hosSxhdPathologyRecordPOS = $esophagusList
            }
          })
        },
      //根据条件清空数据
      clearItem(x){
        if(x.pathologyType==1){
          x.item3A=null;
          x.item3B=null;
          x.item4A=null;
          x.item4B=null;
          x.item8=null;
        }else if(x.pathologyType==2){
          x.item5=null;
          x.item9A=null;
          x.item9B=null;
          x.item9C=null;
          x.item9D=null;
          x.item9E=null;
        }
        // 重置校验
        for(var i=0;i<this.formData.hosSxhdPathologyRecordPOS.length;i++){
          this.$refs['sxhdPathology'+i][0].clearValidate()
        }
      },
      /**
       * 病理诊断选择05或06或07时,食管炎诊断依据为必填，其他情况为选填
       * 病理诊断选择17或18时,胃炎诊断依据为必填，其他情况为选填
       */
      item7ArrayChange() {
        for(var i=0;i<this.formData.hosSxhdPathologyRecordPOS.length;i++){
          if(this.formData.hosSxhdPathologyRecordPOS[i].pathologyType==2 && 
            !this.formData.hosSxhdPathologyRecordPOS[i].item7Array.includes('05') && 
            !this.formData.hosSxhdPathologyRecordPOS[i].item7Array.includes('06') && 
            !this.formData.hosSxhdPathologyRecordPOS[i].item7Array.includes('07')) {
            this.$refs['item8_'+i][0].clearValidate()
          }

          if(this.formData.hosSxhdPathologyRecordPOS[i].pathologyType==1 && 
            !this.formData.hosSxhdPathologyRecordPOS[i].item7Array.includes('17') && 
            !this.formData.hosSxhdPathologyRecordPOS[i].item7Array.includes('18') ) {
            this.$refs['item9A_'+i][0].clearValidate()
            this.$refs['item9B_'+i][0].clearValidate()
            this.$refs['item9C_'+i][0].clearValidate()
            this.$refs['item9D_'+i][0].clearValidate()
            this.$refs['item9E_'+i][0].clearValidate()
          }
        }
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
  .el-form-item .el-form-item__label{
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
    margin-right: 20px;
  }
  .tipsBlock{
    margin-top: 30px;
    p{
      font-size: 14px;
      line-height: 22px;
    }
    .red{
      margin-bottom: 10px;
    }
  }
  .tipsBlock p{
    font-size: 14px;
    line-height: 22px;
  }
  .blockTit .el-radio{
    height: 40px;
  }
 
</style>
<style>
  .el-form-item__error{
    position: relative !important;
  }
  .reportBox .el-checkbox,.reportBox .el-radio{
    margin-left: 0;
    margin-right: 30px;
  }
</style>