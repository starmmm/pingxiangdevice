/**
 * @author Guo YiXing
 * 
 * @brief
 *      api 数据模型类型定义
 */

type APIDataModelDataType = "input" | "select" | "textarea" | "file" | "date" | "number";

interface APIDataModelRuleItem<T> {
    type?: "date" | "array" | "number" | "string";
    required: boolean;
    message: string;
    trigger: "focus" | "blur" | "change";
    min?: number;
    max?: number;
    validator?: (rule: APIDataModelRuleItem<T>, value: T, callback: (arg: Error | void) => void) => void;
}

interface APIDataModelSelectOptionItem<T> {
    label: string;
    value: T;
}

interface APIDataModelFormStyle {
    /**
     * 表单宽度
     * * `1`: 占整行
     * * `2`: 占1/2行
     * * `3`: 占 1/3 行
     */
    width: 1 | 2 | 3;
}

interface APIDataModelItem<T> {
    /** 默认值 */
    default: T;
    /** 标签 */
    label: string;
    /**
     * 后端使用key名（前后端key值不同时使用）
     */
    backendKey: string;
    /**
     * 表单校验规则
     * - 格式参考 https://element.eleme.cn/#/zh-CN/component/form
     */
    rules?: APIDataModelRuleItem<T>[];
    /** 表单类别 */
    dataType?: APIDataModelDataType;
    /** 
     * 可选项（dataType=select时传入）
     */
    options?: APIDataModelSelectOptionItem<T>[];
    /** 表单样式 */
    styles?: APIDataModelFormStyle;
    /** 后端字段值转换为前端字段值函数 */
    backToFront: (value: any) => T;
    /** 前端字段值转换为后端字段值函数 */
    frontToBack: (value: T) => any;
}

type APIDataModel<T, K = keyof T> = { [P in K]: APIDataModelItem<T[P]> }
type APIDataModelFrontModel<T, K = keyof T> = { [P in K]: T[P] }