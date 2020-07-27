<template>
  <section class="color_picker">
    <div>color picker</div>
    <div class="inner_bar">
      <span v-for="item in colorList" :key="item" :style="echoStyle(item)"></span>
    </div>
  </section>
</template>

<script>
const COLORSET = ["#979797", "#E02020"];
export default {
  name: "ColorPicker",
  props: {},
  components: {},
  data() {
    return {
      colorList: COLORSET
    };
  },
  computed: {},
  methods: {
    echoStyle(item) {
      return {
        backgroundColor: item
      };
    }
  }
};
</script>

<style lang="less" scoped>
.color_picker {
  .inner_bar {
    display: flex;
    flex-direction: row;
    width: 100%;
    span {
      width: 43px;
      height: 15px;
      background: #0091ff;
      border: 1px solid #979797;
    }
  }
}
</style>
