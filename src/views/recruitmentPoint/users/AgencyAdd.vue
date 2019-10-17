<template>
<div>
  <div class="reportBox">
    <cancer-widget>
      <el-form :model="formData" :rules="formDataRules" ref="formData"  label-width="100px" :inline="true">
         <el-row>
          <el-form-item label="机构名称：" prop="deptName">
            <el-input v-model.trim="formData.deptName" maxlength="50"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="开始时间：" prop="beginTime">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              v-model="formData.beginTime">
            </el-date-picker>
          </el-form-item>
        </el-row>
        <div v-for="(item,index) in formData.typeLinkPOList" :key="index">
          <div class="jg">
            <div class="column-div"><span class="title" v-if="index==0">机构类型：</span></div>
            <div class="column-div">
              <el-row>
                <el-col :span="4">
                  <el-form-item label="">
                    <el-checkbox v-model.trim="item.checked" @change="changeDeptType(item.checked,index)">{{item.deptTypeName}}</el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item  
                  v-if="item.checked" 
                  :prop="'typeLinkPOList.'+index+'.itemsUnderIt'"
                  :rules="index==0 ? [] : formDataRules.itemsUnderIt">
                    <el-checkbox-group :disabled="index==0" v-model="item.itemsUnderIt" style="padding-left:0;">
                      <el-checkbox  :label="1">肺肠筛查</el-checkbox>
                      <el-checkbox  :label="2">早诊早治</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="机构编码" v-if="index==2 && item.checked" prop="deptCode">
                      <el-input v-model.trim="formData.deptCode" ></el-input>
                    </el-form-item>
                </el-col>
              </el-row>
              
            </div>
          </div>
        </div>
        <el-row>
          <span class="title fl">所在地区：</span>
              <el-form-item label="" prop="deptProvince">
                <el-select
                 v-model="formData.deptProvince" 
                 filterable 
                 :default-first-option="true" 
                 placeholder="省" 
                 clearable 
                 @change="changeProvince(formData.deptProvince)">
                  <el-option 
                  :label="item.name" 
                  :value="item.id" 
                  v-for="item in provice" :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" prop="deptCity">
                <el-select
                 v-model="formData.deptCity" 
                 filterable 
                 :default-first-option="true" 
                 placeholder="市" 
                 clearable 
                 @change="changeCity(formData.deptCity)">
                  <el-option 
                  :label="item.name" 
                  :value="item.id" 
                  v-for="item in cities" :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" prop="deptArea">
                <el-select
                 v-model="formData.deptArea" 
                 filterable 
                 :default-first-option="true" 
                 placeholder="区" 
                 clearable 
                 @change="changeArea(formData.deptArea)">
                  <el-option 
                  :label="item.name" 
                  :value="item.id" 
                  v-for="item in areas" :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" v-if="isShow" prop="deptStreet">
                <el-select
                 v-model="formData.deptStreet" 
                 filterable 
                 :default-first-option="true" 
                 placeholder="街道" 
                 clearable
                 @change="changeStreet(formData.deptStreet)">
                  <el-option 
                  :label="item.name" 
                  :value="item.id" 
                  v-for="item in country" :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" prop="deptComm" :rules="isCommunityShow?formDataRules.deptComm:[]">
                <el-select
                 v-model="formData.deptComm" 
                 filterable 
                 :default-first-option="true" 
                 placeholder="社区" 
                 clearable>
                  <el-option 
                  :label="item.name" 
                  :value="item.id" 
                  v-for="item in community" :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="详细地址：" prop="deptAddress">
            <el-input v-model.trim="formData.deptAddress" class="lenInput"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="btns" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
        <el-button type="primary"  @click="submitHandler">确定</el-button> 
        <el-button  @click="goBack">取消</el-button> 
      </div>
    </cancer-widget>
   </div>
  </div>
</template>

