<template>
    <div>
      <table-com :propsData="propsData" :tableData="tableData" @change="handleSelectionChange" @selectAll="handleSelectionAll">
        <template slot="operating">
          <el-table-column
            label="操作"
            fixed="right"
            width="180">
            <template slot-scope="scope">
            </template>
          </el-table-column>
        </template>
    </table-com>
    </div>
</template>
<script>
import DICTIONARY from '@/views/common/dictionary'
import { APPOINTTB } from '@/views/recruitmentPoint/appointment/tablePropConfig'
  export default {
    name:'appointmentTable',
    props:["tableData"],
    data () {
      return {
        propsData: APPOINTTB,
        multipleSelection:[],
      }
    },
    created(){

    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.$emit('multipleSelection',this.multipleSelection)
      },
      handleSelectionAll(val) {
        this.multipleSelection = val;
        this.$emit('multipleSelection',this.multipleSelection)
      }

    }
  }
</script>