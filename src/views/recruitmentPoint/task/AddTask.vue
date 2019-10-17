<template>
  <!--任务分配-->
  <div>
    <!--基本信息-->
    <cancer-widget>
      <p class="cancer-title-blue">基本信息</p>
      <el-row class="cancer-margin--b15 base-info">
        <el-col :span="5">
          <span>任务年度：{{baseInfo.projectYear}}</span>
        </el-col>
        <el-col :span="5">
          <span>任务类型：{{baseInfo.taskType | taskTypeFilter}}</span>
        </el-col>
        <el-col :span="5">
          <span>未分配任务：{{baseInfo.taskLeaveNum}}</span>
        </el-col>
        <el-col :span="9">
          <p>
            用户任务数：
            <el-input v-model.trim="baseInfo.userTaskNum"  clearable style="width:150px;" size="small"></el-input>
          </p>
        </el-col>
      </el-row>
    </cancer-widget>
    <!--用户列表-->
    <cancer-widget>
      <p class="cancer-title-blue" style="margin-top: -40px;">用户列表</p>
      <template slot="sub-button">
        <el-button type="primary" size="small" @click="addUserHandler">添加用户</el-button>
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
          label="任务类型">
          <template slot-scope="scope">
            {{scope.row.taskType | taskTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column
          prop="userTaskNum"
          label="用户任务数">
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
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="modifyHandler(scope.row, scope.$index)">修改</el-button>
            <el-button size="small" type="text" @click="deleteHandler(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template slot="bottom-button">
        <el-button size="small" @click="confirmHandler">确定</el-button>
        <el-button size="small" @click="cancelHandler">取消</el-button>
      </template>
    </cancer-widget>

    <!--修改弹框-->
    <el-dialog
      title="确认修改任务数"
      :visible.sync="modifyDialogVisible"
      width="30%"
      @close="closeHandler">
      <p class="cancer-margin--b15">该用户原任务数：{{originalTaskNum}}</p>
      <p>请确认任务数：
        <el-input
          v-model.trim="taskNum"
          style="width: 150px;"
          clearable
          size="small"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
      <el-row type="flex" justify="center">
        <el-button @click="modifyConfirmHandler" size="small" type="primary">确 定</el-button>
        <el-button @click="modifyDialogVisible = false" size="small">取 消</el-button>
      </el-row>
  </span>
    </el-dialog>

    <!--确认删除弹框-->
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%"
      @close="closeHandler">
      <span>是否确定删除？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteConfirmHandler">确定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import mixin from '@/mixins/mixins'
  import service from '@/views/recruitmentPoint/task/add-task-service'
  import ls from '@/utils/storage'
  import { taskTypeFilter } from '@/filters/filter'
  export default {
    name: 'add-task',
    mixins: [ mixin,service ],
    data () {
      return {
        baseInfo: {
          projectYear: null,
          taskType: null,
          taskLeaveNum: null,
          userTaskNum: null
        },
        listTableData: {
          list: []
        },
        modifyDialogVisible: false,
        deleteDialogVisible: false,
        originalTaskNum: null,  //原任务数
        taskNum: null,
        deleteData: null,
        alloctIds: []
      }
    },
    created () {
      if (ls.getItem('userList')) {
        this.listTableData.list = ls.getItem('userList')
      }
      if(this.$route.query.taskId){
        this.getBaseInfoData()
      }
    },
    methods: {
      // 删除
      deleteHandler (obj, index) {
        this.deleteDialogVisible = true
        this.deleteData = obj
      },

      // 确定删除
      deleteConfirmHandler () {
        this.deleteDialogVisible = false
        this.listTableData.list = this.listTableData.list.filter(item => item != this.deleteData)
        ls.setItem('userList',this.listTableData.list);
         if(this.listTableData.list.length == 0){
           ls.setItem('alloctIds','')
         }
        let ids = [];
        this.listTableData.list.length && this.listTableData.list.filter((item)=>{
          ids.push(item.id)
        })
        this.$router.replace({
          path:'/task/addtask',
          query:{
            taskId:this.$route.query.taskId,
            tType:this.$route.query.tType,
            utNum: this.$route.query.utNum,
            alloctIds:ids.length > 0?ids.join(','):null
            }
        })
      },

      // 修改
      modifyHandler (row, index) {
        this.modifyDialogVisible = true
        this.originalTaskNum = row.userTaskNum
        this.index = index
      },

      // 关闭弹框
      closeHandler () {
        this.modifyDialogVisible = false
      },

      // 确认弹框
      modifyConfirmHandler () {
        // 解决vue中数组中的元素赋值不会触发Vue的响应式更新
        this.listTableData.list[this.index].userTaskNum = this.taskNum
        this.listTableData.list.splice(this.index, 1, this.listTableData.list[this.index])
        this.modifyDialogVisible = false
      },

      // 确定
      confirmHandler () {
        if (!this.listTableData.list.length) {
          this.$failMsg(this, '用户列表不能为空！')
          return
        }
        this.submitData()
      },

      // 取消
      cancelHandler () {
        this.jumpToPage('/task/index')
        ls.removeItem('userList')
        ls.removeItem('alloctIds')
      },

      // 添加用户
      addUserHandler () {
        if (ls.getItem('userList')) {
          if (ls.getItem('alloctIds')){
            this.alloctIds = [...this.alloctIds,...ls.getItem('alloctIds')]
          }

          if (this.$route.query.alloctIds) {
            this.$route.query.alloctIds.split(',').map(item => {
              this.alloctIds.push(Number(item))
            })
          }
          ls.setItem('alloctIds', this.alloctIds)
        }
        this.$router.push({
          path: '/task/adduser',
          query: {
            taskId: this.$route.query.taskId,
            utNum: this.baseInfo.userTaskNum,
            tType: this.baseInfo.taskType
          }
        })
      }
    }
  }
</script>
<style scoped>
  .base-info {
    padding-left: 20px;
    color: #444;
  }
</style>
