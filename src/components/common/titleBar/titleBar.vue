<template>
  <!-- 标题栏 -- 通用组件 -->
  <view>
    <view :class="['title', { fixed: isUseFix }]">
      <view
        class="staticBar"
        :style="{
          height: statusBarHeight + 'px',
          backgroundColor: staticBgColor
        }"
      ></view>
      <view
        :class="[
          'navBar',
          {
            border: /^#([fF]{6}|[fF]{3})$/.test(navBarBgColor) && isShowBorder
          },
          { ios: isiOS },
          { and: !isiOS }
        ]"
        :style="{
          height: navHeight + 'px',
          lineHeight: navHeight + 'px',
          backgroundColor: navBarBgColor,
          color: color,
          'text-align': align
        }"
      >
        <view
          v-if="isShowBackIcon"
          mode="scaleToFill"
          class="backIcon"
          :style="{ 'background-image': `url(${iconColor[color]})` }"
          @click="handleBack"
          @error="imageError"
        ></view>
        {{ title }}
      </view>
    </view>
    <view
      v-if="isUseFix && isUseFixFillEmpty"
      class="titleBotom"
      :style="{ height: statusBarHeight + navHeight + 'px' }"
    ></view>
    <slot/>
  </view>
</template>

<script>
import { uniIcons } from "@dcloudio/uni-ui";

export default {
  name: "YyTitleBar",
  props: {
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 静态栏背景色
    staticBgColor: {
      type: String,
      default: "#fff"
    },
    // 标题栏背景色
    navBarBgColor: {
      type: String,
      default: "#fff"
    },
    // 标题颜色
    color: {
      type: String,
      default: "black"
    },
    // 展示下边框
    isShowBorder: {
      type: Boolean,
      default: true
    },
    // 展示下边框
    isShowBackIcon: {
      type: Boolean,
      default: true
    },
    // 使用fixed定位
    isUseFix: {
      type: Boolean,
      default: false
    },
    // 是否填充fixed
    isUseFixFillEmpty: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: "center"
    }
  },
  data() {
    return {
      navHeight: getApp().globalData.navHeight,
      statusBarHeight: getApp().globalData.statusBarHeight,
      isiOS: "",
      iconColor: {
        black: "",
        white: ""
      }
    };
  },
  components: {
    uniIcons
  },
  methods: {
    imageError(e) {
      console.error(
        "image发生error事件，携带值为" + e.detail.errMsg
      );
    },
    handleBack() {
      this.$emit("back");
    }
  }
};
</script>

<style lang="scss">
.title {
  position: relative;
}
.title.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.backIcon {
  width: 70rpx;
  height: 100%;
  position: absolute;
  left: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  background-size: 33rpx;
  background-repeat: no-repeat;
  background-position: left center;
}
.navBar {
  font-size: 34upx;
  color: #000;
  font-weight: 700;
  position: relative;
  .back {
    width: 34upx;
    height: 34upx;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 28upx;
  }
}
.navBar.ios {
  text-align: center;
}
.navBar.and {
  text-align: left;
}
.navBar.border {
  border-bottom: 2upx solid #f5f5f5;
}
</style>
