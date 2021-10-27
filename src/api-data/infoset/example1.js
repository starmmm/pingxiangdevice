/**
 * @brief
 * 一个简单示例，定义生成 Tablesheet 的相关值
 */
import DataToolBuilder from "../DataToolBuilder";

/**
 * @typedef {Object} Example1
 * @property {string} name
 * @property {string} sex
 * @property {number} age
 * @property {string} date
 * @property {string} address
 * @property {string} reason
 */

/**
 * @type {APIDataModel<Example1>}
 */
const dataModel = {
  name: {
    default: "",
    label: "姓名",
    rules: [
      {
        required: true,
        message: "姓名为必填项",
      },
    ],
  },
  sex: {
    default: "",
    label: "性别",
    dataType: "select",
    options: [
      {
        label: "男",
        value: "man",
      },
      {
        label: "女",
        value: "woman",
      },
    ],
    rules: [
      {
        required: true,
        message: "姓名为必填项",
      },
    ],
  },
  age: {
    default: 0,
    label: "年龄",
    dataType: "number",
    rules: [
      {
        required: true,
        message: "姓名为必填项",
      },
      {
        type: "number",
        message: "年龄必须为数字值",
      },
    ],
  },
  date: {
    default: "",
    label: "出生日期",
    dataType: "date",
  },
  address: {
    default: "",
    label: "户籍所在地详址",
    styles: {
      width: 2,
    },
  },
  reason: {
    default: "",
    label: "暂缓列入套改实施范围原因类别",
    styles: {
      width: 1,
    },
  },
};

export const { tableProps, backToFront, frontToBack } = DataToolBuilder(
  dataModel
);
