import Api from "config/api.js";
import request from "config/request.js";
const appid = "wxb4d0ce9d5a7d5b8d";

// 微信登录获取code
function login() {
  return new Promise((resolve, reject) => {
    uni.login({
      success(res) {
        console.log("wx login success");
        console.log(res);
        resolve(res);
      },
      fail(res) {
        console.log("wx login fail");
        reject(res);
      }
    });
  });
}

// code换取wx_user、openid、unionid
async function loginbycode() {
  let promise = new Promise((resolve, reject) => {
    login()
      .then(result => {
        const code = result.code;
        request.get(
          Api.login.loginbycode,
          { appid: appid, code: code },
          data => {
            if (data) {
              const wx_user = data.wx_user;
              const openid = data.openid;
              const unionid = data.unionid;
              if (wx_user) {
                // 保存登录凭证
                setwxuser(wx_user);
                resolve(wx_user);
              } else {
                console.log("loginbycode no wx_user");
                reject(data);
              }
            } else {
              console.log("loginbycode no data");
              reject(data);
            }
          },
          err => {
            console.log(err);
            console.log("loginbycode error");
            reject(err);
          }
        );
      })
      .catch(err => {
        console.log("uni.login登录失败");
        reject(err);
      });
  });
  return promise
    .then(data => [data, null])
    .catch(err => [null, err]);
}

function getwxuser() {
  return uni.getStorageSync("wx_user")
    ? uni.getStorageSync("wx_user")
    : "";
}

function setwxuser(wx_user) {
  uni.setStorageSync("wx_user", wx_user);
}

export { loginbycode, getwxuser };
