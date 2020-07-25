<template>
  <view class="common-abnormal-container">
    <view class="common-abnormal">
      <cover-image
        :style="{
          width: picWidth + 'rpx',
          height: picWidth + 'rpx',
        }"
        class="status-img"
        :src="srcUrl"
      />
      <view class="network-desc">{{ desc }}</view>
      <view class="retry-btn-container">
        <view class="retry-btn" @click="retry()">重试</view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniIcons } from "@dcloudio/uni-ui";
export default {
  name: "network-empty",
  components: {
    uniIcons
  },
  props: {
    emptySrc: {
      type: String,
      default: ""
    },
    tipsWord: {
      type: String,
      default: ""
    },
    picWidth: {
      type: Number,
      default: 330
    }
  },
  data() {
    return {
      srcUrl: this.emptySrc || "",
      desc: this.tipsWord || "没有更多内容哦~"
    };
  },
  components: {
    uniIcons
  },
  onReady() {
    let _this = this;
    wx.getNetworkType({
      success(res) {
        if (res.networkType == "none") {
          _this.setData();
        }
      }
    });
    uni.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        _this.setData();
      }
    });
  },
  methods: {
    setData() {
      this.srcUrl = "";
      this.desc = "网络异常，请检查您的网络";
    },
    retry() {
      this.$emit("retry");
    }
  }
};
</script>

<style lang="less">
.common-abnormal-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .common-abnormal {
    text-align: center;
  }
}
.status-img {
  width: 330rpx;
  height: 330rpx;
}
.retry-btn-container {
  display: flex;
  justify-content: center;
  .retry-btn {
    background: #ff6a6a;
    color: white;
    height: 88rpx;
    width: 260rpx;
    font-size: 32rpx;
    background: #ff6a6a;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 32rpx;
  }
}
.network-desc {
  margin-top: 20rpx;
  color: #999999;
  font-size: 28rpx;
}
</style>
