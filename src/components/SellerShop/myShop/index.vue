<template>
  <div>
    <!-- 人气 -->
    <div class="main">
      <div class="wrap">
        <div class="left">
          <div class="leftBigLogon">
            <img :src="product_zsk" alt />
          </div>
          <div class="content">
            <div class="topTitle">
              <span>{{goodsList.name}}</span>
              <div class="dengji">
                <img :src="levelbx" alt />
                <div class="dengji2">{{goodsList.amount}}条词库</div>
              </div>
              <div class="lelve">知识库越多精灵越聪明！</div>
            </div>
            <div class="money">
              <img :src="money" alt />
              <span style="margin: 0 10px 0 5px;">{{goodsList.price}}</span>
              <p>
                重新上架可
                <span>{{goodsList.price_change}}</span>
              </p>
            </div>
            <div class="bottom">
              <van-rate v-model="star" color="#FFAD25" gutter="2px" readonly />
            </div>
          </div>
        </div>
        <!-- 上架 -->
        <div class="rightLogin" v-show="!this.isStatus" @click="putaway" type="text">
          <div>上架</div>
        </div>
        <!-- 下架 -->
        <div class="rightLogin2" v-show="this.isStatus" @click="move" type="text">
          <div>下架</div>
        </div>
      </div>
      <div class="bottomLine"></div>
    </div>
  </div>
