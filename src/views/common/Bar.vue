
<template>
  <div>
    <div ref="myChart" class="echarts"></div>
  </div>
</template>
<script>
  export default {
    props: ['dataList'],
    data () {
      return {
        myChart: {},
      }
    },
    watch: {
      dataList: {
        deep: true,
        handler: function () {
          this.drawBar()
        }
      }
    },
    mounted: function () {
      var that = this;
      var myChart = that.$echarts.init(this.$refs['myChart']);
      that.myChart = myChart;
      that.drawBar();
      that.init();
    },
    methods: {
      drawBar () {
        //初始化数据
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: "{b}<br>{a}: {c}"
          },
          grid: {
            left: '1%',
            right: '3%',
            top: '3%',
            bottom: '6%',
            // show:true,
            containLabel: true
          },
          xAxis: {
            // type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#eee']
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: this.dataList && this.dataList.proviceName,
            splitLine: {show: false},
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            nameTextStyle: {
              width: 10
            },
            axisLabel: {
              interval: 0,
              formatter: function(value) {
                if (value.length > 3) {
                  return value.substring(0, 3) + "...";
                } else {
                  return value;
                }
              }
            }
          },
          series: [
            {
              name: '完成数',
              type: 'bar',
              data: this.dataList && this.dataList.percent,
              barWidth: 20,
              barGap: 30,
              smooth: true,
              cursor:'default',
              itemStyle: {
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 1, color: '#47ECE5'},
                      {offset: 0, color: '#13DDD4'}

                    ]
                  )
                }
              },
              emphasis:{
                color: new this.$echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                   [
                    {offset: 0, color: '#13DDD4'},
                    {offset: 1, color: '#47ECE5'}
                   ]
               )
              }
            }
          ]
        };
        this.myChart.setOption(option);
      },
      init(){
             const self = this;
             setTimeout(() => {
                window.onresize = function() {
                    self.myChart = self.$echarts.init(self.$refs.myChart);
                    self.myChart.resize();
                }
             },20)
           }
      }
  }
</script>
<style scoped>
  .echarts {
    background: #fff;
    width: 100%;
    height: 290px;
  }
</style>
