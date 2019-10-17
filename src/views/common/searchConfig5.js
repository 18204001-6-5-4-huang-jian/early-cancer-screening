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
        name: 'personName'
    },
    // {
    //     type: 'date',
    //     title: '预约时间',
    //     width: 6,
    //     name: 'bookingTime',
    //     startTime: 'beginEvaluateDate',
    //     endTime: 'endEvaluateDate',
    //     format: 'yyyy-MM-dd'
    // },
    {
        type: 'text',
        title: '身份证号',
        name: 'idCard'
    },
    {
        type: 'select',
        title: '所属项目',
        name: 'items',
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
        optionData: DICTIONARY.evalResult
    },
    {
        type: 'select',
        title: '签到状态',
        name:'signStatus',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.signStatus
    },
    {
        type: 'select',
        title: '预约项目',
        name: 'checkProjectCode',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.checkProjectCode
    },
    {
        type: 'daterange',
        title: '预约时间',
        width: 7,
        name: 'date1',
        startTime: 'bookingDayBegin',
        endTime: 'bookingDayEnd',
        format: 'yyyy-MM-dd'
    },
]

export {
    SUBJECT
}
