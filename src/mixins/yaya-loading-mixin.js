export default {
  data() {
    return {
      IS_SHOW_YY_LOADING: false,
    };
  },
  methods: {
    showYyLoading() {
      this.IS_SHOW_YY_LOADING = true;
    },
    hideYyLoading() {
      this.IS_SHOW_YY_LOADING = false;
    },
  },
};
