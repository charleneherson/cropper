const fs = require("fs");
fs.copyFile(
  "./scripts/build.js",
  "./node_modules/@dcloudio/vue-cli-plugin-uni/commands/build.js",
  err => {
    if (err) {
      console.log(err);
    }
  }
);
