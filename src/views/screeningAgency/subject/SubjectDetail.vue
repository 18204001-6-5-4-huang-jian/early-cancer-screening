<template>
  <div>
    <cancer-widget>
      <p class="title">基本信息</p>
      <div class="rows">
        <el-row>
          <el-col :span="6">
            <p><span>SID/问卷ID：</span>{{personDetail.surverId}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>姓名：</span>{{personDetail.name}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>性别：</span>{{personDetail.sex | sexFilter}}</p>
          </el-col>
            <el-col :span="6">
            <p><span>年龄：</span>{{personDetail.age}}</p>
          </el-col>
        </el-row>
        <el-row>
           <el-col :span="6">
            <p><span>身份证：</span>{{personDetail.idCard}}</p>
          </el-col>
           <el-col :span="6">
            <p><span>手机号：</span>{{personDetail.phone}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>所属项目：</span>{{personDetail.itemsUnderIt | itemsUnderItFilter}}</p>
          </el-col>
          <el-col :span="6">
            <p><span>项目状态：</span>{{personDetail.personStatus | personStatusFilter}}</p>
          </el-col>
        </el-row> 
        <el-row> 
          <el-col :span="6">
            <p><span>分组状态：</span>{{personDetail.entryCategory | groupStatusFilter }}</p>
          </el-col>
           <el-col :span="6">
            <p><span>评估日期：</span>{{personDetail.evaluateDate | dateFilter }}</p>
          </el-col>
            <el-col :span="6">
            <p><span>问卷评估结果：</span>{{personDetail.risk | riskResultFilter}}</p>
          </el-col>
           <el-col :span="6">
            <p><span>所属机构：</span>{{personDetail.deptName}}</p>
          </el-col>
        </el-row> 
        <el-row> 
          <el-col :span="6" v-if="personDetail.itemsUnderIt==1">
            <p>
              <span>资格审核表：</span>
              <router-link :to="{path:'/evaluation/evaluationreport',query:{
                id: $route.query.eligibilityFormId,
                flag: 1, 
                itemsUnderIt: 1,
                }}">
                <el-button type="text">查看</el-button>
              </router-link>
            </p>
          </el-col>
           <el-col :span="6" v-if="personDetail.itemsUnderIt==1">
            <p>
              <span>个人信息表：</span>
              <router-link 
                v-if="$route.query.personInfoEntryStatus==1" 
                :to="{path:'/ldctform/personinfo/index',query:{
                  type:1,
                  personInfoId:$route.query.personInfoId,
                  id:$route.query.id
                  }}">
                <el-button type="text">查看</el-button>
              </router-link>
              <span style="text-align:left" v-else>--</span>
            </p>
          </el-col>
            <el-col :span="6" v-if="personDetail.itemsUnderIt==1">
            <p>
              <span>危险因素表：</span>
              <router-link 
                v-if="$route.query.hazardsEntryStatus==1" 
                :to="{path:'/ldctform/riskfactor',query:{
                  type:2,
                  id:$route.query.hazardsId,
                  personInfoId:$route.query.personInfoId,
                  eli:$route.query.eligibilityFormId
                  }}">
                <el-button type="text">查看</el-button>
              </router-link>
              <span style="text-align:left" v-else>--</span>
            </p>
          </el-col>
           <el-col :span="6" v-if="personDetail.itemsUnderIt==2">
            <p>
              <span>早诊评估表：</span>
              <router-link :to="{path:'/evaluation/evaluationresult',query:{
                id: $route.query.id,
                source:'subject'
                }}">
                <el-button type="text">查看</el-button>
              </router-link>
            </p>
          </el-col>
        </el-row>
      </div>
    </cancer-widget>
    <div class="table-con-appointment">
      <cancer-widget>
         <p class="title">受试者概况</p>
         <el-button 
         type="primary" 
         size="small" 
         style="margin-left:20px;" 
         v-if="personDetail.allReportFlag && oldStatus==2 && itemsUnderIt=='2' && (deptmentType=='scjg' || deptmentType=='zmd')"
         @click="reportDialog = true ">查看全部报告</el-button>
         <!-- 全部报告弹窗 -->
         <all-report-dialog
         :reportDialog="reportDialog"
         :surverId="$route.query.surverId"
         :personId="$route.query.personId"
         @closeDialog="closeDialog"></all-report-dialog>
       <el-table 
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%">
        <el-table-column
          label="高危类型"
          align="left"
          width="150">
          <template slot-scope="scope">
              <span>{{scope.row.cancerSpecies}}筛查情况</span>
            </template>
        </el-table-column>
        <el-table-column
          label="筛查项目"
          align="left"
          width="300">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.screeningProjects" :key="index">
              <p>检查项目：{{item.checkProject}}&nbsp;&nbsp;<div v-if="item.screeningId && personDetail.itemsUnderIt == 2">(筛查ID：{{item.screeningId}})</div></p>
              <!-- 肠 -->
              <div v-if="scope.row.riskType=='ca'">
                <p v-if="item.resultInputStatus==1">
                  <router-link :to="{path:'/form/enteroscopylook',query:{
                    resultFormId:item.resultFormId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看{{scope.row.cancerSpecies}}结果表</el-button>
                  </router-link>
                </p>
                <p v-if="item.pathologyEnterStatus==1">
                  <router-link :to="{path:'/form/pathologylook',query:{
                    resultFormId:item.resultFormId,
                    pathologyId:item.pathologyId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看病理表</el-button>
                  </router-link>
                </p>
                <p v-if="item.reportInputStatus==1">
                  <router-link :to="{path:'/form/enteroscopyreportlook',query:{
                    reportId:item.reportId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    flag:0,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看结果报告</el-button>
                  </router-link>
                </p>
                <p v-if="item.pathologyReportStatus==1">
                  <router-link :to="{path:'/form/pathologyreport',query:{
                    pathologyReportId:item.pathologyReportId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    flag:0,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看病理报告</el-button>
                  </router-link>
                </p>
              </div>
              <!-- 乳腺超声 -->
              <div v-if="scope.row.riskType=='rxa' && scope.row.screeningProjects[0].checkProject=='乳腺超声'">
                <p v-if="item.resultInputStatus==1">
                  <router-link :to="{path:'/form/msoundlook',query:{
                    resultFormId:item.resultFormId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看{{scope.row.cancerSpecies}}结果表</el-button>
                  </router-link>
                </p>
                <p v-if="item.reportInputStatus==1">
                  <router-link :to="{path:'/form/msoundreport',query:{
                    reportId:item.reportId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    flag:0,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看结果报告</el-button>
                  </router-link>
                </p>
              </div>
              <!-- 乳腺X -->
              <div v-if="scope.row.riskType=='rxa' && scope.row.screeningProjects[0].checkProject=='乳腺X线'">
                <p v-if="item.resultInputStatus==1">
                  <router-link :to="{path:'/form/mammarylook',query:{
                    resultFormId:item.resultFormId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看{{scope.row.cancerSpecies}}结果表</el-button>
                  </router-link>
                </p>
                <p v-if="item.reportInputStatus==1">
                  <router-link :to="{path:'/form/xlinereport',query:{
                    reportId:item.reportId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    flag:0,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看结果报告</el-button>
                  </router-link>
                </p>
              </div>
              <!-- 上消 -->
              <div v-if="scope.row.riskType=='sxhda'">
                <p v-if="item.resultInputStatus==1">
                  <router-link :to="{path:'/form/digestivelook',query:{
                    resultFormId:item.resultFormId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看{{scope.row.cancerSpecies}}结果表</el-button>
                  </router-link>
                </p>
                <p v-if="item.pathologyEnterStatus==1">
                  <router-link :to="{path:'/form/digestivblook',query:{
                    resultFormId:item.resultFormId,
                    pathologyId:item.pathologyId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看病理表</el-button>
                  </router-link>
                </p>
                <p v-if="item.reportInputStatus==1">
                  <router-link :to="{path:'/form/digestivereport',query:{
                    reportId:item.reportId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    flag:0,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看结果报告</el-button>
                  </router-link>
                </p>
                <p v-if="item.pathologyReportStatus==1">
                  <router-link :to="{path:'/form/digestivbreport',query:{
                    pathologyReportId:item.pathologyReportId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    flag:0,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看病理报告</el-button>
                  </router-link>
                </p>
              </div>
              <!-- 肺 -->
              <div v-if="scope.row.riskType=='fa'">
                <!-- personDetail.itemsUnderIt 为2 早诊；oldStatus 1为老数据，2为新数据 -->
                <p v-if="personDetail.itemsUnderIt == 2 && item.resultInputStatus==1 && scope.row.oldStatus==1">
                  <router-link :to="{path:'/form/resultlook',query:{
                    resultFormId:item.resultFormId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看{{scope.row.cancerSpecies}}其他表现表</el-button>
                  </router-link>
                </p>
                <p v-if="personDetail.itemsUnderIt == 2 && item.tubercleInputStatus==1 && scope.row.oldStatus==1">
                  <router-link :to="{path:'/form/nodulelook',query:{
                    resultFormId:item.resultFormId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    tubercleId:item.tubercleId,
                    screeningId:item.screeningId,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看{{scope.row.cancerSpecies}}结节表</el-button>
                  </router-link>
                </p>
                <!-- 20190606新增早诊、肺肠项目区别 -->
                <p v-if="personDetail.itemsUnderIt == 2 && item.resultInputStatus==1 && scope.row.oldStatus==2">
                  <router-link :to="{path:'/form/ct',query:{
                    resultFormId:item.resultFormId,
                    reportInputStatus:item.resultInputStatus,
                    id:$route.query.personId,
                    type:2,
                    flag:2}}">
                    <el-button type="text" size="small">查看结果表</el-button>
                  </router-link>
                </p>
                <p v-if="personDetail.itemsUnderIt == 2 && item.reportInputStatus==1 && scope.row.oldStatus==2">
                  <router-link :to="{path:'/form/ctreport',query:{
                    id:$route.query.personId,
                    reportId:item.reportId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    type:2}}">
                    <el-button type="text" size="small">查看结果报告</el-button>
                  </router-link>
                </p>
                <!-- personDetail.itemsUnderIt 为 1 肺肠 -->
                <p v-if="personDetail.itemsUnderIt == 1 && item.resultInputStatus==1">
                   <router-link :to="{path:'/ldctform/ct/index',query:{
                    resultFormId:item.resultFormId,
                    reportInputStatus:item.resultInputStatus,
                    id:$route.query.personId,
                    type:2,
                    flag:2
                   }}">
                     <el-button type="text" size="small">查看结果表</el-button>
                   </router-link>
                </p>
                <p v-if="personDetail.itemsUnderIt == 2 && item.reportInputStatus==1 && scope.row.oldStatus==1">
                  <router-link :to="{path:'/form/reportlook',query:{
                    reportId:item.reportId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    flag:0,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看结果报告</el-button>
                  </router-link>
                </p>
                <!-- 肺 -->
                <p v-if="personDetail.itemsUnderIt == 1 && item.reportInputStatus==1">
                   <router-link :to="{path:'/ldctform/ctreport/index',query:{
                        id:$route.query.personId,
                        reportId:item.reportId,
                        surverId:$route.query.surverId,
                        personId:$route.query.personId,
                        screeningId:item.screeningId,
                        type:2
                      }}">
                     <el-button type="text" size="small">查看结果报告</el-button>
                   </router-link>
                </p>
                <!-- <p v-if="item.tubercleInputStatus==1 || item.reportInputStatus==1">
                  <el-button type="text" size="small" @click="lookyx">查看影像结果</el-button>
                </p> -->
              </div>
              <!-- 肝 -->
              <div v-if="scope.row.riskType=='ga'">
                <p v-if="item.resultInputStatus==1">
                  <router-link :to="{path:'/form/liverlook',query:{
                    resultFormId:item.resultFormId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    screeningId:item.screeningId,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看{{scope.row.cancerSpecies}}结果表</el-button>
                  </router-link>
                </p>
                <p v-if="item.reportInputStatus==1">
                  <router-link :to="{path:'/form/liverreport',query:{
                    reportId:item.reportId,
                    surverId:$route.query.surverId,
                    personId:$route.query.personId,
                    flag:0,
                    source:'gj'}}">
                    <el-button type="text" size="small">查看结果报告</el-button>
                  </router-link>
                </p>
              </div>
            </div>
              
            </template>
        </el-table-column>
        <el-table-column
          label="行为序列"
          align="left">
          <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.screeningProjects" :key="index">
              <p v-for="(item,index) in item.hosOperationCancerScreeningPOS" :key="index">{{item.moduleName}}，{{item.moduleStatus}}，{{item.aTime | dateFilter}}</p>
              </div>
            </template>
        </el-table-column>
      </el-table>
    </cancer-widget>
    </div>
  </div>
