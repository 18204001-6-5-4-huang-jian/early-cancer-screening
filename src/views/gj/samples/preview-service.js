/**
 * Created by sunwd on 2018/10/15.
 */
const BASE_URL = '/base'
const API = {
    // 表格查询
    DETAIL_LIST: {
        url: BASE_URL + '/biological/get/biologicalSampleInfo',
        method: 'post'
    }
}
export default {
    methods: {
        // 查看详情
        async sampleDetailData(val, fun) {
            let {data: {status, result}} = await this.$axios_http({
                url: API.DETAIL_LIST.url + `/${val}`,
                method: 'post'
            })
            if (status === 'SUCCESS') {
                this.detailList = [...result]
                fun()
            }
        }
    }
}
