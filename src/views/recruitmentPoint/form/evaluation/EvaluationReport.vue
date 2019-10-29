<!--
* 路由跳转参数说明：checkStatus：1，待审核；2、审核通过；3、审核不通过
*           $route.query.flag 0:来源评估管理查看问卷 ，1:来源评估管理继续录入问卷，2:来源质控管理查看问卷，4：来源评估列表修改             
-->
<template>
<div>
  <!-- <div class="logs" @click="openLogs" v-if="$route.query.flag==0">操作日志</div> -->
    <!-- 操作日志弹窗 -->
    <el-dialog
      title="操作日志"
      :visible.sync="logsDialog"
      width="50%"
      :before-close="handleClose">
      <div class="tips">
          <p v-for="item in logs" :key="item.id">账号{{item.operatePersonName}}，{{item.operateType}}，时间{{item.operateTime}}</p>
        </div>
    </el-dialog>
  <div class="reportBox">
    <cancer-widget>
      <h1>防癌风险评估问卷</h1>
      <el-form :model="hosPersonInfoPO" :rules="rules" ref="hosPersonInfoPO"  class="demo-hosPersonInfoPO" :inline="true">
        <div class="idCardBlock">
          <div class="idCardImg">
            <div><img :src="imgSrc?imgSrc:require('../../../../assets/img/portrait.png')" alt="" style="width:80px;"></div>
            <el-button @click="auto" size="mini" type="primary" plain style="margin-top:10px;">识别身份证</el-button>
          </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="姓名：" prop="name">
                  <el-input size="mini" v-model.trim="hosPersonInfoPO.name" minlength="2" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号：" prop="idCard" class="idCard">
                  <el-input size="mini" v-model.trim="hosPersonInfoPO.idCard" @blur="checkIdcard">
                    <!-- <template slot="append"  size="small" ></template> -->
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生日期：" prop="birthday">
                  <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          size="mini"
                          v-model="hosPersonInfoPO.birthday">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="性别：" prop="sex" class="sexItem">
                  <el-radio-group v-model="hosPersonInfoPO.sex"  class="sex" 
                  @change="clearSex(hosPersonInfoPO.sex,['w01','w02','w021','w03','w031','w04','w041','w05','w051','w06','w061','w07','w08','w081','w09','w091'])">
                      <el-radio label="1">男</el-radio>
                      <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="本人联系电话（手机）：" prop="phone" style="margin-left:10px;">
                  <el-input size="mini" v-model.trim="hosPersonInfoPO.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="本人联系电话（座机）：" prop="tel" style="margin-left:10px">
                  <el-input size="mini" v-model.trim="hosPersonInfoPO.tel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
          <el-col :span="16" class="clearfix other">
            <el-form-item label="籍贯：" prop="province">
              <el-select size="mini" v-model="hosPersonInfoPO.province" placeholder="请选择省" @change="handleProvinceChange">
                <el-option :label="item.name" :value="item.id" v-for="item in provinces" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="city" label-width="0px">
              <el-select size="mini" v-model="hosPersonInfoPO.city" placeholder="请选择市" @change="handleCityChange">
                <el-option :label="item.name" :value="item.id" v-for="item in cities" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="area" label-width="0px" >
              <el-select size="mini" v-model="hosPersonInfoPO.area" placeholder="请选择县（区）">
                <el-option :label="item.name" :value="item.id" v-for="item in areas" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="clearfix">
            <el-form-item label="民族：" prop="flok">
              <el-select size="mini" v-model="hosPersonInfoPO.flok" placeholder="请选择" @change="flokChange">
                <el-option label="汉族" :value="1"></el-option>
                <el-option label="蒙古族" :value="2"></el-option>
                <el-option label="回族" :value="3"></el-option>
                <el-option label="满族" :value="4"></el-option>
                <el-option label="壮族" :value="5"></el-option>
                <el-option label="维吾尔族" :value="6"></el-option>
                <el-option label="哈萨克族" :value="7"></el-option>
                <el-option label="其他" :value="8"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="flokOther" v-if="hosPersonInfoPO.flok==8">
              <el-input size="mini" v-model.trim="hosPersonInfoPO.flokOther" minlength="2" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="常住地址：" prop="czAddress">
              <el-input size="mini" v-model.trim="hosPersonInfoPO.czAddress" class="lengthInput" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作单位：" prop="workAddress">
              <el-input size="mini" v-model.trim="hosPersonInfoPO.workAddress"  class="lengthInput" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      </el-form>
      <el-form :model="hosEvaluateFormPO" :rules="hosEvaluateFormPOrules" ref="hosEvaluateFormPO"  class="demo-hosEvaluateFormPO">
        <el-row>
          <el-col :span="8" style="margin-left:180px;">
            <el-form-item label="联系人1手机号：" prop="phone1">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.phone1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人2手机号：" prop="tel1">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.tel1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h2>A．一般情况</h2>
        <el-row>
          <el-col :span="6">
            <el-form-item label="A1.您的身高（CM）：" prop="a01">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.a01" class="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="A2.您的体重（Kg）：" prop="a02">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.a02" class="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="A3.您的腰围（CM）：" prop="a03">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.a03" class="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="A4.文化程度：" prop="a04" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.a04">
                <el-radio v-for="item in education" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="A5.婚姻状况：" prop="a05"  class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.a05">
                <el-radio v-for="item in marray" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="A6.您的职业：" prop="a06" label-width="200px;" class="blockTit">
            <el-radio-group v-model="hosEvaluateFormPO.a06" @change="clearItem(hosEvaluateFormPO.a06,['a06Other'],'input')">
              <el-radio v-for="item in work" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="A6.1.输入您的职业：" prop="a06Other" label-width="200px;" style="margin:20px 0;" v-if="hosEvaluateFormPO.a06==99">
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.a06Other" minlength="2" maxlength="20"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="A7.您是否有有害物质职业接触（1年及以上）？ " prop="a07">
            <el-radio-group v-model="hosEvaluateFormPO.a07" @change="clearItem(hosEvaluateFormPO.a07,['a071Arr'],'checkbox')">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="A7.1.您的职业接触何种有害物质（可多选）？ " prop="a071Arr" v-if="hosEvaluateFormPO.a07==1">
            <el-checkbox-group v-model="hosEvaluateFormPO.a071Arr">
              <el-checkbox v-for="item in wz" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>

        <h2>B．饮食习惯</h2>
        <div>
          <el-row>
            <el-form-item label="B1.过去一年内新鲜蔬菜摄入频度是： " prop="b01" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.b01">
                <el-radio v-for="item in pd" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="摄入占比量（周）：" prop="b011" style="margin-top:15px;">
              <el-input size="mini" v-model="hosEvaluateFormPO.b011" class="shortInput" v-numberInt:2="hosEvaluateFormPO.b011" ></el-input>&nbsp;%
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="B2.过去一年内新鲜水果摄入频度是： " prop="b02" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.b02">
                <el-radio v-for="item in pd" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="摄入占比量（周）：" prop="b021" style="margin-top:15px;">
              <el-input size="mini" v-model="hosEvaluateFormPO.b021" class="shortInput" v-numberInt:2="hosEvaluateFormPO.b021"></el-input>&nbsp;%
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="B3.过去一年内肉蛋奶类摄入频度是：" prop="b03" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.b03">
                <el-radio v-for="item in pd" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="摄入占比量（周）：" prop="b031" style="margin-top:15px;">
              <el-input size="mini" v-model="hosEvaluateFormPO.b031" class="shortInput" v-numberInt:2="hosEvaluateFormPO.b031"></el-input>&nbsp;%
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="B4.过去一年内豆类食品摄入频度是：" prop="b04" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.b04">
                <el-radio v-for="item in pd" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="摄入占比量（周）：" prop="b041" style="margin-top:15px;">
              <el-input size="mini" v-model="hosEvaluateFormPO.b041" class="shortInput" v-numberInt:2="hosEvaluateFormPO.b041"></el-input>&nbsp;%
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="B5.过去一年内大蒜摄入频度是：" prop="b05" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.b05">
                <el-radio v-for="item in pd" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="B6.过去一年内口味偏好是：" prop="b06" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.b06">
                <el-radio v-for="item in kw" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="B7.过去一年内腌制蔬菜摄入频度是：" prop="b07" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.b07">
                <el-radio v-for="item in pd" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="摄入占比量（周）：" prop="b071" style="margin-top:15px;">
              <el-input size="mini" v-model="hosEvaluateFormPO.b071" class="shortInput" v-numberInt:2="hosEvaluateFormPO.b071"></el-input>&nbsp;%
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="B8.过去一年内加工肉类摄入频度是：" prop="b08" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.b08">
                <el-radio v-for="item in pd" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="摄入占比量（周）：" prop="b081" style="margin-top:15px;">
              <el-input size="mini" v-model="hosEvaluateFormPO.b081" class="shortInput" v-numberInt:2="hosEvaluateFormPO.b081"></el-input>&nbsp;%
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="B9.过去一年内油炸食品摄入频度是：" prop="b09" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.b09">
                <el-radio v-for="item in pd" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="摄入占比量（周）：" prop="b091" style="margin-top:15px;">
              <el-input size="mini" v-model="hosEvaluateFormPO.b091" class="shortInput" v-numberInt:2="hosEvaluateFormPO.b091"></el-input>&nbsp;%
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="B10.过去一年内是否喜烫热食品？" prop="b10">
              <el-radio-group v-model="hosEvaluateFormPO.b10">
                <el-radio v-for="item in flagRS" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
        </div>
        <h2>C1. 厨房油烟暴露情况</h2>
        <el-row>
          <el-form-item label="C1.1.在过去一年中，您家做饭时住房内的油烟情况？ " prop="c011" class="blockTit">
            <el-radio-group v-model="hosEvaluateFormPO.c011">
              <el-radio v-for="item in yy" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="fl span-wrap">
              <el-form-item label="C1.2.您本人做饭时间多久？" prop="c013">
                <el-input size="mini" v-model="hosEvaluateFormPO.c013" class="shortInput"></el-input>&nbsp;年
              </el-form-item>
            </span>
            <span class="fl margin-left">
              <el-form-item prop="c0131">
                <el-input size="mini" v-model="hosEvaluateFormPO.c0131" class="shortInput"></el-input>&nbsp;月
              </el-form-item>
            </span>
          </el-col>
          <el-col :span="12">
            <el-form-item label="C1.3.您本人每周做几次饭？" prop="c012">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.c012"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h2>C2. 吸烟情况</h2>
        <el-row>
          <el-form-item label="C2.1.您是否吸烟（每天吸一支以上并连续或累计6个月以上者定义为吸烟）？ " prop="c021" class="blockTit">
            <el-radio-group v-model="hosEvaluateFormPO.c021" @change="clearSmoke(hosEvaluateFormPO.c021)">
              <el-radio v-for="item in smoke" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c021==1 || hosEvaluateFormPO.c021==2">
          <el-form-item label="C2.2.开始吸烟年龄" prop="c022">
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c022"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c021==1 || hosEvaluateFormPO.c021==2">
          <el-form-item label="C2.3.如果您仍在吸烟或曾吸烟，平均每天吸烟多少支（1两烟叶≈50支卷烟）？" prop="c023" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c023"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c021==1 || hosEvaluateFormPO.c021==2">
          <span class="fl span-wrap">
            <el-form-item label="C2.4.如果您仍在吸烟或曾吸烟，扣除戒烟年数，共吸烟多久？" prop="c024" >
              <el-input size="mini" v-model="hosEvaluateFormPO.c024" class="shortInput"></el-input>&nbsp;年
            </el-form-item>
          </span>
          <span class="fl margin-left">
            <el-form-item prop="c0241" >
              <el-input size="mini" v-model="hosEvaluateFormPO.c0241" class="shortInput"></el-input>&nbsp;月
            </el-form-item>
          </span>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c021==2">
          <span class="fl span-wrap">
            <el-form-item label="C2.5.如果您目前已戒烟，这次戒烟已持续多久？" prop="c025" >
            <el-input size="mini" v-model="hosEvaluateFormPO.c025" class="shortInput"></el-input>&nbsp;年
          </el-form-item>
          </span>
          <span class="fl margin-left">
            <el-form-item prop="c0251" >
              <el-input size="mini" v-model="hosEvaluateFormPO.c0251" class="shortInput"></el-input>&nbsp;月
            </el-form-item>
          </span>
          
        </el-row>
        <el-row v-if="hosPersonInfoPO.sex==2 && hosEvaluateFormPO.c021==0">
          <el-form-item label="C2.6.对于不吸烟女性，是否与吸烟≥30包年的家人共同生活≥20年？" prop="c026">
            <el-radio-group v-model="hosEvaluateFormPO.c026">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosPersonInfoPO.sex==2 && hosEvaluateFormPO.c021==0">
          <el-form-item label="C2.7.对于不吸烟女性，是否与吸烟≥30包年的同事同室工作≥20年？" prop="c027">
            <el-radio-group v-model="hosEvaluateFormPO.c027">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <h2>C3. 饮酒情况</h2>
        <el-row>
           <el-form-item label="C3.1.您是否经常饮酒？（每天饮酒1两以上，持续1年以上）" prop="c031" >
            <el-radio-group v-model="hosEvaluateFormPO.c031" @change="clearItem(hosEvaluateFormPO.c031,['c032Arr','c0331','c0332','c0341','c0342','c0351','c0352','c0361','c0362','c0371','c0372'],'input')">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c031 == 1">
           <el-form-item label="C3.2.您饮酒的种类有以下哪些？" prop="c032Arr" class="blockTit">
             <el-checkbox-group v-model="hosEvaluateFormPO.c032Arr" @change="clearC032Arr(hosEvaluateFormPO.c032Arr)">
               <el-checkbox v-for="item in drink" :key="item.id" :label="item.id" >{{item.name}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(1)">
          <el-form-item label="C3.3.1.啤酒每天的饮酒量是（毫升/天）: " prop="c0331" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0331"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(1)">
          <el-form-item label="C3.3.2.啤酒饮酒年限是（年）： " prop="c0332" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0332"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(2)">
          <el-form-item label="C3.4.1.低度白酒＜40度每天的饮酒量是（两/天）：" prop="c0341" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0341"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(2)">
          <el-form-item label="C3.4.2.低度白酒＜40度饮酒年限是（年）：" prop="c0342" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0342"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(5)">
          <el-form-item label="C3.5.1.高度白酒≥40度每天的饮酒量是（两/天）：" prop="c0371" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0371"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(5)">
          <el-form-item label="C3.5.2.高度白酒≥40度饮酒年限是（年）：" prop="c0372" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0372"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(3)">
          <el-form-item label="C3.6.1.葡萄酒/黄酒每天的饮酒量是（毫升/天）： " prop="c0351" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0351"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(3)">
          <el-form-item label="C3.6.2.葡萄酒/黄酒饮酒年限是（年）： " prop="c0352" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0352"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(4)">
          <el-form-item label="C3.7.1.米酒每天的饮酒量是（两/天）： " prop="c0361" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0361"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c032Arr.includes(4)">
          <el-form-item label="C3.7.2.米酒饮酒年限是（年）： " prop="c0362" >
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.c0362"></el-input>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.c031 == 1">
          <p style="font-size:14px;">说明：啤酒750毫升相当于一两白酒；葡萄酒或黄酒（约200毫升）相当于一两白酒</p>
        </el-row>
        <h2>C4. 运动情况</h2>
        <el-row> 
          <el-form-item label="C4.1 您是否经常参加体育锻炼（经常是指平均每周3次以上，每次超过30分钟）？ " prop="c041">
            <el-radio-group v-model="hosEvaluateFormPO.c041">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <h2>D. 既往史</h2>
        <el-row> 
          <el-form-item label="D1. 您是否曾被确诊患有任何癌症（非黑色素瘤性皮肤癌除外）？" prop="d01">
            <el-radio-group v-model="hosEvaluateFormPO.d01">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" @change="d01Change(hosEvaluateFormPO.d01)">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <h1 style="text-align:left;margin-left:20px;font-size:16px;padding-bottom:0;">您是否有下述疾病病史（经正规医疗机构明确诊断）?</h1>
        <h2>D2. 慢性呼吸系统疾病史</h2>
        <el-row> 
          <el-form-item label="D2.1.您是否患有慢性呼吸系统疾病?" prop="d021">
            <el-radio-group v-model="hosEvaluateFormPO.d021" @change="clearItem(hosEvaluateFormPO.d021,['d022Arr','d0221'],'input')">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.d021 == 1">
           <el-form-item label="D2.2.是否患有以下疾病？" prop="d022Arr" class="blockTit">
             <el-checkbox-group v-model="hosEvaluateFormPO.d022Arr" @change="clearD022Arr(hosEvaluateFormPO.d022Arr)">
               <el-checkbox v-for="item in hxjb" :key="item.id" :label="item.id" >{{item.name}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="D2.2.1.其他：请注明" prop="d0221" v-if="hosEvaluateFormPO.d022Arr.includes(99)">
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.d0221"></el-input>
          </el-form-item>
        </el-row>
        <el-row  v-if="hosEvaluateFormPO.d022Arr.includes(4)">
           <el-form-item label="D2.3.如果您患有肺结核，是否已经痊愈≥2年？" prop="d023">
            <el-radio-group v-model="hosEvaluateFormPO.d023">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>

        <h2>D3. 上消化道系统疾病史</h2>
        <el-row> 
          <el-form-item label="D3.1.您是否患有上消化道系统疾病？" prop="d031">
            <el-radio-group v-model="hosEvaluateFormPO.d031"
            @change="clearItem(hosEvaluateFormPO.d031,['d032Arr'],'checkbox')">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row  v-if="hosEvaluateFormPO.d031 == 1">
           <el-form-item label="D3.2.是否患有以下疾病？" prop="d032Arr" class="blockTit">
             <el-checkbox-group v-model="hosEvaluateFormPO.d032Arr" @change="clearItem(hosEvaluateFormPO.d032Arr,['d0321'],'input')">
               <el-checkbox v-for="item in xxdjb" :key="item.id" :label="item.id" >{{item.name}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="D3.2.1.其他：请注明" prop="d0321" v-if="hosEvaluateFormPO.d032Arr.includes(99)">
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.d0321"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
           <el-form-item label="D3.3.您是否患有食管或胃高级别上皮内瘤变？" prop="d033">
            <el-radio-group v-model="hosEvaluateFormPO.d033">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>

        <h2>D4. 肝脏疾病史</h2>
        <el-row> 
          <el-form-item label="D4.1.您是否患有肝脏疾病？" prop="d041">
            <el-radio-group v-model="hosEvaluateFormPO.d041" @change="clearItem(hosEvaluateFormPO.d041,['d042Arr','d0421'],'input')">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.d041 == 1">
           <el-form-item label="D4.2.是否患有以下疾病？" prop="d042Arr" class="blockTit">
             <el-checkbox-group v-model="hosEvaluateFormPO.d042Arr" @change="clearItem(hosEvaluateFormPO.d042Arr,['d0421'],'input')">
               <el-checkbox v-for="item in gzjb" :key="item.id" :label="item.id" >{{item.name}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="D4.2.1.其他：请注明" prop="d0421" v-if="hosEvaluateFormPO.d042Arr.includes(99)">
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.d0421"></el-input>
          </el-form-item>
        </el-row>

        <h2>D5. 肠道疾病史</h2>
        <el-row> 
          <el-form-item label="D5.1.您是否患有肠道疾病？" prop="d051">
            <el-radio-group v-model="hosEvaluateFormPO.d051" @change="clearItem(hosEvaluateFormPO.d051,['d052Arr','d0521'],'input')">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.d051 == 1">
           <el-form-item label="D5.2.是否患有以下疾病？" prop="d052Arr" class="blockTit">
             <el-checkbox-group v-model="hosEvaluateFormPO.d052Arr" @change="clearItem(hosEvaluateFormPO.d052Arr,['d0521'],'input')">
               <el-checkbox v-for="item in jzcjb" :key="item.id" :label="item.id" >{{item.name}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="D5.2.1.其他：请注明" prop="d0521" v-if="hosEvaluateFormPO.d052Arr.includes(99)">
            <el-input size="mini" v-model.trim="hosEvaluateFormPO.d0521"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
           <el-form-item label="D5.3.您的一级亲属（包括父母、亲兄弟姐妹及子女）是否有患有家族性腺瘤性息肉病？ " prop="d053">
            <el-radio-group v-model="hosEvaluateFormPO.d053">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>

        <h2>D6. 其他系统疾病史</h2>
        <el-row> 
          <el-form-item label="D6.1.您是否患有其他系统疾病？" prop="d061">
            <el-radio-group v-model="hosEvaluateFormPO.d061" @change="clearItem(hosEvaluateFormPO.d061,['d062Arr'],'checkbox')">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="hosEvaluateFormPO.d061 == 1">
           <el-form-item label="D6.2.是否患有以下疾病？" prop="d062Arr" class="blockTit">
             <el-checkbox-group v-model="hosEvaluateFormPO.d062Arr">
               <el-checkbox v-for="item in otherjb" :key="item.id" :label="item.id" >{{item.name}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
        </el-row>
        

        <h2>E. 恶性肿瘤家族史</h2>
        <el-row>
          <el-form-item label="E.1.您家是否有人患肿瘤？" prop="e01">
            <el-radio-group v-model="hosEvaluateFormPO.e01" @change="clearItem(hosEvaluateFormPO.e01,['e011'],'radio')">
              <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <div style="padding-left:30px;" v-if="hosEvaluateFormPO.e01 == 1">
          <el-form-item label="E.1.1.若是，请填写下表（可添加多个）:"></el-form-item>
          <table>
            <tr>
              <th>患肿瘤的家人与您的关系</th>
              <th>患有以下哪种肿瘤</th>
              <th>患病时的年龄</th>
              <th style="width:155px;">操作</th>
            </tr>
            <tr v-for="(itemA,index) in hosEvaluateFormPO.hosEvaluateFormRelationPOList" :key="index">
              <td>
                <el-form-item :prop="'hosEvaluateFormRelationPOList.'+index+'.relation'"  :rules="hosEvaluateFormPOrules.relation">
                  <el-select size="mini" v-model="itemA.relation" placeholder="请选择">
                    <el-option :label="item.name" :value="item.id" v-for="item in relation" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>
                <el-form-item :prop="'hosEvaluateFormRelationPOList.'+index+'.cancer'"  :rules="hosEvaluateFormPOrules.cancer">
                  <el-select size="mini" v-model="itemA.cancer" placeholder="请选择">
                    <el-option :label="item.dataName" :value="item.dataCode" v-for="item in zl" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </td>
              <td>
                <el-form-item :prop="'hosEvaluateFormRelationPOList.'+index+'.cancerAge'"  :rules="hosEvaluateFormPOrules.cancerAge">
                  <el-input size="mini" v-model.trim="itemA.cancerAge"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-button type="primary" size="mini" @click="addRelationPOList">添加</el-button>
                <el-button type="danger" size="mini" v-if="index!=0" @click="delRelationPOList(index)">删除</el-button>
              </td>
            </tr>
          </table>
          <div style="font-size:14px;margin-top:15px">
            <p>说明：</p>
            <p>一级亲属：01=母亲 02=父亲 03=姐妹 04=兄弟 05=子女</p>
            <p>二级亲属：06=祖父母 07=外祖父母 08=叔伯姑 09=舅姨</p>
            <p>三级亲属：10=堂兄弟姐妹 11=表兄弟姐妹 99=其他</p>
          </div>
        </div>
        <div v-if="hosPersonInfoPO.sex==2">
          <h2>W. 女性生理和生育（仅女性受访者填写）</h2>
          <el-row>
            <el-form-item label="W1.您的首次月经年龄是（周岁）: " prop="w01" >
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.w01"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="W2.您是否已绝闭经？ " prop="w02">
              <el-radio-group v-model="hosEvaluateFormPO.w02" @change="clearItem(hosEvaluateFormPO.w02,['w021'],'input')">
                <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="W2.1.您的停经年龄是（周岁）：" prop="w021" class="smallTit" v-if="hosEvaluateFormPO.w02==1">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.w021"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="W3.您是否使用激素替代治疗？" prop="w03" class="blockTit">
              <el-radio-group v-model="hosEvaluateFormPO.w03" @change="clearItem(hosEvaluateFormPO.w03,['w031'],'input')">
                <el-radio v-for="item in jisu" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row v-if="hosEvaluateFormPO.w03==1 || hosEvaluateFormPO.w03==2">
            <el-form-item label="W3.1.您使用激素替代治疗的年数（半年填0.5）: 	" prop="w031"  class="smallTit">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.w031"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="W4.您是否有活产史？" prop="w04">
              <el-radio-group v-model="hosEvaluateFormPO.w04" @change="clearItem(hosEvaluateFormPO.w04,['w041'],'input')">
                <el-radio v-for="item in flagHC" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="W4.1.您初次活产年龄是（周岁）：	" prop="w041"  class="smallTit" v-if="hosEvaluateFormPO.w04==1">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.w041"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="W5.您是否有哺乳史？ " prop="w05">
              <el-radio-group v-model="hosEvaluateFormPO.w05" @change="clearItem(hosEvaluateFormPO.w05,['w051'],'input')" >
                <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="W5.1.您累计哺乳月数是（不足1月按1月计）：" prop="w051" class="smallTit"  v-if="hosEvaluateFormPO.w05==1">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.w051"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="W6.您是否曾有乳腺活检史或乳腺良性疾病手术史？" prop="w06">
              <el-radio-group v-model="hosEvaluateFormPO.w06" @change="clearItem(hosEvaluateFormPO.w06,['w061'],'input')">
                <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="W6.1.乳腺活检史或乳腺良性疾病手术史的次数" prop="w061" v-if="hosEvaluateFormPO.w06==1">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.w061"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
             <el-form-item label="W7.您是否有一级亲属（包括母亲、姐妹及子女）曾患乳腺癌？ " prop="w07">
              <el-radio-group v-model="hosEvaluateFormPO.w07">
                <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
             <el-form-item label="W8.您是否有二级亲属（包括祖母、外祖母、姑姨）50岁前曾患乳腺癌？ " prop="w08">
              <el-radio-group v-model="hosEvaluateFormPO.w08" @change="clearItem(hosEvaluateFormPO.w08,['w081'],'input')">
                <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="W8.1.请注明人数 ：" prop="w081"  v-if="hosEvaluateFormPO.w08==1">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.w081"  minlength="2" maxlength="20"></el-input>
            </el-form-item>
          </el-row>
         <el-row>
             <el-form-item label="W9.您是否有二级亲属（包括祖母、外祖母、姑姨）50岁前曾患卵巢癌？ " prop="w09">
              <el-radio-group v-model="hosEvaluateFormPO.w09" @change="clearItem(hosEvaluateFormPO.w09,['w091'],'input')">
                <el-radio v-for="item in flag" :key="item.id" :label="item.id" >{{item.name}}</el-radio>>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="W9.1.请注明人数 ：" prop="w091"  v-if="hosEvaluateFormPO.w09==1">
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.w091"  minlength="2" maxlength="20"></el-input>
            </el-form-item>
          </el-row>
        </div>  
        <el-row>
          <el-col :span="12">
            <el-form-item label="签名：" prop="qianming" >
              <el-input size="mini" v-model.trim="hosEvaluateFormPO.qianming"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="填写日期：" prop="riqi" >
              <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="timestamp"
                      size="small"
                      v-model="hosEvaluateFormPO.riqi">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>      
          
          <el-row>
            <el-col :span="12">
              <el-form-item label="调查员编号：" prop="dcybianhao" >
                <el-input size="mini" v-model.trim="hosEvaluateFormPO.dcybianhao"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调查员签名：" prop="dcyqianming" >
                <el-input size="mini" v-model.trim="hosEvaluateFormPO.dcyqianming"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="($route.query.checkStatus==1 && $route.query.flag==2) || $route.query.checkStatus==2 || $route.query.checkStatus==3">
            <el-col :span="12">
              <el-form-item label="审核员编号：" prop="shybianhao" >
                <el-input size="mini" :disabled="true" v-model.trim="hosEvaluateFormPO.shybianhao" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核员签名：" prop="shyqianming" >
                <el-input size="mini" :disabled="true" v-model.trim="hosEvaluateFormPO.shyqianming" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
      </el-form>
      <!-- $route.query.flag 0:来源评估管理查看问卷 ，1:来源评估管理继续录入问卷，2:来源质控管理查看问卷，4：来源评估列表修改  -->
      <div class="clearfix">
        <el-button size="small" @click="$router.go(-1)" class="fl" style="margin-right:15px;">取消</el-button>
         <div class="btns fl" v-if="$route.query.flag!=0 &&  $route.query.flag!=2">
          <el-button type="primary" @click="submitForm('0','add')" size="small" v-if="!$route.query.id && !id && $route.query.flag!=4" v-dbClick>保存草稿</el-button>
          <el-button type="primary" @click="submitForm('0','edit')" size="small"  v-if="($route.query.id || id) && $route.query.flag!=4" v-dbClick>保存草稿</el-button>  

          <el-button type="primary"  @click="submitForm('1','add')" size="small"  v-if="!$route.query.id && !id" :disabled="btnDisabled" v-dbClick>提交审核</el-button>   
          <el-button type="primary"  @click="submitForm('1','edit')" size="small"  v-if="$route.query.id || id" v-dbClick>提交审核</el-button> 
        </div>
        <div class="btns fl" v-if="$route.query.flag==2">
          <el-button type="primary" size="small" :disabled="btnDisabled" @click="checkEvaluate(3)" v-dbClick>审核不通过</el-button>
          <el-button type="primary" size="small" :disabled="btnDisabled" @click="checkEvaluate(2)" v-dbClick>审核通过</el-button>
          
        </div>
      </div>
    </cancer-widget>

    <!-- 提交审核弹窗，结果录入提示 -->
    <el-dialog
        title="提示"
        :visible.sync="resultTips"
        width="600px"
        :close-on-click-modal="false"
        :show-close="false"
        :before-close="closeDialog">
      <div class="submitDialog-form"
         style="display:flex;vertical-align: center;font-size: 16px;line-height: 1.8;">
        <i class="el-icon-warning"
           style="color:#E6A23C;font-size:20px;margin-right: 5px;margin-top: 5px;"></i>
        <p v-if="itemsUnderIt === '1,2' || itemsUnderIt === '2,1'">新的评估方案需要在“结果录入”的相应菜单中录入Hp、HBsAg 2项结果，才能进行评估审核操作；为避免无法进行评估，请及时录入结果。</p>
        <p v-if="itemsUnderIt === '2'">新的评估方案需要在“结果录入”的相应菜单中录入FIT、Hp、HBsAg 3项结果，才能进行评估审核操作；为避免无法进行评估，请及时录入结果。</p>
      </div>
    <div style="margin-left:20px;margin-top:10px;line-height: 1.8;" v-if="zzFlagCheck!=null && itemsUnderIt!='2'">
        <p>是否为特殊情况（仅限100人以内），需要增加其他癌种的评估和筛查？</p>
        <p>（非必选）</p>
        <p v-if="zzFlagCheck === 1 || zzFlagCheck === 3"><el-checkbox v-model="zzFaFlag" label="1">肺癌评估&筛查</el-checkbox></p>
        <p v-if="zzFlagCheck === 2 || zzFlagCheck === 3"><el-checkbox v-model="zzCaFlag" label="1">结直肠癌评估&筛查</el-checkbox></p>
    </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="next()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</div>
  
</template>

<script>
import errorTips from "@/views/common/ErrorTips"
import dateFormater  from '@/filters/index'
import mixin from '@/mixins/mixins'
import VALIDATE from '@/utils/validate'
import REPORT_DICTIONARY from '@/views/recruitmentPoint/form/evaluation/dictionary'
import axios from 'axios'
  export default {
    mixins: [ mixin ],
    data() {
      // 小于自己年龄
      const validateYear = (rule, value, callback) => {
          if (value && !(/^[0-9]*$/.test(value)) ) {
              callback(new Error('请输入小于等于当前年龄的整数'))
          }else if(Number(value)>=this.hosPersonInfoPO.age || Number(value)<1){
              callback(new Error('请输入小于等于当前年龄的整数'))
          }else{
            callback()
          }
      };
      // c013
      const validateYear013 = (rule, value, callback) => {
          if (value && !(/^[0-9]*$/.test(value)) ) {
              callback(new Error('请输入小于等于当前年龄的整数'))
          }else if((this.hosPersonInfoPO.age && Number(value)>=this.hosPersonInfoPO.age) || Number(value)<0 || String(value) == '00'){
              callback(new Error('请输入小于等于当前年龄的整数'))
          }else{
            callback()
          }
      };
      // 身份证
      var validateIdCord = (rule, value, callback) => {
        this.hosPersonInfoPO.sex = ""
        this.hosPersonInfoPO.birthday=""
        if (value == "" || value==null) {
          callback(new Error('身份证号不能为空'));
        }
        //校验长度，类型
        else if (value!=null && value != "" && value.length!=18 && isCardNo(value) == false) {
          callback(new Error('您输入的身份证号码不正确，请重新输入'));
        }
        //检查省份
        else if (checkProvince(value) == false) {
          callback(new Error('您输入的身份证号码不正确，请重新输入'));
        }
        //校验生日
        // else if (checkBirthday(value) == false) {
        //   this.validateIdCard()
        //   callback(new Error(' '));
        // }
        //检验位的检测
        else if (checkParity(value) == false) {
          callback(new Error('您输入的身份证号码不正确，请重新输入'));
        }else if(this.checkcard==false){
          callback(new Error('系统已经存在该身份证号,请重新输入'));
        }else {
          this.getBirthday1(value);
          this.getSex(value);
          callback();
        }
      };
      var vcity = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
        21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
        33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
        42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
        51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
        63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
      };

//检查号码是否符合规范，包括长度，类型
      function isCardNo(card) {
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        // var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        var reg = /(^\d{17}(\d|X)$)/;
        if (reg.test(card) == false) {
          return false;
        }
        return true;
      }
//取身份证前两位,校验省份
      function checkProvince(card) {
        var province = card.substr(0, 2);
        if (vcity[province] == undefined) {
          return false;
        }
        return true;
      }

      //检查生日是否正确
      function checkBirthday(card) {
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        // if (len == '15') {
        //   var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        //   var arr_data = card.match(re_fifteen);
        //   var year = arr_data[2];
        //   var month = arr_data[3];
        //   var day = arr_data[4];
        //   var birthday = new Date('19' + year + '/' + month + '/' + day);
        //   return verifyBirthday('19' + year, month, day, birthday);
        // }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len == '18') {
          var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
          var arr_data = card.match(re_eighteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = new Date(year + '/' + month + '/' + day);
          // return verifyBirthday(year, month, day, birthday);
        }
        return false;
      }

      //校验日期
      function verifyBirthday(year, month, day, birthday) {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
          //判断年份的范围（45岁到74岁之间)
          var time = now_year - year;
          //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
          if (now.getMonth() < birthday.getMonth() || (now.getMonth() == birthday.getMonth() && now.getDate() < birthday.getDate())) {
            time=time-1;
          }
          if (time >= 45 && time <= 74) {
            return true;
          }
          return false;
        }
        return false;
      }

//校验位的检测
      function checkParity(card) {
        //15位转18位
        //debugger
        // card = changeFivteenToEighteen(card);
        var len = card.length;
        if (len == '18') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0, i, valnum;
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          valnum = arrCh[cardTemp % 11];
          if (valnum == card.substr(17, 1)) {
            return true;
          }
          return false;
        }
        return false;
      }

//15位转18位身份证号
      function changeFivteenToEighteen(card) {
        if (card.length == '15') {
          var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
          var cardTemp = 0, i;
          card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
          for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
          }
          card += arrCh[cardTemp % 11];
          return card;
        }
        return card;
      }
      return {
        education:REPORT_DICTIONARY.education,
        marray:REPORT_DICTIONARY.marray,
        work:REPORT_DICTIONARY.work,
        flag:REPORT_DICTIONARY.flag,
        wz:REPORT_DICTIONARY.wz,
        pd:REPORT_DICTIONARY.pd,
        kw:REPORT_DICTIONARY.kw,
        yy:REPORT_DICTIONARY.yy,
        smoke:REPORT_DICTIONARY.smoke,
        drink:REPORT_DICTIONARY.drink,
        hxjb:REPORT_DICTIONARY.hxjb,
        xxdjb:REPORT_DICTIONARY.xxdjb,
        gzjb:REPORT_DICTIONARY.gzjb,
        jzcjb:REPORT_DICTIONARY.jzcjb,
        otherjb:REPORT_DICTIONARY.otherjb,
        num:REPORT_DICTIONARY.num,
        zy:REPORT_DICTIONARY.zy,
        jisu:REPORT_DICTIONARY.jisu,
        relation:REPORT_DICTIONARY.relation,
        flagHC:REPORT_DICTIONARY.flagHC,
        flagRS:REPORT_DICTIONARY.flagRS,
        zl:[], //肿瘤信息
        itemsUnderIt: null,
        resultTips: false,   //提交审核弹窗
        zzFlagCheck: null,   //显示肺 or 肠选择框  1、肺；2、肠；3、肺+肠； null、两个都没有
        zzFaFlag: null,  //肺肠入组失败进入早诊做肺癌标志  1、是  2、否
        zzCaFlag: null,  //肺肠入组失败进入早诊做肠癌标志  1、是  2、否
        editFlag: false,  //编辑标识
      resultBody:{},   //查看返回的数据体，用于提交审核数据提交
      imgSrc:null,  //身份证图片
      logsDialog:false,
      serverName:SERVER_NAME,
      logs:[],
      id:null,    //编辑的问卷id
      checkcard:true,
      btnDisabled:false,
      hosPersonInfoPO:{
          name:null,
          sex:null,
          age:null,
          birthday:null,
          flok:null,
          flokOther:null,
          province:null,
          city:null,
          area:null,
          jgOther:null,
          idCard:null,
          tel:null,
          phone:null,
          czAddress:null,
          workAddress:null,
          headPicPath:null
        },
        hosEvaluateFormPO:{
          phone1:null,
          tel1:null,
          a01:null,
          a02:null,
          a03:null,
          a04:null,
          a05:null,
          a051:null,
          a06:null,
          a06Other:null,
          a07:null,
          a071Arr:[],
          b01:null,
          b02:null,
          b03:null,
          b04:null,
          b05:null,
          b06:null,
          b07:null,
          b08:null,
          b09:null,
          b10:null,
          c011:null,
          c012:null,
          c013:null,
          c021:null,
          c022:null,
          c023:null,
          c024:null,
          c025:null,
          c026:null,
          c027:null,
          c031:null,
          c032Arr:[],
          c0331:null,
          c0332:null,
          c0341:null,
          c0342:null,
          c0351:null,
          c0352:null,
          c0361:null,
          c0362:null,
          c041:null,
          d01:null,
          d021:null,
          d022Arr:[],
          d0221:null,
          d023:null,
          d031:null,
          d032Arr:[],
          d0321:null,
          d033:null,
          d041:null,
          d042Arr:[],
          d0421:null,
          d051:null,
          d052Arr:[],
          d0521:null,
          d053:null,
          d061:null,
          d062Arr:[],
          e01:null,
          e011:null,
          // e0111:null,
          // e0112Arr:[],
          // e01120:null,
          // e0121:null,
          // e0122Arr:[],
          // e01220:null,
          // e0131:null,
          // e0132Arr:[],
          // e01320:null,
          // e0141:null,
          // e0142Arr:[],
          // e01420:null,
          // e0151:null,
          // e0152Arr:[],
          // e01520:null,
          w01:null,
          w02:null,
          w021:null,
          w03:null,
          w031:null,
          w04:null,
          w041:null,
          w05:null,
          w051:null,
          w06:null,
          w061:null,
          w07:null,
          w08:null,
          w081:null,
          w09:null,
          w091:null,
          qianming:null,
          riqi:new Date(),
          dcybianhao:null,
          dcyqianming:sessionStorage.getItem('trueName'),//录入人,
          shybianhao:null,
          shyqianming:null,//录入人,
          // 20190620新增字段
          b011:null,
          b021:null,
          b031:null,
          b041:null,
          b071:null,
          b081:null,
          b091:null,
          c0131:null,
          c0241:null,
          c0251:null,
          c0371:null,
          c0372:null,
          hosEvaluateFormRelationPOList:[{
            relation:null,
            cancer:null,
            cancerAge:null
          }]
        },
        regionOptions: [],
        provinces:[],
        cities:[],
        areas:[],
        rules: {
          name: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.checkFont},
          ],
          sex: [
            { required: true, message: '必填', trigger: 'change' },
          ],
          birthday: [
            { required: true, message: '必填', trigger: 'change' },
          ],
          phone: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.checkPhone},
          ],
          // phone1: [
          //   { required: true, message: '必填', trigger: 'blur' },
          //   { trigger: 'blur', validator: VALIDATE.checkPhone},
          // ],
          flok: [
            { required: true, message: '必填', trigger: 'change' },
          ],
          flokOther: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          province: [
            { required: true, message: '必填', trigger: 'change' },
          ],
          city: [
            { required: true, message: '必填', trigger: 'change' },
          ],
          area: [
            { required: true, message: '必填', trigger: 'change' },
          ],
          czAddress: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          workAddress: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          idCard: [
            {required: true, message: '必填', trigger: 'blur'},
            // {validator: validateIdCord, trigger: 'change'},
            {validator: validateIdCord, trigger: 'blur'}
          ]
        },
        hosEvaluateFormPOrules:{
          phone1: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.checkPhone},
          ],
          a01:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countSG},
          ],
          a02:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.checkTZ},
          ],
          a03:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.checkYW},
          ],
          a04:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          a05:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          a051:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.checkY},
          ],
          a06:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          a06Other:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          a07:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          a071Arr:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b01:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b02:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b03:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b04:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b05:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b06:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b07:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b08:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b09:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          b10:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          c011:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          c012:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count099},
          ],
          c013:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear013, trigger: 'blur'}
          ],
          c021:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          c022:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear, trigger: 'blur'}
          ],
          c023:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count99},
          ],
          c024:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear, trigger: 'blur'}
          ],
          c025:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear, trigger: 'blur'}
          ],
          c026:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          c027:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          c031:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          c032Arr:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          c0331:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: VALIDATE.countZS, trigger: 'blur'}
          ],
          c0332:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear, trigger: 'blur'}
          ],
          c0341:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: VALIDATE.countZS, trigger: 'blur'}
          ],
          c0342:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear, trigger: 'blur'}
          ],
          c0351:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: VALIDATE.countZS, trigger: 'blur'}
          ],
          c0352:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear, trigger: 'blur'}
          ],
          c0361:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: VALIDATE.countZS, trigger: 'blur'}
          ],
          c0362:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear, trigger: 'blur'}
          ],
          c041:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d01:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d021:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d022Arr:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d0221:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          d023:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d031:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d032Arr:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d0321:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          d033:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d041:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d042Arr:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d0421:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          d051:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d052Arr:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d0521:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          d053:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d061:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          d062Arr:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          e01:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          e011:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          w01:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countZS},
          ],
          w02:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          w021:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          w03:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          w031:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count99Float},
          ],
          w04:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          w041:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear, trigger: 'blur'}
          ],
          w05:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          w051:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count99},
          ],
          w06:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          w061:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count99},
          ],
          w07:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          w08:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          w081:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count20},
          ],
          w09:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          w091:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count20},
          ],          
          qianming:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          riqi:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          dcybianhao:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          dcyqianming:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          shybianhao:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          shyqianming:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          //20190620新增
          b011:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100},
          ],
          b021:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100},
          ],
          b031:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100},
          ],
          b041:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100},
          ],
          b071:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100},
          ],
          b081:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100},
          ],
          b091:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100},
          ],
          c0131:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit011},
          ],
          c0241:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit011},
          ],
          c0251:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit011},
          ],
          c0371:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: VALIDATE.countZS, trigger: 'blur'}
          ],
          c0372:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: validateYear, trigger: 'blur'}
          ],
          relation:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          cancer:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          cancerAge:[
            { required: true, message: '必填', trigger: 'blur' },
            {validator: VALIDATE.count99, trigger: 'blur'}
          ],
        }
      };
    },
    components:{
      errorTips
    },
    watch: {
      'hosPersonInfoPO.idCard'(newValue, oldValue) {
        if(newValue){
          this.hosPersonInfoPO.idCard = newValue.toLocaleUpperCase();
        }
      }
    },
    mounted(){
      this.getCancerType();
      this.getAddress('provinces',1);
      this.itemsUnderIt = sessionStorage.getItem('itemsUnderIt')
      // 获取肺肠表单带过来的基本信息
      if(localStorage.getItem('ldctFormData')){
        const {userName, idCard, birth, sex, phone, age} = JSON.parse(localStorage.getItem('ldctFormData'));
        this.hosPersonInfoPO.name = userName
        this.hosPersonInfoPO.sex = String(sex)
        this.hosPersonInfoPO.birthday = birth
        this.hosPersonInfoPO.idCard = idCard
        this.hosPersonInfoPO.phone = phone
        this.hosPersonInfoPO.age = age
      }
      // if(JSON.stringify(this.$route.query)!='{}'){
      //   this.queryEvaluate(this.$route.query.id);
      // }
      if(this.$route.query.id){
        this.queryEvaluate(this.$route.query.id);
      }
      if(this.id){
        this.queryEvaluate(this.id);
      }
      // 浏览器关闭清空ldctFormData
      window.addEventListener('beforeunload', e => {
        window.localStorage.removeItem('ldctFormData')
      });
    },
    beforeDestroy() {
      localStorage.removeItem('ldctFormData');
    },
    methods: {
      auto(){
        this.$jsonp('http://127.0.0.1:2341?haspic=0').then(res => {
        if(res.isError=='0'){
            this.hosPersonInfoPO.name=res.CardMsg.Name;
            this.hosPersonInfoPO.idCard=res.CardMsg.IDCardNo;
            this.getBirthday1(res.CardMsg.IDCardNo)
            this.hosPersonInfoPO.birthday=new Date(res.CardMsg.Born.replace('年','-').replace('月','-').replace('日',''))
            this.hosPersonInfoPO.czAddress=res.CardMsg.Address;
            this.hosPersonInfoPO.flok=Number(res.CardMsg.NationCode);
            let PhotoFileName=res.CardMsg.PhotoFileName
            this.$jsonp(res.CardMsg.PhotoFileName+'?callback=img').then(res =>{
              if(res.idTxt!='none'){
                this.imgSrc=res.idTxt
              }
            })
            if(res.CardMsg.NationCode=='8'){
              this.hosPersonInfoPO.flokOther=res.CardMsg.Nation+'族'
            }
            if(res.CardMsg.Sex=='男'){
              this.hosPersonInfoPO.sex='1';
            }else{
              this.hosPersonInfoPO.sex='2';
            }
            this.$refs['hosPersonInfoPO'].validateField('idCard')  //校验身份证是否符合规则
            this.checkIdcard()     //校验身份证是否重复入组
          }else{
            this.$message({
              type:'error',
              message:'未能识别！'
            })
          }
        }).catch(err => {
        // 　　console.log(err)
        })
      },
      openLogs(){
        this.$axios_http({
            url: '/base/measurement/find/check/operate/record/'+this.$route.query.surverId,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              this.logsDialog=true;
              this.logs=res.data.result;
              this.logs.filter(item => {
                if(typeof new Date(item.operateTime)=='object'){
                item.operateTime=dateFormater.timeFormater(new Date(item.operateTime))
              }
              })
            }
          })
      },
      //获取地址
      getAddress(type,id){
         this.$axios_http({
            url: '/base/measurement/resource/getResource/'+id,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              let options=res.data.result;
              if(type=='provinces' && id==1){   //默认显示省
                this.provinces=options;
              }else if(type=='provinces' && id!=1){   //加载市
                this.cities=options;
              }else if(type=='cities'){
                this.areas=options;
              }
              
            }
          })
      },
      // 处理多选
      handleProvinceChange(val){
        this.hosPersonInfoPO.city=null;
        this.hosPersonInfoPO.area=null;
        this.getAddress('provinces',val);
      },
      handleCityChange(val){
        this.hosPersonInfoPO.area=null;
        this.getAddress('cities',val);
      },
      submitForm(type,flag) {
        let formData={
          hosPersonInfoPO:{},
          hosEvaluateFormPO:{},
          hosEvaluateInfoPO:{},
        };
        
        Object.assign(formData.hosPersonInfoPO,this.hosPersonInfoPO);
        Object.assign(formData.hosEvaluateFormPO,this.hosEvaluateFormPO);
        formData.submitType=type;
        if(flag=='edit'){
          if(this.itemsUnderIt=='2'){
            formData.zzCaFlag = this.resultBody.zzCaFlag ? 1 : 2
            formData.zzFaFlag = this.resultBody.zzFaFlag ? 1 : 2
          }else{
            formData.zzCaFlag = this.resultBody.zzCaFlag
            formData.zzFaFlag = this.resultBody.zzFaFlag
          }
          formData.hosEvaluateInfoPO.id=this.id;
        }else{
          delete formData.hosEvaluateInfoPO;
        }
          if(type=="0"){
            // 身份证必填
          if(!this.hosPersonInfoPO.idCard){
            this.$message({
                  type: 'error',
                  message: '请至少填写身份证号!'
                });
                return;
          }
            //保存草稿箱
            if(this.checkcard){
              if(!this.hosPersonInfoPO.headPicPath && this.imgSrc && this.imgSrc!='none'){
                this.upload().then( res => {
                  if(res.data.status=="SUCCESS"){
                    formData.hosPersonInfoPO.headPicPath=res.data.result;
                    this.addEvaluate(formData,flag,type);
                  }
                  }).catch( res => {

                  })
            }else{
              this.addEvaluate(formData,flag,type);
            }
              
            }
          }else if(type=="1"){
            // 校验是否全部通过
            let validd = true
            this.$refs.hosPersonInfoPO.validate((valid) => {
              if (!valid){
                validd = false
                this.$message({
                  message: '您有校验未通过项',
                  type: 'error'
                });
                return false;
              }
            })
            this.$refs.hosEvaluateFormPO.validate((valid) => {
              if (!valid){
                validd = false
                this.$message({
                  message: '您有校验未通过项',
                  type: 'error'
                });
                return false;
              }
            })

            //20190620增加“饮食习惯”B1—B10的所有占比量相加和不超过100%
            if(Number(this.hosEvaluateFormPO.b011)+
              Number(this.hosEvaluateFormPO.b021)+
              Number(this.hosEvaluateFormPO.b031)+
              Number(this.hosEvaluateFormPO.b041)+
              Number(this.hosEvaluateFormPO.b071)+
              Number(this.hosEvaluateFormPO.b081)+
              Number(this.hosEvaluateFormPO.b091)>100){
                validd = false
                this.$message({
                  message: 'B1+B2+B3+B4+B7+B8+B9的占比量相加和不超过100%',
                  type: 'error'
                });
                return false;
              }
            //提交审核
            if (validd) {
              this.btnDisabled=true;
               if(!this.hosPersonInfoPO.headPicPath  && this.imgSrc && this.imgSrc!='none'){
                this.upload().then( res => {
                  if(res.data.status=="SUCCESS"){
                    formData.hosPersonInfoPO.headPicPath=res.data.result;
                    this.hosPersonInfoPO.headPicPath = res.data.result;
                    // 只有首次录入表单提交时，提示录入FIT、Hp、HBsAg，修改不提示
                    if(flag === 'add') {
                      if(this.itemsUnderIt!='2') {
                        this.findFa().then(({data:{result,status}})=>{
                          if(status === 'SUCCESS') {
                              this.zzFlagCheck = result.flag
                          }
                        })
                      }
                      this.resultTips = true;                      
                    }else{
                      // 不满足肺肠项目，进入早诊问卷，先保存草稿，再提交问卷
                      if(this.itemsUnderIt!='2' && this.resultBody.zzCaFlag==null && this.resultBody.zzFaFlag==null) {
                        this.findFa().then(({data:{result,status}})=>{
                          if(status === 'SUCCESS') {
                              this.zzFlagCheck = result.flag
                          }
                        })
                        this.resultTips = true; 
                        this.editFlag = true;
                      }else{
                        // 编辑接口：1、早诊保存草稿，再提交问卷，要弹弹窗。2、早诊+ 肺肠早诊，审核不通过再编辑，不需要弹窗
                        if(this.itemsUnderIt=='2' && this.resultBody.zzCaFlag==null && this.resultBody.zzFaFlag==null){
                          this.resultTips = true; 
                          this.editFlag = true;
                        }else{
                          this.addEvaluate(formData,flag,type);
                        }
                      }
                    }
                  }
                  }).catch( res => {

                  })
            }else{
              // 只有首次录入表单提交时，提示录入FIT、Hp、HBsAg，修改不提示
              if(flag === 'add') {
                if(this.itemsUnderIt!='2') {
                  this.findFa().then(({data:{result,status}})=>{
                    if(status === 'SUCCESS') {
                        this.zzFlagCheck = result.flag
                    }
                  })
                }
                this.resultTips = true; 
              }else{
                // 不满足肺肠项目，进入早诊问卷，先保存草稿，再提交问卷
                if(this.itemsUnderIt!='2' && this.resultBody.zzCaFlag==null && this.resultBody.zzFaFlag==null) {
                  this.findFa().then(({data:{result,status}})=>{
                    if(status === 'SUCCESS') {
                        this.zzFlagCheck = result.flag
                    }
                  })
                  this.resultTips = true; 
                  this.editFlag = true;
                }else{
                   // 编辑接口：1、早诊保存草稿，再提交问卷，要弹弹窗。2、早诊+ 肺肠早诊，审核不通过再编辑，不需要弹窗
                  if(this.itemsUnderIt=='2' && this.resultBody.zzCaFlag==null && this.resultBody.zzFaFlag==null){
                    this.resultTips = true; 
                    this.editFlag = true;
                  }else{
                    this.addEvaluate(formData,flag,type);
                  }
                }
              }
            }
            }
          }
      },
      // 检查身份证号是否已经存在
      checkIdcard(){
        this.$refs['hosPersonInfoPO'].validateField('idCard',(errorMessage)=>{
          if(this.hosPersonInfoPO.idCard && errorMessage==''){
             this.$axios_http({
              url: '/base/measurement/get/evaluateIdCardStatus',
              data: {
                idCard:this.hosPersonInfoPO.idCard,
                id:this.$route.query.personId || null
              },
              vueObj: this
            }).then((res) => {
              if(res.data.status=="SUCCESS"){
                this.checkcard=true;
                }else if(res.data.code=='EVALUATE_VERIFICATION_IDCARD_ERROR'){
                  // this.checkcard=false;
                  // 提示入组失败
                  this.$confirm('该受试者已经入组，是否重新录入新的受试者信息？', '提示', {
                    confirmButtonText: '确定',
                    // cancelButtonText: '取消',
                    showCancelButton:false,
                    showClose:false,
                    type: 'warning'
                  }).then(() => {
                    this.imgSrc = null
                    this.$refs['hosPersonInfoPO'].resetFields()     
                    this.$refs['hosEvaluateFormPO'].resetFields()
                  }).catch(() => {
                    this.imgSrc = null
                    this.$refs['hosPersonInfoPO'].resetFields()     
                    this.$refs['hosEvaluateFormPO'].resetFields()    
                  });
                }else if(res.data.code=='IDCARD_BLACKLIST_ERRO'){
                  this.hosPersonInfoPO.idCard = null
                }else if(res.data.code=='IDCARD_YEAR_ERRO'){
                  this.validateIdCard()
                }
            })
          }
        })
      },
            
      //上传身份证图片
      upload(){ 
        if(!this.imgSrc || this.imgSrc==='none'){
          return;
        }
        //base64 转 blob 
        let $Blob= this.getBlobBydataURI(this.imgSrc,'image/png'); 
        let formData = new FormData(); 
        formData.append("file", $Blob ,"file_"+Date.parse(new Date())+".png"); 
        let config = {
            withCredentials:true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        return axios.post(SERVER_NAME+"/base/file/uploadfile", formData, config)
      },
      // 提交表单
      addEvaluate(formData,flag,type){
        let _url="";
        if(flag=="add"){
          _url='/base/measurement/add/evaluate';
        }else if(flag=="edit"){
          _url='/base/measurement/edit/evaluate'
        }
        this.$axios_http({
          url: _url,
          data: formData,
          vueObj: this
        }).then((res) => {
          this.btnDisabled=false;
          if(res.data.status=="SUCCESS"){
              if(type=='0'){
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                this.id=res.data.result.id;
              }
              if(type=='1'){
                this.$router.push('/evaluation/index');
                // 只有首次录入表单提交时，提示录入FIT、Hp、HBsAg，修改不提示
                // if(this.$route.query.resource === 0){
                //   this.$router.push('/evaluation/index');
                // }else{
                //   // this.openDialogTips();
                // }
              }
            }
        })
      },
      // 新增保存表单
      next() {
        let _url=''
        let formData={
            hosPersonInfoPO:{},
            hosEvaluateFormPO:{},
            hosEvaluateInfoPO: {}
          };
          Object.assign(formData.hosPersonInfoPO,this.hosPersonInfoPO);
          Object.assign(formData.hosEvaluateFormPO,this.hosEvaluateFormPO);
          formData.submitType=1;
          // 不满足肺肠是，跳至早诊，是否勾选了“特殊情况需要增加肺癌筛查”
          formData.zzFaFlag = this.zzFaFlag ? 1 : 2
          formData.zzCaFlag = this.zzCaFlag ? 1 : 2
          if(this.hosPersonInfoPO.headPicPath || this.imgSrc){
              formData.hosPersonInfoPO.headPicPath = this.imgSrc?this.imgSrc:this.hosPersonInfoPO.headPicPath;
        }
        if(this.editFlag){
          // 先保存草稿再提交审核
          _url='/base/measurement/edit/evaluate'
          formData.hosEvaluateInfoPO.id=this.id;
        }else{
          // 新增提交审核
          _url='/base/measurement/add/evaluate'
          delete formData.hosEvaluateInfoPO
        }
        this.$axios_http({
          url: _url,
          data: formData,
          vueObj: this
        }).then((res) => {
          this.btnDisabled=false;
          if(res.data.status=="SUCCESS"){
              this.$router.push('/evaluation/index');
            }
        })
      },
      // 关闭弹窗
      closeDialog() {},
      // 判断提交表单后是录入3个结果还是2个结果
      // openDialogTips(){
      //   let con = null;
      //   if(sessionStorage.getItem('itemsUnderIt') === '1,2' || sessionStorage.getItem('itemsUnderIt') === '2,1') {
      //     con = '新的评估方案需要在“结果录入”的相应菜单中录入Hp、HBsAg 2项结果，才能进行评估审核操作；为避免无法进行评估，请及时录入结果。';
      //   } else if(sessionStorage.getItem('itemsUnderIt') === '2') {
      //     con = '新的评估方案需要在“结果录入”的相应菜单中录入FIT、Hp、HBsAg 3项结果，才能进行评估审核操作；为避免无法进行评估，请及时录入结果。';
      //   }
      //   this.$confirm(con, '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     showClose: false,
      //     showCancelButton:false,
      //     closeOnClickModal:false,
      //     type: 'warning'
      //   }).then(() => {
      //     this.$router.push('/evaluation/index');
      //   }).catch(() => {
                   
      //   });
      // },
      getBirthday1(value) {
        var len = value.length;
        if (len == '15') {
          var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
          var arr_data = value.match(re_fifteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = '19' + year + '/' + month + '/' + day;
          this.hosPersonInfoPO.birthday = birthday
        }
        if (len == '18') {
          var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
          var arr_data = value.match(re_eighteen);
          var year = arr_data[2];
          var month = arr_data[3];
          var day = arr_data[4];
          var birthday = year + '-' + month + '-' + day;
          this.hosPersonInfoPO.birthday = birthday
        }
        let birthDate = new Date(this.hosPersonInfoPO.birthday.replace(/-/g,'/'));
        let nowDate = new Date();
        let age = nowDate.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDate.getMonth() < birthDate.getMonth() || (nowDate.getMonth() == birthDate.getMonth() && nowDate.getDate() < birthDate.getDate())) {
          age=age-1;
        }
        this.hosPersonInfoPO.age = age;
      },
      getSex(value) {
        var len = value.length;
        if (len == '15') {
          var seqNo = value.substr(12, 3);
        }
        if (len == '18') {
          var seqNo = value.substr(14, 3);
        }
        if (seqNo % 2 == 0) {
          var sex = "2";
        }
        if (seqNo % 2 == 1) {
          var sex = "1";
        }
        this.hosPersonInfoPO.sex = sex
      },
      //查询问卷
      queryEvaluate(id){
        this.$axios_http({
          url: '/base/measurement/find/evaluate/'+id,
          data: {},
          vueObj: this
        }).then((res) => {
          if(res.data.status=="SUCCESS"){
            this.id=res.data.result.id;
            this.imgSrc=res.data.result.hosPersonInfoPO.headPicPath?SERVER_NAME+'/base/file/downfile?filePath='+res.data.result.hosPersonInfoPO.headPicPath:null
            let _hosPersonInfoPO=res.data.result.hosPersonInfoPO;
            let _hosEvaluateFormPO=res.data.result.hosEvaluateFormPO;
            if(_hosPersonInfoPO.province){
              this.handleProvinceChange(_hosPersonInfoPO.province);
            }
            if(_hosPersonInfoPO.city){
              this.handleCityChange(_hosPersonInfoPO.city);
            }
            if(_hosEvaluateFormPO.hosEvaluateFormRelationPOList.length==0){
              _hosEvaluateFormPO.hosEvaluateFormRelationPOList=[{
                    relation:null,
                    cancer:null,
                    cancerAge:null
                  }]
            }
            _hosPersonInfoPO.sex=_hosPersonInfoPO.sex+''
            this.hosPersonInfoPO=_hosPersonInfoPO;
            this.hosEvaluateFormPO=_hosEvaluateFormPO;
            this.resultBody=res.data.result;
          }
        })
      },
      handleClose(done){
        done();
      },
      // 提交审核
      checkEvaluate(checkStatus){
        this.btnDisabled=true;
        this.resultBody.checkStatus=checkStatus;
        if (this.resultBody.hosPersonInfoPO.birthday) {
          this.resultBody.hosPersonInfoPO.birthday=new Date(this.resultBody.hosPersonInfoPO.birthday).getTime()
        }
        this.$axios_http({
          url: '/base/measurement/check/evaluate',
          data: this.resultBody,
          vueObj: this
        }).then((res) => {
          this.btnDisabled=false;
          if(res.data.status=="SUCCESS"){
             this.$message({
                type: 'success',
                message: '审核完成!'
              });
              this.$router.go(-1);
          }
        })
      },
      //根据条件清空
      /**
       * val-题的值
       * data--关联题
       * type--关联题的类型 radio,input,checkbox,select
       */
      clearItem(val,data,type){
        if(type=='checkbox'){
          if(val==0){
            for(let item in data){
                this.hosEvaluateFormPO[data[item]] = []
            }
          }
        }else if(type=='radio' || type=='input'){
          if(val==99){
            for(let item of data){
                this.hosEvaluateFormPO[item] = null
            }
          }else if(val==0){
              data.map((item,key)=>{
              if(item.indexOf('Arr')>-1){
                this.hosEvaluateFormPO[data[key]] = []
              }else{
                this.hosEvaluateFormPO[data[key]] = null
              }
            });
          }else if(typeof val === 'object' && !val.includes(99)){
            for(let item of data){
                this.hosEvaluateFormPO[item] = null
            }
          }
        }else if(type == 'other'){
          // 亲属
          if(val===1){
            data.map((item,key)=>{
              if(item.indexOf('Arr')>-1){
                this.hosEvaluateFormPO[data[key]] = []
              }else{
                this.hosEvaluateFormPO[data[key]] = null
              }
            });
          }
          if(val===2){
            let $data = data.slice(0,9);
            $data.map((item,key)=>{
              if(item.indexOf('Arr')>-1){
                this.hosEvaluateFormPO[data[key]] = []
              }else{
                this.hosEvaluateFormPO[data[key]] = null
              }
            });
          }
          if(val===3){
            let $data = data.slice(0,6);
            $data.map((item,key)=>{
              if(item.indexOf('Arr')>-1){
                this.hosEvaluateFormPO[data[key]] = []
              }else{
                this.hosEvaluateFormPO[data[key]] = null
              }
            });
          }
          if(val===4){
            let $data = data.slice(0,3);
            $data.map((item,key)=>{
              if(item.indexOf('Arr')>-1){
                this.hosEvaluateFormPO[data[key]] = []
              }else{
                this.hosEvaluateFormPO[data[key]] = null
              }
            });
          }
        }
      },
      clearSmoke(val) {
        if(val===0){
          this.hosEvaluateFormPO.c022 = null
          this.hosEvaluateFormPO.c023 = null
          this.hosEvaluateFormPO.c024 = null
          this.hosEvaluateFormPO.c0241 = null
          this.hosEvaluateFormPO.c025 = null
          this.hosEvaluateFormPO.c0251 = null
        }
        if(val===1){
          this.hosEvaluateFormPO.c025 = null
          this.hosEvaluateFormPO.c0251 = null
          this.hosEvaluateFormPO.c026 = null
          this.hosEvaluateFormPO.c027 = null
        }
        if(val===2){
          // this.hosEvaluateFormPO.c023 = null
          // this.hosEvaluateFormPO.c024 = null
          this.hosEvaluateFormPO.c026 = null
          this.hosEvaluateFormPO.c027 = null
        }
        
      },
      clearC032Arr(val){
        if(!val.includes(1)){
          this.hosEvaluateFormPO.c0331 = null
          this.hosEvaluateFormPO.c0332 = null
        }
        if(!val.includes(2)){
          this.hosEvaluateFormPO.c0341 = null
          this.hosEvaluateFormPO.c0342 = null
        }
        if(!val.includes(3)){
          this.hosEvaluateFormPO.c0351 = null
          this.hosEvaluateFormPO.c0352 = null
        }
        if(!val.includes(4)){
          this.hosEvaluateFormPO.c0361 = null
          this.hosEvaluateFormPO.c0362 = null
        }
        if(!val.includes(5)){
          this.hosEvaluateFormPO.c0371 = null
          this.hosEvaluateFormPO.c0372 = null
        }
      },
      clearD022Arr(val){
        if(!val.includes(99)){
          this.hosEvaluateFormPO.d0221 = null
        }
        if(!val.includes(4)){
          this.hosEvaluateFormPO.d023 = null
        }
      },
      clearSex(val,data){
        if(val==1){
          data.map((item,key)=>{
            this.hosEvaluateFormPO[data[key]] = null
          });
        }
      },
      
      // 基本信息民族不选其他情况其他输入框
      flokChange(){
        if(this.hosPersonInfoPO.flok!=8){
          this.hosPersonInfoPO.flokOther=null
        }
      },

      d01Change(val) {
        if(val===1) {
          this.$confirm('该受试者曾患有癌症，不符合项目参与条件。', '提示', {
                confirmButtonText: '确定',
                showCancelButton:false,
                showClose:false,
                type: 'warning'
              }).then(() => {

              }).catch(() => {
                         
              });
        }
      },

      // 身份证校验弹窗
      validateIdCard(){
        this.$confirm('该受试者年龄不满足入组条件，是否继续录入新的受试者信息？', '提示', {
                confirmButtonText: '确定',
                // cancelButtonText: '取消',
                showCancelButton:false,
                showClose:false,
                type: 'warning'
              }).then(() => {
                this.imgSrc = null
                this.$refs['hosPersonInfoPO'].resetFields()     
                // this.$refs['hosEvaluateFormPO'].resetFields()
              }).catch(() => {
                this.imgSrc = null
                this.$refs['hosPersonInfoPO'].resetFields()         
              });
      },
      // 查询肿瘤信息
      getCancerType() {
        this.$axios_http({
          url: "/base/ct/getDataName/zl",
          data: {},
          vueObj: this
        }).then(res => {
          if (res.data.status == "SUCCESS") {
            this.zl = res.data.result;
          }
        });
      },
      addRelationPOList() {
        this.hosEvaluateFormPO.hosEvaluateFormRelationPOList.push({
            relation:null,
            cancer:null,
            cancerAge:null
          })
      },
      delRelationPOList(index) {
        this.hosEvaluateFormPO.hosEvaluateFormRelationPOList.splice(index,1)
      },
      // 查询是否满足肺肠100例
      findFa() {
          return this.$axios_http({
              url: "/base/measurement/find100Fa",
              method: 'post',
              data: {},
              vueObj: this
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
    // border-bottom:1px solid #f6f6f6;
  }

  .title{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .red{
    color: red;
  }
  .margin-left{
    margin-left: 130px;
  }
  .span-wrap{
    white-space: nowrap;
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
.el-form-item .el-input.shortInput{
  width:100px;
}
.other .el-form-item{
  // float: left;
  // min-width: 290px;
}
.el-form-item .lengthInput{
  width: 350px;
}
h2{
  background: #F7FAFC;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #333333;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 48px;
  padding-left: 20px;
  // border-top: 1px solid #f6f6f6;
  // border-bottom: 1px solid #f6f6f6;
  margin-top: 10px;
}
.smallTit{
  margin-top: 10px;
}
.smallTit .el-form-item__label{
  font-size: 14px;
  text-indent: 15px;
}
.blockTit .el-form-item__label,.blockTableTit .el-form-item__label{
  display: block;
  width: 100%;
  text-align: left;
  // color: #333;
}
.blockTit .el-radio-group{
  padding-left: 45px;
}
.ejTit{
  margin-top: 15px;
  font-size: 14px;
  padding-left:15px;
}
table{
  border-collapse:collapse;
  margin-top: 15px;
  th{
    border:1px solid #f6f6f6;
    font-weight: normal;
    height: 40px;
    line-height: 40px;
    background: #F7FAFC;
  }
  td{
    border:1px solid #f6f6f6;
    padding:5px 10px;
  }
  .el-checkbox{
    margin-right: 30px;
  }
  .el-checkbox+.el-checkbox{
    margin-left:0 ;
  }
}
.el-radio-group .el-radio{
  margin-left: 0;
  margin-right: 30px;
  // margin-top: 10px;
}
.logs{
  position: fixed;
  right: 0px;
  top: 160px;
  background: #409eff;
  color: #fff;
  width: 100px;
  height: 40px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  z-index: 2;
}
.logs:hover{
  background: #66b1ff;
}
.tips p{
  border-bottom:1px dashed #f6f6f6;
  line-height: 36px;
  padding-left: 20px;
  font-size: 14px;
  word-break:break-all;
}
.idCardBlock{
  padding-left: 180px;
  box-sizing:border-box;
  position: relative;
  z-index: 2;
}
.idCardBlock .idCardImg{
  position: absolute;
  top:40px;
  left:18px;
  text-align:center;
}
.mini.el-input.el-input--mini{
  width: 100px;
}
.demo-hosEvaluateFormPO{
  padding-bottom: 20px;
}
</style>
