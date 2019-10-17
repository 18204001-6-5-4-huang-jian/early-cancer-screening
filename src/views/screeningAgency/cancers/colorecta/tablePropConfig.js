/**
 * @date 2019/3/1
 * @Description: tableCom 的属性配置项
 */

const COLORECTATB = {
    oneCol: {
        isShow: true,
        type: 'selection',
        width: 50
    },
    tableProps: [{
            prop: 'surverId',
            label: 'SID/问卷ID',
            width: '150' //如果不设置宽度，可不写
        }, {
            prop: 'personName',
            label: '姓名',
            width: '100'
        }, {
            prop: 'sex',
            label: '性别',
            width: '50',
            isFilter: true,
            filter: 'sexFilter'
        }, {
            prop: 'idCard',
            label: '身份证号',
            width: '180'
        }, {
            prop: 'phone',
            label: '手机号',
            width: '120'
        }, {
            prop: 'itemsUnderIt',
            label: '所属项目',
            isFilter: true,
            filter: 'itemsUnderItFilter'
        }, {
            prop: 'entryCategory',
            label: '分组状态',
            isFilter: true,
            filter: 'groupStatusFilter',
        }, {
            prop: 'resultInputStatus',
            label: '结果录入状态',
            isFilter: true,
            filter: 'inputCancerFilter',
        },
        {
            prop: 'pathologyEnterStatus',
            label: '病理结果',
            isFilter: true,
            filter: 'inputCancerFilter',
        }, {
            prop: 'checkDate',
            label: '检查日期',
            isFilter: true,
            filter: 'dateFilter',
        }, {
            prop: 'screeningResult',
            label: '肠镜筛查结果',
            isFilter: true,
            filter: 'colorectaResultSGFilter',
        }, {
            prop: 'deptName',
            label: '所属机构',
            width: '180'
        }
    ]
}

export {
    COLORECTATB
}