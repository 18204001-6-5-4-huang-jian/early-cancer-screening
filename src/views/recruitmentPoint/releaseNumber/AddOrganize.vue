<template>
  <div>
    <cancer-widget>
        <div class="btns fr">
         <el-button type="primary" size="small" @click="selectTableRowFun">确定</el-button>
         <el-button type="default" size="small" @click="$router.go(-1)">取消</el-button>
        </div>
         <el-table 
            :data="tableData"
            ref="multipleTable"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @select-all="handleSelectionAll">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            type="index"
            label="序号"
            width="60">
            </el-table-column>
            <el-table-column
            prop="deptName"
            label="机构名称">
            </el-table-column>
            <el-table-column
            prop="deptCode"
            label="机构编码"
            width="180">
            </el-table-column>
            <el-table-column
            prop="deptAddress"
            label="地址">
            </el-table-column>
        </el-table>
        <el-pagination
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        :current-page="queryResult.pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryResult.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.totalPageCount">
      </el-pagination>
    </cancer-widget>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tableData:[],
        multipleSelection:[],
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
        },
      }
    },
    mounted(){
      this.query();
    },
    methods: {
      query(){
        let deptIds=[];
        if(localStorage.getItem('selectOrganizeTableRow')){
          JSON.parse(localStorage.getItem('selectOrganizeTableRow')).filter(item =>{
            deptIds.push(item.id)
          })
        }
         this.$axios_http({
          url: "/base/allocation/rule/getRecruitByHospitalProvince",
          data: {
                "pageNum":this.queryResult.pageNo,
                "pageSize":this.queryResult.pageSize,
                "deptIds":deptIds
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.tableData=res.data.result.list;
            this.queryResult.totalPageCount=res.data.result.total;
          }
        })
      },
       //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.queryResult.pageSize=pageSize;
        this.query();
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.queryResult.pageNo=currentPage;
        this.query();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit('multipleSelection',this.multipleSelection)
      },
      handleSelectionAll(val) {
        this.multipleSelection = val;
        this.$emit('multipleSelection',this.multipleSelection)
      },
      selectTableRowFun(){
        let arr=[];
        if(localStorage.getItem('selectOrganizeTableRow')){
          arr=this.multipleSelection.concat(JSON.parse(localStorage.getItem('selectOrganizeTableRow')));
        }else{
          arr=this.multipleSelection;
        }
        localStorage.setItem('selectOrganizeTableRow',JSON.stringify(arr));
        this.$router.push({path:'/appointment/addnumber'})
      },

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btns{
    margin-bottom: 15px;
}
</style>

