<template>
    <div id="dashboard-signupCharts" :style="chartStyle" />
</template>

<script>
//引入hightCharts
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
import Highmaps from "highcharts/modules/map";

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);

export default {
  name: 'highChats',
  props:{
      options: Object,
      customerStyle: String
  },
  computed:{
      chartStyle(){
          return this.customerStyle||'min-width: 300px; min-height: 200px'
      }
  },
  methods:{
      //初始化图表
      initChart(){
        if (this.chart) {
            this.chart.destroy();
        }
        // 初始化 Highcharts 图表
        this.chart = new Highcharts.Chart("dashboard-signupCharts", this.options);
      },
      //更新图表
      refreshChart(){
          let length = this.options.series.length
          //遍历options新增的数据并依次更新
          for(let i=0; i<length; i++){
            this.chart.series[i].setData(this.options.series[i].data)
          }
          this.chart.redraw()
      }
      
  },
  watch:{
      //当选项变化时更新图表
      options:function(){
          this.refreshChart()
      }
  },
  mounted() {
    this.initChart()
  }
}
</script>

<style>

</style>