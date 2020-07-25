/**
 * Author      | hejiarui@zuoyebang.com
 * Date        | 20200603
 * Description | Embedded fonts from web service
 *             | 此方法如放在小程序onLaunch中虽可正常使用但loadFontFace的成功/失败回调在模拟器中无法打印
 */

export function LoadFont() {
  const FontsSet = {
    DIN:
      "https://zyb-yayayuwen-1253445850.cos.ap-beijing.myqcloud.com/yaya-fe/fonts/DIN%20Alternate%20Bold.min.ttf",
    FANGZHENG:
      "https://zyb-yayayuwen-1253445850.cos.ap-beijing.myqcloud.com/yaya-fe/study-report/fzltyjc.TTF",
  };
  console.log(`Can I Use LoadFontFace ? ${wx.canIUse("loadFontFace")}`);
  wx.loadFontFace({
    global: true,
    family: "DIN",
    source: `url("${FontsSet.DIN}")`,
    success: function(res) {
      console.log(`Successed Load FontFace [DIN], ${JSON.stringify(res)}`);
    },
    fail: function(res) {
      console.log(`Failed Load FontFace [DIN], ${JSON.stringify(res)}`);
    },
    complete: function(res) {
      console.log(`Completed Load FontFace [DIN], ${JSON.stringify(res)}`);
    },
  });
}
