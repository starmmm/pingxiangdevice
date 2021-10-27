<template>
  <div class="bg">
    <div class="interval"></div>
    <div class="buttons">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        plain
        @click="click(1)"
      >基本信息</el-button>
      <el-button
        type="primary"
        icon="el-icon-rank"
        plain
        @click="click(2)"
      >部门调整</el-button>
      <el-button
        type="primary"
        icon="el-icon-rank"
        plain
        @click="click(3)"
      >职级调整</el-button>
      <el-button
        type="primary"
        icon="el-icon-user-solid"
        plain
        @click="click(4)"
      >警察证管理</el-button>
    </div>
    <div class="pies">
      <PieChart />
    </div>
  </div>
</template>

<script>
import PieChart from "./PieChart";
export default {
  name: "IndexWithPie",
  components: { PieChart },
  methods: {
    click(button) {
      if (button === 1) {
        this.$router.push({ path: "/basicInfo/staff" });
      } else if (button === 2) {
        this.$router.push({ path: "/1/position" });
      } else if (button === 3) {
        this.$router.push({ path: "/2/rank" });
      } else if (button === 4) {
        this.$router.push({ path: "/3/document" });
      }
    },
  },
};
</script>

<style scoped>
.bg {
  height: 100vh;
  background-image: url("../../assets/bg4.jpeg");
  background-size: cover;
}
.interval {
  height: 10px;
}
.buttons {
  height: 15%;
  width: 80%;
  margin-left: 10%;
  background-color: rgba(256, 256, 256, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /**background-image: linear-gradient(to right, #00152a 0%, #00152a 50%, transparent 20%);
        background-size: 2px 1px;
        background-repeat: repeat-x;
        background-position: 0 20px;*/
}
.pies {
  width: 80%;
  margin-left: 10%;
  margin-top: 5%;
  /*display: flex;
        justify-content: space-between*/
  background-color: rgba(256, 256, 256, 0.4);
  border-radius: 10px;
}
.el-button--primary.is-plain {
  width: 20%;
  height: 70%;
  background-color: rgb(50, 69, 99);
  color: rgb(256, 256, 256);
  font-size: 25px;
  padding: 0;
  /*padding: 12px 13px;*/
}
.el-button--primary.is-plain:hover {
  background-color: rgb(0, 21, 42);
  border-color: rgb(0, 21, 42);
  color: rgb(217, 226, 242);
}
</style>
