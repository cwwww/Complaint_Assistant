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
      <img :src="img" alt />

      <div class="bigContent">
        <div class="sonContent">
          <div class="leftBox">
            <p>我的知识库</p>
            <span>20万条词库</span>
          </div>
          <div class="rightBox">
            <!-- <div class="buttonAnd">
              <p>启用</p>
            </div> -->
          </div>
        </div>
        <div class="bottomBox">
          <div class="bottomFooter">
            <img :src="img" alt />
            <p>保险配置王</p>
          </div>
          <div class="title">
            <!-- <p>福m母公司发生法</p> -->
          </div>
        </div>
      </div>

      <div class="bigContent">
        <div class="sonContent">
          <div class="leftBox">
            <p>我的知识库</p>
            <span>20万条词库</span>
          </div>
          <div class="rightBox">
            <div class="buttonAnd">
              <p>启用</p>
            </div>
          </div>
        </div>
        <div class="bottomBox">
          <div class="bottomFooter">
            <img :src="img" alt />
            <p>保险配置王</p>
          </div>
          <div class="title">
            <p>福m母公司发生法</p>
          </div>
        </div>
      </div>

      <router-view />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "Repository",
  data() {
    return {
      show: false,
      img: require("../assets/images/icon.png")
    };
  },
  methods: {
    changeIndex(i) {
      this.curIndex = i;
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .van-popup {
  overflow: visible;
}
.warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  > .content {
    width: 100%;
    height: 466px;
    background: rgba(255, 255, 255, 1);
    > img {
      display: block;
      width: 65px;
      height: 65px;
      margin: 0 auto;
      margin-top: -31px;

      margin-bottom: 5px;
    }
    > .bigContent {
       width: 305px;
        height: 120px;
        background: rgba(233, 70, 70, 1);
        border-radius: 15px;
        margin: 20px auto 0px auto;
        
      > .sonContent {
       display: flex;
        justify-content: space-between;
        > .leftBox {
          > p {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 28px;
            padding-top: 15px;
            margin-left: 20px;
          }
          > span {
            display: block;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;
            margin-top: 5px;
            margin-left: 20px;
          }
        }
        > .rightBox {
          margin-right: 20px;
          > .buttonAnd {
            width: 85px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border-radius: 16px;
            text-align: center;
            margin-top: 20px;

            line-height: 32;

            > p {
              font-size: 15px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(77, 96, 243, 1);
              line-height: 21px;
              padding-top: 6px;
            }
          }
        }
      }

      > .bottomBox {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        // background-color: aqua;
        > .bottomFooter {
          margin-left: 20px;
          display: flex;
          > img {
            width: 30px;
            height: 30px;
          } 
          > p {
            font-size: 15px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 21px;
            margin-left: 8px;
            margin-top: 5px;
          }
        }
        > .title {
          > p {
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 18px;
            margin-top: 7px;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>