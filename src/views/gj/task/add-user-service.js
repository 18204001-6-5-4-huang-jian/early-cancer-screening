/**
 * Created by sunwd on 2018/10/2.
 */
import ls from '@/utils/storage'
const BASE_URL = '/base'
const API = {
  // 查询某任务未分配招募任务
  DEPT_LIST: {
    url: BASE_URL + '/hos/task/findUnAllocatingTaskDepts',
    method: 'post'
  }
}
export default {
  methods: {
    // 获取列表
    async getUserListData () {
      const {data: {status, result}} = await this.$axios_http({
        ...API.DEPT_LIST,
        data: Object.assign({}, {
          projectYear: this.$route.query.projectYear,
          taskType: this.$route.query.taskType,
          cancerTypes: ls.getItem('cancerTypes'),
          // itemsUnderIt: sessionStorage.getItem('itemsUnderIt'),
          itemsUnderIt:this.$route.query.itemsUnderIt,
          alloctIds: [...new Set(ls.getItem('alloctIds'))]
        })
      })
      if (status === 'SUCCESS') {
        this.listTableData.list = [...result]
      }
    }
  }
}