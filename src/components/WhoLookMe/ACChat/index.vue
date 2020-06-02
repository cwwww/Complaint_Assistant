<template>
  <div class="warp">
    <van-popup
      v-model="chat"
      closeable
      round
      position="bottom"
      :style="{ height: '77.2%' }"
      @closed="close"
    >
      <div class="title">{{titleName_prop}}</div>
      <div style="background:rgba(245,245,245,1);height:1.2%"></div>
      <div class="wrapper" ref="wrapper">
        <div class="content" v-for="(i,index) in list" :key="index">
          <!-- 代理人  -->
          <div class="content-top" v-show="i.speaker == 2">
            <div class="topTime" v-show="i.create_time != null">{{i.create_time}}</div>
            <div class="question">
              <div class="q_content">{{i.content}}</div>
              <div class="photo">
                <img :src="myHeadImg_prop" v-show="right" alt />
              </div>
            </div>
          </div>
          <!-- 机器人 -->
          <div class="content-top" v-show="i.speaker == 0">
            <div class="topTime" v-show="i.create_time != null">{{i.create_time}}</div>
            <div class="question">
              <div class="q_content">{{i.content}}</div>
              <div class="photo">
                <img :src="smallBebot" v-show="right" alt />
              </div>
            </div>
          </div>
          <!-- 访客 -->
          <div class="content-top" v-show="i.speaker == 1">
            <div class="topTime" v-show="i.create_time != null">{{i.create_time}}</div>
            <div style="margin-top: 10px;" v-show="i.create_time == null"></div>
            <div class="question2">
              <div class="photo">
                <img :src="customerImg_prop" v-show="left" alt />
              </div>
              <div class="q_content">{{i.content}}</div>
            </div>
          </div>
          <!-- <div class="teach">
                <div>
                  <img style="margin-top:-1px;" :src=edit alt="">
                  <span @click="chathist(index)">发布</span>
                </div>
                <div style="margin-left:20px;">
                  <img style="height:16px;" :src=teach alt="">
                  <span>我教你</span>
                </div>
          </div>-->
        </div>
      </div>
      <div class="bottomLine"></div>
      <div class="bottom">
        <div class="content-bottom">
          <input type="text" :placeholder="placeholder" v-model="inputCont" />
        </div>
        <div class="btn" @click="submit">
          <span>发送</span>
        </div>
      </div>

      <router-view v-if="$route.path==='/home'"></router-view>
    </van-popup>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { Popup, Toast } from "vant";
import {
  reqRobotDetail,
  reqRobotHistory,
  reqChathist,
  reqCusayrob,
  reqDialogAgent,
  reqAgentInput
} from "../../../axios/axios-api";

