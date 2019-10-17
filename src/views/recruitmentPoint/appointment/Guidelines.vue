<template>
    <div class="content">
    <cancer-widget>
        <div id="print">
            <h2>{{hosGuidelinesPOS.title}}</h2>
            <div class="personInfo">
                <el-row class="row">
                    <el-col :span="8">
                    <p>姓名:{{personInfo.name}}</p>
                    </el-col>
                    <el-col :span="8">
                    <p>年龄：{{personInfo.age}}</p>
                    </el-col>
                    <el-col :span="8">
                    <p>性别：{{personInfo.sex | sexFilter}}</p>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="16">
                    <p>住址:{{personInfo.czAddress}}</p>
                    </el-col>
                    <el-col :span="8">
                    <p>电话：{{personInfo.phone}}</p>
                    </el-col>
                </el-row>
            </div>
            <div class="con">
                <div class="block" v-for="(item,index) in hosGuideListPOList" :key="index">
                    <h3>{{item.checkProject | cancerTypeFilters}}</h3>
                    <el-row class="row" v-for="(itemA,j) in item.data" :key="j">
                        <el-col :span="8">{{itemA.checkName}}</el-col>
                        <el-col :span="8">{{itemA.checkPosition}}</el-col>
                        <el-col :span="8">{{itemA.screeningId}}</el-col>
                    </el-row>
                </div>
            </div>
            <el-row class="row">
                <el-col :span="16">{{personInfo.surverId}}</el-col>
                <el-col :span="8">{{new Date() | dateFilter}}</el-col>
            </el-row>
            <el-row class="row">备注：{{hosGuidelinesPOS.remark}}</el-row>
        </div>
        <div class="btn" style="text-align:center;margin-bottom:15px">
            <el-button size="small" class="return-home" @click="goBack()">返 回</el-button>
            <el-button size="small" type="primary" @click="printFromContent('print')">打印</el-button>
        </div>
      </cancer-widget>
    </div>
</template>
<script>
import minxin from "@/mixins/mixins";
export default {
  mixins: [minxin],
  data() {
    return {
      personInfo: {
        name: null,
        age: null,
        sex: null
      },
      hosGuidelinesPOS:{},
      hosGuideListPOList:{}
    };
  },
  mounted() {
      this.getData()
  },
  methods: {
    getData() {
      this.$axios_http({
        url: "/base/person/find/guidelines",
        data: {
          personId: this.$route.query.personId,
          surverId: this.$route.query.surverId
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          let { person, hosGuidelinesPOS, hosGuideListPOList } = res.data.result
          this.personInfo = person
          this.hosGuidelinesPOS = hosGuidelinesPOS || {}
          this.hosGuideListPOList = hosGuideListPOList || {}
        }
      });
    }
  }
};
</script>

<style scoped>
.content {
  width: 100%;
}
.personInfo,
.con {
  border-bottom: 1px solid #999;
}
#print .row{
    margin-bottom:10px;
}
#print{
    width: 800px;
    margin:0 auto 50px;
}
h2{
    text-align: center;
    margin-bottom: 15px;
    font-size: 20px;
}
h3{
    font-size: 18px;
}
.block{
    margin-top: 15px;
}
.con .block:last-child{
    margin-bottom: 15px;
}
.con{
    margin-bottom: 15px;
}
</style>



