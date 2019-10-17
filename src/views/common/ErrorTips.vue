<template>
  <cancer-widget>
    <div class="errorBox">
      <p class="title">提示区</p>
      <div class="tips">
        <p class="red"><span>1、</span>身份证号码有误</p>
        <p class="red"><span>1、</span>身份证号码有误</p>
      </div>
    </div>
  </cancer-widget>
</template>
<script>
  export default {
    data () {
      return {
        
      }
    },
    mounted(){
   
    },
    methods: {
     
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
.errorBox{
  width: 300px;
  .title{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .red{
    color: red;
  }
}

</style>
