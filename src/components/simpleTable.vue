<template>
  <div>
    <el-select v-model="filter.status" clearable placeholder="请选择">
      <el-option v-for="item in status" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
    <el-table
      :data="projectsShown"
      stripe
      style="width: 100%"
      v-loading="loading"
    >
      <!-- labelArr实例：
        [
            { label:xxx, prop:xxx }
        ] -->
      <el-table-column
        align="center"
        v-for="item in labelArr"
        :key="item.name"
        :prop="item.prop || item.label"
        :label="item.label"
      >
        <template slot-scope="scope">
          {{ scope.row[item.content] || item.isDeep?scope.row.photo.status:scope.row[item.prop] || "暂无" }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="承办单位" v-if="isFixedLabel">
        学行天下游学项目管理组
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 该组件主要实现将传入的数据和列表项数组呈现到表格中
// 预计完成的功能有：
//     根据列表数组排列表格，根据数据填入表格、不提供新增、删除功能。提供筛选、修改可视状态
import pageHelper from "@/utils/pageHelper";
import moment from "moment";

export default {
  name: "simpleTable",
  props: {
    projects: Array,
    categoryId: Number,
    labelArr: Array,
    isFixedLabel: Boolean,
    status: Array
  },
  data() {
    return {
      filter: {
        status: "",
      },
      list: {
        page: 0,
        pageSize: 10,
      },
    };
  },
  computed: {
    loading() {
      return Boolean(!this.projects);
    },
    projectsShown() {
      return pageHelper(this.projects, this.filter, this.list);
    },
  },
  methods: {
    //格式化要显示的内容内容
    formatTime(time) {
      return (
        moment(time).format("YYYY-MM-DD") +
        " ~ " +
        moment(time + 3000 * 60 * 60 * 24 * 30).format("YYYY-MM-DD")
      );
    },
    formatStatus(status) {
      return status || "暂无";
    },
    // 修改按钮点击事件
    handleClick(e){
        e.categoryId = this.categoryId
        e.status != '正常'?e.status = '正常':e.status = '禁用'
        this.$emit('updateClicked',e)
    }
  },
};
</script>

<style>
</style>