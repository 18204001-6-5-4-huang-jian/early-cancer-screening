import axios from 'axios'
import router from '@/router'
export default {
  install (Vue) {
    Vue.prototype.$axios_http = $axios_http
  }
}
var clientStatus = 1 //刷新整个页面时，可能会调用多个http请求，用此标记只弹一次

//封装axios http请求，用于全局请求token失效时，重置token 或 跳转至登录页面
export const $axios_http = function (obj) {
  // 获取vue对象
  let _vueObj=null;
  if(obj.vueObj){
    _vueObj=obj.vueObj;
  }else{
    _vueObj=this;
  }
  return new Promise((resolve,reject) =>{
    //请求时加入遮罩层
    axios({
      method:obj.method?obj.method:'POST',
      url:global.SERVER_NAME + (obj.url?obj.url:'/'),
      data:obj.data?obj.data:"",
      withCredentials:true,
      responseType:obj.responseType?obj.responseType:'json'
    }).then((res) => {
      if(res.data.status=="ERROR"){
        if(res.data.code!='EVALUATE_VERIFICATION_IDCARD_ERROR' && 
        res.data.code!='IDCARD_YEAR_ERRO' && 
        res.data.code!='SURVERID_QUERY_ERROR'&& 
        res.data.code!='IDCARD_YEAR_FC_ERRO_ZZ_SUCCESS'){
          // 统一错误提示语
          _vueObj.$message({
            type:'error',
            message:res.data.message
          });
        }
      }
      resolve(res)
    }).catch((err) => {
      // token失效
      if(err.response.data.Code == 'VALIDATE_TOKEN_FAIL' || err.response.status == '401'){
        if(clientStatus == 1){
          _vueObj.$confirm('对不起，您的登录状态已过期，请重新登陆', '提示', {
            confirmButtonText: '确定',
            showCancelButton:false,
            // cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.location.href=BIGPLATFORM_URL
            clientStatus = 1
          });
          clientStatus = 2;
        }
      }
      resolve(res)
    }).catch((err) => {
      reject(err);
    })
  })
}
