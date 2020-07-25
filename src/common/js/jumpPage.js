/*
  封装小程序内跳转逻辑
  参数 : Object类型
   url: 跳转的链接, http链接将会跳转到webview
   method: 跳转用的方法, 值为wx小程序支持的跳转方法, 默认为navigateTo
   isNoShare: true or false, default: true该页面是否可以分享
*/

export default function({ url, method = "navigateTo", isNoShare = true }) {
  if (!url) {
    console.error("没有提供跳转url");
    return;
  }
  if (url.indexOf("http") === 0) {
    // 跳到h5 webview
    const realUrl = isNoShare
      ? `/pagesModule/common-web-view/common-web-view?isNoShare=1&url=${encodeURIComponent(
          url
        )}`
      : `/pagesModule/common-web-view/common-web-view?url=${encodeURIComponent(
          url
        )}`;
    uni[method]({
      url: realUrl,
    });
  } else {
    // 跳到原生小程序
    uni[method]({
      url,
    });
  }
}
