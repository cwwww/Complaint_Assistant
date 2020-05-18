<template>
  <div>
    <div>
      <div class="warp">
        <div class="left">
          <div class="littleLeft">
            <img :src="img" alt />
          </div>
          <div class="littleRight">
            <div class="topTitle">
              <span>
                Walker
                <!-- {{item.h}} -->
              </span>
              <div class="lelve">
                <p>Lv.35</p>
              </div>
              <div class="dengji">
                <img :src="img2" alt />
              </div>
            </div>
            <div class="bottom">
              <!-- <div class="biaoqian">
                <p>顶级流量</p>
              </div>-->
              <div class="biaoqian">
                <p>定积分赚钱啦</p>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <span>关注</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Bean",
  data() {
    return {
      img: require("../../../assets/images/金牌@2x.png"),
      img2: require("../../../assets/images/等级-保险配置王@2x.png")
    };
  }
};
</script>
<style lang="scss" scoped>
.warp {
  width: 335px;
  height: 80px;
  //   background-color: aqua;
  margin: 0 auto;
  border-top: solid 1px rgba(239, 239, 239, 1);
  border-bottom: solid 1px rgba(239, 239, 239, 1);
  display: flex;
  justify-content: space-between;

  > .left {
    display: flex;
    > .littleLeft {
      margin-top: 15px;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      > img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
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
    margin-top: 24px;
    width: 70px;
    height: 32px;
    background: rgba(0, 147, 253, 1);
    border-radius: 16px;
    > span {
      display: block;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 32px;
      text-align: center;
    }
  }
}
</style>