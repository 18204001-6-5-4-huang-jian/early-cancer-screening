/**
 * @date 2019/7/31
 * @Description: tableCom 的属性配置项
 */

const TABLECOLUMN = {
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
            prop: 'resultInputStatus',
            label: '结果录入状态',
            isFilter: true,
            filter: 'inputCancerFilter',
        },
        // {
        //     prop: 'resultStatus',
        //     label: '筛查结果(胃)',
        //     isFilter: true,
        //     filter: 'screeningResultWFilter',
        // },{
        //     prop: 'esophagusResultStatus',
        //     label: '筛查结果(食管)',
        //     isFilter: true,
        //     filter: 'rscreeningResultSGFilter',
        // }, 
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
            prop: 'esophagusScreeningResult',
            label: '食管筛查结果',
            isFilter: true,
            filter: 'rscreeningResultSGFilter',
        }, {
            prop: 'gastricScreeningResult',
            label: '胃筛查结果',
            isFilter: true,
            filter: 'screeningResultWFilter',
        }, {
            prop: 'deptName',
            label: '所属机构',
            width: '180'
        }
    ]
}

export {
    TABLECOLUMN
}