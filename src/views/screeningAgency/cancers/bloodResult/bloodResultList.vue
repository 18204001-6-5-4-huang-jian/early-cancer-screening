<template>
    <div>
         <!--查询表单-->
    <search-com :labelWidth="'100px'" :searchData="searchData" ref="searchBlood" :formData="qc"
                    @searchChange="searchHandler"></search-com>
    <cancer-widget>
        <!--表格-->
       <table-com :propsData="propsData" :tableData="tableData">
        <template slot="operating">
          <el-table-column
            label="操作"
            fixed="right"
            width="100">
            <template slot-scope="scope">
               <el-button size="small" type="text" v-if="scope.row.bloodResultEntryStatus != '1'" @click="viewResult(scope.row,'edit')">填写结果</el-button>
               <el-button size="small" type="text" v-if="scope.row.bloodResultEntryStatus == '1'"  @click="viewResult(scope.row,'see')">查看</el-button>              
            </template>
          </el-table-column>
        </template>
    </table-com> <br>
      <el-pagination
        @size-change="tableSizeChange"
        @current-change="tablePageChange"
        :current-page.sync="queryResult.pageNo"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="queryResult.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.totalPageCount">
      </el-pagination>
    </cancer-widget>
    </div>
</template>
<script>
import { searchConfig } from "./searchConfig";
import { BloodtableConfig } from "./tableConfig";
export default {
    data(){
        return{
          searchData:searchConfig,
          propsData:BloodtableConfig,
          //查询条件
          qc:{},
          tableData:[],
          queryResult:{
            pageNo:1,
            pageSize:10,
            totalPageCount:0
          }
        }
    },
    mounted() {
      this.query();
    },
    methods: {
          searchHandler(val) {
            this.qc = val;
            this.query();
           },
           query(){
              this.$axios_http({
              url: "/base/blood/findList/condition",
              data: Object.assign({}, this.qc, {
                pageNum: this.queryResult.pageNo,
                pageSize: this.queryResult.pageSize
              }),
              vueObj: this
            }).then(res => {
              if(res.data.status == "SUCCESS") {
                 this.tableData = res.data.result.list;
                 this.queryResult.totalPageCount = res.data.result.total;
              }
            });
           },
           tableSizeChange(val){
                this.formData = this.getFormData('searchBlood');
                this.queryResult.pageSize = val;
                this.query();
           },
           tablePageChange(val){
                this.formData = this.getFormData('searchBlood');
                this.queryResult.pageNo = val
                this.query();
           },
           viewResult(row,params){
              this.$router.push({
                path:'/cancer/bloodResultInput',
                query:{
                  personId:row.personId,
                  surverId:row.surverId,
                  id:row.id,
                  status:params
                }
              })
           }
    },  
}
</script>
<style lang="css" scoped>

</style>