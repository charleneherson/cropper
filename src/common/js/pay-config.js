/**
 * 对Cashier进行封装；将鸭鸭语文小程序必要参数写为固定，抛出必传参数，在调用时给到即可；
 */
import Cashier from "sdk_cashier/wechat/index";
import { getwxuser } from "./wxlogin";
import { getzybuss } from "./login";

// 微信小程序接入 文档请参考：http://ued.zuoyebang.cc/documents/sdk_cashier/#/./docs/wxpayDocs/index

class CashierOfChineseSDK extends Cashier {
  constructor(authServer) {
    super({
      mode: 1,
      appChannel: "miniapp-dyyw",
      source: "zybdy_yuwen",
      authServer: authServer, // from back end
      baseUrl: process.env.VUE_APP_BASE_HOST,
      subSource: "dyywsanheyi",
    });
  }
  getPayList(payListOptionsFromBE) {
    let payListOptions = {
      mode: 1,
      // orderId: "", // from back end
      sign: "", //from back end
      timestamp: 0, // from back end
      requestNo: "", //from back end
      wxUser: getwxuser(),
      zybuss: getzybuss(),
      ...payListOptionsFromBE,
    };
    console.log("--------payListOptions---", payListOptions);
    return super.getPayList(payListOptions);
  }
  pay(payOptionsFromBE) {
    let orderId = payOptionsFromBE.orderId;
    let payOptions = {
      mode: 1,
      orderId: "", // from back end
      requestNo: "", // from back end
      returnUrl: `/pagesModule/common-web-view/common-web-view?url=${encodeURIComponent(
        `${process.env.VUE_APP_BASE_HOST}/static/hy/duck-turbo/completion-of-payment.html?orderId=${orderId}`
      )}`, // 支付成功页面的URL
      wxUser: getwxuser(),
      zybuss: getzybuss(),
      ...payOptionsFromBE,
    };
    console.log("----payOptions---", payOptions);
    return super.pay(payOptions);
  }
}

export default CashierOfChineseSDK;
