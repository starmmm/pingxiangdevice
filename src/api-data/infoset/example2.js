/**
 * @brief
 * 一个简单示例，定义后端api字段key及对应default值和字段转换函数
 */
import DataToolBuilder from "../DataToolBuilder";

/**
 * @typedef {Object} Example2
 * @property {string} name
 * @property {string} sex
 * @property {number} age
 * @property {string} time
 * @property {string} someKey
 */

/**
 * @type {APIDataModel<Example2>}
 */
const dataModel = {
  name: {
    default: "",
  },
  sex: {
    default: "",
  },
  age: {
    default: 0,
  },
  time: {
    default: "2020/12/12",
    backToFront: (time) => {
      return time.split("/").join("-");
    },
    frontToBack: (time) => {
      return time.split("-").join("/");
    },
  },
  someKey: {
    default: "",
    backendKey: "some-key",
  },
};

export const { tableProps, backToFront, frontToBack } = DataToolBuilder(
  dataModel
);
