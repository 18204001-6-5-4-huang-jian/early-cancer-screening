/**
 * @date 2019/3/1
 * @Description: tableCom 的属性配置项
 */

//受试者列表
const subjectTB = {
    oneCol: {
        isShow: true,
        type: 'selection',
        width: '50'
    },
    tableProps: [{
        prop: 'surverId',
        label: 'SID/问卷ID',
        width: '140' //如果不设置宽度，可不写
    }, {
        prop: 'name',
        label: '姓名',
        width: '100'
    }, {
        prop: 'sex',
        label: '性别',
        width: '50',
        isFilter: true,
        filter: 'sexFilter'
    },
    {
        prop: 'age',
        label: '年龄',
        width: '50',
    },
     {
        prop: 'idCard',
        label: '身份证号',
        width: '180'
    }, {
        prop: 'phone',
        label: '手机号',
        width: '120'
    }, 
    {   
        prop:'riskResult',
        label: '评估结果',
        width: '120'
    },{
        prop: 'itemOnly',
        label: '所属项目',
        isFilter: true,
        filter: 'itemsUnderItFilter',
        width: '100'
    }, {
        prop: 'entryCategory',
        label: '分组状态',
        isFilter:true,
        filter:'groupStatusFilter',
        width: '100'
    }, 
    {
        prop: 'deptName',
        label: '所属机构',
        width: '140'
    },
    {
        prop: 'ctStatus',
        label: '低剂量CT',
        width: '140'
    },
    {
        prop: 'rxcsStatus',
        label: '乳腺超声',
        width: '140'
    },
    {
        prop: 'rxxxStatus',
        label: '乳腺X线',
        width: '140'
    },
    {
        prop: 'gaStatus',
        label: '肝癌三项',
        width: '140'
    },
    {
        prop: 'sxhdStatus',
        label: '上消内镜',
        width: '140'
    },
    {
        prop: 'cjStatus',
        label: '结直肠镜',
        width: '140'
    }]
}

export {
    subjectTB
}
