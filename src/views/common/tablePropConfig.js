/**
 * @date 2019/3/1
 * @Description: tableCom 的属性配置项
 */

//受试者列表
const subjectTB = {
    oneCol: {
        isShow: true,
        type: 'selection',
        width: '50'
    },
    tableProps: [{
        prop: 'surverId',
        label: 'SID/问卷ID',
        width: '140' //如果不设置宽度，可不写
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
    },
     {
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
        filter: 'itemsUnderItFilter',
        width: '100'
    }, {
        prop: 'personStatus',
        label: '项目状态',
        isFilter:true,
        filter:'personStatusFilter'
    }, {
        prop: 'entryCategory',
        label: '分组状态',
        isFilter:true,
        filter:'groupStatusFilter'
    }, {
        prop: 'riskResult',
        label: '评估结果',
        width: '200'
    }, {
        prop: 'evaluateDate', 
        label: '评估日期',
        isFilter: true,
        filter: 'dateFilter',
        width: '120'

    }, {
        prop: 'deptName',
        label: '所属机构',
        width: '140'
    }]
}

export {
    subjectTB
}
