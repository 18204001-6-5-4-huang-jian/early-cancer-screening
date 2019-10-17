<template>
  <div>
    <!--表单查询-->
    <search-com :labelWidth="'100px'" :searchData="searchData" ref="searchAppoint" :formData="qc"
                    @searchChange="searchChange"></search-com>
    <div class="table-con-appointment">
      <cancer-widget>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="未预约" name="1">
          <table-com :propsData="propsData" :tableData="tableData" @change="handleSelectionChange" @selectAll="handleSelectionAll">
            <template slot="operating">
              <el-table-column
                label="操作"
                fixed="right"
                width="180">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="bookingOnlyFun(scope.row)">预约</el-button>
                </template>
              </el-table-column>
            </template>
          </table-com>
        </el-tab-pane>
        <el-tab-pane label="已预约" name="2">
          <table-com :propsData="propsData" :tableData="tableData">
            <template slot="operating">
              <el-table-column
                label="操作"
                fixed="right"
                width="180">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="cancel(scope.row)" v-if="scope.row.signStatus==2">取消预约</el-button>
                  <el-button 
                    type="text" 
                    size="small"
                    v-if="scope.row.signStatus==2"
                    @click="goToDetail(scope.row)">预约详情</el-button>
                </template>
              </el-table-column>
            </template>
          </table-com>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" size="small" class="batchBtn" @click="bookingBatchFun">批量预约</el-button>
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
    <!-- 取消预约弹窗 -->
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import mixin from "@/mixins/mixins";
import DICTIONARY from '@/views/common/dictionary';
import { APPOINT } from "@/views/recruitmentPoint/appointment/searchConfig";
import { APPOINTTB } from '@/views/recruitmentPoint/appointment/tablePropConfig'
export default {
  mixins: [mixin],
  data() {
    return {
      searchData: APPOINT,
      propsData: APPOINTTB,
      dialogVisible: false,
      cancelBookingReason: null,
      cancelBookingReasonOther: null,
      activeName: "1",
      tableData: [],
      multipleSelection: [],
      id: null, //q取消的ID
      cancelReasons: DICTIONARY.cancelReasons,
      allocRecordId: null, //放号记录id
      surverId: null,
      baseData: [], //待预约类型
      //查询条件
      qc: {},
      //查询结果
      queryResult: {
        pageNum: 1, //当前页
        pageSize: 10 //每页的条数
      }
    };
  },
  created() {
    this.getBaseDataListJcxm();
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
    searchChange(val) {
      this.qc = val;
      this.query();
    },
    query() {
      let _bookingStatus = null;
      // 待预约类型
      let _checkProject = this.checkProjetType();
      //1--未预约，2--已预约，3--取消预约
      if (this.activeName == "1") {
        _bookingStatus = "1";
      } else if (this.activeName == "2") {
        _bookingStatus = "2";
      }
      let obj = {
        bookingStatus: _bookingStatus,
        checkProject: _checkProject
      };
      this.$axios_http({
        url: "/base/booking/getBookingList",
        data: Object.assign({}, this.qc, obj, this.queryResult),
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.tableData = res.data.result.list;
          this.queryResult.totalPageCount = res.data.result.total;
          this.tableData.filter(item => {
            this.baseData.filter(item1 => {
              if (item.checkProject == item1.dataName) {
                item.dataCode = item1.dataCode;
              }
            });
          });
          localStorage.removeItem('searchParams');
        }
      });
    },
    handleClick(tab, event) {
      this.queryResult.pageNum = 1;
      this.queryResult.pageSize = 10;
      this.query();
    },
    bookingBatchFun() {
      localStorage.setItem(
        "selectTableRow",
        JSON.stringify(this.multipleSelection)
      );
      localStorage.setItem("activePath", this.$route.path);
      this.saveSearchParams();
      this.$router.push({
        path: "/appointment/addappoint",
        query: {
          resource: this.checkProjetType(),
          flag: "pl"
        }
      });
    },
    getBaseDataListJcxm() {
      this.$axios_http({
        url: "/base/system/baseDataType/getBaseDataList",
        data: {
          typeCode: "jcxm"
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.baseData = res.data.result.baseData;
        }
      });
    },
    //每页显示查询结果条数变更事件，做重新查询操作
    pageSizeChange(pageSize) {
      this.qc = this.getFormData("searchAppoint");
      this.queryResult.pageSize = pageSize;
      this.query();
    },
    //切换当前页事件，做重新查询操作
    currentPageChange(currentPage) {
      this.qc = this.getFormData("searchAppoint");
      this.queryResult.pageNum = currentPage;
      this.query();
    },

    bookingOnlyFun(row) {
      let arr = [];
      arr.push(row);
      localStorage.setItem("selectTableRow", JSON.stringify(arr));
      localStorage.setItem("activePath", this.$route.path);
      this.saveSearchParams();
      this.$router.push({
        path: "/appointment/addappoint",
        query: {
          id: row.id,
          surverId: row.surverId,
          resource: this.checkProjetType()
        }
      });
    },
    goToDetail(row) {
      this.saveSearchParams();
      this.$router.push({
        path: "/appointment/appointxq",
        query: {
          personId: row.personId,
          surverId: row.surverId
        }
      });
    },
    cancel(row) {
      this.saveSearchParams();
      this.cancelBookingReason = null;
      this.dialogVisible = true;
      this.id = row.id;
      this.allocRecordId = row.allocRecordId;
      this.surverId = row.surverId;
    },
    // 提交取消的原因
    submit() {
      // 待预约类型
      let _checkProject = this.checkProjetType();
      if (this.cancelBookingReason == "其他原因") {
        this.cancelBookingReason = this.cancelBookingReasonOther;
      }
      this.$axios_http({
        url: "/base/booking/cancelBooking",
        data: {
          personId: this.id,
          checkProject: _checkProject,
          cancelBookingReason: this.cancelBookingReason,
          surverId: this.surverId,
          allocRecordId: this.allocRecordId
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.$message({
            type: "success",
            message: "取消成功!"
          });
          this.dialogVisible = false;
          this.query();
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionAll(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.table-con-appointment {
  position: relative;
  .el-button.batchBtn {
    position: absolute;
    right: 40px;
    top: 20px;
  }
}
</style>

