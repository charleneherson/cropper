
<!-- 操作台 -->
<template>
    <section id="control_panel" class="control_panel">
        <header>
            <div>
                <button>XXC</button>
            </div>
            <div>
                <button>收起</button>
            </div>
        </header>
    </section>
</template>

<script>
export default {
  name: "ControlPanel",
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
