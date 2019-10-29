<template>
  <div>
    <cancer-widget>
      <el-form :inline="true" :model="qc" class="demo-form-inline">
        <el-form-item label="预约项目:">
          <el-select size="small" v-model="qc.checkProject" placeholder="请选择" clearable>
            <el-option :label="item.dataCode" :value="item.dataName" v-for="item in baseDataJcxm" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="放号时间:">
            <el-date-picker
            size="small" 
            v-model="valueTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="query">搜索</el-button>
        </el-form-item>
      </el-form>
    </cancer-widget>
    <cancer-widget>
        <div class="btns fr">
            <router-link :to="{path:'/appointment/addnumber'}">
                <el-button type="primary" size="small">新增放号</el-button>
            </router-link>
            <el-button type="primary" size="small" @click="dialogVisible=true">删除号源</el-button>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        >
         <el-table-column
            type="index"
            label="序号"
            width="60">
            </el-table-column>
            <el-table-column
            label="医院名称"
            prop="deptName"
            >
          </el-table-column>
            <el-table-column
            prop="ruleBegin"
            label="放号开始时间">
                <template slot-scope="scope">
                    <span>{{scope.row.ruleBegin | dateFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="ruleEnd"
            label="放号结束时间">
                <template slot-scope="scope">
                    <span>{{scope.row.ruleEnd | dateFilter}}</span>
                </template>
            </el-table-column>
             <el-table-column
              prop="dataCode"
              label="预约项目">
              </el-table-column>
               <el-table-column
              label="操作"
              fixed="right"
              width="180"
            >
            <template slot-scope="scope">
                <router-link :to="{path:'/appointment/organize',query:{id:scope.row.id}}">
                    <el-button type="text" size="small">查看机构</el-button>
                </router-link>
                <el-button type="text" size="small" @click="delRule(scope.row)">删除</el-button>
            </template>
               </el-table-column>
        </el-table>
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
    <!-- 删除号源弹窗 -->
    <el-dialog
        title="删除号源"
        :visible.sync="dialogVisible"
        :before-close="dialogCancer"
        width="600px">
        <div>
          <p style="color:#999;margin-bottom:10px">温馨提示：只可删除暂未预约的号源，已预约的号源不能删除。请协调好患者的筛查日期。</p>
          <el-form :model="formData" ref="formData" :rules="formDataRules" >
            <el-row>
             <el-form-item label="筛查项目:" prop="checkProject">
                <el-select v-model="formData.checkProject" placeholder="请选择" clearable>
                    <el-option :label="item.dataCode" :value="item.dataName" v-for="item in baseDataJcxm" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
         </el-row>
         <el-row>
              <el-form-item label="预约日期:"  prop="valueTime">
                <el-date-picker
                v-model="formData.valueTime"
                type="daterange"
                :clearable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changePicker"
                :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-form-item>
         </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCancer">取 消</el-button>
          <el-button type="primary" @click="dialogOK">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import getBaseDataList from '@/views/recruitmentPoint/appointment/getBaseDataList'
import { dateFilter } from "@/filters/filter"
  export default {
    mixins: [ getBaseDataList ],
    data () {
      return {
        tableData:[],
        baseDataJcxm:[],   //筛查项目
        valueTime:null,    //预约时间
        //查询条件
        qc: {
          "ruleBegin": null,
          "ruleEnd": null,
          "checkProject": null
        },
        //查询结果
        "queryResult": {
          "pageNo": 1,//当前页
          "pageSize": 10,//每页的条数
          "totalPageCount": 0,
        },
        dialogVisible:false,
        formData:{
          checkProject: null,
          valueTime: null,
          ruleBegin: null,
          ruleEnd: null
        },
        formDataRules:{
          checkProject:[
            { required: true, message: '必填', trigger: 'change' },
          ],
          valueTime:[
            { required: true, message: '必填', trigger: 'change' },
          ],
        }
      }
    },
    created(){
        this.getBaseDataListJcxm();
    },
    mounted(){
      this.query();
    },
    methods: {
      query(){
          if(this.valueTime){
            this.qc.ruleBegin=new Date(this.valueTime[0]).getTime();
            this.qc.ruleEnd=new Date(this.valueTime[1]).getTime();
          }else{
            this.qc.ruleBegin=null;
            this.qc.ruleEnd=null;
          }
         this.$axios_http({
          url: "/base/allocation/rule/getAllocationList",
          data: {
                "pageNum":this.queryResult.pageNo,
                "pageSize":this.queryResult.pageSize,
                "checkProject":this.qc.checkProject,
                "ruleBegin":this.qc.ruleBegin,
                "ruleEnd":this.qc.ruleEnd
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.tableData=res.data.result.list;
            this.queryResult.totalPageCount=res.data.result.total;
            this.tableData.filter(item => {
                this.baseDataJcxm.filter( item1 => {
                    if(item.checkProject==item1.dataName){
                        item.dataCode=item1.dataCode
                    }
                })
            })
          }
        })
      },
   
      //每页显示查询结果条数变更事件，做重新查询操作
      pageSizeChange(pageSize) {
        this.queryResult.pageSize=pageSize;
        this.query(1,pageSize);
      },
      //切换当前页事件，做重新查询操作
      currentPageChange(currentPage) {
        this.queryResult.pageNo=currentPage;
        this.query(currentPage,10);
      },

    //   删除放号规则
    delRule(row){
        this.$confirm('确定删除此条放号规则?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
            this.$axios_http({
            url: "/base/allocation/rule/delRuleByRuleId",
            data: {
                "ruleId":row.id
            },
            vueObj: this
            }).then((res)=> {
            if(res.data.status=="SUCCESS"){
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
                this.query(this.queryResult.pageNo,this.queryResult.pageSize);
            }
            })
        }).catch(() => {
                  
        });
    },
    // 开始时间赋值
      changePicker(val){
        this.formData.ruleBegin=new Date(val[0]).getTime();
        this.formData.ruleEnd=new Date(val[1]).getTime();
      },
      dialogCancer() {
        this.dialogVisible = false
        this.$refs.formData.resetFields()
        // 解决表单重置后，daterange默认值的bug
        this.formData.valueTime = null
        this.formData.ruleBegin = null
        this.formData.ruleEnd = null
      },
      dialogOK() {
        this.$refs.formData.validate((valid) => {
          if (valid){
            this.$axios_http({
            url: "/base/allocation/delAllocationRecord",
            data: {
                checkProject: this.formData.checkProject,
                ruleBegin: this.formData.ruleBegin,
                ruleEnd: this.formData.ruleEnd,
            },
            vueObj: this
            }).then((res)=> {
            if(res.data.status=="SUCCESS"){
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            }
            })
            this.dialogCancer()
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btns{
    margin-bottom: 15px;
}
</style>

