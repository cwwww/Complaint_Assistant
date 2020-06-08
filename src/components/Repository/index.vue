<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '75%',color:'black'}"
      @close="close"
    >
      <img :src="product_zsk" alt />
      <div class="contain">
        <div
          class="bigContent"
          @click="toShopZoom(index)"
          :class="item.type == 2 && item.received == false && item.available == false ? 'active' : ''"
          v-for="(item, index) in list"
          :key="index"
          :style="randomRgb(item)"
        >
          <div class="sonContent">
            <div class="leftBox">
              <p style="max-width:177px;">{{item.name}}</p>
              <span>{{item.amount}}条知识</span>
            </div>
            <div class="rightBox">
              <div
                class="buttonAnd"
                @click="toOpen(index)"
                v-if="item.type == 1 && item.enable == false"
              >
                <p :style="randomColor(item)">启用</p>
              </div>
              <div
                class="buttonAnd2"
                @click="toClose(index)"
                v-if="item.type == 1 && item.enable == true"
              >
                <p>取消启用</p>
              </div>
            </div>
            <div class="rightBox2">
              <div
                class="buttonAnd"
                @click="toOpen(index)"
                v-if="item.type == 2 && item.received == true && item.available == true && item.enable == false"
              >
                <p :style="randomColor(item)">启用</p>
              </div>
              <div
                class="buttonAnd2"
                @click="toClose(index)"
                v-if="item.type == 2 && item.received == true && item.available == true && item.enable == true"
              >
                <p>取消启用</p>
              </div>
            </div>
          </div>
          <div class="bottomBox">
            <div class="bottomFooter">
              <img :src="imglevel" alt />
              <p>{{text}}</p>
            </div>
            <div
              class="title"
              v-if="item.type == 1 && item.status == 1"
              @click="tovisit(item.broker_id,item.robot_id)"
            >
              <p>前往TA的事务所</p>
              <img :src="next" alt />
            </div>
            <div class="title" v-if="item.type == 1 && item.status == 0" @click="toEvaluate(index)">
              <p>去评价</p>
              <img :src="next" alt />
            </div>
            <div
              @click="toget(index)"
              class="title2"
              v-if="item.type == 2 && item.received == false && item.available == true"
            >
              <p>可领取</p>
            </div>
            <van-popup class="cont3" v-model="show3" click_overlay>
              <div class="contwrap">
                <img :src="success" alt />
                <div style="margin:20px 0 3px 0;">评价提交成功</div>
                <van-rate
                  v-model="star"
                  style="margin-left:30px;"
                  color="#FFAD25"
                  gutter="2px"
                  readonly
                />
              </div>
            </van-popup>
            <van-popup class="cont4" v-model="show4">
              <div class="contwrap">
                <div style="margin:30px auto 0;">给知识库的内容质量评个星吧！</div>
                <van-rate
                  v-model="value"
                  :size="46"
                  color="#FFAD25"
                  void-icon="star"
                  void-color="#eee"
                  style="margin:26px auto 25px ;"
                  @change="onChange"
                />
                <van-button
                  type="info"
                  style="width:265px;height:42px;margin:0 auto;"
                  v-show="value != 0"
                  @click="comfirm(index)"
                >提交</van-button>
                <van-button
                  type="info"
                  style="width:265px;height:42px;margin:0 auto;background:#eee;color:#111;border:none;"
                  v-show="value == 0"
                >提交</van-button>
              </div>
            </van-popup>
          </div>
          <div
            class="active"
            v-if="item.type == 2 && item.received == false && item.available == false"
          >
            <img class="suoimg" :src="suo" alt />
            <p class="toInvite" @click="toInvite">去解锁</p>
          </div>
        </div>
      </div>
      <shopZoom
        v-show="showMyshop"
        @shopZoomC="shopZoomP"
        :shopZoomC_show="showMyshop"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
        :type="type"
        :Answer="Question"
        :Question="Answer"
        :sentence_id="sentence_id"
        :teach="teach"
      />
      <!-- v-bind="$attrs"
      v-on="$listeners"-->
    </van-popup>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { Popup, Toast } from "vant";
