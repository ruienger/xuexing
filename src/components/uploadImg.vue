<template>
  <div>
      <!-- :http-request="uploadImg" -->
    <el-form-item label="上传图片" >
      <el-upload
        action="#"
        :file-list="fileList"
        :limit="1"
        :on-change="uploadImg(file, fileList)"
        
        list-type="picture-card"
      >
        <i slot="default" class="el-icon-plus"></i>
        <template slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
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
        </template>
      </el-upload>
      <p style="color: #aaa">! 仅允许上传一张图片</p>
    </el-form-item>
    <!-- 图片上传的 模态框 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "upload-img",
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: []
    };
  },
  methods: {
    // 图片上传组件事件
    handleRemove(file) {
        this.fileList.pop()
    },
    handlePictureCardPreview(file) {
      file.url
        ? (this.dialogImageUrl = file.url)
        : (this.dialogImageUrl = file);
      this.dialogVisible = true;
    },
    // 图片转base64存数据库
    uploadImg(f,fList) {
      console.log(this.fileList);
      console.log(f);
      console.log(fList);
    //   let fReader = new FileReader()
    //   fReader.readAsDataURL(f.url?f.url:f)
    //   fReader.onload = function(e){
    //       console.log(e)
    //   }
    },
  },
};
</script>

<style>
</style>