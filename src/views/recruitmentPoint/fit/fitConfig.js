import DICTIONARY from '@/views/common/dictionary'

const searchData = [
    {
        type: 'text',
        title: 'SID/问卷ID',
        name: 'surverId'
    },
    {
        type: 'text',
        title: '姓名',
        name: 'name'
    },
    {
        type: 'select',
        title: '性别',
        name: 'sex',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.sex
    },
    {
        type: 'text',
        title: '身份证号',
        name: 'idCard'
    },
    {
        type: 'text',
        title: '手机号',
        name: 'phone'
    },
    {
        type: 'select',
        title: '所属项目',
        name: 'itemsUnderIt',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.itemsUnderIt
    },
    {
        type: 'select',
        title: '评估结果',
        name: 'riskType',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.riskType
    },{
        type: 'select',
        title: '录入结果',
        name: 'result',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.entryResult
    },
    {
        type: 'text',
        title: '录入人',
        name: 'resultDoctor'
    },
    {
        type: 'daterange',
        title: '录入日期',
        width: 7,
        name: 'date2',
        startTime: 'beginDate',
        endTime: 'endDate',
        format: 'yyyy-MM-dd'
    }]

const tableProps = {
    oneCol: {
        isShow: false,
        type: 'selection',
        width: '50'
    },
    tableProps: [{
        prop: 'surverId',
        label: 'SID/问卷ID',
        width: '100' //如果不设置宽度，可不写
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
        filter: 'itemsUnderItFilter',
        width: '100'
    }, {
        prop: 'evaluateStatus',
        label: '评估状态',
        isFilter: true,
        filter: 'evaluateStatusFilter'
    }, {
        prop: 'riskResult',
        label: '评估结果'
    },  {
        prop: 'resultDate',
        label: '录入日期',
        width: '120',
        isFilter: true,
        filter: 'dateFilter'
    }, {
        prop: 'resultEnterStatus',
        label: '结果录入状态',
        isFilter: true,
        filter: 'inputCancerFilter'
    }, {
        prop: 'fitCode',
        label: 'FIT编码'
    }, {
        prop: 'result',
        label: '已录结果',
        isFilter: true,
        filter: 'resultFilter'
    }, {
        prop: 'resultDoctor',
        label: '录入人'
    }, {
        prop: 'deptName',
        label: '所属机构',
        width: '140'
    }]
}

export {
    searchData,
    tableProps
}
