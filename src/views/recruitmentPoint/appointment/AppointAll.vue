<template>
    <div>
        <search-com ref="appointAll" :labelWidth="'100px'" :searchData="searchData" :formData="qc"
                    @searchChange="searchChange">
        </search-com>
        <div class="table-con-appointment">
            <cancer-widget>
                <template slot="sub-button">
                    <!-- <el-button type="success" size="small" @click="exportExcel">导出EXCEL</el-button> -->
                </template>
                <table-com :propsData="propsData" :tableData="listTableData.list">
                    <template slot="operating">
                         <el-table-column
                            label="生物样本ID"
                            width="120px">
                            <template slot-scope="scope">
                                <span type="text" size="small" v-if="scope.row.mainSampleId">{{scope.row.mainSampleId}}</span>
                                <el-button type="text" size="small" @click="addDiologicalID(scope.row)" v-if="!scope.row.mainSampleId && scope.row.showSignBotton!=1">录入</el-button>
                                </template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" width="150">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="bookingBatchSign(scope.row)" v-if="scope.row.showSignBotton === 1">签到</el-button>
                                <el-button type="text" size="small" @click="print(scope.row)" v-if="scope.row.showPrintBotton === 1">条码</el-button>
                                <router-link :to="{path:'/appointment/guidelines',query:{
                                  personId:scope.row.personId,
                                  surverId:scope.row.surverId,
                                  }}">
                                  <el-button type="text" size="small" v-if="scope.row.showPrintBotton === 1 && hostname === '192.168.168.199'">指引单</el-button>
                                  <!-- <el-button type="text" size="small" v-if="scope.row.showPrintBotton === 1">指引单</el-button> -->
                                </router-link>
                            </template>
                        </el-table-column>
                    </template>
                </table-com>
                <!-- 分页 -->
                <br>
                <el-pagination
                        @size-change="tableSizeChange"
                        @current-change="tablePageChange"
                        :current-page.sync="listTableData.pageNum"
                        :page-sizes="[10, 20, 50, 100, 200]"
                        :page-size="listTableData.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="listTableData.total">
                </el-pagination>
                <br>
            </cancer-widget>
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
        </div>
    </div>
