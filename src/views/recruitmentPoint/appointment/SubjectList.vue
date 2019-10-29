<template>
  <div>
    <cancer-widget>
      <el-form :inline="true" :model="qc" class="demo-form-inline">
        <el-form-item label="受试者姓名:">
          <el-input v-model="qc.name" placeholder="请输入受试者姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="qc.sex" placeholder="请选择" clearable>
            <el-option value="1" v-bind:key="1" label="男"></el-option>
            <el-option value="2" v-bind:key="2" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄:">
          <el-input v-model="qc.minAge" placeholder="请输入大于0的数字" clearable></el-input>
        </el-form-item>
        <el-form-item label="至：">
          <el-input v-model="qc.maxAge" placeholder="最大数字为100" clearable></el-input>
        </el-form-item>
        <el-form-item label="问卷ID:">
          <el-input v-model="qc.surverId" placeholder="请输入受试者问卷ID" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input v-model="qc.idCard" placeholder="请输入身份证号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </cancer-widget>
    <div class="table-con-appointment">
      <cancer-widget>
        <div class="btns fr">
         <el-button type="primary" size="small" @click="selectTableRowFun">确定</el-button>
         <el-button type="default" size="small" @click="goback">取消</el-button>
        </div>
       <AppointmentTable :tableData="tableData" v-on:multipleSelection="multipleSelectionFun"></AppointmentTable>
       <br>
       <el-pagination
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        :current-page="queryResult.pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryResult.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.totalPageCount">
      </el-pagination>
      <br>
     </cancer-widget>
    </div>
  </div>
</template>
<script>
import AppointmentTable from "../../common/AppointmentTable"
import mixin from '@/mixins/mixins'
  export default {
    mixins: [ mixin ],
    data () {
      return {
        activeName: '1',
        tableData:[],
        multipleSelection:[],
        //查询条件
        qc: {
          "name": null,
          "sex": null,
          "minAge": null,
          "maxAge": null,
          "surverId": null,
          "idCard": null,
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
        },
      }
    },
    components:{
      AppointmentTable
    },
    mounted(){
      this.query();
    },
    methods: {
      query(){
        let surverIds=[];
        JSON.parse(localStorage.getItem('selectTableRow')).filter(item =>{
          surverIds.push(item.surverId)
        })
        if(this.qc.minAge>this.qc.maxAge){
            this.$message({
            message: '开始年龄不能大于结束年龄',
            type: 'warning'
          });
          return;
          }
         let _checkProject=this.checkProjetType();
         this.$axios_http({
          url: "/base/booking/getBookingList",
          data: {
                "pageNum":this.queryResult.pageNo,
                "pageSize":this.queryResult.pageSize,
                "checkProject":_checkProject,
                "bookingStatus":this.activeName,    //1--未预约，2--已预约，3--取消预约
                "minAge":this.qc.minAge,
                "maxAge":this.qc.maxAge,
                "name":this.qc.name,
                "sex":this.qc.sex,
                "surverId":this.qc.surverId,
                "idCard":this.qc.idCard,
                "surverIds":surverIds
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.tableData=res.data.result.list;
            this.queryResult.totalPageCount=res.data.result.total;
          }
        })
      },
      multipleSelectionFun(value){
        this.multipleSelection=value
      },
      selectTableRowFun(){
        if(this.multipleSelection.length==0){
          this.$message({
            type:'error',
            message:'请选择一个受试者'
          })
          return;
        }
        let arr=this.multipleSelection.concat(JSON.parse(localStorage.getItem('selectTableRow')));
        localStorage.setItem('selectTableRow',JSON.stringify(arr));
        this.$router.push({path:'/appointment/addappoint',query:{resource:this.$route.query.resource,
        hospital:this.$route.query.hospital,
        flag:this.$route.query.flag,
        checkDayDate:this.$route.query.checkDayDate,
        radioCheck:this.$route.query.radioCheck,
        surverId: this.$route.query.surverId,
        id: this.$route.query.id,
        flag: this.$route.query.flag
        }})
      },
      goback() {
        this.$router.push({
          path: "/appointment/addappoint",
          query: {
            resource: this.$route.query.resource,
            hospital: this.$route.query.hospital,
            checkDayDate: this.$route.query.checkDayDate,
            radioCheck: this.$route.query.radioCheck,
            surverId: this.$route.query.surverId,
            id: this.$route.query.id,
            flag: this.$route.query.flag
          }
        });
      },
       //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.queryResult.pageSize=pageSize;
        this.query();
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.queryResult.pageNo=currentPage;
        this.query();
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btns{
  margin-bottom: 10px;
}
</style>

