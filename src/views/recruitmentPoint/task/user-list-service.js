/**
 * Created by sunwd on 2018/10/2.
 */

const BASE_URL = '/base'
const API = {
  // 列表数据 （获取招募任务下已分配人员）
  TASK_LIST: {
    url: BASE_URL + '/hos/task/findAllocatingTaskUsers',
    method: 'post'
  },

  // 修改
  MODIFY_DATA: {
    url: BASE_URL + '/hos/task/updateUserTaskNumById',
    method: 'post'
  }
}
export default {
  methods: {
    // 获取表格数据
    async getListData () {
      const {data: {status, result}} = await this.$axios_http({
        ...API.TASK_LIST,
        data: { taskId: this.$route.query.taskId }
      })
      if (status === 'SUCCESS') {
        this.listTableData.list = [...result]
      }
    },

    // 修改
    async modifyData () {
      const {data: {status}} = await this.$axios_http({
        ...API.MODIFY_DATA,
        data: { id: this.index, taskNum: this.taskNum}
      })
      if (status === 'SUCCESS') {
        this.getListData()
      }

    }
  }
}