export default {
  data() {
    return {
      // 设置默认的分享参数
      share: {
        title: "超棒的语文启蒙课程！", // 分享标题
        path: "pages/index/index", // 被分享好友点击后，跳转页面
        imageUrl: "" // 分享图片
      }
    };
  },
  onShareAppMessage(res) {
    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      success(res) {
        uni.showToast({
          title: "分享成功",
          duration: 2000,
          icon: "none"
        });
      },
      fail(res) {
        uni.showToast({
          title: "分享失败",
          duration: 2000,
          icon: "none"
        });
      }
    };
  }
};
