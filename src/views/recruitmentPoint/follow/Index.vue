<template>
  <!--质控-->
  <div>
    <!--查询表单-->
    <search-com :labelWidth="'100px'" :searchData="searchData" :formData="formData" ref="searchFollow"
                    @searchChange="searchHandler"></search-com>

    <!--表格-->
    <cancer-widget>
      <table-com :propsData="propsData" :tableData="listTableData.list">
        <template slot="operating">
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text">查看</el-button>
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
  import mixin from '@/mixins/mixins'
  import { FOLLOW } from '@/views/recruitmentPoint/follow/searchConfig'
  import { FOLLOWTB } from '@/views/recruitmentPoint/follow/tablePropConfig'
  export default {
    name: 'quality-control',
    mixins: [ mixin ],
    data () {
      return {
        propsData: FOLLOWTB,
        searchData: FOLLOW,
        formData: {},
        listTableData: {
          pageNum: 1,
          pageSize: 10,
          list:[],
          total:0
        }
      }
    },
    methods: {
      //搜索
      searchHandler(val) {
        this.formData = val
      },

      // 分页=>改变每页条数
      tableSizeChange(val) {
        this.formData = this.getFormData('searchFollow');
        this.listTableData.pageSize = val
      },

      // 分页=>改变当前页
      tablePageChange(val) {
        this.formData = this.getFormData('searchFollow');
        this.listTableData.pageNum = val
      }
    }
  }
</script>