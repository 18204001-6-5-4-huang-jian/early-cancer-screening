<template>
 <div>
     <search-com ref="recruitmentbookcollect" :labelWidth="'100px'" :searchData="searchData" :formData="qc"
                    @searchChange="searchChange">
        </search-com>
    <cancer-widget>
          <template slot="sub-button">
                   <el-button type="success" size="small" @click="exportExcel">导出EXCEL</el-button>
         </template>
           <table-com :propsData="propsData" :tableData="queryResult.list">
               <template slot="operating">
                 <el-table-column
                      label="低剂量CT"
                      width="200px">
                      <template slot-scope="scope">
                          <span type="text" size="small" v-html="scope.row.ctResult"></span>
                          </template>
                  </el-table-column>
                   <el-table-column
                      label="乳腺超声"
                      width="200px">
                      <template slot-scope="scope">
                          <span type="text" size="small" v-html="scope.row.rxcsResult"></span>
                          </template>
                  </el-table-column>
                   <el-table-column
                      label="乳腺X线"
                      width="200px">
                      <template slot-scope="scope">
                          <span type="text" size="small" v-html="scope.row.rxxxResult"></span>
                          </template>
                  </el-table-column>
                   <el-table-column
                      label="肝癌三项"
                      width="200px">
                      <template slot-scope="scope">
                          <span type="text" size="small" v-html="scope.row.gcsResult"></span>
                          </template>
                  </el-table-column>
                   <el-table-column
                      label="上消内镜"
                      width="200px">
                      <template slot-scope="scope">
                          <span type="text" size="small" v-html="scope.row.sxhdResult"></span>
                          </template>
                  </el-table-column>
                   <el-table-column
                      label="结直肠镜"
                      width="200px">
                      <template slot-scope="scope">
                          <span type="text" size="small" v-html="scope.row.cjResult"></span>
                          </template>
                  </el-table-column>
                 <el-table-column
                      label="所属项目"
                      width="100px">
                      <template slot-scope="scope">
                          <span type="text" size="small">{{scope.row.items | itemsUnderItFilter}}</span>
                          </template>
                  </el-table-column>
                    <el-table-column
                      label="所属机构"
                      width="140px">
                      <template slot-scope="scope">
                          <span type="text" size="small">{{scope.row.deptName}}</span>
                          </template>
                  </el-table-column>
               </template>
           </table-com>
          <br>
             <el-pagination
                        @size-change="pageSizeChange"
                        @current-change="currentPageChange"
                        :current-page="queryResult.pageNum"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="queryResult.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="queryResult.total">
                </el-pagination>
    </cancer-widget>
 </div>
</template>
<script>
import mixin from "@/mixins/mixins";
import DICTIONARY from "@/views/common/dictionary";
export default {
    mixins: [mixin],
    data(){
        return{
         qc: {
            surverId:'',
            name:'',
            idCard:'',
            phone:'',
            items:'',
            entryCategory:'',
            riskTypeList:'',
            bookingStatus:null,
            signStatus:null,
            bookingDayBegin:null,
            bookingDayEnd:null,
            signTimeBegin:null,
            signTimeEnd:null
         },
         queryResult:{
            list:[],
            pageNum:1,
            pageSize:10,
            total:0
         },
         searchData:[
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
                type: "text",
                title: "手机号",
                name: "phone"
            },
            {
                type: "select",
                title: "所属项目",
                name: "items",
                optionProps: {
                    label: "name",
                    value: "id"
                },
                optionData: DICTIONARY.itemsUnderIt
            },
            {
                type: 'select',
                title: '分组状态',
                name: 'entryCategory',
                optionProps: {
                    label: 'name',
                    value: 'id'
                },
                optionData: DICTIONARY.groupStatus
            },
            {
                type: 'select',
                title: '评估结果',
                name: 'riskType',
                optionProps: {
                    label: 'name',
                    value: 'id'
                },
                optionData: DICTIONARY.newevalResult
            },
             {
                type: 'select',
                title: '预约状态',
                name: 'bookingStatus',
                optionProps: {
                    label: 'name',
                    value: 'id'
                },
                optionData: DICTIONARY.bookcollectStatus
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
            },
            {
                type: 'daterange',
                title: '预约时间',
                width: 7,
                name: 'date1',
                startTime: 'bookingDayBegin',
                endTime: 'bookingDayEnd',
                format: 'yyyy-MM-dd'
            },
             {
                type: 'daterange',
                title: '签到时间',
                width: 7,
                name: 'date2',
                startTime: 'signTimeBegin',
                endTime: 'signTimeEnd',
                format: 'yyyy-MM-dd'
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
            prop: "idCard",
            label: "身份证号",
            width: "180"
          },
          {
            prop: "phone",
            label: "联系电话",
            width: "120"
          }]
          }
        }
    },
    mounted() {
        this.getListData()
    },
    methods: {
        exportExcel(){
            let name ='预约汇总.xls';
            this.$axios_http({
            method:'POST',
            url:'/base/zm/booking/bookingSummary/export',
            responseType:'blob',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data:this.qc,
            vueObj:this
            }).then(res =>{
                if (!res.data) {
                    return
                }
                if(res.data.type=='text/xml'){
                this.$confirm('对不起，您的登录状态已过期，请重新登录', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        showCancelButton:false,
                        type: 'warning'
                    }).then(() => {
                        window.location.href=BIGPLATFORM_URL
                    }).catch(() => {
                    });
                return;
                }
                let url = window.URL.createObjectURL(new Blob([res.data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', name)
                document.body.appendChild(link)
                link.click()
                URL.revokeObjectURL(link.href); // 释放URL 对象
                document.body.removeChild(link);
            })
        },
        searchChange(val){
             this.qc = this.getFormData("recruitmentbookcollect");
             this.qc = val;
             this.getListData();
        },
        pageSizeChange(val){
            this.queryResult.pageSize = val;
            if (this.$refs["recruitmentbookcollect"]) {
              this.qc = this.$refs["recruitmentbookcollect"].formData;
            }
            this.getListData();
        },
        currentPageChange(val){
          this.qc = this.getFormData("recruitmentbookcollect");
          this.queryResult.pageNum = val;
          this.getListData();
        },
        async getListData() {
            let result = await this.requestTable({
            url: "/base/zm/booking/bookingSummary/query",
            currentObj: this.queryResult,
            params: Object.assign({}, this.qc)
           });
           this.queryResult = Object.assign({}, result);
    },
    },
}
</script>
<style lang="css">
    
</style>