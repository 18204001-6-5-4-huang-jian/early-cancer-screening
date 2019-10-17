import DICTIONARY from '@/views/common/dictionary'

const searchData = [{
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
        title: '分组状态',
        name: 'entryCategory',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: DICTIONARY.groupStatus
    }, {
        type: 'select',
        title: '编码录入状态',
        name: 'codeEntryStatus',
        optionProps: {
            label: 'name',
            value: 'id'
        },
        optionData: [{
                id: 1,
                name: '已录入'
            },
            {
                id: 2,
                name: '未录入'
            }
        ]
    }
]

export {
    searchData
}