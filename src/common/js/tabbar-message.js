/**
 * Author      | hejiarui@zuoyebang.com
 * Date        | 20200601
 * Description | Tab bar page push messages
 */
import Api from "config/api.js";
import Http from "config/request.js";

function TabBarRedDot() {
  let promise = new Promise((resolve, reject) => {
    Http.get(
      Api.TABBAR.MESSAGE,
      {},
      res => {
        console.log(
          `getnewreviews success: ${JSON.stringify(res)}`
        );
        resolve(res);
      },
      err => {
        console.log(
          `getnewreviews failed err:${JSON.stringify(err)}`
        );
        reject(err);
      }
    );
  });

  return promise
    .then(data => [data, null])
    .catch(err => {
      reject(err);
    });
}

export function SetTBarMsg() {
  TabBarRedDot()
    .then(res => {
      console.log(`SetTBarMsg`, res, res[0]);
      const dotGather = res[0].dots || [];
      // console.log();
      dotGather.forEach((x, i) => {
        if (x) {
          wx.showTabBarRedDot({
            index: i
          });
        } else {
          wx.hideTabBarRedDot({
            index: i
          });
        }
      });
    })
    .catch(err => {
      console.log(
        `SetTBarMsg tab err ${JSON.stringify(err)}`
      );
    });
}
