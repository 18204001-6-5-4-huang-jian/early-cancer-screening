<template>
<cancer-widget>
  <div class="content-page ldctPage">
    <div class="filter-container content-search">
      <el-button class="return-home" @click="goBack()">返 回</el-button>
    </div>
    <div class="form-title">
      <h3>低剂量螺旋CT检查结果表</h3>
    </div>
    <div class="form-body">
      <el-form :model="form" :rules="formRules" ref="form" label-width="100px" labelPosition="left"
               class="demo-ruleForm">
        <div class="formcon">
          <div class="title">
            基本信息
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="12">
                   <el-form-item label="SID:" class="formoneline" prop="sid">
                      <el-input v-model.trim="form.sid" auto-complete="off" style="width: 200px;"
                                class="smallInput" @blur="getInfo" :disabled="$route.query.flag == 1 || $route.query.flag == 2" ref="sid"></el-input>
                    </el-form-item>
              </el-col>
              <el-col :span="9">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名:" class="formhalfline" prop="userName">
                  <el-input v-model.trim="form.userName" auto-complete="off" ref="userName"
                            style="width: 200px;"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="性别:" class="formhalfline" prop="sex">
                  <el-input v-model.trim="form.sex" auto-complete="off" style="width: 200px;" ref="sex"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="年龄:" class="formhalfline" prop="age">
                  <el-input v-model.trim="form.age" auto-complete="off" style="width: 200px;" ref="age"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="身份证号:" class="formoneline" prop="idCard">
                  <el-input v-model.trim="form.idCard" auto-complete="off" style="width: 200px;"
                            ref="idCard"
                            class="smallInput" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            检查时间
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="12">
                <el-form-item label="1. CT检查的日期:" prop="examinationDate" label-width="160px">
                  <el-date-picker
                    v-model="form.examinationDate"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp"
                    ref="examinationDate"
                    :disabled="disabledShowState"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="2. 本次CT扫描年度:" prop="stage" label-width="170px">
                <el-radio-group v-model="form.stage" :disabled="disabledShowState">
                  <el-radio :label="1" ref="stage">1.第一年CT扫描（T0）</el-radio>
                  <el-radio :label="2">2.第二年CT扫描（T1）</el-radio>
                  <el-radio :label="3">3.第三年CT扫描（T2）</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            技术参数
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. 扫描设备制造商和型号:" prop="equipmentMfrs" label-width="210px">
                  <el-select v-model="form.equipmentMfrs" filterable placeholder="请选择" ref="equipmentMfrs"
                             :disabled="disabledShowState"
                             @change="getModel">
                    <el-option
                      v-for="item in brands"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                  <div class="form-inline" v-if="form.equipmentMfrs!=6">
                    <el-form-item label="" prop="equipmentVersion">
                      <el-select v-model="form.equipmentVersion" filterable placeholder="请选择" 
                                 ref="equipmentVersion" :disabled="disabledShowState">
                        <el-option
                          v-for="item in models"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="form-inline" v-if="form.equipmentMfrs==6">
                    <el-form-item label="" prop="equipmentVersion">
                      <el-input v-model.trim="form.equipmentVersion" auto-complete="off" 
                                style="width: 200px;"
                                class="smallInput" :disabled="disabledShowState" ref="equipmentVersion"></el-input>
                    </el-form-item>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="2. 扫描参数：" prop="scanParameters" label-width="130px">
                  <el-radio-group v-model="form.scanParameters" :disabled="disabledShowState" @change="scanParametersChange">
                    <el-radio :label="1" ref="scanParameters">固定毫安秒扫描</el-radio>
                    <el-radio :label="2">自动毫安秒扫描</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="indent" v-if="form.scanParameters != null">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="kVp：" prop="kvpValue" labelWidth="150px">
                    <el-radio-group v-model="form.kvpValue" :disabled="disabledShowState"
                                    @change="changeinputisnull('kvpValue',4,'kvpOtherValue')">
                      <el-radio :label="1" ref="kvpValue">120</el-radio>
                      <el-radio :label="2">110</el-radio>
                      <el-radio :label="3">100</el-radio>
                      <el-radio :label="4">其他，请填写
                        <div class="form-inline">
                          <el-form-item label="" prop="kvpOtherValue" v-if="form.kvpValue == 4">
                            <el-input v-model.trim="form.kvpOtherValue" placeholder="" :disabled="disabledShowState"
                                      ref="kvpOtherValue"
                                      style="width: 200px;"></el-input>
                          </el-form-item>
                        </div>
                        <div class="form-inline">
                          <el-form-item label="" prop="" v-if="form.kvpValue != 4">
                            <el-input v-model.trim="form.kvpOtherValue" placeholder="" disabled
                                      ref="kvpOtherValue"
                                      style="width: 200px;"></el-input>
                          </el-form-item>
                        </div>
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="mA：" prop="maValue" labelWidth="150px" v-if="form.scanParameters == 1">
                <el-radio-group v-model="form.maValue" :disabled="disabledShowState">
                  <el-radio :label="1" ref="maValue">50</el-radio>
                  <el-radio :label="2">40</el-radio>
                  <el-radio :label="3">30</el-radio>
                  <el-radio :label="4">20</el-radio>
                  <el-radio :label="5">其他，请填写
                    <div class="form-inline">
                      <el-form-item label="" prop="maOtherValue" v-if="form.maValue == 5">
                        <el-input v-model.trim="form.maOtherValue" :disabled="disabledShowState" placeholder="" style="width: 200px;"
                                  ref="maOtherValue"></el-input>
                      </el-form-item>
                    </div>
                    <div class="form-inline">
                      <el-form-item label="" prop="" v-if="form.maValue != 5">
                        <el-input v-model.trim="form.maOtherValue" placeholder="" disabled 
                                  style="width: 200px;" ref="maOtherValue"></el-input>
                      </el-form-item>
                    </div>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="球管旋转时间（s）：" prop="slewTime" labelWidth="160px"  v-if="form.scanParameters == 1">
                <el-radio-group v-model="form.slewTime" @change="changeinputisnull('slewTime',5,'slewTimeOther')"
                                :disabled="disabledShowState">
                  <el-radio :label="1" ref="slewTime">0.4</el-radio>
                  <el-radio :label="2">0.5</el-radio>
                  <el-radio :label="3">0.8</el-radio>
                  <el-radio :label="4">1.0</el-radio>
                  <el-radio :label="5">其他，请填写
                    <div class="form-inline">
                      <el-form-item label="" prop="slewTimeOther" v-if="form.slewTime == 5">
                        <el-input v-model.trim="form.slewTimeOther" ref="slewTimeOther" placeholder=""
                                  :disabled="form.slewTime != 5" style="width: 200px;"></el-input>
                      </el-form-item>
                    </div>
                    <div class="form-inline">
                      <el-form-item label="" prop="" v-if="form.slewTime != 5">
                        <el-input v-model.trim="form.slewTimeOther" ref="slewTimeOther" placeholder=""
                                  :disabled="form.slewTime != 5" style="width: 200px;"></el-input>
                      </el-form-item>
                    </div>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="form.scanParameters == 2">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="mA(最小mA)：" prop="minMaValue" labelWidth="150px">
                      <el-radio-group v-model="form.minMaValue" :disabled="disabledShowState"
                                      @change="changeinputisnull('minMaValue',3,'minMaOtherValue')">
                        <el-radio :label="1" ref="minMaValue">30</el-radio>
                        <el-radio :label="2" >40</el-radio>
                        <el-radio :label="3">50</el-radio>
                        <el-radio :label="4">其他，请填写
                          <div class="form-inline">
                            <el-form-item label="" prop="minMaOtherValue" v-if="form.minMaValue == 4">
                              <el-input v-model.trim="form.minMaOtherValue" ref="minMaOtherValue" placeholder=""
                                        :disabled="disabledShowState" style="width: 200px;"></el-input>
                            </el-form-item>
                          </div>
                          <div class="form-inline">
                            <el-form-item label="" prop="" v-if="form.minMaValue != 4">
                              <el-input v-model.trim="form.minMaOtherValue" ref="minMaOtherValue" placeholder=""
                                        disabled style="width: 200px;"></el-input>
                            </el-form-item>
                          </div>
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="mA(最大mA)：" prop="maxMaValue" labelWidth="150px">
                      <el-radio-group v-model="form.maxMaValue" :disabled="disabledShowState"
                                      @change="changeinputisnull('maxMaValue',4,'maxMaOtherValue')">
                        <el-radio :label="1" ref="maxMaValue">300</el-radio>
                        <el-radio :label="2">250</el-radio>
                        <el-radio :label="3">200</el-radio>
                        <el-radio :label="4">其他，请填写
                          <div class="form-inline">
                            <el-form-item label="" prop="maxMaOtherValue" v-if="form.maxMaValue == 4">
                              <el-input v-model.trim="form.maxMaOtherValue" ref="maxMaOtherValue" placeholder=""
                                        :disabled="disabledShowState" style="width: 200px;"></el-input>
                            </el-form-item>
                          </div>
                          <div class="form-inline">
                            <el-form-item label="" prop="" v-if="form.maxMaValue != 4">
                              <el-input v-model.trim="form.maxMaOtherValue" ref="maxMaOtherValue" placeholder=""
                                        disabled style="width: 200px;"></el-input>
                            </el-form-item>
                          </div>
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row v-if="form.scanParameters==2 && form.equipmentMfrs!=2">
                  <el-col :span="24">
                    <el-form-item label="噪声指数（NI）：" prop="noiseLevel" labelWidth="150px">
                      <el-radio-group v-model="form.noiseLevel" :disabled="disabledShowState"
                                      @change="changeinputisnull('noiseLevel',2,'noiseLevelOther')">
                        <el-radio :label="1" ref="noiseLevel">40</el-radio>
                        <el-radio :label="2">其他，请填写
                          <div class="form-inline">
                            <el-form-item label="" prop="noiseLevelOther" v-if="form.noiseLevel == 2">
                              <el-input v-model.trim="form.noiseLevelOther" ref="noiseLevelOther" placeholder=""
                                        :disabled="disabledShowState" style="width: 200px;"></el-input>
                            </el-form-item>
                          </div>
                          <div class="form-inline">
                            <el-form-item label="" prop="" v-if="form.noiseLevel != 2">
                              <el-input v-model.trim="form.noiseLevelOther" ref="noiseLevelOther" placeholder=""
                                        disabled style="width: 200px;"></el-input>
                            </el-form-item>
                          </div>
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 2019/5/23新加题 -->
                <el-row v-if="form.scanParameters==2 && form.equipmentMfrs==2">
                  <el-col :span="24">
                    <el-form-item label="毫安秒（mAs）：" prop="maLevel" labelWidth="150px">
                      <el-radio-group v-model="form.maLevel" :disabled="disabledShowState"
                                      @change="changeinputisnull('maLevel',2,'maLevelOther')">
                        <el-radio :label="1">20</el-radio>
                        <el-radio :label="2">25</el-radio>
                        <el-radio :label="3">30</el-radio>
                        <el-radio :label="4">其他，请填写
                          <div class="form-inline">
                            <el-form-item label="" prop="maLevelOther" v-if="form.maLevel == 4">
                              <el-input v-model.trim="form.maLevelOther" ref="maLevelOther" placeholder=""
                                        :disabled="disabledShowState" style="width: 200px;" maxlength="100"></el-input>
                            </el-form-item>
                          </div>
                          <div class="form-inline">
                            <el-form-item label="" prop="" v-if="form.maLevel != 4">
                              <el-input v-model.trim="form.maLevelOther" ref="maLevelOther" placeholder=""
                                        disabled style="width: 200px;"></el-input>
                            </el-form-item>
                          </div>
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="旋转时间（s）：" prop="slewTime" labelWidth="160px">
                  <el-radio-group v-model="form.slewTime" @change="changeinputisnull('slewTime',5,'slewTimeOther')"
                                  :disabled="disabledShowState">
                    <el-radio :label="1" ref="slewTime">0.4</el-radio>
                    <el-radio :label="2">0.5</el-radio>
                    <el-radio :label="3">0.8</el-radio>
                    <el-radio :label="4">1.0</el-radio>
                    <el-radio :label="5">其他，请填写
                      <div class="form-inline">
                        <el-form-item label="" prop="slewTimeOther" v-if="form.slewTime == 5">
                          <el-input v-model.trim="form.slewTimeOther" ref="slewTimeOther" placeholder=""
                                    :disabled="form.slewTime != 5" style="width: 200px;"></el-input>
                        </el-form-item>
                      </div>
                      <div class="form-inline">
                        <el-form-item label="" prop="" v-if="form.slewTime != 5">
                          <el-input v-model.trim="form.slewTimeOther" ref="slewTimeOther" placeholder=""
                                    :disabled="form.slewTime != 5" style="width: 200px;"></el-input>
                        </el-form-item>
                      </div>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              
            </div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="3. 重建算法和层厚：" label-width="170px" class="form-item" required>
                  <br>
                  <table class="form-table">
                    <tr class="form-table-head">
                      <td>重建算法</td>
                      <td style="width: 350px;">图像层厚（mm）</td>
                      <td style="width: 350px">重建间隔（mm）</td>
                    </tr>
                    <tr>
                      <td rowspan="2">
                        <el-checkbox v-model="flabImageDeepChecked" disabled> 标准/软组织（必做）</el-checkbox>
                      </td>
                      <td>
                          <span>  常规层厚：</span>
                          <el-form-item label="" prop="flabImageDeep">
                            <el-radio-group v-model="form.flabImageDeep" @change="deepChange('flabImageDeep','flabImageDeepOther')" :disabled="disabledShowState">
                              <el-radio label="1">5．0 mm</el-radio>
                              <br>
                              <el-radio label="0">其他，请填写</el-radio>
                              <span>
                                 <el-form-item label="" prop="flabImageDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.flabImageDeep === '0'">
                                    <el-input v-model.trim="form.flabImageDeepOther" :disabled="disabledShowState" 
                                              style="width: 80px;" ref="flabImageDeepOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                              <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.flabImageDeep !== '0'">
                                    <el-input v-model.trim="form.flabImageDeepOther" disabled 
                                              style="width: 80px;" ref="flabImageDeepOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            </el-radio-group>
                          </el-form-item>

                      </td>
                      <td>
                        <span>  常规层厚：</span>
                        <el-form-item label="" prop="flabReconstructionDeep">
                          <el-radio-group v-model="form.flabReconstructionDeep" @change="deepChange('flabReconstructionDeep','flabReconstructionDeepOther')" :disabled="disabledShowState">
                            <el-radio label="1">5．0 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="flabReconstructionDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.flabReconstructionDeep === '0'">
                                    <el-input v-model.trim="form.flabReconstructionDeepOther" :disabled="disabledShowState" 
                                              style="width: 80px;" ref="flabReconstructionDeepOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.flabReconstructionDeep !== '0'">
                                    <el-input v-model.trim="form.flabReconstructionDeepOther" disabled 
                                              style="width: 80px;" ref="flabReconstructionDeepOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>  薄层层厚：</span>
                        <el-form-item label="" prop="flabImageShallow">
                          <el-radio-group v-model="form.flabImageShallow"  @change="deepChange('flabImageShallow','flabImageShallowOther')"  :disabled="disabledShowState">
                            <el-radio label="1">1．0 mm</el-radio>
                            <br>
                            <el-radio label="2">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                   <el-form-item label="" prop="flabImageShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.flabImageShallow === '0'">
                                      <el-input v-model.trim="form.flabImageShallowOther" :disabled="disabledShowState" 
                                                style="width: 80px;" ref="flabImageShallowOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.flabImageShallow !== '0'">
                                      <el-input v-model.trim="form.flabImageShallowOther" disabled 
                                                style="width: 80px;" ref="flabImageShallowOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                          </el-radio-group>
                        </el-form-item>
                      </td>
                      <td>
                        <span>  薄层层厚：</span>
                        <el-form-item label="" prop="flabReconstructionShallow">
                          <el-radio-group v-model="form.flabReconstructionShallow"  @change="deepChange('flabReconstructionShallow','flabReconstructionShallowOther')"  :disabled="disabledShowState">
                            <el-radio label="1">0．8 mm</el-radio>
                            <br>
                            <el-radio label="2">1．0 mm</el-radio>
                            <br>
                            <el-radio label="3">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="flabReconstructionShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.flabReconstructionShallow === '0'">
                                    <el-input v-model.trim="form.flabReconstructionShallowOther" :disabled="disabledShowState" 
                                              style="width: 80px;" ref="flabReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.flabReconstructionShallow !== '0'">
                                    <el-input v-model.trim="form.flabReconstructionShallowOther" disabled 
                                              style="width: 80px;" ref="flabReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                      </td>
                    </tr>
                    <tr>
                      <td rowspan="2">
                        <el-checkbox  v-model="flabImageDeepChecked1" @change="flabImageDeepChecked1Change" :disabled="disabledShowState">
                          肺（Lung）（可选做）
                        </el-checkbox>
                      </td>

                      <td>
                        <span>  常规层厚：</span>
                        <span>
                           <el-form-item label="" prop="lungImageDeep" v-if="flabImageDeepChecked1">
                            <el-radio-group v-model="form.lungImageDeep"  @change="deepChange('lungImageDeep','lungImageDeepOther')"  :disabled="disabledShowState">
                              <el-radio label="1">5．0 mm</el-radio>
                              <br>
                              <el-radio label="0">其他，请填写</el-radio>
                              <span>
                                   <el-form-item label="" prop="lungImageDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungImageDeep === '0'">
                                      <el-input v-model.trim="form.lungImageDeepOther" :disabled="disabledShowState" 
                                                style="width: 80px;" ref="lungImageDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                              <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungImageDeep !== '0'">
                                      <el-input v-model.trim="form.lungImageDeepOther" disabled 
                                                style="width: 80px;" ref="lungImageDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            </el-radio-group>
                          </el-form-item>
                        </span>
                        <span>
                           <el-form-item label="" prop="" v-if="!flabImageDeepChecked1 ">
                            <el-radio-group v-model="form.lungImageDeep" :disabled="!flabImageDeepChecked1 || disabledShowState">
                              <el-radio label="1">5．0 mm</el-radio>
                              <br>
                              <el-radio label="0">其他，请填写</el-radio>
                              <span>
                                   <el-form-item label="" prop="lungImageDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungImageDeep === '0'">
                                      <el-input v-model.trim="form.lungImageDeepOther" :disabled="disabledShowState" 
                                                style="width: 80px;" ref="lungImageDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                              <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungImageDeep !== '0'">
                                      <el-input v-model.trim="form.lungImageDeepOther" disabled 
                                                style="width: 80px;" ref="lungImageDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            </el-radio-group>
                          </el-form-item>
                        </span>
                      </td>
                      <td>
                        <span>  常规层厚：</span>
                        <span>
                           <el-form-item label="" prop="lungReconstructionDeep" v-if="flabImageDeepChecked1">
                            <el-radio-group v-model="form.lungReconstructionDeep"  @change="deepChange('lungReconstructionDeep','lungReconstructionDeepOther')"  :disabled="disabledShowState">
                              <el-radio label="1">5．0 mm</el-radio>
                              <br>
                              <el-radio label="0">其他，请填写</el-radio>
                              <span>
                                   <el-form-item label="" prop="lungReconstructionDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungReconstructionDeep === '0'">
                                      <el-input v-model.trim="form.lungReconstructionDeepOther" :disabled="disabledShowState" 
                                                style="width: 80px;" ref="lungReconstructionDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                              <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungReconstructionDeep !== '0'">
                                      <el-input v-model.trim="form.lungReconstructionDeepOther" disabled 
                                                style="width: 80px;" ref="lungReconstructionDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            </el-radio-group>
                          </el-form-item>
                        </span>
                        <span>
                           <el-form-item label="" prop="" v-if="!flabImageDeepChecked1">
                            <el-radio-group v-model="form.lungReconstructionDeep" :disabled="!flabImageDeepChecked1 || disabledShowState" >
                              <el-radio label="1">5．0 mm</el-radio>
                              <br>
                              <el-radio label="0">其他，请填写</el-radio>
                              <span>
                                   <el-form-item label="" prop="lungReconstructionDeepOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungReconstructionDeep === '0'">
                                      <el-input v-model.trim="form.lungReconstructionDeepOther" :disabled="disabledShowState" 
                                                style="width: 80px;" ref="lungReconstructionDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                              <span>
                                   <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungReconstructionDeep !== '0'">
                                      <el-input v-model.trim="form.lungReconstructionDeepOther" disabled 
                                                style="width: 80px;" ref="lungReconstructionDeepOther"></el-input>　ｍｍ
                                    </el-form-item>
                                </span>
                            </el-radio-group>
                          </el-form-item>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>  薄层层厚：</span>
                        <span>
                           <el-form-item label="" prop="lungImageShallow" v-if="flabImageDeepChecked1">
                          <el-radio-group v-model="form.lungImageShallow" @change="deepChange('lungImageShallow','lungImageShallowOther')"  :disabled="disabledShowState">
                            <el-radio label="1">1．0 mm</el-radio>
                            <br>
                            <el-radio label="2">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="lungImageShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungImageShallow === '0'">
                                    <el-input v-model.trim="form.lungImageShallowOther" :disabled="disabledShowState" 
                                              style="width: 80px;" ref="lungImageShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungImageShallow !== '0'">
                                    <el-input v-model.trim="form.lungImageShallowOther" disabled 
                                              style="width: 80px;" ref="lungImageShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                        </span>
                        <span>
                           <el-form-item label="" prop="" v-if="!flabImageDeepChecked1">
                          <el-radio-group v-model="form.lungImageShallow" :disabled="!flabImageDeepChecked1 || disabledShowState" >
                            <el-radio label="1">1．0 mm</el-radio>
                            <br>
                            <el-radio label="2">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="lungImageShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungImageShallow === '0'">
                                    <el-input v-model.trim="form.lungImageShallowOther" :disabled="disabledShowState" 
                                              style="width: 80px;" ref="lungImageShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungImageShallow !== '0'">
                                    <el-input v-model.trim="form.lungImageShallowOther" disabled 
                                              style="width: 80px;" ref="lungImageShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                        </span>
                      </td>
                      <td>
                        <span>  薄层层厚：</span>
                        <span>
                           <el-form-item label="" prop="lungReconstructionShallow" v-if="flabImageDeepChecked1">
                          <el-radio-group v-model="form.lungReconstructionShallow"  @change="deepChange('lungReconstructionShallow','lungReconstructionShallowOther')"  :disabled="disabledShowState">
                            <el-radio label="1">0．8 mm</el-radio>
                            <br>
                            <el-radio label="2">1．0 mm</el-radio>
                            <br>
                            <el-radio label="3">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="lungReconstructionShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungReconstructionShallow === '0'">
                                    <el-input v-model.trim="form.lungReconstructionShallowOther" :disabled="disabledShowState" 
                                              style="width: 80px;" ref="lungReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungReconstructionShallow !== '0'">
                                    <el-input v-model.trim="form.lungReconstructionShallowOther" disabled 
                                              style="width: 80px;" ref="lungReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                        </span>
                        <span>
                           <el-form-item label="" prop="" v-if="!flabImageDeepChecked1">
                          <el-radio-group v-model="form.lungReconstructionShallow" :disabled="!flabImageDeepChecked1 ||  disabledShowState">
                            <el-radio label="1">0．8 mm</el-radio>
                            <br>
                            <el-radio label="2">1．0 mm</el-radio>
                            <br>
                            <el-radio label="3">1．25 mm</el-radio>
                            <br>
                            <el-radio label="0">其他，请填写</el-radio>
                            <span>
                                 <el-form-item label="" prop="lungReconstructionShallowOther"  style="display: inline-block;" :inline-message="true" v-if="form.lungReconstructionShallow === '0'">
                                    <el-input v-model.trim="form.lungReconstructionShallowOther" :disabled="disabledShowState" 
                                              style="width: 80px;" ref="lungReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                            <span>
                                 <el-form-item label="" prop="" style="display: inline-block;"  v-if="form.lungReconstructionShallow !== '0'">
                                    <el-input v-model.trim="form.lungReconstructionShallowOther" disabled 
                                              style="width: 80px;" ref="lungReconstructionShallowOther"></el-input>　ｍｍ
                                  </el-form-item>
                              </span>
                          </el-radio-group>
                        </el-form-item>
                        </span>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="4. 剂量参数:" class="form-item" required label-width="170px">
              <br>
              <table class="form-table">
                <tr class="form-table-head">
                  <td style="width: 440px;">剂量参数</td>
                  <td style="width: 200px;">数值</td>
                </tr>
                <tr>
                  <td>容积CT剂量加权指数（CTDIvol）（mGy）</td>
                  <td>
                    <p>
                      <el-form-item label="" prop="ctdlvol">
                        <el-input v-model.trim="form.ctdlvol" :disabled="disabledShowState" 
                                  style="width: 100px;" ref="ctdlvol"></el-input>
                      </el-form-item>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    剂量长度乘积（DLP）（mGy·cm）
                  </td>
                  <td>
                    <p>
                      <el-form-item label="" prop="dlp">
                        <el-input v-model.trim="form.dlp" :disabled="disabledShowState" style="width: 100px;"
                                  ref="dlp"></el-input>
                      </el-form-item>
                    </p>
                  </td>
                </tr>
              </table>
            </el-form-item>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            图像质量
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. CT图像扫描情况:" prop="ctImageScanning" labelWidth="200px" class="form-item">
                  <div style="margin-top: 40px;">
                    <el-radio-group v-model="form.ctImageScanning" :disabled="disabledShowState">
                      <el-radio :label="1" class="radio" ref="ctImageScanning">A.CT图像可以提供诊断信息</el-radio>
                      <br>
                      <el-radio :label="2" class="radio">B.CT图像提供诊断信息有限，但尚可以诊断</el-radio>
                      <br>
                      <el-radio :label="3" class="radio">C.CT图像不能提供有效诊断信息，需重新预约CT检查</el-radio>
                      <br>
                      <el-radio :label="4" class="radio">D.没有图像</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.ctImageScanning != 1">
              <el-col :span="24">
                <el-form-item label="2. 造成此次检查图像提供诊断信息有限或不能提供有效诊断信息的原因（可多选）:" class="form-item" prop="item2"
                              labelWidth="650px">
                  <br>
                  <el-checkbox-group v-model="form.item2" @change="item2Change" :disabled="disabledShowState">
                    <el-checkbox :label="1" ref="item2">A.非最大吸气末时屏气扫描</el-checkbox>
                    <br>
                    <el-checkbox :label="2">B.身体运动伪影</el-checkbox>
                    <br>
                    <el-checkbox :label="3">C.呼吸运动伪影</el-checkbox>
                    <br>
                    <el-checkbox :label="4">D.扫描技术参数不正确</el-checkbox>
                    <br>
                    <el-checkbox :label="5">E.CT图像未包括整个胸部范围</el-checkbox>
                    <br>
                    <el-checkbox :label="6">F.严重的硬化射束伪影（如：受检者衣物配饰、吊坠、内衣扣等高密度物体造成放射状伪影）</el-checkbox>
                    <br>
                    <el-checkbox :label="7">G.不均匀光子造成的伪影</el-checkbox>
                    <br>
                    <el-checkbox :label="8">其他,如：
                      <span>
                         <el-form-item label="" prop="ctImageScanningReasonOther"
                                       style="margin-bottom: 20px; width: 400px;display: inline-block;margin-left: -30px;"
                                       v-if="form.item2 && form.item2.indexOf(8)>-1">
                          <el-input v-model.trim="form.ctImageScanningReasonOther"
                                    type="textarea"
                                    auto-complete="off" ref="ctImageScanningReasonOther"
                                    placeholder="请输入1-100个字"
                                    maxlength="100"
                                    :disabled="disabledShowState"></el-input>
                         </el-form-item>
                      </span>
                      <span>
                        <el-form-item label="" prop=""
                                      style="margin-bottom: 20px; width: 400px;display: inline-block;margin-left: -30px;"
                                      v-if="form.item2 && form.item2.indexOf(8)<0">
                          <el-input v-model.trim="form.ctImageScanningReasonOther" auto-complete="off" 
                                    type="textarea"
                                    placeholder="请输入1-100个字"
                                    maxlength="100"
                                    ref="ctImageScanningReasonOther" disabled></el-input>
                        </el-form-item>
                       </span>

                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            既往影像回顾
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. 是否回顾既往影像检查结果（包括筛查间隔期内的影像检查结果）？" prop="reviewCtResult" labelWidth="550px"
                              class="form-item">
                  <br>
                  <el-radio-group v-model="form.reviewCtResult" :disabled="disabledShowState">
                    <el-radio :label="2">否</el-radio>
                    <el-radio :label="1" ref="reviewCtResult">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="form.reviewCtResult == 1">
                <div class="div-scroll">
                  <table class="form-table-content">
                    <tr class="form-table-head">
                      <td
                        style="width: 160px;height: 40px;border-bottom: 1px solid #000000;border-right: 1px solid #000000;text-align: center;"
                        ref="form_table_td" :colspan="form.ctPastResultPOList.length+1">既往影像描述
                      </td>
                    </tr>
                    <tr>
                      <td class="form-td-title">
                        <p style="width: 160px;">既往影像日期</p>
                        <p style="width: 160px;">
                          既往影像检查方法
                        </p>
                        <p style="height: 180px;width: 160px;">
                          既往影像检查部位
                          <small>（如有CT或MRI则必填）</small>
                        </p>
                        <p style="height: 140px;width: 160px;" v-if="form.stage == 2 || form.stage == 3">既往影像检查类别</p>
                      </td>
                      <td v-for="(x,index) in form.ctPastResultPOList" class="form-td-content" :key="index">
                        <p>
                          <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.examinationDate'"
                                        :rules="ctPastResultPOListRules.examinationDate">
                            <el-date-picker
                              v-model="x.examinationDate"
                              type="date"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              
                              :disabled="disabledShowState"
                              :ref="'ctPastResultPOList.'+index+'.examinationDate'"
                              style="width: 200px;"
                              value-format="timestamp"
                              :picker-options="pickerOptions1">
                            </el-date-picker>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.examinationMethod'"
                                        :rules="ctPastResultPOListRules.examinationMethod">
                            <el-select v-model="x.examinationMethod" placeholder="请选择" 
                                       :disabled="disabledShowState" @change="examinationMethodChange(x)"
                                       :ref="'ctPastResultPOList.'+index+'.examinationMethod'">
                              <el-option
                                v-for="items in methodsOptions"
                                :key="items.value"
                                :label="items.label"
                                :value="items.value"
                              >
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </p>
                        <p style="height: 180px;">
                          <span>
                              <el-form-item class="float-form-item" :prop="'ctPastResultPOList.'+index+'.checkList'"
                                            v-if="x.examinationMethod == 1 || x.examinationMethod == 3"
                                            :rules="ctPastResultPOListRules.checkList">
                              <el-checkbox-group v-model="x.checkList" :disabled="disabledShowState"
                                                 @change="checkListChange(x,index)">
                                <el-checkbox :label="1" :ref="'ctPastResultPOList.'+index+'.checkList'">胸部</el-checkbox>
                                <el-checkbox :label="2">腹部</el-checkbox>
                                <el-checkbox :label="3">盆腔</el-checkbox>
                                <el-checkbox :label="4">脑</el-checkbox>
                                <el-checkbox :label="5">其他
                                  <span>
                                     <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.examinationOtherStr'"
                                                   :rules="ctPastResultPOListRules.examinationOtherStr"
                                                   style="display: inline-block;" v-if="x.checkList.indexOf(5) >-1">
                                        <el-input v-model.trim="x.examinationOtherStr" style="width: 80px;"
                                                  :disabled="disabledShowState"
                                                  auto-complete="off" 
                                                  :ref="'ctPastResultPOList.'+index+'.examinationOtherStr'"></el-input>
                                     </el-form-item>
                                  </span>
                                  <span>
                                     <el-form-item label="" prop="" style="display: inline-block;"
                                                   v-if="x.checkList.indexOf(5) < 0">
                                        <el-input v-model.trim="x.examinationOtherStr" style="width: 80px;"
                                                  auto-complete="off" disabled></el-input>
                                     </el-form-item>
                                  </span>
                                </el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                            </span>
                          <span>
                                <el-form-item class="float-form-item" prop=""
                                              v-if="x.examinationMethod != 1 && x.examinationMethod != 3">
                                <el-checkbox-group v-model="x.checkList" @change="checkListChange(x,index)">
                                  <el-checkbox :label="1">胸部</el-checkbox>
                                  <el-checkbox :label="2">腹部</el-checkbox>
                                  <el-checkbox :label="3">盆腔</el-checkbox>
                                  <el-checkbox :label="4">脑</el-checkbox>
                                  <el-checkbox :label="5">其他
                                   <span>
                                     <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.examinationOtherStr'"
                                                   :rules="ctPastResultPOListRules.examinationOtherStr"
                                                   v-if="x.checkList.indexOf(5) >-1" style="display: inline-block;">
                                        <el-input v-model.trim="x.examinationOtherStr" style="width: 80px;"
                                                  :disabled="disabledShowState"
                                                  auto-complete="off" 
                                                  :ref="'ctPastResultPOList.'+index+'.examinationOtherStr'"></el-input>
                                     </el-form-item>
                                  </span>
                                     <span>
                                     <el-form-item label="" prop="" v-if="x.checkList.indexOf(5) < 0"
                                                   style="display: inline-block;">
                                        <el-input v-model.trim="x.examinationOtherStr" style="width: 80px;" disabled
                                                  auto-complete="off" ></el-input>
                                     </el-form-item>
                                  </span>
                                  </el-checkbox>
                                  </el-checkbox-group>
                                </el-form-item>
                              </span>

                        </p>
                        <p style="height: 140px;" v-if="form.stage == 2 || form.stage == 3">
                          <el-form-item label="" :prop="'ctPastResultPOList.'+index+'.classes'"
                                        :rules="ctPastResultPOListRules.classes" style="height: 60px;">
                            <el-checkbox-group v-model="x.classes" :disabled="disabledShowState"
                                               @change="classesChange(x)">
                              <el-checkbox :label="1" :ref="'ctPastResultPOList.'+index+'.classes'">基线</el-checkbox>
                              <el-checkbox :label="2">年度</el-checkbox>
                              <el-checkbox :label="3">随访</el-checkbox>
                              <el-checkbox :label="4">诊断</el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="addButton" v-if="!disabledShowState">
                  <el-button icon="el-icon-plus" circle :disabled="this.form.ctPastResultPOList.length>20"
                             @click="addItem('plus')"></el-button>
                  <el-button icon="el-icon-minus" circle :disabled="this.form.ctPastResultPOList.length<2"
                             @click="addItem('minus')"></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            结节发现
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. 是否有非钙化结节（无论大小）？" prop="tubercle" labelWidth="300px" class="form-item">
                  <br>
                  <el-radio-group v-model="form.tubercle" :disabled="disabledShowState">
                    <el-radio :label="2">否（跳至“其他异常情况”部分）</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="form.tubercle==1">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="请选择：" prop="tubercleOther" labelWidth="300px" class="form-item">
                    <br>
                    <el-radio-group v-model="form.tubercleOther" :disabled="disabledShowState">
                      <el-radio :label="1">单发</el-radio>
                      <el-radio :label="2">多发</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="2. 是否所有结节均<5mm（不包括含肯定良性钙化成份的结节或肿物）？" prop="tubercleLessFive" labelWidth="600px"
                                class="form-item">
                    <br>
                    <el-radio-group v-model="form.tubercleLessFive" :disabled="disabledShowState">
                      <el-radio :label="2">否</el-radio>
                      <el-radio :label="1" ref="tubercleLessFive">是（跳至“其他异常情况”部分）</el-radio>
                      
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-if="form.tubercleLessFive == 2">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="3. 结节是否≥5mm（不包括含肯定良性钙化成份的结节或肿物）？" prop="tubercleGreaterFive" labelWidth="520px"
                                  class="form-item">
                      <br>
                      <el-radio-group v-model="form.tubercleGreaterFive" :disabled="disabledShowState">
                        <el-radio :label="2">否（跳至“其他异常情况”部分）</el-radio>
                        <el-radio :label="1">是</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" v-if="form.tubercleGreaterFive == 1">
                    <div style="margin-left: 40px;">
                      <el-form-item label="3.1 检出≥5mm结节的数量：（请按结节从大到小顺序填写）" prop="item8_3" labelWidth="430px"
                                    class="form-item">
                        <br>
                        <el-radio-group v-model="form.item8_3"
                                        :disabled="disabledShowState">
                          <el-radio :label="1">≤6枚，共
                            <div class="form-inline">
                              <el-form-item label="" prop="lessTenCount" class="form-item1"
                                            style="display: inline-block;" v-if="form.item8_3 == 1">
                                <el-input v-model.trim="form.lessTenCount" @input="addTableTubercleList()"
                                          placeholder="" :disabled="disabledShowState" 
                                          style="width: 80px;"></el-input>
                              </el-form-item>
                            </div>
                            <div class="form-inline">
                              <el-form-item label="" prop="" class="form-item1" style="display: inline-block;"
                                            v-if="form.item8_3 != 1">
                                <el-input v-model.trim="form.lessTenCount" placeholder=""
                                          disabled style="width: 80px;"></el-input>
                              </el-form-item>
                            </div>
                            枚（每一个结节均需要填写下述“结节描述 & 位置”表）
                          </el-radio>
                          <br>
                          <el-radio :label="2" style="margin-top: 20px">超过6枚，共
                            <div class="form-inline">
                              <el-form-item label="" prop="greaterTenCount" class="form-item1"
                                            style="display: inline-block;" v-if="form.item8_3 == 2">
                                <el-input v-model.trim="form.greaterTenCount" @input="addTableTubercleList()"
                                          placeholder="" :disabled="disabledShowState" 
                                          style="width: 80px;"></el-input>
                              </el-form-item>
                            </div>
                            <div class="form-inline">
                              <el-form-item label="" prop="" class="form-item1" style="display: inline-block;"
                                            v-if="form.item8_3 != 2">
                                <el-input v-model.trim="form.greaterTenCount" placeholder=""
                                          disabled style="width: 80px;"></el-input>
                              </el-form-item>
                            </div>
                            枚（按病变严重程度，填写6个“结节描述 & 位置”表）
                          </el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <div class="div" v-if="countState">
                    <table class="ctTubercleInfoPOList-table">
                      <tr>
                        <td class="ctTubercleInfoPOList-table-title">
                          <p>
                            结节编号
                          </p>
                          <p style="height: 80px;">
                            序列编号 <br>
                            <small style="font-size: 11px;">(直径最大层面或序列编号，或最具代表性的层面)</small>
                          </p>
                          <p>
                            图像号
                          </p>
                          <p class="tabled-td-anatomicalPosition tabled-td-bt">
                            解剖位置　<br>
                            <span>1. 右上叶</span><br>
                            <span>2. 右中叶</span><br>
                            <span>3. 右下叶</span><br>
                            <span>4. 左上叶</span><br>
                            <span>5. 左下叶</span><br>
                            <span>6. 叶间胸膜</span><br>
                          </p>
                          <p class="tabled-td-density tabled-td-bt">
                            密度<br>
                            <span>1. 实性</span><br>
                            <span>2. 部分实性</span><br>
                            <span>3. 非实性(纯磨玻璃密度)</span><br>
                          </p>
                          <p style="height:90px;">其他描述<br><small style="font-size: 11px;">（如胸膜牵拉、空泡、空腔、空洞、坏死、钙化、液体/水样等）</small></p>
                          <p class="tabled-td-densityOther tabled-td-bt">
                            其他描述（可多选）
                          </p>
                          <p>
                            <span class="form-item-title-big">结节大小</span>
                          </p>
                          <p>
                            长径（mm）
                          </p>
                          <p>
                            垂直短径（mm）
                          </p>
                          <p>
                            平均径（mm）
                          </p>
                          <p>
                            体积（mm³）<br>
                            <small style="font-size: 11px">（如果已测量）</small>
                          </p>
                          <p>
                           <span class="form-item-title-big">实性部分大小
                           <br></span>
                            <small style="font-size: 11px">（如果为部分实性结节）</small>
                          </p>
                          <p>
                            长径（mm）
                          </p>
                          <p>
                            垂直短径（mm）
                          </p>
                          <p>
                            平均径（mm）
                          </p>
                          <p>
                            体积（mm³）<br>
                            <small style="font-size: 11px">（如果已测量）</small>
                          </p>
                          <p class="tabled-td-shape tabled-td-bt">
                            形状<br>
                            <span>1. 圆形</span><br>
                            <span>2. 椭圆形</span><br>
                            <span>3. 分叶状</span><br>
                            <span>4. 不规则</span><br>
                            <span>5. 不能定义</span><br>
                          </p>
                          <p class="tabled-td-edge tabled-td-bt">
                            边缘<br>
                            <span>1. 毛刺</span><br>
                            <span>2. 清楚</span><br>
                            <span>3. 模糊</span><br>
                            <span>4. 光滑</span><br>
                            <span>5. 难以判断</span><br>
                          </p>
                          <!-- <span v-if="form.stage ==2 || form.stage == 3">
                            <p>
                              <span class="form-item-title-big">结节的间期变化</span>
                            </p>
                            <p class="tabled-td-density tabled-td-bt">
                              是否有任何间期改变<br>
                              <span>2. 否</span><br>
                              <span>1. 是</span><br>
                            </p>
                            <p class="tabled-td-density tabled-td-bt">
                              结节总体大小改变<br>
                              <span>1. 增大</span><br>
                              <span>2. 缩小</span><br>
                              <span>3. 无变化</span><br>
                            </p>
                            <p>
                              结节总体大小改变的数值(mm)
                            </p>
                            <p class="tabled-td-edge tabled-td-bt">
                              结节实体成分的大小改变<br>
                              <span>1. 增大</span><br>
                              <span>2. 缩小</span><br>
                              <span>3. 无变化</span><br>
                              <span>4. 新出现</span><br>
                            </p>
                            <p style="height: 60px;">
                              结节实体成分大小改变的数值（mm）
                            </p>
                            <p class="tabled-td-edge tabled-td-bt">
                              结节密度改变<br>
                              <span>1. 增大</span><br>
                              <span>2. 减低</span><br>
                              <span>3. 无变化</span><br>
                            </p>
                          </span> -->
                          <p>
                            <span class="form-item-title-big">结节总体印象</span>
                          </p>
                          <p class="tabled-td-shape tabled-td-bt">
                            结节性质<br>
                            <span>1. 良性</span><br>
                            <span>2. 良性可能大</span><br>
                            <span>3. 不能定性</span><br>
                            <span>4. 恶性可能大</span><br>
                            <span>5. 恶性</span><br>
                          </p>
                          <p style="height: 500px;" class="tabled-td-bt">
                            结节处理建议<br>
                            <span>1. 年度复查</span><br>
                            <span>2. 3个月复查</span><br>
                            <span>3. 抗炎治疗后,1个月复查</span><br>
                            <span>4. 无需抗炎,一个月后复查</span><br>
                            <span>5. 诊断性平扫CT（薄层）进一步检查增强CT（薄层）进一步检查</span><br>
                            <span>6. PET-CT进一步检查</span><br>
                            <span>7. 活检</span><br>
                            <span>8. 临床门诊就诊</span><br>
                            <span>9. 其他</span><br>
                          </p>
                          <p>
                            <span class="form-item-title-big">会诊</span>
                          </p>
                          <p class="tabled-td-density tabled-td-bt">
                            是否需要会诊<br>
                            <span>1. 是</span><br>
                            <span>2. 否</span><br>
                          </p>
                          <p class="tabled-td-density tabled-td-bt">
                            会诊级别
                            <span>
                              <el-popover
                                placement="bottom"
                                title=""
                                width="300"
                                trigger="click"
                                slot="content"
                              >
                               系统判断条件: <br>
                              1. 非常紧急(三天内)<br>
                                选择PET/CT进一步检查；<br>
                                活检；<br>
                                临床门诊就诊；<br>
                                多学科会诊；
                                结节尺寸>=15mm”。<br>
                                2.加急（1周内）<br>
                                选择3个月复查；<br>
                                抗炎治疗后/无需抗炎1个月复查；<br>
                                诊断性平扫/增强CT（薄层）进一步检查。<br>
                                3. 普通（一个月内）
                                <span slot="reference"><i class="el-icon-question" style="cursor: pointer;"></i></span>
                            </el-popover>
                          </span><br>
                            <span>1. 普通（一个月）</span><br>
                            <span>2. 加急（一周内）</span><br>
                            <span>3. 非常紧急（三天内）</span><br>
                          </p>
                          <p class="tabled-td-density tabled-td-bt">
                            提交会诊原因<br>
                            <span>1. 怀疑恶性</span><br>
                            <span>2. 性质难判定</span><br>
                            <span>3. 其他</span><br>
                          </p>
                          <p>
                            会诊原因其他
                          </p>
                        </td>
                        <td v-for="(item,index) in form.ctTubercleInfoPOList" :key="index"
                            style="padding-top: -20px!important;"
                            class="ctTubercleInfoPOList-table-content">
                          <p>
                            <el-form-item label="" class="form-item1" :prop="'ctTubercleInfoPOList.'+index+'.numName'"
                                          :rules="ctTubercleInfoPOListRules.numName">
                              <el-input v-model.trim="item.numName" placeholder="" 
                                        :ref="'ctTubercleInfoPOList.'+index+'.numName'"
                                        :disabled="disabledShowState" style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p style="height: 80px;">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.serialNumber'"
                                          class="form-item1" :rules="ctTubercleInfoPOListRules.serialNumber">
                              <el-input v-model.trim="item.serialNumber" placeholder="" 
                                        :ref="'ctTubercleInfoPOList.'+index+'.serialNumber'"
                                        :disabled="disabledShowState"
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.imageNum'" class="form-item1"
                                          :rules="ctTubercleInfoPOListRules.imageNum">
                              <el-input v-model.trim="item.imageNum" placeholder="" 
                                        :ref="'ctTubercleInfoPOList.'+index+'.imageNum'"
                                        :disabled="disabledShowState"
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-anatomicalPosition ">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.anatomicalPosition'"
                                          :rules="ctTubercleInfoPOListRules.anatomicalPosition"
                                          class="form-item1 form-item200" style="display: inline-block;">
                              <el-radio-group v-model="item.anatomicalPosition" :disabled="disabledShowState">
                                <el-radio label="1">右上叶</el-radio>
                                <el-radio label="2">右中叶</el-radio>
                                <el-radio label="3">右下叶</el-radio>
                                <el-radio label="4">左上叶</el-radio>
                                <el-radio label="5">左下叶</el-radio>
                                <el-radio label="6">叶间胸膜</el-radio>
                              </el-radio-group>
                                          <!-- <el-input v-model.trim="item.anatomicalPosition" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.anatomicalPosition'"
                                        :disabled="disabledShowState" style="width: 50px;"></el-input> -->
                            </el-form-item>
                          </p>
                          <p class="tabled-td-density">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.density'"
                                          class="form-item1 form-item200" :rules="ctTubercleInfoPOListRules.density">
                                <el-radio-group v-model="item.density" :disabled="disabledShowState">
                                  <el-radio label="1">实性</el-radio>
                                  <el-radio label="2">部分实性</el-radio>
                                  <el-radio label="3">非实性(纯磨玻璃密度)</el-radio>
                                </el-radio-group>
                              <!-- <el-input v-model.trim="item.density" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.density'" @blur="densityChange(item)"
                                        :disabled="disabledShowState" style="width: 50px;"></el-input> -->
                            </el-form-item>
                          </p>
                          <!-- 2019/5/23 新加题 -->
                          <p class="tabled-td-density">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.otherDetail'"
                                          class="form-item1" :rules="ctTubercleInfoPOListRules.otherDetail">
                              <el-radio-group v-model="item.otherDetail" :disabled="disabledShowState" @change="otherDetailChange(item)">
                                <el-radio label="2">否</el-radio>
                                <el-radio label="1">是</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-densityOther">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.densityOther'"
                             class="form-item1" :rules="item.otherDetail==2?[]:ctTubercleInfoPOListRules.densityOther">
                              <el-checkbox-group v-model="item.densityOther" :disabled="disabledShowState || item.otherDetail==2">
                                <el-checkbox label="1" :ref="'ctTubercleInfoPOList.'+index+'.densityOther'">胸膜牵拉</el-checkbox><br>
                                <el-checkbox label="2">空泡</el-checkbox><br>
                                <el-checkbox label="3">空腔</el-checkbox><br>
                                <el-checkbox label="4">空洞</el-checkbox><br>
                                <el-checkbox label="5">坏死</el-checkbox><br>
                                <el-checkbox label="6">钙化</el-checkbox><br>
                                <el-checkbox label="7">液体/水样</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </p>
                          <p>

                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.diameter'" class="form-item1"
                                          :rules="ctTubercleInfoPOListRules.diameter">
                              <el-input v-model.trim="item.diameter" placeholder="" style="width: 200px;"
                                        :ref="'ctTubercleInfoPOList.'+index+'.diameter'"
                                        :disabled="disabledShowState" @input="getMeanDiameter(item,index)"
                                        @change="countToFixed(item)"></el-input>
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item label="" class="form-item1" :prop="'ctTubercleInfoPOList.'+index+'.minorAxis'"
                                          :rules="ctTubercleInfoPOListRules.minorAxis">
                              <el-input v-model.trim="item.minorAxis" placeholder="" 
                                        :ref="'ctTubercleInfoPOList.'+index+'.minorAxis'"
                                        style="width: 200px;" @input="getMeanDiameter(item,index)"
                                        @blur="countToFixed1(item)"
                                        :disabled="disabledShowState"></el-input>
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item label="" class="form-item1"
                                          :prop="'ctTubercleInfoPOList.'+index+'.averageDiameter'"
                                          :rules="ctTubercleInfoPOListRules.averageDiameter">
                              <el-input v-model.trim="item.averageDiameter" placeholder="" disabled 
                                        :ref="'ctTubercleInfoPOList.'+index+'.averageDiameter'"
                                        disabled
                                        style="width: 200px;"></el-input>
                              <span class="redError" :ref="`tipsShow${index}`" :id="`tipsShow${index}`">* 平均径不能小于5mm</span>
                            </el-form-item>
                            
                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.volume'"
                                          :rules="ctTubercleInfoPOListRules.volume" class="form-item1">
                              <el-input v-model.trim="item.volume" placeholder="" 
                                        @blur="countToFixed2(item)"
                                        :ref="'ctTubercleInfoPOList.'+index+'.volume'"
                                        :disabled="disabledShowState" style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p>

                          </p>
                          <p>
                              <span>
                                <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.trueDiameter'"
                                              :rules="ctTubercleInfoPOListRules.trueDiameter" class="form-item1"
                                              v-if="item.density == '2'">
                                  <el-input v-model.trim="item.trueDiameter" placeholder="" @blur="countToFixed3(item)"
                                            :ref="'ctTubercleInfoPOList.'+index+'.volume'"
                                            :disabled="disabledShowState" 
                                            style="width: 200px;" @input="getsxMeanDiameter(item,index)"></el-input>
                                </el-form-item>
                              </span>
                          </p>
                          <p>
                              <span>
                                <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.trueMinorAxis'"
                                              :rules="ctTubercleInfoPOListRules.trueMinorAxis" class="form-item1"
                                              v-if="item.density == '2'">
                                  <el-input v-model.trim="item.trueMinorAxis" placeholder="" @blur="countToFixed4(item)"
                                            :ref="'ctTubercleInfoPOList.'+index+'.trueMinorAxis'"
                                            :disabled="disabledShowState" style="width: 200px;"
                                            @input="getsxMeanDiameter(item,index)"></el-input>
                                </el-form-item>
                              </span>
                          </p>
                          <p>
                              <span>
                                <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.trueAverageDiameter'"
                                              :rules="ctTubercleInfoPOListRules.trueAverageDiameter" class="form-item1"
                                              v-if="item.density == '2'">
                                   <el-input v-model.trim="item.trueAverageDiameter" placeholder=""
                                             :ref="'ctTubercleInfoPOList.'+index+'.trueAverageDiameter'"
                                             disabled style="width: 200px;"></el-input>
                                    <!-- <span class="redError" :ref="`tipsShowTrue${index}`" :id="`tipsShowTrue${index}`">* 平均径不能小于5mm</span> -->
                                </el-form-item>
                              </span>
                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.trueVolume'"
                                          :rules="ctTubercleInfoPOListRules.trueVolume" class="form-item1"
                                          v-if="item.density == '2'">
                              <el-input v-model.trim="item.trueVolume" placeholder="" @blur="countToFixed5(item)"
                                        :ref="'ctTubercleInfoPOList.'+index+'.trueVolume'"
                                        :disabled="disabledShowState" style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                          <p class="tabled-td-shape">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.shape'"
                                          class="form-item1 form-item200" :rules="ctTubercleInfoPOListRules.shape">
                              <el-radio-group v-model="item.shape" :disabled="disabledShowState">
                                  <el-radio label="1">圆形</el-radio>
                                  <el-radio label="2">椭圆形</el-radio>
                                  <el-radio label="3">分叶状</el-radio>
                                  <el-radio label="4">不规则</el-radio>
                                  <el-radio label="5">不能定义</el-radio>
                                </el-radio-group>
                              <!-- <el-input v-model.trim="item.shape" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.shape'"
                                        :disabled="disabledShowState" style="width: 50px;"></el-input> -->
                            </el-form-item>
                          </p>
                          <p class="tabled-td-edge">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.edge'"
                                          class="form-item1 form-item200" :rules="ctTubercleInfoPOListRules.edge">
                              <el-radio-group v-model="item.edge" :disabled="disabledShowState">
                                <el-radio label="1">毛刺</el-radio>
                                <el-radio label="2">清楚</el-radio>
                                <el-radio label="3">模糊</el-radio>
                                <el-radio label="4">光滑</el-radio>
                                <el-radio label="5">难以判断</el-radio>
                              </el-radio-group>
                              <!-- <el-input v-model.trim="item.edge" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.edge'"
                                        :disabled="disabledShowState" style="width: 50px;"></el-input> -->
                            </el-form-item>
                          </p>
                          <!-- <span v-if="form.stage ==2 || form.stage == 3">
                            <p>

                            </p>
                            <p class="tabled-td-density">
                              <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeStatus'"
                                            class="form-item1 form-item200"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeStatus">
                                <el-input v-model.trim="item.interphaseChangeStatus" placeholder=""
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeStatus'"
                                          @blur="interphaseChangeStatusChange(item)"
                                          :disabled="disabledShowState" style="width: 50px;"></el-input>
                              </el-form-item>
                            </p>
                            <p class="tabled-td-density">
                              <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeSizeStatus'"
                                            v-if="item.interphaseChangeStatus == 1"
                                            class="form-item1 form-item200"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeSizeStatus">
                                <el-input v-model.trim="item.interphaseChangeSizeStatus" placeholder=""
                                          @blur="interphaseChangeSizeStatusChange(item)"
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeSizeStatus'"
                                          :disabled="disabledShowState" style="width: 50px;"></el-input>
                              </el-form-item>
                            </p>
                            <p>
                              <el-form-item label="" class="form-item1"
                                            :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeSizeStr'"
                                            v-if="item.interphaseChangeStatus == 1 && item.interphaseChangeSizeStatus != 3"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeSizeStr">
                                <el-input v-model.trim="item.interphaseChangeSizeStr" placeholder="" 
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeSizeStr'"
                                          :disabled="disabledShowState"
                                          style="width: 200px;"></el-input>
                              </el-form-item>
                            </p>
                            <p class="tabled-td-edge">
                              <el-form-item label=""
                                            :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeComponentStatus'"
                                            v-if="item.interphaseChangeStatus == 1"
                                            class="form-item1 form-item200" :rules="ctTubercleInfoPOListRules.shape">
                                <el-input v-model.trim="item.interphaseChangeComponentStatus" placeholder=""
                                          @blur="interphaseChangeComponentStatusChange(item)"
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeComponentStatus'"
                                          :disabled="disabledShowState" style="width: 50px;"></el-input>
                              </el-form-item>
                            </p>
                            <p style="height: 60px;">
                              <el-form-item label="" class="form-item1"
                                            :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeComponentStr'"
                                            v-if="item.interphaseChangeStatus == 1 && item.interphaseChangeComponentStatus != 3"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeComponentStr">
                                <el-input v-model.trim="item.interphaseChangeComponentStr" placeholder="" 
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeComponentStr'"
                                          :disabled="disabledShowState"
                                          style="width: 200px;"></el-input>
                              </el-form-item>
                            </p>
                            <p class="tabled-td-edge">
                              <el-form-item label=""
                                            :prop="'ctTubercleInfoPOList.'+index+'.interphaseChangeDensityStatus'"
                                            v-if="item.interphaseChangeStatus == 1"
                                            class="form-item1 form-item200"
                                            :rules="ctTubercleInfoPOListRules.interphaseChangeDensityStatus">
                                <el-input v-model.trim="item.interphaseChangeDensityStatus" placeholder=""
                                          :ref="'ctTubercleInfoPOList.'+index+'.interphaseChangeDensityStatus'"
                                          :disabled="disabledShowState" style="width: 50px;"></el-input>
                              </el-form-item>
                            </p>
                          </span> -->
                          <p>

                          </p>
                          <p class="tabled-td-shape">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.nodularProperties'"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.nodularProperties">
                              <el-radio-group v-model="item.nodularProperties" :disabled="disabledShowState">
                                <el-radio label="1">良性</el-radio>
                                <el-radio label="2">良性可能大</el-radio>
                                <el-radio label="3">不能定性</el-radio>
                                <el-radio label="4">恶性可能大</el-radio>
                                <el-radio label="5">恶性</el-radio>
                              </el-radio-group>
                              <!-- <el-input v-model.trim="item.nodularProperties" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.nodularProperties'"
                                        :disabled="disabledShowState" style="width: 50px;"></el-input> -->
                            </el-form-item>
                          </p>
                          <p style="height: 500px;">
                            <el-form-item  :prop="'ctTubercleInfoPOList.'+index+'.nodularView'"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.nodularView">
                              <el-button  icon="el-icon-plus" size="mini" @click="addNodularView(item)" v-if="!disabledShowState">建议</el-button>
                              <div v-for="x,index in item.nodularView" style="font-size: 12px;line-height:20px">
                                编号{{index+1}}：{{proposals[x-1].label}}
                               <template v-if="x == 7">
                                 ：<span v-for="a in item.nodularBiopsy">{{proposals1[a-1].label}}，
                               <span v-if="a == 3">
                                 {{item.nodularBiopsyOther}}
                               </span>
                               </span>
                               </template>
                               <template v-if="x == 9">
                                 <span>，{{item.nodularViewOther}}</span>
                               </template>
                              </div>
                              <!-- <el-input v-model.trim="item.nodularView" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.nodularView'"
                                        :disabled="disabledShowState" style="width: 0px;opacity: 0"></el-input> -->
                            </el-form-item>
                          </p>
                          <p>

                          </p>
                          <p class="tabled-td-density">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.meetingStatus'"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.meetingStatus">
                              <el-radio-group v-model="item.meetingStatus" :disabled="disabledShowState">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="2">否</el-radio>
                              </el-radio-group>
                              <!-- <el-input v-model.trim="item.meetingStatus" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.meetingStatus'"
                                        @change="meetingStatusChange(item)"
                                        :disabled="disabledShowState" style="width: 50px;"></el-input> -->
                            </el-form-item>
                          </p>
                          <p class="tabled-td-density">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.meetingLevel'"
                                          v-if="item.meetingStatus == 1"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.meetingLevel">
                              <el-radio-group v-model="item.meetingLevel" :disabled="disabledShowState">
                                <el-radio label="1">普通（一个月）</el-radio>
                                <el-radio label="2">加急（一周内）</el-radio>
                                <el-radio label="3">非常紧急（三天内）</el-radio>
                              </el-radio-group>
                              <!-- <el-input v-model.trim="item.meetingLevel" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.meetingLevel'"
                                        :disabled="disabledShowState" style="width: 50px;"></el-input> -->
                            </el-form-item>
                          </p>
                          <p class="tabled-td-density">
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.meetingView'"
                                          v-if="item.meetingStatus == 1"
                                          class="form-item1 form-item200"
                                          :rules="ctTubercleInfoPOListRules.meetingView">
                              <el-radio-group v-model="item.meetingView" :disabled="disabledShowState">
                                <el-radio label="1">怀疑恶性</el-radio>
                                <el-radio label="2">性质难判定</el-radio>
                                <el-radio label="3">其他</el-radio><br>
                              </el-radio-group>
                              <!-- <el-input v-model.trim="item.meetingView" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.meetingView'"
                                        @blur="meetingViewChange(item)"
                                        :disabled="disabledShowState" style="width: 50px;"></el-input> -->
                            </el-form-item>
                          </p>
                          <p>
                            <el-form-item label="" :prop="'ctTubercleInfoPOList.'+index+'.meetingViewOther'"
                                          class="form-item1" :rules="ctTubercleInfoPOListRules.meetingViewOther"
                                          v-if="item.meetingView == '3'">
                              <el-input v-model.trim="item.meetingViewOther" placeholder=""
                                        :ref="'ctTubercleInfoPOList.'+index+'.meetingViewOther'"
                                        :disabled="disabledShowState" 
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </p>
                        </td>
                      </tr>
                    </table>
                    <table class="all-idea-table">
                      <tr>
                        <td class="all-idea-table-title">结节总体处理建议

                        </td>
                        <td class="all-idea-content">
                          <el-form-item label="" class="form-item1 form-item200" prop="new34">
                              <el-button  icon="el-icon-plus" size="mini" @click="addNodularViewAll()" v-if="!disabledShowState">建议</el-button>
                              <div v-for="x,index in form.new34" style="font-size: 12px;line-height:20px">
                                编号{{index+1}}：{{proposals[x-1].label}}
                               <template v-if="x == 7">
                                 ：<span v-for="a in form.new35">{{proposals1[a-1].label}}，
                               <span v-if="a == 3">
                                 {{form.new36}}
                               </span>
                               </span>
                               </template>
                               <template v-if="x == 9">
                                 <span>，{{form.new37}}</span>
                               </template>
                              </div>
                            </el-form-item>
                          
                        </td>
                      </tr>
                    </table>

                  </div>
                </el-row>
              </div>
            </div>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            其他异常情况
          </div>
          <el-row class="block-title form-body-content">
              <el-col :span="24">
                <el-form-item label="本次扫描是否检出其他异常情况（如气道病变、肺实变、肺不张、肺气肿、肺大泡、肺囊肿、冠状动脉钙化、其他心脏或大血管异常、甲状腺/纵隔异常、乳腺异常、腹部异常、骨质异常等）？" prop="abnormalStatus" labelWidth="100%" class="form-item">
                  <br>
                  <el-radio-group v-model="form.abnormalStatus" :disabled="disabledShowState" @change="abnormalStatusChange1(form.abnormalStatus)">
                    <el-radio :label="2" ref="abnormalStatus">无（结束问卷）</el-radio>
                    <el-radio :label="1">有</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          <div class="form-body-content" v-if="form.abnormalStatus!=2">
            <!-- 第一部分 -->
            <div>
              <el-row class="block-title">
                <el-form-item label="一、本次检查是否存在气道病变：" prop="abnormalR" labelWidth="100%" class="form-item">
                  <el-radio-group 
                  v-model="form.abnormalR" 
                  :disabled="disabledShowState"
                  @change="clearItem(form.abnormalR,['abnormalR8','abnormalR0'],['abnormalR0Position','abnormalR1Position','abnormalR2Position','abnormalR3Position','abnormalR4Position','abnormalR5Position','abnormalR6Position'],2,2);abnormalStatusChange()">
                    <el-radio :label="2">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <div class="form-index-checkbox" v-if="form.abnormalR!=2">
                        <span class="form-index-title">请勾选具体类型（可多选）</span>
                        <br>
                          <el-form-item prop="abnormalR0" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR0" @change="clearItem(form.abnormalR0,[],['abnormalR0Position'],2,2)"
                                         :disabled="disabledShowState">气道腔内结节</el-checkbox>
                            <el-form-item label="请勾选具体位置：" prop="abnormalR0Position" labelWidth="150px" class="form-item" v-if="form.abnormalR0==1">
                              <el-checkbox-group v-model="form.abnormalR0Position" :disabled="disabledShowState">
                                  <el-checkbox 
                                  v-for="item in position"
                                  :key="item.value"
                                  :label="item.value" 
                                  ref="item2">{{item.label}}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-form-item>

                          <el-form-item prop="abnormalR1" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR1" @change="clearItem(form.abnormalR1,[],['abnormalR1Position'],2,2)"
                                         :disabled="disabledShowState">支气管壁增厚</el-checkbox>
                            <el-form-item label="请勾选具体位置："  prop="abnormalR1Position" labelWidth="150px" class="form-item" v-if="form.abnormalR1==1">
                              <el-checkbox-group v-model="form.abnormalR1Position" :disabled="disabledShowState">
                                  <el-checkbox 
                                  v-for="item in position"
                                  :key="item.value"
                                  :label="item.value" 
                                  ref="item2">{{item.label}}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-form-item>

                          <el-form-item prop="abnormalR2" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR2" @change="clearItem(form.abnormalR2,[],['abnormalR2Position'],2,2)"
                                         :disabled="disabledShowState">“树芽征”样病灶</el-checkbox>
                            <el-form-item label="请勾选具体位置："  prop="abnormalR2Position" labelWidth="150px" class="form-item" v-if="form.abnormalR2==1">
                              <el-checkbox-group v-model="form.abnormalR2Position" :disabled="disabledShowState">
                                  <el-checkbox 
                                  v-for="item in position"
                                  :key="item.value"
                                  :label="item.value" 
                                  ref="item2">{{item.label}}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-form-item>
                     
                          <el-form-item prop="abnormalR3" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR3" @change="clearItem(form.abnormalR3,[],['abnormalR3Position'],2,2)"
                                         :disabled="disabledShowState">支气管扩张</el-checkbox>
                            <el-form-item label="请勾选具体位置：" prop="abnormalR3Position" labelWidth="150px" class="form-item" v-if="form.abnormalR3==1">
                              <el-checkbox-group v-model="form.abnormalR3Position" :disabled="disabledShowState">
                                  <el-checkbox 
                                  v-for="item in position"
                                  :key="item.value"
                                  :label="item.value" 
                                  ref="item2">{{item.label}}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-form-item>
                     
                          <el-form-item prop="abnormalR4" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR4" @change="clearItem(form.abnormalR4,[],['abnormalR4Position'],2,2)"
                                         :disabled="disabledShowState">弥漫性“马赛克”样改变</el-checkbox>
                            <el-form-item label="请勾选具体位置：" prop="abnormalR4Position" labelWidth="150px" class="form-item" v-if="form.abnormalR4==1">
                              <el-checkbox-group v-model="form.abnormalR4Position" :disabled="disabledShowState">
                                  <el-checkbox 
                                  v-for="item in position"
                                  :key="item.value"
                                  :label="item.value" 
                                  ref="item2">{{item.label}}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-form-item>
                       
                          <el-form-item prop="abnormalR5" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR5" @change="clearItem(form.abnormalR5,[],['abnormalR5Position'],2,2)"
                                         :disabled="disabledShowState">粘液栓塞</el-checkbox>
                            <el-form-item label="请勾选具体位置：" prop="abnormalR5Position" labelWidth="150px" class="form-item" v-if="form.abnormalR5==1">
                              <el-checkbox-group v-model="form.abnormalR5Position" :disabled="disabledShowState">
                                  <el-checkbox 
                                  v-for="item in position"
                                  :key="item.value"
                                  :label="item.value" 
                                  ref="item2">{{item.label}}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-form-item>
                        
                          <el-form-item prop="abnormalR6" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalR6" @change="clearItem(form.abnormalR6,[],['abnormalR6Position'],2,2)"
                                         :disabled="disabledShowState">空气潴留（呼气性）</el-checkbox>
                            <el-form-item label="请勾选具体位置：" prop="abnormalR6Position" labelWidth="150px" class="form-item" v-if="form.abnormalR6==1">
                              <el-checkbox-group v-model="form.abnormalR6Position" :disabled="disabledShowState">
                                  <el-checkbox 
                                  v-for="item in position"
                                  :key="item.value"
                                  :label="item.value" 
                                  ref="item2">{{item.label}}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                          </el-form-item>
                        
                          <el-form-item prop="abnormalR7" labelWidth="430px" class="form-item">
                            <el-checkbox :true-label="1" :false-label="2" 
                            v-model="form.abnormalR7"
                            :disabled="disabledShowState"
                            @change="clearItem(form.abnormalR7,['abnormalR8'],[],0,2)">其他
                            </el-checkbox>
                            <div class="form-inline" style="width: 240px;">
                                  <span>
                                      <el-form-item label="" prop="abnormalR8" class="form-item1" :inline-message="true"
                                                    v-if="form.abnormalR7 == 1">
                                        <el-input v-model.trim="form.abnormalR8" placeholder=""
                                                  :disabled=" disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                                  
                                                  style="width: 200px;"></el-input>
                                      </el-form-item>
                                  </span>
                              <span>
                                      <el-form-item label="" prop="" class="form-item1" :inline-message="true"
                                                    v-if="form.abnormalR7 == 2">
                                        <el-input v-model.trim="form.abnormalR8" placeholder="" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                                  disabled style="width: 200px;"></el-input>
                                      </el-form-item>
                                  </span>
                            </div>
                          </el-form-item>
                      </div>
                     
            </div>

              <!-- 第二部分 -->
              <div>
                <el-row class="block-title">
                  <el-form-item label="二、本次检查是否存在肺实变、肺不张、肺气肿、肺大泡、肺囊肿、肺间质纤维化、纤维瘢痕、小气道病变等异常？" prop="new0" label-width="100%" class="form-item">
                        <el-radio-group
                         v-model="form.new0" 
                         :disabled="disabledShowState"
                          @change="clearItem(form.new0,['abnormalL','abnormalL1','abnormalL2','abnormalL3','abnormalL4','abnormalL5','abnormalJ','abnormalJ1','abnormalJ2','abnormalJ3','abnormalJ4','abnormalJ5','abnormalN','abnormalN1',
