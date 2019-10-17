<template>
  <div class="cancer-index">
    <el-row>
      <!--今日预约待处理-->
      <el-col :span="12">
        <cancer-widget>
          <template slot="title">
        <p class="title">
          <span class="img-container">
             <i class="i"></i>
          </span>
          <span class="span" style="vertical-align:middle">今日预约待处理</span>
        </p>
        <p class="line-p"></p>
          </template>
          <el-row class="cancer-margin--b15 cancer-margin--t15">
            <el-col :span="6">
              <el-badge :value="statisticsData.faCtYY" class="cancer-item">
                <router-link to="/appointment/recruitlist">低剂量CT</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.rxCsYY" class="cancer-item">
                <router-link to="/appointment/recruitlist">乳腺超声</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.rxXxYY" class="cancer-item">
                <router-link to="/appointment/recruitlist">乳腺X线</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.gaJxYY" class="cancer-item">
                <router-link to="/appointment/recruitlist">肝癌三项</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.sxhdNjYY" class="cancer-item">
                <router-link to="/appointment/recruitlist">上消内镜</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.caCjYY" class="cancer-item">
                <router-link to="/appointment/recruitlist">结直肠镜</router-link>
              </el-badge>
            </el-col>
          </el-row>
        </cancer-widget>
      </el-col>

      <!--筛查结果待录入-->
      <el-col :span="12">
        <cancer-widget>
          <template slot="title">
        <p class="title">
          <span class="img-container1">
             <i class="i"></i>
          </span>
          <span class="span" style="vertical-align:middle">筛查结果待录入</span>
        </p>
        <p class="line-p"></p>
          </template>
          <el-row class="cancer-margin--b15 cancer-margin--t15">
            <el-col :span="6">
              <el-badge :value="statisticsData.faCtResult" class="cancer-item">
                <router-link to="/cancer/lunglist">低剂量CT</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.rxCsResult" class="cancer-item">
                <router-link to="/cancer/mammarysound/list">乳腺超声</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.rxXxResult" class="cancer-item">
                <router-link to="/cancer/mammary/list">乳腺X线</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.gaJxResult" class="cancer-item">
                <router-link to="/cancer/liverlist">肝癌三项</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.sxhdNjResult" class="cancer-item">
                <router-link to="/cancer/digestivelist">上消内镜</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.sxhdBlResult" class="cancer-item">
                <router-link :to="{path:'/cancer/digestivelist',query:{activeName:1}}">上消病理</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.caCjResult" class="cancer-item">
                <router-link to="/cancer/colorectal/list">结直肠镜</router-link>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-badge :value="statisticsData.caBlResult" class="cancer-item">
                <router-link :to="{path:'/cancer/colorectal/list',query:{activeName:1}}">结肠病理</router-link>
              </el-badge>
            </el-col>
          </el-row>
        </cancer-widget>
      </el-col>
    </el-row>
    <!--今日预约待处理-->
    <el-row>
      <el-col :span="12">
        <cancer-widget>
          <template slot="title">
          <p class="title">
            <span class="img-container2">
              <i class="i"></i>
          </span>
          <span class="span" style="vertical-align:middle">生物样本待录入</span>
        </p>
        <p class="line-p"></p>
          </template>
          <el-row class="cancer-margin--b15 cancer-margin--t15">
            <el-col :span="6">
              <el-badge :value="statisticsData.swybResult" class="cancer-item">
                <router-link to="/agency/samples/index">生物样本待录入</router-link>
              </el-badge>
            </el-col>
          </el-row>
        </cancer-widget>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import mixin from '@/mixins/mixins'
  export default {
    name: 'agency-home',
    mixins: [ mixin ],
    data() {
      return {
        statisticsData: {
          faCtYY: null,   // 肺癌CT - 今日预约
          rxCsYY: null,	// 乳腺癌超声 - 今日预约
          rxXxYY: null,	// 乳腺癌X线 - 今日预约
          gaJxYY: null,	// 肝癌三项 - 今日预约
          sxhdNjYY: null,	// 上消化道内镜 - 今日预约
          caCjYY: null,	// 结直肠癌肠镜 - 今日预约
          faCtResult: null,	// 肺癌CT - 待录入
          rxCsResult: null,	// 乳腺癌超声 - 待录入
          rxXxResult: null,	// 乳腺癌X线 - 待录入
          gaJxResult: null,	// 肝癌三项 - 待录入
          sxhdNjResult: null,	// 上消化道内镜 - 待录入
          caBlResult: null,	// 结直肠癌肠镜 - 待录入
          sxhdBlResult: null,	// 上消化道病理结果 - 待录入
          caCjResult: null,	// 结直肠癌病理结果 - 待录入
          swybResult: null, // 生物样本待录入
        },
      }
    },
    created(){
      this.getData()
    },
    methods: {
      async getData () {
        const {data: {status, result}} = await this.$axios_http({
          url: '/base/index/find/user/scstatistics',
          method: 'post'
        })
        if (status === 'SUCCESS') {
          this.statisticsData = Object.assign({}, result)
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .cancer-index {
    .cancer-wrap{
      padding-right: 25px;
    }
    .line-p{
      display: inline-block;
      width: 100%;
      height: 1px;
      margin-top: 18px;
      background: #E9EDF0;
    }
    .title{
      width:55%;
      height: 80px;
      line-height: 80px;
      .img-container{
        display: inline-block;
        width: 80px;
        height:80px;
        line-height:80px;
        border-radius:5px;
        vertical-align: middle;
        overflow:hidden;
        .i{
          display:inline-block;
          width: 40px;
          height:48px;
          margin-top:16px;
          margin-left: 20px;
          background: url('../../assets/img/cancle.png') no-repeat;
          // background-size:cover; 
          background-size:100% 100%;
        }
      }
      .img-container1{
        display: inline-block;
        width: 80px;
        height:80px;
        line-height:80px;
        border-radius:5px;
        vertical-align: middle;
        overflow:hidden;
        .i{
          display:inline-block;
          width: 30px;
          height:52px;
          margin-top:14px;
          margin-left: 25px;
          background: url('../../assets/img/join.png') no-repeat;
          background-size:100% 100%; 
        }
      }
      .img-container2{
        display: inline-block;
        width: 80px;
        height:80px;
        line-height:80px;
        border-radius:5px;
        vertical-align: middle;
        overflow:hidden;
        .i{
          display:inline-block;
          width: 40px;
          height:48px;
          margin-top:16px;
          margin-left: 20px;
          background: url('../../assets/img/result.png') no-repeat;
          // background-size:cover;
          background-size:100% 100%; 
        }
      }
      .span{
        vertical-align: middle;
        font-size: 18px;
        font-family:PingFang-SC-Heavy;
        color: #333333;
        letter-spacing:0;
        padding:20px;
      }
      // &:hover .img-container{
      //     background: #317ef7;
      // }
      // &:hover .img-container1{
      //     background: #317ef7;
      // }
      // &:hover .img-container2{
      //     background: #317ef7;
      // }
      // &:hover .img-container .i{
      //   background:url('../../assets/img/cancle_active.png') no-repeat;
      //   // background-size:cover; 
      //   background-size:100% 100%;
      // }
      // &:hover .img-container1 .i{
      //   background:url('../../assets/img/join_active.png') no-repeat;
      //   background-size:100% 100%; 
      // }
      // &:hover .img-container2 .i{
      //   background:url('../../assets/img/result_active.png') no-repeat;
      //   // background-size:cover; 
      //   background-size:100% 100%;
      // }
    }
    .sub-title{
      font-size: 14px;
      color: #0F3876;
      border-top: 1px solid #E9EDF0;
      border-bottom: 1px solid #E9EDF0 ;
      padding: 10px 0 10px 10px;
      box-sizing: border-box;
      margin: 20px 0;
    }
    .cancer-item {
      margin:15px;
      width: 85%;
      // height: 75px;
      height:101px;
      background: #F9FAFC;
      text-align: center;
      font-size: 14px;
      color: #666;
      a{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-family: PingFang-SC-Heavy;
        font-size: 16px;
        color: #7E7E7E;
        letter-spacing: 0;
        text-align: center;
      }
      &:hover{
        background: #ffffff;
        cursor: pointer;
        box-shadow: 0 0 4px 2px rgba(241,241,241,0.50);
      }
    }
   .cancer-wrap-box:hover .img-container,.cancer-wrap-box:hover .img-container1,.cancer-wrap-box:hover .img-container2{
    background: #317ef7 !important;
   }
   .cancer-wrap-box:hover .img-container .i{
        background:url('../../assets/img/cancle_active.png') no-repeat;
        background-size:100% 100%;
      }
    .cancer-wrap-box:hover .img-container1 .i{
        background:url('../../assets/img/join_active.png') no-repeat;
        background-size:100% 100%; 
      }
    .cancer-wrap-box:hover .img-container2 .i{
        background:url('../../assets/img/result_active.png') no-repeat;
        background-size:100% 100%;
      }
  }
</style>

