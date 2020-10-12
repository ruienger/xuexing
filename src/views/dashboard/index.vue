<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ name }}</div>
    <div class="dashboard-signupCharts" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ]),
    ...mapState('signupcheck', ['signupcheck'])
  },
  mounted() {
    console.log(this.signupcheck)
    const myChart = this.$echarts.init(document.getElementsByClassName('dashboard-signupCharts')[0])
    myChart.setOption({
      title: {
        text: '报名信息总览'
      },
      tooltip: {},
      xAxis: {
        data: this.signupcheck.map((item) => {
          return item.realname
        })
      },
      yAxis: {},
      series: [{
        name: '账户余额',
        type: 'line',
        data: this.signupcheck.map((item) => {
          return item.money
        })
      }]
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-signupCharts{
  width: 85%;
  height: 280px;
  margin-top: 20px;
}
</style>
