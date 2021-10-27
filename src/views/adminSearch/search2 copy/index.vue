<template>
  <div class="admin-container">
    <div slot="header" type="clearfix">
      <div class="title-text">部门的设备管理</div>
      <br /><br />
    </div>
    <div id="chart_example"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "search2",
  data() {
    return {
      columns: [],
      columnData: [],
    };
  },
  mounted() {
    this.getData();
    if (this.columns && this.columnData) {
      let myChart = echarts.init(document.getElementById("chart_example"));
      let option = {
        color: ["rgba(106, 177, 224, 0.719)"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: [
          {
            type: "category",
            data: this.columns,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "每月花费",
            type: "bar",
            barWidth: "80%",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(79, 154, 224, 0.15)" },
                { offset: 0.5, color: "rgba(72, 150, 223, 0.438)" },
                { offset: 1, color: "rgba(72, 150, 223, 0.616)" },
              ]),
            },
            data: this.columnData,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    } else console.log("err");
  },
  methods: {
    getData(){
       // request.get("/api").then((res) => {
      //   res.data.c = this.columnData;
      //   res.data.column = this.column;
      // });
      this.columnData = [134, 90, 230, 210];
      this.columns = ["周四", "周五", "周六", "周日"];
    }
  },
};
</script>
<style scoped>
.title-text {
  color: rgb(59, 98, 134);
  font-size: 18px;
  padding: 20px;
  background-color: rgba(72, 150, 223, 0.281);
}
#chart_example {
  height: 500px;
  width: 1200px;
  margin: 0 auto;
}
.admin-container {
  padding: 32px;
  background-color: rgba(131, 168, 238, 0.123);
}
</style>