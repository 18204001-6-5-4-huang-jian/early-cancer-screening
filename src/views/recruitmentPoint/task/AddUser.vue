<template>
  <!--添加机构-->
  <div>
    <cancer-widget>
      <p class="cancer-title-blue">用户列表</p>
      <el-table
        :data="listTableData.list"
        border
        style="width: 100%"
        class="cancer-margin--b15"
        empty-text="暂无数据"
        @selection-change="handleSelectionChange">
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
          prop="deptName"
          label="机构">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column align="center" type="selection" width="80"></el-table-column>
      </el-table>
      <template slot="bottom-button">
        <el-button size="small" @click="confirmHandler">确定</el-button>
        <el-button size="small" @click="cancelHandler">取消</el-button>
      </template>
    </cancer-widget>
  </div>
</template>
<script>
  import mixin from '@/mixins/mixins'
  import service from '@/views/recruitmentPoint/task/add-user-service'
  import ls from '@/utils/storage'
  export default {
    name: 'add-user',
    mixins: [ mixin,service ],
    data () {
      return {
        multipleSelection: [],
        listTableData: {
          list: null
        }
      }
    },
    created () {
      this.getUserListData()
    },
    methods: {
      // 表格复选框
      handleSelectionChange (val) {
        this.multipleSelection = val
      },

      // 取消
      cancelHandler () {
        this.goBack()
      },

      // 确定
      confirmHandler () {
        if (!this.multipleSelection.length) {
          this.$failMsg(this, '至少选择一条数据！')
          return
        }

        let tableArray = []
        let ids = []
        this.multipleSelection.map(item => {
          item.userTaskNum = this.$route.query.utNum,
          item.taskType = this.$route.query.tType
          ids.push(item.id)
        })
        if (ls.getItem('userList')) {
          tableArray = [...this.multipleSelection, ...ls.getItem('userList')]
        } else {
          tableArray = this.multipleSelection
        }

        ls.setItem('userList', tableArray)

        this.$router.push({
          path: '/task/addtask',
          query: {
            taskId: this.$route.query.taskId,
            utNum: this.$route.query.utNum,
            tType: this.$route.query.tType,
            alloctIds: ids.join(',')
          }
        })
      }

    }
  }
</script>
<style scoped>

</style>
