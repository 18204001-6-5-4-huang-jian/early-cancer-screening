<template>
    <div>
        <search-com ref="2searchTable" :labelWidth="'100px'" :searchData="searchData" :formData="qc"
                    @searchChange="searchChange">
            <template slot="cascader">
                <el-form-item label="所属机构:">
                    <el-cascader
                        :options="optionData"
                        :props="optionProps"
                        size="small"
                        v-model="qc.selectedOptions"
                        change-on-select
                        clearable></el-cascader>
                </el-form-item>
            </template>
        </search-com>
        <div class="table-con-appointment">
            <cancer-widget>
                <template slot="sub-button">
                    <el-button type="success" size="small" @click="exportExcel">导出EXCEL</el-button>
                </template>
                <table-com :propsData="propsData" :tableData="listTableData.list">
                    <template slot="operating">
                        <el-table-column label="操作" fixed="right" width="120">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="goDetail(scope.row)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </table-com>
                <!-- 分页 -->
                <br>
                <el-pagination
                        @size-change="tableSizeChange"
                        @current-change="tablePageChange"
                        :current-page.sync="listTableData.pageNum"
                        :page-sizes="[10, 20, 50, 100, 200]"
                        :page-size="listTableData.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="listTableData.total">
                </el-pagination>
                <br>
            </cancer-widget>
        </div>
    </div>
</template>
<script>
    import mixin from '@/mixins/mixins'
    import service from '@/views/screeningAgency/subject/index-service'
    import {SUBJECT} from '@/views/common/searchConfig2'
    import {subjectTB} from '@/views/common/tablePropConfig2'
    export default {
        name: 'samples-index',
        mixins: [mixin, service],
        data() {
            return {
                isInit: false,
                deptreeDialogVisable: false,
                //查询条件
                qc: {
                    name: null,
                    phone: null,
                    idCard: null,
                    personStatus: null,
                    deptName: null,
                    deptType:2,
                    selectedOptions:[],   //级联选择器的值
                },
                listTableData: {
                    pageNum: 1,
                    pageSize: 10
                },
                optionData: [],
                optionProps:{
                    value:'id',
                    label:'deptName',
                },
                searchData: SUBJECT,
                propsData: subjectTB
            }
        },
        created() {
            // 页面初始化
            if (localStorage.getItem("searchParams")) {
                let { qc, queryResult, activeName } = JSON.parse(
                localStorage.getItem("searchParams")
                );
                this.qc = qc;
                this.listTableData = queryResult;
            }
            this.getDeptree()
            this.getListData()
        },
        methods: {
            // 存储searchParams
            saveSearchParams() {
                localStorage.setItem("searchParams",JSON.stringify(
                    Object.assign({},{
                        qc: this.qc,
                        queryResult: this.listTableData
                        }
                    )
                    )
                );
            },
            tableSizeChange(val) {
                this.listTableData.pageSize = val
                if (this.$refs['2searchTable']) {
                    this.qc = this.$refs['2searchTable'].formData
                }
                this.qc.deptType = 2;
                this.getListData()
            },

            // 分页=>改变当前页
            tablePageChange(val) {
                this.qc = this.getFormData('2searchTable');
                this.qc.deptType = 2;
                this.listTableData.pageNum = val
                this.getListData()
            },
            searchChange(val) {
                this.qc = this.getFormData('2searchTable');
                this.qc.deptType = 2;
                this.qc = val;
                this.getListData()
            },
            exportExcel() {
                let name ='受试者列表.xls';
                this.$axios_http({
                method:'POST',
                url:'/base/zm/booking/data/export',
                responseType:'blob',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                data:Object.assign({},this.qc,{deptSearch:this.qc.selectedOptions[this.qc.selectedOptions.length-1]}),
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
            },
            goDetail(row) {
                this.saveSearchParams();
                this.$router.push({
                    path: '/agency/subject/detail',
                    query: {
                        personId: row.personId,
                        surverId: row.surverId,
                        projectYear: row.projectYear,
                        // 受试者详情基本信息部分 查看表单添加的参数  2019/9/11
                        id: row.id,    //列表id，查早诊评估表+个人信息表
                        eligibilityFormId: row.eligibilityFormId,  //查资格审核表+危险因素表
                        personInfoEntryStatus: row.personInfoEntryStatus,   //查个人信息表录入状态
                        hazardsEntryStatus: row.hazardsEntryStatus,  //查危险因素表录入状态
                        personInfoId: row.personInfoId,  //查个人信息表+危险因素表
                        hazardsId: row.hazardsId  //查危险因素表
                    }
                })
            },
            // 查找所属机构树
            getDeptree(){
                this.$axios_http({
                url: "/base/zm/booking/bookedPersonDept",
                data: {},
                vueObj: this
                }).then((res)=> {
                    if(res.data.status=="SUCCESS"){
                        this.optionData=res.data.result
                    }
                })
            },
        }
    }
</script>
