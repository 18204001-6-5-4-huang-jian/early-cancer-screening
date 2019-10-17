<template>
  <!--机构管理-->
  <div>
    <cancer-widget>
        <el-form :model="formData">
         <el-row>
           <span>机构名称：{{formData.deptName}}</span>
        </el-row>
        <el-row>
          <span>机构类型：{{formData.deptType}}</span>
        </el-row>
        <el-row>
           <span>所属项目：{{formData.itemsUnderIt}}</span>
        </el-row>
        <el-row>
          <span>所在地区：{{formData.provinceName}}{{formData.cityName}}{{formData.areaName}}{{formData.streetName}}{{formData.commName}}</span>
        </el-row>
        <el-row>
           <span>详细地址：{{formData.deptAddress}}</span>
        </el-row>
      </el-form>
      <div class="btns" style="text-align:center;margin-top:50px;padding-top:15px;border-top:1px dashed #dcdfe6;">
        <el-button type="small" @click="goBack">取消</el-button> 
      </div>
    </cancer-widget>
  </div>
</template>
<script>
  import mixin from '@/mixins/mixins'
  export default {
    mixins: [ mixin ],
    data () {
      return {
        formData: {
          deptName:null,
          deptType:null,
          itemsUnderIt:null,
          provinceName:null,
        },
      }
    },
    methods: {
      queryByLinkId(){
        this.$axios_http({
          url: "/base/system/dept/queryByLinkId",
          data: {
                "linkId":this.$route.query.linkId,
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.formData =res.data.result
          }
        })
      }
      
    },
    created() {
      this.queryByLinkId();
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-row{
  margin-bottom: 20px;
}
span{
  display: relative;
}
span::before{
  display: absolute;
  content: '*';
  color: #f56c6c;
}
</style>