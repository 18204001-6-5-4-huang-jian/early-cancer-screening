/**
 * @date 2019/3/1
 * @Description: tableCom 的属性配置项
 */

//审核列表
const AGENCYTB = {
    oneCol: {
        isShow: true,
        label: '序号',
        type: 'index',
        width: 50
    },
    tableProps: [{
        prop: 'deptName',
        label: '机构名称',
        width: 300
    }, {
        prop: 'deptType',
        label: '机构类型',
        width: 100
    }, {
        prop: 'address',
        label: '机构地址',        
    }]
}

export {
    AGENCYTB
}
