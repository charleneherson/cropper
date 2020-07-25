/*
* 拷贝文件插件, 在编译完成以后执行
* 用法
    plugins: [
      new shearFilePlugin([
        { from: './dist/mix-detail.html', to: './dist/mix2-detail.html' },
        { from: './dist/mix-detail.html', to: './dist/spu-detail.html' },
      ]),
    ],
    from: 拷贝对象, to: 拷贝到,
    路径以vue.config.js为基准
*/
const path = require('path');
const fs = require('fs');

function shearFilePromise(from, to) {
  console.log(path.join(__dirname, from));
  console.log(path.join(__dirname, to));
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, from), 'utf8', (err, content) => {
      if (err) {
        console.log(err);
        
        console.log(`${from}不存在`);
        // console.log('请检查shearFilePlugin配置');
        reject(err);
      } else {
        fs.writeFile(path.join(__dirname, to), content, (serr) => {
          if (serr) {
            console.log(`写入${to}报错`);
            reject(serr);
          } else {
            fs.rmdir(from, function(err){
              if(err){
                   throw err;
              }
              console.log('文件:'+from+'删除成功！');
           })
          resolve();
          }
        });
      }
    });
  });
}

/**
 * @des 参数解释同上
 */
// function shearFilePromise(copiedPath, resultPath, direct) {
//   if(!direct) {
//       copiedPath = path.join(__dirname, copiedPath)
//       resultPath = path.join(__dirname, resultPath)
//   }

//   /Users/ujipin/Desktop/desktop/yaya-project/duck-chinese-minapp/dist/dev/mp-weixin/node-modules/@yaya
//   function createDir (dirPath) {
//       fs.mkdirSync(dirPath)        
//   }

//   if (fs.existsSync(copiedPath)) {
//       createDir(resultPath)
//       /**
//        * @des 方式一：利用子进程操作命令行方式
//        */
//       // child_process.spawn('cp', ['-r', copiedPath, resultPath])

//       /**
//        * @des 方式二：
//        */
//       const files = fs.readdirSync(copiedPath, { withFileTypes: true });
//       for (let i = 0; i < files.length; i++) {
//           const cf = files[i]
//           const ccp = path.join(copiedPath, cf.name)
//           const crp = path.join(resultPath, cf.name)  
//           if (cf.isFile()) {
//               /**
//                * @des 创建文件,使用流的形式可以读写大文件
//                */
//               const readStream = fs.createReadStream(ccp)
//               const writeStream = fs.createWriteStream(crp)
//               readStream.pipe(writeStream)
//           } else {
//               try {
//                   /**
//                    * @des 判断读(R_OK | W_OK)写权限
//                    */
//                   fs.accessSync(path.join(crp, '..'), fs.constants.W_OK)
//                   copyFolder(ccp, crp, true)
//               } catch (error) {
//                   console.log('folder write error:', error);
//               }

//           }
//       }
//   } else {
//       console.log('do not exist path: ', copiedPath);
//   }
// }
shearFilePromise('../dist/dev/mp-weixin/node-modules/@yaya','../src/pagesModule1')