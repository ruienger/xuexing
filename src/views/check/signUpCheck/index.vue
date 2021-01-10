<template>
  <div>
    <!-- top -->
    <el-select v-model="filter.status" placeholder="请选择状态" clearable>
      <el-option v-for="item in options" :key="item.value" :value="item.value">
      </el-option>
    </el-select>
    <!-- <input autosize type="text" placeholder="输入项目名称" /> -->
    <!-- top -->
    <!-- 表格 -->
    <el-table
      :data="shownSignUpCheck"
      stripe
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <!-- <el-table-column align="center" prop="id" label="编号" width="80px" /> -->
      <el-table-column align="center" prop="customer.realname" label="姓名" />
      <el-table-column
        align="center"
        prop="customer.telephone"
        label="联系方式"
      />
      <el-table-column align="center" prop="product.name" label="选择项目" />
      <el-table-column align="center" prop="content" label="备注内容" />
      <el-table-column
        align="center"
        prop="commentTime"
        :formatter="formatDate"
        label="报名时间"
        sortable
      />
      <el-table-column align="center" fixed="right" label="查看" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="edithandle(scope.row)"
            :style="formatColor(scope.row.status)"
            :disabled="scope.row.status != '未审核'"
            >{{ scope.row.status }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 -->
    <br />
    <!-- 分页 -->
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="totalSignUp"
      :page-size="this.list.pageSize"
      @current-change="changePageNum"
    >
    </el-pagination>
    <!-- 分页 -->
    <!-- 对话框 -->
    <el-dialog title="审核报名信息" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" label-width="120px" size="mini">
        <el-form-item label="姓名：">
          <label>{{ form.customer ? form.customer.realname : "暂无" }}</label>
        </el-form-item>
        <el-form-item label="手机：">
          <label>{{ form.customer ? form.customer.telephone : "暂无" }}</label>
        </el-form-item>
        <el-form-item label="所在地：">
          <label
            >{{ form.customer ? form.customer.province : "暂无" }}
            {{ form.customer ? form.customer.city : "暂无" }}
            {{ form.customer ? form.customer.area : "暂无" }}</label
          >
        </el-form-item>
        <el-divider content-position="left">项目详情</el-divider>
        <el-form-item label="报名项目：">
          <label>{{ form.product ? form.product.name : "暂无" }}</label>
        </el-form-item>
        <el-form-item label="项目描述">
          <label>{{ form.product ? form.product.description : "暂无" }}</label>
        </el-form-item>
        <el-form-item label="项目目的地">
          <label>{{
            form.product
              ? form.product.photo.area &&
                form.product.photo.area[0] + " " + form.product.photo.area[1]
              : "暂无"
          }}</label>
        </el-form-item>
        <el-form-item label="项目状态">
          <label>{{ form.product ? form.product.photo.status : "暂无" }}</label>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="pass()">通 过</el-button>
        <el-button type="danger" @click="reject()">不通过</el-button>
      </span>
    </el-dialog>
    <!-- 对话框 -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import pageHelper from "@/utils/pageHelper";
import moment from "moment";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        product: {
          photo: {},
        },
      },
      list: {
        page: 0,
        pageSize: 10,
      },
      options: [
        {
          value: "审核通过",
        },
        {
          value: "未审核",
        },
        {
          value: "审核不通过",
        },
      ],
      filter: {
        status: "",
      },
    };
  },
  created() {
    // this.findAll()
    this.querySignUpInfo();
  },
  computed: {
    ...mapState("signupcheck", ["signupcheck", "totalSignUp"]),
    shownSignUpCheck() {
      return pageHelper(this.signupcheck, this.filter, this.list);
    },
  },
  methods: {
    ...mapActions("signupcheck", [
      "querySignUpInfo",
      "passComment",
      "nopassComment",
    ]),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    edithandle(data) {
      this.form = data;
      this.dialogVisible = true;
    },
    //时间格式化
    formatDate(row, column) {
      var newData = row[column.property];
      return moment(newData).format("YYYY-MM-DD HH:mm:ss");
    },
    // 颜色格式化
    formatColor(status) {
      switch (status) {
        case "审核通过":
          return "color: green";
        case "审核不通过":
          return "color: red";
        default:
          return "";
      }
    },
    // 分页
    changePageNum(page) {
      this.list.page = page - 1;
    },
    pass() {
      this.dialogVisible = false;
      this.passComment(this.form.id);
    },
    reject() {
      this.dialogVisible = false;
      this.nopassComment(this.form.id);
    },
  },
};
</script>

<style>
</style>
