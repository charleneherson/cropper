<template>
  <section>
    <canvas
      class="m-auto rounded shadow"
      style="width: 300px; height: 300px; overflow: hidden;background: linear-gradient(180deg,#f59f9f 10%, #ffdfdf 61%);"
      canvas-id="firstCanvas"
      disable-scroll="true"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      @touchcancel="touchcancel"
    ></canvas>
  </section>
</template>

<script>
export default {
  name: "Frame",
  props: {},
  components: {},
  data() {
    return {
      context: null,
      active: "icon",
      elements: [],
      avatar: {
        x: 0,
        y: 0,
        type: "avatar",
        width: 300,
        height: 300,
        path: "./static/images/avatar/1.png",
        trans: 0,
        zIndex: 0
      },
      photo: {
        x: 0,
        y: 0,
        type: "photo",
        width: 300,
        height: 300,
        path: "./static/images/images/photo/1.png",
        trans: 0,
        zIndex: 0
      },
      icon: {
        id: 0,
        type: "icon",
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        path: "",
        trans: 0,
        zIndex: 0,

        scale: 1,
        translateX: 0,
        translateY: 0,
        rotate: 0,
        active: true
      },
      text: {
        type: "text",
        content: "content",
        width: "",
        height: "",
        fontsize: "",
        color: "",
        zIndex: ""
      },
      touch: {
        delete: -1,
        method: "",
        element: {
          index: 0,
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1
        },
        start: {
          index: 0,
          x: 0,
          y: 0
        },
        move: {
          x: 0,
          y: 0
        }
      },
      avatarList: [
        // {
        //   path: "./static/images/avatar/1.png",
        //   isAuth: true
        // },
        // {
        //   path: "./../../static/images/avatar/2.jpg"
        // },
        // {
        //   path: "./../../static/images/avatar/3.jpg"
        // },
        // {
        //   path: "./../../static/images/avatar/4.jpg"
        // },
        // {
        //   path: "./../../static/images/avatar/5.jpg"
        // },
        // {
        //   path: "./../../static/images/avatar/6.jpg"
        // },
        // {
        //   path: "./../../static/images/avatar/7.jpg"
        // },
        // {
        //   path: "./../../static/images/avatar/8.jpg"
        // },
        // {
        //   path: "./../../static/images/avatar/9.jpg"
        // },
        // {
        //   path: "./../../static/images/avatar/10.jpg"
        // },
        // {
        //   path: "./../../static/images/avatar/11.jpg"
        // }
      ],
      photoList: [
        // {
        //   path: "./../../static/images/photo/1.png"
        // },
        // {
        //   path: "./../../static/images/photo/2.png"
        // },
        // {
        //   path: "./../../static/images/photo/3.png"
        // },
        // {
        //   path: "./../../static/images/photo/4.png"
        // },
        // {
        //   path: "./../../static/images/photo/5.png"
        // },
        // {
        //   path: "./../../static/images/photo/6.png"
        // },
        // {
        //   path: "./../../static/images/photo/7.png"
        // },
        // {
        //   path: "./../../static/images/photo/8.png"
        // },
        // {
        //   path: "./../../static/images/photo/9.png"
        // },
        // {
        //   path: "./../../static/images/photo/10.png"
        // }
      ],
      iconList: [],
      list: null
    };
  },
  computed: {},
  methods: {
    init() {
      let arr = [
        {
          path: `https://csdnimg.cn/cdn/content-toolbar/csdnlogo.png`
        },
        {
          path: `https://csdnimg.cn/cdn/content-toolbar/csdnlogo.png`
        }
      ];
      // for (let i = 1; i <= 30; i++) {
      //   let path = i > 9 ? 'https://image.cloudbooks.cc/image/icon/00' + i + '.png' : 'https://image.cloudbooks.cc/image/icon/000' + i + '.png'
      //   let item = {
      //     path: path
      //   }
      //   arr.push(item)
      // }
      this.iconList = arr;

      console.log(`this.iconList`, this.iconList);

      let textArr = [
        [
          {
            path: `https://zyb-yayayuwen-1253445850.cos.ap-beijing.myqcloud.com/yaya-fe/steps/bg_submerge_1.png`
          },
          {
            path: `https://zyb-yayayuwen-1253445850.cos.ap-beijing.myqcloud.com/yaya-fe/steps/bg_submerge_2.png`
          }
        ]
      ];
      // for (let i = 1; i <= 26; i++) {
      //   let path = i > 9 ? 'https://image.cloudbooks.cc/image/text/00' + i + '.png' : 'https://image.cloudbooks.cc/image/text/000' + i + '.png'
      //   let item = {
      //     path: path
      //   }
      //   textArr.push(item)
      // }
      // this.textList = textArr;
    },
    async drawImage() {
      // 头像
      console.log("drawImage drawImage drawImage drawImage");

      const p = "/../../../static/images/icon/clear.png";
      this.context.drawImage(p, 0 + 100 - 14, 0 + 100 - 14, 100, 100);

      this.context.setStrokeStyle("blue");
      this.context.strokeRect(10, 10, 200, 200);

      await this.context.draw();
    },
    reset() {
      // 初始化
      let _this = this;
      wx.showActionSheet({
        itemList: ["选择照片", "选择头像"],
        success: function(res) {
          console.log(res.tapIndex);
          if (res.tapIndex === 0) {
            wx.navigateTo({
              url: "/pages/cropper/main"
            });
          } else if (res.tapIndex === 1) {
            // _this.getInfo();
          }
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
    },

    touchstart(e) {
      // 判断是偏移, 旋转还是放大
      console.log("touchstart");
      // 触摸的开始值
      this.touch.start.x = e.touches[0].x;
      this.touch.start.y = e.touches[0].y;
      // 初始化触摸的元素
      this.touch.method = "";
      this.touch.element.index = -1;
      this.touch.element.width = 0;
      this.touch.element.height = 0;
      this.touch.element.x = 0;
      this.touch.element.y = 0;
      this.touch.element.scale = 1;
      this.touch.element.rotate = 0;

      // for (let [i, item] of new Map(this.elements.map((item, i) => [i, item]))) {
      for (let i = this.elements.length - 1; i !== -1; i--) {
        let item = this.elements[i];
        // 计算物体旋转之后的位置
        let r = Math.sqrt(2) * (item.width / 2);
        let center = {
          x: 0,
          y: 0
        };
        let del = {
          x: 0,
          y: 0
        };

        let move = {
          x: 0,
          y: 0
        };

        center.x = item.x + item.width / 2;
        center.y = item.y + item.height / 2;

        del.x = center.x + r * Math.sin((Math.PI / 180) * (-45 - item.rotate));
        del.y = center.y - r * Math.cos((Math.PI / 180) * (-45 - item.rotate));

        move.y = center.y + r * Math.sin((Math.PI / 180) * (135 - item.rotate));
        move.x = center.x - r * Math.cos((Math.PI / 180) * (135 - item.rotate));
        if (item && item.active) {
          // 判断删除
          if (
            e.touches[0].x > del.x - 16 &&
            e.touches[0].x < del.x + 16 &&
            e.touches[0].y > del.y - 16 &&
            e.touches[0].y < del.y + 16
          ) {
            this.touch.method = "clear";
            this.touch.delete = i;
            break;
          }

          // 判断旋转放大
          if (
            e.touches[0].x > move.x - 16 &&
            e.touches[0].x < move.x + 16 &&
            e.touches[0].y > move.y - 16 &&
            e.touches[0].y < move.y + 16
          ) {
            console.log("旋转放大");

            this.touch.method = "scale";
            this.touch.element.index = i;
            this.touch.element.width = item.width;
            this.touch.element.height = item.height;

            this.touch.element.x = item.x;
            this.touch.element.y = item.y;

            this.touch.element.scale = item.scale;
            this.touch.element.rotate = item.rotate;
            break;
          }
        }

        if (
          e.touches[0].x > center.x - r &&
          e.touches[0].x < center.x + r &&
          e.touches[0].y > center.y - r &&
          e.touches[0].y < center.y + r
        ) {
          console.log("拖动");
          this.touch.method = "drag";
          this.touch.element.index = i;
          this.touch.element.width = item.width;
          this.touch.element.height = item.height;

          this.touch.element.x = item.x;
          this.touch.element.y = item.y;

          this.touch.element.scaleX = item.scaleX;
          this.touch.element.scaleY = item.scaleY;
          this.touch.element.rotate = item.rotate;
          break;
        }
      }

      // 执行删除命令
      if (this.touch.method === "clear" && this.touch.delete !== -1) {
        this.elements.splice(this.touch.delete, 1);
        this.touch.delete = -1;
      }

      for (let item of this.elements) {
        item.active = false;
      }

      if (
        this.touch.element.index !== -1 &&
        this.touch.element.index < this.elements.length
      ) {
        this.elements[this.touch.element.index].active = true;
      }

      console.log("drawImage");
      this.drawImage();
    },
    touchmove(e) {
      if (this.touch.element.index === -1) {
        return;
      }
      if (this.touch.method === "drag") {
        if (
          e.touches[0].x > 0 &&
          e.touches[0].x < 300 &&
          e.touches[0].y > 0 &&
          e.touches[0].y < 300
        ) {
          this.touch.move.x = e.touches[0].x;
          this.touch.move.y = e.touches[0].y;

          this.elements[this.touch.element.index].x =
            this.touch.element.x + this.touch.move.x - this.touch.start.x;
          this.elements[this.touch.element.index].y =
            this.touch.element.y + this.touch.move.y - this.touch.start.y;
        }
      } else if (this.touch.method === "scale") {
        // 旋转放大中
        this.touch.move.x = e.touches[0].x;
        this.touch.move.y = e.touches[0].y;

        // 放大

        this.elements[this.touch.element.index].x =
          this.touch.element.x - this.touch.move.x + this.touch.start.x;
        this.elements[this.touch.element.index].y =
          this.touch.element.y - this.touch.move.x + this.touch.start.x;

        this.elements[this.touch.element.index].width =
          (this.touch.move.x - this.touch.start.x) * 2 +
          this.touch.element.width;
        this.elements[this.touch.element.index].height =
          (this.touch.move.x - this.touch.start.x) * 2 +
          this.touch.element.height;

        // 中心点的坐标
        let centerX = this.touch.element.x + this.touch.element.width / 2;
        let centerY = this.touch.element.y + this.touch.element.height / 2;

        // 设置原点
        this.elements[this.touch.element.index].translateX = centerX;
        this.elements[this.touch.element.index].translateY = centerY;

        // 触摸前的角度
        let diffXBefore = this.touch.start.x - centerX;
        let diffYBefore = this.touch.start.y - centerY;

        let diffXAfter = this.touch.move.x - centerX;
        let diffYAfter = this.touch.move.y - centerY;

        let angleBefore =
          (Math.atan2(diffYBefore, diffXBefore) / Math.PI) * 180;
        let angleAfter = (Math.atan2(diffYAfter, diffXAfter) / Math.PI) * 180;

        // this.elements[0].scale = distanceAfter / distanceBefore * this.touch.element.scale
        this.elements[this.touch.element.index].rotate =
          angleAfter - angleBefore + this.touch.element.rotate;
        console.log(this.elements[this.touch.element.index].rotate);
        // 触摸后的角度
      }

      this.drawImage();
    },
    touchend(e) {
      if (this.touch.method === "drag") {
        console.log("drag");
      } else if (this.touch.method === "clear") {
        console.log("clear");
      } else if (this.touch.method === "scale") {
        console.log("scale");
      }
    },
    touchcancel(e) {
      console.log("touchcancel");
    },
    delete() {
      console.log("delete");
      if (this.touch.method === "clear" && this.touch.delete !== -1) {
        this.elements.splice(this.touch.delete, 1);
        this.touch.delete = -1;
      }
      this.drawImage();
    },
    add() {
      console.log("add");
    }
  },
  mounted() {
    // 初始化数组
    this.init();
    this.context = wx.createCanvasContext("firstCanvas", this);
    // this.context.setStrokeStyle("blue");
    // this.context.strokeRect(10, 10, 150, 75);

    this.drawImage();
    console.log("Done Done drawImage drawImage drawImage");

    wx.showLoading();
    setTimeout(() => {
      wx.canvasToTempFilePath(
        {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          destWidth: 300,
          destHeight: 400,
          canvasId: "firstCanvas",
          success: function(res) {
            console.log(`canvasToTempFilePath suc `, res.tempFilePath);
            wx.hideLoading();
            // wx.navigateTo({
            //   url:
            //     "/pages/share/main?path=" + res.tempFilePath
            // });
          },
          fail: function(res) {
            console.log(`canvasToTempFilePath fail `, res);
          }
        },
        this
      );
    }, 200);
  }
};
</script>

<style lang="less" scoped>
</style>
