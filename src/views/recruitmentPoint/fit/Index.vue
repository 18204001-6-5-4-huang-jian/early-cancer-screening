<template>
    <div>
        <search-com ref="fitsearch1" :labelWidth="'100px'" :searchData="searchData" :formData="qc" @searchChange="searchChange"></search-com>
        <div class="table-con-appointment">
            <cancer-widget>
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="1">
                        <FitTable :tableData="tableData" @refreshList="query"></FitTable>
                    </el-tab-pane>
                    <el-tab-pane :label="uncompleteTotal" name="2">
                        <FitTable :tableData="tableData" @refreshList="query"></FitTable>
                    </el-tab-pane>
                    <el-tab-pane label="筛查结果已录入" name="3">
                        <FitTable :tableData="tableData" @refreshList="query"></FitTable>
                    </el-tab-pane>
                </el-tabs>
                <br>
                <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="currentPageChange"
                        :current-page="queryResult.pageNo"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="queryResult.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="queryResult.totalPageCount">
                </el-pagination>
                <br>
            </cancer-widget>
        </div>
    </div>
</template>
<script>
    import FitTable from "../../common/FitTable"
    import {searchData} from './fitConfig'

    export default {
        data() {
            return {
                searchData: searchData,
                activeName: '1',
                tableData: [],
                uncompleteTotal: '筛查结果待录入',
                qc:{},
                //查询结果
                "queryResult": {
                    "pageNo": 1,//当前页
                    "pageSize": 10,//每页的条数
                },
            }
        },
        components: {
            FitTable
        },
        mounted() {
            if(this.$route.query.flag && this.$route.query.flag==5) {
                this.activeName = '2'
            }
            this.query();
        },
        methods: {
            searchChange(val) {
                this.qc = val
                this.query()
            },
            query() {
                let _resultStatus = null;
                if (this.activeName == "1") {
                    _resultStatus = null;
                } else if (this.activeName == "2") {
                    _resultStatus = "2";
                } else if (this.activeName == "3") {
                    _resultStatus = "1";
                }
                let data = Object.assign(this.qc,{
                    "pageNum": this.queryResult.pageNo,
                    "pageSize": this.queryResult.pageSize,
                    "resultEnterStatus": _resultStatus,
                })
                this.$axios_http({
                    url: "/base/fit/result/query",
                    data: data,
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        this.tableData = res.data.result.list;
                        this.queryResult.totalPageCount = res.data.result.total;
                        // if(this.activeName=="1" && res.data.result.list.length>0){
                        //   this.uncompleteTotal='结果待录入（'+res.data.result.list[0].count+'）'
                        // }
                        // if(this.activeName=="2"){
                        //   this.uncompleteTotal='结果待录入（'+res.data.result.total+'）'
                        // }
                    }
                })
            },
            handleClick(tab, event) {
                this.queryResult.pageNo = 1
                this.queryResult.pageSize = 10
                this.query();
            },
            //每页显示查询结果条数变更事件，做重新查询操作
            pageSizeChange(pageSize) {
                this.queryResult.pageSize = pageSize;
                this.qc = this.getFormData('fitsearch1')
                this.query();
            },
            //切换当前页事件，做重新查询操作
            currentPageChange(currentPage) {
                this.queryResult.pageNo = currentPage;
                this.qc = this.getFormData('fitsearch1')
                this.query();
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .table-con-appointment {
        position: relative;
        .el-button {
            position: absolute;
            right: 40px;
            top: 20px;
        }
    }
</style>