export default {
  name: "ACChat",
  data() {
    return {
      list: [],
      chat: true,
      left: true,
      right: true,
      question: "",
      flag: true,
      inputCont: "",
      lastSentence: "",
      titleName: "",
      customer_type: "",
      customerImg: "",
      customer_id: "",
      placeholder: "你好啊～我能问什么问题呢？",
      user: require("../../../assets/images/头像@2x.png"),
      fkuser: require("../../../assets/images/fkuser.png"),
      edit: require("../../../assets/images/edit.png"),
      teach: require("../../../assets/images/teach.png"),
      smallBebot: require("../../../assets/images/smallBebot.png")
    };
  },
  props: [
    "broker_id_prop",
    "robot_id_prop",
    "token_prop",
    "ACChat_show",
    "titleName",
    "customer_type",
    "customerImg",
    "customer_id",
    "myHeadImg"
  ],
  created() {
    this.chat = this.ACChat_show;
    this.titleName_prop = this.titleName;
    this.customer_type_prop = this.customer_type;
    this.customerImg_prop = this.customerImg;
    this.customer_id_prop = this.customer_id;
    this.myHeadImg_prop = this.myHeadImg;
  },
  watch: {
    ACChat_show(newValue) {
      this.chat = newValue;
    },
    titleName() {
      this.titleName_prop = this.titleName;
    },
    customer_type() {
      this.customer_type_prop = this.customer_type;
    },
    customerImg() {
      this.customerImg_prop = this.customerImg;
    },
    customer_id() {
      this.customer_id_prop = this.customer_id;
    }
  },
  methods: {
    close() {
      this.$emit("ACChatC", false);
    },
    getDialogAgent() {
      alert(JSON.stringify(this.titleName_prop));
      //AC 聊天记录
      let param;
      if (this.flag) {
        param = {
          customer_type: this.customer_type_prop,
          last_sentence: -1,
          customer_id: this.customer_id_prop,
          broker_id: this.broker_id_prop,
          token: this.token_prop
        };
        this.flag = false;
      } else {
        param = {
          customer_type: this.customer_type_prop,
          last_sentence: this.lastSentence,
          customer_id: this.customer_id_prop,
          broker_id: this.broker_id_prop,
          token: this.token_prop
        };
      }

      let res = reqDialogAgent(param);
      res
        .then(res => {
          this.list = res.result.dialog_history;
          console.log(this.list);
          this.lastSentence = res.result.last_sentence;
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    submit() {
      if (this.inputCont == "") {
        Toast("请输入聊天内容");
      } else {
        this.question = this.inputCont;
        let param = {
          broker_id: this.broker_id_prop,
          customer_id: this.customer_id_prop,
          customer_type: this.customer_type_prop,
          speaker: "2",
          content: this.question,
          token: this.token_prop
        };
        console.log(param);
        let res = reqAgentInput(param);
        res
          .then(res => {
            this.list = res.result.dialog_history;
            this.getDialogAgent();
            this.inputCont = "";
          })
          .catch(reslove => {
            console.log("error");
          });
      }
    },
    //  滚动条置底
    scrollToBottom: function() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".wrapper");
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  updated: function() {
    this.scrollToBottom();
  },
  mounted() {
    this.scrollToBottom();
    this.getDialogAgent();
    // window.setInterval(() => {
    //   setTimeout(this.getDialogAgent(), 0);
    // }, 2000);
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
  .title {
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
    height: 8.5%;
    line-height: 44px;
    text-align: center;
  }
  .wrapper {
    height: 79.8%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: auto;
    // justify-content: space-between;
    .content-top {
      .topTime {
        margin-top: 10px;
        margin-bottom: 8px;
        text-align: center;
      }
      .question {
        display: flex;
        margin-right: 14px;
        justify-content: flex-end;
        .q_content {
          max-width: 66.7%;
          background: #f1f6fb;
          border-radius: 6px;
          margin-top: 10px;
          margin-right: 11px;
          box-sizing: border-box;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .photo {
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
      .question2 {
        display: flex;
        margin-left: 14px;
        .q_content {
          max-width: 66.7%;
          background: #f1f6fb;
          border-radius: 6px;
          margin-top: 10px;
          margin-left: 11px;
          box-sizing: border-box;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .photo {
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
      .teach {
        display: flex;
        margin-top: 9px;
        margin-left: 66px;
        img {
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
        span {
          margin-left: 3px;
        }
      }
    }
  }
  .bottom {
    .content-bottom {
      width: 72.8%;
      height: 33px;
      line-height: 33px;
      background: rgba(241, 246, 251, 1);
      border-radius: 6px;
      border: 1px solid #fff;
      margin-left: 8px;
      margin-top: 5px;
      display: flex;
      position: absolute;
      bottom: 5px;
      left: 0;
      input {
        width: 95%;
        margin-left: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
        background: none;
        outline: none;
        border: none;
      }
      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        color: #000;
      }
    }
    .btn {
      width: 72px;
      height: 33px;
      background: rgba(122, 166, 233, 1);
      border-radius: 6px;
      position: absolute;
      right: 10px;
      bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 21px;
        text-align: center;
      }
    }
  }
  .bottomLine {
    width: 100%;
    height: 1px;
    background: rgba(239, 239, 239, 1);
    margin: 15px auto 0px auto;
    position: fixed;
    left: 0;
    bottom: 44px;
  }
}
</style>