<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ name }}</div>
    {{userNameList}}
    <highCharts :options="options" customerStyle="width:96%; height: 400px"></highCharts>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import highCharts from '@/components/highCharts.vue';
import store from '@/store/index'

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
    ...mapGetters('usermanage',["userNameList"]),
    ...mapState("signupcheck", ["signupcheck"]),
  },
  data() {
    return {
      //options用于配置hightcharts
      chart: null,
      options: {
        chart: {
          type: "bar",
        },
        title: {
          text: "Fruit Consumption",
        },
        xAxis: {
          categories: this.userNameList,
        },
        yAxis: {
          title: {
            text: "Fruit eaten",
          },
        },
        series: [
          {
            name: "Jane",
            data: [1, 0, 4],
          },
          {
            name: "John",
            data: [5, 7, 3],
          },
        ],
      },
    };
  },
  components:{
    highCharts
  },
  store,
  created(){
    // 初始化所有数据以显示在 highcharts中
    // store.dispatch('authmanage/queryComment')
    // store.dispatch('infocheck/queryProduct')
    // store.dispatch('moduleManage/queryProduct')
    store.dispatch('projectManage/queryAllProjects')
    // store.dispatch('signupcheck/querySignUpInfo')
    // store.dispatch('usermanage/queryProduct')
  }
};
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
.dashboard-signupCharts {
  width: 85%;
  height: 280px;
  margin-top: 20px;
}
</style>
