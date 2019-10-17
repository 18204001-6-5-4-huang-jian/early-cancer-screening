<template>
	<div>
    <el-menu 
    mode="vertical" 
    background-color="#304156" 
    text-color="#bfcbd9" 
    active-text-color="#409EFF" 
    router 
    :default-active="$route.path" 
    :collapse="isCollapse" 
    :collapse-transition="false" 
    @open="handleOpen" 
    @close="handleClose"
    @select="handleSelect">
      <div v-for="(totalItem,index) in  totalData" :key="totalItem.id" v-if="menuList.length==0">
        <el-submenu :index="index+toString()+1" v-if="totalItem.child" :class="totalItem.code">
          <template slot="title">
            <span>{{totalItem.name}}</span>
          </template>
          <el-menu-item-group v-for="item in  totalItem.child" :key="item.id">
            <!-- 仅做早诊的项目没有dna菜单+仅重庆做血液检查 -->
            <el-menu-item 
                :index="item.url+''" 
                v-if="item.code=='dna_result_menu' && itemsUnderIt1!='2'">
                {{item.name}}
            </el-menu-item>
            <el-menu-item 
                :index="item.url+''" 
                v-else-if="item.code=='blood_result_menu' && treePath1 && treePath1.startsWith('0|1|78|')">
                {{item.name}}
            </el-menu-item>
            <el-menu-item 
                :index="item.url+''" 
                v-else-if="item.code!='dna_result_menu' && item.code!='blood_result_menu'">
                {{item.name}}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 没有child -->
        <el-menu-item v-else-if="!totalItem.child" :index="totalItem.url" :key="totalItem.id"  :class="totalItem.code">
          <span slot="title">{{totalItem.name}}</span>
        </el-menu-item>
      </div>
      <!--  -->
      <div v-for="(totalItem,index) in  menuList" :key="totalItem.id" v-if="menuList.length>0">
          <el-submenu :index="index+toString()+1" v-if="totalItem.child"  :class="totalItem.code">
            <template slot="title">
              <span>{{totalItem.name}}</span>
            </template>
            <el-menu-item-group v-for="item in  totalItem.child" :key="item.id">
              <!-- 仅做早诊的项目没有dna菜+仅重庆做血液检查 -->
              <el-menu-item 
                :index="item.url+''" 
                v-if="item.code=='dna_result_menu' && itemsUnderIt!='2'">
                {{item.name}}
            </el-menu-item>
            <el-menu-item 
                :index="item.url+''" 
                v-else-if="item.code=='blood_result_menu' && treePath1 && treePath.startsWith('0|1|78|')">
                {{item.name}}
            </el-menu-item>
            <el-menu-item 
                :index="item.url+''" 
                v-else-if="item.code!='dna_result_menu' && item.code!='blood_result_menu'">
                {{item.name}}
            </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else-if="!totalItem.child" :index="totalItem.url" :key="totalItem.id"  :class="totalItem.code">
            <span slot="title">{{totalItem.name}}</span>
          </el-menu-item>
        </div>
    </el-menu>
	</div>
</template>

