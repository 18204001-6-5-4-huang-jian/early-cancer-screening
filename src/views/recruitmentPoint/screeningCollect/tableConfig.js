const zmscreeningCollecttableconfig = {
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
        prop: 'idCard',
        label: '身份证号',
        width: '180'
    }, {
        prop: 'phone',
        label: '手机号',
        width: '120'
    }, {
        prop: 'itemOnly',
        label: '所属项目',
        isFilter: true,
        filter: 'itemsUnderItFilter'
    }, {
        prop: 'entryCategory',
        label: '分组状态',
        isFilter: true,
        filter: 'groupStatusFilter',
    }]
}

export {
    zmscreeningCollecttableconfig as tableConfig
}
