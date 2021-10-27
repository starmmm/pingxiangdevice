<template>
  <div class="admin-container">
    <div slot="header" type="clearfix">
      <div class="title-text">设备的部门管理</div>
      <br /><br />
    </div>
    <el-card class="card-style">
      <div class="search-item">
        <el-row type="flex">
          <el-col span="8">
            <el-input placeholder="输入设备名" v-model="name"></el-input>
          </el-col>
          <el-col span="1"></el-col>
          <el-col span="3">
            <div class="button-style">
              <el-button size="medium" type='primary' @click="goSearch" v-loading.fullscreen.lock="fullscreenLoading"
                ><div class="button-text">查询</div></el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="chart-sheet">
        <div id="myChart" :style="{ width: '1200px', height: '480px' }"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import request from "@/apis/request";
export default {
  data() {
    return {
      columns: [],
      columnData: [],
      name: [],
      fullscreenLoading:false,
    };
  },
  mounted() {
    this.getData();
    if (this.columns && this.columnData) {
      this.drawLine();
    } else console.log("err!");
  },
  watch: {},
  methods: {
    goSearch() {
      this.fullscreenLoading=true;
      setTimeout(()=>{
        this.fullscreenLoading=false;
      },2000);
      request.post("api").then((res) => {
        console.log(res);
      });
    },
    drawLine() {
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "rgb(144, 185, 224)",
            },
          },
        },
        grid: {
          left: "5%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.columns,
            axisLabel: {
              interval: 0, //代表显示所有x轴标签显示
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#999",
            },
          },
        ],
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#999",
          },
          type: "value",
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  //渐变色实现===
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    //三种由深及浅的颜色
                    [
                      {
                        offset: 0,
                        color: "rgb(47, 84, 119)",
                      },
                      {
                        offset: 1,
                        color: "#ffffff",
                      },
                    ]
                  ),
                },
                lineStyle: {
                  //线的颜色
                  color: "rgb(79, 154, 224)",
                },
                //以及在折线图每个日期点顶端显示数字
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "rgb(59, 98, 134)",
                  },
                },
              },
            },
            areaStyle: {},
            data: this.columnData,
          },
        ],
      });
    },
    getData() {
      // request.get("/api").then((res) => {
      //   res.data.c = this.columnData;
      //   res.data.column = this.column;
      // });
      this.columnData = [134, 90, 230, 210];
      this.columns = ["周四", "周五", "周六", "周日"];
    },
  },
};
</script>
<style scoped>
.admin-container {
  padding: 32px;
}
.button-text {
  color: rgb(59, 98, 134);
  font-size: 15px;
}
.title-text {
  color: rgb(59, 98, 134);
  font-size: 18px;
  padding: 20px;
  background-color: rgba(79, 154, 224, 0.15);
}
.card-style {
  background-color: rgba(124, 181, 235, 0.1);
}
.search-item >>> .el-input__inner {
  border: none;
}
.el-button--primary{
  background-color:rgba(104, 156, 201, 0.5);
  border:none;
  height:40px;
}
</style>