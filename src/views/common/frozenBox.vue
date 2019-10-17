<!--
 * @author <hurr@1yongcloud.com>
 * @date 2019/3/21
 * @Description: 样本管理 - 冷冻盒子
 * @params: type|preType: 1.早诊10*10盒子 2.肺肠血清类 6*8的盒子 3.肺肠4*4的盒子
            usedGridData | usedData 已经被用过的格子
            disabled 是否可以点击
            *useReason 1 新增环节  其它为预览环境
-->

<template>
    <div class="frozenBox">
        <template v-if="useReason ===1">
            <div class="sample-box" v-if="show" :style="`width:${getWidth}px;height:${getHeight}px`">
                <!--行-->
                <div class="top">
                    <p v-for="i in (props[type].rowNum)" :key="i">{{i}}</p>
                </div>
                <!--列-->
                <div class="left">
                    <P v-for="column in props[type].columnId" :key="column">{{column}}</P>
                </div>
                <!--内容-->
                <el-checkbox-group v-model="frozenData" class="item-group" size="small" :disabled="disabled">
                    <template v-for="column in props[type].columnId">
                        <el-checkbox-button :class="['frozenGrid',{'frozenGridDis':usedGridData.includes(column+id)}]"
                                            v-for="id in (props[type].rowNum)"
                                            :disabled="usedGridData.includes(column+id)" :label="column+id"
                                            :key="column+id">
                            {{column}}{{id}}
                        </el-checkbox-button>
                    </template>
                </el-checkbox-group>
            </div>
        </template>
        <template v-else>
            <div class="sample-box" :style="`width:${getPreWidth}px;height:${getPreHeight}px`">
                <!--行-->
                <div class="top">
                    <p v-for="i in (props[preType].rowNum)" :key="i">{{i}}</p>
                </div>
                <!--列-->
                <div class="left">
                    <P v-for="column in props[preType].columnId" :key="column">{{column}}</P>
                </div>
                <!--内容-->
                <el-checkbox-group v-model="frozenData" class="item-group" size="small" disabled>
                    <template v-for="column in props[preType].columnId">
                        <el-checkbox-button :class="['frozenGrid',{'frozenGridDis':usedData.includes(column+id)}]"
                                            v-for="id in (props[preType].rowNum)"
                                            :disabled="usedData.includes(column+id)" :label="column+id"
                                            :key="column+id">
                            {{column}}{{id}}
                        </el-checkbox-button>
                    </template>
                </el-checkbox-group>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "frozenBox",
        props: ['usedData', 'useReason', 'preType'],
        data() {
            return {
                props: [{
                    columnId: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
                    rowNum: 10
                }, {
                    columnId: ['A', 'B', 'C', 'D', 'E', 'F'],
                    rowNum: 8
                }, {
                    columnId: ['A', 'B', 'C', 'D'],
                    rowNum: 4
                }],
                type: 0,
                usedGridData: [],
                frozenData: [],
                disabled: false,
                show: false
            }
        },
        computed: {
            getWidth() {
                if (this.type === 0) {
                    return '301'
                } else if (this.type === 1) {
                    return '241'
                } else if (this.type === 2) {
                    return '121'
                }
            },
            getHeight() {
                if (this.type === 0) {
                    return '290'
                } else if (this.type === 1) {
                    return '174'
                } else if (this.type === 2) {
                    return '116'
                }
            },
            getPreWidth() {
                if (this.preType === 0) {
                    return '301'
                } else if (this.preType === 1) {
                    return '241'
                } else if (this.preType === 2) {
                    return '121'
                }
            },
            getPreHeight() {
                if (this.preType === 0) {
                    return '290'
                } else if (this.preType === 1) {
                    return '174'
                } else if (this.preType === 2) {
                    return '116'
                }
            }
        },
        methods: {
            init(show = true, type, frozenData = [], disabled = true) {
                if (!show) {
                    this.show = false
                    return
                }
                let list = []
                frozenData && frozenData.map((item) => {
                    if (item.locationValue) {
                        list.push(item.locationValue)
                    }
                })
                this.usedGridData = []
                this.show = show
                this.type = type
                this.usedGridData = list
                this.frozenData = list
                this.disabled = disabled
            }
        }
    }
</script>

<style scoped lang="scss">
    .frozenBox {
        margin-top: 36px;
        .sample-box {
            position: relative;
            margin: 10px auto 0;
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

            .top p, .left p {
                width: 30px;
                height: 30px;
                color: #666;
            }
            .top p {
                float: left;

            }
        }
    }
</style>
<style>
    .item-group.el-checkbox-group {
        padding: 0;
    }

    .frozenGrid .el-checkbox-button__inner {
        width: 30px;
        height: 29px;
        padding: 0;
        font-size: 14px;
        line-height: 29px;
        text-align: center;
        border: none;
        border-bottom: 1px solid #666;
        border-right: 1px solid #000;
        color: #fff;
    }

    .frozenGrid:first-child .el-checkbox-button__inner {
        border-left: none;
        border-radius: 0;
    }

    .frozenGrid:last-child .el-checkbox-button__inner {
        border-radius: 0;
    }

    .frozenGrid.is-checked .el-checkbox-button__inner {
        border-color: #666;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .item-group .frozenGridDis.is-disabled .el-checkbox-button__inner {
        color: #fff;
        cursor: not-allowed;
        background-image: none;
        background-color: #409EFF;
        border-color: #666;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .item-group .is-disabled .el-checkbox-button__inner {
        background-color: #fff;
        border: none;
        border-bottom: 1px solid #666;
        border-right: 1px solid #000;
        color: #fff;
    }
</style>
