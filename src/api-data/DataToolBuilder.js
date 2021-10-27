/**
 * @author Peng Yu
 *
 * @brief
 * 根据定义的字段规则生成前后端字段转换和校验函数，以及传入Tablesheet组件中的参数
 *
 * 规则字段包括:
 * 1. 数据校验相关
 * default: 默认值
 * backendKey: 后端使用key名（前后端key值不同时使用）
 * backToFront: 后端字段值转换为前端字段值函数
 * frontToBack: 前端字段值转换为后端字段值函数
 *
 * 2. 生成表单组件相关
 * label 标签
 * rules 表单校验规则。格式参考 https://element.eleme.cn/#/zh-CN/component/form
 * dataType 表单类别（select, number, date等）
 * options 可选项（dataType=select时传入）
 * styles 表单样式
 * styles.width 表单宽度（1: 占整行，2: 占1/2行，3: 占 1/3 行）
 *
 * @template T
 * @param {APIDataModel<T>} json
 */
export default function DataToolBuilder(json) {
  /**
   * 传入 TableSheet 组件的参数
   * @type {APIDataModel<T>}
   */
  const tableProps = Object.keys(json).map((key) =>
    Object.assign(
      {
        key,
        label: "",
        dataType: "",
        options: [],
        rules: [],
        styles: {},
      },
      json[key]
    )
  );

  /**
   * 后端转为前端使用的值
   * @param {object} backendData
   * @returns {APIDataModelFrontModel<T>}
   */
  const backToFront = (backendData) => {
    const frontendData = {};
    Object.keys(json).forEach((key) => {
      const item = json[key];
      const backendKey = item.backendKey ? item.backendKey : key;
      let thisKeyValue = backendData[backendKey]
        ? backendData[backendKey]
        : item.default;

      if (!backendData[backendKey]) {
        console.warn(`后端字段${backendKey}缺失`);
      }

      // eslint-disable-next-line no-prototype-builtins
      if (!item.hasOwnProperty("default")) {
        console.warn(`未定义${key}字段默认值`);
      }

      if (item.backToFront) thisKeyValue = item.backToFront(thisKeyValue);

      frontendData[key] = thisKeyValue;
    });
    return frontendData;
  };

  /**
   * 前端转为后端使用的值
   * @param {APIDataModelFrontModel<T>} frontendData
   * @returns {object}
   */
  const frontToBack = (frontendData) => {
    const backendData = {};
    Object.keys(json).forEach((key) => {
      const item = json[key];
      const thisKeyValue = frontendData[key];
      const backendKey = item.backendKey ? item.backendKey : key;
      backendData[backendKey] = item.frontToBack
        ? item.frontToBack(thisKeyValue)
        : thisKeyValue;
    });
    return backendData;
  };

  return {
    tableProps,
    frontToBack,
    backToFront,
  };
}
