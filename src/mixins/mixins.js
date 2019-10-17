/**
 * Created by sunwd on 2018/9/28.
 * 定义混合对象
 */
import { Message } from 'element-ui'
let mixin = {
  data () {
    return {
      startTime: '',  // 开始时间
      endTime: '',    // 结束时间
    }
  },
  methods: {
    /**
     * 获取权限
     */
    dialogAuth (dialogObj,name) {
      if(window.localStorage.getItem(name)==name){
        dialogObj[name]=true
      }else{
        Message.error('抱歉，您没有该权限！')
      }
    },

    // 页面权限
    checkPageAuth (obj,pageName,btnData) {
      if (window.localStorage.getItem(pageName) == pageName) {
        obj[pageName] = true;
        if (obj[pageName] == true) {
          for (var i in btnData) {
            if (window.localStorage.getItem(i) == i) {
              btnData[i] = true;
            }
          }
        }
      } else {
        console.log("没有页面权限")

        this.$failMsg(this, "对不起，您没有此页面的权限，请联系管理员.")
        window.history.go(-1)
        setTimeout(function () {
          this.$router.go(0)
        }, 200)

      }
    },

    // 返回上一页
    goBack () {
      this.$router.go(-1)
    },

    // 正确提示框
    $successMsg (obj,content,customDuration){
      var successMsg = "操作成功."
      var durationValue = 3000
      if(content){
        successMsg = content
      }
      if(customDuration){
        durationValue = customDuration
      }
      obj.$message({
        message: successMsg,
        duration: durationValue,
        type: 'success'
      });
    },

    // 错误提示框
    $failMsg (obj,content,customDuration){
      var failMsg = "失败"
      var durationValue = 3000
      if(content){
        failMsg = content
      }
      if(customDuration){
        durationValue = customDuration
      }
      if(obj){
        obj.$message.error({
          message: failMsg,
          duration: durationValue,
          type: 'success'
        });
      }
    },
    /**
     * 请求
     * @param data => 参数对象
     * @returns {Promise<*>}
     */
    async requestTable (data) {
      let {url, currentObj, params, tag} = data
      let query = Object.assign({
        pageNum: currentObj.pageNum || 1,
        pageSize: currentObj.pageSize || 10
      }, params)
      const {data: {status, result}} = await this.$axios_http({url,method:'post', data:query, tag})
      if (status === 'SUCCESS') {
        return Object.assign({}, currentObj, result)
      }
    },
    /**
     * 路由跳转公共方法抽取
     * @params 对象类型
     * @param source => 页面来源
     * @param id => id
     * @param flag => 标识
     */
    jumpToPage (path, {id,flag,source}={}) {
      let obj = {}
      !!id && (obj['id']=id)
      !!flag && (obj = {...obj,flag})
      !!source && (obj = {...obj,source})

      this.$router.push({
        path: path,
        query: obj
      })
    },
    /**
     * 通用，当日历控件值发生变化时候触发
     * @param params 时间参数
     */
    timeChange (params) {
      if (params) {
        this.startTime = params.startTime
        this.endTime = params.endTime
      }
    },
    // 待预约类型
    checkProjetType(){
      if(this.$route.path.indexOf('/appointment/ct')>-1 || this.$route.query.resource=='ct'){
        return "ct";
      }else if(this.$route.path.indexOf('/appointment/enteroscopy')>-1 || this.$route.query.resource=='cj'){
        return "cj";
      }else if(this.$route.path.indexOf('/appointment/ultrasonic')>-1 || this.$route.query.resource=='rxcs'){
        return "rxcs";
      }else if(this.$route.path.indexOf('/appointment/xline')>-1 || this.$route.query.resource=='rxxx'){
        return "rxxx";
      }else if(this.$route.path.indexOf('/appointment/digestive')>-1 || this.$route.query.resource=='sxhdnj'){
        return "sxhdnj";
      }else if(this.$route.path.indexOf('/appointment/liver')>-1 || this.$route.query.resource=='gcs') {
        return "gcs";
      }
    },

    //表单打印
    printFromContent (element) {
      let subOutputRankPrint = document.getElementById(element);
          subOutputRankPrint.style.width= 650+'px'
      let inputs=document.getElementsByClassName('el-input__inner');
      let textareas=document.getElementsByClassName('el-textarea__inner');
      for (let i = 0; i < textareas.length; i++) {
            textareas[i].innerHTML = textareas[i].value
            textareas[i].style.height = parseInt(textareas[i].scrollHeight+20)+'px'
        }
      for(let i=0;i<inputs.length;i++){
        inputs[i].setAttribute("value",inputs[i].value)
      }
      let newContent = subOutputRankPrint.innerHTML;
      let oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      window.print();
      window.location.reload();
      document.body.innerHTML = oldContent;
      return false;
    },

   /**
     * 根据base64 内容 取得 bolb
     * @param dataURI
     * @returns Blob
     */
    getBlobBydataURI(dataURI,type) {
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type:type });
    },

    // 数组排序（从小到大）
    sortArray(arr) {
      let min;
      for(let i = 0;i<arr.length; i++){
        for(let j=i;j<arr.length; j++) {
          if(Number(arr[i])>Number(arr[j])){
            min=arr[j];
            arr[j]=arr[i];
            arr[i]=min;
          }
        }
      }
      return arr;
    }
  }
}

export default mixin
