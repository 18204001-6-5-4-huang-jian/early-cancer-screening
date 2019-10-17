<template>
<div>
  <div class="reportBox">
    <cancer-widget>
      <h1>主动随访信息记录表</h1>
      <el-form>
        <h2>基本信息</h2>
        <el-row>
          <el-col :span="8">
            <el-form-item label="QID：">
              {{personDetail.qid}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号：">
              {{personDetail.idCard}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名：">
              {{personDetail.userName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="性别：">
              {{personDetail.sex | sexFilter}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄：">
              {{personDetail.age}}
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="手机号：">
              {{personDetail.phone}}
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="所属机构：">
              {{personDetail.deptName}}
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属省市：">
              {{personDetail.deptProvinceName}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家庭住址省：">
              {{personDetail.jtAddressProvince}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家庭住址市：">
              {{personDetail.jtAddressCity}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="家庭住址具体：">
              {{personDetail.jtAddressDetail}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位：">
              {{personDetail.workAddress}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属项目：">
              {{personDetail.itemsUnderIt | itemsUnderItFilter}}
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="personDetail.itemsUnderIt==2">
            <el-form-item label="评估结果：">
              {{personDetail.pgResult}}
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="personDetail.itemsUnderIt==1">
            <el-form-item label="分组状态：">
              {{personDetail.pgResult}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="筛查结果：">
              {{personDetail.scResult}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="followUp" :rules="followUpRules" ref="followUp">
          <!-- 随访信息 -->
        <div>
            <h2>随访信息</h2>
            <el-row>
              <el-form-item label="是否失访：" prop="missFollow" label-width="120px">
                <el-select :disabled="$route.query.flag==0" 
                  size="small" 
                  v-model="followUp.missFollow" 
                  placeholder="请选择">
                  <el-option 
                  :label="item.name" 
                  :value="item.id" 
                  v-for="item in isFlag" 
                  :key="item.id"></el-option>
                  </el-select>
              </el-form-item>
            </el-row>
            <el-row v-if="followUp.missFollow==2">
              <el-form-item label="是否确诊癌症：" prop="isCancer" label-width="120px">
                <el-select :disabled="$route.query.flag==0" 
                  size="small" 
                  v-model="followUp.isCancer"
                  placeholder="请选择">
                  <el-option 
                  :label="item.name" 
                  :value="item.id" 
                  v-for="item in isFlag" 
                  :key="item.id"></el-option>
                  </el-select>
              </el-form-item>
            </el-row>
            <el-row v-if="followUp.missFollow==2">
              <el-col :span="8">
                <el-form-item label="最后接触状态：" prop="contactStatus" label-width="120px">
                  <el-select :disabled="$route.query.flag==0" 
                    size="small" 
                    v-model="followUp.contactStatus" 
                    placeholder="请选择">
                    <el-option 
                    :label="item.name" 
                    :value="item.id" 
                    v-for="item in contactStatus" 
                    :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="最后接触日期：" prop="contactDate" label-width="138px">
                  <el-date-picker
                      :disabled="$route.query.flag==0" 
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="timestamp"
                      :clearable="false"
                      size="small"
                      v-model="followUp.contactDate">
                  </el-date-picker>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row  v-if="followUp.contactStatus==2">
              <el-col :span="8">
                <el-form-item label="根本死因：" prop="deathReason" label-width="120px">
                    <el-input :disabled="$route.query.flag==0" v-model.trim="followUp.deathReason" size="small" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="死亡诊断ICD-10：" prop="deathDiagnose" label-width="138px" style="display:inline-block;">
                  <el-select :disabled="$route.query.flag==0" 
                    size="small" 
                    v-model="followUp.deathDiagnose" 
                    remote 
                    :remote-method="(query) => {remoteMethod(query)}" clearable :loading="loading"
                    @change="deathDiagnoseChange(followUp.deathDiagnose)"
                    filterable
                    placeholder="请搜索编码">
                    <el-option 
                    :label="item.code" 
                    :value="item.code" 
                    v-for="item in allIcd10" 
                    :key="item.code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="deathDiagnoseName" label-width="0px"  style="display:inline-block;">
                  <el-select :disabled="$route.query.flag==0" 
                    size="small" 
                    v-model="followUp.deathDiagnoseName" 
                    remote 
                    :remote-method="(query) => {remoteMethodName(query)}" clearable :loading="loading"
                    @change="deathDiagnoseNameChange(followUp.deathDiagnoseName)"
                    filterable
                    placeholder="请搜索诊断名称">
                    <el-option 
                    :label="item.name" 
                    :value="item.name" 
                    v-for="item in allIcd10" 
                    :key="item.code"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="followUp.contactStatus==2">
              <el-col :span="8">
                <el-form-item label="死亡日期：" prop="deathTime" label-width="120px">
                        <el-date-picker
                            :disabled="$route.query.flag==0" 
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp"
                            :clearable="false"
                            size="small"
                            v-model="followUp.deathTime">
                        </el-date-picker>
                    </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="随访医生：" prop="followDoctor" label-width="120px">
                        <el-input :disabled="$route.query.flag==0" v-model.trim="followUp.followDoctor" size="small" maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="随访日期：" prop="followDate" label-width="138px">
                      <el-date-picker
                            :disabled="$route.query.flag==0" 
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp"
                            :clearable="false"
                            size="small"
                            v-model="followUp.followDate">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>
      <!-- </el-form> -->
        <!-- ICD-O-3编码 -->
        <div v-if="followUp.isCancer==1">
            <h2>ICD-O-3编码</h2>
            <el-row>
              <el-col :span="8">
                <el-form-item label="原发部位：" prop="primarySite" label-width="120px">
                    <el-input :disabled="$route.query.flag==0" v-model.trim="followUp.primarySite" size="small" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="病理类型：" prop="primaryType" label-width="120px">
                    <el-input :disabled="$route.query.flag==0" v-model.trim="followUp.primaryType" size="small" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="解剖学编码：" prop="unplaningPart" label-width="120px">
                  <el-select :disabled="$route.query.flag==0" 
                    size="small" 
                    v-model="followUp.unplaningPart" 
                    placeholder="请选择">
                    <el-option 
                    :label="item.dataName" 
                    :value="item.dataCode" 
                    v-for="item in jpxcybw" 
                    :key="item.dataCode"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="形态学编码：" prop="morphology" label-width="120px">
                  <el-select :disabled="$route.query.flag==0" 
                    size="small" 
                    v-model="followUp.morphology" 
                    placeholder="请选择">
                    <el-option 
                    :label="item.dataName" 
                    :value="item.dataCode" 
                    v-for="item in xtx" 
                    :key="item.dataCode"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行为学编码：" prop="behavior" label-width="120px">
                  <el-select :disabled="$route.query.flag==0" 
                    size="small" 
                    v-model="followUp.behavior" 
                    placeholder="请选择">
                    <el-option 
                    :label="item.dataName" 
                    :value="item.dataCode" 
                    v-for="item in xw" 
                    :key="item.dataCode"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分级：" prop="classification" label-width="120px">
                  <el-select :disabled="$route.query.flag==0" 
                    size="small" 
                    v-model="followUp.classification" 
                    placeholder="请选择">
                    <el-option 
                    :label="item.dataName" 
                    :value="item.dataCode" 
                    v-for="item in fj" 
                    :key="item.dataCode"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
        </div>
        <!-- 分期 -->
        <div v-if="followUp.isCancer==1">
            <h2>分期</h2>
            <el-row>
                <el-col :span="8">
                  <el-form-item label="确诊时的临床分期：" prop="clinical" label-width="168px">
                      <el-select :disabled="$route.query.flag==0" 
                          size="small" 
                          v-model="followUp.clinical" 
                          placeholder="请选择">
                          <el-option 
                          :label="item.name" 
                          :value="item.id" 
                          v-for="item in stage" 
                          :key="item.id"></el-option>
                          </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="T：" prop="clinicalT" class="short">
                      <el-select :disabled="$route.query.flag==0" 
                          size="small" 
                          v-model="followUp.clinicalT" 
                          placeholder="请选择">
                          <el-option 
                          :label="item.name" 
                          :value="item.id" 
                          v-for="item in T" 
                          :key="item.id"></el-option>
                          </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="N：" prop="clinicalN" class="short">
                      <el-select :disabled="$route.query.flag==0" 
                          size="small" 
                          v-model="followUp.clinicalN" 
                          placeholder="请选择">
                          <el-option 
                          :label="item.name" 
                          :value="item.id" 
                          v-for="item in N" 
                          :key="item.id"></el-option>
                          </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="M：" prop="clinicalM" class="short">
                      <el-select :disabled="$route.query.flag==0" 
                          size="small" 
                          v-model="followUp.clinicalM" 
                          placeholder="请选择">
                          <el-option 
                          :label="item.name" 
                          :value="item.id" 
                          v-for="item in M" 
                          :key="item.id"></el-option>
                          </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            <el-row>
                <el-col :span="8">
                  <el-form-item label="确诊时的病理分期：" prop="pathological" label-width="168px">
                      <el-select :disabled="$route.query.flag==0" 
                          size="small" 
                          v-model="followUp.pathological" 
                          placeholder="请选择">
                          <el-option 
                          :label="item.name" 
                          :value="item.id" 
                          v-for="item in stage" 
                          :key="item.id"></el-option>
                          </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="T：" prop="pathologicalT" class="short">
                      <el-select :disabled="$route.query.flag==0" 
                          size="small" 
                          v-model="followUp.pathologicalT" 
                          placeholder="请选择">
                          <el-option 
                          :label="item.name" 
                          :value="item.id" 
                          v-for="item in T" 
                          :key="item.id"></el-option>
                          </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="N：" prop="pathologicalN" class="short">
                      <el-select :disabled="$route.query.flag==0" 
                          size="small" 
                          v-model="followUp.pathologicalN" 
                          placeholder="请选择">
                          <el-option 
                          :label="item.name" 
                          :value="item.id" 
                          v-for="item in N" 
                          :key="item.id"></el-option>
                          </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="M：" prop="pathologicalM" class="short">
                      <el-select :disabled="$route.query.flag==0" 
                          size="small" 
                          v-model="followUp.pathologicalM" 
                          placeholder="请选择">
                          <el-option 
                          :label="item.name" 
                          :value="item.id" 
                          v-for="item in M" 
                          :key="item.id"></el-option>
                          </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
        </div>
        <!-- 诊断依据 -->
        <div v-if="followUp.isCancer==1">
          <h2>诊断依据</h2>
          <el-row>
              <el-form-item label="首次诊断日期：" prop="diagnoseDate" label-width="120px">
                  <el-date-picker
                  :disabled="$route.query.flag==0" 
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="timestamp"
                          :clearable="false"
                          size="small"
                          v-model="followUp.diagnoseDate">
                      </el-date-picker>
              </el-form-item>
          </el-row>
          <el-row>
              <el-form-item label="诊断依据：" prop="diagnoseBase">
                <el-checkbox-group
                  @change="diagnoseBaseChange(followUp.diagnoseBase)"
                  :disabled="$route.query.flag==0"
                  v-model="followUp.diagnoseBase">
                  <el-checkbox
                    :disabled="followUp.diagnoseBase.includes(9) && item.id!=9"
                    :label="item.id" 
                    v-for="item in cancerBase" 
                    :key="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="诊断单位：" prop="diagnoseCompany" label-width="120px">
                  <el-input :disabled="$route.query.flag==0" v-model.trim="followUp.diagnoseCompany" size="small" maxlength="20"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报告日期：" prop="reportDate" label-width="120px">
                  <el-date-picker
                  :disabled="$route.query.flag==0" 
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="timestamp"
                  :clearable="false"
                  size="small"
                  v-model="followUp.reportDate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 治疗情况 -->
        <div v-if="followUp.isCancer==1">
          <h2>治疗情况</h2>
          <el-row>
            <el-form-item label="肿瘤治疗情况：" prop="treatment" label-width="120px">
                <el-select :disabled="$route.query.flag==0" v-model="followUp.treatment" placeholder="请选择">
                    <el-option value="1" label="治疗"></el-option>
                    <el-option value="2" label="未治疗"></el-option>
                    <el-option value="3" label="不明"></el-option>
                </el-select>
                <span>（指针对确诊肿瘤的治疗，包括手术、放疗、化疗等）</span>
            </el-form-item>
          </el-row>
          <div v-if="followUp.treatment==1">
            <el-row v-for="(item,index) in followUp.treatmentHospital" :key="index">
              <el-col :span="8">
                <el-form-item :label="`治疗医院${index+1}：`" prop="hospital" label-width="120px">
                  <el-input :disabled="$route.query.flag==0" v-model.trim="item.hospital" size="small" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="`住院号${index+1}：`" prop="num" label-width="120px">
                  <el-input :disabled="$route.query.flag==0" v-model.trim="item.num" size="small" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="$route.query.flag!=0">
                <el-button type="text">
                  <i class="icon el-icon-circle-plus" @click="add"></i>
                </el-button>
                <el-button type="text"  @click="del(index)" :disabled="followUp.treatmentHospital.length==1">
                  <i class="icon el-icon-delete" :class="{disabled:followUp.treatmentHospital.length==1}"></i>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
      <div class="btns" v-if="$route.query.flag!=0" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
        <el-button type="primary"  @click="submitForm" :disabled="btnDisabled">提交</el-button> 
      </div>
    </cancer-widget>
   </div>
  </div>
</template>

<script>
import VALIDATE from "@/utils/validate";
import DICT from "@/views/followUp/dict";
export default {
  data() {
    return {
      personDetail: {}, //用户基本信息
      loading: false,
      btnDisabled: false,
      isFlag: DICT.isFlag,
      contactStatus: DICT.contactStatus,
      cancerBase: DICT.cancerBase,
      jpxcybw: [],
      xtx: [],
      xw: [],
      fj: [],
      allIcd10: [],
      stage: DICT.stage,
      T: DICT.T,
      N: DICT.N,
      M: DICT.M,
      followUp: {
        missFollow: null,
        isCancer: null,
        contactStatus: null,
        contactDate: null,
        deathReason: null,
        deathDiagnose: null,
        deathDiagnoseName: null,
        deathTime: null,
        followDoctor: sessionStorage.getItem("trueName"),
        followDate: new Date().getTime(),
        primarySite: null,
        primaryType: null,
        unplaningPart: null,
        morphology: null,
        behavior: null,
        classification: null,
        pathological: null,
        pathologicalT: null,
        pathologicalN: null,
        pathologicalM: null,
        clinical: null,
        clinicalT: null,
        clinicalN: null,
        clinicalM: null,
        diagnoseDate: null,
        diagnoseBase: [],
        diagnoseCompany: null,
        reportDate: null,
        treatment: null,
        treatmentHospital: [
          {
            hospital: null,
            num: null
          }
        ]
      },
      followUpRules: {
        missFollow: [{ required: true, message: "请选择", trigger: "change" }],
        isCancer: [{ required: true, message: "请选择", trigger: "change" }],
        contactStatus: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        contactDate: [{ required: true, message: "请选择", trigger: "change" }],
        deathReason: [
          { required: true, message: "请输入1-20个字", trigger: "blur" }
        ],
        deathDiagnose: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        deathDiagnoseName: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        deathTime: [{ required: true, message: "请选择", trigger: "change" }],
        followDoctor: [
          { required: true, message: "请输入1-20个字", trigger: "blur" }
        ],
        followDate: [{ required: true, message: "请选择", trigger: "change" }],
        primarySite: [
          { required: true, message: "请输入1-20个字", trigger: "blur" }
        ],
        primaryType: [
          { required: true, message: "请输入1-20个字", trigger: "blur" }
        ],
        unplaningPart: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        morphology: [{ required: true, message: "请选择", trigger: "change" }],
        behavior: [{ required: true, message: "请选择", trigger: "change" }],
        classification: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        diagnoseDate: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        diagnoseBase: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        diagnoseCompany: [
          { required: true, message: "请输入1-20个字", trigger: "blur" }
        ],
        reportDate: [{ required: true, message: "请选择", trigger: "change" }],
        treatment: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  watch: {
    "followUp.treatment"(newValue, oldValue) {
      if (newValue != 1) {
        this.followUp.treatmentHospital = [
          {
            hospital: null,
            num: null
          }
        ];
      }
    },
    "followUp.contactStatus"(newValue, oldValue) {
      if (newValue != 2) {
        this.followUp.deathReason = null;
        this.followUp.deathDiagnose = null;
        this.followUp.deathDiagnoseName = null;
        this.followUp.deathTime = null;
      }
    },
    "followUp.isCancer"(newValue, oldValue) {
      if (newValue != 1) {
        this.followUp.primarySite = null;
        this.followUp.primaryType = null;
        this.followUp.unplaningPart = null;
        this.followUp.morphology = null;
        this.followUp.behavior = null;
        this.followUp.classification = null;
        this.followUp.pathological = null;
        this.followUp.pathologicalT = null;
        this.followUp.pathologicalN = null;
        this.followUp.pathologicalM = null;
        this.followUp.clinical = null;
        this.followUp.clinicalT = null;
        this.followUp.clinicalN = null;
        this.followUp.clinicalM = null;
        this.followUp.diagnoseDate = null;
        this.followUp.diagnoseCompany = null;
        this.followUp.reportDate = null;
        this.followUp.treatment = null;
        this.followUp.diagnoseBase = [];
      }
    },
    "followUp.missFollow"(newValue, oldValue) {
      if (newValue != 2) {
        this.followUp.isCancer = null;
        this.followUp.contactStatus = null;
        this.followUp.contactDate = null;
      }
    }
  },
  created() {
    if (localStorage.getItem("followEntry")) {
      this.personDetail = JSON.parse(localStorage.getItem("followEntry"));
    }
    if (this.$route.query.flag == 0) {
      this.getForm();
    }
    this.getUnplaningPart("jpxcybw");
    this.getUnplaningPart("xtx");
    this.getUnplaningPart("xw");
    this.getUnplaningPart("fj");
  },
  methods: {
    // 获取数据字典
    getUnplaningPart(type) {
      this.$axios_http({
        url: "/base/ct/getDataName/" + type,
        data: {},
        vueObj: this
      }).then(({ data: { status, result } }) => {
        if (status == "SUCCESS") {
          this[type] = result;
        }
      });
    },
    // 获取ICD10数据字典
    remoteMethod(query) {
      if (query && query.length >= 3) {
        this.loading = true;
        this.$axios_http({
          url: "/base/followup/getAllIcd10",
          data: {
            code: query
          }
        }).then(({ data: { status, result } }) => {
          this.loading = false;
          this.allIcd10 = result.icd10POList;
        });
      } else {
        this.allIcd10 = [];
      }
    },
    remoteMethodName(query) {
      if (query && query.length >= 2) {
        this.loading = true;
        this.$axios_http({
          url: "/base/followup/getAllIcd10",
          data: {
            name: query
          }
        }).then(({ data: { status, result } }) => {
          this.loading = false;
          this.allIcd10 = result.icd10POList;
        });
      } else {
        this.allIcd10 = [];
      }
    },
    deathDiagnoseChange(val) {
      if (val) {
        this.$axios_http({
          url: "/base/followup/getAllIcd10",
          data: {
            code: val
          }
        }).then(({ data: { status, result } }) => {
          this.followUp.deathDiagnoseName = result.icd10POList[0].name;
        });
      } else {
        this.allIcd10 = [];
      }
    },
    deathDiagnoseNameChange(val) {
      if (val) {
        this.$axios_http({
          url: "/base/followup/getAllIcd10",
          data: {
            name: val
          }
        }).then(({ data: { status, result } }) => {
          this.followUp.deathDiagnose = result.icd10POList[0].code;
        });
      } else {
        this.allIcd10 = [];
      }
    },
    diagnoseBaseChange(val) {
      if (val.includes(9)) {
        this.followUp.diagnoseBase = [9];
      }
    },
    add() {
      this.followUp.treatmentHospital.push({
        hospital: null,
        num: null
      });
    },
    del(index) {
      this.followUp.treatmentHospital.splice(index, 1);
    },
    //提交表单
    submitForm() {
      this.$refs.followUp.validate(valid => {
        if (!valid) {
          this.$message({
            message: "您有未填项",
            type: "error"
          });
          return false;
        } else {
          this.btnDisabled = true;
          this.followUp.diagnoseBase = JSON.stringify(
            this.followUp.diagnoseBase
          );
          this.$axios_http({
            url: "/base/followup/addForm",
            data: Object.assign(this.followUp, {
              userId: this.$route.query.id
            }),
            vueObj: this
          }).then(res => {
            this.btnDisabled = false;
            if (res.data.status == "SUCCESS") {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.push({ path: "/followup/index" });
            } else {
              this.followUp.diagnoseBase = JSON.parse(
                this.followUp.diagnoseBase
              );
            }
          });
        }
      });
    },
    // 查询
    getForm() {
      this.$axios_http({
        url: "/base/followup/getForm",
        data: { userId: this.$route.query.id },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.followUp = res.data.result.follForm;
          this.followUp.treatmentHospital = res.data.result.treatmentHospital;
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
}
.el-form-item {
  margin-bottom: 10px;
}
.el-form-item__label {
  color: #666;
  // font-weight: bold;
  font-size: 16px;
}
.el-form-item .el-input,
.el-form-item .el-date-editor.el-input,
.el-form-item .el-date-editor.el-input__inner {
  width: 215px;
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
.icon {
  font-size: 20px;
  cursor: pointer;
}
.el-icon-delete {
  color: red;
}
.icon.disabled {
  color: gray;
  cursor: default;
}
.el-icon-circle-plus {
  color: #3989f8;
  margin-right: 20px;
}
</style>
<style>
.shor.el-form-item .el-input,
.short.el-form-item .el-input__inner {
  width: 80px;
}
</style>
