<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="moduleSwitch">
      <!-- name属性对应着 栏目ID，通过它查找 内容 -->
      <el-tab-pane label="轮播图" name="9441">
        <!-- 轮播图与精彩瞬间、学生风采同属一个组件 -->
        <tableWithImg
          :projects="projects9441"
          :categoryId="9441"
          @showClicked="shownHandler($event)"
          @deleteClicked="deleteHandler($event)"
          @updateClicked="updateHandler($event)"
        ></tableWithImg>
      </el-tab-pane>
      <el-tab-pane label="游学项目" name="9411">
        <simpleTable
          :projects="projects9411"
          :categoryId="9411"
          :labelArr="[
            { label: '项目名称', prop: 'name' },
            { label: '项目状态', isDeep: true },
            { label: '显示状态', prop: 'status' },
          ]"
          :isFixedLabel="true"
          :status="['报名中', '审核中', '游学中', '已完成']"
          @updateClicked="updateHandler($event)"
        ></simpleTable>
      </el-tab-pane>
      <el-tab-pane label="精彩瞬间" name="9432">
        <tableWithImg
          :projects="projects9432"
          :categoryId="9432"
          @showClicked="shownHandler($event)"
          @deleteClicked="deleteHandler($event)"
          @updateClicked="updateHandler($event)"
        ></tableWithImg>
      </el-tab-pane>
      <el-tab-pane label="常见问题" name="9440">
        <!-- 常见问题与游学项目同属一个组件 -->
        <simpleTable
          :projects="projects9440"
          :categoryId="9440"
          :labelArr="[
            { label: '问题标题', prop: 'name' },
            { label: '回答内容', prop: 'description' },
            { label: '状态', prop: 'status' },
          ]"
          :status="['正常', '禁用']"
          :isFixedLabel="false"
          @updateClicked="updateHandler($event)"
        ></simpleTable>
      </el-tab-pane>
      <el-tab-pane label="学生风采" name="9414">
        <tableWithImg
          :projects="projects9414"
          :categoryId="9414"
          @showClicked="shownHandler($event)"
          @deleteClicked="deleteHandler($event)"
          @updateClicked="updateHandler($event)"
        ></tableWithImg>
      </el-tab-pane>
      <el-tab-pane label="关于我们" name="9425">
        <richText
          :projects="projects9425"
          @submitClicked="submitHandler($event)"
        ></richText>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import richText from "@/components/richText.vue";
import tableWithImg from "@/components/tableWithImg.vue";
import simpleTable from "@/components/simpleTable.vue";
import pageHelper from "@/utils/pageHelper";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      activeName: "9441",
    };
  },
  computed: {
    ...mapState("projectManage", [
      "projects9441",
      "projects9411",
      "projects9432",
      "projects9440",
      "projects9414",
      "projects9425",
    ]),
  },
  methods: {
    ...mapActions("projectManage", [
      "queryProject",
      "updateProject",
      "deleteProject",
    ]),
    // 处理上方模块栏变更
    moduleSwitch() {
      this.queryProject(this.activeName);
    },
    // 处理 带图片组件 的状态点击事件
    shownHandler(e) {
      // e 为子组件传出的 item,只需要更新这个 item 即可
      e.status == "正常" ? (e.status = "已完成") : (e.status = "正常");
      // 状态为已完成的项目 最多为 5 个
      if (e.categoryId == "9414") {
        // 学生风采
        let status9414 = this.projects9414.filter((i) => {
          return i.status == "已完成";
        });
        // 学生风采超过 5 个
        if (status9414.length < 6) {
          this.updateProject({ data: e, id: 9414 });
        } else {
          this.$message({
            showClose: true,
            message: "学生风采不能展示超过五名学生",
            type: "error",
          });
        }
      } else if (e.categoryId == "9441") {
        // 轮播图
        let status9441 = this.projects9441.filter((i) => {
          return i.status == "已完成";
        });
        // 轮播图超过 4 个
        if (status9441.length < 5) {
          this.updateProject({ data: e, id: 9441 });
        } else {
          this.$message({
            showClose: true,
            message: "轮播图不能展示超过四张图片",
            type: "error",
          });
        }
      } else {
        this.updateProject({ data: e, id: e.categoryId });
      }
    },
    // 删除按钮事件
    deleteHandler(e) {
      this.deleteProject({ id: e.id, cateId: e.categoryId });
    },
    // 新增按钮事件
    updateHandler(e) {
      console.log(e);
      // 此处需要把 photo JSON序列化
      e.photo = JSON.stringify(e.photo)
      this.updateProject({ data: e, id: e.categoryId });
    },
    // 富文本编辑器提交按钮事件
    submitHandler(e) {
      console.log(e);
      this.updateProject({ data: e, id: e.categoryId });
    },
  },
  components: {
    richText,
    tableWithImg,
    simpleTable,
  },
  created() {
    this.queryProject(this.activeName);
  },
};
</script>

<style>
</style>
