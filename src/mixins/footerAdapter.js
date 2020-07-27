export default {
  data() {
    return {
      isIpx: false, // 判断是不是ipX
      footerPaddingHeight: 0, // footer底部的padding-bottom高度
      FooterPaddingBottom: 0 // footer遮挡的底部高度
    };
  },
  methods: {
    ipXFun() {
      const { statusBarHeight } = uni.getSystemInfoSync();
      if (statusBarHeight > 20) {
        this.isIpx = true;
        this.footerPaddingHeight = 34;
        this.FooterPaddingBottom = 34 + uni.upx2px(130);
      } else {
        this.isIpx = false;
        this.footerPaddingHeight = 0;
        this.FooterPaddingBottom = 0 + uni.upx2px(130);
      }
    }
  }
};
