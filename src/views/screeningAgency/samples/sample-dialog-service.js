/**
 * Created by sunwd on 2018/10/11.
 */
import data from '@/views/common/data'

const BASE_URL = '/base'
let valueList = []
const API = {
    // 查询盒子编号
    BOX_CODE: {
        url: BASE_URL + '/biological/get/hosBiologicalSampleBox',
        method: 'post'
    },

    // 样本ID校验
    CHECK_ID: {
        url: BASE_URL + '/biological/get/hosBiologicalSampleIdOk',
        method: 'post'
    },

    // 提交
    SUBMIT_DATA: {
        url: BASE_URL + '/biological/add/biologicalSampleInfo',
        method: 'post'
    }
}
export default {
    methods: {
        // 查询盒子编号
        async getBoxCodeData(code, type) {
            let {data: {status, result, message}} = await this.$axios_http({
                url: API.BOX_CODE.url,
                data: {
                    boxCode: code,
                    boxType: type
                },
                method: 'post'
            })
            let entryFrozenObj = this.$refs['entryFrozen']
            /*
            * 查询盒子编号成功，有结果给组件传入已用盒子并赋值，无结果代表当前盒子未使用过，无使用空间，传入空数组
            * 查询盒子失败 可能邮寄，也可能不符合规格，让盒子未不可点击状态
            * */
            if (status === 'SUCCESS') {
                if (result) {
                    this.boxFlag = 1
                    if (entryFrozenObj) {
                        entryFrozenObj.init(true, this.boxType, result.locations, false)
                    }
                    return true
                } else {
                    this.boxFlag = 0
                    // 现有后无，清空值
                    if (entryFrozenObj) {
                        entryFrozenObj.init(true, this.boxType, [], false)
                    }
                    return true;
                }
            } else {
                entryFrozenObj.init(true, this.boxType, [], true)
                return message
            }
        },

        // 样本ID校验
        async getSampleIdData(itemsUnderIt, mainId, id) {
            let {data: {status, result}} = await this.$axios_http({
                ...API.CHECK_ID,
                data: Object.assign({}, {itemsUnderIt: itemsUnderIt, mainSampleId: mainId, sampleId: id})
            })
            let entryFrozenObj = this.$refs['entryFrozen']
            if (status === 'SUCCESS') {
                if (result) {
                    this.formData.sampleType = result
                    if (itemsUnderIt == 1) {
                        if (result == 'F') {
                            this.boxType = 2
                        } else {
                            this.boxType = 1
                        }
                    } else if (itemsUnderIt == 2) {
                        this.boxType = 0
                    }
                    /*
                    * 1.样本id校验成功，当冷冻盒编号内容为空 初始化盒子
                    *                 当编号不为空时，判断是否为提交状态，如提交时不重新获取盒子内容，不是提交状态校验 重新查询获取盒子编号接口
                    * */
                    if (this.formData.boxCode) {
                        if (this.submitType !== 1) {
                            this.getBoxCodeData(this.formData.boxCode, this.boxType + 1)
                        }
                    } else {
                        if (entryFrozenObj) {
                            entryFrozenObj.init(true, this.boxType, [], true)
                        }
                    }
                    return true

                } else {
                    if (entryFrozenObj && itemsUnderIt !== 2) {
                        entryFrozenObj.init(false)
                    }
                    // this.$failMsg(this, '生物样本id校验失败!!')
                    return false
                }
            }
        },

        // 提交
        async submitData() {
            let entryFrozenObj = this.$refs['entryFrozen']
            let frozenD = []
            if (entryFrozenObj) {
                if (this.rowObj.itemsUnderIt == 1 && (entryFrozenObj.frozenData.length - entryFrozenObj.usedGridData.length > 1)) {
                    this.$message.error('单次最多选择一个冷冻格子')
                    return false
                }
                if (entryFrozenObj.frozenData.length - entryFrozenObj.usedGridData.length < 1) {
                    this.$message.error('请选择一个冷冻格子')
                    return false
                }
                frozenD = entryFrozenObj.frozenData.slice(entryFrozenObj.usedGridData.length)
            }
            let {data: {status, result}} = await this.$axios_http({
                ...API.SUBMIT_DATA,
                data: Object.assign({},
                    this.formData,
                    {
                        boxFlag: this.boxFlag,
                        personId: this.rowObj.personId || this.personId,
                        surverId: this.rowObj.surverId || this.surverId,
                        hospitalId: this.rowObj.hospitalId,
                        mainSampleId: this.rowObj.mainSampleId || this.mainSampleId,
                        locationValues: frozenD,
                        itemsUnderIt: this.rowObj.itemsUnderIt || this.itemsUnderIt
                    })
            })
            if (status === 'SUCCESS') {
                this.clearForm();
                this.$emit('closeDialog', false)
                this.$emit('updateTable')
                this.submitType = -1
                valueList = []
            }
        }
    }
}
