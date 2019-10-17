<template>
  <div class="cancer-wrap" :class="{'cancer-margin--b15': isBorder}">
    <div class="cancer-wrap-box">
      <P class="cancer-wrap__title" :class="{'cancer-margin--b15': isBorder}">
        <slot name="title"></slot>
      </P>
      <p class="cancer-wrap__pre-button">
        <slot name="pre-button"></slot>
      </p>
      <div class="cancer-wrap__button">
        <slot name="sub-button"></slot>
      </div>
      <div class="cancer-wrap__content cancer-margin--t15">
        <slot></slot>
      </div>
      <p class="cancer-wrap__button">
        <slot name="bottom-button"></slot>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'cancer-widget',
    props: {
      isBorder: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {

      }
    }
  }
</script>
<style scoped lang="scss">
  .cancer-wrap {
    background: #fff;
    box-sizing: border-box;
    padding: 15px 20px 10px;
    margin: 20px;
  }
  .cancer-wrap__title {
    font-size: 16px;
    color: #606266;
  }
  .cancer-wrap__button {
    display: flex;
    justify-content: flex-end;
    .el-button--small {
      position: relative;
      z-index: 9;
    }
  }
  .cancer-wrap__pre-button {
    display: flex;
    justify-content: space-between;
  }
  .cancer-wrap__content {

  }
</style>