import shopZoom from "../Repository/shopZoom";
import Bus from "../../assets/js/common/Bus";
import {
  reqShowList,
  reqHomeInit,
  reqEnable_kb,
  reqDisable_kb,
  reqReceive,
  reqstarRating
} from "../../axios/axios-api";
export default {
  name: "Repository",
  components: {
    shopZoom
  },
  data() {
    return {
      showMyshopData:Boolean,
      Question:'', //我教你带得值
      Answer:'',
      showMyshop: false,
      show: true,
      show3: false,
      show4: false,
      star: Boolean,
      list: [],
      colorList: [0],
      imglevel: "",
      value: "",
      type: 1,
      state: "",
      goods: "",
      text: "",
      broker_id_prop: "",
      robot_id_prop: "",
      token_prop: "",
      isEvaluate: Boolean, //是否评价
      img: require("../../assets/images/icon.png"),
      suo: require("../../assets/images/suo@2x.png"),
      product_zsk: require("../../assets/images/product_zsk@2x.png"),
      next: require("../../assets/images/next@2x.png"),
      levelbx1: require("../../assets/images/level_xinshou@2x.png"),
      levelbx2: require("../../assets/images/level_fudu@2x.png"),
      levelbx3: require("../../assets/images/level_tiaokuan@2x.png"),
      levelbx4: require("../../assets/images/level_peizhi@2x.png"),
      levelbx5: require("../../assets/images/level_baike@2x.png"),
      levelbx6: require("../../assets/images/level_daka@2x.png"),
      levelbx7: require("../../assets/images/level_famous@2x.png"),
      success: require("../../assets/images/success@2x.png")
    };
  },
  props: ["broker_id", "robot_id", "token", "Repository_show","visitimgurl"],
  // inheritAttrs: false,
  created() {
    this.broker_id_prop = this.broker_id;
    this.robot_id_prop = this.robot_id;
    this.token_prop = this.token;
    Bus.$on("teachyou", (res) => {
      // console.log('我教你信息：'+JSON.stringify(res))
      // console.log('编辑页是否打开:'+this.showMyshop)
      this.showMyshopData = res.data;
      this.show = res.data2
      this.Repository_show = true
      this.Question = res.Question;
      this.Answer = res.Answer;
      this.sentence_id = res.sentence_id
      this.teach = res.teach
    });
    this.show = this.Repository_show;
  },
  watch: {
    showMyshopData(newValue){
      this.showMyshop = newValue
      // this.$refs.shopZoom.show()
    },
    Repository_show(newValue) {
      this.show = newValue;
    },
    data(newValue) {
      this.show = newValue;
    }
  },
  methods: {
    randomColor(item) {
      let R = Math.floor(Math.random() * 233);
      let G = Math.floor(Math.random() * 70);
      let B = Math.floor(Math.random() * 70);
      return {
        color: "rgb(" + R + "," + G + "," + B + ")"
      };
    },
    randomRgb(item) {
      let R = Math.floor(Math.random() * 233 + 70);
      let G = Math.floor(Math.random() * 70 + 70);
      let B = Math.floor(Math.random() * 70 + 70);
      return {
        background: "rgb(" + R + "," + G + "," + B + ")"
      };
    },
    close() {
      this.$emit("RepositoryC", false);
    },
    shopZoomP(data) {
      this.showMyshop = data;
      this.getInit();
    },
    toShopZoom(index) {
      if (this.list[index].type == 0) {
        this.showMyshop = true;
        // this.$emit('RepositoryC',false)
      }
    },
    toEvaluate(index) {
      this.show4 = true;
      this.type = this.list[index].goods_id;
    },
    onChange(value) {
      // Toast('当前值：' + value);
    },
    comfirm(index) {
      this.star = this.value;
      this.show4 = false;
      this.show3 = true;
      let param = {
        robot_id: this.robot_id_prop,
        goods_id: this.type,
        goods_score: this.value,
        user_id: this.broker_id_prop,
        token: this.token_prop
      };
      console.log(param);
      let res = reqstarRating(param);
      res
        .then(res => {
          this.getInit();
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    toget(index) {
      this.goods = this.list[index].goods_id;
      let param = {
        robot_id: this.robot_id_prop,
        goods_id: this.goods,
        type: 2,
        user_id: this.broker_id_prop,
        token: this.token_prop
      };
      console.log(param);
      let result = reqReceive(param);
      result
        .then(res => {
          this.list[index].received = true;
          this.list[index].enable = true;
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    toOpen(index) {
      if (this.list[index].received) {
        this.state = 2;
      } else {
        this.state = 1;
      }
      this.type = this.list[index].goods_id;
      let param = {
        robot_id: this.robot_id_prop,
        goods_id: this.type,
        type: this.state,
        user_id: this.broker_id_prop,
        token: this.token_prop
      };
      console.log(param);
      let result = reqEnable_kb(param);
      result
        .then(res => {
          this.list[index].enable = true;
          console.log(res);
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    toClose(index) {
      this.goods = this.list[index].goods_id;
      if (this.list[index].type == 1) {
        this.type = 1;
      } else {
        this.type = 2;
      }
      let param = {
        goods_id: this.goods,
        type: this.type,
        robot_id: this.robot_id_prop,
        user_id: this.broker_id_prop,
        token: this.token_prop
      };
      console.log(param);
      let result = reqDisable_kb(param);
      result
        .then(res => {
          this.list[index].enable = false;
          console.log(res);
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    tovisit: function(broker_id, robot_id) {
      this.$router.push({
        path: "/HomeOther",
        query: {
          type: "listType",
          visitimgurl:this.visitimgurl,
          broker_id: broker_id,
          robot_id: robot_id,
          customer_id: this.broker_id_prop,
          customer_robot_id: this.robot_id_prop,
          token: this.token_prop
        }
      });
    },
    toInvite() {
      this.$router.replace("/Invite");
    },
    getInit() {
      let param = {
        robot_id: this.robot_id_prop,
        user_id: this.broker_id_prop,
        token: this.token_prop
      };
      let result = reqShowList(param);
      result
        .then(res => {
          this.list = res.result.kb_list;
          console.log(this.list);
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].level == 1) {
              //保险等级
              this.imglevel = this.levelbx1;
              this.text = "保险新手";
            } else if (this.list[i].level == 2) {
              this.imglevel = this.levelbx2;
              this.text = "保险复读机";
            } else if (this.list[i].level == 3) {
              this.imglevel = this.levelbx3;
              this.text = "保险条款王";
            } else if (this.list[i].level == 4) {
              this.imglevel = this.levelbx4;
              this.text = "保险配置王";
            } else if (this.list[i].level == 5) {
              this.imglevel = this.levelbx5;
              this.text = "保险百科";
            } else if (this.list[i].level == 6) {
              this.imglevel = this.levelbx6;
              this.text = "保险大咖";
            } else if (this.list[i].level == 7) {
              this.imglevel = this.levelbx7;
              this.text = "保险名人堂";
            }
          }
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    changeIndex(i) {
      this.curIndex = i;
    },
    showPopup() {
      this.show = true;
    },
    scrollToBottom: function() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".bigContent");
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  updated: function() {
    this.scrollToBottom();
  },
  mounted() {
    this.getInit();
  }
};
</script>
<style lang="scss" scoped>
// /deep/ .van-popup {
//   overflow: visible;
// }
.van-icon-cross {
  position: fixed;
  right: 12px;
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
    // position: relative;
    > img {
      display: block;
      width: 65px;
      height: 65px;
      margin: 0 auto;
      margin-top: -31px;
      margin-bottom: 5px;
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -32px;
    }
    .contain {
      margin-top: 52px;
      overflow-y: hidden;
      height: 420px;
      overflow: scroll;
      // overflow: hidden;
      > .bigContent {
        width: 305px;
        height: 120px;
        background: rgba(233, 70, 70, 1);
        border-radius: 15px;
        margin: 0px auto 20px;
        > .sonContent {
          display: flex;
          justify-content: space-between;
          > .leftBox {
            > p {
              font-size: 14px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 28px;
              padding-top: 15px;
              margin-left: 20px;
                            white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
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
            margin-right: -37px;
            > .buttonAnd {
              width: 85px;
              height: 32px;
              background: rgba(255, 255, 255, 1);
              border-radius: 16px;
              text-align: center;
              margin-top: 20px;
              line-height: 32;
              margin-right: 20px;
              > p {
                font-size: 15px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(77, 96, 243, 1);
                line-height: 21px;
                padding-top: 6px;
              }
            }
            > .buttonAnd2 {
              width: 85px;
              height: 32px;
              background: rgba(0, 0, 0, 0.25);
              border-radius: 16px;
              text-align: center;
              margin-top: 20px;
              line-height: 32;
              margin-right: 20px;
              > p {
                font-size: 15px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
                line-height: 21px;
                padding-top: 6px;
              }
            }
          }
          > .rightBox2 {
            margin-right: 20px;
            > .buttonAnd {
              width: 85px;
              height: 32px;
              background: rgba(255, 255, 255, 1);
              border-radius: 16px;
              text-align: center;
              margin-top: 20px;
              line-height: 32;
              margin-right: 20px;
              > p {
                font-size: 15px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(77, 96, 243, 1);
                line-height: 21px;
                padding-top: 6px;
              }
            }
            > .buttonAnd2 {
              width: 85px;
              height: 32px;
              background: rgba(0, 0, 0, 0.25);
              border-radius: 16px;
              text-align: center;
              margin-top: 20px;
              line-height: 32;
              margin-right: 20px;
              > p {
                font-size: 15px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #ffffff;
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
            position: relative;
            > p {
              font-size: 13px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 18px;
              margin-top: 7px;
              margin-right: 20px;
            }
            img {
              width: 10px;
              height: 10px;
              position: absolute;
              top: 11px;
              right: 10px;
            }
          }
          > .title2 {
            position: relative;
            width: 85px;
            height: 32px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 1);
            right: 20px;
            text-align: center;
            > p {
              font-size: 13px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 32px;
            }
          }
          .cont3 {
            width: 170px;
            height: 170px;
            background: rgba(255, 255, 255, 1);
            border-radius: 15px;
            .contwrap {
              display: flex;
              flex-direction: column;
              text-align: center;
              > img {
                width: 55px;
                height: 55px;
                margin: 25px auto 0;
              }
              > div {
                font-size: 15px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 21px;
              }
            }
          }
          .cont4 {
            width: 305px;
            height: 208px;
            background: rgba(255, 255, 255, 1);
            border-radius: 15px;
            .contwrap {
              display: flex;
              flex-direction: column;
              text-align: center;
              > img {
                width: 55px;
                height: 55px;
                margin: 25px auto 0;
              }
              > div {
                font-size: 15px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                line-height: 21px;
              }
            }
          }
        }
      }

      > .active {
        // background:rgba(0,0,0,1);
        border-radius: 15px;
        opacity: 0.5;
        position: relative;
        .suoimg {
          width: 32px;
          height: 40px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -20px;
          margin-left: -37.5px;
        }
        .toInvite {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 21px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -8px;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>
