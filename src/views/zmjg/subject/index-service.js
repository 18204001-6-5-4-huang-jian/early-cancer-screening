/**
 * Created by leicj on 2018/12/5.
 */
const BASE_URL = '/base'
const API = {
  // 招募机构受试者列表查询
  SUBJECT_LIST: {
    url: BASE_URL + '/person/find/person/list',
    method: 'post'
  },
}
export default {
  methods: {
    // 查询表格数据
    async getListData () {
      // 评估结果多选
      // if(this.qc.riskType && Object.prototype.toString.call(this.qc.riskType) == '[object Array]'){
      //     this.qc.riskType = this.qc.riskType.join(',');
      // }
      let result = await this.requestTable({
        ...API.SUBJECT_LIST,
        currentObj: this.listTableData,
        params: Object.assign({}, this.qc)
      })
      this.listTableData = Object.assign({}, result)
      localStorage.removeItem('searchParams');
    },

  }
}