<template>
    <el-dialog
    class="allReportDialog"
      title="查看报告"
      :before-close="closeDialog"
      :visible.sync="reportDialog"
      width="800px">
      <el-button size="small" type="primary" style="float: right;" @click="printFromContent('print')">打印</el-button>
      <div id="print">
        <table>
          <thead style="display:table-header-group;">
            <tr>
              <td>
                <div class="fixCon">
                  <h2 class="tit">城市癌症早诊早治项目</h2>
                  <p class="smallTit">癌症筛查报告书</p>

                  <div class="personInfo">
                    <h3>个人信息</h3>
                    <el-row>
                      <el-col :span="8">
                        <p>问卷调查ID:{{personInfo.surverId}}</p>
                      </el-col>
                      <el-col :span="8">
                        <p>姓名：{{personInfo.name}}</p>
                      </el-col>
                      <el-col :span="8">
                        <p>性别：{{personInfo.sex | sexFilter}}</p>
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom:5px">
                      <el-col :span="8">
                        <p>身份证号:{{personInfo.idCard}}</p>
                      </el-col>
                      <el-col :span="8">
                        <p>联系电话：{{personInfo.phone}}</p>
                      </el-col>
                      <el-col :span="8">
                        <p>报告日期：{{personInfo.lastReportDate | dateFilter}}</p>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody class="pageLine">
            <tr>
              <td>
                <!-- CT报告 -->
                <div class="block" v-if="JSON.stringify(hosCtReportPO)!='{}'">
                  <h3>胸部低剂量螺旋CT</h3>
                  <div>
                    <p class="block-tit">检查日期：</p>
                    <span>{{hosCtReportPO.checkTime | dateFilter}}</span>
                  </div>
                  <div>
                    <p class="block-tit">检查所见：</p>
                    <!-- 结节结果 -->
                    <div v-if="hosCtReportPO.tubercle1" v-html="$options.filters.msg(hosCtReportPO.tubercle1)"></div>
                    <div v-if="hosCtReportPO.tubercle2" v-html="$options.filters.msg(hosCtReportPO.tubercle2)"></div>
                    <div v-if="hosCtReportPO.tubercle3" v-html="$options.filters.msg(hosCtReportPO.tubercle3)"></div>
                    <div v-if="hosCtReportPO.tubercle4" v-html="$options.filters.msg(hosCtReportPO.tubercle4)"></div>
                    <div v-if="hosCtReportPO.tubercle5" v-html="$options.filters.msg(hosCtReportPO.tubercle5)"></div>
                    <div v-if="hosCtReportPO.tubercle6" v-html="$options.filters.msg(hosCtReportPO.tubercle6)"></div>
                    <div v-if="hosCtReportPO.tubercle7" v-html="$options.filters.msg(hosCtReportPO.tubercle7)"></div>
                    <div v-if="hosCtReportPO.tubercle8" v-html="$options.filters.msg(hosCtReportPO.tubercle8)"></div>
                    <div v-if="hosCtReportPO.tubercle9" v-html="$options.filters.msg(hosCtReportPO.tubercle9)"></div>
                    <div v-if="hosCtReportPO.tubercle10" v-html="$options.filters.msg(hosCtReportPO.tubercle10)"></div>

                    <br>
                    <!-- 异常结果 -->
                    <div v-if="hosCtReportPO.anomalousEvent" v-html="$options.filters.msg(hosCtReportPO.anomalousEvent)"></div>
                    
                    <br>
                    <!-- 未见异常结果 -->
                    <div v-if="hosCtReportPO.unanomalousEvent" v-html="$options.filters.msg(hosCtReportPO.unanomalousEvent)"></div>
                    
                  </div>
                  <div>
                    <p class="block-tit">影像学诊断：</p>
                    <div v-html="$options.filters.msg(hosCtReportPO.imagingDiagnosis)"></div>
                  </div>
                </div>
                <!-- 乳腺超声 -->
                <div class="block" v-if="JSON.stringify(hosRxcsReportPO)!='{}'">
                  <h3>乳腺超声</h3>
                  <div>
                    <p class="block-tit">检查日期：</p>
                    <span>{{hosRxcsReportPO.checkDate | dateFilter}}</span>
                  </div>
                  <div>
                    <p class="block-tit">超声描述：</p>
                    <div v-html="$options.filters.msg(hosRxcsReportPO.ultrasonicDescribe)"></div>
                  </div>
                  <div>
                    <p class="block-tit">超声提示（仅供参考）：</p>
                    <div v-html="$options.filters.msg(hosRxcsReportPO.ultrasonicPrompt)"></div>
                  </div>
                </div>
                <!-- 乳腺X -->
                <div class="block" v-if="JSON.stringify(hosRxxxReportPO)!='{}'">
                  <h3>乳腺X线</h3>
                  <div>
                    <p class="block-tit">检查日期：</p>
                    <span>{{hosRxxxReportPO.checkDate | dateFilter}}</span>
                  </div>
                  <div>
                    <p class="block-tit">检查所见：</p>
                    <div v-html="$options.filters.msg(hosRxxxReportPO.checkText)"></div>
                  </div>
                  <div>
                    <p class="block-tit">影像评估结果：</p>
                    <div v-html="$options.filters.msg(hosRxxxReportPO.imagingEvaluateResult)"></div>
                  </div>
                  <div>
                    <p class="block-tit">检查结论（仅供参考）：</p>
                    <div v-html="$options.filters.msg(hosRxxxReportPO.checkConclusion)"></div>
                  </div>
                </div>
                <!-- 结直肠内镜 -->
                <div class="block" v-if="JSON.stringify(hosCjReportPO)!='{}'">
                  <h3>结直肠内镜</h3>
                  <div>
                    <p class="block-tit">检查日期：</p>
                    <span>{{hosCjReportPO.checkDate | dateFilter}}</span>
                  </div>
                  <div>
                    <p class="block-tit">检查所见：</p>
                    <div v-html="$options.filters.msg(hosCjReportPO.checkText)"></div>
                  </div>
                  <div>
                    <p class="block-tit">内镜下诊断（仅供参考）：</p>
                    <div v-html="$options.filters.msg(hosCjReportPO.njxDiagnosis)"></div>
                  </div>
                </div>
                  <!-- 结直肠病理 -->
                <div class="block" v-if="JSON.stringify(hosCjPathologyReportPO)!='{}'">
                  <h3>结直肠病理</h3>
                  <div>
                    <p class="block-tit">检查日期：</p>
                    <span>{{hosCjPathologyReportPO.checkDate | dateFilter}}</span>
                  </div>
                  <div>
                    <p class="block-tit">病理可见：</p>
                    <div v-html="$options.filters.msg(hosCjPathologyReportPO.bjText)"></div>
                  </div>
                </div>
                 <!-- 上消化道内镜 -->
                <div class="block" v-if="JSON.stringify(hosSxhdReportPO)!='{}'">
                  <h3>上消化道内镜</h3>
                  <div>
                    <p class="block-tit">检查日期：</p>
                    <span>{{hosSxhdReportPO.checkDate | dateFilter}}</span>
                  </div>
                  <div>
                    <p class="block-tit">检查所见：</p>
                    <div v-html="$options.filters.msg(hosSxhdReportPO.checkText)"></div>
                  </div>
                  <div>
                    <p class="block-tit">内镜下诊断（仅供参考）：</p>
                    <div v-html="$options.filters.msg(hosSxhdReportPO.imagingDiagnosis)"></div>
                  </div>
                </div>
                <!-- 上消化道病理 -->
                <div class="block" v-if="JSON.stringify(hosSxhdReportPathologyPO)!='{}'">
                  <h3>上消化道病理</h3>
                  <div>
                    <p class="block-tit">检查日期：</p>
                    <span>{{hosSxhdReportPathologyPO.checkDate | dateFilter}}</span>
                  </div>
                  <div>
                    <p class="block-tit">病理可见：</p>
                    <div v-html="$options.filters.msg(hosSxhdReportPathologyPO.checkText)"></div>
                  </div>
                </div>
                <!-- 肝癌筛查 -->
                <div class="block" v-if="JSON.stringify(hosGaReportPO)!='{}'">
                  <h3>肝癌筛查</h3>
                  <div>
                    <p class="block-tit">检查日期：</p>
                    <span>{{hosGaReportPO.checkDate | dateFilter}}</span>
                  </div>
                  <div>
                    <p class="block-tit">血液检查：</p>
                    <div v-html="$options.filters.msg(hosGaReportPO.bloodExamination)"></div>
                  </div>
                  <div>
                    <p class="block-tit">B超检查所见：</p>
                    <div v-html="$options.filters.msg(hosGaReportPO.checkText)"></div>
                  </div>
                  <div>
                    <p class="block-tit">超声提示：</p>
                    <div v-html="$options.filters.msg(hosGaReportPO.imagingDiagnosis)"></div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>
