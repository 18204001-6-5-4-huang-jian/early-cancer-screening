const API = {
  // 查询受试者基本信息
  USER_LIST: {
    url: '/base/re/booking/qurey/getPersonDetails',
    method: 'post',
  }
}
export default {
  methods: {
    // 获取受试者基本信息
    // 20190621更新，添加参数allReportFlag，默认为null，传true就查询该人的全部报告是否生成
    async getPersonDetailFun (id, surverId, allReportFlag=null) {
      const {data: {status, result}} = await this.$axios_http({
        ...API.USER_LIST,
        data: {
           personId:id,
           surverId: surverId,
           allReportFlag: allReportFlag
          }
      })
      if (status === 'SUCCESS') {
        this.personDetail = result
      }
    }
  }
}