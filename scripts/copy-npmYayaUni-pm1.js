const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs-extra');
const argv = process.argv;
const env = process.env;

console.log(argv);
// console.log(env);
// console.log(env.npm_config_argv);
console.log(argv[2]);
if(argv.length < 3) {
  console.log("warn:少参数@yaya/director-uni版本号");
}
const node_yaya = path.join(__dirname, '../node_modules/@yaya/director-uni/lib')
const pagesModule1 = path.join(__dirname, '../src/pagesModule1/@yaya/director-uni/lib');
function npm_i() {
  console.log(`npm i ${argv[2]} --save-dev`);
  return new Promise((resolve, reject) => {
      exec(`npm i ${argv[2]} --save-dev`, function (error, stdout, stderr) {
        console.log("[添加修改文件输出：%s]",stdout);
        resolve();
        if(error) reject(error);
      });

  })
}

function copy(from,to) {
  console.log(`start copy`);
  exec(`rm -rf src/pagesModule1/@yaya`, function (error, stdout, stderr) {
    console.log(stdout);
    fs.copySync(from,to);
    console.log(`copy 完成`);
  });
}
npm_i().then(()=>{
  copy(node_yaya, pagesModule1);
})