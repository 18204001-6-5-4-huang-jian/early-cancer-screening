<template>
  <!--任务分配-->
  <div>
    <!--基本信息-->
    <cancer-widget>
      <p class="cancer-title-blue">基本信息</p>
      <el-row class="cancer-margin--b15 base-info">
        <el-col :span="4">
          <span>任务年度：{{baseInfo.projectYear}}</span>
        </el-col>
        <el-col :span="4">
          <span>任务类型：{{baseInfo.taskType | taskTypeFilter}}</span>
        </el-col>
        <el-col :span="4">
          <span>所属项目：{{baseInfo.itemsUnderIt | itemsUnderItFilter}}</span>
        </el-col>
        <el-col :span="4">
          <span>未分配任务：{{baseInfo.taskLeaveNum}}</span>
        </el-col>
        <el-col :span="8">
          <p>
             机构任务数：
            <el-input v-model.trim="baseInfo.deptTaskNum"  clearable style="width:150px;" size="small"></el-input>
          </p>
        </el-col>
      </el-row>
    </cancer-widget>
    <!--用户列表-->
    <cancer-widget>
      <p class="cancer-title-blue" style="margin-top: -40px;">机构列表</p>
      <template slot="sub-button">
        <el-button type="primary" size="small" @click="addUserHandler">添加机构</el-button>
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
          prop="deptName"
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="deptType"
          label="机构类型">
        </el-table-column>
        <el-table-column
          prop="taskNum"
          label="机构任务数">
          <template slot-scope="scope">
            {{scope.row.taskNum || 0}}
          </template>
        </el-table-column>
        <el-table-column
          label="所属项目">
          <template slot-scope="scope">
            {{baseInfo.itemsUnderIt | itemsUnderItFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="癌种">
          <template slot-scope="scope">
            {{baseInfo.cancerType | cancerTypeFilter}}
          </template>
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
        <el-button size="small" @click="confirmHandler" :disabled="btndisabled">确定</el-button>
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
  import service from '@/views/gljg/task/add-task-service'
  import ls from '@/utils/storage'
  export default {
    name: 'gljg-add-task',
    mixins: [ mixin,service ],
    data () {
      return {
        baseInfo: {
          projectYear: null,
          taskType: null,
          itemsUnderIt:null,
          taskLeaveNum: null,
          deptTaskNum: null
        },
        listTableData: {
          list: []
        },
        modifyDialogVisible: false,
        deleteDialogVisible: false,
        originalTaskNum: null,  //原任务数
        taskNum: null,
        deleteData: null,
        alloctIds: [],
        btndisabled:false
      }
    },
    created () {
      if (ls.getItem('manageDeptList')) {
        this.listTableData.list = ls.getItem('manageDeptList')
      }
      this.getBaseInfoData()
    },
    methods: {
      // 删除
      deleteHandler (obj) {
        this.deleteDialogVisible = true
        this.deleteData = obj
      },

      // 确定删除
      deleteConfirmHandler () {
        this.deleteDialogVisible = false
        this.listTableData.list = this.listTableData.list.filter(item => item != this.deleteData)
        ls.setItem('manageDeptList', this.listTableData.list)
         if(this.listTableData.list.length == 0){
            ls.setItem('deptAlloctIds','')
          }
         let ids = [];
         this.listTableData.list.length && this.listTableData.list.filter((item)=>{
           ids.push(item.id)
         })
         this.$router.replace({
           path:'/gljg/task/addtask',
           query:{
              taskId: this.$route.query.taskId,
              utNum: this.$route.query.utNum,
              tType: this.$route.query.tType,
              alloctIds: ids.length > 0 ?ids.join(','):null
           }
         })
         
      },

      // 修改
      modifyHandler (row, index) {
        this.taskNum = null
        this.modifyDialogVisible = true
        this.originalTaskNum = row.taskNum || 0
        this.index = index
      },

      // 关闭弹框
      closeHandler () {
        this.modifyDialogVisible = false
      },

      // 确认弹框
      modifyConfirmHandler () {
        // 解决vue中数组中的元素赋值不会触发Vue的响应式更新
        this.listTableData.list[this.index].taskNum = this.taskNum
        this.listTableData.list.splice(this.index, 1, this.listTableData.list[this.index])
        this.modifyDialogVisible = false
      },

      // 确定
      confirmHandler () {
        if (!this.listTableData.list.length) {
          this.$failMsg(this, '用户列表不能为空！')
          return
        }
        this.btndisabled = true;
        this.submitData()
      },

      // 取消
      cancelHandler () {
        this.jumpToPage('/gljg/task/index')
        ls.removeItem('manageDeptList')
        ls.removeItem('deptAlloctIds')
      },

      // 添加用户
      addUserHandler () {
        if(this.baseInfo.deptTaskNum && !(/^[0-9]{1,}$/.test(this.baseInfo.deptTaskNum))) {
          this.$failMsg(this, '机构任务数必须为正整数！')
          return
        }
        if (ls.getItem('manageDeptList')) {
          if (ls.getItem('deptAlloctIds')){
            this.alloctIds = [...this.alloctIds,...ls.getItem('deptAlloctIds')]
          }

          if (this.$route.query.alloctIds) {
            this.$route.query.alloctIds.split(',').map(item => {
              this.alloctIds.push(Number(item))
            })
          }
          ls.setItem('deptAlloctIds', this.alloctIds)
        }
        this.$router.push({
          path: '/gljg/task/adduser',
          query: {
            taskId: this.$route.query.taskId,
            utNum: this.baseInfo.deptTaskNum
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
