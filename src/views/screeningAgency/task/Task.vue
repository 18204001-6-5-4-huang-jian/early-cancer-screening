<template>
    <div>
        <search-com ref="4searchTable" :searchData="searchData" @searchChange="searchChange" :formData="qc"></search-com>
        <!--列表-->
        <cancer-widget>
            <p class="cancer-title-blue">任务列表</p>
            <el-table
                    :data="listTableData.list"
                    border
                    style="width: 100%"
                    class="cancer-margin--b15"
                    empty-text="暂无数据">
                <el-table-column
                        label="序号"
                        type="index"
                        width="60">
                </el-table-column>
                <el-table-column
                        prop="projectYear"
                        label="筛查年度">
                </el-table-column>
                <el-table-column
                        prop="taskType"
                        label="任务类型">
                    <template slot-scope="scope">
                        {{scope.row.taskType | taskTypeFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="itemsUnderIt"
                        label="所属项目">
                         <template slot-scope="scope">
                        {{scope.row.itemsUnderIt | itemsUnderItFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="deptName"
                        label="机构名称">
                </el-table-column>
                <el-table-column
                        prop="cancerType"
                        label="癌种">
                         <template slot-scope="scope">
                        {{scope.row.cancerType | cancerTypeFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="taskNum"
                        label="总任务数">
                </el-table-column>
                <el-table-column
                        prop="finishNum"
                        label="完成数量">
                </el-table-column>
                <el-table-column
                        label="剩余数量">
                    <template slot-scope="scope">
                        {{scope.row.taskNum - scope.row.finishNum}}
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
    </div>
</template>
<script>
    import service from '@/views/screeningAgency/task/task-service'
    import mixin from '@/mixins/mixins'
    import Common from '../../common/dictionary'

    export default {
        name: 'task-index',
        mixins: [mixin, service],
        data() {
            return {
                listTableData: {
                    pageNum: 1,
                    pageSize: 10
                },
                qc:{
                   projectYear:null,
                   cancerType:null
                },
                searchData: [
                    {
                        type: 'select',
                        title: '筛查年度',
                        name: 'projectYear',
                        optionProps: {
                            label: 'name',
                            value: 'id'
                        },
                        optionData: [{id: '2018', name: '2018'},{id: '2019', name: '2019'}]
                    },
                    {
                        type: 'select',
                        title: '癌种',
                        name: 'cancerType',
                        optionProps: {
                            label: 'name',
                            value: 'id'
                        },
                        optionData: Common.types
                    }]
            }
        },
        mounted() {
            this.getListData(this.listTableData)
        },
        methods: {
            searchChange(val) {
                this.qc = val;
                this.getListData()
            },
            // 分页=>改变每页条数
            tableSizeChange(val) {
                this.qc = this.getFormData('4searchTable');
                this.listTableData.pageSize = val
                this.getListData()
            },

            // 分页=>改变当前页
            tablePageChange(val) {
                this.qc = this.getFormData('4searchTable');
                this.listTableData.pageNum = val
                this.getListData()
            },
        }
    }
</script>
<style scoped>

</style>
