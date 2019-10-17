/**
 * @date 2019/3/1
 * @Description: tableCom 的属性配置项
 */

const HBsAgTB = {
    oneCol: {
        isShow: false,
        type: 'selection',
        width: 50
    },
    tableProps: [{
        prop: 'surverId',
        label: 'SID/问卷ID',
        width: '150' //如果不设置宽度，可不写
    }, {
        prop: 'name',
        label: '姓名',
        width: '100'
    }, {
        prop: 'sex',
        label: '性别',
        width: '50',
        isFilter: true,
        filter: 'sexFilter'
    }, {
        prop: 'itemsUnderIt',
        label: '所属项目',
        isFilter: true,
        filter: 'itemsUnderItFilter'
    }, {
        prop: 'evaluateStatus',
        label: '评估状态',
        isFilter: true,
        filter: 'evaluateStatusFilter'
    }, {
        prop: 'riskResult',
        label: '评估结果'
    }, {
        prop: 'resultTime',
        label: '录入日期',
        isFilter: true,
        filter: 'dateFilter'
    }, {
        prop: 'resultStatus',
        label: '结果录入状态',
        isFilter: true,
        filter: 'resultStatusFilter'
    },{
        prop: 'result',
        label: '已录结果',
        isFilter: true,
        filter: 'resultFilter'
    }, {
        prop: 'resultName',
        label: '录入人',
        width: '140'
    }, {
        prop: 'deptName',
        label: '所属机构',
        width: '180'
    }]
}

export {
    HBsAgTB
}
