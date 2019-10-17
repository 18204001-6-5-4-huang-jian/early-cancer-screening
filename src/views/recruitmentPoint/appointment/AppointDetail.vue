<template>
  <cancer-widget>
    <div class="titTop top clearfix">
      <span class="title">预约信息</span>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row>
          <el-col :span='5'>
            <el-form-item label="预约时间：">
              <el-date-picker
                size="small"
                v-model="formInline.bookingDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span='5' :offset="1">
            <el-form-item label="开始时间："  prop="beginTime">
              <el-time-select
                  size="small"
                  placeholder="请选择"
                  v-model="formInline.startTime"
                  :picker-options="{
                    start: '08:00',
                    step: '00:30',
                    end: '20:00'
                  }">
                </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :span='5' :offset="1">
             <el-form-item label="结束时间："  prop="beginTime">
              <el-time-select
                  size="small"
                  placeholder="请选择"
                  v-model="formInline.endTime"
                  :picker-options="{
                    start: '08:00',
                    step: '00:30',
                    end: '20:00'
                  }">
                </el-time-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='5'>
            <span>检查项目：{{$route.query.checkProject | checkProjectFilter}}</span>
          </el-col>
          <el-col :span='5' :offset="1">
            <span>预约机构：{{totalData.dept}}</span>
          </el-col>
          <el-col :span='5' :offset="1">
            <span>预约人员：{{totalData.userName}}</span>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="block clearfix">
      <span class="titleTime">受试者信息</span>
      <el-row>
          <el-col :span='5'>
              <span>SID/问卷ID：{{totalData.surverId}}</span>
          </el-col>
          <el-col :span='5' :offset="1">
            <span>姓名：{{totalData.name}}</span>
          </el-col>
          <el-col :span='3' :offset="1">
            <span>年龄：{{totalData.age}}</span>
          </el-col>
          <el-col :span='3' :offset="1">
            <span>性别：{{totalData.sex | sexFilter}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <span>所属项目：{{totalData.itemsUnderIt | itemsUnderItFilter}}</span>
          </el-col>
          <el-col :span='5' :offset="1">
               <span :title="totalData.risk">评估结果：{{totalData.risk}}</span>
          </el-col>
          <el-col :span='3' :offset="1">
            <span>所属机构：{{totalData.deptName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="8" :span="4">
            <div class="btns">
                <el-button type="primary" size="small" @click="submit">确定</el-button>
                <el-button size="small" @click="$router.go(-1)">取消</el-button>
            </div>
          </el-col>
        </el-row>
        
    </div>
  </cancer-widget>
</template>
<script>
import { sexFilter,signStatusFilter,checkProjectFilter } from '@/filters/filter'
  export default {
    data () {
      return {
        formInline: {
          bookingDate: new Date(),
          startTime: null,
          endTime: null,
        },
        totalData:[]
      }
    },
   
    created(){
      this.getPersonDetails();
    },
    mounted(){

    },
    methods: {
      // 获取受试者详情
      getPersonDetails(){
        this.$axios_http({
          url: "/base/re/booking/qurey/getPersonDetails",
          data: {
                "personId":this.$route.query.personId,
                "surverId":this.$route.query.surverId
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.totalData=res.data.result;
          }
        })
      },
      // 提交预约
      submit(){
        let _type=null;
        if(this.$route.query.flag=='recruit'){
          _type="1"
        }else if(this.$route.query.flag=='area'){
          _type="2"
        }
        this.$axios_http({
          url: "/base/re/booking/add/record",
          data: {
                "surverId":this.totalData.surverId,
                "deptId":this.totalData.deptId,
                "personId":this.$route.query.personId,
                "checkProject":this.$route.query.checkProject,
                "cancerSpeciesType":this.$route.query.cancerSpeciesType,
                "bookingStatus":2,
                "bookingDate":this.formInline.bookingDate,
                "startTime":this.formInline.startTime,
                "endTime":this.formInline.endTime,
                "id":this.$route.query.id,
                "reBookingStatus":'1',
                "type":_type
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.$message({
              type:'success',
              message:'预约成功'
            })
            // this.updateAgainBookingStatus();
            if(this.$route.query.flag=='recruit'){
              this.$router.push('/appointment/recruitlist');
            }else if(this.$route.query.flag=='area'){
              this.$router.push('/appointment/arealist');
            }
          }
        })
      },
      // 修改二次预约再次预约状态
      updateAgainBookingStatus(){
        let obj={
           "id":this.$route.query.id,
        }
        if(this.$route.query.flag=='recruit'){
          obj.reBookingStatus=1
        }else if(this.$route.query.flag=='area'){
            obj.againBookingStatus=1
        }
         this.$axios_http({
          url: "/base/re/booking/update/updateAgainBookingStatus",
          data: obj,
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){

          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.titTop{
  font-size: 18px;
  color: #333333;
  border-bottom: 1px solid #ECECEC;
  margin-top: 15px;
  border-top: 1px solid #ECECEC;
  padding-bottom: 15px;
  padding-top: 22px;
  margin-bottom: 18px;
  position: relative;
  .title{
    line-height: 1;
    padding-left:20px;
  }
  .btns{
    position: absolute;
    top: 0;
    right: 20px;
  }
}
.top{
  border-top:none;
  margin-top: 0;
  padding-top: 0;
}
.top span.title,.top span.line{
    height: 38px;
    line-height: 38px;
  }
.top span.line{
  color:  #DADADA;
  font-size: 12px;
  margin: 0 25px;
}
span{
  font-size: 14px;
}
span.titleTime,span.title{
  font-size: 16px;
  padding-left: 20px;
  padding-bottom: 15px;
  display: block;
}
.block .el-row{
    margin-bottom: 20px;
}
.el-row{
  padding-left: 20px;
}
</style>


