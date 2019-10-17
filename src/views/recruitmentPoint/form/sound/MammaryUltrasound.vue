<template>
  <div class="mammary-sound">
    <div class="reportBox">
      <cancer-widget>
       <h1>乳腺超声结果记录表</h1>
        <el-form :model="personDetail" label-width="130px" ref="hosPersonInfoPO" :inline="true"  class="demo-hosPersonInfoPO">
          <h2>基本信息</h2>
          <el-row>
            <el-col :span="8">
              <el-form-item label="SID/问卷ID：" prop="name">
                {{personDetail.surverId}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="筛查ID：" prop="sex">
                {{$route.query.screeningId}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检查日期:" prop="checkDate">
                <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp"
                    :clearable="false"
                    size="mini"
                    v-model="form.checkDate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="检查医院：" prop="sex">
                {{personDetail.dept}}
              </el-form-item>
            </el-col>
           <el-col :span="8">
              <el-form-item label="姓名：" prop="name">
                {{personDetail.name}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：" prop="sex">
                {{personDetail.sex | sexFilter}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="年龄：" prop="birthday">
                {{personDetail.age}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号：" prop="name">
                {{personDetail.idCard}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form :model="form" ref="form"  :inline="true" :rules="formRules">
          <h2>乳腺体形态</h2>
          <!-- <el-row> -->
            <el-row>
              <el-form-item label="1.双侧乳腺腺体形态" prop="item11">
              <el-radio-group v-model="form.item11">
                  <el-radio
                    v-for="item in item11"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="2.左侧乳腺实质厚度（cm）" prop="item12">
                <el-input v-model.trim="form.item12" size="mini" placeholder="请输入左侧乳腺实质厚度：" clearable @blur="toFixedTwo('item12');computateRatio('item12','item13','item14')"></el-input>
              </el-form-item>
               <el-form-item label="左侧乳腺厚度（cm）" prop="item13" class="cancer-margin--l20">
                <el-input v-model.trim="form.item13" size="mini" placeholder="请输入左侧乳腺厚度：" clearable @blur="toFixedTwo('item13');computateRatio('item12','item13','item14')"></el-input>
              </el-form-item>
              <el-form-item label="左侧乳腺比值" prop="item14" class="cancer-margin--l20">
                <el-radio-group v-model="form.item14" @change="selectType">
                  <el-radio
                    v-for="item in item14"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>  
              <el-form-item label="3.右侧乳腺实质厚度（cm）" prop="item15">
                <el-input v-model.trim="form.item15" size="mini" placeholder="请输入右侧乳腺实质厚度：" clearable @blur="toFixedTwo('item15');computateRatio('item15','item16','item17')"></el-input>
              </el-form-item>
              <el-form-item label="右侧乳腺厚度（cm）" prop="item16" class="cancer-margin--l20">
                <el-input v-model.trim="form.item16" size="mini" placeholder="请输入右侧乳腺厚度：" clearable @blur="toFixedTwo('item16');computateRatio('item15','item16','item17')"></el-input>
              </el-form-item>
              <el-form-item label="右侧乳腺比值" prop="item17" class="cancer-margin--l20">
                <el-radio-group v-model="form.item17" @change="selectType">
                  <el-radio
                    v-for="item in item17"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>  
              <el-form-item label="4.腺体结构" prop="item18">
                <el-radio-group v-model="form.item18" class="redio18">
                  <el-radio
                    v-for="item in item18"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
          <!-- </el-row> -->
        <!--占位情况-->
        <h2>占位情况</h2>
        <el-row>
          <el-form-item label="1.是否探及？" prop="item21">
            <el-radio-group v-model="form.item21" @change="changeItem21">
              <el-radio
                v-for="item in item21"
                :key="item.key"
                :label="item.key">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row v-if="form.item21==1">
          <el-form-item label="1.1探及占位个数" prop="item22" class="cancer-margin--l20">
            <el-input v-model.trim="form.item22" size="mini" placeholder="自动计算占位个数，无需填写" readonly clearable @change="tuberChange(form.item22)"></el-input>
          </el-form-item>
          <el-form-item v-if="form.item21==1" label="左个数" prop="item23" class="cancer-margin--l20">
            <el-input v-model.trim="form.item23" size="mini" placeholder="请输入左个数：" clearable @blur="sum"></el-input>
          </el-form-item>
          <el-form-item v-if="form.item21==1" label="右个数" prop="item24" class="cancer-margin--l20">
            <el-input v-model.trim="form.item24" size="mini" placeholder="请输入右个数：" clearable @blur="sum"></el-input>
          </el-form-item>
        </el-row>
        
        <!--乳腺超声结果乳腺分型与超声诊断表占位表-->
        <el-row v-for="(x,index) in form.hosRxcsResultOccupyInfoPOS" :key="index" v-if="form.item21==1">
          <h2>占位{{index+1}}情况</h2>
          <div class="add-tuber">
            <el-button @click="pushHosGaPerch(1)"  type="text">添加占位</el-button>
            <el-button @click="deleteTuber(index)" type="text" :disabled="index<0">删除占位</el-button>
          </div>
          <el-form :inline="true" :model="x" :ref="'hosRxcsInfo'+index" :rules="hosRxcshRules">
            <el-row>
              <el-form-item label="1.占位位置：" prop="item1">
                <el-radio-group v-model="x.item1">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item1"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="2.占位象限情况:" prop="item2">
                <el-radio-group v-model="x.item2">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item2"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="x.item2==1">
              <el-form-item label="2.1.外上象限点位:" prop="item21">
                <el-input v-model.trim="x.item21"  size="mini"  clearable></el-input>
              </el-form-item>
            </el-row>
            <el-row v-if="x.item2==2">
              <el-form-item label="2.1.内上象限点位:" prop="item21" >
                <el-input v-model.trim="x.item21"  size="mini"  clearable></el-input>
              </el-form-item>
            </el-row>
             <el-row  v-if="x.item2==3">
              <el-form-item label="2.1.外下象限点位:" prop="item21">
                <el-input v-model.trim="x.item21"  size="mini"  clearable></el-input>
              </el-form-item>
            </el-row>
             <el-row  v-if="x.item2==4">
              <el-form-item label="2.1.内下象限点位:" prop="item21">
                <el-input v-model.trim="x.item21"  size="mini"  clearable></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="3.占位位置距乳头距离（cm）:" prop="item3">
                <el-input v-model.trim="x.item3" v-numberInt:2="x.item3" size="mini"  clearable></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="4.占位与胸大肌关系:" prop="item4">
                <el-radio-group v-model="x.item4">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item4"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="5.占位与皮肤关系：" prop="item5">
                <el-radio-group v-model="x.item5">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item5"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <span class="spanTit">6.占位大小，</span>
              <el-form-item label="长（cm）：" prop="item6">
                <el-input v-model.trim="x.item6" size="mini" clearable></el-input>
              </el-form-item>
              <el-form-item label="宽（cm）：" prop="item61">
                <el-input v-model.trim="x.item61" size="mini" clearable></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="7.占位形态：" prop="item7">
                <el-radio-group v-model="x.item7">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item7"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="8.占位边界：" prop="item8">
                <el-radio-group v-model="x.item8">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item8"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="9.内回声：" prop="item9">
                <el-radio-group v-model="x.item9" @change="item9Change(x.item9,index)">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item9"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="form.item21==1&&x.item9==2||x.item9==3||x.item9==4">
              <el-form-item label="9.1占位内中回声均匀：" prop="item91" class="cancer-margin--l20">
                <el-radio-group v-model="x.item91">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item91"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="form.item21==1&&x.item9==2||x.item9==3||x.item9==4">
              <el-form-item label="9.2占位内回声中强回声光点：" prop="item92" class="cancer-margin--l20">
                <el-radio-group v-model="x.item92">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item92"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="form.item21==1&&x.item9==2||x.item9==3||x.item9==4">
              <el-form-item label="9.3占位内回声中强回声光团：" prop="item93" class="cancer-margin--l20">
                <el-radio-group v-model="x.item93">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item93"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="form.item21==1&&x.item9==2||x.item9==3||x.item9==4">
              <el-form-item label="9.4占位内回声中无回声区：" prop="item94" class="cancer-margin--l20">
                <el-radio-group v-model="x.item94">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item94"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="form.item21==1&&x.item9==2||x.item9==3||x.item9==4">
              <el-form-item label="9.5占位内回声中结节或肿物后方回声：" prop="item95" class="cancer-margin--l20">
                <el-radio-group v-model="x.item95">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item95"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="form.item21==1&&x.item9==2||x.item9==3||x.item9==4">
              <el-form-item label="9.6占位内回声中侧方声影：" prop="item96" class="cancer-margin--l20">
                <el-radio-group v-model="x.item96">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item96"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="form.item21==1 && x.item9!=1">
              <el-form-item label="10.有无CDFI血流：血流信号？：" prop="item10">
                <el-radio-group v-model="x.item10">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item10"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="form.item21==1 && x.item9!=1 && x.item10==2">
              <el-form-item label="10.1 血流信息是否丰富？：" prop="item101" class="cancer-margin--l20">
                <el-radio-group v-model="x.item101">
                  <el-radio
                    v-for="item in OccupyInfoPOS.item101"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row v-if="form.item21==1 && x.item9!=1 && x.item10==2">
              <el-form-item label="10.2CDFI血流：RI值是多少？：" prop="item102" class="cancer-margin--l20">
                <el-input v-model.trim="x.item102" v-numberInt:2="x.item102" size="mini"  clearable></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-row>
        <!--腋下肿大淋巴结 -->
        <h2>腋下肿大淋巴结</h2>
          <el-row>
            <el-form-item label="1.腋下肿大淋巴结是否探及？" prop="item31">
              <el-radio-group v-model="form.item31" @change="clearItem(form.item31,['item32','item33','item34','item35','item36','item37','item38','item39','item310','item3101','item311'],1)">
                <el-radio
                  v-for="item in item31"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row v-if="form.item31==1">
            <el-form-item label="1.1腋下肿大淋巴结的个数？" prop="item32" class="cancer-margin--l20">
              <el-input v-model.trim="form.item32" size="mini" placeholder="请输入腋下肿大淋巴结的个数：" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="form.item31==1" label="左个数" prop="item33" class="cancer-margin--l20">
              <el-input v-model.trim="form.item33" size="mini" placeholder="请输入左个数：" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="form.item31==1" label="右个数" prop="item34" class="cancer-margin--l20">
              <el-input v-model.trim="form.item34" size="mini" placeholder="请输入右个数：" clearable></el-input>
            </el-form-item>
          </el-row>
          <div class="errorTip" v-if="form.item31==1">{{errortext}}</div>
          <el-row v-if="form.item31==1" style="margin-left:2px;" class="clearfix">
              <span style="color:#333" class="spanTit">1.2最大的尺寸，</span>
              <el-form-item label="长（cm）" prop="item35">
                <el-input v-model.trim="form.item35" size="mini" clearable></el-input>
              </el-form-item>
              <el-form-item label="宽（cm）" prop="item36">
                <el-input v-model.trim="form.item36" size="mini" clearable></el-input>
              </el-form-item>
          </el-row>
          <el-row v-if="form.item31==1">
            <el-form-item label="2. 腋下肿大淋巴结有无淋巴结门?" prop="item37">
              <el-radio-group v-model="form.item37" @change="clearItem(form.item37,['item38'],2)" class="redio37">
                <el-radio
                  v-for="item in item37"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row v-if="form.item37==2 && form.item31==1">
            <el-form-item label="2.1腋下肿大淋巴结淋巴结门位置？" prop="item38" class="cancer-margin--l20" label-width="276px">
              <el-radio-group v-model="form.item38">
                <el-radio
                  v-for="item in item38"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row v-if="form.item31==1">
            <el-form-item label="3.有无CDFI血流：血流信号？" prop="item39">
              <el-radio-group v-model="form.item39" @change="clearItem(form.item39,['item310','item3101','item311'],2)" class="redio39">
                <el-radio
                  v-for="item in item39"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row v-if="form.item39==2 && form.item31==1">
            <el-form-item label="3.1血流信息是否丰富？" prop="item310" class="cancer-margin--l20">
              <el-radio-group v-model="form.item310" class="redio310">
                <el-radio
                  v-for="item in item310"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row v-if="form.item39==2 && form.item31==1">
            <el-form-item label="3.2血流信息表现" prop="item3101" class="cancer-margin--l20">
              <el-radio-group v-model="form.item3101" class="redio3101">
                <el-radio
                  v-for="item in item3101"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row v-if="form.item39==2 && form.item31==1">
            <el-form-item label="3.3CDFI血流：RI值是多少？" prop="item311" class="cancer-margin--l20">
              <el-input v-model.trim="form.item311" v-numberInt:2="form.item311" size="mini" placeholder="请输入CDFI血流：" clearable></el-input>
            </el-form-item>
          </el-row>
          <h2>乳腺分型</h2>
          <el-row>
             <el-form-item label="1.乳腺分型属于哪种类型？" prop="breastType">
              <el-radio-group v-model="form.breastType" class="rediobreastType">
                <el-radio
                  v-for="item in breastType"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
        <!--占位1乳腺分型与超声诊断-->
        <div v-for="(x,index) in form.hosRxcsResultOccupyDiagnosisInfoPOS" :key="index" v-if="form.item21==1&&form.item22>=1">
            <h2>占位{{index+1}}乳腺分型与超声诊断情况</h2>
            <el-form :inline="true" :model="x" :ref="'diagnosisInfo'+index" :rules="diagnosisInfoRules">
              <el-row v-if="form.item21==1">
                <el-form-item :label='"1.占位"+(index+1)+"的超声诊断属于哪种？:"' prop="diagnosisType" class="blockTit">
                  <el-checkbox-group v-model="x.diagnosisType" @change="changeType(x)">
                    <el-checkbox
                      v-for="item in diagnosisInfoPOS.diagnosisType"
                      :key="item.key"
                      :label="item.key">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
              <el-row v-if="form.item21==1&&x.diagnosisType&&x.diagnosisType.includes(11)">
                <el-form-item label="1.1请输入其他诊断描述:" prop="otherDiagnosisDescribe">
                    <el-input v-model.trim="x.otherDiagnosisDescribe" size="mini"  clearable maxlength="100"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="form.item21==1&&x.diagnosisType&&x.diagnosisType.includes(4)">
                <el-form-item label="1.2若乳导管扩张无占位，请输入大小（mm）:" prop="milkDuctSize">
                    <el-input v-model.trim="x.milkDuctSize" v-numberInt:2="x.milkDuctSize" size="mini" clearable></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="form.item21==1">
                <el-form-item :label='"2.占位"+(index+1)+"按BI-RADS分类，属于哪一种？"' prop="biRads">
                  <el-checkbox-group v-model="x.biRads">
                    <el-checkbox
                      v-for="item in diagnosisInfoPOS.biRads"
                      :key="item.key"
                      :label="item.key">{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
            </el-form>
         </div>

        <div>
          <h2>非占位病变超声诊断情况</h2>
          <el-row class="no-margin-top">
             <el-form-item label="1. 病变的超声诊断属于哪种？" prop="item4" :rules="form.item21==1?[]:formRules.item4">
              <el-checkbox-group v-model="form.item4" @change="Item4Change">
                <el-checkbox
                  v-for="item in noItem4"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row v-if="form.item4.includes(1)">
            <el-form-item label="1.1 乳导管扩张为：" prop="item41" :rules="form.item21==1?[]:formRules.item41">
                <el-input v-model.trim="form.item41" size="mini" clearable v-numberInt:1="form.item41"></el-input> mm
            </el-form-item>
          </el-row>
          <el-row v-if="form.item4.includes(2)">
            <el-form-item label="1.2 其他具体诊断为：" prop="item42" :rules="form.item21==1?[]:formRules.item42">
                <el-input type="textarea" v-model="form.item42" size="mini" clearable maxlength="100"></el-input>
            </el-form-item>
          </el-row>

          <el-row class="no-margin-top">
             <el-form-item label="2. 按BI-RADS分类，该诊断属于：" prop="item5" :rules="form.item21==1?[]:formRules.item5">
              <el-checkbox-group v-model="form.item5">
                <el-checkbox
                  v-for="item in noItem5"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
        </div>

          <h2>会诊</h2>
            <el-row>
              <el-form-item label="1.是否需要国家癌症中心会诊" prop="isMeeting">
                <el-radio-group v-model="form.isMeeting">
                  <el-radio
                    v-for="item in isMeeting"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <h2>填表信息</h2>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="填表人员：" prop="inputUser">
                    <el-input v-model.trim="form.inputUser" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="录入时间:">
                    <el-date-picker
                      type="date"
                      :clearable="false"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      size="mini"
                      v-model="form.inputTime">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
        </el-form>
        <div class="btns">
          <!-- <el-button type="primary"  @click="submitForm(3)" class="cancer-margin--l20"  v-if="$route.query.source!='look'">保存草稿</el-button> -->
         <el-button type="primary"  @click="submitForm(1)" class="cancer-margin--l20" v-dbClick>提交</el-button>
        </div>
      </cancer-widget>
    </div>
  </div>
</template>

<script>
  import DATA from '@/views/common/mammarySound'
  import VALIDATE from '@/utils/validate'
  import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
  import minxin from '@/mixins/mixins'
  export default {
    mixins: [ getPersonDetail, minxin ],
    data() {
      return {
        form:{
          item11: null,
          item12: null,
          item13: null,
          item14: null,
          item15: null,
          item16: null,
          item17: null,
          item18: null,
          item21: null,
          item22: null,
          item23: null,
          item24: null,
          inputUser:sessionStorage.getItem('trueName'),//录入人
          isMeeting: 1,
          item31: null,
          item32: null,
          item33: null,
          item34: null,
          item35: null,
          item36: null,
          item37: null,
          item38: null,
          item39: null,
          item310: null,
          item3101: null,
          item311: null,
          breastType: null,
          checkDate:new Date(),
          inputTime:new Date(),
          item4: [],
          item41: null,
          item42: null,
          item5:[],
          //乳腺超声结果占位表
          hosRxcsResultOccupyInfoPOS: [{
              item1: null,
              item2: null,
              item21: null,
              item3: null,
              item4: null,
              item5: null,
              item6: null,
              item61: null,
              item7: null,
              item8: null,
              item9: null,
              item91: null,
              item92: null,
              item93: null,
              item94: null,
              item95: null,
              item96: null,
              item10: null,
              item101: null,
              item102: null
          }],
          //乳腺超声结果乳腺分型与超声诊断表
          hosRxcsResultOccupyDiagnosisInfoPOS: [{
              diagnosisType: [],
              otherDiagnosisDescribe: null,
              milkDuctSize: null,
              biRads: []
          }],
        },
        
        item11: DATA.item11,
        item14: DATA.item14,
        item17: DATA.item17,
        item18: DATA.item18,
        item21: DATA.item21,
        item31: DATA.item31,
        item37: DATA.item37,
        item38: DATA.item38,
        item39: DATA.item39,
        item310: DATA.item310,
        item3101: DATA.item3101,
        isMeeting: DATA.isMeeting,
        breastType: DATA.breastType,
        OccupyInfoPOS: DATA.hosRxcsResultOccupyInfoPOS,
        diagnosisInfoPOS: DATA.hosRxcsResultOccupyDiagnosisInfoPOS,
        noItem4: DATA.noItem4,
        noItem5: DATA.noItem5,
        personDetail:{},

        formRules: {
          item11: [{ required: true, message: '必填', trigger: 'change' }],
          item12: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count60a}
          ],
          item13: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count60b}
          ],
          item14: [{ required: true, message: '必填', trigger: 'change' }],
          item15: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count60a}
          ],
          item16: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count60b}
          ],
          item17: [{ required: true, message: '必填', trigger: 'change' }],
          item18: [{ required: true, message: '必填', trigger: 'change' }],
          item21: [{ required: true, message: '必填', trigger: 'change' }],
          item22: [
            { required: true, message: '必填', trigger: 'change' },
            { trigger: 'change', validator: VALIDATE.countInit100}
          ],
          item23: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit0100}
          ],
          item24: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit0100}
          ],
          item31: [{ required: true, message: '必填', trigger: 'change' }],
          item32: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
          ],
          item33: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit0100}
          ],
          item34: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit0100}
          ],
          item35: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countFloat050}
          ],
          item36: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countFloat050}
          ],
          item37: [{ required: true, message: '必填', trigger: 'change' }],
          item38: [{ required: true, message: '必填', trigger: 'change' }],
          item39: [{ required: true, message: '必填', trigger: 'change' }],
          item310: [{ required: true, message: '必填', trigger: 'change' }],
          item3101: [{ required: true, message: '必填', trigger: 'change' }],
          item311: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100}
          ],
          inputUser: [{ required: true, message: '必填', trigger: 'blur' }],
          isMeeting: [{ required: true, message: '必填', trigger: 'change' }],
          inputTime:[{ required: true, message: '必填', trigger: 'blur' }],
          breastType: [{ required: true, message: '必填', trigger: 'change' }],
          item4: [{ required: true, message: '必填', trigger: 'change' }],
          item41:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count50a}
          ],
          item42: [{ required: true, message: '必填', trigger: 'blur' }],
          item5: [{ required: true, message: '必填', trigger: 'change' }],
        },
        hosRxcshRules: {
          item1: [{ required: true, message: '必填', trigger: 'change' }],
          item2: [{ required: true, message: '必填', trigger: 'change' }],
          item21: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.count40}
          ],
          item3: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100}
          ],
          item4: [{ required: true, message: '必填', trigger: 'change' }],
          item5: [{ required: true, message: '必填', trigger: 'change' }],
          item6: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countFloat050}
          ],
          item61: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countFloat050}
          ],
          item7: [{ required: true, message: '必填', trigger: 'change' }],
          item8: [{ required: true, message: '必填', trigger: 'change' }],
          item9: [{ required: true, message: '必填', trigger: 'change' }],
          item91: [{ required: true, message: '必填', trigger: 'change' }],
          item92: [{ required: true, message: '必填', trigger: 'change' }],
          item93: [{ required: true, message: '必填', trigger: 'change' }],
          item94: [{ required: true, message: '必填', trigger: 'change' }],
          item95: [{ required: true, message: '必填', trigger: 'change' }],
          item96: [{ required: true, message: '必填', trigger: 'change' }],
          item10: [{ required: true, message: '必填', trigger: 'change' }],
          item101: [{ required: true, message: '必填', trigger: 'change' }],
          item102: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add0100}
          ]
        },
        diagnosisInfoRules: {
          diagnosisType: [{ required: true, message: '必填', trigger: 'change' }],
          otherDiagnosisDescribe: [
            { required: true, message: '必填', trigger: 'blur' },
            // { trigger: 'blur', validator: VALIDATE.checkFontH}
            ],
          milkDuctSize: [
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.add050}
          ],
          biRads:[{ required: true, message: '必填', trigger: 'change' }]
        },
        resultId: null,
        errortext:''
      };
    },
    created() {
    },
    mounted(){
      this.getPersonDetailFun(Number(this.$route.query.personId),this.$route.query.surverId);
      this.$route.query.resultFormId && this.getResultInfo()
    },
    methods: {
      // 计算比值
      /**
       * @params numerator 乳腺实质厚度
       * @params parent 乳腺厚度
       * @params ele 乳腺比值
       */
      computateRatio(numerator,parent,ele) {
        let validEle = true,validParent = true
        this.$refs['form'].validateField(numerator,(errorMessage)=>{
          if(errorMessage!=''){
            validEle=false
          }
        })
        this.$refs['form'].validateField(parent,(errorMessage)=>{
          if(errorMessage!=''){
            validParent=false
          }
        })
        if(validEle && validParent){
          let ratio = this.form[numerator]/this.form[parent]
          if(ratio>(1/3)){
            this.form[ele] = 2
          }else{
            this.form[ele] = 1
          }
        }
        this.selectType();
      },
      selectType(){
        if(this.form.item14==1 || this.form.item17==1){
          this.form.breastType = 4
        }
      },
      Item4Change(){
        if(!this.form.item4.includes(1)){
          this.form.item41=null
        }
        if(!this.form.item4.includes(2)){
          this.form.item42=null
        }
      },
      //判断初始占位数组几条数据
        tuberChange(val){
            if(val>0&&val<11&&(/^([1-9]|10)$/.test(val))){
                // this.form.hosRxcsResultOccupyInfoPOS = []
                // this.form.hosRxcsResultOccupyDiagnosisInfoPOS = []
                // for(let i =0;i<val;i++){
                //     this.pushHosGaPerch()
                // }
                if(val>=this.form.hosRxcsResultOccupyInfoPOS.length){
                  for(let i =this.form.hosRxcsResultOccupyInfoPOS.length;i<val;i++){
                      this.pushHosGaPerch()
                  }
                }else{
                  this.form.hosRxcsResultOccupyInfoPOS.splice(val,1)
                  this.form.hosRxcsResultOccupyDiagnosisInfoPOS.splice(val,1)
                }
            }else {
                this.form.hosRxcsResultOccupyInfoPOS = []
                this.form.hosRxcsResultOccupyDiagnosisInfoPOS = []
            }
        },

        // 计算总的探及个数
        sum(){
          if(this.form.item23 && this.form.item24 && (/^([1-9]\d|[1-9]|100|0)$/.test(this.form.item23)) && (/^([1-9]\d|[1-9]|100|0)$/.test(this.form.item24))){
            this.form.item22 = Number(this.form.item23)+Number(this.form.item24)
          }
        },
        //添加占位
        pushHosGaPerch(count){
          var obj = {
              item1: null,
              item2: null,
              item21: null,
              item3: null,
              item4: null,
              item5: null,
              item6: null,
              item7: null,
              item8: null,
              item9: null,
              item91: null,
              item92: null,
              item93: null,
              item94: null,
              item95: null,
              item96: null,
              item10: null,
              item101: null,
              item102: null        
          }
          var objYx = {
            diagnosisType: [],
            otherDiagnosisDescribe: null,
            milkDuctSize: null,
            biRads: []
          }
          this.form.hosRxcsResultOccupyInfoPOS.push(obj)
          this.form.hosRxcsResultOccupyDiagnosisInfoPOS.push(objYx)
        },
         //删除占位
        deleteTuber(index){
            this.form.hosRxcsResultOccupyInfoPOS.splice(index,1)
            this.form.hosRxcsResultOccupyDiagnosisInfoPOS.splice(index,1)
        },
      //提交表单
      submitForm(status) {
        if (status === 1) {
          let validFlag = true
          this.$refs.form.validate((valid) => {
            if (!valid){
              validFlag = false
            }
          })

          if(this.form.item21==1 && this.form.hosRxcsResultOccupyInfoPOS.length>0){
             for(var i=0;i<this.form.hosRxcsResultOccupyInfoPOS.length;i++){
              this.$refs['hosRxcsInfo'+i][0].validate((valid) => {
                if (!valid){
                  validFlag = false
                }
              })
            }
          }
         if(this.form.item21==1 && this.form.hosRxcsResultOccupyDiagnosisInfoPOS.length>0){
           for(var j=0;j<this.form.hosRxcsResultOccupyDiagnosisInfoPOS.length;j++){
            this.$refs['diagnosisInfo'+j][0].validate((valid) => {
              if (!valid){
                validFlag = false
              }
            })
          }
         }
          //判断item31
          if(this.form.item31 == 1){
             if(Number(this.form.item32) != Number(this.form.item33) + Number(this.form.item34)){
                validFlag = false;
                this.errortext = '双侧腋下淋巴结个数总和与腋下肿大淋巴结个数不一致，请正确填写个数'
             }else{
                this.errortext = ''
             }
            //  if(Number(this.form.item32) == 0){
            //     validFlag = false;
            //  }
          }
          if (!validFlag) {
            return false;
          } else {
            this.submitData(status)
          }
        } else {
          this.submitData(status)
        }
      },
      submitData (status) {
        let params = []
        this.form.hosRxcsResultOccupyDiagnosisInfoPOS.filter((item) => {
          params.push(item)
        })
        params.filter((item) => {
            item.diagnosisType = item.diagnosisType && item.diagnosisType.length?this.sortArray(item.diagnosisType).join(','):null
            item.biRads = item.biRads&&item.biRads.length?this.sortArray(item.biRads).join(','):null
        })
        this.form.item4 = this.form.item4&&this.form.item4.length?this.sortArray(this.form.item4).join(','):null
        this.form.item5 = this.form.item5&&this.form.item5.length?this.sortArray(this.form.item5).join(','):null
        this.$axios_http({
          url: '/base/rxcs/saveOrUpdate/rxcsResult',
          data: Object.assign({},
            this.form,
            {
              inputStatus: status,
              checkInfoId: this.$route.query.checkInfoId,
              hosRxcsResultOccupyInfoPOS: this.form.hosRxcsResultOccupyInfoPOS,
              hosRxcsResultOccupyDiagnosisInfoPOS: params
            }),
          vueObj: this
        }).then((res) => {
          if(res.data.status=="SUCCESS"){
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.resultId = res.data.result
            this.form.hosRxcsResultOccupyDiagnosisInfoPOS.filter((item) => {
                item.diagnosisType = item.diagnosisType ? item.diagnosisType.split(',').map(item => +item):[]
                item.biRads = item.biRads ? item.biRads.split(',').map(item => +item):[]
            })
            this.form.item4 = this.form.item4 ? this.form.item4.split(',').map(item => +item):[]
            this.form.item5 = this.form.item5 ? this.form.item5.split(',').map(item => +item):[]
            this.$router.push('/cancer/mammarysound/list');
          }
        })
      },
      //根据条件清空
      changeItem21(){
        if(this.form.item21==2){
          this.form.item22=null;
          this.form.item23=null;
          this.form.item24=null;
          this.form.hosRxcsResultOccupyInfoPOS= [{
              item1: null,
              item2: null,
              item21: null,
              item3: null,
              item4: null,
              item5: null,
              item6: null,
              item7: null,
              item8: null,
              item9: null,
              item91: null,
              item92: null,
              item93: null,
              item94: null,
              item95: null,
              item96: null,
              item10: null,
              item101: null,
              item102: null
          }],
            this.form.hosRxcsResultOccupyDiagnosisInfoPOS=[{
              diagnosisType: [],
              otherDiagnosisDescribe: null,
              milkDuctSize: null,
              biRads: []
          }];
        }
      },
      changeType(x){
        if(!x.diagnosisType.includes(11)){
          x.otherDiagnosisDescribe=null;
        }
        if(!x.diagnosisType.includes(4)){
          x.milkDuctSize=null;
          
        }
      },
      clearItem(val,data,type){
        if (type==1 && val == 2) {
          for(let item of data){
               this.form[item] = null;
            }
        } else  if (type==2 && val == 1) {
          for(let item of data){
               this.form[item] = null;
            }
        }
      },
      item9Change(val, index) {
        if(val =='1') {
          Object.keys(this.form.hosRxcsResultOccupyInfoPOS[index]).filter((item)=>{
            if((item.startsWith('item9') || item.startsWith('item10')) && item!='item9') {
              this.form.hosRxcsResultOccupyInfoPOS[index][item] = null
            }
          })
        }
      },
      //  查询结果
      getResultInfo(){
          this.$axios_http({
            url: '/base/rxcs/query/getRxcsResultById',
            data: {
              id: this.$route.query.resultFormId
            },
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              this.form=Object.assign({}, res.data.result)
              this.form.hosRxcsResultOccupyInfoPOS = this.form.hosRxcsResultOccupyInfoPOS
              this.form.hosRxcsResultOccupyDiagnosisInfoPOS = this.form.hosRxcsResultOccupyDiagnosisInfoPOS
              this.form.inputTime =new Date(this.form.inputTime)
              this.form.hosRxcsResultOccupyDiagnosisInfoPOS.filter( item => {
                item.diagnosisType = item.diagnosisType && item.diagnosisType.length?item.diagnosisType.split(',').map(item => +item):[]
                item.biRads = item.biRads && item.biRads.length?item.biRads.split(',').map(item => +item):[]
              })
              this.form.item4 = this.form.item4 && this.form.item4.length?this.form.item4.split(',').map(item => +item):[]
              this.form.item5 = this.form.item5 && this.form.item5.length?this.form.item5.split(',').map(item => +item):[]
            }
          })
      },
      toFixedTwo(params){
        if(String(this.form[params]).indexOf('.') == -1 && Number(this.form[params]) != 0 && (/^[0-9]{1,2}$/.test(Number(this.form[params])))){
           this.form[params] = this.form[params] + '.00';
        }else if(String(this.form[params]).split(".") != -1 && String(this.form[params]).split(".")[1] && String(this.form[params]).split(".")[1].length == 1){
           this.form[params] = this.form[params] + '0';
        }else if(String(this.form[params]).indexOf(".") != -1 && String(this.form[params]).split(".")[0] && !String(this.form[params]).split(".")[1]){
           this.form[params] = this.form[params] + '00';
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
    }
  }
  .el-row{
    padding:10px 0 10px 20px;
    // border-bottom:1px dashed #f6f6f6;
  }
  .el-form-item{
    margin-bottom: 0px;
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
  .spanTit{
    float: left;
    margin-left:8px;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
  }
  .redio18{
    margin-left: 8px;
  }
  .redio37{
    margin-left: 50px;
  }
  .redio39{
    margin-left:72px; 
  }
  .redio310{
    margin-left:72px; 
  }
  .redio3101{
    margin-left:142px; 
  }
  .rediobreastType{
    margin-left: 12px;
  }
  .btns{
     padding-top: 10px;
     border-top:1px dashed rgb(220, 223, 230);
     text-align:center;
  }
  .errorTip{
     color:#f56c6c;
     padding-left: 30px;
     font-size: 12px;
     height: 30px;
     line-height: 30px;
  }
</style>
<style lang="scss">
  .el-form-item__error{
    position: relative!important;
  }
  .mammary-sound {
    .el-radio {
      margin-top: 10px;
      margin-right: 10px;
    }
    .el-radio+.el-radio {
      margin-left: 0;
      margin-bottom: 10px;
    }
    .el-checkbox {
      margin-top: 10px;
      margin-right: 10px;
    }
    .el-checkbox+.el-checkbox {
      margin-left: 0;
      margin-bottom: 10px;
    }
    .cancer-margin--l20{
      margin-left: 0px;
    }
    .no-margin-top .el-checkbox{
      margin-top:0;
    }
  }

</style>