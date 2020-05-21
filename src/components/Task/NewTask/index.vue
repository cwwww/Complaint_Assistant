<template>
  <div class="wrap">
    <div class="content">
      <div class="leftBox">
        <div class="leftLogon">
          <img :src="img" alt />
        </div>
        <div class="textContent">
          <span>每日登陆</span>
          <p>连续登陆第五天</p>
        </div>
      </div>
      <div class="rightBox">
        <div class="topTitle">
          <div class="leftImg">
            <img :src="img1" alt />
          </div>
          <p>+4000</p>
          <div class="rightImg">
            <img :src="img2" alt />
          </div>
          <span>+10</span>
        </div>
        <div class="bottomButton">
          <p>领取</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTaskList } from "../../../axios/axios-api";
export default {
  name: "NewTask",
  data() {
    return {
      EverudayList: [],
      img: require("../../../assets/images/login@2x.png"),
      img1: require("../../../assets/images/jingyan.png"),
      img2: require("../../../assets/images/jignhangs.png")
    };
  },
  mounted() {
    let param = {
  "robot_id": 33,
  "broker_id":33,
  "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
};
    console.log(param);
    let result = getTaskList(param);
    result
      .then(res => {
        this.EverudayList = res.result;
        console.log(this.EverudayList, "每日任务");
      })
      .catch(reslove => {
        alert(66666);
        console.log("error");
      });
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .content {
    margin-top: 12px;
    width: 335px;
    height: 100px;
    background: rgba(245, 160, 21, 1);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    > .leftBox {
      display: flex;
      > .leftLogon {
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        margin-top: 25px;
        margin-left: 15px;
        > img {
          width: 30px;
          height: 30px;
          margin: 10px;
        }
      }
      > .textContent {
        margin-left: 5px;
        > span {
          margin-top: 29px;
          display: block;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 21px;
        }
        > p {
          margin-top: 4px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
        }
      }
    }
    > .rightBox {
      margin-right: 15px;

      > .topTitle {
        display: flex;
        margin-top: 23px;
        > .leftImg {
          width: 18px;

          height: 18px;
          margin-right: 1px;
          > img {
            width: 18px;
            height: 18px;
          }
        }
        > p {
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 17px;
          margin-right: 7px;
        }
        > .rightImg {
          width: 15px;
          height: 20px;
          margin-right: 1px;
          > img {
            width: 15px;
            height: 20px;
          }
        }
        > span {
          display: block;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 17px;
        }
      }
      > .bottomButton {
        width: 80px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border-radius: 16px;
        float: right;
        margin-top: 8px;
        > p {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(245, 160, 21, 1);
          line-height: 21px;
          text-align: center;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>