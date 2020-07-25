<script>
import { loginbycode } from "@common/js/wxlogin";
import { LoadFont } from "@common/js/load-font";
function update() {
  // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
  const updateManager = wx.getUpdateManager();
  updateManager.onUpdateReady(function() {
    wx.showModal({
      title: "更新提示",
      content: "是否马上重启小程序？",
      success: function(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      }
    });
  });
}
export default {
  onLaunch: function() {
    console.log(
      "App Launch:初始化完成时触发（全局只触发一次）"
    );
    this.getTitleBarHeight();
    // loginbycode();
    LoadFont();
    update();
  },
  onShow: function() {
    console.log(
      "App Show:当 uni-app 启动，或从后台进入前台显示"
    );
  },
  onLoad: function() {
    // LoadFont();
  },
  onHide: function() {
    console.log("App Hide:当 uni-app 从前台进入后台");
  },
  onError: function() {
    console.log("App Error:当 uni-app 从前台进入后台");
  },
  methods: {
    getTitleBarHeight() {
      const {
        statusBarHeight,
        system,
        brand,
        model
      } = uni.getSystemInfoSync();
      console.log(
        uni.getSystemInfoSync(),
        "................................."
      );
      let navHeight;
      const isiOS = system.indexOf("iOS") > -1;
      if (!isiOS) {
        navHeight = 32 + 8 * 2;
      } else {
        navHeight = 32 + 6 * 2;
      }
      this.globalData.statusBarHeight = statusBarHeight;
      this.globalData.navHeight = navHeight;
      this.globalData.brand = brand;
      this.globalData.model = model;
      this.globalData.system = system;
    }
  },
  globalData: {
    uname: "",
    avatar: "",
    birthday: "",
    ucoin: 0,
    statusBarHeight: 0,
    navHeight: 0,
    yuwenLog: {}
  }
};
</script>

<style lang="less">
@import "./common/css/base.css";
@import "./common/css/common.less";
page {
  text,
  view,
  button {
    font-family: PingFangSC-Regular, "PingFang SC", arial,
      tahoma, "Microsoft Yahei", "\5b8b\4f53", sans-serif;
  }
  .number-font {
    font-family: "DIN" !important;
  }
  .fangzheng-font {
    font-family: "FANGZHENG" !important;
  }
}
</style>
