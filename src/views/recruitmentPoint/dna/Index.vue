<template>
    <div>
        <search-com ref="dnasearch" :labelWidth="'100px'" :searchData="searchData" :formData="qc" @searchChange="searchChange"></search-com>
        <div class="table-con-appointment">
            <cancer-widget>
                <template>
                    <router-link :to="{path:'/dna/dnaentry'}">
                        <el-button type="primary" size="small" style="margin-bottom:10px;padding: 10px 20px;">新增</el-button>
                    </router-link>
                    <el-button type="success" size="small" @click="exportExcelHandler" style="float:right;">导出EXCEL</el-button>
                </template>
                <table-com :propsData="propsData" :tableData="tableData">
                    <template slot="operating">
                        <el-table-column
                        label="操作"
                        fixed="right"
                        width="180">
                        <template slot-scope="scope">
                            <el-button type="text" size="small"  @click="seeResult(scope.row)">查看</el-button>
                        </template>
                        </el-table-column>
                    </template>
                </table-com>
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
    import {searchData} from './dnaConfig'
    import { DnaTB } from '@/views/recruitmentPoint/dna/tablePropConfig'
    export default {
        data() {
            return {
                searchData: searchData,
                propsData: DnaTB,
                tableData: [],
                qc:{},
                //查询结果
                "queryResult": {
                    "pageNo": 1,//当前页
                    "pageSize": 10,//每页的条数
                },
            }
        },
        mounted() {
            this.query();
        },
        methods: {
            searchChange(val) {
                this.qc = val
                this.query()
            },
            query() {
                let data = Object.assign(this.qc,{
                    "pageNum": this.queryResult.pageNo,
                    "pageSize": this.queryResult.pageSize,
                })
                this.$axios_http({
                    url: "/base/measurement/findList/condition",
                    data: data,
                    vueObj: this
                }).then((res) => {
                    if (res.data.status == "SUCCESS") {
                        this.tableData = res.data.result.list;
                        this.queryResult.totalPageCount = res.data.result.total;
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
                this.qc = this.getFormData('dnasearch')
                this.query();
            },
            //切换当前页事件，做重新查询操作
            currentPageChange(currentPage) {
                this.queryResult.pageNo = currentPage;
                this.qc = this.getFormData('dnasearch')
                this.query();
            },
            seeResult(row){
                this.$router.push({
                    path:'/dna/dnaentry',
                    query: {
                       id: row.id
                    }
                })
            },
            exportExcelHandler() {
                let name ='粪便DNA管理列表.xls';
                this.$axios_http({
                method:'POST',
                url:'/base/measurement/dna/export',
                responseType:'blob',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data:Object.assign({},this.qc),
                vueObj:this
                }).then(res =>{
                    if (!res.data) {
                        return
                    }
                    if(res.data.type=='text/xml'){
                    this.$confirm('对不起，您的登录状态已过期，请重新登录', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            showCancelButton:false,
                            type: 'warning'
                        }).then(() => {
                            window.location.href=BIGPLATFORM_URL
                        }).catch(() => {
                        });
                    return;
                    }
                    let url = window.URL.createObjectURL(new Blob([res.data]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', name)
                    document.body.appendChild(link)
                    link.click()
                    URL.revokeObjectURL(link.href); // 释放URL 对象
                    document.body.removeChild(link);
                })
            }
        }
    }
</script>

