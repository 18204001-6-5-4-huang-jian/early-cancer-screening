<!--
 * @author <hurr@1yongcloud.com>
 * @date 2019/2/28
 * @Description: table 组件
 * @params： propsData<属性配置项> 包含oneCol，tableProps
                 oneCol 控制是否显示第一列，例如复选框或者索引号；
                 tableProps table的属性相关配置,用isFilter 判断是否需要使用过滤对应组件；
            tableData table所需数据，格式如data数据里的case对象
-->

<template>
    <el-table
            :data="tableData"
            tooltip-effect="dark"
            border
            style="width:100%"
            @selection-change="handleSelectionChange"
            @select-all="handleSelectionAll">
        <template v-if="propsData.oneCol.isShow">
            <el-table-column
                    :type="propsData.oneCol.type || 'selection'"
                    :width="propsData.oneCol.width || 50">
            </el-table-column>
        </template>
        <template v-for="item in propsData.tableProps">
            <template v-if="item.isFilter && item.isFilter === true">
                <el-table-column
                        :key="item.prop"
                        :width="item.width"
                        :label="item.label">
                    <template slot-scope="scope">
                        <span v-text="getData(scope.row[item.prop],item.filter)"></span>
                    </template>
                </el-table-column>
            </template>
            <template v-else>
                <el-table-column
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width || ''">
                </el-table-column>
            </template>
        </template>
        <slot name="operating"></slot>
    </el-table>
</template>

<script>
    import FILTER_DATA from '@/filters/filter'

    export default {
        name: 'table-com',
        props: ['propsData', 'tableData'],
        data() {
            return {
                case: {
                    oneCol: {
                        isShow: true,
                        type: 'selection',
                        width: 50
                    },
                    tableProps: [{
                        prop: 'name',
                        label: '姓名',
                        width: '120' //如果不设置宽度，可不写
                    }, {
                        prop: 'name',
                        label: '姓名',
                        width: '',
                        isFilter: true,
                        filter: ''
                    }]
                }
            }
        },

        methods: {
            getData(val, filter) {
                return FILTER_DATA[filter](val)
            },
            handleSelectionChange(val) {
                this.$emit('change', val)
            },
            handleSelectionAll(val) {
                this.$emit('selectAll', val)
            }
        }
    }
</script>
