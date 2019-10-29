<template>
  <cancer-widget>
    <div class="titTop top clearfix">
      <!-- <span class="title  fl">选择日期</span>
      <span class="line fl">|</span> -->
      <div class="hos fl">
        <span>筛查医院：</span>
        <el-select v-model="formInline.hospital" placeholder="请选择"  @change='changeHospitalHandler'>
          <el-option :value="item.deptId" :key="item.deptId" :label="item.deptName" v-for="item in hospitals" ></el-option>
        </el-select>
      </div>
      <div class="hos fl" style="margin-left:30px;">
        <span>检查项目：</span>
        <el-select v-model="formInline.checkProject" placeholder="请选择" @change="changeProjectHandler(formInline.checkProject)">
          <el-option :value="item.checkProject" :key="item.checkProject" :label="item.checkProject | checkProjectFilter" v-for="item in bookingProject" ></el-option>
        </el-select>
      </div>
    </div>
    
    <div class="period">
      <span class="titleTime">预约日期</span>
      <ul class="tableTitle clearfix">
        <li class="fl">周一</li>
        <li class="fl">周二</li>
        <li class="fl">周三</li>
        <li class="fl">周四</li>
        <li class="fl">周五</li>
        <li class="fl">周六</li>
        <li class="fl">周日</li>
      </ul>
      <ul class="date clearfix" v-if="changeSelectStatus">
        <li class="fl" v-for="key in hospitalDatetime[0].week-1" :key="key"></li>
        <li class="fl" :key="item.date" v-for="item in hospitalDatetime" :class="item.class?item.class:''" @click="checkDay(item)">
          <p>{{item.date | monthFilter}}</p>
          <p>剩余:{{item.num}}</p>
        </li>
      </ul>
      <ul class="nodata clearfix" v-if="!changeSelectStatus">
        <li>暂无数据</li>
      </ul>
    </div>
    <div class="period">
      <div class="titTop">
        <span slot="title" class="title">选择时间段</span>
      </div>
      <el-table
        :data="bookingTimeData"
        class="checkPeriodTable"
        border
        style="width: 90%">
        <el-table-column
          label="时间段"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.beginTime}}-{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="leaveNum"
          label="剩余量">
        </el-table-column>
        <el-table-column
          label="选择时间段（单选）">
          <template slot-scope="scope">
            <el-radio type="text" v-model="radioCheck" :label="scope.row.id" size="small" :disabled="scope.row.leaveNum==0 || scope.row.overdueFlag==1"></el-radio>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="period" >
      <div class="titTop">
        <span slot="title" class="title">选择受试者</span>
        <router-link :to="{path:'/appointment/subjectlist',query:{resource:formInline.checkProject,
        hospital:formInline.hospital,
        checkDayDate:checkDayDate,
        flag:$route.query.flag,
        surverId:$route.query.surverId,
        id:$route.query.id,
        radioCheck:radioCheck}}">
          <el-button type="success" size="small">添加</el-button>
        </router-link>
      </div>
      <el-table
        :data="selectTableRow"
        border
        style="width: 90%">
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column
          type="index"
          label="序号"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="受试者姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">
              <span>{{scope.row.sex | sexFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          label="所属项目">
          <template slot-scope="scope">
              <span>{{scope.row.itemOnly | itemsUnderItFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分组状态">
          <template slot-scope="scope">
              <span>{{scope.row.entryCategory | groupStatusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="评估日期">
          <template slot-scope="scope">
              <span>{{scope.row.evaluateDate | dateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="risk"
          label="评估结果">
        </el-table-column>
        <el-table-column
          label="预约项目">
          <template slot-scope="scope">
              <span>{{scope.row.checkProject | checkProjectFilter}}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="dept"
          label="所属机构">
        </el-table-column>
         <el-table-column
            label="操作"
            fixed="right"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click='deleteFun(scope.row)'><i class="el-icon-delete"></i></el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="btns"  style="margin:30px auto;width:160px;">
        <el-button type="primary" size="small" @click="submit">确定预约</el-button>
        <el-button size="small" @click="goBack()">取消</el-button>
      </div>
    </div>    
  </cancer-widget>
</template>
<script>
import mixin from "@/mixins/mixins";
import checkProjectFun from "@/filters/index";
import { dateFilter, monthFilter, checkProjectFilter } from "@/filters/filter";
import { setTimeout } from "timers";
export default {
  mixins: [mixin],
  data() {
    return {
      hospitals: [],
      bookingProject: [],
      hospitalDatetime: [],
      formInline: {
        hospital: null,
        checkProject: null,
        checkProjectName: null
      },
      checkDayDate: null, //选中的时间戳
      leaveNumN: null, //选中的剩余量
      bookingTimeData: [],
      changeSelectStatus: false,
      selectTableRow: [],
      radioCheck: null,
      rulePattern: null,   //放号机制
      // 再次预约暂存的字段
      surverId:null,
      personId:null
    };
  },
  created() {
    // 批量预约默认值
    this.bookingProject.push({ checkProject: this.$route.query.resource });
    this.formInline.checkProject = this.$route.query.resource;

    this.$route.query.surverId && this.getBookingProject(true);
    if (this.$route.query.resource) {
      this.getBookingHospital(this.$route.query.resource);
    }
    if (this.$route.query.hospital) {
      this.formInline.hospital = Number(this.$route.query.hospital);
      this.changeSelect();
    }
    if (this.$route.query.checkDayDate) {
      this.checkDayDate = this.$route.query.checkDayDate;
      this.getBookingTimeByDay(this.$route.query.checkDayDate);
    }
    if (this.$route.query.radioCheck) {
      this.radioCheck = Number(this.$route.query.radioCheck);
    }
  },
  mounted() {
    this.selectTableRow = JSON.parse(localStorage.getItem("selectTableRow"));
  },
  methods: {
    goBack() {
      if (this.$route.query.resource === "ct") {
        this.$router.push({
          path: "/appointment/ct"
        });
      } else if (this.$route.query.resource === "cj") {
        this.$router.push({
          path: "/appointment/enteroscopy"
        });
      } else if (this.$route.query.resource === "rxcs") {
        this.$router.push({
          path: "/appointment/ultrasonic"
        });
      } else if (this.$route.query.resource === "rxxx") {
        this.$router.push({
          path: "/appointment/xline"
        });
      } else if (this.$route.query.resource === "sxhdnj") {
        this.$router.push({
          path: "/appointment/digestive"
        });
      } else if (this.$route.query.resource === "gcs") {
        this.$router.push({
          path: "/appointment/liver"
        });
      }
    },
    changeSelect() {
      this.$axios_http({
        url: "/base/booking/getBookingDateByHospital",
        data: {
          checkProject: this.formInline.checkProject
            ? this.formInline.checkProject
            : this.$route.query.resource,
          allocationDept: this.formInline.hospital
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.hospitalDatetime = res.data.result;
          if (this.$route.query.checkDayDate) {
            this.hospitalDatetime.filter(item => {
              if (item.date == this.$route.query.checkDayDate) {
                item.class = "active";
              }
            });
          }
          this.changeSelectStatus = true;
        }
      });
    },
    // 切换医院和检查项目的时候，清空选择时间段。添加多个患者的时候不清空选择时间段
    chearBookingTimeData() {
      this.bookingTimeData = [];
    },
    getBookingHospital(checkProject) {
      this.$axios_http({
        url: "/base/booking/getBookingHospital",
        data: {
          checkProject: checkProject
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.hospitals = res.data.result;
          // 默认选中第一个
          if (res.data.result.length > 0) {
            this.formInline.hospital = res.data.result[0].deptId;
            this.changeSelect();
          }
          if(res.data.result.length == 0) {
            this.formInline.hospital = null
          }
        }
      });
    },

    //检查项目
    /**
     * flag--true,初始化加载，--false,预约完一项，继续预约下一项
     */
    getBookingProject(flag) {
      let obj = {}
      if(flag){
        obj = Object.assign({},{
          personId: this.$route.query.id,
          surverId: this.$route.query.surverId
        })
      }else{
        obj = Object.assign({},{
          personId: this.personId,
          surverId: this.surverId
        })
      }
      this.$axios_http({
        url: "/base/booking/bookingProject",
        data: obj,
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.bookingProject = res.data.result;
          // 默认选中
          if (flag) {
            this.bookingProject.filter((item, index) => {
              if (item.checkProject == this.$route.query.resource) {
                this.formInline.checkProject =
                  res.data.result[index].checkProject;
              }
            });
          } else {
            this.formInline.checkProject = res.data.result[0].checkProject;
            this.formInline.checkProjectName = checkProjectFun.checkProject(
              res.data.result[0].checkProject
            );
            this.getTips();
          }
        }
      });
    },

    checkDay(row) {
      this.checkDayDate = row.date;
      this.hospitalDatetime.filter(item => {
        //清空class
        if (item.class) {
          item.class = "";
        }
      });
      row.class = "active";
      this.getBookingTimeByDay(row.date);
    },
    getBookingTimeByDay(bookingDay) {
      this.$axios_http({
        url: "/base/booking/getBookingTimeByDay",
        data: {
          allocationDept: this.formInline.hospital,
          bookingDay: bookingDay,
          checkProject: this.formInline.checkProject
            ? this.formInline.checkProject
            : this.$route.query.resource
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.bookingTimeData = res.data.result;
        }
      });
    },
    deleteFun(row) {
      let _selectTableRow = JSON.parse(localStorage.getItem("selectTableRow"));
      for (var i = _selectTableRow.length - 1; i >= 0; i--) {
        if (_selectTableRow[i].id == row.id) {
          _selectTableRow.splice(i, 1);
        }
      }
      localStorage.setItem("selectTableRow", JSON.stringify(_selectTableRow));
      this.selectTableRow = JSON.parse(localStorage.getItem("selectTableRow"));
    },
    submit() {
      let _persons = [];
      this.selectTableRow.filter(item => {
        _persons.push({
          personId: item.id,
          surverId: item.surverId
        });
      });
      // 获取选中的剩余放号量
      if (this.radioCheck) {
        this.bookingTimeData.filter(item => {
          if (item.id === this.radioCheck) {
            this.leaveNumN = item.leaveNum;
            this.rulePattern = item.rulePattern;
          }
        });
      }
      if (!this.leaveNumN) {
        this.$message({
          type: "error",
          message: "请选择时间段"
        });
        return;
      } else if (this.leaveNumN < this.selectTableRow.length) {
        this.$message({
          type: "error",
          message: "号源不足"
        });
        return;
      }
      if (!this.formInline.hospital) {
        this.$message({
          type: "error",
          message: "筛查医院未填"
        });
        return;
      } else if (!this.radioCheck) {
        this.$message({
          type: "error",
          message: "预约时间未选择"
        });
        return;
      } else if (_persons.length == 0) {
        this.$message({
          type: "error",
          message: "请选择一个受试者"
        });
        return;
      }
      this.$axios_http({
        url: "/base/booking/addBooking",
        data: {
          persons: _persons,
          checkProject: this.formInline.checkProject,
          id: this.radioCheck,
          rulePattern: this.rulePattern
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.$message({
            type: "success",
            message: "预约成功!"
          });
          if (this.$route.query.flag === "pl") {
            // 来源于批量预约
            localStorage.setItem("selectTableRow", "");
            this.$router.push({ path: localStorage.getItem("activePath") });
          } else {
            // 来源于列表预约
            if (res.data.result.findNext) {
              this.surverId = res.data.operationDayRecordList[0].surverId
              this.personId = res.data.operationDayRecordList[0].personId
              this.$route.query.surverId && this.getBookingProject(false);
            } else {
              localStorage.setItem("selectTableRow", "");
              this.$router.push({ path: localStorage.getItem("activePath") });
            }
          }
        }
      });
    },
    // 继续预约提示
    getTips() {
      this.$confirm(
        `预约成功，该受试者有${
          this.formInline.checkProjectName
        }尚未预约，是否继续预约？`,
        "提示",
        {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        }
      )
        .then(() => {
          // 清空选中的值
          if (this.$route.query.resource) {
            this.getBookingHospital(this.$route.query.resource);
          }
          this.bookingTimeData = [];
          this.radioCheck = null;
          if (this.$route.query.hospital) {
            this.formInline.hospital = Number(this.$route.query.hospital);
            setTimeout(function() {
              this.changeHospitalHandler();
            }, 0);
          }
        })
        .catch(() => {
          localStorage.setItem("selectTableRow", "");
          if (localStorage.getItem("activePath")) {
            this.$router.push({ path: localStorage.getItem("activePath") });
          } else {
            this.$router.go(-1);
          }
        });
    },




    // 切换医院20190809修改
    changeHospitalHandler() {
      this.formInline.checkProject && this.changeSelect();
      this.chearBookingTimeData();
    },

    // 切换项目
    changeProjectHandler(checkProject) {
      this.$axios_http({
        url: "/base/booking/getBookingHospital",
        data: {
          checkProject: checkProject
        },
        vueObj: this
      }).then(res => {
        if (res.data.status == "SUCCESS") {
          this.hospitals = res.data.result;
          // 默认选中第一个
          if (res.data.result.length > 0) {
            this.formInline.hospital = res.data.result[0].deptId;
            this.changeSelect();
          }
          // 筛查医院为空，则清空预约日期
          if(res.data.result.length == 0) {
            this.formInline.hospital = null
            this.changeSelectStatus = false
            this.hospitalDatetime = []
          }
        }
      });
      this.chearBookingTimeData();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.period ul {
  width: 80%;
  li {
    width: 14.28%;
    border-top: 1px solid #ececef;
    height: 58px;
    text-align: center;
    border-left: 1px solid #ececef;
    border-bottom: 1px solid #ececef;
    margin-top: -1px;
    cursor: pointer;
  }
  li.active {
    background: #fba800;
    color: #fff;
  }
}
.date li {
  padding-top: 10px;
  color: #606266;
}
.titTop {
  font-size: 18px;
  color: #333333;
  border-bottom: 1px solid #ececec;
  margin-top: 15px;
  border-top: 1px solid #ececec;
  padding-bottom: 15px;
  padding-top: 22px;
  margin-bottom: 18px;
  .title {
    line-height: 1;
    padding-left: 20px;
  }
  a {
    float: right;
    margin-right: 20px;
    margin-top: -10px;
  }
  .btns {
    margin-right: 20px;
  }
}
.top {
  border-top: none;
  margin-top: 0;
  padding-top: 0;
}
.top span.title,
.top span.line {
  height: 38px;
  line-height: 38px;
}
.top span.line {
  color: #dadada;
  font-size: 12px;
  margin: 0 25px;
}
.el-icon-delete {
  font-size: 18px;
}
.period .tableTitle {
  li {
    background: #f7fafc;
    height: 40px;
    line-height: 40px;
  }
}
.tableTitle li:last-child,
.date li:last-child,
.date li:nth-child(7),
.date li:nth-child(14) {
  border-right: 1px solid #ececef;
}
.titleTime {
  font-size: 16px;
  padding-left: 20px;
  padding-bottom: 15px;
  display: block;
}
.period .nodata li {
  width: 100%;
  color: #909399;
  border-right: 1px solid #ececef;
  padding-top: 15px;
  font-size: 14px;
}
</style>
<style>
.checkPeriodTable .el-radio__label {
  opacity: 0;
  font-size: 0;
}
</style>

