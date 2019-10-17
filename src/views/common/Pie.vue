
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
        handler: function () {
          this.drawPie()
        }
      }
    },
    mounted: function () {
      let that = this;
      let myChart = that.$echarts.init(this.$refs['myChart']);
      that.myChart = myChart;
      that.drawPie();
      that.init();
    },
    methods: {
      drawPie () {
        let legend = []
        this.dataList && this.dataList.map((item) => {
          legend.push(item)
        })
        let option = {
          color: ['#4EEB93', '#3989F8','#FFC439', '#FF4758', '#E872FD'],
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c}%"
          },
          legend: {
            bottom: 10,
            left: 'center',
            data: legend,
            icon:'rect',
            itemWidth: 10,  // 设置宽度
            itemHeight: 10, // 设置高度
          },
          series: [
            {
              type:'pie',
              radius : '55%',
              // roseType: 'radius',
              startAngle:30,
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              cursor:'default',
              label: {
                position:'outside',
                normal: {
                  textStyle:{
                     color:'#666'
                  },
                  show: true,
                  formatter:"{b}: {c}%",
                  // formatter: ' {b|{b}：} {per|{c}%}  ',
                  // rich: {
                  //       a: {
                  //           color: '#999',
                  //           lineHeight: 22,
                  //           align: 'center'
                  //       },
                  //       hr: {
                  //           borderColor: '#aaa',
                  //           width: '100%',
                  //           borderWidth: 0.5,
                  //           height: 0
                  //       },
                  //       b: {
                  //           color: '#000',
                  //           fontSize: 16,
                  //           lineHeight: 33
                  //       },
                  //       per: {
                  //           color: '#000',
                  //           backgroundColor: '#fff',
                  //       }
                  //   }

                },
              },
              labelLine: {
                normal: {
                  show: true,
                  lineStyle:{
                    color:'#666',
                    width:0.8,
                  }
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                  return Math.random() * 200;
              },
              data: this.dataList && this.dataList.map(item => {
                return {
                  name: item.name,
                  value: item.value
                }
              }),
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
    margin-top: 0px;
    width: 100%;
    height: 290px;
  }
</style>
