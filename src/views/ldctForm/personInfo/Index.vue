<template>
  <div>
    <cancer-widget>
    <div>
      <el-button  class="return-home" @click="goBack()">返 回</el-button>
    </div>
    <h3>研究对象个人信息记录表</h3>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" style="height:1230px;">
        <el-col :span="24">
          <el-form-item label="1. 姓名：" prop="name">
            <el-input v-model="form.name" style="width: 220px;" ref="name"  disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="2. 性别：" prop="sex">
            <el-input v-model="form.sex" auto-complete="off"  style="width: 40px;" ref="sex"
                      disabled></el-input>
            <span>1. 男  2. 女</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="3. 身份证号：" prop="idCard">
            <el-input v-model="form.idCard" auto-complete="off"  style="width: 220px;" ref="idCard"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="4. 出生日期：" prop="birthday">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              disabled
              ref="birth"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="5. 实足年龄：" prop="age">
            <el-input v-model="form.age" auto-complete="off"  style="width:60px;" ref="age" disabled
            ></el-input>
            岁
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="6. 民族：" prop="volk">
            <el-input v-model="form.volk" auto-complete="off"  ref="volk" style="width: 40px;"
                      :disabled="disabledState"></el-input>
            <span>1. 汉族  &nbsp;2. 蒙古族&nbsp;3. 回族&nbsp;4. 满族&nbsp;5. 壮族&nbsp;6. 维吾尔族&nbsp;7. 哈萨克族 &nbsp;8. 其他,请注明
                <span>
                    <el-form-item label="" labelWidth="0" prop="volkOther" style="display: inline-block;"
                                  v-if="form.volk == 8">
                    （ <el-input v-model="form.volkOther"  auto-complete="off"  ref="volkOther" :disabled="disabledState"
                                style="width: 200px;"
                    ></el-input> ）
                    </el-form-item>
                </span>
                <span>
                     <el-form-item label="" labelWidth="0" prop="" style="display: inline-block;"
                                   v-if="form.volk != 8">
                    （ <el-input v-model="form.volkOther" disabled auto-complete="off"  ref="volkOther"
                                style="width: 100px;"
                     ></el-input> ）
                    </el-form-item>
                </span>
            9. 未知</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="7. 本人电话：" prop="phone">
            <el-input v-model="form.phone" auto-complete="off" ref="phone"  style="width: 220px;"
                      :disabled="disabledState"
            ></el-input>
            （手机,必填）
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="" prop="contact_area" style="display: inline-block;">
            <el-input v-model="form.contact_area" auto-complete="off" ref="contact_area" 
                      @change="getTelphone" style="width: 70px;" :disabled="disabledState"
            ></el-input>
          </el-form-item>
          -
          <el-form-item label="" labelWidth="=10px" prop="contact_telephone" style="display: inline-block;">
            <el-input v-model="form.contact_telephone" ref="contact_telephone" auto-complete="off" 
                      @change="getTelphone" style="width: 136px" :disabled="disabledState"
            ></el-input>
            （固定电话,尽量填）
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="8. 联系人电话（固定电话、手机至少填一项）:" label-width="360px" prop="contactNumber">(
            <el-form-item label="与本人关系:" label-width="108px" prop="contactRelationship" style="display: inline-block;">
              <el-input v-model="form.contactRelationship" ref="contactRelationship" auto-complete="off" 
                        style="width: 100px;" :disabled="disabledState"
              ></el-input>
            </el-form-item>
            )
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机：" prop="contactPhone">
            <el-input v-model="form.contactPhone" auto-complete="off" ref="contactPhone" 
                      style="width: 220px;" :disabled="disabledState"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="固定电话：" prop="contact_area_other" style="display: inline-block;">
            <el-input v-model="form.contact_area_other" auto-complete="off" ref="contact_area_other" 
                      @change="getContactTelephone" style="width: 70px;" :disabled="disabledState"
            ></el-input>
          </el-form-item>
          -
          <el-form-item label="" prop="contact_phone_other" style="display: inline-block;" labelWidth="10">
            <el-input v-model="form.contact_phone_other" ref="contact_phone_other" auto-complete="off" 
                      @change="getContactTelephone" style="width: 136px" :disabled="disabledState"
            ></el-input>
            <label class="error-tip"  v-if="errorMsg && !disabledState">固定电话、手机至少填一项</label>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="9. 常住地址：" required>
            <el-form-item style="display:inline-block;" prop="province">
               <el-select v-model="form.province" placeholder="请选择省" @change="handleProvinceChange" :disabled="disabledState">
                <el-option
                  v-for="item in provinces"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="display:inline-block;" prop="city">
               <el-select v-model="form.city" placeholder="请选择市" @change="handleCityChange" :disabled="disabledState">
                <el-option
                  v-for="item in cities"
                   :key="item.id"
                  :label="item.name"
                  :value="item.id"
                 >
                </el-option>
              </el-select>
            </el-form-item>
               <el-form-item style="display:inline-block;" prop="area">
              <el-select v-model="form.area" placeholder="请选择区" :disabled="disabledState">
                <el-option
                  v-for="item in areas"
                   :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item  prop="permanentDetailedAddress" :inline-message="true" style="margin-top:14px;">
              <el-input v-model="form.permanentDetailedAddress" type="textarea" auto-complete="off" ref="permanentDetailedAddress"  style="width: 600px;"  placeholder="请输入常住地址"
                        :disabled="disabledState" @change="getPostCode('province','city','area','permanentPostcode')"
              ></el-input>
            </el-form-item>
            <div style="margin-top: 20px;">
              <el-form-item prop="permanentPostcode" :inline-message="true">
                <el-input v-model="form.permanentPostcode" auto-complete="off" ref="permanentPostcode"  style="width: 220px" placeholder="邮编"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
              <el-form-item prop="permanentPhone" :inline-message="true">
                <el-input v-model="form.permanentPhone" auto-complete="off" ref="permanentPhone"  style="width: 220px" placeholder="联系电话"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="10. 工作单位：" required>
            <el-form-item style="display:inline-block;" prop="jobprovince">
               <el-select v-model="form.jobprovince" placeholder="请选择省" @change="handleProvinceChangejob" :disabled="disabledState">
                <el-option
                  v-for="item in jobprovinces"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                 >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="display:inline-block;" prop="jobcity">
               <el-select v-model="form.jobcity" placeholder="请选择市"  @change="handleCityChangejob" :disabled="disabledState">
                <el-option
                  v-for="item in jobcities"
                   :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
            </el-form-item>
               <el-form-item style="display:inline-block;" prop="jobarea">
              <el-select v-model="form.jobarea" placeholder="请选择区" :disabled="disabledState">
                <el-option
                  v-for="item in jobareas"
                   :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="jobDetailedAddress" :inline-message="true" style="margin-top:14px;">
              <el-input v-model="form.jobDetailedAddress" type="textarea" auto-complete="off" ref="jobDetailedAddress"  style="width: 600px" placeholder="请输入单位地址"
                        :disabled="disabledState" @change="getPostCode('jobprovince','jobcity','jobarea','jobPostcode')"
              ></el-input>
            </el-form-item>
            <div style="margin-top: 20px;">
              <el-form-item prop="jobPostcode" :inline-message="true">
                <el-input v-model="form.jobPostcode" auto-complete="off" ref="jobPostcode"  style="width: 220px" placeholder="邮编"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
              <el-form-item prop="jobPhone" :inline-message="true">
                <el-input v-model="form.jobPhone" auto-complete="off" ref="jobPhone"  style="width: 220px" placeholder="联系电话"
                          :disabled="disabledState"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="margin-top: 20px;">
          <el-col :span="12">
            <el-form-item label="调查员签名：" prop="dcName">
              <el-input v-model="form.dcName"  auto-complete="off" ref="dcName"  style="width:220px"
                        :disabled="disabledState" maxlength="20"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="调查日期：" prop="dcDate">
              <el-date-picker
                v-model="form.dcDate"
                type="date"
                ref="dcDate"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :disabled="disabledState"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <div class="addbtn" v-if="!disabledState">
          <el-button type="primary" @click="submitForm('ruleForm')"  :loading="buttonDisabled" v-dbClick>保存</el-button>
          <el-button @click="goBack()">取消</el-button>
        </div>
      </el-form>
    </cancer-widget>
    <el-dialog
      title=""
      :visible.sync="submitDialog"
      width="30%"
      :show-close="false"
      center>
      <div style="text-align: center;margin-bottom: 10px;"><img :src="require('@/assets/img/success.png')" alt="" class="dialog-success"></div>
      <div style="text-align: center;">个人信息表保存成功</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="next()">去填写《危险因素表》</el-button>
        <el-button @click="returnHome()">返回首页</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    userName: 'Right',
    data () {
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
      var validatePhone1 = (rule, value, callback) => {
        if (value === '' || value == null) {
          callback(new Error('请输入正确的联系电话'));
        } else if (!(/\d/.test(value))) {
          callback(new Error('请输入正确的联系电话'))
        } else if (value.length <7 || value.length>11) {
          callback(new Error('请输入正确的联系电话'));
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

      var validatenumber6 = (rule, value, callback) => {
        if (value && !(/^\d{5,6}$/.test(value))) {
          callback(new Error('请输入5-6位邮编号码'))
        } else {
          callback();
        }
      };
      var validatePhone_other = (rule, value, callback) => {
        if (!value) {
          this.errorFlag = true
          callback();
        } else if (value && !(/\d/.test(value))) {
          this.errorFlag = true
          callback(new Error('手机号只能是数字'))
        } else if (value && value.length != 11) {
          this.errorFlag = true
          callback(new Error('请输入合法的11位手机号'));
        }else {
          this.errorFlag = false
          callback();
        }
      };
      var validatecontact_area_other = (rule, value, callback) => {
        if (!value) {
          this.errorFlag = true
          callback();
        } else if (value && !(/^\d{3,4}$/.test(value))) {
          this.errorFlag = true
          callback(new Error('请输入3-4位区号'))
        } else {
          this.errorFlag = false
          callback();
        }
      };
      var validatecontact_telephone_other = (rule, value, callback) => {
        if (!value) {
          this.errorFlag = true
          callback();
        } else if (value && !(/^\d{7,8}$/.test(value))) {
          this.errorFlag = true
          callback(new Error('请输入7-8位座机号码'))
        } else {
          this.errorFlag = false
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
        } else if (!(/^[\u4e00-\u9fa5]{1,10}$/.test(value))) {
          callback(new Error('只能是1-10个汉字'))
        } else {
          callback();
        }
      };
      const checkFont = (rule, value, callback) => {
        if (value && !(value.length>1)) {
          callback(new Error('请输入2-20个字'))
        }else {
          callback();
        }
      };
      var validate_address = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (value.length>50 ||value.length<5) {
          callback(new Error('请输入5-50个字符'))
        } else {
          callback();
        }
      };
      var validate_number10 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('必填'));
        } else if (value.length>10 ||value.length<1) {
          callback(new Error('请输入1-10个字符'))
        } else {
          callback();
        }
      };
      return {
        errorFlag: false,
        props: {
          value: 'label',
          children: 'children',
          label: 'label'
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        //权限判定
        personalInformation_page: false,
        btnAuth: {
          countryAgencySearch_page: false,
        },
        buttonDisabled:false,
        //展示
        disabledState: false,
        submitDialog: false,
        detailData: this.$route.query.detailData,
        form: {
          name: null,//姓名
          sex: null,//性别
          idCard: null,//身份证号码
          birthday: null,//出生日期
          age: null,//实足年龄
          volk: null,//民族
          volkOther: null,//民族其他
          phone: null,//本人电话
          telephone: null,//座机号码
          contactRelationship: null,//与本人关系
          // contactPhone: '',//联系人电话
          contactTelephone: null,//联系人座机号码
          homePostcode:'',
          permanentPostcode:'',
          jobPostcode:'',
          homeAddress:[],
          permanentAddress:[],
          jobAddress:[],
          homeDetailedAddress: null,//家庭住址
          permanentDetailedAddress: null,//常住地址
          jobDetailedAddress: null,//工作地址
          dcName: null,//调查员签名
          dcDate: null,//调查日期
          permanentPhone:'',//常驻地址电话
          homePhone:'',//家庭住址联系电话
          jobPhone:'',//
          province:null,
          city:null,
          area:null,
          jobprovince:null,
          jobcity:null,
          jobarea:null,
        },
        provinces:[],
        cities:[],
        areas:[],
        jobprovinces:[],
        jobcities:[],
        jobareas:[],
        rules: {
          name: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          sex: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          permanentPhone: [
            {required: false, message: '必填', trigger: 'blur'},
            {required: false, message: '必填', trigger: 'change'},
            {validator: validatePhone1, trigger: 'blur'},
            {validator: validatePhone1, trigger: 'change'}
          ],
          homePhone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatePhone1, trigger: 'blur'},
            {validator: validatePhone1, trigger: 'change'}
          ],
          jobPhone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatePhone1, trigger: 'blur'},
            {validator: validatePhone1, trigger: 'change'}
          ],
          idCard: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          birth: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          age: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          volk: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          volkOther: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_number10, trigger: 'blur'},
            {validator: validate_number10, trigger: 'change'}
          ],
          phone: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatePhone, trigger: 'blur'},
            {validator: validatePhone, trigger: 'change'}
          ],
          contact_area: [
            {validator: validatecontact_area, trigger: 'blur'},
            {validator: validatecontact_area, trigger: 'change'},
          ],
          contact_telephone: [
            {validator: validatecontact_telephone, trigger: 'blur'},
            {validator: validatecontact_telephone, trigger: 'change'},
          ],
          contactRelationship: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: contactRelationship, trigger: 'blur'},
            {validator: contactRelationship, trigger: 'change'},
          ],
          // 联系人电话 => 手机
          contactPhone: [
            {validator: validatePhone_other, trigger: 'blur'},
            {validator: validatePhone_other, trigger: 'change'}
          ],
          // 联系人电话 => 区号
          contact_area_other: [
            {validator: validatecontact_area_other, trigger: 'blur'},
            {validator: validatecontact_area_other, trigger: 'change'},
          ],
          // 联系人电话 => 固定电话
          contact_phone_other: [
            {validator: validatecontact_telephone_other, trigger: 'blur'},
            {validator: validatecontact_telephone_other, trigger: 'change'},
          ],
          homeDetailedAddress: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_address, trigger: 'blur'},
          ],
          permanentDetailedAddress: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_address, trigger: 'blur'},

          ],
          jobPostcode: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatenumber6, trigger: 'blur'},
          ],
          permanentPostcode: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validatenumber6, trigger: 'blur'},
          ],
          jobDetailedAddress: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: validate_address, trigger: 'blur'},
          ],
          homeAddress:[
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          permanentAddress:[
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          jobAddress:[
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          dcName: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
            {validator: checkFont, trigger: 'blur'},
          ],
          dcDate: [
            {required: true, message: '必填', trigger: 'blur'},
            {required: true, message: '必填', trigger: 'change'},
          ],
          province:[
             {required: true, message: '必填', trigger: 'blur'},
             {required: true, message: '必填', trigger: 'change'},
          ],
          city:[
             {required: true, message: '必填', trigger: 'blur'},
             {required: true, message: '必填', trigger: 'change'},
          ],
          area:[
             {required: true, message: '必填', trigger: 'blur'},
             {required: true, message: '必填', trigger: 'change'},
          ],
          jobprovince:[
             {required: true, message: '必填', trigger: 'blur'},
             {required: true, message: '必填', trigger: 'change'},
          ],
          jobcity:[
             {required: true, message: '必填', trigger: 'blur'},
             {required: true, message: '必填', trigger: 'change'},
          ],
          jobarea:[
             {required: true, message: '必填', trigger: 'blur'},
             {required: true, message: '必填', trigger: 'change'},
          ]
        }
      }
    },
    mounted(){
      // console.log(this.$store.state.common);
      window.scrollTo(0,0);
      //获取省信息
      this.$axios_http({
        url:'/base/measurement/resource/getResource/1',
        vueObj:this
      }).then((res) => {
        if(res.data.status == 'SUCCESS'){
          this.provinces = res.data.result;
          this.jobprovinces = res.data.result;
        }
      })
      if (this.$route.query.type == 1) {
        //查看
        this.disabledState = true;
        this.rules = {};
        this.getUserFormInfo();
      } else {
        //录入
        this.disabledState = false;
        this.form.id = this.$route.query.personInfoId;
        this.getUserInfo();
        this.form.dcName = sessionStorage.getItem('trueName');
        this.form.dcDate = this.getDate(new Date().getTime());
      }
    },
    computed: {
      errorMsg () {
        if ((/^1[0-9]{10}$/.test(this.form.contactPhone))){
          // console.log(1)
          return false
        } else if (/^\d{7,8}$/.test(this.form.contact_phone_other) && /^\d{3,4}$/.test(this.form.contact_area_other)) {
          // console.log(2)
          return false
        } else if (!this.form.contactPhone && !this.form.contact_phone_other && !this.form.contact_area_other) {
          if (this.errorFlag) {
            // console.log(3)
            return true
          }
        } else{
          return true
        }
      }
    },
    methods: {
      goBack(){
        //  this.$router.push('/zm/subject/index');
        this.$router.go(-1)
      },
      getPostCode(a,b,c,d){
        var _this = this;
        if(this.form[a] == '' || this.form[b] == ''){
          this.form[c] = ''
        }
        // var url = 'http://cpdc.chinapost.com.cn/web/index.php?m=postsearch&c=index&a=ajax_addr&searchkey='+this.form[a][0]+this.form[a][1]+this.form[a][2]+this.form[b]
        if(this.form[a] && this.form[b]){
          //用汉字请求邮编
          let textA = null,textB = null,textC = null;
          if(a == 'province'){
             for(let k = 0;k<this.provinces.length;k++){
              if(this.form[a] == this.provinces[k].id){
                 textA = this.provinces[k].name;
                }
             }
            for(let k = 0;k<this.cities.length;k++){
              if(this.form[b] == this.cities[k].id){
                 textB = this.cities[k].name;
                }
             }
             for(let k = 0;k<this.areas.length;k++){
              if(this.form[c] == this.areas[k].id){
                 textC = this.areas[k].name;
                }
             }
          }else{
             for(let k = 0;k<this.jobprovinces.length;k++){
              if(this.form[a] == this.jobprovinces[k].id){
                 textA = this.jobprovinces[k].name;
                }
             }
             for(let k = 0;k<this.jobcities.length;k++){
              if(this.form[b] == this.jobcities[k].id){
                 textB = this.jobcities[k].name;
                }
             }
             for(let k = 0;k<this.jobareas.length;k++){
              if(this.form[c] == this.jobareas[k].id){
                 textC = this.jobareas[k].name;
                }
             }
          }
          this.$axios_http({
            url: "/base/system/queryPostCode?address="+ textA + textB + textC,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.result.rs){
              if(res.data.result.rs[0].POSTCODE != -1){
                _this.form[d] = res.data.result.rs[0].POSTCODE;
              }else {
                _this.form[d] = ''
              }

            }else {
              _this.form[d] = ''
            }
          })
        }
      },
      //查看个人信息表
      getUserFormInfo(){
          this.$axios_http({
          url: "/base/fc/person/get/personInfoForm/" + this.$route.query.personInfoId,
          vueObj: this
          }).then((res) => {
            this.form = res.data.result;
            this.form.birthday = this.getDate(this.form.birthday)
            this.form.dcDate = this.getDate(this.form.dcDate)
            if(this.form.contactTelephone){
              this.form.contact_area_other = this.form.contactTelephone.split('-')[0]
              this.form.contact_phone_other = this.form.contactTelephone.split('-')[1]
            }
            if(this.form.telephone){
              this.form.contact_area = this.form.telephone.split('-')[0]
              this.form.contact_telephone = this.form.telephone.split('-')[1]
            }
            //赋值省市区
            this.$axios_http({
                  url:'/base/measurement/resource/getResource/' + res.data.result.permanentProvinceCode,
                  vueObj:this
                }).then((res) => {
                  if(res.data.status == 'SUCCESS'){
                     this.cities = res.data.result;
                   }
            })
            this.$axios_http({
                  url:'/base/measurement/resource/getResource/' + res.data.result.permanentCityCode,
                  vueObj:this
                }).then((res) => {
                  if(res.data.status == 'SUCCESS'){
                     this.areas = res.data.result;
                   }
            })
            this.$axios_http({
                  url:'/base/measurement/resource/getResource/' + res.data.result.jobProvinceCode,
                  vueObj:this
                }).then((res) => {
                  if(res.data.status == 'SUCCESS'){
                     this.jobcities = res.data.result;
                   }
            })
            this.$axios_http({
                  url:'/base/measurement/resource/getResource/' + res.data.result.jobCityCode,
                  vueObj:this
                }).then((res) => {
                  if(res.data.status == 'SUCCESS'){
                     this.jobareas = res.data.result;
                   }
            })
            this.form.province = res.data.result.permanentProvinceCode;
            this.form.city = res.data.result.permanentCityCode;
            this.form.area = res.data.result.permanentAreaCode;
            this.form.jobprovince = res.data.result.jobProvinceCode;
            this.form.jobcity = res.data.result.jobCityCode;
            this.form.jobarea = res.data.result.jobAreaCode;
        })
      },
      //格式化日期
      getDate(value){
        if (value != '' && value != null && value != undefined) {
          var value = new Date(value)
          return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`
        }
        return value
      },
      //获取个人信息表
      getUserInfo(){
        this.$axios_http({
          url: "/base/fc/person/get/personInfoForm/"+this.$route.query.personInfoId,
          vueObj: this
        }).then((res) => {
          if(res.data.status == 'SUCCESS'){
            this.form.name = res.data.result.name;
            this.form.sex = res.data.result.sex;
            this.form.age = res.data.result.age;
            this.form.idCard = res.data.result.idCard;
            this.form.birthday = this.getDate(res.data.result.birthday);
            this.form.phone = res.data.result.phone;
          }
        })
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid, obj) => {
          if (!this.form.contactPhone && !this.form.contact_phone_other && !this.form.contact_area_other) {
            this.errorFlag = true
          } else {
            this.errorFlag = false
          }
          if (!valid) {
            for (var item in obj) {
              this.$refs[item].focus();
              return
            }
          }

          if (valid) {
            //处理常住地址 和 工作单位数据
            let obj = {
              permanentProvinceCode:this.form.province,
              permanentCityCode:this.form.city,
              permanentAreaCode:this.form.area,
              jobProvinceCode:this.form.jobprovince,
              jobCityCode:this.form.jobcity,
              jobAreaCode:this.form.jobarea,
              permanentProvinceAddress:'',
              permanentCityAddress:'',
              permanentAreaAddress:'',
              jobProvinceAddress:'',
              jobCityAddress:'',
              jobAreaAddress:''
            }
            for(let k=0;k<this.provinces.length;k++){
               if(this.provinces[k].id == this.form.province){
                   obj.permanentProvinceAddress = this.provinces[k].name;
               }
            }
            for(let k=0;k<this.cities.length;k++){
               if(this.cities[k].id == this.form.city){
                   obj.permanentCityAddress = this.cities[k].name;
               }
            }
            for(let k=0;k<this.areas.length;k++){
               if(this.areas[k].id == this.form.area){
                   obj.permanentAreaAddress = this.areas[k].name;
               }
            }
            for(let k=0;k<this.jobprovinces.length;k++){
               if(this.jobprovinces[k].id == this.form.jobprovince){
                   obj.jobProvinceAddress = this.jobprovinces[k].name;
               }
            }
            for(let k=0;k<this.jobcities.length;k++){
               if(this.jobcities[k].id == this.form.jobcity){
                   obj.jobCityAddress = this.jobcities[k].name;
               }
            }
            for(let k=0;k<this.jobareas.length;k++){
               if(this.jobareas[k].id == this.form.jobarea){
                   obj.jobAreaAddress = this.jobareas[k].name;
               }
            }
            this.$axios_http({
              url: "/base/fc/person/addOrUpdate/personInfoForm",
              data: Object.assign({},this.form,obj,{inputStatus:1,evaluate:this.$route.query.id,id:this.$route.query.personInfoId}),
              vueObj: this
            }).then((res) => {
              if(res.data.status == 'SUCCESS'){
                if(this.$route.query.from == 1){
                   //新建问券进入
                   this.submitDialog = true;
                }else{
                  //受试者列表进入
                   this.$message({
                    message: '保存成功',
                    type: 'success'
                   });
                   this.$router.push({
                      path:'/zm/subject/index'
                   })
                }
              }
            })
          }
        });
      },
      resetForm(formuserName) {
        this.$refs[formuserName].resetFields();
      },
      //拼接个人座机号码
      getTelphone(){
        if (this.form.contact_area && this.form.contact_telephone) {
          this.form.telephone = ''
          this.form.telephone = this.form.contact_area + '-' + this.form.contact_telephone
        }
      },
      //拼接其他联系人座机号码
      getContactTelephone(){
        if (this.form.contact_area_other && this.form.contact_phone_other) {
          this.form.contactTelephone = ''
          this.form.contactTelephone = this.form.contact_area_other + '-' + this.form.contact_phone_other
        }
      },
      //下一步
      next(){
         this.$router.push({
              path: '/ldctform/riskfactor',
              query:{
                  type: 1,
                  personInfoId: this.$route.query.personInfoId,
                  eli:this.$route.query.eli,
                  personScreenId:this.$route.query.id,
                  from: 1
              }
         })
      },
      //返回首页
      returnHome(){
        this.$router.push({path: '/home/home'})
        this.submitDialog = false
      },
      handleProvinceChange(val){
        this.form.city='';
        this.form.area='';
        this.getAddress('provinces',val);
      },
      handleCityChange(val){
        this.form.area='';
        this.getAddress('cities',val);
      },
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
      handleProvinceChangejob(val){
        this.form.jobcity='';
        this.form.jobarea='';
        this.getAddressjob('jobprovinces',val);
      },
      handleCityChangejob(val){
        this.form.jobarea='';
        this.getAddressjob('jobcities',val);
      },
      getAddressjob(type,id){
          this.$axios_http({
            url: '/base/measurement/resource/getResource/'+id,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              let options=res.data.result;
              if(type=='jobprovinces' && id==1){   //默认显示省
                this.jobprovinces=options;
              }else if(type=='jobprovinces' && id!=1){   //加载市
                this.jobcities=options;
              }else if(type=='jobcities'){
                this.jobareas=options;
              }
              
            }
          })
      }
    },
    watch: {
      'form.volk': function (val, b) {
        if (val == 8) {
          this.$nextTick(function () {

          })
        } else {
          if (val == 1 || val == 2 || val == 3 || val == 4 || val == 5 || val == 6 || val == 7 || val == 9) {
            this.$nextTick(function () {
              this.form.volkOther = null
            })
          } else {
            this.form.volk = null
            this.form.volkOther = null
          }

        }
      },
    }
  }
</script>
<style  lang="scss" scoped>
  .return-home {
    display: block;
    margin-bottom: 20px;
  }
  h3 {
    text-align: center;
    margin-bottom: 20px;
  }
  .addbtn {
    display: block;
    margin-top: 50px;
    text-align: center;
  }
  .content-page-sid {
    color: #000;
    font-size: 16px;
    font-weight: 600;
    padding-left: 55px;
  }
  .el-col .el-form-item .el-form-item{
    margin-bottom: 5px;
  }
</style>
<style>
  .dialog-success {
    width: 40px;
    height: 40px;
  }
  .error-tip {
    color: #f56c6c;
    font-size: 12px;
    margin-left: 10px;
    font-weight: 400;
  }
</style>
