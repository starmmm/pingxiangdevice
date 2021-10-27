import request from "../request";

/**
 * @param {object} params
 * @param {number} params.submitterId
 * @param {number} params.adjustedPeopleId
 * @param {string} params.operationType
 * @param {number} params.oldData
 * @param {number} params.newData
 * @returns code message data
 */
export function submitApplication(params) {
  return request({
    url: "/institution/apply/submit",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      submitterId: params.submitterId,
      adjustedPeopleId: params.adjustedPeopleId,
      operationType: params.operationType,
      oldData: params.oldData,
      newData: params.newData,
    }
  })
}

/**
 * @param {object} params
 * @param {number} params.approveId
 * @param {number} params.reviewerId
 * @param {string} params.reviewState
 * @returns code message data
 */
export function reviewApplication(params) {
  return request({
    url: "/institution/apply/review",
    method: "post",
    header: {
      "Content-Type": "application/json"
    },
    data: {
      approveId: params.approveId,
      reviewerId: params.reviewerId,
      reviewState: params.reviewState,
    }
  })
}