<script>
import VALIDATE from "@/utils/validate";
import mixin from "@/mixins/mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      isShow: true,
      isCommunityShow: true,
      deptmentType: null,
      provice: [],
      cities: [],
      areas: [],
      country: [],
      community: [],
      formData: {
        deptName: null,
        deptCode: null,
        beginTime: null,
        deptProvince: null,
        deptCity: null,
        deptArea: null,
        deptStreet: null,
        deptComm: null,
        deptAddress: null,
        typeLinkPOList: [
          {
            deptType: null,
            checked:false,
            itemsUnderIt: [1, 2],
            deptTypeName: "管理机构"
          },
          {
            deptType: null,
            checked:false,
            itemsUnderIt: [],
            deptTypeName: "招募机构"
          },
          {
            deptType: null,
            checked:false,
            itemsUnderIt: [],
            deptTypeName: "筛查机构"
          }
        ]
      },
      formDataRules: {
        deptName: [{ required: true, message: "必填", trigger: "blur" }],
        itemsUnderIt: [{ required: true, message: "必填", trigger: "change" }],
        deptCode: [
          { required: true, message: "必填", trigger: "blur" },
          { trigger: "blur", validator: VALIDATE.deptCode }
        ],
        deptAddress: [{ required: true, message: "必填", trigger: "blur" }],
        deptProvince: [{ required: true, message: "必填", trigger: "change" }],
        deptCity: [{ required: true, message: "必填", trigger: "change" }],
        deptArea: [{ required: true, message: "必填", trigger: "change" }],
        deptStreet: [{ required: true, message: "必填", trigger: "change" }],
        deptComm: [{ required: true, message: "必填", trigger: "change" }],
        beginTime: [{ required: true, message: "必填", trigger: "change" }],
      }
    };
  },
  created() {
    this.deptmentType = sessionStorage.getItem("deptmentType");
    this.getProvice();
  },
  mounted() {},
  methods: {
    // 根据父id查询地区列表（机构专用）
    getCityResources(pid) {
      return this.$axios_http({
        url: "/base/system/dept/find/cityResources/" + pid,
        data: {},
        vueObj: this
      });
    },

    // 获取省的数据
    async getProvice() {
      const { data: { result, status } } = await this.getCityResources(1);
      this.provice = result;
    },
    // 获取市
    async changeProvince(code) {
      if(code) {
        const { data: { result, status } } = await this.getCityResources(code);
        this.cities = result;
      }
      this.formData.deptCity=null;
      this.formData.deptArea=null;
      this.formData.deptStreet=null;
      this.formData.deptComm=null;
      this.areas = [];
      this.country = [];
      this.community = [];
    },
    // 获取区
    async changeCity(code) {
      if(code) {
        const { data: { result, status } } = await this.getCityResources(code);
        this.areas = result;
      }
      this.country = [];
      this.community = [];
      this.formData.deptArea=null;
      this.formData.deptStreet=null;
      this.formData.deptComm=null;
    },
    // 获取县
    async changeArea(code) {
      if(code) {
        const { data: { result, status } } = await this.getCityResources(code);
        if (result[0].level === 4) {
          this.country = result;
          this.isShow = true;
          this.community = [];
        }
        if (result[0].level === 5) {
          this.community = result;
          this.isShow = false;
        }
      }
      this.formData.deptStreet=null;
      this.formData.deptComm=null;
    },
    // 获取社区
    async changeStreet(code) {
      if(code) {
        const { data: { result, status } } = await this.getCityResources(code);
        if(result.length==0){
          this.isCommunityShow = false
        }
        this.community = result;
      }
      this.formData.deptComm=null;
    },

    changeDeptType(val, index) {
      if(!val && index!=0){
        this.formData.typeLinkPOList[index].itemsUnderIt=[]
      }
      if(!val && index==2){
        this.formData.deptCode=null
      }
    },

    submitHandler() {
      this.$refs.formData.validate((valid, obj) => {
        if (valid) {
          if(!this.formData.typeLinkPOList[0].checked && 
             !this.formData.typeLinkPOList[1].checked && 
             !this.formData.typeLinkPOList[2].checked){
            this.$message({
              type: "error",
              message: "机构类型未填"
            });
          }else{
            this.submitForm();
          }
        } else {
          this.$message({
            type: "error",
            message: "有未填项"
          });
        }
      });
    },

    submitForm() {
      this.formData.typeLinkPOList.filter((item,index)=>{
        item.itemsUnderIt = item.itemsUnderIt.join(',')
        if(index === 0){
          if(item.checked){
            item.deptType = 'gljg'
          }else{
            item.deptType = null
          }
        }
        if(index === 1){
          if(item.checked){
            item.deptType = 'zmd'
          }else{
            item.deptType = null
          }
        }
        if(index === 2){
          if(item.checked){
            item.deptType = 'scjg'
          }else{
            item.deptType = null
          }
        }
      })
      this.$axios_http({
        url: "/base/system/dept/addDeptment",
        data: Object.assign({}, this.formData),
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.$router.push("/user/agency/list");
        }else{
           this.formData.typeLinkPOList.filter((item,index)=>{
            item.itemsUnderIt = item.itemsUnderIt.split(',').map(Number)
          })
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.jg {
  display: flex;
  flex-direction: row;
}
.column-div:nth-child(1) {
  width: 100px;
  color: #333;
  line-height: 36px;
  font-size: 14px;
}
.column-div:nth-child(2) {
  width: 100%;
}
.title{
  font-size: 14px;
  width: 100px;
  display: relative;
  line-height: 36px;
}
.title::before{
   display: absolute;
   content: '*';
  color: #f56c6c;
}
.el-checkbox-group{
  line-height: 36px;
}
.lenInput{
  width: 330px;
}
</style>
