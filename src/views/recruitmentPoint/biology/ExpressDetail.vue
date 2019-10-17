<template>
    <cancer-widget>
        <div class="top">
            <el-row>
                <div class="courierNo">
                    运单号：{{$route.query.courierNo}}
                </div>
            </el-row>
            <el-row>
                <div class="courierNo">
                    冷冻盒数量：{{$route.query.boxNum}}
                </div>
            </el-row>
            <div class="btns fr">
                <el-button type="default" size="small" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="boxCode"
                    label="冷冻盒编号">
            </el-table-column>
            <el-table-column
                    label="装载情况">
                <template slot-scope="scope">
                    <span><span>{{scope.row.loadingStatus}}</span>/ <span v-text="getTotal(scope.row.boxType)"></span> </span>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    fixed="right"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="queryBoxLocation(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 查看冷冻盒位置 -->
        <el-dialog
                title="冷冻盒详情"
                :visible.sync="previewDialogVisible"
                :before-close="handleClose"
                width="700px">
            <el-row class="cancer-margin--b15 wrap-bottom">
                <p style="text-align: center;" class="title-style">冷冻盒编号：{{boxCode}}</p>
                <el-col :span="24">
                    <frozen-box ref="previewFrozen" v-if="preType>=0" :usedData="usedData"
                                :preType="preType"></frozen-box>
                </el-col>
            </el-row>
        </el-dialog>
    </cancer-widget>

</template>
<script>
    import FrozenBox from '@/views/common/frozenBox'

    export default {
        data() {
            return {
                previewDialogVisible: false,
                tableData: [],
                boxCode: null,
                usedData: [],
                preType: -1
            }
        },
        created() {
        },
        mounted() {
            this.query();
        },
        methods: {
            getTotal(val) {
                if (val === 1) {
                    return 100
                } else if (val === 2) {
                    return 48
                } else if (val === 3) {
                    return 16
                } else {
                    return ''
                }
            },
            query() {
                this.$axios_http({
                    url: "/base/biological/get/hosBiologicalBoxList/" + this.$route.query.courierNo,
                    data: {},
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        this.tableData = res.data.result;
                    }
                })
            },
            // 查看
            queryBoxLocation(row) {
                this.previewDialogVisible = true;
                this.boxCode = row.boxCode;
                this.$axios_http({
                    url: "/base/biological/get/hosBoxLocationList/" + row.boxCode,
                    data: {},
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        // 先清空
                        this.usedData = this.getData(res.data.result)
                        this.preType = row.boxType - 1
                    }
                })
            },
            getData(locations) {
                let list = []
                locations && locations.map((item) => {
                    if (item.locationValue) {
                        list.push(item.locationValue)
                    }
                })
                return list
            },
            handleClose() {
                this.previewDialogVisible = false
                this.usedData = []
            }
        },
        components: {
            FrozenBox
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .top {
        position: relative;
        .el-row {
            margin-bottom: 15px;
        }
    }

    .btns {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .sample-box {
        position: relative;
        margin: 40px auto 0;
        width: 301px;
        height: 290px;
        border-left: 1px solid #666;
        border-top: 1px solid #666;
        .top {
            position: absolute;
            top: -30px;
            left: 0;
            width: 100%;
            height: 30px;
            text-align: center;
            line-height: 30px;
        }

        .left {
            position: absolute;
            top: 0;
            left: -30px;
            width: 30px;
            height: 100%;
            text-align: center;
            line-height: 30px;
        }

        .top p, left p {
            width: 30px;
            height: 30px;
            color: #666;
        }
        .top p {
            float: left;

        }
    }

    .sample-item {
        float: left;
        width: 30px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        border-bottom: 1px solid #666;
        border-right: 1px solid #000;
        color: #333;
    }
</style>

