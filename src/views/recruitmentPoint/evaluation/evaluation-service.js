/**
 * Created by sunwd on 2018/10/1.
 */
const BASE_URL = '/base'
const API = {
  // 查询表格数据
  EVALUATION_MANAGE: {
    url: BASE_URL + '/measurement/find/measurement/list',
    method: 'post',
    tag: 'evaluation-list'
  },
  GET_NUM: {
    url: BASE_URL + '/measurement/statistics/status/num',
    method: 'post'
  },
  // 表单 => 评估结果
  EVALUATE_RESULT: {
    url: BASE_URL + '/measurement/find/evaluate',
    method: 'post'
  },

  // 确认已通知
  CONFIRM_NOTICE: {
    url: BASE_URL + '/measurement/edit/evaluateStatus',
    method: 'post'
  },
  //查看路径
  GET_PATH:{
    url: BASE_URL + '/measurement/find/uploadPath',
    method: 'post'
  },
  //删除告知书文件
  DEL_PATH:{
    url: BASE_URL + '/file/delete/zqtys/img',
    method: 'post'
  },
}

export default {
  methods: {
    // 查询表格数据
    async getListData (obj = {}) {
      let result = await this.requestTable({
        ...API.EVALUATION_MANAGE,
        currentObj: this.listTableData,
        params: Object.assign({}, this.formData, obj)
      })
      this.listTableData = Object.assign({}, result)
      localStorage.removeItem('searchParams');
    },

    // 数量
    async getNumData () {
      // const {data: {status, result}} = await this.$axios_http({
      //   ...API.GET_NUM,
      //   data: Object.assign({}, this.formData, {pageNum: this.listTableData.pageNum, pageSize: this.listTableData.pageSize})
      // })
      // if (status === 'SUCCESS') {
      //   this.tabNum =  Object.assign({}, result)
      // }
    }, 

    async getEvaluationResultData (id) {
      const {data: {status, result}} = await this.$axios_http({
        url: API.EVALUATE_RESULT.url+`/${id}`,
        method: 'post'
      })
      if (status === 'SUCCESS') {
        this.evaluateResult = Object.assign({}, result)
      }
    },

    //告知书路径
    async getPathData (id) {
      const {data: {status, result}} = await this.$axios_http({
        ...API.GET_PATH,
        data: Object.assign({}, {surverId:id})
      })
      if (status === 'SUCCESS') {
        this.pathUrls = result
        this.activeImgParams.path = this.pathUrls[0];   //默认取第一个
        this.activeImgParams.surverId=id
        if(result.length > 1){
          this.deleteImgShow = false;
        }else{
          this.deleteImgShow = true;
        }
      }
    },

      //删除同意书文件
      async deleteImgHandler () {
        const {data: {status, result}} = await this.$axios_http({
          ...API.DEL_PATH,
          data: Object.assign({}, this.activeImgParams)
        })
        if (status === 'SUCCESS') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      },

  }
}