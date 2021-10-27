/**
 * @author Guo YiXing
 *
 * @brief
 * 用于验证的正则匹配函数
 */

/**
 * 验证是否是合法的前端URL路径
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证身份证号
 * @param {string | number} id
 */
export function checkIDNumber(id) {
  const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
  return reg.test(id.toString());
}

/**
 * 验证手机号
 * @param {string | number} phone_number
 */
export function checkMobile(phone_number) {
  const reg = /^1[3,5,8]\d{9}$/;
  return reg.test(phone_number.toString());
}
