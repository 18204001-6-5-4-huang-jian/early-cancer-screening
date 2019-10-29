import DICTIONARY from '@/views/common/dictionary'

    const screeningCollectconfig = [
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
            type: 'text',
            title: '身份证',
            name: 'idCard'
        },
        {
            type: 'select',
            title: '所属项目',
            name: 'itemOnly',
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
            title: 'CT筛查状态',
            name: 'ctReportStatus',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.ScreeningStatus
        },
        {
            type: 'select',
            title: '乳腺X线筛查状态',
            name: 'rxxxReportStatus',
            labelWidth:'130px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.ScreeningStatus
        },
        {
            type: 'select',
            title: '乳腺B超筛查状态',
            name: 'rxcsReportStatus',
            labelWidth:'130px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.ScreeningStatus
        },
        {
            type: 'select',
            title: '上消内镜筛查状态',
            name: 'sxhdReportStatus',
            labelWidth:'130px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.ScreeningStatus
        },
        {
            type: 'select',
            title: '结直肠镜筛查状态',
            name: 'cjReportStatus',
            labelWidth:'130px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.ScreeningStatus
        },
        {
            type: 'select',
            title: '肝超声筛查状态',
            name: 'gaReportStatus',
            labelWidth:'120px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.ScreeningStatus
        },
        {
            type: 'select',
            title: 'CT报告发放',
            name: 'ctReportSendStatus',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.provideStatus
        },
        {
            type: 'select',
            title: '乳腺X线报告发放',
            name: 'rxxxReportSendStatus',
            labelWidth:'130px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.provideStatus
        },
        {
            type: 'select',
            title: '乳腺B超报告发放',
            name: 'rxcsReportSendStatus',
            labelWidth:'130px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.provideStatus
        },
        {
            type: 'select',
            title: '上消内镜报告发放',
            name: 'sxhdReportSendStatus',
            labelWidth:'130px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.provideStatus
        },
        {
            type: 'select',
            title: '结直肠镜报告发放',
            name: 'cjReportSendStatus',
            labelWidth:'130px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.provideStatus
        },
        {
            type: 'select',
            title: '肝超声报告发放',
            name: 'gaReportSendStatus',
            labelWidth:'120px',
            optionProps: {
                label: 'name',
                value: 'id'
            },
            optionData: DICTIONARY.provideStatus
        },
      ]

export {
    screeningCollectconfig as searchConfig
}
