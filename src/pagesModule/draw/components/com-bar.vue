<template>
    <header id="op_header" class="op_header">
        <button>结束</button>
    </header>
</template>

<script>
export default {
  name: "OpHeader",
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
  computed: {
    starSrc() {
      return ``;
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
