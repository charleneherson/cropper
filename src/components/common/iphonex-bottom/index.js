/* 返回 iphonex 底部 高度安全区域 */
/* 单位rpx */
function getHeight() {
  const { model } = uni.getSystemInfoSync();
  if (model.search("iPhone X") != -1 || model.search("iPhone 11") != -1) {
    return 36;
  } else if (model.search('iPhone 11 Pro Max') != -1) {
    return 20;
  }
  return 0;
}
const height = getHeight();
export default height;
