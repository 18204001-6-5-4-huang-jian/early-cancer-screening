<template>
  <!--质控-->
  <div>
    <!--查询表单-->
    <search-com :labelWidth="'100px'" :searchData="searchData" :formData="formData" ref="searchFollow"
                    @searchChange="searchHandler"></search-com>

    <!--表格-->
    <cancer-widget>
       <template slot="sub-button">
        <el-button type="success" size="small" @click="exportExcelHandler()">导出</el-button>
      </template>
       <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="未分配" name="1">
        <el-button type="primary" class="task-btn" v-if="deptmentType != 'gj'" @click="assignTask()">分配任务</el-button>
      <table-com :propsData="propsData" :tableData="tableData" @change="handleSelectionChange" @selectAll="handleSelectionAll">
        <template slot="operating">
          <el-table-column
            prop="address"
            label="操作" fixed="right" width="120">
            <template slot-scope="scope">
              <el-button size="small" type="text" v-if="!scope.row.hide && scope.row.formStatus == 1" @click="goToFollowEntrySee(scope.row)">查看</el-button>
              <el-button size="small" type="text" v-if="!scope.row.hide && scope.row.formStatus != 1" @click="goToFollowEntry(scope.row)">开始录入</el-button>              
            </template>
          </el-table-column>
        </template>
    </table-com>
      <!--分页-->
      <br>
      <el-pagination
        @size-change="tableSizeChange"
        @current-change="tablePageChange"
        :current-page.sync="queryResult.pageNo"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="queryResult.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.totalPageCount">
      </el-pagination>
      <br>
      </el-tab-pane>
        <el-tab-pane label="已分配" name="2">
        <el-button type="primary" class="task-btn" v-if="deptmentType != 'gj'" @click="recallTask()">撤回任务</el-button>
        <table-com :propsData="propsData" :tableData="tableData1" @change="handleSelectionChange1" @selectAll="handleSelectionAll1">
          <template slot="operating">
            <el-table-column
              prop="address"
              label="操作" fixed="right" width="120">
              <template slot-scope="scope">
                <el-button size="small" type="text" v-if="!scope.row.hide && scope.row.formStatus == 1" @click="goToFollowEntrySee(scope.row)">查看</el-button>
                <el-button size="small" type="text" v-if="!scope.row.hide && scope.row.formStatus != 1" @click="goToFollowEntry(scope.row)">开始录入</el-button>              
              </template>
            </el-table-column>
          </template>
      </table-com>
        <!--分页-->
        <br>
        <el-pagination
          @size-change="tableSizeChange1"
          @current-change="tablePageChange1"
          :current-page.sync="queryResult1.pageNo"
          :page-sizes="[10, 20, 50, 100, 200]"
          :page-size="queryResult1.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryResult1.totalPageCount">
        </el-pagination>
        <br>
        </el-tab-pane>
      </el-tabs>
    </cancer-widget>
    <el-dialog
        class="follow"
        :title="`您已选择${assignTaskNum}条随访数据，将分配给：`"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
  import mixin from '@/mixins/mixins'
  import { FOLLOW } from '@/views/followUp/searchConfig'
  import { FOLLOWTB } from '@/views/followUp/tablePropConfig'
  export default {
    name: 'quality-control',
    mixins: [ mixin ],
    data () {
      return {
        propsData: FOLLOWTB,
        searchData: FOLLOW,
        formData: {},
        tableData: [],
        tableData1:[],
        "queryResult": {
            "pageNo": 1,//当前页
            "pageSize": 10,//每页的条数
        },
        "queryResult1": {
            "pageNo": 1,//当前页
            "pageSize": 10,//每页的条数
        },
        activeName:'1',
        multipleSelection:[],
        multipleSelection1:[],
        dialogVisible:false,
        defaultProps:{
          children: 'child',
          label: 'deptName'
        },
        data:[],
        treeData:null,
        assignTaskNum:0,
        recallTaskNum:0,
        dataIdList:[],
        dataIdList1:[]
      }
    },
    mounted() {
      this.query();
      this.getTreeData();
      // console.log(this.deptmentType)
    },
    computed: {
      deptmentType(){
        return sessionStorage.getItem('deptmentType');
      }
    },
    methods: {
      getTreeData(){
         this.$axios_http({
          url: "/base/system/find/allDeptree",
          data: {},
          vueObj: this
          }).then((res)=> {
            if(res.data.status=="SUCCESS"){
              this.data = res.data.result.child;
            }
          })
      },
      query() {
        this.$axios_http({
            url: "/base/followup/index",
            data: Object.assign(this.formData,{
                    "pageNum": this.queryResult.pageNo,
                    "pageSize": this.queryResult.pageSize,
                    allocationStatus:2
                }),
            vueObj: this
        }).then((res) => {
            if (res.data.status == "SUCCESS") {
                this.tableData = res.data.result.list;
                this.queryResult.totalPageCount = res.data.result.total;
            }
        })
      },
      query1(){
        this.$axios_http({
            url: "/base/followup/index",
            data: Object.assign(this.formData,{
                    "pageNum": this.queryResult1.pageNo,
                    "pageSize": this.queryResult1.pageSize,
                    allocationStatus:1
                }),
            vueObj: this
        }).then((res) => {
            if (res.data.status == "SUCCESS") {
                this.tableData1 = res.data.result.list;
                this.queryResult1.totalPageCount = res.data.result.total;
            }
        })
      },
      goToFollowEntry(row) {
        this.$router.push({path:'/followup/followentry',query:{id:row.id}})
        localStorage.setItem('followEntry',JSON.stringify(row))
      },
      goToFollowEntrySee(row) {
        this.$router.push({path:'/followup/followentry',query:{id:row.id,flag:0}})
        localStorage.setItem('followEntry',JSON.stringify(row))
      },
      //搜索
      searchHandler(val) {
        this.formData = val
        this.query()
        this.query1()
      },

      // 分页=>改变每页条数
      tableSizeChange(val) {
        this.formData = this.getFormData('searchFollow');
        this.queryResult.pageSize = val;
        this.query();
      },

      // 分页=>改变当前页
      tablePageChange(val) {
        this.formData = this.getFormData('searchFollow');
        this.queryResult.pageNo = val
        this.query();
      },
      
      tableSizeChange1(val){
        this.formData = this.getFormData('searchFollow');
        this.queryResult1.pageSize = val;
        this.query1();
      },
      
      tablePageChange1(val) {
        this.formData = this.getFormData('searchFollow');
        this.queryResult1.pageNo = val
        this.query1();
      },
      // 导出
      exportExcelHandler() {
        let name ='随访列表.xls';
        let allocationStatus = null;
        if(this.activeName == '1'){
          allocationStatus = 2;
          this.formData.pageNum = this.queryResult.pageNo;
          this.formData.pageSize = this.queryResult.pageSize;
        }else if(this.activeName == '2'){
          allocationStatus = 1;
          this.formData.pageNum = this.queryResult1.pageNo;
          this.formData.pageSize = this.queryResult1.pageSize
        }
        this.$axios_http({
          method:'POST',
          url:'/base/followup/data/export',
          responseType:'blob',
          headers:{
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data:Object.assign({},this.formData,{allocationStatus:allocationStatus}),
          vueObj:this
          }).then(res =>{
            if (!res.data) {
                return
            }
            if(res.data.type=='text/xml'){
              this.$confirm('对不起，您的登录状态已过期，请重新登录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showCancelButton:false,
                    type: 'warning'
                  }).then(() => {
                    window.location.href=BIGPLATFORM_URL
                  }).catch(() => {
                  });
              return;
            }
            let url = window.URL.createObjectURL(new Blob([res.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', name)
            document.body.appendChild(link)
            link.click()
            URL.revokeObjectURL(link.href); // 释放URL 对象
            document.body.removeChild(link);
          })
      },
      handleClick(){
         if(this.activeName == '1'){
              this.query()
         }else if(this.activeName == '2'){
              this.query1()
         }
      },
      handleSelectionChange(val){
         this.multipleSelection = val;
         this.assignTaskNum = Number(val.length);
         this.dataIdList = [];
         for(let k = 0;k<val.length;k++){
           this.dataIdList.push(val[k].id)
         }
      },
      handleSelectionAll(val){
         this.multipleSelection = val;
         this.assignTaskNum = Number(val.length)
         this.dataIdList = [];
         for(let k = 0;k<val.length;k++){
           this.dataIdList.push(val[k].id)
         }
      },
      handleSelectionChange1(val){
         this.multipleSelection1 = val;
         this.recallTaskNum = Number(val.length)
         this.dataIdList1 = [];
         for(let k = 0;k<val.length;k++){
           this.dataIdList1.push(val[k].id)
         }
      },
      handleSelectionAll1(val){
         this.multipleSelection1 = val;
         this.recallTaskNum = Number(val.length)
         this.dataIdList1 = [];
         for(let k = 0;k<val.length;k++){
           this.dataIdList1.push(val[k].id)
         }
      },
      assignTask(){
         this.dialogVisible = true;
         this.treeData = null;
         this.getTreeData();
      },
      recallTask(){
        this.$confirm('撤回后可重新分配。您确定要撤回吗？', `您已选择${this.recallTaskNum}条随访数据：`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass:'follow',
          beforeClose: (action, instance, done) => {
            if(action === 'confirm'){
                if(this.multipleSelection1.length == 0){
                    this.$message({
                      message: '对不起，至少选择一条数据进行撤回',
                      type: 'warning'
                    });
                    return false;
                }
                  this.$axios_http({
                      url: "/base/followup/revoke",
                      data: {
                        dataIdList:this.dataIdList1,
                      },
                      vueObj: this
                      }).then((res)=> {
                        if(res.data.status=="SUCCESS"){
                          this.$message({
                            message: '撤回成功',
                            type: 'success'
                          });
                           done()
                          this.query1();
                        }
                      })
            }else if(action === 'cancel'){
               this.$message({
                  type: 'info',
                  message: '取消成功'
                });
               done()
            }
          }
         }).then((action) => {
            
         }).catch(() => {

         })
      },
      handleClose(){
         this.dialogVisible = false;
      },
      handleNodeClick(data) {
        this.treeData = null;
        this.treeData = data;
      },
      submit(){
        if(this.treeData == null){
           this.$message({
              message: '对不起，请选择机构进行分配',
              type: 'warning'
            });
            return false;
        }
        if(this.multipleSelection.length == 0){
            this.$message({
              message: '对不起，至少选择一条数据进行分配',
              type: 'warning'
            });
            return false;
        }
        this.$axios_http({
          url: "/base/followup/allocation",
          data: {
            dataIdList:this.dataIdList,
            deptId:this.treeData.id
          },
          vueObj: this
          }).then((res)=> {
            if(res.data.status=="SUCCESS"){
              this.$message({
                message: '分配成功',
                type: 'success'
              });
              this.dialogVisible = false;
              this.query();
            }
          })
      }
    }
  }
</script>
<style lang="css" scoped>
.task-btn{
  margin: 10px 0;
}
</style>
<style lang="css">
  .el-dialog__wrapper.follow .el-dialog__title{
    color: red;
  }
  .el-message-box.follow .el-message-box__title{
    color: red;
  }
</style>