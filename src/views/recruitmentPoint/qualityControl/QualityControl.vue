<!--
*操作按钮说明：未审核的数据，操作按钮为“审核”，审核通过+审核未通过的数据，操作按钮为“查看详情”。20190813的需求更改
-->
<template>
  <!--质控-->
  <div>
    <!--查询表单-->
    <search-com :labelWidth="'100px'" :searchData="searchData" :formData="formData" ref="searchQuality"
                    @searchChange="searchHandler"></search-com>

    <!--表格-->
    <cancer-widget>
      <table-com :propsData="propsData" :tableData="listTableData.list">
        <template slot="operating">
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="watchForm(scope.row)" v-if="scope.row.checkStatus==1">审核</el-button>
              <el-button size="small" type="text" @click="watchForm(scope.row)" v-else>查看问卷</el-button>
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
  import {mapState} from 'vuex'
  import { QUALITYCONTROL } from '@/views/recruitmentPoint/qualityControl/searchConfig'
  import { QUALITYCONTROLTB } from '@/views/recruitmentPoint/qualityControl/tablePropConfig'
  export default {
    name: 'quality-control',
    mixins: [ mixin, service],
    data () {
      return {
        propsData: QUALITYCONTROLTB,
        searchData: QUALITYCONTROL,
        formData: {},
        listTableData: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    computed: {
      ...mapState('common', ['addUserList'])
    },
    methods: {
      // 跳转表单  flag2
      watchForm(row) { 
         this.$router.push({
           path:'/form/evaluationlook',
           query:{
             id: row.id,
             surverId:row.surverId,
             checkStatus:row.checkStatus,
             flag:2
             }})
      },
      //搜索
      searchHandler(val) {
        this.formData = val
        this.getListData()
      },

      // 分页=>改变每页条数
      tableSizeChange(val) {
        this.formData = this.getFormData('searchQuality');
        this.listTableData.pageSize = val
        this.getListData()
      },

      // 分页=>改变当前页
      tablePageChange(val) {
        this.formData = this.getFormData('searchQuality');
        this.listTableData.pageNum = val
        this.getListData()
      }
    },
    created() {
      this.getListData()
      this.$store.dispatch('common/addUserList')
    }
  }
</script>