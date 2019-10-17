<template>
  <div class="gl">
    <el-select v-model="year" placeholder="请选择" class="yearBox" @change="getData">
      <el-option :label="item.name" :value="item.name" :key="item.value" v-for="item in years"></el-option>
    </el-select>
    <el-row>
      <el-col :span="8">
        <cancer-widget style="height:350px;">
          <template slot="title">
            <span class="img-container">
              <p class="icon"></p>
          </span>
            <span class="span">工作待办事宜</span>
          </template>
          <p class="sub-title">生物样本</p>
          <el-row class="cancer-margin--b15 cancer-margin--t15 margin">
            <el-col :span="12">
              <el-badge :value="count" class="cancer-item">
                <router-link to="/gj/express">生物样本接收管理</router-link>
              </el-badge>
            </el-col>
          </el-row>
        </cancer-widget>
      </el-col>
      <el-col :span="8">
        <cancer-widget style="height: 350px;">
          <template slot="pre-button">
            <!-- <span>本年度各省早诊早治评估问卷完成率排名</span> -->
            <span>评估完成数排名</span>
          </template>
          <p class="line"></p>
          <cancer-bar :dataList="evaluateBarData"></cancer-bar>
        </cancer-widget>
      </el-col>
      <el-col :span="8">
        <cancer-widget style="height: 350px;">
          <template slot="pre-button">
            <!-- <span>本年度各省早诊早治筛查完成排名</span> -->
            <span>筛查完成数排名</span>
          </template>
          <p class="line"></p>
          <cancer-bar :dataList="screenBarData"></cancer-bar>
        </cancer-widget>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <cancer-widget style="height: 350px;">
          <template slot="pre-button">
            <span>筛查依从率排名</span>
          </template>
          <p class="line"></p>
          <gl-cancer-bar :dataList="screenComplianceBarData" :seriesName="`依从率`"></gl-cancer-bar>
        </cancer-widget>
      </el-col>
      <el-col :span="12">
        <cancer-widget style="height: 350px;">
          <template slot="pre-button">
            <span>筛查阳性率排名</span>
          </template>
          <p class="line"></p>
          <gl-cancer-bar :dataList="positiveCancerBarData" :seriesName="`阳性率`"></gl-cancer-bar>
        </cancer-widget>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Ehcarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/chart/bar'
  import CancerBar from '@/views/common/Bar'
  import GlCancerBar from '@/views/common/Glbar'
  export default {
    name: 'gj-index',
    data() {
      return {
        count: 0,
        year:'2018',
        screen: 'all',
        evaluate: 'all',
        years:[{
          value: '2018',
          name: '2018'
        },{
          value: '2019',
          name: '2019'
        }],
        screenBarData: {
          proviceName: [],  // 筛查完成率 - 省份
          percent: [],  // 筛查完成率率 - 省份
        },
        evaluateBarData: {
          proviceName: [],  // 问卷完成率 - 省份
          percent: [],  // 问卷完成率
        },
        screenComplianceBarData: {
          proviceName: [],  // 筛查依从率 - 省份
          percent: [],  // 筛查依从率
        },
        positiveCancerBarData: {
          proviceName: [],  // 筛查阳性率 - 癌种
          percent: [],  // 筛查阳性率
        },
      }
    },
    methods: {
      async getData () {
        const {data: {status, result}} = await this.$axios_http({
          url: `/base/index/find/user/glStatistics/${this.year}`,
          method: 'post'
        })
        if (status === 'SUCCESS') {
          this.count = result.count
          this.evaluateBarData.proviceName = result.vo.evaluateCNProvice && JSON.parse(result.vo.evaluateCNProvice).reverse()
          this.evaluateBarData.percent = result.vo.evaluateCompleteNum && JSON.parse(result.vo.evaluateCompleteNum).reverse()

          this.screenBarData.proviceName = result.vo.screenCNProvince  && JSON.parse(result.vo.screenCNProvince).reverse()
          this.screenBarData.percent = result.vo.screenCompleteNum && JSON.parse(result.vo.screenCompleteNum).reverse()

          this.screenComplianceBarData.proviceName = result.vo.screenComplianceProvince  && JSON.parse(result.vo.screenComplianceProvince).reverse()
          this.screenComplianceBarData.percent = result.vo.screenComplianceNum && JSON.parse(result.vo.screenComplianceNum).reverse()

          this.positiveCancerBarData.proviceName = result.vo.positiveCancerName  && JSON.parse(result.vo.positiveCancerName).reverse()
          this.positiveCancerBarData.percent = result.vo.positiveCancerNum && JSON.parse(result.vo.positiveCancerNum).reverse()
        }
      }
    },
    components: {
      CancerBar,
      GlCancerBar
    },
    created() {
      this.getData()
    }
  }
</script>
<style scoped lang="scss">
.gl{
  position: relative;
  .yearBox{
    position: absolute;
    width: 200px;
    top: -38px;
    right: 20px;
    z-index: 10;
  }
}
   .span{
      font-family: PingFang-SC-Heavy;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
      vertical-align: middle;
   }
   .sub-title{
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #3989F8;
      letter-spacing: 0;
      color:#3989F8;
      border-top: 1px solid #E9EDF0;
      border-bottom: 1px solid #E9EDF0 ;
      padding: 10px 0 10px 10px;
      box-sizing: border-box;
      margin: 10px 0;
    }
   .img-container{
      display: inline-block;
      width: 80px;
      height:80px;
      line-height:80px;
      border-radius:5px;
      vertical-align: middle;
      overflow:hidden;
      .icon{
      width: 40px;
      height: 40px;
      display: inline-block;
      vertical-align: middle;
      margin:0 20px;
      background:url('../../assets/img/work.png') no-repeat;
      background-size:100% 100%;
      }
    }
    .cancer-wrap:hover .img-container{
        background: #3989F8;
    }
    .cancer-wrap:hover .img-container .icon{
       background: url('../../assets/img/work_active.png') no-repeat;
       background-size:100% 100%;
    }
  .cancer-item {
    margin-bottom: 15px;
    width: 65%;
    // height: 75px;
    height: 101px;
    background: #F9FAFC;
    text-align: center;
    font-size: 14px;
    color: #666;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
     &:hover{
        cursor: pointer;
        background: #ffffff;
        cursor: pointer;
        box-shadow: 0 0 4px 2px rgba(241,241,241,0.50);
      }
  }
  .line{
    width: 100%;
    height: 1px;
    background: #eee;
  }
  .margin{
    margin-top: 25px;
  }
</style>
<style>
.gl .el-input__suffix{
  right: 0 !important;
  background-color: #3989F8 !important;
}
.gl .el-input__suffix .el-input__suffix-inner{
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
  }
  .gl .el-select__caret.el-input__icon.el-icon-arrow-up{
    color: #ffffff !important;
  }
</style>
