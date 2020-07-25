/*
  点击按钮获取用户手机号并登陆逻辑封装
  参数
  e: 是button设置getphonenumbers时, 微信提供的参数
  fn1: 登陆成功后的回调函数
  fn2: 登陆失败后的回调函数
  TODO: 用户拒绝授权是否需要逻辑处理
*/
import { login } from "./login";
export default function(e, fn1, fn2) {
  if (e.detail.errMsg !== "getPhoneNumber:ok") return;
  uni.showLoading({ title: "加载中" });
  const { encryptedData, iv } = e.detail;
  login(encryptedData, iv)
    .then(result => {
      uni.hideLoading();
      fn1 && fn1();
    })
    .catch(res => {
      uni.hideLoading();
      fn2 && fn2();
    });
}
