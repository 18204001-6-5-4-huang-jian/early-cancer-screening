<template>
  <div>
    <!--查询表单-->
    <search-com :labelWidth="'100px'" :searchData="searchData" ref="searchLiver" :formData="qc"
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
                label="所属项目">
                <template slot-scope="scope">
                    <span>早诊早治</span>
                  </template>
              </el-table-column>
                <el-table-column
                label="操作"
                fixed="right"
                width="180"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" v-if="scope.row.resultInputStatus==2" @click="writeResult(scope.row)">填写结果</el-button>
                  <!-- <router-link
                    :to="{path:'/form/mammaryultrasound',
                    query:{
                      checkInfoId:scope.row.id,
                      surverId:scope.row.surverId,
                      personId:scope.row.personId,
                      screeningId:scope.row.screeningId,
                      resultFormId:scope.row.resultFormId
                    }}"
                    v-if="scope.row.resultInputStatus==3">
                    <el-button type="text" size="small">继续填写结果</el-button>
                  </router-link> -->
                </template>
              </el-table-column>
            </template>
          </table-com>
        </el-tab-pane>
        <!-- <el-tab-pane :label="'筛查结果待提交('+unSubmitNum+')'" name="2">
          <CommonTable :tableData="tableData" @refreshList="query"></CommonTable>
        </el-tab-pane> -->
        <el-tab-pane label="筛查结果已录入" name="3">
          <table-com :propsData="propsData" :tableData="tableData">
            <template slot="operating">
              <el-table-column
                label="所属项目">
                <template slot-scope="scope">
                    <span>早诊早治</span>
                  </template>
              </el-table-column>
                <el-table-column
                label="操作"
                fixed="right"
                width="180"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" v-if="scope.row.resultInputStatus==1" @click="watchResult(scope.row)">查看结果</el-button>
                  <el-button type="text" size="small" v-if="scope.row.resultInputStatus==1 && scope.row.reportInputStatus!=1" @click="generateReport(scope.row)">生成报告</el-button>
                  <el-button type="text" size="small" v-if="scope.row.reportInputStatus==1" @click="watchReport(scope.row)">查看报告</el-button>
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
import { LIVER } from "./searchConfig";
import { TABLECOLUMN } from "./tablePropConfig";
export default {
  data() {
    return {
      searchData: LIVER,
      propsData: TABLECOLUMN,
      activeName: "1",
      inputStatus: DICTIONARY.inputStatus, //录入状态
      screeningResult: DICTIONARY.screeningResult, //筛查结果
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
  created() {
    // this.getCount();
  },
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
    // 填写结果
    writeResult(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/liverentry",
        query: {
          screeningId: row.screeningId,
          surverId: row.surverId,
          id: row.id,
          personId: row.personId
        }
      });
    },
    // 查看结果
    watchResult(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/liverlook",
        query: {
          screeningId: row.screeningId,
          id: row.id,
          personId: row.personId,
          surverId: row.surverId,
          resultFormId: row.resultFormId,
          reportInputStatus: row.reportInputStatus
        }
      });
    },
    // 生成报告
    generateReport(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/liverreport",
        query: {
          screeningId: row.screeningId,
          id: row.id,
          personId: row.personId,
          surverId: row.surverId,
          reportId: row.reportId
        }
      });
    },
    // 查看报告
    watchReport(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/form/liverreport",
        query: {
          screeningId: row.screeningId,
          id: row.id,
          personId: row.personId,
          surverId: row.surverId,
          reportId: row.reportId,
          resultFormId: row.resultFormId,
          flag: 0
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
      this.$axios_http({
        url: "/base/gan/find/gaList/condition",
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
      this.qc = this.getFormData("searchLiver");
      this.queryResult.pageSize = pageSize;
      this.query();
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.qc = this.getFormData("searchLiver");
      this.queryResult.pageNo = currentPage;
      this.query();
    },
    //查询条数
    getCount() {
      this.$axios_http({
        url: "/base/gan/find/gaCount/num",
        data: {
          surverId: this.qc.surverId,
          screeningId: this.qc.screeningId,
          name: this.qc.name,
          sex: this.qc.sex,
          idCard: this.qc.idCard,
          phone: this.qc.phone,
          beginDate: this.qc.beginDate,
          endDate: this.qc.endDate,
          screeningResult: this.qc.screeningResult,
          personStatus: this.qc.personStatus
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.unInputNum = res.data.result.unInput;
          this.unSubmitNum = res.data.result.unSubmit;
        }
      });
    },
    exportExcel() {
      this.qc = this.getFormData("searchLiver");
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
        url: "/base/gan/data/export",
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

