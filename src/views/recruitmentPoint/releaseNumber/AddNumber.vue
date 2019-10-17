<template>
  <cancer-widget>
    <div class="titTop top">
      <span class="title">预约基本设置</span>
    </div>
     <el-form :inline="true" :model="formData" class="demo-form-inline" :rules="formDataRules" ref="formDataRules" >
         <el-row>
             <el-form-item label="筛查项目:" prop="checkProject">
                <el-select v-model="formData.checkProject" placeholder="请选择" clearable @change="changeFormData">
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
                :picker-options="pickerOptions"
                :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-form-item>
         </el-row>
         <!-- 预约时间段 -->
         <div class="titTop">
           <span slot="title" class="title">预约时间段</span>
         </div>
         <el-row>
             <el-form-item label=""  :prop="formData.weeks.length==0?'ruleType':''">
                <el-radio v-model="formData.ruleType" @change="changeRuleType" label="1">每天</el-radio>
            </el-form-item>
         </el-row>
         <el-row>
           <el-form-item>
                <el-checkbox-group v-model="formData.weeks" style="padding-left:0;">
                    <el-checkbox v-for="item in weeks" :label="item.id" :key="item.id" @change="changeWeeks">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
         </el-row>
         <!-- 时间段 -->
         <el-row>
           <span>时间段</span>
         </el-row>
          <el-row v-for="(x,index) in formData.ruleTimes" :key="index">
                <el-form :inline="true" :model="x" class="demo-form-inline" :ref="'formInlinelist'+index" :rules="formInlinelist">
                    <el-row>
                         <el-col :span="5">
                            <el-form-item label="开始时间:"  prop="beginTime">
                               <el-time-select
                                @change="changeFormData"
                                @focus="focusFormData(index)"
                                @blur="blurFormData(x.beginTime,index,'begin')"
                                  placeholder="请选择"
                                  v-model="x.beginTime"
                                  :picker-options="options">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="结束时间:"  prop="endTime">
                              <el-time-select
                               @change="changeFormData"
                               @blur="blurFormData(x.endTime,index,'end')"
                                placeholder="请选择"
                                v-model="x.endTime"
                                :picker-options="{
                                  start: '06:00',
                                    step: '00:30',
                                    end: '20:00',
                                    minTime: x.beginTime
                                }">
                              </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="数量:"  prop="num">
                                <el-input v-model="x.num" style="width:70px" @change="changeFormData"></el-input>
                            </el-form-item>
                            <el-button type="text"  size="small" class="addBtn" @click="add(index)" title="添加"><i class="el-icon-plus"></i></el-button>
                            <el-button type="text" size="small" @click="del(index)" v-if="$route.query.id && !x.disabled" title="删除"><i class="el-icon-delete"></i></el-button>
                            <el-button type="text" size="small" @click="del(index)" v-if="!$route.query.id && delBtnShow" title="删除"><i class="el-icon-delete"></i></el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-row>

            <div>
              <div class="titTop">
                <span slot="title" class="title">预约机制</span>
              </div>
              <el-row>
                <el-form-item label="">
                  <el-radio-group v-model="formData.rulePattern">
                    <el-radio label="2">所选机构共享一批号源</el-radio>
                    <el-radio label="1">所选机构各得一批号源</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-row>
            </div>
            <!-- <el-button type="primary"  size="small" class="addBtn" @click="add"><i class="el-icon-plus"></i>添加记录</el-button> -->
        
       
        
      </el-form>
   
    <div class="period" >
      <div class="titTop">
        <span slot="title" class="title">机构列表</span>
        <div class="fr btns">
          <el-button type="success" size="small" @click="addOrganizeFun">添加</el-button>
          <el-button size="small" @click="delTableList">清空列表</el-button>
      </div>
        
      </div>
      <el-table
        :data="selectOrganizeTableRow"
        border
        style="width: 90%">
         <el-table-column
          type="index"
          label="序号"
          width="60">
          </el-table-column>
          <el-table-column
          prop="deptName"
          label="机构名称">
          </el-table-column>
          <el-table-column
          label="筛查项目"
          width="180">
          <template slot-scope="scope">
                <span>{{scope.row.checkProject | checkProjectFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
          prop="ruleBegin"
          label="放号开始日期">
             <template slot-scope="scope">
                <span>{{scope.row.ruleBegin | dateFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
          prop="ruleEnd"
          label="放号结束日期">
          <template slot-scope="scope">
                <span>{{scope.row.ruleEnd | dateFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column
          prop="beginTime"
          label="开始时间">
          </el-table-column>
          <el-table-column
          prop="endTime"
          label="结束时间">
          </el-table-column>
          <!-- <el-table-column
          label="数量">
            <template slot-scope="scope">
                <span v-if="!scope.row.editShow">{{scope.row.num}}</span>
                <el-input v-model="scope.row.num"  v-if="scope.row.editShow" @blur="saveNum(scope.row)"></el-input>
            </template>
          </el-table-column>
         <el-table-column
            label="操作"
            fixed="right"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click='editFun(scope.row)'><i class="el-icon-edit-outline" title="修改数量"></i></el-button>
            </template>
          </el-table-column> -->
      </el-table>
      <div class="btns" style="margin:30px auto;width:130px;">
        <el-button type="primary" size="small" @click="submit" style="margin-left:0px;">确定</el-button>
        <el-button size="small" @click="cancel" style="margin-left:0px;">取消</el-button>
      </div>
    </div>    
  </cancer-widget>
</template>
<script>
import DICTIONARY from '@/views/common/dictionary'
import getBaseDataList from '@/views/recruitmentPoint/appointment/getBaseDataList'
import { dateFilter,checkProjectFilter } from "@/filters/filter"
import VALIDATE from '@/utils/validate'
  export default {
    mixins: [ getBaseDataList ],
    data () {
      return {
        pickerOptions:{
            disabledDate(time) {
              return time.getTime() < Date.now()-86400000;
            }
          },
        options:{
          start: '06:00',
          step: '00:30',
          end: '20:00',
        },
        delBtnShow:false,
        baseDataJcxm:[],   //筛查项目
        formData:{
            checkProject:null,
            ruleBegin:new Date(),
            ruleEnd:new Date(),
            valueTime:null,
            weeks:[],
            ruleType:null,
            ruleTimes:[{
                beginTime:null,
                endTime:null,
                num:null
            }],
            allocationRuleDepts:[{
              bookingDept:null,
              beginTime:null,
              endTime:null,
              num:null
            }]
        },
        selectOrganizeTableRow:[],
        
        weeks:DICTIONARY.weeks,
        formInlinelist:{
          beginTime:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          endTime:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          num:[
            { required: true, message: '必填', trigger: 'blur' },
            { trigger: 'blur', validator: VALIDATE.countB0}
          ],
        },
        formDataRules:{
          ruleType:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          checkProject:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
          valueTime:[
            { required: true, message: '必填', trigger: 'blur' },
          ],
        }
      }
    },
    created(){
       this.getBaseDataListJcxm();
    },
    mounted(){
      // 放号时间等赋值
      if(sessionStorage.getItem('addOrganize')){
        this.formData=JSON.parse(sessionStorage.getItem('addOrganize'));
        if(this.formData.ruleBegin && this.formData.ruleEnd){
           this.formData.valueTime=[this.formData.ruleBegin,this.formData.ruleEnd];
        }else{
          this.formData.valueTime=null;
        }
      }else{
        this.formData.valueTime=null;
      }
      // 表格赋值
      let arr=[];
      let arrNew=[];
      if(localStorage.getItem('selectOrganizeTableRow')){
        arr=JSON.parse(localStorage.getItem('selectOrganizeTableRow'));
        for(let i=0;i<arr.length;i++){
          for(let j=0;j<this.formData.ruleTimes.length;j++){
            let obj={
              beginTime:this.formData.ruleTimes[j].beginTime,
              endTime:this.formData.ruleTimes[j].endTime,
              num:this.formData.ruleTimes[j].num,
              deptName:arr[i].deptName,
              deptCode:arr[i].deptCode,
              id:arr[i].id,
              ruleBegin:this.formData.ruleBegin,
              ruleEnd:this.formData.ruleEnd,
              checkProject:this.formData.checkProject,
              editShow:false
            }
            arrNew.push(obj);
          }
        }
        // 获取修改数量的表格的值
        let changeNumOrganize=null;
        if(localStorage.getItem('changeNumOrganize')){
          changeNumOrganize=JSON.parse(localStorage.getItem('changeNumOrganize'));
          arrNew.filter( item => {
            changeNumOrganize.filter( item1 => {
              if(item.id==item1.id && item.beginTime==item1.beginTime && item.endTime==item1.endTime ){
                item.num=item1.num
              }
            })
          })
        }
        this.selectOrganizeTableRow=arrNew;
        
      }
      // 开始时间的删除按钮
       if(this.formData.ruleTimes.length>1){
          this.delBtnShow=true;
        }
    },
    beforeRouteEnter (to, from, next) {
      // 新增放号进入页面，清空缓存数据
      if(from.path=='/appointment/manage'){
        sessionStorage.setItem('addOrganize','');
        localStorage.setItem('selectOrganizeTableRow','');
      }
      next()
    },
    methods: {
     
     del(index){// 删除时间信息
        // 控制删除按钮显示隐藏
        if(this.formData.ruleTimes.length<=2){
          this.delBtnShow=false;
        }
        this.formData.ruleTimes.splice(index,1)
        this.changeFormData();
      },
     add(index){// 添加时间信息
      //  开始时间+结束时间填完才能新增
      if(this.formData.ruleTimes[index].beginTime==null || this.formData.ruleTimes[index].endTime==null){
        this.$message({
          type:'error',
          message:'开始时间和结束时间不能为空'
        })
        return;
      }
        this.formData.ruleTimes.push({
                beginTime:null,
                endTime:null,
                num:null
            });
            console.log(this.formData.ruleTimes[index])
        // 控制删除按钮显示隐藏
        this.delBtnShow=true;
        this.changeFormData();
      },
      // 清空列表
     delTableList() {
        this.$confirm('确定清空机构列表数据?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
            localStorage.setItem('selectOrganizeTableRow','');
             this.selectOrganizeTableRow=null
        }).catch(() => {
                  
        });
     },
      submit(){
        let _personIds=[];
        this.selectOrganizeTableRow.filter(item=>{
          _personIds.push(item.id)
        })
        if(this.formData.ruleType==null){
          this.formData.ruleType='2'
        }
        // if(this.formData.ruleType=='1'){
        //   this.formData.weeks=[1,2,3,4,5,6,7]
        // }
        this.formData.allocationRuleDepts=this.selectOrganizeTableRow;
        this.formData.allocationRuleDepts.filter( item => {
          item.bookingDept=item.id.toString();
          item.num=Number(item.num)
          delete item.checkProject;
          delete item.deptCode;
          delete item.deptName;
          delete item.id;
          delete item.ruleBegin;
          delete item.ruleEnd;
        })
        this.formData.ruleTimes.filter (item => {
          if(item.num){
            item.num=Number(item.num)
          }
        })
         // 校验是否全部通过
        let validd = true
        this.$refs.formDataRules.validate((valid) => {
          if (!valid){
            validd = false
          }
        })
        if(this.formData.ruleTimes && this.formData.ruleTimes.length){
          for(var i=0;i<this.formData.ruleTimes.length;i++){
            this.$refs['formInlinelist'+i][0].validate((valid) => {
              if (!valid){
                validd = false
              }
            })
          }
        }
        if (validd) {
          if(this.selectOrganizeTableRow.length==0){
            this.$message({
                type: 'error',
                message: '机构列表不能为空!'
            });
            return; 
          }
           this.$axios_http({
            url: "/base/allocation/rule/addAllocationRule",
            data: this.formData,
            vueObj: this
          }).then((res)=> {
            if(res.data.status=="SUCCESS"){
              this.$message({
                  type: 'success',
                  message: '放号成功!'
              });
              this.$router.push('/appointment/manage');
              sessionStorage.setItem('addOrganize','');
              localStorage.setItem('selectOrganizeTableRow','');
            }
          })
        }
       
      },
      // 取消清空selectOrganizeTableRow
      cancel(){
         this.$router.push('/appointment/manage');
         localStorage.setItem('selectOrganizeTableRow','');
      },
      // 添加机构
      addOrganizeFun(){
         // 校验是否全部通过
        let validd = true
        this.$refs.formDataRules.validate((valid) => {
          if (!valid){
            validd = false
          }
        })
        if(this.formData.ruleTimes && this.formData.ruleTimes.length){
          for(var i=0;i<this.formData.ruleTimes.length;i++){
            this.$refs['formInlinelist'+i][0].validate((valid) => {
              if (!valid){
                validd = false
              }
            })
          }
        }
        if(validd){
          this.$router.push('/appointment/addorganize');
          sessionStorage.setItem('addOrganize',JSON.stringify(this.formData));
        }else{
          this.$message({
            type:'error',
            message:'有校验未通过项'
          })
        }
        
      },
      // 开始时间赋值
      changePicker(val){
        this.formData.ruleBegin=new Date(val[0]).getTime();
        this.formData.ruleEnd=new Date(val[1]).getTime();
        this.changeFormData();
      },
      // 每天按钮
      changeRuleType(){
        if(this.formData.ruleType=="1"){
            this.formData.weeks=[];
        }
        this.changeFormData();
      },
      // 复选框和每天按钮互斥
      changeWeeks(){
        if(this.formData.weeks){
          this.formData.ruleType=null
        }
        this.changeFormData();
      },
      // 编辑放号数量
      editFun(row){
        row.editShow=true;
      },
      // 保存放号数量
      saveNum(row){
        if(row.num<1){
          this.$message({
            type:'error',
            message:'放号数量至少1个'
          })
          return;
        }
        row.editShow=false;
        let changeNumOrganize=[];
        changeNumOrganize.push(row);
        if(localStorage.getItem('changeNumOrganize')){
          changeNumOrganize=changeNumOrganize.concat(JSON.parse(localStorage.getItem('changeNumOrganize')));
        }
        localStorage.setItem('changeNumOrganize',JSON.stringify(changeNumOrganize));
      },
      // 修改表单数据
      changeFormData(){
        if(localStorage.getItem('selectOrganizeTableRow')){
          this.$confirm('修改表单数据会导致所选择的机构列表数据清除，请确认是否修改?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
           localStorage.setItem('changeNumOrganize','');
           localStorage.setItem('selectOrganizeTableRow','');
           this.selectOrganizeTableRow=null;
          }).catch((error) => {
            // 还原修改的表单数据
                if(sessionStorage.getItem('addOrganize')){
                  this.formData=JSON.parse(sessionStorage.getItem('addOrganize'));
                  if(this.formData.ruleBegin && this.formData.ruleEnd){
                    this.formData.valueTime=[this.formData.ruleBegin,this.formData.ruleEnd];
                  }else{
                    this.formData.valueTime=null;
                  }
                }else{
                  this.formData.valueTime=null;
                }
          });
        }
      },
      // 开始时间不能早于第一行的结束时间
      focusFormData(index){
        if(index>0){
          let endTime=this.formData.ruleTimes[index-1].endTime
          let getMin = Number(endTime.split(':')[0]*60)+Number(endTime.split(':')[1])
          let lastTime=parseInt((getMin-1)/60)+':'+ parseInt(getMin-1-parseInt((getMin-1)/60)*60);
          this.options={
                          start: '06:00',
                          step: '00:30',
                          end: '20:00',
                          minTime: lastTime
                      }
        }
      },
      // 时间段值改变事件
      blurFormData(value,index){
        if(value){
        let arr=[];
        let arrSec=[];
        let currentTime=Number(value.split(':')[0]*60)+Number(value.split(':')[1]);
        // console.log('改变的时间',Number(value.split(':')[0]*60)+Number(value.split(':')[1]))
        this.formData.ruleTimes.filter((item,i)=> {
          if(i>=index){
            //转化为分钟数
            let secBegin=item.beginTime && Number(item.beginTime.split(':')[0]*60)+Number(item.beginTime.split(':')[1])
            let secEnd=item.endTime && Number(item.endTime.split(':')[0]*60)+Number(item.endTime.split(':')[1])
            item.beginTime && arr.push(item.beginTime);
            item.endTime && arr.push(item.endTime);
            item.beginTime && arrSec.push(secBegin);
            item.endTime && arrSec.push(secEnd);
          }
        })
        if(currentTime>Math.min.apply(null, arrSec)){
        }
        // console.log(arr)
        // console.log(arrSec)
        // console.log(Math.min.apply(null, arrSec))
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.period ul{
  width: 1260px;
  li{
    width: 180px;
    border-top: 1px solid  #ECECEF;
    height: 58px;
    text-align: center;
    border-left: 1px solid #ECECEF;
    border-bottom:1px solid #ECECEF;
    margin-top: -1px;
    cursor: pointer;
  }
  li.active{
    background: #FBA800;
    color: #fff;
  }
}
.date li{
  padding-top: 10px;
  color: #606266;
}
.titTop{
  font-size: 18px;
  color: #333333;
  border-bottom: 1px solid #ECECEC;
  margin-top: 15px;
  border-top: 1px solid #ECECEC;
  padding-bottom: 15px;
  padding-top: 22px;
  margin-bottom: 18px;
  .title{
    line-height: 1;
    padding-left:20px;
  }
  a{
    margin-right: 10px;
  }
  .btns{
    margin-right: 20px;
  }
}
.top{
  border-top:none;
  margin-top: 0;
  padding-top: 0;
}
.top span.title,.top span.line{
    height: 38px;
    line-height: 38px;
  }
.top span.line{
  color:  #DADADA;
  font-size: 12px;
  margin: 0 25px;
}
.el-form {
  padding-left:20px;
}
.el-table{
  margin-left: 20px;
}
.el-icon-delete{
    color: #999;
    font-weight: bold;
    font-size: 18px;
}
.el-icon-plus{
    background: #999999;
    color:#ffffff;
    border-radius: 2px;
    font-size: 18px;
}
.el-icon-edit-outline{
  font-size:16px;
}
</style>

