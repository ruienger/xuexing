<template>
  <div>
    <div>
      <h2>{{ project.name }}</h2>
      <div id="richText"></div>
      <el-button type="primary" @click="submitHandler">主要按钮</el-button>
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