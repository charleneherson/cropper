import CashierOfChineseSDK from "@common/js/pay-config";
import { pollingStrategy } from "@common/js/utils";
import jumpPage from "@common/js/jumpPage";
import { getLastFrom } from "@common/js/yuwen-log";
const LASTFROM = getLastFrom();

export default {
  data() {
    return {
      oCheckStandData: {},
      expireTime: 0, // 订单过期时间
      minutesTime: "", // 分钟数
      secondsTime: "", //秒数
      oConfirmDialogData: {
        buttonType: "single",
        bHintVisible: false,
        title: "提示",
        cancalBtnText: "",
        continueBtnText: "知道了",
        contentText: "提示内容",
      },
      countdownTimer: null,
    };
  },
  methods: {
    navigatorBack() {
      this.setConfirmText(
        "double",
        true,
        "提示",
        "取消",
        "确认",
        "是否放弃本次付款"
      );
    },
    navigateToOrderDetail(orderId) {
      let url = `${process.env.VUE_APP_BASE_HOST}/static/hy/duck-turbo/order-detail.html?tradeId=${orderId}&lastfrom=${LASTFROM}`;
      jumpPage({
        url: `/pagesModule/common-web-view/common-web-view?url=${encodeURIComponent(
          url
        )}`,
      });
    },
    async paymentSubmitConfirm() {
      uni.showLoading({
        title: "等待结果中",
      });
      // 2 收银台
      console.log("-------this.oCheckStandData Mixin", this.oCheckStandData);
      const { authServer, sign, timestamp, requestNo } = this.oCheckStandData;
      // 3 支付SDK实例化
      let cashier = new CashierOfChineseSDK(authServer);
      console.log("sdk=======", cashier);
      //4 支付SDK获取支付列表
      let getListRes = await cashier.getPayList({
        sign,
        timestamp,
        requestNo,
      });
      console.log("getListRes------", getListRes);
      if (getListRes.errNo !== 0) {
        this.setConfirmText(
          "single",
          true,
          "提示",
          "",
          "知道了",
          getListRes.errstr
        );
        uni.hideLoading();
        return;
      }
      uni.hideLoading();
      // 5 支付SDK调起微信支付
      let payRes = await cashier.pay({ orderId: this.orderId, requestNo });
      console.log("payRes----", payRes);
      if (payRes.errNo !== 0) {
        this.setConfirmText(
          "single",
          true,
          "提示",
          "",
          "知道了",
          payRes.errstr
        );
        return;
      }
      uni.showLoading({
        title: "等待结果中",
      });
      // 6 支付结果轮询，1 查、2 等3s、3 查、4 等3s、5 查
      this.getPayStatus(this.orderId).then((res) => {
        this.statusUpdate(res.status);
      });
    },

    statusUpdate(status) {
      if (status === 0) {
        // 支付不成功
        pollingStrategy(
          this.getPayStatus,
          3000,
          2,
          1,
          2
        )(this.orderId).then((res) => {
          let { status } = res;
          if (status === "SUCCESS") {
            uni.hideLoading();
            jumpPage({
              url: `/pagesModule/common-web-view/common-web-view?url=${encodeURIComponent(
                `${process.env.VUE_APP_BASE_HOST}/static/hy/duck-turbo/completion-of-payment.html?orderId=${this.orderId}`
              )}`,
            });
          }
          if (status === "TIMEOUT") {
            this.setConfirmText(
              "double",
              true,
              "提示",
              "稍后查看",
              "再次查询",
              "暂未查询到支付结果"
            );
            uni.hideLoading();
            return;
          }
          if (status === "OTHER") {
            this.setConfirmText(
              "single",
              true,
              "提示",
              "",
              "知道了",
              "该订单已关闭"
            );
            uni.hideLoading();
          }
        });
      } else if (status === 1) {
        // 下单成功
        uni.hideLoading();
        jumpPage({
          url: `/pagesModule/common-web-view/common-web-view?url=${encodeURIComponent(
            `${process.env.VUE_APP_BASE_HOST}/static/hy/duck-turbo/completion-of-payment.html?orderId=${this.orderId}`
          )}`,
        });
      } else {
        // 关单
        this.setConfirmText(
          "single",
          true,
          "提示",
          "",
          "知道了",
          "该订单已关闭"
        );
        uni.hideLoading();
      }
    },
    async getCheckStand() {
      return this.$http.pro_get("/kid-chinese/purchase/simplecashier", {
        isMiniApp: 1,
        orderId: this.orderId,
      });
    },
    // 获取confirm弹窗文案
    setConfirmText(
      buttonType,
      bHintVisible,
      title,
      cancalBtnText = "",
      continueBtnText = "知道了",
      contentText = "提示内容"
    ) {
      this.oConfirmDialogData.buttonType = buttonType;
      this.oConfirmDialogData.bHintVisible = bHintVisible;
      this.oConfirmDialogData.title = title;
      this.oConfirmDialogData.cancalBtnText = cancalBtnText;
      this.oConfirmDialogData.continueBtnText = continueBtnText;
      this.oConfirmDialogData.contentText = contentText;
    },
    // 轮询是否成功
    getPayStatus(orderId) {
      return this.$http.pro_get("/kid-chinese/purchase/checkpaystatus", {
        orderId: orderId,
        saleChannelId: this.saleChannelId,
      });
    },
    goContinue() {
      if (this.oConfirmDialogData.continueBtnText === "查看订单") {
        this.navigateToOrderDetail(this.orderId);
      }
      if (
        this.oConfirmDialogData.continueBtnText === "知道了" ||
        this.oConfirmDialogData.continueBtnText === "取消"
      ) {
        this.oConfirmDialogData.bHintVisible = false;
        this.getPrepaymentList();
      }
      if (this.oConfirmDialogData.continueBtnText === "再次查询") {
        this.oConfirmDialogData.bHintVisible = false;
        uni.showLoading({
          title: "查询结果中",
        });
        this.getPayStatus(this.orderId).then((res) => {
          this.statusUpdate(res.status);
        });
      }
      if (this.oConfirmDialogData.continueBtnText === "重新下单") {
        uni.redirectTo({
          url: `/pagesModule/submit-order-fragment/submit-order?skuId=${this.skuId}`,
        });
      }
      if (
        this.oConfirmDialogData.continueBtnText === "确认" ||
        this.oConfirmDialogData.continueBtnText === "确定"
      ) {
        uni.navigateBack();
      }
    },
    cancelClick() {
      if (
        this.oConfirmDialogData.cancalBtnText === "确定" ||
        this.oConfirmDialogData.cancalBtnText === "确认"
      ) {
        uni.navigateBack();
      }
      if (this.oConfirmDialogData.cancalBtnText === "取消") {
        this.oConfirmDialogData.bHintVisible = false;
      }
      if (this.oConfirmDialogData.cancalBtnText === "稍后查看") {
        // 跳转订单详情
        this.navigateToOrderDetail(this.orderId);
      }
    },
    // allCount 为秒数
    countdownInit(allCount) {
      return new Promise((resolve) => {
        if (parseInt(allCount) <= 0) {
          this.minutesTime = "--";
          this.secondsTime = "--";
          resolve("ZERO");
        }
        this.minutesTime = parseInt(parseInt(allCount) / 60);
        this.secondsTime = parseInt(parseInt(allCount) % 60);
        this.minutesTime =
          this.minutesTime.toString().length !== 1
            ? this.minutesTime.toString()
            : "0" + this.minutesTime;
        this.secondsTime =
          this.secondsTime.toString().length !== 1
            ? this.secondsTime.toString()
            : "0" + this.secondsTime;
        this.countdownTool();
      });
    },
    countdownTool() {
      let _this = this;
      let nextSecond = (parseInt(_this.secondsTime) - 1).toString();
      _this.secondsTime =
        nextSecond.length === 1 ? "0" + nextSecond : nextSecond;
      if (
        parseInt(_this.secondsTime) <= 0 &&
        parseInt(_this.minutesTime) !== 0
      ) {
        let nextMinute = (parseInt(_this.minutesTime) - 1).toString();
        _this.minutesTime =
          nextMinute.length === 1 ? "0" + nextMinute : nextMinute;
        _this.secondsTime = "59";
      }
      this.countdownTimer = setTimeout(function() {
        if (
          parseInt(_this.secondsTime) === 0 &&
          parseInt(_this.minutesTime) === 0
        ) {
          _this.setConfirmText(
            "single",
            true,
            "提示",
            "",
            "重新下单",
            "订单已过期，请您重新下单"
          );
          _this.$emit("countdownFinish");
          return;
        } else {
          _this.countdownTool();
        }
      }, 1000);
    },
  },
};