'new2','new1','new39','new41','new43','new45'],['new40','new42','new44'],2,2);abnormalStatusChange()">
                          <el-radio :label="2">否</el-radio>
                          <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                </el-row>
                <table class="form-abnormalCondition-table" v-if="form.new0!=2">
                  <tr class="form-abnormalCondition-th">
                    <td>异常情况类别</td>
                    <td>异常情况类别</td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="abnormalL" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          肺实变
                        </span>
                        <el-radio-group 
                        v-model="form.abnormalL" 
                        :disabled="disabledShowState" @change="new0Change">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.abnormalL!=2">
                        <span class="form-index-title">请勾选具体位置 <span>（可多选）</span></span>
                        <el-form-item prop="abnormalL1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL1"
                                       :disabled="disabledShowState">右上叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalL2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL2"
                                       :disabled="disabledShowState">右中叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalL3" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL3"
                                       :disabled="disabledShowState">右下叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalL4" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL4"
                                       :disabled="disabledShowState">左上叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalL5" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalL5"
                                       :disabled="disabledShowState">左下叶
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>
                    <td>
                      <el-form-item prop="abnormalJ" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          肺不张
                        </span>
                        <el-radio-group v-model="form.abnormalJ" :disabled="disabledShowState" @change="new0Change">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox"  v-if="form.abnormalJ!=2">
                        <span class="form-index-title">请勾选具体位置 <span>（可多选）</span></span>
                        <el-form-item prop="abnormalJ1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ1"
                                       :disabled="disabledShowState">右上叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalJ2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ2"
                                       :disabled="disabledShowState">右中叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalJ3" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ3"
                                       :disabled="disabledShowState">右下叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalJ4" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ4"
                                       :disabled="disabledShowState">左上叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalJ5" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalJ5"
                                       :disabled="disabledShowState">左下叶
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="abnormalN" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          肺气肿
                          <!-- <el-popover
                              placement="bottom"
                              title=""
                              width="300"
                              trigger="click"
                              slot="content"
                            >
                              <span style="font-weight: 700;">注：轻度 、中度 、重度的定义为：</span><br>
                              <span style="font-weight: 700;">轻度：</span>冠状位观察，影像诊断医生视觉上，肺气肿区域占整个肺体积<1/3 <br>
                              <span style="font-weight: 700;">中度：</span>冠状位观察，影像诊断医生视觉上，肺气肿区域占整个肺体积1/3~2/3<br>
                              <span style="font-weight: 700;">重度：</span>冠状位观察，影像诊断医生视觉上，肺气肿区域占整个肺体积超过2/3<br>
                                <span slot="reference"><i class="el-icon-question" style="cursor: pointer;"></i></span>
                            </el-popover> -->
                        </span>
                        <el-radio-group v-model="form.abnormalN" :disabled="disabledShowState"
                                        @change="item10_14Change(form.abnormalN);new0Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div class="form-index-checkbox" v-if="form.abnormalN!=2">
                        <span class="form-index-title">请描述严重程度 <span>（单选）</span>
                        </span>
                        <span>
                           <el-form-item class="form-item-check" prop="abnormalN1">
                              <el-radio-group v-model="form.abnormalN1" :disabled="disabledShowState">
                                 <el-radio label="1">轻度</el-radio>
                                 <el-radio label="2">中度</el-radio>
                                 <el-radio label="3">重度</el-radio>
                                 <el-radio label="4">难以判断</el-radio>
                              </el-radio-group>
                           </el-form-item>
                        </span>
                      </div>
                      <div style="padding-left:20px;">
                        <small style="font-weight: 700;">注：轻度 、中度 、重度的定义为：</small><br>
                        <small>轻度：冠状位观察，影像诊断医生视觉上，肺气肿区域占整个肺体积<1/3 <br>中度：冠状位观察，影像诊断医生视觉上，肺气肿区域占整个肺体积1/3~2/3<br>重度：冠状位观察，影像诊断医生视觉上，肺气肿区域占整个肺体积>2/3</small>
                      </div>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item" prop="new1">
                        <span class="form-span-title">
                         肺大泡
                        </span>

                        <el-radio-group v-model="form.new1" :disabled="disabledShowState" @change="new0Change">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item" prop="new2">
                        <span class="form-span-title">
                         肺囊肿
                        </span>

                        <el-radio-group v-model="form.new2" :disabled="disabledShowState" @change="new0Change">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <br>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item" prop="new39">
                        <span class="form-span-title">
                         肺间质纤维化
                        </span>

                        <el-radio-group 
                        v-model="form.new39" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.new39,[],['new40'],2,2);new0Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <br>
                      <div class="form-index-checkbox" v-if="form.new39!=2">
                        <span class="form-index-title">请勾选具体位置 <span>（可多选）</span>
                        </span>
                        <span>
                           <el-form-item class="form-item-check" prop="new40">
                              <el-checkbox-group v-model="form.new40" :disabled="disabledShowState">
                                 <el-checkbox label="1">弥漫性</el-checkbox><br>
                                 <el-checkbox label="2">右上叶</el-checkbox><br>
                                 <el-checkbox label="3">右中叶</el-checkbox><br>
                                 <el-checkbox label="4">右下叶</el-checkbox><br>
                                 <el-checkbox label="5">左上叶</el-checkbox><br>
                                 <el-checkbox label="6">左下叶</el-checkbox>
                              </el-checkbox-group>
                           </el-form-item>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item" prop="new41">
                        <span class="form-span-title">
                         纤维瘢痕
                        </span>
                        <el-radio-group 
                        v-model="form.new41" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.new41,[],['new42'],2,2);new0Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <br>
                      <div class="form-index-checkbox" v-if="form.new41!=2">
                        <span class="form-index-title">请勾选具体位置 <span>（可多选）</span>
                        </span>
                        <span>
                           <el-form-item class="form-item-check" prop="new42">
                              <el-checkbox-group v-model="form.new42" :disabled="disabledShowState">
                                 <el-checkbox label="1">右上叶</el-checkbox><br>
                                 <el-checkbox label="2">右中叶</el-checkbox><br>
                                 <el-checkbox label="3">右下叶</el-checkbox><br>
                                 <el-checkbox label="4">左上叶</el-checkbox><br>
                                 <el-checkbox label="5">左下叶</el-checkbox>
                              </el-checkbox-group>
                           </el-form-item>
                        </span>
                      </div>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item" prop="new43">
                        <span class="form-span-title">
                         肺钙化灶
                        </span>
                        <el-radio-group 
                        v-model="form.new43" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.new43,[],['new44'],2,2);new0Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <br>
                      <div class="form-index-checkbox" v-if="form.new43!=2">
                        <span class="form-index-title">请勾选具体位置 <span>（可多选）</span>
                        </span>
                        <span>
                           <el-form-item class="form-item-check" prop="new44">
                              <el-checkbox-group v-model="form.new44" :disabled="disabledShowState">
                                 <el-checkbox label="1">右</el-checkbox><br>
                                 <el-checkbox label="2">左</el-checkbox>
                              </el-checkbox-group>
                           </el-form-item>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <el-form-item labelWidth="430px" class="form-item" prop="new45">
                        <span class="form-span-title">
                         小气道病变
                        </span>
                        <el-radio-group v-model="form.new45" :disabled="disabledShowState" @change="new0Change">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- 三部分 -->
              <div>
                <el-row class="block-title">
                  <el-form-item label="三、本次检查是否存在胸腔积液或胸膜异常（胸膜增厚或斑块、胸膜钙化、胸膜肿物）或胸壁异常？" 
                  prop="new4" labelWidth="100%" class="form-item">
                        <el-radio-group 
                        v-model="form.new4" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.new4,['abnormalE','abnormalD','abnormalD1','abnormalD2','new5','new6','abnormalG','new38','abnormalE1','abnormalE2','abnormalG1'],['new5Other','new6Other','abnormalGOther'],2,2);abnormalStatusChange()">
                          <el-radio :label="2">否</el-radio>
                          <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                </el-row>
                 <table class="form-abnormalCondition-table" v-if="form.new4!=2">
                  <tr class="form-abnormalCondition-th">
                    <td>异常情况类别</td>
                    <td>异常情况类别</td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="abnormalE" labelWidth="430px" class="form-item">
                        <span class="form-span-title">胸腔积液</span>
                        <el-radio-group 
                        v-model="form.abnormalE" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.abnormalE,['abnormalE1','abnormalE2'],[],2,2);new4Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div class="form-index-checkbox" v-if="form.abnormalE!=2">
                           <el-form-item class="form-item-check" prop="abnormalE1">
                             <span class="form-index-title">胸腔积液（右侧）:</span>
                             <br>
                              <el-radio-group v-model="form.abnormalE1" :disabled="disabledShowState">
                                 <el-radio label="1">无</el-radio>
                                 <el-radio label="2">少量</el-radio>
                                 <el-radio label="3">中量</el-radio>
                                 <el-radio label="4">大量</el-radio>
                              </el-radio-group>
                           </el-form-item>
                           <el-form-item class="form-item-check" prop="abnormalE2">
                             <span class="form-index-title">胸腔积液（左侧）:</span>
                             <br>
                              <el-radio-group v-model="form.abnormalE2" :disabled="disabledShowState">
                                 <el-radio label="1">无</el-radio>
                                 <el-radio label="2">少量</el-radio>
                                 <el-radio label="3">中量</el-radio>
                                 <el-radio label="4">大量</el-radio>
                              </el-radio-group>
                           </el-form-item>
                      </div>
                    </td>
                    <td>
                      <el-form-item prop="abnormalD" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          胸膜增厚或胸膜斑块
                        </span>
                        <el-radio-group 
                        v-model="form.abnormalD" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.abnormalD,['abnormalD1','abnormalD2'],[],2,2);new4Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.abnormalD != 2">
                        <span class="form-index-title">胸膜增厚或胸膜斑块的位置： <span>（可多选）</span></span>
                        <el-form-item prop="abnormalD1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalD1"
                                       :disabled="disabledShowState">右
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalD2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalD2"
                                       :disabled="disabledShowState">左
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="new5" labelWidth="800px" class="form-item">
                        <span class="form-span-title">胸膜钙化</span>
                        <el-radio-group 
                        v-model="form.new5" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.new5,[],['new5Other'],2,2);new4Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.new5 != 2">
                        <span class="form-index-title">请勾选具体位置：<span>（可多选）</span></span>
                        <el-form-item prop="new5Other" labelWidth="430px" class="form-item-check">
                          <el-checkbox-group v-model="form.new5Other" :disabled="disabledShowState">
                             <el-checkbox label="1">右</el-checkbox>
                             <el-checkbox label="2">左</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </p>
                    </td>
                    <td>
                      <el-form-item prop="new6" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          胸膜肿物
                        </span>
                        <el-radio-group 
                        v-model="form.new6" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.new6,[],['new6Other'],2,2);new4Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <p class="form-index-checkbox" v-if="form.new6 != 2">
                        <span class="form-index-title">请勾选具体位置： <span>（可多选）</span></span>
                        <el-form-item prop="new6Other" labelWidth="430px" class="form-item">
                          <el-checkbox-group v-model="form.new6Other" :disabled="disabledShowState">
                            <el-checkbox label="1">右</el-checkbox>
                            <el-checkbox label="2">左</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    
                    <td colspan="2">
                      <el-form-item labelWidth="430px" class="form-item" prop="abnormalG">
                        <span class="form-span-title">
                          胸壁异常
                        </span>
                        <el-radio-group 
                        v-model="form.abnormalG" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.abnormalG,['new38','abnormalG1'],['abnormalGOther'],2,2);new4Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                        <br>
                        <div v-if="form.abnormalG != 2" style="margin-left:-15px;">
                          <p class="form-index-checkbox">
                            <el-form-item prop="abnormalGOther" class="form-item">
                              <span style="margin-left:-15px;">请勾选具体位置：（可多选）</span>
                                <el-checkbox-group v-model="form.abnormalGOther" :disabled="disabledShowState">
                                  <el-checkbox label="1">右</el-checkbox>
                                  <el-checkbox label="2">左</el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                            </p>
                          <p class="form-index-checkbox">
                              <el-form-item prop="new38" class="form-item">
                                  <span style="margin-left:-15px;">请勾选：（单选）</span>
                                <el-radio-group v-model="form.new38" :disabled="disabledShowState">
                                    <el-radio :label="1">骨质破坏</el-radio>
                                    <el-radio :label="2">肿物</el-radio>
                                    <el-radio :label="3">其他</el-radio>
                                </el-radio-group>
                              </el-form-item>
                            
                            </p>
                          <span v-if="form.new38==3">
                            请描述
                            <el-form-item label="" prop="abnormalG1" class="form-item1" :inline-message="true">
                              <el-input v-model.trim="form.abnormalG1" placeholder=""
                                        :disabled="disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        style="width: 200px;" maxlength="100"></el-input>
                            </el-form-item>
                          </span>
                        </div>
                      </el-form-item>
                    </td>
                  </tr>
              </table>
              </div>
              <!-- 四部分 -->
              <div>
                <el-row  class="block-title">
                       <el-form-item prop="abnormalC" label="四、本次检查是否存在“冠状动脉钙化” ？" labelWidth="100%" class="form-item">
                        <el-radio-group v-model="form.abnormalC" @change="abnormalCChange(form.abnormalC);abnormalStatusChange();" :disabled="disabledShowState">
                          <el-radio :label="2">否</el-radio>
                          <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div class="form-index-checkbox" v-if="form.abnormalC != 2">
                        <p>
                          <span class="form-index-title">请勾选具体位置 <span>（可多选）</span>及严重程度</span>
                          <el-form-item prop="abnormalC_2_1" labelWidth="430px" class="form-item">
                            <el-checkbox-group v-model="form.abnormalC_2_1" :disabled="disabledShowState"
                                               @change="checkBoxChange('abnormalC_2_1','abnormalC1')">
                              <el-checkbox label="1">左主干</el-checkbox>
                              <span>
                               <el-form-item prop="abnormalC1" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_1 == true">
                                   <el-radio-group v-model="form.abnormalC1" :disabled="disabledShowState">
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                              <span>
                               <el-form-item prop="" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_1 == false">
                                  <el-radio-group v-model="form.abnormalC1"  disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                            </el-checkbox-group>

                          </el-form-item>

                        </p>
                        <p>
                          <el-form-item prop="abnormalC_2_2" labelWidth="430px" class="form-item">
                            <el-checkbox-group v-model="form.abnormalC_2_2"
                                               @change="checkBoxChange('abnormalC_2_2','abnormalC2')">
                              <el-checkbox label="2" :disabled="disabledShowState">左前降支</el-checkbox>
                              <span>
                               <el-form-item prop="abnormalC2" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_2 == true">
                                   <el-radio-group v-model="form.abnormalC2" :disabled="disabledShowState">
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                              <span>
                               <el-form-item prop="" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_2 == false">
                                  <el-radio-group v-model="form.abnormalC2"  disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                            </el-checkbox-group>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item prop="abnormalC_2_3" labelWidth="430px" class="form-item">
                            <el-checkbox-group v-model="form.abnormalC_2_3" :disabled="disabledShowState"
                                               @change="checkBoxChange('abnormalC_2_3','abnormalC3')">
                              <el-checkbox label="3" :disabled="disabledShowState">左回旋支</el-checkbox>
                              <span>
                               <el-form-item prop="abnormalC3" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_3 == true">
                                   <el-radio-group v-model="form.abnormalC3" :disabled="disabledShowState">
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                              <span>
                               <el-form-item prop="" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_3 == false">
                                  <el-radio-group v-model="form.abnormalC3"  disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                            </el-checkbox-group>
                          </el-form-item>
                        </p>
                        <p>
                          <el-form-item prop="abnormalC_2_4" labelWidth="430px" class="form-item">
                            <el-checkbox-group v-model="form.abnormalC_2_4"
                                               @change="checkBoxChange('abnormalC_2_4','abnormalC4')"
                                               :disabled="disabledShowState">
                              <el-checkbox label="4">右主干</el-checkbox>
                              <span>
                               <el-form-item prop="abnormalC4" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_4 == true">
                                   <el-radio-group v-model="form.abnormalC4" :disabled="disabledShowState">
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                              <span>
                               <el-form-item prop="" labelWidth="430px" class="form-item form-item1"
                                             :inline-message="true" v-if="form.abnormalC_2_4 == false">
                                  <el-radio-group v-model="form.abnormalC4"  disabled>
                                      <el-radio label="1">轻度</el-radio>
                                      <el-radio label="2">中度</el-radio>
                                      <el-radio label="3">重度</el-radio>
                                      <el-radio label="4">难以判断</el-radio>
                                    </el-radio-group>
                               </el-form-item>
                              </span>
                            </el-checkbox-group>
                          </el-form-item>
                        </p>
                      </div>
                    </el-row>
                    <div style="padding-left:20px;">
                      <small style="font-weight: 700;">注：轻度 、中度 、重度的定义为：</small><br>
                      <small>轻度：冠状动脉钙化长度（如多灶不连续则计算总和）占整枝冠脉长度的<1/3 <br>中度：冠状动脉钙化长度（如多灶不连续则计算总和）占整枝冠脉长度的1/3~2/3 <br>重度：冠状动脉钙化长度（如多灶不连续则计算总和）占整枝冠脉长度＞2/3</small>
                    </div>
              </div>
              <!-- 五部分 -->
              <div>
                <el-row class="block-title">
                  <el-form-item label="五、本次检查心脏或大血管是否存在以下异常？（如：主动脉壁钙化、心包积液、房室增大、瓣膜钙化等）" prop="new7" labelWidth="100%" class="form-item">
                    <el-radio-group 
                    v-model="form.new7" 
                    :disabled="disabledShowState"
                    @change="clearItem(form.new7,['new8','new9','new10','new12'],['new11'],2,2);abnormalStatusChange()">
                      <el-radio :label="2">否</el-radio>
                      <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>

                 <table class="form-abnormalCondition-table" v-if="form.new7!=2">
                  <tr class="form-abnormalCondition-th">
                    <td>异常情况类别</td>
                    <td>异常情况类别</td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item prop="new8" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          主动脉壁钙化：
                        </span>
                        <el-radio-group 
                        v-model="form.new8" 
                        :disabled="disabledShowState"
                        @change="new7Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </td>
                    <td>
                      <el-form-item prop="new9" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          心包积液：
                        </span>
                        <el-radio-group v-model="form.new9" :disabled="disabledShowState" @change="new7Change()">
                          <el-radio :label="1">无</el-radio>
                          <el-radio :label="2">少量</el-radio>
                          <el-radio :label="3">中量</el-radio>
                          <el-radio :label="4">大量</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <el-row>
                        <el-form-item prop="new10" labelWidth="500px" class="form-item">
                          <span>其他（如房室增大、瓣膜钙化、主动脉扩张、主动脉瘤、主动脉夹层）：</span>
                          <el-radio-group v-model="form.new10" :disabled="disabledShowState" @change="clearItem(form.new10,['new12'],['new11'],2,2);new7Change()">
                            <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-row>
                      <el-row v-if="form.new10!=2">
                        <el-form-item prop="new11" labelWidth="430px" class="form-item">
                          <span class="form-span-title">请勾选具体类型（可多选）：</span>
                          <el-checkbox-group v-model="form.new11" :disabled="disabledShowState" style="padding-left:15px !important;">
                            <el-checkbox label="1">房室增大</el-checkbox><br>
                            <el-checkbox label="2">瓣膜钙化</el-checkbox><br>
                            <el-checkbox label="3">主动脉扩张</el-checkbox><br>
                            <el-checkbox label="4">主动脉瘤</el-checkbox><br>
                            <el-checkbox label="5">主动脉夹层</el-checkbox><br>
                            <el-checkbox label="6">其他</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                        <el-form-item prop="new12" class="form-item1" :inline-message="true" v-if="form.new11.includes('6')">
                          <span>其他:</span>
                          <el-input v-model.trim="form.new12" placeholder=""
                                    :disabled="disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                    style="width: 200px;" maxlength="100"></el-input>
                        </el-form-item>
                      </el-row>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- 六部分 -->
              <div>
                <el-row class="block-title">
                  <el-form-item label="六、本次检查是否存在甲状腺/纵隔异常（扫描野内）？" prop="new13" labelWidth="430px" class="form-item">
                    <el-radio-group 
                    v-model="form.new13" 
                    :disabled="disabledShowState"
                    @change="clearItem(form.new13,['new14','new16','new17','new19','abnormalA','abnormalA1','abnormalA2','abnormalA3','abnormalA4','abnormalA5','abnormalA6','abnormalA7','abnormalA8','abnormalA9','abnormalA10','abnormalA11','abnormalA12','abnormalA13','abnormalA14','abnormalA15','abnormalA16','abnormalA17','abnormalA18','abnormalA19','abnormalA20','abnormalA21','new20','new21','new23','new25'],['new15','new18','new22','new24'],2,2);abnormalStatusChange()">
                      <el-radio :label="2">否</el-radio>
                      <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>

                <table class="form-abnormalCondition-table" v-if="form.new13!=2">
                  <tr class="form-abnormalCondition-th">
                    <td>异常情况类别</td>
                    <td>异常情况类别</td>
                  </tr>
                  <tr>
                    <td>
                      <el-row>
                        <el-form-item prop="new14" labelWidth="430px" class="form-item">
                        <span class="form-span-title">
                          甲状腺是否存在异常（结节/肿物（结节：≤3cm   肿物：＞3cm）、钙化、囊肿、增大等）？
                        </span>
                        <el-radio-group 
                        v-model="form.new14" 
                        :disabled="disabledShowState"
                        @change="clearItem(form.new14,['new16'],['new15'],2,2);new13Change()">
                          <el-radio :label="2">否</el-radio>
                          <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      </el-row>
                      <el-row  v-if="form.new14!=2">
                        <el-form-item prop="new15" labelWidth="430px" class="form-item">
                          <span class="form-span-title">
                         甲状腺异常的具体描述（可多选）：
                        </span>
                          <el-checkbox-group v-model="form.new15" :disabled="disabledShowState">
                            <el-checkbox label="1">结节/肿物（定义：结节：≤3cm   肿物：＞3cm）</el-checkbox>
                            <el-checkbox label="2">钙化</el-checkbox>
                            <el-checkbox label="3">囊肿</el-checkbox>
                            <el-checkbox label="4">增大</el-checkbox>
                            <el-checkbox label="5">其他</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                        <el-form-item prop="new16" class="form-item1" :inline-message="true" v-if="form.new15.includes('5')">
                          <span>请描述具体情况：</span>
                          <el-input v-model.trim="form.new16" placeholder=""
                                    :disabled="disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                    style="width: 200px;" maxlength="100"></el-input>
                        </el-form-item>
                      </el-row>
                    </td>

                    <td>
                      <el-row>
                        <el-form-item prop="new17" labelWidth="430px" class="form-item">
                         <span class="form-span-title">
                         胸腺是否存在异常（结节/肿物（结节：≤3cm   肿物：＞3cm）、增大、囊肿等）？
                        </span>
                        <el-radio-group v-model="form.new17" :disabled="disabledShowState" @change="clearItem(form.new17,['new19'],['new18'],2,2);new13Change()">
                          <el-radio :label="2">否</el-radio>
                          <el-radio :label="1">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      </el-row>
                      <el-row v-if="form.new17!=2">
                        <el-form-item prop="new18" labelWidth="430px" class="form-item">
                          <span class="form-span-title">胸腺异常的具体描述（可多选）：</span>
                          <el-checkbox-group v-model="form.new18" :disabled="disabledShowState">
                            <el-checkbox label="1">结节/肿物（定义：结节：≤3cm   肿物：＞3cm）</el-checkbox>
                            <el-checkbox label="2">增大</el-checkbox>
                            <el-checkbox label="3">囊肿</el-checkbox>
                            <el-checkbox label="4">其他</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                        <el-form-item prop="new19" class="form-item1" :inline-message="true"  v-if="form.new18.includes('1')">
                          <span>请描述胸腺结节/肿物的具体情况：</span>
                          <el-input v-model.trim="form.new19" placeholder=""
                                    :disabled="disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                    style="width: 200px;" maxlength="100"></el-input>
                        </el-form-item>
                      </el-row>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <el-row>
                      <el-form-item prop="abnormalA" labelWidth="430px" class="form-item">
                         <span class="form-span-title">
                        淋巴结（肺门或纵隔短径≥10mm及短径≥5mm食管旁淋巴结）
                        </span>
                        <el-radio-group v-model="form.abnormalA" :disabled="disabledShowState" @change="new13Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                  </el-row>
                  <p class="form-index-checkbox" v-if="form.abnormalA!=2">
                        <span class="form-index-title">请勾选具体位置 <span>（可多选）</span></span>
                        <el-form-item prop="abnormalA1" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA1"
                                       :disabled="disabledShowState">1 下颈、锁骨上、胸骨切迹
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA2" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA2"
                                       :disabled="disabledShowState">2R 右上气管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA3" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA3"
                                       :disabled="disabledShowState">2L 左上气管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA4" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA4"
                                       :disabled="disabledShowState">3 纵隔血管前和（或）气管后
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA5" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA5"
                                       :disabled="disabledShowState">4R 右下气管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA6" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA6"
                                       :disabled="disabledShowState">4L 左下气管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA7" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA7"
                                       :disabled="disabledShowState">5 主－肺动脉窗
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA8" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA8"
                                       :disabled="disabledShowState">6 主动脉弓旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA9" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA9"
                                       :disabled="disabledShowState">7 隆突下
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA10" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA10"
                                       :disabled="disabledShowState">8 食管旁
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA11" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA11"
                                       :disabled="disabledShowState">9 肺韧带
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA12" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA12"
                                       :disabled="disabledShowState">10R 右肺门
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA13" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA13"
                                       :disabled="disabledShowState">10L 左肺门
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA14" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA14"
                                       :disabled="disabledShowState">11R 右肺叶间
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA15" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA15"
                                       :disabled="disabledShowState">11L 左肺叶间
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA16" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA16"
                                       :disabled="disabledShowState">12R 右肺叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA17" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA17"
                                       :disabled="disabledShowState">12L 左肺叶
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA18" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA18"
                                       :disabled="disabledShowState">13R 右肺段
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA19" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA19"
                                       :disabled="disabledShowState">13L 左肺段
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA20" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA20"
                                       :disabled="disabledShowState">14R 右肺亚段
                          </el-checkbox>
                        </el-form-item>
                        <el-form-item prop="abnormalA21" labelWidth="430px" class="form-item-check">
                          <el-checkbox :true-label="1" :false-label="2" v-model="form.abnormalA21"
                                       :disabled="disabledShowState">14L 左肺亚段
                          </el-checkbox>
                        </el-form-item>
                      </p>
                    </td>

                    <td>
                      <el-row>
                        <el-form-item prop="new20" labelWidth="430px" class="form-item">
                           <span class="form-span-title">
                        是否存在肺门或纵隔钙化淋巴结？
                        </span>
                          <el-radio-group v-model="form.new20" :disabled="disabledShowState" @change="new13Change()">
                            <el-radio :label="2">否</el-radio>
                            <el-radio :label="1">是</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-row>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <el-row>
                        <el-form-item prop="new21" labelWidth="430px" class="form-item">
                          <span class="form-span-title">
                        是否存在腋窝淋巴结（短径≥10mm）？
                        </span>
                          <el-radio-group v-model="form.new21" :disabled="disabledShowState"  @change="clearItem(form.new21,[],['new22'],2,2);new13Change()">
                            <el-radio :label="2">否</el-radio>
                            <el-radio :label="1">是</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-row>
                      <el-row v-if="form.new21!=2">
                        <el-form-item prop="new22" labelWidth="430px" class="form-item">
                          <span class="form-span-title">
                        腋窝淋巴结的位置：
                        </span>
                          <el-checkbox-group v-model="form.new22" :disabled="disabledShowState">
                            <el-checkbox :label="1">右</el-checkbox>
                            <el-checkbox :label="2">左</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </el-row>
                    </td>
                    <td>
                      <el-row>
                        <el-form-item prop="new23" labelWidth="430px" class="form-item">
                          <span class="form-span-title">食管是否存在异常？</span>
                          <el-radio-group v-model="form.new23" :disabled="disabledShowState" @change="clearItem(form.new23,['new25'],['new24'],2,2);new13Change()">
                            <el-radio :label="2">否</el-radio>
                            <el-radio :label="1">是</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-row>
                      <el-row v-if="form.new23!=2">
                        <el-form-item prop="new24" labelWidth="430px" class="form-item">
                          <span class="form-span-title">请勾选（可多选）：</span>
                          <el-checkbox-group v-model="form.new24" :disabled="disabledShowState">
                            <el-checkbox label="1">食管壁增厚</el-checkbox>
                            <el-checkbox label="2">裂孔疝</el-checkbox>
                            <el-checkbox label="3">其他</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                        <el-form-item prop="new25" class="form-item1" :inline-message="true"  v-if="form.new24.includes('3')">
                          <span>请描述：</span>
                          <el-input v-model.trim="form.new25" placeholder=""
                                    :disabled="disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                    style="width: 200px;" maxlength="100"></el-input>
                        </el-form-item>
                      </el-row>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- 七部分 -->
              <div>
                <el-row class="block-title">
                  <el-form-item label="七、本次检查是否存在乳腺异常？" prop="new26" labelWidth="430px" class="form-item">
                    <el-radio-group 
                    v-model="form.new26" 
                    :disabled="disabledShowState"
                    @change="clearItem(form.new26,['new29'],['new27','new28'],2,2);abnormalStatusChange()">
                      <el-radio :label="2">否</el-radio>
                      <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>
                <el-row v-if="form.new26!=2">
                  <el-form-item label="请选择位置：" prop="new27" labelWidth="200px" class="form-item">
                    <el-checkbox-group v-model="form.new27" :disabled="disabledShowState">
                      <el-checkbox label="1">右</el-checkbox>
                      <el-checkbox label="2">左</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-row>
                <el-row v-if="form.new26!=2">
                  <el-form-item label="请选择具体类型：" prop="new28" labelWidth="200px" class="form-item">
                    <el-checkbox-group v-model="form.new28" :disabled="disabledShowState">
                      <el-checkbox label="1">结节/肿物</el-checkbox>
                      <el-checkbox label="2">钙化</el-checkbox>
                      <el-checkbox label="3">结构不对称</el-checkbox>
                      <el-checkbox label="4">其他</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="其他：" prop="new29" :inline-message="true" v-if="form.new28.includes('4')">
                          <el-input v-model.trim="form.new29" placeholder=""
                                    :disabled="disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                    style="width: 500px;" maxlength="100"></el-input>
                        </el-form-item>
                </el-row>
              </div>

              <!-- 八部分 -->
              <div>
                <el-row class="block-title">
                  <el-form-item label="八、本次检查是否存在腹部异常（扫描野内）？" prop="new30" labelWidth="430px" class="form-item">
                    <el-radio-group 
                    v-model="form.new30" 
                    :disabled="disabledShowState"
                    @change="clearItem(form.new30,['abnormalK','abnormalK1','abnormalH','abnormalH1','abnormalQ','abnormalQ1','abnormalS','abnormalS1','abnormalO','abnormalO1','abnormalM','abnormalM1','new33'],['abnormalK2','abnormalH2','abnormalQ2','abnormalS2','abnormalO2','abnormalM2'],2,2);abnormalStatusChange()">
                      <el-radio :label="2">否</el-radio>
                      <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>
                <table class="form-abnormalCondition-table" v-if="form.new30!=2">
                  <tr class="form-abnormalCondition-th">
                    <td>异常情况类别</td>
                    <td>异常情况类别</td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item" prop="abnormalK">
                        <span class="form-span-title">
                          肝脏异常
                        </span>
                        <el-radio-group v-model="form.abnormalK" :disabled="disabledShowState" @change="clearItem(form.abnormalK,['abnormalK1'],['abnormalK2'],2,2);new30Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div  v-if="form.abnormalK != 2" class="abnormalCondition">
                          <span class="form-span-title">请选择：</span>
                          <el-form-item prop="abnormalK2" class="form-item1">
                            <el-checkbox-group v-model="form.abnormalK2" :disabled="disabledShowState">
                              <el-checkbox label="1">囊肿</el-checkbox>
                              <el-checkbox label="2">低密度灶</el-checkbox>
                              <el-checkbox label="3">脂肪肝</el-checkbox>
                              <el-checkbox label="4">肝硬化</el-checkbox>
                              <el-checkbox label="5">钙化</el-checkbox>
                              <el-checkbox label="6">胆管扩张</el-checkbox>
                              <el-checkbox label="99">其他</el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </div>
                        <div v-if="form.abnormalK2.includes('99')" class="abnormalCondition">
                          <span>
                            请描述：
                            <el-form-item label="" prop="abnormalK1" class="form-item1" :inline-message="true">
                              <el-input v-model.trim="form.abnormalK1" placeholder="" maxlength="100"
                                        :disabled=" disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </span>
                        </div>
                    </td>

                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalH">
                        <span class="form-span-title">
                          胆囊异常
                        </span>
                        <el-radio-group v-model="form.abnormalH" :disabled="disabledShowState"
                                        @change="clearItem(form.abnormalH,['abnormalH1'],['abnormalH2'],2,2);new30Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div  v-if="form.abnormalH != 2" class="abnormalCondition">
                          <span class="form-span-title">请选择：</span>
                          <el-form-item prop="abnormalH2" class="form-item1">
                            <el-checkbox-group v-model="form.abnormalH2" :disabled="disabledShowState">
                              <el-checkbox label="1">结石</el-checkbox>
                              <el-checkbox label="2">增厚</el-checkbox>
                              <el-checkbox label="3">壁结节</el-checkbox>
                              <el-checkbox label="4">胆囊增大</el-checkbox>
                              <el-checkbox label="5">术后改变</el-checkbox>
                              <el-checkbox label="99">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        </div>
                        <div v-if="form.abnormalH2.includes('99')" class="abnormalCondition">
                          <span>
                            请描述：
                             <el-form-item label="" prop="abnormalH1" class="form-item1" :inline-message="true">
                              <el-input v-model.trim="form.abnormalH1" placeholder="" maxlength="100"
                                        :disabled="disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        style="width: 200px;"></el-input>
                             </el-form-item>
                          </span>
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalQ">
                        <span class="form-span-title">
                          胰腺异常
                        </span>
                        <el-radio-group v-model="form.abnormalQ" :disabled="disabledShowState"
                                        @change="clearItem(form.abnormalQ,['abnormalQ1'],['abnormalQ2'],2,2);new30Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div  v-if="form.abnormalQ != 2" class="abnormalCondition">
                          <span class="form-span-title">请选择：</span>
                          <el-form-item prop="abnormalQ2" class="form-item1">
                            <el-checkbox-group v-model="form.abnormalQ2" :disabled="disabledShowState">
                              <el-checkbox label="1">结节/肿物</el-checkbox>
                              <el-checkbox label="2">囊肿</el-checkbox>
                              <el-checkbox label="3">胰管扩张</el-checkbox>
                              <el-checkbox label="4">钙化</el-checkbox>
                              <el-checkbox label="99">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        </div>
                        <div v-if="form.abnormalQ2.includes('99')" class="abnormalCondition">
                          <span>
                            请描述：
                            <el-form-item label="" prop="abnormalQ1" class="form-item1" :inline-message="true">
                              <el-input v-model.trim="form.abnormalQ1" placeholder="" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        :disabled="disabledShowState"  maxlength="100"
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </span>
                        </div>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalS">
                        <span class="form-span-title">
                          脾脏异常
                        </span>
                        <el-radio-group v-model="form.abnormalS" :disabled="disabledShowState"
                                        @change="clearItem(form.abnormalS,['abnormalS1'],['abnormalS2'],2,2);new30Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div  v-if="form.abnormalS != 2" class="abnormalCondition">
                          <span class="form-span-title">请选择：</span>
                          <el-form-item prop="abnormalS2" class="form-item1">
                            <el-checkbox-group v-model="form.abnormalS2" :disabled="disabledShowState">
                              <el-checkbox label="1">结节/肿物</el-checkbox>
                              <el-checkbox label="2">囊肿</el-checkbox>
                              <el-checkbox label="3">明显增大</el-checkbox>
                              <el-checkbox label="99">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        </div>
                        <div v-if="form.abnormalS2.includes('99')" class="abnormalCondition">
                          <span>
                            请描述：
                              <el-form-item label="" prop="abnormalS1" class="form-item1" :inline-message="true">
                                <el-input v-model.trim="form.abnormalS1" placeholder=""  maxlength="100"
                                          :disabled="disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                          style="width: 200px;"></el-input>
                              </el-form-item>
                          </span>
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalO">
                        <span class="form-span-title">
                          肾异常
                        </span>
                        <el-radio-group v-model="form.abnormalO" :disabled="disabledShowState"
                                        @change="clearItem(form.abnormalO,['abnormalO1'],['abnormalO2'],2,2);new30Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div  v-if="form.abnormalO != 2" class="abnormalCondition">
                          <span class="form-span-title">请选择：</span>
                          <el-form-item prop="abnormalO2" class="form-item1">
                            <el-checkbox-group v-model="form.abnormalO2" :disabled="disabledShowState">
                              <el-checkbox label="1">结石</el-checkbox>
                              <el-checkbox label="2">囊肿</el-checkbox>
                              <el-checkbox label="3">结节/肿物</el-checkbox>
                              <el-checkbox label="4">肾盂积水</el-checkbox>
                              <el-checkbox label="99">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        </div>
                        <div v-if="form.abnormalO2.includes('99')" class="abnormalCondition">
                          <span>
                             请描述：
                               <el-form-item label="" prop="abnormalO1" class="form-item1" :inline-message="true">
                                  <el-input v-model.trim="form.abnormalO1" placeholder="" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                            :disabled="disabledShowState"  maxlength="100"
                                            style="width: 200px;"></el-input>
                               </el-form-item>
                          </span>
                        </div>
                    </td>
                    <td>
                      <el-form-item labelWidth="430px" class="form-item " prop="abnormalM">
                        <span class="form-span-title">
                          肾上腺异常
                        </span>
                        <el-radio-group v-model="form.abnormalM" :disabled="disabledShowState"
                                        @change="clearItem(form.abnormalM,['abnormalM1'],['abnormalM2'],2,2);new30Change()">
                          <el-radio :label="2">无</el-radio>
                          <el-radio :label="1">有</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div  v-if="form.abnormalM != 2" class="abnormalCondition">
                          <span class="form-span-title">请选择：</span>
                          <el-form-item prop="abnormalM2" class="form-item1">
                            <el-checkbox-group v-model="form.abnormalM2" :disabled="disabledShowState">
                              <el-checkbox label="1">增厚	</el-checkbox>
                              <el-checkbox label="2">结节/肿物</el-checkbox>
                              <el-checkbox label="99">其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        </div>
                        <div v-if="form.abnormalM2.includes('99')" class="abnormalCondition">
                          <span>
                            请描述：
                            <el-form-item label="" prop="abnormalM1" class="form-item1" :inline-message="true">
                              <el-input v-model.trim="form.abnormalM1" placeholder=""  maxlength="100"
                                        :disabled="disabledShowState" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                        style="width: 200px;"></el-input>
                            </el-form-item>
                          </span>
                        </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <span class="form-fontSize">其他，请描述：</span>
                      <div class="form-inline">
                        <el-form-item label="" prop="new33" class="form-item1" style="margin-bottom: 15px;">
                          <el-input v-model.trim="form.new33" placeholder="" 
                                    :disabled="disabledShowState"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}" @blur="new30Change()"
                                    style="width: 600px;" maxlength="100"></el-input>
                        </el-form-item>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <!-- 九部分 -->
              <div>
                <el-row class="block-title">
                  <el-form-item label="九、本次检查是否存在骨质异常？" prop="new31" labelWidth="430px" class="form-item">
                    <el-radio-group 
                    v-model="form.new31" 
                    :disabled="disabledShowState"
                    @change="clearItem(form.new31,['new32'],[],2,2);abnormalStatusChange()">
                      <el-radio :label="2">否</el-radio>
                      <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item prop="new32" class="form-item1" style="margin-bottom: 15px;" v-if="form.new31!=2">
                    <span class="form-fontSize">请描述：</span>
                          <el-input v-model.trim="form.new32" placeholder="" 
                                    :disabled="disabledShowState"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                    style="width: 600px;" maxlength="100"></el-input>
                        </el-form-item>
                </el-row>
              </div>
              <!-- 其他 -->
              <table class="form-abnormalCondition-table">
                <tr class="form-abnormalCondition-th">
                    <td colspan="2">其他</td>
                  </tr>
                <tr>
                    <td colspan="2">
                      <span class="form-fontSize">其他，请注明</span>
                      <div class="form-inline">
                        <el-form-item label="" prop="abnormalContOther" class="form-item1" style="margin-bottom: 15px;">
                          <el-input v-model.trim="form.abnormalContOther" placeholder="" 
                                    :disabled="disabledShowState"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                    style="width: 600px;" maxlength="100"></el-input>
                        </el-form-item>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="form-fontSize">首次检出日期</span>
                      <div class="form-inline form-td-height">
                        <el-form-item label="" prop="abnormalFirstDate" class="form-item1">
                          <el-date-picker
                            v-model="form.abnormalFirstDate"
                            type="date"
                            placeholder="选择日期"
                            :disabled="disabledShowState"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp"
                            :picker-options="pickerOptions1">
                          </el-date-picker>
                        </el-form-item>
                      </div>
                    </td>
                    <td>
                      <span class="form-fontSize">既往检查中是否存在</span>
                      <div class="form-inline form-td-height">
                        <el-form-item label="" prop="oldAbnormalStatus" class="form-item1" :inline-message="true">
                          <el-radio-group v-model="form.oldAbnormalStatus" :disabled="disabledShowState">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                            <el-radio :label="3">未知</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </div>
                    </td>
                  </tr>
              </table>

            <el-row>
              <el-col :span="24" v-if="form.abnormalStatus == 1">
                <el-form-item label="2.	本次扫描中的其他异常情况是否需要会诊？" prop="abnormalMeetingStatus" labelWidth="430px"
                              class="form-item">
                  <br>
                  <el-radio-group v-model="form.abnormalMeetingStatus" :disabled="disabledShowState">
                    <el-radio :label="2">否</el-radio>
                    <el-radio :label="1" ref="abnormalMeetingStatus">是</el-radio>
                   
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="form.abnormalMeetingStatus == 1 && form.abnormalStatus == 1">
                <el-form-item label="" prop="abnormalMeetingStatusRemark"
                              class="form-item">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows:4, maxRows: 8}"
                    placeholder="请输入内容"
                    :disabled="disabledShowState"
                    ref="abnormalMeetingStatusRemark"
                    v-model="form.abnormalMeetingStatusRemark">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </div>
        </div>
        <div class="formcon">
          <div class="title">
            诊断结果
          </div>
          <div class="form-body-content">
            <el-row>
              <el-col :span="24">
                <el-form-item label="1. 诊断结果:" prop="diagnosticResult" labelWidth="430px" class="form-item">
                  <br>
                  <el-select v-model="form.diagnosticResult" placeholder="请选择" style="width: 500px" :disabled="disabledShowState"
                             clearable>
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="diagnosticResultRemark" v-if="form.diagnosticResult == 7"
                              class="form-item" style="width: 540px">
                  <el-input
                    type="textarea"
                    :disabled="disabledShowState"
                    :autosize="{ minRows:2, maxRows: 4}"
                    placeholder="请输入内容"
                    ref="diagnosticResultRemark"
                    v-model="form.diagnosticResultRemark">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formcon">
          <div class="title">
            备注
          </div>
          <div class="form-body-content remark">
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="remark"  class="form-item">
                  <el-input
                    type="textarea"
                    :disabled="disabledShowState"
                    :autosize="{ minRows:2, maxRows: 4}"
                    placeholder="请输入内容"
                    ref="remark"
                    v-model="form.remark">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <div style="text-align: center;">
          <el-form-item style="margin-top: 20px;">
            <el-button type="primary" @click="submitForm('form')" :disabled="buttonDisabled" v-if="!disabledShowState">保存</el-button>
            <router-link :to="{path:'/form/ct',query:{
              resultFormId:this.$route.query.resultFormId,
              id:this.$route.query.id,
              type:2,
              flag:4
              }}" v-if="disabledShowState && $route.query.reportInputStatus!=1">
              <el-button type="primary">编辑</el-button>
            </router-link>
            <el-button @click="goBack()" v-if="!disabledShowState">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-dialog
      width="580px"
      title="结节处理建议"
      center
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      append-to-body>
      <div class="dialogVisible">
        <el-form :model="addForm" :rules="addFormRule" ref="addForm" label-width="70px" class="demo-ruleForm">
          <el-form-item label="编号：" prop="checkList1">
            <br>
            <el-checkbox-group v-model="addForm.checkList1">
              <el-checkbox label="1">年度复查</el-checkbox> <br>
              <el-checkbox label="2">3个月复查</el-checkbox> <br>
              <el-checkbox label="3">抗炎治疗后，1个月复查</el-checkbox> <br>
              <el-checkbox label="4">无需抗炎，1个月后复查</el-checkbox> <br>
              <el-checkbox label="5">诊断性平扫CT（薄层）进一步检查增强CT（薄层）进一步检查</el-checkbox> <br>
              <el-checkbox label="6">PET-CT进一步检查</el-checkbox> <br>
              <el-checkbox label="7">活检</el-checkbox> <br>
              <el-checkbox label="8">临床门诊就诊</el-checkbox> <br>
              <el-checkbox label="9">其他</el-checkbox>
              <br>
              <el-form-item label="" prop="nodularViewOther" :inline-message="true"
                            class="form-item1" v-if="addForm.checkList1.indexOf('9')>-1">
                <el-input v-model.trim="addForm.nodularViewOther" placeholder="请填写其他建议"  type="textarea"
                          :rows="2" maxlength="100"
                          :disabled="disabledShowState" size="mini"
                          style="width: 200px;"></el-input>
              </el-form-item>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="活检：" prop="checkList2" v-if="addForm.checkList1.indexOf('7')>-1">
            <el-checkbox-group v-model="addForm.checkList2" style="margin-top:20px" v-if="addForm.checkList1.indexOf('7')>-1">
              <el-checkbox label="1">经皮穿刺</el-checkbox> <br>
              <el-checkbox label="2">经支气管镜</el-checkbox> <br>
              <el-checkbox label="3">其他</el-checkbox>
              <br>
              <el-form-item label="" prop="nodularBiopsyOther" :inline-message="true"
                            class="form-item1" v-if="addForm.checkList2.indexOf('3')>-1">
                <el-input v-model.trim="addForm.nodularBiopsyOther" placeholder="请填写其他建议"  type="textarea"
                          :rows="2"  maxlength="100"
                          ref="nodularBiopsyOther" :disabled="disabledShowState" size="mini" style="width: 200px;"></el-input>
              </el-form-item>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 20px;text-align: center;">
        <el-button @click="dialogVisible = false" >取 消</el-button>
        <el-button @click="addFormSure('addForm')" class="dialog-footer" type="primary" v-dbClick>确 定</el-button>
      </div>

    </el-dialog>
  </div>
  </cancer-widget>
