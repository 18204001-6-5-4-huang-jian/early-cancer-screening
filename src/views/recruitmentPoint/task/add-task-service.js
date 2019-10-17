/**
 * Created by sunwd on 2018/10/2.
 */
import ls from "@/utils/storage";

const BASE_URL = '/base'
const API = {
  // 基本信息 （获取单个任务详情）
  BASE_LIST: {
    url: BASE_URL + '/hos/task/findTasksInfoById',
    method: 'post'
  },

  // 表单提交 （招募任务批量分配到个人）
  SUBMIT_DATA: {
    url: BASE_URL + '/hos/task/allocatingTaskToUsers',
    method: 'post'
  }
}
export default {
  methods: {
    // 获取基本信息
    async getBaseInfoData () {
      const {data: {status, result}} = await this.$axios_http({
        ...API.BASE_LIST,
        data: Object.assign({}, {id: this.$route.query.taskId})
      })
      if (status === 'SUCCESS') {
        this.baseInfo = Object.assign({}, result)
      }
    },

    // 提交表单
    async submitData () {
      let dataParams = []
      this.listTableData.list.map(item => {
        dataParams.push({
          dataId: item.id,
          dataType: 2,
          taskNum: item.userTaskNum,
          taskType: 'zmrw'
        })
      })
      const {data: {status}} = await this.$axios_http({
        ...API.SUBMIT_DATA,
        data: Object.assign({}, {taskId: this.$route.query.taskId, hosEcsTaskPOList: dataParams})
      })
      if (status === 'SUCCESS') {
        this.$router.push({
          path: '/task/userlist',
          query: {
            taskId: this.$route.query.taskId
          }
        })
        ls.removeItem('userList')
        ls.removeItem('alloctIds')
      }
    }
  }
}