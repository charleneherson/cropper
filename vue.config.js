const path = require("path");
const webpack = require("webpack");
const host = require("./baseHost");
// const publicPath = process.env.NODE_ENV === 'production' ? './' : './' // npm run dev之后的初始地址
// const assetsDir = process.env.NODE_ENV === 'production' ? './' : '/' // 静态资源地址， 原先是‘/’，改为’dist/‘
function setDefaultHost() {
  if (process.env.NODE_ENV === "production") {
    process.env.VUE_APP_BASE_HOST = host["online"];
  } else {
    process.env.VUE_APP_BASE_HOST = host["local_host"];
  }
}
function setBaseHost() {
  const argv = process.argv;
  const hostIndex = argv.findIndex(v => v.includes("HOST"));
  if (hostIndex === -1) {
    // 没有指定host, dev环境默认使用yapi, pro默认使用线上环境
    setDefaultHost();
  } else {
    const hostKey = argv[hostIndex].split("=")[1];
    // 增加tips逻辑
    if (hostKey === "tips") {
      process.env.VUE_APP_IS_TIPS = true;
      process.env.VUE_APP_BASE_HOST = host["online"];
    } else if (hostKey && host[hostKey]) {
      process.env.VUE_APP_BASE_HOST = host[hostKey];
    } else {
      setDefaultHost();
    }
  }
}
function resolve(dir) {
  return path.join(__dirname, dir);
}
setBaseHost();
// 是否是线上环境
process.env.VUE_APP_IS_ONLINE =
  process.env.VUE_APP_BASE_HOST === host["online"] ? 1 : 0;
module.exports = {
  chainWebpack(config) {
    config.resolve.alias
      .set("@src", resolve("src"))
      .set("@config", resolve("src/config"))
      .set("@common", resolve("src/common"))
      .set("@components", resolve("src/components"))
      .set("@static", resolve("src/static"))
      .set("@utils", resolve("src/utils"))
      .set("@pages", resolve("src/pages"));
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  }
};
