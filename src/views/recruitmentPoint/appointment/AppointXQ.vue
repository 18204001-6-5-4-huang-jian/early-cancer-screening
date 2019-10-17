<template>
<div>
  <div class="reportBox j_content">
    <cancer-widget>
    <div id="print">
      <h1>筛查预约单</h1>
      <div class="blockWrap">
        <h2>基本信息</h2>
        <div>
            <el-row>
                <el-col :span="12">
                    <span>姓名：{{personReBookingVo.name}}</span>
                </el-col>
                <el-col :span="12">
                    <span>所属项目：{{personReBookingVo.itemsUnderIt | itemsUnderItFilter}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <span>性别：{{personReBookingVo.sex | sexFilter}}</span>
                </el-col>
                <el-col :span="12">
                    <span>评估结果：{{personReBookingVo.risk}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <span>年龄：{{personReBookingVo.age}}</span>
                </el-col>
                <el-col :span="12">
                    <span>评估时间：{{personReBookingVo.evaluateDate | dateFilter}}</span>
                </el-col>
                </el-row>
            <el-row>
                <el-col :span="12">
                    <span>手机号：{{personReBookingVo.phone}}</span>
                </el-col>
                <el-col :span="12">
                    <span>身份证号：{{personReBookingVo.idCard}}</span>
                </el-col>
            </el-row>
        </div>
        <!-- 预约详情 -->
        <div class="blockWrap">
            <h2>预约详情</h2>
            <div v-for="(item,key) in map" :key="key">
                <el-row>
                    <el-col :span="24">
                        <span>筛查医院：{{key}}</span>
                    </el-col>
                </el-row>
                <div v-for="(itemA,index) in item" :key="index">
                    <el-row>
                        <el-col :span="12">
                            <span>预约项目：{{itemA.checkProject | checkProjectFilter}}</span>
                        </el-col>
                        <el-col :span="12">
                            <span>预约时间：{{itemA.autoBookingTime}}</span>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        
        <!-- 注意事项 -->
        <div class="blockWrap">
            <h2>注意事项</h2>
            <div>
                <el-row>
                    <p>*请于预约之前到达医院进行签到</p>
                </el-row>
            </div>
        </div>
      </div>
      </div>
      <div class="btns">
        <el-button type="primary" size="small"  @click="printFromContent('print')">打印</el-button>
        <el-button size="small"  @click="goBack">返回</el-button>
      </div>
    </cancer-widget>
  </div>
</div>
</template>

<script>
import mixin from '@/mixins/mixins'
export default {
    mixins: [ mixin ],
    data () {
      return {
        personReBookingVo:{
            name:null,
            itemsUnderIt: null,
            sex: null,
            risk:null,
            age:null,
            evaluateDate:null,
            phone:null,
            idCard:null,
        },
        map:{} 
      }
    },
    created(){
        this.getBookingDetail()
    },
    methods: {
      getBookingDetail(){
        this.$axios_http({
            url: '/base/booking/bookingDetail',
            data: {
                personId:this.$route.query.personId,
                surverId:this.$route.query.surverId,
            },
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
                this.personReBookingVo = res.data.result.personReBookingVo
                this.map = res.data.result.map
            }
          })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .blockWrap{
      font-size:14px;
      span{
          top: 0;
          right:20px;
          font-size:14px;
          font-weight: normal;
      }
  }
  h1{
    font-size: 18px;
    color: #333;
    line-height: 1;
    padding-bottom: 15px;
    text-align: center;
    margin-top: 30px;
  }
  .labels{
      position: absolute;
      right:0;
      top:-10px;
  }
.el-row{
  padding:15px 0 15px 20px;
}
h2{
  background: #F7FAFC;
  font-size: 16px;
  font-family:MicrosoftYaHei;
  color: #333333;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 48px;
  padding-left: 20px;
  border-top: 1px solid #f6f6f6;
  border-bottom: 1px solid #f6f6f6;
  margin-top: -1px;
}
.btns{
    text-align: center;
    margin-top: 30px;
}

</style>

