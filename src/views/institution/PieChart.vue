<template>
  <div class="container">
    <div id="pie"></div>
  </div>
</template>

<script>
var echarts = require("echarts");

import { getToken } from "@/utils/storage";
import request from "@/apis/request";

export default {
  name: "PieChart",
  data() {
    return {
      departmentPersonNum: this.getDefaultDepartmentInfo()[0],
      departmentInfo: this.getDefaultDepartmentInfo()[1],
      departments: this.getDefaultDepartmentInfo()[2],
      total: Math.ceil(
        this.getDefaultDepartmentInfo()[0].reduce((add1, add2) => add1 + add2)
      ),
    }; // departmentInfo实际应从后端处返回
  },
  mounted() {
    this.drawChart();
    // this.getdata();
  },
  methods: {
    getDefaultDepartmentInfo() {
      var personNum = Array();
      var department = [
        "纪检、监察、督察、审计",
        "办公室",
        "政工",
        "国内安全保护",
        "经济犯罪侦察",
        "治安",
        "刑侦",
        "出入境管理",
        "网络安全保卫",
        "技术侦察",
        "监所管理",
        "交通",
        "法治",
        "国际合作（外事）",
        "后勤装备",
        "禁毒",
        "科技信息",
        "反邪教",
        "反恐怖",
        "离退休管理",
        "机关党政",
        "公安院校",
        "科研基地",
        "科研",
        "公安医院",
        "机关附属单位",
      ];
      var info = [];
      // eslint-disable-next-line no-unused-vars
      for (var i of department.keys()) {
        personNum.push(Math.ceil(Math.random() * 100));
      }
      for (var j of department.keys()) {
        info.push({
          value: personNum[j],
          name: department[j],
          url: j.toString(),
        });
      }
      return [personNum, info, department];
    },
    async getdata() {
      const usertoken = getToken();
      console.log(usertoken);
      return request.get("/department/member/count",{
        params: usertoken,
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    },
    drawChart() {
      var pie = echarts.init(document.getElementById("pie"));
      var options = {
        title: {
          text: "所有部门在职总人数",
          left: "center",
          top: "45%",
        },
        legend: {
          data: this.departments,
          orient: "vertical",
          x: "left",
          left: "10px",
          backgroundColor: "rgba(0,0,0,0.1)",
        },
        tooltip: {
          formatter:
            "<b>{b0}部门</b>:<br/>在职人数为<b>{c0}</b>,占比为<b>{d0}%</b>",
        },
        name: "各部门人数占比信息",
        backgroundColor: "white",
        textStyle: { color: "#312B13" },
        labelLine: { lineStyle: { color: "#312B13" } },
        graphic: [
          {
            type: "text",
            right: "center",
            top: "52%",
            id: "text1",
            z: 100,
            style: {
              text: this.total,
              textAlign: "center",
              fontSize: 35,
              fontWeight: 200,
              fill: "#4FC3F7",
            },
          },
        ],
        series: [
          {
            name: "各部门人数占比信息",
            radius: ["50%", "80%"],
            type: "pie",
            roseType: "radius",
            itemStyle: {
              color: "#E1F5FE",
              emphasis: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: this.departmentInfo,
            // data:[{value:100,name:"test1"},{value:200,name:"test2"}]
          },
        ],
        visualMap: {
          show: false,
          min: Math.min(...this.departmentPersonNum),
          max: Math.max(...this.departmentPersonNum),
          inRange: {
            colorLightness: [0.2, 0.9],
          },
        },
      };
      pie.setOption(options);
      pie.on("click", (param) => {
        console.log(param);
        this.$router.push({
          path: "/department/" + param.data.url,
          query: { ID: param.data.url },
        });
      });
    }, // 跳转函数只能在这里写，不可引用methods
  },
};
</script>

<style scoped>

.container {
  width: 100%;
  height: 400px;
  display: relative;
  background-color:rgb(255, 255, 255);
}
#pie {
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  margin-right: 0;
  margin-top: 0;
}
</style>
