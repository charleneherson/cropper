import Api from "config/api.js";
import Http from "config/request.js";
import { loginbycode, getwxuser } from "./wxlogin.js";

const appid = "wxb4d0ce9d5a7d5b8d";
const suffix = Number(process.env.VUE_APP_IS_ONLINE)
  ? "prod"
  : "dev";
console.log(
  Number(process.env.VUE_APP_IS_ONLINE),
  process.env.VUE_APP_IS_ONLINE
);
const zybussKey = "zybuss-" + suffix;

// 获得手机号登录换取zybuss、wx_uid
async function login(encryptedData, iv) {
  // 加载中，后面显示toast，会直接清除掉
  uni.showLoading({
    title: "加载中"
  });
  let wx_user = getwxuser();
  let promise = new Promise((resolve, reject) => {
    if (wx_user) {
      Http.post(
        Api.login.login,
        {
          appid: appid,
          wx_user: wx_user,
          encryptedData: encryptedData,
          iv: encodeURIComponent(iv)
        },
        ({ wx_uid, zybuss }) => {
          if (zybuss) {
            // 保存登录凭证
            setzybuss(zybuss);
            setwxuid(wx_uid);

            console.log("登录成功");
            resolve(zybuss);
          } else {
            console.log("login no zybuss");
            reject(zybuss);
          }
        },
        err => {
          console.log("login error");
          reject(err);
        }
      );
    } else {
      console.log("catch loginbycode err");
      loginbycode();
      reject(err);
    }
  });

  return promise
    .then(data => [data, null])
    .catch(err => {
      console.log("登录失败，请重试");
      reject(err);
    });
}

// 更新zybuss
async function updatelogin() {
  let promise = new Promise((resolve, reject) => {
    const zybuss = getzybuss();
    const wx_user = getwxuser();
    if (zybuss && wx_user) {
      Http.post(
        Api.login.getuserstatus,
        {
          appid: appid,
          wx_user: wx_user
        },
        res => {
          // 没有登录
          if (res.status != 1) {
            loginout();
            reject(res);
            // 已经登录
          } else {
            if (res && res.zybuss) {
              // 保存登录凭证
              setzybuss(res.zybuss);
              resolve(res);
            } else {
              loginout();
              reject(res);
            }
          }
        },
        err => {
          console.log("update error");
          loginout();
          reject(err);
        }
      );
    } else {
      loginout();
      reject({ errstr: "没有登录" });
    }
  });

  return promise
    .then(data => [data, null])
    .catch(err => {
      loginout();
      console.log("登录过期，请重新登录");
      return [null, err];
    });
}

// 注销登录
function loginout() {
  uni.removeStorageSync(zybussKey);
}

// 判断登录
function islogin() {
  return uni.getStorageSync(zybussKey) ? true : false;
}

//获取zybuss
function getzybuss() {
  return uni.getStorageSync(zybussKey)
    ? uni.getStorageSync(zybussKey)
    : "";
}

//设置zybuss
function setzybuss(zybuss) {
  uni.setStorageSync(zybussKey, zybuss);
}

// 获取wx_uid
function getwxuid() {
  return uni.getStorageSync("wx_uid")
    ? uni.getStorageSync("wx_uid")
    : "";
}

//设置wx_uid
function setwxuid(wx_uid) {
  uni.setStorageSync("wx_uid", wx_uid);
}

export {
  login,
  updatelogin,
  loginout,
  islogin,
  getwxuid,
  getzybuss,
  setzybuss
};
