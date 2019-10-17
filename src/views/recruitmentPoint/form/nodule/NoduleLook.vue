<template>
<div>
  <div class="reportBox j_content">
    <cancer-widget>
      <h1>肺癌低剂量螺旋CT检出肺内结节记录表</h1>
      <el-form :model="form" :rules="formRules"  ref="form"  class="demo-form">
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
            <el-form-item label="检查日期：" prop="checkTime">
              <el-date-picker
                      disabled
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="timestamp"
                      :clearable="false"
                      size="mini"
                      v-model="form.checkTime">
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
        <h2>结果信息</h2>
         <el-row>
          <el-form-item label="1．是否检出肺癌或疑似肺癌病灶？ " prop="item2">
            <el-radio-group :disabled="true" v-model="form.item2" @change="clearItem(form.item2,['item4'],1)" class="group5">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="2. 是否检出阳性结节病灶？(阳性结节定义：实性/部分实性结节平均径>=5mm或非实性结节>=8mm，或检出气管腔内结节）" prop="item1">
            <el-radio-group :disabled="true" v-model="form.item1" class="group1">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
         <el-row v-if="form.item1==2 || form.item2==2">
          <el-form-item label="3．要记录的阳性结节或肺癌病灶的数量：" prop="item4">
            <el-input :disabled="true" v-model.trim="form.item4" size="mini" @input="tuberChange(form.item4)"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="4．是否检出气道病变需要支气管镜活检？ " prop="item3">
            <el-radio-group :disabled="true" v-model="form.item3" class="group6">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="5．是否检出非阳性结节病灶？ " prop="item11">
            <el-radio-group :disabled="true" v-model="form.item11" class="group6" @change="clearItem(form.item11,['item1A','item1B','item1C','item1D'],1)">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
           <el-form-item label="5.1 是否检出<5mm实性/部分实性结节？" prop="item1A" class="smallTit" v-if="form.item11 == 2">
            <el-radio-group :disabled="true" v-model="form.item1A" @change="clearItem(form.item1A,['item1B'],1)">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="5.1.1 检出<5mm实性/部分实性结节的数量是：" prop="item1B" class="smallTit" v-if="form.item1A == 2">
            <el-radio-group :disabled="true" v-model="form.item1B" class="group2">
              <el-radio :label="1">1.单发</el-radio>
              <el-radio :label="2">2.多发</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="5.2 是否检出<8mm非实性结节？" prop="item1C" class="smallTit" v-if="form.item11 == 2">
            <el-radio-group :disabled="true" v-model="form.item1C" @change="clearItem(form.item1C,['item1D'],1)" class="group3">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="5.2.1 检出<8mm非实性结节的数量是：" prop="item1D" class="smallTit" v-if="form.item1C == 2">
            <el-radio-group :disabled="true" v-model="form.item1D" class="group4">
              <el-radio :label="1">1.单发</el-radio>
              <el-radio :label="2">2.多发</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
       
        <div v-for="x,index in form.hosCtTubercleInfoPOS">
          <h2>阳性结节与肺癌病灶记录结节{{index+1}}</h2>
          <!-- <div class="add-tuber">
            <el-button @click="pushTuber(1)"  type="text">添加结节</el-button>
            <el-button @click="deleteTuber(index)" type="text" :disabled="index<form.item4">删除结节</el-button>
          </div> -->
          <!-- <el-row> -->
            <div class="nodule">
              <el-row>
                <el-form-item label="1．结节位置（叶段） " :prop="'hosCtTubercleInfoPOS.'+index+'.item1'" class="blockTit" :rules="tuberRules.item1">
                  <el-radio-group :disabled="true" v-model="x.item1">
                    <el-radio :label="1" :ref="'ref'+index">1.右上叶（RUL）</el-radio>
                    <el-radio :label="2">2.右中叶（RML）</el-radio>
                    <el-radio :label="3">3.右下叶（RLL）</el-radio>
                    <el-radio :label="4">4.左上叶（LUL）</el-radio>
                    <el-radio :label="5">5.左下叶（LLL）</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="2．是否为支气管腔内结节" :prop="'hosCtTubercleInfoPOS.'+index+'.item2'"  :rules="tuberRules.item2" >
                  <el-radio-group :disabled="true" v-model="x.item2">
                    <el-radio :label="1">1.否</el-radio>
                    <el-radio :label="2">2.是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="3．结节密度"  :prop="'hosCtTubercleInfoPOS.'+index+'.item3'" class="blockTit" :rules="tuberRules.item3">
                  <el-radio-group :disabled="true" v-model="x.item3">
                    <el-radio :label="1">1.S1实性</el-radio>
                    <el-radio :label="2">2.S2部分实性</el-radio>
                    <el-radio :label="3">3.S3非实性</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="4．结节距离肋胸膜距离（mm）：" :prop="'hosCtTubercleInfoPOS.'+index+'.item4'"  :rules="tuberRules.item4">
                  <el-input :disabled="true" v-model.trim="x.item4" size="mini" @blur="inputBlurItem4(x.item4)"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="5．长径（mm）：" :prop="'hosCtTubercleInfoPOS.'+index+'.item5'"  :rules="tuberRules.item5" >
                  <el-input :disabled="true" v-model.trim="x.item5" size="mini" @change="getItem7(x.item5,x.item6,index)" @blur="inputBlurItem5(x.item5)"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="6．宽径（mm）：" :prop="'hosCtTubercleInfoPOS.'+index+'.item6'"  :rules="tuberRules.item6">
                  <el-input :disabled="true" v-model.trim="x.item6" size="mini" @change="getItem7(x.item5,x.item6,index)" @blur="inputBlurItem6(x.item6)"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="7．平均径（mm）："  required>
                  <el-input :disabled="true" v-model.trim="x.item7" size="mini"></el-input>
                </el-form-item>
                <span class="red" :ref="`tipsShow${index}`" :id="`tipsShow${index}`">* 平均径不能小于5mm</span>
              </el-row>
              <el-row>
                <el-form-item label="8．边缘（是否光整）" :prop="'hosCtTubercleInfoPOS.'+index+'.item8'"  :rules="tuberRules.item8" >
                  <el-radio-group :disabled="true" v-model="x.item8">
                    <el-radio :label="1">1.否</el-radio>
                    <el-radio :label="2">2.是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="9．是否含钙化" :prop="'hosCtTubercleInfoPOS.'+index+'.item9'" :rules="tuberRules.item9" >
                  <el-radio-group :disabled="true" v-model="x.item9">
                    <el-radio :label="1">1.否</el-radio>
                    <el-radio :label="2">2.是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="10．是否牵拉胸膜" :prop="'hosCtTubercleInfoPOS.'+index+'.item10'" :rules="tuberRules.item10" >
                  <el-radio-group :disabled="true" v-model="x.item10">
                    <el-radio :label="1">1.否</el-radio>
                    <el-radio :label="2">2.是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="11．结节出现序列：" :prop="'hosCtTubercleInfoPOS.'+index+'.item11'"  :rules="tuberRules.item11" >
                  <el-input :disabled="true" v-model.trim="x.item11" size="mini"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="12．图像编号：" :prop="'hosCtTubercleInfoPOS.'+index+'.item12'"  :rules="tuberRules.item12" >
                  <el-input :disabled="true" v-model.trim="x.item12" size="mini"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="13．病灶类型" :prop="'hosCtTubercleInfoPOS.'+index+'.item13'" class="blockTit" :rules="tuberRules.item13" >
                  <el-radio-group :disabled="true" v-model="x.item13">
                    <el-radio :label="1">1.良性</el-radio>
                    <el-radio :label="2">2.良性可能大</el-radio>
                    <el-radio :label="3">3.不能定性</el-radio>
                    <el-radio :label="4">4.恶性可能大</el-radio>
                    <el-radio :label="5">5.恶性</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
            </div>
          <!-- </el-row> -->
        </div>
        <h2>处理建议</h2>
        <el-row>
          <el-form-item label="1．是否需要国家癌症中心会诊（复阅）？ " prop="isMeeting">
            <el-radio-group :disabled="true" v-model="form.isMeeting" @change="clearItemmeetingTubercle">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="1.1．请选择需要会诊的部位: " prop="meetingTubercle" v-if="form.isMeeting==2">
            <el-checkbox-group :disabled="true" v-model="form.meetingTubercle" @change="clearItem(form.meetingTubercle,['meetingOther'],2)" v-if="form.hosCtTubercleInfoPOS">
              <el-checkbox :label="key+''" v-for="key of form.hosCtTubercleInfoPOS.length" :key="key">{{key}}.阳性结节与肺癌病灶记录{{key}}</el-checkbox>
              <el-checkbox label="0">0.其他</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="请输入详细描述： " prop="meetingOther" v-if="form.meetingTubercle.includes('0')">
            <el-input :disabled="true" v-model.trim="form.meetingOther" size="mini"></el-input>
          </el-form-item>
        </el-row> 
        <el-row>
          <el-form-item label="2．是否需要随诊？ " prop="item5">
            <el-radio-group :disabled="true" v-model="form.item5" @change="clearItem(form.item5,['item5A'],1)">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="2.1．随诊周期是： " prop="item5A" class="blockTit" v-if="form.item5 == 2">
            <el-radio-group :disabled="true" v-model="form.item5A">
              <el-radio :label="1">1个月</el-radio>
              <el-radio :label="2">3个月</el-radio>
              <el-radio :label="3">6个月</el-radio>
              <el-radio :label="4">1年</el-radio>
              <el-radio :label="5">其他
              <span v-if="form.item5A == 5">
                ，具体随诊周期（单位:月）：
                  <el-form-item label="" labelWidth="0px" prop="item5Other" class="inline">
                    <el-input :disabled="true" v-model.trim="form.item5Other" size="mini"></el-input>
                  </el-form-item>
              </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="3. 是否需要临床处理？ " prop="item61" class="blockTit">
            <el-radio-group :disabled="true" v-model="form.item61" @change="changeItem6">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="form.item61 == 2">
          <el-form-item label="3.1 临床处理建议（可多选） " prop="item6" class="blockTit">
            <el-checkbox-group :disabled="true" v-model="form.item6">
              <el-checkbox label="1">1.抗炎和复查</el-checkbox>
              <el-checkbox label="2">2.穿刺</el-checkbox>
              <el-checkbox label="3">3.气管镜</el-checkbox>
              <el-checkbox label="4">4.增强CT</el-checkbox>
              <el-checkbox label="5">5.PET-CT</el-checkbox>
              <el-checkbox label="6">6.临床抗肿瘤治疗</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <h2>填表信息</h2>
        <el-row>
          <el-form-item label="填表人员" prop="inputUser" style="display:inline-block;float:left;width:30%;">
            <el-input :disabled="true" v-model.trim="form.inputUser" size="mini"></el-input>
          </el-form-item>
        <!-- </el-row> -->
        <!-- <el-row> -->
          <el-form-item label="录入时间" prop="inputTime" style="display:inline-block;float:left;width:30%;">
            <el-date-picker
            :disabled="true"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp"
                    size="mini"
                    v-model="form.inputTime">
            </el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btns" v-if="$route.query.flag!=0 &&  $route.query.flag!=2 && $route.query.source!='gj' && $route.query.reportInputStatus!=1">
        <router-link :to="{path:'/form/noduleentry',query:{
        screeningId:$route.query.screeningId,
        id:$route.query.id,
        surverId:$route.query.surverId,
        personId:$route.query.personId,
        tubercleId:$route.query.tubercleId,
        signedDate:$route.query.signedDate,

        source:'look'}}">
          <el-button type="primary">编辑</el-button>
        </router-link>
      </div>
    </cancer-widget>
   </div>
  </div>
