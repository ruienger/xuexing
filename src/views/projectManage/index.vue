
<template>
  <div class="projectManage">
    <el-table :data="projects" stripe style="width: 100%">
      <el-table-column align="center" prop="id" label="ID" width="80"/>
      <el-table-column align="center" prop="name" label="项目名称" width="80"/>
      <el-table-column align="center" prop="price" label="项目价格"/>
      <el-table-column align="center" prop="description" label="项目描述"/>
      <el-table-column align="center" prop="photo" label="图片"/>
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
    this.queryProject(this.list)
  },
  computed: {
    ...mapState('projectManage', ['projects','total'])
  },
  methods: {
    ...mapActions('projectManage', ['queryProject' ]),
    changePageNum(page) {
      this.list.page = page - 1
      this.queryProject(this.list)
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
