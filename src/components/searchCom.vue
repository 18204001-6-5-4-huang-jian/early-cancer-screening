<!--
   * @date 2019/2/27
   * @Description: 搜索组件
   * @params:type 组件类型 ; title label名称 ；name 绑定的key字段 ；width 表单宽度，默认为6，取值范围为0-24；size 表单的大小，默认为small
             如果是section标签，增加字段optionData<Array>,optionProps 设置option对应的属性
  -->

<template>
    <cancer-widget>
        <el-row :gutter="0">
            <el-form
                    :model="formData"
                    :label-width="labelWidth || '80px'"
                    class="clearfix"
                    :inline="true">
                <template v-for="(item,index) in searchData">
                    <el-col :span="item.width || 6" :key="index">
                        <template v-if="item.type === 'text'">
                            <el-form-item :label="`${item.title}:`" :label-width="item.labelWidth">
                                <el-input :size="item.size || 'small'" v-model="formData[item.name]"
                                          :placeholder="`请输入${item.title}`"
                                          clearable></el-input>
                            </el-form-item>
                        </template>
                        <template v-else-if="item.type === 'select'">
                            <el-form-item :label="`${item.title}:`" :label-width="item.labelWidth">
                                <el-select :size="item.size || 'small'" v-model="formData[item.name]" :multiple="item.title == '评估结果' && $route.name == '受试者列表'"
                                           :placeholder="`请选择${item.title}`" clearable>
                                    <el-option
                                            v-for="itemChild in item.optionData"
                                            :key="itemChild[item.optionProps.label]"
                                            :label="itemChild[item.optionProps.label]"
                                            :value="itemChild[item.optionProps.value]">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                        <template v-else-if="item.type === 'date'">
                            <el-form-item :label="`${item.title}:`" :label-width="item.labelWidth">
                                <el-date-picker
                                        :size="item.size || 'small'"
                                        :value-format="item.format"
                                        v-model="formData[item.name]"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                        <template v-else-if="item.type === 'daterange'">
                            <el-form-item :label="`${item.title}:`" :label-width="item.labelWidth">
                                <el-date-picker
                                        :size="item.size || 'small'"
                                        v-model="formData[item.name]"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        :value-format="item.format"
                                        @change="changeDate(item.startTime,item.endTime,item.name)"
                                        end-placeholder="结束日期"
                                        :default-time="['00:00:00', '23:59:59']">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-col>
                </template>
                <slot name="cascader"></slot>
                <el-form-item class="btns">
                    <el-button type="primary" @click="searchHandler">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </cancer-widget>
</template>

<script>
    export default {
        name:'search-com',
        props: ['searchData', 'labelWidth', 'formData'],
        data() {
            return {
                // formData: {
                    
                // },
                case: [
                    {
                        type: 'text',
                        title: '机构名称',
                        name: 'deptName'
                    },
                    {
                        type: 'select',
                        title: '机构类型',
                        name: 'deptType',
                        optionProps: {
                            label: 'name',
                            value: 'id'
                        },
                        optionData: [{id: 1, name: '登记处'}, {id: 2, name: '管理机构'}, {id: 3, name: '国家'}]
                    }, {
                        type: 'date',
                        title: '预约时间',
                        name: 'date',
                        format: 'yyyy-MM-dd'
                    }, {
                        type: 'daterange',
                        title: '录入日期',
                        name: 'date2',
                        width: 8, // 0-24
                        startTime: 'dptime',
                        endTime: 'dpEndtime',
                        format: 'yyyy-MM-dd HH:mm:ss'
                    }]
            }
        },
        mounted() {
            // console.log(this.$route.name)
        },
        methods: {
            changeDate(startTime, endTime, name) {
                // console.log(undefined == null)
                if (this.formData[name] == null) {
                    this.formData[startTime] = '';
                    this.formData[endTime] = '';
                    return false;
                }
                this.formData[startTime] = this.formData[name][0];
                this.formData[endTime] = this.formData[name][1];
            },
            searchHandler() {
                // console.log(this.formData)
                this.$emit('searchChange', this.formData);
            }
        }
    }
</script>

<style scoped>
  .btns{
      float:right;
      margin-right: 10px;
  }
</style>
