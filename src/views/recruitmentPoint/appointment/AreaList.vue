<template>
  <div>
      <search-com  :labelWidth="'100px'" :searchData="searchData" ref="6searchTable" :formData="qc"
                    @searchChange="searchChange"></search-com>
    <div class="table-con-appointment">
      <cancer-widget>
        <el-table 
          :data="tableData"
          border
          style="width: 100%">
         <el-table-column
          prop="surverId"
          label="SID/问卷ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="150">
        </el-table-column>
         <el-table-column
          label="性别"
          width="60">
          <template slot-scope="scope">
              <span>{{scope.row.sex | sexFilter}}</span>
            </template>
        </el-table-column>
         <el-table-column
          prop="idCard"
          label="身份证"
          width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="120">
        </el-table-column>
         <el-table-column
          prop="itemOnly"
          label="所属项目"
          width="150">
           <template slot-scope="scope">
              <span>{{scope.row.itemOnly | itemsUnderItFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="risk"
          label="评估结果"
          width="200">
        </el-table-column>
        <el-table-column
          prop="checkProject"
          label="预约项目">
           <template slot-scope="scope">
            <span>{{scope.row.checkProject | checkProject}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预约时间"
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.bookingDate | dateFilter}}</span>
          </template>
        </el-table-column>
          <el-table-column
            label="签到状态">
            <template slot-scope="scope">
                <span>{{scope.row.signedState | signStatusFilter}}</span>
              </template>
          </el-table-column>
          <el-table-column
            prop="deptName"
            label="所属机构">
          </el-table-column>
          <el-table-column
              label="操作"
              fixed="right"
              width="180"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="sign(scope.row)" v-if="scope.row.signedState==2">签到</el-button>
                <router-link :to="{path:'/appointment/appointdetail',query:{id:scope.row.id,personId:scope.row.personId,surverId:scope.row.surverId,signedState:scope.row.signedState,cancerSpeciesType:scope.row.cancerSpeciesType,checkProject:scope.row.checkProject,flag:'area'}}">
                  <el-button type="text" size="small" v-if="scope.row.signedState==1 && scope.row.reBookingStatus==2">预约</el-button>
                </router-link>
                <el-button type="text" size="small" @click="cancelSign(scope.row)" v-if="scope.row.signedState==1 && scope.row.reBookingStatus==2">取消签到</el-button>
              </template>
            </el-table-column>
        </el-table>
        <br>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        :current-page="queryResult.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryResult.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.totalPageCount">
      </el-pagination>
      <br>
    </cancer-widget>
         <!-- 取消签到弹窗 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>请选择取消预约的原因：</span>
        <el-select v-model="cancelSignedReason" placeholder="请选择">
          <el-option :label="item.name" :value="item.name" :key="item.id" v-for="item in cancelReasons"></el-option>
        </el-select>
        <el-input v-model.trim="cancelSignedReasonOther" placeholder="请输入取消预约原因" maxlength="50" v-if="cancelSignedReason=='其他原因'" style="width:217px;margin-left:159px;margin-top:10px;"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submit" size="small">确 定</el-button>
        </span>
      </el-dialog>
      
    </div>
  </div>
</template>
<script>
import RecruitTable from "../../common/RecruitTable"
import DICTIONARY from '@/views/common/dictionary'
import getBaseDataList from '@/views/recruitmentPoint/appointment/getBaseDataList'
import { signStatusFilter,dateFilter } from '@/filters/filter'
import {SUBJECT} from '@/views/common/searchConfig6'
  export default {
    mixins: [ getBaseDataList ],
    data () {
      return {
        dialogVisible: false,
        id:null,    //取消签到id
        tableData:[],
        baseDataJcxm:[],   //筛查项目
        sex:DICTIONARY.sex,   //性别
        riskTypeNew:DICTIONARY.riskTypeNew,    //癌种
        signStatus:DICTIONARY.signStatus,   //签到状态
        cancelReasons:DICTIONARY.cancelReasons,
        cancelSignedReason:null,     //取消签到原因
        cancelSignedReasonOther:null,
        //查询条件
        qc: {
          "personName": null,
          "checkProject": null,
          "idCard": null,
          "riskType": null,
          "signedState": null,
          "surverId": null,
          
        },
        //查询结果
        "queryResult": {
          "pageNum": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
        },
        searchData: SUBJECT,
      }
    },
    components:{
      RecruitTable
    },
    created(){
        this.getBaseDataListJcxm();
    },
    mounted(){
      this.query();
    },
    methods: {
      searchChange(val){
            let data = Object.assign({},this.qc,{pageNum:this.queryResult.pageNum,
                  pageSize:this.queryResult.pageSize},val)
            delete data.deptType;
            this.$axios_http({
              url: "/base/re/booking/query/getReBookingList",
              data:data
            }).then((res) => {
                if(res.data.status=="SUCCESS"){
                  this.tableData = res.data.result.list;
                  this.queryResult.totalPageCount = res.data.result.total;
                  this.queryResult.pageNum = res.data.result.pageNum;
                  this.tableData.filter(item => {
                    this.baseDataJcxm.filter( item1 => {
                      if(item.checkProject==item1.dataName){
                        item.dataCode=item1.dataCode
                      }
                   })
                })
              }
            })
      },
      // flag-----true.查询按钮查询，增加统计查询，false.其他查询，统计无需再次查询
      query(){
        let data = Object.assign({},this.qc,{pageNum:this.queryResult.pageNum,
              pageSize:this.queryResult.pageSize})
         this.$axios_http({
          url: "/base/re/booking/query/getReBookingList",
          data: data,
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.tableData = res.data.result.list;
            this.queryResult.totalPageCount = res.data.result.total;
            this.queryResult.pageNum = res.data.result.pageNum;
            this.tableData.filter( item => {
              this.baseDataJcxm.filter( item1 => {
                if(item.checkProject==item1.dataName){
                  item.dataCode=item1.dataCode
                }
              })
            })
          }
        })
      },
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.qc = this.getFormData('6searchTable');
        this.queryResult.pageSize = pageSize;
        this.query();
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.qc = this.getFormData('6searchTable');
        this.queryResult.pageNum = currentPage;
        this.query();
      },
        // 取消签到
      cancelSign(row){
        this.cancelSignedReason=null;
        this.dialogVisible=true;
        this.id=row.id;
      },
      // 提交取消签到原因
      submit(){
        if(this.cancelSignedReason=='其他原因'){
          this.cancelSignedReason=this.cancelSignedReasonOther
        }
        this.$axios_http({
            url: "/base/re/booking/update/signedState",
            data:{
              id:this.id,
              signedState:2,
              cancelSignedReason:this.cancelSignedReason
            },
            vueObj: this
          }).then((res)=> {
            if(res.data.status=="SUCCESS"){
              this.$message({
                type: 'success',
                message: '取消签到成功'
              });
              this.dialogVisible=false;
              this.query();
            }
          })
      },
      //  签到
      sign(row){
        this.$confirm('请确认是否给受试者签到?', '签到确认', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          row.signStatus=2
          this.$axios_http({
            url: "/base/re/booking/update/signedState",
            data:{
              id:row.id,
              signedState:1
            },
            vueObj: this
          }).then((res)=> {
            if(res.data.status=="SUCCESS"){
              this.$message({
                type: 'success',
                message: '签到成功'
              });
              this.query();
            }
          })
        }).catch(() => {
                  
        });
        
      }

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>

