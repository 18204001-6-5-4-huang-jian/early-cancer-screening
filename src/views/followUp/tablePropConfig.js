/**
 * @date 2019/3/1
 * @Description: tableCom 的属性配置项
 */

//审核列表
const FOLLOWTB = {
    oneCol: {
        isShow: true,
        type: 'selection',
        width: 50
    },
    tableProps: [{
        prop: 'projectYear',
        label: '评估年度',
        width: '100'
    }, {
        prop: 'qid',
        label: 'QID',
        width: '150' //如果不设置宽度，可不写
    }, {
        prop: 'idCard',
        label: '身份证号',
        width: '180'
    }, {
        prop: 'userName',
        label: '姓名',
        width: '100'
    }, {
        prop: 'sex',
        label: '性别',
        isFilter: true,
        width: '60',
        filter: 'sexFilter'
    }, {
        prop: 'age',
        label: '年龄',
        width: '60',
    }, {
        prop: 'phone',
        label: '手机号',
        width: '110'
    }, {
        prop: 'deptProvinceName',
        label: '所属省市',
        width: '150'
    }, {
        prop: 'jtAddressProvince',
        label: '家庭住址省',
        width: '150'
    }, {
        prop: 'jtAddressCity',
        label: '家庭住址市',
        width: '150'
    }, {
        prop: 'jtAddressDetail',
        label: '家庭住址具体',
        width: '150'
    }, {
        prop: 'workAddress',
        label: '工作单位',
        width: '150'
    }, {
        prop: 'itemsUnderIt',
        label: '所属项目',
        isFilter: true,
        width: '100',
        filter: 'itemsUnderItFilter'
    }, {
        prop: 'pgResult',
        label: '评估结果',
        width: '150'
    }, {
        prop: 'scResult',
        label: '筛查结果',
        width: '150'
    }, {
        prop: 'followStatus',
        label: '随访状态',
        isFilter: true,
        filter: 'formStatus'
    }, {
        prop: 'lossFollow',
        label: '是否失访',
        isFilter: true,
        filter: 'missFollow'
    }, {
        prop: 'followSource',
        label: '随访来源',
        isFilter: true,
        filter: 'followSource'
    }]
}

export {
    FOLLOWTB
}