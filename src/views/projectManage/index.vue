
<template>
  <!-- v-if="checkPermission(['admin'])" -->
  <div class="projectManage">
    <!-- 过滤内容 -->
    <div class="projectManage-header">
      <el-select v-model="opts" clearable placeholder="请选择">
        <el-option
          v-for="item in status"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <!-- 新增栏目 -->
      <el-button
        type="primary"
        round
        @click="
          handleClick({
            name: '',
            description: '',
            price: '',
            status: '报名中',
            photo: {
              area: '',
              img: '',
              status: '',
            },
            categoryId: 9411,
          })
        "
        >新增项目</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      :data="projectsShown"
      stripe
      style="width: 100%"
      v-loading="loading"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <!-- <el-table-column align="center" prop="id" label="ID" width="80" /> -->
      <el-table-column align="center" prop="name" label="项目名称">
        <template slot-scope="scope">
          <el-button
            @click.prevent="showDescroption(scope.row)"
            type="text"
            size="small"
          >
            {{ scope.row.name || "暂无" }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="photo" label="地区">
        <template slot-scope="scope">
          {{
            scope.row.photo.area[0] + " " + scope.row.photo.area[1] || "暂无"
          }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="price" label="项目时间" sortable>
        <template slot-scope="scope">
          {{ formatTime(scope.row.price) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="承办单位">
        <span>学行天下游学项目管理组</span>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          {{ formatStatus(scope.row.photo.status) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >修改</el-button
          >
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="deleteHandler(scope.row.id)"
            style="margin-left: 5px"
          >
            <el-button slot="reference" type="danger" size="small"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      background
      layout="total,prev, pager, next"
      :page-size="list.pageSize"
      :total="total"
      @current-change="changePageNum"
    />
    <!-- 项目详情模态框 -->
    <el-dialog
      title="项目详情"
      :rules="rules"
      :visible.sync="detailDialogVisible"
      width="60%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名称" prop="name" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目地区" :inline="true" prop="photo" required>
          <el-cascader
            v-model="form.photo.area"
            :props="props"
            filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="活动时间" prop="price" required>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.price"
              style="width: 100%"
              value-format="timestamp"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">!</el-col>
          <el-col class="line" :span="6" style="color: #999"
            >项目时长3个月</el-col
          >
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-model="form.photo.status">
          <el-select v-model="form.photo.status" placeholder="项目状态">
            <el-option label="报名中" value="报名中"></el-option>
            <el-option label="审核中" value="审核中"></el-option>
            <el-option label="游学中" value="游学中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="http://121.199.29.84:8001/file/upload"
            :file-list="fileList"
            :limit="1"
            :headers="{
              Authorization:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJOUT09Iiwic3ViIjoiYWRtaW4xIiwiaXNzIjoiMDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjYiLCJpYXQiOjE2MDcwODE0MzgsImF1ZCI6InJlc3RhcGl1c2VyIiwiZXhwIjoxNjA3MjU0MjM4LCJuYmYiOjE2MDcwODE0Mzh9.gJG5vklxI4Ja0V_6q2sCgYBkH9qtqZaJXmhOfKZSRKs',
            }"
            :on-success="uploadSuccess"
            list-type="picture-card"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
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
          <p style="color: #aaa">! 仅允许上传一张图片</p>
        </el-form-item>
      </el-form>
      <!-- <span>{{ form }}</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 显示项目描述的抽屉 -->
    <el-drawer title="项目描述" :visible.sync="drawer">
      <div style="width: 80%; margin: 0 auto">
        <el-image :src="desc.photo.img || '404'"></el-image>
        <p v-html="desc.description"></p>
      </div>
    </el-drawer>
    <!-- 显示图片的dialog -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
import { map } from "highcharts";
import uploadImg from "@/components/uploadImg.vue";
import pageHelper from "@/utils/pageHelper";
import checkPermission from "@/utils/permission"; // 权限判断函数
import UploadImg from "../../components/uploadImg.vue";
import addTree from "@/api/addressTree";

export default {
  data() {
    return {
      waiterDialogVisible: false,
      detailDialogVisible: false,
      list: {
        page: 0,
        pageSize: 10,
      },
      dialogFormVisible: false,
      disabled: false,
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      form: {
        name: "",
        description: "",
        // price 当作时间使用
        price: "",
        status: "",
        // photo 最终承担了所有
        photo: {
          area: [],
          img: "",
          status: "",
        },
        categoryId: 9411,
      },
      // 表单验证
      rules: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          {
            min: 3,
            max: 25,
            message: "长度在 3 到 25 个字符",
            trigger: "blur",
          },
        ],
        photo: [
          {
            required: true,
            message: "请输入地址，以空格隔开",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "请填写项目起始日期", trigger: "blur" },
        ],
      },
      desc: {
        description: "",
        photo: {
          img: "",
        },
      },
      drawer: false,
      filter: {
        status: "",
      },
      status: ["报名中", "审核中", "游学中", "已完成"],
      opts: "",
      address: "",
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          let nodes = [];
          node.data
            ? (nodes = node.data)
            : (nodes = addTree.filter((e) => {
                return e.level == level;
              }));
          resolve(nodes);
        },
      },
    };
  },
  computed: {
    ...mapState("projectManage", ["projects9411", "total"]),
    loading() {
      return this.projects9411 ? false : true;
    },
    // 最后要显示的数据
    projectsShown() {
      return pageHelper(this.projects9411, this.filter, this.list).filter(
        (ele) => {
          if (this.opts) {
            return ele.photo.status == this.opts;
          }
          return ele;
        }
      );
    },
  },
  components: {
    uploadImg,
  },
  methods: {
    checkPermission,
    ...mapActions("projectManage", [
      "queryProject",
      "updateProject",
      "deleteProject",
    ]),
    // 图片上传组件事件
    handleRemove(file) {
      this.fileList = [];
    },
    handlePictureCardPreview(file) {
      file.url
        ? (this.dialogImageUrl = file.url)
        : (this.dialogImageUrl = file);
      this.dialogVisible = true;
    },
    // 上传成功时的回调
    uploadSuccess(res, f, fL) {
      this.form.photo.img = "http://121.199.29.84:8888/group1/" + res.data.id;
    },
    changePageNum(page) {
      this.list.page = page - 1;
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
      return status || "暂无";
    },
    //详情按钮点击后执行该函数，参数为当前行数据
    handleClick(row) {
      this.form = row;
      this.detailDialogVisible = true;
    },
    // 模态框确定点击
    onSubmit() {
      this.detailDialogVisible = false;
      this.form.photo = JSON.stringify(this.form.photo);
      this.updateProject({ data: this.form, id: 9411 });
    },
    // 处理删除按钮事件
    deleteHandler(id) {
      this.deleteProject({ id, cateId: 9411 });
    },
    // 显示项目描述
    showDescroption(dec) {
      this.desc = dec;
      this.drawer = true;
    },
  },
  created() {
    this.queryProject(9411);
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
.projectManage-header {
  display: flex;
  justify-content: space-between;
  padding-right: 5px;
}
</style>
