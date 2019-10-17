<template>
  <div class="mammary-xline">
    <div class="reportBox">
      <cancer-widget>
        <h1>乳腺x线结果录入表</h1>
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
              <el-form-item label="检查日期：" prop="checkDate">
                <el-date-picker
                    type="date"
                    disabled
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp"
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
            <el-col :span="8">
              <el-form-item label="联系电话：" prop="name">
                {{personDetail.phone}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="家庭住址：" prop="name">
                {{personDetail.czAddress}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form :model="form" ref="form" :rules="formRules">
          <h2>检查基本信息</h2>
            <el-row>
              <el-form-item label="1.X线检查体位是？" prop="item1">
                <el-checkbox-group disabled v-model="form.item1"  @change="changeItem1">
                  <el-checkbox
                    v-for="item in item1"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="1.1数字化摄影位置？" prop="item11" class="cancer-margin--l20" v-if="form.item1.includes(1)" >
                <el-radio-group disabled v-model="form.item11">
                  <el-radio
                    v-for="item in item11"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="1.2屏胶系统位置？" prop="item12" class="cancer-margin--l20" v-if="form.item1.includes(1)">
                <el-radio-group disabled v-model="form.item12">
                  <el-radio
                    v-for="item in item12"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="1.3附加体位投照位置？" prop="item13" class="cancer-margin--l20" v-if="form.item1.includes(2)">
                <el-radio-group disabled v-model="form.item13">
                  <el-radio
                    v-for="item in item13"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            <!-- </el-row> -->
            <!-- <el-row> -->
              <el-form-item label="2.X线检查适应症？" prop="item2">
                <!-- <el-checkbox-group disabled v-model="form.item2" @change="clearItem(form.item2,['item21'],1)">
                  <el-checkbox
                    v-for="item in item2"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-checkbox>
                </el-checkbox-group> -->
                <!-- 多选改单选 -->
                 <el-radio-group disabled v-model="form.item2" @change="clearItem(form.item2,['item21'],1)">
                  <el-radio
                    v-for="item in item2"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="2.1超声可疑发现 " prop="item21" class="cancer-margin--l20" v-if="form.item2 == '2'">
                <el-radio-group disabled v-model="form.item21">
                  <el-radio
                    v-for="item in item21"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            <!-- </el-row> -->
            <!-- <el-row> -->
              <el-form-item label="3.影像评估时是否结合既往乳腺影像资料（胶片，报告）" prop="item3">
                <el-radio-group disabled v-model="form.item3" @change="clearItem(form.item3,['item31'],2)">
                  <el-radio
                    v-for="item in item3"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="3.1既往资料距今距离多少？" prop="item31" class="cancer-margin--l20" v-if="form.item3 == 2">
                <el-radio-group disabled v-model="form.item31">
                  <el-radio
                    v-for="item in item31"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            <!-- </el-row> -->
            <!-- <el-row> -->
              <el-form-item label="4.乳腺实质BI-RADS 类型属于以下哪种？" prop="item41">
                <!-- <el-checkbox-group disabled v-model="form.item41">
                  <el-checkbox
                    v-for="item in item41"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-checkbox>
                </el-checkbox-group> -->
                 <el-radio-group disabled v-model="form.item41">
                  <el-radio
                    v-for="item in item41"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
          
        
        <h2>影像发现（左乳）</h2>
        <el-form :model="hosRxxxResultImageDiscoveryInfoPOS[0]" :rules="leftRules" ref="leftRules">
          <el-row class="discover">
            <el-form-item label="1.左乳影像结果有无异常？ " prop="item1">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item1" 
              @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[0].item1,[
              'item2','item3','item4','item5','item6','item7','item8','item9',
              'item21','item22','item23','item24','item25','item26','item27','item28',
              'item31','item32','item33','item34','item35','item36','item37',
              'item41','item42','item43','item44','item51','item52','item53','item54','abnormalDetail'
              ],3)">
                <el-radio
                  v-for="item in POS.item1"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.左乳影像结果有无肿块？" prop="item2" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item2" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[0].item2,['item21','item22','item23','item24','item25','item26','item27','item28'],3)">
                <el-radio
                  v-for="item in POS.item2"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.1肿块的形态？" prop="item21" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item21">
                <el-radio
                  v-for="item in POS.item21"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.2肿块的边缘？" prop="item22" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item22">
                <el-radio
                  v-for="item in POS.item22"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.3肿块的密度？" prop="item23" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item23">
                <el-radio
                  v-for="item in POS.item23"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.4肿块的最大径？" prop="item24" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item24">
                <el-radio
                  v-for="item in POS.item24"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.5肿块的象限？" prop="item25" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item25">
                <el-radio
                  v-for="item in POS.item25"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.6肿块的钟点？" prop="item26" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item2==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item26" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="2.7肿块的深度？" prop="item27" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item27">
                <el-radio
                  v-for="item in POS.item27"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.8肿块距乳头距离？（cm）" prop="item28" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item2==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item28" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="3.左乳影像结果有无钙化？" prop="item3" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item3" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[0].item3,['item31','item32','item33','item34','item35','item36','item37'],3)">
                <el-radio
                  v-for="item in POS.item3"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1钙化类型" prop="item31" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item3==2" class="cancer-margin--l20">
              <el-checkbox-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item31">
                <el-checkbox
                  v-for="item in POS.item31"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="3.1.1典型良性钙化的表现" prop="item31A" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item3==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item31.includes(1)" class="cancer-margin--l20">
              <el-checkbox-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item31A">
                <el-checkbox
                  v-for="item in POS.item31A"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="3.1.2钙化的形态？" prop="item32" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item3==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item31.includes(2)" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item32">
                <el-radio
                  v-for="item in POS.item32"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1.3钙化的分布？" prop="item33" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item3==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item31.includes(2)" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item33">
                <el-radio
                  v-for="item in POS.item33"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1.4钙化的象限？" prop="item34" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item3==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item31.includes(2)" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item34">
                <el-radio
                  v-for="item in POS.item34"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1.5钙化的钟点？" prop="item35" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item3==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item31.includes(2)" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item35" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="3.1.6钙化的深度？" prop="item36" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item3==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item31.includes(2)" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item36">
                <el-radio
                  v-for="item in POS.item36"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1.7钙化距离乳头距离？（cm）" prop="item37" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item3==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item31.includes(2)" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item37" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="4.左乳影像结果有无结构扭曲？" prop="item4" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item4" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[0].item4,['item41','item42','item43','item44'],3)">
                <el-radio
                  v-for="item in POS.item4"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="4.1结构扭曲的象限？" prop="item41" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item4==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item41">
                <el-radio
                  v-for="item in POS.item41"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="4.2结构扭曲的钟点？" prop="item42" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item4==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item42" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="4.3结构扭曲的深度？" prop="item43" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item4==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item43">
                <el-radio
                  v-for="item in POS.item43"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="4.4结构扭曲距离乳头距离？（cm）" prop="item44" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item4==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item44" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="5.左乳影像结果有无局灶性不对称致密？" prop="item5" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item5" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[0].item5,['item51','item52','item53','item54'],3)">
                <el-radio
                  v-for="item in POS.item5"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="5.1局灶性不对称致密的象限？" prop="item51" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item5==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item51">
                <el-radio
                  v-for="item in POS.item51"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="5.2局灶性不对称致密的钟点？" prop="item52" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item5==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item52" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="5.3局灶性不对称致密的深度？" prop="item53" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item5==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item53">
                <el-radio
                  v-for="item in POS.item53"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="5.4局灶性不对称致密距离乳头距离？（cm）" prop="item54" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item5==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item54" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="6.左乳影像结果有无乳头凹陷？" prop="item6" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item6">
                <el-radio
                  v-for="item in POS.item6"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="7.左乳影像结果有无皮肤增厚/凹陷？" prop="item7" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item7">
                <el-radio
                  v-for="item in POS.item7"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="8.左乳影像结果有无腋窝淋巴结肿大？" prop="item8" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item8">
                <el-radio
                  v-for="item in POS.item8"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="9.左乳影像结果有无其他异常？" prop="item9" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[0].item9" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[0].item9,['abnormalDetail'],3)">
                <el-radio
                  v-for="item in POS.item9"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="9.1请详细描述异常情况：" prop="abnormalDetail" v-if="hosRxxxResultImageDiscoveryInfoPOS[0].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[0].item9==2" class="cancer-margin--l20">
              <el-input disabled type="textarea" v-model="hosRxxxResultImageDiscoveryInfoPOS[0].abnormalDetail" size="small" clearable maxlength="100"></el-input>
            </el-form-item>
          </el-row>
          </el-form>

          <h2>影像发现（右乳）</h2>
           <el-form :model="hosRxxxResultImageDiscoveryInfoPOS[1]" :rules="rightRules" ref="rightRules">
          <el-row class="discover">
            <el-form-item label="1.右乳影像结果有无异常？ " prop="item1">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item1"
               @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[1].item1,[
              'item2','item3','item4','item5','item6','item7','item8','item9',
              'item21','item22','item23','item24','item25','item26','item27','item28',
              'item31','item32','item33','item34','item35','item36','item37',
              'item41','item42','item43','item44','item51','item52','item53','item54','abnormalDetail'
              ],4)">
                <el-radio
                  v-for="item in POS.item1"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.右乳影像结果有无肿块？" prop="item2" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item2" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[1].item2,['item21','item22','item23','item24','item25','item26','item27','item28'],4)">
                <el-radio
                  v-for="item in POS.item2"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.1肿块的形态？" prop="item21" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item21">
                <el-radio
                  v-for="item in POS.item21"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.2肿块的边缘？" prop="item22" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item22">
                <el-radio
                  v-for="item in POS.item22"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.3肿块的密度？" prop="item23" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item23">
                <el-radio
                  v-for="item in POS.item23"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.4肿块的最大径？" prop="item24" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item24">
                <el-radio
                  v-for="item in POS.item24"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.5肿块的象限？" prop="item25" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item25">
                <el-radio
                  v-for="item in POS.item25"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.6肿块的钟点？" prop="item26" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item2==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item26" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="2.7肿块的深度？" prop="item27" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item2==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item27">
                <el-radio
                  v-for="item in POS.item27"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="2.8肿块距乳头距离？（cm）" prop="item28" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item2==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item28" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="3.右乳影像结果有无钙化？" prop="item3" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item3" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[1].item3,['item31','item32','item33','item34','item35','item36','item37'],4)">
                <el-radio
                  v-for="item in POS.item3"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1钙化类型" prop="item31" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item3==2" class="cancer-margin--l20">
              <el-checkbox-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item31">
                <el-checkbox
                  v-for="item in POS.item31"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="3.1.1典型良性钙化的表现" prop="item31A" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item3==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item31.includes(1)" class="cancer-margin--l20">
              <el-checkbox-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item31A">
                <el-checkbox
                  v-for="item in POS.item31A"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="3.1.2钙化的形态？" prop="item32" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item3==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item31.includes(2)" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item32">
                <el-radio
                  v-for="item in POS.item32"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1.3钙化的分布？" prop="item33" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item3==2  && hosRxxxResultImageDiscoveryInfoPOS[1].item31.includes(2)" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item33">
                <el-radio
                  v-for="item in POS.item33"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1.4钙化的象限？" prop="item34" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item3==2  && hosRxxxResultImageDiscoveryInfoPOS[1].item31.includes(2)" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item34">
                <el-radio
                  v-for="item in POS.item34"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1.5钙化的钟点？" prop="item35" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item3==2  && hosRxxxResultImageDiscoveryInfoPOS[1].item31.includes(2)" class="cancer-margin--l20">
              <el-input disabled v-model.trim="hosRxxxResultImageDiscoveryInfoPOS[1].item35" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="3.1.6钙化的深度？" prop="item36" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item3==2  && hosRxxxResultImageDiscoveryInfoPOS[1].item31.includes(2)" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item36">
                <el-radio
                  v-for="item in POS.item36"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="3.1.7钙化距离乳头距离？（cm）" prop="item37" 
            v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item3==2  && hosRxxxResultImageDiscoveryInfoPOS[1].item31.includes(2)" class="cancer-margin--l20">
              <el-input disabled v-model.trim="hosRxxxResultImageDiscoveryInfoPOS[1].item37" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="4.右乳影像结果有无结构扭曲？" prop="item4" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item4" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[1].item4,['item41','item42','item43','item44'],4)">
                <el-radio
                  v-for="item in POS.item4"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="4.1结构扭曲的象限？" prop="item41" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item4==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item41">
                <el-radio
                  v-for="item in POS.item41"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="4.2结构扭曲的钟点？" prop="item42" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item4==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item42" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="4.3结构扭曲的深度？" prop="item43" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item4==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item43">
                <el-radio
                  v-for="item in POS.item43"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="4.4结构扭曲距离乳头距离？（cm）" prop="item44" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item4==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item44" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="5.右乳影像结果有无局灶性不对称致密？" prop="item5" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item5" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[1].item5,['item51','item52','item53','item54'],4)">
                <el-radio
                  v-for="item in POS.item5"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="5.1局灶性不对称致密的象限？" prop="item51" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item5==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item51">
                <el-radio
                  v-for="item in POS.item51"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="5.2局灶性不对称致密的钟点？" prop="item52" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item5==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item52" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="5.3局灶性不对称致密的深度？" prop="item53" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item5==2" class="cancer-margin--l20">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item53">
                <el-radio
                  v-for="item in POS.item53"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="5.4局灶性不对称致密距离乳头距离？（cm）" prop="item54" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item5==2" class="cancer-margin--l20">
              <el-input disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item54" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="6.右乳影像结果有无乳头凹陷？" prop="item6" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item6">
                <el-radio
                  v-for="item in POS.item6"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="7.右乳影像结果有无皮肤增厚/凹陷？" prop="item7" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item7">
                <el-radio
                  v-for="item in POS.item7"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="8.右乳影像结果有无腋窝淋巴结肿大？" prop="item8" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item8">
                <el-radio
                  v-for="item in POS.item8"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="9.右乳影像结果有无其他异常？" prop="item9" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2">
              <el-radio-group disabled v-model="hosRxxxResultImageDiscoveryInfoPOS[1].item9" @change="clearItem(hosRxxxResultImageDiscoveryInfoPOS[1].item9,['abnormalDetail'],4)">
                <el-radio
                  v-for="item in POS.item9"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="9.1请详细描述异常情况：" prop="abnormalDetail" v-if="hosRxxxResultImageDiscoveryInfoPOS[1].item1==2 && hosRxxxResultImageDiscoveryInfoPOS[1].item9==2" class="cancer-margin--l20">
              <el-input disabled type="textarea" v-model="hosRxxxResultImageDiscoveryInfoPOS[1].abnormalDetail" size="small" clearable maxlength="100"></el-input>
            </el-form-item>
          </el-row>
        </el-form>

        <h2>影像评估结果</h2>
            <el-row>
              <el-form-item label="1.左乳BI-RADS分类？" prop="item51" class="blockTit">
                <el-radio-group disabled v-model="form.item51">
                  <el-radio
                    v-for="item in item51"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="2.右乳BI-RADS分类？" prop="item52" class="blockTit">
                <el-radio-group disabled v-model="form.item52">
                  <el-radio
                    v-for="item in item52"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="3.双乳BI-RADS分类？" prop="item53" class="blockTit">
                <el-radio-group disabled v-model="form.item53">
                  <el-radio
                    v-for="item in item53"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
          <h2>处理建议</h2>
            <el-row>
              <el-form-item label="1.左乳处理建议：" prop="item61"  class="blockTit">
                <el-radio-group disabled v-model="form.item61">
                  <el-radio
                    v-for="item in item61"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="2.右乳处理建议：" prop="item62"  class="blockTit">
                <el-radio-group disabled v-model="form.item62">
                  <el-radio
                    v-for="item in item62"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="3.双乳处理建议：" prop="item63"  class="blockTit">
                <el-radio-group disabled v-model="form.item63">
                  <el-radio
                    v-for="item in item63"
                    :key="item.key"
                    :label="item.key">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="4.其他处理建议：" prop="item64">
                <el-input disabled v-model.trim="form.item64" size="small" placeholder="请输入其他处理建议" clearable maxlength="100"></el-input>
              </el-form-item>
            </el-row>
          <h2>会诊</h2>
          <el-row class="discover">
            <el-form-item label="1.是否需要国家癌症中心会诊" prop="isMeeting">
              <el-radio-group disabled v-model="form.isMeeting">
                <el-radio
                  v-for="item in isMeeting"
                  :key="item.key"
                  :label="item.key">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <h2>填表信息</h2>
          <el-row class="discover">
                <el-col :span="12">
                  <el-form-item label="填表人员：" prop="inputUser">
                    <el-input disabled v-model.trim="form.inputUser" size="mini" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="录入时间:">
                    <el-date-picker
                      type="date"
                      disabled
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
           <router-link v-if="$route.query.source!='gj' && $route.query.reportInputStatus!=1" :to="{path:'/form/mammaryxline',query:{
        screeningId:$route.query.screeningId,
        id:$route.query.id,
        surverId:$route.query.surverId,
        personId:$route.query.personId,
        checkInfoId:$route.query.checkInfoId,
        resultFormId:$route.query.resultFormId,
        source:'look'}}">
        <el-button type="primary">编辑</el-button>
      </router-link>
        </div>
      </cancer-widget>
    </div>
  </div>
