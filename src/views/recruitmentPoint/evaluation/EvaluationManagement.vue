<template>
  <!--评估管理-->
  <div>
    <!--表单查询-->
    <search-com :labelWidth="'100px'" :searchData="searchData" ref="searchEvaluation" :formData="formData"
                    @searchChange="searchHandler"></search-com>
    <!--表格-->
    <cancer-widget isBorder>
      <template slot="sub-button">
        <el-button type="primary" size="small" @click="addHandler">新增</el-button>
        <el-button type="success" size="small" @click="exportExcelHandler">导出EXCEL</el-button>
        <el-button type="success" size="small" ><a :href="serverName + '/base/file/downfile?filePath=/bzwd/doc/zqtys.pdf'">下载知情同意书模板</a></el-button>
      </template>
      <br>
      <el-tabs v-model="activeName" type="card" style="margin-top:-50px;" @tab-click="tabClickHandler"  class="cancer-margin--b15 cancer-tabs">
        <el-tab-pane label="全部" name="0">
          <cancer-evaluation-common-table
            :listTableData="listTableData"
            :qc="formData"
            :activeName="activeName"
            @sizeChange="sizeChange"
            @pageChange="pageChange"
            @watchResultHandler="watchResultHandler"
            @watchPathHandle="watchPathHandle"
            @printHandle="printHandle"
            @confirmNotice="confirmNotice"
            @change="selectChange"></cancer-evaluation-common-table>
        </el-tab-pane>
        <el-tab-pane label="待提交问卷" name="1">
          <cancer-evaluation-common-table
            :listTableData="listTableData"
            :qc="formData"
            :activeName="activeName"
            @sizeChange="sizeChange"
            @pageChange="pageChange"
            @watchResultHandler="watchResultHandler"
            @watchPathHandle="watchPathHandle"
            @printHandle="printHandle"
            @confirmNotice="confirmNotice"
            @change="selectChange"></cancer-evaluation-common-table>
        </el-tab-pane>
        <el-tab-pane label="待审核问卷" name="2">
          <cancer-evaluation-common-table
            :listTableData="listTableData"
            :qc="formData"
            :activeName="activeName"
            @sizeChange="sizeChange"
            @pageChange="pageChange"
            @watchResultHandler="watchResultHandler"
            @watchPathHandle="watchPathHandle"
            @printHandle="printHandle"
            @confirmNotice="confirmNotice"
            @change="selectChange"></cancer-evaluation-common-table>
        </el-tab-pane>
        <el-tab-pane label="审核未通过" name="3">
          <cancer-evaluation-common-table
            :listTableData="listTableData"
            :qc="formData"
            :activeName="activeName"
            @sizeChange="sizeChange"
            @pageChange="pageChange"
            @watchResultHandler="watchResultHandler"
            @watchPathHandle="watchPathHandle"
            @printHandle="printHandle"
            @confirmNotice="confirmNotice"
            @change="selectChange"></cancer-evaluation-common-table>
        </el-tab-pane>
        <el-tab-pane label="待发放评估结果" name="4">
          <cancer-evaluation-common-table
            :listTableData="listTableData"
            :qc="formData"
            :activeName="activeName"
            @sizeChange="sizeChange"
            @pageChange="pageChange"
            @watchResultHandler="watchResultHandler"
            @watchPathHandle="watchPathHandle"
            @printHandle="printHandle"
            @confirmNotice="confirmNotice"
            @change="selectChange"></cancer-evaluation-common-table>
        </el-tab-pane>
        <el-tab-pane label="待上传知情同意书" name="5">
            <div>
                  <table-com :propsData="propsData" :tableData="listTableData.list">
                  <template slot="operating">
                      <el-table-column
                            label="知情同意书"
                            width="100">
                            <template slot-scope="scope">
                              {{scope.row.uploadInformedConsentStatus | uploadInformedFilter}}
                            </template>
                          </el-table-column>
                      <el-table-column
                      label="操作"
                      fixed="right"
                      width="220">
                      <template slot-scope="scope">
                          <el-upload
                              :action="uploadUrl()"
                              accept='image/*'
                              :before-upload="handleUpload"
                              :http-request="uploadFileHandle"
                              :on-change="handleChangeFile"
                              :show-file-list="false"
                              :withCredentials="true"
                              ref="uploadFile"
                              multiple>
                              <el-button size="small" type="text" @click="handleClick(scope.row)">上传</el-button>
                          </el-upload>
                      </template>
                    </el-table-column>
                  </template>
              </table-com>
              <!--分页-->
              <el-pagination
                @size-change="sizeChange"
                @current-change="pageChange"
                :current-page.sync="listTableData.pageNum"
                :page-sizes="[10, 20, 50, 100, 200]"
                :page-size="listTableData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listTableData.total">
              </el-pagination>
            </div>
        </el-tab-pane>
      </el-tabs>

      <!--查看结果-->
      <el-dialog
        title="评估完成"
        class="cancer-margin--b15"
        :visible="resultDialogVisible"
        @close="closeHandler"
        width="70%">
          <el-row class="cancer-margin--b15 cancer-margin--l20">问卷ID：{{evaluateResult.surverId}}</el-row>
          <el-row class="cancer-margin--l20">
            <el-col :span="8">
              <span>姓名：{{evaluateResult.hosPersonInfoPO.name}}</span>
            </el-col>
            <el-col :span="8">
              <span>身份证号：{{evaluateResult.hosPersonInfoPO.idCard}}</span>
            </el-col>
            <el-col :span="8">
              <span>联系电话：{{evaluateResult.hosPersonInfoPO.phone}}</span>
            </el-col>
          </el-row>
          <el-row style="margin:20px">
            <el-row>
              <el-col :span="5">
                <div class="cancer-email--table r-b--border">肺癌</div>
              </el-col>
              <el-col :span="5">
                <div class="cancer-email--table r-b--border">乳腺癌</div>
              </el-col>
              <el-col :span="4">
                <div class="cancer-email--table r-b--border">肝癌</div>
              </el-col>
              <el-col :span="5">
                <div class="cancer-email--table r-b--border">上消化道癌</div>
              </el-col>
              <el-col :span="5">
                <div class="cancer-email--table b-border">结直肠癌</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <div class="cancer-email--table r-b--border">{{evaluateResult.lungRiskStatus | cancerRiskFilter}}</div>
              </el-col>
              <el-col :span="5">
                <div class="cancer-email--table r-b--border">{{evaluateResult.mammaryRiskStatus | cancerRiskFilter}}</div>
              </el-col>
              <el-col :span="4">
                <div class="cancer-email--table r-b--border">{{evaluateResult.liverRiskStatus | cancerRiskFilter}}</div>
              </el-col>
              <el-col :span="5">
                <div class="cancer-email--table r-b--border">{{evaluateResult.gastrointestinalRiskStatus | cancerRiskFilter}}</div>
              </el-col>
              <el-col :span="5">
                <div class="cancer-email--table b-border">{{evaluateResult.colorectalRiskStatus | cancerRiskFilter}}</div>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <div class="cancer-email--table r-border">
                  <el-button
                    type="text"
                    v-if="evaluateResult.lungRiskStatus === 1 && isBookingMenu"
                    @click="jumpToPage('/appointment/ct', {id: evaluateResult.surverId})">预约筛查</el-button>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="cancer-email--table r-border">
                  <el-button
                    type="text"
                    v-if="evaluateResult.mammaryRiskStatus===1 && isBookingMenu"
                    @click="jumpToPage('/appointment/ultrasonic', {id: evaluateResult.surverId})">乳腺超声</el-button>
                  <el-button
                    type="text"
                    v-if="evaluateResult.mammaryRiskStatus===1 && evaluateResult.hosPersonInfoPO.age >=45 && evaluateResult.hosPersonInfoPO.age <= 74 && isBookingMenu"
                    @click="jumpToPage('/appointment/xline', {id: evaluateResult.surverId})">乳腺x线</el-button>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="cancer-email--table r-border">
                  <el-button
                    type="text"
                    v-if="evaluateResult.liverRiskStatus === 1 && isBookingMenu"
                    @click="jumpToPage('/appointment/liver', {id: evaluateResult.surverId})">预约筛查</el-button>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="cancer-email--table r-border">
                  <el-button
                    type="text"
                    v-if="evaluateResult.gastrointestinalRiskStatus === 1 && isBookingMenu"
                    @click="jumpToPage('/appointment/digestive', {id: evaluateResult.surverId})">预约筛查</el-button>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="cancer-email--table">
                  <template v-if="evaluateResult.colorectalRiskStatus===1">
                    <el-button
                      type="text"
                      v-if="isBookingMenu"
                      @click="jumpToPage('/appointment/enteroscopy', {id: evaluateResult.surverId})">肠镜预约</el-button>
                    <el-button
                      type="text"
                      @click="jumpToPage('/fit/index', {id: evaluateResult.surverId})">便潜血录入</el-button>
                  </template>
                </div>
              </el-col>
            </el-row>
          </el-row>
        <el-row type="flex" justify="center" class="cancer-margin--t15">
          <el-button size="small" type="primary" @click="confirmNoticeHandler" v-if="noticeParams.confirmNoticeStatus === 2">确认已通知</el-button>
          <el-button size="small" type="primary" @click="lookEvaluationForm">查看评估问卷</el-button>
          <el-button size="small" @click="resultDialogVisible = false">关闭</el-button>
        </el-row>
      </el-dialog>

      <!--确认已通知弹框-->
      <el-dialog
        title="提示"
        :visible.sync="noticeDialogVisible"
        width="30%"
        @close="closeHandler">
        <span>是否短信通知受试者本次评估结果？</span>
        <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="noticeDialogVisible = false">取消</el-button>
    <el-button size="small" type="primary" @click="hasNoticeHandler">确定</el-button>
  </span>
      </el-dialog>

       <!--查看同意书弹框-->
      <el-dialog
        :visible.sync="imgDialogVisible"
        width="900px"
        @close="closeHandler">
        <div>
             <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                <swiper-slide v-for="(item,index) in pathUrls" :key="index">
                  <img :src="serverName+'/base/file/downfile?filePath='+item" alt="">
                </swiper-slide>
                <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
              </swiper>
                  <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
              <swiper-slide v-for="(item,index) in pathUrls" :key="index">
                <img :src="serverName+'/base/file/downfile?filePath='+item" alt="">
              </swiper-slide>
          </swiper>
        </div>
        <span slot="footer" class="dialog-footer" align="center">
          <el-button type="warning" size="small" @click="printContent('print')">打印</el-button>
          <el-button type="primary" size="small" @click="deleteImg" :disabled="deleteImgShow">删除</el-button>
          <el-upload
                style="display:inline-block;margin-left:10px;"
                :action="uploadUrl()"
                accept='image/*'
                :before-upload="handleUpload"
                :http-request="uploadFile"
                :on-change="handleChange"
                :show-file-list="false"
                :withCredentials="true"
                ref="upload"
                multiple>
                <el-button size="small" type="primary">上传</el-button>
            </el-upload>
        </span>
      </el-dialog>
      <!--打印弹窗内容区域  -->
      <div id="print" v-if="activeImgParams.path">
        <p><img :src="serverName+'/base/file/downfile?filePath='+activeImgParams.path" alt=""></p>
      </div>
      <div id="printAll">
        <p><img :src="serverName+'/base/file/downfile?filePath='+item" alt="" v-for="(item,index) in pathUrls" :key="index"></p>
      </div>
    </cancer-widget>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import DICTIONARY from '@/views/common/dictionary'
  import mixin from '@/mixins/mixins'
  import service from '@/views/recruitmentPoint/evaluation/evaluation-service'
  import CancerEvaluationCommonTable from '@/views/recruitmentPoint/evaluation/CommonTable'
  import 'swiper/dist/css/swiper.css'
  import { swiper,swiperSlide } from 'vue-awesome-swiper'
  import axios from 'axios'
  import dateFormater from '@/filters/index'
  import { EVALUATION } from '@/views/recruitmentPoint/evaluation/searchConfig'
  import { EVALUATIONTB } from '@/views/recruitmentPoint/evaluation/tablePropConfig'
  let loading;
  export default {
    name: 'cancer-evaluation-manangement',
    mixins: [ mixin, service ],
    data () {
      return {
        propsData: EVALUATIONTB,
        searchData: EVALUATION,
        surverId:null,
        year:null,
        formParamsTable:{},
        formData: {},
        evaluateResult: {
          lungRiskStatus: null,   // 肺癌
          liverRiskStatus: null,  // 肝癌
          colorectalRiskStatus: null,  // 结直肠癌
          mammaryRiskStatus: null,     // 乳腺癌
          gastrointestinalRiskStatus: null,   // 上消化道癌
          hosPersonInfoPO: {
            age: null,
            idCard: null,
            name: null,
            phone: null,
          },
          surverId: null
        },
        evaluateStatus: DICTIONARY.evaluateStatus,
        personStatus: DICTIONARY.personStatus,
        checkStatus: DICTIONARY.checkStatus,
        noticeStatus: DICTIONARY.noticeStatus,
        riskType: DICTIONARY.riskType,
        sex: DICTIONARY.sex,
        projectStatus: DICTIONARY.projectStatus,
        itemsUnderIt: DICTIONARY.itemsUnderIt,
        multipleSelection: [],
        activeName: '0',
        isBookingMenu:false,    //是否包含预约管理菜单
        listTableData: {
          pageNum: 1,
          pageSize: 10
        },
        tabIndex: 0,
        tabNum: {
          uncheck: 0,
          evaluate: 0,
          notice: 0,
          check: 0
        },
        pathUrls:[],
        activeImgParams:{
          surverId:null,
          path:null,    //当前图片路径
        },    
        uploadParams:{    //弹窗上传图片参数
          surverId:null,
          year:null
        },   
        deleteImgShow:true,
        formParams:{},
        serverName:SERVER_NAME,
        resultDialogVisible: false,
        noticeDialogVisible: false,
        imgDialogVisible:false,
        noticeParams: {
          noticeId: null,
          confirmNoticeStatus: null,
        },
         swiperOptionTop: {
          initialSlide :0,
          // autoplay: 2000,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          spaceBetween: 10,
          // loopAdditionalSlides:100,
          loop:true,
          loopedSlides: 5, 
          on: {
            slideChangeTransitionEnd:()=> {
              let swiperTop = this.$refs.swiperTop.swiper;  
              if(swiperTop){
                let i = swiperTop.activeIndex;            
                this.activeImgParams.path = this.pathUrls[i];  
              }
            },
          }
        },
        swiperOptionThumbs: {
          initialSlide :0,
          // autoplay: 2000,
          spaceBetween: 10,
          slidesPerView: 5,
          centeredSlides: true,
        //  loopAdditionalSlides:100,
          touchRatio: 0.2,
          loop:true,
          loopedSlides: 5, //looped slides should be the same
          slideToClickedSlide: true,
          itemsUnderItParams:null
        },
      }
    },
    components: { CancerEvaluationCommonTable,swiper,swiperSlide },
    //定义这个sweiper对象
    computed: {
      swiper() {
        return this.$refs.swiperTop.swiper;
      }
    },
    methods: {
      // 表格复选框
      selectChange (val) {
        this.multipleSelection = val
      },
      // 分页=>改变每页条数
      sizeChange(val) {
        this.formData = this.getFormData('searchEvaluation');
        this.listTableData.pageSize = val
        this.commonTableData()
      },

      // 分页=>改变当前页
      pageChange(val) {
        this.formData = this.getFormData('searchEvaluation');
        this.listTableData.pageNum = val
        this.commonTableData()
      },

      //查询
      searchHandler (val) {
        this.formData = val
        let params = {}
        if (this.activeName === '1') {
          params = {evaluateStatus: 1}
        } else if (this.activeName === '2') {
          params = {checkStatus: 1}
        }  else if (this.activeName === '3') {
          params = {checkStatus: 3}
        } else if (this.activeName === '4') {
          params = {noticeStatus: 2, evaluateStatus: 4}
        } else if (this.activeName === '5') {
          params = {uploadInformedConsentStatus: 2}
        }
        this.getListData(params)
      },
      // 导出excel
      exportExcelHandler () {
        // debugger
        let name ='';
        let dataObj = this.formData
        if (this.activeName === '1') {
          dataObj.evaluateStatus = 1;
          name='待提交问卷.xls'
        } else if (this.activeName === '2') {
          dataObj.checkStatus = 1;
          name='待审核问卷.xls'
        }  else if (this.activeName === '3') {
          dataObj.checkStatus = 3
          name='审核未通过.xls'
        } else if (this.activeName === '4') {
          dataObj.noticeStatus = 2;
          dataObj.evaluateStatus = 4
          name='待发放评估结果.xls'
        } else if (this.activeName === '5') {
          dataObj = Object.assign({},dataObj,{uploadInformedConsentStatus: 2})
          name='待上传知情同意书.xls'
        } else {
          dataObj = dataObj;
          name='评估列表.xls'
        }
        this.$axios_http({
        method:'POST',
        url:'/base/measurement/data/export',
        responseType:'blob',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:dataObj,
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

      // tab切换
      tabClickHandler (tab) {
        this.listTableData.pageNum = 1
        this.listTableData.pageSize = 10
        this.tabIndex = Number(tab.index)
        this.commonTableData()
      },

      commonTableData () {
        if (this.tabIndex === 1) {  // 待提交问卷
          this.getListData({evaluateStatus: 1})
        } else if (this.tabIndex === 2) { // 待审核问卷
          this.getListData({checkStatus: 1})
        } else if (this.tabIndex === 3) {  // 审核未通过
          this.getListData({checkStatus: 3})
        } else if (this.tabIndex === 4) {  // 待发放评估结果
          this.getListData({noticeStatus: 2, evaluateStatus: 4})
        } else if (this.tabIndex === 5 || Number(this.activeName) === 5) {  // 待上传知情同意书
          this.getListData({uploadInformedConsentStatus: 2})
        } else {  // 全部
          this.getListData()
        }
      },

      // 查看结果
      watchResultHandler (row, flag) {
        this.resultDialogVisible = flag
        this.noticeParams.noticeId = row.id
        this.noticeParams.confirmNoticeStatus = row.noticeStatus
        this.getEvaluationResultData(row.id)
        let menus=JSON.parse(localStorage.getItem('allAuthResource'));
        menus.filter( item=> {
          if(item.code=='booking_management_menu'){
            this.isBookingMenu=true;
          }
        })
      },

      // 确认已通知(表格中)
      confirmNotice (flag,itemsUnderIt,row) {
        this.itemsUnderItParams = itemsUnderIt;
        this.noticeDialogVisible = flag;
        this.noticeParams.noticeId = row.id;
      },

      // 短信通知
      hasNoticeHandler () {
        this.noticeDialogVisible = false
        this.confirmNoticeData()
      },

      // 查看评估问卷
      lookEvaluationForm () {
        this.resultDialogVisible = false
        this.$router.push({path:'/form/evaluationlook',query:{id: this.noticeParams.noticeId,flag:3}})
      },

      // 关闭弹框
      closeHandler () {
        this.resultDialogVisible = false
        this.noticeDialogVisible = false
        this.imgDialogVisible = false
      },

      // 确认已通知
      confirmNoticeHandler () {
        this.resultDialogVisible = false
        this.confirmNoticeData()
      },

      // 新增 => 跳转到表单页面
      addHandler () {
        this.jumpToPage('/evaluation/evaluationreport')
      },

      // 确认已通知
      confirmNoticeData(){
        this.$axios_http({
           url: '/base/measurement/edit/evaluateStatus',
           data: {
             id: this.noticeParams.noticeId, 
             itemsUnderIt:this.itemsUnderItParams,
             noticeStatus: 1
            },
           vueObj: this
         }).then((res) => {
           if(res.data.status=="SUCCESS"){
             let params = {}
            if (this.activeName === '0') {
              params = {}
            } else if (this.activeName === '4') {
              params = {noticeStatus: 2, evaluateStatus: 4}
            }
            this.getListData(params)
            this.getNumData()
           }
         })
      },

      //查看路径
      watchPathHandle (flag, row) {
        this.imgDialogVisible = flag
        this.uploadParams.surverId = row.surverId
        this.uploadParams.year = row.projectYear
        this.getPathData(row.surverId)
        this.swiperOptionTop.initialSlide = 0;
        this.swiperOptionThumbs.initialSlide = 0;
        this.$nextTick(() => {
          const swiperTop = this.$refs.swiperTop.swiper
          const swiperThumbs = this.$refs.swiperThumbs.swiper
          swiperTop.controller.control = swiperThumbs
          swiperThumbs.controller.control = swiperTop
        })
      },

      //删除确认
      deleteImg () {
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(()=>{
          this.deleteRefresh()
        }).catch(()=>{

        })
      },

      //删除告知书文件
      async deleteRefresh(){
        await this.deleteImgHandler();
        this.getPathData(this.activeImgParams.surverId);
          this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper
            const swiperThumbs = this.$refs.swiperThumbs.swiper
            swiperTop.controller.control = swiperThumbs
            swiperThumbs.controller.control = swiperTop
          })
      },

      // 打印
      printContent (element) {
        let subOutputRankPrint = document.getElementById(element);
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },

      //上传图片地址
      uploadUrl(){
          return SERVER_NAME+"/base/file/upload/multipart"
      },

     //覆盖默认的上传行为
      uploadFile(file){
        this.formParams.append("files",file.file);
      },
      uploadFileHandle(file){
        this.formParamsTable.append("files",file.file);
      },
      handleChange(){
        this.formParams = new FormData();
        // this.$refs.upload.submit();
        // 后端接受参数 ，可以接受多个参数
        this.formParams.append('surverId',this.uploadParams.surverId);
        this.formParams.append('year',this.uploadParams.year);
        let config = {
            withCredentials:true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        axios.post(SERVER_NAME+"/base/file/upload/multipart", this.formParams, config).then( res => {
            // 清空文件
            this.$refs.upload.clearFiles();
            loading.close();
            // 上传成功刷新弹窗数据
            this.getPathData(this.uploadParams.surverId);
            this.$nextTick(() => {
              const swiperTop = this.$refs.swiperTop.swiper
              const swiperThumbs = this.$refs.swiperThumbs.swiper
              swiperTop.controller.control = swiperThumbs
              swiperThumbs.controller.control = swiperTop
            })
        }).catch( res => {

        })
      },

      //改变
      handleChangeFile() {
        this.formParamsTable = new FormData();
        // this.$refs.upload.submit();
        // 后端接受参数 ，可以接受多个参数
        this.formParamsTable.append('surverId',this.surverId);
        this.formParamsTable.append('year',this.year);
        let config = {
            withCredentials:true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        axios.post(SERVER_NAME+"/base/file/upload/multipart", this.formParamsTable, config).then( res => {
          loading.close();
          this.surverId=null;
          this.year=null;
          this.getListData({uploadInformedConsentStatus: 2});
          // 查询数量
          this.getNumData();
          this.$refs.uploadFile.clearFiles();
        }).catch( res => {
          loading.close();
        })
      },

    //上传前
      handleUpload(file) {
          loading = this.$loading({
            lock: true,
            text: '拼命上传中...',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.5)'
        });
      },

      //批量打印
      printHandle (row) {
        //先获取所有文件路径
        this.getPathData(row.surverId)
        let that=this;
        setTimeout(()=>{
          that.printContent('printAll')
        },300)
        
      },

      handleClick(row){
          this.surverId=row.surverId;
          this.year=row.projectYear
      }
    },

    computed: {
      ...mapState('common', ['addUserList']),
      msoundAge() {
        if(this.evaluateResult.age >=40) {
          return true
        } else {
          return false
        }
      },
      xlineAge() {
        if(this.evaluateResult.age >=45 && this.evaluateResult.age <= 74) {
          return true
        } else {
          return false
        }
      }
    },
    created () {
        // 页面初始化
      if (localStorage.getItem("searchParams")) {
        let { qc, queryResult, activeName } = JSON.parse(
          localStorage.getItem("searchParams")
        );
        this.formData = qc;
        this.listTableData = queryResult;
        this.activeName = activeName;
      }
      if(this.$route.query.tFlag) {
        this.activeName = this.$route.query.tFlag
      }
      let params = {}
      if (this.activeName === '1') {
        params = {evaluateStatus: 1}
      } else if (this.activeName === '2') {
        params = {checkStatus: 1}
      }  else if (this.activeName === '3') {
        params = {checkStatus: 3}
      } else if (this.activeName === '4') {
        params = {noticeStatus: 2, evaluateStatus: 4}
      } else if (this.activeName === '5') {
        params = {uploadInformedConsentStatus: 2}
      }
      this.getListData(params)
      this.getNumData()
      this.$store.dispatch('common/addUserList')
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .cancer-email--table {
    border: 1px solid #d8dce5;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .cancer-email--table.b-border {
    border-bottom: none;
  }
  .cancer-email--table.r-border {
    border-right: none;
  }
  .cancer-email--table.r-b--border {
    border-right: none;
    border-bottom: none;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top .swiper-slide{
    overflow-y: auto;
  }
  .gallery-top {
    width: 100%;
    height: 600px;
  }
  .gallery-top img{
    width: 100%;
  }
  .gallery-thumbs {
    height: 100px;
    box-sizing: border-box;
    width:100%;
    margin-top: 5px;
  }
  .gallery-thumbs .swiper-slide {
    width:100px;
    background:#000;
  }
  .gallery-thumbs .swiper-slide img{
    width:100%;
    opacity: 0.6;
  }
  .gallery-thumbs .swiper-slide-active img{
    opacity: 1;
  }
  #print{
    display: none;
  }
  #printAll{
    display: none;
  }
  .el-tabs__item{
    font-weight: normal;
  }
</style>
<style lang="scss">
  .el-tabs__item{
    font-weight: normal;
  }
</style>
