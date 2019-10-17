<template>
  <el-date-picker
    class="date-picker-range"
    size="small"
    v-model="time"
    type="datetimerange"
    :picker-options="pickerOptions"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    align="right"
    format="yyyy-MM-dd HH:mm"
    value-format="yyyy-MM-dd HH:mm"
    @change="timeChange"
    :editable="editable">
  </el-date-picker>
</template>

<script>
  export default {
    name: 'cancer-date-picker-range',
    props: ['startTime', 'endTime'],
    data () {
      return {
        editable: false,
        time: !this.startTime || !this.endTime ? '' : [this.startTime, this.endTime],
        // 日历快捷选项
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0)
              start.setMinutes(0)
              start.setSeconds(0)
              end.setTime(start.getTime() + 3600 * 1000 * 24 - 1000)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    watch: {
      startTime (newVal) {
        if (!newVal) return
        this.time = [newVal, this.endTime]
      },
      endTime (newVal) {
        if (!newVal) return
        this.time = [this.startTime, newVal]
      }
    },
    methods: {
      timeChange (value) {
        let [startTime, endTime] = value || ['', '']
        this.$emit('change', {startTime: startTime || '', endTime: endTime || ''})
      }
    },
    created () {
      this.$emit('change', {startTime: this.time[0], endTime: this.time[1]})
    }
  }
</script>
<style scoped>
  .date-picker-range {
    width: 340px;
  }
</style>
