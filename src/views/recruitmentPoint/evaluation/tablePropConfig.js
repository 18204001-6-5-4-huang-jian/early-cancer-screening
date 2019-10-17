/**
 * @date 2019/3/1
 * @Description: tableCom 的属性配置项
 */

//评估列表
const EVALUATIONTB = {
    oneCol: {
        isShow: true,
        type: 'selection',
        width: 50
    },
    tableProps: [{
        prop: 'surverId',
        label: 'SID/问卷ID',
        width: '150' //如果不设置宽度，可不写
    }, {
        prop: 'userName',
        label: '姓名',
        width: '100'
    }, {
        prop: 'sex',
        label: '性别',
        width: '50',
        isFilter: true,
        filter: 'sexFilter'
    }, {
        prop: 'idCard',
        label: '身份证号',
        width: '180'
    }, {
        prop: 'tel',
        label: '手机号',
        width: '120'
    }, {
        prop: 'itemsUnderIt',
        label: '所属项目',
        isFilter: true,
        filter: 'itemsUnderItFilter'
    }, {
        prop: 'personStatus',
        label: '项目状态',
        isFilter: true,
        filter: 'personStatusFilter',
    }, {
        prop: 'entryCategory',
        label: '分组状态',
        isFilter: true,
        filter: 'groupStatusFilter',
    }, {
        prop: 'evaluateStatus',
        label: '评估状态',
        isFilter: true,
        filter: 'evaluateStatusFilter'
    }, {
        prop: 'checkStatus',
        label: '审核状态',
        isFilter: true,
        filter: 'checkStatusFilter'
    }, {
        prop: 'riskResult',
        label: '评估结果',
        width: '200'
    }, {
        prop: 'evaluateDate',
        label: '评估日期',
        isFilter: true,
        filter: 'dateFilter',
        width: '110'
    }, {
        prop: 'noticeStatus',
        label: '通知状态',
        isFilter: true,
        filter: 'noticeStatusFilter'
    }, {
        prop: 'aUserName',
        label: '录入人',
        width: '140'
    }, {
        prop: 'dcyqianming',
        label: '调查员',
        width: '140'
    }, {
        prop: 'deptName',
        label: '所属机构',
        width: '180'
    }]
}

export {
    EVALUATIONTB
}