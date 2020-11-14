<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group
      @handleSetLineChartData="handleSetLineChartData"
      :numberList="numberList"
    />

    <el-row style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px">
      <line-chart :chart-data="lineChartData" :Xopts="Xopts" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <todo-list />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :pieData="pieData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <box-card />
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col
        style="padding-right: 8px; margin-bottom: 30px"
      >
        <bar-chart  :chart-data="barChartData" :Xopts="XoptsBar" />
      </el-col></el-row>
      <!-- <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
        style="margin-bottom: 30px"
      >
        <transaction-table />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        style="margin-bottom: 30px"
      >
      </el-col
      ><raddar-chart />
      </el-row> -->

    <!-- {{ projects9411 }} -->
  </div>
</template>

<script>
import GithubCorner from "@/components/GithubCorner";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import TransactionTable from "./components/TransactionTable";
import TodoList from "./components/TodoList";
import BoxCard from "./components/BoxCard";
import { mapActions, mapState } from "vuex";

let lineChartData = {
  newVisitis: {
    expectedData: [2, 19, 12, 14, 16, 13, 14],
    actualData: [1, 2, 1, 2, 1, 3, 1],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: "DashboardAdmin",
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      type: "newVisitis",
      Xopts: ["1", "1", "1", "1"],
      XoptsBar: ["1", "1", "1", "1"],
    };
  },
  computed: {
    ...mapState("projectManage", [
      "projects9411",
      "projects9441",
      "projects9425",
      "projects9414",
      "projects9440",
      "projects9432",
    ]),
    ...mapState("signupcheck", ["signupcheck", "infocheck"]),
    ...mapState("usermanage", ["user"]),
    numberList() {
      let sum = 0;
      this.user.forEach((element) => {
        sum += element.money - 0;
      });
      return [
        sum,
        this.projects9411.length +
          this.projects9441.length +
          this.projects9425.length +
          this.projects9414.length +
          this.projects9440.length +
          this.projects9432.length,
        this.infocheck.length,
        this.signupcheck.length,
      ];
    },
    pieData() {
      let nameArr = this.projects9411.map((i) => {
        return { name: i.name };
      });
      nameArr.forEach((i) => {
        i.value = this.signupcheck.filter((e) => {
          return e.product.name == i.name;
        }).length;
      });
      return nameArr;
    },
    barChartData(){
      let nameArr = this.projects9411.map((i) => {
        return { name: i.name };
      });
      this.XoptsBar = nameArr.map(i=>{return i.name})
      let arr = {
        '报名中': [],
        '审核中': [],
        '已完成': [],
        '游学中': [],
      }
      for(let key in arr){
        nameArr.forEach((i) => {
          arr[key].push(this.signupcheck.filter((e) => {
            return e.product.name == i.name && e.product.photo.status == key;
          }).length)
        });
      }
      return arr
    }
  },
  watch: {
    user: function () {
      this.handleSetLineChartData(this.type);
    },
  },
  methods: {
    ...mapActions("projectManage", ["queryAllProjects"]),
    ...mapActions("signupcheck", ["querySignUpInfo"]),
    ...mapActions("usermanage", ["findAll"]),
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type];
      this.type = type;
      switch (type) {
        case "newVisitis":
          this.Xopts = this.user.map((i) => {
            return i.realname ? i.realname : "暂无";
          });
          const arr = [];
          this.lineChartData = {
            actualData: this.user.map((i) => {
              arr.push((Math.random() * 10) / 1);
              return parseInt(i.money == null ? (i.money = 0) : i.money);
            }),
            expectedData: arr,
          };
          break;
        case "messages":
          this.Xopts = [
            "项目数",
            "轮播图数",
            "关于我们",
            "学生风采",
            "常见问题",
            "精彩瞬间",
          ];
          this.lineChartData = {
            actualData: [
              this.projects9411.length,
              this.projects9441.length,
              this.projects9425.length,
              this.projects9414.length,
              this.projects9440.length,
              this.projects9432.length,
            ],
            expectedData: [1, 2, 1, 2, 1, 3],
          };
          break;
        case "purchases":
          this.Xopts = ["未审核", "审核通过", "审核不通过"];
          this.lineChartData = {
            actualData: [
              this.infocheck.filter((i) => {
                return i.status == "未审核";
              }).length,
              this.infocheck.filter((i) => {
                return i.status == "审核通过";
              }).length,
              this.infocheck.filter((i) => {
                return i.status == "审核不通过";
              }).length,
            ],
            expectedData: [0, this.infocheck.length, 0],
          };
          break;
        case "shoppings":
          this.Xopts = ["未审核", "审核通过", "审核不通过"];
          this.lineChartData = {
            actualData: [
              this.signupcheck.filter((i) => {
                return i.status == "未审核";
              }).length,
              this.signupcheck.filter((i) => {
                return i.status == "审核通过";
              }).length,
              this.signupcheck.filter((i) => {
                return i.status == "审核不通过";
              }).length,
            ],
            expectedData: [0, this.signupcheck.length, 0],
          };
          break;
      }
    },
    async finder() {
      await this.queryAllProjects();
      await this.querySignUpInfo();
      await this.findAll();
    },
  },
  created() {
    this.finder();
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