</template>
<script>
import mixin from "@/mixins/mixins";
export default {
  mixins: [mixin],
  props: ["reportDialog", "personId", "surverId"],
  filters: {
    msg: function(msg) {
      return msg && msg.replace(/\n/g, "<br>").replace(/\r/g, "<br>");
    }
  },
  data() {
    return {
      personInfo: {},
      hosGaReportPO: {},
      hosSxhdReportPO: {},
      hosSxhdReportPathologyPO: {},
      hosCtReportPO: {},
      hosCjPathologyReportPO: {},
      hosRxcsReportPO: {},
      hosRxxxReportPO: {},
      hosCjReportPO:{}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
    },
    getData() {
      this.$axios_http({
        url: "/base/person/find/allReport",
        data: {
          personId: this.personId,
          surverId: this.surverId
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          let {
            person,
            hosGaReportPO,
            hosSxhdReportPO,
            hosSxhdReportPathologyPO,
            hosCtReportPO,
            hosCjReportPO,
            hosCjPathologyReportPO,
            hosRxcsReportPO,
            hosRxxxReportPO
          } = res.data.result;
          this.hosGaReportPO = hosGaReportPO || {};
          this.hosSxhdReportPO = hosSxhdReportPO || {};
          this.hosSxhdReportPathologyPO = hosSxhdReportPathologyPO || {};
          this.hosCtReportPO = hosCtReportPO || {};
          this.hosCjReportPO = hosCjReportPO || {};
          this.hosCjPathologyReportPO = hosCjPathologyReportPO || {};
          this.hosRxcsReportPO = hosRxcsReportPO || {};
          this.hosRxxxReportPO = hosRxxxReportPO || {};
          this.personInfo = person;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pageLine {
  page-break-before: auto;
  page-break-after: always;
}
table {
  width: 100%;
}
.tit {
  text-align: center;
}
.smallTit {
  text-align: center;
  font-size: 16px;
}
.personInfo{
  border-bottom: 1px solid #999;
  margin-bottom: 10px;
}
h3 {
  border-bottom: 1px solid #999;
  padding-bottom: 5px;
  margin-bottom: 10px;
  margin-top: 15px;
}
.block-tit {
  font-weight: bold;
  height: auto;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 16px;
}
.pageLine .block:first-child h3{
  margin-top: 0;
}
</style>
<style lang="scss">
.allReportDialog .el-dialog__body {
  padding: 0 20px 30px 20px;
}
</style>


