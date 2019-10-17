<template>
    <div>
      <!-- <cancer-widget>
          <el-form :model="qc" :inline="true">
            <el-form-item label="所属机构:">
             <el-input v-model="qc.searchDeptId" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="账户角色:">
              <el-select v-model="qc.searchRoleId" size="small"  placeholder="请选择" clearable>
                <el-option value="1" v-bind:key="0" label="有效"></el-option>
                <el-option value="2" v-bind:key="1" label="无效"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号状态:">
              <el-select v-model="qc.searchFlag" size="small"  placeholder="请选择" clearable>
                <el-option value="1" v-bind:key="0" label="有效"></el-option>
                <el-option value="2" v-bind:key="1" label="无效"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号名称:">
             <el-input v-model="qc.searchLoginName" placeholder="请输入账号名称"  size="small" clearable></el-input>
            </el-form-item>
            <el-form-item>
             <el-button type="primary" size="small">搜索</el-button>
            </el-form-item>
        </el-form>
      </cancer-widget> -->
      <cancer-widget>
         <div class="btns clearfix">
            <el-button type="primary" size="small" class="fr" @click="goto">添加用户</el-button>
         </div>
        <commonTable :tableData="tableData"></commonTable>
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
</template>
<script>
import commonTable from '@/views/recruitmentPoint/users/CommonTable'
import mixin from '@/mixins/mixins'
  export default {
    mixins: [ mixin ],
    data () {
      return {
        tableData:[],
        //查询条件
        qc: {
          "searchDeptId": null,
          "searchRoleId": null,
          "searchFlag": null,
          "searchLoginName": null,
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
        },
      }
    },
    components:{
      commonTable
    },
    created(){

    },
    mounted(){
      this.query();
    },
    methods: {
      query(pageNum,pageSize){
         this.$axios_http({
          url: "/base/sys/user/findUsersByCurrentDeptId",
          data: {
                "pageNum":this.queryResult.pageNo,
                "pageSize":this.queryResult.pageSize,
                "searchDeptId":this.qc.searchDeptId,
                "searchRoleId":this.qc.searchRoleId,    
                "searchFlag":this.qc.searchFlag,
                "searchLoginName":this.qc.searchLoginName,
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
      goto(){
        if(this.$route.path.indexOf('/user/index')>-1){
          this.$router.push('/user/adduser');
        }else{
          this.$router.push('/usergj/adduser');
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btns button{
    // margin-bottom: 15px;
    margin-bottom: 25px;
}
</style>