</template>

<script>
import mixin from "@/mixins/mixins";
import DICT from "@/views/ldctForm/ct/dict";
export default {
  mixins: [mixin],
  data() {
    var validate_item3_1_1 = (rule, value, callback) => {
      if (value / 1 > 10 || value / 1 < 0) {
        callback(new Error("数值:0-10（最多3位小数）"));
      } else if (
        !/^(?=([0-9]{1,2}$|[0-9]{1,12}\.))(0|[1-9][0-9]*)(\.[0-9]{1,3})?$/.test(
          value
        )
      ) {
        callback(new Error("数值:0-10（最多3位小数）"));
      } else {
        callback();
      }
    };
    var validate_item3_1 = (rule, value, callback) => {
      if (
        value &&
        !/^(?=([0-9]{1,10}$|[0-9]{1,12}\.))(0|[1-9][0-9]*)(\.[0-9]{1,3})?$/.test(
          value
        )
      ) {
        callback(new Error("数值（最多3位小数）"));
      } else {
        callback();
      }
    };
    var validate_item1count = (rule, value, callback) => {
      if (value.length > 100 || value.length < 2) {
        callback(new Error("2-100个字"));
      } else {
        callback();
      }
    };
    var validate_item3_2_1 = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback();
      } else if (value / 1 > 10 || value / 1 < 0) {
        callback(new Error("数值:0-10（最多3位小数）"));
      } else if (
        !/^(?=([0-9]{1,2}$|[0-9]{1,12}\.))(0|[1-9][0-9]*)(\.[0-9]{1,3})?$/.test(
          value
        )
      ) {
        callback(new Error("数值:0-10（最多3位小数）"));
      } else {
        callback();
      }
    };
    var validate_tubercleCount = (rule, value, callback) => {
      if ((value && !/^\d{1,13}$/.test(value)) || value == 0) {
        callback(new Error("请输入正整数"));
      } else {
        if (this.form.lessTenCount && this.form.lessTenCount <= value) {
          this.$refs.form.validateField("lessTenCount");
        }
        if (this.form.greaterTenCount && this.form.greaterTenCount <= value) {
          this.$refs.form.validateField("greaterTenCount");
        }
        callback();
      }
    };
    var validate_tubercleCount1 = (rule, value, callback) => {
      if (value && !/^\d{1,13}$/.test(value)) {
        callback(new Error("请输入正整数"));
      } else if (value == "0") {
        callback(new Error("请输入正整数"));
      } else {
        if (this.form.lessTenCount && this.form.lessTenCount <= value) {
          this.$refs.form.validateField("lessTenCount");
        }
        if (this.form.greaterTenCount && this.form.greaterTenCount <= value) {
          this.$refs.form.validateField("greaterTenCount");
        }
        callback();
      }
    };
    var validate_lessTenCount = (rule, value, callback) => {
      if (value < 1 || value > 6 || !/^\d{1}$/.test(value)) {
        this.countState = false;
        callback(new Error("数值（1-6）且为正整数"));
      } else {
        callback();
        this.countState = true;
      }
    };
    var validate_greaterTenCount = (rule, value, callback) => {
      if (value < 7 || !/^\d{1,2}$/.test(value)) {
        this.countState = false;
        callback(new Error("数值（7-99）且为正整数"));
      } else {
        callback();
        this.countState = true;
      }
    };
    var validate_anatomicalPosition = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("必填"));
      } else if (value && !/^\d{1}$/.test(value)) {
        callback(new Error("数值（1-6）"));
      } else if (value < 1 || value > 6) {
        callback(new Error("数值（1-6）"));
      } else {
        callback();
      }
    };
    var validate_density = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("必填"));
      } else if (value && !/^\d{1}$/.test(value)) {
        callback(new Error("数值（1-3）"));
      } else if (value < 1 || value > 3) {
        callback(new Error("数值（1-3）"));
      } else {
        callback();
      }
    };
    var validate_shape = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("必填"));
      } else if (value && !/^\d{1}$/.test(value)) {
        callback(new Error("数值（1-5）"));
      } else if (value < 1 || value > 5) {
        callback(new Error("数值（1-5）"));
      } else {
        callback();
      }
    };
    var validate_interphaseChangeStatus = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("必填"));
      } else if (value != 1 && value != 2) {
        callback(new Error("数值（1或者2）"));
      } else {
        callback();
      }
    };
    var validate_edge = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("必填"));
      } else if (value && !/^\d{1}$/.test(value)) {
        callback(new Error("数值（1-5）"));
      } else if (value < 1 || value > 5) {
        callback(new Error("数值（1-5）"));
      } else {
        callback();
      }
    };
    var validate_edge1 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("必填"));
      } else if (value && !/^\d{1}$/.test(value)) {
        callback(new Error("数值（1-6）"));
      } else if (value < 1 || value > 6) {
        callback(new Error("数值（1-6）"));
      } else {
        callback();
      }
    };
    var validate_nodularView = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("必填"));
      } else if (value.length == 0) {
        callback(new Error("必填"));
      } else {
        callback();
      }
    };
    var validate_diameter = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback();
      } else if (
        !/^(?=([0-9]{1,3}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1,3})?$/.test(
          value
        )
      ) {
        callback(new Error("数值(0-999)（最多3位小数）"));
      } else if (value > 999) {
        callback(new Error("数值(0-999)（最多3位小数）"));
      } else {
        callback();
      }
    };

    var validate_0100 = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback();
      } else if (
        !/^(([1-9]\d|[0-9])(\.\d{1,3})|([1-9]\d|[0-9]|100|100.0|100.00|100.000))$/.test(
          value
        )
      ) {
        callback(new Error("数值(0-100)（最多3位小数）"));
      } else if (value > 100) {
        callback(new Error("数值(0-100)（最多3位小数）"));
      } else {
        callback();
      }
    };

    var validate_abnormalA = (rule, value, callback) => {
      if (value == 1) {
        if (checkitems("abnormalA", 22)) {
          if (checkitems("abnormalA", 22)) {
            callback();
          } else callback(new Error("请选择最少一项异常情况"));
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        set_item("abnormalA", 22, 2);
        callback();
      }
    };
    var validate_abnormalB = (rule, value, callback) => {
      if (value == 1) {
        if (checkitems("abnormalB", 3)) {
          if (checkitems("abnormalB", 3)) {
            callback();
          } else callback(new Error("请选择最少一项异常情况"));
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        set_item("abnormalB", 3, 2);
        callback();
      }
    };
    var validate_abnormalD = (rule, value, callback) => {
      if (value == 1) {
        if (checkitems("abnormalD", 2)) {
          if (checkitems("abnormalD", 2)) {
            callback();
          } else callback(new Error("请选择最少一项异常情况"));
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        set_item("abnormalD", 2, 2);
        callback();
      }
    };
    var validate_abnormalF = (rule, value, callback) => {
      if (value == 1) {
        if (checkitems("abnormalF", 5)) {
          if (checkitems("abnormalF", 5)) {
            callback();
          } else callback(new Error("请选择最少一项异常情况"));
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        set_item("abnormalF", 5, 2);
        callback();
      }
    };
    var validate_abnormalJ = (rule, value, callback) => {
      if (value == 1) {
        if (checkitems("abnormalJ", 5)) {
          if (checkitems("abnormalJ", 5)) {
            callback();
          } else callback(new Error("请选择最少一项异常情况"));
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        set_item("abnormalJ", 5, 2);
        callback();
      }
    };
    var validate_abnormalT = (rule, value, callback) => {
      if (value == 1) {
        if (checkitems("abnormalT", 8)) {
          if (checkitems("abnormalT", 8)) {
            callback();
          } else callback(new Error("请选择最少一项异常情况"));
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        set_item("abnormalT", 8, 2);
        callback();
      }
    };
    var validate_abnormalL = (rule, value, callback) => {
      if (value == 1) {
        if (checkitems("abnormalL", 5)) {
          if (checkitems("abnormalL", 5)) {
            callback();
          } else callback(new Error("请选择最少一项异常情况"));
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        set_item("abnormalL", 5, 2);
        callback();
      }
    };
    var validate_abnormalR = (rule, value, callback) => {
      if (value == 1) {
        if (checkitems("abnormalR", 7) || this.form.abnormalR0 == 1) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        set_item("abnormalR", 7, 2);
        callback();
      }
    };
    var validate_abnormal_A = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalA = 1;
      }
      this.$refs.form.validateField("abnormalA");
      callback();
    };
    var validate_abnormal_B = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalB = 1;
      }
      this.$refs.form.validateField("abnormalB");
      callback();
    };
    var validate_abnormal_D = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalD = 1;
      }
      this.$refs.form.validateField("abnormalD");
      callback();
    };
    var validate_abnormal_E = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalE = 1;
      }
      this.$refs.form.validateField("abnormalE");
      callback();
    };
    var validate_abnormal_F = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalF = 1;
      }
      this.$refs.form.validateField("abnormalF");
      callback();
    };
    var validate_abnormal_J = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalJ = 1;
      }
      this.$refs.form.validateField("abnormalJ");
      callback();
    };
    var validate_abnormal_T = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalT = 1;
      }
      this.$refs.form.validateField("abnormalT");
      callback();
    };
    var validate_abnormal_L = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalL = 1;
      }
      this.$refs.form.validateField("abnormalL");
      callback();
    };
    var validate_abnormal_r = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalR = 1;
      }
      this.$refs.form.validateField("abnormalR");
      callback();
    };
    var validate_abnormalC = (rule, value, callback) => {
      if (value == 1) {
        if (
          this.form.abnormalC_2_1 ||
          this.form.abnormalC_2_2 ||
          this.form.abnormalC_2_3 ||
          this.form.abnormalC_2_4
        ) {
          callback();
        } else {
          callback(new Error("请选择最少一项异常情况"));
        }
      } else {
        callback();
      }
    };
    var validate_abnormalC_2_1 = (rule, value, callback) => {
      if (value) {
        this.form.abnormalC = 1;
      } else if (
        !this.form.abnormalC_2_4 &&
        !this.form.abnormalC_2_2 &&
        !this.form.abnormalC_2_3
      ) {
        //          this.form.abnormalC = 2
      }
      this.$refs.form.validateField("abnormalC");
      callback();
    };
    var validate_abnormalC_2_2 = (rule, value, callback) => {
      if (value) {
        this.form.abnormalC = 1;
      } else if (
        !this.form.abnormalC_2_1 &&
        !this.form.abnormalC_2_4 &&
        !this.form.abnormalC_2_3
      ) {
        // this.form.abnormalC = 2;
      }
      this.$refs.form.validateField("abnormalC");
      callback();
    };
    var validate_abnormalC_2_3 = (rule, value, callback) => {
      if (value) {
        this.form.abnormalC = 1;
      } else if (
        !this.form.abnormalC_2_1 &&
        !this.form.abnormalC_2_2 &&
        !this.form.abnormalC_2_4
      ) {
        // this.form.abnormalC = 2;
      }
      this.$refs.form.validateField("abnormalC");
      callback();
    };
    var validate_abnormalC_2_4 = (rule, value, callback) => {
      if (value) {
        this.form.abnormalC = 1;
      } else if (
        !this.form.abnormalC_2_1 &&
        !this.form.abnormalC_2_2 &&
        !this.form.abnormalC_2_3
      ) {
        // this.form.abnormalC = 2;
      }
      this.$refs.form.validateField("abnormalC");
      callback();
    };
    var validate_item10_14 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.abnormalN1) {
          callback();
        } else {
          callback(new Error("请选择最少一项异常情况"));
        }
      } else {
        callback();
      }
    };
    var validate_item10_14_2_1 = (rule, value, callback) => {
      if (value) {
        this.$refs.form.validateField("abnormalN");
      }
      callback();
    };
    var validate_item10_17 = (rule, value, callback) => {
      if (value) {
        if (
          this.form.item10_17_2_1 ||
          this.form.item10_17_2_2 ||
          this.form.item10_17_2_3 ||
          this.form.abnormalR4 ||
          this.form.item10_17_2_5 ||
          this.form.item10_17_2_6 ||
          this.form.item10_17_2_7
        ) {
          callback();
        } else {
          callback(new Error("请选择最少一项异常情况"));
        }
      } else {
        callback();
      }
    };
    var validate_item10_17_2_1 = (rule, value, callback) => {
      if (value) {
        this.form.item10_17 = 1;
      } else if (
        !this.form.abnormalR4 &&
        !this.form.item10_17_2_2 &&
        !this.form.item10_17_2_3 &&
        !this.form.item10_17_2_5 &&
        !this.form.item10_17_2_6 &&
        !this.form.item10_17_2_7
      ) {
        this.form.item10_17 = 2;
      }
      this.$refs.form.validateField("item10_17");
      callback();
    };
    var validate_item10_17_2_2 = (rule, value, callback) => {
      if (value) {
        this.form.item10_17 = 1;
      } else if (
        !this.form.abnormalR4 &&
        !this.form.item10_17_2_1 &&
        !this.form.item10_17_2_3 &&
        !this.form.item10_17_2_5 &&
        !this.form.item10_17_2_6 &&
        !this.form.item10_17_2_7
      ) {
        this.form.item10_17 = 2;
      }
      this.$refs.form.validateField("item10_17");
      callback();
    };
    var validate_item10_17_2_3 = (rule, value, callback) => {
      if (value) {
        this.form.item10_17 = 1;
      } else if (
        !this.form.abnormalR4 &&
        !this.form.item10_17_2_2 &&
        !this.form.item10_17_2_1 &&
        !this.form.item10_17_2_5 &&
        !this.form.item10_17_2_6 &&
        !this.form.item10_17_2_7
      ) {
        this.form.item10_17 = 2;
      }
      this.$refs.form.validateField("item10_17");
      callback();
    };
    var validate_item10_17_2_4 = (rule, value, callback) => {
      if (value) {
        this.form.item10_17 = 1;
      } else if (
        !this.form.item10_17_2_1 &&
        !this.form.item10_17_2_2 &&
        !this.form.item10_17_2_3 &&
        !this.form.item10_17_2_5 &&
        !this.form.item10_17_2_6 &&
        !this.form.item10_17_2_7
      ) {
        this.form.item10_17 = 2;
      }
      this.$refs.form.validateField("item10_17");
      callback();
    };
    var validate_item10_17_2_5 = (rule, value, callback) => {
      if (value) {
        this.form.item10_17 = 1;
      } else if (
        !this.form.abnormalR4 &&
        !this.form.item10_17_2_2 &&
        !this.form.abnormalC_2_3 &&
        !this.form.item10_17_2_1 &&
        !this.form.item10_17_2_6 &&
        !this.form.item10_17_2_7
      ) {
        this.form.item10_17 = 2;
      }
      this.$refs.form.validateField("item10_17");
      callback();
    };
    var validate_item10_17_2_6 = (rule, value, callback) => {
      if (value) {
        this.form.item10_17 = 1;
      } else if (
        !this.form.abnormalR4 &&
        !this.form.item10_17_2_2 &&
        !this.form.abnormalC_2_3 &&
        !this.form.item10_17_2_1 &&
        !this.form.item10_17_2_5 &&
        !this.form.item10_17_2_7
      ) {
        this.form.item10_17 = 2;
      }
      this.$refs.form.validateField("item10_17");
      callback();
    };
    var validate_item10_17_2_7 = (rule, value, callback) => {
      if (value) {
        this.form.item10_17 = 1;
      } else if (
        !this.form.abnormalR4 &&
        !this.form.item10_17_2_2 &&
        !this.form.abnormalC_2_3 &&
        !this.form.item10_17_2_1 &&
        !this.form.item10_17_2_5 &&
        !this.form.item10_17_2_6
      ) {
        this.form.item10_17 = 2;
      }
      this.$refs.form.validateField("item10_17");
      callback();
    };
    var checkitems = (items, index) => {
      for (let i = 1; i <= index; i++) {
        if (this.form[items + i] == 1) {
          return true;
          break;
        }
      }
      return false;
    };
    var set_item = (items, index, b) => {
      for (let i = 1; i <= index; i++) {
        this.form[items + i] = b;
      }
    };
    var validate_abnormalMeeting1 = (rule, value, callback) => {
      if (value == 1) {
        if (checkitems("abnormalMeeting", 23)) {
          if (checkitems("abnormalMeeting", 23)) {
            callback();
          } else callback(new Error("请选择最少一项异常情况"));
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        set_item("abnormalMeeting", 23, 2);
        callback();
      }
    };
    var validate_abnormalMeeting = (rule, value, callback) => {
      if (value == 1) {
        this.form.abnormalMeetingStatus = 1;
      }
      this.$refs.form.validateField("abnormalMeetingStatus");
      callback();
    };
    var validate_chinese20 = (rule, value, callback) => {
      if (value.length > 20) {
        callback(new Error("最多输入20个字符"));
      } else {
        callback();
      }
    };
    const countLength5 = (rule, value, callback) => {
      if (value && !/^[0-9]{1,5}$/.test(value)) {
        callback(new Error("请输入不超过5位的数字"));
      } else {
        callback();
      }
    };
    var validate_count100 = (rule, value, callback) => {
      if (value.length > 100) {
        callback(new Error("最多输入100个字符"));
      } else {
        callback();
      }
    };

    /**
     * 20190603新增校验规则
     */
    var validate_new39 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new40.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new40 = (rule, value, callback) => {
      this.$refs.form.validateField("new39");
      callback();
    };
    var validate_new41 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new42.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new42 = (rule, value, callback) => {
      this.$refs.form.validateField("new41");
      callback();
    };
    var validate_new43 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new44.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new44 = (rule, value, callback) => {
      this.$refs.form.validateField("new43");
      callback();
    };
    var validate_new5 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new5Other.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new5Other = (rule, value, callback) => {
      if(value && value.length>0){
        this.form.new5=1
      }
      this.$refs.form.validateField("new5");
      callback();
    };
    var validate_new6 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new6Other.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new6Other = (rule, value, callback) => {
      if(value && value.length>0){
        this.form.new6=1
      }
      this.$refs.form.validateField("new6");
      callback();
    };
    var validate_abnormalG = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.abnormalGOther.length > 0 && this.form.new38 != null) {
          callback();
        } else callback(new Error("请选择异常情况"));
      } else {
        callback();
      }
    };
    var validate_abnormalGOther = (rule, value, callback) => {
      if(value && value.length>0){
        this.form.abnormalG=1
      }
      this.$refs.form.validateField("abnormalG");
      callback();
    };
    var validate_abnormalE = (rule, value, callback) => {
      if (value == 1) {
        if (
          this.form.abnormalE1 &&
          this.form.abnormalE2 &&
          !(this.form.abnormalE1 == 1 && this.form.abnormalE2 == 1)
        ) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_abnormalE1 = (rule, value, callback) => {
      this.$refs.form.validateField("abnormalE");
      callback();
    };
    var validate_new10 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new11.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new11 = (rule, value, callback) => {
      if(value && value.length>0){
        this.form.new10=1
      }
      this.$refs.form.validateField("new10");
      callback();
    };
    var validate_new14 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new15.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new15 = (rule, value, callback) => {
      this.$refs.form.validateField("new14");
      callback();
    };
    var validate_new17 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new18.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new18 = (rule, value, callback) => {
      this.$refs.form.validateField("new17");
      callback();
    };
    var validate_new21 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new22.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new22 = (rule, value, callback) => {
      if(value && value.length>0){
        this.form.new21 = 1
      }
      this.$refs.form.validateField("new21");
      callback();
    };
    var validate_new23 = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.new24.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_new24 = (rule, value, callback) => {
      this.$refs.form.validateField("new23");
      callback();
    };
    var validate_abnormalK = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.abnormalK2.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_abnormalK2 = (rule, value, callback) => {
      this.$refs.form.validateField("abnormalK");
      callback();
    };
     var validate_abnormalH = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.abnormalH2.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_abnormalH2 = (rule, value, callback) => {
      this.$refs.form.validateField("abnormalH");
      callback();
    };
     var validate_abnormalQ = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.abnormalQ2.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_abnormalQ2 = (rule, value, callback) => {
      this.$refs.form.validateField("abnormalQ");
      callback();
    };
     var validate_abnormalS = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.abnormalS2.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_abnormalS2 = (rule, value, callback) => {
      this.$refs.form.validateField("abnormalS");
      callback();
    };
     var validate_abnormalO = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.abnormalO2.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_abnormalO2 = (rule, value, callback) => {
      this.$refs.form.validateField("abnormalO");
      callback();
    };
     var validate_abnormalM = (rule, value, callback) => {
      if (value == 1) {
        if (this.form.abnormalM2.length > 0) {
          callback();
        } else callback(new Error("请选择最少一项异常情况"));
      } else {
        callback();
      }
    };
    var validate_abnormalM2 = (rule, value, callback) => {
      this.$refs.form.validateField("abnormalM");
      callback();
    };
    return {
      tipsShow: false,
      tipsShowTrue: false,

      //可选大于今天的 日期
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      options: [
        {
          value: "1",
          label: "本次筛查发现可疑肺癌，请尽快前往医院进一步诊疗"
        },
        {
          value: "2",
          label:
            "本次筛查对比既往检查，可疑肺癌，较前增大，请尽快前往医院进一步诊疗"
        },
        {
          value: "3",
          label: "本次筛查对比既往检查，可疑肺癌，但无明显变化，请前往医院就诊"
        },
        {
          value: "4",
          label: "本次筛查未发现肺癌，但可见其他明显异常，请前往医院进一步诊疗"
        },
        {
          value: "5",
          label: "本次筛查未发现肺癌，但可见其他轻微异常"
        },
        {
          value: "6",
          label: "本次筛查无明显异常"
        },
        {
          value: "7",
          label: "其他，请说明："
        }
      ],
      addForm: {
        checkList1: [],
        checkList2: [],
        nodularViewOther: "",
        nodularBiopsyOther: ""
      },
      addFormRule: {
        checkList1: [{ required: true, message: "必填", trigger: "change" }],
        checkList2: [{ required: true, message: "必填", trigger: "change" }],
        nodularBiopsyOther: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        nodularViewOther: [{ required: true, message: "必填", trigger: "blur" }]
      },
      flabImageDeepChecked: true,
      flabImageDeepChecked1: false,
      //查看状态
      disabledShowState: false,
      //权限判定
      home_page: false,
      btnAuth: {
        list_query_btn: true
      },
      dialogVisible: false,
      dialogVisibleFlag: null,
      nodularView: {},
      buttonDisabled: false,
      countState: false,
      personDetail: {}, //人的基本信息
      form: {
        sid: "",
        userName: "",
        sex: "",
        age: "",
        idCard: "",
        examinationDate: this.$route.query.signedDate,
        stage: null,
        equipmentMfrs: "", //扫描设备
        equipmentVersion: "", //设备型号
        scanParameters: "", //扫描参数,
        kvpValue: "", //固定毫安扫描kVp
        maValue: "", //固定毫安扫描mA
        slewTime: "", //固定毫安扫描旋转时间
        kvpOtherValue: "", //固定毫安扫描kVp其他
        maOtherValue: "", //旋转时间
        slewTimeOther: "", //旋转时间
        minMaValue: "", //自动毫安扫描mA最小
        minMaOtherValue: "", //自动毫安扫描mA最小其他
        maxMaValue: "", //自动毫安扫描mA最小
        maxMaOtherValue: "", //自动毫安扫描mA最小其他
        noiseLevel: "", //噪音指数
        noiseLevelOther: "", //噪音指数其他
        flabImageDeep: "", //标准常规图像层厚
        flabImageDeepOther: "",
        flabImageShallow: "", //标准常规图像薄层
        flabImageShallowOther: "",
        flabReconstructionDeep: "", //标准常规重建层厚
        flabReconstructionDeepOther: "",
        flabReconstructionShallow: "", //标准常规重建薄层
        flabReconstructionShallowOther: "",
        lungImageDeep: "", //肺常规图像层厚
        lungImageDeepOther: "",
        lungImageShallow: "", //肺常规图像薄层
        lungImageShallowOther: "",
        lungReconstructionDeep: "", //肺常规重建层厚
        lungReconstructionDeepOther: "",
        lungReconstructionShallow: "", //肺常规重建薄层
        lungReconstructionShallowOther: "",
        ctdlvol: "", //容积CT剂量加权指数
        dlp: "", //肺(Lung)（可选做）
        ctImageScanning: "", //CT图像扫描情况
        ctImageScanningReasonA: 2,
        ctImageScanningReasonB: 2,
        ctImageScanningReasonC: 2,
        ctImageScanningReasonD: 2,
        ctImageScanningReasonE: 2,
        ctImageScanningReasonF: 2,
        ctImageScanningReasonG: 2,
        ctImageScanningReasonH: 2,
        ctImageScanningReasonOther: "",
        reviewCtResult: null,
        ctPastResultPOList: [
          {
            examinationDate: "",
            examinationMethod: "",
            chest: 2,
            abdomen: 2,
            pelvic: 2,
            brain: 2,
            examinationOther: 2,
            examinationOtherStr: "",
            examinationTypeBase: 2,
            examinationTypeYear: 2,
            examinationTypeFollow: 2,
            examinationTypeDiagnosis: 2,
            classes: [],
            checkList: []
          }
        ],
        tubercle: null, //是否有结节
        tubercleCount: null, //结节数量
        tubercleLessFive: null, //结节是否小于5mm
        tubercleGreaterFive: null, //结节是否≥5mm（不包括含肯定良性钙化成份的结节或肿块）
        tubercleCountLessTen: null, //是否有结节小于10
        lessTenCount: "", //小于10的 数量
        tubercleCountGreaterTen: null, //是否有结节大于10
        greaterTenCount: "", //大于10枚数量
        item8_3: null,
        ctTubercleInfoPOList: [],
        tubercleHandlingSuggestion: "",
        abnormalStatus: null, //本次扫描是否检出其他异常情况？
        abnormalA: "", //非钙化性肺门
        abnormalA1: 2, //非钙化性肺门选项
        abnormalA2: 2, //非钙化性肺门选项
        abnormalA3: 2, //非钙化性肺门选项
        abnormalA4: 2, //非钙化性肺门选项
        abnormalA5: 2, //非钙化性肺门选项
        abnormalA6: 2, //非钙化性肺门选项
        abnormalA7: 2, //非钙化性肺门选项
        abnormalA8: 2, //非钙化性肺门选项
        abnormalA9: 2, //非钙化性肺门选项
        abnormalA10: 2, //非钙化性肺门选项
        abnormalA11: 2, //非钙化性肺门选项
        abnormalA12: 2, //非钙化性肺门选项
        abnormalA13: 2, //非钙化性肺门选项
        abnormalA14: 2, //非钙化性肺门选项
        abnormalA15: 2, //非钙化性肺门选项
        abnormalA16: 2, //非钙化性肺门选项
        abnormalA17: 2, //非钙化性肺门选项
        abnormalA18: 2, //非钙化性肺门选项
        abnormalA19: 2, //非钙化性肺门选项
        abnormalA20: 2, //非钙化性肺门选项
        abnormalA21: 2, //非钙化性肺门选项
        abnormalB: "", //非特异性间质纤维化
        abnormalB1: 2, //非特异性间质纤维化选项
        abnormalB2: 2, //非特异性间质纤维化选项
        abnormalB3: 2, //非特异性间质纤维化选项
        abnormalB4: "",
        abnormalC: "", //冠状动脉钙化
        abnormalC0: "",
        abnormalC_2_1: false, //冠状动脉钙化选项左主干
        abnormalC_2_2: false, //冠状动脉钙化选项左前降支
        abnormalC_2_3: false, //冠状动脉钙化选项左回旋支
        abnormalC_2_4: false, //冠状动脉钙化选项右主干
        abnormalC1: null, //冠状动脉钙化选项左主干严重程度
        abnormalC2: null, //冠状动脉钙化选项左前降支严重程度
        abnormalC3: null, //冠状动脉钙化选项左回旋支严重程度
        abnormalC4: null, //冠状动脉钙化选项右主干严重程度
        abnormalD: "", //胸膜增厚
        abnormalD1: 2, //胸膜增厚选项
        abnormalD2: 2, //胸膜增厚选项
        abnormalE: "", //胸腔积液
        abnormalE1: null, //胸腔积液选项
        abnormalE2: null, //胸腔积液选项
        abnormalE3: 2, //胸腔积液选项
        abnormalF: "", //主动脉异常
        abnormalF1: 2, //主动脉异常选项
        abnormalF2: 2, //主动脉异常选项
        abnormalF3: 2, //主动脉异常选项
        abnormalF4: 2, //主动脉异常选项
        abnormalF5: 2, //主动脉异常选项
        abnormalF6: null,
        abnormalG: "", //胸壁异常
        abnormalG1: null, //胸壁异常其他
        abnormalH: "", //心血管异常
        abnormalH1: null, //心血管异常其他
        abnormalI: "", //其它横膈以上异常
        abnormalI1: null, //其它横膈以上异常其他
        abnormalJ: "", //肺不张
        abnormalJ1: 2, //主动脉异常选项
        abnormalJ2: 2, //主动脉异常选项
        abnormalJ3: 2, //主动脉异常选项
        abnormalJ4: 2, //主动脉异常选项
        abnormalJ5: 2, //主动脉异常选项
        abnormalK: "", //明显肝脏异常
        abnormalK1: null, //明显肝脏异其他
        abnormalL: "", //肺实变
        abnormalL1: 2, //肺实变选项
        abnormalL2: 2, //肺实变选项
        abnormalL3: 2, //肺实变选项
        abnormalL4: 2, //肺实变选项
        abnormalL5: 2, //肺实变选项
        abnormalM: "", //明显肝脏异常
        abnormalM1: null, //明显肝脏异其他
        abnormalN: "", //肺气肿
        abnormalN1: null, //肺气肿选项右上叶严重程度
        abnormalO: "", //明显肾异常
        abnormalO1: null, //明显肾异其他
        abnormalP: null, //明显肝脏异其他
        item10_16: null, //肺气肿
        abnormalQ: "",
        abnormalQ1: null,
        abnormalS: "", //明显肾异常
        abnormalS1: null, //明显肾异其他
        abnormalT: "", //主动脉异常
        abnormalT1: 2, //主动脉异常选项
        abnormalT2: 2, //主动脉异常选项
        abnormalT3: 2, //主动脉异常选项
        abnormalT4: 2, //主动脉异常选项
        abnormalT5: 2, //主动脉异常选项
        abnormalT6: 2, //主动脉异常选项
        abnormalT7: 2, //主动脉异常选项
        abnormalT8: 2, //主动脉异常选项
        item10_17: "", //气道病变
        abnormalR: "", //气道病变严重程度
        abnormalR4: "", //气道病变选项左上叶
        abnormalR1: "", //气道病变选项右上叶严重程度
        abnormalR2: "", //气道病变选项右中叶严重程度
        abnormalR3: "", //气肿选项左右下叶严重程度
        abnormalR5: "", //气道病变选项左下叶严重程度
        abnormalR6: "", //气道病变选项左下叶严重程度
        abnormalR7: "", //气道病变选项左下叶严重程度
        abnormalR8: "",
        abnormalContOther: null, //其他请注明
        abnormalFirstDate: null, //首次检出日期
        oldAbnormalStatus: null, //既往检查是否检出
        abnormalMeetingStatus: "", //其他异常情况是否需要会诊
        item2: [], //图像质量第二题
        abnormalMeeting1: 2,
        abnormalMeeting2: 2,
        abnormalMeeting3: 2,
        abnormalMeeting4: 2,
        abnormalMeeting5: 2,
        abnormalMeeting6: 2,
        abnormalMeeting7: 2,
        abnormalMeeting8: 2,
        abnormalMeeting9: 2,
        abnormalMeeting10: 2,
        abnormalMeeting11: 2,
        abnormalMeeting12: 2,
        abnormalMeeting13: 2,
        abnormalMeeting14: 2,
        abnormalMeeting15: 2,
        abnormalMeeting16: 2,
        abnormalMeeting17: 2,
        abnormalMeeting18: 2,
        abnormalMeeting19: 2,
        abnormalMeeting20: 2,
        abnormalMeeting21: 2,
        abnormalMeeting22: "",

        abnormalMeetingStatusRemark: "",
        diagnosticResult: "",
        diagnosticResultRemark: "",
        remark: "",
        // 2019/5/23新增字段
        maLevelOther: null,
        maLevel: null,
        tubercleOther: null,
        otherDetail: null,
        abnormalR0: null,
        abnormalR0Position: [],
        abnormalR1Position: [],
        abnormalR2Position: [],
        abnormalR3Position: [],
        abnormalR4Position: [],
        abnormalR5Position: [],
        abnormalR6Position: [],
        // abnormalR9: [],
        new0: null,
        new1: null,
        new2: null,
        new4: null,
        new5: null,
        new5Other: [],
        new6: null,
        new6Other: [],
        abnormalGOther: [],
        new7: null,
        new8: null,
        new9: null,
        new10: null,
        new11: [],
        new12: null,
        new13: null,
        new14: null,
        new15: [],
        new16: null,
        new17: null,
        new18: [],
        new19: null,
        new20: null,
        new21: null,
        new22: [],
        new23: null,
        new24: [],
        new25: null,
        new26: null,
        new27: [],
        new28: [],
        new29: null,
        new30: null,
        new31: null,
        new32: null,
        new33: null,
        new34: [],
        new35: [],
        new36: null,
        new37: null,
        new38: null,
        new39: null,
        new40: [],
        new41: null,
        new42: [],
        new43: null,
        new44: [],
        new45: null,
        // 20190604新增字段
        abnormalK2: [],
        abnormalH2: [],
        abnormalQ2: [],
        abnormalS2: [],
        abnormalO2: [],
        abnormalM2: []
      },
      ctTubercleInfoPOListRules: {
        numName: [
          { required: true, message: "必填", trigger: "blur" },
          { required: true, message: "必填", trigger: "change" },
          { validator: countLength5, trigger: "blur" }
        ],
        serialNumber: [
          { required: true, message: "必填", trigger: "blur" },
          { required: true, message: "必填", trigger: "change" },
          { validator: countLength5, trigger: "blur" }
        ],
        imageNum: [
          { required: true, message: "必填", trigger: "blur" },
          { required: true, message: "必填", trigger: "change" },
          { validator: countLength5, trigger: "blur" }
        ],
        anatomicalPosition: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_anatomicalPosition, trigger: "blur" }
        ],
        density: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_density, trigger: "blur" }
        ],
        densityOther: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        diameter: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_diameter, trigger: "blur" }
        ],
        minorAxis: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_diameter, trigger: "blur" }
        ],
        averageDiameter: [{ required: true, message: "必填", trigger: "blur" }],
        volume: [
          { required: false, message: "必填", trigger: "blur" },
          { validator: validate_diameter, trigger: "blur" }
        ],
        trueDiameter: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_diameter, trigger: "blur" }
        ],
        trueMinorAxis: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_diameter, trigger: "blur" }
        ],
        trueAverageDiameter: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        trueVolume: [
          { required: false, message: "必填", trigger: "blur" },
          { validator: validate_diameter, trigger: "blur" }
        ],
        nodularProperties: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_shape, trigger: "blur" }
        ],
        nodularView: [
          { required: false, message: "必填", trigger: "blur" },
          { required: false, message: "必填", trigger: "change" }
        ],
        nodularViewOther: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        nodularViewDate: [{ required: true, message: "必填", trigger: "blur" }],
        meetingStatus: [
          { required: false, message: "必填", trigger: "blur" },
          { validator: validate_interphaseChangeStatus, trigger: "blur" }
        ],
        meetingLevel: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_density, trigger: "blur" }
        ],
        meetingView: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_density, trigger: "blur" }
        ],
        shape: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_shape, trigger: "blur" }
        ],
        edge: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_edge, trigger: "blur" }
        ],
        interphaseChangeStatus: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_interphaseChangeStatus, trigger: "blur" }
        ],
        interphaseChangeSizeStatus: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_density, trigger: "blur" }
        ],
        interphaseChangeSizeStr: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_diameter, trigger: "blur" }
        ],
        interphaseChangeComponentStatus: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_density, trigger: "blur" }
        ],
        interphaseChangeComponentStr: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_diameter, trigger: "blur" }
        ],
        interphaseChangeDensityStatus: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_edge, trigger: "blur" }
        ],
        meetingViewOther: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        otherDetail: [{ required: true, message: "必填", trigger: "change" }]
      },
      ctPastResultPOListRules: {
        examinationDate: [
          { required: true, message: "请输入日期", trigger: "blur" },
          { required: true, message: "请输入日期", trigger: "change" }
        ],
        examinationMethod: [
          { required: true, message: "必填", trigger: "blur" },
          { required: true, message: "必填", trigger: "change" }
        ],
        examinationOtherStr: [
          { required: true, message: "必填", trigger: "blur" },
          { required: true, message: "必填", trigger: "change" }
        ],
        checkList: [
          { required: true, message: "必选", trigger: "blur" },
          { required: true, message: "必选", trigger: "change" }
        ],
        classes: [
          { required: true, message: "必选", trigger: "blur" },
          { required: true, message: "必选", trigger: "change" }
        ]
      },
      formRules: {
        sid: [
          { required: true, message: "请输入sid", trigger: "blur" },
          { required: true, message: "请输入sid", trigger: "change" }
        ],
        userName: [{ required: false, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: false, message: "请填写性别", trigger: "blur" }],
        age: [{ required: false, message: "请输入年龄", trigger: "blur" }],
        idCard: [
          { required: false, message: "请输入身份证号", trigger: "blur" }
        ],
        examinationDate: [
          { required: true, message: "请填写检查日期", trigger: "blur" }
        ],
        stage: [
          { required: false, message: "请选择扫描年度", trigger: "change" }
        ],
        equipmentMfrs: [{ required: true, message: "必选", trigger: "change" }],
        equipmentVersion: [
          { required: true, message: "必填", trigger: "blur" },
          { required: true, message: "必选", trigger: "change" }
        ],
        scanParameters: [
          { required: true, message: "必选", trigger: "change" }
        ],
        kvpValue: [{ required: true, message: "必选", trigger: "change" }],
        maValue: [{ required: true, message: "必选", trigger: "change" }],
        slewTime: [{ required: true, message: "必选", trigger: "change" }],
        kvpOtherValue: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item1count, trigger: "blur" }
        ],
        maOtherValue: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item1count, trigger: "blur" }
        ],
        slewTimeOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item1count, trigger: "blur" }
        ],
        minMaValue: [{ required: true, message: "必选", trigger: "change" }],
        minMaOtherValue: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item1count, trigger: "blur" }
        ],
        maxMaValue: [{ required: true, message: "必选", trigger: "change" }],
        maxMaOtherValue: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item1count, trigger: "blur" }
        ],
        noiseLevel: [{ required: true, message: "必选", trigger: "change" }],
        noiseLevelOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item1count, trigger: "blur" }
        ],
        flabImageDeep: [{ required: true, message: "必填", trigger: "change" }],
        flabImageDeepOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item3_1_1, trigger: "blur" }
        ],
        flabImageShallow: [
          { required: true, message: "必填", trigger: "change" }
        ],
        flabImageShallowOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item3_1_1, trigger: "blur" }
        ],
        flabReconstructionDeep: [
          { required: true, message: "必填", trigger: "change" }
        ],
        flabReconstructionDeepOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item3_1_1, trigger: "blur" }
        ],
        flabReconstructionShallow: [
          { required: true, message: "必填", trigger: "change" }
        ],
        flabReconstructionShallowOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item3_1_1, trigger: "blur" }
        ],
        lungImageDeep: [{ required: true, message: "必填", trigger: "change" }],
        lungImageDeepOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item3_2_1, trigger: "blur" }
        ],
        lungImageShallow: [
          { required: true, message: "必填", trigger: "change" }
        ],
        lungImageShallowOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item3_2_1, trigger: "blur" }
        ],
        lungReconstructionDeep: [
          { required: true, message: "必填", trigger: "change" }
        ],
        lungReconstructionDeepOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item3_2_1, trigger: "blur" }
        ],
        lungReconstructionShallow: [
          { required: true, message: "必填", trigger: "change" }
        ],
        lungReconstructionShallowOther: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_item3_2_1, trigger: "blur" }
        ],
        ctdlvol: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_0100, trigger: "blur" }
        ],
        dlp: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_0100, trigger: "blur" }
        ],
        reviewCtResult: [
          { required: false, message: "必选", trigger: "change" }
        ],
        ctImageScanning: [
          { required: false, message: "必选", trigger: "change" }
        ],
        ctImageScanningReasonOther: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        item2: [{ required: false, message: "必选", trigger: "change" }],
        tubercle: [{ required: true, message: "必选", trigger: "change" }],
        tubercleCount: [
          { required: true, message: "必填", trigger: "blur" },
          {
            required: true,
            validator: validate_tubercleCount1,
            trigger: "blur"
          }
        ],
        tubercleLessFive: [
          { required: true, message: "必选", trigger: "change" }
        ],
        tubercleGreaterFive: [
          { required: true, message: "必选", trigger: "change" }
        ],
        lessTenCount: [
          { required: false, validator: validate_lessTenCount, trigger: "blur" }
        ],
        greaterTenCount: [
          {
            required: false,
            validator: validate_greaterTenCount,
            trigger: "blur"
          }
        ],
        item8_3: [{ required: true, message: "必填", trigger: "change" }],
        tubercleHandlingSuggestion: [
          { required: true, message: "必填", trigger: "blur" }
        ],
        abnormalStatus: [
          { required: true, message: "必选", trigger: "change" },
        ],
        abnormalA: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalA, trigger: "change" }
        ],
        abnormalA1: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA2: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA3: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA4: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA5: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA6: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA7: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA8: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA9: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA10: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA11: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA12: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA13: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA14: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA15: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA16: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA17: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA18: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA19: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA20: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA21: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalA22: [{ validator: validate_abnormal_A, trigger: "change" }],
        abnormalB: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalB, trigger: "change" }
        ],
        abnormalB1: [{ validator: validate_abnormal_B, trigger: "change" }],
        abnormalB2: [{ validator: validate_abnormal_B, trigger: "change" }],
        abnormalB3: [{ validator: validate_abnormal_B, trigger: "change" }],
        abnormalB4: [
          { required: true, message: "必填", trigger: "blur" },
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_chinese20, trigger: "blur" }
        ],
        abnormalC0: [{ required: true, message: "必填", trigger: "change" }],
        abnormalC: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalC, trigger: "change" }
        ],
        abnormalC_2_1: [
          { validator: validate_abnormalC_2_1, trigger: "change" }
        ],
        abnormalC_2_2: [
          { validator: validate_abnormalC_2_2, trigger: "change" }
        ],
        abnormalC_2_3: [
          { validator: validate_abnormalC_2_3, trigger: "change" }
        ],
        abnormalC_2_4: [
          { validator: validate_abnormalC_2_4, trigger: "change" }
        ],
        abnormalC1: [
          { required: true, message: "必选", trigger: "change" }
          //            {validator: validate_density, trigger: 'blur'}
        ],
        abnormalC2: [
          { required: true, message: "必选", trigger: "change" }
          //            {validator: validate_density, trigger: 'blur'}
        ],
        abnormalC3: [
          { required: true, message: "必选", trigger: "change" }
          //            {validator: validate_density, trigger: 'blur'}
        ],
        abnormalC4: [
          { required: true, message: "必选", trigger: "change" }
          //            {validator: validate_density, trigger: 'blur'}
        ],
        abnormalD: [
          { required: false, message: "必填", trigger: "change" },
          { validator: validate_abnormalD, trigger: "change" }
        ],
        abnormalD1: [{ validator: validate_abnormal_D, trigger: "change" }],
        abnormalD2: [{ validator: validate_abnormal_D, trigger: "change" }],
        abnormalE: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalE, trigger: "change" }
        ],
        abnormalE1: [{ validator: validate_abnormalE1, trigger: "change" }],
        abnormalE2: [{ validator: validate_abnormalE1, trigger: "change" }],
        abnormalE3: [{ validator: validate_abnormal_E, trigger: "change" }],
        abnormalF: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalF, trigger: "change" }
        ],
        abnormalF1: [{ validator: validate_abnormal_F, trigger: "change" }],
        abnormalF2: [{ validator: validate_abnormal_F, trigger: "change" }],
        abnormalF3: [{ validator: validate_abnormal_F, trigger: "change" }],
        abnormalF4: [{ validator: validate_abnormal_F, trigger: "change" }],
        abnormalF5: [{ validator: validate_abnormal_F, trigger: "change" }],
        abnormalF6: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_chinese20, trigger: "blur" }
        ],
        abnormalG: [
          { required: false, message: "必填", trigger: "change" },
          { validator: validate_abnormalG, trigger: "change" }
        ],
        abnormalG1: [{ required: true, message: "必填", trigger: "blur" }],
        abnormalH: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalH, trigger: "change" }
        ],
        abnormalH2: [{ validator: validate_abnormalH2, trigger: "change" }],
        abnormalH1: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        abnormalI: [{ required: true, message: "必填", trigger: "change" }],
        abnormalI1: [
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_chinese20, trigger: "blur" }
        ],
        abnormalJ: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalJ, trigger: "change" }
        ],
        abnormalJ1: [{ validator: validate_abnormal_J, trigger: "change" }],
        abnormalJ2: [{ validator: validate_abnormal_J, trigger: "change" }],
        abnormalJ3: [{ validator: validate_abnormal_J, trigger: "change" }],
        abnormalJ4: [{ validator: validate_abnormal_J, trigger: "change" }],
        abnormalJ5: [{ validator: validate_abnormal_J, trigger: "change" }],
        abnormalT: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalT, trigger: "change" }
        ],
        abnormalT1: [{ validator: validate_abnormal_T, trigger: "change" }],
        abnormalT2: [{ validator: validate_abnormal_T, trigger: "change" }],
        abnormalT3: [{ validator: validate_abnormal_T, trigger: "change" }],
        abnormalT4: [{ validator: validate_abnormal_T, trigger: "change" }],
        abnormalT5: [{ validator: validate_abnormal_T, trigger: "change" }],
        abnormalT6: [{ validator: validate_abnormal_T, trigger: "change" }],
        abnormalT7: [{ validator: validate_abnormal_T, trigger: "change" }],
        abnormalT8: [{ validator: validate_abnormal_T, trigger: "change" }],
        abnormalK: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalK, trigger: "change" }
        ],
        abnormalK2:[{ validator: validate_abnormalK2, trigger: "change" }],
        abnormalK1: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        abnormalL: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalL, trigger: "change" }
        ],
        abnormalL1: [{ validator: validate_abnormal_L, trigger: "change" }],
        abnormalL2: [{ validator: validate_abnormal_L, trigger: "change" }],
        abnormalL3: [{ validator: validate_abnormal_L, trigger: "change" }],
        abnormalL4: [{ validator: validate_abnormal_L, trigger: "change" }],
        abnormalL5: [{ validator: validate_abnormal_L, trigger: "change" }],
        abnormalM: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalM, trigger: "change" }
        ],
        abnormalM2:[{ validator: validate_abnormalM2, trigger: "change" }],
        abnormalM1: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        abnormalN: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_item10_14, trigger: "change" }
        ],
        abnormalN1: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_item10_14_2_1, trigger: "change" }
        ],
        abnormalO: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalO, trigger: "change" }
        ],
        abnormalO2:[{ validator: validate_abnormalO2, trigger: "change" }],
        abnormalO1: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        item10_16: [{ required: true, message: "必选", trigger: "change" }],
        abnormalP: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_density, trigger: "blur" }
        ],
        abnormalQ: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalQ, trigger: "change" }
        ],
        abnormalQ2:[{ validator: validate_abnormalQ2, trigger: "change" }],
        abnormalQ1: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        abnormalS: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_abnormalS, trigger: "change" }
        ],
        abnormalS2:[{ validator: validate_abnormalS2, trigger: "change" }],
        abnormalS1: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        abnormalR: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalR, trigger: "change" }
        ],
        abnormalR4: [{ validator: validate_abnormal_r, trigger: "change" }],
        abnormalR0: [{ validator: validate_abnormal_r, trigger: "change" }],
        abnormalR1: [{ validator: validate_abnormal_r, trigger: "change" }],
        abnormalR2: [{ validator: validate_abnormal_r, trigger: "change" }],
        abnormalR3: [{ validator: validate_abnormal_r, trigger: "change" }],
        abnormalR5: [{ validator: validate_abnormal_r, trigger: "change" }],
        abnormalR6: [{ validator: validate_abnormal_r, trigger: "change" }],
        abnormalR7: [{ validator: validate_abnormal_r, trigger: "change" }],
        abnormalR8: [
          { required: true, message: "必填", trigger: "blur" },
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_chinese20, trigger: "blur" }
        ],
        abnormalR0Position: [
          { required: true, message: "必选", trigger: "change" }
        ],
        abnormalR1Position: [
          { required: true, message: "必选", trigger: "change" }
        ],
        abnormalR2Position: [
          { required: false, message: "必选", trigger: "change" }
        ],
        abnormalR3Position: [
          { required: false, message: "必选", trigger: "change" }
        ],
        abnormalR4Position: [
          { required: false, message: "必选", trigger: "change" }
        ],
        abnormalR5Position: [
          { required: false, message: "必选", trigger: "change" }
        ],
        abnormalR6Position: [
          { required: false, message: "必选", trigger: "change" }
        ],
        abnormalMeetingStatus: [
          { required: true, message: "必选", trigger: "change" }
          //            {validator: validate_abnormalMeeting1, trigger: 'change'}
        ],
        abnormalMeeting1: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting2: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting3: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting4: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting5: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting6: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting7: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting8: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting9: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting10: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting11: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting12: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting13: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting14: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting15: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting16: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting17: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting18: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting19: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting20: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting21: [
          { required: true, message: "必选", trigger: "change" },
          { validator: validate_abnormalMeeting, trigger: "change" }
        ],
        abnormalMeeting22: [
          { required: true, message: "必选", trigger: "change" }
        ],
        abnormalMeetingStatusRemark: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" },
          { validator: validate_count100, trigger: "change" },
          { validator: validate_count100, trigger: "blur" }
        ],
        diagnosticResult: [
          { required: true, message: "必选", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        diagnosticResultRemark: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        maLevelOther: [{ required: true, message: "必填", trigger: "blur" }],
        maLevel: [{ required: true, message: "必填", trigger: "change" }],
        tubercleOther: [{ required: true, message: "必填", trigger: "change" }],
        new0: [{ required: true, message: "必填", trigger: "change" }],
        new1: [{ required: true, message: "必填", trigger: "change" }],
        new2: [{ required: true, message: "必填", trigger: "change" }],
        new4: [{ required: true, message: "必填", trigger: "change" }],
        new5: [
          { required: false, message: "必填", trigger: "change" },
          { validator: validate_new5, trigger: "change" }
        ],
        new5Other: [{ validator: validate_new5Other, trigger: "change" }],
        new6: [
          { required: false, message: "必填", trigger: "change" },
          { validator: validate_new6, trigger: "change" }
        ],
        new6Other: [{ validator: validate_new6Other, trigger: "change" }],
        abnormalGOther: [
          { validator: validate_abnormalGOther, trigger: "change" }
        ],
        new7: [{ required: true, message: "必填", trigger: "change" }],
        new8: [{ required: true, message: "必填", trigger: "change" }],
        new9: [{ required: false, message: "必填", trigger: "change" }],
        new10: [
          { required: false, message: "必填", trigger: "change" },
          { validator: validate_new10, trigger: "change" }
        ],
        new11: [{ validator: validate_new11, trigger: "change" }],
        new12: [{ required: true, message: "必填", trigger: "blur" }],
        new13: [{ required: true, message: "必填", trigger: "change" }],
        new14: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_new14, trigger: "change" }
        ],
        new15: [{ validator: validate_new15, trigger: "change" }],
        new16: [{ required: false, message: "必填", trigger: "blur" }],
        new17: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_new17, trigger: "change" }
        ],
        new18: [{ validator: validate_new18, trigger: "change" }],
        new19: [{ required: false, message: "必填", trigger: "blur" }],
        new20: [{ required: true, message: "必填", trigger: "change" }],
        new21: [
          { required: false, message: "必填", trigger: "change" },
          { validator: validate_new21, trigger: "change" }
        ],
        new22: [{ validator: validate_new22, trigger: "change" }],
        new23: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_new23, trigger: "change" }
        ],
        new24: [{ validator: validate_new24, trigger: "change" }],
        new25: [{ required: true, message: "必填", trigger: "blur" }],
        new26: [{ required: true, message: "必填", trigger: "change" }],
        new27: [{ required: true, message: "必填", trigger: "change" }],
        new28: [{ required: true, message: "必填", trigger: "change" }],
        new29: [{ required: true, message: "必填", trigger: "blur" }],
        new30: [{ required: true, message: "必填", trigger: "change" }],
        new31: [{ required: true, message: "必填", trigger: "change" }],
        new32: [{ required: true, message: "必填", trigger: "blur" }],
        new34: [
          { required: false, message: "必填", trigger: "change" },
          { required: false, message: "必填", trigger: "blur" }
        ],
        new35: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        new36: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        new37: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        new38: [{ validator: validate_abnormalGOther, trigger: "change" }],
        new39: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_new39, trigger: "change" }
        ],
        new40: [
          // { required: true, message: "必填", trigger: "change" },
          { validator: validate_new40, trigger: "change" }
        ],
        new41: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_new41, trigger: "change" }
        ],
        new42: [{ validator: validate_new42, trigger: "change" }],
        new43: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validate_new43, trigger: "change" }
        ],
        new44: [{ validator: validate_new44, trigger: "change" }],
        new45: [{ required: true, message: "必填", trigger: "change" }]
      },
      //品牌下拉框数据
      brands: DICT.brands,
      //严重程度下拉框数据
      severitys: DICT.severitys,
      //形状
      shapes: DICT.shapes,
      //边缘
      edges: DICT.edges,
      //型号下拉框数据
      models: [],
      methodsOptions: DICT.methodsOptions,
      anatomyPositions: DICT.anatomyPositions,
      densitys: DICT.densitys,
      densityOthers: DICT.densityOthers,

      nodularViewDates: DICT.nodularViewDates,
      proposals1: DICT.proposals1,
      proposals: DICT.proposals,
      natures: DICT.natures,
      levels: DICT.levels,
      reasons: DICT.reasons,
      suggestion: DICT.suggestion,
      position: DICT.position
    };
  },
  mounted() {
    // flag =1 新增；flag=2查看； flag=4编辑
    if (this.$route.query.flag == 1) {
      this.form.ctRecordStatusId = this.$route.query.id;
      this.form.sid = this.$route.query.surverId;
      this.form.type = 2;
      this.getInfo();
      this.getEquipment();
    }
    if (this.$route.query.flag == 2) {
      this.disabledShowState = true;
      this.getCTResult();
    }
    if (this.$route.query.flag == 3) {
      this.getEquipment();
    }
    if (this.$route.query.flag == 4) {
      this.getEquipment();
      this.getCTResult();
    }
  },
  methods: {
    addNodularView(item) {
      this.dialogVisible = true;
      this.nodularView = item;
    },
    //   添加结节整体意见
    addNodularViewAll() {
      this.dialogVisible = true;
      this.dialogVisibleFlag = "all";
    },
    addFormSure(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          if (this.dialogVisibleFlag == "all") {
            //   总体意见
            this.form.new34 = this.addForm.checkList1.sort(this.sort);
            this.form.new35 = this.addForm.checkList2.sort(this.sort);
            this.form.new36 = this.addForm.nodularBiopsyOther;
            this.form.new37 = this.addForm.nodularViewOther;
          } else {
            //   结节意见
            this.nodularView.nodularView = this.addForm.checkList1.sort(
              this.sort
            );
            this.nodularView.nodularBiopsy = this.addForm.checkList2.sort(
              this.sort
            );
            this.nodularView.nodularBiopsyOther = this.addForm.nodularBiopsyOther;
            this.nodularView.nodularViewOther = this.addForm.nodularViewOther;
          }
          this.dialogVisible = false;
          this.addForm.checkList1 = [];
          this.addForm.checkList2 = [];
          this.addForm.nodularBiopsyOther = "";
          this.addForm.nodularViewOther = "";
          this.$refs[formName].resetFields();
          this.dialogVisibleFlag = null;
        }
      });
    },
    abnormalRChange(value) {},
    abnormalIChange(value) {
      if (value == 2) {
        this.form.abnormalI1 = "";
      }
    },
    abnormalG1Change(value) {
      if (value == 2) {
        this.form.abnormalG1 = "";
      }
    },
    abnormalFChange(value) {
      if (value == 2) {
        this.form.abnormalF6 = "";
      }
    },
    abnormalBChange(value) {
      if (value == 2) {
        this.form.abnormalB4 = "";
      }
    },

    examinationMethodChange(x) {
      if (
        x.examinationMethod == 1 ||
        x.examinationMethod == 2 ||
        x.examinationMethod == 3 ||
        x.examinationMethod == 4
      ) {
        x.classes.push(4);
        this.classesChange(x);
      } else {
        x.classes.splice(x.classes.indexOf(4), 1);
        this.classesChange(x);
      }
    },
    scanParametersChange(value) {
      this.form.maxMaValue = "";
      this.form.minMaValue = "";
      this.form.noiseLevel = "";
      this.form.maValue = "";
      this.form.kvpValue = "";
      this.form.slewTime = "";
      this.form.slewTimeOther = "";
      this.form.kvpOtherValue = "";
      this.form.maOtherValue = "";
      this.form.maxMaOtherValue = "";
      this.form.minMaOtherValue = "";
      this.form.noiseLevelOther = "";
    },
    //通过sid获取设备信息
    getEquipment() {
      this.$axios_http({
        url: "/base/fc/ct/select/equipment",
        data: {},
        vueObj: this
      }).then(res => {
        if (res.data.result) {
          this.form.equipmentMfrs = res.data.result.equipmentMfrs + "";
          this.form.equipmentVersion = res.data.result.equipmentVersion + "";
          this.form.scanParameters = res.data.result.scanParameters / 1;
          this.getModelshow(this.form.equipmentMfrs);
          if (res.data.result.scanParameters == 1) {
            this.form.maValue = res.data.result.maValue / 1;
            if (res.data.result.maValue == 5) {
              this.form.maOtherValue = res.data.result.maOtherValue / 1;
            }
          } else if (res.data.result.scanParameters == 2) {
            this.form.maxMaValue = res.data.result.maxMaValue / 1;
            this.form.minMaValue = res.data.result.minMaValue / 1;
            this.form.noiseLevel = res.data.result.noiseLevel / 1;
            if (res.data.result.maxMaValue == 4) {
              this.form.maxMaOtherValue = res.data.result.maxMaOtherValue;
            }
            if (res.data.result.minMaValue == 3) {
              this.form.minMaOtherValue = res.data.result.minMaOtherValue;
            }
            if (res.data.result.noiseLevel == 2) {
              this.form.noiseLevelOther = res.data.result.noiseLevelOther;
            }
          }
          this.form.kvpValue = res.data.result.kvpValue / 1;
          this.form.slewTime = res.data.result.slewTime / 1;
          if (res.data.result.kvpValue == 4) {
            this.form.kvpOtherValue = res.data.result.kvpOtherValue;
          }
          if (res.data.result.slewTime == 5) {
            this.form.slewTimeOther = res.data.result.slewTimeOther;
          }
          if (res.data.result.flabImageDeep != null) {
            this.form.flabImageDeep = res.data.result.flabImageDeep;
          }
          if (res.data.result.flabReconstructionDeep != null) {
            this.form.flabReconstructionDeep =
              res.data.result.flabReconstructionDeep;
          }
          if (res.data.result.flabImageShallow != null) {
            this.form.flabImageShallow = res.data.result.flabImageShallow;
          }
          if (res.data.result.flabReconstructionShallow != null) {
            this.form.flabReconstructionShallow =
              res.data.result.flabReconstructionShallow;
          }
          if (res.data.result.lungImageDeep != null) {
            this.form.lungImageDeep = res.data.result.lungImageDeep;
          }
          if (res.data.result.lungReconstructionDeep != null) {
            this.form.lungReconstructionDeep =
              res.data.result.lungReconstructionDeep;
          }
          if (res.data.result.lungImageShallow != null) {
            this.form.lungImageShallow = res.data.result.lungImageShallow;
          }
          if (res.data.result.lungReconstructionShallow != null) {
            this.form.lungReconstructionShallow =
              res.data.result.lungReconstructionShallow;
          }
          if (res.data.result.flabImageDeepOther != null) {
            this.form.flabImageDeepOther = res.data.result.flabImageDeepOther;
          }
          if (res.data.result.flabReconstructionDeepOther != null) {
            this.form.flabReconstructionDeepOther =
              res.data.result.flabReconstructionDeepOther;
          }
          if (res.data.result.flabImageShallowOther != null) {
            this.form.flabImageShallowOther =
              res.data.result.flabImageShallowOther;
          }
          if (res.data.result.flabReconstructionShallowOther != null) {
            this.form.flabReconstructionShallowOther =
              res.data.result.flabReconstructionShallowOther;
          }
          if (res.data.result.lungImageDeepOther != null) {
            this.form.lungImageDeepOther = res.data.result.lungImageDeepOther;
          }
          if (res.data.result.lungReconstructionDeepOther != null) {
            this.form.lungReconstructionDeepOther =
              res.data.result.lungReconstructionDeepOther;
          }
          if (res.data.result.lungImageShallowOther != null) {
            this.form.lungImageShallowOther =
              res.data.result.lungImageShallowOther;
          }
          if (res.data.result.lungReconstructionShallowOther != null) {
            this.form.lungReconstructionShallowOther =
              res.data.result.lungReconstructionShallowOther;
          }
        }
      });
    },
    deepChange(a, b) {
      if (this.form[a] != 0) {
        this.form[b] = "";
      }
    },
    //通过sid获取用户信息
    getInfo() {
      this.form.userName = "";
      this.form.phone = "";
      this.form.sex = "";
      this.form.age = "";
      this.form.idCard = "";
      this.form.personScreenId = "";
      this.form.personId = "";
      this.$axios_http({
        url: "/base/re/booking/qurey/getPersonDetails",
        data: {
          personId: this.$route.query.personId,
          surverId: this.$route.query.surverId
        },
        vueObj: this
      }).then(res => {
        this.form.userName = res.data.result.name;
        this.form.phone = res.data.result.phone;
        this.form.sex = res.data.result.sex == 1 ? "男" : "女";
        this.form.age = res.data.result.age + "岁";
        this.form.idCard = res.data.result.idCard;
      });
    },
    changeinputisnull(a, b, c) {
      if (this.form[a] != b) {
        this.form[c] = null;
      }
    },
    checkBoxChange(a, b) {
      if (this.form[a] == false) {
        this.form[b] = null;
      }
    },
    // 胸膜牵拉
    otherDetailChange(item) {
      if (item.otherDetail == 2) {
        item.densityOther = [];
      }
    },
    // 提交时多选转字符串
    arrayToString() {
      Array.isArray(this.form.item2) && (this.form.item2 = JSON.stringify(this.form.item2));
      Array.isArray(this.form.abnormalR0Position) && (this.form.abnormalR0Position = JSON.stringify(
        this.form.abnormalR0Position
      ));
      Array.isArray(this.form.abnormalR1Position) && (this.form.abnormalR1Position = JSON.stringify(
        this.form.abnormalR1Position
      ));
      Array.isArray(this.form.abnormalR2Position) && (this.form.abnormalR2Position = JSON.stringify(
        this.form.abnormalR2Position
      ));
      Array.isArray(this.form.abnormalR3Position) && (this.form.abnormalR3Position = JSON.stringify(
        this.form.abnormalR3Position
      ));
      Array.isArray(this.form.abnormalR4Position) && (this.form.abnormalR4Position = JSON.stringify(
        this.form.abnormalR4Position
      ));
      Array.isArray(this.form.abnormalR5Position) && (this.form.abnormalR5Position = JSON.stringify(
        this.form.abnormalR5Position
      ));
      Array.isArray(this.form.abnormalR6Position) && (this.form.abnormalR6Position = JSON.stringify(
        this.form.abnormalR6Position
      ));
      Array.isArray(this.form.new5Other) && (this.form.new5Other = JSON.stringify(this.form.new5Other));
      Array.isArray(this.form.new6Other) && (this.form.new6Other = JSON.stringify(this.form.new6Other));
      Array.isArray(this.form.abnormalGOther) && (this.form.abnormalGOther = JSON.stringify(this.form.abnormalGOther));
      Array.isArray(this.form.new11) && (this.form.new11 = JSON.stringify(this.form.new11));
      Array.isArray(this.form.new15) && (this.form.new15 = JSON.stringify(this.form.new15));
      Array.isArray(this.form.new18) && (this.form.new18 = JSON.stringify(this.form.new18));
      Array.isArray(this.form.new22) && (this.form.new22 = JSON.stringify(this.form.new22));
      Array.isArray(this.form.new24) && (this.form.new24 = JSON.stringify(this.form.new24));
      Array.isArray(this.form.new27) && (this.form.new27 = JSON.stringify(this.form.new27));
      Array.isArray(this.form.new28) && (this.form.new28 = JSON.stringify(this.form.new28));
      Array.isArray(this.form.new34) && (this.form.new34 = JSON.stringify(this.form.new34));
      Array.isArray(this.form.new35) && (this.form.new35 = JSON.stringify(this.form.new35));
      Array.isArray(this.form.new40) && (this.form.new40 = JSON.stringify(this.form.new40));
      Array.isArray(this.form.new42) && (this.form.new42 = JSON.stringify(this.form.new42));
      Array.isArray(this.form.new44) && (this.form.new44 = JSON.stringify(this.form.new44));
      Array.isArray(this.form.abnormalH2) && (this.form.abnormalH2 = JSON.stringify(this.form.abnormalH2));
      Array.isArray(this.form.abnormalK2) && (this.form.abnormalK2 = JSON.stringify(this.form.abnormalK2));
      Array.isArray(this.form.abnormalM2) && (this.form.abnormalM2 = JSON.stringify(this.form.abnormalM2));
      Array.isArray(this.form.abnormalO2) && (this.form.abnormalO2 = JSON.stringify(this.form.abnormalO2));
      Array.isArray(this.form.abnormalQ2) && (this.form.abnormalQ2 = JSON.stringify(this.form.abnormalQ2));
      Array.isArray(this.form.abnormalS2) && (this.form.abnormalS2 = JSON.stringify(this.form.abnormalS2));
    },
    stringToArray() {
      this.form.item2 = JSON.parse(this.form.item2);
      this.form.abnormalR0Position = JSON.parse(this.form.abnormalR0Position);
      this.form.abnormalR1Position = JSON.parse(this.form.abnormalR1Position);
      this.form.abnormalR2Position = JSON.parse(this.form.abnormalR2Position);
      this.form.abnormalR3Position = JSON.parse(this.form.abnormalR3Position);
      this.form.abnormalR4Position = JSON.parse(this.form.abnormalR4Position);
      this.form.abnormalR5Position = JSON.parse(this.form.abnormalR5Position);
      this.form.abnormalR6Position = JSON.parse(this.form.abnormalR6Position);
      this.form.new5Other = JSON.parse(this.form.new5Other);
      this.form.new6Other = JSON.parse(this.form.new6Other);
      this.form.abnormalGOther = JSON.parse(this.form.abnormalGOther);
      this.form.new11 = JSON.parse(this.form.new11);
      this.form.new15 = JSON.parse(this.form.new15);
      this.form.new18 = JSON.parse(this.form.new18);
      this.form.new22 = JSON.parse(this.form.new22);
      this.form.new24 = JSON.parse(this.form.new24);
      this.form.new27 = JSON.parse(this.form.new27);
      this.form.new28 = JSON.parse(this.form.new28);
      this.form.new34 = JSON.parse(this.form.new34);
      this.form.new35 = JSON.parse(this.form.new35);
      this.form.new40 = JSON.parse(this.form.new40);
      this.form.new42 = JSON.parse(this.form.new42);
      this.form.new44 = JSON.parse(this.form.new44);
      this.form.abnormalH2 = JSON.parse(this.form.abnormalH2);
      this.form.abnormalK2 = JSON.parse(this.form.abnormalK2);
      this.form.abnormalM2 = JSON.parse(this.form.abnormalM2);
      this.form.abnormalO2 = JSON.parse(this.form.abnormalO2);
      this.form.abnormalQ2 = JSON.parse(this.form.abnormalQ2);
      this.form.abnormalS2 = JSON.parse(this.form.abnormalS2);
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid && !this.tipsShow && !this.tipsShowTrue) {
          this.buttonDisabled = true;
          if (this.form.reviewCtResult == 2) {
            this.form.ctPastResultPOList = [];
          }
          if (this.form.ctTubercleInfoPOList.length > 0) {
            for (let i = 0; i < this.form.ctTubercleInfoPOList.length; i++) {
              if (this.form.ctTubercleInfoPOList[i].densityOther) {
                this.form.ctTubercleInfoPOList[
                  i
                ].densityOther = this.form.ctTubercleInfoPOList[
                  i
                ].densityOther.join(",");
              }
              if (this.form.ctTubercleInfoPOList[i].nodularView) {
                this.form.ctTubercleInfoPOList[
                  i
                ].nodularView = this.form.ctTubercleInfoPOList[
                  i
                ].nodularView.join(",");
              }
              if (this.form.ctTubercleInfoPOList[i].nodularBiopsy) {
                this.form.ctTubercleInfoPOList[
                  i
                ].nodularBiopsy = this.form.ctTubercleInfoPOList[
                  i
                ].nodularBiopsy.join(",");
              }
            }
          }
          this.arrayToString();
          // if (this.form.abnormalR4) {
          //   this.form.abnormalR4 = 1;
          // } else {
          //   this.form.abnormalR4 = 2;
          // }
          if (this.$route.query.flag == 3) {
            var url = "/ct/add/ctrecordstatus";
          } else {
            var url = "/base/ct/add/newResult";
          }
          // 新增，编辑数据
          let $data = null;
          if (this.$route.query.flag == 4) {
            $data = Object.assign({}, this.form, {
              inputStatus: 1,
              resultFormId: this.$route.query.resultFormId,
              type: 2,
              ctRecordStatusId: this.$route.query.id
            });
          } else {
            $data = Object.assign({}, this.form, { inputStatus: 1 });
          }
          this.$axios_http({
            url: url,
            data: $data,
            vueObj: this
          }).then(res => {
            if (res.data.status == "SUCCESS") {
              this.buttonDisabled = false;
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.replace({ path: "/cancer/lunglist" });
            } else {
              for (let j = 0; j < this.form.ctTubercleInfoPOList.length; j++) {
                if (
                  this.form.ctTubercleInfoPOList[j].densityOther &&
                  typeof this.form.ctTubercleInfoPOList[j].densityOther ==
                    "string"
                ) {
                  this.form.ctTubercleInfoPOList[
                    j
                  ].densityOther = this.form.ctTubercleInfoPOList[
                    j
                  ].densityOther.split(",");
                } else {
                  this.form.ctTubercleInfoPOList[j].densityOther = [];
                }

                if (
                  this.form.ctTubercleInfoPOList[j].nodularView &&
                  typeof this.form.ctTubercleInfoPOList[j].nodularView ==
                    "string"
                ) {
                  this.form.ctTubercleInfoPOList[
                    j
                  ].nodularView = this.form.ctTubercleInfoPOList[
                    j
                  ].nodularView.split(",");
                } else {
                  this.form.ctTubercleInfoPOList[j].nodularView = [];
                }

                if (
                  this.form.ctTubercleInfoPOList[j].nodularBiopsy &&
                  typeof this.form.ctTubercleInfoPOList[j].nodularBiopsy ==
                    "string"
                ) {
                  this.form.ctTubercleInfoPOList[
                    j
                  ].nodularBiopsy = this.form.ctTubercleInfoPOList[
                    j
                  ].nodularBiopsy.split(",");
                } else {
                  this.form.ctTubercleInfoPOList[j].nodularBiopsy = [];
                }
              }
              this.stringToArray();
              this.buttonDisabled = false;
            }
          });
        } else {
          this.buttonDisabled = false;
          this.$message({
            type: "error",
            message: "有必填项未填"
          });
          return;
        }
      });
    },
    sort(a, b) {
      return a - b;
    },
    flabImageDeepChecked1Change(value) {
      if (!value) {
        (this.form.lungImageDeep = ""), //肺常规图像层厚
          (this.form.lungImageDeepOther = ""),
          (this.form.lungImageShallow = ""), //肺常规图像薄层
          (this.form.lungImageShallowOther = ""),
          (this.form.lungReconstructionDeep = ""), //肺常规重建层厚
          (this.form.lungReconstructionDeepOther = ""),
          (this.form.lungReconstructionShallow = ""), //肺常规重建薄层
          (this.form.lungReconstructionShallowOther = "");
      }
    },
    abnormalMeeting21Change(a, b) {
      if (this.form[a] != 1) {
        this.form[b] = "";
      }
    },
    item10_16Change() {
      if (this.form.item10_16 == 2) {
        this.form.abnormalP = 2;
      } else if (this.form.item10_16 == 1) {
        this.form.abnormalP = 1;
      }
    },
    meetingViewChange(item) {
      if (item.meetingView != 3) {
        item.meetingViewOther = "";
      }
    },
    meetingStatusChange(item) {
      if (item.meetingStatus != 1) {
        item.meetingLevel = "";
        item.meetingView = "";
        item.meetingViewOther = "";
      }
    },
    interphaseChangeComponentStatusChange(item) {
      if (item.interphaseChangeComponentStatus == 3) {
        item.interphaseChangeComponentStr = "";
      }
    },
    interphaseChangeSizeStatusChange(item) {
      if (item.interphaseChangeSizeStatus == 3) {
        item.interphaseChangeSizeStr = "";
      }
    },
    interphaseChangeStatusChange(item) {
      if (item.interphaseChangeStatus != 1) {
        item.interphaseChangeSizeStatus = "";
        item.interphaseChangeSizeStr = "";
        item.interphaseChangeComponentStatus = "";
        item.interphaseChangeComponentStr = "";
        item.interphaseChangeDensityStatus = "";
      }
    },
    densityChange(item) {
      if (item.density != 2) {
        item.trueDiameter = "";
        item.trueMinorAxis = "";
        item.trueAverageDiameter = "";
        item.trueVolume = "";
      }
    },
    classesChange(x) {
      if (x.classes.indexOf(1) > -1) {
        x.examinationTypeBase = 1;
      } else {
        x.examinationTypeBase = 2;
      }
      if (x.classes.indexOf(2) > -1) {
        x.examinationTypeDiagnosis = 1;
      } else {
        x.examinationTypeDiagnosis = 2;
      }
      if (x.classes.indexOf(3) > -1) {
        x.examinationTypeFollow = 1;
      } else {
        x.examinationTypeFollow = 2;
      }
      if (x.classes.indexOf(4) > -1) {
        x.examinationTypeYear = 1;
      } else {
        x.examinationTypeYear = 2;
      }
    },
    checkListChange(x) {
      if (x.checkList.indexOf(1) > -1) {
        x.chest = 1;
      } else {
        x.chest = 2;
      }
      if (x.checkList.indexOf(2) > -1) {
        x.abdomen = 1;
      } else {
        x.abdomen = 2;
      }
      if (x.checkList.indexOf(3) > -1) {
        x.pelvic = 1;
      } else {
        x.pelvic = 2;
      }
      if (x.checkList.indexOf(4) > -1) {
        x.brain = 1;
      } else {
        x.brain = 2;
      }
      if (x.checkList.indexOf(5) > -1) {
        x.examinationOther = 1;
      } else {
        x.examinationOther = 2;
        x.examinationOtherStr = "";
      }
    },
    item2Change(value) {
      if (value.indexOf(1) > -1) {
        this.form.ctImageScanningReasonA = 1;
      } else {
        this.form.ctImageScanningReasonA = 2;
      }
      if (value.indexOf(2) > -1) {
        this.form.ctImageScanningReasonB = 1;
      } else {
        this.form.ctImageScanningReasonB = 2;
      }
      if (value.indexOf(3) > -1) {
        this.form.ctImageScanningReasonC = 1;
      } else {
        this.form.ctImageScanningReasonC = 2;
      }
      if (value.indexOf(4) > -1) {
        this.form.ctImageScanningReasonD = 1;
      } else {
        this.form.ctImageScanningReasonD = 2;
      }
      if (value.indexOf(5) > -1) {
        this.form.ctImageScanningReasonE = 1;
      } else {
        this.form.ctImageScanningReasonE = 2;
      }
      if (value.indexOf(6) > -1) {
        this.form.ctImageScanningReasonF = 1;
      } else {
        this.form.ctImageScanningReasonF = 2;
      }
      if (value.indexOf(7) > -1) {
        this.form.ctImageScanningReasonG = 1;
      } else {
        this.form.ctImageScanningReasonG = 2;
      }
      if (value.indexOf(8) > -1) {
        this.form.ctImageScanningReasonH = 1;
      } else {
        this.form.ctImageScanningReasonH = 2;
        this.form.ctImageScanningReasonOther = "";
      }
    },

    item10_14Change(value) {
      if (value == 2) {
        this.form.item10_14_2_1 = false;
        this.form.item10_14_2_2 = false;
        this.form.item10_14_2_3 = false;
        this.form.item10_14_2_4 = false;
        this.form.item10_14_2_5 = false;
        this.form.abnormalN1 = null;
        this.form.abnormalN2 = null;
        this.form.abnormalN3 = null;
        this.form.abnormalN4 = null;
        this.form.abnormalN5 = null;
      }
    },
    item10_17Change(value) {
      if (value == 2) {
        this.form.abnormalR0 = null;
        this.form.abnormalR1 = null;
        this.form.abnormalR2 = null;
        this.form.abnormalR3 = null;
        this.form.abnormalR4 = null;
        this.form.abnormalR5 = null;
        this.form.abnormalR6 = null;
        this.form.abnormalR7 = null;
        this.form.abnormalR8 = null;
      }
    },
    abnormalCChange(value) {
      if (value == 2) {
        this.form.abnormalC_2_1 = false;
        this.form.abnormalC_2_2 = false;
        this.form.abnormalC_2_3 = false;
        this.form.abnormalC_2_4 = false;
        this.form.abnormalC1 = null;
        this.form.abnormalC2 = null;
        this.form.abnormalC3 = null;
        this.form.abnormalC4 = null;
      }
    },
    item10_17_2_7Change(value) {
      if (value == false) {
        this.form.abnormalR8 = null;
        this.form.abnormalR7 = null;
      }
    },
    //改变选中状态
    selectChange(a, b) {
      if (this.form[a] != null || this.form[a] != "") {
        this.form[b] = true;
      }
    },

    //是否会诊状态 改变
    meetingStatusChange(item) {
      if (item.meetingStatus != 1) {
        item.meetingLevel = null;
        item.meetingView = null;
        item.meetingViewOther = null;
      }
    },
    countToFixed(item) {
      if (item.diameter % 1 === 0 && item.diameter != "") {
        item.diameter = this.returnFloat(item.diameter);
      }
    },
    countToFixed1(item) {
      if (item.minorAxis % 1 === 0 && item.minorAxis != "") {
        item.minorAxis = this.returnFloat(item.minorAxis);
      }
    },
    countToFixed2(item) {
      if (item.volume % 1 === 0 && item.volume != "") {
        item.volume = this.returnFloat(item.volume);
      }
    },
    countToFixed3(item) {
      if (item.trueDiameter % 1 === 0 && item.trueDiameter != "") {
        item.trueDiameter = this.returnFloat(item.trueDiameter);
      }
    },
    countToFixed4(item) {
      if (item.trueMinorAxis % 1 === 0 && item.trueMinorAxis != "") {
        item.trueMinorAxis = this.returnFloat(item.trueMinorAxis);
      }
    },
    countToFixed5(item) {
      if (item.trueVolume % 1 === 0 && item.trueVolume != "") {
        item.trueVolume = this.returnFloat(item.trueVolume);
      }
    },
    returnFloat(value) {
      var value = Math.round(parseFloat(value) * 1000) / 1000;
      var xsd = value.toString().split(".");

      if (xsd.length == 1) {
        value = value.toString() + ".000";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length == 1) {
          value = value.toString() + "00";
        }
        if (xsd[1].length == 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
    // 一个特别恶心的清空操作
    abnormalStatusChange1(val) {
      if (val == 2) {
        this.form.abnormalC_2_1 = false;
        this.form.abnormalC_2_2 = false;
        this.form.abnormalC_2_3 = false;
        this.form.abnormalC_2_4 = false;
        this.form.abnormalC1 = null;
        this.form.abnormalC2 = null;
        this.form.abnormalC3 = null;
        this.form.abnormalC4 = null;
        this.clearItem(
          this.form.abnormalStatus,
          [
            "abnormalR8",
            "abnormalR7",
            "abnormalContOther",
            "abnormalFirstDate",
            "oldAbnormalStatus",
            "abnormalMeetingStatus",
            "abnormalMeetingStatusRemark",
            "abnormalR1",
            "abnormalR2",
            "abnormalR3",
            "abnormalR4",
            "abnormalR5",
            "abnormalR6",
            "abnormalC",
            "abnormalL",
            "abnormalL1",
            "abnormalL2",
            "abnormalL3",
            "abnormalL4",
            "abnormalL5",
            "abnormalJ",
            "abnormalJ1",
            "abnormalJ2",
            "abnormalJ3",
            "abnormalJ4",
            "abnormalJ5",
            "abnormalN",
            "abnormalN1",
            "new2",
            "new1",
            "new39",
            "new41",
            "new43",
            "new45",
            "new0",
            "abnormalE",
            "abnormalD",
            "abnormalD1",
            "abnormalD2",
            "new5",
            "new6",
            "abnormalG",
            "new38",
            "abnormalE1",
            "abnormalE2",
            "abnormalG1",
            "abnormalR8",
            "abnormalR0",
            "new32",
            "abnormalK",
            "abnormalK1",
            "abnormalH",
            "abnormalH1",
            "abnormalQ",
            "abnormalQ1",
            "abnormalS",
            "abnormalS1",
            "abnormalO",
            "abnormalO1",
            "abnormalM",
            "abnormalM1",
            "new33",
            "new29",
            "new7",
            "new8",
            "new9",
            "new10",
            "new12",
            "new13",
            "new26",
            "new30",
            "new31",
            "abnormalR",
            "new4",
            "new14",
            "new16",
            "new17",
            "new19",
            "abnormalA",
            "abnormalA1",
            "abnormalA2",
            "abnormalA3",
            "abnormalA4",
            "abnormalA5",
            "abnormalA6",
            "abnormalA7",
            "abnormalA8",
            "abnormalA9",
            "abnormalA10",
            "abnormalA11",
            "abnormalA12",
            "abnormalA13",
            "abnormalA14",
            "abnormalA15",
            "abnormalA16",
            "abnormalA17",
            "abnormalA18",
            "abnormalA19",
            "abnormalA20",
            "abnormalA21",
            "new20",
            "new21",
            "new23",
            "new25"
          ],
          [
            "new11",
            "new15",
            "new18",
            "new22",
            "new24",
            "new27",
            "new28",
            "new5Other",
            "new6Other",
            "abnormalGOther",
            "new40",
            "new42",
            "new44",
            "abnormalR0Position",
            "abnormalR1Position",
            "abnormalR2Position",
            "abnormalR3Position",
            "abnormalR4Position",
            "abnormalR5Position",
            "abnormalR6Position",
            "abnormalK2",
            "abnormalH2",
            "abnormalQ2",
            "abnormalS2",
            "abnormalO2",
            "abnormalM2"
          ],
          2,
          2
        );
      }
    },
    //获取平均径
    getMeanDiameter(item, index) {
      if (item.diameter && item.minorAxis) {
        item.averageDiameter = (item.diameter / 1 + item.minorAxis / 1) / 2;
        item.averageDiameter = this.returnFloat(item.averageDiameter);
        if (Number(item.averageDiameter) < 5) {
          document.getElementById(`tipsShow${index}`).style.visibility =
            "visible";
          this.tipsShow = true;
        } else {
          document.getElementById(`tipsShow${index}`).style.visibility =
            "hidden";
          this.tipsShow = false;
        }
      } else {
        item.averageDiameter = null;
        this.tipsShow = false;
        document.getElementById(`tipsShow${index}`).style.visibility = "hidden";
      }
    },
    //获取实性平均径
    getsxMeanDiameter(item, index) {
      if (item.trueDiameter && item.trueMinorAxis) {
        item.trueAverageDiameter =
          (item.trueDiameter / 1 + item.trueMinorAxis / 1) / 2;
        item.trueAverageDiameter = this.returnFloat(item.trueAverageDiameter);
        // if (Number(item.trueAverageDiameter) < 5) {
        //   document.getElementById(`tipsShowTrue${index}`).style.visibility =
        //     "visible";
        //   this.tipsShowTrue = true;
        // } else {
        //   document.getElementById(`tipsShowTrue${index}`).style.visibility =
        //     "hidden";
        //   this.tipsShowTrue = false;
        // }
      } else {
        item.trueAverageDiameter = null;
        // this.tipsShowTrue = false;
        // document.getElementById(`tipsShowTrue${index}`).style.visibility =
        //   "hidden";
      }
    },
    /** 通过sid获取用户信息
     *   @params  type=2,筛查医院
     */
    getCTResult() {
      this.$axios_http({
        url: "/base/ct/select/newResult",
        data: {
          id: this.$route.query.resultFormId,
          type: this.$route.query.type
        },
        vueObj: this
      }).then(res => {
        let $form = res.data.result;
        this.getModelshow($form.equipmentMfrs);
        $form.lessTenCount += "";
        if ($form.lessTenCount) {
          $form.item8_3 = 1;
          this.countState = true;
        }
        if ($form.greaterTenCount) {
          $form.item8_3 = 2;
          this.countState = true;
        }
        if ($form.ctPastResultPOList) {
          for (let i = 0; i < $form.ctPastResultPOList.length; i++) {
            $form.ctPastResultPOList[i].checkList = [];
            $form.ctPastResultPOList[i].classes = [];
            if ($form.ctPastResultPOList[i].chest == 1) {
              $form.ctPastResultPOList[i].checkList.push(1);
            }
            if ($form.ctPastResultPOList[i].abdomen == 1) {
              $form.ctPastResultPOList[i].checkList.push(2);
            }
            if ($form.ctPastResultPOList[i].pelvic == 1) {
              $form.ctPastResultPOList[i].checkList.push(3);
            }
            if ($form.ctPastResultPOList[i].brain == 1) {
              $form.ctPastResultPOList[i].checkList.push(4);
            }
            if ($form.ctPastResultPOList[i].examinationOther == 1) {
              $form.ctPastResultPOList[i].checkList.push(5);
            }
            if ($form.ctPastResultPOList[i].examinationTypeBase == 1) {
              $form.ctPastResultPOList[i].classes.push(1);
            }
            if ($form.ctPastResultPOList[i].examinationTypeDiagnosis == 1) {
              $form.ctPastResultPOList[i].classes.push(2);
            }
            if ($form.ctPastResultPOList[i].examinationTypeFollow == 1) {
              $form.ctPastResultPOList[i].classes.push(3);
            }
            if ($form.ctPastResultPOList[i].examinationTypeYear == 1) {
              $form.ctPastResultPOList[i].classes.push(4);
            }
            $form.ctPastResultPOList[i].examinationMethod += "";
          }
        }

        if ($form.ctTubercleInfoPOList) {
          for (let j = 0; j < $form.ctTubercleInfoPOList.length; j++) {
            for (let item in $form.ctTubercleInfoPOList[j]) {
              if ($form.ctTubercleInfoPOList[j][item]) {
                if (
                  item == "nodularView" ||
                  item == "nodularBiopsy" ||
                  item == "densityOther"
                ) {
                  $form.ctTubercleInfoPOList[j][
                    item
                  ] = $form.ctTubercleInfoPOList[j][item].split(",");
                } else {
                  $form.ctTubercleInfoPOList[j][item] += "";
                }
              } else {
                if (
                  item == "nodularView" ||
                  item == "nodularBiopsy" ||
                  item == "densityOther"
                ) {
                  $form.ctTubercleInfoPOList[j][item] = [];
                }
              }
            }
          }
        }
        $form.equipmentMfrs += "";
        $form.equipmentVersion += "";
        if ($form.abnormalC0) {
          $form.abnormalC0 += "";
        }
        if ($form.abnormalC1) {
          $form.abnormalC_2_1 = true;
          $form.abnormalC1 += "";
        }
        if ($form.abnormalC2) {
          $form.abnormalC_2_2 = true;
          $form.abnormalC2 += "";
        }
        if ($form.abnormalC3) {
          $form.abnormalC_2_3 = true;
          $form.abnormalC3 += "";
        }
        if ($form.abnormalC4) {
          $form.abnormalC_2_4 = true;
          $form.abnormalC4 += "";
        }

        if ($form.abnormalN1 != null && $form.abnormalN1 != "") {
          $form.abnormalN1 += "";
          $form.abnormalN = 1;
          $form.item10_14_2_1 = true;
        }
        if ($form.abnormalN2) {
          $form.abnormalN2 += "";
          $form.abnormalN = 1;
          $form.item10_14_2_2 = true;
        }
        if ($form.abnormalN3) {
          $form.abnormalN3 += "";
          $form.abnormalN = 1;
          $form.item10_14_2_3 = true;
        }
        if ($form.abnormalN4) {
          $form.abnormalN4 += "";
          $form.abnormalN = 1;
          $form.item10_14_2_4 = true;
        }
        if ($form.abnormalN5) {
          $form.abnormalN5 += "";
          $form.abnormalN = 1;
          $form.item10_14_2_5 = true;
        }
        // if (
        //   !$form.abnormalN1 &&
        //   !$form.abnormalN2 &&
        //   !$form.abnormalN3 &&
        //   !$form.abnormalN4 &&
        //   !$form.abnormalN5
        // ) {
        //   $form.abnormalN = 2;
        // }
        if ($form.abnormalP == 1) {
          //            this.form.abnormalP += ''
          $form.item10_16 = 1;
        } else {
          $form.item10_16 = 2;
        }
        if ($form.abnormalR) {
          $form.item10_17 = 1;
        }
        if ($form.abnormalR0 == 1) {
          $form.item10_17 = 1;
          $form.item10_17_2_1 = true;
        }
        if ($form.abnormalR1 == 1) {
          $form.item10_17 = 1;
          $form.item10_17_2_1 = true;
        }
        if ($form.abnormalR2 == 1) {
          $form.item10_17 = 1;
          $form.item10_17_2_2 = true;
        }
        if ($form.abnormalR3 == 1) {
          $form.item10_17 = 1;
          $form.item10_17_2_3 = true;
        }
        if ($form.abnormalR4 == 1) {
          $form.abnormalR4 = 1;
          $form.item10_17 = 1;
        }
        if ($form.abnormalR5 == 1) {
          $form.item10_17 = 1;
          $form.item10_17_2_5 = true;
        }
        if ($form.abnormalR6 == 1) {
          $form.item10_17 = 1;
          $form.item10_17_2_6 = true;
        }
        if ($form.abnormalR7 == 1) {
          $form.item10_17 = 1;
          $form.item10_17_2_7 = true;
        }
        // $form.item2 = [];
        // if ($form.ctImageScanningReasonA == 1) {
        //   $form.item2.push(1);
        // }
        // if ($form.ctImageScanningReasonB == 1) {
        //   $form.item2.push(2);
        // }
        // if ($form.ctImageScanningReasonC == 1) {
        //   $form.item2.push(3);
        // }
        // if ($form.ctImageScanningReasonD == 1) {
        //   $form.item2.push(4);
        // }
        // if ($form.ctImageScanningReasonE == 1) {
        //   $form.item2.push(5);
        // }
        // if ($form.ctImageScanningReasonF == 1) {
        //   $form.item2.push(6);
        // }
        // if ($form.ctImageScanningReasonG == 1) {
        //   $form.item2.push(7);
        // }
        // if ($form.ctImageScanningReasonH == 1) {
        //   $form.item2.push(8);
        // }
        $form.diagnosticResult += "";
        $form.userName = res.data.result.hosPersonInfoPO.name;
        $form.age = res.data.result.hosPersonInfoPO.age;
        $form.idCard = res.data.result.hosPersonInfoPO.idCard;
        $form.sex = res.data.result.hosPersonInfoPO.sex == 1 ? "男" : "女";
        this.form = $form;
      });
    },
    //添加结节表单数量
    addTableTubercleList() {
      // this.form.ctTubercleInfoPOList = [];
      if(this.form.item8_3 == "1" &&
        this.form.lessTenCount > 0 &&
        this.form.lessTenCount <= 6 &&
        this.form.lessTenCount-this.form.ctTubercleInfoPOList.length>=0){
          for (let j = this.form.ctTubercleInfoPOList.length; j < this.form.lessTenCount; j++) {
            this.form.ctTubercleInfoPOList.push({
              tubercleCode: j + 1,
              numName: null, //结节编号
              serialNumber: "", //序列编号
              imageNum: "", //图像编号
              anatomicalPosition: "", //解剖位置
              density: "", //密度
              densityOther: [],
              diameter: "", //长泾
              minorAxis: "", //垂直短径
              averageDiameter: "", //平均径
              volume: "", //体积
              trueDiameter: "", //实性长泾
              trueMinorAxis: "", //实性垂直短径
              trueAverageDiameter: "", //实性平均径
              trueVolume: "", //实性体积
              interphaseChangeStatus: "",
              interphaseChangeSizeStatus: "",
              interphaseChangeSizeStr: "",
              interphaseChangeComponentStatus: "",
              interphaseChangeComponentStr: "",
              interphaseChangeDensityStatus: "",
              nodularProperties: "", //结节性质
              nodularView: [], //结节处理意见
              nodularViewOther: "", //结节处理意见其他
              nodularBiopsy: [], //
              nodularBiopsyOther: "",
              nodularViewDate: "", //随诊时间
              meetingStatus: "", //是否会诊
              meetingLevel: "", //会诊级别
              meetingView: "", //会诊意见
              meetingViewOther: "", //会诊意见其他
              shape: "", //形状
              edge: "", //边缘
              otherDetail: null //其他描述
            });
          }
        } else if(this.form.item8_3 == "1" &&
        this.form.lessTenCount > 0 &&
        this.form.lessTenCount <= 6 &&
        this.form.lessTenCount-this.form.ctTubercleInfoPOList.length<0){
          this.form.ctTubercleInfoPOList.splice(this.form.lessTenCount,this.form.ctTubercleInfoPOList.length-this.form.lessTenCount);
        }
        // 结节大于6最多只有6个
      if (this.form.item8_3 == "2" && this.form.greaterTenCount > 6) {
        let n=this.form.lessTenCount-this.form.ctTubercleInfoPOList.length
        for (let i = this.form.ctTubercleInfoPOList.length; i < 6; i++) {
          this.form.ctTubercleInfoPOList.push({
            tubercleCode: i + 1,
            numName: null, //结节编号
            serialNumber: "", //序列编号
            imageNum: "", //图像编号
            anatomicalPosition: "", //解剖位置
            density: "", //密度
            densityOther: [], //密度其他
            diameter: "", //长泾
            minorAxis: "", //垂直短径
            averageDiameter: "", //平均径
            volume: "", //体积
            trueDiameter: "", //实性长泾
            trueMinorAxis: "", //实性垂直短径
            trueAverageDiameter: "", //实性平均径
            trueVolume: "", //实性体积
            interphaseChangeStatus: "",
            interphaseChangeSizeStatus: "",
            interphaseChangeSizeStr: "",
            interphaseChangeComponentStatus: "",
            interphaseChangeComponentStr: "",
            interphaseChangeDensityStatus: "",
            nodularProperties: "", //结节性质
            nodularView: [], //结节处理意见
            nodularBiopsy: [], //
            nodularBiopsyOther: "",
            nodularViewOther: "", //结节处理意见其他
            nodularViewDate: "", //随诊时间
            meetingStatus: "", //是否会诊
            meetingLevel: "", //会诊级别
            meetingView: "", //会诊意见
            meetingViewOther: "", //会诊意见其他
            shape: "", //形状
            edge: "", //边缘
            otherDetail: null //其他描述
          });
        }
      }
    },
    //删除会诊
    cutctTubercleInfoPOList(item, index) {
      item.state = 1;
      this.form.ctTubercleInfoPOList.splice(index + 1, 1);
    },
    //添加会诊
    addctTubercleInfoPOList(item, index) {
      item.state = 2;
      var obj = {
        tubercleCode: this.form.ctTubercleInfoPOList[index].tubercleCode,
        numName: "会诊" + this.form.ctTubercleInfoPOList[index].numName, //结节编号
        serialNumber: null, //序列编号
        imageNum: null, //图像编号
        anatomicalPosition: null, //解剖位置
        density: null, //密度
        densityOther: [],
        diameter: null, //长泾
        minorAxis: null, //垂直短径
        averageDiameter: null, //平均径
        volume: null, //体积
        trueDiameter: null, //实性长泾
        trueMinorAxis: null, //实性垂直短径
        trueAverageDiameter: null, //实性平均径
        trueVolume: null, //实性体积
        nodularProperties: null, //结节性质
        nodularView: [], //结节处理意见
        nodularViewOther: null, //结节处理意见其他
        nodularBiopsy: [], //
        nodularBiopsyOther: "",
        nodularViewDate: null, //随诊时间
        meetingStatus: 2, //是否会诊
        meetingLevel: null, //会诊级别
        meetingView: null, //会诊意见
        meetingViewOther: null, //会诊意见其他
        shape: null, //形状
        edge: null, //边缘
        area: 2
      };
      this.form.ctTubercleInfoPOList.splice(index + 1, 0, obj);
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //根据选择品牌获取设备型号
    getModel(value) {
      for (let i = 0; i < this.brands.length; i++) {
        if (value == this.brands[i].value) {
          this.models = this.brands[i].child;
          this.form.equipmentVersion = null;
        }
      }
    },
    //根据选择品牌获取设备型号
    getModelshow(value) {
      for (let i = 0; i < this.brands.length; i++) {
        if (value == this.brands[i].value) {
          this.models = this.brands[i].child;
        }
      }
    },
    //既往影像回顾添加td
    addItem(method) {
      if (method == "plus") {
        this.form.ctPastResultPOList.push({
          examinationDate: "",
          examinationMethod: "",
          chest: 2,
          abdomen: 2,
          pelvic: 2,
          brain: 2,
          examinationOther: 2,
          examinationOtherStr: "",
          examinationTypeBase: 2,
          examinationTypeYear: 2,
          examinationTypeFollow: 2,
          examinationTypeDiagnosis: 2,
          checkList: [],
          classes: []
        });
      } else if (method == "minus") {
        this.form.ctPastResultPOList.pop();
      }
    },
    //入组时间
    getDate(value) {
      if (value != "" && value != null && value != undefined) {
        var value = new Date(value);
        return `${value.getFullYear()}年${value.getMonth() +
          1}月${value.getDate()}日`;
      }
      return value;
    },
    //根据条件清空
    /**
     * val  选中的值
     * array1  为单选或文本题
     * array2  为复选题
     * clearVal  选中值==clearVal,则清空选项
     * type  1:多选题，2：其他题型
     */
    clearItem(val, array1, array2, clearVal, type) {
      if (type === 1) {
        if (val.includes(clearVal)) {
          if (array1.length > 0) {
            for (let item in array1) {
              this.form[array1[item]] = null;
            }
          }

          if (array2.length > 0) {
            for (let item in array2) {
              this.form[array2[item]] = [];
            }
          }
        }
      } else {
        if (val == clearVal) {
          if (array1.length > 0) {
            for (let item in array1) {
              this.form[array1[item]] = null;
            }
          }

          if (array2.length > 0) {
            for (let item in array2) {
              this.form[array2[item]] = [];
            }
          }
        }
      }
    },
    // 20190604新增方法---表格内的主题干都选无，对应的答题自动选中否
    new0Change() {
      if(this.form.abnormalL==2 &&
         this.form.abnormalJ==2 &&
         this.form.abnormalN==2 &&
         this.form.new1==2 &&
         this.form.new2==2 &&
         this.form.new39==2 &&
         this.form.new41==2 &&
         this.form.new43==2 &&
         this.form.new45==2 ) {
           this.form.new0=2
           this.form.abnormalL=null
            this.form.abnormalJ=null
            this.form.abnormalN=null
            this.form.new1=null
            this.form.new2=null
            this.form.new39=null
            this.form.new41=null
            this.form.new43=null
            this.form.new45=null
      }
    },
    new4Change() {
      if(this.form.abnormalE==2 &&
         this.form.abnormalD==2 &&
         this.form.new5==2 &&
         this.form.new6==2 &&
         this.form.abnormalG==2) {
           this.form.new4=2
           this.form.abnormalE=null
            this.form.abnormalD=null
            this.form.new5=null
            this.form.new6=null
            this.form.abnormalG=null
      }
    },
    new7Change() {
      if(this.form.new10==2 &&
         this.form.new9==1 &&
         this.form.new8==2) {
           this.form.new7=2
           this.form.new10=null
            this.form.new9=null
            this.form.new8=null
      }
    },
    new13Change() {
      if(this.form.new23==2 &&
         this.form.new21==2 &&
         this.form.new20==2 &&
         this.form.abnormalA==2 &&
         this.form.new17==2 &&
         this.form.new14==2) {
           this.form.new13=2
           this.form.new23=null
            this.form.new21=null
            this.form.new20=null
            this.form.abnormalA=null
            this.form.new17=null
            this.form.new14=null
      }
    },
    new30Change() {
      if(this.form.abnormalK==2 &&
         this.form.abnormalH==2 &&
         this.form.abnormalQ==2 &&
         this.form.abnormalS==2 &&
         this.form.abnormalO==2 &&
         this.form.abnormalM==2 &&
         !this.form.new33) {
           this.form.new30=2
           this.form.abnormalK=null
            this.form.abnormalH=null
            this.form.abnormalQ=null
            this.form.abnormalS=null
            this.form.abnormalO=null
            this.form.abnormalM=null
      }
    },
    abnormalStatusChange() {
      if(this.form.new31==2 &&
         this.form.new30==2 &&
         this.form.new26==2 &&
         this.form.new13==2 &&
         this.form.new7==2 &&
         this.form.abnormalC==2 &&
         this.form.new4==2 &&
         this.form.new0==2 &&
         this.form.abnormalR==2 ) {
           this.form.abnormalStatus=2
           this.form.new31=null
            this.form.new30=null
            this.form.new26=null
            this.form.new13=null
            this.form.new7=null
            this.form.abnormalC=null
            this.form.new4=null
            this.form.new0=null
            this.form.abnormalR=null
      }
    },

  },
  watch: {
    "form.ctImageScanning": function(val) {
      if (val == 1) {
        this.form.ctImageScanningReasonA = 2;
        this.form.ctImageScanningReasonB = 2;
        this.form.ctImageScanningReasonC = 2;
        this.form.ctImageScanningReasonD = 2;
        this.form.ctImageScanningReasonE = 2;
        this.form.ctImageScanningReasonF = 2;
        this.form.ctImageScanningReasonG = 2;
        this.form.ctImageScanningReasonH = 2;
        this.form.ctImageScanningReasonOther = "";
        this.form.item2 = [];
      }
    },
    "form.reviewCtResult": function(val) {
      if (val != 1) {
        this.form.ctPastResultPOList = [
          {
            examinationDate: "",
            examinationMethod: "",
            chest: 2,
            abdomen: 2,
            pelvic: 2,
            brain: 2,
            examinationOther: 2,
            examinationOtherStr: "",
            examinationTypeBase: 2,
            examinationTypeYear: 2,
            examinationTypeFollow: 2,
            examinationTypeDiagnosis: 2,
            classes: [],
            checkList: []
          }
        ];
      }
    },
    "form.tubercle": function(val) {
      if (val == 2) {
        this.form.tubercleOther = null;
        this.form.tubercleLessFive = "";
        this.form.tubercleCount = "";
        this.form.tubercleGreaterFive = "";
        this.form.item8_3 = "";
        this.form.lessTenCount = "";
        this.form.greaterTenCount = "";
        this.form.ctTubercleInfoPOList = [];
        this.form.tubercleHandlingSuggestion = "";
        this.countState = false;
      }
    },
    "form.tubercleLessFive": function(val) {
      if (val == 1) {
        this.form.tubercleGreaterFive = "";
        this.form.item8_3 = "";
        this.form.lessTenCount = "";
        this.form.greaterTenCount = "";
        this.form.ctTubercleInfoPOList = [];
        this.form.tubercleHandlingSuggestion = "";
        this.countState = false;
      }
    },
    "form.tubercleGreaterFive": function(val) {
      if (val == 2) {
        this.form.item8_3 = "";
        this.form.lessTenCount = "";
        this.form.greaterTenCount = "";
        this.form.ctTubercleInfoPOList = [];
        this.form.tubercleHandlingSuggestion = "";
        this.countState = false;
      }
    },
    "form.item8_3": function(val) {
      if (val == 1) {
        this.form.greaterTenCount = "";
        if (this.form.lessTenCount == "" || this.form.lessTenCount == null) {
          this.countState = false;
        }
        //          this.form.ctTubercleInfoPOList = []
        //          this.form.tubercleHandlingSuggestion = ''
      } else {
        this.form.lessTenCount = "";
        if (
          this.form.greaterTenCount == "" ||
          this.form.greaterTenCount == null
        ) {
          this.countState = false;
        }
        //          this.form.ctTubercleInfoPOList = []
        //          this.form.tubercleHandlingSuggestion = ''
      }
    },
    "form.stage": function(val) {
      if (val == 1) {
        for (let i = 0; i < this.form.ctTubercleInfoPOList.length; i++) {
          this.form.ctTubercleInfoPOList[i].interphaseChangeStatus = "";
          this.form.ctTubercleInfoPOList[i].interphaseChangeSizeStatus = "";
          this.form.ctTubercleInfoPOList[i].interphaseChangeSizeStr = "";
          this.form.ctTubercleInfoPOList[i].interphaseChangeComponentStatus =
            "";
          this.form.ctTubercleInfoPOList[i].interphaseChangeComponentStr = "";
          this.form.ctTubercleInfoPOList[i].interphaseChangeDensityStatus = "";
        }
      }
    },
    "form.lungImageDeep": function(val) {
      if (val != "" && val != null) {
        this.flabImageDeepChecked1 = true;
      }
    },
    "form.abnormalMeetingStatus": function(val) {
      if (val == 2) {
        this.form.abnormalMeetingStatusRemark = "";
      }
    },
    "form.diagnosticResult": function(val) {
      if (val != 7) {
        this.form.diagnosticResultRemark = "";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.form-title {
  padding-top: 40px;
  text-align: center;
}

.form-body {
  margin-top: 40px;
}

.form-body-content {
  padding: 20px 40px;
}

.formcon {
  margin-top: 20px;
}

.formcon .title {
  width: 100%;
  background: #e5e5e5;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.content-page {
  background: #fff;
  padding: 20px;
}

.form-inline {
  display: inline-block;
}

.form-table {
  margin-top: 20px;
}

.form-table tr td {
  padding: 10px;
  width: 220px;
  border: 1px solid #000000;
}

.form-table-head {
  background: #e5e5e5;
}

.form-table p {
}

.indent {
  padding-left: 25px;
}

.form-table-content p {
  height: 80px;
  padding-left: 10px;
  padding-top: 10px;
  border-bottom: 1px solid #000000;
  border-right: 1px solid #000000;
}

.form-table-content {
  width: 100%;
  float: left;
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  overflow: scroll;
}

.addButton {
  float: left;
  margin-left: 20px;
  margin-top: 60px;
}

.form-td-content p {
  width: 240px;
}

.item-check {
  float: left;
  margin-right: 20px;
}

.form-td-title {
  width: 160px !important;
  border-left: none;
}

.div-scroll {
  float: left;
  overflow-x: scroll;
  max-width: 1500px;
  margin-left: 40px;
}

.ctTubercleInfoPOList-table-title {
  width: 200px;
}

.ctTubercleInfoPOList-table-title p {
  border-bottom: 1px solid #ffffff;
  width: 200px;
  height: 60px;
  padding-top: 10px;
  padding-bottom: 20px;
  /*border-bottom:1px solid #000000;*/
  background: #e5e5e5;
  padding-left: 10px;
}

.ctTubercleInfoPOList-table-content {
  /* . padding-top: 0 px */
}

.ctTubercleInfoPOList-table-content p {
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  border-bottom: 1px solid #ffffff;
  width: 200px;
}

.div {
  overflow-x: scroll;
  width: 98%;
}

.div-scroll {
  float: left;
  overflow-x: scroll;
  max-width: 950px;
  margin-left: 40px;
}

.form-abnormalCondition-table td {
  border: 1px solid #000000;
  width: 470px;
  margin-top: 20px;
  vertical-align: top;
  padding-top: 10px;
  padding-bottom: 10px;
}

.form-abnormalCondition-table1 td {
  border: 1px solid #000000;
  width: 470px;
  vertical-align: top;
}

.form-abnormalCondition-th {
  background: #e5e5e5;
  text-align: center;
  height: 40px;
}

.form-fontSize {
  padding-left: 40px;
  /*color: #606266;*/
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  user-select: none;
}

.add-img {
  width: 20px;
  height: 20px;
  float: right;
  margin-top: 15px;
  margin-left: 5px;
}

.tabled-td-anatomicalPosition {
  height: 145px !important;
}

.tabled-td-bt span {
  font-size: 11px;
  padding-left: 20px;
  margin-top: 5px;
  /*color: #999;*/
}

.tabled-td-density {
  height: 90px !important;
}

.tabled-td-densityOther {
  height: 290px !important;
}

.tabled-td-shape {
  height: 130px !important;
}

.tabled-td-edge {
  height: 130px !important;
}

.form-item200 {
  width: 200px;
}

.form-span-title {
  display: inline-block;
  width: 300px;
}
.form-index-title {
  font-size: 14px;
}
.red {
  color: red;
}
.redError {
  color: red;
  font-size: 12px;
  visibility: hidden;
}
.abnormalCondition{
  margin-left: 15px;
}
.abnormalCondition .el-radio{
  margin-top:5px;
}
</style>
<style>
.ldctPage .block-title .el-form-item__label,
.ldctPage .block-title .el-radio__label {
  font-size: 14px !important;
  font-weight: bold !important;
}
.ldctPage .el-checkbox-group {
  padding-left: 0;
}

.ctTubercleInfoPOList-table .el-radio {
  margin-bottom: 5px;
  display: block;
}
.el-form-item__error {
  padding: 0 !important;
}

.el-form-item .el-form-item__content span {
  word-wrap: break-word;
  word-break: break-all;
}

.form-item-check .el-form-item__content {
  margin-left: 15px !important;
}

.form-item-check {
  /*float: left;*/
}

.form-item .el-radio {
  line-height: 30px !important;
}

.form-item1 .el-form-item__content {
  margin-left: 5px !important;
}

.form-index-checkbox {
  padding-left: 40px;
}

.form-index-checkbox1 {
  padding-left: 20px;
}

.form-index-checkbox .el-checkbox + .el-checkbox {
  margin-left: 10px;
  padding: 0;
}

.form-index-checkbox .el-checkbox {
  margin-left: 10px;
}

#content .el-form-item {
  margin-bottom: 0px;
  display: inline-block;
}

#check-group .el-form-item__content {
  line-height: 22px;
  position: relative;
  font-size: 14px;
}

.form-table .el-form-item__error {
  position: relative;
}

.form-item .el-form-item__content {
  margin-left: 15px !important;
}

.form-item1 .el-form-item__content {
  margin-left: 5px !important;
}

.form-item1 {
  display: inline-block;
}

.form-table .el-form-item__content {
  margin-left: 5px !important;
}

.form-item-title-big {
  font-weight: 700;
}

#content .el-checkbox-group {
  height: auto !important;
  padding-bottom: 20px;
}

.form-index-checkbox .el-form-item {
  margin-bottom: 0px !important;
}

.ctImageScanningReason .el-form-item__content {
  margin-left: -5px !important;
}

.float-form-item {
  float: left;
}

.all-idea-table {
  margin-top: 20px;
}

.all-idea-table-title {
  width: 200px;
  background: #e5e5e5;
  padding-left: 10px;
}

.all-idea-content {
  padding-left: 20px;
  padding-top: 20px;
}

.content-page .is-disabled .el-input__inner {
  background: #fff;
  color: #666;
}

.content-page
  .el-checkbox__input.is-disabled.is-checked
  + span.el-checkbox__label {
  color: #409eff;
  cursor: not-allowed;
}

.content-page .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}

.content-page
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #fff;
}

.content-page .el-radio__input.is-disabled.is-checked + span.el-radio__label {
  color: #409eff;
}

.content-page .el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #409eff;
  border-color: #409eff;
}

.content-page .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: #f5f7fa;
}

.content-page .el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
  cursor: not-allowed;
}

.form-td-content .el-form-item__content {
  margin-left: 10px !important;
}

.form-abnormalCondition-table1 td .el-form-item {
  margin-bottom: 0px !important;
}
.dialogVisible .el-form-item__content {
  line-height: 20px !important;
}
</style>