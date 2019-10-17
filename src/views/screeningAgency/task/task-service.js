/**
 * Created by sunwd on 2018/10/8.
 */
const BASE_URL = '/base'
const API = {
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
        params: Object.assign({}, this.qc)
      })
      this.listTableData = Object.assign({}, result)
    }
  }
}
