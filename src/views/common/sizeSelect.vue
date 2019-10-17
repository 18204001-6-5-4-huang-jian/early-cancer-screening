<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
        <!-- 字体大小 -->
      <!-- <i class="el-icon-share"></i> -->
      <img src="../../assets/img/size.png" alt="" width="18px" height="18x" style="vertical-align:middle;"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="size==='medium'" command="medium">Medium</el-dropdown-item>
      <el-dropdown-item :disabled="size==='small'" command="small">Small</el-dropdown-item>
      <el-dropdown-item :disabled="size==='mini'" command="mini">Mini</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  data(){
      return{
       
      }
  },
  mounted() {
    
  },
  computed: {
    size() {
      return this.$store.state.common.size
    }
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size;
      console.log(size);
      this.$store.commit('common/size',size);
      this.refreshView();
      this.$message({
        message: 'Switch Size Success',
        type: 'success'
      })
    },
    refreshView() {
      //In order to make the cached page re-rendered
      this.$store.dispatch('common/delAllCachedViews', this.$route)
      const { fullPath } = this.$route;
      this.$nextTick(() => {
        this.$router.replace({
          path:fullPath
        })
      })
      // this.$router.go(0);
    }
  }
}
</script>
<style scoped>

</style>

