/**
 * @author Yan Peng
 * @date 2021/5/14
 *
 * @brief 工具类函数
 */

export function findCode(obj,value,compare = (a,b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k],value))
}
export function getTime(value) {
  const date = new Date(value)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? "0" + month : month
  day = day < 10 ? "0" + day : day
  return year + "-" + month + "-" + day
}
export function getCode(value) {
  if (Array.isArray(value)) {
    return value[value.length - 1]
  } else {
    return value
  }
}
