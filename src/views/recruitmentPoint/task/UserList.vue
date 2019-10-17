<template>
  <div>
    <cancer-widget>
      <p class="cancer-title-blue">用户列表</p>
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
          label="任务类型">
          <template slot-scope="scope">
            {{scope.row.taskType | taskTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="用户名称">
        </el-table-column>
        <el-table-column
          prop="trueName"
          label="真实姓名">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="taskNum"
          label="用户任务数">
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
          prop="deptName"
          label="所属机构">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="modifyHandler(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template slot="bottom-button">
        <el-button size="small" @click="backHandler">返回</el-button>
      </template>
    </cancer-widget>

    <!--修改弹框-->
    <el-dialog
      title="确认修改任务数"
      :visible.sync="modifyDialogVisible"
      width="30%"
      @close="modifyDialogVisible = false">
      <p class="cancer-margin--b15">该用户原任务数：{{originalTaskNum}}</p>
      <p>确认任务数：
        <el-input
          v-model.trim="taskNum"
          style="width: 150px;"
          clearable
          size="small"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
      <el-row type="flex" justify="center">
        <el-button @click="confirmHandler" size="small" type="primary">确 定</el-button>
        <el-button @click="modifyDialogVisible = false" size="small">取 消</el-button>
      </el-row>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import mixin from '@/mixins/mixins'
  import service from '@/views/recruitmentPoint/task/user-list-service'
  import { taskTypeFilter } from '@/filters/filter'
  export default {
    name: 'user-list',
    mixins: [ mixin,service ],
    data() {
      return {
        modifyDialogVisible: false,
        taskNum: null,
        originalTaskNum: null,  //原任务数
        index: 0,
        listTableData: {
          list: []
        },
        finishNum:null
      }
    },
    created () {
      this.getListData()
    },
    methods: {
      // 修改
      modifyHandler (row) {
        this.originalTaskNum = row.taskNum
        this.index = row.taskId
        this.finishNum = row.finishNum
        this.modifyDialogVisible = true
      },
      // 确认
      confirmHandler () {
        if(this.taskNum < this.finishNum){
            this.$message({
              message: '确认任务数不能小于完成数量',
              type: 'error'
            });
            return false;
        }
        if(this.taskNum == 0){
            this.$message({
              message: '确认任务数不能为0',
              type: 'error'
            });
            return false;
        }
        this.modifyData()
        this.modifyDialogVisible = false
      },

      // 返回
      backHandler () {
        this.jumpToPage('/task/index')
      }
    }
  }
</script>
<style scoped>

</style>