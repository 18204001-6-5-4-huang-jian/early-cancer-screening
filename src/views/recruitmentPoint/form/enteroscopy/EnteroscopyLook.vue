<template>
    <div>
        <div class="reportBox j_content">
            <cancer-widget>
                <h1>结直肠癌筛查结果记录表</h1>
                <el-form :model="personDetail" :rules="rules" ref="personDetail" :inline="true"
                         class="demo-personDetail">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="SID/问卷ID：" prop="name">
                                {{personDetail.surverId}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="筛查ID：" prop="sex" v-if="personDetail.itemsUnderIt == 2">
                                {{$route.query.screeningId}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="检查日期：">
                                <el-date-picker
                                        disabled
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="timestamp"
                                        :clearable="false"
                                        size="mini"
                                        v-model="checkDate">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="评估日期：">
                                {{personDetail.evaluateDate | dateFilter}}
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
                <el-form :model="form" :rules="formRules" ref="form" class="demo-form" :inline="true" labelPosition="left">
                    <h2>直肠指诊</h2>
                    <el-row>
                        <el-form-item label="1. 是否进行了直肠指诊(无法耐受肠镜者)？" prop="item21">
                            <el-radio-group disabled v-model="form.item21" @change="clearItem(form.item21,['item21A','item21B','item21C','item21D','item21E'],1)">
                                <el-radio :label="1">1.是</el-radio>
                                <el-radio :label="2">2.否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="1.1. 参与者直肠指诊结果有无肿块？" prop="item21A" v-if="form.item21 == 1" label-width="285px">
                            <el-radio-group disabled v-model="form.item21A"  @change="clearItem(form.item21A,['item21B','item21C','item21D','item21E'],1)">
                                <el-radio :label="1">1.是</el-radio>
                                <el-radio :label="2">2.否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row v-if="form.item21A == 1">
                        <el-form-item label="1.1.1 肿块距肛距离(厘米)"  prop="item21B">
                            <el-input disabled type="text" size="mini" v-model="form.item21B" style="width:60px"></el-input>
                        </el-form-item>
                        <el-form-item label="肿块位置(点钟)"  prop="item21C" >
                            <el-input disabled type="text" size="mini"   v-model="form.item21C" style="width:60px;"></el-input>
                        </el-form-item>
                        <el-form-item label="肿块占据肠腔范围(填几分之几)" prop="item21D">
                            <el-input disabled type="text" size="mini"   v-model="form.item21D"  style="width:60px;"></el-input>
                        </el-form-item>
                        <span class="input-span">/</span>
                        <el-form-item label=""  prop="item21E" >
                            <el-input disabled type="text" size="mini"  v-model="form.item21E"  style="width:60px;"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="2. 参与者是否完成了结肠镜检查？"  prop="item22" label-width="285px">
                            <el-radio-group disabled v-model="form.item22">
                                <el-radio :label="1">1.是</el-radio>
                                <el-radio :label="2">2.否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <div v-if="form.item22!=2">
                        <h2>肠镜检查结果</h2>
                        <el-row>
                            <el-form-item label="1. 肠镜操作方式？" prop="item31">
                                <el-radio-group disabled v-model="form.item31" @change="clearItem(form.item3,['item3A'],1)">
                                    <el-radio :label="1">1. 单人</el-radio>
                                    <el-radio :label="2">2. 双人</el-radio>
                                    <el-radio :label="3">3. 单双人</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="2. 是否采用麻醉？" prop="item32">
                                <el-radio-group disabled v-model="form.item32">
                                    <el-radio :label="1">1.是</el-radio>
                                    <el-radio :label="2">2.否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="3. 肠镜到达深度？"  prop="item33">
                                <el-select disabled v-model="form.item33" size="mini">
                                    <el-option label="回肠末端" :value="1"></el-option>
                                    <el-option label="回盲瓣" :value="2"></el-option>
                                    <el-option label="升结肠" :value="3"></el-option>
                                    <el-option label="肝曲" :value="4"></el-option>
                                    <el-option label="横结肠" :value="5"></el-option>
                                    <el-option label="脾曲" :value="6"></el-option>
                                    <el-option label="降结肠" :value="7"></el-option>
                                    <el-option label="乙状结肠" :value="8"></el-option>
                                    <el-option label="直肠" :value="9"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="4. 肠道准备情况？" prop="item34">
                                <el-radio-group disabled v-model="form.item34">
                                    <el-radio :label="1">1. I 级（肠道准备满意）</el-radio>
                                    <el-radio :label="2">2. II级（肠道准备比较满意）</el-radio>
                                    <el-radio :label="3">3. III级（肠道准备不满意）</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="5. 肠镜完成时间（分钟）:" prop="item35">
                                <el-input disabled placeholder="请输入" v-model="form.item35" size="mini" style="width:160px;">
                                </el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="6. 是否发生并发症(可多选)？"  prop="item36">
                                <el-checkbox-group v-model="form.item36" style="height: auto;padding-left:18px;" @change="item36Change">
                                    <el-checkbox label="1"  >1. 无</el-checkbox>
                                    <el-checkbox label="2"  :disabled="(form.item36 && form.item36.indexOf('1') >= 0)">2. 肠道穿孔</el-checkbox>
                                    <el-checkbox label="3"  :disabled="(form.item36 && form.item36.indexOf('1') >= 0)">3. 出血</el-checkbox>
                                    <el-checkbox label="4"  :disabled="(form.item36 && form.item36.indexOf('1') >= 0)">4. 其他　</el-checkbox>
                                    
                                </el-checkbox-group>
                            </el-form-item>
                        </el-row>
                        <el-row v-if="form.item36.indexOf('3')>-1">
                            <el-form-item label="6.1. 请输入出血程度：" class="forminline" prop="item3631">
                                <el-input disabled v-model="form.item3631"   style="width: 150px;" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item label=""  prop="item3632" >
                                <span class="input-span">出血处理情况：</span>  <el-input disabled v-model="form.item3632"  style="width: 150px;" size="mini"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row v-if="form.item36.indexOf('4')>-1">
                            <el-form-item label="6.2. 请输入其他并发症描述："  prop="item364Other" >
                            　<el-input disabled v-model="form.item364Other"  style="width: 150px;" size="mini"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="7. 肠镜检查结果是否检出息肉？" prop="item37">
                                <el-radio-group disabled v-model="form.item37" @change="clearItem(form.item37,['item37A'],1)">
                                    <el-radio :label="1">1.是</el-radio>
                                    <el-radio :label="2">2.否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="7.1 检出的息肉具体数为"  prop="item37A" v-if="form.item37 == 1">
                                <el-input disabled v-model="form.item37A"  style="width: 120px" size="mini"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="8. 是否检出除息肉外其他病变？" prop="item38">
                                <el-radio-group disabled v-model="form.item38" @change="clearItem(form.item38,['item38A'],1)">
                                    <el-radio :label="1">1.是</el-radio>
                                    <el-radio :label="2">2.否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="8.1 其他病变类型（请说明）："  prop="item38Other" v-if="form.item38 == 1">
                                <el-input disabled v-model="form.item38Other"  style="width: 200px" size="mini"></el-input>
                            </el-form-item>
                        </el-row>
                        <div v-for="x,index in form.hosCjLesionsRecordInfoPOList">
                            <h2>病变部位{{index+1}}</h2>
                            <!-- <div class="add-tuber">
                                <el-button @click="pushLesions()"  type="text">添加病变部位</el-button>
                                <el-button @click="deleteLesions(index)" type="text" :disabled="form.hosCjLesionsRecordInfoPOList.length<2" >删除病变部位</el-button>
                            </div> -->
                            <div>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="1. 部位:" class="formhalfline" :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item1'" :rules="hosCjLesionsRecordInfoPOListRules.item1">
                                            <el-select disabled v-model="x.item1" placeholder="请选择" size="mini" :ref="'ref'+index" >
                                                <el-option
                                                        v-for="item in partmentoptions"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">{{item.label}}
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="2. 距肛（厘米）:" class="formhalfline" prop="item2"  :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item2'" :rules="hosCjLesionsRecordInfoPOListRules.item2">
                                            <el-input disabled placeholder="请输入" v-model="x.item2" size="mini"  style="width:160px;">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="3. 镜下考虑病变类型:" class="formhalfline" prop="item3"  :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item3'" :rules="hosCjLesionsRecordInfoPOListRules.item3">
                                            <el-select disabled v-model="x.item3" placeholder="请选择"   size="mini">
                                                <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="4. 病理标本号:" class="formhalfline" prop="item4"  :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item4'" :rules="hosCjLesionsRecordInfoPOListRules.item4">
                                            <el-input disabled placeholder="请输入" v-model="x.item4"  size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="5. 最大直径（厘米）:" class="formhalfline" prop="item5"  :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item5'" :rules="hosCjLesionsRecordInfoPOListRules.item5">
                                            <el-input disabled placeholder="请输入" v-model="x.item5"  size="mini" style="width:160px;">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="6. 病变形状:" class="formhalfline" prop="item6"  :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item6'" :rules="hosCjLesionsRecordInfoPOListRules.item6">
                                            <el-radio-group disabled v-model="x.item6"  >
                                                <el-radio :label="1">1. 隆起</el-radio>
                                                <el-radio :label="2">2. 扁平</el-radio>
                                                <el-radio :label="3">3. 凹陷</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="7. 有无蒂:" class="formhalfline" prop="item7"  :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item7'" :rules="hosCjLesionsRecordInfoPOListRules.item7" label-width="97px">
                                            <el-radio-group disabled v-model="x.item7"  @change="clearItem(x.item7,x,2)">
                                                <el-radio :label="1">1. 有</el-radio>
                                                <el-radio :label="2">2. 无</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="7.1. 蒂形状:" class="formhalfline" prop="item8" v-if="x.item7==1"  :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item8'" :rules="hosCjLesionsRecordInfoPOListRules.item8">
                                            <el-radio-group disabled v-model="x.item8"  >
                                                <el-radio :label="1">1. 广蒂</el-radio>
                                                <el-radio :label="2">2. 亚蒂</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="8. 病变颜色:" class="formhalfline" prop="item9"  :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item9'" :rules="hosCjLesionsRecordInfoPOListRules.item9">
                                            <el-radio-group disabled v-model="x.item9" >
                                                <el-radio :label="1">1. 红色</el-radio>
                                                <el-radio :label="2">2. 灰白色</el-radio>
                                                <el-radio :label="3">3. 其它</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="9. 有无出血:" class="formhalfline" prop="item10"  :prop="'hosCjLesionsRecordInfoPOList.'+index+'.item10'" :rules="hosCjLesionsRecordInfoPOListRules.item10">
                                            <el-radio-group disabled v-model="x.item10"  >
                                                <el-radio :label="1">1. 出血</el-radio>
                                                <el-radio :label="2">2. 不出血</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>

                        </div>
                        <h2>其他病变</h2>
                        <el-row>
                            <el-form-item label="1. 其它病变:" labelWidth="100px"  prop="otherLesions" class="blockTit">
                                <el-input disabled type="textarea"  v-model="form.otherLesions" :autosize="{minRows:3}" style="width: 100%;min-width: 500px;margin-left:25px;"></el-input>
                            </el-form-item>
                        </el-row>
                    </div>
                    
                    <h2>诊断</h2>
                    <el-row>
                        <el-form-item label="1. 内镜下诊断:" labelWidth="120px" prop="endoscopicDiagnosis" class="blockTit">
                            <el-input disabled type="textarea" v-model="form.endoscopicDiagnosis" :autosize="{minRows:3}" style="width: 100%;min-width: 500px;margin-left:25px;"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="2. 诊断医生:" labelWidth="100px" prop="diagnosisDoctor" >
                            <el-input disabled size="mini"  v-model="form.diagnosisDoctor"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="3. 是否做了病理:" class="formhalfline" prop="pathology">
                            <el-radio-group disabled v-model="form.pathology"  >
                                <el-radio :label="1">1.是</el-radio>
                                <el-radio :label="2">2.否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <h2>填表信息</h2>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="填表人员:" labelWidth="100px" prop="inputUser" >
                                <el-input disabled size="mini"  v-model="form.inputUser"></el-input>
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
                                    value-format="timestamp"
                                    size="mini"
                                    v-model="form.inputTime">
                            </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                   
                </el-form>
                <!-- $route.query.flag 0:来源评估管理查看问卷 ，1:来源评估管理修改问卷，2:来源质控管理查看问卷  -->
                <div class="btns" v-if="$route.query.source!='gj' && $route.query.reportInputStatus!=1" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
                    <router-link :to="{path:'/form/enteroscopyentry',query:{
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
                <!-- <div>
                    <p class="txsm">
                        填写说明：
                    </p>
                    <p class="txsm">1.肠道准备情况：I
                        级（肠道准备满意）：肠腔内无粪便或渣，无粪水潴留，肠液清亮，操作顺利，观察良好；II级（肠道准备比较满意）：肠腔内无粪便残渣，肠腔内有污浊粪水，操作比较顺利及观察基本清晰；III级（肠道准备不满意）：肠腔内有粪便残渣或粪块，操作不顺利，甚至因肠道准备不足，检查或治疗被迫停止。
                    </p>
                    <p class="txsm">
                        2.部位为距肛**cm（以退镜长度为准），并以肠前壁正中为时钟12点位置，肠后壁正中为6点钟，顺时针描写在肠腔的位置。
                    </p>
                    <p class="txsm">
                        3.每一个病变信息中的内容需要填写完整。
                    </p>
                </div> -->
            </cancer-widget>
        </div>
    </div>
</template>

<script>
    import VALIDATE from '@/utils/validate'
    import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
    import getEnteroscopyForm from '@/views/recruitmentPoint/form/ctResult/CTForm'
    import {sexFilter} from '@/filters/filter'
    export default {
        mixins: [getPersonDetail,getEnteroscopyForm],
        data() {
            const item_2_1_b_change = (rule, value, callback) => {
                if(this.form['item_2_1_a'] == '1'){
                    if(!value || isNaN(value*1) || value*1<=0){
                        callback(new Error('请输入正数'))
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }
            const item_2_1_b_blur = (rule, value, callback) => {
                if(this.form['item21A'] == '1'){
                    if(!value || isNaN(value*1) || value*1<=0){
                        callback(new Error('请输入正数'))
                    }else{
                        this.form['item21B'] = (value*1).toFixed(1)
                        callback();
                    }
                }else{
                    callback();
                }
            }
            const item_2_1_c = (rule, value, callback) => {
                if(this.form['item21A'] == '1'){
                    if(value==null || value=='' || value==undefined || isNaN(value*1) || ((value*1)%1!=0) ||value*1<0 || value*1>12){
                        callback(new Error('请输入0-12的整数'))
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            }
            const item_2_1_d = (rule, value, callback) => {
                if(this.form['item21A'] == '1'){
                    if(value==null || value=='' || value==undefined || isNaN(value*1) || ((value*1)%1!=0) ||value*1<0){
                        callback(new Error('请输入正整数'))
                    }else{
                        if(this.form['item21E'] && this.form['item21E']<value){
                            callback(new Error('分子不能大于分母'))
                        }else{
                            callback();
                        }
                    }
                }else{
                    callback();
                }
            }
            const item_2_1_e = (rule, value, callback) => {
                if(this.form['item21A'] == '1'){
                    if(value==null || value=='' || value==undefined || isNaN(value*1) || ((value*1)%1!=0) ||value*1<0){
                        callback(new Error('请输入正整数'))
                    }else{
                        if(this.form['item21D'] && this.form['item21D']>value){
                            callback(new Error('分母不能小于分子'))
                        }else{
                            callback();
                        }
                    }
                }else{
                    callback();
                }
            }
            const item_3_5 = (rule, value, callback) => {
                if (value != null && value != "" || value == undefined) {
                    if(value>=0){
                        callback()
                    }else{
                        callback(new Error('请输入非负数!'))
                    }
                }else{
                    callback(new Error('请输入'))
                }
            }
            var validateItem_3_7_a = (rule, value, callback) => {
                if (value && !(/^\+?[1-9][0-9]*$/.test(value))) {
                    callback(new Error('请输入正整数'))
                } else if (value * 1 < 1 || value * 1 > 20) {
                    callback(new Error('个数：1-20之间'));
                }else {
                    callback();
                }
            };
            const oneDecimalzdzz = (rule, value, callback) => {
                if (value != null && value != "" || value == undefined) {
                    if(value>0 && value<=10){
                        const that = this
                        this.form.hosCjLesionsRecordInfoPOList.forEach(function (item) {
                            if(item.item5 != null && item.item5 != '' && item.item5 != undefined)
                                that.$set(item ,['item5'], (item.item5 * 1).toFixed(1))
                        })
                        callback();
                    }else{
                        callback(new Error('直径:(0.1-10)厘米'))
                    }
                }else{
                    callback()
                }
            }
            const oneDecimaljglm = (rule, value, callback) => {
                if (value != null && value != "" || value == undefined) {
                    if(value>=0){
                        const that = this
                        this.form.hosCjLesionsRecordInfoPOList.forEach(function (item) {
                            if(item.item2 != null && item.item2 != '' && item.item2 != undefined)
                                that.$set(item ,['item2'], (item.item2 * 1).toFixed(1))
                        })
                        callback();
                    }else{
                        callback(new Error('请输入非负数'))
                    }
                }else{
                    callback()
                }
            }
            return {

                //是否显示录入结节
                tuberState: false,
                checkDate: new Date(),      //检查日期 
                personDetail: {},   //受试者基本信息
                rules: {},
                form: {
                    item21: '',//参与者是否进行了直肠指诊.1：是.2：否
                    item22: '',//参与者是否完成了结肠镜检查.1：是.2：否
                    item21A: '',//int 有无肿块 1：有.2：无
                    item21B: '',//double 肿块距肛cm
                    item21C: '',//几点钟
                    item21D: '',//占据肠腔 分子
                    item21E: '',//占据肠腔 分母
                    item31:'',
                    item32:'',
                    item33:'',
                    item34:'',
                    item35:'',
                    item36:[],
                    item3631:'',
                    item3632:'',
                    item37:'',
                    item37A:'',
                    item38:'',
                    item38Other:'',
                    inputTime: new Date(),
                    hosCjLesionsRecordInfoPOList:[{
                        item1:'',
                        item2:'',
                        item3:'',
                        item4:'',
                        item5:'',
                        item6:'',
                        item7:'',
                        item8:'',
                        item9:'',
                        item10:'',
                        sort:null
                    }],
                    otherLesions:'',
                    endoscopicDiagnosis:'',
                    diagnosisDoctor:'',
                    pathology:'',
                    inputUser:sessionStorage.getItem('trueName'),
                },
                hosCjLesionsRecordInfoPOListRules1:{
                    item1: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    item2: [
                        { required: true, message: '请输入', trigger: 'change' },
                        {  trigger: 'blur',validator:oneDecimaljglm }
                    ],
                    item3: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    // item4: [
                    //     { required: true, message: '请输入', trigger: 'change' }
                    // ],
                    item5: [
                        { required: true, message: '请输入', trigger: 'change' },
                        { trigger: 'blur',validator:oneDecimalzdzz }
                    ],
                    item6: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    item7: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    item8: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    item9: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    item10: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ]
                },
                hosCjLesionsRecordInfoPOListRules2:{

                },
                hosCjLesionsRecordInfoPOListRules:{

                },
                formRules: {
                    item21:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item21A:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item21B:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                        { message: '', trigger: 'change', validator: item_2_1_b_change},
                        { message: '', trigger: 'blur', validator: item_2_1_b_blur}
                    ],
                    item21C:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                        { message: '', trigger: 'change', validator: item_2_1_c},
                        { message: '', trigger: 'blur', validator: item_2_1_c}
                    ],
                    item21D:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                        { message: '', trigger: 'change', validator: item_2_1_d},
                        { message: '', trigger: 'blur', validator: item_2_1_d}
                    ],
                    item21E:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                        { message: '', trigger: 'change', validator: item_2_1_e},
                        { message: '', trigger: 'blur', validator: item_2_1_e}
                    ],
                    item22:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item31:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item32:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item33:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item34:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item35: [
                        { required: true, message: '请输入', trigger: 'blur'},
                        { required: true, message: '请输入', trigger: 'change'},
                        { message: '请输入非负数', trigger: 'change',validator:item_3_5 },
                        { message: '请输入非负数', trigger: 'blur',validator:item_3_5 }
                    ],
                    item36:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item3631:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    item3632:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    item364Other:[
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    item37:[
                        { required: true, message: '必选', trigger: 'change' },
                    ],
                    item37A:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                        { trigger: 'change',validator:validateItem_3_7_a },
                        { trigger: 'blur',validator:validateItem_3_7_a }
                    ],
                    item38:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    item38Other:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    otherLesions:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    endoscopicDiagnosis:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    diagnosisDoctor:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    pathology:[
                        { required: true, message: '必填', trigger: 'change' },
                        { required: true, message: '必填', trigger: 'blur' },
                    ],

                },
                options:[
                    {
                        value:'1',
                        label:'慢性炎性疾病'
                    },
                    {
                        value:'2',
                        label:'溃疡性结肠炎'
                    },
                    {
                        value:'3',
                        label:'克隆氏病'
                    },
                    {
                        value:'4',
                        label:'粘膜下隆起'
                    },
                    {
                        value:'5',
                        label:'息肉'
                    },
                    {
                        value:'6',
                        label:'增生性息肉'
                    },
                    {
                        value:'7',
                        label:'腺瘤性息肉'
                    },
                    {
                        value:'8',
                        label:'类癌'
                    },
                    {
                        value:'9',
                        label:'癌'
                    },
                ],
                partmentoptions: [{
                    value: '1',
                    label: '回肠末端'
                }, {
                    value: '2',
                    label: '回盲瓣'
                }, {
                    value: '3',
                    label: '升结肠'
                }, {
                    value: '4',
                    label: '肝曲'
                }, {
                    value: '5',
                    label: '横结肠'
                }, {
                    value: '6',
                    label: '脾曲'
                }, {
                    value: '7',
                    label: '降结肠'
                }, {
                    value: '8',
                    label: '降乙交界'
                }, {
                    value: '9',
                    label: '乙状结肠'
                }, {
                    value: '10',
                    label: '直乙交界'
                }, {
                    value: '11',
                    label: '直肠'
                }]
            };
        },
        created(){
            this.getPersonDetailFun(this.$route.query.personId, this.$route.query.surverId);
            if (this.$route.query.resultFormId) {
                this.getEnteroscopyForm(this.$route.query.resultFormId)
            }
        },
        mounted(){

        },
        methods: {
            //提交表单
            submitForm(type) {
                if (type == 1) {
                    this.$refs.form.validate((valid, obj) => {
                        if (valid) {
                            this.submitCTResult(1)
                        } else {
                            this.$message({
                                type: 'error',
                                message: '有未填项'
                            })
                        }
                    })
                } else if (type == 3) {
                    this.submitCTResult(3)
                }

            },
            //是否发生并发症
            item36Change(value){
                if(value.indexOf('1')>-1){
                    this.form.item36 = ['1']
                }
                if(value.indexOf('2') == -1){
                    this.form.item3631 =''
                    this.form.item3632 = ''
                }
                if(value.indexOf('4') == -1){
                    this.form.item364Other =''
                }
            },
            submitCTResult(type){
                this.form.inputStatus = type
                if (this.$route.query.id) {
                    this.form.checkInfoId = this.$route.query.id
                }
                this.form.checkDate = this.checkDate
                if(this.form.item36.indexOf('1')>-1){
                    this.form.item361 = 1
                }else{
                    this.form.item361 = null
                }
                if(this.form.item36.indexOf('2')>-1){
                    this.form.item362 = 1
                }
                if(this.form.item36.indexOf('3')>-1){
                    this.form.item363 = 1
                }
                if(this.form.item36.indexOf('4')>-1){
                    this.form.item364 = 1
                }
                this.form.hosCjLesionsRecordInfoPOList.filter( (item,i) => {
                    item.sort = i;
                })
                this.$axios_http({
                    url: '/base/cj/add/result',
                    data: this.form,
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        if(type==3){
                            this.form.checkInfoId=res.data.result.id;
                        }
                        if(type==1){
                            this.$router.push('/cancer/colorectal/list');
                        }
                    }
                })

            },
            //根据条件清空
            clearItem(val, data, count){
                if (count == 1) {
                    if (val != 1) {
                        for (let item in data) {
                            this.form[data[item]] = ''
                        }
                    }
                }else if(count == 2){
                    if(val != 1){
                        data.item8 = ''
                    }
                }

            },
            isArray(arr){
                if (Array.isArray) {
                    return Array.isArray(arr);
                } else {
                    return Object.prototype.toString.call(arr) == '[object Array]';
                }

            },
            //添加数组进入病变部位
            pushLesions(){
                var obj = {
                    item1:'',
                    item2:'',
                    item3:'',
                    item4:'',
                    item5:'',
                    item6:'',
                    item7:'',
                    item8:'',
                    item9:'',
                    item10:'',

                }
                this.form.hosCjLesionsRecordInfoPOList.push(obj)
                    this.$nextTick(() => {
                        let a = 'ref'+(this.form.hosCjLesionsRecordInfoPOList.length-1) +''
                        this.$refs[a][0].focus()
                    })
            },
            //删除病变部位
            deleteLesions(index){
                this.form.hosCjLesionsRecordInfoPOList.splice(index,1)
            },

        },
        watch:{
            'form.item37': function (val, b) {
                if(val==2){
                    this.hosCjLesionsRecordInfoPOListRules = this.hosCjLesionsRecordInfoPOListRules2
                }else {
                    this.hosCjLesionsRecordInfoPOListRules = this.hosCjLesionsRecordInfoPOListRules1
                }
             },
        }
    }
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
        margin-bottom: 0;
    }

    .el-form-item__label {
        color: #666;
        // font-weight: bold;
        font-size: 16px;
    }

    /*.el-form-item .el-input, .el-form-item .el-date-editor.el-input, .el-form-item .el-date-editor.el-input__inner {*/
        /*width: 190px;*/
    /*}*/

    .other .el-form-item {
        float: left;
        min-width: 290px;
    }

    h2 {
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

    .smallTit {
        margin-top: 10px;
        display: block;
    }
    .add-tuber{
        text-align: right;
        width: 300px;
        position: absolute;
        right:60px;
        margin-top: -45px;
        float: right;
        display: inline-block;
    }
    .txsm {
        font-size: 14px;
        margin: 10px 28px;
        color:#999;
    }
    .input-span{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #606266;
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