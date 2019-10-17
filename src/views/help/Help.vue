<template>
  <div>
    <cancer-widget>
      <p>用户手册</p>
      <div class="text item" v-for="item in docList" :key="item.key">
        <a :href="serverName+'/base/file/downfile?filePath=/bzwd/doc/'+item.code">{{item.name}}</a>
      </div>
    </cancer-widget>
  </div>
</template>
<script>
  export default {
    name: 'help',
    data() {
      return {
        docList:[{
          key:'1',
          name:'国家癌症防控信息管理平台_招募机构_用户手册.pdf',
          code:'zmjg_bzwd.pdf'
        },
        {
          key:'2',
          name:'国家癌症防控信息管理平台_筛查机构_用户手册.pdf',
          code:'scjg_bzwd.pdf'
        },
        {
          key:'3',
          name:'国家癌症防控信息管理平台_省级管理机构_用户手册.pdf',
          code:'sjjg_bzwd.pdf'
        },
        {
          key:'4',
          name:'国家癌症防控信息管理平台_国家管理机构_用户手册.pdf',
          code:'gjjg_bzwd.pdf'
        },
        {
          key:'5',
          name:'RCT 防控信息管理平台_省级机构_用户手册.pdf',
          code:'rct_sj_bzwd.pdf'
        },
        {
          key:'6',
          name:'RCT 信息管理平台_招募机构_用户手册.pdf ',
          code:'rct_zm_bzwd.pdf'
        },
        {
          key:'7',
          name:'RCT 防控信息管理平台_筛查机构_用户手册.pdf',
          code:'rct_sc_bzwd.pdf'
        }
        ],
        serverName:SERVER_NAME,
      }
    },
    methods: {
      downLoad () {
         this.$axios_http({
          url: "/base/measurement/hosFobtResultPO/getListAndCount",
          data: {},
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
          }
        })
      }
    },
    created() {
    }
  }
</script>
<style scoped lang="scss">
.text {
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
  }

  .item {
    padding: 18px 0;
  }
</style>