<template>
<div>
  <div class="reportBox j_content">
    <cancer-widget>
      <h1>肝癌筛查结果记录表</h1>
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
            <el-form-item label="检查日期：">
              <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      :clearable="false"
                      size="small"
                      :disabled="true"
                      v-model="hosGaResultInfoPO.checkDate">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="检查医院：">
              {{personDetail.dept}}
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
      <el-form :model="hosGaResultInfoPO" :rules="hosGaResultRules" ref="hosGaResultInfoPO">
        <h2>血液检查</h2>
        <el-row>
          <el-form-item label="1. AFP检测结果：" prop="item1A"  label-width="150px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item1A">
              <el-radio :label="0">0.阴性</el-radio>
              <el-radio :label="1">1.阳性</el-radio>
              <el-radio :label="2">2.未查</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosGaResultInfoPO.item1A==0 || hosGaResultInfoPO.item1A==1">
          <el-form-item label="1.1 AFP检测数值(ug/L或ng/mL)：" prop="item1">
            <el-input disabled v-model.trim="hosGaResultInfoPO.item1" size="mini"></el-input>
          </el-form-item>
        </el-row>
        <!-- <el-row>
          <el-form-item label="2. HBsAg检测结果：" prop="item1B">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item1B">
              <el-radio :label="0">0.阴性</el-radio>
              <el-radio :label="1">1.阳性</el-radio>
              <el-radio :label="2">2.未查</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row> -->
        <!-- <h2>肝炎病史与肝癌家族史</h2>
        <el-row>
          <el-form-item label="1. 家族成员中有无乙型肝炎病史？ " prop="item2A">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item2A">
              <el-radio :label="0">0.无</el-radio>
              <el-radio :label="1">1.有</el-radio>
              <el-radio :label="2">2.不知道</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="2. 家族成员中有无丙型肝炎病史？ " prop="item2B">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item2B">
              <el-radio :label="0">0.无</el-radio>
              <el-radio :label="1">1.有</el-radio>
              <el-radio :label="2">2.不知道</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="3. 以往有无做过AFP检查？ " prop="item2C" label-width="233px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item2C">
              <el-radio :label="0">0.无</el-radio>
              <el-radio :label="1">1.有</el-radio>
              <el-radio :label="2">2.不知道/未查</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="4. 亲属中有无肝癌史？" prop="item2D"  label-width="233px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item2D">
              <el-radio :label="0">0.无</el-radio>
              <el-radio :label="1">1.一级亲属</el-radio>
              <el-radio :label="2">2.其他有血缘关系的亲属</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row> -->
        <h2>超声检查结果</h2>
        <el-row>
          <el-form-item label="1. 肝脏形态：" prop="item3A">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item3A">
              <el-radio :label="1">1.规则</el-radio>
              <el-radio :label="2">2.异常</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="2. 肝脏大小： " prop="item3B">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item3B">
              <el-radio :label="1">1.正常</el-radio>
              <el-radio :label="2">2.增大</el-radio>
              <el-radio :label="3">3.缩小</el-radio>
              <el-radio :label="4">4.左右叶比例失调</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="3. 包膜形态： " prop="item3C">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item3C">
              <el-radio :label="1">1.平</el-radio>
              <el-radio :label="2">2.不平</el-radio>
              <el-radio :label="3">3.锯齿状</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <h2>占位情况</h2>
        <el-row>
          <el-form-item label="1. 是否探及：" prop="item3D">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item3D">
              <el-radio :label="1">1.探及</el-radio>
              <el-radio :label="2">2.不探及</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="1.1. 探及占位个数： " prop="item3DA" ref="item3DA" v-if="hosGaResultInfoPO.item3D==1">
             <el-input disabled v-model.trim="hosGaResultInfoPO.item3DA" size="small"  @blur="tuberChange(hosGaResultInfoPO.item3DA)"></el-input>
          </el-form-item>
        </el-row>
        <div v-for="(x,index) in hosGaPerchInfoPOList" v-if="hosGaResultInfoPO.item3D==1" :key="index">
          <h2>占位{{index+1}}情况</h2>
          <!-- <div class="add-tuber">
            <el-button @click="pushHosGaPerch(1)"  type="text">添加占位</el-button>
            <el-button @click="deleteTuber(index)" type="text" :disabled="index<hosGaResultInfoPO.item3DA">删除占位</el-button>
          </div> -->
            <el-form  :inline="true" :model="x" :ref="'hosGaPerchInfo'+index" :rules="hosGaPerchRules">
              <el-row>
                <el-form-item label="1. 占位位置：" prop="item1">
                  <el-radio-group disabled v-model="x.item1">
                    <el-radio :label="1">1.左叶段</el-radio>
                    <el-radio :label="2">2.右叶段</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="2. 占位形态：" prop="item2">
                  <el-radio-group disabled v-model="x.item2">
                    <el-radio :label="1">1.类圆形</el-radio>
                    <el-radio :label="2">2.不规则</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
               <el-row>
                 <p style="font-size:14px;margin-left:10px;">3. 占位大小</p>
                 <el-col :span="6">
                  <el-form-item label="长(厘米)：" prop="item3A">
                    <el-input disabled v-model.trim="x.item3A" size="mini"></el-input>
                  </el-form-item>
                 </el-col>
                  <el-col :span="6">
                  <el-form-item label="宽(厘米)：" prop="item3B">
                    <el-input disabled v-model.trim="x.item3B" size="mini"></el-input>
                  </el-form-item>
                 </el-col>
              </el-row>
              <el-row>
                <el-form-item label="4. 占位边界：" prop="item4">
                  <el-radio-group disabled v-model="x.item4">
                    <el-radio :label="1">1.清</el-radio>
                    <el-radio :label="2">2.不清</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="5. 占位边缘：" prop="item5">
                  <el-radio-group disabled v-model="x.item5">
                    <el-radio :label="1">1.光滑</el-radio>
                    <el-radio :label="2">2.不平</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
               <el-row>
                <el-form-item label="6. 内回声：" prop="item6"  label-width="107px">
                  <el-radio-group disabled v-model="x.item6">
                    <el-radio :label="1">1.无</el-radio>
                    <el-radio :label="2">2.低</el-radio>
                    <el-radio :label="3">3.中等</el-radio>
                    <el-radio :label="4">4.高</el-radio>
                    <el-radio :label="5">5.强</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row v-if="x.item6 != 1">
                <el-form-item label="7. 回声均匀：" prop="item6A">
                  <el-radio-group disabled v-model="x.item6A">
                    <el-radio :label="1">1.均匀</el-radio>
                    <el-radio :label="2">2.欠均匀</el-radio>
                    <el-radio :label="3">3.不均匀</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
               <el-row v-if="x.item6 != 1">
                <el-form-item label="8. 是否呈网格状：" prop="item6B">
                  <el-radio-group disabled v-model="x.item6B">
                    <el-radio :label="1">1.呈</el-radio>
                    <el-radio :label="2">2.不呈</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row v-if="x.item6 != 1">
                <el-form-item label="9. 结节或肿物后方回声："  prop="item6C">
                  <el-radio-group disabled v-model="x.item6C">
                    <el-radio :label="1">1.未见改变</el-radio>
                    <el-radio :label="2">2.衰减</el-radio>
                    <el-radio :label="3">3.增强</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row v-if="x.item6 != 1">
                <el-form-item label="10. 侧方声影："  prop="item6D">
                  <el-radio-group disabled v-model="x.item6D">
                    <el-radio :label="1">1.有</el-radio>
                    <el-radio :label="2">2.无</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row v-if="x.item6 != 1">
                <el-form-item label="11. 有无CDFI血流：血流信号？"  prop="item7">
                  <el-radio-group disabled v-model="x.item7" @change="clearGaItem(x)">
                    <el-radio :label="1">1.无</el-radio>
                    <el-radio :label="2">2.有</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row  v-if="x.item6 != 1 && x.item7==2">
                <el-form-item label="11.1. 血流信号是否丰富？"  prop="item7A">
                  <el-radio-group disabled v-model="x.item7A">
                    <el-radio :label="1">1.丰富</el-radio>
                    <el-radio :label="2">2.不丰富</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row  v-if="x.item6 != 1 && x.item7==2">
                <el-form-item label="11.2. 血流信号位置："  prop="item7BArray">
                  <el-checkbox-group disabled v-model="x.item7BArray">
                    <el-checkbox label="1">1.周边</el-checkbox>
                    <el-checkbox label="2">2.内部</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
              <el-row  v-if="x.item6 != 1 && x.item7==2">
                <el-form-item label="11.3 CDFI血流：RI值="  prop="item7C">
                  <el-input disabled v-model.trim="x.item7C" size="mini"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
        </div>
        <h2>余肝脏组织回声</h2>
        <el-row>
          <el-form-item label="1. 余肝脏组织回声是否正常？" prop="item4A" label-width="210px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item4A">
              <el-radio :label="1">1.正常</el-radio>
              <el-radio :label="2">2.增强</el-radio>
              <el-radio :label="3">3.粗糙</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
         <el-row>
          <el-form-item label="2. 余肝脏组织回声均匀程度：" prop="item4B"  label-width="210px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item4B">
              <el-radio :label="1">1.均匀</el-radio>
              <el-radio :label="2">2.欠均匀</el-radio>
              <el-radio :label="3">3.不均匀</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
         <el-row>
          <el-form-item label="3. 肝静脉显示情况：" prop="item4C" label-width="210px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item4C"  label-width="210px">
              <el-radio :label="1">1.清晰</el-radio>
              <el-radio :label="2">2.欠清</el-radio>
              <el-radio :label="3">3.不清</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
         <el-row>
          <el-form-item label="4. 肝静脉是否扭曲？" prop="item4D" label-width="210px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item4D">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row style="margin-left:10px;">
          <el-form-item label="5. 肝静脉内径：" label-width="210px">
            <!-- <el-radio-group v-model="hosGaResultInfoPO.item4DA">
              <el-radio :label="1">1.左</el-radio>
              <el-radio :label="2">2.中</el-radio>
              <el-radio :label="3">3.右</el-radio>
            </el-radio-group> -->
          </el-form-item>
          <el-form-item label="肝左静脉内径（cm）："  prop="item4DC">
            <el-input v-model.trim="hosGaResultInfoPO.item4DC" v-numberInt:2="hosGaResultInfoPO.item4DC" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="肝中静脉内径（cm）："  prop="item4DD">
            <el-input v-model.trim="hosGaResultInfoPO.item4DD" v-numberInt:2="hosGaResultInfoPO.item4DD" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="肝右静脉内径（cm）："  prop="item4DE">
            <el-input v-model.trim="hosGaResultInfoPO.item4DE" v-numberInt:2="hosGaResultInfoPO.item4DE" size="mini"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="6. 肝静脉状态：" prop="item4DB" label-width="210px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item4DB">
              <el-radio :label="1">1.正常</el-radio>
              <el-radio :label="2">2.变细</el-radio>
              <el-radio :label="3">3.增宽</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="7. 门静脉主干内径是否增宽？" prop="item5" label-width="210px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item5" @change="clearItem(hosGaResultInfoPO.item5,['item5A'],1)">
              <el-radio :label="1">1.不宽</el-radio>
              <el-radio :label="2">2.增宽</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosGaResultInfoPO.item5==2">
          <el-form-item label="7.1. 内径增宽（厘米）：" prop="item5A" label-width="210px">
            <el-input disabled type="text" size="small" v-model="hosGaResultInfoPO.item5A"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="8. 门静脉主干是否探及栓子？" prop="item5B" label-width="210px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item5B" @change="clearItem(hosGaResultInfoPO.item5B,['item5BA'],1)">
              <el-radio :label="1">1.未探及</el-radio>
              <el-radio :label="2">2.探及</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosGaResultInfoPO.item5B==2">
          <el-form-item label="8.1. 探及栓子位置是：" prop="item5BArray" label-width="210px">
            <el-checkbox-group disabled v-model="hosGaResultInfoPO.item5BArray">
              <el-checkbox label="1">1.左</el-checkbox>
              <el-checkbox label="2">2.右</el-checkbox>
              <el-checkbox label="3">3.主干</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        
        <el-row>
          <el-form-item label="9. CDFI血流流速是否正常？" prop="item6" label-width="210px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item6">
              <el-radio :label="1">1.正常</el-radio>
              <el-radio :label="2">2.增快</el-radio>
              <el-radio :label="3">3.减慢</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="9.1. CDFI血流平均流速是（cm/s）：" prop="item6A">
            <el-input disabled type="text" size="small" v-model="hosGaResultInfoPO.item6A"></el-input>
          </el-form-item>
        </el-row>
         <el-row>
          <el-form-item label="10. CDFI血流有无侧支循环：" prop="item6B" label-width="210px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item6B">
              <el-radio :label="1">1.有</el-radio>
              <el-radio :label="2">2.无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>

        <h2>肝内胆管回声</h2>
        <el-row>
          <el-form-item label="1. 肝内胆管回声是否正常？" prop="item7" label-width="205px">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item7">
              <el-radio :label="1">1.正常</el-radio>
              <el-radio :label="2">2.管壁回声增强</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
         <el-row>
          <el-form-item label="2. 肝内胆管是否呈等号样扩张？" prop="item7A">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item7A">
              <el-radio :label="1">1.呈</el-radio>
              <el-radio :label="2">2.不呈</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row style="margin-left:10px;">
          <el-form-item label="3. 是否为胆囊切除术后？" prop="item7AA">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item7AA">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是（跳至 脾脏信息）</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosGaResultInfoPO.item7AA!=2">
          <el-col :span="7">
            <el-form-item label="4. 胆囊大小：长(厘米)：" prop="item7BA">
              <el-input disabled v-model.trim="hosGaResultInfoPO.item7BA" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"> 
            <el-form-item label="宽(厘米)：" prop="item7BB">
              <el-input disabled v-model.trim="hosGaResultInfoPO.item7BB" size="mini"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
         <el-row v-if="hosGaResultInfoPO.item7AA!=2">
          <el-form-item label="5. 胆囊形态是否有变化？" prop="item7C">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item7C">
              <el-radio :label="1">1.正常</el-radio>
              <el-radio :label="2">2.增大</el-radio>
              <el-radio :label="3">3.萎缩</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
         <el-row v-if="hosGaResultInfoPO.item7AA!=2">
          <el-form-item label="6. 是否为餐后检查？" prop="item7D">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item7D">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
              <el-radio :label="3">3.不详</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosGaResultInfoPO.item7AA!=2">
          <el-form-item label="7. 胆囊壁是否正常？" prop="item7E">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item7E">
              <el-radio :label="1">1.正常</el-radio>
              <el-radio :label="2">2.增厚</el-radio>
              <el-radio :label="3">3.毛糙</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>

        <h2>脾脏信息</h2>
        <el-row>
          <el-form-item label="1. 脾脏长度(厘米)：" prop="item8A">
            <el-input disabled v-model.trim="hosGaResultInfoPO.item8A" size="mini"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="2. 脾脏厚度(厘米)：" prop="item8B">
            <el-input disabled v-model.trim="hosGaResultInfoPO.item8B" size="mini"></el-input>
          </el-form-item>
        </el-row>

        <h2>腹水信息</h2>
        <el-row>
          <el-form-item label="1. 有无腹水？" prop="item9">
            <el-radio-group disabled v-model="hosGaResultInfoPO.item9"  @change="clearItem(hosGaResultInfoPO.item9,['item9A'],1)">
              <el-radio :label="1">1.无</el-radio>
              <el-radio :label="2">2.有</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosGaResultInfoPO.item9==2">
          <el-form-item label="1.1. 腹水是(厘米)：" prop="item9A">
            <el-input disabled v-model.trim="hosGaResultInfoPO.item9A" size="mini"></el-input>
          </el-form-item>
        </el-row>
          <h2>诊断结论</h2>
          <div v-for="x,index in hosGaPerchInfoPOList"  v-if="hosGaResultInfoPO.item3D==1">
          <el-form  :inline="true" :model="x" :ref="'hosGaPerchInfoResult'+index" :rules="hosGaPerchRules">
            <el-row>
              <el-form-item :label="index+1+'.占位'+Number(index+1)+'诊断结论：'"  class="blockTit" prop="item8">
                <el-radio-group disabled v-model="x.item8">
                  <el-radio label="7">1.肝囊肿</el-radio>
                  <el-radio label="8">2.肝脓肿</el-radio>
                  <el-radio label="9">3.肝血管瘤</el-radio>
                  <el-radio label="10">4.肝占位性病变</el-radio>
                  <el-radio label="11">5.疑似肝癌</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
          </el-form>
        </div>  
        <el-row>
                <el-form-item label="其他诊断结论："  class="blockTit" :prop="hosGaResultInfoPO.item3D==1?'':'item10Array'">
                  <el-checkbox-group disabled v-model="hosGaResultInfoPO.item10Array" @change="clearGaItem(x)">
                    <el-checkbox label="1">1.肝硬化</el-checkbox>
                    <el-checkbox label="2">2.门脉高压</el-checkbox>
                    <el-checkbox label="3">3.胆囊炎</el-checkbox>
                    <el-checkbox label="4">4.脾大</el-checkbox>
                    <el-checkbox label="5">5.腹水</el-checkbox>
                    <el-checkbox label="6">6.脂肪肝</el-checkbox>
                    <!-- <el-checkbox label="7">7.肝囊肿</el-checkbox>
                    <el-checkbox label="8">8.肝脓肿</el-checkbox>
                    <el-checkbox label="9">9.肝血管瘤</el-checkbox>
                    <el-checkbox label="10">10.肝占位性病变</el-checkbox>
                    <el-checkbox label="11">11.疑似肝癌</el-checkbox> -->
                    <el-checkbox label="7">7.门静脉栓塞</el-checkbox>
                    <el-checkbox label="8">8.肝胆管扩张</el-checkbox>
                    <el-checkbox label="9" :disabled="hosGaResultInfoPO.item3D==1">9.未见异常</el-checkbox>
                    <el-checkbox label="10">10.其他</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="其他结论描述："  style="width:50%;" prop="item10A" v-if="typeof hosGaResultInfoPO.item10Array=='object' && hosGaResultInfoPO.item10Array.indexOf('10')>-1">
                  <el-input disabled v-model.trim="hosGaResultInfoPO.item10A" size="mini" minlength="1" maxlength="100"  type="textarea"></el-input>
                </el-form-item>
              </el-row>      
        <h2>处理建议</h2>
        <el-row>
           <el-form-item label="1. 是否需要国家癌症中心会诊？ " prop="isMeeting">
            <el-radio-group disabled v-model="hosGaResultInfoPO.isMeeting">
              <el-radio :label="1">1.否</el-radio>
              <el-radio :label="2">2.是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
         
        <h2>填表信息</h2>
        <el-row>
          <el-col :span="12">
            <el-form-item label="填表人员：" prop="inputUser">
              <el-input disabled v-model.trim="hosGaResultInfoPO.inputUser" size="mini" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="录入时间：" prop="inputTime">
              <el-date-picker
                      disabled
                      type="date"
                      :clearable="false"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      size="mini"
                      v-model="hosGaResultInfoPO.inputTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btns" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
        <router-link v-if="$route.query.source!='gj' && $route.query.reportInputStatus!=1" :to="{path:'/form/liverentry',query:{
          screeningId:$route.query.screeningId,
          id:$route.query.id,
          surverId:$route.query.surverId,
          personId:$route.query.personId,
          resultFormId:$route.query.resultFormId,
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
  import { sexFilter } from '@/filters/filter'
  export default {
    mixins: [ getPersonDetail ],
    data() {
      return {
          personDetail:{},    //用户基本信息
          deptName:sessionStorage.getItem('deptName'),    //检查医院
          inputUser:sessionStorage.getItem('loginName'),
          hosGaResultInfoPO: {
               surverId:'010105560135',
               screeningId:this.$route.query.screeningId,
               personId:Number(this.$route.query.personId),
               checkDate:new Date(),
               checkInfoId:this.$route.query.id,
               item1:null,
               item1A:null,
              //  item1B:null,
               item2A:null,
               item2B:null,
               item2C:null,
               item2D:null,
               item3A:null,
               item3B:null,
               item3C:null,
               item3D:null,
               item3DA:null,
               item4A:null,
               item4B:null,
               item4C:null,
               item4D:null,
               item4DA:null,
               item4DB:null,
               item4DC:null,
               item4DD:null,
               item4DE:null,
               item5:null,
               item5A:null,
               item5B:null,
               item5BArray:[],
               item5BA:null,
               item6:null,
               item6A:null,
               item6B:null,
               item7:null,
               item7AA:null,
               item7A:null,
               item7BA:null,
               item7BB:null,
               item7C:null,
               item7D:null,
               item7E:null,
               item8A:null,
               item8B:null,
               item9:null,
               item9A:null,
               item10:null,
               item10A:null,
               item10Array:[],
               isMeeting:null,
               inputTime:new Date(),
        },
        // 占位
        hosGaPerchInfoPOList:[{
               item1:null,
               item2:null,
               item3A:null,
               item3B:null,
               item4:null,
               item5:null,
               item6:null,
               item6A:null,
               item6B:null,
               item6C:null,
               item6D:null,
               item7:null,
               item7A:null,
               item7B:null,
               item7BArray:[],
               item7C:null,
               item8:null,
               item8Other:null          
        }],
         hosGaPerchRules:{
              item1:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item2:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item3A:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat100}
              ],
              item3B:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat100}
              ],
              item4:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item5:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item6:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item6A:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item6B:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item6C:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item6D:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7A:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7BArray:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7C:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat100}
              ],
              item8:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item8:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item8Other:[
                  { required: true, message: '必填', trigger: 'blur' },
                  // { trigger: 'blur', validator: VALIDATE.checkFontH}
              ]
          },
          hosGaResultRules:{
              item1:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat100}
              ],
              item1A:[
                  { required: false, message: '必填', trigger: 'change' },
              ],
              // item1B:[
              //     { required: true, message: '必填', trigger: 'change' },
              // ],
              item2A:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item2B:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item2C:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item2D:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item3A:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item3B:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item3C:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item3D:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item3DA:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.count50}
              ],
              item4A:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item4B:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item4C:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item4D:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item4DA:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item4DB:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item4DC:[
                  { trigger: 'blur', validator: VALIDATE.add05}
              ],
              item4DD:[
                  { trigger: 'blur', validator: VALIDATE.add05}
              ],
              item4DE:[
                  { trigger: 'blur', validator: VALIDATE.add05}
              ],
              item5:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item5A:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              item5B:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item5BA:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item6:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item6A:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              item6B:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7AA:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7A:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7BA:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat50}
              ],
              item7BB:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat50}
              ],
              item7C:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7D:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item7E:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item8A:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat50}
              ],
              item8B:[
                  { required: true, message: '必填', trigger: 'blur' },
                  { trigger: 'blur', validator: VALIDATE.countFloat50}
              ],
              item9:[
                  { required: true, message: '必填', trigger: 'change' },
              ],
              item9A:[
                  { required: true, message: '必填', trigger: 'change' },
                  { trigger: 'blur', validator: VALIDATE.countFloat50}
              ],
              item10Array:[
                { required: true, message: '必填', trigger: 'change' },
              ],
              item10A: [
                { required: true, message: '必填', trigger: 'blur' },
              ],
              inputUser:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              inputTime:[
                  { required: true, message: '必填', trigger: 'blur' },
              ],
              isMeeting:[
                  { required: true, message: '必选', trigger: 'change' },
              ],
          },
      };
    },
    created(){
        this.getPersonDetailFun(this.$route.query.personId,this.$route.query.surverId);
        this.getResultInfo();
    },
    mounted(){

    },
    methods: {
      //  查询结果
      getResultInfo(){
          this.$axios_http({
            url: '/base/gan/get/resultInfo/'+this.$route.query.resultFormId,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              this.hosGaResultInfoPO=res.data.result.hosGaResultInfoPO
              if(res.data.result.hosGaResultInfoPO.checkDate){
                this.hosGaResultInfoPO.checkDate=new Date(res.data.result.hosGaResultInfoPO.checkDate)
              }
              this.hosGaPerchInfoPOList=res.data.result.hosGaPerchInfoPOList
              this.hosGaResultInfoPO.inputTime=new Date(this.hosGaResultInfoPO.inputTime)
              if(this.hosGaPerchInfoPOList){
                this.hosGaPerchInfoPOList.filter( item => {
                  if(!item.item7B){
                    item.item7BArray = new Array();
                  }else if(item.item7B && typeof item.item7B=='string'){
                    item.item7BArray=item.item7B.split(',')
                  }
                })
              }
              if(!this.hosGaResultInfoPO.item5BA){
                this.hosGaResultInfoPO.item5BArray = new Array();
              }else if(this.hosGaResultInfoPO.item5BA && typeof this.hosGaResultInfoPO.item5BA=='string'){
                this.hosGaResultInfoPO.item5BArray=this.hosGaResultInfoPO.item5BA.split(',')
              }
              if(!res.data.result.hosGaResultInfoPO.item10){
                res.data.result.hosGaResultInfoPO.item10Array = new Array();
              }else if(res.data.result.hosGaResultInfoPO.item10 && typeof res.data.result.hosGaResultInfoPO.item10=='string'){
                res.data.result.hosGaResultInfoPO.item10Array=res.data.result.hosGaResultInfoPO.item10.split(',')
              }
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
  .add-tuber{
    text-align: right;
    position: relative;
    top:-45px;
    float: right;
  }
  .blockTit .el-radio{
    height: 40px;
  }
.ejTit{
  margin-top: 15px;
  font-size: 14px;
  padding-left:10px;
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
<style>
  .el-form-item__error{
    position: relative!important;
  }
  .reportBox .el-checkbox,.reportBox .el-radio{
    margin-left: 0 !important;
    margin-right: 30px;
  }
</style>