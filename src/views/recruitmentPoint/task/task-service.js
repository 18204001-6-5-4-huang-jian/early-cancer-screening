/**
 * Created by sunwd on 2018/10/2.
 */
const BASE_URL = '/base'
const API = {
  // 获取当前部门的招募任务
  TASK_LIST: {
    url: BASE_URL + '/hos/task/findTasksByTypeAndDeptId',
    method: 'post'
  }
}
export default {
  methods: {
    // 获取表格数据
    async getListData () {
      const result = await this.requestTable({
        ...API.TASK_LIST,
        currentObj: this.listTableData,
        params: Object.assign({}, {taskType: 'zmrw'})
      })
      this.listTableData = Object.assign({}, result)
    }
  }
}