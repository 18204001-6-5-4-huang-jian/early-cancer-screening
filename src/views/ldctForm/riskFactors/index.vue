<!--
 * @date 2019/3/1
 * @Description: 肺肠危险因素表
 * @params: eli	资格审核表id
            personInfoId		个人信息表id
            personScreenId   受试者评估状态表主键
            id		危险因素调查表id
            type 1.新增 2.查看
-->
<template>
    <!--<div class="content-page riskFactors" v-if="personalInformation_page">-->
    <div class="content-page riskFactors">
        <cancer-widget>
            <div>
                <el-button :size="inputSize" class="return-home" @click="goBack()">返 回</el-button>
                <!--<el-button :size="inputSize" class="return-home" @click="printContent()">打印</el-button>-->
            </div>
            <h3>危险因素调查表</h3>
            <div class="form-title">
                　　欢迎您参与该筛查项目！您的参与将对肺癌和结直肠癌筛查乃至整体健康有非常重要的意义。作为筛查的一部分，我们需要获得您生活习惯及个人疾病史方面的相关信息，您的所有回答都会被严格保密。您只需根据真实情况花几分钟时间填写即可。
            </div>
            <div class="form-content">
                <el-form :model="form" :rules="rules" ref="form" :inline="true">
                    <el-row>
                        <el-form-item label="1. 姓名：" required>
                            {{form.name}}
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="2. 性别：" required>
                            {{form.sex | sexFilter}}
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="3. 身份证号：" required>
                            {{form.idCard }}
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="4. 联系电话：" prop="phone">
                            <el-input v-model="form.phone" auto-complete="off" ref="phone" :size="inputSize"
                                      style="width: 220px;"
                                      :disabled="disabledState"
                            ></el-input>
                            （手机）
                        </el-form-item>
                        <el-form-item label="" prop="phone_area">
                            <el-input v-model="form.phone_area" auto-complete="off" ref="phone_area" :size="inputSize"
                                      style="width: 70px;" :disabled="disabledState"
                            ></el-input>
                        </el-form-item>
                        <span style="display: inline-block;line-height: 40px">
             -
           </span>
                        <el-form-item label="" labelWidth="=10px" prop="phone_phone" style="display: inline-block;">
                            <el-input v-model="form.phone_phone" ref="phone_phone" auto-complete="off" :size="inputSize"
                                      style="width: 136px" :disabled="disabledState"
                            ></el-input>
                            （固定电话）
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="5. 其他联系电话（可为亲属号码）:" required>(
                            <el-form-item label="与本人关系:" label-width="115px" prop="contactRelationship"
                                          style="display: inline-block;">
                                <el-input v-model="form.contactRelationship" ref="contactRelationship"
                                          auto-complete="off" :size="inputSize"
                                          style="width: 100px;" :disabled="disabledState"
                                ></el-input>
                            </el-form-item>
                            )
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="" prop="contactPhone" style="margin-left: 120px;">
                            <el-input v-model="form.contactPhone" auto-complete="off" ref="contactPhone"
                                      :size="inputSize"
                                      style="width: 220px;" :disabled="disabledState"
                            ></el-input>
                            （手机）
                        </el-form-item>
                        <el-form-item label="" prop="telephone_area" style="display: inline-block;" labelWidth="200px">
                            <el-input v-model="form.telephone_area" auto-complete="off" ref="telephone_area"
                                      :size="inputSize"
                                      style="width: 70px;" :disabled="disabledState"
                            ></el-input>
                        </el-form-item>
                        <span style="display: inline-block;line-height: 40px">
             -
           </span>
                        <el-form-item label="" prop="telephone_phone" style="display: inline-block;" labelWidth="10">
                            <el-input v-model="form.telephone_phone" ref="telephone_phone" auto-complete="off"
                                      :size="inputSize"
                                      style="width: 136px" :disabled="disabledState"
                            ></el-input>
                            （固定电话）
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="6. 常住地址：" required></el-form-item>
                        <el-form-item style="display:inline-block;" prop="permanentProvinceCode">
                            <el-select v-model="form.permanentProvinceCode" placeholder="请选择省"
                                       @change="handleProvinceChange" :disabled="disabledState">
                                <el-option
                                        v-for="item in form.provinces"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="display:inline-block;" prop="permanentCityCode">
                            <el-select v-model="form.permanentCityCode" placeholder="请选择市" @change="handleCityChange"
                                       :disabled="disabledState">
                                <el-option
                                        v-for="item in form.cities"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="display:inline-block;" prop="permanentAreaCode">
                            <el-select v-model="form.permanentAreaCode" placeholder="请选择区" :disabled="disabledState">
                                <el-option
                                        v-for="item in form.areas"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" prop="address1" style="display: inline-block">
                            <el-input v-model="form.address1" auto-complete="off" ref="address1" type="textarea"
                                      :rows="1" :size="inputSize" style="width: 350px;"
                                      :disabled="disabledState"
                            ></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="7. 问卷填写人：" prop="fillInPerson">
                            <el-input v-model="form.fillInPerson" auto-complete="off" ref="fillInPerson"
                                      :size="inputSize"
                                      style="width: 70px;"
                                      @input="isOwn"
                                      @change="clear(2,'fillInPerson',true,['fillInRelationship'],2)"
                                      :disabled="disabledState"
                            ></el-input>
                            <div>
                                <span>1. 本人</span> <span class="fillInPerson-other">2.他人（请注明与您的关系）
              <span>
                 <el-form-item label="" prop="fillInRelationship" style="display: inline-block;margin-left: 20px;"
                               v-if="form.fillInPerson == 2">
                   <el-input v-model="form.fillInRelationship" auto-complete="off" ref="fillInRelationship"
                             :size="inputSize"
                             style="width: 200px;"
                             :disabled="disabledState"></el-input>
                 </el-form-item>
              </span>
              <span>
                 <el-form-item label="" style="display: inline-block;margin-left: 20px;" v-if="form.fillInPerson != 2">
                  <el-input v-model="form.fillInRelationship" auto-complete="off" ref="fillInRelationship"
                            :size="inputSize"
                            style="width: 200px;"
                            disabled></el-input>
                 </el-form-item>
              </span>
            </span>
                            </div>
                        </el-form-item>
                    </el-row>
                    <div class="title">
                        A. 基本信息
                    </div>
                    <el-row>
                        <el-form-item
                                label="A1." required>
                            <div style="width:800px;">您受过的<u style="font-weight: 600">最高</u>教育？
                                <el-form-item label="" label-width="" prop="item1" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item1" auto-complete="off" :size="inputSize" ref="item1"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(8,'item1',true,['item2'],8)"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 未受过教育</li>
                                    <li class="radio-li">2. 小学</li>
                                    <li class="radio-li">3. 初中</li>
                                    <li class="radio-li">4. 高中/中专/技校</li>
                                    <li class="radio-li">5. 大专</li>
                                    <li class="radio-li">6. 大学本科</li>
                                    <li class="radio-li">7. 研究生及以上</li>
                                    <li class="radio-li">8. 其他
                                        <span>
                        <el-form-item label="" style="display: inline-block;margin-left: 20px;"
                                      v-if="form.item1 != 8">
                          <el-input v-model="form.item2" auto-complete="off" ref="item2" type="textarea" :rows='1'
                                    :size="inputSize"
                                    style="width: 200px;"
                                    disabled></el-input>
                        </el-form-item>
                    </span>
                                        <span>
                        <el-form-item label="" prop="item2" style="display: inline-block;margin-left: 20px;"
                                      v-if="form.item1 == 8">
                           <el-input v-model="form.item2" auto-complete="off" ref="item2" type="textarea" :rows='1'
                                     :size="inputSize"
                                     style="width: 200px;" :disabled="disabledState"></el-input>
                        </el-form-item>
                    </span>
                                    </li>
                                </ul>

                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="A2." required>
                            <div style="width:800px;">您的<u style="font-weight: 600">累积</u>受教育年限（从小学开始）：
                                <el-form-item label="" label-width="" prop="item3" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item3" auto-complete="off" :size="inputSize" ref="item3"
                                              :disabled="disabledState"
                                              style="width: 80px;" class="form-item"></el-input>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="A3." required>
                            <div style="width:800px;">您的婚姻状况？
                                <el-form-item label="" label-width="" prop="item4" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item4" auto-complete="off" :size="inputSize" ref="item4"
                                              :disabled="disabledState"
                                              style="width: 80px;" @blur="clear('marriage')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 未婚</li>
                                    <li class="radio-li">2. 初婚</li>
                                    <li class="radio-li">3. 再婚</li>
                                    <li class="radio-li">4. 离婚</li>
                                    <li class="radio-li">5. 丧偶</li>
                                    <li class="radio-li">6. 分居</li>
                                    <li class="radio-li">7.未婚同居</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <div class="marriage-other"
                             v-if="form.item4 == 2 || form.item4 == 3 || form.item4 == 4 || form.item4 ==5 || form.item4 == 6">
                    <span>
                      您初次结婚的年龄：
                      <el-form-item label="" prop="item5"
                                    style="display: inline-block;">
                           <el-input v-model="form.item5" auto-complete="off" ref="item5"
                                     :size="inputSize" style="width: 80px;" :disabled="disabledState"></el-input> 岁
                       </el-form-item>
                    </span>
                        </div>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="A4." required>
                            <div>身高（厘米）：
                                <el-form-item prop="item6" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item6" auto-complete="off" :size="inputSize" ref="item6"
                                              :disabled="disabledState"
                                              style="width: 80px;" class="form-item"></el-input>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="A5." required>
                            <div style="display: inline-block;float: left;"> 体重（公斤）：</div>
                            <ul class="weight-ul">
                                <li class="weight-ul-title">现在</li>
                                <li>
                                    <el-form-item label="" label-width="" prop="item7" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item7" auto-complete="off" :size="inputSize" ref="item7"
                                                  style="width: 80px;" :disabled="disabledState"
                                                  :maxlength='5' class="form-item"></el-input>
                                    </el-form-item>
                                </li>
                            </ul>
                            <ul class="weight-ul">
                                <li class="weight-ul-title">五年前</li>
                                <li>
                                    <el-form-item label="" label-width="" prop="item8" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item8" auto-complete="off" :size="inputSize" ref="item8"
                                                  style="width: 80px;" :disabled="disabledState"
                                                  :maxlength='5' class="form-item"></el-input>
                                    </el-form-item>
                                </li>
                            </ul>
                            <ul class="weight-ul">
                                <li class="weight-ul-title">18岁时（成人时）</li>
                                <li>
                                    <el-form-item label="" label-width="" prop="item9" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item9" auto-complete="off" :size="inputSize"
                                                  ref="item9" style="width: 80px;" :disabled="disabledState"
                                                  :maxlength='5' class="form-item"></el-input>
                                    </el-form-item>
                                </li>
                            </ul>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="A6." required>
                            <div style="display: inline-block;"> 腰围（厘米）：</div>
                            <el-form-item label="" label-width="" prop="item10" class="formItemWidth"
                                          style="display: inline-block;">
                                <el-input v-model="form.item10" auto-complete="off" :size="inputSize" ref="item10"
                                          style="width: 80px;" :disabled="disabledState"
                                          :maxlength='3' class="form-item"></el-input>
                            </el-form-item>
                            <div style="display: inline-block;"> 臀围（厘米）：</div>
                            <el-form-item label="" label-width="" prop="item11" class="formItemWidth"
                                          style="display: inline-block;">
                                <el-input v-model="form.item11" auto-complete="off" :size="inputSize" ref="item11"
                                          style="width: 80px;"
                                          :disabled="disabledState"
                                          :maxlength='3' class="form-item"></el-input>
                            </el-form-item>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="A7." required>
                            <div>您是否清楚自己的血糖值？
                                <el-form-item label="" label-width="" prop="item12" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item12" auto-complete="off" :size="inputSize" ref="item12"
                                              :disabled="disabledState"
                                              style="width: 80px;" @blur="clear(1,'item12',true,['item13','item14'],1)"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 不清楚（跳转至B部分“工作经历”）</li>
                                    <li class="radio-li">1. 清楚（继续填写）</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item label="A7.1．" required v-if="form.item12 == 1">
                            <div>您最近一次检测的空腹血糖值是：
                                <el-form-item label="" label-width="" prop="item13" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item13" auto-complete="off" :size="inputSize" ref="item13"
                                              style="width: 80px;" :disabled="disabledState"
                                              :maxlength='4' class="form-item"></el-input>
                                    　mmol/L
                                </el-form-item>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item label="A7.2．" required v-if="form.item12 == 1">
                            <div> 您最近一次检测的餐后2小时血糖值是：
                                <el-form-item label="" label-width="" prop="item14" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item14" auto-complete="off" :size="inputSize" ref="item14"
                                              style="width: 80px;" :disabled="disabledState"
                                              :maxlength='4' class="form-item"></el-input>
                                    　mmol/L
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-row>
                    <div class="title">
                        B. 工作经历
                    </div>
                    <el-row>
                        <el-form-item
                                label="B1." required>
                            <div>您的职业是：
                                <el-form-item prop="item15" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item15" auto-complete="off" :size="inputSize" ref="item15"
                                              :disabled="disabledState"
                                              style="width: 400px;" class="form-item"></el-input>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="B2." required>
                            <div>您的职业类型是：
                                <el-form-item label="" label-width="" prop="item16" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item16" auto-complete="off" :size="inputSize" ref="item16"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(9,'item16',true,['item17'],9)"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 专业技术人员</li>
                                    <li class="radio-li">2. 国家机关和企业事业单位负责人</li>
                                    <li class="radio-li">3. 职员</li>
                                    <li class="radio-li">4. 商人</li>
                                    <li class="radio-li">5. 农民</li>
                                    <li class="radio-li">6. 工人</li>
                                    <li class="radio-li">7. 服务性工作人员</li>
                                    <li class="radio-li">8. 家务</li>
                                    <li class="radio-li">9. 其他
                                        <span>
                      <span>，请注明</span>
                        <el-form-item label="" prop="item17" style="display: inline-block;margin-left: 20px;"
                                      v-if="form.item16 == 9">
                           <el-input v-model="form.item17" auto-complete="off" ref="item17" type="textarea" :rows='1'
                                     :size="inputSize"
                                     style="width: 200px;" :disabled="disabledState"></el-input>
                        </el-form-item>
                    </span>
                                    </li>
                                </ul>

                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="B3." required>
                            <div> 您是否在以下行业/职业工作 12 个月或更多：
                                <el-form-item label="" label-width="" prop="item18" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item18" auto-complete="off" :size="inputSize" ref="item18"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clearItem18()"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否（跳至C部分）</li>
                                    <li class="radio-li">1. 是 （请勾选具体职业，并填写具体信息，可多选）</li>
                                </ul>
                            </div>
                            <span>
                 <el-form-item prop="jobList" class="formItemWidth radio-div" v-if="form.item18 == 1">
                <div class="job">
                  <el-checkbox-group v-model="form.jobList" :disabled="disabledState">
                    <template v-for="item in job">
                      <el-checkbox :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                    </template>
                  </el-checkbox-group>
                </div>
              </el-form-item>
              </span>
                            <span>
                 <el-form-item prop="" class="formItemWidth radio-div" v-if="form.item18 != 1">
                <div class="job">
                  <el-checkbox-group v-model="form.jobList" disabled>
                    <el-checkbox :label="item.value" v-for="item in job" :key="item.value">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
              </span>
                        </el-form-item>
                        <table class="raskFactors-table" v-if="form.jobList.length >0">
                            <tr class="raskFactors-table-tr">
                                <td class="raskFactors-table-title">行业/职业</td>
                                <td class="raskFactors-table-title" style="width: 260px;">累计工作年限</td>
                                <td class="raskFactors-table-title">工作时是否经常采取防护措施？（如：戴面具或穿防护服）（1=是，0=否）</td>
                            </tr>
                            <tr v-if="findItem(form.jobList,1)">
                                <td>石棉</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item20" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item20" auto-complete="off" :size="inputSize"
                                                  ref="item20" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item21" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item21" auto-complete="off" :size="inputSize"
                                                  ref="item21" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item21')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,2)">
                                <td>烘烤</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item23" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item23" auto-complete="off" :size="inputSize"
                                                  ref="item23" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item24" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item24" auto-complete="off" :size="inputSize"
                                                  ref="item24" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item24')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>

                            <tr v-if="findItem(form.jobList,3)">
                                <td>屠宰或肉类包装</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item26" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item26" auto-complete="off" :size="inputSize"
                                                  ref="item26" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item27" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item27" auto-complete="off" :size="inputSize"
                                                  ref="item27" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item27')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,4)">
                                <td>石油/化工业</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item29" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item29" auto-complete="off" :size="inputSize"
                                                  ref="item29" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item30" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item30" auto-complete="off" :size="inputSize"
                                                  ref="item30" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item30')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,5)">
                                <td>采矿：煤矿</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item32" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item32" auto-complete="off" :size="inputSize"
                                                  ref="item32" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item33" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item33" auto-complete="off" :size="inputSize"
                                                  ref="item33" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item33')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,6)">
                                <td>采矿：矽矿</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item35" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item35" auto-complete="off" :size="inputSize"
                                                  ref="item35" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item36" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item36" auto-complete="off" :size="inputSize"
                                                  ref="item36" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item36')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,7)">
                                <td>棉麻加工</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item38" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item38" auto-complete="off" :size="inputSize"
                                                  ref="item38" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item39" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item39" auto-complete="off" :size="inputSize"
                                                  ref="item39" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item39')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,8)">
                                <td>垃圾回收</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item41" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item41" auto-complete="off" :size="inputSize"
                                                  ref="item41" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item42" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item42" auto-complete="off" :size="inputSize"
                                                  ref="item42" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item42')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,9)">
                                <td>消防</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item44" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item44" auto-complete="off" :size="inputSize"
                                                  ref="item44" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item45" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item45" auto-complete="off" :size="inputSize"
                                                  ref="item45" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item45')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,10)">
                                <td>面粉/饲料/粮食加工</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item47" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item47" auto-complete="off" :size="inputSize"
                                                  ref="item47" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item48" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item48" auto-complete="off" :size="inputSize"
                                                  ref="item48" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item48')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,11)">
                                <td>钢铁铸造</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item50" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item50" auto-complete="off" :size="inputSize"
                                                  ref="item50" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item51" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item51" auto-complete="off" :size="inputSize"
                                                  ref="item51" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item51')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,12)">
                                <td>涂装（油漆）</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item53" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item53" auto-complete="off" :size="inputSize"
                                                  ref="item53" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item54" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item54" auto-complete="off" :size="inputSize"
                                                  ref="item54" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item54')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,13)">
                                <td>喷砂</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item56" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item56" auto-complete="off" :size="inputSize"
                                                  ref="item56" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item57" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item57" auto-complete="off" :size="inputSize"
                                                  ref="item57" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item57')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,14)">
                                <td>焊接</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item59" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item59" auto-complete="off" :size="inputSize"
                                                  ref="item59" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item60" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item60" auto-complete="off" :size="inputSize"
                                                  ref="item60" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item60')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,15)">
                                <td>建筑业</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item62" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item62" auto-complete="off" :size="inputSize"
                                                  ref="item62" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item63" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item63" auto-complete="off" :size="inputSize"
                                                  ref="item63" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item63')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,16)">
                                <td>农药生产</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item65" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item65" auto-complete="off" :size="inputSize"
                                                  ref="item65" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item66" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item66" auto-complete="off" :size="inputSize"
                                                  ref="item66" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item66')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,17)">
                                <td>厨师</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item68" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item68" auto-complete="off" :size="inputSize"
                                                  ref="item68" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item69" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item69" auto-complete="off" :size="inputSize"
                                                  ref="item69" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item69')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.jobList,18)">
                                <td>橡胶/轮胎</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item71" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item71" auto-complete="off" :size="inputSize"
                                                  ref="item71" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item72" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item72" auto-complete="off" :size="inputSize"
                                                  ref="item72" :disabled="disabledState"
                                                  :maxlength='1' style="width: 80px;" @change="clear(1,'item72')"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                        </table>
                    </el-row>
                    <div class="title">
                        C. 吸烟史 （此部来源于资格审核表，无需重复填写）
                    </div>
                    <el-row>
                        <el-form-item
                                label="C1." required>
                            <div>您是否吸烟？（每周吸一支以上并连续或累计6个月以上者定义为吸烟）：
                                <el-form-item label="" label-width="" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item73" auto-complete="off" :size="inputSize" ref="item73"
                                              disabled
                                              style="width: 80px;"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否，从不吸（跳至问题D）</li>
                                    <li class="radio-li">1. 是，目前仍在吸</li>
                                    <li class="radio-li">2. 以前吸，目前已戒烟</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <template v-if="form.item73 == 1 || form.item73 == 2">
                        <el-row>
                            <el-form-item
                                    label="C2." required>
                                <div>从多少岁开始吸烟？
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item74" auto-complete="off" :size="inputSize"
                                                  ref="item74" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="C3." required>
                                <div>您曾经或现在早上醒来<u style="font-weight: 600">吸第一支烟</u>的时间大约为：
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item75" auto-complete="off" :size="inputSize"
                                                  ref="item75" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="radio-div">
                                    <ul>
                                        <li class="radio-li">1. 不到5分钟</li>
                                        <li class="radio-li">2. 6-30分钟</li>
                                        <li class="radio-li">3. 31-60分钟</li>
                                        <li class="radio-li">4. 超过60分钟</li>
                                    </ul>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="C4." required>
                                <div>您主要吸下列哪一种烟草产品？
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item76" auto-complete="off" :size="inputSize"
                                                  ref="item76" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="radio-div">
                                    <ul>
                                        <li class="radio-li">1. 机制卷烟</li>
                                        <li class="radio-li">2. 手卷烟</li>
                                        <li class="radio-li">3. 烟斗</li>
                                        <li class="radio-li">4. 雪茄</li>
                                        <li class="radio-li">5. 水烟</li>
                                        <li class="radio-li">6. 其他
                                            <span>具体类型</span>
                                            <el-input v-model="form.item77" auto-complete="off" :size="inputSize"
                                                      ref="item77" disabled
                                                      style="width: 80px;"
                                                      :maxlength='1' class="form-item"></el-input>
                                        </li>
                                    </ul>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row v-if="form.item73 == 2">
                            <el-form-item
                                    label="C5." required>
                                <div>这次戒烟已持续多少年？（不足1年按0.5年计）
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item78" auto-complete="off" :size="inputSize"
                                                  ref="item78" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                        　年
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="C6." required>
                                <div>如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item79" auto-complete="off" :size="inputSize"
                                                  ref="item79" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                        　年
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="C7." required>
                                <div>如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item80" auto-complete="off" :size="inputSize"
                                                  ref="item80" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                        　支
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="C8." required>
                                <div>吸烟包年数是多少（自动计算）
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item81" auto-complete="off" :size="inputSize"
                                                  ref="item81" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                        　包年
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                    </template>

                    <div class="title">
                        D. 被动吸烟史 （此部来源于资格审核表，无需重复填写）
                    </div>
                    <el-row>
                        <el-form-item
                                label="D1." required>
                            <div>被动吸烟：同您一起生活的家人或者工作的同事是否吸烟（平均每周5天或以上）？
                                <el-form-item label="" label-width="" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item82" auto-complete="off" :size="inputSize" ref="item82"
                                              disabled
                                              style="width: 80px;"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否</li>
                                    <li class="radio-li">1. 是</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item
                                label="D1.1." required v-if="form.item82 == 1">
                            <div>如果是，那么在有烟雾的室内环境中，您居住和/或工作了多少年（不足1年按0.5年计）？
                                <el-form-item label="" label-width="" class="formItemWidth"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item83" auto-complete="off" :size="inputSize" ref="item83"
                                              disabled
                                              style="width: 80px;"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-row>
                    <template v-if="form.item82 == 1">
                        <el-row>
                            <el-form-item
                                    label="D2." required>
                                <div>.吸烟者与您的关系（多选）？</div>
                                <div class="radio-div">
                                    <el-checkbox-group v-model="form.smokeCheckList" disabled>
                                        <el-checkbox :label="1" ref="smokeCheckList">配偶</el-checkbox>
                                        <el-checkbox :label="2">伴侣</el-checkbox>
                                        <el-checkbox :label="3">其它家庭成员
                                            <span v-if="form.smokeCheckList.indexOf(3)>-1"
                                                  style="display: inline-block;width: 180px;">
                              ，具体人数
                               <el-form-item prop="item87" class="content-padding" labelWidth="0"
                                             :inline-message="true" style="display: inline-block;">
                              <el-input v-model.trim="form.item87" auto-complete="off" size="small"
                                        style="width: 80px;"
                                        disabled
                                        class="smallInput" ref="item87"></el-input>
                            </el-form-item>
                            </span>

                                        </el-checkbox>
                                        <el-checkbox :label="4">同一办公室同事
                                            <span v-if="form.smokeCheckList.indexOf(4)>-1"
                                                  style="display: inline-block;width: 180px;">
                              ，具体人数
                               <el-form-item prop="item89" class="content-padding" labelWidth="0"
                                             :inline-message="true" style="display: inline-block;">
                              <el-input v-model.trim="form.item89" auto-complete="off" size="small"
                                        style="width: 80px;"
                                        disabled
                                        class="smallInput" ref="item89"></el-input>
                            </el-form-item>
                            </span>
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="D3." required>
                                <div>如果该吸烟者仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item90" auto-complete="off" :size="inputSize"
                                                  ref="item90" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                        　年
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="D4." required>
                                <div> 如果该吸烟者仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item91" auto-complete="off" :size="inputSize"
                                                  ref="item91" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                        　支
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="D5." required>
                                <div> 吸烟包年数是多少（自动计算）
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item92" auto-complete="off" :size="inputSize"
                                                  ref="item92" disabled
                                                  style="width: 80px;"
                                                  :maxlength='1' class="form-item"></el-input>
                                        　支
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                    </template>
                    <div class="title">
                        E. 饮食
                    </div>
                    <el-row>
                        <el-form-item
                                label="E1." required>
                            <div>您平时的饮食喜好习惯？
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="E1.1." required>
                            <div>冷热度（包括饮茶、饮水）：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item118"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item118" auto-complete="off" :size="inputSize" ref="item118"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(4,'item118')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 烫</li>
                                    <li class="radio-li">2. 热</li>
                                    <li class="radio-li">3. 温</li>
                                    <li class="radio-li">4. 凉</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="E1.2." required>
                            <div>口味：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item120"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item120" auto-complete="off" :size="inputSize" ref="item120"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(3,'item120')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 重盐</li>
                                    <li class="radio-li">2. 适中</li>
                                    <li class="radio-li">3. 清淡</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="E1.3." required>
                            <div>肉类：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item294"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item294" auto-complete="off" :size="inputSize" ref="item294"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(5,'item294')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 几乎每餐</li>
                                    <li class="radio-li">2. 几乎每天</li>
                                    <li class="radio-li">3. 每周</li>
                                    <li class="radio-li">4. 很少</li>
                                    <li class="radio-li">5. 从不</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="E1.4." required>
                            <div>腌制食品（如咸菜、腌菜）：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item295"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item295" auto-complete="off" :size="inputSize" ref="item295"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(5,'item295')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 每天多次</li>
                                    <li class="radio-li">2.（几乎）每天一次</li>
                                    <li class="radio-li">3. 每周</li>
                                    <li class="radio-li">4. 很少</li>
                                    <li class="radio-li">5. 从不</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="E1.5." required>
                            <div>茶：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item296"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item296" auto-complete="off" :size="inputSize" ref="item296"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(5,'item296')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 每天多次</li>
                                    <li class="radio-li">2.（几乎）每天一次</li>
                                    <li class="radio-li">3. 每周</li>
                                    <li class="radio-li">4. 很少</li>
                                    <li class="radio-li">5. 从不</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="E1.6." required>
                            <div>酒：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item297"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item297" auto-complete="off" :size="inputSize" ref="item297"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(5,'item297')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 每天多次</li>
                                    <li class="radio-li">2.（几乎）每天一次</li>
                                    <li class="radio-li">3. 每周</li>
                                    <li class="radio-li">4. 很少</li>
                                    <li class="radio-li">5. 从不</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item297 == 2 || form.item297 == 1 || form.item297 == 3">
                        <el-form-item
                                label="E1.7." required>
                            <div>您<u style="font-weight: 600">经常</u>饮酒的种类是什么？</div>
                            <el-form-item prop="item331List" label="">
                                <el-checkbox-group v-model="form.item331List" :disabled="disabledState">
                                    <el-checkbox label="1">1. 葡萄酒</el-checkbox>
                                    <el-checkbox label="2">2. 白酒</el-checkbox>
                                    <el-checkbox label="3">3. 啤酒</el-checkbox>
                                    <el-checkbox label="4">4. 黄酒</el-checkbox>
                                    <el-checkbox label="5">5. 其他
                                        <el-form-item v-if="form.item331List.includes('5')" label="" prop="item332"
                                                      style="display: inline-block;margin-left: 10px;margin-top: -10px;">
                                            <el-input v-model="form.item332" auto-complete="off" type="textarea"
                                                      :rows='1'
                                                      :size="inputSize"
                                                      style="width: 200px;" :disabled="disabledState"></el-input>
                                        </el-form-item>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form-item>
                    </el-row>
                    <div class="title">
                        F. 运动
                    </div>
                    <el-row>
                        <el-form-item
                                label="F1." required>
                            <div>请回答，在过去12个月中，您经常参加以下体育锻炼的频率和时间：</div>
                            <table class="raskFactors-table">
                                <tr class="item146-table-tr">
                                    <td class="item146-table-title" style="width: 350px;">活动类型</td>
                                    <td class="item146-table-title" style="width: 600px;">平均活动频率和时间</td>
                                </tr>
                                <tr>
                                    <td style="line-height: 1.8;">低强度活动，如：散步、太极、瑜伽等</td>
                                    <td>
                                        <el-form-item label="每周平均活动：" label-width="" prop="item125"
                                                      class="formItemWidth"
                                                      style="display: inline-block;">
                                            <el-input v-model="form.item125" auto-complete="off" :size="inputSize"
                                                      ref="item125" :disabled="disabledState"
                                                      @change="clearItm12('item125',['item126'],0)"
                                                      style="width: 80px;" class="form-item"></el-input>
                                            　次 ,
                                        </el-form-item>
                                        <el-form-item label="每次平均活动时间：" v-if="form.item125>0 && form.item125<=100"
                                                      label-width="" prop="item126"
                                                      class="formItemWidth"
                                                      style="display: inline-block;">
                                            <el-input v-model="form.item126" auto-complete="off" :size="inputSize"
                                                      ref="item126" :disabled="disabledState"
                                                      style="width: 80px;" class="form-item"></el-input>
                                            　分钟
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="line-height: 1.8;">
                                        中等强度活动，如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等
                                    </td>
                                    <td>
                                        <el-form-item label="每周平均活动：" label-width="" prop="item128"
                                                      class="formItemWidth"
                                                      style="display: inline-block;">
                                            <el-input v-model="form.item128" auto-complete="off" :size="inputSize"
                                                      ref="item128" :disabled="disabledState"
                                                      @change="clearItm12('item128',['item129'],0)"
                                                      style="width: 80px;" class="form-item"></el-input>
                                            　次 ,
                                        </el-form-item>
                                        <el-form-item label="每次平均活动时间：" v-if="form.item128>0 && form.item128<=100" label-width="" prop="item129"
                                                      class="formItemWidth"
                                                      style="display: inline-block;">
                                            <el-input v-model="form.item129" auto-complete="off" :size="inputSize"
                                                      ref="item129" :disabled="disabledState"
                                                      style="width: 80px;" class="form-item"></el-input>
                                            　分钟
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="line-height: 1.8;">高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等</td>
                                    <td>
                                        <el-form-item label="每周平均活动：" label-width="" prop="item131"
                                                      class="formItemWidth"
                                                      style="display: inline-block;">
                                            <el-input v-model="form.item131" auto-complete="off" :size="inputSize"
                                                      ref="item131" :disabled="disabledState"
                                                      @change="clearItm12('item131',['item132'],0)"
                                                      style="width: 80px;" class="form-item"></el-input>
                                            　次 ,
                                        </el-form-item>
                                        <el-form-item label="每次平均活动时间：" v-if="form.item131>0 && form.item131<=100" label-width="" prop="item132"
                                                      class="formItemWidth"
                                                      style="display: inline-block;">
                                            <el-input v-model="form.item132" auto-complete="off" :size="inputSize"
                                                      ref="item132" :disabled="disabledState"
                                                      style="width: 80px;" class="form-item"></el-input>
                                            　分钟
                                        </el-form-item>
                                    </td>
                                </tr>
                            </table>

                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="F2." required>
                            <div>在过去<u style="font-weight: 600">12个月</u>中，您每天平均坐着的时间（包括伏案工作、看手机、看电视等）为：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item133"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item133" auto-complete="off" :size="inputSize" ref="item133"
                                              :disabled="disabledState"
                                              style="width: 80px;" @ class="form-item"></el-input>
                                    　小时/天
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-row>
                    <div class="title">
                        G. 生活环境
                    </div>
                    <el-row>
                        <el-form-item
                                label="G1." required>
                            <div>您近十年来的生活环境是否存在较严重空气污染（如长期在大城市生活则直接被认定有空气污染）？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item134"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item134" auto-complete="off" :size="inputSize" ref="item134"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item134')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否</li>
                                    <li class="radio-li">1. 是</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="G2." required>
                            <div>近十年来，您的住房是否进行取暖？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item135"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item135" auto-complete="off" :size="inputSize" ref="item135"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item135')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否（跳转至G3）</li>
                                    <li class="radio-li">1. 是</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item
                                label="G2.1." required v-if="form.item135==1">
                            <div>主要取暖方式：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item136"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item136" auto-complete="off" :size="inputSize" ref="item136"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear('item136','item136')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 集中暖气</li>
                                    <li class="radio-li">2. 用电</li>
                                    <li class="radio-li">3. 太阳能</li>
                                    <li class="radio-li">4. 天然气</li>
                                    <li class="radio-li">5. 烧煤</li>
                                    <li class="radio-li">8. 其他
                                        <el-form-item label="" label-width="" class="formItemWidth" prop="item137"
                                                      v-if="form.item136 == 8"
                                                      style="display: inline-block;">
                                            <el-input v-model="form.item137" auto-complete="off" type="textarea"
                                                      :rows="1" :size="inputSize" ref="item137"
                                                      :disabled="disabledState"
                                                      style="width: 200px;" class="form-item"></el-input>
                                        </el-form-item>
                                    </li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="G3." required>
                            <div>近十年来，您家的主要做饭燃料种类？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item138"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item138" auto-complete="off" :size="inputSize" ref="item138"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear('item138','item138')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 天然气/液化气</li>
                                    <li class="radio-li">2. 用电</li>
                                    <li class="radio-li">3. 烧煤</li>
                                    <li class="radio-li">8. 其他
                                        <el-form-item label="" label-width="" class="formItemWidth" prop="item139"
                                                      v-if="form.item138 == 8"
                                                      style="display: inline-block;">
                                            <el-input v-model="form.item139" auto-complete="off" type="textarea"
                                                      :rows="1" :size="inputSize" ref="item139"
                                                      :disabled="disabledState"
                                                      style="width: 200px;" class="form-item"></el-input>
                                        </el-form-item>
                                    </li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="G4." required>
                            <div>近十年来，您家做饭时住房內的油烟情况？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item140"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item140" auto-complete="off" :size="inputSize" ref="item140"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(4,'item140')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 无烟</li>
                                    <li class="radio-li">2. 少许</li>
                                    <li class="radio-li">3. 较多</li>
                                    <li class="radio-li">4. 很多</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="G5." required>
                            <div>您家厨房采用什么排风设施？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item141"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item141" auto-complete="off" :size="inputSize" ref="item141"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(5,'item141',true,['item142'],5)"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">1. 无</li>
                                    <li class="radio-li">2. 油烟机</li>
                                    <li class="radio-li">3. 换气扇</li>
                                    <li class="radio-li">4. 烟囱</li>
                                    <li class="radio-li">5. 其他
                                        <el-form-item label="" label-width="" class="formItemWidth" prop="item142"
                                                      v-if="form.item141 == 5"
                                                      style="display: inline-block;">
                                            <el-input v-model="form.item142" auto-complete="off" type="textarea"
                                                      :rows="1" :size="inputSize" ref="item142"
                                                      :disabled="disabledState"
                                                      style="width: 200px;" class="form-item"></el-input>
                                        </el-form-item>
                                    </li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                     <el-row>
                        <el-form-item label="G6." required>
                            <div>
                               您每周做几次饭？
                               <el-form-item class="formItemWidth" prop="item1421">
                                   <el-input v-model="form.item1421" :disabled="disabledState" style="width: 80px;" class="form-item" auto-complete="off" :size="inputSize" ref="item1421"></el-input>
                               </el-form-item>
                            </div>
                            
                        </el-form-item>
                     </el-row>
                     <el-row>
                          <el-form-item label="G7." required>
                            <div>
                               您做饭时间长达多久？
                                <el-form-item label="" class="formItemWidth" prop="item1422">
                                    <el-input v-model="form.item1422" :disabled="disabledState" style="width: 80px;" class="form-item" auto-complete="off" :size="inputSize" ref="item1422"></el-input>&nbsp;&nbsp;&nbsp;年
                                </el-form-item>
                                <el-form-item label="" class="formItemWidth" prop="item1423">
                                    <el-input v-model="form.item1423" :disabled="disabledState" style="width: 80px;" class="form-item" auto-complete="off" :size="inputSize" ref="item1423"></el-input>&nbsp;&nbsp;&nbsp;月
                                </el-form-item>
                                </div>
                            </el-form-item>
                     </el-row>
                    <div class="title">
                        H．心理和情绪
                    </div>
                    <el-row>
                        <el-form-item
                                label="H1." required>
                            <div>近些年您是否曾经受较大的精神创伤（配偶或直系亲属患重病或死亡、夫妇分居或离婚、重大财产损失、意外失业、重大意外身体伤害、暴力侵害等）？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item143"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item143" auto-complete="off" :size="inputSize" ref="item143"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item143')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否</li>
                                    <li class="radio-li">1. 是</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="H2." required>
                            <div>近10年您是否有较长一段时间内精神处于压抑状况（连续超过6个月）？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item144"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item144" auto-complete="off" :size="inputSize" ref="item144"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item144')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否</li>
                                    <li class="radio-li">1. 是</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <div class="title">
                        I．疾病史
                    </div>
                    <el-row>
                        <el-form-item
                                label="I1." required>
                            <div>您是否患过 <u style="font-weight: 700;">慢性呼吸系统疾病</u>？（经正规医疗机构明确诊断）
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item145"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item145" auto-complete="off" :size="inputSize" ref="item145"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item145')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否（跳转至问题I2）</li>
                                    <li class="radio-li">1. 是（请勾选具体慢性呼吸系统疾病，并填写具体信息，可多选）</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item prop="diseaseList" class="formItemWidth radio-div" v-if="form.item145 == 1">
                            <div class="job disease">
                                <el-checkbox-group v-model="form.diseaseList" :disabled="disabledState">
                                    <el-checkbox :label="item.value" v-for="item in disease" :key="item.value">
                                        {{item.label}}
                                        <el-form-item label="" label-width="" prop="item171" :inline-message="true"
                                                      v-if="findItem(form.diseaseList,13) &&item.value == 13"
                                                      style="margin-top: -12px;">
                                            <el-input v-model="form.item171" auto-complete="off" type="textarea"
                                                      :rows="1" :size="inputSize" ref="item171"
                                                      :disabled="disabledState"
                                                      style="width: 200px;" class="form-item"></el-input>
                                            　
                                        </el-form-item>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-form-item>
                        <table class="raskFactors-table" v-if="form.diseaseList.length >0 && form.item145 == 1">
                            <tr class="item146-table-tr">
                                <td class="item146-table-title" style="width: 250px;">疾病类型（可多选）</td>
                                <td class="item146-table-title" style="width: 400px;">首次诊断时年龄（如勾选疾病，诊断年龄必填）</td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,1)">
                                <td>石棉肺</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item147" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item147" auto-complete="off" :size="inputSize"
                                                  ref="item147" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,2)">
                                <td>儿童哮喘</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item149" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item149" auto-complete="off" :size="inputSize"
                                                  ref="item149" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,3)">
                                <td>成人哮喘</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item151" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item151" auto-complete="off" :size="inputSize"
                                                  ref="item151" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,4)">
                                <td>支气管扩张</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item153" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item153" auto-complete="off" :size="inputSize"
                                                  ref="item153" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,5)">
                                <td>慢性支气管炎</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item155" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item155" auto-complete="off" :size="inputSize"
                                                  ref="item155" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,6)">
                                <td>慢性阻塞性肺病（COPD）</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item157" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item157" auto-complete="off" :size="inputSize"
                                                  ref="item157" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,7)">
                                <td>肺气肿</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item159" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item159" auto-complete="off" :size="inputSize"
                                                  ref="item159" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,8)">
                                <td>弥漫性肺间质纤维化</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item161" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item161" auto-complete="off" :size="inputSize"
                                                  ref="item161" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,9)">
                                <td>肺 炎</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item163" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item163" auto-complete="off" :size="inputSize"
                                                  ref="item163" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,10)">
                                <td>结节病</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item165" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item165" auto-complete="off" :size="inputSize"
                                                  ref="item165" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,11)">
                                <td>矽肺/尘肺</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item167" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item167" auto-complete="off" :size="inputSize"
                                                  ref="item167" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,12)">
                                <td>肺结核</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item169" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item169" auto-complete="off" :size="inputSize"
                                                  ref="item169" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.diseaseList,13)">
                                <td>其他 <span v-if="form.item171">，{{form.item171}}</span>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item172" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item172" auto-complete="off" :size="inputSize"
                                                  ref="item172" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                        </table>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="I2." required>
                            <div>您是否患过 <u style="font-weight: 700;">下消化道疾病</u>？（经正规医疗机构明确诊断）
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item173"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item173" auto-complete="off" :size="inputSize" ref="item173"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item173')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否（跳转至问题I2.1）</li>
                                    <li class="radio-li">1. 是（请勾选下消化系统疾病，并填写具体信息，可多选）</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item prop="digestiveList" class="formItemWidth radio-div" v-if="form.item173 == 1">
                            <div class="job disease">
                                <el-checkbox-group v-model="form.digestiveList" :disabled="disabledState">
                                    <el-checkbox :label="item.value" v-for="item in digestive " :key="item.value">
                                        {{item.label}}
                                        <el-form-item label="" label-width="" prop="item317" :inline-message="true"
                                                      v-if="findItem(form.digestiveList,10) &&item.value == 10"
                                                      style="margin-top: -12px;">
                                            <el-input v-model="form.item317" auto-complete="off" type="textarea"
                                                      :rows="1" :size="inputSize" ref="item317"
                                                      :disabled="disabledState"
                                                      style="width: 200px;" class="form-item"></el-input>
                                            　
                                        </el-form-item>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-form-item>
                        <table class="raskFactors-table" v-if="form.digestiveList.length >0&&form.item173==1">
                            <tr class="item146-table-tr">
                                <td class="item146-table-title" style="width: 250px;">疾病类型（可多选）</td>
                                <td class="item146-table-title" style="width: 400px;">首次诊断时年龄（如勾选疾病，诊断年龄必填）</td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,1)">
                                <td>肠结核</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item299" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item299" auto-complete="off" :size="inputSize"
                                                  ref="item299" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,2)">
                                <td>结核性腹膜炎</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item301" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item301" auto-complete="off" :size="inputSize"
                                                  ref="item301" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,3)">
                                <td>溃疡性结肠炎</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item303" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item303" auto-complete="off" :size="inputSize"
                                                  ref="item303" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,4)">
                                <td>克罗恩病</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item305" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item305" auto-complete="off" :size="inputSize"
                                                  ref="item305" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,5)">
                                <td>肠易激综合征</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item307" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item307" auto-complete="off" :size="inputSize"
                                                  ref="item307" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,6)">
                                <td>慢性腹泻（腹泻超过3周或反复发作）</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item309" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item309" auto-complete="off" :size="inputSize"
                                                  ref="item309" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,7)">
                                <td>便秘</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item311" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item311" auto-complete="off" :size="inputSize"
                                                  ref="item311" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,8)">
                                <td>肠息肉</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item313" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item313" auto-complete="off" :size="inputSize"
                                                  ref="item313" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,9)">
                                <td>慢性阑尾炎或阑尾切除史</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item315" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item315" auto-complete="off" :size="inputSize"
                                                  ref="item315" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveList,10)">
                                <td>其他 <span v-if="form.item317">，{{form.item317}}</span>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item318" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item318" auto-complete="off" :size="inputSize"
                                                  ref="item318" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                        </table>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="I2.1" required>
                            <div>您 <u style="font-weight: 700;">现在</u>是否存在以下症状（如果有，请说明症状出现的时间）？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item333"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item333" auto-complete="off" :size="inputSize" ref="item173"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item333')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否</li>
                                    <li class="radio-li">1. 是（请勾选具体症状，可多选）</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item v-if="parseInt(form.item333) !== 0" prop="digestiveSign" class="formItemWidth radio-div">
                            <div class="job disease">
                                <el-checkbox-group v-model="form.digestiveSign" :disabled="disabledState">
                                    <el-checkbox :label="item.value" v-for="item in digestiveSData " :key="item.value">
                                        {{item.label}}
                                        <el-form-item label="" label-width="" prop="item328" :inline-message="true"
                                                      v-if="findItem(form.digestiveSign,5) &&item.value == 5"
                                                      style="margin-top: -12px;">
                                            <el-input v-model="form.item328" auto-complete="off" type="textarea"
                                                      :rows="1" :size="inputSize" ref="item328"
                                                      :disabled="disabledState"
                                                      style="width: 200px;" class="form-item"></el-input>
                                            　
                                        </el-form-item>
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-form-item>
                        <table class="raskFactors-table" v-if="parseInt(form.item333) !== 0 && form.digestiveSign.length >0">
                            <tr class="item146-table-tr">
                                <td class="item146-table-title" style="width: 250px;">症状类型 （可多选）</td>
                                <td class="item146-table-title" style="width: 400px;">症状出现的时间</td>
                            </tr>
                            <tr v-if="findItem(form.digestiveSign,1)">
                                <td>便血</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item320" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item320" auto-complete="off" :size="inputSize"
                                                  ref="item320" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveSign,2)">
                                <td>腹痛</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item322" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item322" auto-complete="off" :size="inputSize"
                                                  ref="item322" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveSign,3)">
                                <td>腹泻</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item324" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item324" auto-complete="off" :size="inputSize"
                                                  ref="item324" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveSign,4)">
                                <td>便秘</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item326" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item326" auto-complete="off" :size="inputSize"
                                                  ref="item326" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.digestiveSign,5)">
                                <td>其他 <span v-if="form.item328">，{{form.item328}}</span>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item329" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item329" auto-complete="off" :size="inputSize"
                                                  ref="item329" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                        </table>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="I2.2." required>
                            <div>您是否<u style="font-weight: 700;">曾经</u>进行过<u style="font-weight: 700;">粪便潜血试验（FOBT）</u>检测？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item193"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item193" auto-complete="off" :size="inputSize" ref="item193"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item193',true,['item194'],1)"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否（跳转至问题I2.3）</li>
                                    <li class="radio-li">1. 是</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item
                                label="I2.2.1." required v-if="form.item193 == 1">
                            <div>如果是，那么结果为：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item194"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item194" auto-complete="off" :size="inputSize" ref="item194"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear('item194','item194')"
                                              class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 阴性</li>
                                    <li class="radio-li">1. 阳性</li>
                                    <li class="radio-li">999. 不清楚</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="I2.3．" required>
                            <div>您是否进行过 <u style="font-weight: 700;">乙肝表面抗原（HBsAg）</u>检测？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item237"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item237" auto-complete="off" :size="inputSize" ref="item237"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item237',true,['item238'],1)"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否（跳转至问题I3）</li>
                                    <li class="radio-li">1. 是</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item
                                label="I2.3.1．" required v-if="form.item237 == 1">
                            <div>如果是，那么结果为：
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item238"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item238" auto-complete="off" :size="inputSize" ref="item238"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear('item194','item238')"
                                              class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 阴性</li>
                                    <li class="radio-li">1. 阳性</li>
                                    <li class="radio-li">999. 不清楚</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="I3." required>
                            <div>您是否患过 <u style="font-weight: 700;">心脑血管疾病</u>？（经正规医疗机构明确诊断）
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item239"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item239" auto-complete="off" :size="inputSize" ref="item239"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item239')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否（跳转至J部分）</li>
                                    <li class="radio-li">1. 是（请勾选具体心脑血管疾病，并填写具体信息，可多选）</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item prop="brainwashingList" class="formItemWidth radio-div" v-if="form.item239 == 1">
                            <div class="job disease">
                                <el-checkbox-group v-model="form.brainwashingList" :disabled="disabledState">
                                    <el-checkbox :label="item.value" v-for="item in brainwashing" :key="item.value"
                                                 style="width: 230px!important;">{{item.label}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-form-item>
                        <table class="raskFactors-table" v-if="form.brainwashingList.length >0">
                            <tr class="item146-table-tr">
                                <td class="item146-table-title" style="width: 250px;">疾病类型（可多选）</td>
                                <td class="item146-table-title" style="width: 400px;">首次诊断时年龄（如勾选疾病，诊断年龄必填）</td>
                            </tr>
                            <tr v-if="findItem(form.brainwashingList,1)">
                                <td>高血压</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item241" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item241" auto-complete="off" :size="inputSize"
                                                  ref="item241" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.brainwashingList,2)">
                                <td>血脂异常/高血脂症</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item243" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item243" auto-complete="off" :size="inputSize"
                                                  ref="item243" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.brainwashingList,3)">
                                <td>冠心病</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item245" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item245" auto-complete="off" :size="inputSize"
                                                  ref="item245" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.brainwashingList,4)">
                                <td>脑卒中/脑中风
                                    <div style="margin-top: 10px;font-size: 14px;">脑卒中的类型：<br/>
                                        <el-form-item prop="item330" style="margin-left: 20px;">
                                            <el-radio-group v-model="form.item330">
                                                <el-radio :label="1" style="margin-top: 10px;">1. 梗塞</el-radio>
                                                <br>
                                                <el-radio :label="2" style="margin-top: 10px;">2. 出血</el-radio>
                                                <br>
                                                <el-radio :label="3" style="margin-top: 10px;">3. 不详</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </div>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item247" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item247" auto-complete="off" :size="inputSize"
                                                  ref="item247" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.brainwashingList,5)">
                                <td>糖尿病
                                    <div style="margin-top: 10px;font-size: 14px;">糖尿病类型：
                                        <el-form-item prop="item249" style="margin-left: 20px;">
                                            <el-radio-group v-model="form.item249">
                                                <el-radio :label="1" ref="item249" style="margin-top: 10px;">1. I型
                                                </el-radio>
                                                <br>
                                                <el-radio :label="2" style="margin-top: 10px;">2. II型</el-radio>
                                                <br>
                                                <el-radio :label="3" style="margin-top: 10px;">3. 妊娠糖尿病</el-radio>
                                                <br>
                                                <el-radio :label="4" style="margin-top: 10px;">4. 其他</el-radio>
                                                <el-form-item label="" label-width="" class="formItemWidth"
                                                              prop="item250"
                                                              style="display: inline-block;" v-if="form.item249 == 4">
                                                    <el-input v-model="form.item250" type="textarea" :rows="1"
                                                              auto-complete="off" :size="inputSize" ref="item250"
                                                              :disabled="disabledState"
                                                              style="width: 200px;" class="form-item"></el-input>
                                                </el-form-item>
                                                <br>
                                                <el-radio :label="5" style="margin-top: 10px;">999. 不清楚</el-radio>
                                                <br>
                                            </el-radio-group>
                                        </el-form-item>
                                    </div>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item251" class="formItemWidth"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item251" auto-complete="off" :size="inputSize"
                                                  ref="item251" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                        　岁
                                    </el-form-item>
                                </td>
                            </tr>
                        </table>
                    </el-row>
                    <div class="title">
                        J．恶性肿瘤家族史
                    </div>
                    <el-row>
                        <el-form-item
                                label="J1." required>
                            <div>您的 <u style="font-weight: 700;">血缘亲属</u>中，是否有人曾患癌症？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item254"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item254" auto-complete="off" :size="inputSize" ref="item254"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item254')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否（跳至K部分）</li>
                                    <li class="radio-li">1. 是（请勾选具体癌种，并填写具体信息，可多选）</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item prop="cancerList" class="formItemWidth radio-div" v-if="form.item254 == 1">
                            <div class="job disease">
                                <el-checkbox-group v-model="form.cancerList" :disabled="disabledState">
                                    <el-checkbox :label="item.value" v-for="item in cancer" :key="item.value">
                                        {{item.label}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-form-item>
                        <table class="raskFactors-table" v-if="form.cancerList.length >0&&form.item254==1"
                               style="margin-bottom: 20px">
                            <tr class="item146-table-tr">
                                <td class="item146-table-title" style="width: 350px;">癌种（可多选）</td>
                                <td class="item146-table-title" style="width: 400px;">是何亲属曾患此种癌症</td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,1)">
                                <td>肺癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item256List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="item in this.form.item256List">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item256List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,2)">
                                <td>食管癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item258List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item258List" :key="index"> 
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item258List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>

                            <tr v-if="findItem(form.cancerList,3)">
                                <td>胃癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item260List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="item in this.form.item260List">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item260List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,4)">
                                <td>肝癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item262List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item262List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item262List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,5)">
                                <td>结直肠癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item264List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item264List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item264List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,6)">
                                <td>前列腺癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item266List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item266List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item266List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,7)">
                                <td>膀胱癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item268List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item268List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item268List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,8)">
                                <td>鼻咽癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item270List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item270List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item270List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,9)">
                                <td>乳腺癌
                                    <el-form-item
                                            label="" required>
                                        <div style="font-size: 12px"> 您是否有一级血缘亲属（母亲、亲姐妹）在 <u style="font-weight: 700;">50岁及以前</u>曾患乳腺癌：
                                            <el-form-item label="" label-width="" class="formItemWidth" prop="item272"
                                                          style="display: inline-block;">
                                                <el-input v-model="form.item272" auto-complete="off" :size="inputSize"
                                                          ref="item272" :disabled="disabledState"
                                                          style="width: 80px;" @change="clear(2,'item272')"
                                                          :maxlength='1' class="form-item"></el-input>
                                            </el-form-item>
                                        </div>
                                        <div class="radio-div" style="font-size: 12px;">
                                            <ul>
                                                <li class="radio-li">1. 是</li>
                                                <li class="radio-li">2. 否</li>
                                            </ul>
                                        </div>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item273List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item273List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item273List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,10)">
                                <td>宫颈癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item275List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item275List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item275List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,11)">
                                <td>卵巢癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item277List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item277List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item277List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>

                            <tr v-if="findItem(form.cancerList,12)">
                                <td>甲状腺癌</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item279List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item279List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item279List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="findItem(form.cancerList,13)">
                                <td>其他（包括不清楚）</td>
                                <td>
                                    <el-form-item label="" label-width="" prop="item281List" class="formItemWidth"
                                                  style="display: inline-block;">
                    <span v-for="(item,index) in this.form.item281List" :key="index">
                      {{relatives[item-1].label}}，
                    </span>
                                        <!--<el-input v-model="form.item256List" auto-complete="off" :size="inputSize" ref="item147" :disabled="disabledState"-->
                                        <!--style="width: 0px;opacity:0;" class="form-item"></el-input>-->
                                        <el-button type="text" style="margin-left:20px"
                                                   @click="openDialog('item281List')" v-if="!disabledState">点击添加
                                        </el-button>
                                        　
                                    </el-form-item>
                                </td>
                            </tr>
                        </table>
                    </el-row>
                    <div class="title">
                        K．药物史
                    </div>
                    <el-row>
                        <el-form-item
                                label="K1." required>
                            <div>您是否 <u style="font-weight: 700;">正在</u>或<u style="font-weight: 700;">曾经</u>规律服用药物（超过一年）？
                                <el-form-item label="" label-width="" class="formItemWidth" prop="item282"
                                              style="display: inline-block;">
                                    <el-input v-model="form.item282" auto-complete="off" :size="inputSize" ref="item282"
                                              :disabled="disabledState"
                                              style="width: 80px;" @change="clear(1,'item282')"
                                              :maxlength='1' class="form-item"></el-input>
                                </el-form-item>
                            </div>
                            <div class="radio-div">
                                <ul>
                                    <li class="radio-li">0. 否（如果男性，结束问卷；如果女性，跳转至L部分）</li>
                                    <li class="radio-li">1. 是</li>
                                </ul>
                            </div>
                        </el-form-item>
                        <table class="item282 item282-table" v-if="form.item282 == 1" style="margin-bottom: 20px">
                            <tr>
                                <td class="item282-title" style="width:200px">药物种类</td>
                                <td class="item282-title" style="width:200px">药物种类细分</td>
                                <td class="item282-title" style="width:250px">具体药物名称</td>
                                <td class="item282-title" style="width:100px">开始服药年龄（周岁）</td>
                                <td class="item282-title" style="width:150px">累计服药年龄（不足一年按0.5年算）</td>
                            </tr>
                            <tr v-for="(x,index) in form.hosDrugHistoryList" :key="index">
                                <td>
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  :prop="'hosDrugHistoryList.'+index+'.drugType'"
                                                  style="display: inline-block;" :rules="rules.drugType">
                                        <el-select v-model="x.drugType" clearable placeholder="请选择"
                                                   @change="drugTypeChange(x,index)" :size="inputSize"
                                                   :disabled="disabledState">
                                            <el-option
                                                    v-for="item in drugTypeList"
                                                    :key="item.btype"
                                                    :label="item.btype"
                                                    :value="item.btype">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  :prop="'hosDrugHistoryList.'+index+'.drugSmallType'"
                                                  style="display: inline-block;" :rules="rules.drugSmallType">
                                        <el-select v-model="x.drugSmallType" clearable placeholder="请选择"
                                                   :size="inputSize" ref="item282" :disabled="disabledState" @change="drugSmallTypeChange(x,index)" >
                                            <el-option
                                                    v-for="item in x.drugSmallTypeList"
                                                    :key="item.ctype"
                                                    :label="item.ctype"
                                                    :value="item.ctype">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  :prop="'hosDrugHistoryList.'+index+'.drugName'"
                                                  :ref="`drugName${index}`"
                                                  style="display: inline-block;" :rules="x.drugType==='其他药物' ? rules.drugName : []">
                                        <el-autocomplete
                                                v-model="x.drugName"
                                                :disabled="disabledState"
                                                :size="inputSize"
                                                :maxlength="20"
                                                :fetch-suggestions="((queryString,cb)=>{querySearchAsync(queryString,cb,index)})"
                                                placeholder="请输入内容"
                                                @select="handleSelect(x,index)"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  :prop="'hosDrugHistoryList.'+index+'.startAge'"
                                                  style="display: inline-block;" :rules="rules.startAge">
                                        <el-input v-model="x.startAge" auto-complete="off" :size="inputSize"
                                                  :disabled="disabledState"
                                                  style="width: 80px;" @change="startAgeChange(x)"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                                <td>
                                    <el-form-item label="" label-width="" class="formItemWidth"
                                                  :prop="'hosDrugHistoryList.'+index+'.countTime'"
                                                  style="display: inline-block;" :rules="rules.countTime">
                                        <el-input v-model="x.countTime" auto-complete="off" :size="inputSize"
                                                  :disabled="disabledState"
                                                  style="width: 80px;"
                                                  class="form-item"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                        </table>
                        <div v-if="form.item282 == 1">
                            <el-button type="text" @click="addDrug" :disabled="form.hosDrugHistoryList.length>9"
                                       v-if="!disabledState">添加
                            </el-button>
                            <el-button type="text" @click="delDrug" :disabled="form.hosDrugHistoryList.length<2"
                                       v-if="!disabledState">删除
                            </el-button>
                        </div>
                    </el-row>
                    <template v-if="this.form.sex == 2">
                        <div class="title">
                            L．女性相关问题
                        </div>
                        <el-row>
                            <el-form-item
                                    label="L1." required>
                                <div>您的<u style="font-weight: 700;">首次</u>月经年龄是（周岁）：
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item283"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item283" auto-complete="off" :size="inputSize"
                                                  ref="item283" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="L2." required>
                                <div>您的月经周期是否规律？
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item284"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item284" auto-complete="off" :size="inputSize"
                                                  ref="item284" :disabled="disabledState"
                                                  style="width: 80px;" @change="clear(1,'item284')"
                                                  :maxlength='1' class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="radio-div">
                                    <ul>
                                        <li class="radio-li">0. 否</li>
                                        <li class="radio-li">1. 是</li>
                                    </ul>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="L3." required>
                                <div>您是否已绝闭经？
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item285"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item285" auto-complete="off" :size="inputSize"
                                                  ref="item285" :disabled="disabledState"
                                                  style="width: 80px;" @change="clear(1,'item285',true,['item286'],1)"
                                                  :maxlength='1' class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="radio-div">
                                    <ul>
                                        <li class="radio-li">0. 否（跳转至问题L4）</li>
                                        <li class="radio-li">1. 是</li>
                                    </ul>
                                </div>
                            </el-form-item>
                            <br>
                            <el-form-item
                                    label="L3.1." required v-if="form.item285==1">
                                <div>如果是，那么您的<u style="font-weight: 700;">停经年龄</u>是（周岁）：
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item286"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item286" auto-complete="off" :size="inputSize"
                                                  ref="item286" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="L4." required>
                                <div>您是否曾分娩（包括自然分娩和剖腹产）？
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item287"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item287" auto-complete="off" :size="inputSize"
                                                  ref="item287" :disabled="disabledState"
                                                  style="width: 80px;"
                                                  @change="clear(1,'item287',true,['item288','item289','item290'],1)"
                                                  :maxlength='1' class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="radio-div">
                                    <ul>
                                        <li class="radio-li">0. 否（跳转至L6）</li>
                                        <li class="radio-li">1. 是</li>
                                    </ul>
                                </div>
                            </el-form-item>
                            <br>
                            <el-form-item
                                    label="L4.1." required v-if="form.item287==1">
                                <div>如果是，那么您的<u style="font-weight: 700;">初次生育年龄</u>是（周岁）：
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item288"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item288" auto-complete="off" :size="inputSize"
                                                  ref="item288" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="L5." required v-if="form.item287==1">
                                <div>您是否有哺乳史？
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item289"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item289" auto-complete="off" :size="inputSize"
                                                  ref="item289" :disabled="disabledState"
                                                  style="width: 80px;" @change="clear(1,'item289',true,['item290'],1)"
                                                  :maxlength='1' class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="radio-div">
                                    <ul>
                                        <li class="radio-li">0. 否（跳转至L6）</li>
                                        <li class="radio-li">1. 是</li>
                                    </ul>
                                </div>
                            </el-form-item>
                            <br>
                            <el-form-item
                                    label="L5.1." required v-if="form.item289==1">
                                <div>如果是，那么共累计哺乳多少个月（不足一月按一月计）：
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item290"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item290" auto-complete="off" :size="inputSize"
                                                  ref="item290" :disabled="disabledState"
                                                  style="width: 80px;" class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="L6." required>
                                <div>您是否曾进行女性生殖系统手术（子宫、卵巢和输卵管等部位的手术，包括剖腹产）
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item291"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item291" auto-complete="off" :size="inputSize"
                                                  ref="item291" :disabled="disabledState"
                                                  style="width: 80px;" @change="clear(1,'item291',true,['item292'],1)"
                                                  :maxlength='1' class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="radio-div">
                                    <ul>
                                        <li class="radio-li">0. 否</li>
                                        <li class="radio-li">1. 是
                                            <span v-if="form.item291 == 1">
                    ,请注明手术名称或手术部位：
                     <el-form-item label="" label-width="" class="formItemWidth" prop="item292"
                                   style="display: inline-block;">
                      <el-input v-model="form.item292" type="textarea" :rows="1" auto-complete="off" :size="inputSize"
                                ref="item292" :disabled="disabledState"
                                style="width: 200px;" class="form-item"></el-input>
                    </el-form-item>
                  </span>

                                        </li>
                                    </ul>
                                </div>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item
                                    label="L7." required>
                                <div>您是否曾接受过<u style="font-weight: 700;">激素替代治疗</u>（<u style="font-weight: 700;">雌激素或雌/孕激素联合治疗</u>，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）？
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="item293"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.item293" auto-complete="off" :size="inputSize"
                                                  ref="item293" :disabled="disabledState"
                                                  style="width: 80px;" @change="clear('item293','item293')"
                                                  :maxlength='1' class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="radio-div">
                                    <ul>
                                        <li class="radio-li">1. 否（跳转至承诺书）</li>
                                        <li class="radio-li">2. 是，正在接受治疗（请填写下表）</li>
                                        <li class="radio-li">3. 是，曾经接受治疗（请填写下表）</li>
                                    </ul>
                                </div>
                            </el-form-item>
                            <br>
                            <el-form-item
                                    label="L7.1." required v-if="form.item293==2||form.item293 == 3">
                                <div>治疗方案
                                    <el-form-item label="" label-width="" class="formItemWidth" prop="scheme"
                                                  style="display: inline-block;">
                                        <el-input v-model="form.scheme" auto-complete="off" :size="inputSize"
                                                  ref="scheme" :disabled="disabledState"
                                                  style="width: 80px;" @input="clear(111,'scheme')" @blur="schemeChange"
                                                  :maxlength='1' class="form-item"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="radio-div">
                                    <ul>
                                        <li class="radio-li">1. 只服用雌激素</li>
                                        <li class="radio-li">2. 联合服用雌/孕激素</li>
                                    </ul>
                                </div>
                            </el-form-item>
                            <table class="item282 item282-table" v-if="form.scheme ==1 || form.scheme == 2"
                                   style="margin-left: 60px;margin-bottom:20px">
                                <tr>
                                    <td class="item282-title" style="width: 200px">具体药物名称</td>
                                    <td class="item282-title" style="width:200px">首次服用年龄</td>
                                    <td class="item282-title" style="width:200px">服用的年限（不足1年按0.5年算）</td>
                                </tr>
                                <tr v-for="(x,index) in form.hosHormoneDrugsHistoryList" :key="index">
                                    <td>
                                        <el-form-item label="" label-width="" class="formItemWidth"
                                                      :prop="'hosHormoneDrugsHistoryList.'+index+'.drugName'"
                                                      style="display: inline-block;" :rules="rules.drugName">
                                            <el-select v-model="x.drugName" clearable placeholder="请选择"
                                                       :size="inputSize" :disabled="disabledState">
                                                <el-option
                                                        v-for="item in x.hormone"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.label">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <br>
                                        <el-form-item label="" label-width="" class="formItemWidth"
                                                      :prop="'hosHormoneDrugsHistoryList.'+index+'.drugNameOther'"
                                                      style="display: inline-block;" :rules="rules.drugNameOther"
                                                      v-if="x.drugName == 6">
                                            <el-input v-model="x.drugNameOther" auto-complete="off" :size="inputSize"
                                                      :disabled="disabledState"
                                                      style="width: 220px;"
                                                      class="form-item"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label="" label-width="" class="formItemWidth"
                                                      :prop="'hosHormoneDrugsHistoryList.'+index+'.startAge'"
                                                      style="display: inline-block;" :rules="rules.startAge">
                                            <el-input v-model="x.startAge" auto-complete="off" :size="inputSize"
                                                      :disabled="disabledState"
                                                      style="width: 80px;"
                                                      class="form-item"></el-input>
                                        </el-form-item>
                                    </td>
                                    <td>
                                        <el-form-item label="" label-width="" class="formItemWidth"
                                                      :prop="'hosHormoneDrugsHistoryList.'+index+'.endTime'"
                                                      style="display: inline-block;" :rules="rules.endTime">
                                            <el-input v-model="x.endTime" auto-complete="off" :size="inputSize"
                                                      :disabled="disabledState"
                                                      style="width: 80px;"
                                                      class="form-item"></el-input>
                                        </el-form-item>
                                    </td>
                                </tr>
                            </table>
                            <div v-if="form.scheme==1 || form.scheme == 2" style="margin-left: 60px">
                                <el-button type="text" @click="addHormone"
                                           :disabled="form.hosHormoneDrugsHistoryList.length>9" v-if="!disabledState">添加
                                </el-button>
                                <el-button type="text" @click="delHormone"
                                           :disabled="form.hosHormoneDrugsHistoryList.length<2" v-if="!disabledState">删除
                                </el-button>
                            </div>
                        </el-row>

                    </template>
                    <div class="title">
                        承诺书
                    </div>
                    <el-row>
                        <div style="text-align: center;font-weight:700;font-size: 16px;">
                            本人承诺：本人如实回答本问卷中所有问题，该问卷能真实反映本人基本资料、疾病史、家庭史和吸烟史等信息
                        </div>
                    </el-row>
                    <el-row style="margin-top:20px">
                        <el-form-item
                                label="研究对象或委托人签字：" required>
                            <div>
                                <el-form-item class="content-padding1" prop="researchSignature">
                                    <el-input v-model.trim="form.researchSignature" auto-complete="off"
                                              :size="inputSize"
                                              style="width:200px"
                                              maxlength="20"
                                              ref="researchSignature" :disabled="disabledState"
                                              class="smallInput"></el-input>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item
                                label="日期：" required>
                            <div>
                                <el-form-item class="content-padding1" prop="researchDate">
                                    <el-date-picker
                                            v-model="form.researchDate"
                                            :disabled="disabledState"
                                            type="date"
                                            :size="inputSize"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                            ref="researchDate"
                                            :picker-options="pickerOptions1">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.researchSignature !== form.name">
                        <el-form-item
                                label="若为委托人签字，与研究对象关系：" required>
                            <p class="option-p">
                                <el-form-item class="content-padding1" prop="clientRelationship">
                                    <el-input v-model.trim="form.clientRelationship" auto-complete="off"
                                              :size="inputSize"
                                              style="width:200px"
                                              ref="clientRelationship" :disabled="disabledState"
                                              class="smallInput"></el-input>
                                </el-form-item>
                            </p>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="" labelWidth="80px" required>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple">
                                            <p class="option-p">
                                                <el-form-item label="调查员签名：" required></el-form-item>
                                                <el-form-item class="content-padding1" prop="investigator">
                                                    <el-input v-model.trim="form.investigator" auto-complete="off"
                                                              :size="inputSize" style="width:200px" maxlength="20"
                                                              ref="investigator" :disabled="disabledState"
                                                              class="smallInput"></el-input>
                                                </el-form-item>
                                            </p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="" labelWidth="80px" required>
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple">
                                            <p class="option-p">
                                                <el-form-item label="调查日期：" required></el-form-item>
                                                <el-form-item class="content-padding1" prop="investigationDate">
                                                    <el-date-picker
                                                            v-model="form.investigationDate"
                                                            :disabled="disabledState"
                                                            type="date"
                                                            :size="inputSize"
                                                            placeholder="选择日期"
                                                            format="yyyy 年 MM 月 dd 日"
                                                            value-format="yyyy-MM-dd"
                                                            ref="investigationDate"
                                                            :picker-options="pickerOptions1">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-dialog
                        width="25%"
                        title="选择亲属"
                        center
                        :close-on-click-modal="false"
                        :visible.sync="dialogVisible"
                        append-to-body>
                    <div class="dialogVisible">
                        <el-checkbox-group v-model="relativesCheckList">
                            <el-checkbox :label="1">1=母亲</el-checkbox>
                            <el-checkbox :label="2">2=父亲</el-checkbox>
                            <el-checkbox :label="3">3=子女</el-checkbox>
                            <el-checkbox :label="4">4=姐妹</el-checkbox>
                            <el-checkbox :label="5">5=兄弟</el-checkbox>
                            <el-checkbox :label="6">6=祖父</el-checkbox>
                            <el-checkbox :label="7">7=祖母</el-checkbox>
                            <el-checkbox :label="8">8=外祖父</el-checkbox>
                            <el-checkbox :label="9">9=外祖母</el-checkbox>
                            <el-checkbox :label="10">10=叔叔</el-checkbox>
                            <el-checkbox :label="11">11=姑姑</el-checkbox>
                            <el-checkbox :label="12">12=舅舅</el-checkbox>
                            <el-checkbox :label="13">13=姨妈</el-checkbox>
                            <el-checkbox :label="14">14=堂兄弟姐妹</el-checkbox>
                            <el-checkbox :label="15">15=表兄弟姐妹</el-checkbox>
                            <el-checkbox :label="16">16=其他</el-checkbox>
                        </el-checkbox-group>
                        <div style="margin-top: 20px;font-size: 14px;">
                            <p>兄弟：（包括同父异母兄弟或同母异父兄弟）</p>
                            <p>姐妹：（包括同父异母姐妹或同母异父姐妹）</p>
                        </div>
                    </div>
                    <div style="margin-top: 20px;text-align: center;">
                        <el-button @click="dialogVisible = false" :size="inputSize">取 消</el-button>
                        <el-button :size="inputSize" @click="addFormSure()" class="dialog-footer" type="primary"
                                   v-dbClick>确 定
                        </el-button>
                    </div>
                </el-dialog>
            </div>
            <div class="addbtn" v-if="!disabledState">
                <el-button type="primary" @click="submitForm('form')" v-dbClick>提交</el-button>
                <el-button @click="goBack">取消</el-button>
            </div>
        </cancer-widget>
    </div>
