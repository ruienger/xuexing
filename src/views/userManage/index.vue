<template>
  <div>
    <!-- top -->
    <el-select v-model="filter.status" @change="FIND"  placeholder="请选择状态" clearable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <!-- top -->
    <!-- 表格 -->
    <el-table :data="usermanage" stripe style="width: 100%">
      <el-table-column align="center" prop="realname" label="用户名" />
      <el-table-column align="center" label="籍贯" >
        <template slot-scope="scope">
          <span  type="text"  size="small">
            {{scope.row.province+scope.row.city}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="telephone" label="联系方式" />
      <el-table-column align="center" prop="type" label="权限" width="150"/>
      <el-table-column align="center" prop="status" label="状态 " />
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
           <el-button @click="dele(scope.row.id)" type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
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
    <!-- 模态框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="centerDialogVisible"
      width="40%"
      center>
      <el-form ref="form" :model="Msg" label-width="100px">
        <el-form-item label="用户名：">
          <el-col :span="20">
            <el-input v-model="Msg.realname"></el-input>
          </el-col>
          
        </el-form-item>
          <el-form-item label="籍贯：">
          <el-col :span="8">
            <el-input v-model="Msg.province"></el-input>
          </el-col>
          <el-col class="line" :span="2">省</el-col>
          <el-col :span="8">
            <el-input v-model="Msg.city"></el-input>
          </el-col>
          <el-col class="line" :span="2">市</el-col>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-col :span="20">
          <el-input v-model="Msg.telephone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="Msg.status" placeholder="请选择状态">
            <el-option label="审核通过" value="审核通过"></el-option>
            <el-option label="未审核" value="未审核"></el-option>
            <el-option label="审核不通过" value="审核不通过"></el-option>
            <el-option label="启用" value="启用"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 模态框 -->
  </div>
</template>

<script>
import { dateFormats } from 'highcharts';
/* eslint-disable */
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      Msg:{},
      centerDialogVisible: false,
      filter: {
        status: ""
      },
      options: [
        {
          value: "审核通过"
        },
        {
          value: "未审核"
        },
        {
          value: "审核不通过"
        },
        {
          value: "启用"
        },
        {
          value: "禁用"
        }
      ],
      list: {
        page: 0,
        pageSize: 6,
      },
      form: {},
      value: "",
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
    ...mapActions("usermanage", ["findAll", "queryProduct", "saveOrUpdate","DeleteById"]),
    // 分页
    changePageNum(page) {
      this.list.page = page - 1;
      this.queryProduct(this.list);
    },
    dele(data){
      console.log(data)
      this.DeleteById(data)
    },
    save(){
      this.centerDialogVisible = false
      this.saveOrUpdate(this.Msg)
      // console.log(this.Msg)
    },
    FIND(){
      this.form=this.list;
      if(this.filter.status!=""){
        this.form.status=this.filter.status
      }else{
        delete this.form.status
      }
      
      this.queryProduct(this.form);
      console.log(this.form)
    },
    edit(data){
      this.Msg=data
      this.centerDialogVisible = true
    },
  }
};
</script>

<style>
</style>
