import DICTIONARY from '@/views/common/dictionary'

    // 审核列表
    const FOLLOW = [
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
            title: '分组状态',
            name: 'groupStatus',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.groupStatus
        },
        {
            type: 'daterange',
            title: '评估日期',
            width: 9,
            name: 'date2',
            startTime: 'beginDate',
            endTime: 'endDate',
            format: 'yyyy-MM-dd'
        }]

export {
    FOLLOW
}
