import DICTIONARY from '@/views/common/dictionary'

const MX = [{
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
        type: 'daterange',
        title: '检查日期',
        width: 9,
        name: 'checkDate',
        startTime: 'beginDate',
        endTime: 'endDate',
        format: 'yyyy-MM-dd'
    },
    {
        type: 'select',
        title: 'X线筛查结果',
        name: 'screeningResult',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.mammaryScreeningResult
    },
    {
        type: 'select',
        title: '乳腺筛查结果',
        name: 'rxScreeningResult',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.mammaryScreeningResult
    }
]

export {
    MX
}