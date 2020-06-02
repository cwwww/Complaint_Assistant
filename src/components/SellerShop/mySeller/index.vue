<template>
  <div>
    <div class="main" v-if="list.length>0">
      <div class="wrap" v-for="(i, index) in list" :key="index">
        <div class="left">
          <div class="leftBigLogon">
            <img :src="i.head_icon" v-show="i.head_icon != null" alt />
            <img :src="headUrl" v-show="i.head_icon == null" alt />
          </div>
          <div class="content">
            <div class="topTitle">
              <!-- <span>{{i.buyer_name}}</span> -->
              <span>{{i.buyer_name}}</span>
              <div class="lelve">购买了你的{{i.goods_name}}</div>
            </div>
          </div>
        </div>
        <div class="got">
          <img :src="money" alt />
          <div>{{i.goods_price}}</div>
        </div>
        <div class="rightLogin" @click="toHomeOther(item.robot_id)">
          <img :src="img1" alt />
        </div>
      </div>
    </div>
    <div v-else style="margin-top:50%">
      <center>
        <font size="3px" color="#999999">哎呀！还没有人买过你的商品噢😢</font>
      </center>
    </div>
  </div>
</template>
<script>
import { reqShowHistory } from "../../../axios/axios-api";

export default {
  name: "mySeller",
  data() {
    return {
      list: [],
      vipShop: require("../../../assets/images/包月会员@2x.png"),
      img1: require("../../../assets/images/next@2x.png"),
      money: require("../../../assets/images/money@2x.png"),
      headUrl: require("../../../assets/images/默认头像@2x.png")
    };
  },
  props: ["broker_id_prop", "robot_id_prop", "token_prop"],
  methods: {
    toHomeOther(robot_id) {
      this.$router.push({
        path: "/HomeOther",
        query: {
          robot_id: this.robot_id_prop,
          broker_id: this.broker_id_prop,
          robot_visitId: robot_id,
          token: this.token_prop
        }
      });
    }
  },
  mounted() {
    let param = {
      robot_id: this.robot_id_prop,
      user_id: this.broker_id_prop,
      token: this.token_prop
      // robot_id: 33,
      // user_id: 33,
      // token: "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqZmZrVToyNk1NajVuOW1RSVpkU1dkRXdxbEY3NkxKRUU.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9UQTVPVGs0T0RZdU5UWXdNREF5Tm4wOjFqZmZrVTpFV0UxcTFiLVM3VXpFWnFub0ZWbmtxX2N1NG8.8ac7a581223587bff27fb3370b9d16a3"
    };

    let res = reqShowHistory(param);
    res
      .then(res => {
        this.list = res.result.sales_history;
        console.log(this.list);
      })
      .catch(reslove => {
        console.log("error");
      });
  }
};
</script>
<style lang="scss" scoped>
.main {
  height: 350px;
  overflow-y: auto;
  margin-top: 12px;
}
.wrap {
  width: 314px;
  height: 80px;
  background: rgba(240, 243, 247, 1);
  border-radius: 8px;
  margin-top: 25px;
  margin-left: 41px;
  display: flex;
  justify-content: space-between;
  position: relative;
  > .left {
    display: flex;
    margin-left: 15px;
    margin-top: 15px;
    > .leftBigLogon {
      // margin-top: 15px;
      width: 50px;
      height: 50px;
      > img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
      }
    }
    > .content {
      > .topTitle {
        margin-top: -2px;
        // display: flex;
        font-weight: 500;
        > span {
          margin-left: 10px;
          display: block;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
        > .lelve {
          white-space: nowrap;
          margin-left: 10px;
          color: #999;
          margin-top: 6px;
        }
        > .dengji {
          margin: 3px 0 3px 10px;
          width: 187px;
          height: 18px;
          display: flex;
          .dengji2 {
            margin-left: 8px;
            color: #999;
          }
          > img {
            width: 80px;
            height: 18px;
          }
        }
      }
    }
  }
  .got {
    display: flex;
    margin: 29px 0 0 47px;
    img {
      width: 22px;
      height: 22px;
    }
    > div {
      margin-left: 3px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(251, 177, 27, 1);
      line-height: 21px;
    }
  }
  > .rightLogin {
    margin: 31px 10px 0 0;
    img {
      width: 18px;
      height: 18px;
    }
  }
}
.bottomLine {
  width: 335px;
  height: 1px;
  background: rgba(239, 239, 239, 1);
  margin: 15px auto 0px auto;
}
</style>