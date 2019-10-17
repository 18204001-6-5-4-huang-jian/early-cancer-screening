<template>
    <div class="bloodResultInput-container">
        <div class="bloodResultInput-container-title">
             血液结果记录表
        </div>
         <cancer-widget>
             <p class="title">基本信息</p>
                <div class="rows">
                    <el-row>
                    <el-col :span="8">
                        <p><span>问卷调查ID：</span>{{personDetail.surverId}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p><span>姓名：</span>{{personDetail.name}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p><span>性别：</span>{{personDetail.sex | sexFilter}}</p>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="8">
                        <p><span>身份证：</span>{{personDetail.idCard}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p><span>所属机构：</span>{{personDetail.deptName}}</p>
                    </el-col>
                    <el-col :span="8">
                        <p><span>所属项目：</span>{{personDetail.itemsUnderIt | itemsUnderItFilter }}</p>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="16">
                        <p v-if="personDetail.itemsUnderIt == 1"><span>分组状态：</span>{{personDetail.entryCategory}}</p>
                        <p v-if="personDetail.itemsUnderIt == 2"><span>评估结果：</span>{{personDetail.risk}}</p>
                    </el-col>
                    </el-row>
                </div>
         </cancer-widget>
          <cancer-widget>
              <p class="title">化验结果</p>
              <el-form  ref="formInline" :model="formInline" :rules="rules" label-width="100px" class="blood-form">
                        <el-form-item label="采血日期：" prop="bloodDate">
                             <el-date-picker
                                v-model="formInline.bloodDate"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy 年 MM 月 dd 日"
                                :picker-options="pickerOptions"
                                clearable
                                :disabled="$route.query.status == 'see'">
                                </el-date-picker>
                        </el-form-item>
                        <table class="table" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>检查项目</td>
                                    <td>具体项目</td>
                                    <td>结果</td>
                                    <td>单位</td>
                                    <td>参考范围-肿瘤<br>医院(070701)<br>
                                    <el-radio v-model="formInline.hosScopeType" label="1" :disabled="$route.query.status == 'see'">{{''}}</el-radio>
                                    </td>
                                    <td>参考范围-<br>九院(070707)<br>
                                    <el-radio v-model="formInline.hosScopeType" label="2" :disabled="$route.query.status == 'see'">{{''}}</el-radio>
                                    </td>
                                    <td>参考范围-巴南<br>二院(070708)<br>
                                    <el-radio v-model="formInline.hosScopeType" label="3" :disabled="$route.query.status == 'see'">{{''}}</el-radio>
                                    </td>
                                    <td>参考范围-巴南人民<br>医院(070709)<br>
                                    <el-radio v-model="formInline.hosScopeType" label="4" :disabled="$route.query.status == 'see'">{{''}}</el-radio>
                                    </td>
                                    <td v-if="isChooseHosScopeType" style="border:none;font-size: 12px;color:#f56c6c">必选</td>
                                </tr>
                                <tr>
                                    <td rowspan="2">血脂</td>
                                    <td>总胆固醇</td>
                                    <td>
                                    <el-form-item label="" prop="resultZdgc" label-width="0" ref="resultZdgc">
                                            <el-input type="text" style="width:150px;"  v-model="formInline.resultZdgc" clearable :disabled="$route.query.status == 'see'"></el-input>
                                    </el-form-item>
                                    </td>
                                    <td>mmol/L</td>
                                    <td>0.00-5.20</td>
                                    <td>0.00-5.17</td>
                                    <td>2.9-5.68</td>
                                    <td>3.1-5.2</td>
                                </tr>
                                <tr>
                                    <td>甘油三酯</td>
                                    <td>
                                     <el-form-item label="" prop="resultGysz" label-width="0" ref="resultGysz">
                                            <el-input type="text" style="width:150px;"  v-model="formInline.resultGysz" clearable :disabled="$route.query.status == 'see'"></el-input>
                                    </el-form-item>
                                    </td>
                                    <td>mmol/L</td>
                                    <td>0.00-2.30</td>
                                    <td>0.00-2.30</td>
                                    <td>0.23-1.23</td>
                                    <td>0.00-2.26</td>
                                </tr>
                                <tr>
                                     <td rowspan="2">肝功</td>
                                     <td>谷丙转氨酶</td>
                                     <td>
                                      <el-form-item label="" prop="resultGbzam" label-width="0" ref="resultGbzam">
                                            <el-input type="text" style="width:150px;"  v-model="formInline.resultGbzam" clearable :disabled="$route.query.status == 'see'"></el-input>
                                    </el-form-item>
                                     </td>
                                     <td>u/L</td>
                                     <td>9.00-50.00</td>
                                     <td>9-50</td>
                                     <td>9-50</td>
                                     <td>5-50</td>
                                </tr>
                                <tr>
                                     <td>谷草转氨酶</td>
                                     <td>
                                    <el-form-item label="" prop="resultGczam" label-width="0" ref="resultGczam">
                                            <el-input type="text" style="width:150px;"  v-model="formInline.resultGczam" clearable :disabled="$route.query.status == 'see'"></el-input>
                                    </el-form-item>
                                     </td>
                                     <td>u/L</td>
                                     <td>15.00-40.00</td>
                                     <td>15-40</td>
                                     <td>15-40</td>
                                     <td>8-40</td>
                                </tr>
                        </table>
                         <el-form-item label="录入员：" prop="resultDoctor">
                            <el-input type="text" style="width:220px;"  v-model="formInline.resultDoctor" clearable :disabled="$route.query.status == 'see'"></el-input>
                        </el-form-item>
                        <el-form-item label="录入日期：" prop="enterDate">
                             <el-date-picker
                                v-model="formInline.enterDate"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy 年 MM 月 dd 日"
                                :picker-options="pickerOptions"
                                clearable
                                :disabled="$route.query.status == 'see'">
                                </el-date-picker>
                        </el-form-item>
              </el-form>
          </cancer-widget>
          <div class="btns" v-if="$route.query.status == 'edit'">
              <el-button type="primary" @click="submitForm()">提交</el-button>
              <router-link to="/cancer/bloodResultList">
                <el-button type="danger">取消</el-button>
              </router-link>
            </div>  
    </div>
</template>
<script>
export default {
    data(){
        let validateresultDoctor = (rule, value, callback) => {
             if (!value) {
                return callback(new Error('必填'));
             }else{
                 if(value.length > 20){
                     callback(new Error('请输入20个以内的字符'));
                 }else{
                     callback();
                 }
             }
        }
        let resultZdgcRule = (rule,value,callback) =>{
            let reg = /^\d+(\.\d{0,2})?$/;
            if (!value) {
                callback(new Error('必填'));
            }else{
                if(!reg.test(value)){
                    callback(new Error('保留两位小数'));
                }else{
                    callback();
                }
            }
            // let reg = /^\d+(\.\d{0,2})?$/;
            // if(this.formInline.hosScopeType == ''){
            //     if(!value){
            //         callback(new Error('必填'));
            //     }else{
            //         callback();
            //     }

            // }else if(this.formInline.hosScopeType == '1'){
            //      if (!value) {
            //         callback(new Error('必填'));
            //     }else{
            //         if(Number(value) < 0 || Number(value) > 5.20){
            //             callback(new Error('请输入参考范围内的数字'));
            //         }else{
            //             if(!reg.test(value)){
            //                     callback(new Error('保留两位小数'));
            //             }else{
            //                     callback();
            //             }
            //         }
            //     }
            // }else if(this.formInline.hosScopeType == '2'){
            //     if (!value) {
            //      callback(new Error('必填'));
            //     }else{
            //         if(Number(value) < 0 || Number(value) > 5.17){
            //             callback(new Error('请输入参考范围内的数字'));
            //         }else{
            //             if(!reg.test(value)){
            //                     callback(new Error('保留两位小数'));
            //             }else{
            //                     callback();
            //             }
            //         }
            //     }
            // }else if(this.formInline.hosScopeType == '3'){
            //      if (!value) {
            //      callback(new Error('必填'));
            //     }else{
            //         if(Number(value) < 2.9 || Number(value) > 5.68){
            //             callback(new Error('请输入参考范围内的数字'));
            //         }else{
            //             if(!reg.test(value)){
            //                     callback(new Error('保留两位小数'));
            //             }else{
            //                     callback();
            //             }
            //         }
            //     }
            // }else if(this.formInline.hosScopeType == '4'){
            //      if (!value) {
            //      callback(new Error('必填'));
            //     }else{
            //         if(Number(value) < 3.1 || Number(value) > 5.2){
            //             callback(new Error('请输入参考范围内的数字'));
            //         }else{
            //             if(!reg.test(value)){
            //                     callback(new Error('保留两位小数'));
            //             }else{
            //                     callback();
            //             }
            //         }
            //     }
            // }
        }
        let resultGyszRule = (rule,value,callback) =>{
            // let reg = /^(\-)?\d+(\.\d{0,2})?$/;
            let reg = /^\d+(\.\d{0,2})?$/;
            if(this.formInline.hosScopeType == ''){
                if(!value){
                    callback(new Error('必填'));
                }else{
                    callback();
                }

            }else if(this.formInline.hosScopeType == '1'){
                 if (!value) {
                    callback(new Error('必填'));
                }else{
                    if(Number(value) < 0 || Number(value) > 2.30){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }else if(this.formInline.hosScopeType == '2'){
                if (!value) {
                 callback(new Error('必填'));
                }else{
                    if(Number(value) < 0 || Number(value) > 2.30){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }else if(this.formInline.hosScopeType == '3'){
                 if (!value) {
                 callback(new Error('必填'));
                }else{
                    if(Number(value) < 0.23 || Number(value) > 1.23){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }else if(this.formInline.hosScopeType == '4'){
                 if (!value) {
                 callback(new Error('必填'));
                }else{
                    if(Number(value) < 0 || Number(value) > 2.26){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }
        }
        let resultGbzamRule = (rule,value,callback) => {
            // let reg = /^(\-)?\d+(\.\d{0,2})?$/;
            let reg = /^\d+(\.\d{0,2})?$/;
            if(this.formInline.hosScopeType == ''){
                if(!value){
                    callback(new Error('必填'));
                }else{
                    callback();
                }

            }else if(this.formInline.hosScopeType == '1'){
                 if (!value) {
                    callback(new Error('必填'));
                }else{
                    if(Number(value) < 9 || Number(value) > 50){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }else if(this.formInline.hosScopeType == '2'){
                if (!value) {
                 callback(new Error('必填'));
                }else{
                    if(Number(value) < 9 || Number(value) > 50){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }else if(this.formInline.hosScopeType == '3'){
                 if (!value) {
                 callback(new Error('必填'));
                }else{
                    if(Number(value) < 9 || Number(value) > 50){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }else if(this.formInline.hosScopeType == '4'){
                 if (!value) {
                 callback(new Error('必填'));
                }else{
                    if(Number(value) < 5 || Number(value) > 50){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }
        }
        let resultGczamRule = (rule,value,callback) => {
             // let reg = /^(\-)?\d+(\.\d{0,2})?$/;
            let reg = /^\d+(\.\d{0,2})?$/;
            if(this.formInline.hosScopeType == ''){
                if(!value){
                    callback(new Error('必填'));
                }else{
                    callback();
                }

            }else if(this.formInline.hosScopeType == '1'){
                 if (!value) {
                    callback(new Error('必填'));
                }else{
                    if(Number(value) < 15 || Number(value) > 40){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }else if(this.formInline.hosScopeType == '2'){
                if (!value) {
                 callback(new Error('必填'));
                }else{
                    if(Number(value) < 15 || Number(value) > 40){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }else if(this.formInline.hosScopeType == '3'){
                 if (!value) {
                 callback(new Error('必填'));
                }else{
                    if(Number(value) < 15 || Number(value) > 40){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }else if(this.formInline.hosScopeType == '4'){
                 if (!value) {
                 callback(new Error('必填'));
                }else{
                    if(Number(value) < 8 || Number(value) > 40){
                        callback(new Error('请输入参考范围内的数字'));
                    }else{
                        if(!reg.test(value)){
                                callback(new Error('保留两位小数'));
                        }else{
                                callback();
                        }
                    }
                }
            }
        }
        return{
            personDetail:{},
            formInline:{
              bloodDate:'',// '采血日期';
              hosScopeType:'',// '参考范围类型 12 3 4',
              resultDoctor:'',// '结果录入医生  录入员',
              enterDate:'',// '录入日期';
              resultZdgc:'',
              resultGysz:'',
              resultGbzam:'',
              resultGczam:''
            },
            isChooseHosScopeType:false,
            rules:{
              bloodDate:[
                  { required:true, message:'必填' ,trigger: ['blur','change'] }
              ],
              resultDoctor:[
                  { required:true, message:'必填' ,trigger: ['blur','change'] },
                  { validator: validateresultDoctor, trigger: ['blur','change'] }
              ],
              enterDate:[
                  { required:true, message:'必填' ,trigger: ['blur','change'] }
              ],
              resultZdgc:[
                   { required:true, message:'必填' ,trigger: ['blur','change'] },
                   { validator: resultZdgcRule, trigger: ['blur','change'] }
              ],
              resultGysz:[
                   { required:true, message:'必填' ,trigger: ['blur','change'] },
                //    { validator: resultGyszRule, trigger: ['blur','change'] }
                   { validator: resultZdgcRule, trigger: ['blur','change'] }
              ],
              resultGbzam:[
                   { required:true, message:'必填' ,trigger: ['blur','change'] },
                //    { validator: resultGbzamRule, trigger: ['blur','change'] }
                   { validator: resultZdgcRule, trigger: ['blur','change'] }
              ],
              resultGczam:[
                   { required:true, message:'必填' ,trigger: ['blur','change'] },
                //    { validator: resultGczamRule, trigger: ['blur','change'] }
                   { validator: resultZdgcRule, trigger: ['blur','change'] }
              ],
              hosScopeType:[
                 { required: true, message: '必选', trigger: 'change' }
              ]
            },
            pickerOptions:{
                disabledDate(time) {
                   return time.getTime() > Date.now();
                },
            }
        }
    },
    watch: {
        'formInline.hosScopeType':function(newVal, oldValue){
           if(newVal){
               this.isChooseHosScopeType = false;
               if(this.$route.query.status == 'edit'){
                  this.$refs.resultZdgc.clearValidate();
                  if(this.formInline.resultZdgc != ''){
                      this.$refs.formInline.validateField('resultZdgc');
                  }
                  this.$refs.resultGysz.clearValidate();
                  if(this.formInline.resultGysz != ''){
                      this.$refs.formInline.validateField('resultGysz');
                  }
                  this.$refs.resultGbzam.clearValidate();
                  if(this.formInline.resultGbzam != ''){
                     this.$refs.formInline.validateField('resultGbzam');
                  }
                  this.$refs.resultGczam.clearValidate();
                  if(this.formInline.resultGczam != ''){
                     this.$refs.formInline.validateField('resultGczam');
                  }
               }
           }else{
               this.isChooseHosScopeType = true;
           }
        }
    },
    mounted() {
        this.getPersonInfo()
        if(this.$route.query.status == 'edit'){
           this.formInline.resultDoctor = sessionStorage.getItem('deptName');
        }else if(this.$route.query.status == 'see'){
           this.$axios_http({
                url: "/base/blood/find/result",
                data: {
                    id: this.$route.query.id,
                },
                vueObj: this
            }).then((res) => {
                if(res.data.status == "SUCCESS"){
                    this.formInline.bloodDate = new Date(res.data.result.bloodDate);
                    this.formInline.hosScopeType = String(res.data.result.hosScopeType);
                    this.formInline.resultDoctor = res.data.result.resultDoctor;
                    this.formInline.enterDate = new Date(res.data.result.enterDate);
                    this.formInline.resultZdgc = res.data.result.resultZdgc;
                    this.formInline.resultGysz = res.data.result.resultGysz;
                    this.formInline.resultGbzam = res.data.result.resultGbzam;
                    this.formInline.resultGczam = res.data.result.resultGczam;
                }
            });
        }
    },
    methods: {
        getPersonInfo(){
            this.$axios_http({
                url: "/base/re/booking/qurey/getPersonDetails",
                data: {
                    personId: this.$route.query.personId,
                    surverId: this.$route.query.surverId
                },
                vueObj: this
            }).then((res) => {
                if(res.data.status == "SUCCESS"){
                    this.personDetail = res.data.result;
                }
            });
        },
        submitForm(){
            let flag = true;
            if(this.formInline.hosScopeType == ''){
                this.isChooseHosScopeType = true;
                flag = false;
            }else{
                this.isChooseHosScopeType = false;
                flag = true;
            }
            this.$refs.formInline.validate((valid) => {
                if(valid && flag){
                   this.$axios_http({
                    url: "/base/blood/add/result",
                    data:Object.assign({},this.personDetail,this.formInline),
                    vueObj: this
            }).then((res) => {
                if(res.data.status == "SUCCESS"){
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    });
                    this.$router.push({
                        path:'/cancer/bloodResultList'
                    })
                }
            });
                }else{
                    return false;
                }
            });
        }
    },
}
</script>
<style lang="css" scoped>
.bloodResultInput-container{
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}
.bloodResultInput-container-title{
    height: 60px;
    line-height: 80px;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    color: #000;
}
.title{
  display: inline-block;
  padding-left: 10px;
  border-left: 2px solid #409EFF;
  color: #409EFF;
  height: 22px;
  line-height: 22px;
  margin-bottom: 20px;
}
.rows .el-row{
  margin-bottom: 15px;
  color: #606266;
  font-size:14px;
}
.rows .el-row span{
  display: inline-block;
  width: 100px;
  text-align: right;
}
.btns{
    margin:30px 0;
    text-align: center;
}
.btns .el-button{
   margin:0 10px;
}
.el-form.blood-form{
    width: 80%;
    margin:0 auto;
}
.table{
    margin:20px 0;
    border: 0;
    border-collapse: collapse;
}
.table td {
    padding:10px 20px;
    border: 1px solid #999;
}
.table .el-radio{
    margin-left:20px;
    margin-top: 10px;
}
</style>