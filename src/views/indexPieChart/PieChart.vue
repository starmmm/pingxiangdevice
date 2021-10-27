<template>
  <div class="background">
    <div class="container">
      <div id="pieDepartment"></div>
      <div id="pieRank"></div>
    </div>
  </div>
</template>

<script>
import { getToken } from "../../utils/storage";
import request from "../../apis/request";

var echarts = require("echarts");

export default {
  name: "pieChart",
  data: function () {
    return {
      departmentID: "pieDepartment",
      rankID: "pieRank",
      departmentURL: "department/member/count",
      rankURL: "approve/rank/member/count",
    };
  },
  methods: {
    draw(ID, URL) {
      const usertoken = getToken();
      request
        .get(URL, {
          params: usertoken,
        })
        .then((res) => {
          console.log(res);
          var info = this.changeFormat(res.data);
          var departments = [];
          var departmentsPersonNum = [];
          var personSum = 0;
          for (var i of info.keys()) {
            let reg = new RegExp("/");
            if (reg.test(info[i].name)) {
              info[i].name = info[i].name.split("/")[0]; //info是drawChart的参数->这里也要修改info
              departments[i] = info[i].name;
            } else {
              departments[i] = info[i].name;
            }
            departmentsPersonNum[i] = info[i].value;
            personSum += info[i].value;
          }
          this.drawChart(
            ID,
            info,
            departments,
            departmentsPersonNum,
            personSum
          );
        })
        .catch((error) => console.log(error));
    },
    changeFormat(res) {
      var departmentIfo = [];
      for (var i of res.keys()) {
        if (res[i].count > 0) {
          if (res[i].department) {
            departmentIfo.push({
              value: res[i].count,
              name: res[i].department,
              url: "department",
            });
          } // 记得修改url}
          // departmentIfo[i]={value:res[i].count,name:res[i].department,url: i}//记得改回上一行
          else if (res[i].rank) {
            departmentIfo.push({
              value: res[i].count,
              name: res[i].rank,
              url: "rank",
            });
          }
        }
      }
      return departmentIfo;
    },
    drawChart(ID, info, departments, departmentPersonNum, personSum) {
      var headline = ID === "pieDepartment" ? "部门总人数" : "职级总人数";
      var pie = echarts.init(document.getElementById(ID));
      var options = {
        animation: false,
        title: {
          text: headline,
          left: "center",
          top: "35%",
        },
        legend: {
          data: departments, ////////////////////////////////////////////////////////////////////
          orient: "horizontal",
          bottom: "8%",
          width: "80%",
          backgroundColor: "rgba(0,0,0,0.1)",
        },
        tooltip: {
          formatter:
            "<b>{b0}</b>:<br/>在职人数为<b>{c0}</b>,占比为<b>{d0}%</b>",
        },
        name: "各部门人数占比信息",
        backgroundColor: "rgba(256,256,256,0)",
        textStyle: { color: "#312B13" },
        labelLine: { lineStyle: { color: "#312B13" } },
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "42%",
              id: "text1",
              z: 100,
              style: {
                text: personSum,
                textAlign: "center",
                fontSize: 35,
                fontWeight: 200,
                fill: "#4A75C4",
              },
            },
          ],
        },
        series: [
          {
            roseType: "area",
            name: "各部门人数占比信息",
            radius: ["35%", "65%"],
            center: ["50%", "40%"],
            type: "pie",
            itemStyle: {
              //   color: "#4A75C4",
              //color:"#00152a",
              emphasis: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: info,
            //data:[{value:100,name:"test1"},{value:200,name:"test2"}]
          },
        ],
        /*visualMap: {
          show: false,
          min: Math.min(...departmentPersonNum), ////////////////////////////////////////////////////////////
          max: Math.max(...departmentPersonNum), ///////////////////////////////////////////////////////////
          inRange: {
            colorLightness: [0.2, 0.9],
          },
        },*/
      };
      pie.setOption(options);
      const pathToDepartOrRank =
        ID === "pieDepartment" ? "/1/position/" : "/2/rank/";
      pie.on("click", (param) => {
        this.$router.push({
          path: pathToDepartOrRank,
          query: { ID: param.data.name, type: param.data.url },
        });
      });
    },
  },
  mounted() {
    this.draw(this.departmentID, this.departmentURL);
    this.draw(this.rankID, this.rankURL);
  },
};
</script>

<style scoped>
.background {
  background-color: rgba(33, 33, 33, 0);
  height: 63vh;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
}
#pieDepartment {
  height: 100%;
  width: 45%;
  background-color: rgba(247, 251, 255, 0);
  border-radius: 12px;
  margin-left: 3%;
  margin-right: 2%;
  margin-top: 0;
}
#pieRank {
  height: 100%;
  width: 45%;
  background-color: rgba(247, 251, 255, 0);
  border-radius: 12px;
  margin-left: 2%;
  margin-right: 3%;
  margin-top: 0;
}
</style>