</template>

<script>
    import cityInfo from '../../../utils/citys'

    export default {
        name: 'Right',
        data() {
            var validatePhone = (rule, value, callback) => {
                if (value === '' || value == null) {
                    callback(new Error('手机号不能为空'));
                } else if (!(/\d/.test(value))) {
                    callback(new Error('手机号只能是数字'))
                } else if (value.length != 11) {
                    callback(new Error('请输入合法的11位手机号'));
                } else {
                    callback();
                }
            };
            var validatecontact_area = (rule, value, callback) => {
                if (value && !(/^\d{3,4}$/.test(value))) {
                    callback(new Error('请输入3-4位区号'))
                } else {
                    callback();
                }
            };
            var validatecontact_telephone = (rule, value, callback) => {
                if (value && !(/^\d{7,8}$/.test(value))) {
                    callback(new Error('请输入7-8位座机号码'))
                } else {
                    callback();
                }
            };
            var validatecontact_address = (rule, value, callback) => {
                if (value && (value.length > 50)) {
                    callback(new Error('1-50个字符'))
                } else {
                    callback();
                }
            };
            var validatecontact_count20 = (rule, value, callback) => {
                if (value && (value.length > 20)) {
                    callback(new Error('1-20个字符'))
                } else {
                    callback();
                }
            };
            // 2-20个字的校验
            var checkFont = (rule, value, callback) => {
                if (value && !(value.length>1)) {
                callback(new Error('请输入2-20个字'))
                }else {
                callback();
                }
            };
            var contactRelationship = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^[\u4e00-\u9fa5]{2,5}$/.test(value))) {
                    callback(new Error('只能是2-5个汉字'))
                } else {
                    callback();
                }
            };
            var contactRelationship1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^[\u4e00-\u9fa5]{2,10}$/.test(value))) {
                    callback(new Error('只能是2-10个汉字'))
                } else {
                    callback();
                }
            };
            var validatecontact_item3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^\d{1,10}(\.\d{1})?$/.test(value))) {
                    callback(new Error('请输入正数，可保留一位小数'))
                } else if (value > this.form.age) {
                    callback(new Error('不能大于您的年龄'))
                } else {
                    callback();
                }
            };
            var validatecontact_age = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^(?=([0-9]{1,10}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
                    callback(new Error('请输入数字，并保留一位小数'))
                } else if (value > this.form.age) {
                    callback(new Error('数值且不能大于您的年龄'))
                } else {
                    callback();
                }
            };
            var validatecontact_height = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^\d{1,3}$/.test(value))) {
                    callback(new Error('50-300的整数'))
                } else if (value > 300 || value < 50) {
                    callback(new Error('50-300的整数'))
                } else {
                    callback();
                }
            };
            var validatecontact_count24 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^(?=([0-9]{1,2}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
                    callback(new Error('0-24的数字'))
                } else if (value > 24 || value < 0) {
                    callback(new Error('0-24的数字'))
                } else {
                    callback();
                }
            };
            var validatecontact_count150 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^\d{1,3}$/.test(value))) {
                    callback(new Error('0-150的数字'))
                } else if (value > 150 || value < 0) {
                    callback(new Error('0-150的数字'))
                } else {
                    callback();
                }
            };
            var validatecontact_count100 = (rule, value, callback) => {
                let prop = rule.fullField
                if(prop === 'item125') {
                    this.$refs['form'].validateField(['item126'])
                }
                if(prop === 'item128') {
                    this.$refs['form'].validateField(['item129'])
                }
                if(prop === 'item131') {
                    this.$refs['form'].validateField(['item132'])
                }
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^\d{1,3}$/.test(value))) {
                    callback(new Error('0-100的正整数'))
                } else if (value > 100 || value < 0) {
                    callback(new Error('0-100的整数'))
                } else {
                    callback();
                }
            };
            var validatecontact_count1000 = (rule, value, callback) => {
                let prop = rule.fullField
                if ((prop === 'item126' && this.form.item125 == 0) || (prop === 'item129' && this.form.item128 == 0) || (prop === 'item132' && this.form.item131 == 0)) {
                    callback();
                }

                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^\d{1,4}$/.test(value))) {
                    callback(new Error('1-1000的整数'))
                } else if (value > 1000 || value < 1) {
                    callback(new Error('1-1000的整数'))
                } else {
                    callback();
                }
            };
            var item290 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^\d{1,10}$/.test(value))) {
                    callback(new Error('请输入正整数'))
                } else {
                    callback();
                }
            };
            var validatecontact_count50 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^(?=([0-9]{1,3}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
                    callback(new Error('0-50的数字'))
                } else if (value > 50 || value < 0) {
                    callback(new Error('0-50的数字'))
                } else {
                    callback();
                }
            };
            var validatecontact_weight = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^(?=([0-9]{1,3}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
                    callback(new Error('50-200的数字'))
                } else if (value > 200 || value < 50) {
                    callback(new Error('50-200的数字'))
                } else {
                    callback();
                }
            };
            var validatecontact_weight1 = (rule, value, callback) => {
                if (value && !(/^(?=([0-9]{1,3}$|[0-9]{1,3}\.))(0|[1-9][0-9]*)(\.[0-9]{1})?$/.test(value))) {
                    callback(new Error('10-200的数字'))
                } else if (value && (value > 200 || value < 10)) {
                    callback(new Error('10-200的数字'))
                } else {
                    callback();
                }
            };
            var validateNumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!(/^[0-9]+([.]{1}[5]+){0,1}$/.test(value))) {
                    callback(new Error('数值且小数部分为0.5的倍数'))
                } else {
                    callback();
                }
            };
            var validateNumber99 = (rule, value, callback) =>{
                  let reg = /^\d{1,3}$/;
                  if (value === '') {
                    callback(new Error('必填'));
                } else if (!reg.test(value)) {
                    callback(new Error('0-99的整数'))
                } else if (value > 99 || value < 0) {
                    callback(new Error('0-99的整数'))
                } else {
                    callback();
                }
            }
            var validateItem1422 = (rule, value, callback) =>{
                let reg = /^\d{1,3}$/;
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入小于当前年龄的整数'))
                } else if (value >= this.validateAge || value < 0) {
                    callback(new Error('请输入小于当前年龄的整数'))
                } else {
                    callback();
                }
            }
            var validateItem1423 = (rule, value, callback) =>{
                let reg = /^\d{1,2}$/;
                if (value === '') {
                    callback(new Error('必填'));
                } else if (!reg.test(value)) {
                    callback(new Error('0-11的整数'))
                } else if (value > 11 || value < 0) {
                    callback(new Error('0-11的整数'))
                } else {
                    callback();
                }
            }
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                cityInfo: cityInfo,
                //弹窗
                dialogVisible: false,
                inputSize: 'medium',
                //权限判定
                personalInformation_page: false,
                btnAuth: {
                    countryAgencySearch_page: false,
                },
                //地址转换
                props: {
                    value: 'label',
                    children: 'children',
                    label: 'label'
                },
                addressState: false,
                //选择亲属数组
                relativesCheckList: [],
                relativesItem: [],
                restaurants: [],
                timeout: 'null',
                //查看
                disabledState: false,
                //selectForm
                selectForm: {
                    bType: '',
                    cType: '',
                    drugName: ''
                },
                sid: null,
                validateAge:null,
                //表单对象
                form: {
//            //不提交的字段
                    jobList: [],
                    diseaseList: [],
                    digestiveList: [],
                    digestiveSign: [],
                    brainwashingList: [],
                    cancerList: [],
                    provinces: [],
                    cities: [],
                    areas: [],
                    permanentAreaCode: '',
                    permanentProvinceCode: '',
                    permanentCityCode: '',
                    age: 25,//年龄


                    name: '',//姓名
                    sex: '',//'性别 1，男：2，女',
                    idCard: '',//身份证号
                    phone: '',//手机号
                    telephone: '',//座机
                    contactRelationship: '',//联系人关系
                    contactPhone: '',//联系人手机号
                    contact_telephone: '',//联系人固定电话
                    address1: '',//常住地址(详细地址)
                    address: [],//详细地址
                    address_postcode: '',//常住地址邮编
                    fillInPerson: '',//问卷填写人 1：本人, 2：其他
                    fillInRelationship: '',//其他 联系人与本人关系
                    item1: '',//'您的最高学历是：1：未受过教育，2：小学，3：初中，4：高中／中专／技校，5：大专，6：大学本科，7：研究生及以上，8：其他',
                    item2: '',//'教育状况其他',
                    item3: '',//'累计累积受教育年限（从小学开始）(年)',
                    item4: '',//'婚姻 状况，1：未婚，2：初婚，3：再婚，4：离婚，5：丧偶，6：分居，7：未婚同居',
                    item5: '',//'初次结婚年龄',
                    item6: null,//'身高(cm)',
                    item7: '',//'当前体重(kg)',
                    item8: '',//'五年前体重(kg)',
                    item9: '',//'18岁时体重(kg)',
                    item10: '',//'腰围(cm)',
                    item11: '',//'臀围(cm)',
                    item12: '',//'您是否清楚自己的血糖值  0：不清楚，1：清楚',
                    item13: '',//'最近一次空腹血糖值(mmol/L)',
                    item14: '',//'最近一次检测的餐后2小时血糖值(mmol/L)',
                    item15: '',//'您的职业',
                    item16: '',//'职业类型 1：专业技术人员，2：国家机关和企业事业单位负责人，3：职员，4：商人，5：农民，6：工人，7：服务性工作人员，8：家务，9：其他',
                    item17: '',//'其他职业类型',
                    item18: '',//'是否在以下行业/职业工作12个月或更多 0：否，1：是',
                    item19: '',//'在石棉 行业/职业工作12个月或更多 0：否，1：是',
                    item20: '',//'在石棉 行业/职业累计工作年限(年)',
                    item21: '',//'在石棉 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item22: '',//'在烘焙 行业/职业工作12个月或更多 0：否，1：是',
                    item23: '',//'在烘焙 行业/职业累计工作年限(年)',
                    item24: '',//'在烘焙 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item25: '',//'在屠宰或肉类包装 行业/职业工作12个月或更多 0：否，1：是',
                    item26: '',//'在屠宰或肉类包装 行业/职业累计工作年限(年)',
                    item27: '',//'在屠宰或肉类包装 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item28: '',//'在石油/化工业 行业/职业工作12个月或更多 0：否，1：是',
                    item29: '',//'在石油/化工业 行业/职业累计工作年限(年)',
                    item30: '',//'在石油/化工业 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item31: '',//'在采矿：煤矿 行业/职业工作12个月或更多 0：否，1：是',
                    item32: '',//'在采矿：煤矿 行业/职业累计工作年限(年)',
                    item33: '',//'在采矿：煤矿 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item34: '',//'在采矿：矽矿 行业/职业工作12个月或更多 0：否，1：是',
                    item35: '',//'在采矿：矽矿 行业/职业累计工作年限(年)',
                    item36: '',//'在采矿：矽矿 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item37: '',//'在棉麻加工 行业/职业工作12个月或更多 0：否，1：是',
                    item38: '',//'在棉麻加工 行业/职业累计工作年限(年)',
                    item39: '',//'在棉麻加工 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item40: '',//'在垃圾回收 行业/职业工作12个月或更多 0：否，1：是',
                    item41: '',//'在垃圾回收 行业/职业累计工作年限(年)',
                    item42: '',//'在垃圾回收 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item43: '',//'在消防 行业/职业工作12个月或更多 0：否，1：是',
                    item44: '',//'在消防 行业/职业累计工作年限(年)',
                    item45: '',//'在消防 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item46: '',//'在面粉/饲料/粮食加工 行业/职业工作12个月或更多 0：否，1：是',
                    item47: '',//'在面粉/饲料/粮食加工 行业/职业累计工作年限(年)',
                    item48: '',//'在面粉/饲料/粮食加工 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item49: '',//'在钢铁铸造 行业/职业工作12个月或更多 0：否，1：是',
                    item50: '',//'在钢铁铸造 行业/职业累计工作年限(年)',
                    item51: '',//'在钢铁铸造 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item52: '',//'在涂装（油漆） 行业/职业工作12个月或更多 0：否，1：是',
                    item53: '',//'在涂装（油漆） 行业/职业累计工作年限(年)',
                    item54: '',//'在涂装（油漆） 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item55: '',//'在喷砂 行业/职业工作12个月或更多 0：否，1：是',
                    item56: '',//'在喷砂 行业/职业累计工作年限(年)',
                    item57: '',//'在喷砂 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item58: '',//'在焊接 行业/职业工作12个月或更多 0：否，1：是',
                    item59: '',//'在焊接 行业/职业累计工作年限(年)',
                    item60: '',//'在焊接 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item61: '',//'在建筑 行业/职业工作12个月或更多 0：否，1：是',
                    item62: '',//'在建筑 行业/职业累计工作年限(年)',
                    item63: '',//'在建筑 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item64: '',//'在农药 行业/职业工作12个月或更多 0：否，1：是',
                    item65: '',//'在农药 行业/职业累计工作年限(年)',
                    item66: '',//'在农药 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item67: '',//'在厨师 行业/职业工作12个月或更多 0：否，1：是',
                    item68: '',//'在厨师 行业/职业累计工作年限(年)',
                    item69: '',//'在厨师 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item70: '',//'在橡胶/轮胎 行业/职业工作12个月或更多 0：否，1：是',
                    item71: '',//'在橡胶/轮胎 行业/职业累计工作年限(年)',
                    item72: '',//'在橡胶/轮胎 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item73: '',//'是否吸烟（每周吸一支以上并连续或累计6个月以上者定义为吸烟） 0：否，从不吸，1：是，目前仍在吸，2：以前吸，目前已戒烟 ',
                    item74: '',//'从多少岁开始吸烟(岁)',
                    item75: '',//'您曾经或现在早上醒来吸第一支烟的时间大约 1. 不到5分钟 2. 6-30分钟 3. 31-60分钟 4. 超过60分钟',
                    item76: '',//'您主要吸下列哪一种烟草产品（1. 机制卷烟；2. 手卷烟；3. 烟斗；4. 雪茄；5. 水烟；6. 其他',
                    item77: '',//'其他烟草类型',
                    item78: '',//'如果您目前已戒烟，这次戒烟已持续多少年（不足1年按0.5年计）',
                    item79: '',//'如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）',
                    item80: '',//'如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）',
                    item81: '',//'吸烟包年数是多少',
                    item82: '',//'同您一起生活的家人或者工作的同事是否吸烟（平均每周5天或以上） 0：否，1：是',
                    item83: '',//'在有烟雾的室内环境中，您居住和/或工作了多少年（不足1年按0.5年计）',
                    item84: '',//'吸烟人为配偶 0未勾选 1勾选',
                    item85: '',//'吸烟人为伴侣 0未勾选 1勾选',
                    item86: '',//'吸烟人为其他家庭成员 0未勾选 1勾选',
                    item87: '',//'其他家庭成员吸烟人数',
                    item88: '',//'吸烟人为同一办公室同事 0未勾选 1勾选',
                    item89: '',//'同一办公室同事吸烟人数',
                    item90: '',//'该吸烟者总共吸烟多少年 （不足1年按0.5年计）',
                    item91: '',//'该吸烟者每天吸多少支烟 （1包=20支；1两烟叶≈50支卷烟）',
                    item92: '',//'该吸烟者吸烟包年数是多少',
                    item331List: [],//'您经常饮酒的种类是什么？ 1：葡萄酒，2：白酒，3：啤酒，4：黄酒，5：其他',
                    item118: '',//'您平时的饮食喜好习惯（包括饮茶、饮水） 冷热度：1：烫，2：热，3：温，4：凉',
                    item120: '',//'您平时的饮食喜好习惯 口味 1：重盐，2：适中，3：清淡',
                    item125: '',//'从事低强度活动，如：太极、瑜伽等 每周平均活动次数',
                    item126: '',//'从事低强度活动，如：太极、瑜伽等 每次活动时间(分钟)',
                    item128: '',//'从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等 每周平均活动次数',
                    item129: '',//'从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等 每次活动时间(分钟)',
                    item131: '',//'从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等 每周平均活动次数',
                    item132: '',//'从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等 每次活动时间(分钟)',
                    item133: '',//'在过去12个月中，您每天平均坐着的时间（包括伏案工作、看手机、看电视等）（小时/天）',
                    item134: '',//'您近十年来的生活环境是否存在较严重空气污染（如长期在大城市生活则直接被认定有空气污染）？0：否，1：是',
                    item135: '',//'近十年来，您的住房是否进行取暖？0：否，1：是',
                    item136: '',//'主要取暖方式 1：集中暖气，2：用电，3：太阳能，4：天然气，5：烧煤，8：其他',
                    item137: '',//'其他主要取暖方式',
                    item138: '',//'近十年来，您家的主要做饭燃料种类 1：天然气/液化气，2：用电，3：烧煤，8：其他',
                    item139: '',//'其他主要做饭燃料种类',
                    item140: '',//'近十年来，您家做饭时住房内的油烟情况 1：无烟，2：少许，3：较多，4：很多',
                    item141: '',//'您家厨房采用什么排风设施 1：无，2：油烟机，3：换气扇。4：烟囱，5：其他',
                    item1421:'',//您每周做几次饭 
                    item1422:'',//做饭时间长达多久 年
                    item1423:'',//做饭时间长达多久 月
                    item142: '',//'其他排风设施',
                    item143: '',//'近些年您是否曾经受较大的精神创伤（亲人患重病或死亡、夫妇分居或离婚、重大财产损失、意外失业、重大意外身体伤害、暴力侵害等）0：否，1：是',
                    item144: '',//'近些年您是否有较长一段时间内精神处于压抑状况（连续超过 6 个月）0：否，1：是',
                    item145: '',//'您是否患过慢性呼吸系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
                    item146: '',//'是否患有石棉肺 0：否，1：是',
                    item147: '',//'首次诊断石棉肺时年龄 (岁)',
                    item148: '',//'是否患有儿童哮喘 0：否，1：是',
                    item149: '',//'首次诊断儿童哮喘时年龄 (岁)',
                    item150: '',//'是否患有成人哮喘 0：否，1：是',
                    item151: '',//'首次诊断成人哮喘时年龄 (岁)',
                    item152: '',//'是否患有支气管扩张 0：否，1：是',
                    item153: '',//'首次诊断支气管扩张时年龄 (岁)',
                    item154: '',//'是否患有慢性支气管炎 0：否，1：是',
                    item155: '',//'首次诊断慢性支气管炎时年龄 (岁)',
                    item156: '',//'是否患有慢性阻塞性肺病（COPD） 0：否，1：是',
                    item157: '',//'首次诊断慢性阻塞性肺病（COPD）时年龄 (岁)',
                    item158: '',//'是否患有肺气肿 0：否，1：是',
                    item159: '',//'首次诊断肺气肿时年龄 (岁)',
                    item160: '',//'是否患有弥漫性肺间质纤维化 0：否，1：是',
                    item161: '',//'首次诊断弥漫性肺间质纤维化时年龄 (岁)',
                    item162: '',//'是否患有肺炎 0：否，1：是',
                    item163: '',//'首次诊断肺炎时年龄 (岁)',
                    item164: '',//'是否患有结节病 0：否，1：是',
                    item165: '',//'首次诊断结节病时年龄 (岁)',
                    item166: '',//'是否患有矽肺/尘肺 0：否，1：是',
                    item167: '',//'首次诊断矽肺/尘肺时年龄 (岁)',
                    item168: '',//'是否患有肺结核 0：否，1：是',
                    item169: '',//'首次诊断肺结核时年龄 (岁)',
                    item170: '',//'是否患有其他慢性呼吸系统疾病 0：否，1：是',
                    item171: '',//'其他慢性呼吸系统疾病',
                    item172: '',//'首次诊断其他慢性呼吸系统疾病时年龄 (岁)',
                    item173: '',//'您是否患过下消化系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
                    item193: '',//'您是否曾经进行过粪便潜血试验（FOBT）检测 0：否，1：是',
                    item194: '',//'粪便潜血试验（FOBT）检测结果 0：阴性，1：阳性，999：不清楚',
                    item237: '',//'您是否进行过乙肝表面抗原（HBsAg）检测 0：否，1：是',
                    item238: '',//'乙肝表面抗原（HBsAg）检测结果 0：阴性，1：阳性，999：不清楚',
                    item239: '',//'您是否患过心脑血管疾病疾病？（经正规医疗机构明确诊断）0：否，1：是',
                    item240: '',//'您是否患过高血压 0：否，1：是',
                    item241: '',//'首次诊断高血压时年龄 (岁)',
                    item242: '',//'您是否患过血脂异常/高血脂症 0：否，1：是',
                    item243: '',//'首次诊断血脂异常/高血脂症时年龄 (岁)',
                    item244: '',//'您是否患过冠心病 0：否，1：是',
                    item245: '',//'首次诊断冠心病时年龄 (岁)',
                    item246: '',//'您是否患过脑卒中/脑中风 0：否，1：是',
                    item247: '',//'首次诊断脑卒中/脑中风时年龄 (岁)',
                    item248: '',//'您是否患过糖尿病 0：否，1：是',
                    item249: '',//'糖尿病类型 1：Ⅰ型，2：Ⅱ型，3：妊娠糖尿病，4：其他，999：不清楚',
                    item250: '',//'其他糖尿病',
                    item251: '',//'首次诊断糖尿病时年龄 (岁)',
                    item254: '',//'您的血缘亲属中，是否有人曾患癌症？ 0：否，1：是',
                    item255: '',//'是否为肺癌 0：否，1：是',
                    item256List: [],//'患肺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item257: '',//'是否为食管癌 0：否，1：是',
                    item258List: [],//'患食管癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item259: '',//'是否为胃癌 0：否，1：是',
                    item260List: [],//'患胃癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item261: '',//'是否为肝癌 0：否，1：是',
                    item262List: [],//'患肝癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item263: '',//'是否为结直肠癌 0：否，1：是',
                    item264List: [],//'患结直肠癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item265: '',//'是否为前列腺癌 0：否，1：是',
                    item266List: [],//'患前列腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item267: '',//'是否为膀胱癌 0：否，1：是',
                    item268List: [],//'患膀胱癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item269: '',//'是否为结鼻咽癌 0：否，1：是',
                    item270List: [],//'患鼻咽癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item271: '',//'是否为乳腺癌 0：否，1：是',
                    item272: '',//'您是否有一级血缘亲属（母亲、亲姐妹）在50岁及以前曾患乳腺癌 1：是，2：否',
                    item273List: [],//'患乳腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item274: '',//'是否为宫颈癌 0：否，1：是',
                    item275List: [],//'患宫颈癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item276: '',//'是否为卵巢癌 0：否，1：是',
                    item277List: [],//'患卵巢癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item278: '',//'是否为甲状腺癌 0：否，1：是',
                    item279List: [],//'患甲状腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item280: '',//'是否为其他癌症（包括不清楚） 0：否，1：是',
                    item281List: [],//'患其他癌症亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item282: '',//'您是否正在或曾经规律服用药物（超过一年）0：否，1：是',
                    item283: '',//'您的首次月经年龄(周岁)',
                    item284: '',//'您的月经周期是否规律？0：否，1：是',
                    item285: '',//'您是否已绝闭经？0：否，1：是',
                    item286: '',//'停经年龄 （周岁）',
                    item287: '',//'您是否曾分娩（包括自然分娩和剖腹产）？0：否，1：是',
                    item288: '',//'初次生育年龄 （周岁）',
                    item289: '',//'您是否有哺乳史？0：否，1：是',
                    item290: '',//'累计哺乳多少个月（不足一月按一月计）',
                    item291: '',//'您是否曾进行女性生殖系统手术（子宫、卵巢和输卵管等部位的手术，包括剖腹产）？0：否，1：是',
                    item292: '',//'女性生殖系统手术 手术名称或手术部位',
                    item293: '',//'您是否曾接受过激素替代治疗（雌激素或雌/孕激素联合治疗，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）?1：否，2：是，正在接受治疗，3：是，曾经接受治疗',
                    item294: '',//'您平时的饮食喜好习惯 肉类 1：几乎每餐，2：几乎每天，3：每周，4：很少，5：从不',
                    item295: '',//'您平时的饮食喜好习惯 腌制食品（如咸菜、腌菜） 1：每天多次，2：（几乎）每天一次，3：每周，4：很少，5：从不',
                    item296: '',//'您平时的饮食喜好习惯 茶 1：每天多次，2：（几乎）每天一次，3：每周，4：很少，5：从不',
                    item297: '',//'您平时的饮食喜好习惯 酒 1：每天多次，2：（几乎）每天一次，3：每周，4：很少，5：从不',
                    item298: '',//'您是否患过肠结核 0：否，1：是',
                    item299: '',//'首次诊断肠结核时年龄 (岁)',
                    item300: '',//'您是否患过结核性腹膜炎 0：否，1：是',
                    item301: '',//'首次诊断结核性腹膜炎时年龄 (岁)',
                    item302: '',//'您是否患过溃疡性结肠炎 0：否，1：是',
                    item303: '',//'首次诊断溃疡性结肠炎时年龄 (岁)',
                    item304: '',//'您是否患过克罗恩病 0：否，1：是',
                    item305: '',//'首次诊断克罗恩病时年龄 (岁)',
                    item306: '',//'您是否患过肠易激综合征 0：否，1：是',
                    item307: '',//'首次诊断肠易激综合征时年龄 (岁)',
                    item308: '',//'您是否患过慢性腹泻（腹泻超过3周或反复发作） 0：否，1：是',
                    item309: '',//'首次诊断慢性腹泻（腹泻超过3周或反复发作）时年龄 (岁)',
                    item310: '',//'您是否患过便秘 0：否，1：是',
                    item311: '',//'首次诊断便秘时年龄 (岁)',
                    item312: '',//'您是否患过肠息肉 0：否，1：是',
                    item313: '',//'首次诊断肠息肉时年龄 (岁)',
                    item314: '',//'您是否患过慢性阑尾炎或阑尾切除史 0：否，1：是',
                    item315: '',//'首次诊断慢性阑尾炎或阑尾切除史时年龄 (岁)',
                    item316: '',//'您是否患过其他疾病 0：否，1：是',
                    item317: '',//'其他疾病',
                    item318: '',//'首次诊断其他疾病时年龄 (岁)',
                    item319: '',//'您现在是否存在便血症状 0：否，1：是',
                    item320: '',//'便血症状出现时间 (岁)',
                    item321: '',//'您现在是否存在腹痛症状 0：否，1：是',
                    item322: '',//'腹痛症状出现时间 (岁)',
                    item323: '',//'您现在是否存在腹泻症状 0：否，1：是',
                    item324: '',//'腹泻症状出现时间 (岁)',
                    item325: '',//'您现在是否存在便秘症状 0：否，1：是',
                    item326: '',//'便秘症状出现时间 (岁)',
                    item327: '',//'您现在是否存在其他症状 0：否，1：是',
                    item328: '',//'其他症状',
                    item329: '',//'其他症状出现时间 (岁)',
                    item330: '',//'所患脑卒风类型 1：梗塞，2：出血，3：不详 (岁)',
                    item332: '',//'您经常饮酒的种类是什么？选择其它',
                    item333: '',//'您 现在是否存在以下症状（如果有，请说明症状出现的时间）0 1',
                    scheme: '',//'治疗方案 1：只服用雌激素，2：联合服用雌/孕激素',
                    researchSignature: '',//'研究对象或委托人签字',
                    researchDate: '',//'日期',
                    clientRelationship: '',//'委托人与研究对象关系',
                    investigator: '',//'调查员姓名',
                    investigationDate: '',//'调查日期',
                    pathurl: '',//'文件上传路径表id',
                    flag: '',//'有效标志 0、有效 -1、无效',
                    hosDrugHistoryList: [
                        {
                            drugType: '',
                            drugSmallType: '',
                            drugName: '',
                            startAge: '',
                            countTime: '',
                            drugSmallTypeList:[]
                        }
                    ],
                    hosHormoneDrugsHistoryList: [
                        {
                            drugName: '',
                            drugNameOther: '',
                            startAge: '',
                            endTime: '',
                            hormone: []

                        }
                    ],


                    contact_area: '',//本人座机区号
                    phone_phone: '',//本人座机号码
                },
                //表单验证规则
                rules: {
                    jobList: [
                        {required: true, message: '必选', trigger: 'blur'},
                        {required: true, message: '必选', trigger: 'change'},
                    ],//'工作',
                    diseaseList: [
                        {required: true, message: '必选', trigger: 'blur'},
                        {required: true, message: '必选', trigger: 'change'},
                    ],
                    digestiveList: [
                        {required: true, message: '必选', trigger: 'blur'},
                        {required: true, message: '必选', trigger: 'change'},
                    ],
                    digestiveSign: [
                        {required: true, message: '必选', trigger: 'blur'},
                        {required: true, message: '必选', trigger: 'change'},
                    ],
                    brainwashingList: [
                        {required: true, message: '必选', trigger: 'blur'},
                        {required: true, message: '必选', trigger: 'change'},
                    ],
                    cancerList: [
                        {required: true, message: '必选', trigger: 'blur'},
                        {required: true, message: '必选', trigger: 'change'},
                    ],
                    drugType: [
                        {required: true, message: '请选择药物种类', trigger: 'blur'},
                        {required: true, message: '请选择药物种类', trigger: 'change'},
                    ],
                    drugSmallType: [
                        {required: true, message: '请选择药物种类细分', trigger: 'blur'},
                        {required: true, message: '请选择药物种类细分', trigger: 'change'},
                    ],
                    drugName: [
                        {required: true, message: '请输入具体药物名称', trigger: 'blur'},
                        {required: true, message: '请输入具体药物名称', trigger: 'change'},
                    ],
                    startAge: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],
                    countTime: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validateNumber, trigger: 'blur'},
                        {validator: validateNumber, trigger: 'change'},
                    ],
                    endTime: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],
                    drugNameOther: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],


                    phone_area: [
                        {validator: validatecontact_area, trigger: 'blur'},
                        {validator: validatecontact_area, trigger: 'change'},
                    ],
                    phone_phone: [
                        {validator: validatecontact_telephone, trigger: 'blur'},
                        {validator: validatecontact_telephone, trigger: 'change'},
                    ],
                    telephone_area: [
                        {validator: validatecontact_area, trigger: 'blur'},
                        {validator: validatecontact_area, trigger: 'change'},
                    ],
                    telephone_phone: [
                        {validator: validatecontact_telephone, trigger: 'blur'},
                        {validator: validatecontact_telephone, trigger: 'change'},
                    ],
                    name: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'姓名',
                    sex: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'性别 1，男：2，女',
                    idCard: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//身份证号
                    phone: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatePhone, trigger: 'blur'},
                        {validator: validatePhone, trigger: 'change'}
                    ],//手机号
                    telephone: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//座机
                    contactRelationship: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {validator: contactRelationship, trigger: 'blur'},
                    ],//联系人关系
                    contactPhone: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {validator: validatePhone, trigger: 'blur'},
                    ],//联系人手机号
                    contact_telephone: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//联系人固定电话
                    address1: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {validator: validatecontact_address, trigger: 'blur'},
                    ],//常住地址(详细地址)
                    permanentAreaCode: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],//常住地址(详细地址)
                    permanentProvinceCode: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],//常住地址(详细地址)
                    permanentCityCode: [
                        {required: true, message: '必填', trigger: 'blur'},
                    ],//常住地址(详细地址)
                    addressPostcode: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//常住地址邮编
                    fillInPerson: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//问卷填写人 1：本人, 2：其他
                    fillInRelationship: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: contactRelationship, trigger: 'blur'},
                        {validator: contactRelationship, trigger: 'change'}
                    ],//其他 联系人与本人关系
                    item1: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您的最高学历是：1：未受过教育，2：小学，3：初中，4：高中／中专／技校，5：大专，6：大学本科，7：研究生及以上，8：其他',
                    item2: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'}
                    ],//'教育状况其他',
                    item3: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_age, trigger: 'blur'},
                        {validator: validatecontact_age, trigger: 'change'}
                    ],//'累计累积受教育年限（从小学开始）(年)',
                    item4: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'婚姻 状况，1：未婚，2：初婚，3：再婚，4：离婚，5：丧偶，6：分居，7：未婚同居',
                    item5: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'初次结婚年龄',
                    item6: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_height, trigger: 'blur'},
                        {validator: validatecontact_height, trigger: 'change'}
                    ],//'身高(cm)',
                    item7: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_weight1, trigger: 'blur'},
                        {validator: validatecontact_weight1, trigger: 'change'},
                    ],//'当前体重(kg)',
                    item8: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_weight1, trigger: 'blur'},
                        {validator: validatecontact_weight1, trigger: 'change'},
                    ],//'五年前体重(kg)',
                    item9: [
                        {required: false, message: '必填', trigger: 'blur'},
                        {required: false, message: '必填', trigger: 'change'},
                        {validator: validatecontact_weight1, trigger: 'blur'},
                        {validator: validatecontact_weight1, trigger: 'change'},
                    ],//'18岁时体重(kg)',
                    item10: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count150, trigger: 'blur'},
                        {validator: validatecontact_count150, trigger: 'change'},
                    ],//'腰围(cm)',
                    item11: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count150, trigger: 'blur'},
                        {validator: validatecontact_count150, trigger: 'change'},
                    ],//'臀围(cm)',
                    item12: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否清楚自己的血糖值  0：不清楚，1：清楚',
                    item13: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count50, trigger: 'blur'},
                        {validator: validatecontact_count50, trigger: 'change'},
                    ],//'最近一次空腹血糖值(mmol/L)',
                    item14: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count50, trigger: 'blur'},
                        {validator: validatecontact_count50, trigger: 'change'},
                    ],//'最近一次检测的餐后2小时血糖值(mmol/L)',
                    item15: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'},
                    ],//'您的职业',
                    item16: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'职业类型 1：专业技术人员，2：国家机关和企业事业单位负责人，3：职员，4：商人，5：农民，6：工人，7：服务性工作人员，8：家务，9：其他',
                    item17: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'},
                    ],//'其他职业类型',
                    item18: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否在以下行业/职业工作12个月或更多 0：否，1：是',
                    item19: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在石棉 行业/职业工作12个月或更多 0：否，1：是',
                    item20: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在石棉 行业/职业累计工作年限(年)',
                    item21: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在石棉 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item22: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在烘焙 行业/职业工作12个月或更多 0：否，1：是',
                    item23: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在烘焙 行业/职业累计工作年限(年)',
                    item24: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在烘焙 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item25: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在屠宰或肉类包装 行业/职业工作12个月或更多 0：否，1：是',
                    item26: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在屠宰或肉类包装 行业/职业累计工作年限(年)',
                    item27: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在屠宰或肉类包装 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item28: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在石油/化工业 行业/职业工作12个月或更多 0：否，1：是',
                    item29: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在石油/化工业 行业/职业累计工作年限(年)',
                    item30: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在石油/化工业 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item31: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在采矿：煤矿 行业/职业工作12个月或更多 0：否，1：是',
                    item32: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在采矿：煤矿 行业/职业累计工作年限(年)',
                    item33: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在采矿：煤矿 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item34: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在采矿：矽矿 行业/职业工作12个月或更多 0：否，1：是',
                    item35: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在采矿：矽矿 行业/职业累计工作年限(年)',
                    item36: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在采矿：矽矿 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item37: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在棉麻加工 行业/职业工作12个月或更多 0：否，1：是',
                    item38: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在棉麻加工 行业/职业累计工作年限(年)',
                    item39: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在棉麻加工 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item40: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在垃圾回收 行业/职业工作12个月或更多 0：否，1：是',
                    item41: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在垃圾回收 行业/职业累计工作年限(年)',
                    item42: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在垃圾回收 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item43: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在消防 行业/职业工作12个月或更多 0：否，1：是',
                    item44: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在消防 行业/职业累计工作年限(年)',
                    item45: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在消防 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item46: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在面粉/饲料/粮食加工 行业/职业工作12个月或更多 0：否，1：是',
                    item47: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在面粉/饲料/粮食加工 行业/职业累计工作年限(年)',
                    item48: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在面粉/饲料/粮食加工 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item49: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在钢铁铸造 行业/职业工作12个月或更多 0：否，1：是',
                    item50: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在钢铁铸造 行业/职业累计工作年限(年)',
                    item51: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在钢铁铸造 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item52: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在涂装（油漆） 行业/职业工作12个月或更多 0：否，1：是',
                    item53: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在涂装（油漆） 行业/职业累计工作年限(年)',
                    item54: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在涂装（油漆） 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item55: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在喷砂 行业/职业工作12个月或更多 0：否，1：是',
                    item56: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在喷砂 行业/职业累计工作年限(年)',
                    item57: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在喷砂 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item58: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在焊接 行业/职业工作12个月或更多 0：否，1：是',
                    item59: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在焊接 行业/职业累计工作年限(年)',
                    item60: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在焊接 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item61: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在建筑 行业/职业工作12个月或更多 0：否，1：是',
                    item62: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在建筑 行业/职业累计工作年限(年)',
                    item63: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在建筑 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item64: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在农药 行业/职业工作12个月或更多 0：否，1：是',
                    item65: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在农药 行业/职业累计工作年限(年)',
                    item66: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在农药 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item67: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在厨师 行业/职业工作12个月或更多 0：否，1：是',
                    item68: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在厨师 行业/职业累计工作年限(年)',
                    item69: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在厨师 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item70: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在橡胶/轮胎 行业/职业工作12个月或更多 0：否，1：是',
                    item71: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'},
                    ],//'在橡胶/轮胎 行业/职业累计工作年限(年)',
                    item72: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在橡胶/轮胎 行业/职业工作时是否经常采取防护措施？（如：戴面具或穿防护服）(0=否  1=是)',
                    item73: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否吸烟（每周吸一支以上并连续或累计6个月以上者定义为吸烟） 0：否，从不吸，1：是，目前仍在吸，2：以前吸，目前已戒烟 ',
                    item74: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'从多少岁开始吸烟(岁)',
                    item75: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您曾经或现在早上醒来吸第一支烟的时间大约 1. 不到5分钟 2. 6-30分钟 3. 31-60分钟 4. 超过60分钟',
                    item76: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您主要吸下列哪一种烟草产品（1. 机制卷烟；2. 手卷烟；3. 烟斗；4. 雪茄；5. 水烟；6. 其他',
                    item77: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'其他烟草类型',
                    item78: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'如果您目前已戒烟，这次戒烟已持续多少年（不足1年按0.5年计）',
                    item79: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多少年（不足1年按0.5年计）',
                    item80: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1包=20支；1两烟叶≈50支卷烟）',
                    item81: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'吸烟包年数是多少',
                    item82: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'同您一起生活的家人或者工作的同事是否吸烟（平均每周5天或以上） 0：否，1：是',
                    item83: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'在有烟雾的室内环境中，您居住和/或工作了多少年（不足1年按0.5年计）',
                    item84: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'吸烟人为配偶 0未勾选 1勾选',
                    item85: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'吸烟人为伴侣 0未勾选 1勾选',
                    item86: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'吸烟人为其他家庭成员 0未勾选 1勾选',
                    item87: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'其他家庭成员吸烟人数',
                    item88: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'吸烟人为同一办公室同事 0未勾选 1勾选',
                    item89: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'同一办公室同事吸烟人数',
                    item90: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'该吸烟者总共吸烟多少年 （不足1年按0.5年计）',
                    item91: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'该吸烟者每天吸多少支烟 （1包=20支；1两烟叶≈50支卷烟）',
                    item92: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'该吸烟者吸烟包年数是多少',
                    item331List: [
                        {type: 'array', required: true, message: '必填', trigger: 'change'},
                        {type: 'array', required: true, message: '必填', trigger: 'blur'},
                    ],//'您经常饮酒的种类是什么？ 1：葡萄酒，2：白酒，3：啤酒，4：黄酒，5：其他',
                    item118: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您平时的饮食喜好习惯（包括饮茶、饮水） 冷热度：1：烫，2：热，3：温，4：凉',
                    item120: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您平时的饮食喜好习惯 口味 1：重盐，2：适中，3：清淡',
                    item125: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count100, trigger: 'blur'},
                        {validator: validatecontact_count100, trigger: 'change'},
                    ],//'从事低强度活动，如：太极、瑜伽等 每周平均活动次数',
                    item126: [
                        {validator: validatecontact_count1000, trigger: 'blur'},
                        {validator: validatecontact_count1000, trigger: 'change'},
                    ],//'从事低强度活动，如：太极、瑜伽等 每次活动时间(分钟)',
                    item128: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count100, trigger: 'blur'},
                        {validator: validatecontact_count100, trigger: 'change'},
                    ],//'从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等 每周平均活动次数',
                    item129: [
                        {validator: validatecontact_count1000, trigger: 'blur'},
                        {validator: validatecontact_count1000, trigger: 'change'},
                    ],//'从事中等强度体力家务劳动 如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等 每次活动时间(分钟)',
                    item131: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count100, trigger: 'blur'},
                        {validator: validatecontact_count100, trigger: 'change'},
                    ],//'从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等 每周平均活动次数',
                    item132: [
                        {validator: validatecontact_count1000, trigger: 'blur'},
                        {validator: validatecontact_count1000, trigger: 'change'},
                    ],//'从事高强度活动，如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等 每次活动时间(分钟)',
                    item133: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count24, trigger: 'blur'},
                        {validator: validatecontact_count24, trigger: 'change'},
                    ],//'在过去12个月中，您每天平均坐着的时间（包括伏案工作、看手机、看电视等）（小时/天）',
                    item134: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您近十年来的生活环境是否存在较严重空气污染（如长期在大城市生活则直接被认定有空气污染）？0：否，1：是',
                    item135: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'近十年来，您的住房是否进行取暖？0：否，1：是',
                    item136: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'主要取暖方式 1：集中暖气，2：用电，3：太阳能，4：天然气，5：烧煤，8：其他',
                    item137: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'},
                    ],//'其他主要取暖方式',
                    item138: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'近十年来，您家的主要做饭燃料种类 1：天然气/液化气，2：用电，3：烧煤，8：其他',
                    item139: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'},
                    ],//'其他主要做饭燃料种类',
                    item140: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'近十年来，您家做饭时住房内的油烟情况 1：无烟，2：少许，3：较多，4：很多',
                    item141: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您家厨房采用什么排风设施 1：无，2：油烟机，3：换气扇。4：烟囱，5：其他',
                    item1421:[
                       {required: true, message: '必填', trigger: 'blur'},
                       {validator: validateNumber99, trigger: 'blur'},
                    ],
                    item1422:[
                       {required: true, message: '必填', trigger: 'blur'},
                       {validator: validateItem1422, trigger: 'blur'},
                    ],
                    item1423:[
                       {required: true, message: '必填', trigger: 'blur'},
                       {validator: validateItem1423, trigger: 'blur'},
                    ],
                    item142: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'},
                    ],//'其他排风设施',
                    item143: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'近些年您是否曾经受较大的精神创伤（亲人患重病或死亡、夫妇分居或离婚、重大财产损失、意外失业、重大意外身体伤害、暴力侵害等）0：否，1：是',
                    item144: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'近些年您是否有较长一段时间内精神处于压抑状况（连续超过 6 个月）0：否，1：是',
                    item145: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过慢性呼吸系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
                    item146: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有石棉肺 0：否，1：是',
                    item147: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断石棉肺时年龄 (岁)',
                    item148: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有儿童哮喘 0：否，1：是',
                    item149: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断儿童哮喘时年龄 (岁)',
                    item150: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有成人哮喘 0：否，1：是',
                    item151: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断成人哮喘时年龄 (岁)',
                    item152: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有支气管扩张 0：否，1：是',
                    item153: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断支气管扩张时年龄 (岁)',
                    item154: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有慢性支气管炎 0：否，1：是',
                    item155: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断慢性支气管炎时年龄 (岁)',
                    item156: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有慢性阻塞性肺病（COPD） 0：否，1：是',
                    item157: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断慢性阻塞性肺病（COPD）时年龄 (岁)',
                    item158: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有肺气肿 0：否，1：是',
                    item159: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断肺气肿时年龄 (岁)',
                    item160: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有弥漫性肺间质纤维化 0：否，1：是',
                    item161: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断弥漫性肺间质纤维化时年龄 (岁)',
                    item162: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有肺炎 0：否，1：是',
                    item163: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断肺炎时年龄 (岁)',
                    item164: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有结节病 0：否，1：是',
                    item165: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断结节病时年龄 (岁)',
                    item166: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有矽肺/尘肺 0：否，1：是',
                    item167: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断矽肺/尘肺时年龄 (岁)',
                    item168: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有肺结核 0：否，1：是',
                    item169: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断肺结核时年龄 (岁)',
                    item170: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否患有其他慢性呼吸系统疾病 0：否，1：是',
                    item171: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'}

                    ],//'其他慢性呼吸系统疾病',
                    item172: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断其他慢性呼吸系统疾病时年龄 (岁)',
                    item173: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过下消化系统疾病？（经正规医疗机构明确诊断）0：否，1：是',
                    item193: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否曾经进行过粪便潜血试验（FOBT）检测 0：否，1：是',
                    item194: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'粪便潜血试验（FOBT）检测结果 0：阴性，1：阳性，999：不清楚',
                    item237: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否进行过乙肝表面抗原（HBsAg）检测 0：否，1：是',
                    item238: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'乙肝表面抗原（HBsAg）检测结果 0：阴性，1：阳性，999：不清楚',
                    item239: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过心脑血管疾病疾病？（经正规医疗机构明确诊断）0：否，1：是',
                    item240: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过高血压 0：否，1：是',
                    item241: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断高血压时年龄 (岁)',
                    item242: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过血脂异常/高血脂症 0：否，1：是',
                    item243: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断血脂异常/高血脂症时年龄 (岁)',
                    item244: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过冠心病 0：否，1：是',
                    item245: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断冠心病时年龄 (岁)',
                    item246: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过脑卒中/脑中风 0：否，1：是',
                    item247: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断脑卒中/脑中风时年龄 (岁)',
                    item248: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过糖尿病 0：否，1：是',
                    item249: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'糖尿病类型 1：Ⅰ型，2：Ⅱ型，3：妊娠糖尿病，4：其他，999：不清楚',
                    item250: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'}
                    ],//'其他糖尿病',
                    item251: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断糖尿病时年龄 (岁)',
                    item254: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您的血缘亲属中，是否有人曾患癌症？ 0：否，1：是',
                    item255: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为肺癌 0：否，1：是',
                    item256List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患肺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item257: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为食管癌 0：否，1：是',
                    item258List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患食管癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item259: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为胃癌 0：否，1：是',
                    item260List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患胃癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item261: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为肝癌 0：否，1：是',
                    item262List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患肝癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item263: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为结直肠癌 0：否，1：是',
                    item264List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患结直肠癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item265: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为前列腺癌 0：否，1：是',
                    item266List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患前列腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item267: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为膀胱癌 0：否，1：是',
                    item268List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患膀胱癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item269: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为结鼻咽癌 0：否，1：是',
                    item270List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患鼻咽癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item271: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为乳腺癌 0：否，1：是',
                    item272: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否有一级血缘亲属（母亲、亲姐妹）在50岁及以前曾患乳腺癌 1：是，2：否',
                    item273List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患乳腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item274: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为宫颈癌 0：否，1：是',
                    item275List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患宫颈癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item276: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为卵巢癌 0：否，1：是',
                    item277List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患卵巢癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item278: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为甲状腺癌 0：否，1：是',
                    item279List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患甲状腺癌亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item280: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'是否为其他癌症（包括不清楚） 0：否，1：是',
                    item281List: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'患其他癌症亲属代码 1：母亲，2：父亲，3：子女，4：姐妹（包括同父异母姐妹或同母异父姐妹），5：兄弟（包括同父异母兄弟或同母异父兄弟），6：祖父，7：祖母，8：外祖父，9：外祖母，10：叔叔，11：姑姑，12：舅舅，13：姨妈，14：堂兄弟姐妹，15：表兄弟姐妹，16：其他',
                    item282: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否正在或曾经规律服用药物（超过一年）0：否，1：是',
                    item283: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'您的首次月经年龄(周岁)',
                    item284: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您的月经周期是否规律？0：否，1：是',
                    item285: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否已绝闭经？0：否，1：是',
                    item286: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'停经年龄 （周岁）',
                    item287: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否曾分娩（包括自然分娩和剖腹产）？0：否，1：是',
                    item288: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'初次生育年龄 （周岁）',
                    item289: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否有哺乳史？0：否，1：是',
                    item290: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: item290, trigger: 'blur'},
                        {validator: item290, trigger: 'change'}
                    ],//'累计哺乳多少个月（不足一月按一月计）',
                    item291: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否曾进行女性生殖系统手术（子宫、卵巢和输卵管等部位的手术，包括剖腹产）？0：否，1：是',
                    item292: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'}
                    ],//'女性生殖系统手术 手术名称或手术部位',
                    item293: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否曾接受过激素替代治疗（雌激素或雌/孕激素联合治疗，给药途径包括口服、皮贴、涂抹霜剂或凝胶、经阴道使用的霜、片、栓、硅胶环等）?1：否，2：是，正在接受治疗，3：是，曾经接受治疗',
                    item294: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],// 您平时的饮食喜好习惯 肉类 1：几乎每餐，2：几乎每天，3：每周，4：很少，5：从不
                    item295: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],// 您平时的饮食喜好习惯 腌制食品（如咸菜、腌菜） 1：每天多次，2：（几乎）每天一次，3：每周，4：很少，5：从不'
                    item296: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],// 您平时的饮食喜好习惯 茶 1：每天多次，2：（几乎）每天一次，3：每周，4：很少，5：从不
                    item297: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],// 您平时的饮食喜好习惯 酒 1：每天多次，2：（几乎）每天一次，3：每周，4：很少，5：从不'
                    item298: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过肠结核 0：否，1：是',
                    item299: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断肠结核时年龄 (岁)'
                    item300: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过结核性腹膜炎 0：否，1：是',
                    item301: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断结核性腹膜炎时年龄 (岁)'
                    item302: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过溃疡性结肠炎 0：否，1：是',
                    item303: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断溃疡性结肠炎时年龄 (岁)
                    item304: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过克罗恩病 0：否，1：是',
                    item305: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断克罗恩病时年龄 (岁)'
                    item306: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过肠易激综合征 0：否，1：是',
                    item307: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断肠易激综合征时年龄 (岁)'
                    item308: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过慢性腹泻（腹泻超过3周或反复发作） 0：否，1：是',
                    item309: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断慢性腹泻（腹泻超过3周或反复发作）时年龄 (岁)'
                    item310: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过便秘 0：否，1：是',
                    item311: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断便秘时年龄 (岁)'
                    item312: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过肠息肉 0：否，1：是',
                    item313: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断肠息肉时年龄 (岁)'
                    item314: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过慢性阑尾炎或阑尾切除史 0：否，1：是',
                    item315: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断慢性阑尾炎或阑尾切除史时年龄 (岁)'
                    item316: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您是否患过其他疾病 0：否，1：是',
                    item317: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'}
                    ],//'其他疾病',
                    item318: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'首次诊断其他疾病时年龄 (岁)'
                    item319: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您现在是否存在便血症状 0：否，1：是',
                    item320: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'便血症状出现时间 (岁)'
                    item321: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您现在是否存在腹痛症状 0：否，1：是',
                    item322: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'腹痛症状出现时间 (岁)'
                    item323: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您现在是否存在腹泻症状 0：否，1：是',
                    item324: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'腹泻症状出现时间 (岁)'
                    item325: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您现在是否存在便秘症状 0：否，1：是',
                    item326: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'便秘症状出现时间 (岁)'
                    item327: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您现在是否存在其他症状 0：否，1：是',
                    item328: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_count20, trigger: 'blur'},
                        {validator: validatecontact_count20, trigger: 'change'}
                    ],//'其他症状',
                    item329: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: validatecontact_item3, trigger: 'blur'},
                        {validator: validatecontact_item3, trigger: 'change'}
                    ],//'其他症状出现时间 (岁)'
                    item330: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'所患脑卒风类型 1：梗塞，2：出血，3：不详 (岁)',
                    item332: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您经常饮酒的种类是什么？ 其它',
                    item333: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'您 现在是否存在以下症状（如果有，请说明症状出现的时间）',
                    scheme: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'治疗方案 1：只服用雌激素，2：联合服用雌/孕激素',
                    researchSignature: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: checkFont, trigger: 'blur'},
                        {validator: checkFont, trigger: 'change'}
                    ],//'研究对象或委托人签字',
                    researchDate: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'日期',
                    clientRelationship: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: contactRelationship, trigger: 'blur'},
                        {validator: contactRelationship, trigger: 'change'}
                    ],//'委托人与研究对象关系',
                    investigator: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                        {validator: checkFont, trigger: 'blur'},
                        {validator: checkFont, trigger: 'change'}
                    ],//'调查员姓名',
                    investigationDate: [
                        {required: true, message: '必填', trigger: 'blur'},
                        {required: true, message: '必填', trigger: 'change'},
                    ],//'调查日期',
                },
                job: [
                    {
                        value: '1',
                        label: '石棉'
                    },
                    {
                        value: '2',
                        label: '烘烤'
                    },
                    {
                        value: '3',
                        label: '屠宰或肉类包装'
                    },
                    {
                        value: '4',
                        label: '石油/化工业'
                    },
                    {
                        value: '5',
                        label: '采矿：煤矿'
                    },
                    {
                        value: '6',
                        label: '采矿：矽矿'
                    },
                    {
                        value: '7',
                        label: '棉麻加工'
                    },
                    {
                        value: '8',
                        label: '垃圾回收'
                    },
                    {
                        value: '9',
                        label: '消防'
                    },
                    {
                        value: '10',
                        label: '面粉/饲料/粮食加工'
                    },
                    {
                        value: '11',
                        label: '钢铁铸造'
                    },
                    {
                        value: '12',
                        label: '涂装（油漆）'
                    },
                    {
                        value: '13',
                        label: '喷砂'
                    },
                    {
                        value: '14',
                        label: '焊接'
                    },
                    {
                        value: '15',
                        label: '建筑业'
                    },
                    {
                        value: '16',
                        label: '农药生产'
                    },
                    {
                        value: '17',
                        label: '厨师'
                    },
                    {
                        value: '18',
                        label: '橡胶/轮胎'
                    },
                ],
                sport: [
                    {
                        value: 1,
                        label: '低强度活动',
                        notice: '如：太极、瑜伽等'
                    },
                    {
                        value: 2,
                        label: '中等强度活动',
                        notice: '如：快走、慢跑、跳舞、乒乓球、家务（如扫地、擦玻璃、洗衣服、做饭、整理房间、拖地板等）、与儿童一起参与游戏或运动等'
                    },
                    {
                        value: 3,
                        label: '高强度活动',
                        notice: '如：快跑、爬山、游泳、器械锻炼、球类运动（足球、排球、篮球、羽毛球等）、搬运重物等'
                    },

                ],
                disease: [
                    {
                        value: '1',
                        label: '石棉肺'
                    },
                    {
                        value: '2',
                        label: '儿童哮喘'
                    },
                    {
                        value: '3',
                        label: '成人哮喘'
                    },
                    {
                        value: '4',
                        label: '支气管扩张'
                    },
                    {
                        value: '5',
                        label: '慢性支气管炎'
                    },
                    {
                        value: '6',
                        label: '慢性阻塞性肺病（COPD）'
                    },
                    {
                        value: '7',
                        label: '肺气肿'
                    },
                    {
                        value: '8',
                        label: '弥漫性肺间质纤维化'
                    },
                    {
                        value: '9',
                        label: '肺 炎'
                    },
                    {
                        value: '10',
                        label: '结节病'
                    },
                    {
                        value: '11',
                        label: '矽肺/尘肺'
                    },
                    {
                        value: '12',
                        label: '肺结核'
                    },
                    {
                        value: '13',
                        label: '其他'
                    },
                ],
                digestiveSData: [
                    {
                        value: '1',
                        label: '便血'
                    },
                    {
                        value: '2',
                        label: '腹痛'
                    },
                    {
                        value: '3',
                        label: '腹泻'
                    },
                    {
                        value: '4',
                        label: '便秘'
                    },
                    {
                        value: '5',
                        label: '其他'
                    }
                ],
                digestive: [
                    {
                        value: '1',
                        label: '肠结核'
                    },
                    {
                        value: '2',
                        label: '结核性腹膜炎'
                    },
                    {
                        value: '3',
                        label: '溃疡性结肠炎'
                    },
                    {
                        value: '4',
                        label: '克罗恩病'
                    },
                    {
                        value: '5',
                        label: '肠易激综合征'
                    },
                    {
                        value: '6',
                        label: '慢性腹泻（腹泻超过3周或反复发作）'
                    },
                    {
                        value: '7',
                        label: '便秘'
                    },
                    {
                        value: '8',
                        label: '肠息肉'
                    },
                    {
                        value: '9',
                        label: '慢性阑尾炎或阑尾切除史'
                    },
                    {
                        value: '10',
                        label: '其他'
                    },
                ],
                upDigestive: [
                    {
                        value: '1',
                        label: '反流性食管炎'
                    },
                    {
                        value: '2',
                        label: '浅表性胃炎'
                    },
                    {
                        value: '3',
                        label: '萎缩性胃炎'
                    },
                    {
                        value: '4',
                        label: '胃溃疡'
                    },
                    {
                        value: '5',
                        label: '十二指肠溃疡'
                    },
                    {
                        value: '6',
                        label: '胃息肉病'
                    },
                    {
                        value: '7',
                        label: ' 残胃'
                    },
                    {
                        value: '8',
                        label: '胃黏膜上皮内瘤变'
                    },
                    {
                        value: '9',
                        label: '胃肠上皮化生'
                    },
                    {
                        value: '10',
                        label: '其他'
                    },
                ],
                gallbladder: [
                    {
                        value: '1',
                        label: '慢性乙型肝炎'
                    },
                    {
                        value: '2',
                        label: '慢性丙型肝炎'
                    },
                    {
                        value: '3',
                        label: '肝硬化'
                    },
                    {
                        value: '4',
                        label: '血吸虫感染病史'
                    },
                    {
                        value: '5',
                        label: '脂肪肝'
                    },
                    {
                        value: '6',
                        label: '胆结石症'
                    },
                    {
                        value: '7',
                        label: ' 慢性胆囊炎或胆囊切除史'
                    },
                    {
                        value: '8',
                        label: '其他'
                    },
                ],
                brainwashing: [
                    {
                        value: '1',
                        label: '高血压'
                    },
                    {
                        value: '2',
                        label: '血脂异常/高血脂症'
                    },
                    {
                        value: '3',
                        label: ' 冠心病'
                    },
                    {
                        value: '4',
                        label: '脑卒中/脑中风'
                    },
                    {
                        value: '5',
                        label: '糖尿病'
                    },
                ],
                cancer: [
                    {
                        value: '1',
                        label: '肺癌'
                    },
                    {
                        value: '2',
                        label: '食管癌'
                    },
                    {
                        value: '3',
                        label: ' 胃癌'
                    },
                    {
                        value: '4',
                        label: '肝癌'
                    },
                    {
                        value: '5',
                        label: '结直肠癌'
                    },
                    {
                        value: '6',
                        label: '前列腺癌'
                    },
                    {
                        value: '7',
                        label: ' 膀胱癌'
                    },
                    {
                        value: '8',
                        label: '鼻咽癌'
                    },
                    {
                        value: '9',
                        label: '乳腺癌'
                    },
                    {
                        value: '10',
                        label: '宫颈癌'
                    },
                    {
                        value: '11',
                        label: '卵巢癌'
                    },
                    {
                        value: '12',
                        label: '甲状腺癌'
                    },
                    {
                        value: '13',
                        label: '其他（包括不清楚）'
                    },
                ],
                relatives: [
                    {
                        value: '1',
                        label: '1=母亲'
                    },
                    {
                        value: '2',
                        label: '2=父亲'
                    },
                    {
                        value: '3',
                        label: ' 3=子女'
                    },
                    {
                        value: '4',
                        label: '4=姐妹'
                    },
                    {
                        value: '5',
                        label: '5=兄弟'
                    },
                    {
                        value: '6',
                        label: '6=祖父'
                    },
                    {
                        value: '7',
                        label: ' 7=祖母'
                    },
                    {
                        value: '8',
                        label: '8=外祖父'
                    },
                    {
                        value: '9',
                        label: '9=外祖母'
                    },
                    {
                        value: '10',
                        label: '10=叔叔'
                    },
                    {
                        value: '11',
                        label: '11=姑姑'
                    },
                    {
                        value: '12',
                        label: '12=舅舅'
                    },
                    {
                        value: '13',
                        label: '13=姨妈'
                    },
                    {
                        value: '14',
                        label: '14=堂兄弟姐妹'
                    },
                    {
                        value: '15',
                        label: '15=表兄弟姐妹'
                    },
                    {
                        value: '16',
                        label: '16=其他'
                    },
                ],
                drugSmallTypeList: [],
                drugTypeList: [],
                hormone1: [
                    {
                        value: '1',
                        label: '雌二醇'
                    },
                    {
                        value: '2',
                        label: '雌二醇地屈孕酮'
                    },
                    {
                        value: '3',
                        label: '炔雌醇环丙孕酮 '
                    },
                    {
                        value: '4',
                        label: '替勃龙'
                    },
                    {
                        value: '5',
                        label: '戊酸雌二醇环丙孕酮'
                    },
                    {
                        value: '6',
                        label: '其他'
                    },
                ],
                hormone2: [
                    {
                        value: '1',
                        label: '黄体酮'
                    },
                    {
                        value: '2',
                        label: '地屈孕酮'
                    },
                    {
                        value: '3',
                        label: '甲地孕酮'
                    },
                    {
                        value: '4',
                        label: '甲羟孕酮'
                    },
                    {
                        value: '5',
                        label: '烯丙雌醇'
                    },
                    {
                        value: '6',
                        label: '雌二醇'
                    },
                    {
                        value: '7',
                        label: '雌二醇地屈孕酮'
                    },
                    {
                        value: '8',
                        label: '炔雌醇环丙孕酮 '
                    },
                    {
                        value: '9',
                        label: '替勃龙'
                    },
                    {
                        value: '10',
                        label: '戊酸雌二醇环丙孕酮'
                    },
                    {
                        value: '11',
                        label: '其他'
                    },
                ]


            }
        },
        created() {
            this.queryDruglibrary();
            window.scrollTo(0, 0)
        },
        async mounted() {
            await this.$axios_http({
                url: '/base/measurement/resource/getResource/1',
                vueObj: this
            }).then((res) => {
                if (res.data.status == 'SUCCESS') {
                    this.form.provinces = res.data.result;
                }
            })
            // this.$store.commit('LOGOUT_USER');
            // let obj = this.checkPageAuth(this, "personalInformation_page", this.btnAuth);
            this.form.hosDrugHistoryList[0].drugTypeList = this.drugTypeList
            if (this.$route.query.type == 1) {
                this.getUserInfo()
                this.getUserFormInfo()
            } else if (this.$route.query.type == 2) {
                this.getRiskFactorsInfo()
                this.disabledState = true
            }
        },
        methods: {
            // 查询药物种类
            queryDruglibrary() {
                this.$axios_http({
                    url: '/base/system/queryDruglibrary',
                    data:{
                        bTypeFlag: true,
                    },
                    vueObj: this
                }).then(({data:{result,status}}) => {
                    if(status === 'SUCCESS') {
                        this.drugTypeList = result.btypes;
                        console.log(this.drugTypeList)
                    }
                })
            },
            isOwn() {
                if (this.form.fillInPerson == 1) {
                    this.form.researchSignature = this.form.name
                } else {
                    this.form.researchSignature = ''
                }
            },
            citysInit(val, val2) {
                if (val) {
                    this.handleProvinceChange(val)
                }
                if (val2) {
                    this.handleCityChange(val2)
                }
            },
            //获取危险因素表单内容
            getRiskFactorsInfo() {
                let id = -1
                if (this.$route.query.id) {
                    id = this.$route.query.id
                }
                this.$axios_http({
                    url: "/base/fc/person/get/riskForm/" + id,
                    vueObj: this
                }).then((res) => {
                    this.rules = {}
                    this.citysInit(res.data.result.permanentProvinceCode, res.data.result.permanentCityCode)
                    this.form = Object.assign(this.form, res.data.result)
                    this.form.researchDate = this.getDate(this.form.researchDate)
                    this.form.investigationDate = this.getDate(this.form.investigationDate)
                    this.form.permanentProvinceCode = res.data.result.permanentProvinceCode
                    this.form.permanentCityCode = res.data.result.permanentCityCode
                    this.form.permanentAreaCode = res.data.result.permanentAreaCode
                    if (res.data.result.telephone) {
                        this.form.phone_area = res.data.result.telephone.split('-')[0]
                        this.form.phone_phone = res.data.result.telephone.split('-')[1]
                    }
                    if (res.data.result.contactTelephone) {
                        this.form.telephone_area = res.data.result.contactTelephone.split('-')[0]
                        this.form.telephone_phone = res.data.result.contactTelephone.split('-')[1]
                    }
                    this.form.smokeCheckList = []
                    this.form.jobList = []
                    this.form.brainwashingList = []
                    this.form.cancerList = []
                    this.form.digestiveList = []
                    this.form.digestiveSign = []
                    this.form.diseaseList = []

                    //工作
                    if (this.form.item19 == 1) {
                        this.form.jobList.push('1')
                    }
                    if (this.form.item22 == 1) {
                        this.form.jobList.push('2')
                    }
                    if (this.form.item25 == 1) {
                        this.form.jobList.push('3')
                    }
                    if (this.form.item28 == 1) {
                        this.form.jobList.push('4')
                    }
                    if (this.form.item31 == 1) {
                        this.form.jobList.push('5')
                    }
                    if (this.form.item34 == 1) {
                        this.form.jobList.push('6')
                    }
                    if (this.form.item37 == 1) {
                        this.form.jobList.push('7')
                    }
                    if (this.form.item40 == 1) {
                        this.form.jobList.push('8')
                    }
                    if (this.form.item43 == 1) {
                        this.form.jobList.push('9')
                    }
                    if (this.form.item46 == 1) {
                        this.form.jobList.push('10')
                    }
                    if (this.form.item49 == 1) {
                        this.form.jobList.push('11')
                    }
                    if (this.form.item52 == 1) {
                        this.form.jobList.push('12')
                    }
                    if (this.form.item55 == 1) {
                        this.form.jobList.push('13')
                    }
                    if (this.form.item58 == 1) {
                        this.form.jobList.push('14')
                    }
                    if (this.form.item61 == 1) {
                        this.form.jobList.push('15')
                    }
                    if (this.form.item64 == 1) {
                        this.form.jobList.push('16')
                    }
                    if (this.form.item67 == 1) {
                        this.form.jobList.push('17')
                    }
                    if (this.form.item70 == 1) {
                        this.form.jobList.push('18')
                    }

                    //心脑血管疾病
                    if (this.form.item240 == 1) {
                        this.form.brainwashingList.push('1')
                    }
                    if (this.form.item242 == 1) {
                        this.form.brainwashingList.push('2')
                    }
                    if (this.form.item244 == 1) {
                        this.form.brainwashingList.push('3')
                    }
                    if (this.form.item246 == 1) {
                        this.form.brainwashingList.push('4')
                    }
                    if (this.form.item248 == 1) {
                        this.form.brainwashingList.push('5')
                    }
                    // //癌症
                    if (this.form.item255 == 1) {
                        this.form.cancerList.push('1')
                    }
                    if (this.form.item257 == 1) {
                        this.form.cancerList.push('2')
                    }
                    if (this.form.item259 == 1) {
                        this.form.cancerList.push('3')
                    }
                    if (this.form.item261 == 1) {
                        this.form.cancerList.push('4')
                    }
                    if (this.form.item263 == 1) {
                        this.form.cancerList.push('5')
                    }
                    if (this.form.item265 == 1) {
                        this.form.cancerList.push('6')
                    }
                    if (this.form.item267 == 1) {
                        this.form.cancerList.push('7')
                    }
                    if (this.form.item269 == 1) {
                        this.form.cancerList.push('8')
                    }
                    if (this.form.item271 == 1) {
                        this.form.cancerList.push('9')
                    }
                    if (this.form.item274 == 1) {
                        this.form.cancerList.push('10')
                    }
                    if (this.form.item276 == 1) {
                        this.form.cancerList.push('11')
                    }
                    if (this.form.item278 == 1) {
                        this.form.cancerList.push('12')
                    }
                    if (this.form.item280 == 1) {
                        this.form.cancerList.push('13')
                    }


                    //下消化系统症状
                    if (this.form.item319 == 1) {
                        this.form.digestiveSign.push('1')
                    }
                    if (this.form.item321 == 1) {
                        this.form.digestiveSign.push('2')
                    }
                    if (this.form.item323 == 1) {
                        this.form.digestiveSign.push('3')
                    }
                    if (this.form.item325 == 1) {
                        this.form.digestiveSign.push('4')
                    }
                    if (this.form.item327 == 1) {
                        this.form.digestiveSign.push('5')
                    }

                    //下消化系统疾病
                    if (this.form.item298 == 1) {
                        this.form.digestiveList.push('1')
                    }
                    if (this.form.item300 == 1) {
                        this.form.digestiveList.push('2')
                    }
                    if (this.form.item302 == 1) {
                        this.form.digestiveList.push('3')
                    }
                    if (this.form.item304 == 1) {
                        this.form.digestiveList.push('4')
                    }
                    if (this.form.item306 == 1) {
                        this.form.digestiveList.push('5')
                    }
                    if (this.form.item308 == 1) {
                        this.form.digestiveList.push('6')
                    }
                    if (this.form.item310 == 1) {
                        this.form.digestiveList.push('7')
                    }
                    if (this.form.item312 == 1) {
                        this.form.digestiveList.push('8')
                    }
                    if (this.form.item314 == 1) {
                        this.form.digestiveList.push('9')
                    }
                    if (this.form.item316 == 1) {
                        this.form.digestiveList.push('10')
                    }
                    //下消化系统疾病
                    if (this.form.item146 == 1) {
                        this.form.diseaseList.push('1')
                    }
                    if (this.form.item148 == 1) {
                        this.form.diseaseList.push('2')
                    }
                    if (this.form.item150 == 1) {
                        this.form.diseaseList.push('3')
                    }
                    if (this.form.item152 == 1) {
                        this.form.diseaseList.push('4')
                    }
                    if (this.form.item154 == 1) {
                        this.form.diseaseList.push('5')
                    }
                    if (this.form.item156 == 1) {
                        this.form.diseaseList.push('6')
                    }
                    if (this.form.item158 == 1) {
                        this.form.diseaseList.push('7')
                    }
                    if (this.form.item160 == 1) {
                        this.form.diseaseList.push('8')
                    }
                    if (this.form.item162 == 1) {
                        this.form.diseaseList.push('9')
                    }
                    if (this.form.item164 == 1) {
                        this.form.diseaseList.push('10')
                    }
                    if (this.form.item166 == 1) {
                        this.form.diseaseList.push('11')
                    }
                    if (this.form.item168 == 1) {
                        this.form.diseaseList.push('12')
                    }
                    if (this.form.item170 == 1) {
                        this.form.diseaseList.push('13')
                    }
                    if (res.data.result.item84 == 1) {
                        this.form.smokeCheckList.push(1)
                    }
                    if (res.data.result.item85 == 1) {
                        this.form.smokeCheckList.push(2)
                    }
                    if (res.data.result.item86 == 1) {
                        this.form.smokeCheckList.push(3)
                    }
                    if (res.data.result.item88 == 1) {
                        this.form.smokeCheckList.push(4)
                    }
                })
            },
            //格式化日期
            getDate(value) {
                if (value != '' && value != null && value != undefined) {
                    var value = new Date(value)
                    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
                }
                return value
            },
            //获取个人信息表
            getUserInfo() {
                let id = 2
                if (this.$route.query.personInfoId) {
                    id = this.$route.query.personInfoId
                }
                this.$axios_http({
                    method: 'post',
                    url: "/base/fc/person/get/personInfoForm/" + id,
                    vueObj: this
                }).then((res) => {
                    this.form.name = res.data.result.name
                    this.form.researchName = res.data.result.name
                    this.form.sex = res.data.result.sex
                    this.form.age = res.data.result.age
                    this.form.idCard = res.data.result.idCard
                    this.form.phone = res.data.result.phone
                    this.form.telephone = res.data.result.telephone
                    this.form.address1 = res.data.result.permanentDetailedAddress
                    this.form.contactRelationship = res.data.result.contactRelationship
                    this.form.contactPhone = res.data.result.contactPhone
                    this.citysInit(res.data.result.permanentProvinceCode, res.data.result.permanentCityCode)
                    this.form.permanentProvinceCode = res.data.result.permanentProvinceCode
                    this.form.permanentCityCode = res.data.result.permanentCityCode
                    this.form.permanentAreaCode = res.data.result.permanentAreaCode
                    if (res.data.result.telephone) {
                        this.form.phone_area = res.data.result.telephone.split('-')[0]
                        this.form.phone_phone = res.data.result.telephone.split('-')[1]
                    }
                    if (res.data.result.contactTelephone) {
                        this.form.telephone_area = res.data.result.contactTelephone.split('-')[0]
                        this.form.telephone_phone = res.data.result.contactTelephone.split('-')[1]
                    }

                    this.form.investigator = sessionStorage.getItem('trueName');
                    this.form.investigationDate = this.getDate(new Date().getTime());
                })
            },
            //查看 资格审核表
            getUserFormInfo() {
                let id = 17
                if (this.$route.query.eli) {
                    id = this.$route.query.eli
                }
                this.$axios_http({
                    method: 'post',
                    url: "/base/fc/person/get/checkForm/" + id,
                    vueObj: this
                }).then((res) => {
                    this.form.smokeCheckList = []
                    this.form.item73 = res.data.result.smokeStatus
                    this.form.item74 = res.data.result.smokeBeginAge
                    this.form.item75 = res.data.result.smokeMorningTime
                    this.form.item76 = res.data.result.smokeMajorTobacco
                    this.form.item77 = res.data.result.smokeOtherTobacco
                    this.form.item78 = res.data.result.quitSmokeTime
                    this.form.item79 = res.data.result.smokeTime
                    this.form.item80 = res.data.result.smokeCountBranchDay
                    this.form.item81 = res.data.result.smokeCountYear
                    this.form.item82 = res.data.result.smokeExposure
                    this.form.item83 = res.data.result.smokeExposureYear
                    this.form.item87 = res.data.result.smokeExposureFamilyNumber
                    this.form.item89 = res.data.result.smokeExposureColleagueNumber
                    this.form.item90 = res.data.result.smokeExposurTime
                    this.form.item91 = res.data.result.smokeExposurCountBranchDay
                    this.form.item92 = res.data.result.smokeExposurCountYear
                    this.sid = res.data.result.sid
                    this.validateAge = res.data.result.age //add

                    if (res.data.result.smokeExposureSpouse == 1) {
                        this.form.smokeCheckList.push(1)
                    }
                    if (res.data.result.smokeExposurePartner == 1) {
                        this.form.smokeCheckList.push(2)
                    }
                    if (res.data.result.smokeExposureFamily == 1) {
                        this.form.smokeCheckList.push(3)
                    }
                    if (res.data.result.smokeExposureColleague == 1) {
                        this.form.smokeCheckList.push(4)
                    }
                })
            },
            //提交表单
            submitForm(form) {
                this.$nextTick(function () {
                    this.$refs[form].validate((valid, obj) => {
                        if (!valid) {
                            this.$message({
                                message: '您有必填项未填',
                                type: 'error'
                            });
                            for (var item in obj) {
                                if (item == 'address') {
                                    this.$refs[item].$refs.input.focus()
                                    return
                                }
                                if (this.$refs[item].focus) {
                                    this.$refs[item].focus();
                                } else {
                                    this.$refs[item].$el.focus();
                                }
                                return
                            }
                        }

                        if (valid) {
                            if (this.form.jobList.length > 0) {
                                if (this.findItem(this.form.jobList, 1)) {
                                    this.form.item19 = 1
                                }
                                if (this.findItem(this.form.jobList, 2)) {
                                    this.form.item22 = 1
                                }
                                if (this.findItem(this.form.jobList, 3)) {
                                    this.form.item25 = 1
                                }
                                if (this.findItem(this.form.jobList, 4)) {
                                    this.form.item28 = 1
                                }
                                if (this.findItem(this.form.jobList, 5)) {
                                    this.form.item31 = 1
                                }
                                if (this.findItem(this.form.jobList, 6)) {
                                    this.form.item34 = 1
                                }
                                if (this.findItem(this.form.jobList, 7)) {
                                    this.form.item37 = 1
                                }
                                if (this.findItem(this.form.jobList, 8)) {
                                    this.form.item40 = 1
                                }
                                if (this.findItem(this.form.jobList, 9)) {
                                    this.form.item43 = 1
                                }
                                if (this.findItem(this.form.jobList, 10)) {
                                    this.form.item46 = 1
                                }
                                if (this.findItem(this.form.jobList, 11)) {
                                    this.form.item49 = 1
                                }
                                if (this.findItem(this.form.jobList, 12)) {
                                    this.form.item52 = 1
                                }
                                if (this.findItem(this.form.jobList, 13)) {
                                    this.form.item55 = 1
                                }
                                if (this.findItem(this.form.jobList, 14)) {
                                    this.form.item58 = 1
                                }
                                if (this.findItem(this.form.jobList, 15)) {
                                    this.form.item61 = 1
                                }
                                if (this.findItem(this.form.jobList, 16)) {
                                    this.form.item64 = 1
                                }
                                if (this.findItem(this.form.jobList, 17)) {
                                    this.form.item67 = 1
                                }
                                if (this.findItem(this.form.jobList, 18)) {
                                    this.form.item70 = 1
                                }
                            }

                            //心脑血管疾病
                            if (this.form.brainwashingList.length > 0) {
                                if (this.findItem(this.form.brainwashingList, 1)) {
                                    this.form.item240 = 1
                                }
                                if (this.findItem(this.form.brainwashingList, 2)) {
                                    this.form.item242 = 1
                                }
                                if (this.findItem(this.form.brainwashingList, 3)) {
                                    this.form.item244 = 1
                                }
                                if (this.findItem(this.form.brainwashingList, 4)) {
                                    this.form.item246 = 1
                                }
                                if (this.findItem(this.form.brainwashingList, 5)) {
                                    this.form.item248 = 1
                                }
                            }
                            //癌症
                            if (this.form.cancerList.length > 0) {
                                if (this.findItem(this.form.cancerList, 1)) {
                                    this.form.item255 = 1
                                }
                                if (this.findItem(this.form.cancerList, 2)) {
                                    this.form.item257 = 1
                                }
                                if (this.findItem(this.form.cancerList, 3)) {
                                    this.form.item259 = 1
                                }
                                if (this.findItem(this.form.cancerList, 4)) {
                                    this.form.item261 = 1
                                }
                                if (this.findItem(this.form.cancerList, 5)) {
                                    this.form.item263 = 1
                                }
                                if (this.findItem(this.form.cancerList, 6)) {
                                    this.form.item265 = 1
                                }
                                if (this.findItem(this.form.cancerList, 7)) {
                                    this.form.item267 = 1
                                }
                                if (this.findItem(this.form.cancerList, 8)) {
                                    this.form.item269 = 1
                                }
                                if (this.findItem(this.form.cancerList, 9)) {
                                    this.form.item271 = 1
                                }
                                if (this.findItem(this.form.cancerList, 10)) {
                                    this.form.item274 = 1
                                }
                                if (this.findItem(this.form.cancerList, 11)) {
                                    this.form.item276 = 1
                                }
                                if (this.findItem(this.form.cancerList, 12)) {
                                    this.form.item278 = 1
                                }
                                if (this.findItem(this.form.cancerList, 13)) {
                                    this.form.item280 = 1
                                }
                            }

                            //下消化系统疾病
                            if (this.form.digestiveList.length > 0) {
                                if (this.findItem(this.form.digestiveList, 1)) {
                                    this.form.item298 = 1
                                }
                                if (this.findItem(this.form.digestiveList, 2)) {
                                    this.form.item300 = 1
                                }
                                if (this.findItem(this.form.digestiveList, 3)) {
                                    this.form.item302 = 1
                                }
                                if (this.findItem(this.form.digestiveList, 4)) {
                                    this.form.item304 = 1
                                }
                                if (this.findItem(this.form.digestiveList, 5)) {
                                    this.form.item306 = 1
                                }
                                if (this.findItem(this.form.digestiveList, 6)) {
                                    this.form.item308 = 1
                                }
                                if (this.findItem(this.form.digestiveList, 7)) {
                                    this.form.item310 = 1
                                }
                                if (this.findItem(this.form.digestiveList, 8)) {
                                    this.form.item312 = 1
                                }
                                if (this.findItem(this.form.digestiveList, 9)) {
                                    this.form.item314 = 1
                                }
                                if (this.findItem(this.form.digestiveList, 10)) {
                                    this.form.item316 = 1
                                }

                            }

                            //下消化系统症状
                            if (this.form.digestiveSign.length > 0) {
                                if (this.findItem(this.form.digestiveSign, 1)) {
                                    this.form.item319 = 1
                                }
                                if (this.findItem(this.form.digestiveSign, 2)) {
                                    this.form.item321 = 1
                                }
                                if (this.findItem(this.form.digestiveSign, 3)) {
                                    this.form.item323 = 1
                                }
                                if (this.findItem(this.form.digestiveSign, 4)) {
                                    this.form.item325 = 1
                                }
                                if (this.findItem(this.form.digestiveSign, 5)) {
                                    this.form.item327 = 1
                                }
                            }


                            //慢性呼吸系统疾病
                            if (this.form.diseaseList.length > 0) {
                                if (this.findItem(this.form.diseaseList, 1)) {
                                    this.form.item146 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 2)) {
                                    this.form.item148 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 3)) {
                                    this.form.item150 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 4)) {
                                    this.form.item152 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 5)) {
                                    this.form.item154 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 6)) {
                                    this.form.item156 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 7)) {
                                    this.form.item158 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 8)) {
                                    this.form.item160 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 9)) {
                                    this.form.item162 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 10)) {
                                    this.form.item164 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 11)) {
                                    this.form.item166 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 12)) {
                                    this.form.item168 = 1
                                }
                                if (this.findItem(this.form.diseaseList, 13)) {
                                    this.form.item170 = 1
                                }
                                if (this.form.phone_area) {
                                    this.form.telephone = this.form.phone_area + '-' + this.form.phone_phone
                                }
                                if (this.form.phone_area) {
                                    this.form.contactTelephone = this.form.telephone_area + '-' + this.form.telephone_phone
                                }

                            }

                            // 被动吸烟
                            if(this.form.smokeCheckList.length>0) {
                                if(this.form.smokeCheckList.includes(1)){
                                    this.form.item84 = 1
                                }
                                if(this.form.smokeCheckList.includes(2)){
                                    this.form.item85 = 1
                                }
                                if(this.form.smokeCheckList.includes(3)){
                                    this.form.item86 = 1
                                }
                                if(this.form.smokeCheckList.includes(4)){
                                    this.form.item88 = 1
                                }
                            }
                            this.form.personScreenId = this.$route.query.personScreenId
                            this.form.inputStatus = 1

                            // 判断该受试者是否接受粪便DNA的检测?
                            this.$confirm('该受试者是否接受粪便DNA的检测?', '提示', {
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                type: 'warning',
                                closeOnClickModal: false
                            }).then(() => {
                                this.$axios_http({
                                    url: "/base/fc/person/addOrUpdate/riskFactorForm",
                                    data: this.form,
                                    vueObj: this
                                }).then((res) => {
                                    if(res.data.status=="SUCCESS") {
                                        this.$message.success('提交成功')
                                        this.$router.push({
                                            path:'/dna/dnaentry',
                                            query: {
                                                sid: this.sid
                                            }
                                        })
                                    }
                                })
                            }).catch(() => {
                                this.addOrUpdate(this.form)
                            })
                        }
                    });
                })

            },
            addOrUpdate(dataObj) {
                this.$axios_http({
                    url: "/base/fc/person/addOrUpdate/riskFactorForm",
                    data: dataObj,
                    vueObj: this
                }).then((res) => {
                    if(res.data.status=="SUCCESS") {
                        this.$message.success('提交成功')
                        if (this.$route.query.from && this.$route.query.from == 1) {
                            this.$router.push({path: '/evaluation/index'});
                        } else {
                            this.$router.push({path: '/zm/subject/index'});
                        }
                    }
                })
            },
            clearItem18() {
                if (this.form.item18 != 1) {
                    this.form.jobList = []
                }
                if (this.form.item18 != 1 && this.form.item18 != 0) {
                    this.form.item18 = ''
                }
            },
            //清空选项
            clearItem(item, arr, count) {
                if (this.form[item] != count) {
                    for (let item in arr) {
                        this.form[arr[item]] = ''
                    }
                }
            },

            //清空选项G部分
            clearItm12(item, arr, count) {
                if (this.form[item] == count) {
                    for (let item in arr) {
                        this.form[arr[item]] = ''
                    }
                }
            },
            //判断不符合条件清空其他选项
            //type判断类型
            //item判断变量
            //flag
            //arr选项数组
            clear(type, item, flag, arr, count) {
                if (type == 0) {
                    //只有一个选项
                    this.clearRadio(item, 1, 1)
                }
                if (type == 1) {
                    //不是0或者1清空
                    this.clearRadio(item, 0, 1)
                }
                if (type == 12) {
                    //不是0或者1或者2清空
                    this.clearRadio(item, 0, 2)
                }
                if (type == 2) {
                    //1-2
                    this.clearRadio(item, 1, 2)
                }
                if (type == 111) {
                    //1-2
                    this.form.hosHormoneDrugsHistoryList = [
                        {
                            drugName: '',
                            drugNameOther: '',
                            startAge: '',
                            endTime: '',
                            hormone: []

                        }
                    ]
                    this.clearRadio(item, 1, 2)
                }
                if (type == 3) {
                    //1-3
                    this.clearRadio(item, 1, 3)
                }
                if (type == 4) {
                    //1-4
                    this.clearRadio(item, 1, 4)
                }
                if (type == 5) {
                    //1-5
                    this.clearRadio(item, 1, 5)
                }
                if (type == 8) {
                    //1-7
                    this.clearRadio(item, 1, 8)
                }
                if (type == 9) {
                    //1-9
                    this.clearRadio(item, 1, 9)
                }
                if (type == 'marriage') {
                    this.clearRadio('item4', 1, 7)
                    if (this.form.item4 != 2 && this.form.item4 != 3 && this.form.item4 != 4 && this.form.item4 != 5 && this.form.item4 != 6) {
                        this.form.item5 = ''
                    }
                }
                if (type == 'item136') {
                    if (this.form[item] != 1 && this.form[item] != 2 && this.form[item] != 3 && this.form[item] != 4 && this.form[item] != 5 && this.form[item] != 8) {
                        this.form[item] = ''
                    }
                    if (this.form[item] != 8) {
                        this.form.item137 = ''
                    }
                }
                if (type == 'item138') {
                    if (this.form[item] != 1 && this.form[item] != 2 && this.form[item] != 3 && this.form[item] != 8) {
                        this.form[item] = ''
                    }
                    if (this.form[item] != 8) {
                        this.form.item139 = ''
                    }
                }
                if (type == 'item194') {
                    if (this.form[item] != 0 && this.form[item] != 1 && this.form[item] != 999) {
                        this.form[item] = ''
                    }
                }
                if (type == 'item293') {
                    if (this.form[item] != 2 && this.form[item] != 3 && this.form[item] != 1) {
                        this.form[item] = ''
                    }
                    if (this.form[item] != 2 && this.form[item] != 3) {
                        this.form.scheme = ''
                    }
                }
                if (type == 'vegetables') {
                    this.clearRadio(item, 1, 6)
                    if (this.form[item] != 1 && this.form[item] != 2 && this.form[item] != 3 && this.form[item] != 4 && this.form[item] != 5) {
                        this.form[arr[0]] = ''
                    }
                }

                if (flag) {
                    this.clearItem(item, arr, count)
                }
            },
            //验证选项是否正确
            clearRadio(a, b, c) {
                let flag = false
                if (/^\d{1}$/.test(this.form[a])) {
                    for (let i = b; i < c + 1; i++) {
                        if (this.form[a] == i) {
                            flag = true
                        }
                    }
                    if (!flag) {
                        this.form[a] = ''
                    }
                } else {
                    this.form[a] = ''
                }

            },
            //查找数组中的某一项
            findItem(arr, count) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] == count) {
                        return true
                    }
                }
                return false
            },
            //是否必填
            returnTrueOrFalse(item) {
                if (item != 1 && item != 2 && item != 3 && item != 4 && item != 5) {
                    return true
                }
                return false
            },
            //是否必填
            returnTrueOrFalse1(item) {
                if (item == 1 || item == 2 || item == 3 || item == 4 || item == 5) {
                    return true
                }
                return false
            },
            //弹窗
            openDialog(item) {
                this.relativesCheckList = this.form[item]
                this.dialogVisible = true
                this.relativesItem = item
            },
            addFormSure() {
                this.form[this.relativesItem] = this.relativesCheckList.sort(this.sort)
                this.dialogVisible = false
                this.relativesCheckList = []
            },
            sort(a, b) {
                return a - b
            },
            //药物种类修改
            drugTypeChange(item, index) {
                if(item.drugType){
                    // 药物种=‘其他药物’，清除具体药物名称的校验
                    if(item.drugType != '其他药物') {
                        this.$refs['drugName'+index][0].clearValidate();
                    }
                    // 查询数据字典
                    this.$axios_http({
                        url: '/base/system/queryDruglibrary',
                        data:{
                            bType: item.drugType,
                            bTypeFlag: true,
                            cTypeFlag: true,
                        },
                        vueObj: this
                    }).then(({data:{result,status}}) => {
                        if(status === 'SUCCESS') {
                            item.drugSmallTypeList = result.ctypes
                            item.drugSmallType = null;
                            item.drugName = null;
                        }
                    })
                }else{
                    item.drugSmallTypeList = [];
                    item.drugSmallType = null;
                    item.drugName = null;
                }
            },
            drugSmallTypeChange(item, index) {
                item.drugName = null;
            },
            goBack() {
                this.$router.go(-1)
            },
            addDrug() {
                this.form.hosDrugHistoryList.push(
                    {
                        drugType: '',
                        drugSmallType: '',
                        drugName: '',
                        startAge: '',
                        countTime: '',
                        drugSmallTypeList: []
                    }
                )
            },
            addHormone() {
                if (this.form.scheme == 1) {
                    this.form.hosHormoneDrugsHistoryList.push(
                        {
                            drugName: '',
                            drugNameOther: '',
                            startAge: '',
                            endTime: '',
                            hormone: this.hormone1
                        }
                    )
                } else if (this.form.scheme == 2) {
                    this.form.hosHormoneDrugsHistoryList.push(
                        {
                            drugName: '',
                            drugNameOther: '',
                            startAge: '',
                            endTime: '',
                            hormone: this.hormone2
                        }
                    )
                }
            },
            delHormone() {
                this.form.hosHormoneDrugsHistoryList.pop()

            },
            delDrug() {
                this.form.hosDrugHistoryList.pop()
            },
            //查询药品名称
            querySearchAsync(queryString, cb, i) {
                this.restaurants = []
                // 清除校验提示
                if(this.form.hosDrugHistoryList[i].drugName){
                    this.$refs['drugName'+i][0].clearValidate();
                }

                // if (queryString && queryString === this.form.hosDrugHistoryList[i].drugName) {
                //     this.selectForm.bType = '';
                //     this.selectForm.cType = '';
                // }else{
                    this.selectForm.bType = this.form.hosDrugHistoryList[i].drugType
                    this.selectForm.cType = this.form.hosDrugHistoryList[i].drugSmallType
                // }
                this.selectForm.drugName = queryString
                this.$axios_http({
                    url: "/base/system/queryDruglibrary",
                    data: this.selectForm,
                    vueObj: this
                }).then(({data:{status, result}}) => {
                    if(status === 'SUCCESS'){
                        if(JSON.stringify(result) != '{}'){
                            for (let i = 0; i < result.names.length; i++) {
                                this.restaurants.push({
                                    value: result.names[i].productname,
                                    bType: result.names[i].btype,
                                    cType: result.names[i].ctype
                                })
                            }
                        }
                    }
                })
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(this.restaurants);
                }, 1000 * Math.random());
            },
            handleSelect(x,i) {
                // 清除校验提示
                if(this.form.hosDrugHistoryList[i].drugName){
                    this.$refs['drugName'+i][0].clearValidate();
                }
                let a = []
                x.drugType = this.restaurants.filter(item => item.value == x.drugName).map(item => item.bType)[0]
                x.drugSmallType = this.restaurants.filter(item => item.value == x.drugName).map(item => item.cType)[0]
            },
            drugNameChange(value, value1) {
                console.log(value, value1)
                for (let i = 0; i < this.drugTypeList.length; i++) {
                    if (value == this.drugTypeList[i].value) {
                        this.selectForm.aType = this.drugTypeList[i].label
                        for (let j = 0; j < this.drugTypeList[i].children.length; j++) {
                            if (value1 == this.drugTypeList[i].children[j].value) {
                                this.selectForm.cType = this.drugTypeList[i].children[j].label
                            }
                        }
                    }

                }
            },
            //服用年龄
            startAgeChange(item) {
                if (item.startAge < this.form.age) {
                    item.countTime = this.form.age / 1 - item.startAge
                }
            },
            //治疗方案改变
            schemeChange() {
                if (this.form.scheme == 1) {
                    for (let i = 0; i < this.form.hosHormoneDrugsHistoryList.length; i++) {
                        this.form.hosHormoneDrugsHistoryList[i].hormone = this.hormone1
                    }
                } else if (this.form.scheme == 2) {
                    for (let i = 0; i < this.form.hosHormoneDrugsHistoryList.length; i++) {
                        this.form.hosHormoneDrugsHistoryList[i].hormone = this.hormone2
                    }
                }
            },
            async handleProvinceChange(val) {
                this.form.permanentCityCode = '';
                this.form.permanentAreaCode = '';
                await this.getAddress('provinces', val);
            },
            async handleCityChange(val) {
                this.form.permanentAreaCode = '';
                await this.getAddress('cities', val);
            },
            getAddress(type, id) {
                this.$axios_http({
                    url: '/base/measurement/resource/getResource/' + id,
                    data: {},
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        let options = res.data.result;
                        if (type == 'provinces' && id == 1) {   //默认显示省
                            this.form.provinces = options;
                        } else if (type == 'provinces' && id != 1) {   //加载市
                            this.form.cities = options;
                        } else if (type == 'cities') {
                            this.form.areas = options;
                        }

                    }
                })
            }

        },
        watch: {}
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content-page {
        background: #e9ebf2;
        /*padding: 20px;*/
    }

    h3 {
        text-align: center;
    }

    .form-content {
        padding: 40px;
    }

    .form-title {
        font-weight: 700;
        width: 70%;
        margin: 20px auto;
        font-size: 14px;
    }

    .el-form-item {
        /*margin-bottom: 0px!important;*/
    }

    .title {
        width: 100%;
        background: #e5e5e5;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-bottom: 20px;
    }

    .radio-li {
        margin-left: 20px;
        float: left;
        list-style-type: none;
    }

    .marriage-other {
        margin-left: 45px;
        line-height: 40px;
    }

    .weight-ul {
        float: left;
        margin-left: 5px;
        margin-right: 20px;
        list-style-type: none;
    }

    .weight-ul li {
        height: 40px;
        line-height: 40px;
    }

    .weight-ul-title {
        text-align: center;
    }

    .job {
        width: 600px;
        margin-left: 20px;
    }

    .job .el-checkbox {
        margin-right: 30px;
        margin-left: 0px;
        width: 130px;
    }

    .raskFactors-table {
        margin-left: 60px;
        margin-bottom: 20px;
    }

    .raskFactors-table td {
        border: 1px solid #e5e5e5;
        padding: 5px 20px;
        line-height: 16px;
        height: 20px !important;
    }

    .raskFactors-table td:nth-child(1) {
        width: 190px;
    }

    .raskFactors-table-tr td:nth-child(2) {
        width: 190px;
    }

    .raskFactors-table-tr td:nth-child(3) {
        width: 300px;
    }

    .raskFactors-table-title {
        text-align: center;
        background: #e5e5e5;
    }

    .item146-table-title {
        text-align: center;
        background: #e5e5e5;
    }

    .item98-table {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .item98-table td {
        border: 1px solid #e5e5e5;
        padding: 5px 20px;
    }

    .item98-table td ul {
        list-style-type: none;
    }

    .item98-table tr td:nth-child(2) {
        text-align: center;
    }

    .item98-table-title {
        background: #e5e5e5;
    }

    .item98-table-title td:nth-child(1) {
        width: 120px;
    }

    .item98-table-title td:nth-child(2) {
        width: 300px;
    }

    .item98-table-title td:nth-child(3) {
        width: 120px;
    }

    .job p {
        font-size: 14px;
        line-height: 15px;
        padding-left: 23px;
    }

    .disease {
        margin-left: 60px;
    }

    .dialogVisible {
        width: 500px;
        margin: auto;
    }

    .item282-title {
        background: #e5e5e5;
        padding: 5px 10px;
    }

    .item282-table td {
        padding: 5px 10px;
        border: 1px solid #e5e5e5;
    }

    .item282-table .el-form-item {
        margin-bottom: 0px !important;
    }

    .addbtn {
        text-align: center;
    }
</style>
<style>
    .riskFactors .el-form-item__error {
        position: relative !important;
    }

    .raskFactors-table .el-form-item {
        margin-bottom: 0px !important;
    }

    .item98-table tr td .el-form-item__content {
        line-height: 20px !important;
    }

    .job .el-checkbox__label {
        font-size: 16px !important;
    }

    .job .el-checkbox {
        margin-right: 20px !important;
        width: 160px !important;
    }

    .sport .el-form-item__error {
        position: absolute !important;
    }

    .dialogVisible .el-checkbox {
        margin-right: 20px !important;
        margin-left: 0px !important;
    }

    .dialogVisible .el-checkbox__label {
        width: 100px;
    }
    .formItemWidth .el-autocomplete{
        width:300px;
    }
</style>
