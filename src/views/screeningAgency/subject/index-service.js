/**
 * Created by leicj on 2018/12/5.
 */
const BASE_URL = '/base'
const API = {
  // 招募机构受试者列表查询
  SUBJECT_LIST: {
    url: BASE_URL + '/zm/booking/bookedPerson',
    method: 'post'
  },
}
export default {
  methods: {
    // 查询表格数据
    async getListData () {
      let result = await this.requestTable({
        ...API.SUBJECT_LIST,
        currentObj: this.listTableData,
        params: Object.assign({}, this.qc,{deptSearch:this.qc.selectedOptions[this.qc.selectedOptions.length-1]})
      })
      this.listTableData = Object.assign({}, result)
      localStorage.removeItem('searchParams');
    },

  }
}