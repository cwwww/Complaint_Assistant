<template>
  <div class="warp">
    <!-- <van-loading /> -->
    <van-popup
      v-model="chat"
      closeable
      round
      position="bottom"
      :style="{ height: '77.2%' }"
      @closed="close"
    >
      <div class="title">聊天记录</div>
      <div style="background:rgba(245,245,245,1);height:1.2%"></div>
      <div class="wrapper" ref="wrapper">
        <div class="content" v-for="(i,index) in list" :key="index">
          <div class="content-top" v-show="i.speaker == 2">
            <div class="topTime" v-show="i.create_time != null">{{i.create_time}}</div>
            <div class="question">
              <div class="q_content" id="q_content">{{i.content}}</div>
              <div class="photo">
                <img :src="homeImg" v-show="right" alt />
              </div>
            </div>
          </div>
          <div class="content-top" v-show="i.speaker == 0">
            <div class="topTime" v-show="i.create_time != null">{{i.create_time}}</div>
            <div style="margin-top: 10px;" v-show="i.create_time == null"></div>
            <div class="question2">
              <div class="photo">
                <img :src="smallBebot" v-show="left" alt />
              </div>
              <div class="q_content" id="q_content2">{{i.content}}</div>
            </div>
            <div class="teach">
              <div>
                <img style="margin-top:-1px;" :src="edit" alt />
                <span @click="chathist(index)">发布</span>
              </div>
              <div style="margin-left:20px;">
                <img style="height:16px;" :src="teach" alt />
                <span @click="teachYou(index)">我教你</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomLine"></div>
      <div class="bottom">
        <div class="content-bottom">
          <input type="text" :placeholder="placeholder" v-model="input" />
        </div>
        <div
          class="topTitle start"
          v-if="bxmove"
          :class="{movetransition: bxmove ? 'movetransition':'' }"
        >
        <p>和精灵聊天</p>
          <div class="leftImg">
            <img :src="money" alt />
          </div>
          <p>+{{addStatus.award_bcoin}}</p>
          <div class="rightImg">
            <img :src="experience" alt />
          </div>
          <span>+{{addStatus.award_exp}}</span>
        </div>
        <div class="btn J_xsubmit" @click="submit">
          <span>发送</span>
        </div>
      </div>
      <router-view v-if="$route.path==='/home'"></router-view>
    </van-popup>
    <van-popup class="cont2" v-model="toPulish">
      <div class="contwrap">
        <div style="margin-bottom:25px;">您是否要发布到问答广场</div>
        <div class="isOk">
          <div class="isNo" @click="cancel">
            <span style="color:#666;">取消</span>
          </div>
          <div class="isYes" @click="confirm">
            <span style="color:#FFF;">确定</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { Popup, Toast, Loading } from "vant";
