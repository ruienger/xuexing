<template>
  <div>
    <!-- top -->
    <el-select v-model="value" size="mini" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <input autosize type="text" placeholder="输入搜索内容">

    <!-- top -->
    <!-- 表格 -->
    <el-table :data="usermanage" stripe style="width: 100%">
      <el-table-column align="center" prop="name" label="用户名" />
      <el-table-column align="center" prop="price" label="联系方式" />
      <el-table-column align="center" label="角色" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="hand(scope.row)">{{
            scope.row.price
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态 " />
    </el-table>
    <!-- 表格 -->
    <!-- 分页 -->
    <el-pagination
      small
      layout="prev, pager, next,total"
      :total="total"
      :page-size="list.pageSize"
      @current-change="changePageNum"
    />
    <!-- 分页 -->
    <!-- 对话框 -->
    <el-dialog
      title="修改角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="角色：">
          <el-radio-group v-model="form.price">
            <el-radio label="20" />
            <el-radio label="30" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 对话框 -->
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      list: {
        page: 0,
        pageSize: 6,
      },
      form: {},
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
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState("usermanage", ["usermanage", "total"]),
  },
  created() {
    // this.findAll()
    this.queryProduct(this.list);
  },
  methods: {
    ...mapActions("usermanage", ["findAll", "queryProduct", "saveOrUpdate"]),
    // 分页
    changePageNum(page) {
      this.list.page = page - 1;
      this.queryProduct(this.list);
    },
    hand(data) {
      this.form = data;
      this.dialogVisible = true;
    },
    save() {
      this.dialogVisible = false;
      this.saveOrUpdate(this.form);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
</style>
