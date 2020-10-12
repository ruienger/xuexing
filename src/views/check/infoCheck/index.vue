<template>
  <div class="comment">
    <div>
      <i class="el-icon-time"></i>
      {{time}}
    </div>
    <el-table :data="comments" stripe style="width: 100%">
      <!-- <el-checkbox v-model="checked" prop="id" label="编号"></el-checkbox> -->
      <el-table-column align="center" prop="id" label="编号" width="80"/>
      <el-table-column align="center" prop="content" label="姓名"/>
      <el-table-column align="center" prop="commentTime" label="联系方式"/>
      <el-table-column align="center"  label="留言内容">
        <template  slot-scope="scope">
          <el-button type="text" size="small" @click="edithandle(scope.row)">{{scope.row.orderId}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态"/>
      
    </el-table>
    <!-- 分页 -->
    <el-pagination background layout="total,prev, pager, next" :page-size="this.list.pageSize" :total="total" @current-change="changePageNum"> </el-pagination>

    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px" size="mini">
        <el-form-item label="评论内容：">
          <label>{{form.content}}</label>
        </el-form-item>
        <el-form-item label="评论时间：">
          <label>{{form.commentTime}}</label>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      dialogVisible: false,
      form:[],
      list: {
        page: 0,
        pageSize: 5
      },
      time:''
    }
  },
  created() {
    this.queryProduct(this.list)
    this.nowtime()
  },
  computed: {
    ...mapState('infocheck', ['comments', 'total'])
  },
  methods: {
    ...mapActions('infocheck', [ 'queryProduct', ]),
    
    // 分页
    changePageNum(page) {
      this.list.page = page - 1
      this.queryProduct(this.list)
    },
    nowtime(){
      const myDate = new Date();
      this.time = moment(myDate).format('YYYY-MM-DD')
    },
    edithandle(data){
      this.dialogVisible=true;
      this.form=data;
      this.form.commentTime=moment(this.form.commentTime).format('YYYY-MM-DD')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
        })
      .catch(_ => {});
    },
    
  }
}
</script>

<style>

</style>
