<template>
  <!--统计管理-->
  <div>
    <!--查询列表 -->
    <cancer-widget>
      <el-table
        :data="listTableData.data"
        border
        style="width: 100%"
        class="cancer-margin--b15"
        empty-text="暂无数据">
        <el-table-column
          prop="dataName"
          label="所属机构"
          >
        </el-table-column>
         <el-table-column
          prop="evaluateCompletion"
          label="已评估人数">
        </el-table-column>
        <el-table-column
          prop="cancerType"
          label="癌种">
          <template slot-scope="scope">
            <span>{{scope.row.cancerType | cancerTypeFilter}}</span>
          </template>
        </el-table-column>
         <el-table-column
          prop="highRiskNum"
          label="高危人数">
        </el-table-column>
        <el-table-column
          prop="evaluateCompRate"
          label="评估任务完成率%"
          >
        </el-table-column>
         <el-table-column
          prop="checkPassRate"
          label="审核通过率%"
          >
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
  export default {
    name: 'statistics-list',
    data () {
      return {
       valueTime:null,    //查询时间
       formData:{
         year:null,
         cancerType:null
       },
       baseDataAz:null,
       beaginTime:null,
       endTime:null,
       listTableData:{
         data:[],
         pageNum:1,
         pageSize:10,
         total:0
       },   //表格数据
       years:[{
          value: '2018',
          name: '2018'
        },{
          value: '2019',
          name: '2019'
        }],
       time:null
      }
    },
    created () {
      if(this.$route.query.beaginTime && this.$route.query.endTime){
          this.valueTime=[Number(this.$route.query.beaginTime),Number(this.$route.query.endTime)]
      }
      if(this.$route.query.year){
        this.formData.year=this.$route.query.year
      }
      this.getListData()
      var curDate = new Date();
      var preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
      this.time = moment(preDate).format('YYYY-MM-DD')
    },
    methods: {
      // 表格数据加载
      getListData() {
        if(this.valueTime){
          this.beaginTime=new Date(this.valueTime[0]).getTime();
          this.endTime=new Date(this.valueTime[1]).getTime();
        }else{
          this.beaginTime=null;
          this.endTime=null;
        }
        this.$axios_http({
          url: "/base/statistics/recruit/find",
          data: {
            beaginTime:this.beaginTime,
            endTime:this.endTime,
            year:this.formData.year,
            cancerType:this.$route.query.cancer,
            dataLevel:2,
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
     
    }
  }
</script>
<style scoped>

</style>
