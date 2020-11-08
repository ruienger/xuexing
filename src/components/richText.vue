<template>
  <div>
    <div>
      <h3>编辑标题</h3>
      <el-input :placeholder="project.name" v-model="project.name" style="font-size:1.2em;font-weight:700"></el-input>
      <h3>编辑内容</h3>
      <div id="richText"></div>
      <el-button type="primary" @click="submitHandler" style="margin-top:1em">提交更改</el-button>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "richText",
  data() {
    return {
      editor: {},
    };
  },
  props: {
    projects: Array,
  },
  computed: {
    project() {
      if (this.projects[0]) {
        return this.projects[0];
      }
      return {
        name: "loading",
        description: "loading",
      };
    },
  },
  watch: {
    project: function () {
      this.editor.txt.html(this.project.description);
    },
  },
  methods: {
    submitHandler() {
      this.project.description = this.editor.txt.html();
      this.$emit("submitClicked", this.project);
    },
  },
  mounted() {
    this.editor = new E("#richText");
    this.editor.create();
    this.editor.txt.html(this.project.description);
  },
};
</script>

<style>
</style>