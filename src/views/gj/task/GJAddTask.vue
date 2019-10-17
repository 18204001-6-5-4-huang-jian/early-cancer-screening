<template>
  <!--任务分配-->
  <div>
    <!--基本信息-->
    <cancer-widget>
      <p class="cancer-title-blue">基本信息</p>
      <el-row class="cancer-margin--b15 base-info">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          :inline="true"
          label-width="120px">
          <el-row>
             <el-form-item label="所属项目：" prop="itemsUnderIt">
              <el-radio-group v-model="formData.itemsUnderIt">
                 <el-radio 
                  v-for="item in itemsUnderIt"  
                  :key="item.id"
                  :label="item.id"
                  @change="changeFormData('changeItemsUnderIt')">
                  {{item.name}}
                  </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="任务类型：" prop="taskType">
              <el-radio-group v-model="formData.taskType">
                 <el-radio 
                  v-for="item in taskType"  
                  :key="item.id"
                  :label="item.id"
                  @change="changeFormData">
                  {{item.name}}
                  </el-radio>
              </el-radio-group>
            </el-form-item>
            </el-row>
            <el-row>
             <el-form-item label="任务年度：" prop="projectYear" v-if="formData.itemsUnderIt == 2">
              <el-select
                v-model="formData.projectYear"
                clearable
                size="small"
                @change="changeFormData"
                placeholder="请选择">
                <el-option
                  v-for="item in projectYear"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务数量：" v-if="formData.taskType != 'scrw'">
              <el-input v-model.trim="formData.taskNum"  clearable style="width:200px;" size="small"></el-input>
            </el-form-item>
          </el-row>
          <!-- 早诊早治筛查任务 -->
          <el-row v-if="formData.taskType == 'scrw' && formData.itemsUnderIt == 2">
            <el-form-item label="任务数量：" prop="cancerType">
              <el-checkbox-group v-model="formData.cancerType" @change="changeFormData">
                <template>
                  <el-checkbox :label="0" class="cancer-margin--r10">肺癌</el-checkbox>
                  <el-input v-model.trim="userStatus.faNum" style="width: 80px;" size="small" clearable :disabled="!formData.cancerType.includes(0)"  @change="changeFormData"></el-input>
                </template>
                 <template>
                  <el-checkbox :label="2" class="cancer-margin--r10 cancer-margin--l20">肝癌</el-checkbox>
                  <el-input v-model.trim="userStatus.gaNum" style="width: 80px;" size="small" clearable :disabled="!formData.cancerType.includes(2)"  @change="changeFormData"></el-input>
                </template>
                <template>
                  <el-checkbox :label="1" class="cancer-margin--r10 cancer-margin--l20">乳腺癌</el-checkbox>
                  <el-input v-model.trim="userStatus.rxaNum" style="width: 80px;" size="small" clearable  :disabled="!formData.cancerType.includes(1)"  @change="changeFormData"></el-input>
                </template>
                <template>
                  <el-checkbox :label="3" class="cancer-margin--r10 cancer-margin--l20">上消化道癌</el-checkbox>
                  <el-input v-model.trim="userStatus.sxhdaNum" style="width: 80px;" size="small" clearable :disabled="!formData.cancerType.includes(3)"  @change="changeFormData"></el-input>
                </template>
                <template>
                  <el-checkbox :label="4" class="cancer-margin--r10 cancer-margin--l20">结直肠癌</el-checkbox>
                  <el-input v-model.trim="userStatus.caNum" style="width: 80px;" size="small" clearable :disabled="!formData.cancerType.includes(4)"  @change="changeFormData"></el-input>
                </template>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <!-- 肺肠项目筛查任务 -->
          <el-row v-if="formData.taskType == 'scrw' && formData.itemsUnderIt == 1">
            <el-form-item label="任务数量：" prop="cancerType">
              <el-checkbox-group v-model="formData.cancerType" @change="changeFormData">
                <template>
                  <el-checkbox :label="0" class="cancer-margin--r10">肺癌</el-checkbox>
                  <el-input v-model.trim="userStatus.fachaNum" style="width: 80px;" size="small" clearable :disabled="!formData.cancerType.includes(0)"  @change="changeFormData"></el-input>
                </template>
                <template>
                  <el-checkbox :label="1" class="cancer-margin--r10 cancer-margin--l20">结直肠癌</el-checkbox>
                  <el-input v-model.trim="userStatus.jzcNum" style="width: 80px;" size="small" clearable  :disabled="!formData.cancerType.includes(1)"  @change="changeFormData"></el-input>
                </template>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
    </cancer-widget>
    <!--用户列表-->
    <cancer-widget>
      <p class="cancer-title-blue" style="margin-top: -40px;">机构列表</p>
      <template slot="sub-button">
        <el-button type="primary" size="small" @click="addUserHandler">添加机构</el-button>
        <el-button type="primary" size="small" @click="delListHandler">清空列表</el-button>
      </template>
      <el-table
        :data="listTableData.list"
        border
        style="width: 100%"
        class="cancer-margin--b15"
        empty-text="暂无数据">
        <el-table-column
          label="序号"
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="deptType"
          label="机构类型">
        </el-table-column>
        <el-table-column
          prop="taskNum"
          label="机构任务数">
          <template slot-scope="scope">
            {{scope.row.taskNum || 0}}
          </template>
        </el-table-column>
        <el-table-column
          prop="itemsUnderIt"
          label="所属项目">
          <template slot-scope="scope">
            {{scope.row.itemsUnderIt | itemsUnderItFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="癌种">
          <template slot-scope="scope">
            {{scope.row.cancerType | cancerTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="modifyHandler(scope.row, scope.$index)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template slot="bottom-button">
        <el-button size="small" @click="confirmHandler">确定</el-button>
        <el-button size="small" @click="cancelHandler">取消</el-button>
      </template>
    </cancer-widget>

    <!--修改弹框-->
    <el-dialog
      title="确认修改任务数"
      :visible.sync="modifyDialogVisible"
      width="30%"
      @close="closeHandler">
      <p class="cancer-margin--b15">该用户原任务数：{{originalTaskNum}}</p>
      <p>请确认任务数：
        <el-input
          v-model.trim="confirmTaskNum"
          style="width: 150px;"
          clearable
          size="small"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
      <el-row type="flex" justify="center">
        <el-button @click="modifyConfirmHandler" size="small" type="primary">确 定</el-button>
        <el-button @click="modifyDialogVisible = false" size="small">取 消</el-button>
      </el-row>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import mixin from '@/mixins/mixins'
  import service from '@/views/gj/task/add-task-service'
  import ls from '@/utils/storage'
  import DICTIONARY from '@/views/common/dictionary'
  export default {
    name: 'gj-add-task',
    mixins: [ mixin,service ],
    data () {
      return {
        formData: {
          projectYear: null,//年度
          taskType: null,//任务类型
          taskNum: null,//任务数量
          itemsUnderIt: null,//所属项目
          cancerType: []//癌种
        },
        projectYear: DICTIONARY.projectYear,
        taskType: DICTIONARY.taskType,
        itemsUnderIt: DICTIONARY.itemsUnderIt,
        listTableData: {
          list: []
        },
        modifyDialogVisible: false,  //修改弹框
        originalTaskNum: null,  //原任务数
        confirmTaskNum: null,
        userStatus:{
          faNum: null,
          rxaNum: null,
          gaNum: null,
          sxhdaNum: null,
          caNum: null,
          fachaNum:null,
          jzcNum:null
        },
        rules:{
          projectYear:[
            { required: true, message: '必填', trigger: 'change' }
          ],
          taskType:[
            { required: true, message: '必填', trigger: 'change' }
          ],
          itemsUnderIt:[
            { required: true, message: '必填', trigger: 'change' }
          ],
          cancerType:[
            { required: true, message: '必填', trigger: 'change' }
          ]
        },
        cancerTypes: [],
        alloctIds: []
      }
    },
    created () {
      if (ls.getItem('deptList') && ls.getItem('deptList').length) {
        this.formData.projectYear = this.$route.query.projectYear
        this.formData.taskType = this.$route.query.taskType
        this.formData.taskNum = this.$route.query.utNum
        this.formData.itemsUnderIt = this.$route.query.itemsUnderIt
        if (this.$route.query.taskType === 'scrw') {
          this.formData.cancerType = ls.getItem('cancerId')
          let tempArr = ls.getItem('cancerArray')
          if(this.$route.query.itemsUnderIt === 2) {
            // 早诊早治
            for (let i = 0; i < tempArr.length; i++) {
              this.userStatus = {
                faNum: tempArr[0].num?tempArr[0].num:null,
                rxaNum: tempArr[1].num?tempArr[1].num:null,
                gaNum: tempArr[2].num?tempArr[2].num:null,
                sxhdaNum: tempArr[3].num?tempArr[3].num:null,
                caNum: tempArr[4].num?tempArr[4].num:null,
              }
            }
          } else if(this.$route.query.itemsUnderIt === 1) {
            //肺肠
            for (let i = 0; i < tempArr.length; i++) {
              this.userStatus = {
                fachaNum: tempArr[0].num?tempArr[0].num:null,
                jzcNum: tempArr[1].num?tempArr[1].num:null,
              }
            }
          }
        }
      }
      ls.getItem('deptList') && (this.listTableData.list = [...ls.getItem('deptList')]);
    },
    methods: {
      // 清空列表
      delListHandler() {
        this.$confirm('确定清空机构列表数据?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.clearStorage()
          this.listTableData.list = null;
        }).catch(() => {})
      },

      // 修改表单值
      changeFormData (val) {
        if(ls.getItem('deptList')) {
          this.$confirm('修改表单数据会导致所选择的机构列表数据清除，请确认是否修改?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.clearStorage()
            this.listTableData.list = null;
          }).catch(() => {
            this.formData.projectYear = this.$route.query.projectYear
            this.formData.taskType = this.$route.query.taskType
          });
        }
        if(val === 'changeItemsUnderIt') {
          this.formData.cancerType = []
        }
      },

      // 修改
      modifyHandler (row, index) {
        this.modifyDialogVisible = true
        this.originalTaskNum = row.taskNum || 0
        this.index = index
      },

      // 关闭弹框
      closeHandler () {
        this.modifyDialogVisible = false
      },

      // 确认弹框
      modifyConfirmHandler () {
        // 解决vue中数组中的元素赋值不会触发Vue的响应式更新
        this.listTableData.list[this.index].taskNum = this.confirmTaskNum
        this.listTableData.list.splice(this.index, 1, this.listTableData.list[this.index])
        this.modifyDialogVisible = false
      },

      // 确定
      confirmHandler () {
        if (!this.listTableData.list.length) {
          this.$failMsg(this, '用户列表不能为空！')
          return
        }
        this.submitData()
      },

      // 清除缓存
      clearStorage() {
        ls.removeItem('cancerTypes')
        ls.removeItem('cancerArray')
        ls.removeItem('cancerId')
        ls.removeItem('cancerItemsUnderItId')
        ls.removeItem('deptList')
        ls.removeItem('alloctIds')
      },

      // 取消
      cancelHandler () {
        this.jumpToPage('/gj/task/index')
        this.clearStorage()
      },

      // 添加机构
      addUserHandler () {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            // console.log(this.formData.itemsUnderIt);
            if (!this.formData.cancerType.length && this.formData.taskType === 'scrw') {
              this.$failMsg(this, '请选择癌种类型！！')
              return
            }
            if(this.formData.taskNum && !(/^[0-9]{1,}$/.test(this.formData.taskNum))) {
              this.$failMsg(this, '机构任务数必须为正整数！')
              return
            }
            let cancerArray = []
            if(this.formData.itemsUnderIt === 1) {
              cancerArray = [
                {
                  id: 0,
                  name: '肺癌',
                  key: 'fa',
                  num: this.userStatus.fachaNum
                },
                {
                  id: 1,
                  name: '结直肠癌',
                  key: 'ca',
                  num: this.userStatus.jzcNum
                }
              ]
            } else if(this.formData.itemsUnderIt === 2){
              cancerArray = [
                {
                  id: 0,
                  name: '肺癌',
                  key: 'fa',
                  num: this.userStatus.faNum
                },
                {
                  id: 1,
                  name: '乳腺癌',
                  key: 'rxa',
                  num: this.userStatus.rxaNum
                },
                {
                  id: 2,
                  name: '肝癌',
                  key: 'ga',
                  num: this.userStatus.gaNum
                },
                {
                  id: 3,
                  name: '上消化道癌',
                  key: 'sxhda',
                  num: this.userStatus.sxhdaNum
                },
                {
                  id: 4,
                  name: '结直肠癌',
                  key: 'ca',
                  num: this.userStatus.caNum
                }
              ]
            }
            
            if(cancerArray.length > 0) {
              //筛查类型的项目
              this.formData.cancerType.map((item) => {
                  this.cancerTypes.push(cancerArray[item].key)
              })
            }

            if (this.formData.taskType === 'scrw') {
              ls.setItem('cancerId', this.formData.cancerType)
              ls.setItem('cancerItemsUnderItId', this.formData.itemsUnderIt)
              ls.setItem('cancerTypes', this.cancerTypes)
              ls.setItem('cancerArray', cancerArray)
            }

            if (ls.getItem('deptList')) {
              if (ls.getItem('alloctIds')){
                this.alloctIds = [...this.alloctIds,...ls.getItem('alloctIds')]
              }
              this.$route.query.alloctId && this.alloctIds.push(Number(this.$route.query.alloctId))
              ls.setItem('alloctIds', this.alloctIds)
            }

            this.$router.push({
              path: '/gj/task/adduser',
              query: {
                projectYear: this.formData.projectYear,
                taskType: this.formData.taskType,
                utNum: this.formData.taskNum,
                itemsUnderIt: this.formData.itemsUnderIt,
                cancerType: this.formData.cancerType.join('')
              }
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .base-info {
    padding-left: 20px;
    color: #444;
  }
</style>
