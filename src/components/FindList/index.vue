<template>
  <div>
    <van-cell is-link @click="showPopup">上划</van-cell>
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div>
        <img class="topLogon" :src="img" alt />
        <div class="search">
          <input type="text" placeholder="输入用户昵称查找更多朋友" />
          <img :src="img4" alt />
        </div>

        <div class="findCheack">
          <div class="states">
            <div class="show"></div>
            <span>在线</span>
            <div class="isShow"></div>
            <p>不在线</p>
          </div>
          <div class="rightTitles">
            <img :src="img3" alt />
            <span>换一批</span>
          </div>
        </div>

        <div>
          <div class="warp">
            <div class="left">
              <div class="littleLeft">
                <img :src="img" alt />
                <div class="show"></div>
              </div>
              <div class="littleRight">
                <div class="topTitle">
                  <span>
                    Walker
                  </span>
                  <div class="lelve">
                    <p>Lv.35</p>
                  </div>
                  <div class="dengji">
                    <img :src="img2" alt />
                  </div>
                </div>
                <div class="bottom">
                  <div class="biaoqian">
                    <p>定积分赚钱啦</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <img :src="img1" alt />
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "FindList",
  data() {
    return {
      value: "",
      show: false,
      img: require("../../assets/images/金牌@2x.png"),
      img1: require("../../assets/images/next@2x.png"),
      img2: require("../../assets/images/等级-保险配置王@2x.png"),
      img3: require("../../assets/images/change@2x.png"),
      img4: require("../../assets/images/search@2x.png")
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
/deep/ .van-popup {
  overflow: visible;
}
.topLogon {
  display: block;
  width: 65px;
  height: 65px;
  margin: 0 auto;
  margin-top: -31px;
}
.search {
  width: 335px;
  height: 42px;
  border-radius: 4px;
  margin: 25px auto 0 auto;
  position: relative;
  > input {
    width: 335px;
    height: 42px;
    outline: none;
    border: none;
    background: rgba(239, 239, 239, 1);
    border-radius: 4px;
    text-indent: 2.5em;
    font-size: 15px;
  }
  > img {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 12px;
    top: 13px;
  }
}
.findCheack {
  margin: 0 auto;
  width: 335px;
  display: flex;
  justify-content: space-between;
  > .states {
    display: flex;
    > .show {
      width: 12px;
      height: 12px;
      background: linear-gradient(
        133deg,
        rgba(45, 204, 132, 1) 0%,
        rgba(30, 210, 100, 1) 100%
      );
      border: 2px solid rgba(255, 255, 255, 1);
      margin-top: 23px;
      border-radius: 50%;
    }
    > .isShow {
      width: 12px;
      height: 12px;
      background: linear-gradient(
        133deg,
        rgba(225, 239, 246, 1) 0%,
        rgba(184, 195, 210, 1) 100%
      );
      border: 2px solid rgba(255, 255, 255, 1);
      margin-top: 23px;
      margin-left: 10px;
      border-radius: 50%;
    }
    > span {
      margin-top: 23px;
      display: block;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      margin-left: 2px;
    }
    > p {
      margin-top: 23px;
      margin-left: 2px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
    }
  }
  > .rightTitles {
    display: flex;
    margin-top: 23px;
    > img {
      display: block;
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
    > span {
      display: block;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 17px;
    }
  }
}

.warp {
  width: 335px;
  height: 80px;
  margin: 0 auto;
  border-top: solid 1px rgba(239, 239, 239, 1);
  border-bottom: solid 1px rgba(239, 239, 239, 1);
  display: flex;
  justify-content: space-between;
  margin-top: 17px;

  > .left {
    display: flex;
    > .littleLeft {
      margin-top: 15px;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      position: relative;
      > img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
      }
      > .show {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        background: linear-gradient(
          133deg,
          rgba(45, 204, 132, 1) 0%,
          rgba(30, 210, 100, 1) 100%
        );
        border: 2px solid rgba(255, 255, 255, 1);
        border-radius: 50%;
      }
    }
    > .littleRight {
      > .topTitle {
        // margin-top: 3px;
        display: flex;
        > span {
          margin-left: 8px;
          margin-top: 18px;
          display: block;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
        > .lelve {
          height: 17px;
          background: linear-gradient(
            139deg,
            rgba(255, 186, 79, 1) 0%,
            rgba(255, 146, 13, 1) 100%
          );
          border-radius: 2px;
          margin-left: 5px;
          margin-top: 19px;
          > p {
            padding: 1px 3px 1px 3px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;
          }
        }
        > .dengji {
          margin-left: 5px;
          margin-top: 19px;
          width: 80px;
          height: 18px;
          > img {
            width: 80px;
            height: 18px;
          }
        }
      }
      > .bottom {
        display: flex;
        > .biaoqian {
          margin-left: 8px;
          margin-top: 3px;
          background: rgba(236, 247, 255, 1);
          border-radius: 11px;
          > p {
            padding: 2px 8px 3px 8px;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(0, 134, 231, 1);
            line-height: 17px;
          }
        }
      }
    }
  }
  > .right {
    width: 18px;
    height: 18px;
    margin-top: 31px;
    > img {
      width: 18px;
      height: 18px;
    }
  }
}
</style>





