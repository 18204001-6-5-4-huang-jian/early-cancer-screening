import DICTIONARY from '@/views/common/dictionary'

    const COLORECTA = [
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
            name: 'entryCategory',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.groupStatus
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
            title: '肠镜筛查结果',
            name: 'screeningResult',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.colorectaResult
        }]

export {
    COLORECTA
}
