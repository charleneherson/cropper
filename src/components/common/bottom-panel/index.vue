<template>
  <transition
    :duration="300"
    name="fade"
    id="panel_bottom"
    class="panel_bottom"
    @touchmove.stop.prevent
  >
    <header class="panel_h">
      <div class="p_h_left">
        <button>上传➕</button>
        <button>尺寸➕</button>
        <button>eee➖</button>
      </div>
      <div class="p_h_right">
        <button>收起+</button>
      </div>
    </header>

    <section>
      <div>PanelOp PanelOp PanelOp</div>
      <slot name="PanelOp" />
    </section>
  </transition>
</template>

<script>
export default {
  name: "PanelBottom",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.panel_bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1000;

  width: 100vw;
  height: 445rpx;
  color: rgba(144, 148, 153);
  background: #f8f8f8;

  -webkit-transition: height 0.6s;
  transition: height 0.6s;

  .panel_h {
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 100rpx;
    border: 1px solid red;
    .p_h_left {
      width: auto;
    }
    .p_h_right {
      width: auto;
    }
  }
}
</style>
