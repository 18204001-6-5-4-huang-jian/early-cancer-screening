<template>
  <div>
    <!--表单查询--> 
    <search-com :labelWidth="'100px'" :searchData="searchData" :formData="qc" ref="searchHp"
                    @searchChange="searchHandler"></search-com>
    <div class="table-con-appointment">
      <cancer-widget>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="1">
            <HpTable :tableData="tableData" @refreshList="query"></HpTable>
          </el-tab-pane>
          <el-tab-pane label="筛查结果待录入" name="2">
            <HpTable :tableData="tableData"  @refreshList="query"></HpTable>
          </el-tab-pane>
          <el-tab-pane label="筛查结果已录入" name="3">
            <HpTable :tableData="tableData" @refreshList="query"></HpTable>
          </el-tab-pane>
      </el-tabs>
      <br>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        :current-page="queryResult.pageNo"
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
import HpTable from "./HpTable"
import { HP } from '@/views/recruitmentPoint/HP/searchConfig'
  export default {
    data () {
      return {
        searchData: HP,
        activeName: '1',
        tableData:[],
        //查询条件
        qc: {},
        //查询结果
        "queryResult": {
          "pageNum": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 1
        },
      }
    },
    components:{
      HpTable
    },
    mounted(){
      if(this.$route.query.tFlag === '1'){
        this.activeName="2"
      }
      this.query();
      // this.adduser();
    },
    methods: {
      searchHandler(val) {
        this.qc = val
        this.query();
      },
      async query(){
        let _resultStatus=null;
        if(this.activeName=="1"){
          _resultStatus=null;
        }else if(this.activeName=="2"){
          _resultStatus=2;
        }else if(this.activeName=="3"){
          _resultStatus=1;
        }
        const  {data: {status, result}} = await this.$axios_http({
          url: "/base/measurement/find/hpList",
          data: Object.assign({}, this.qc, this.queryResult, {resultStatus: _resultStatus}),
          vueObj: this
        })
        this.tableData = result.list
        this.queryResult.totalPageCount = result.total;
      },
      handleClick(tab, event) {
        this.queryResult.pageNum = 1
        this.queryResult.pageSize = 10
        this.query();
      },
       //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.qc = this.getFormData('searchHp');
        this.queryResult.pageSize=pageSize;
        this.query();
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.qc = this.getFormData('searchHp');
        this.queryResult.pageNum=currentPage;
        this.query();
      },
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