</template>
<script>
import DICTIONARY from '@/views/common/dictionary'
import getPersonDetail from '@/views/recruitmentPoint/form/getPersonDetail'
import dateFormater from '@/filters/index'
import { sexFilter,personStatusFilter,dateFilter } from '@/filters/filter'
import AllReportDialog from '@/views/common/AllReportDialog'
  export default {
    mixins: [ getPersonDetail ],
    data () {
      return {
        itemsUnderIt: null,
        deptmentType: null,
        tableData:[],
        personDetail:{},
        reportDialog:false,
        oldStatus: null,  //是否为历史数据，判断查看全部报告按钮是否显示
      }
    },
    mounted(){
      this.itemsUnderIt = sessionStorage.getItem('itemsUnderIt')
      this.deptmentType = sessionStorage.getItem("deptmentType");
      if(this.$route.query.personId){
        this.getPersonDetails();
        this.getPersonDetailFun(this.$route.query.personId,this.$route.query.surverId,true);
      }
    },
    components: {
      AllReportDialog,
    },
    methods: {
      getPersonDetails(){
         this.$axios_http({
          url: "/base/person/find/getPersonDetails",
          data: {
                "personId":this.$route.query.personId,    
                "projectYear":this.$route.query.projectYear,      
                "surverId":this.$route.query.surverId
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
              this.tableData=res.data.result;
              res.data.result.filter(item=>{
                if(item.riskType === 'fa' && item.oldStatus === 1){
                  this.oldStatus = 1
                } else {
                  this.oldStatus = 2
                }
              })
          }
        })
      },
      //查看影像
      lookyx() {
        let href='http://yunzhen.chainz.net/#/study/dicom/interface?id=5c36da202dc918779a000b05&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YzM2MDM4NzU4N2JiYTNhMzJjZDIzMmEiLCJ0eXBlIjoidXNlciIsImFjY291bnRfdHlwZSI6InBoeXNpY2lhbiIsInNhbHQiOiJMR01SdG1Rbm9lajNHcnE5akRtaHJRPT0iLCJpYXQiOjE1NDcwOTEyNzcsImV4cCI6MTU3ODYyNzI3N30.GYAarm6OmNH3qd5ykuWKKYe1-s1lJ1PYsfcaWjd76Kg';
        window.open(href, '_blank')
      },
      //合并单元格
       objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // if (columnIndex === 0) {
        //   if (row.cancerSpecies=='乳腺癌') {
        //     return {
        //       rowspan: 2,
        //       colspan: 1
        //     };
        //   } else {
        //     return {
        //       rowspan: 0,
        //       colspan: 0
        //     };
        //   }
        // }
      },

      // 关闭弹框
      closeDialog(val) {
          this.reportDialog = val
      },
     
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.title{
  display: inline-block;
  padding-left: 10px;
  border-left: 2px solid #409EFF;
  color: #409EFF;
  height: 22px;
  line-height: 22px;
  margin-bottom: 20px;
}
.rows .el-row{
  margin-bottom: 15px;
  color: #606266;
  font-size:14px;
}
.rows .el-row span{
  display: inline-block;
  width: 100px;
  text-align: right;
}
</style>