</template>
<script>
import mixin from "@/mixins/mixins";
import DICTIONARY from "@/views/common/dictionary";
import { PrintAccount } from '@/views/recruitmentPoint/appointment/doPrint'
import { getLodop } from '@/plugin/lodop'
export default {
  name: "samples-index",
  mixins: [mixin],
  data() {
    return {
      hostname: null,
      idDialogVisible: false,
      mainSampleId: null,
      itemsUnderIt: null,
      //查询条件
      qc: {
        name: null,
        phone: null,
        idCard: null,
        personStatus: null,
        deptName: null,
        deptType: 2
      },
      listTableData: {
        pageNum: 1,
        pageSize: 10
      },
      searchData: [
        {
          type: "text",
          title: "SID/问卷ID",
          name: "surverId"
        },
        {
          type: "text",
          title: "姓名",
          name: "name"
        },
        {
          type: "text",
          title: "身份证号",
          name: "idCard"
        },
        {
          type: "select",
          title: "所属项目",
          name: "itemOnly",
          optionProps: {
            label: "name",
            value: "id"
          },
          optionData: DICTIONARY.itemsUnderIt
        },
        {
          type: "select",
          title: "签到状态",
          name: "signStatus",
          optionProps: {
            label: "name",
            value: "id"
          },
          optionData: DICTIONARY.signStatus
        }
      ],
      propsData: {
        oneCol: {
          isShow: false,
          type: "selection",
          width: "50"
        },
        tableProps: [
          {
            prop: "surverId",
            label: "SID/问卷ID",
            width: "150" //如果不设置宽度，可不写
          },
          {
            prop: "name",
            label: "姓名",
            width: "100"
          },
          {
            prop: "sex",
            label: "性别",
            width: "50",
            isFilter: true,
            filter: "sexFilter"
          },
          {
            prop: "idCard",
            label: "身份证号",
            width: "180"
          },
          {
            prop: "phone",
            label: "联系电话",
            width: "120"
          },
          {
            prop: "ctStatus",
            label: "低剂量CT",
            width: "120"
          },
          {
            prop: "rxcsStatus",
            label: "乳腺超声",
            width: "120"
          },
          {
            prop: "rxxxStatus",
            label: "乳腺X线",
            width: "120"
          },
          {
            prop: "gaStatus",
            label: "肝癌三项",
            width: "120"
          },
          {
            prop: "sxhdStatus",
            label: "上消内镜",
            width: "120"
          },
          {
            prop: "cjStatus",
            label: "结直肠镜",
            width: "120"
          },
          {
            prop: "itemOnly",
            label: "所属项目",
            isFilter: true,
            filter: "itemsUnderItFilter",
            width: "100"
          },
          {
            prop: "deptName",
            label: "所属机构",
            width: "140"
          }
        ]
      }
    };
  },
  created() {
    this.getListData();
    this.hostname = window.location.hostname;
  },
  methods: {
    async getListData() {
      let result = await this.requestTable({
        url: "/base/zm/booking/getBookedInfoForPerson",
        currentObj: this.listTableData,
        params: Object.assign({}, this.qc)
      });
      this.listTableData = Object.assign({}, result);
    },
    cancel() {
      this.idDialogVisible = false;
      this.biologicalID = null;
    },
    handleClose(done) {
      done();
      this.biologicalID = null;
    },
    addDiologicalID(row) {
      this.rowData = row;
      this.idDialogVisible = true;
      this.mainSampleId = null;
      this.itemsUnderIt = row.itemOnly;
    },
    // 提交生物样本ID
    submitBiologicalID() {
      if (!this.mainSampleId) {
        this.$message({
          type: "error",
          message: "生物样本ID不能为空"
        });
        return;
      } else {
        if (this.itemsUnderIt && this.itemsUnderIt == 1) {
          //肺肠验证
          if (!/^([0-9]{9})$/.test(this.mainSampleId)) {
            this.$message({
              type: "error",
              message: "生物样本ID校验规则未通过"
            });
            return;
          }
        } else if (this.itemsUnderIt && this.itemsUnderIt == 2) {
          //早诊验证
          if (!/^([0-9]{11}[A-Z]{0,1}|[0-9]{12})$/.test(this.mainSampleId)) {
            this.$message({
              type: "error",
              message: "生物样本ID校验规则未通过"
            });
            return;
          }
          if (this.mainSampleId.length < 11) {
            this.$message({
              type: "error",
              message: "生物样本ID校验规则未通过"
            });
            return;
          }
        }
      }
      this.$axios_http({
        url: "/base/biological/add/mainBiologicalSampleInfo",
        data: {
          deptId: this.rowData.deptId,
          personId: this.rowData.personId,
          surverId: this.rowData.surverId,
          itemsUnderIt: this.itemsUnderIt,
          mainSampleId:
            this.itemsUnderIt == 1
              ? "CH" + this.mainSampleId
              : this.mainSampleId.substring(0, 11)
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.$message({
            type: "success",
            message: "录入成功"
          });
          this.idDialogVisible = false;
          this.getListData();
        }
      });
    },
    // 签到
    bookingBatchSign(row) {
      this.$confirm("请确认是否给受试者批量签到?", "签到确认", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning"
      })
        .then(() => {
          this.$axios_http({
            url: "/base/zm/booking/bookingBatchSign",
            data: {
              deptId: row.deptId,
              personId: row.personId,
              surverId: row.surverId,
              itemsUnderIt: row.itemOnly,
              deptName: row.deptName
            },
            vueObj: this
          }).then(res => {
            if (res.data.status == "SUCCESS") {
              // 没有录入生物样本ID，弹出录入框
              if (!row.mainSampleId) {
                this.$message({
                  type: "success",
                  message: "签到成功，请输入生物样本ID！"
                });
                this.idDialogVisible = true;
                this.rowData = row;
                this.mainSampleId = null;
                this.itemsUnderIt = row.itemOnly;
              } else {
                this.$message({
                  type: "success",
                  message: "签到成功！"
                });
              }
              this.getListData();
            }
          });
        })
        .catch(() => {});
    },
    // 打印
    print(row) {
      this.$axios_http({
        url: "/base/zm/booking/printTXM",
        data: {
          personId: row.personId,
          surverId: row.surverId
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          res.data.result.filter(item=>{
            PrintAccount(item.xm,item.check,item.txm)
          })
        }
      });
    },
    tableSizeChange(val) {
      this.listTableData.pageSize = val;
      if (this.$refs["appointAll"]) {
        this.qc = this.$refs["appointAll"].formData;
      }
      this.qc.deptType = 2;
      this.getListData();
    },

    // 分页=>改变当前页
    tablePageChange(val) {
      this.qc = this.getFormData("appointAll");
      this.qc.deptType = 2;
      this.listTableData.pageNum = val;
      this.getListData();
    },
    searchChange(val) {
      this.qc = this.getFormData("appointAll");
      this.qc.deptType = 2;
      this.qc = val;
      this.getListData();
    }
  }
};
</script>
