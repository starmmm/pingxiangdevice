/**
 *  部门调整 api
 **/
import request from "../request";

/**
 * 提交部门修改申请
 * @param {object} params
 * @param {number} params.submitterId
 * @param {number} params.adjustedPeopleId
 * @param {string} params.operationType
 * @param {number} params.oldData
 * @param {number} params.newData
 * @returns code message data
 */
export function submitDepartmentApplication(params) {
  return request({
    url: "/approve/department/submit",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      submitterId: params.submitterId,
      adjustedPeopleId: params.adjustedPeopleId,
      oldDepartmentId: params.oldDepartmentId,
      newDepartmentId: params.newDepartmentId,
    }
  })
}

/**
 * 审核部门申请
 * @param {object} params
 * @param {number} params.approveId
 * @param {number} params.reviewerId
 * @param {string} params.reviewStatus
 * @returns code message data
 */
export function reviewDepartmentApplication(params) {
  return request({
    url: "/approve/department/review",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      approveId: params.approveId,
      reviewerId: params.reviewerId,
      reviewStatus: params.reviewStatus,
    }
  })
}

/**
 * 查看部门申请列表
 * @param {object} params
 * @param {number} params.submitterId
 * @param {number} params.reviewStatus
 * @param {string} params.reviewerId
 * @returns code message data
 */
export function getDepartmentApplicationList(params) {
  return request({
    url: "/approve/department/getApplication",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      submitterId: params.submitterId,
      reviewStatus: params.reviewStatus,
      reviewerId: params.reviewerId,
      limit: params.limit,
      page: params.page
    }
  })
}

/**
 * 审核人获取部门修改申请列表
 * @param {object} params
 * @returns code message data
 */
export function getAllDepartmentApplicationList(params) {
  return request({
    url: "/approve/department/getApplication",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      limit: params.limit,
      page: params.page
    }
  })
}
