// 检查网络
export function checkNetworkType(data = {}) {
  return new Promise((resolve, reject) => {
    uni.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        if (networkType === "none") {
          uni.showToast({
            title: "请检查网络连接~",
            icon: "none"
          });
          return;
        } else {
          resolve(res);
        }
      }
    });
  })
}

// toast
export function Toast(title,duration=1500) {
  uni.showToast({
    title,
    icon: "none",
    duration
  });
}



