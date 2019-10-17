/**
 * Created by sunwd on 2018/10/2.
 */
const BASE_URL = '/base'
const API = {
  // 表单提交 （招募任务批量分配到个人）
  SUBMIT_DATA: {
    url: BASE_URL + '/hos/task/allocatingTaskToDeptsForGj',
    method: 'post'
  }
}
export default {
  methods: {
    // 提交表单
    async submitData () {
      let dataParams = []
      this.listTableData.list.map(item => {
        dataParams.push({
          dataId: item.id,
          taskNum: item.taskNum,
          taskType: this.formData.taskType,
          cancerType: item.cancerType,
          projectYear: item.projectYear,
          itemsUnderIt: item.itemsUnderIt,
        })
      })

      const {data: {status}} = await this.$axios_http({
        ...API.SUBMIT_DATA,
        data: Object.assign({}, {itemsUnderIt: this.$route.query.itemsUnderIt, hosEcsTaskPOList: dataParams})
      })
      if (status === 'SUCCESS') {
        this.jumpToPage('/gj/task/index')
        this.clearStorage()
      }
    }
  }
}