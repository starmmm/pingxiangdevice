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
              <el-button
                size="medium"
                type="primary"
                @click="goSearch"
                v-loading.fullscreen.lock="fullscreenLoading"
              >
                <div class="button-text">查询</div>
              </el-button>
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
import { getToken } from "@/utils/storage";
export default {
  data() {
    return {
      name: [],
      value: [],
      info: [],
      dapartmenid: [],
      fullscreenLoading: false,
    };
  },
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    goSearch() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
      request.post("api").then((res) => {
        console.log(res);
      });
    },
    drawLine(info) {
      const myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          // orient: "horizontal",
          orient: "vertical",
          left: "left",
          show: false,
        },
        series: [
          {
            name: "设备数",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "outside",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },

            data: info,
          },
        ],
      });
    },
    getData() {
      // request.get("/api").then((res) => {
      //   res.data.c = this.columnData;
      //   res.data.column = this.column;
      // });

      const formdata = new FormData();
      formdata.append("equipmentIdNumber", "M403324");
      formdata.append("policeNumber", "F09003");

      request
        .post("/equipment/recycle", formdata, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        });

      const usertoken = getToken();
      var info1 = [];
      request
        .get("department/member/count", {
          params: usertoken,
        })
        .then((res) => {
          console.log(res);
          var datainfo = res.data;
          var testdata = [
            { value: 1048, name: "对讲机" },
            { value: 735, name: "qwe" },
            { value: 580, name: "辅警通" },
            { value: 484, name: "Union Ads" },
            { value: 300.4, name: "Video Adsqqqqqqqqqqqqqqqqqqqqqqqqq" },
          ];
          for (var i of datainfo.keys()) {
            if (datainfo[i].count > 0) {
              if (datainfo[i].department) {
                var obj = {};
                obj.name = datainfo[i].department;
                obj.value = datainfo[i].count;
                info1[i] = obj;
              }
            }
          }
          console.log(info1);
          const infoin = JSON.parse(JSON.stringify(info1));
          // const infoin = JSON.parse(JSON.stringify(this.info));
          if (this.value && this.name) {
            console.log(infoin);
            this.drawLine(infoin);
          } else console.log("err!");
        });

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
.el-button--primary {
  background-color: rgba(104, 156, 201, 0.5);
  border: none;
  height: 40px;
}
</style>