</template>

<script>
  import VALIDATE from '@/utils/validate'
  import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
  import getCTTubercleForm from '@/views/recruitmentPoint/form/ctResult/CTForm'
  export default {
    mixins:[getPersonDetail,getCTTubercleForm],
    data() {
      return {

          //是否显示录入结节
          tuberState:false,
          checkTime:'',
          personDetail:{},
          hosPersonInfoPO:{

          },
          rules:{

          },
          form:{
              checkTime:null,
              item1:null,//是否检出阳性结节病灶 1 是 2 否
              item11: null,  //是否检出非阳性结节病灶？
              item1A:'',//是否检出<5mm实性/部分实性结节 1 是 2 否
              item1B:'',//是否检出<8mm非实性结节 1 是 2 否
              item1C:'',//是否检出<8mm非实性结节 1 是 2 否
              item1D:'',//检出<8mm实性/部分的数量 1，单发；2，多发；
              item2:null,//是否检出肺癌或疑似肺癌病灶 1 是 2 否
              item3:null,//是否检出气道病变需要支气管镜活检 1 是 2 否
              item4:'',//要记录的阳性结节或肺癌病灶的数量
              isMeeting:'',
              meetingTubercle:[],//会诊部位
              meetingOther:null,
              item5:'',//是否需要随诊 1 是 2 否
              item5A:'',//随诊周期是 1，1个月；2，3个月；3，6个月；4，1年；5，其他
              item5other:'',//具体随诊周期
              item6:[],//临床处理建议1抗炎；2 穿刺；3气管；4镜增强CT；5PET-CT；
              item61: null,
              inputUser:sessionStorage.getItem('trueName'),//录入人
              inputTime:this.getNowDate(),//录入时间
              hosCtTubercleInfoPOS:[],//结节
          },
          //结节
          tuber:{
              item1:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
              item2:'',//是否为支气管腔内结节 1 是 2 否
              item3:'',//结节密度 1.S1实性；2. S2部分实性 ；3.S3非实性
              item4:'',//结节距离肋胸膜距离（mm）
              item5:'',//长径（mm）
              item6:'',//宽径（mm）
              item7:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
              item8:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
              item9:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
              item10:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
              item11:'',//结节出现序列
              item12:'',//图像编号
              item13:'',//病灶类型 1.阳性结节;2.可疑肺癌; 3.肺癌;
              isMeeting:'',  //是否需要会诊
          },
          //结节验证规则
          tuberRules:{
              item1:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item2:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item3:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item4:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.count5}
              ],
              item5:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.count5}
              ],
              item6:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.count5}
              ],
              item8:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item9:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item10:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item11:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countLength5}
              ],
              item12:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countLength3}
              ],
              item13:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
          },
          formRules:{
            checkTime:[
              { required: true, message: '必填', trigger: 'blur' },
            ],
              item1:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item11:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item1A:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item1B:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item1C:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item1D:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item2:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item3:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item4:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { required: true, message: '必填', trigger: 'change' },
                  { trigger: 'blur', validator: VALIDATE.count50},
                  { trigger: 'change', validator: VALIDATE.count50}
              ],
              isMeeting:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              meetingTubercle:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              meetingOther:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item5:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item5A:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item5Other:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countInit100}
              ],
              item6:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              item61:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
              inputTime:[
                  { required: true, message: '必选', trigger: 'blur' },
              ],
              inputUser: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],
          },
      };
    },
    mounted(){
        this.getPersonDetailFun(this.$route.query.personId,this.$route.query.surverId);
        this.getCTTubercleForm(this.$route.query.tubercleId)
    },
    methods: {
        //提交表单
        submitForm(type,flag) {
            this.$refs.form.validate((valid,obj) => {
                if(valid){
                  this.submitCTTubercle(1)
                }else{
                    this.$message({
                        type:'error',
                        message:'有未填项'
                    })
                }
            })
        },
        submitCTTubercle(type){
            this.form.inputStatus = type
            if (this.$route.query.id) {
                this.form.checkInfoId = this.$route.query.id
            }
            this.form.checkTime = this.checkTime
            this.form.item6 = this.form.item6.toString()
            this.$axios_http({
                url: '/base/ct/add/tubercle',
                data: this.form,
                vueObj: this
            }).then((res) => {
                if (res.data.status == "SUCCESS") {
                    this.$message({
                        type: 'success',
                        message: '保存成功!'
                    });
                    this.$router.go(-1);
                }
            })

        },
        //根据条件清空
        clearItem(val,data){
            if(val === 2){
                for(let item in data){
                   this.form[data[item]] = ''
                }
            }
        },
        //判断初始结节数组几条数据
        tuberChange(a){
            if(a>0&&a<51&&(/^[0-9]{1,2}$/.test(a))){
                this.form.hosCtTubercleInfoPOS = []
                for(let i =0;i<a;i++){
                    this.pushTuber()
                }
            }else {
                this.form.hosCtTubercleInfoPOS = []
            }
//           if(a == 2 || b == 2){
//               if(a == 2 && b == 2){
//                   this.form.hosCtTubercleInfoPOS = []
//                   this.pushTuber()
//                   this.pushTuber()
//               }else {
//                   this.form.hosCtTubercleInfoPOS = []
//                   this.pushTuber()
//               }
//           }else {
//               this.form.hosCtTubercleInfoPOS = []
//           }
        },
        //添加数组进入结节
        pushTuber(count){
            var obj = {
                item1:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
                item2:'',//是否为支气管腔内结节 1 是 2 否
                item3:'',//结节密度 1.S1实性；2. S2部分实性 ；3.S3非实性
                item4:'',//结节距离肋胸膜距离（mm）
                item5:'',//长径（mm）
                item6:'',//宽径（mm）
                item7:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
                item8:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
                item9:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
                item10:'',//位置（叶段）1. 右上叶；2. 右中叶；3. 右下叶；4. 左上叶；5. 左下叶；
                item11:'',//结节出现序列
                item12:'',//图像编号
                item13:'',//病灶类型 1.阳性结节;2.可疑肺癌; 3.肺癌;
                isMeeting:'',  //是否需要会诊
            }
            this.form.hosCtTubercleInfoPOS.push(obj)
            if(count == 1){
                this.$nextTick(() => {
                    let a = 'ref'+(this.form.hosCtTubercleInfoPOS.length-1) +''
                    this.$refs[a][0].$el.focus()
                })
            }
        },
        //删除结节
        deleteTuber(index){
            this.form.hosCtTubercleInfoPOS.splice(index,1)
        },
        //获取平均径
        getItem7(a,b,index){
            if(a&&b){
                var c = (a/1+b/1)/2+''
                this.form.hosCtTubercleInfoPOS[index].item7 = c.indexOf('.')? c.substr(0,c.indexOf(".")+2):c
            }
        },
        //获取当前日期
        getNowDate(){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            var nowDate = year + "-" + month + "-" + day;
            return nowDate
        },
        //根据条件清空
        clearItem(val, data, count){
            if (count == 1) {
                if (val != 1) {
                    for (let item in data) {
                        this.form[data[item]] = ''
                    }
                }
            }

        },
         clearItemmeetingTubercle(){
          if(this.form.isMeeting=='1'){
            this.form.meetingTubercle=[]
            this.form.meetingOther=null
          }
        },
        changeItem6(){
          if(this.form.item61==1){
            this.form.item6 = [];
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
      // border-bottom:1px solid #f6f6f6;
    }

    .title{
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .red{
      color: red;
      font-size:12px;
      visibility: hidden;
    }
  }
  .el-row{
    padding:10px 0 10px 20px;
    // border-bottom:1px dashed #f6f6f6;
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
    // border-top: 1px solid #f6f6f6;
    // border-bottom: 1px solid #f6f6f6;
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
  .el-radio-group.group1{
    margin-left:90px;
  }
  .el-radio-group.group2{
    margin-left:32px;
  }
  .el-radio-group.group3{
    margin-left: 50px;
  }
  .el-radio-group.group4{
     margin-left: 30px;
  }
  .el-radio-group.group5{
     margin-left: 42px;
  }
   .el-radio-group.group6{
     margin-left: 2px;
  }
  .btns{
     padding-top: 10px;
     border-top:1px dashed rgb(220, 223, 230);
     text-align:center;
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
</style>