const API = {
  // 用户列表
  USER_LIST: {
    url: '/base/sys/role/findRolesByDept/',
  }
}
export default {
  methods: {
    // 获取用户列表
    async getDeptroleData (deptid,index) {
      const {data: {status, result}} = await this.$axios_http({
        url:API.USER_LIST.url + deptid,
        method:'post',
        data: {},
        vueObj: this
      })
      if (status === 'SUCCESS') {
        // 清空 所选的账户角色
        this.formData.userRoleDtoList[index].roleId = null;
        // 赋值
        this.formData.userRoleDtoList[index].deptroleList = [...result];
        this.formData.userRoleDtoList[index].show = true;
        // console.log(this.formData.userRoleDtoList)
        
      }
    }
  }
}