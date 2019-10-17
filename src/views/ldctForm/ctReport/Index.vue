<template>
<cancer-widget>
  <div class="content-page">
    <div class="report">
      <!-- <div v-if="$store.state.hospitalType == 1" class="button-group">
        <el-radio-group v-model="button" v-if="$route.query.type == 3 || $route.query.type == 4 " @change="buttonChange">
          <el-radio-button :label="1" >国家CT诊断报告单</el-radio-button>
          <el-radio-button :label="2" >地区CT诊断报告单</el-radio-button>
        </el-radio-group>
      </div> -->
      <div>
          <span>
         <CTexaminationReport v-if="button == 1" :id="$route.query.nationId" :type="nationType" :button="button"></CTexaminationReport>
      </span>
        <span>
        <CTexaminationReport v-if="button == 2" :id="$route.query.areaId" :type="areaType" ref="area-report" :button="button"></CTexaminationReport>
      </span>
      </div>

    </div>
  </div>
</cancer-widget>
</template>

<script>
  import CTexaminationReport from './CTexaminationReport.vue'
  export default {
    components:{
      CTexaminationReport,
    },
    name: 'Right',
    data () {
        return{
            type:'',
          button:'2',
          nationType:'',
          areaType:'',
        }
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){
          if(this.$route.query.type == 1){
              this.areaType = 1
          }else if(this.$route.query.type == 2){
              this.areaType = 2
          }else if(this.$route.query.type == 3){
              this.nationType =1
              this.areaType = 2
              this.button = 1
          }else if(this.$route.query.type == 4){
              this.nationType = 2
              this.areaType = 2
              this.button = 1
          }
          console.log(this.areaType,111)
      },
      buttonChange(value){
          console.log(value)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .report{
     margin-left: 10px;
   }
  .content-page{
    background: #fff;
  }
   .print {
     float: right;
   }
  .button-group{
    position: relative;
    left:-10px;
  }
</style>
