<template>
  <div class="authmanage">
    
    <div>状态</div>
    <el-table :data="comments" stripe style="width: 100%">
      <!-- <el-checkbox v-model="checked" prop="id" label="编号"></el-checkbox> -->
      <el-table-column align="center" prop="name" label="权限名称" width="80"/>
      <el-table-column align="center" prop="price" label="权限级别"/>
      <el-table-column align="center" prop="description" label="权限描述"/>
      <el-table-column align="center" prop="status" label="状态"/>

      
    </el-table>

    <el-pagination background layout="total,prev, pager, next" :page-size="this.list.pageSize" :total="total" @current-change="changePageNum"> </el-pagination>

    
  </div>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return {
      dialogVisible: false,
      list: {
        page: 0,
        pageSize: 5
      },
    }
  },
  created(){
    this.queryComment(this.list)
  },
  computed: {
    ...mapState('authmanage', ['comments','total'])
  },
  methods: {
    ...mapActions('authmanage', [ 'findComment','queryComment' ]),
    changePageNum(page) {
      this.list.page = page - 1
      this.queryComment(this.list)
    },
    edithandle(data){
      this.dialogVisible=true;
      this.form=data;
    },
    
  }
}
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
