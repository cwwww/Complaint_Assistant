<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '77.5%' }"
      @close="close"
    >
      <span>谁看过我</span>
      <div class="line"></div>
      <div class="main">
        <div class="centerContent" @click="toACchat(index)" v-for="(i, index) in list" :key="index">
          <div class="loginImg">
            <img :src="img" alt v-show="i.headimgurl == null" />
            <img :src="i.headimgurl" v-show="i.headimgurl != null" alt />
          </div>
          <div class="rightContent">
            <div class="leftText">
              <div class="topTitle">{{i.name}}</div>
              <div class="bottomTime">{{i.visit_time}}</div>
            </div>
            <div class="rightPink">
              <img :src="img" alt />
              <p>{{i.intention_score}}</p>
            </div>
            <div class="borderLine"></div>
          </div>
        </div>
      </div>
    </van-popup>
    <ACChat
      v-show="isACChat"
      @ACChatC="ACChatP"
      :ACChat_show="isACChat"
      :broker_id_prop="broker_id_prop"
      :robot_id_prop="robot_id_prop"
      :token_prop="token_prop"
      :list="list"
      :titleName="list.name"
      :customer_type="list.customer_type"
      :customerImg="list.headimgurl"
      :customer_id="list.customer_id" 
    />
  </div>
</template>
<script>
import { reqLookMe } from "../../axios/axios-api";
import ACChat from "./ACChat";
export default {
  name: "WhoLookMe",
  components: {
    ACChat
  },
  data() {
    return {
      isACChat: false,
      curIndex: 0,
      show: true,
      broker_id_prop: "",
      robot_id_prop: "",
      token_prop: "",
      list: [],
      img: require("../../assets/images/Group@2x.png")
    };
  },
  created() {
    this.show = this.Who_Look;
    this.broker_id_prop = this.broker_id;
    this.robot_id_prop = this.robot_id;
    this.token_prop = this.token;
  },
  watch: {
    Who_Look(newValue) {
      this.show = newValue;
    }
  },
  props: ["broker_id", "robot_id", "token", "Who_Look"],
  methods: {
    ACChatP(data) {
      this.isACChat = data;
    },
    close() {
      this.$emit("WhoLookC", false);
    },
    toACchat(index) {
      this.isACChat = true;
    }
  },
  mounted() {
    let param = {
      broker_id:  this.broker_id_prop,
      robot_id: this.robot_id_prop,
      token:this.token_prop
    };
    let result = reqLookMe(param);
    result
      .then(res => {
        this.list = res.result;
        console.log(this.list);
      })
      .catch(reslove => {
        console.log("error");
      });
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
    .main {
      overflow-y: hidden;
      overflow: scroll;
      height: 390px;
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
}
</style>