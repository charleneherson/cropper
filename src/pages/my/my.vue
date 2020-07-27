<template></template>

<script>
export default {
  methods: {
    getInfo() {
      let _this = this;
      wx.getSetting({
        success: function(response) {
          if (response.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res);
                wx.downloadFile({
                  url: res.userInfo.avatarUrl,
                  success: function(r) {}
                });
              }
            });
          } else {
          }
        }
      });
    }
  },
  mounted() {
    this.getInfo();
  }
};
</script>
<style lang="less">
</style>
