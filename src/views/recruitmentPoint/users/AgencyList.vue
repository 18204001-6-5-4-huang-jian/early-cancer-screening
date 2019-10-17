<template>
  <!--机构管理-->
  <div>
    <!--表格-->
    <cancer-widget>
      <template slot="pre-button">
          <span class="title">机构列表</span>
          <div v-if="isShow">
             <router-link :to="{path:'/user/agency/add'}">
                <el-button size="small" type="primary">新增机构</el-button>
              </router-link>
          </div>
      </template>
      <table-com :propsData="propsData" :tableData="listTableData.list">
        <template slot="operating">
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="watchForm(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </template>
    </table-com>
      <!--分页-->
      <br>
      <el-pagination
        @size-change="tableSizeChange"
        @current-change="tablePageChange"
        :current-page.sync="listTableData.pageNum"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="listTableData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTableData.total">
      </el-pagination>
      <br>
    </cancer-widget>
  </div>
</template>
<script>
  import service from '@/views/recruitmentPoint/qualityControl/quality-service'
  import mixin from '@/mixins/mixins'
  import { AGENCYTB } from '@/views/recruitmentPoint/users/tablePropConfig'
  export default {
    name: 'quality-control',
    mixins: [ mixin ],
    data () {
      return {
        propsData: AGENCYTB,
        isShow:false,
        listTableData: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      async getListData(){
        const result = await this.requestTable({
          url:'/base/system/dept/queryDeptList',
          currentObj: this.listTableData,
          params: {}
        })
        this.listTableData = Object.assign({}, result)
        console.log(this.listTableData)
      },
      // 跳转表单  flag2
      watchForm(row) { 
         this.$router.push({
           path:'/user/agency/detail',
           query:{
             linkId: row.linkId
             }})
      },

      // 分页=>改变每页条数
      tableSizeChange(val) {
        this.listTableData.pageSize = val
        this.getListData()
      },

      // 分页=>改变当前页
      tablePageChange(val) {
        this.listTableData.pageNum = val
        this.getListData()
      }
    },
    created() {
      if(sessionStorage.getItem('deptmentType') == 'gljg' || sessionStorage.getItem('deptmentType') == 'gj' ){
        this.isShow = true
      }else{
        this.isShow = false
      }
      
      this.getListData()
      this.$store.dispatch('common/addUserList')
    }
  }
</script>
<style scoped lang="scss">
.title {
    display: inline-block;
    padding-left: 10px;
    // border-left: 2px solid #317ef7;
    color: #317ef7;
    height: 22px;
    line-height: 22px;
    font-size: 16px;
    position: relative;
}
.title:after {
    position: absolute;
    content: '';
    left: 0;
    top: 10%;
    width: 2px;
    height: 80%;
    background: #317ef7;
}
</style>