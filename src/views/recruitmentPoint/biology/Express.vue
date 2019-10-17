<template>
  <div>
    <cancer-widget>
      <el-form :inline="true" :model="qc" class="demo-form-inline">
        <el-form-item label="运单号:">
          <el-input size="small" v-model.trim="qc.courierNo" placeholder="请输入运单号" clearable></el-input>
        </el-form-item>
        <el-form-item label="快递状态:">
          <el-select size="small"  v-model="qc.courierStatus" placeholder="请选择" clearable>
            <el-option :label="item.name" :value="item.id" v-for="item in courierStatus" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发出日期:">
            <el-date-picker
            size="small" 
            v-model="qc.sendDateString"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
    </cancer-widget>
      <cancer-widget>
        <div class="btns">
          <router-link :to="{path:'/agency/sendexpress'}" v-if="$route.path.indexOf('/gj/express')==-1">
             <el-button type="primary" size="small" >寄出样本</el-button>
          </router-link>
          <el-button type="primary" size="small" @click="receiveCourier" v-if="$route.path.indexOf('/gj/express')>-1">接收</el-button>
        </div>
        <el-table 
          :data="tableData"
          ref="multipleTable"
          border
          style="width: 100%"
          :cell-class-name="cellcb"
          @selection-change="handleSelectionChange"
          @select-all="handleSelectionAll">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="courierNo"
            label="运单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="boxNum"
            label="冷冻盒数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="courierStatus"
            label="快递状态">
            <template slot-scope="scope">
                <span>{{scope.row.courierStatus | courierStatusFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发出日期">
            <template slot-scope="scope">
                <span>{{scope.row.sendDate | dateFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sender"
            label="发件人">
          </el-table-column>
          <el-table-column
            label="接收日期">
             <template slot-scope="scope">
                <span>{{scope.row.receiveDate | dateFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="receiver"
            label="接收人">
          </el-table-column>
          <el-table-column
              label="操作"
              fixed="right"
              width="180"
            >
              <template slot-scope="scope">
                <router-link :to="{path:'/agency/expressdetail',query:{courierNo:scope.row.courierNo,boxNum:scope.row.boxNum}}">
                  <el-button type="text" size="small">查看</el-button>
                </router-link>
              </template>
            </el-table-column>
        </el-table>
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
    <!-- 接受快递弹窗 -->
      <el-dialog
        title="接收快递"
        :visible.sync="receiveCourierDialog"
        width="700px"
        center>
        <el-row class="cancer-margin--b15 wrap-bottom">
          <p  class="title-style">已选中运单号如下，请核对！</p>
          <p  class="title-style">{{courierNosTostring}}</p>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules" ref="formInline">
            <el-form-item label="接收日期：">
                <el-date-picker
                  size="small" 
                  :clearable="false"
                  v-model="formInline.receiveDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="接收人：" prop="receiver">
              <el-input size="small" v-model="formInline.receiver" placeholder="请输入接收人" clearable></el-input>
            </el-form-item>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="receiveCourierSave('formInline')" size="small">确定</el-button>
          <el-button type="default" @click="cancelCourierDialog('formInline')" size="small">取消</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import DICTIONARY from '@/views/common/dictionary'
import { dateFilter,courierStatusFilter } from '@/filters/filter'
import dateFormater from '@/filters/index'
  export default {
    data () {
      return {
        receiveCourierDialog:false,
        courierNosTostring:null,
        tableData:[],
        courierStatus:DICTIONARY.courierStatus,    //快递状态
        multipleSelection:null,
        // 接收快递弹窗
        formInline: {
          receiveDate: new Date(),
          receiver: null,
          courierNos:[],   //接收快递的运单号
          ids:[],    //接收快递的id
        },
        //查询条件
        qc: {
          "courierNo": null,
          "courierStatus": null,
          "sendDate": null
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
        },
        rules:{
          receiver:[
             { required: true, message: '必填', trigger: 'blur' },
          ]
        },
      }
    },
    created(){
      console.log(this.$route.path)
    },
    mounted(){
      this.query();
    },
    methods: {
      query(pageNum,pageSize){
         this.$axios_http({
          url: "/base/biological/find/biologicalourierList",
          data: {
                "pageNum":this.queryResult.pageNo,
                "pageSize":this.queryResult.pageSize,
                "courierNo":this.qc.courierNo,
                "courierStatus":this.qc.courierStatus,
                "sendDateString":this.qc.sendDateString?dateFormater.dateFormater(this.qc.sendDateString):null
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.tableData=res.data.result.list;
            this.queryResult.totalPageCount=res.data.result.total;
          }
        })
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSelectionAll(val) {
        this.multipleSelection = val;
      },
      // 接收快递
      receiveCourier(){
        this.formInline.courierNos=[];
        this.formInline.ids=[];
        if(this.multipleSelection && this.multipleSelection.length>0){
          this.receiveCourierDialog=true;
          this.multipleSelection.filter( item => {
            if(item.courierStatus==3){
              this.formInline.courierNos.push( item.courierNo );
              this.formInline.ids.push( item.id );
            }
          })
          this.courierNosTostring=this.formInline.courierNos.join(',');
        }else{
          this.$message({
            type:'error',
            message:'未选择运单号！'
          })
        }
        
      },
      receiveCourierSave(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formInline.receiveDate=dateFormater.dateFormater(this.formInline.receiveDate)
              this.$axios_http({
                url: "/base/biological/update/receiveiologicalSampleCourier",
                data: this.formInline,
                vueObj: this
              }).then((res)=> {
                if(res.data.status=="SUCCESS"){
                  this.receiveCourierDialog=false;
                  this.query();
                }
              })
          } else {
            return false;
          }
        });
      },
      // 取消快递弹窗
      cancelCourierDialog(formName){
        this.$refs[formName].resetFields();
        this.receiveCourierDialog=false;
      },
      cellcb(row){
        if(row.row.courierStatus !== 3){
          return "myCell"
        }
      }

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btns{
    margin-bottom: 15px;
}
.title-style{
  margin-bottom: 15px;
  text-align: center;
}
.btnBox{
  width: 200px;
  margin: 0 auto;
}
</style>
<style>
 .myCell .el-checkbox__input {
  display: none
}
</style>


