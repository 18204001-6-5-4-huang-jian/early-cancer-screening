<template>
    <div class="zm-screeningCollect-container">
    <!--查询表单-->
    <search-com :labelWidth="'100px'" :searchData="searchData" ref="zmscreeningCollect" :formData="qc"
                    @searchChange="searchHandler"></search-com>
    <cancer-widget>
        <!--表格-->
        <table-com :propsData="propsData" :tableData="tableData" :loading="loading">
       <template slot="operating">
          <el-table-column
            label="CT报告"
            width="150"
            >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.ctReportStatus == 1" @click="reportView(scope.row,'ct')">查看报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.ctReportSendStatus == 2 && scope.row.ctReportStatus == 1" @click="sendReport(1,scope.row)">发放报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.ctReportSendStatus == 1" @click="seeReport(1,scope.row)">查看发放登记</el-button>
                <div v-if="scope.row.ctReportStatus != null && scope.row.ctReportStatus != 1">-</div>
                <div v-if="scope.row.ctReportStatus == null">-</div>
            </template>
          </el-table-column>
           <el-table-column
            label="乳腺X线报告"
            width="150"
            >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.rxxxReportStatus == 1"  @click="reportView(scope.row,'rxxx')">查看报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.rxxxReportSendStatus == 2 && scope.row.rxxxReportStatus == 1" @click="sendReport(2,scope.row)">发放报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.rxxxReportSendStatus == 1" @click="seeReport(2,scope.row)">查看发放登记</el-button>
                <div v-if="scope.row.rxxxReportStatus != null && scope.row.rxxxReportStatus != 1">-</div>
                <div v-if="scope.row.rxxxReportStatus == null">-</div>
            </template>
          </el-table-column>
           <el-table-column
            label="乳腺B超报告"
            width="150"
            >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.rxcsReportStatus == 1"  @click="reportView(scope.row,'rxcs')">查看报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.rxcsReportSendStatus == 2 && scope.row.rxcsReportStatus == 1" @click="sendReport(3,scope.row)">发放报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.rxcsReportSendStatus == 1" @click="seeReport(3,scope.row)">查看发放登记</el-button>
                <div v-if="scope.row.rxcsReportStatus != null && scope.row.rxcsReportStatus != 1">-</div>
                <div v-if="scope.row.rxcsReportStatus == null">-</div>
            </template>
          </el-table-column>
            <el-table-column
            label="上消内镜报告"
            width="150"
            >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.sxhdResultEsophagus!=null || scope.row.sxhdResultGastric!=null"  @click="reportView(scope.row,'sxhdnj')">查看报告</el-button>
                <el-button type="text" size="small" v-if="(scope.row.sxhdResultEsophagus!=null || scope.row.sxhdResultGastric!=null) && scope.row.sxhdReportSendStatus != 1" @click="sendReport(4,scope.row)">发放报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.sxhdReportSendStatus == 1" @click="seeReport(4,scope.row)">查看发放登记</el-button>
                <div v-if="(scope.row.sxhdReportStatus != null && scope.row.sxhdReportStatus != 1) || (scope.row.sxhdPathologyReportStatus != null && scope.row.sxhdPathologyReportStatus != 1) ">-</div>
                <div v-if="scope.row.sxhdReportStatus == null">-</div>
            </template>
          </el-table-column>
          <el-table-column
            label="结直肠镜报告"
            width="150"
            >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.cjResultStatus!=null"  @click="reportView(scope.row,'cj')">查看报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.cjResultStatus!=null && scope.row.cjReportSendStatus != 1" @click="sendReport(5,scope.row)">发放报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.cjReportSendStatus == 1" @click="seeReport(5,scope.row)">查看发放登记</el-button>
                <!-- <div v-if="(scope.row.cjReportStatus != null && scope.row.cjReportStatus != 1) || (scope.row.cjPathologyReportStatus != null && scope.row.cjPathologyReportStatus != 1)">-</div> -->
                <div v-if="scope.row.cjReportStatus == null">-</div>
            </template>
          </el-table-column>
           <el-table-column
            label="肝超声报告"
            width="150"
            >
            <template slot-scope="scope">
                <el-button type="text" size="small" v-if="scope.row.gaReportStatus == 1"  @click="reportView(scope.row,'gcs')">查看报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.gaReportSendStatus == 2 && scope.row.gaReportStatus == 1" @click="sendReport(6,scope.row)">发放报告</el-button>
                <el-button type="text" size="small" v-if="scope.row.gaReportSendStatus == 1" @click="seeReport(6,scope.row)">查看发放登记</el-button>
                <div v-if="scope.row.gaReportStatus != null && scope.row.gaReportStatus != 1">-</div>
                <div v-if="scope.row.gaReportStatus == null">-</div>
            </template>
          </el-table-column>
        </template>
    </table-com> <br>
      <el-pagination
        @size-change="tableSizeChange"
        @current-change="tablePageChange"
        :current-page.sync="queryResult.pageNo"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="queryResult.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.totalPageCount">
      </el-pagination>
       <!-- 弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :show-close="false" width="40%" :close-on-click-modal="false" @close="handleClose">
        <el-form :model="form" :rules="rules" ref="form" label-width="150px">
          <el-form-item label="发放方式：" prop="sendType">
            <el-select v-model="form.sendType" placeholder="请选择发放方式" style="width:300px" clearable :disabled="disabledStatus">
              <el-option label="1=受试者/家属到社区中心自取" value="1"></el-option>
              <el-option label="2=社区工作人员入户递送" value="2"></el-option>
              <el-option label="3=邻居从社区中心捎带取走" value="3"></el-option>
              <el-option label="4=受试者/家属到医院自取" value="4"></el-option>
              <el-option label="5=其他" value="5"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="发放日期：" prop="sendDate">
                <el-date-picker
                    v-model="form.sendDate"
                    type="date"
                    placeholder="发放日期"
                    style="width:300px"
                    :picker-options="pickerOptions"
                    clearable
                    :disabled="disabledStatus">
                  </el-date-picker>
          </el-form-item>
           <el-form-item label="领取人：" prop="receiver">
                <el-input v-model="form.receiver" style="width:300px" placeholder="领取人" clearable :disabled="disabledStatus"></el-input>
           </el-form-item>
           <el-form-item label="发放人：" prop="issuer">
                <el-input v-model="form.issuer" style="width:300px" placeholder="发放人" clearable :disabled="disabledStatus"></el-input>
           </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="form.remark" style="width:300px" placeholder="备注" clearable :disabled="disabledStatus"></el-input>
           </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')" :disabled="disabledStatus">确 定</el-button>
        </div>
      </el-dialog>
    </cancer-widget>
    </div>
