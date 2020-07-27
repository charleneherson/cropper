<template>
  <section
    class="container h-auto p-0 bg-light pt-5"
    style="min-height: 100vh; box-sizing: border-box;"
  >
    <ComHeader :done="true" />

    <ComCanvasDraw />

    <ColorPicker></ColorPicker>

    <ComBottomPanel>
      <div slot="PanelOp">
        <div>FFgg JJKLLLLL YH</div>
        <ComControlPanel />
      </div>
    </ComBottomPanel>
  </section>
</template>

<script>
import ColorPicker from "@components/common/color-picker/index.vue";
import ComBottomPanel from "@components/common/bottom-panel/index.vue";
import ComControlPanel from "./components/com-control-panel.vue";
import ComHeader from "./components/com-header.vue";
import ComCanvasDraw from "./components/com-draw.vue";
// import store from "./store";

export default {
  data() {
    return {
      context: null,

      active: "icon",
      timer: 0,
      selectId: 0
    };
  },
  computed: {
    // list() {
    //   return store.getters.list;
    // }
  },
  components: {
    ColorPicker,
    ComBottomPanel,
    ComHeader,
    ComCanvasDraw
  },
  onShareAppMessage: function(res) {
    return {
      title: "贴纸",
      path: "/pages/index/main",
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    };
  },

  methods: {
    select(e) {
      console.log(e);
      this.active = e;
      if (this.active === "avatar") {
        this.list = this.avatarList;
      } else if (this.active === "photo") {
        this.list = this.photoList;
      } else if (this.active === "icon") {
        this.list = this.iconList;
      } else if (this.active === "text") {
        this.list = this.textList;
      }
    },
    select2(e) {
      let _this = this;
      console.log(e);
      let icon = JSON.parse(JSON.stringify(this.icon));
      if (this.active === "avatar") {
        this.avatar.path = this.avatarList[e].path;
      } else if (this.active === "photo") {
        this.photo.path = this.photoList[e].path;
      } else if (this.active === "icon") {
        wx.downloadFile({
          url: _this.iconList[e].path,
          success: function(r) {
            icon.path = r.tempFilePath;
            icon.id = _this.timer;
            icon.active = true;
            _this.timer++;
            _this.elements.push(icon);
          }
        });
      } else if (this.active === "text") {
        wx.downloadFile({
          url: _this.textList[e].path,
          success: function(r) {
            icon.path = r.tempFilePath;
            icon.id = _this.timer;
            icon.active = true;
            _this.timer++;
            _this.elements.push(icon);
          }
        });
      }
    },
    next() {
      wx.showLoading({
        title: "制作中"
      });
      for (let item of this.elements) {
        item.active = false;
      }
      setTimeout(() => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 300,
          height: 300,
          destWidth: 600,
          destHeight: 600,
          canvasId: "firstCanvas",
          success: function(res) {
            console.log(res.tempFilePath);
            wx.hideLoading();
            wx.navigateTo({
              url: "/pages/share/main?path=" + res.tempFilePath
            });
          }
        });
      }, 100);
    }
  },

  mounted() {
    // if (this.active === "avatar") {
    //   this.list = this.avatarList;
    // } else if (this.active === "photo") {
    //   this.list = this.photoList;
    // } else if (this.active === "icon") {
    //   this.list = this.iconList;
    // } else if (this.active === "text") {
    //   this.list = this.textList;
    // }
    // if (this.$mp.query.path) {
    //   console.log(this.$mp.query.path)
    //   // this.avatarList[0].path = this.$mp.query.path
    //   // this.avatar.path = this.avatarList[0].path
    // } else {
    //   // this.getInfo()
    // }
  }
};
</script>
<style lang="scss">
.box-shadow-top {
  box-shadow: 0 -0.5rem 2rem rgba(#333, 0.15);
}

.item {
  background-image: url("");
}
.reset {
  top: -75rpx;
  left: 18.5rpx;
  width: 130rpx;
  height: 130rpx;
  border-radius: 50%;
}
.done {
  top: -75rpx;
  right: 18.5rpx;
  width: 130rpx;
  height: 130rpx;
  border-radius: 50%;
}

button {
  padding: 0;
  -webkit-appearance: none;
  border: none;
  &::after {
    content: "";
    border: none;
  }
}
</style>
