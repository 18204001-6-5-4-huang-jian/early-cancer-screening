<template>
  <div class="cancer-search">
    <div class="cancer-search-box">
      <div class="cancer-search__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'cancer-search',
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
<style scoped>
  .cancer-search {
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 20px 20px 25px;
    box-shadow: 0 2px 2px 0 rgba(206, 211, 215, 0.5);
  }
</style>