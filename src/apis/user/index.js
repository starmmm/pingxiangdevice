/**
 * @author Peng Yu
 *
 * @brief 用户API
 */

import request from "../request";

/**
 * @param {object} params
 * @param {string} params.username
 * @param {string} params.password
 * @returns
 */
export function login(params) {
  return request({
    url: "/user/login",
    method: "post",
    data: {
      username: params.username,
      password: params.password
    }
  })
}

/**
 * 用户获取用户个人信息
 * @returns
 */
export function queryCurrentUser() {
  return request({
    url: "/user/info/get",
    method: "get",
  })
}

/**
 * 重置密码
 * @param {object} params
 * @param {string} params.oldPassword
 * @param {string} params.newPassword
 * @returns code message data
 */
export function resetPassword(params) {
  return request({
    url: "/user/password/reset",
    method: "post",
    data: {
      oldPassword: params.oldPassword,
      newPassword: params.newPassword
    }
  })
}

/**
 * 用户更新自己姓名
 * @param {string} name
 * @returns code message data
 */
export function updataUserName(name) {
  return request({
    url: "/user/info/update",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      name: name
    }
  })
}

/**
 * 管理员获取用户信息
 *
 * @param {number} id
 * @returns code message data
 */
export function getUserInfo(id) {
  return request({
    url: "/user/get/?id=" + id,
    method: "get",
  })
}
/**
 * 管理员获取用户列表
 *
 * @returns code message data
 */
export function getUserList() {
  return request({
    url: "/user/getList",
    method: "get",
  })
}
/**
 * 管理员删除用户
 * @param id
 * @returns code message data
 */
export function deleteUser(id) {
  return request({
    url: "/user/delete?id=" + id,
    method: "delete",
  })
}

/**
 * 管理员批量删除用户
 * @param {Number【】} userIds
 * @returns code message data
 *
 */
export function deleteUsers(userIds) {
  return request({
    url: "/user/delete/batch",
    method: "delete",
    data: {
      userIds: userIds
    },
    header: {
      "Content-Type": "application/json"
    }
  })
}

/**
 * @param {string} url
 * @param {FormData} fileFormData
 * @Authorization token
 */
export function uploadFile(url,fileFormData) {
  return request({
    url: url,
    method: "post",
    data: fileFormData,
    header: {
      "Content-Type": "multipart/form-data",
    }
  })
}

