import Vue from "vue";
import App from "./App";
import Api from "config/api.js";
import Http from "config/request.js";
import config from "./config/config";

// ----- 接入全埋点区域 -----

// ----- 全局配置区域 -----
Vue.config.productionTip = false;

Vue.prototype.$api = Api;
Vue.prototype.$http = Http;

/* 注册全局公用组件 */
// 分享
App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();
