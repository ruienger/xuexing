<template>
  <div>
    <div class="projectManage-header">
      <el-select v-model="filter.status" clearable placeholder="请选择">
        <el-option v-for="item in status" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <!-- 新增常见问题 -->
      <el-button
        type="primary"
        round
        v-if="!isFixedLabel"
        @click="
          dialogFormVisible = true
          form = {}
        "
        >新增项目</el-button
      >
    </div>
    
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
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="handleDelete(scope.row)"
            style="margin-left: 5px"
          >
            <el-button  v-if="!isFixedLabel" slot="reference" type="text" size="small" style="color:red"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增QA" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="常见问题" :label-width="'400'">
          <el-input v-model="form.name" autocomplete="off" required></el-input>
        </el-form-item>
        <el-form-item label="常见回答">
          <el-input type="textarea" v-model="form.description" autocomplete="off" required></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick(form)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      dialogFormVisible: false,
      form: {
        name: '',
        description: '',
        price: '',
        status: '正常',
        photo: ''
      }
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
      if(this.dialogFormVisible){
        this.dialogFormVisible = false
      }
      e.categoryId = this.categoryId
      e.status != '正常'?e.status = '正常':e.status = '禁用'
      this.$emit('updateClicked',e)
    },
    // 删除按钮点击事件
    handleDelete(id){
      this.$emit('deleteClicked',id)
    }
  },
};
</script>

<style>
</style>