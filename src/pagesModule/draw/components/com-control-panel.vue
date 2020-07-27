
<!-- 操作台 -->
<template>
  <section id="control_panel" class="control_panel">
    <button>GH Butt</button>
    <ColorPicker></ColorPicker>
    <div class="fixed-bottom bg-primary box-shadow-top">
      <image
        style="width: 160rpx; height: 160rpx; "
        src="https://zyb-yayayuwen-1253445850.cos.ap-beijing.myqcloud.com/yaya-fe/steps/bg_submerge_1.png"
        alt="img"
      />
      <image
        style="width: 160rpx; height: 160rpx; "
        src="https://csdnimg.cn/cdn/content-toolbar/csdnlogo.png"
        alt="img"
      />
      <div class="row text-center m-auto pt-2 text-white" style="width: 440rpx;">
        <div
          class="col p-0"
          :class="{'font-weight-bold': active === 'avatar'}"
          @click="select('avatar')"
        >头像</div>
        <div
          class="col p-0"
          :class="{'font-weight-bold': active === 'photo'}"
          @click="select('photo')"
        >边框</div>
        <div
          class="col p-0"
          :class="{'font-weight-bold': active === 'icon'}"
          @click="select('icon')"
        >贴纸</div>
        <div
          class="col p-0"
          :class="{'font-weight-bold': active === 'text'}"
          @click="select('text')"
        >文字</div>

        <div
          class="col p-0"
          :class="{'font-weight-bold': active === 'text'}"
          @click="select('text')"
        >文字</div>
      </div>

      <a
        class="position-absolute reset bg-primary border-light d-flex justify-content-center align-items-center shadow"
        @click="reset"
      >
        <image
          src="https://zyb-yayayuwen-1253445850.cos.ap-beijing.myqcloud.com/yaya-fe/OWebsite/icon_triangle_white_left.png"
          style="width: 80rpx; height: 80rpx;"
          alt="reset"
        />
      </a>
      <a
        class="position-absolute done bg-primary border-light d-flex justify-content-center align-items-center shadow"
        @click="next"
      >
        <image
          src="https://zyb-yayayuwen-1253445850.cos.ap-beijing.myqcloud.com/yaya-fe/OWebsite/icon_triangle_white_left.png"
          style="width: 80rpx; height: 80rpx;"
          alt="next"
        />
      </a>

      <scroll-view scroll-x class="py-2" style="width: 100vw; height: 224rpx;">
        <div class="d-flex px-2 justify-content-between flex-nowrap px-2">
          <view
            v-for="(item, index) in iconList"
            :item="item"
            :key="item+index"
            class="m-2 p-2 bg-light rounded shadow item"
          >
            {{ item.path }}
            <button
              v-if="item.isAuth"
              open-type="getUserInfo"
              @getuserinfo="getuserinfo"
              style="background-color: transparent;"
            >
              <image
                class="shadow-sm"
                style="width: 160rpx; height: 160rpx; overflow: hidden;"
                src="https://zyb-yayayuwen-1253445850.cos.ap-beijing.myqcloud.com/yaya-fe/steps/bg_submerge_1.png"
                alt="img"
              />
            </button>
            <view v-else @click="select2(index)">
              <image
                style="width: 160rpx; height: 160rpx; overflow: hidden;"
                src="https://zyb-yayayuwen-1253445850.cos.ap-beijing.myqcloud.com/yaya-fe/steps/bg_submerge_1.png"
                alt="img"
              />
            </view>
          </view>
        </div>
      </scroll-view>
    </div>
  </section>
</template>

<script>
import ColorPicker from "@components/common/color-picker/index.vue";
export default {
  name: "ControlPanel",
  props: {},
  components: { ColorPicker },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
