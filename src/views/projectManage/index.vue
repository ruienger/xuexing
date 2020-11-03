
<template>
  <div class="projectManage">
    <!-- 新增栏目 -->
    <el-button type="primary" round @click="handleClick({
        name: '',
        description: '',
        price: '',
        status: '报名中',
        photo: '',
        categoryId: 9411
      })">新增项目</el-button>
    <!-- 表格 -->
    <el-table
      :data="pagedProjects"
      stripe
      style="width: 100%"
      v-loading="loading"
    >
      <!-- <el-table-column align="center" prop="id" label="ID" width="80" /> -->
      <el-table-column align="center" prop="name" label="项目名称" />
      <el-table-column
        align="center"
        prop="photo"
        label="地区"
      >
        <template slot-scope="scope">
          {{
            scope.row.photo || '暂无'
          }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="price" label="项目时间">
        <template slot-scope="scope">
          {{ formatTime(scope.row.price) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="承办单位">
            学行天下游学项目管理组
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          {{ formatStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="primary"
            size="small"
            >修改</el-button
          >
          <el-button type="danger" size="small" @click="deleteHandler(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    {{ total }}
    <el-pagination
      background
      layout="total,prev, pager, next"
      :page-size="list.pageSize"
      :total="total"
      @current-change="changePageNum"
    />
    <!-- 项目详情模态框 -->
    <el-dialog title="项目详情" :visible.sync="detailDialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目地区" :inline="true">
          <el-col :span="11">
            <el-input v-model="form.photo" placeholder="输入地区"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.price"
              style="width: 100%"
              value-format="timestamp"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center">!</el-col>
          <el-col class="line" :span="6" style="color:#999">项目时长3个月</el-col>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input
            type="textarea"
            v-model="form.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" v-model="form.status">
          <el-input v-model="form.status" />
        </el-form-item>
      </el-form>
      <!-- <span>{{ form }}</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
      {{ form }}
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import { map } from "highcharts";

export default {
  data() {
    return {
      waiterDialogVisible: false,
      detailDialogVisible: false,
      list: {
        page: 0,
        pageSize: 10
      },
      form: {
        name: '',
        description: '',
        // price 当作时间使用
        price: '',
        status: '',
        // photo 当作地区使用
        photo: '',
        categoryId: 9411
      }
    };
  },
  computed: {
    ...mapState("projectManage", ["projects", "total", "pagedProjects"]),
    loading() {
      return this.pagedProjects ? false : true;
    }
  },
  methods: {
    ...mapActions("projectManage", ["queryProject", "updateProject", "deleteProject"]),
    changePageNum(page) {
    this.list.page = page - 1;
    this.queryProject( this.list );
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
        moment(time + 3000 * 60 * 60 * 24 * 30).format("YYYY-MM-DD")
      );
    },
    formatStatus(status) {
      return status || '暂无'
    },
    //详情按钮点击后执行该函数，参数为当前行数据
    handleClick( row ) {
      this.form = row;
      this.detailDialogVisible = true
    },
    // 模态框确定点击
    onSubmit() {
      this.detailDialogVisible = false;
      this.updateProject({ data: this.form, list: this.list})
    },
    // 处理删除按钮事件
    deleteHandler(id){
      this.deleteProject( { id, list: this.list} )
    }
  },
  created() {
    this.queryProject( this.list );
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
