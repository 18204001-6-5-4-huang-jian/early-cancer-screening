<template>
<div class="checkproject-container">
  <Navbar :imgShow="imgShow"></Navbar>
  <div class="conWrap">
    <div class="container_con">
      <el-row :gutter="50">
        <el-col :span="12" v-if="projectShow">
          <div class="grid-content bg-purple">
            <div class="block clearfix">
              <div class="blockImg fl">
                <img src="../../assets/img/item1.png" alt="">
              </div>
              <div class="blockTips fl">
                <div>
                  <div class="h4">早诊早治</div>
                  <div class='center'>
                      <p @click="openSelectProject"><i></i>城市癌症早诊早治</p>
                      <p class="gray"><i></i>淮河癌症早诊早治</p>
                      <p class="gray"><i></i>其他癌症早诊早治</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="block" style="margin:0 auto;">
              <div class="blockImg fl">
                <img src="../../assets/img/item4.jpg" alt="">
              </div>
              <div class="blockTips fl grayTips">
                <div class="h4">癌症登记</div>
                  <div class='center'>
                      <p><i></i>癌症发病上报入口</p>
                      <p><i></i>癌症死亡上报入口</p>
                      <p><i></i>癌症监测数据查看</p>
                  </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="50">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="block clearfix">
              <div class="blockImg fl">
                <img src="../../assets/img/item3.jpg" alt="">
              </div>
              <div class="blockTips fl grayTips">
                <div class="h4">科研项目</div>
                  <div class='center'>
                      <p><i></i>科研项目申请</p>
                      <p><i></i>我的科研项目</p>
                  </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="block clearfix">
              <div class="blockImg fl">
                <img src="../../assets/img/item2.jpg" alt="">
              </div>
              <div class="blockTips fl grayTips">
                <div class="h4">大数据分析</div>
                  <div class='center'>
                      <p><i></i>危险因素分布</p>
                      <p><i></i>多维统计检索</p>
                  </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 选择角色弹窗 -->
      <CheckProject :dialogVisible="dialogVisible" @closeDialog="closeDialog" v-on:checkNum="checkNum"  v-on:deptroleThisFun="deptroleThisFun"></CheckProject>

    </div>
  </div>
  
</div>
  
</template>

<script>
import CheckProject from "../common/SelectProject.vue"
import { Navbar } from 'views/layout';
  export default {
    name: 'checkProject',
    data() {
      return {
        dialogVisible:false,
        projectShow:false,
        imgShow:true,   //logo
        deptrole:[],
        deptNum:null,         //角色数量
        deptId_roleId:null    //角色拼接
      }
    },
    components:{
      CheckProject,
      Navbar
    },
    mounted(){
     if(window.sessionStorage.getItem('project').indexOf('zzzz')>-1){
       this.projectShow=true;
     }
    },
    methods: {
      checkNum(val){
        this.deptNum=val;
      },
      deptroleThisFun(val){
        this.deptId_roleId=val
      },
      openSelectProject(){
        if(this.deptNum>1){
          this.dialogVisible=true;
        }else{
          //只有1个角色的无需弹窗
          if(this.deptId_roleId){
              sessionStorage.setItem('deptName',this.deptId_roleId[0].deptName);  
              this.$axios_http({
                url: "/base/system/find/resources",
                data: this.deptId_roleId[0],
                vueObj: this
              }).then((res)=> {
                if(res.data.status=="SUCCESS"){
                  if(res.data.result.menu.child[0].url=='/'){
                    this.$router.push(res.data.result.menu.child[0].child[0].url);
                  }else{
                    this.$router.push(res.data.result.menu.child[0].url);
                  }
                  
                  let btnArr=res.data.result.buttons;
                  let pageArr=res.data.result.pages;
                  localStorage.setItem('btnArr',btnArr);    //设置btnArr
                  for (var i = 0; i < btnArr.length; i++) {
                    this.hasAuth(btnArr[i]);
                  }
                  for(var j=0;j<pageArr.length;j++){
                    this.hasAuth(pageArr[j]);
                  }
                  localStorage.setItem('allAuthResource',JSON.stringify(res.data.result.menu.child));  
                
                }
              })
          }
        }
        
      },
      hasAuth(authName){
            localStorage.setItem(authName,authName)
      },
       //   关闭树弹窗
      closeDialog(val){
        this.dialogVisible=val;
      },
    },
    created() {
    },
    destroyed() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .checkproject-container{
     position: absolute;
     left: 0;
     top: 0;
     right: 0;
     bottom: 0;
     background: #ffffff;
  }
  .conWrap{
     position: absolute;
     left: 0;
     top: 66px;
     right: 0;
     bottom: 0;
     border-top: 1px solid #E9EDF0;
     background: url('../../assets/img/white_bg.png') no-repeat;
     background-size: 100% 100%;
     overflow: hidden;
     display: flex;
     justify-content: center;
     align-items: center;
  }
  .container_con {
    width: 1200px;
    h5 {
      font-size: 24px;
      color: #000;
      text-align: center;
      line-height: 1;
      margin-top: 95px;
      padding-bottom: 20px;
      /*margin-bottom: 45px;*/
    }
    .tips {
      font-size: 16px;
      color: #5b5b5b;
      text-align: center;
      line-height: 30px;
    }
    .ico {
      position: relative;
      .el-icon-arrow-down {
        font-size: 24px;
        font-weight: bold;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 50px;
      }
      .el-icon-arrow-down:before {
        color: #21a4ff;
      }
    }
    .el-row {
      margin: 40px auto;
      /*margin:120px auto 0;*/
    }

  }

  .block {
    width: 580px;
    height: 276px;
    background: #fff;
    background: #FFFFFF;
    border: 1px solid #E8E8E8;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.07);
    .el-col {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    img {
      height: 276px;
      width: 317px;
    }

    .h4 {
      font-size: 20px;
      border-bottom: 1px solid #E8E8E8;
      line-height: 1;
      color: #000;
      // margin:20px 10px 25px 35px;
      margin: 15px 35px;
      padding-bottom: 20px;
    }
    p {
      padding-left: 55px;
      font-size: 14px;
      color: #333;
      line-height: 24px;
    }
    p.gray{
      color: #999;
      i{
        background: #aaa;
      }
    }
  }
.blockTips{
  width: 261px;
}
  .center {
    margin-top: 15px;
  }

  .center p {
    margin-bottom: 3px;
    position: relative;
    padding-left: 50px;
    height: 30px;
    line-height: 30px;
    i {
      position: absolute;
      width: 6px;
      height: 6px;
      background: #153451;
      border-radius: 50%;
      top: 50%;
      left: 35px;
      transform: translateY(-50%);
    }
  }
  .center p:nth-child(1):hover{
    background: #EAEEF1;
    cursor: pointer;
  }
  .grayTips{
    position: relative;
    background: rgba(6,6,6,0.40);
    width: 261px;
    height: 276px;
    h4{
      font-size: 20px;
      line-height: 1;
      color: #000;
      font-weight: normal;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%)
    }
  }
  .center p:nth-child(1):hover{
    background:none;
  }
  .block .grayTips .h4{
    border-bottom:1px solid #666;
  }
</style>

