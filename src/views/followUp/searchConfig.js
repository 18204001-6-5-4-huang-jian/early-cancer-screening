import DICTIONARY from '@/views/followUp/dict'

    // 审核列表
    const FOLLOW = [
        {
            type: 'text',
            title: 'QID',
            name: 'qid'
        },
        {
            type: 'text',
            title: '姓名',
            name: 'userName'
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
            name: 'pgResult',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.riskType
        },
        {
            type: 'select',
            title: '筛查结果',
            name: 'scResult',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.followScreeningResult
        },
        {
            type: 'select',
            title: '随访状态',
            name: 'followStatus',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.followUpStatus
        }]

export {
    FOLLOW
}
