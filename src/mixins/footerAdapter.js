export default {
  data() {
    return {
      isIpx: false, // 判断是不是ipX
      yyFooterPaddingHeight: 0, // footer底部的padding-bottom高度
      yyFooterPaddingBottom: 0 // footer遮挡的底部高度
    } 
  },
  methods: {
    ipXFun(){ 
      const { statusBarHeight } = uni.getSystemInfoSync();
      if (statusBarHeight > 20) {
        this.isIpx = true
        this.yyFooterPaddingHeight = 34
        this.yyFooterPaddingBottom = 34 + uni.upx2px(130)
      } else {
        this.isIpx = false
        this.yyFooterPaddingHeight = 0
        this.yyFooterPaddingBottom = 0 + uni.upx2px(130)
      }
    }
  }
};
