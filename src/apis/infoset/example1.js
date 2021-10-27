/**
 * @author Guo YiXing
 * @date 2021/3/12
 *
 * @brief 信息集 api 示例
 */

import request from "../request";
import { backToFront, frontToBack } from "@/api-data/infoset/example1";

/**
 * 获取A1信息集
 */
export async function getData() {
  const data = await request.get("/example1");
  return backToFront(data);
}

/**
 * 发送A1信息集
 */
export function uploadData(data) {
  return request.post("/example1", frontToBack(data));
}
