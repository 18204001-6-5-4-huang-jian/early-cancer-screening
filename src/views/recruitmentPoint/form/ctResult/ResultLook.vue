<template>
<div>
  <div class="reportBox j_content">
    <cancer-widget>
      <h1>肺癌低剂量螺旋CT其他表现记录表</h1>
            <el-form :model="form" :rules="formRules" ref="form" class="demo-form">
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
                            <el-form-item label="检查日期：" prop="checkDate">
                                <el-date-picker
                                :disabled="true"
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
                        <el-col :span="6">
                            <el-form-item label="评估日期：">
                                <el-date-picker
                                        :disabled="true"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="timestamp"
                                        :clearable="false"
                                        size="mini"
                                        v-model="personDetail.evaluateDate">
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
                    <h2>结果录入</h2>
                    <el-row class="bigTitle">
                        <el-form-item label="一、本次检查肺实质是否存在以下其他异常？（如肺气肿、肺囊肿/肺大泡、小气道病变/支扩、肺间质疾病、纤维瘢痕、肺不张等）" 
                        prop="item01" 
                        class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item01"
                            @change="clearItem(form.item01,['item1','item2','item3','item4','item5','item6','item07'],['item2A','item3A','item4A','item5A','item6A'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item01!=1">
                        <el-form-item label="1．肺气肿" prop="item1">
                            <el-radio-group :disabled="true" v-model="form.item1">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.轻</el-radio>
                                <el-radio :label="3">3.中</el-radio>
                                <el-radio :label="4">4.重</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item01!=1">
                        <el-form-item label="2．肺囊肿/肺大泡" prop="item2">
                            <el-radio-group :disabled="true" v-model="form.item2" @change="clearItem(form.item2,[],['item2A'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item2 == 2">
                        <el-form-item label="2.1．肺囊肿/肺大泡的位置：" prop="item2A" class="blockTit">
                            <el-checkbox-group :disabled="true" v-model="form.item2A">
                                <el-checkbox label="1">1.RUL</el-checkbox>
                                <el-checkbox label="2">2.RML</el-checkbox>
                                <el-checkbox label="3">3.RLL</el-checkbox>
                                <el-checkbox label="4">4.LUL</el-checkbox>
                                <el-checkbox label="5">5.LLL</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item01!=1">
                        <el-form-item label="3．小气道病变/支扩" prop="item3">
                            <el-radio-group :disabled="true" v-model="form.item3" @change="clearItem(form.item3,[],['item3A'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item3 == 2">
                        <el-form-item label="3.1．小气道病变/支扩的位置：" prop="item3A" class="blockTit">
                            <el-checkbox-group :disabled="true" v-model="form.item3A">
                                <el-checkbox label="1">1.RUL</el-checkbox>
                                <el-checkbox label="2">2.RML</el-checkbox>
                                <el-checkbox label="3">3.RLL</el-checkbox>
                                <el-checkbox label="4">4.LUL</el-checkbox>
                                <el-checkbox label="5">5.LLL</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item01!=1">
                        <el-form-item label="4．肺间质疾病" prop="item4">
                            <el-radio-group :disabled="true" v-model="form.item4" @change="clearItem(form.item4,[],['item4A'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item4 == 2">
                        <el-form-item label="4.1．肺间质疾病的位置：" prop="item4A" class="blockTit">
                            <el-checkbox-group :disabled="true" v-model="form.item4A">
                                <el-checkbox label="1">1.RUL</el-checkbox>
                                <el-checkbox label="2">2.RML</el-checkbox>
                                <el-checkbox label="3">3.RLL</el-checkbox>
                                <el-checkbox label="4">4.LUL</el-checkbox>
                                <el-checkbox label="5">5.LLL</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item01!=1">
                        <el-form-item label="5．纤维瘢痕" prop="item5">
                            <el-radio-group :disabled="true" v-model="form.item5" @change="clearItem(form.item5,[],['item5A'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item5 == 2">
                        <el-form-item label="5.1．纤维瘢痕的位置：" prop="item5A" class="blockTit">
                            <el-checkbox-group :disabled="true" v-model="form.item5A">
                                <el-checkbox label="1">1.RUL</el-checkbox>
                                <el-checkbox label="2">2.RML</el-checkbox>
                                <el-checkbox label="3">3.RLL</el-checkbox>
                                <el-checkbox label="4">4.LUL</el-checkbox>
                                <el-checkbox label="5">5.LLL</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item01!=1">
                        <el-form-item label="6．肺不张" prop="item6">
                            <el-radio-group :disabled="true" v-model="form.item6" @change="clearItem(form.item6,[],['item6A'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item6 == 2">
                        <el-form-item label="6.1．肺不张的位置：" prop="item6A" class="blockTit">
                            <el-checkbox-group :disabled="true" v-model="form.item6A">
                                <el-checkbox label="1">1.RUL</el-checkbox>
                                <el-checkbox label="2">2.RML</el-checkbox>
                                <el-checkbox label="3">3.RLL</el-checkbox>
                                <el-checkbox label="4">4.LUL</el-checkbox>
                                <el-checkbox label="5">5.LLL</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item01!=1">
                        <el-form-item label="对肺实质异常的其他描述：" prop="item07" class="blockTit" style="width:50%;">
                            <el-input :disabled="true" type="textarea" v-model.trim="form.item07" maxlength="100" placeholder="不超过100个字" ></el-input>
                        </el-form-item>
                    </el-row>
                    <!-- 第二部分 -->
                    <el-row class="bigTitle">
                        <el-form-item label="二、本次检查是否存在胸腔积液或胸膜异常（胸膜斑块、胸膜钙化、胸膜增厚、胸膜/胸腔肿物和胸腔肿物）？" prop="item7"  class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item7"
                                             @change="clearItem(form.item7,['item7B','item7A','item7C','item7C2','item7C3'],['item7C1'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        </el-row>
                        <el-row v-if="form.item7!=1">
                            <el-form-item label="1.1 胸腔积液（右侧） " prop="item7B" class="blockTit">
                                <el-radio-group :disabled="true" v-model="form.item7B">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.少量</el-radio>
                                    <el-radio :label="3">3.中量</el-radio>
                                    <el-radio :label="4">4.大量</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <el-row v-if="form.item7!=1">
                            <el-form-item label="1.2 胸腔积液（左侧）" prop="item7A" class="blockTit">
                                <el-radio-group :disabled="true" v-model="form.item7A">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.少量</el-radio>
                                    <el-radio :label="3">3.中量</el-radio>
                                    <el-radio :label="4">4.大量</el-radio>
                                </el-radio-group>
                            </el-form-item>
                         </el-row>
                        <el-row v-if="form.item7!=1">
                            <el-form-item label="2. 胸膜增厚或胸膜斑块" prop="item7C">
                                <el-radio-group :disabled="true" v-model="form.item7C"  @change="clearItem(form.item7C,[],['item7C1'],1)">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.有</el-radio>
                                </el-radio-group>
                            </el-form-item>
                         </el-row>
                         <el-row v-if="form.item7C==2">
                            <el-form-item label="2.1 胸膜增厚或胸膜斑块的位置：" prop="item7C1">
                                <el-checkbox-group :disabled="true" v-model="form.item7C1">
                                    <el-checkbox label="1">1.右</el-checkbox>
                                    <el-checkbox label="2">2.左</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item> 
                         </el-row>
                         <el-row  v-if="form.item7!=1">
                            <el-form-item label="3. 胸膜钙化" prop="item7C2">
                                <el-radio-group :disabled="true" v-model="form.item7C2">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.有</el-radio>
                                </el-radio-group>
                            </el-form-item> 
                         </el-row>
                         <el-row  v-if="form.item7!=1">
                            <el-form-item label="4. 胸膜肿物" prop="item7C3">
                                <el-radio-group :disabled="true" v-model="form.item7C3">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.有</el-radio>
                                </el-radio-group>
                            </el-form-item> 
                         </el-row>
                         <!-- 第三部分 -->
                        <el-row class="bigTitle">
                            <el-form-item label="三、本次检查心脏或大血管是否存在以下异常？（如：主动脉壁钙化、房室增大、瓣膜钙化、心包积液等）" prop="item8"  class="blockTit">
                                <el-radio-group :disabled="true" v-model="form.item8"
                                                 @change="clearItem(form.item8,['item81','item82','item83','item8E'],[],1)">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.有</el-radio>
                                </el-radio-group>
                            </el-form-item>
                         </el-row>
                         <el-row v-if="form.item8!=1">
                            <el-form-item label="1. 主动脉壁钙化" prop="item81">
                                <el-radio-group :disabled="true" v-model="form.item81">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.有</el-radio>
                                </el-radio-group>
                            </el-form-item>
                         </el-row>
                          <el-row v-if="form.item8!=1">
                            <el-form-item label="2. 房室增大" prop="item82">
                                <el-radio-group :disabled="true" v-model="form.item82">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.有</el-radio>
                                </el-radio-group>
                            </el-form-item>
                         </el-row>
                        <el-row v-if="form.item8!=1">
                            <el-form-item label="3. 瓣膜钙化" prop="item83">
                                <el-radio-group :disabled="true" v-model="form.item83">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.有</el-radio>
                                </el-radio-group>
                            </el-form-item>
                         </el-row>
                         <el-row v-if="form.item8!=1">
                            <el-form-item label="4. 心包积液" prop="item8E">
                                <el-radio-group :disabled="true" v-model="form.item8E">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.少量</el-radio>
                                    <el-radio :label="3">3.中量</el-radio>
                                    <el-radio :label="4">4.大量</el-radio>
                                </el-radio-group>
                            </el-form-item>
                         </el-row>

                         <!-- 第四部分 -->
                        <el-row class="bigTitle">
                            <el-form-item label="四、本次检查是否存在冠状动脉钙化？（钙化范围小于1/3为轻，1/3至2/3为中，2/3以上为重）" prop="item8A0"  class="blockTit">
                                <el-radio-group :disabled="true" v-model="form.item8A0"
                                                @change="clearItem(form.item8A0,['item8A','item8B','item8C','item8D'],[],1)">
                                    <el-radio :label="1">1.无</el-radio>
                                    <el-radio :label="2">2.有</el-radio>
                                </el-radio-group>
                            </el-form-item>
                         </el-row>
                    <el-row v-if="form.item8A0==2">
                        <el-form-item label="1. 左主干" prop="item8A"
                                      class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item8A">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.轻</el-radio>
                                <el-radio :label="3">3.中</el-radio>
                                <el-radio :label="4">4.重</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item8A0==2">
                        <el-form-item label="2. 前降支" prop="item8B" class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item8B">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.轻</el-radio>
                                <el-radio :label="3">3.中</el-radio>
                                <el-radio :label="4">4.重</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item8A0==2">
                        <el-form-item label="3. 回旋支" prop="item8C" class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item8C">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.轻</el-radio>
                                <el-radio :label="3">3.中</el-radio>
                                <el-radio :label="4">4.重</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item8A0==2">
                        <el-form-item label="4. 右主干" prop="item8D" class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item8D">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.轻</el-radio>
                                <el-radio :label="3">3.中</el-radio>
                                <el-radio :label="4">4.重</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <!-- 第五部分 -->
                    <el-row class="bigTitle">
                        <el-form-item label="五、本次检查是否存在甲状腺/纵隔异常？" prop="item9"  class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item9"
                                             @change="clearItem(form.item9,
                                             ['item9A','item9AA1','item9B','item9BA1','item9C','item9D','item9E','item9EOther','item9F','item9FOther','item9G','item9GOther','item9H'],
                                             ['item9AA','item9BA','item9COtherArr','item9EA'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                     </el-row>
                    <el-row v-if="form.item9!=1">
                        <el-form-item label="1. 甲状腺是否存在异常？（钙化、囊肿、肿瘤等）" prop="item9A">
                            <el-radio-group :disabled="true" v-model="form.item9A" @change="clearItem(form.item9A,['item9AA1'],['item9AA'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9A==2">
                        <el-form-item label="1.1. 甲状腺异常的具体描述：" prop="item9AA" class="blockTit">
                            <el-checkbox-group :disabled="true" v-model="form.item9AA"  @change="clearItem(form.item9AA,['item9AA1'],[],1)">
                                <el-checkbox label="1">1.钙化</el-checkbox>
                                <el-checkbox label="2">2.囊肿</el-checkbox>
                                <el-checkbox label="3">3.肿瘤</el-checkbox>
                                <el-checkbox label="4">4.其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9AA.includes('4')">
                        <el-form-item label="甲状腺其他情况：" prop="item9AA1" labelWidth="140px" style="width:50%;">
                            <el-input :disabled="true" type="textarea" v-model="form.item9AA1" maxlength="100" placeholder="不超过100个字"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9!=1">
                        <el-form-item label="2. 胸腺是否存在异常？（钙化、囊肿、肿瘤等）" prop="item9B">
                            <el-radio-group :disabled="true" v-model="form.item9B" @change="clearItem(form.item9B,['item9BA1'],['item9BA'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9B==2">
                        <el-form-item label="2.1. 胸腺异常的具体描述：" prop="item9BA" class="blockTit">
                            <el-checkbox-group :disabled="true" v-model="form.item9BA">
                                <el-checkbox label="1">1.钙化</el-checkbox>
                                <el-checkbox label="2">2.囊肿</el-checkbox>
                                <el-checkbox label="3">3.肿瘤</el-checkbox>
                                <el-checkbox label="4">4.其他</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9BA.includes('4')">
                        <el-form-item label="胸腺其他情况：" prop="item9BA1" labelWidth="120px" style="width:50%;">
                            <el-input :disabled="true" type="textarea" v-model="form.item9BA1"  maxlength="100" placeholder="不超过100个字"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row  v-if="form.item9!=1">
                        <el-form-item label="3. 淋巴结（肺门或纵隔短径≥10mm及任意大小食管旁淋巴结）" prop="item9C">
                            <el-radio-group :disabled="true" v-model="form.item9C" @change="clearItem(form.item9C,[],['item9COtherArr'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9C==2">
                             <el-form-item label="部位名称：" prop="item9COtherArr" class="blockTit">
                                <el-checkbox-group :disabled="true" v-model="form.item9COtherArr">
                                    <el-checkbox 
                                    v-for="(item,index) in bwmc" 
                                    :key="`index${index}`"
                                    :label="item.id" >{{item.dataName}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9!=1">
                        <el-form-item label="4. 是否存在肺门或纵隔钙化淋巴结？" prop="item9D">
                            <el-radio-group :disabled="true" v-model="form.item9D">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9!=1">
                        <el-form-item label="5. 是否存在腋窝淋巴结？" prop="item9E">
                            <el-radio-group :disabled="true" v-model="form.item9E" @change="clearItem(form.item9E,['item9EOther'],['item9EA'],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9E==2">
                        <el-form-item label="5.1. 腋窝淋巴结的位置：" prop="item9EA">
                            <el-checkbox-group :disabled="true" v-model="form.item9EA">
                                <el-checkbox label="1">1.右</el-checkbox>
                                <el-checkbox label="2">2.左</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9E==2">
                        <el-form-item label="详细描述：" labelWidth="120px" prop="item9EOther"  style="width:50%;">
                            <el-input :disabled="true" type="textarea" v-model.trim="form.item9EOther" maxlength="100" placeholder="不超过100个字"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9!=1">
                        <el-form-item label="6. 食管是否存在异常？" prop="item9F">
                            <el-radio-group :disabled="true" v-model="form.item9F" @change="clearItem(form.item9F,['item9FOther'],[],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9F==2">
                        <el-form-item label="详细描述：" labelWidth="120px" prop="item9FOther" style="width:50%;">
                            <el-input :disabled="true" v-model.trim="form.item9FOther" type="textarea"
                                    maxlength="100" placeholder="不超过100个字"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9!=1">
                        <el-form-item label="7. 是否存在裂孔疝？" prop="item9G">
                            <el-radio-group :disabled="true" v-model="form.item9G" @change="clearItem(form.item9G,['item9GOther'],[],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9G==2">
                        <el-form-item label="详细描述：" prop="item9GOther" labelWidth="120px" style="width:50%;">
                            <el-input :disabled="true" v-model.trim="form.item9GOther" type="textarea" placeholder="不超过100个字"
                                    maxlength="100"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item9!=1">
                        <el-form-item label="本次检查甲状腺/纵隔异常的附加描述：" prop="item9H" class="blockTit">
                            <el-input :disabled="true" v-model.trim="form.item9H" type="textarea" :rows="2"
                                      style="width: 50%;" placeholder="不超过100个字" maxlength="100"></el-input>
                        </el-form-item>
                    </el-row>
                        <!-- 第六部分 -->
                        <el-row class="bigTitle">
                             <el-form-item label="六、本次检查是否存在乳腺异常？" prop="item10"  class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item10" @change="clearItem(form.item10,['item10A'],[],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        </el-row>
                        <el-row v-if="form.item10==2">
                            <el-form-item label="详细描述：" prop="item10A" labelWidth="120px" style="width:50%;">
                                <el-input :disabled="true" v-model.trim="form.item10A" type="textarea" placeholder="不超过100个字" maxlength="100"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row class="bigTitle">
                             <el-form-item label="七、本次检查是否存在腹部异常？" prop="item11" class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item11" @change="clearItem(form.item11,['item11A'],[],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        </el-row>
                        <el-row v-if="form.item11==2">
                            <el-form-item label="详细描述：" prop="item11A" labelWidth="120px" style="width:50%;">
                                <el-input :disabled="true" v-model.trim="form.item11A" type="textarea" placeholder="不超过100个字" maxlength="100"></el-input>
                            </el-form-item>
                        </el-row>
                       <el-row class="bigTitle">
                            <el-form-item label="八. 本次检查是否存在骨质异常？" prop="item12"  class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item12" @change="clearItem(form.item12,['item12Other'],[],1)">
                                <el-radio :label="1">1.无</el-radio>
                                <el-radio :label="2">2.有</el-radio>
                            </el-radio-group>
                        </el-form-item>
                       </el-row>
                       <el-row v-if="form.item12==2">
                            <el-form-item label="详细描述：" prop="item12Other" labelWidth="120px" style="width:50%;">
                                 <el-input :disabled="true" v-model.trim="form.item12Other" type="textarea"
                                         maxlength="100" placeholder="不超过100个字"></el-input>
                             </el-form-item>
                        </el-row>
                       <el-row class="bigTitle">
                          <el-form-item label="九、其他表现" prop="item15" class="blockTit">
                              <el-input :disabled="true" v-model.trim="form.item15" type="textarea" style="width: 50%;"  placeholder="不超过200个字" maxlength="200"></el-input>
                          </el-form-item>
                       </el-row>
                       
                    <h2>对于其他表现的处理建议</h2>
                    <el-row>
                        <el-form-item label="1. 是否需要国家癌症中心会诊（复阅）？" prop="item130">
                            <el-radio-group :disabled="true" v-model="form.item130">
                                <el-radio :label="1">1.否</el-radio>
                                <el-radio :label="2">2.是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="2. 是否需要随诊" prop="item13">
                            <el-radio-group :disabled="true" v-model="form.item13" @change="clearItem(form.item13,['item13A','item13B'],[],1)">
                                <el-radio :label="1">1.否</el-radio>
                                <el-radio :label="2">2.是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item13==2">
                        <el-form-item label="2.1. 随诊周期是： " prop="item13A" class="blockTit">
                            <el-radio-group :disabled="true" v-model="form.item13A" @change="clearitem13B(form.item13A)">
                                <el-radio :label="1">1个月</el-radio>
                                <el-radio :label="2">3个月</el-radio>
                                <el-radio :label="3">6个月</el-radio>
                                <el-radio :label="4">1年</el-radio>
                                <el-radio :label="5">其他
                                    <span v-if="form.item13A==5">
                ，具体随诊周期（单位:月）：
                  <el-form-item label="" labelWidth="0px" prop="item13B" class="inline" :inline-message="true">
                    <el-input :disabled="true" v-model.trim="form.item13B" size="mini"></el-input>
                  </el-form-item>
              </span>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="3. 是否需要临床处理？" prop="item14">
                            <el-radio-group :disabled="true" v-model="form.item14" @change="clearItem(form.item14,[],['item14A'],1)">
                                <el-radio :label="1">1.否</el-radio>
                                <el-radio :label="2">2.是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item14==2">
                        <el-form-item label="3.1. 临床处理意见（可多选）" prop="item14A" class="blockTit">
                            <el-checkbox-group :disabled="true" v-model="form.item14A">
                                <el-checkbox label="1">1.抗炎和复查</el-checkbox>
                                <el-checkbox label="2">2.穿刺</el-checkbox>
                                <el-checkbox label="3">3.气管镜</el-checkbox>
                                <el-checkbox label="4">4.增强CT</el-checkbox>
                                <el-checkbox label="5">5.PET-CT</el-checkbox>
                                <el-checkbox label="6">6.超声</el-checkbox>
                                <el-checkbox label="7">7.乳腺X线</el-checkbox>
                                <el-checkbox label="8">8.临床抗肿瘤治疗</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-row>
                    <h2>填表信息</h2>
                    <el-row>
                        <el-form-item label="填表人员" prop="inputUser" style="display:inline-block;float:left;width:30%;">
                            <el-input :disabled="true" v-model.trim="form.inputUser" size="mini" maxlength="50"></el-input>
                        </el-form-item>
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
      <!-- $route.query.flag 0:来源评估管理查看问卷 ，1:来源评估管理修改问卷，2:来源质控管理查看问卷  -->
      <!-- 报告已录入不能编辑 -->
      <div class="btns"  v-if="$route.query.source!='gj' && $route.query.reportInputStatus!=1">
        <router-link :to="{path:'/form/resultentry',query:{
        screeningId:$route.query.screeningId,
        id:$route.query.id,
        surverId:$route.query.surverId,
        personId:$route.query.personId,
        resultFormId:$route.query.resultFormId,
        signedDate:$route.query.signedDate,
        resultInputStatus:$route.query.resultInputStatus,
        source:'look'}}">
          <el-button type="primary" size="small">编辑</el-button>
        </router-link>
      </div>
    </cancer-widget>
   </div>
  </div>
</template>

<script>
import VALIDATE from "@/utils/validate";
import getPersonDetail from "@/views/recruitmentPoint/form/getPersonDetail";
import getCTResultForm from "@/views/recruitmentPoint/form/ctResult/CTForm";
import { sexFilter } from "@/filters/filter";
export default {
  mixins: [getPersonDetail, getCTResultForm],
  data() {
    return {
      bwmc: [], //部位名称
      //是否显示录入结节
      tuberState: false,
      checkDate: new Date(), //评价日期
      evaluateDate: new Date(), //评价日期
      personDetail: {}, //受试者基本信息
      rules: {},
      form: {
        checkDate: null, //评价日期
        evaluateDate: new Date(), //评价日期
        item01: null,
        item1: null, //本次检查肺气肿是否存在异常 1，否；2，轻；3，中；4，重；
        item2: null, //本次检查肺囊肿/肺大泡是否存在异常 1，否；2，轻；3，中；4，重；
        item2A: [], //本次检查肺囊肿/肺大泡异常位置 1，RUL；2，RML；3，RLL；4，LUL；5，LLL；
        item3: null, //本次检查小气道病变/支扩是否异常 1，否；2，轻；3，中；4，重；
        item3A: [], //本次检查小气道病变/支扩异常位置 1，RUL；2，RML；3，RLL；4，LUL；5，LLL；
        item4: null, //本次检查肺间质疾病是否异常 1，否；2，轻；3，中；4，重；
        item4A: [], //本次检查肺间质疾病异常位置 1，RUL；2，RML；3，RLL；4，LUL；5，LLL；
        item5: null, //本次检查纤维瘢痕是否异常 1，否；2，轻；3，中；4，重；
        item5A: [], //本次检查纤维瘢痕异常位置 1，RUL；2，RML；3，RLL；4，LUL；5，LLL；
        item6: null, //本次检查肺不张是否异常 1，否；2，轻；3，中；4，重；
        item6A: [], //本次检查肺不张异常位置 1，RUL；2，RML；3，RLL；4，LUL；5，LLL；
        item07: null,
        item7: null, //本次检查胸膜是否异常 1是 2否
        item7A: null, //本次检查右胸腔积液是否存在异常 1，无；2，少量；3，中量；4，大量；
        item7B: null, //本次检查左胸腔积液是否存在异常 1，无；2，少量；3，中量；4，大量；
        item7C: null, //本次检查胸膜增厚或胸膜斑块是否存在异常 1无 2有 3右 4左 5钙化
        item7C1: [],
        item7C2: null,
        item7C3: null,
        item7D: null, //本次检查肺实质及胸膜异常的附加描述
        item8: null, //本次检查心脏是否存在异常 1 是 2 否
        item81: null, //主动脉壁钙化
        item82: null, //房室增大
        item83: null, // 瓣膜钙化
        item8A: null, //左主干冠状动脉钙化 1，无；2，轻；3，中；4，重
        item8A0: null,
        item9AA1: null,
        item9BA1: null,
        item130: null,
        item8B: null, //前降支冠状动脉钙化 1，无；2，轻；3，中；4，重
        item8C: null, //回旋支冠状动脉钙化 1，无；2，轻；3，中；4，重
        item8D: null, //右主支冠状动脉钙化 1，无；2，轻；3，中；4，重
        item8E: null, //心包积液1，无；2，轻；3，中；4，重
        item9: null, //本次检查甲状腺/纵隔是否存在异常 1是 2否
        item9A: null, //甲状腺是否存在异常 1是 2否
        item9AA: [], //甲状腺存在异常情况 1钙化；2，囊肿；3，肿瘤；4，其他
        item9B: null, //胸腺是否存在异常 1 是 2 否
        item9BA: [], //胸腺存在异常情况 1钙化；2，囊肿；3，肿瘤；4，其他
        item9C: null, //淋巴结（肺门或纵隔短径＞10mm及任意大小食管旁淋巴结）是否存在异常 1是 2 否
        item9COtherArr: [], //部位名称
        item9D: null, //肺门或纵隔钙化淋巴结是否存在异常 1 是 2否
        item9E: null, //腋窝淋巴结是否存在异常 1是 2否
        item9EA: [], //腋窝淋巴结是否存在异常 1是 2否
        item9EOther: null, //详细描述
        item9F: null, //食管是否存在异常 1 是 2否
        item9FOther: null, //详细描述
        item9G: null, //裂孔疝是否存在异常 1是 2否
        item9GOther: null, //详细描述
        item9H: null, //本次检查甲状腺/纵隔异常的附加描述
        item10: null, //本次检查乳腺异常(包括位置、大小、边界等)是否存在 1是 2否
        item10A: null, //详细描述
        item11: null, //本次检查腹部异常是否存在异常 1是 2否
        item11A: null, //详细描述
        item12: null, //本次检查骨质异常是否存在异常 1是 2否
        item12Other: null, //详细描述
        item13: null, //是否需要随诊 1是 2否
        item13A: null, //随访周期 1，1个月；2，3个月；3，6个月；4，1年；5，其他
        item13B: null, //其他输入
        item14: null, //是否临床处理 1是 2否
        item14A: [], //临床处理 1，抗炎；2， 穿刺；3，气管；4，镜增强CT；5，PET-CT；
        item15: null, //其他表现
        inputUser: sessionStorage.getItem("trueName"), //录入人
        inputTime: new Date() //录入时间
      },
      formRules: {
        checkDate: [{ required: true, message: "必填", trigger: "change" }],
        item01: [{ required: true, message: "必填", trigger: "change" }],
        item1: [{ required: true, message: "必填", trigger: "change" }],
        item2: [{ required: true, message: "必填", trigger: "change" }],
        item2A: [{ required: true, message: "必填", trigger: "change" }],
        item3: [{ required: true, message: "必填", trigger: "change" }],
        item3A: [{ required: true, message: "必填", trigger: "change" }],
        item4: [{ required: true, message: "必填", trigger: "change" }],
        item4A: [{ required: true, message: "必填", trigger: "change" }],
        item5: [{ required: true, message: "必填", trigger: "change" }],
        item5A: [{ required: true, message: "必填", trigger: "change" }],
        item6: [{ required: true, message: "必填", trigger: "change" }],
        item6A: [{ required: true, message: "必填", trigger: "change" }],
        item7: [{ required: true, message: "必填", trigger: "change" }],
        item7A: [{ required: true, message: "必填", trigger: "change" }],
        item7B: [{ required: true, message: "必填", trigger: "change" }],
        item7C: [{ required: true, message: "必填", trigger: "change" }],
        item7C1: [{ required: true, message: "必填", trigger: "change" }],
        item7C2: [{ required: true, message: "必填", trigger: "change" }],
        item7C3: [{ required: true, message: "必填", trigger: "change" }],
        item8A0: [{ required: true, message: "必填", trigger: "change" }],
        item9AA1: [{ required: true, message: "必填", trigger: "blur" }],
        item9BA1: [{ required: true, message: "必填", trigger: "blur" }],
        item130: [{ required: true, message: "必填", trigger: "change" }],
        item8: [{ required: true, message: "必填", trigger: "change" }],
        item81: [{ required: true, message: "必填", trigger: "change" }],
        item82: [{ required: true, message: "必填", trigger: "change" }],
        item83: [{ required: true, message: "必填", trigger: "change" }],
        item8A: [{ required: true, message: "必填", trigger: "change" }],
        item8B: [{ required: true, message: "必填", trigger: "change" }],
        item8C: [{ required: true, message: "必填", trigger: "change" }],
        item8D: [{ required: true, message: "必填", trigger: "change" }],
        item8E: [{ required: true, message: "必填", trigger: "change" }],
        item9: [{ required: true, message: "必填", trigger: "change" }],
        item9A: [{ required: true, message: "必填", trigger: "change" }],
        item9AA: [{ required: true, message: "必填", trigger: "change" }],
        item9B: [{ required: true, message: "必填", trigger: "change" }],
        item9BA: [{ required: true, message: "必填", trigger: "change" }],
        item9C: [{ required: true, message: "必填", trigger: "change" }],
        item9COtherArr: [
          { required: true, message: "必填", trigger: "change" }
        ],
        item9D: [{ required: true, message: "必填", trigger: "change" }],
        item9E: [{ required: true, message: "必填", trigger: "change" }],
        item9EA: [{ required: true, message: "必填", trigger: "change" }],
        item9EOther: [{ required: true, message: "必填", trigger: "blur" }],
        item9F: [{ required: true, message: "必填", trigger: "change" }],
        item9FOther: [{ required: true, message: "必填", trigger: "blur" }],
        item9G: [{ required: true, message: "必填", trigger: "change" }],
        item9GOther: [{ required: true, message: "必填", trigger: "change" }],
        item10: [{ required: true, message: "必填", trigger: "change" }],
        item10A: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        item11: [{ required: true, message: "必填", trigger: "change" }],
        item11A: [
          { required: true, message: "必填", trigger: "change" },
          { required: true, message: "必填", trigger: "blur" }
        ],
        item12: [{ required: true, message: "必填", trigger: "change" }],
        item12Other: [{ required: true, message: "必填", trigger: "change" }],
        item13: [{ required: true, message: "必选", trigger: "change" }],
        item13A: [{ required: true, message: "必选", trigger: "change" }],
        item13B: [
          { required: true, message: "必填", trigger: "blur" },
          { trigger: "blur", validator: VALIDATE.countInit100 }
        ],
        item14: [{ required: true, message: "必选", trigger: "change" }],
        item14A: [{ required: true, message: "必选", trigger: "change" }],
        item15: [
          { required: false, message: "必填", trigger: "blur" },
          { trigger: "blur", validator: VALIDATE.length200 }
        ],
        inputUser: [{ required: true, message: "必填", trigger: "blur" }],
        inputTime: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getBWMC();
    this.getPersonDetailFun(
      this.$route.query.personId,
      this.$route.query.surverId
    );
    this.getCTResultForm(this.$route.query.resultFormId);
  },
  mounted() {},
  methods: {
    //   查询部位名称
    getBWMC() {
      this.$axios_http({
        url: "/base/ct/getDataName/bwmc",
        data: {},
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.bwmc = res.data.result;
        }
      });
    },
    //根据条件清空
    /**
     * val  选中的值
     * array1  为单选或文本题
     * array2  为复选题
     * clearVal  选中值==clearVal,则清空选项
     */
    clearItem(val, array1, array2, clearVal) {
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
    },
    clearitem13B(val) {
      if (val != 5) {
        this.form.item13B = null;
      }
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
    border-bottom: 1px solid #f6f6f6;
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
  // border-bottom:1px dashed #f6f6f6;
}
.el-form-item {
  margin-bottom: 0;
}
.el-form-item__label {
  color: #666;
  // font-weight: bold;
  font-size: 16px;
}
.el-form-item .el-input,
.el-form-item .el-date-editor.el-input,
.el-form-item .el-date-editor.el-input__inner {
  width: 190px;
}
.other .el-form-item {
  float: left;
  min-width: 290px;
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
.smallTit {
  margin-top: 10px;
  display: block;
}
.btns {
  padding-top: 10px;
  border-top: 1px dashed rgb(220, 223, 230);
  text-align: center;
}
</style>
<style>
.el-form-item__error {
  position: relative !important;
}
.j_content .el-radio__input.is-disabled.is-checked + span.el-radio__label {
  color: #409eff;
}
.j_content .el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #409eff;
  border-color: #409eff;
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
.j_content .el-input.is-disabled.grayInput .el-input__inner {
  background: #ededed;
}
.j_content .el-textarea.is-disabled .el-textarea__inner {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
  cursor: not-allowed;
}
.j_content
  .el-checkbox__input.is-disabled.is-checked
  + span.el-checkbox__label {
  color: #409eff;
  cursor: not-allowed;
}
.j_content .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.j_content
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #fff;
}
.el-form .bigTitle .el-form-item__label,
.el-form .bigTitle .el-radio__label {
  font-size: 14px;
  font-weight: bold;
}
</style>