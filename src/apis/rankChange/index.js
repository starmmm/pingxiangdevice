/**
 * 职级调整 api
 * */
import request from "../request";

/**
 * 提交职级修改申请
 * @param {object} params
 * @param {number} params.approveId
 * @param {number} params.reviewerId
 * @param {string} params.reviewState
 * @returns code message data
 */
export function submitRankApplication(params) {
  return request({
    url: "/approve/rank/submit",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      submitterId: params.submitterId,
      adjustedPeopleId: params.adjustedPeopleId,
      oldRank: params.oldRank,
      newRank: params.newRank,
    }
  })
}

/**
 * 审核职级修改申请
 * @param {object} params
 * @param {number} params.approveId
 * @param {number} params.reviewerId
 * @param {string} params.reviewStatus
 * @returns code message data
 */
export function reviewRankApplication(params) {
  return request({
    url: "/approve/rank/review",
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
 * 申请人获取职级修改申请列表
 * @param {object} params
 * @param {number} params.submitterId
 * @param {number} params.reviewStatus
 * @param {string} params.reviewerId
 * @returns code message data
 */
export function getRankApplicationList(params) {
  return request({
    url: "/approve/rank/getApplication",
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
 * 获取人员列表
 * @param {object} params
 * @param {number} params.page
 * @param {number} params.limit
 * @param {number} params.departmentId
 * @param {number} params.currentRank
 * @param {number} params.workJoinDateStart
 * @param {number} params.workJoinDateEnd
 * @returns code message data
 */
export function getBasicInfoList(params) {
  return request({
    url: "/approve/getBasicInfoList",
    method: "post",
    data: {
      page: params.page,
      limit: params.limit,
      departmentId: params.departmentId,
      currentRank: params.currentRank,
      workJoinDateStart: params.workJoinDateStart,
      workJoinDateEnd: params.workJoinDateEnd,
      isContainSubordinateInstitutions: params.isContainSubordinateInstitutions
    }
  })
}

/**
 * 审核人获取职级修改申请列表
 * @param {object} params
 * @returns code message data
 */
export function getAllRankApplicationList(params) {
  return request({
    url: "/approve/rank/getApplication",
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