</template>

<script>
  import DATA from '@/views/common/mammaryXline'
  import mixins from '@/mixins/mixins'
  import VALIDATE from '@/utils/validate'
  import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
  export default {
    mixins: [ getPersonDetail ],
    data() {
      return {
        form:{
          item1: [],
          item11: null,
          item12: null,
          item13: null,
          item2: null,
          item21: null,
          item3: 1,
          item31: null,
          item41: null,
          item51: null,
          item52: null,
          item53: null,
          item61: null,
          item62: null,
          item63: null,
          item64: null,
          inputUser:sessionStorage.getItem('trueName'),//录入人
          isMeeting: 1,
          inputTime:new Date(),
        },
        hosRxxxResultImageDiscoveryInfoPOS: [],
        items: {
            orSo: null,
            item1: 1,
            item2: null,
            item21: null,
            item22: null,
            item23: null,
            item24: null,
            item25: null,
            item26: null,
            item27: null,
            item28: null,
            item3: null,
            item31: [],
            item31A: [],
            item32: null,
            item33: null,
            item34: null,
            item35: null,
            item36: null,
            item37: null,
            item4: null,
            item41: null,
            item42: null,
            item43: null,
            item44: null,
            item5: null,
            item51: null,
            item52: null,
            item53: null,
            item54: null,
            item6: null,
            item7: null,
            item8: null,
            item9: null,
            abnormalDetail: null
          },
        item1: DATA.item1,
        item11: DATA.item11,
        item12: DATA.item12,
        item13: DATA.item13,
        item2: DATA.item2,
        item21: DATA.item21,
        item3: DATA.item3,
        item31: DATA.item31,
        item41: DATA.item41,
        item51: DATA.item51,
        item52: DATA.item52,
        item53: DATA.item53,
        item61: DATA.item61,
        item62: DATA.item62,
        item63: DATA.item63,
        item64: DATA.item64,
        isMeeting: DATA.isMeeting,
        POS: DATA.hosRxxxResultImageDiscoveryInfoPOS,
        personDetail:{},

        formRules: {
          item1: [{ required: true, message: '必选', trigger: 'change' }],
          item11: [{ required: true, message: '必选', trigger: 'change' }],
          item12: [{ required: true, message: '必选', trigger: 'change' }],
          item13: [{ required: true, message: '必选', trigger: 'change' }],
          item2: [{ required: true, message: '必选', trigger: 'change' }],
          item21: [{ required: true, message: '必选', trigger: 'change' }],
          item3: [{ required: true, message: '必选', trigger: 'change' }],
          item31: [{ required: true, message: '必选', trigger: 'change' }],
          item41: [{ required: true, message: '必选', trigger: 'change' }],
          item51: [{ required: true, message: '必选', trigger: 'change' }],
          item52: [{ required: true, message: '必选', trigger: 'change' }],
          item53: [{ required: true, message: '必选', trigger: 'change' }],
          item61: [{ required: true, message: '必选', trigger: 'change' }],
          item62: [{ required: true, message: '必选', trigger: 'change' }],
          item63: [{ required: true, message: '必选', trigger: 'change' }],
          item64: [
            { required: true, message: '必选', trigger: 'blur' },
            // { required: true, validator: VALIDATE.checkFontH},
            ],
          inputUser: [{ required: true, message: '必选', trigger: 'blur' }],
          isMeeting: [{ required: true, message: '必选', trigger: 'change' }],
          inputTime:[{ required: true, message: '必选', trigger: 'blur' }],
        },
        leftRules: {
          item1: [{ required: true, message: '必选', trigger: 'change' }],
          item2: [{ required: true, message: '必选', trigger: 'change' }],
          item21: [{ required: true, message: '必选', trigger: 'change' }],
          item22: [{ required: true, message: '必选', trigger: 'change' }],
          item23: [{ required: true, message: '必选', trigger: 'change' }],
          item24: [{ required: true, message: '必选', trigger: 'change' }],
          item25: [{ required: true, message: '必选', trigger: 'change' }],
          item26: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
            ],
          item27: [{ required: true, message: '必选', trigger: 'change' }],
          item28: [
            { required: true, message: '必选', trigger: 'blur' },
            { required: true, validator: VALIDATE.countInit100 }
            ],
          item3: [{ required: true, message: '必选', trigger: 'change' }],
          item31: [{ required: true, message: '必选', trigger: 'change' }],
          item31A: [{ required: true, message: '必选', trigger: 'change' }],
          item32: [{ required: true, message: '必选', trigger: 'change' }],
          item33: [{ required: true, message: '必选', trigger: 'change' }],
          item34: [{ required: true, message: '必选', trigger: 'change' }],
          item35: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
          ],
          item36: [{ required: true, message: '必选', trigger: 'change' }],
          item37: [
            { required: true, message: '必选', trigger: 'blur' },
            { required: true, validator: VALIDATE.countInit100 }
            ],
          item4: [{ required: true, message: '必选', trigger: 'change' }],
          item41: [{ required: true, message: '必选', trigger: 'change' }],
          item42: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
          ],
          item43: [{ required: true, message: '必选', trigger: 'change' }],
          item44: [{ required: true, message: '必选', trigger: 'blur' }],
          item5: [{ required: true, message: '必选', trigger: 'change' }],
          item51: [{ required: true, message: '必选', trigger: 'change' }],
          item52: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
          ],
          item53: [{ required: true, message: '必选', trigger: 'change' }],
          item54: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
          ],
          item6: [{ required: true, message: '必选', trigger: 'change' }],
          item7: [{ required: true, message: '必选', trigger: 'change' }],
          item8: [{ required: true, message: '必选', trigger: 'change' }],
          item9: [{ required: true, message: '必选', trigger: 'change' }],
          abnormalDetail: [
            { required: true, message: '必选', trigger: 'blur' },
            // { required: true, validator: VALIDATE.checkFontH},
            ]
        },
        rightRules: {
          item1: [{ required: true, message: '必选', trigger: 'change' }],
          item2: [{ required: true, message: '必选', trigger: 'change' }],
          item21: [{ required: true, message: '必选', trigger: 'change' }],
          item22: [{ required: true, message: '必选', trigger: 'change' }],
          item23: [{ required: true, message: '必选', trigger: 'change' }],
          item24: [{ required: true, message: '必选', trigger: 'change' }],
          item25: [{ required: true, message: '必选', trigger: 'change' }],
          item26: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
            ],
          item27: [{ required: true, message: '必选', trigger: 'change' }],
          item28: [
            { required: true, message: '必选', trigger: 'blur' },
            { required: true, validator: VALIDATE.countInit100 }
            ],
          item3: [{ required: true, message: '必选', trigger: 'change' }],
          item31: [{ required: true, message: '必选', trigger: 'change' }],
          item31A: [{ required: true, message: '必选', trigger: 'change' }],
          item32: [{ required: true, message: '必选', trigger: 'change' }],
          item33: [{ required: true, message: '必选', trigger: 'change' }],
          item34: [{ required: true, message: '必选', trigger: 'change' }],
          item35: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
          ],
          item36: [{ required: true, message: '必选', trigger: 'change' }],
          item37: [
            { required: true, message: '必选', trigger: 'blur' },
            { required: true, validator: VALIDATE.countInit100 }
            ],
          item4: [{ required: true, message: '必选', trigger: 'change' }],
          item41: [{ required: true, message: '必选', trigger: 'change' }],
          item42: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
          ],
          item43: [{ required: true, message: '必选', trigger: 'change' }],
          item44: [{ required: true, message: '必选', trigger: 'blur' }],
          item5: [{ required: true, message: '必选', trigger: 'change' }],
          item51: [{ required: true, message: '必选', trigger: 'change' }],
          item52: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
          ],
          item53: [{ required: true, message: '必选', trigger: 'change' }],
          item54: [
            { required: true, message: '必选', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countInit100}
          ],
          item6: [{ required: true, message: '必选', trigger: 'change' }],
          item7: [{ required: true, message: '必选', trigger: 'change' }],
          item8: [{ required: true, message: '必选', trigger: 'change' }],
          item9: [{ required: true, message: '必选', trigger: 'change' }],
          abnormalDetail: [
            { required: true, message: '必选', trigger: 'blur' },
            // { required: true, validator: VALIDATE.checkFontH},
            ]
        },
        resultId: null
      };
    },
    created() {
      this.hosRxxxResultImageDiscoveryInfoPOS.push(Object.assign({}, this.items, {orSo: 1}),Object.assign({}, this.items, {orSo: 2}))     
    },
    mounted(){
      this.getPersonDetailFun(Number(this.$route.query.personId),this.$route.query.surverId);
      this.$route.query.resultFormId && this.getResultInfo()
    },
    methods: {
      //提交表单
      submitForm(status) {
        if (status === 1) {
          let validFlag = true
          this.$refs.form.validate((valid) => {
            if (!valid){
              validFlag = false
            }
          })
          this.$refs.leftRules.validate((valid) => {
            if (!valid){
              validFlag = false
            }
          })
          this.$refs.rightRules.validate((valid) => {
            if (!valid){
              validFlag = false
            }
          })
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
        this.hosRxxxResultImageDiscoveryInfoPOS[0].item31= this.hosRxxxResultImageDiscoveryInfoPOS[0].item31.length?this.hosRxxxResultImageDiscoveryInfoPOS[0].item31.join(','):null
        this.hosRxxxResultImageDiscoveryInfoPOS[0].item31A= this.hosRxxxResultImageDiscoveryInfoPOS[0].item31A.length?this.hosRxxxResultImageDiscoveryInfoPOS[0].item31A.join(','):null
        this.hosRxxxResultImageDiscoveryInfoPOS[1].item31= this.hosRxxxResultImageDiscoveryInfoPOS[1].item31.length?this.hosRxxxResultImageDiscoveryInfoPOS[1].item31.join(','):null
        this.hosRxxxResultImageDiscoveryInfoPOS[1].item31A= this.hosRxxxResultImageDiscoveryInfoPOS[1].item31A.length?this.hosRxxxResultImageDiscoveryInfoPOS[1].item31A.join(','):null
          this.$axios_http({
            url: '/base/rxxx/saveOrUpdate/rxxxResult',
            data: Object.assign({}, 
            this.form, 
            {
              hosRxxxResultImageDiscoveryInfoPOS: this.hosRxxxResultImageDiscoveryInfoPOS, 
              inputStatus: status,
              checkInfoId: this.$route.query.checkInfoId,
              item1: this.form.item1.length?this.form.item1.join(','):null,
              // item11: this.form.item11.length?this.form.item11.join(','):null,
              // item12: this.form.item12.length?this.form.item12.join(','):null,
              // item13: this.form.item13.length?this.form.item13.join(','):null,
              item2: this.form.item2?Number(this.form.item2):null,
              item41: this.form.item41?Number(this.form.item41):null,
              // item21: this.form.item21.length?this.form.item21.join(','):null
            }),
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.resultId = res.data.result
              this.$router.push('/cancer/mammary/list');
            }
          })
      },
      //根据条件清空
      clearItem(val,data,type){
        if(type==1 && !val.includes(2)){
          for(let item of data){
               this.form[item] = [];
            }
        }else if(type==2 && val==1){
          for(let item of data){
               this.form[item] = null;
            }
        }else if(type==3 && val==1){
          for(let item of data){
               this.hosRxxxResultImageDiscoveryInfoPOS[0][item] = null;
            }
        }else if(type==4 && val==1){
          for(let item of data){
               this.hosRxxxResultImageDiscoveryInfoPOS[1][item] = null;
            }
        }
      },
      changeItem1(){
        if(!this.form.item1.includes(1)){
          this.form.item11=null
          this.form.item12=null
        }
        if(!this.form.item1.includes(2)){
          this.form.item13=null
        }
      },
      //  查询结果
        getResultInfo(){
          this.$axios_http({
            url: '/base/rxxx/query/getRxxxResultById',
            data: {
              id: this.$route.query.resultFormId
            },
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              this.form=Object.assign({}, res.data.result)
              if(res.data.result.hosRxxxResultImageDiscoveryInfoPOS.length>0){
                res.data.result.hosRxxxResultImageDiscoveryInfoPOS.filter( x =>{
                  x.item31 = x.item31?x.item31.split(',').map(item => +item):[]
                  x.item31A = x.item31A?x.item31A.split(',').map(item => +item):[]
                })
              }
              this.hosRxxxResultImageDiscoveryInfoPOS=res.data.result.hosRxxxResultImageDiscoveryInfoPOS
              this.form.inputTime = new Date(this.form.inputTime)
              this.form.item1 = res.data.result.item1?res.data.result.item1.split(',').map(item => +item):[];
              // this.form.item11 = res.data.result.item11?res.data.result.item11.split(',').map(item => +item):[]
              // this.form.item12 = res.data.result.item12?res.data.result.item12.split(',').map(item => +item):[]
              // this.form.item13 = res.data.result.item13?res.data.result.item13.split(',').map(item => +item):[]
              this.form.item2 = res.data.result.item2?Number(res.data.result.item2):null;
              // this.form.item21 = res.data.result.item21?res.data.result.item21.split(',').map(item => +item):[]
              this.form.item41 = res.data.result.item41?Number(res.data.result.item41):null;
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
  .el-row.discover{
    padding:10px 0 10px 20px;
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
  .el-checkbox-group{
    padding-left:165px;
  }
  .btns{
    padding-top: 10px;
    border-top:1px dashed rgb(220, 223, 230);
    text-align:center;
  }
</style>
<style lang="scss">
  .el-form-item__error{
    position: relative!important;
  }
  .mammary-xline {
    .el-radio {
      margin-top: 10px;
      margin-right: 10px;
    }
    .el-radio+.el-radio {
      margin-left: 0;
      margin-bottom: 10px;
    }
    .cancer-margin--l20{
      // margin-left: 40px;
      margin-left:0px;
    }
  }
.mammary-xline .el-radio__input.is-disabled.is-checked+span.el-radio__label {
    color: #409EFF;
  }
  .mammary-xline .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .mammary-xline .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #f5f7fa;
  }
  .mammary-xline .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
  .mammary-xline .el-input.is-disabled.grayInput .el-input__inner{
    background:#ededed;
  }
  .mammary-xline .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    cursor: not-allowed;
  }
  .mammary-xline .el-checkbox__input.is-disabled.is-checked+span.el-checkbox__label {
    color: #409EFF;
    cursor: not-allowed;
  }
  .mammary-xline .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .mammary-xline .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }
</style>