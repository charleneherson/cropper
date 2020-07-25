/*
 * @fileoverview 等比压缩图片文件
 * @author chengshuangfeng | chengshuangfeng@zuoyebang.com
 * @version 1.0 | 2020-02-12 | chengshuangfeng    // 初始版本。
 * @param {file} [file] [chooseImage方法之后获得的res.tempFilePaths[0]]
 * @param {number} [width] [可选，压缩之后的图片宽度，默认为原始图片宽度]
 * @param {number} [quality] [可选，压缩质量，0-1之间的值，默认为1]
 * @return {tempFilePath} [返回微信图片路径]
 */

 /**
  * 
  * 
  * 实例：
  * //初始化
  * 1. vue中引用插件
  * import { compressImage } from "@common/js/compressImage"
  * 
  * 2. 在view中写展示的canvas标签
  * <canvas canvas-id='photo_canvas' style='width:300px;height:200px;' class='myCanvas'></canvas>
  * canvas宽度高度不能为0，css也不能设置display:none
  * 
  * 3. 引用方法
    compressImage({
      file:photo.tempFilePaths[0],
      canvasId: 'photo_canvas',
      towidth: 400,
      quality: 0.8,
      success: function(res){
      }
    })

    完整：
    uni.chooseImage({
      count: 1, //默认9
      sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: function (photo) {
        compressImage({
          file:photo.tempFilePaths[0],
          canvasId: 'photo_canvas',
          towidth: 400,
          quality: 0.5,
          success: function(res){
          }
        })
      }
    });
*/


function compressImage({file,canvasId,towidth,quality = 1,success=function(){}}) {
  // 获得图片信息
  uni.getImageInfo({
    src: file,
    success: function (info) {
      // 创建画布
      const ctx = uni.createCanvasContext(canvasId);
      towidth = towidth ? towidth : info.width
      //根据图片比例换算出图片高度
      const toheight = Math.trunc(towidth * info.height / info.width);
      // 绘制成图片
      ctx.drawImage(file, 0, 0, info.width, info.height, 0, 0, towidth, toheight);
      // 绘制到画布上面
      ctx.draw(false, function () {
        // canvas转化为文件路径
        uni.canvasToTempFilePath({
          canvasId: canvasId,
          // fileType:"jpg", //默认是png，可以传png和jpg
          quality: quality,
          success: function (res) {
            // 成功之后返回路径
            success(res.tempFilePath)
          },
          fail: function (e) {
            uni.showToast({
              title: '图片加载失败',
              duration: 2000,
              icon: 'none'
            })
          }
        })
      })
    },
    fail: function(e){
      uni.showToast({
        title: '图片加载失败',
        duration: 2000,
        icon: 'none'
      })
    }
  })
}

module.exports = {
  compressImage
}
