<template>
  <!--任务分配-->
  <div>
    <cancer-widget>
      <el-form :model="formData" :inline="true">
        <el-form-item label="筛查年度：">
          <el-select
            v-model="formData.projectYear"
            size="small"
            clearable
            placeholder="请选择">
            <el-option
              v-for="item in projectYear"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务类型：">
          <el-select
            v-model="formData.taskType"
            size="small"
            clearable
            placeholder="请选择">
            <el-option
              v-for="item in taskType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属项目：">
          <el-select
            v-model="formData.itemsUnderIt"
            size="small"
            clearable
            placeholder="请选择">
            <el-option
              v-for="item in itemsUnderIt"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="癌种：">
          <el-select
            v-model="formData.cancerType"
            size="small"
            clearable
            placeholder="请选择">
            <el-option
              v-for="item in riskTypeUnderLDCTNew"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构名称：">
          <el-input v-model.trim="formData.searchDeptName" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getListData">搜索</el-button>
        </el-form-item>
      </el-form>
    </cancer-widget>
    <cancer-widget>
      <p class="cancer-title-blue">任务列表</p>
      <template slot="sub-button">
      </template>
      <el-table
        :data="listTableData.list"
        border
        style="width: 100%"
        class="cancer-margin--b15"
        empty-text="暂无数据">
        <el-table-column
          label="序号"
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          prop="projectYear"
          label="筛查年度">
        </el-table-column>
        <el-table-column
          prop="taskType"
          label="任务类型">
          <template slot-scope="scope">
            {{scope.row.taskType | taskTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="机构名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deptType"
          label="机构类型">
          <template slot-scope="scope">
            {{scope.row.deptType}}
          </template>
        </el-table-column>
        <el-table-column
          prop="itemsUnderIt"
          label="所属项目">
          <template slot-scope="scope">
            {{scope.row.itemsUnderIt | itemsUnderItFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="癌种">
          <template slot-scope="scope">
            {{scope.row.cancerType | cancerTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column
          prop="taskNum"
          label="任务数量">
        </el-table-column>
        <el-table-column
          prop="taskLeaveNum"
          label="未分配任务数">
        </el-table-column>
        <el-table-column
          prop="finishNum"
          label="完成数量">
        </el-table-column>
        <el-table-column
          label="剩余数量">
          <template slot-scope="scope">
            {{scope.row.taskNum - scope.row.finishNum}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="addHandler(scope.row)">添加</el-button>
            <el-button size="small" type="text" @click="previewHanlder(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  import service from '@/views/gljg/task/task-service'
  import mixin from '@/mixins/mixins'
  import ls from '@/utils/storage'
   import DICTIONARY from '@/views/common/dictionary.js'
  export default {
    name: 'gljg-task-index',
    mixins: [ mixin, service ],
    data () {
      return {
        taskType: DICTIONARY.taskType,
        riskTypeUnderLDCTNew: DICTIONARY.types,
        projectYear: DICTIONARY.projectYear,
        itemsUnderIt: DICTIONARY.itemsUnderIt,
        formData:{
          projectYear: null,
          taskType: null,
          cancerType: null,
          searchDeptName:null,
          itemsUnderIt: null
        },
        listTableData: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    created () {
      this.getListData()
    },
    methods: {
      // 分页=>改变每页条数
      tableSizeChange(val) {
        this.listTableData.pageSize = val
        this.getListData()
      },

      // 分页=>改变当前页
      tablePageChange(val) {
        this.listTableData.pageNum = val
        this.getListData()
      },

      // 添加
      addHandler (row) {
        this.jumpCommon(row, '/gljg/task/addtask')
        ls.removeItem('manageDeptList')
        ls.removeItem('deptAlloctIds')
      },

      // 查看
      previewHanlder (row) {
        this.jumpCommon(row, '/gljg/task/userlist')
      },

      // 跳转
      jumpCommon (row, path) {
        this.$router.push({
          path: path,
          query: {
            taskId: row.id
          }
        })
      }
    }
  }
</script>
<style scoped>

</style>
