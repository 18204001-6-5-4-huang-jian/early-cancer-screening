/**
 * @date 2019/9/4
 * @Description: tableCom 的属性配置项
 */

const DnaTB = {
    oneCol: {
        isShow: false,
        type: 'selection',
        width: 50
    },
    tableProps: [{
        prop: 'surverId',
        label: 'SID/问卷ID',
        width: '160' //如果不设置宽度，可不写
    }, {
        prop: 'name',
        label: '姓名',
        width: '120'
    }, {
        prop: 'sex',
        label: '性别',
        width: '100',
        isFilter: true,
        filter: 'sexFilter'
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
        prop: 'dnaCode',
        label: 'DNA编码'
    }, {
        prop: 'sendCodeDate',
        label: '编码录入日期',
        isFilter: true,
        filter: 'dateFilter'
    }, 
    // {
    //     prop: 'resultStatus',
    //     label: '结果返回状态',
    //     isFilter: true,
    //     filter: 'resultStatusFilter'
    // },{
    //     prop: 'result',
    //     label: 'DNA结果',
    //     isFilter: true,
    //     filter: 'resultFilter'
    // }
]
}

export {
    DnaTB
}
