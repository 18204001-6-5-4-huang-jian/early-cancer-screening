/**
 * @date 2019/3/1
 * @Description: tableCom 的属性配置项
 */

//审核列表
const FOLLOWTB = {
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
        prop: 'entryCategory',
        label: '分组状态',
        isFilter: true,
        filter: 'groupStatusFilter'
    }, {
        prop: 'evaluateDate',
        label: '评估日期',
        isFilter: true,
        filter: 'dateFilter'
    }, {
        prop: 'aUserName',
        label: '随诊来源',
        width: '140'
    },{
        prop: 'deptName',
        label: '计划随访时间',
        width: '180'
    }, {
        prop: 'dept',
        label: '所属机构',
        width: '180'
    }, ]
}

export {
    FOLLOWTB
}
