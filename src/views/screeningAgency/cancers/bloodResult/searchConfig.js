import DICTIONARY from '@/views/common/dictionary'

    // 血液结果列表
    const BloodResult = [
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
            title: '身份证',
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
            title: '结果录入状态',
            name: 'bloodResultEntryStatus',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.inputStatus1
        },
        {
            type: 'daterange',
            title: '采血日期',
            width: 9,
            name: 'date',
            startTime: 'beginDate',
            endTime: 'endDate',
            format: 'yyyy-MM-dd'
        },
      ]

export {
    BloodResult as searchConfig
}
