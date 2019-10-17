<template>
    <div>
        <el-dialog
                title="样本详情"
                :visible.sync="previewDialogVisible"
                width="70%"
                :before-close="closeDialog">
            <el-row v-for="(item,index) in detailList" :key="index+1" v-if="detailList.length"
                    class="cancer-margin--b15 wrap-bottom">
                <el-col :span="12">
                    <p style="margin-left: 100px;" class="title-style cancer-margin--b15">样本{{index+1}}</p>
                    <el-form
                            label-width="150px">
                        <el-form-item label="所属项目:">
                            <span>{{item.itemsUnderIt | itemsUnderItFilter}}</span>
                        </el-form-item>
                        <el-form-item label="样本ID:">
                            <span>{{item.sampleId}}</span>
                        </el-form-item>
                        <el-form-item label="冷冻盒编号:">
                            <span>{{item.boxCode}}</span>
                        </el-form-item>
                        <el-form-item label="采样日期:">
                            <span>{{item.collectStatusDate | dateFilter}}</span>
                        </el-form-item>
                        <el-form-item label="样本类型:">
                            <span>{{item.sampleType | sampleTypeFilter}}</span>
                        </el-form-item>
                        <el-form-item label="快递状态:">
                            <span>{{item.courierStatus | courierStatusFilter}}</span>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <span>{{item.remark}}</span>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <p style="text-align: center;" class="title-style">样本位置：</p>
                    <frozen-box :usedData="item.locationValues"
                                :preType="item.box.boxType-1"></frozen-box>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center" class="cancer-margin--t15">
                <el-button size="small" @click="closeDialog">关闭</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
    import mixin from '@/mixins/mixins'
    import service from '@/views/gj/samples/preview-service'
    import FrozenBox from '@/views/common/frozenBox'

    export default {
        name: 'gj-sample-dialog',
        mixins: [mixin, service],
        props: ['previewDialogVisible'],
        data() {
            return {
                formData: {
                    sampleId: null,
                    boxCode: null,
                    collectStatusDate: null,
                    sampleType: null,
                    courierStatus: null,
                    remark: null
                },
                detailList: []
            }
        },
        methods: {
            // 取消
            async closeDialog() {
                this.$emit('closeDialog', false)
            },
            // 查看详情
            previewDetailHandler(val,fun) {
                this.sampleDetailData(val,fun)
            }
        },
        components: {
            FrozenBox
        },
    }
</script>
<style scoped lang="scss">
    .title-style {
        font-size: 16px;
        color: #333;
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

    .wrap-bottom {
        border-bottom: 1px solid #ddd;
    }
</style>
<style>
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
