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
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
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
    ...mapActions("usermanage", ["findAll", "queryProduct", "saveOrUpdate"]),
    // 分页
    changePageNum(page) {
      this.list.page = page - 1;
      this.queryProduct(this.list);
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
    }
  },
};
</script>

<style>
</style>
