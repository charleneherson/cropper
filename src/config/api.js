// 基础接口配置,请表明哪些接口是什么作用
export default {
  // 微信登录接口
  login: {
    loginbycode: "/wxserver/wxapp/loginbycode",
    getuserstatus: "/wxserver/user/getuserstatus",
    login: "/wxserver/wxapp/sss"
  },
  TABBAR: {
    /*tab bar消息通知*/
    MESSAGE: `/kid-chinese/report/getnewreviews`
  }
};
