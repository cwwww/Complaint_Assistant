<template>
  <div class="warp">
    <van-cell is-link @click="showPopup">上划</van-cell>
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <span>谁看过我</span>
      <div class="line"></div>
      <div class="centerContent">
        <div class="loginImg">
          <img :src="img" alt />
        </div>
        <div class="rightContent">
          <div class="leftText">
            <div class="topTitle">王兰</div>
            <div class="bottomTime">2020-10-29 08:23</div>
          </div>
          <div class="rightPink">
            <img :src="img" alt />
            <p>99</p>
          </div>
          <div class="borderLine"></div>
        </div>
      </div>
      <router-view />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "WhoLookMe",
  data() {
    return {
      curIndex: 0,
      show: false,
      img: require("../assets/images/Group@2x.png")
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  > .content {
    width: 100%;
    height: 100%;
    > span {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 24px;
      display: block;
      text-align: center;
      margin-top: 10px;
    }
    > .line {
      width: 100%;
      height: 6px;
      background: rgba(245, 245, 245, 1);
      margin-top: 10px;
      margin-bottom: 16px;
    }
    > .centerContent {
      height: 60px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;
      > .loginImg {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-left: 15px;
        > img {
          width: 60px;
          height: 60px;
          display: block;
          border-radius: 50%;
        }
      }
      > .rightContent {
        position: relative;
        width: 279px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 8px;
        > .leftText {
          > .topTitle {
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(74, 74, 74, 1);
            line-height: 22px;
          }
          > .bottomTime {
            font-size: 14px;
            font-family: SFUIText-Regular, SFUIText;
            font-weight: 400;
            color: rgba(155, 155, 155, 1);
            line-height: 22px;
            margin-top: 5px;
          }
        }
        > .rightPink {
          display: flex;
          align-items: center;
          > img {
            display: block;
            width: 22px;
            height: 22px;
            margin-right: 4px;
          }
          > p {
            margin-right: 19px;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 98, 143, 1);
            line-height: 17px;
          }
        }
        > .borderLine {
          width: 279px;
          height: 3px;
          background-color: #efefef;
          position: absolute;
          bottom: -13px;
          left: 0;
        }
      }
    }
  }
}
</style>