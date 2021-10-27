import request from "../request";

/**
 * 获取用户信息
 * @param {Object} params
 * @param {string} name
 * @param {number} departmentId
 * @param {string} policeNumber
 * @param {number} certificateStatus
 * @param {number} page
 * @param {number} limit
 * @return {Object} {code, message, data}
 */
export function getListByCertificate(params) {
  return request({
    url: "/certificate/certificateRecord/getListByCertificate",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      name: params.name,
      departmentId: params.departmentId,
      policeNumber: params.policeNumber,
      certificateStatus: params.certificateStatus,
      page: params.page,
      limit: params.limit,
    }
  })
}

/**
 * 警察证变动申请
 * @param {Object} params
 * @param {string} operatedPeopleId
 * @param {number} applyReason
 * @param {number} certificateStatus
 * @param {string} submittedId
 * @return {Object} {code, message, data}
 */
export function applyDocumentChange(params) {
  return request({
    url: "/certificate/certificateRecord/apply",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      operatedPeopleId: params.operatedPeopleId,
      applyReason: params.applyReason,
      certificateStatus: params.certificateStatus,
      submitterId: params.submitterId
    }
  })
}

/**
 * 查询办理记录
 * @param {Object} params
 * @param {} name
 * @param {} submitter_name
 * @param {} submit_time
 * @param {} certificate_status
 * @param {number} page
 * @param {number} limit
 * @return {Object} {code, message, data}
 */
export function queryApplyRecord(params) {
  return request({
    url: "/certificate/certificateRecord/getList",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      name: params.name,
      submitterName: params.submitterName,
      submitTime: params.submitTime,
      submitStartTime: params.submitStartTime,
      submitEndTime: params.submitEndTime,
      certificateStatus: params.certificateStatus,
      page: params.page,
      limit: params.limit
    }
  })
}
