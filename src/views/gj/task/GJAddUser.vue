<template>
  <!--添加机构-->
  <div>
    <cancer-widget>
      <p class="cancer-title-blue">机构列表</p>
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
          prop="deptName"
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="deptType"
          label="机构类型">
        </el-table-column>
        <el-table-column
          prop="deptAddress"
          label="地址">
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
  import service from '@/views/gj/task/add-user-service'
  import ls from '@/utils/storage'
  export default {
    name: 'gj-add-user',
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
        } else if (this.multipleSelection.length > 1) {
          this.$failMsg(this, '只能选择一条数据！')
          return
        }
        let tableArray = []
        let selections = []
        let taskType = this.$route.query.taskType

        if (taskType === 'zmrw') {
          this.multipleSelection.map(item => {
            item.taskNum = this.$route.query.utNum,
            item.projectYear = this.$route.query.projectYear,
            item.itemsUnderIt = this.$route.query.itemsUnderIt,
            item.taskType = '--'
          })
          if (ls.getItem('deptList')) {
            tableArray = this.multipleSelection.concat(ls.getItem('deptList'))
          } else {
            tableArray = this.multipleSelection
          }
        } else if (taskType === 'scrw') {
          this.multipleSelection.map(i => {
            i.projectYear = this.$route.query.projectYear
            ls.getItem('cancerId').map((item) => {
              selections.push({
                taskType: ls.getItem('cancerArray')[item].name,
                cancerType: ls.getItem('cancerArray')[item].key,
                deptName: i.deptName,
                deptType: i.deptType,
                projectYear: i.projectYear,
                taskNum: ls.getItem('cancerArray')[item].num,
                itemsUnderIt: ls.getItem('cancerItemsUnderItId'),
                id: i.id,
              })
            })
          })
          if (ls.getItem('deptList')) {
            tableArray = [...selections,...ls.getItem('deptList')]
          } else {
            tableArray = selections
          }
        }
        ls.setItem('deptList', tableArray)

        this.$router.push({
          path: '/gj/task/addtask',
          query: {
            projectYear: this.$route.query.projectYear,
            taskType: this.$route.query.taskType,
            utNum: this.$route.query.utNum,
            cancerType: this.$route.query.cancerType,
            itemsUnderIt: this.$route.query.itemsUnderIt,
            alloctId: this.multipleSelection[0].id
          }
        })
      }

    }
  }
</script>
<style scoped>

</style>
