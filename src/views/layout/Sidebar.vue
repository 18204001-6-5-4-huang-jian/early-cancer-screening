<template>
	<el-menu mode="vertical" router default-active="/home/home">
		<sidebar-item></sidebar-item>
	</el-menu>
</template>
<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    components: { SidebarItem },
    computed:{
      isCollapse(){
        return !this.$store.state.common.sidebar.opened
      }
    },
    methods:{
      
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.sidebar-container.el-menu {
			min-height: 100%;
      background: #304156;
      max-height:100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 64px;
	}
  .logoImg{
        height:20px;
  }
</style>
<style lang="scss">
  .el-menu {
   border-right: 1px solid #304156 !important;
  }
  .el-menu-item.is-active{
    color:#409EFF !important;
    background-color: #182531 !important;
  }
  .el-menu--popup-right-start{
    margin-left:0px !important;
  }
</style>
