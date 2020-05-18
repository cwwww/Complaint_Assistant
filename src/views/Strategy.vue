<template>
  <div class="warp">
    <div class="topTitle">精灵攻略</div>
    <p>通过以下操作可以获得 金币和 经验哟</p>
    <span>（每日上限15次）</span>
    <div class="content">
      <div class="left">
        <ul>
          <li>
            <img :src="img" alt />
          </li>
          <li>
            <img :src="img1" alt />
          </li>
          <li>
            <img :src="img2" alt />
          </li>
          <li>
            <img :src="img3" alt />
          </li>
          <li>
            <img :src="img4" alt />
          </li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li>和精灵聊天</li>
          <li>增加你的粉丝数量</li>
          <li>在你的知识库里新增知识</li>
          <li>到朋友的事务所去串门</li>
          <li>在商店上架你的知识库供顾客购买</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Stategy",
  data() {
    return {
      img: require("../assets/images/chat@2x.png"),
      img1: require("../assets/images/fans@2x.png"),
      img2: require("../assets/images/add@2x.png"),
      img3: require("../assets/images/goout@2x.png"),
      img4: require("../assets/images/buy@2x.png")
    };
  }
};
</script>
<style lang="scss" scoped>
.warp {
  display: flex;
  flex-direction: column;
  width: 100%;
  // height: 777px;
  background-image: url("../assets/images/bg@2x.png");
  background-size: cover;
  > .topTitle {
    font-size: 41px;
    font-family: STYuanti-SC-Bold, STYuanti-SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 57px;
    text-align: center;
    margin-top: 57px;
  }
  > p {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 21px;
    margin-top: 8px;
    text-align: center;
  }
  > span {
    display: block;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 21px;
    margin-top: 2px;
    text-align: center;
    list-style: none;
  }
  .content {
    width: 335px;
    height: 438px;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    margin: 38px auto 75px auto;
    display: flex;
    > .left {
      > ul {
        margin-left: 30px;
        > li {
          width: 40px;
          height: 35px;
          margin-top: 40px;
          > img {
            width: 40px;
            height: 35px;
          }
          &:first-child {
            margin-top: 45px;
          }
        }
      }
    }
    .right {
      > ul {
        margin-left: 10px;
        > li {
          width: 221px;
          font-size: 17px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: 24px;
          margin-top: 51px;

          &:nth-child(4) {
            margin-top: 49px;
          }
          &:last-child {
            margin-top: 46px;
          }
        }
      }
    }
  }
}
</style>