import DICTIONARY from '@/views/common/dictionary'

//受试者列表
const SUBJECT = [
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
        title: '项目状态',
        name: 'personStatus',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.projectStatus
    },
    {
        type: 'select',
        title: '分组状态',
        name: 'entryCategory',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.groupStatus
    },
    {
        type: 'select',
        title: '评估结果',
        name: 'riskTypeList',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.evalResult
    },
    {
        type: 'daterange',
        title: '评估日期',
        width: 7,
        name: 'date2',
        startTime: 'beginEvaluateDate',
        endTime: 'endEvaluateDate',
        format: 'yyyy-MM-dd'
    }
]

export {
    SUBJECT
}
