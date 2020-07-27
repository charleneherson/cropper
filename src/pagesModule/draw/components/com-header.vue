<template>
  <section class="draw_header">
    <button class="d_h_next">下一--</button>
  </section>
</template>

<script>
export default {
  name: "DrawHeader",
  props: {
    done: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.draw_header {
  display: flex;
  flex-direction: row-reverse;

  margin-top: 140rpx;
  width: 100%;
  height: 76rpx;
  border: 1px solid red;
  background: linear-gradient(180deg, #f59f9f 10%, #ffdfdf 61%);
  .d_h_next {
    margin-right: 20rpx;

    width: 148rpx;
    height: 76rpx;
    font-size: 32rpx;
    line-height: 76rpx;
    text-align: center;
    font-weight: 400;
    color: #4a4949;
    background: rgba(252, 243, 138, 1);
  }
}
</style>
