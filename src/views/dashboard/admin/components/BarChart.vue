<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '310px'
    },
    Xopts: {
      type: Array,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch:{
    chartData:{
      deep: true,
      handler(){
        this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.Xopts,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '报名中',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData['报名中'],
          animationDuration
        }, {
          name: '审核中',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData['审核中'],
          animationDuration
        }, {
          name: '游学中',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData['游学中'],
          animationDuration
        }, {
          name: '已完成',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData['已完成'],
          animationDuration
        }]
      })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.Xopts,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '报名中',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData['报名中'],
          animationDuration
        }, {
          name: '审核中',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData['审核中'],
          animationDuration
        }, {
          name: '游学中',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData['游学中'],
          animationDuration
        }, {
          name: '已完成',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.chartData['已完成'],
          animationDuration
        }]
      })
    }
  }
}
</script>
