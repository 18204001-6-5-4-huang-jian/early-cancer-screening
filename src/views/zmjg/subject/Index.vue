<template>
    <div>
        <search-com  :labelWidth="'100px'" :searchData="searchData" ref="1searchTable" :formData="qc"
                    @searchChange="searchChange"></search-com>
        <div class="table-con-appointment">
            <cancer-widget>
                <template slot="sub-button">
                    <el-button type="success" size="small" @click="exportExcel">导出EXCEL</el-button>
                </template>
                <table-com :propsData="propsData" :tableData="listTableData.list">
                    <template slot="operating">
                        <el-table-column label="个人信息表"  width="120">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" v-if="scope.row.itemsUnderIt == 1 && scope.row.personInfoEntryStatus == 1"  @click="viewPersonInfoEntryStatus(scope.row)">查看</el-button>
                                <el-button type="text" size="small" v-if="scope.row.itemsUnderIt == 1 && scope.row.personInfoEntryStatus == 2"  @click="viewPersonInfoEntryStatus(scope.row)">录入</el-button>
                                <p v-if="scope.row.itemsUnderIt == 2">-</p>
                            </template>
                        </el-table-column>
                         <el-table-column label="危险因素"  width="120">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" v-if="scope.row.itemsUnderIt == 1 && scope.row.hazardsEntryStatus == 1"  @click="viewHazardsEntryStatus(scope.row)">查看</el-button>
                                <el-button type="text" size="small" v-if="scope.row.itemsUnderIt == 1 && scope.row.hazardsEntryStatus == 2"  @click="viewHazardsEntryStatus(scope.row)">录入</el-button>
                                <p v-if="scope.row.itemsUnderIt == 2">-</p>
                            </template>
                        </el-table-column>
                         <el-table-column label="C组筛查项目"  width="120">
                             <template slot-scope="scope">
                                 <el-button  type="text" size="small" v-if="scope.row.itemsUnderIt == 1 && scope.row.categorySelect == 0" @click="chooseProject(scope.row)">选择项目</el-button>
                                 <p v-if="scope.row.itemsUnderIt == 1 && scope.row.categorySelect > 0">已选择</p>
                                 <p v-if="scope.row.itemsUnderIt == 2">-</p>
                             </template>
                         </el-table-column>
                        <el-table-column label="操作" fixed="right" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="goDetail(scope.row)">查看</el-button>
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
        <el-dialog
        title="肺肠C组筛查项目选择"
        :visible.sync="dialogVisible"
        width="30%"
        >
         <el-radio v-model="radio" label="1">每年FIT</el-radio>
         <el-radio v-model="radio" label="2">任意一年结直肠镜</el-radio>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="sureChoose()">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    import mixin from '@/mixins/mixins'
    import service from '@/views/zmjg/subject/index-service'
    import {SUBJECT} from '@/views/common/searchConfig'
    import {subjectTB} from '@/views/common/tablePropConfig'

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
                    idCard: null,
                    phone: null,
                    personStatus: null,
                    deptName: null,
                    deptType:1 //机构类型 只在招募点用时赋值1
                },
                listTableData: {
                    pageNum: 1,
                    pageSize: 10,
                },
                searchData: SUBJECT,
                propsData: subjectTB,
                dialogVisible:false,
                radio:'1',
                id:''
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
                this.qc = this.getFormData('1searchTable');
                this.qc.deptType = 1;
                this.listTableData.pageSize = val;
                this.getListData();
            },

            // 分页=>改变当前页
            tablePageChange(val) {
                this.qc = this.getFormData('1searchTable');
                 this.qc.deptType = 1;
                this.listTableData.pageNum = val;
                this.getListData();
            },
            searchChange(val) {
                this.qc = val;
                this.qc.deptType = 1;
                this.getListData();
            },
            exportExcel() {
                let name ='受试者列表.xls';
                this.$axios_http({
                method:'POST',
                url:'/base/person/data/export',
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
            },
            goDetail(row) {
                this.saveSearchParams()
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
            viewPersonInfoEntryStatus(row){
                this.saveSearchParams();
                if(row.personInfoEntryStatus == 1){
                    //查看
                    this.$router.push({
                        path:'/ldctform/personinfo/index',
                        query:{
                            type:1,
                            personInfoId:row.personInfoId,
                            id:row.id
                        }
                    })
                }else{
                    //录入
                    this.$router.push({
                        path:'/ldctform/personinfo/index',
                        query:{
                            type:2,
                            personInfoId:row.personInfoId,
                            eli:row.eligibilityFormId,
                            id:row.id,
                            from:0
                        }
                    })
                }

            },
            viewHazardsEntryStatus(row){
                this.saveSearchParams();
                if(row.hazardsEntryStatus == 1){
                    //查看
                    // type = 2
                    this.$router.push({
                        path:'/ldctform/riskfactor',
                        query:{
                            type:2,
                            id:row.hazardsId,
                            personInfoId:row.personInfoId,
                            eli:row.eligibilityFormId
                        }
                    })
                }else{
                    //录入
                    // type = 1
                    this.$router.push({
                        path:'/ldctform/riskfactor',
                        query:{
                            type:1,
                            id:row.hazardsId,
                            personInfoId:row.personInfoId,
                            eli:row.eligibilityFormId,
                            personScreenId:row.id
                        }
                    })
                }
            },
            chooseProject(row){
                 this.saveSearchParams();
                 this.dialogVisible = true;
                 this.id = row.id;
            },
            sureChoose(){
                this.dialogVisible = false;
                let msg = '';
                let categorySelect = '';
                if(this.radio == '1'){
                    msg = '每年FIT';
                    categorySelect = '1';
                }else{
                    msg = '任意一年结直肠镜';
                    categorySelect = '2';
                }
                    this.$confirm('当前选择项目为”' + msg + '“确认后无法修改，确认选择?', '', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                        //C组筛查项目接口
                        this.$axios_http({
                            url:'/base/fc/person/save/savePersonScreenType',
                            data:{
                                id:this.id,
                                categorySelect:categorySelect
                            },
                            vueObj: this
                        }).then((res)=>{
                            if(res.data.status == "SUCCESS"){
                                // 页面初始化
                                if (localStorage.getItem("searchParams")) {
                                    let { qc, queryResult, activeName } = JSON.parse(
                                    localStorage.getItem("searchParams")
                                    );
                                    this.qc = qc;
                                    this.listTableData = queryResult;
                                }
                                 this.getListData();
                            }
                        })
                        }).catch(() => {
                           
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>


