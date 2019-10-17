<template>
  <div>
    <cancer-widget>
        <div class="btns fr">
            <el-button type="default" size="small" @click="$router.go(-1)">返回</el-button>
        </div>
         <el-table 
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            width="60">
            </el-table-column>
            <el-table-column
            prop="deptName"
            label="医院名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="ruleBegin"
            label="放号开始时间">
                <template slot-scope="scope">
                    <span>{{scope.row.ruleBegin | dateFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="ruleEnd"
            label="放号结束时间">
                <template slot-scope="scope">
                    <span>{{scope.row.ruleEnd | dateFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="dataCode"
            label="预约项目">
            </el-table-column>
            <el-table-column
            prop="num"
            label="数量">
            </el-table-column>
            <el-table-column
            label="时间段">
                <template slot-scope="scope">
                    <span>每周{{scope.row.weekInfo | weekInfoFilter}}： {{scope.row.beginTime}}-{{scope.row.endTime}}</span>
                </template>
            </el-table-column>
        </el-table>
    </cancer-widget>
  </div>
</template>
<script>
import getBaseDataList from '@/views/recruitmentPoint/appointment/getBaseDataList'
import { dateFilter,weekInfoFilter } from "@/filters/filter"
  export default {
    mixins: [ getBaseDataList ],
    data () {
      return {
        tableData:[],
        baseDataJcxm:[],   //筛查项目
        valueTime:null,    //预约时间
      }
    },
    created(){
        this.getBaseDataListJcxm();
    },
    mounted(){
      this.query();
    },
    methods: {
      query(){
         this.$axios_http({
          url: "/base/allocation/rule/getRecruitByRuleId",
          data: {
                "ruleId":this.$route.query.id
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.tableData=res.data.result;
            this.tableData.filter(item => {
                this.baseDataJcxm.filter( item1 => {
                    if(item.checkProject==item1.dataName){
                        item.dataCode=item1.dataCode
                    }
                })
            })
          }
        })
      },

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btns{
    margin-bottom: 15px;
}
</style>

