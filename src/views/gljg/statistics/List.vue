<template>
  <!--统计管理-->
  <div>
    <!--查询表单-->
    <cancer-widget>
      <el-form :model="formData" :inline="true">
        <el-form-item label="评估年度:">
              <el-select size="small" v-model="formData.year" placeholder="请选择年" clearable>
                <el-option :label="item.name" :value="item.value" v-for="item in years" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
        <el-form-item label="评估时间:">
            <el-date-picker
            size="small" 
            v-model="valueTime"
            type="daterange"
            range-separator="至"
            :start-placeholder="time"
            :end-placeholder="time"
            :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="所属机构:">
              <el-select size="small" v-model="formData.province" placeholder="请选择省" @change="handleProvinceChange">
                <el-option :label="item.name" :value="item.id" v-for="item in provinces" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select size="small" v-model="formData.city" placeholder="请选择市" @change="handleCityChange">
                <el-option :label="item.name" :value="item.id" v-for="item in cities" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select size="small" v-model="formData.area" placeholder="请选择县（区）">
                <el-option :label="item.name" :value="item.id" v-for="item in areas" :key="item.id"></el-option>
              </el-select>
            </el-form-item> -->
        <el-form-item label="选择癌种:">
          <el-select size="small" v-model="formData.cancerType" placeholder="全部" clearable>
            <el-option :label="item.dataCode" :value="item.dataName" v-for="item in baseDataAz" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searchHandler">查询</el-button>
        </el-form-item>
      </el-form>
    </cancer-widget>
    <!--查询列表 -->
    <cancer-widget>
 <el-table
        :data="listTableData.data"
        border
        style="width: 100%"
        class="cancer-margin--b15 specificTable"
        empty-text="暂无数据">
        <el-table-column
          prop="deptName"
          label="所属机构"
          width="200">
           <template slot-scope="scope">
              <span class="deptName-span" @click="handleRowClick(scope.row)">{{scope.row.deptName}}</span>
           </template>
        </el-table-column>
          <el-table-column
          prop="evaluateCompletion"
          label="已评估人数">
        </el-table-column>
        <el-table-column
          prop="centerType"
          label="癌种">
          <template slot-scope="scope">
            <span>{{scope.row.centerType | cancerTypeFilter}}</span>
          </template>
        </el-table-column>
         <el-table-column
          prop="highRiskNum"
          label="高危人数">
        </el-table-column>
         <el-table-column
          prop="notScreening"
          label="待筛查人数">
        </el-table-column>
        <el-table-column
          prop="alreadyScreening"
          label="已筛查人数">
        </el-table-column>
        <el-table-column
          prop="evaluateComRate"
          label="评估任务完成率%"
          width="140">
        </el-table-column>
         <el-table-column
          prop="checkPassRate"
          label="审核通过率%"
          width="110">
        </el-table-column>
        <el-table-column
          prop="checkCompRate"
          label="筛查完成率%"
          width="140">
        </el-table-column>
        <el-table-column
          prop="complianceRate"
          label="筛查依从率%"
          width="140">
        </el-table-column>
         <el-table-column
          prop="positiveRate"
          label="筛查阳性率%">
           <template slot-scope="scope">
              <span class="positiveRate-span" @click="handleRowClickpositiveRate(scope.row)">{{scope.row.positiveRate}}</span>
           </template>
        </el-table-column>
      </el-table>
        <!-- 分页 -->
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
  </div>
</template>
<script>
import moment from 'moment'
import getBaseDataList from '@/views/recruitmentPoint/appointment/getBaseDataList'
import { cancerTypeFilter } from '@/filters/filter'
  export default {
    name: 'statistics-list',
    mixins: [ getBaseDataList ],
    data () {
      return {
       valueTime:null,    //查询时间
       baseDataAz:null,   //癌种
       provinces:[],
       cities:[],
       areas:[],
       formData:{
         year:null,
         cancerType:null,
         beaginTime:null,
         endTime:null,
         province:null,
         city:null,
         area:null
       },
       years:[{
          value: '2018',
          name: '2018'
        },{
          value: '2019',
          name: '2019'
        }],
       listTableData:{
         data:[],
         pageNum:1,
         pageSize:10,
         total:0
       }, //表格数据
       time:null
      }
    },
    created () {
      this.getBaseDataListAz();
      this.getAddress('province',1);
      this.getListData()
      var curDate = new Date();
      var preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
      this.time = moment(preDate).format('YYYY-MM-DD')
    },
    methods: {
      // 表格数据加载
      getListData() {
        if(this.valueTime){
          this.formData.beaginTime=new Date(this.valueTime[0]).getTime();
          this.formData.endTime=new Date(this.valueTime[1]).getTime();
        }else{
          this.formData.beaginTime=null;
          this.formData.endTime=null;
        }
        this.$axios_http({
          url: "/base/statistics/manage/find",
          data: {
            beaginTime:this.formData.beaginTime,
            endTime:this.formData.endTime,
            cancerType:this.formData.cancerType,
            dataLevel:1,
            province:this.formData.province,
            city:this.formData.city,
            area:this.formData.area,
            year:this.formData.year,
            manageType:2,   //管理机构类型 1国家 2管理机构
            pageNum:this.listTableData.pageNum,
            pageSize:this.listTableData.pageSize
          },
          vueObj: this
        }).then((res)=> {
          this.listTableData.data=res.data.result.list;
          this.listTableData.total=res.data.result.total;
        })
      },
       //搜索
      searchHandler() {
        this.getListData();      
      },
             // 分页=>改变每页条数
      tableSizeChange(val) {
         this.listTableData.pageSize = val
         this.getListData()
       },
 
       // 分页=>改变当前页
       tablePageChange(val) {
         this.listTableData.pageNum = val
         this.getListData()
       },
      // 下转所属机构
      handleRowClick(row) {
        this.$router.push({path:'/statistics/gsublist',query:{
          beaginTime:this.formData.beaginTime,
          endTime:this.formData.endTime,
          year:this.formData.year,
          cancer:row.centerType,
          }});
      },
      // 下转筛查阳性率
      handleRowClickpositiveRate(row){
           this.$router.push({path:'/statistics/gthrlist',query:{
            beaginTime:this.formData.beaginTime,
            endTime:this.formData.endTime,
            year:this.formData.year,
            cancer:row.centerType,
          }});
      },
      //获取地址
      getAddress(type,id){
         this.$axios_http({
            url: '/base/statistics/resource/getResource/'+id,
            data: {},
            vueObj: this
          }).then((res) => {
            if(res.data.status=="SUCCESS"){
              let options=res.data.result;
              if(type=='province' && id==1){   //默认显示省
                this.provinces=options;
              }else if(type=='province' && id!=1){   //加载市
                this.cities=options;
              }else if(type=='city'){
                this.areas=options;
              }
              
            }
          })
      },
      // 切换
      handleProvinceChange(val){
        this.formData.city=null;
        this.formData.area=null;
        this.getAddress('province',val);
      },
      handleCityChange(val){
        this.formData.area=null;
        this.getAddress('city',val);
      },
    }
  }
</script>
<style scoped>
.deptName-span,.positiveRate-span{
  cursor: pointer;
  color: #409EFF;
}
</style>
