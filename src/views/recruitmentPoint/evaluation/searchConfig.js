import DICTIONARY from '@/views/common/dictionary'

    // 评估列表
    const EVALUATION = [
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
        // {
        //     type: 'select',
        //     title: '分组状态',
        //     name: 'entryCategory',
        //     optionProps: {
        //         label: 'name',
        //         value: 'id'
        //     },
        //     optionData: DICTIONARY.groupStatus
        // },
        {
            type: 'select',
            title: '评估状态',
            name: 'evaluateStatus',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.evaluateStatus
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
            type: 'text',
            title: '录入人',
            name: 'addUserId'
        },
        // {
        //     type: 'select',
        //     title: '通知状态',
        //     name: 'noticeStatus',
        //     optionProps: {
        //         label: 'name',
        //         value: 'id'
        //     },
        //     optionData: DICTIONARY.noticeStatus
        // },
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
    EVALUATION
}
