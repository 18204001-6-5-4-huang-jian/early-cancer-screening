/**
 * Created by sunwd on 2018/10/8.
 */
const BASE_URL = '/base'
const API = {
  // 表格查询
  SAMPLE_LIST: {
    url: BASE_URL + '/biological/find/biologicalList',
    method: 'post'
  },

  // 校验生物样本ID
  SAMPLE_ID: {
    url: BASE_URL + '/biological/get/hosBiologicalSample',
    method: 'post'
  },

  // 点击确定提交
  SUBMIT_DATA: {
    url: BASE_URL + '/biological/get/result',
    method: 'post'
  }
}
export default {
  methods: {
    // 查询表格数据
    async getListData () {
      let result = await this.requestTable({
        ...API.SAMPLE_LIST,
        currentObj: this.listTableData,
        params: Object.assign({}, this.formData)
      })
      this.listTableData = Object.assign({}, result)
    },

    // 校验生物样本ID
    async checkSampleIdData (val) {
      this.mainSampleId = val
      let {data: {status, result}} = await this.$axios_http({
        url: API.SAMPLE_ID.url + `/${val}`,
        method: 'post'
      })
      if (status === 'SUCCESS') {
        if (result.flag === 1) {
          // 跳转到录入
          this.sampleDialogVisible = true
          this.listName=result.name
        } else if (result.flag === 0) {
          // 显示身份证号
          this.isShowIdCard = 0
        }
      }
    },

    // 提交
    async submitData (val) {
      let {data: {status, result}} = await this.$axios_http({
        ...API.SUBMIT_DATA,
        data: Object.assign({}, {idCard: val, mainSampleId: this.mainSampleId})
      })

      if (status === 'SUCCESS') {
        this.sampleDialogVisible = true
        this.listName=result
      }
    }
  }
}