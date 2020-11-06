<template>
  <div>
    <!-- {{ projects }} -->
    <div class="table-card-wrapper">
        <div class="table-card" v-for="item in projects" :key="item.id">
          <el-card shadow="hover" style="width: 100%; height: 100%">
            <img :src="item.photo" class="image" />
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
      </div>
  </div>
</template>

<script>
import moment from "moment";
// 该组件需要完成的功能有
//     添加图片（projects），显示图片名称（name），顺序（上下、置顶），图片（photo）、删除、更新（待定）
//     以卡片的形式
export default {
  name: "tableWithImg",
  data() {
    return {};
  },
  computed: {
    colArr() {
      let columnArr = [];
      let rowArr = [];
      this.projects.forEach((ele, index) => {
        if (index % 4) {
          rowArr.push(ele);
        } else {
          rowArr.push(ele);
          columnArr.unshift(rowArr);
          rowArr = [];
        }
      });
      return columnArr;
    },
  },
  props: {
    projects: Array,
  },
  methods: {
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
    deleteHandler(i){
        this.$emit('deleteClicked',i)
    },
    // 状态点击后
    statusHandler(i){
        this.$emit('showClicked',i)
    }
  },
};
</script>

<style>
.table-card-wrapper {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}
.table-card {
  /* width: 15em; */
  height: 25em;
  min-width: 20em;
  margin-top: 10px;
  margin: 0 1em;
}
.image {
  display: block;
  margin: 0 auto;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>