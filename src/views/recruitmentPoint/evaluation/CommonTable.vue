<template>
  <div>
    <table-com :propsData="propsData" :tableData="listTableData.list">
        <template slot="operating">
            <el-table-column
                  label="知情同意书"
                  width="100">
                  <template slot-scope="scope">
                    <el-button size="small" type="text" @click="watchPath(scope.row)" v-if="scope.row.uploadInformedConsentStatus === 1">查看</el-button>
                    <span v-else>{{scope.row.uploadInformedConsentStatus | uploadInformedFilter}}</span>
                  </template>
                </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="203">
              <template slot-scope="scope">
                <el-button size="small" 
                type="text" 
                @click="watchResult(scope.row)" 
                v-if="scope.row.evaluateStatus === 4 && scope.row.checkStatus === 2 && scope.row.itemsUnderIt === 2">查看详情</el-button>
                <el-button size="small"
                          type="text"
                          v-if="scope.row.evaluateStatus==2 && scope.row.itemsUnderIt === 2 && (scope.row.checkStatus === 1 || !scope.row.checkStatus)"
                          @click="watchForm(scope.row)">查看详情</el-button>

                <!-- 肺肠按钮 -->
                <el-button size="small" type="text" @click="watchFormLdct(scope.row)" v-if="scope.row.evaluateStatus === 4 && scope.row.itemsUnderIt === 1">查看详情</el-button>
                <el-button size="small" type="text" @click="modifyFormLdct(scope.row)" v-if="scope.row.evaluateStatus != 4 && scope.row.itemsUnderIt === 1">继续录入</el-button>

                <el-button size="small" type="text" @click="nextWrite(scope.row)" v-if="scope.row.evaluateStatus === 1 && scope.row.checkStatus === null && scope.row.itemsUnderIt === 2">继续录入</el-button>
                <el-button size="small" type="text" class="sure"  @click="confirmNotice(scope.row)" v-if="scope.row.noticeStatus === 2 && scope.row.evaluateStatus === 4">短信通知</el-button>
                <el-button size="small" type="text" @click="modifyForm(scope.row)" v-if="scope.row.checkStatus === 3 && scope.row.itemsUnderIt === 2">修改问卷</el-button>
                <el-button size="small" type="text" @click="print(scope.row)" v-if="scope.row.uploadInformedConsentStatus === 1 && scope.row.itemsUnderIt === 2">打印</el-button>
                <!-- <el-button size="small" type="text" @click="watchPath(scope.row)" v-if="scope.row.uploadInformedConsentStatus === 1">查看</el-button> -->
              </template>
            </el-table-column>
        </template>
    </table-com>
    <!--分页-->
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
  </div>
</template>
<script>
import mixin from "@/mixins/mixins";
import { EVALUATIONTB } from "@/views/recruitmentPoint/evaluation/tablePropConfig";
export default {
  name: "cancer-evaluation-common-table",
  mixins: [mixin],
  data() {
    return {
      propsData: EVALUATIONTB
    };
  },
  props: {
    listTableData: {
      type: Object,
      default: {}
    },
    qc: {
      type: Object,
      default: {}
    },
    activeName: {
      type: String,
      default: null
    }
  },
  methods: {
    // 存储searchParams
    saveSearchParams() {
      localStorage.setItem(
        "searchParams",
        JSON.stringify(
          Object.assign(
            {},
            {
              qc: this.qc,
              activeName: this.activeName,
              queryResult: this.listTableData
            }
          )
        )
      );
    },
    // 分页=>改变每页条数
    tableSizeChange(val) {
      this.formData = this.getFormData("searchEvaluation");
      this.$emit("sizeChange", val);
    },

    // 分页=>改变当前页
    tablePageChange(val) {
      this.formData = this.getFormData("searchEvaluation");
      this.$emit("pageChange", val);
    },

    // 继续录入  控制表单按钮---flag
    nextWrite(row) {
      this.saveSearchParams()
      this.$router.push({
        path: "/evaluation/evaluationreport",
        query: { id: row.id, flag: 1, itemsUnderIt: 2, personId: row.personId }
      });
      // this.jumpToPage('/evaluation/evaluationreport', {id: row.id})
    },

    // 查看结果
    watchResult(row) {
      this.saveSearchParams()
      this.$router.push({
        path: "/evaluation/evaluationresult",
        query: { id: row.id, itemsUnderIt: row.itemsUnderIt}
      });
      // this.$emit('watchResultHandler', row, true)
    },

    watchFormLdct(row) {
      this.saveSearchParams()
      this.$router.push({
        path: "/evaluation/evaluationreport",
        query: { id: row.eligibilityFormId, flag: 1, itemsUnderIt: 1 }
      });
      // this.$emit('watchResultHandler', row, true)
    },

    // 查看问卷  控制表单按钮---flag
    watchForm(row) {
      this.saveSearchParams()
      if (row.checkStatus == 1 || !row.checkStatus) {
        //待审核+提交问卷，待录入fit等结果
        this.$router.push({
          path: "/form/evaluationlook",
          query: { id: row.id, flag: 0, checkStatus: row.checkStatus }
        });
      } else if (row.checkStatus == 2) {
        //审核通过
        this.$router.push({
          path: "/form/evaluationlook",
          query: { id: row.id, flag: 3, checkStatus: row.checkStatus }
        });
      }
    },

    // 确认已通知(表格中)
    confirmNotice(row) {
      // debugger
      this.$emit("confirmNotice", true, row.itemsUnderIt, row);
    },

    // 修改  控制表单按钮---flag
    modifyForm(row) {
      this.saveSearchParams()
      this.$router.push({
        path: "/evaluation/evaluationreport",
        query: {
          id: row.id,
          flag: 4,
          itemsUnderIt: 2,
          resource: 0,
          checkStatus: row.checkStatus,
          personId: row.personId
        }
      });
    },

    modifyFormLdct(row) {
      this.saveSearchParams()
      this.$router.push({
        path: "/evaluation/evaluationreport",
        query: { id: row.eligibilityFormId, flag: 2, itemsUnderIt: 1 }
      });
    },

    //查看路径
    watchPath(row) {
      this.$emit("watchPathHandle", true, row);
    },

    //打印
    print(row) {
      this.saveSearchParams()
      this.$emit("printHandle", row);
    }
  }
};
</script>
<style scoped>
.spanActive {
  color: red;
}
</style>