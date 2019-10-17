<template>
    <div class="sample-wrap">
        <!--表单查询-->
        <search-com ref="samplessearch1" :labelWidth="'100px'" :searchData="searchData" :formData="formData"
                    @searchChange="searchHandler"></search-com>

        <!--生物样本列表-->
        <cancer-widget>
            <template slot="pre-button">
                <span class="title">生物样本列表</span>
                <!--<div>-->
                <el-button size="small" type="primary" @click="filterWriteHandler">录入</el-button>
                <!--<el-button size="small" type="primary" disabled>导出</el-button>-->
                <!--</div>-->
            </template>
            <el-table
                    :data="listTableData.list"
                    border
                    style="width: 100%"
                    class="cancer-margin--b15"
                    empty-text="暂无数据">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column
                        prop="surverId"
                        label="SID/问卷ID">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        label="所属项目"
                        prop="itemsUnderIt">
                    <template slot-scope="scope">
                        {{scope.row.itemsUnderIt | itemsUnderItFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        label="身份证号">
                </el-table-column>
                <el-table-column
                        prop="deptName"
                        label="所属机构">
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="riskResult"-->
                <!--label="筛查高危结果">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--label="项目状态"-->
                <!--prop="personStatus">-->
                <!--<template slot-scope="scope">-->
                <!--{{scope.row.personStatus | personStatusFilter}}-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column
                        label="生物样本ID"
                        prop="mainSampleId">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="previewHanlder(scope.row)"
                                   v-if="scope.row.viewFlag !== 0">查看
                        </el-button>
                        <el-button size="small" type="text" @click="writeHanlder(scope.row)">录入</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
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

        <!--查看样本详情弹框-->
        <preview-sample-dialog
                :previewDialogVisible="previewDialogVisible"
                ref="previewDialog"
                @closeDialog="closeDialog"></preview-sample-dialog>

        <!--筛选录入-->
        <filter-write-dialog
                :filterSampleDialogVisible="filterSampleDialogVisible"
                :isShowIdCard="isShowIdCard"
                ref="filterWriteDialog"
                @closeDialog="closeDialog"
                @checkIdCard="checkIdCard"
                @checkSampleId="checkSampleId"></filter-write-dialog>

        <!--录入-->
        <sample-dialog
                :sampleDialogVisible="sampleDialogVisible"
                :listName="listName"
                :itemsUnderIt="itemsUnderIt"
                ref="writeDialog"
                @updateTable="updateTable"
                @closeDialog="closeDialog"></sample-dialog>
    </div>
</template>
<script>
    import DICTIONARY from '@/views/common/dictionary'
    import mixin from '@/mixins/mixins'
    import service from '@/views/screeningAgency/samples/index-service'
    import SampleDialog from '@/views/screeningAgency/samples/SampleDialog'
    import PreviewSampleDialog from '@/views/screeningAgency/samples/PreviewSampleDialog'
    import FilterWriteDialog from '@/views/screeningAgency/samples/FilterWriteDialog'

    export default {
        name: 'samples-index',
        mixins: [mixin, service],
        data() {
            return {
                formData: {
                    name: null,
                    idCard: null,
                    riskStatus: null,
                    surverId: null
                },
                searchData: [{
                    type: 'text',
                    title: 'SID/问卷ID',
                    name: 'surverId'
                }, {
                    type: 'text',
                    title: '姓名',
                    name: 'name'
                }, {
                    type: 'text',
                    title: '身份证号',
                    name: 'idCard'
                }, {
                    type: 'select',
                    title: '所属项目',
                    name: 'itemsUnderIt',
                    optionProps: {
                        label: 'name',
                        value: 'id'
                    },
                    optionData: DICTIONARY.itemsUnderIt
                }, {
                    type: 'daterange',
                    title: '评估日期',
                    width: 9,
                    name: 'date2',
                    startTime: 'beginDate',
                    endTime: 'endDate',
                    format: 'yyyy-MM-dd'
                }],
                riskStatus: DICTIONARY.riskStatus,
                listTableData: {
                    pageNum: 1,
                    pageSize: 10
                },
                sampleDialogVisible: false,
                filterSampleDialogVisible: false,
                listName: null,   //列表名称
                itemsUnderIt:null,
                previewDialogVisible: false,
                isShowIdCard: false,
                mainSampleId: null
            }
        },
        methods: {
            // 分页=>改变每页条数
            tableSizeChange(val) {
                this.listTableData.pageSize = val
                this.formData = this.getFormData('samplessearch1')
                this.getListData()
            },

            // 分页=>改变当前页
            tablePageChange(val) {
                this.listTableData.pageNum = val
                this.formData = this.getFormData('samplessearch1')
                this.getListData()
            },

            //查询
            searchHandler(val) {
                this.formData = val
                this.getListData()
            },

            // 录入 => 筛选
            filterWriteHandler() {
                this.filterSampleDialogVisible = true
            },

            // 关闭弹框
            closeDialog(val) {
                this.sampleDialogVisible = val
                this.filterSampleDialogVisible = val
                this.previewDialogVisible = val
                this.isShowIdCard = val
            },

            // 刷新表格
            updateTable() {
                this.getListData()
            },

            // 查看列表详情
            async previewHanlder(row) {
                await this.$refs['previewDialog'].sampleDetailData(row.mainSampleId)
                this.previewDialogVisible = true
            },

            // 录入弹框
            async writeHanlder(row) {
                this.listName = row.name
                // this.$refs['writeDialog'].clearForm()
                await this.$refs['writeDialog'].sampleWriteData(row, () => {
                    this.sampleDialogVisible = true
                })
            },

            // 校验生物样本ID
            checkSampleId(val) {
                val && this.checkSampleIdData(val)
            },


            checkIdCard(val) {
                val && this.submitData(val)
            }
        },
        components: {
            SampleDialog,
            FilterWriteDialog,
            PreviewSampleDialog
        },
        created() {
            this.getListData()
        }
    }
</script>
<style scoped lang="scss">
    .sample-wrap {
        .title {
            display: inline-block;
            padding-left: 10px;
            // border-left: 2px solid #317ef7;
            color: #317ef7;
            height: 22px;
            line-height: 22px;
            font-size: 16px;
            position: relative;
        }
        .title:after {
            position: absolute;
            content: '';
            left: 0;
            top: 10%;
            width: 2px;
            height: 80%;
            background: #317ef7;
        }
    }
</style>
