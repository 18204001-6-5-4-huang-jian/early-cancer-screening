import DICTIONARY from '@/views/common/dictionary'

    const HBsAg = [
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
            type: 'select',
            title: '评估结果',
            name: 'riskType',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.riskType
        },
        {
            type: 'select',
            title: '已录结果',
            name: 'result',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.resultStatus
        },
        {
            type: 'text',
            title: '录入人',
            name: 'resultName'
        },
   
        {
            type: 'daterange',
            title: '录入日期',
            width: 9,
            name: 'date2',
            startTime: 'startTime',
            endTime: 'endTime',
            format: 'yyyy-MM-dd'
        }]

export {
    HBsAg
}
