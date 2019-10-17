<template>
    <div>
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
          prop="personName"
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
          prop="itemsUnderIt"
          label="所属项目"
          width="120">
           <template slot-scope="scope">
              <span>{{scope.row.itemsUnderIt | itemsUnderItFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="riskType"
          label="评估结果"
          width="200">
        </el-table-column>
        <el-table-column
          prop="bookingProject"
          label="预约项目">
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
              <span>{{scope.row.signStatus | signStatusFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="所属机构"
          width="150">
        </el-table-column>
        <el-table-column
          label="生物样本ID"
          width="150">
          <template slot-scope="scope">
              <span type="text" size="small" v-if="scope.row.biologicalID">{{scope.row.biologicalID}}</span>
              <el-button type="text" size="small" @click="addDiologicalID(scope.row)" v-if="!scope.row.biologicalID && scope.row.signStatus==1">录入</el-button>
            </template>
        </el-table-column>
         <el-table-column
            label="操作"
            fixed="right"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="sign(scope.row)" v-if="scope.row.signStatus==2">签到</el-button>
              <router-link :to="{path:'/appointment/appointdetail',
              query:{id:scope.row.id,
              personId:scope.row.personId,
              surverId:scope.row.surverId,
              signedState:scope.row.signStatus,
              cancerSpeciesType:scope.row.cancerSpeciesType,
              checkProject:scope.row.checkProject,
              flag:'recruit'}}">
                <el-button type="text" size="small" v-if="scope.row.signStatus==1 && scope.row.reBookingStatus==2 ">再次预约</el-button>
              </router-link>
              <el-button type="text" size="small" @click="cancelSign(scope.row)" v-if="scope.row.signStatus==2">取消签到</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-dialog
        title="录入生物样本ID"
        :visible.sync="idDialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>请录入该受试者的生物样本ID</span>
        <el-input v-model.trim="mainSampleId"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">否</el-button>
          <el-button type="primary" @click="submitBiologicalID">是</el-button>
        </span>
      </el-dialog>
           <!-- 取消签到弹窗 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>请选择取消预约的原因：</span>
        <el-select v-model="cancelBookingReason" placeholder="请选择">
          <el-option :label="item.name" :value="item.name" :key="item.id" v-for="item in cancelReasons"></el-option>
        </el-select>
        <el-input v-model.trim="cancelBookingReasonOther" placeholder="请输入取消预约原因" maxlength="50" v-if="cancelBookingReason=='其他原因'" style="width:217px;margin-left:159px;margin-top:10px;"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submit" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import DICTIONARY from '@/views/common/dictionary'
import { sexFilter,signStatus,dateFilter } from "@/filters/filter"
  export default {
    name:'recruitTable',
    props:["tableData"],
    data () {
      return {
        idDialogVisible: false,
        dialogVisible: false,
        rowData:null,    //取消签到id
        cancelReasons:DICTIONARY.cancelReasons,
        cancelBookingReason:null,     //取消签到原因
        cancelBookingReasonOther:null,
        mainSampleId:null,
        itemsUnderIt:null
      }
    },
    created(){

    },
    methods: {
      cancel () {
       this.idDialogVisible=false;
       this.biologicalID=null;
      },
      handleClose(done) {
        done();
        this.biologicalID=null;
      },
      addDiologicalID(row){
        this.rowData=row;
        this.idDialogVisible=true;
        this.mainSampleId=null;
        this.itemsUnderIt = row.itemsUnderIt;
      },
      // 取消签到
      cancelSign(row){
        this.cancelSignedReason=null;
        this.dialogVisible=true;
        this.rowData=row;
      },
      // 提交取消签到原因
      submit(){
        if(this.cancelBookingReason=='其他原因'){
          this.cancelBookingReason=this.cancelBookingReasonOther
        }
          this.$axios_http({
            url: "/base/booking/cancelBooking",
            data:{
              personId:this.rowData.personId,
              checkProject:this.rowData.checkProject,
              cancelBookingReason:this.cancelBookingReason,
              surverId:this.rowData.surverId,
              allocRecordId:this.rowData.allocRecordId
            },
            vueObj: this
          }).then((res)=> {
            if(res.data.status=="SUCCESS"){
              this.$message({
                type: 'success',
                message: '取消签到成功'
              });
              this.dialogVisible=false;
              this.$emit('refreshList',false);
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
          row.signStatus=1
          this.$axios_http({
            url: "/base/zm/booking/sign",
            data:row,
            vueObj: this
          }).then((res)=> {
            if(res.data.status=="SUCCESS"){
              // 没有录入生物样本ID，弹出录入框
              if(!row.biologicalID){
                this.$message({
                  type: 'success',
                  message: '签到成功，请输入生物样本ID！'
                });
                this.idDialogVisible=true;
                this.rowData=row;
                this.mainSampleId=null;
                this.itemsUnderIt = row.itemsUnderIt;
              }else{
                this.$message({
                  type: 'success',
                  message: '签到成功！'
                });
              }
              this.$emit('refreshList',false);
            }
          })
        }).catch(() => {
                  
        });
        
      },
      // 提交生物样本ID
      submitBiologicalID(){
        if(!this.mainSampleId){
          this.$message({
            type:'error',
            message:'生物样本ID不能为空'
          })
          return;
        }else{
          if(this.itemsUnderIt && this.itemsUnderIt == 1){
              //肺肠验证
              if(!(/^([0-9]{9})$/.test(this.mainSampleId))){
                  this.$message({
                    type:'error',
                    message:'生物样本ID校验规则未通过'
                  })
                  return;
              }

          }else if(this.itemsUnderIt && this.itemsUnderIt == 2){
              //早诊验证
              if (!(/^([0-9]{11}[A-Z]{0,1}|[0-9]{12})$/.test(this.mainSampleId))) {
                  this.$message({
                    type:'error',
                    message:'生物样本ID校验规则未通过'
                  })
                  return;
              } 
              if(this.mainSampleId.length < 11){
                this.$message({
                    type:'error',
                    message:'生物样本ID校验规则未通过'
                  })
                  return;
              }
          }
        }
         this.$axios_http({
            url: "/base/biological/add/mainBiologicalSampleInfo",
            data:{
              deptId:this.rowData.deptId,
              personId:this.rowData.personId,
              surverId:this.rowData.surverId,
              itemsUnderIt:this.itemsUnderIt,
              mainSampleId:this.itemsUnderIt==1?'CH'+this.mainSampleId:this.mainSampleId.substring(0,11)
            },
            vueObj: this
          }).then((res)=> {
            if(res.data.status=="SUCCESS"){
              this.$message({
                type: 'success',
                message: '录入成功'
              });
              this.idDialogVisible=false;
              this.$emit('refreshList',false);
            }
          })
      }

    }
  }
</script>