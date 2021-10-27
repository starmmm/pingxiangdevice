/*
 * @author Biosheep
 *
 * @brief 基本信息模块 API
 */

import request from "../request";
export async function getTable(obj) {
  return request
    .get("/basicInfo/getNoneNumber", {
      params: obj,
    })
    .then(function(res) {})
    .catch(function(err) {
      console.log(err);
    });
}
export async function getantiTable(obj) {
  // return request.get("/datacheck/getantiTable", obj)
  //     .then(function(res) {
  //         console.log('提交成功！');
  //     }).catch(function(err) {
  //         console.log(err);
  //     });
  return console.log(obj);
}
