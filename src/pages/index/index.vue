<template>
  <button @click="nav()">DIY</button>
</template>
<script>
export default {
  mounted() {
    wx.navigateTo({
      url: "/pagesModule/draw/draw"
    });
  },
  methods: {
    nav() {
      wx.navigateTo({
        url: "/pagesModule/draw/draw"
      });
    }
  }
};
</script>
