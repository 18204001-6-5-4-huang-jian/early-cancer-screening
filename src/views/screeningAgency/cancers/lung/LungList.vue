<template>
  <div>
    <!--查询表单-->
    <search-com :labelWidth="'100px'" :searchData="searchData" ref="searchLung" :formData="qc"
                    @searchChange="searchHandler"></search-com>
    <div class="table-con-appointment">
      <cancer-widget isBorder>
          <template slot="sub-button">
            <el-button type="success" size="small" @click="exportExcel">导出EXCEL</el-button>
          </template>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: -50px;">
            <el-tab-pane label="筛查结果待录入" name="1">
              <table-com :propsData="propsData" :tableData="tableData">
                <template slot="operating">
                  <el-table-column
                    label="操作"
                    fixed="right"
                    width="180">
                    <template slot-scope="scope">
                      <!-- 早诊按钮 -->
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.tubercleInputStatus==2 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="writeNodule(scope.row)">填写结节</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.tubercleInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="watchNodule(scope.row)">查看结节</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==2 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="writeResultOther(scope.row)">填写其他表现</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="watchResultOther(scope.row)">查看其他表现</el-button>
                      <!-- 20190605添加开始 -->
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==2 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 2"
                        @click="writeResult(scope.row)">填写结果</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 2"
                        @click="watchResult(scope.row)">查看结果</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==3 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 2"
                        @click="generateCtReport(scope.row)">生成结果报告</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 2"
                        @click="watchCtReport(scope.row)">查看报告</el-button>
                      <!-- 20190605添加结束 -->
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==3 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="generateReport(scope.row)">生成结果报告</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="watchReport(scope.row)">查看报告</el-button>
                      <!-- 肺肠按钮 -->
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==2 && scope.row.itemsUnderIt == 1"
                        @click="writeLdctResult(scope.row)">填写结果</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==1 && scope.row.itemsUnderIt == 1"
                        @click="watchLdctResult(scope.row)">查看结果</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==3 && scope.row.itemsUnderIt == 1"
                        @click="generateLdctReport(scope.row)">生成结果报告</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==1 && scope.row.itemsUnderIt == 1"
                        @click="watchLdctReport(scope.row)">查看报告</el-button>
                      <!-- 公共按钮 -->
                      <el-button type="text" size="small" v-if="scope.row.study" @click="lookyx(scope.row)">查看影像结果</el-button>
                    </template>
                  </el-table-column>
                </template>
              </table-com>
            </el-tab-pane>
            <!-- <el-tab-pane label="筛查结果待提交" name="2">
              <LungTable :tableData="tableData" @refreshList="query"></LungTable>
            </el-tab-pane> -->
            <el-tab-pane label="筛查结果已录入" name="3">
              <table-com :propsData="propsData" :tableData="tableData">
                <template slot="operating">
                  <el-table-column
                    label="操作"
                    fixed="right"
                    width="180">
                    <template slot-scope="scope">
                      <!-- 早诊按钮 -->
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.tubercleInputStatus==2 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="writeNodule(scope.row)">填写结节</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.tubercleInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="watchNodule(scope.row)">查看结节</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==2 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="writeResultOther(scope.row)">填写其他表现</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="watchResultOther(scope.row)">查看其他表现</el-button>
                      <!-- 20190605添加开始 -->
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==2 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 2"
                        @click="writeResult(scope.row)">填写结果</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 2"
                        @click="watchResult(scope.row)">查看结果</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==3 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 2"
                        @click="generateCtReport(scope.row)">生成结果报告</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 2"
                        @click="watchCtReport(scope.row)">查看报告</el-button>
                      <!-- 20190605添加结束 -->
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==3 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="generateReport(scope.row)">生成结果报告</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==1 && scope.row.itemsUnderIt == 2 && scope.row.oldStatus == 1"
                        @click="watchReport(scope.row)">查看报告</el-button>
                      <!-- 肺肠按钮 -->
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==2 && scope.row.itemsUnderIt == 1"
                        @click="writeLdctResult(scope.row)">填写结果</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.resultInputStatus==1 && scope.row.itemsUnderIt == 1"
                        @click="watchLdctResult(scope.row)">查看结果</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==3 && scope.row.itemsUnderIt == 1"
                        @click="generateLdctReport(scope.row)">生成结果报告</el-button>
                      <el-button 
                        type="text" 
                        size="small"
                        v-if="scope.row.reportInputStatus==1 && scope.row.itemsUnderIt == 1"
                        @click="watchLdctReport(scope.row)">查看报告</el-button>
                      <!-- 公共按钮 -->
                      <el-button type="text" size="small" v-if="scope.row.study" @click="lookyx(scope.row)">查看影像结果</el-button>
                    </template>
                  </el-table-column>
                </template>
              </table-com>
            </el-tab-pane>
          </el-tabs>
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
import DICTIONARY from "@/views/common/dictionary";
import dateFormater from "@/filters/index";
import { LUNG } from "./searchConfig";
import { LUNGTB } from "./tablePropConfig";
export default {
  data() {
    return {
      activeName: "1",
      searchData: LUNG,
      propsData: LUNGTB,
      inputStatus: DICTIONARY.inputStatus, //录入状态
      lungResult: DICTIONARY.lungResult, //筛查结果
      personStatus: DICTIONARY.personStatus, //人员状态
      pathology: DICTIONARY.pathology, //病理
      sex: DICTIONARY.sex,
      valueTime: null, //预约时间
      unInputNum: null, //待录入数
      unSubmitNum: null, //待提交数
      tableData: [],
      //查询条件
      qc: {},
      //查询结果
      queryResult: {
        pageNo: 1, //当前页
        pageSize: 10, //每页的条数
        totalPageCount: 0
      }
    };
  },
  created() {},
  mounted() {
    // 页面初始化
    if (localStorage.getItem("searchParams")) {
      let { qc, queryResult, activeName } = JSON.parse(
        localStorage.getItem("searchParams")
      );
      this.qc = qc;
      this.queryResult = queryResult;
      this.activeName = activeName;
    }
    this.query();
  },
  methods: {
    // 填写结节
    writeNodule(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/noduleentry",
        query: {
          screeningId: row.screeningId,
          surverId: row.surverId,
          id: row.id,
          personId: row.personId
        }
      });
    },
    // 查看结节
    watchNodule(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/nodulelook",
        query: {
          screeningId: row.screeningId,
          id: row.id,
          personId: row.personId,
          surverId: row.surverId,
          tubercleId: row.tubercleId,
          reportInputStatus: row.reportInputStatus
        }
      });
    },
    // 填写其他表现
    writeResultOther(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/resultentry",
        query: {
          screeningId: row.screeningId,
          surverId: row.surverId,
          id: row.id,
          personId: row.personId,
          resultInputStatus: row.resultInputStatus
        }
      });
    },
    // 查看其他表现
    watchResultOther(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/resultlook",
        query: {
          screeningId: row.screeningId,
          id: row.id,
          personId: row.personId,
          surverId: row.surverId,
          resultFormId: row.resultFormId,
          reportInputStatus: row.reportInputStatus,
          resultInputStatus: row.resultInputStatus
        }
      });
    },
    // 填写早诊结果
    writeResult(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/ct",
        query: {
          screeningId: row.screeningId,
          surverId: row.surverId,
          id: row.id,
          personId: row.personId,
          signedDate: row.signedDate,
          flag: 1
        }
      });
    },
    // 查看早诊结果
    watchResult(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/ct",
        query: {
          resultFormId: row.resultFormId,
          reportInputStatus: row.reportInputStatus,
          id: row.id,
          type: 2,
          flag: 2
        }
      });
    },
    // 生成CT报告
    generateCtReport(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/ctreport",
        query: {
          reportId: row.reportId,
          id: row.id,
          type: 1
        }
      });
    },
    // 查看报告
    watchCtReport(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/ctreport",
        query: {
          screeningId: row.screeningId,
          id: row.id,
          personId: row.personId,
          surverId: row.surverId,
          reportId: row.reportId,
          type: 2
        }
      });
    },
    generateReport(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/resultreport",
        query: {
          screeningId: row.screeningId,
          id: row.id,
          personId: row.personId,
          surverId: row.surverId,
          reportId: row.reportId
        }
      });
    },
    watchReport(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/reportlook",
        query: {
          screeningId: row.screeningId,
          id: row.id,
          personId: row.personId,
          surverId: row.surverId,
          reportId: row.reportId
        }
      });
    },
    writeLdctResult(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/ldctform/ct/index",
        query: {
          screeningId: row.screeningId,
          surverId: row.surverId,
          id: row.id,
          personId: row.personId,
          signedDate: row.signedDate,
          flag: 1
        }
      });
    },
    watchLdctResult(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/ldctform/ct/index",
        query: {
          resultFormId: row.resultFormId,
          reportInputStatus: row.reportInputStatus,
          id: row.id,
          type: 2,
          flag: 2
        }
      });
    },
    generateLdctReport(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/ldctform/ctreport/index",
        query: {
          reportId: row.reportId,
          id: row.id,
          type: 1
        }
      });
    },
    watchLdctReport(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/ldctform/ctreport/index",
        query: {
          screeningId: row.screeningId,
          id: row.id,
          personId: row.personId,
          surverId: row.surverId,
          reportId: row.reportId,
          type: 2
        }
      });
    },
    // 存储searchParams
    saveSearchParams() {
      localStorage.setItem(
        "searchParams",
        JSON.stringify(
          Object.assign({}, {
            qc: this.qc,
            activeName: this.activeName,
            queryResult: this.queryResult
          })
        )
      );
    },
    // 查看影像
    lookyx(row) {
      this.$axios_http({
        url: "/base/imageData/get/image",
        data: {
          id: row.imageId,
          study: row.study,
          hosSynchronizeHospitalId: row.hosSynchronizeHospitalId
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          window.open(res.data.result, "_blank");
        }
      });
    },
    //搜索
    searchHandler(val) {
      this.qc = val;
      this.query();
    },
    query() {
      //1--待录入，2--待提交，3--已录入
      let inputStatus = null;
      if (this.activeName == "1") {
        inputStatus = 2;
      } else if (this.activeName == "2") {
        inputStatus = 3;
      } else if (this.activeName == "3") {
        inputStatus = 1;
      }
      delete this.qc.checkDate;
      // 预约日期
      this.$axios_http({
        url: "/base/ct/find/list/condition",
        data: Object.assign({}, this.qc, {
          inputStatus: inputStatus,
          pageNum: this.queryResult.pageNo,
          pageSize: this.queryResult.pageSize
        }),
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.tableData = res.data.result.list;
          this.queryResult.totalPageCount = res.data.result.total;
          localStorage.removeItem('searchParams');
        }
      });
    },
    handleClick(tab, event) {
      this.queryResult.pageNo = 1;
      this.queryResult.pageSize = 10;
      this.query();
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      this.qc = this.getFormData("searchLung");
      this.queryResult.pageSize = pageSize;
      this.query();
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.qc = this.getFormData("searchLung");
      this.queryResult.pageNo = currentPage;
      this.query();
    },
    exportExcel() {
      this.qc = this.getFormData("searchLung");
      //1--待录入，2--待提交，3--已录入
      let inputStatus = null;
      let name = "";
      if (this.activeName == "1") {
        inputStatus = 2;
        name = "结果待录入.xls";
      } else if (this.activeName == "2") {
        inputStatus = 3;
        name = "筛查结果待提交.xls";
      } else if (this.activeName == "3") {
        inputStatus = 1;
        name = "筛查结果已录入.xls";
      }
      this.$axios_http({
        method: "POST",
        url: "/base/ct/data/export",
        responseType: "blob",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        data: Object.assign({}, this.qc, {
          inputStatus: inputStatus,
          pageNum: this.queryResult.pageNo,
          pageSize: this.queryResult.pageSize
        }),
        vueObj: this
      }).then(res => {
        if (!res.data) {
          return;
        }
        if (res.data.type == "text/xml") {
          this.$confirm("对不起，您的登录状态已过期，请重新登录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            showCancelButton: false,
            type: "warning"
          })
            .then(() => {
              window.location.href = BIGPLATFORM_URL;
            })
            .catch(() => {});
          return;
        }
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>

