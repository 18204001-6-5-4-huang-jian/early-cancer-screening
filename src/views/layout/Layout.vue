<template>
	<div class="app-wrapper">
    <div class="nav-wrapper">
      <navbar :loginName="loginName" :deptName="deptName"></navbar>
    </div>
		<div :class="{'sidebar-wrapper':sidebar.opened,'sidebar-wrapper-hidden':sidebar.opened == false}">
			<!-- <div class="logo">
				<img src="../../assets/img/login_logo_white.png" alt="logo" :class="{'img-change':sidebar.opened == false}">
				</div> -->
			<sidebar class="sidebar-container"></sidebar>
		</div>
		<div :class="{'main-container':sidebar.opened,'main-container-hidden':sidebar.opened == false}">
			<!-- 面包屑 -->
			<!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left:20px;height:40px;line-height:40px;background:#fff;" class="breadcrumb" v-if="menuList.length==0">
				<el-breadcrumb-item :to="{ path: totalData[0].url }">{{totalData[0].name}}</el-breadcrumb-item>
				<el-breadcrumb-item separator = '/' v-for = "(item,index) in breadlist" :key = 'index' :to="item.path?{path: item.path,query:item.query}:''">
					{{item.name}}
				</el-breadcrumb-item>
			</el-breadcrumb> -->
			<!-- 切换角色，面包屑 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left:20px;height:40px;line-height:40px;background:#fff;" class="breadcrumb" v-if="menuList.length>0 && menuList[0].code!='quality_control_menu'">
				<el-breadcrumb-item :to="{ path: menuList[0].url }">{{menuList[0].name}}</el-breadcrumb-item>
				<el-breadcrumb-item separator = '/' v-for = "(item,index) in breadlist" :key = 'index' :to="item.path?{path: item.path,query:item.query}:''">
					{{item.name}}
				</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- 质控角色,只有质控1个菜单 -->
			<el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left:20px;height:40px;line-height:40px;background:#fff;" class="breadcrumb" v-if="menuList.length>0 && menuList[0].code=='quality_control_menu'">
				<el-breadcrumb-item :to="{ path: menuList[0].url }">{{menuList[0].name}}</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- 主内容区 -->
			<app-main></app-main>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
 import { Navbar, Sidebar, AppMain } from 'views/layout';
  export default {
    name: 'layout',
    components: {
			Navbar,
      Sidebar,
      AppMain
		},
		data(){
			return{
				breadlist:[],
				totalData:[{}],    //左侧菜单
				loginName:null,
				deptName:null
			}
		},
		created(){
			// 首页路由+刷新面包屑
      if(this.menuList.length==0){
				this.totalData=JSON.parse(localStorage.getItem('allAuthResource'));
			}
			// 刷新页面获取面包屑
			this.breadlist=JSON.parse(localStorage.getItem('breadcrumb'));
			this.getMenu()
			
		},
		methods: {
			getMenu() {
				this.$axios_http({
          url: "/base/auth/get/menu",
          data: {},
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
						this.loginName=res.data.result.user.loginName
						this.deptName=res.data.result.user.deptRoleRelationDto.deptName
						 localStorage.setItem('allAuthResource',JSON.stringify(res.data.result.resourceAttr.menu.child)); 
						 sessionStorage.setItem('deptId',res.data.result.user.deptRoleRelationDto.deptId);
						 sessionStorage.setItem('deptName',res.data.result.user.deptRoleRelationDto.deptName);
						 sessionStorage.setItem('roleId',res.data.result.user.deptRoleRelationDto.roleId);
						 sessionStorage.setItem('loginName',res.data.result.user.loginName);
						 sessionStorage.setItem('token',res.data.result.user.token);
						 sessionStorage.setItem('trueName',res.data.result.user.trueName);
						 sessionStorage.setItem('itemsUnderIt',res.data.result.user.deptRoleRelationDto.itemsUnderIt);
						 sessionStorage.setItem('deptmentType',res.data.result.user.deptRoleRelationDto.deptmentType);
						 sessionStorage.setItem('treePath',res.data.result.user.deptRoleRelationDto.treePath);
             this.$store.commit('common/menuList',res.data.result.resourceAttr.menu.child);
             this.$store.commit('common/itemsUnderIt',res.data.result.user.deptRoleRelationDto.itemsUnderIt);
             this.$store.commit('common/treePath',res.data.result.user.deptRoleRelationDto.treePath);
          }
        })
			},
		},
    computed: {
			...mapState('common', ['menuList']),
			sidebar(){
        return this.$store.state.common.sidebar
      }
		},
		watch: {
      $route() {
				this.breadlist=this.$route.meta.routeList
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.app-wrapper {
		.sidebar-wrapper {
			// width: 225px;
			width: 180px;
			position: fixed;
			height:100%;
			top: 0;
			left: 0;
			z-index: 34;
		}
		.sidebar-wrapper-hidden{
      width:60px;
			position: fixed;
			height:100%;
			top: 0;
			left: 0;
			z-index: 34;
		}
		.logo{
				// background: #2653A6;
				background: rgb(48, 65, 86);
				height: 64px;
				position: relative;
				img{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
				}
				.img-change{
					width: 40px;
					height: 16px;
				}
			}
		.main-container {
			transition: all .28s ease-out;
			margin-left: 180px;
      // margin-top: 86px;
			margin-top: 64px;
		}
		.main-container-hidden{
      transition: all .28s ease-out;
			margin-left: 60px;
      // margin-top: 86px;
			margin-top: 64px;
		}
    .nav-wrapper{
      width:100%;
      // position: fixed;
      // top: 0;
      // left: 0;
      z-index: 2;
      overflow: hidden;
      transition: all .28s ease-out;
    }
	}
	.breadcrumb{
		position: relative;
	}
	.breadcrumb:after{
    content: "";
		position: absolute;
		width: 98%;
		height: 1px;
		top: 0px;
		left: 1%;
		background-color: #E9EDF0;
	}
</style>
<style <style lang="scss">
 	.sidebar-wrapper-hidden .el-submenu__title i{
		 color: transparent;
	 }
	 .sidebar-wrapper-hidden{
		 .el-menu .zmd_home_info_menu, .el-menu .scjg_home_info_menu, .el-menu .gljg_home_info_menu, .el-menu .gj_home_info_menu{
			 background-position: 22px 18px !important;
		 }
		 .el-menu .project_mangement_menu .el-submenu__title{
			 background-position: 22px 18px !important;
		 }
		 .el-menu .task_management_menu .el-submenu__title{
			 background-position: 22px 18px !important;
		 }
		 .el-menu .subject_management_menu{
			 background-position: 22px 18px !important;
		 }
		 .el-menu .scjg_subject_management_menu{
			 background-position: 22px 18px !important;
		 }
		 .el-menu .booking_management_menu .el-submenu__title{
            background-position: 22px 18px !important;
		}
		.el-menu .measurement_management_menu .el-submenu__title{
			background-position: 22px 18px !important;
		}
		.el-menu .biology_management_menu .el-submenu__title{
			background-position: 22px 18px !important;
		}
		.el-menu .screening_management_menu .el-submenu__title{
		   background-position: 22px 18px !important;
		}
		.el-menu .result_write_menu .el-submenu__title{
			background-position: 22px 18px !important;
		}
		.el-menu .quality_control_menu{
			background-position: 22px 18px !important;
		}
		.el-menu .zm_screening_menu .submenu__title{
			background-position: 22px 18px !important;
		}
		.el-menu .data_statistics_menu .el-submenu__title{
			background-position: 22px 18px !important;
		}
		 .el-menu .follow_up_management_menu .el-submenu__title{
            background-position: 22px 18px !important;
		}
		.el-menu .zmd_subject_management_menu{
             background-position: 23px 18px !important;
		}
	 }
</style>

