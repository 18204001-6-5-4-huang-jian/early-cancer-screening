<template>
    <div>
      <table-com :propsData="propsData" :tableData="tableData">
        <template slot="operating">
            <el-table-column
              label="操作"
              fixed="right"
              width="180">
            <template slot-scope="scope">
                <el-button type="text" size="small"  @click="addResult(scope.row)" v-if="scope.row.resultStatus==2">录入</el-button>
                <el-button type="text" size="small"  @click="addResult(scope.row)" v-if="scope.row.resultStatus==1 && scope.row.evaluateStatus!=4">修改</el-button>
                <el-button type="text" size="small"  @click="seeResult(scope.row)" v-if="scope.row.evaluateStatus==4">查看</el-button>
            </template>
            </el-table-column>
        </template>
    </table-com>
      <el-dialog
        title="Hp结果录入"
        :visible.sync="dialogHPVisible"
        width="570px"
        :before-close="handleClose">
        <p>所属项目：早诊早治</p>
        <br>
        <span>检查结果为：</span>
        <el-radio-group v-model="hpResult">
          <el-radio :label="1">阴性</el-radio>
          <el-radio :label="2">阳性</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel" size="small">取 消</el-button>
          <el-button type="primary" @click="submitResult" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看 -->
      <el-dialog
        title="Hp结果"
        :visible.sync="dialogHPSee"
        width="570px"
        :before-close="handleClose">
        <p>所属项目：早诊早治</p>
        <br>
        <span>检查结果为：</span>
        <el-radio-group v-model="hpResult">
          <el-radio :label="1" v-if="hpResult == 1">阴性</el-radio>
          <el-radio :label="2" v-if="hpResult == 2">阳性</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="cancel" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import { HPTB } from '@/views/recruitmentPoint/HP/tablePropConfig'
  export default {
    props:["tableData"],
    data () {
      return {
        propsData: HPTB,
        dialogHPVisible: false,
        dialogHPSee: false,
        hpResult:null,
        id:null,
        surverId:null,
        personId:null
      }
    },
    methods: {
      addResult(row){
        this.hpResult=null;
        this.dialogHPVisible=true;
        this.id=row.id;
        this.hpResult=row.result;
        this.surverId=row.surverId;
        this.personId=row.personId;
      },
      submitResult(){
        this.$axios_http({
          url: "/base/measurement/update/hpResult",
          data: {
               id:this.id,
               result:this.hpResult,
               surverId:this.surverId,
               personId:this.personId,
          },
          vueObj: this
        }).then((res)=> {
          if(res.data.status=="SUCCESS"){
            this.$message({
                type: 'success',
                message: '保存成功!'
              });
            this.dialogHPVisible=false;
            this.$emit('refreshList');
          }
        })
      },
      cancel(){
        this.dialogHPVisible=false;
        this.hpResult=null;
        this.dialogHPSee = false;
      },
      handleClose(done) {
        done();
        this.hpResult=null;
      },
      seeResult(row) {
        this.dialogHPSee = true;
        this.hpResult = row.result;
      }
    }
  }
</script>