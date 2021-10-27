import Vue from "vue";
import Cookies from "js-cookie"
import Router from "vue-router";
import Element from "element-ui";
import locale from "element-ui/lib/locale/lang/zh-CN";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss"; // global css
import vueXlsxTable from 'vue-xlsx-table';
import echarts from 'echarts';
import App from "./App";
import store from "./store";
import router from "./router";

import "./icons" // icon

Vue.prototype.$echarts = echarts;
Vue.use(Router);
Vue.use(Element, { locale });
Vue.config.productionTip = false;
Vue.use(Element, {
    size: Cookies.get("size") || "medium", // set element-ui default size
})
Vue.use(vueXlsxTable, { rABS: true });
// register global utility filters
// Object.keys(filters).forEach(key => {
//     Vue.filter(key, filters[key])
// })

new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App),
});