<template>
  <div>
       <search-com  :labelWidth="'100px'" :searchData="searchData" ref="5searchTable" :formData="qc"
                    @searchChange="searchChange"></search-com>
    <div class="table-con-appointment">
      <cancer-widget>
          <RecruitTable :tableData="tableData" @refreshList="query"></RecruitTable>
      <br>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        :current-page="queryResult.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryResult.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.totalPageCount">
      </el-pagination>
      <br>
    </cancer-widget>
    </div>
  </div>
</template>
<script>
import RecruitTable from "../../common/RecruitTable"
import DICTIONARY from '@/views/common/dictionary'
import getBaseDataList from '@/views/recruitmentPoint/appointment/getBaseDataList'
import {SUBJECT} from '@/views/common/searchConfig5'
  export default {
    mixins: [ getBaseDataList ],
    data () {
      return {
        tableData:[],
        baseDataJcxm:[],   //筛查项目
        riskTypeNew:DICTIONARY.riskTypeNew,    //癌种
        signStatus:DICTIONARY.signStatus,   //签到状态
        num:{},    //统计
        //查询条件
        qc: {
          "personName": null,
          "checkProjectCode": null,
          "idCard": null,
          "riskType": null,
          "signStatus": null,
          "surverId": null,
        },
        //查询结果
        "queryResult": {
          "pageNum": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
        },
        searchData: SUBJECT,
      }
    },
    components:{
      RecruitTable
    },
    created(){
        this.getBaseDataListJcxm();
    },
    mounted(){
      this.query();
    },
    methods: {
        // flag-----true.查询按钮查询，增加统计查询，false.其他查询，统计无需再次查询
      query(){
         this.$axios_http({
          url: "/base/zm/booking/find/condition",
          data: Object.assign({},this.qc,{pageNum:this.queryResult.pageNum,
                  pageSize:this.queryResult.pageSize}),
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.tableData = res.data.result.list;
            this.queryResult.totalPageCount = res.data.result.total;
            this.queryResult.pageNum = res.data.result.pageNum;
          }
        })
      },
      searchChange(val){
          // console.log(val);
          let data = Object.assign({},this.qc,{pageNum:this.queryResult.pageNum,
                  pageSize:this.queryResult.pageSize},val);
          delete data.deptType;
            this.$axios_http({
            url: "/base/zm/booking/find/condition",
            data:data,
            vueObj:this
           }).then((res)=>{
              if(res.data.status=="SUCCESS"){
                this.tableData = res.data.result.list;
                this.queryResult.totalPageCount = res.data.result.total;
                this.queryResult.pageNum = res.data.result.pageNum
              }
           })
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.qc = this.getFormData('5searchTable');
        this.queryResult.pageSize = pageSize;
        this.query();
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.qc = this.getFormData('5searchTable');
        this.queryResult.pageNum = currentPage;
        this.query();
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.table-con-appointment{
  position: relative;
  .el-button{
    position: absolute;
    right: 40px;
    top: 20px;
  }
}
</style>

