/**
 * Created by sunwd on 2018/10/1.
 */
const BASE_URL = '/base'
const API = {
  QUALITY_CONTROL_LIST: {
    url: BASE_URL + '/measurement/find/measurement/list',
    method: 'post'
  }
}
export default {
  methods: {
    // 获取表格数据
    async getListData () {
      const result = await this.requestTable({
        ...API.QUALITY_CONTROL_LIST,
        currentObj: this.listTableData,
        params: Object.assign({}, this.formData, {itemsUnderIt: 2,pageType :1})
      })
      this.listTableData = Object.assign({}, result)
    }
  }
}