<script>
  import {mapState} from 'vuex'
  import path from 'path'
  import { isExternal } from '@/utils'
  import AppLink from '../common/Link.vue'
  export default {
    name: 'SidebarItem',
    /*props:{
 		totalData:{
 			type:Array
 		}
    },*/
    data(){
    	return {
        totalData:[],
        itemsUnderIt1:null,
        treePath1:'0|1',
    	}
    },
     mounted(){
      if(this.menuList.length==0){
        this.totalData=JSON.parse(localStorage.getItem('allAuthResource'));
        // console.log(this.totalData)
      }
      if(!this.itemsUnderIt) {
        this.itemsUnderIt1 = sessionStorage.getItem('itemsUnderIt')
      }
      if(!this.treePath) {
        this.treePath1 = sessionStorage.getItem('treePath')
      }
    },
    components:{
       AppLink
    },
    computed: {
      ...mapState('common', ['menuList']),
      ...mapState('common', ['itemsUnderIt']),
      ...mapState('common', ['treePath']),
      isCollapse(){
        return !this.$store.state.common.sidebar.opened
      }
    },
    methods:{
        handleOpen(key, keyPath) {
          // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          // console.log(key, keyPath);
        },
        handleSelect(index, indexPath){
          localStorage.removeItem('searchParams');
        },
        resolvePath(routePath) {
          if (this.isExternalLink(routePath)) {
            return routePath
          }
          return path.resolve(this.basePath, routePath)
        },
        isExternalLink(routePath) {
          return isExternal(routePath)
        }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.svg-icon {
		margin-right: 15px;
	}
	.hideSidebar .menu-indent {
		display: block;
		text-indent: 10px;
	}
	.activeFat{
		position: relative;
	}
	.setWidth{
		position: absolute;
    left:0;
    top:0;
		padding-left:21%;
		display: block;
		width: 100%;
		height: 100%;
		line-height: 50px;
	}
  .firstMenu a{
    padding-left:0px!important;
  }
</style>
<style>
.el-submenu__title i{
  color:#ffffff;
}
.el-submenu .el-menu-item{
  font-size: 14px;
  height:46px !important;
  line-height: 46px !important;
}
.el-menu .zmd_home_info_menu,.el-menu .scjg_home_info_menu,.el-menu .gljg_home_info_menu,.el-menu .gj_home_info_menu{
  background-image: url(../../assets/img/h.png);
  background-position: 25px 22px;
  background-repeat: no-repeat;
  background-size: 16px;
}
.el-menu .project_mangement_menu .el-submenu__title{
  background-image: url(../../assets/img/xm.png);
  background-position: 26px 23px;
  background-repeat: no-repeat;
  background-size: 13px;
}
.el-menu .task_management_menu .el-submenu__title{
  background-image: url(../../assets/img/rw.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 14px;
}
.el-menu .subject_management_menu,.el-menu .scjg_subject_management_menu,.el-menu .zmd_subject_management_menu{
  background-image: url(../../assets/img/scz.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 14px;
}
.el-menu .booking_management_menu .el-submenu__title{
  background-image: url(../../assets/img/yy.png);
  background-position: 27px 22px;
  background-repeat: no-repeat;
  background-size: 13px;
}
.el-menu .measurement_management_menu .el-submenu__title{
  background-image: url(../../assets/img/pg.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 14px;
}
.el-menu .biology_management_menu .el-submenu__title{
  background-image: url(../../assets/img/sw.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 15px;
}
.el-menu .screening_management_menu .el-submenu__title,.el-menu .follow_management_menu .el-submenu__title,.el-menu .followup_index{
  background-image: url(../../assets/img/sc.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 15px;
}
.el-menu .result_write_menu .el-submenu__title{
  background-image: url(../../assets/img/jg.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 14px;
}
.el-menu .quality_control_menu{
  background-image: url(../../assets/img/zk.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 14px;
}
.el-menu .zm_screening_menu .el-submenu__title{
  background-image: url(../../assets/img/zk.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 14px;
}
.el-menu .data_statistics_menu .el-submenu__title{
  background-image: url(../../assets/img/tj.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 15px;
}
/* 随访 */
.el-menu .follow_up_management_menu .el-submenu__title{
  background-image: url(../../assets/img/suifang1.png);
  background-position: 26px 22px;
  background-repeat: no-repeat;
  background-size: 15px;
}
.el-menu .el-menu-item,.el-menu .el-submenu .el-submenu__title{
  padding-left:58px !important;
  padding-right: 18px !important;
}
/* 二级菜单 */
.el-submenu .el-menu-item{
  background-color:#1f2d3d !important;
}
.el-submenu .el-menu-item:hover{
  background-color:#001528 !important;
}
/* 一级菜单 */
.el-menu-item:hover{
  background-color:#263445 !important;
}
.el-menu-item-group__title{
  padding:0 0 0 20px !important;
}
.el-tooltip{
    left:-13px !important;
}
</style>



