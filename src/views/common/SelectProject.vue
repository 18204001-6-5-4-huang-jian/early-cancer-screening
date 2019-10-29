<template>
    <el-dialog title="选择机构" :visible.sync="dialogVisible" :before-close="closeDialog" top="25vh">
        <el-select v-model="deptroleThis" placeholder="请选择机构" style="width:300px;" @change="changeRole()">
          <el-option :value="item.deptId+','+item.roleId" :key="item.deptId+','+item.roleId" :label="item.deptRoleName" v-for="item in deptrole" ></el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog" size="small">取 消</el-button>
          <el-button type="primary" @click="submit" size="small">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
// import {mapMutations} from 'vuex' //引入mapMutations
export default {
  props: ["dialogVisible"],
  data() {
    return {
      deptroleThis: null,
      deptrole: []
    };
  },
  mounted() {
    this.deptroleFun();
  },
  methods: {
    // ...mapMutations(['setAuthResource','add']),
    //查询角色
    deptroleFun() {
      this.$axios_http({
        url: "/base/system/find/deptrole",
        data: {},
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.deptrole = res.data.result;
          this.deptrole.filter(item => {
            item.deptRoleName = item.deptName + " - " + item.roleName;
          });
          //赋值角色
          let deptId = sessionStorage.getItem("deptId");
          let roleId = sessionStorage.getItem("roleId");
          this.deptrole.filter(item => {
            if (item.deptId == deptId && item.roleId == roleId) {
              this.deptroleThis = item.deptId + "," + item.roleId;
            }
          });
          this.$emit("checkNum", res.data.result.length);
          if (res.data.result.length == 1) {
            this.$emit("deptroleThisFun", this.deptrole);
          }
        }
      });
    },
    changeRole(){
       let array = this.deptroleThis.split(',');
       for(let k=0;k<this.deptrole.length;k++){
         if(array[0] == this.deptrole[k].deptId.toString() && array[1] == this.deptrole[k].roleId.toString()){
             sessionStorage.setItem('deptmentType',this.deptrole[k].deptmentType);
         }
       }
    },
    // 选择角色
    submit() {
      let deptId_roleId = this.deptroleThis;
      let _deptId = deptId_roleId.split(",")[0];
      let _roleId = deptId_roleId.split(",")[1];
      let obj;
      this.deptrole.filter(item => {
        if (item.roleId == _roleId && item.deptId == _deptId) {
          obj = item;
        }
      });
      // 存储登录人的机构
      sessionStorage.setItem("deptName", obj.deptName);
      sessionStorage.setItem("deptmentType", obj.deptmentType);
      sessionStorage.setItem("deptId", obj.deptId);
      this.$store.commit("common/deptNameChange", obj.deptName);
      this.$axios_http({
        url: "/base/system/find/resources",
        data: obj,
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.$emit("closeDialog", false);
          if (res.data.result.resourceAttr.menu.child[0].url == "/") {
            if (
              this.$route.path == res.data.result.resourceAttr.menu.child[0].child[0].url
            ) {
              //页面刷新
              this.$router.go(0);
            } else {
              this.$router.push(res.data.result.resourceAttr.menu.child[0].child[0].url);
            }
          } else {
            if (this.$route.path == res.data.result.resourceAttr.menu.child[0].url) {
              //页面刷新
              this.$router.go(0);
            } else {
              this.$router.push(res.data.result.resourceAttr.menu.child[0].url);
            }
          }
          sessionStorage.setItem('itemsUnderIt',res.data.result.itemsUnderIt);
          let btnArr = res.data.result.resourceAttr.buttons;
          let pageArr = res.data.result.resourceAttr.pages;
          localStorage.setItem("btnArr", btnArr); //设置btnArr
          for (var i = 0; i < btnArr.length; i++) {
            this.hasAuth(btnArr[i]);
          }
          for (var j = 0; j < pageArr.length; j++) {
            this.hasAuth(pageArr[j]);
          }
          localStorage.setItem(
            "allAuthResource",
            JSON.stringify(res.data.result.resourceAttr.menu.child)
          );
          this.$store.commit("common/menuList", res.data.result.resourceAttr.menu.child);
        }
      });
    },
    hasAuth(authName) {
      localStorage.setItem(authName, authName);
    },
    // 关闭弹窗
    closeDialog() {
      this.$emit("closeDialog", false);
    }
  }
};
</script>