import { updatelogin, loginout } from "@common/js/login";
import { minivc } from "@config/config";
function request(method, url, data, fn, fn1) {
  let reqUrl;
  url.indexOf("http") >= 0
    ? (reqUrl = url)
    : (reqUrl = process.env.VUE_APP_BASE_HOST + url);
  const cookie = "";
  uni.request({
    url: reqUrl,
    method: method,
    data: {
      ...data,
      minivc,
      phoneBrand: getApp().globalData.brand,
      phoneModel: getApp().globalData.model,
      phoneSystem: getApp().globalData.system
    },
    timeout: 30000,
    header: {
      Cookie: cookie,
      "content-type": "application/x-www-form-urlencoded"
    },
    success: async res => {
      if (res && res.data) {
        switch (res.data.errNo) {
          case 0:
            fn(res.data.data);
            break;
          //登录过期
          case 3:
            uni.navigateTo({
              url: "/pagesModule/login/login"
            });
            break;
          // 账号重复登陆
          case 99:
            uni.showToast({
              title: res.data.errstr,
              duration: 2000,
              icon: "none"
            });
            loginout();
            uni.switchTab({
              url: "/pages/my/index/index"
            });
            fn1(res);
            break;
          default:
            fn1(res);
            break;
        }
      } else {
        fn1(res);
      }
    },
    fail(err) {
      console.log(err);
      uni.showToast({
        title: "网络异常，请检查网络",
        duration: 2000,
        icon: "none"
      });
      fn1();
    },
    complete(XMLHttpRequest, status) {
      if (status == "timeout") {
        uni.showToast({
          title: "请求超时",
          duration: 2000,
          icon: "none"
        });
        fn1();
      }
    }
  });
}

// GET POST请求
export default {
  get(url, data = {}, fn, fn1 = function() {}) {
    request("GET", url, data, fn, fn1);
  },
  post(url, data = {}, fn, fn1 = function() {}) {
    request("POST", url, data, fn, fn1);
  },
  pro_get(url, data = {}) {
    return new Promise((resolve, reject) => {
      request(
        "GET",
        url,
        data,
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  },
  pro_post(url, data = {}) {
    return new Promise((resolve, reject) => {
      request(
        "POST",
        url,
        data,
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }
};
