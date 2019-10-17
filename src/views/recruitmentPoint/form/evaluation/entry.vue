<!--
 * @date 2019/3/1
 * @Description: 新建问卷入口
 * @params: itemsUnderIt 1 肺肠入组资格表 2 早诊入组资格表
-->
<template>
    <div v-if="show">
        <template v-if="evaluationShow">
            <evaluation-report></evaluation-report>
        </template>
        <template v-if="qualificationShow">
            <qualification></qualification>
        </template>
    </div>
</template>

<script>
    import EvaluationReport from './EvaluationReport'
    import Qualification from '@/views/ldctForm/qualification/Index'

    export default {
        name: "entry",
        data() {
            return {
                evaluationShow: false,
                qualificationShow: false,
                show: false
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                if(this.$route.query.itemsUnderIt) {
                    let type = this.$route.query.itemsUnderIt
                    if (type == '1') {
                        this.show = true
                        this.qualificationShow = true
                        this.evaluationShow = false
                    } else if (type == '2') {
                        this.show = true
                        this.qualificationShow = false
                        this.evaluationShow = true
                    }
                    return false
                }
                let itemsUnderIt = sessionStorage.getItem('itemsUnderIt')
                if (itemsUnderIt == '1') {
                    this.show = true
                    this.qualificationShow = true
                    this.evaluationShow = false
                } else if (itemsUnderIt == '2') {
                    this.show = true
                    this.qualificationShow = false
                    this.evaluationShow = true
                } else if (itemsUnderIt == '1,2' || itemsUnderIt == '2,1') {
                    this.$axios_http({
                        method: 'post',
                        url: "/base/fc/person/check/inGroupFlag",
                        vueObj: this
                    }).then(res => {
                        if (res.data.status == 'ERROR') {
                            return false
                        }
                        let data = res.data.result
                        if (data) {
                            this.qualificationShow = true
                            this.evaluationShow = false
                        } else {
                            this.qualificationShow = false
                            this.evaluationShow = true
                        }
                        this.show = true
                    })
                }
            }
        },
        components: {
            EvaluationReport,
            Qualification
        }
    }
</script>
