
<template>
  <div class="projectManage">
    <el-tabs v-model="activeName" @tab-click="tabSwitch">
      <el-tab-pane label="所有项目" name="all"></el-tab-pane>
      <!-- 报名中 --- 待支付 已结束 --- 已完成 进行中 --- 待派单 准备中 --- 待接单 -->
      <el-tab-pane label="报名中" name="待支付"></el-tab-pane>
      <el-tab-pane label="已结束" name="已完成"></el-tab-pane>
      <el-tab-pane label="进行中" name="待派单"></el-tab-pane>
      <el-tab-pane label="准备中" name="待接单"></el-tab-pane>
    </el-tabs>
    <el-table
      :data="detailProjects"
      stripe
      style="width: 100%"
      v-loading="loading"
    >
      <!-- <el-table-column align="center" prop="id" label="ID" width="80" /> -->
      <el-table-column align="center" prop="orderLines" label="项目名称">
        <template slot-scope="scope">
          {{ scope.row.orderLines[0].product.name || "暂无" }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="地区"
      >
        <template slot-scope="scope">
          {{
            scope.row.address
              ? scope.row.address.province + " " + scope.row.address.city
              : "暂无"
          }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="orderTime" label="项目时间">
        <template slot-scope="scope">
          {{ formatTime(scope.row.orderTime) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="description" label="承办老师">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row, 'waiter')"
            type="text"
            size="small"
            :disabled="!scope.row.waiter"
          >
            {{ scope.row.waiter ? scope.row.waiter.realname : "暂无" }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          {{ formatStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="photo" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row, 'form')"
            type="primary"
            size="small"
            >修改</el-button
          >
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total,prev, pager, next"
      :page-size="list.pageSize"
      :total="total"
      @current-change="changePageNum"
    />
    <!-- 用户详情模态框 -->
    <el-dialog title="用户详情" :visible.sync="waiterDialogVisible" width="60%">
      <span>{{ form }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="waiterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 项目详情模态框 -->
    <el-dialog title="项目详情" :visible.sync="detailDialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="form.orderLines[0].product.name"></el-input>
        </el-form-item>
        <el-form-item label="项目地区" inline>
          <el-input v-model="form.address.province"></el-input>
          <el-input v-model="form.address.city"></el-input>
          <el-input v-model="form.address.area"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input
            type="textarea"
            v-model="form.orderLines[0].product.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <span>{{ form }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      waiterDialogVisible: false,
      detailDialogVisible: false,
      list: {
        page: 0,
        pageSize: 10,
      },
      form: {
        address: {
          province: "",
          city: "",
          area: "",
        },
        orderLines: [
          {
            product: {},
          },
        ],
      },
      activeName: "all",
    };
  },
  computed: {
    ...mapState("projectManage", ["projects", "total", "detailProjects"]),
    loading() {
      return this.detailProjects ? false : true;
    },
  },
  methods: {
    ...mapActions("projectManage", ["queryProject"]),
    changePageNum(page) {
      this.list.page = page - 1;
      this.queryProject(this.list);
    },
    edithandle(data) {
      this.dialogVisible = true;
      this.form = data;
    },
    //格式化要显示的内容内容
    formatTime(time) {
      return (
        moment(time).format("YYYY-MM-DD") +
        " ~ " +
        moment(time + 1000 * 60 * 60 * 24 * 30).format("YYYY-MM-DD")
      );
    },
    formatStatus(status) {
      switch (status) {
        case "待支付":
          return "报名中";
        case "待接单":
          return "准备中";
        case "待派单":
          return "进行中";
        case "已完成":
          return "已完成";
        default:
          return status;
      }
    },
    //详情按钮点击后执行该函数，参数为当前行数据
    handleClick(row, type) {
      type == "waiter"
        ? (this.waiterDialogVisible = true)
        : (this.detailDialogVisible = true);
      this.form = row;
    },
    //处理tab切换的逻辑 activeName是当前筛选的状态
    tabSwitch() {
      if (this.activeName != "all") this.list.status = this.activeName;
      this.queryProject(this.list);
      this.list = {
        page: 0,
        pageSize: 10,
      };
    },
    onSubmit() {
      this.waiterDialogVisible = false;
      this.detailDialogVisible = false;
      // this.updateProduct(this.form)
    },
  },
  created() {
    this.queryProject(this.list);
  },
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
