const API = {
  // 查询数据字典
  USER_LIST: {
    url: '/base/system/baseDataType/getBaseDataList',
    method: 'post',
  }
}
export default {
  methods: {
    // 获取筛查项目
    async getBaseDataListJcxm () {
      const {data: {status, result}} = await this.$axios_http({
        ...API.USER_LIST,
        data: {
          "typeCode":'jcxm'
          }
      })
      if (status === 'SUCCESS') {
        this.baseDataJcxm = [...result.baseData]
      }
    },
     // 获取癌种
     async getBaseDataListAz () {
      const {data: {status, result}} = await this.$axios_http({
        ...API.USER_LIST,
        data: {
          "typeCode":'az'
          }
      })
      if (status === 'SUCCESS') {
        let arr =[]
        result.baseData.filter(item => {
          if(item.dataName!='facha' && item.dataName!='fachb' && item.dataName!='fachc' ){
            arr.push(item)
          }
        })
        this.baseDataAz = arr
      }
    }
  }
}