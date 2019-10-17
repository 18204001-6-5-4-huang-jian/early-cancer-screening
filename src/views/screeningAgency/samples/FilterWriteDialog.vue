<template>
  <div>
    <el-dialog
      title="检验生物样本ID"
      :visible.sync="filterSampleDialogVisible"
      width="40%"
      label-position="right"
      :before-close="closeDialog">
      <el-form
        :model="formData"
        :rules="formRules"
        ref="formData"
        label-width="150px">
        <el-form-item label="请输入生物样本ID:" prop="mainSampleId">
          <el-input v-model.trim="formData.mainSampleId" size="small" clearable style="width: 200px;" :disabled="isShowIdCard===0"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" prop="idCard" v-if="isShowIdCard===0">
          <el-input v-model.trim="formData.idCard" size="small" clearable style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" @click="submitDialog" type="primary">确认</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import mixin from '@/mixins/mixins'
  export default {
    name: 'sample-filter-write',
    mixins: [ mixin ],
    props: ['filterSampleDialogVisible', 'isShowIdCard'],
    data() {
      // 样本ID
      const validateId = (rule, value, callback) => {
          if (value && !(/^([0-9]{11}[A-Z]{0,1}|[0-9]{12})$/.test(value))) {
              callback(new Error('生物样本ID校验规则未通过'))
          }else{
              callback();
          }
      }
      return {
        formData: {
          mainSampleId: null,
          idCard: null
        },
        formRules: {
          mainSampleId: [
            {required: true, message: '请输入生物样本ID', trigger: 'blur'},
            { trigger: 'blur', validator: validateId},
          ],
          idCard: [
            {required: true, message: '请输入身份证号', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
    },
    methods: {
      // 取消
      closeDialog () {
        this.$emit('closeDialog', false);
        this.formData.mainSampleId=null;
        this.formData.idCard=null;
      },

      // 确定
      submitDialog() {
        return new Promise(resolve => {
          this.$refs['formData'].validate(async valid => {
            if (valid) {
              resolve(valid)
              this.isShowIdCard !==0 && await this.$emit('checkSampleId', this.formData.mainSampleId.substring(0,11))
              this.isShowIdCard === 0 && this.$emit('checkIdCard', this.formData.idCard)
            }else {
              return false
            }
          })
        })
      }
    }
  }
</script>