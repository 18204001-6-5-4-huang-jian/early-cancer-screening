<template>
    <div class="cancer-index" v-if="show">
        <!--工作待办事项-->
        <cancer-widget>
            <template slot="title">
         <span class="img-container">
              <p class="icon"></p>
          </span>
                <span class="span">工作待办事宜</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="linespan"></span>&nbsp;&nbsp;&nbsp;&nbsp;<router-link
                    :to="{path: '/evaluation/evaluationreport'}">
                <el-button class="start" type="primary" size="small">开始评估</el-button>
            </router-link>
            </template>
            <template v-if="statisticsData.hasOwnProperty('early')">
                <p class="sub-title">早诊早治-评估任务</p>
                <el-row class="cancer-margin--b15 cancer-margin--t15">
                    <el-col :span="3">
                        <el-badge :value="statisticsData.early.uncomplete" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '0'}}">评估任务未完成</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.early.pgCgx" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '1'}}">草稿箱</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.early.pgDsh" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '2'}}">评估待审核</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.early.pgShBtg" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '3'}}">审核未通过</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.early.pgDffGwtz" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '4'}}">待发放评估结果</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.early.pgDscZqtys" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '5'}}">待上传知情同意书</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.early.hpUnresult" class="cancer-item">
                            <router-link :to="{path: '/hp/index', query:{tFlag: '1'}}">Hp结果未录入</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.early.hbsagUnresult" class="cancer-item">
                            <router-link :to="{path: '/hbsag/index', query:{tFlag: '1'}}">HBsAg结果未录入</router-link>
                        </el-badge>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.early.yyBqx" class="cancer-item">
                            <router-link :to="{path: '/fit/index',query:{flag: '5'}}">FIT结果未录入</router-link>
                        </el-badge>
                    </el-col>
                </el-row>
            </template>
            <template v-if="statisticsData.hasOwnProperty('lung')">
                <p class="sub-title">肺肠筛查-评估任务</p>
                <el-row>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.lung.uncomplete" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '0'}}">评估任务未完成</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.lung.pgCgx" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '1'}}">草稿箱</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.lung.unPersonInfo" class="cancer-item">
                            <router-link :to="{path: '/zm/subject/index'}">待录入个人信息表</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.lung.unRiskInfo" class="cancer-item">
                            <router-link :to="{path: '/zm/subject/index'}">待录入危险因素表</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.lung.pgDffGwtz" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '4'}}">待发放评估结果</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.lung.pgDscZqtys" class="cancer-item">
                            <router-link :to="{path: '/evaluation/index', query:{tFlag: '5'}}">待上传知情同意书</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="statisticsData.lung.yyBqx" class="cancer-item">
                            <router-link :to="{path: '/fit/index',query:{flag: '5'}}">FIT结果未录入</router-link>
                        </el-badge>
                    </el-col>
                </el-row>
            </template>
            <p class="sub-title">预约任务</p>
            <el-row class="cancer-margin--b15 cancer-margin--t15">
                <el-col :span="3">
                    <el-badge :value="getValue('yyCj')" class="cancer-item">
                        <router-link to="/appointment/enteroscopy">结直肠镜预约</router-link>
                    </el-badge>
                </el-col>
                <el-col :span="3">
                    <el-badge :value="getValue('yyCt')" class="cancer-item">
                        <router-link to="/appointment/ct">低剂量CT预约</router-link>
                    </el-badge>
                </el-col>
                <template v-if="statisticsData.hasOwnProperty('early')">
                    <el-col :span="3">
                        <el-badge :value="getValue('yyCs')" class="cancer-item">
                            <router-link to="/appointment/ultrasonic">乳腺超声预约</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="getValue('yyXx')" class="cancer-item">
                            <router-link to="/appointment/xline">乳腺X线预约</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="getValue('yyG')" class="cancer-item">
                            <router-link to="/appointment/liver">肝癌三项预约</router-link>
                        </el-badge>
                    </el-col>
                    <el-col :span="3">
                        <el-badge :value="getValue('yyNj')" class="cancer-item">
                            <router-link to="/appointment/digestive">上消内镜预约</router-link>
                        </el-badge>
                    </el-col>
                </template>
            </el-row>
        </cancer-widget>

        <!--各环节数据概要-->
        <cancer-widget v-if="statisticsData.hasOwnProperty('early')">
            <template slot="title">
         <span class="img-container1">
              <p class="icon"></p>
          </span>
                <span class="span">早诊早治各环节数据概要</span>
            </template>
            <p class="line"></p>
            <div class="process">
                <ul class="list-top cancer-margin--b15">
                    <li></li>
                    <li>
                        <p>已录入问卷<span>{{statisticsData.early.pgYlu}}</span></p>
                        <p>已通过审核数目<span>{{statisticsData.early.pgShTg}}</span></p>
                    </li>
                    <li></li>
                    <li>
                        <p>已发放高危通知<span>{{statisticsData.early.pgYffGwtz}}</span></p>
                        <p>应发放高危通知<span>{{statisticsData.early.pgSffGwtz}}</span></p>
                    </li>
                    <li></li>
                    <li>
                        <p>已筛查<span>{{statisticsData.early.scYsc}}</span></p>
                        <p>应筛查<span>{{statisticsData.early.scSsc}}</span></p>
                    </li>
                </ul>
                <div class="image-box cancer-margin--t15"></div>
                <ul class="list-bottom">
                    <li>
                        <p>高危评估任务量<span>{{statisticsData.early.taskNum}}</span></p>
                    </li>
                    <li></li>
                    <li>
                        <p>已完成评估数<span>{{statisticsData.early.pgYwc}}</span></p>
                        <p>高危人数<span>{{statisticsData.early.pgGwRs}}</span></p>
                        <p>高危人次<span>{{statisticsData.early.pgGwRc}}</span></p>
                    </li>
                    <li></li>
                    <li>
                        <p>已预约筛查<span>{{statisticsData.early.yyYyuSc}}</span></p>
                        <p>未预约筛查<span>{{statisticsData.early.yyWyuSc}}</span></p>
                    </li>
                    <li></li>
                </ul>
            </div>
        </cancer-widget>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixins'

    export default {
        name: 'cancer-home',
        mixins: [mixin],
        data() {
            return {
                url: '/base/index/find/user/statistics',
                show: false,
                statisticsData: {
                    early: {
                        id: null,   // id
                        projectYear: null,	// 年度
                        userId: null,	// 用户id
                        deptId: null,	// 部门ID
                        pgYwc: null,	// 评估已完成
                        pgCgx: null,	// 评估草稿箱
                        uncomplete: null,	// 评估未完成
                        pgDsh: null,	// 评估待审核
                        pgShBtg: null,	// 评估审核不通过
                        pgDffGwtz: null,	// 评估待发放高危通知
                        pgYlu: null,	// 问卷已录入
                        pgShTg: null,	// 评估通过审核数
                        pgGwRs: null,	// 评估高危人数
                        pgGwRc: null,	// 评估高危人次
                        pgYffGwtz: null,	// 已发放高危通知
                        pgSffGwtz: null,	// 应发放高危通知
                        yyYyuSc: null,	// 已预约筛查
                        yyWyuSc: null,	// 未预约筛查
                        scYsc: null,	// 已筛查
                        scSsc: null,	// 应筛查
                        yyCt: null,	// ct未预约数量
                        yyCs: null,	// 预约超声
                        yyXx: null,	// 预约x线
                        yyG: null,	// 预约肝癌
                        yyNj: null,	// 预约内镜
                        yyCj: null,	// 预约肠镜
                        yyBqx: null,	// 预约便潜血
                        taskNum: null  	// 任务总量
                    },
                    lung: {
                        id: null,   // id
                        projectYear: null,	// 年度
                        userId: null,	// 用户id
                        deptId: null,	// 部门ID
                        pgYwc: null,	// 评估已完成
                        pgCgx: null,	// 评估草稿箱
                        uncomplete: null,	// 评估未完成
                        pgDsh: null,	// 评估待审核
                        pgShBtg: null,	// 评估审核不通过
                        pgDffGwtz: null,	// 评估待发放高危通知
                        pgYlu: null,	// 问卷已录入
                        pgShTg: null,	// 评估通过审核数
                        pgGwRs: null,	// 评估高危人数
                        pgGwRc: null,	// 评估高危人次
                        pgYffGwtz: null,	// 已发放高危通知
                        pgSffGwtz: null,	// 应发放高危通知
                        yyYyuSc: null,	// 已预约筛查
                        yyWyuSc: null,	// 未预约筛查
                        scYsc: null,	// 已筛查
                        scSsc: null,	// 应筛查
                        yyCt: null,	// ct未预约数量
                        yyCs: null,	// 预约超声
                        yyXx: null,	// 预约x线
                        yyG: null,	// 预约肝癌
                        yyNj: null,	// 预约内镜
                        yyCj: null,	// 预约肠镜
                        yyBqx: null,	// 预约便潜血
                        taskNum: null  	// 任务总量
                    }
                }
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getValue(value) {
                let count = 0
                if (this.statisticsData.hasOwnProperty('early')) {
                    count += this.statisticsData.early[value]
                }
                if (this.statisticsData.hasOwnProperty('lung')) {
                    count += this.statisticsData.lung[value]
                }

                return count
            },
            async getData() {
                const {data: {status, result}} = await this.$axios_http({
                    url: this.url,
                    method: 'post'
                })
                if (status === 'SUCCESS') {
                    this.statisticsData = Object.assign({}, result)
                }
                this.show = true
            }
        }
    }
</script>
<style scoped lang="scss">
    .cancer-index {
        .cancer-wrap__title {
            vertical-align: middle;
        }
        .img-container {
            display: inline-block;
            width: 80px;
            height: 80px;
            line-height: 80px;
            border-radius: 5px;
            vertical-align: middle;
            overflow: hidden;
            .icon {
                width: 40px;
                height: 40px;
                display: inline-block;
                vertical-align: middle;
                margin: 0 20px;
                background: url('../../assets/img/work.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .img-container1 {
            display: inline-block;
            width: 80px;
            height: 80px;
            line-height: 80px;
            border-radius: 5px;
            vertical-align: middle;
            overflow: hidden;
            .icon {
                width: 40px;
                height: 40px;
                display: inline-block;
                vertical-align: middle;
                margin: 0 20px;
                background: url('../../assets/img/data.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .cancer-wrap-box:hover .img-container, .cancer-wrap-box:hover .img-container1 {
            background: #3989F8;
        }
        .cancer-wrap-box:hover .img-container .icon {
            background: url('../../assets/img/work_active.png') no-repeat;
            background-size: 100% 100%;
        }
        .cancer-wrap-box:hover .img-container1 .icon {
            background: url('../../assets/img/data_active.png') no-repeat;
            background-size: 100% 100%;
        }
        .span {
            font-family: PingFang-SC-Heavy;
            font-size: 18px;
            color: #333333;
            letter-spacing: 0;
            margin-left: 5px;
            vertical-align: middle;
            padding-left: 20px;
        }
        .sub-title {
            font-family: MicrosoftYaHei;
            font-size: 16px;
            color: #3989F8;
            letter-spacing: 0;
            color: #3989F8;
            border-top: 1px solid #E9EDF0;
            border-bottom: 1px solid #E9EDF0;
            padding: 10px 0 10px 20px;
            box-sizing: border-box;
            margin: 20px 0;
        }
        .cancer-item {
            width: 85%;
            // height: 75px;
            height: 101px;
            background: #F9FAFC;
            text-align: center;
            a {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                font-family: PingFang-SC-Heavy;
                font-size: 16px;
                color: #7E7E7E;
                letter-spacing: 0;
            }
            &:hover {
                cursor: pointer;
                background: #ffffff;
                cursor: pointer;
                box-shadow: 0 0 4px 2px rgba(241, 241, 241, 0.50);
            }
        }
        .line {
            width: 100%;
            height: 1px;
            background: #E9EDF0;
            margin-top: 10px;
        }
        .image-box {
            background-image: url("../../assets/img/home.png");
            background-repeat: no-repeat;
            background-size: contain;
            // width: 900px;
            width: 1000px;
            height: 140px;
            margin: 0 auto;
        }
        .process {
            width: 100%;
            box-sizing: border-box;
            padding: 20px 10%;
            font-size: 14px;
            color: #666;
            span {
                color: red;
            }
            ul {
                display: flex;
                // width: 900px;
                width: 1000px;
                margin: 8px auto;
                li {
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #666666;
                    letter-spacing: 0;
                    flex: 1;
                    text-align: center;
                }
            }
        }
    }

    .start {
        color: #3989F8;
        background: rgba(64, 158, 255, .1);
        border: 1px solid rgba(64, 158, 255, .2);
        &:hover {
            background: #3989F8;
            color: #ffffff;
        }
    }

    .linespan {
        display: inline-block;
        width: 1px;
        height: 20px;
        vertical-align: middle;
        background: #E9EDF0;
    }
</style>
