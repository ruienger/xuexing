<template>
  <div>
    <!-- {{ projects }} -->
    <div class="table-card-wrapper">
      <div class="table-card" v-for="item in projects" :key="item.id">
        <el-card shadow="hover" style="width: 100%; height: 100%">
          <el-image :src="item.photo" class="image" @click="handlePictureCardPreview(item.photo)" fit="contain">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div
            style="
              padding: 14px;
              background-color: #eee;
              margin-top: 1em;
              border-radius: 10px;
            "
          >
            <span>{{ item.name }}</span>
            <!-- 状态为 正常 则显示红色，文字为 不显示；状态为 其他 则为绿色与 显示 -->
            <span
              :style="
                'margin-left:15px;font-size:1em;color:' +
                colorFormat(item.status)
              "
              @click="statusHandler(item)"
              >{{ textFormat(item.status) }}</span
            >
            <div class="bottom">
              <time class="time">{{ timeFormat(item.price) }}</time>
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="deleteHandler(item)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </el-popconfirm>
            </div>
          </div>
        </el-card>
      </div>
      <div class="table-card">
        <el-card
          shadow="hover"
          style="
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <el-button type="text" style="font-size: 1.3em" @click="dialogFormVisible = true">添加新图片</el-button>
        </el-card>
      </div>
    </div>
    <el-dialog title="新增图片" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="图片名称" :label-width="'400'">
          <el-input v-model="form.name" autocomplete="off" required></el-input>
        </el-form-item>
        <el-form-item label="添加日期">
          <el-date-picker
            :value="new Date()"
            value-format="timestamp"
            type="date"
            disabled
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="'400'">
          <el-upload
              action="http://121.199.29.84:8001/file/upload"
              :file-list="fileList"
              :limit="1"
              :headers="{
                Authorization: 
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJOUT09Iiwic3ViIjoiYWRtaW4xIiwiaXNzIjoiMDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjYiLCJpYXQiOjE2MDcwODE0MzgsImF1ZCI6InJlc3RhcGl1c2VyIiwiZXhwIjoxNjA3MjU0MjM4LCJuYmYiOjE2MDcwODE0Mzh9.gJG5vklxI4Ja0V_6q2sCgYBkH9qtqZaJXmhOfKZSRKs'
                }"
              :on-success="uploadSuccess"
              list-type="picture-card">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              
          </el-upload>
          <p style="color:#aaa">! 仅允许上传一张图片</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateHandler"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 显示图片的dialog -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
// 该组件需要完成的功能有
//     添加图片（projects），显示图片名称（name），\顺序（上下、置顶）\，图片（photo）、删除、更新（待定）
//     以卡片的形式
export default {
  name: "tableWithImg",
  data() {
    return {
      dialogFormVisible: false,
      form: {},
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: []
    };
  },
  computed: {
  },
  props: {
    projects: Array,
    categoryId: Number
  },
  methods: {
    // 格式化数据
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD hh:mm");
    },
    colorFormat(status) {
      switch (status) {
        case "正常":
          return "#f44";
        default:
          return "#4d4";
      }
    },
    textFormat(text) {
      return text == "正常" ? "未显示" : "在显示";
    },
    // 删除按钮点击后
    deleteHandler(i) {
      this.$emit("deleteClicked", i);
    },
    // 状态点击后
    statusHandler(i) {
      this.$emit("showClicked", i);
    },
    // 模态框确定按钮点击事件
    updateHandler(){
      // 为这个项目 添加 默认的信息
      this.form.price = new Date().getTime()
      this.form.description = 'none'
      this.form.status = '正常'
      this.form.categoryId = this.categoryId
      // 由于图片服务器不可用，暂由固定url写入
      console.log(this.form);
      // this.form.photo = 'https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/apex-media-team-br-16x9.jpg.adapt.crop16x9.1455w.jpg'
      // OK
      this.$emit('updateClicked',this.form)
      this.form = {}
      this.dialogFormVisible = false
    },
    // 图片上传组件事件
    handleRemove(file) {
      this.fileList = []
    },
    handlePictureCardPreview(file) {
      file.url?this.dialogImageUrl = file.url:this.dialogImageUrl = file
      this.dialogVisible = true;
    },
    // 上传成功时的回调
    uploadSuccess(res, f, fL){
      console.log(res)
      this.form.photo = 'http://121.199.29.84:8888/group1/' + res.data.id
    }
  },
};
</script>

<style>
.table-card-wrapper {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}
.table-card {
  /* width: 15em; */
  height: 25em;
  min-width: 20em;
  margin-top: 10px;
  margin: 1em 1em;
}
.image {
  max-width: 14em;
  height: 14em;
  display: block;
  margin: 0 auto;
  background-size: contain;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image-slot{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>