<template>
  <div>
    <!-- top -->
    <el-select size="mini" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select size="mini" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <input autosize type="text" placeholder="输入项目名称" />
    <!-- top -->
    <!-- 表格 -->
    {{ signupcheck[0] }}
    <el-table :data="signupcheck" stripe style="width: 100%">
      <el-table-column align="center" prop="id" label="编号" width="80px" />
      <el-table-column align="center" prop="customer.realname" label="姓名" />
      <el-table-column align="center" prop="customer.telephone" label="联系方式" />
      <el-table-column align="center" prop="product.name" label="选择项目" />
      <el-table-column
        align="center"
        prop="registerTime"
        :formatter="formatDate"
        label="报名时间"
      />
      <!-- moment(registerTime).format('YYYY-MM-DD') -->
      <el-table-column align="center" fixed="right" label="查看" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edithandle(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 -->
    <!-- 分页 -->
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="total"
      :page-size="this.list.pageSize"
      @current-change="changePageNum"
    >
    </el-pagination>
    <!-- 分页 -->
    <!-- 对话框 -->
    <el-dialog
      title="报名信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px" size="mini">
        <el-form-item label="姓名：">
          <label>{{ form.realname }}</label>
        </el-form-item>
        <el-form-item label="手机：">
          <label>{{ form.telephone }}</label>
        </el-form-item>
        <el-form-item label="城市：">
          <label>{{ form.province }}</label>
        </el-form-item>
        <el-form-item label="出生日期：">
          <label>{{ form.registerTime }}</label>
        </el-form-item>
        <el-form-item label="性别：">
          <label>{{ form.gender }}</label>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 对话框 -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      dialogVisible: false,
      form: [],
      list: {
        page: 0,
        pageSize: 6,
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  created() {
    // this.findAll()
    this.querySignUpInfo(this.list);
  },
  computed: {
    ...mapState("signupcheck", ["signupcheck", "total"]),
  },
  methods: {
    ...mapActions("signupcheck", ["findAll", "querySignUpInfo"]),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    edithandle(data) {
      this.dialogVisible = true;
      this.form = data;
      this.form.registerTime = moment(this.form.registerTime).format(
        "YYYY-MM-DD"
      );
      // moment(form.registerTime).format('YYYY-MM-DD HH:mm:ss')
    },
    //时间格式化
    formatDate(row, column) {
      var newData = row[column.property];
      return moment(newData).format("YYYY-MM-DD HH:mm:ss");
    },
    // 分页
    changePageNum(page) {
      this.list.page = page - 1;
      this.querySignUpInfo(this.list);
    },
  },
};
</script>

<style>
</style>
