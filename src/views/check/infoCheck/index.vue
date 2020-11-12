<template>
  <div class="comment">
    <el-select v-model="filter.status" placeholder="请选择状态" clearable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-table :data="finalInfoCheck" stripe style="width: 100%">
      <!-- <el-checkbox v-model="checked" prop="id" label="编号"></el-checkbox> -->
      <!-- <el-table-column align="center" prop="id" label="编号" width="80" /> -->
      <el-table-column align="center" label="姓名" >
        <template slot-scope="scope">
          {{ scope.row.customer.realname || '暂无' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式" >
        <template slot-scope="scope">
          {{ scope.row.customer.telephone || '暂无' }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="commentTime" label="留言时间" >
        <template slot-scope="scope">
          {{ formatTime(scope.row.commentTime) || '暂无' }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="content" label="留言内容">
      </el-table-column>
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
    <!-- 分页 -->
    <el-pagination
      background
      layout="total,prev, pager, next"
      :page-size="this.list.pageSize"
      :total="totalInfoCheck"
      @current-change="changePageNum"
    >
    </el-pagination>

    <!-- 对话框 -->
    <el-dialog
      title="审核咨询信息"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="form" :model="form" label-width="120px" size="mini">
        <el-form-item label="姓名：">
          <label>{{ form.customer?form.customer.realname:'暂无' }}</label>
        </el-form-item>
        <el-form-item label="手机：">
          <label>{{ form.customer?form.customer.telephone:'暂无' }}</label>
        </el-form-item>
        <el-form-item label="留言内容：">
          <label>{{ form.content }}</label>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="pass()"
          >通 过</el-button
        >
        <el-button type="danger" @click="reject()"
          >不通过</el-button
        >
      </span>
    </el-dialog>
    <!-- 对话框 -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import pageHelper from '@/utils/pageHelper'

export default {
  data() {
    return {
      dialogVisible: false,
      form: [],
      list: {
        page: 0,
        pageSize: 5,
      },
      time: "",
      options: [
        {
          value: "审核通过"
        },
        {
          value: "未审核"
        },
        {
          value: "审核不通过"
        }
      ],
      filter: {
        status: ''
      },
    };
  },
  created() {
    this.querySignUpInfo();
    this.nowtime();
  },
  computed: {
    ...mapState("signupcheck", ["infocheck", "totalInfoCheck"]),
    finalInfoCheck(){
     return this.infocheck?pageHelper(this.infocheck,this.filter,this.list):{}
    }
  },
  methods: {
    ...mapActions("signupcheck", ["querySignUpInfo",'nopassComment','passComment']),

    // 分页
    changePageNum(page) {
      this.list.page = page - 1;
      this.queryProduct(this.list);
    },
    nowtime() {
      const myDate = new Date();
      this.time = moment(myDate).format("YYYY-MM-DD");
    },
    edithandle(data) {
      this.dialogVisible = true;
      this.form = data;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 颜色格式化
    formatColor(status){
      switch(status){
        case '审核通过':
          return 'color: green'
        case '审核不通过':
          return 'color: red'
        default:
          return ''
      }
    },
    // 时间格式化
    formatTime(time){
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    },
    pass(){
      this.dialogVisible = false
      this.passComment(this.form.id)
    },
    reject(){
      this.dialogVisible = false
      this.nopassComment(this.form.id)
    }
  },
};
</script>

<style>
</style>