</template>
<script>
import {
  reqMyShop,
  reqPutOnShelves,
  reqPutOffShelves,
  reqtaskStatus
} from "../../../axios/axios-api";
import { Toast } from "vant";
export default {
  name: "myShop",
  data() {
    return {
      isStatus: Boolean,
      goodsList: [],
      homeInit: Object,
      bxdj: "",
      levelbx: "",
      homeLevel: "",
      star: "",
      isStatus: "",
      value: 0,
      fairyStatus: "",
      img: require("../../../assets/images/icon.png"),
      shop: require("../../../assets/images/shop@2x.png"),
      home_zsk: require("../../../assets/images/home_zsk@2x.png"),
      product_zsk: require("../../../assets/images/product_zsk@2x.png"),
      home_store: require("../../../assets/images/home_store@2x.png"),
      home_browse: require("../../../assets/images/home_browse@2x.png"),
      home_chatrecord: require("../../../assets/images/home_chatrecord@2x.png"),
      home_rankinglist: require("../../../assets/images/home_rankinglist@2x.png"),
      home_medal: require("../../../assets/images/home_medal@2x.png"),
      home_discover: require("../../../assets/images/home_discover@2x.png"),
      home_mytask: require("../../../assets/images/home_mytask@2x.png"),
      home_risktest: require("../../../assets/images/home_risktest@2x.png"),
      home_planbook: require("../../../assets/images/home_planbook@2x.png"),
      moon: require("../../../assets/images/moon@2x.png"),
      bebot: require("../../../assets/images/bebot@2x.png"),
      earth: require("../../../assets/images/earth@2x.png"),
      experience: require("../../../assets/images/experience@2x.png"),
      line: require("../../../assets/images/jindu@2x.png"),
      famous: require("../../../assets/images/famous@2x.png"),
      money: require("../../../assets/images/money@2x.png"),
      levelbx1: require("../../../assets/images/等级-保险新手@2x.png"),
      levelbx2: require("../../../assets/images/等级-保险复读机@2x.png"),
      levelbx3: require("../../../assets/images/等级-保险条款王@2x.png"),
      levelbx4: require("../../../assets/images/等级-保险配置王@2x.png"),
      levelbx5: require("../../../assets/images/等级-保险百科@2x.png"),
      levelbx6: require("../../../assets/images/等级-保险大咖@2x.png"),
      levelbx7: require("../../../assets/images/等级-保险名人堂@2x.png"),
      nextpage: require("../../../assets/images/nextpage@2x.png"),
      nextpage2: require("../../../assets/images/上一页@2x.png"),
      success: require("../../../assets/images/success@2x.png")
    };
  },
  props: ["broker_id_prop", "robot_id_prop", "token_prop"],
  methods: {
    //上架
    putaway() {
      let param = {
        goods_id: this.goodsList.id,
        robot_id: 93 || this.robot_id_prop,
        user_id: 93 || this.broker_id_prop,
        token:
          "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqZXg3VDowZHo1d0pIQjVxbTh6WmI4MWhVVVhmNnV5Nkk.ZXlKUVNFOU9SU0k2SWpFNE1qRXdNRGt4T0Rnd0lpd2lTVVFpT2prekxDSnBZWFFpT2pFMU9UQTRNamd6TXpFdU56VXlORGd3TTMwOjFqZXg3VDpnQVJNdGhFYkZDM0I4ZXVTZ1lJN2w4QXN0Snc.7f927d6cc7ad46abb0be8e52483a6d02" ||
          this.token_prop
      };
      let res = reqPutOnShelves(param);
      res
        .then(res => {
          console.log(res);
          if (res.result.status == 0) {
            Toast("上架成功");
            this.isStatus = true;
            //上架成功获取经验和金币
            this.getReqtaskStatus();
          } else if (res.result.status == 1) {
            Toast("知识库条数少于10,不能上架");
          }
        })
        .catch(reslove => {
          console.log("error");
        });
    },

    //上架商品任务
    getReqtaskStatus() {
      let param = {
        operation_type: 3,
        robot_id: this.robot_id_prop,
        broker_id: this.broker_id_prop,
        token: this.token_prop
      };

      console.log("任务的param:" + param);
      let result = reqtaskStatus(param);
      result
        .then(res => {
          // //更新金币
          // this.homeInit.bcoin = res.result.bcoin;
          // //更新等级
          // this.homeInit.level = res.result.level
          // //更新“我的”经验
          // this.homeInit.exp = res.result.exp
          // //更新总经验
          // this.homeInit.level_exp = res.result.level_exp
          // //任务状态为“1”表示任务已经完成，可以领取奖励，任务图标右上角有个“新”字
          // this.showNewIcon = res.result.task_notification;
        })
        .catch(reslove => {
          console.log("error");
        });
    },

    //下架
    move() {
      let param = {
        goods_id: this.goodsList.id,
        robot_id: this.robot_id_prop,
        user_id: this.broker_id_prop,
        token: this.token_prop
      };

      let res = reqPutOffShelves(param);
      res
        .then(res => {
          console.log(res);
          if (res.result.status == 0) {
            Toast("下架成功");
            this.isStatus = false;
            this.initShop();
          }
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    initShop() {
      let param = {
        robot_id: this.robot_id_prop,
        user_id: this.broker_id_prop,
        token: this.token_prop
      };
      let res = reqMyShop(param);
      res
        .then(res => {
          var that = this;
          that.goodsList = res.result.goods_list[0];
          console.log(that.goodsList);
          if (that.goodsList.status == 1) {
            that.goodsList.status = "下架";
            this.isStatus = true;
          } else {
            that.goodsList.status = "上架";
            this.isStatus = false;
          }
          if (that.goodsList.level == 1) {
            //保险等级
            that.levelbx = this.levelbx1;
          } else if (that.goodsList.level == 2) {
            that.levelbx = this.levelbx2;
          } else if (that.goodsList.level == 3) {
            that.levelbx = this.levelbx3;
          } else if (that.goodsList.level == 4) {
            that.levelbx = this.levelbx4;
          } else if (that.goodsList.level == 5) {
            that.levelbx = this.levelbx5;
          } else if (that.goodsList.level == 6) {
            that.levelbx = this.levelbx6;
          } else if (that.goodsList.level == 7) {
            that.levelbx = this.levelbx7;
          }
          this.star = that.goodsList.score;
        })
        .catch(reslove => {
          console.log("error");
        });
    }
  },
  mounted() {
    this.initShop();
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
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  > .left {
    display: flex;
    margin-left: 20px;
    margin-top: 8px;
    > .leftLittleLogon {
      margin-top: 12px;
      > img {
        width: 23px;
        height: 27px;
      }
    }
    > .leftBigLogon {
      // margin-left: 10px;
      width: 50px;
      height: 50px;
      > img {
        width: 50px;
        height: 50px;
      }
    }
    > .content {
      > .topTitle {
        margin-top: -3px;
        // display: flex;
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
      .money {
        display: flex;
        margin: 5px 0 6px 8px;
        > img {
          width: 16px;
          height: 16px;
          margin-top: 2px;
        }
        span {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(251, 177, 27, 1);
          line-height: 21px;
          p {
            font-size: 11px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 16px;
            color: #666;
            > span {
              margin: 0;
            }
          }
        }
      }
      > .bottom {
        margin-top: 3px;
        margin-left: 8px;
        display: flex;
        > div img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  > .rightLogin {
    width: 80px;
    height: 32px;
    background: rgba(0, 147, 253, 1);
    border-radius: 16px;
    margin: 17px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      width: 16px;
      height: 16px;
    }
    > div {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
      margin-left: 2px;
    }
  }
  > .rightLogin2 {
    width: 80px;
    height: 32px;
    background: #fff;
    border: 1px solid #0093fd;
    border-radius: 16px;
    margin: 17px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 16px;
      height: 16px;
    }
    > div {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #0093fd;

      line-height: 21px;
      margin-left: 2px;
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