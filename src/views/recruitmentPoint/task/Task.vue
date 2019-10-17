<template>
  <!--任务分配-->
  <div>
    <cancer-widget>
      <p class="cancer-title-blue">任务列表</p>
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
          label="名称">
        </el-table-column>
        <el-table-column
          prop="taskNum"
          label="总任务">
        </el-table-column>
        <el-table-column
          prop="taskLeaveNum"
          label="未分配任务">
        </el-table-column>
        <el-table-column
          label="癌种">
          <template slot-scope="scope">
            {{scope.row.cancerType | cancerTypeFilter}}
          </template>
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
          label="操作">
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
  import service from '@/views/recruitmentPoint/task/task-service'
  import mixin from '@/mixins/mixins'
  import ls from '@/utils/storage'
  export default {
    name: 'task-index',
    mixins: [ mixin, service ],
    data () {
      return {
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
        this.jumpCommon(row, '/task/addtask')
        ls.removeItem('userList')
        ls.removeItem('alloctIds')
      },

      // 查看
      previewHanlder (row) {
        this.jumpCommon(row, '/task/userlist')
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
