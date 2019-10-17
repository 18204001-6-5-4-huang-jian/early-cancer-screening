import Vue from 'vue';
import Cookies from 'js-cookie'
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import moment from 'moment';
import http from '@/plugin/http'
import '@/directive/directive'
import CommonComponent from '@/components'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/style.css';

import './assets/js/global'

import Axios from "axios"

Vue.prototype.$axios = Axios

Axios.defaults.baseURL = "http://127.0.0.1/"     //配置默认发送请求到http://127.0.0.1/，可改或者加端口号

Vue.use(http);
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})
Vue.use(CommonComponent);
Vue.prototype.$echarts = echarts
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
import filters from './filters/filter'; // 全局vue filter
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


// 设置全局位置变量
if(window.location.href.indexOf('/wh')>-1){
  Vue.prototype.$location='wh'
  window.localStorage.setItem('$location','wh')
}else{
  Vue.prototype.$location=''
}

// 设置全局切换分页获取数据
Vue.prototype.getFormData = function(dom){
  if (this.$refs[dom]) {
    return this.$refs[dom].formData
  }
}

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)

})
Vue.config.productionTip = false;

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm) {
    // console.log(err, window.location.href);
  };
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// 面包屑
let routeList = []
router.beforeEach((to, from, next) => {
  // 刷新页面，获取当前面包屑
  if(localStorage.getItem('breadcrumb')){
    routeList=JSON.parse(localStorage.getItem('breadcrumb'));
  }
  //如果存在路由列表，则把之后的路由都删掉
  if(routeList.length>0){
    routeList.filter((item,i)=>{
      if(to.matched[0].meta.breadNumber==1 && to.meta.breadNumber!=3){
        routeList.splice(0,routeList.length);
      }
      if(item.name==to.name){
        //针对breadNumber==3的情况
        routeList.splice(i,routeList.length-i);
      }
    })
  }
  //追加路由
  if(to.matched.length>1 && to.matched[0].name!='表单' && to.matched[0].name!='项目概况'&& to.matched[0].name!='评估审核' && to.meta.breadNumber!=3){
    let obj={
      name:null,
      query:{}
    }
    obj.name=to.matched[0].name
    obj.query=to.matched[0].query
    routeList.push(obj)
  }
  // 项目概况不追加
  if(to.name!='项目概况'){
    let obj={
      name:null,
      path:null,
      query:{}
    }
    obj.name=to.name
    obj.path=to.path
    obj.query=to.query
    routeList.push(obj)
  }
  localStorage.setItem('breadcrumb',JSON.stringify(routeList))
  to.meta.routeList = routeList
  next()
})