import Bus from "../../assets/js/common/Bus";
import {
  reqRobotDetail,
  reqRobotHistory,
  reqChathist,
  reqaddledgeList,
  reqtaskStatus
} from "../../axios/axios-api";
export default {
  inject: ["reload"], // 引入页面同步刷新的依赖
  name: "HomeChat",
  data() {
    return {
      addStatus: Object,
      bxmove: false,
      flag: false,
      list: [],
      chat: true,
      left: true,
      right: true,
      question: "",
      input: "",
      toPulish: false,
      money: require("../../assets/images/money@2x.png"),
      experience: require("../../assets/images/experience@2x.png"),
      placeholder: "有什么可以帮您？尽快发来问题吧",
      user: require("../../assets/images/头像@2x.png"),
      edit: require("../../assets/images/edit.png"),
      teach: require("../../assets/images/teach.png"),
      smallBebot: require("../../assets/images/smallBebot.png")
    };
  },
  props: ["broker_id", "robot_id", "token", "show_chat", "val", "homeImg"],
  created() {
    this.chat = this.show_chat;
  },
  watch: {
    show_chat(newValue) {
      this.chat = newValue;
      if (this.chat) {
        this.getChatList();
      }
    },
    val(newValue) {
      this.val = newValue;
    }
  },
  mounted() {
    // this.getChatList();
  },
  methods: {
    close() {
      let params = {
        question: this.question,
        data: false
      };
      this.$emit("showChatC", params);
    },
    getChatList() {
      let param = {
        broker_id: this.broker_id,
        token: this.token
      };
      let res = reqRobotHistory(param);
      res
        .then(res => {
          this.list = res.result;
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    getReqtaskStatus() {
      let param = {
        broker_id: this.broker_id,
        robot_id: this.robot_id,
        operation_type: 1,
        token: this.token
      };
      let result = reqtaskStatus(param);
      result
        .then(res => {
          this.addStatus = res.result;
          console.log(JSON.stringify(this.addStatus));
        })
        .catch(reslove => {
          console.log("[ERROR] in getReqtaskStatus function");
        });
    },
    submit() {
      if (this.input == "") {
        Toast("请输入聊天内容");
      } else {
        // this.flag = true;
        this.question = this.input;
        let param = {
          dialog_type: "1",
          broker_id: this.broker_id,
          robot_id: this.robot_id,
          speaker: "2",
          content: this.question,
          token: this.token
        };
        let res = reqRobotDetail(param);
        res
          .then(res => {
            this.getChatList();
            this.input = "";
            this.getReqtaskStatus();
            if (this.addStatus.award_bcoin > 0) {
              this.bxmove = true;
              setTimeout(() => {
                this.bxmove = false;
              }, 1000);
            }
          })
          .catch(reslove => {
            console.log("error");
          });
      }
    },
    cancel() {
      this.toPulish = false;
    },
    confirm() {
      let param = {
        broker_id: this.broker_id,
        sentence_id: this.sentence_id,
        question: this.question,
        answer: this.answer,
        token: this.token
      };
      // alert(JSON.stringify(param))
      let res = reqChathist(param);
      res
        .then(res => {
          Toast(res.msg);
          this.toPulish = false;
        })
        .catch(reslove => {
          Toast(res.msg);
        });
    },
    chathist(index) {
      //发布
      console.log(this.list[index]);
      this.answer = this.list[index].content;
      this.question = this.list[index - 1].content;
      this.sentence_id = this.list[index].sentence_id;
      this.toPulish = true;
      window.parent.location.href =
        "https://m.baoxianxia.com.cn/app/answers/index.html?brokerId=a0afe56ef17a4ea1b80a1629c7e828c6&token=feb91d31-a186-45a0-ba11-097075ebb041";
    },
    teachYou(index) {
      this.chat = false;
      let params = {
        Answer: this.list[index].content,
        Question: this.list[index - 1].content,
        sentence_id: this.list[index].sentence_id,
        teach: "teach",
        data: true,
        data2: true
      };
      Bus.$emit("teachyou", params);
      this.$emit("controlRep", true);
    },
    //  滚动条置底
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".wrapper");
        container.scrollTop = container.scrollHeight;
      });
    }
  },
  updated() {
    this.scrollToBottom();
  }
};
</script>
<style lang="scss" scoped>
/deep/ .van-popup {
  overflow: visible;
}
.m_xbtns {
  position: relative;
  // margin-top: 100px;
}
.m_xbtns span {
  display: block;
  font-size: 17px;
  color: #fff;
  background: #1977f6;
  border-radius: 50%;
  height: 48px;
  line-height: 48px;
  border-radius: 25px;
  cursor: pointer;
  margin: 10px 15px 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
.m_xbtns .start {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 15px;
  color: red;
}

.movetransition {
  animation: iconmove 1s linear infinite;
  animation-iteration-count: 1;
}

@keyframes iconmove {
  0% {
    top: 200px;
    opacity: 1;
  }
  100% {
    top: 170px;
    opacity: 0;
  }
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
  .topTitle {
    display: flex;
    position: absolute;
    margin-left: 40%;
    // top: 200px;
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
      line-height: 17px;
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
.cont2 {
  width: 305px;
  height: 174px;
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;
  .contwrap {
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    .top {
      margin-bottom: 7px;
    }
    .isOk {
      display: flex;
      // align-items: center;
      // justify-content: center;
      .isNo {
        width: 125px;
        height: 42px;
        background: rgba(234, 234, 234, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 42px;
      }
      .isYes {
        width: 125px;
        height: 42px;
        background: rgba(0, 147, 253, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 42px;
        margin-left: 20px;
      }
    }
  }
}
</style>