</template>
<script>
import { searchConfig } from "./searchConfig";
import { tableConfig } from "./tableConfig";
export default {
    data(){
        return{
          loading:true,
           searchData:searchConfig,
           propsData:tableConfig,
           qc:{
               
           },
          tableData:[],
          queryResult:{
              pageNo:1,
              pageSize:10,
              totalPageCount:0
          },
          dialogFormVisible:false,
          dialogTitle:'',
          form:{
            sendType:'',
            sendDate:'',
            receiver:'',
            issuer:'',
            remark:''
          },
          rules:{
            sendType: [
              { required: true, message: '必选', trigger: 'change' }
            ],
            sendDate: [
               { required: true, message: '必填', trigger: 'blur' },
            ],
            receiver: [
               { required: true, message: '必填', trigger: 'blur' },
               { min: 1, max: 20, message: '1-20个字符', trigger: 'blur' }
            ],
            issuer: [
               { required: true, message: '必填', trigger: 'blur' },
               { min: 1, max: 20, message: '1-20个字符', trigger: 'blur' }
            ],
            remark: [
              { min: 0, max: 50, message: '0-50个字符', trigger: 'blur' }
            ]
          },
          pickerOptions:{
            disabledDate(time) {
              return time.getTime() > Date.now();
            },
          },
          checkProject:'',
          dialogRow:{},
          disabledStatus:false,
        }
    },
    mounted() {
      this.query();
    },
    methods: {
        query(){
          this.$axios_http({
              url: "/base/zm/booking/bookedPersonForZMSendReport",
              data: Object.assign({}, this.qc, {
                pageNum: this.queryResult.pageNo,
                pageSize: this.queryResult.pageSize
              }),
              vueObj: this
            }).then(res => {
              if(res.data.status == "SUCCESS") {
                 this.tableData = res.data.result.list;
                 this.queryResult.totalPageCount = res.data.result.total;
                 this.loading = false
              }
            });
        },
        searchHandler(val) {
            this.loading = true
            this.qc = val;
            this.query();
        },
        tableSizeChange(val){
                this.loading = true
                this.formData = this.getFormData('zmscreeningCollect');
                this.queryResult.pageSize = val;
                this.query();
        },
        tablePageChange(val){
                this.loading = true
                this.formData = this.getFormData('zmscreeningCollect');
                this.queryResult.pageNo = val
                this.query();
        },
        sendReport(params,row){
             if(params == 1){
               this.dialogTitle = 'CT筛查报告发放';
               this.checkProject = 'ct'
            }else if(params == 2){
               this.dialogTitle = '乳腺X线筛查报告发放';
               this.checkProject = 'rxxx'
            }else if(params == 3){
               this.dialogTitle = '乳腺B超筛查报告发放';
               this.checkProject = 'rxcs'
            }else if(params == 4){
               this.dialogTitle = '上消内镜筛查报告发放';
               this.checkProject = 'sxhdnj'
            }else if(params == 5){
               this.dialogTitle = '结直肠镜筛查报告发放';
               this.checkProject = 'cj'
            }else if(params == 6){
               this.dialogTitle = '肝超声筛查报告发放';
               this.checkProject = 'gcs'
            }
            this.dialogFormVisible = true;
            this.disabledStatus = false;
            this.dialogRow = row;
        },
        handleClose(){
           this.$refs.form.resetFields();
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
            //提交报告
              this.$axios_http({
                url: "/base/report/send/report",
                data:{
                    surverId:this.dialogRow.surverId,
                    personId:this.dialogRow.personId,
                    checkProject:this.checkProject,
                    sendType:this.form.sendType,
                    sendDate:this.form.sendDate,
                    receiver:this.form.receiver,
                    issuer:this.form.issuer,
                    remark:this.form.remark
                },
                vueObj: this
              }).then(res => {
                if(res.data.status == "SUCCESS") {
                   this.dialogFormVisible = false;
                   this.query();
                }
            });
            } else {
              return false;
            }
          });
      },
      seeReport(params,row){
           let id = '';
           if(params == 1){
               this.dialogTitle = 'CT筛查报告发放';
               id = row.ctReportSendId;
            }else if(params == 2){
               this.dialogTitle = '乳腺X线筛查报告发放';
               id = row.rxxxReportSendId;
            }else if(params == 3){
               this.dialogTitle = '乳腺B超筛查报告发放';
               id = row.rxcsReportSendId;
            }else if(params == 4){
               this.dialogTitle = '上消内镜筛查报告发放';
               id = row.sxhdReportSendId;
            }else if(params == 5){
               this.dialogTitle = '结直肠镜筛查报告发放';
               id = row.cjReportSendId;
            }else if(params == 6){
               this.dialogTitle = '肝超声筛查报告发放';
               id = row.gaReportSendId;
            }
            this.$axios_http({
                url: "/base/report/get/report",
                data:{
                   id:id
                },
                vueObj: this
              }).then(res => {
                if(res.data.status == "SUCCESS") {
                  this.dialogFormVisible = true;
                  this.disabledStatus = true;
                  this.form = res.data.result.hosReportSendPO;
                  this.form.sendType =  this.form.sendType + '';
                }
            });
      },
      reportView(row,type){
        if(type == 'ct'){
           this.$router.push({
              path: "/form/ctreport",
              query: {
                screeningId: row.screeningId,
                id: row.id,
                personId: row.personId,
                surverId: row.surverId,
                reportId: row.ctReportId,
                type: 2
              }
            });
        }else if(type == 'rxxx'){
          this.$router.push({
              path: "/form/xlinereport",
              query: {
                screeningId: row.screeningId,
                id: row.id,
                personId: row.personId,
                surverId: row.surverId,
                reportId: row.rxxxReportId,
                resultFormId: row.resultFormId,
                flag: 0
              }
            });
        }else if(type == 'rxcs'){
            this.$router.push({
              path: "/form/msoundreport",
              query: {
                screeningId: row.screeningId,
                id: row.id,
                personId: row.personId,
                surverId: row.surverId,
                reportId: row.rxcsReportId,
                resultFormId: row.resultFormId,
                flag: 0
              }
            });
        }else if(type == 'sxhdnj'){
            //跳转tab切换页面 
            this.$router.push({
              path:'/form/zmscreeningCollectView',
              query:{
                  surverId:row.surverId,
                  personId:row.personId,
                  reportId: row.sxhdReportId,
                  PathologyId:row.sxhdPathologyId,
                  flag:0,
                  type:type
              }
            })
        }else if(type == 'cj'){
            //跳转tab切换页面 
            this.$router.push({
              path:'/form/zmscreeningCollectView',
              query:{
                  surverId:row.surverId,
                  personId:row.personId,
                  reportId: row.cjReportId,
                  PathologyId:row.cjPathologyId,
                  flag:0,
                  type:type
              }
            })
        }else if(type == 'gcs'){
          this.$router.push({
            path: "/form/liverreport",
            query: {
              screeningId: row.screeningId,
              id: row.id,
              personId: row.personId,
              surverId: row.surverId,
              reportId: row.gaReportId,
              resultFormId: row.resultFormId,
              flag: 0
            }
          });
        }
      }
    },
}
</script>
<style lang="css" scoped>
     .screeningCollect-container .el-button--primary{
        padding: 10px;
        margin:5px auto;
     }
</style>