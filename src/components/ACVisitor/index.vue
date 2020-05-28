<template>
  <div class="warp">
    <van-popup
      v-model="chat"
      closeable
      position="bottom"
      :style="{ height: '77.2%' }"
      @closed="close"
    >
      <div class="title">聊天记录</div>
      <div style="background:rgba(245,245,245,1);height:1.2%"></div>
      <div class="wrapper" ref="wrapper">
        <div class="content" v-for="(i,index) in list" :key="index">
          <!-- 访客 -->
          <div class="content-top" v-show="i.speaker == 1">
            <div class="topTime" v-show="i.create_time != null">{{i.create_time}}</div>
            <div class="question">
              <div class="q_content">{{i.content}}</div>
              <div class="photo">
                <img :src="fkuser" v-show="right" alt />
              </div>
            </div>
          </div>
          <!-- 机器人 -->
          <div class="content-top" v-show="i.speaker == 0">
            <div class="topTime" v-show="i.create_time != null">{{i.create_time}}</div>
            <div style="margin-top: 10px;" v-show="i.create_time == null"></div>
            <div class="question2">
              <div class="photo">
                <img :src="smallBebot" v-show="left" alt />
              </div>
              <div class="q_content">{{i.content}}</div>
            </div>
          </div>
          <!-- 代理人 -->
          <div class="content-top" v-show="i.speaker == 2">
            <div class="topTime" v-show="i.create_time != null">{{i.create_time}}</div>
            <div style="margin-top: 10px;" v-show="i.create_time == null"></div>
            <div class="question2">
              <div class="photo">
                <img :src="user" v-show="left" alt />
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
          <input type="text" :placeholder="placeholder" v-model="question" />
        </div>
        <div class="btn" @click="submit">
          <span>发送</span>
        </div>
      </div>
      <router-view v-if="$route.path==='/HomeOther'"></router-view>
    </van-popup>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { Popup, Toast } from "vant";
import {
  reqCusayrob,
  reqHistoryCustomer,
  reqCustomerInput
} from "../../axios/axios-api";

export default {
  name: "ACVisitor",
  data() {
    return {
      list: [],
      chat: true,
      left: true,
      right: true,
      question: "",
      flag: true,
      dialogMark: "",
      isInput: true,
      lastSentence: "",
      placeholder: "你试试输入“风险测评”",
      user: require("../../assets/images/头像@2x.png"),
      fkuser: require("../../assets/images/fkuser.png"),
      edit: require("../../assets/images/edit.png"),
      teach: require("../../assets/images/teach.png"),
      smallBebot: require("../../assets/images/smallBebot.png")
    };
  },
  props: ['broker_id','robot_id','customer_id','customer_type','token','showACChat'],
  created(){
      this.chat = this.showACChat
  },
  watch:{
    showACChat(newValue){
        this.chat = newValue
    }
  },
  methods: {
    close() {
        this.$emit('closeACchat',false)
    },
    getHistoryCustomer() {
      //AC 聊天记录
      let param;		  
      if (this.flag) {
        param = {
          broker_id: this.broker_id,
          customer_id: this.customer_id,
          customer_type: this.customer_type,
          last_sentence: -1,
          token: this.token
        };
        this.flag = false;
      } else {
        param = {
          broker_id: this.broker_id,
          customer_id: this.customer_id,
          customer_type: this.customer_type,
          last_sentence: this.lastSentence,
          token: this.token
        };
      }
      let res = reqHistoryCustomer(param);
      res
        .then(res => {
          console.log(res);
          // if(this.dialogMark == 1){
          this.dialogMark = res.result.dialog_mark;
          this.list = res.result.dialog_history;
          // this.getHistoryCustomer()
          // }
          this.lastSentence = res.result.last_sentence;
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    submit() {
      if (this.dialogMark == "1") {
        if (this.question == "") {
          Toast("请输入聊天内容");
        } else {
          let param = {
            broker_id: this.broker_id,
            customer_id: this.customer_id,
            customer_type: this.customer_type,
            speaker: "1",
            content: this.question,
            token: this.token
          };
          console.log(param);
          let res = reqCustomerInput(param);
          res
            .then(res => {
              if (this.dialogMark == 1) {
                this.getHistoryCustomer();
              }
              this.question = "";
            })
            .catch(reslove => {
              console.log("error");
            });
        }
      } else {
        this.getMarkrebot();
      }
    },
    // mark为0机器人出现
    getMarkrebot() {
      let param;
      if (this.isInput) {
        param = {
          dialog_type: "2",
          customer_id: this.customer_id,
          customer_type: this.customer_type,
          broker_id: this.broker_id,
          robot_id: this.robor_id,
          speaker: "1",
          content: ".",
          token: this.token
        };
        this.isInput = false;
      } else {
        param = {
          dialog_type: "2",
          customer_id: this.customer_id,
          customer_type: this.customer_type,
          broker_id: this.broker_id,
          robot_id: this.robor_id,
          speaker: "1",
          content: this.question,
          token: this.token
        };
      }
      let res = reqCusayrob(param);
      res
        .then(res => {
          this.list = res.result.dialog_history;
          this.question = "";
        })
        .catch(reslove => {
          console.log("error");
        });
    },

    // 发布
    chathist(index) {
      console.log(this.list[index]);
      let param = {
        broker_id: this.broker_id,
        sentence_id: this.list[index].sentence_id,
        question: this.question,
        answer: "",
        token: this.token
      };
      console.log(param);
      let res = reqChathist(param);
      res
        .then(res => {
          Toast(res.msg);
        })
        .catch(reslove => {
          console.log("error");
        });
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
    if (this.dialogMark == 0) {
      this.getMarkrebot();
    }
    this.scrollToBottom();
    window.setInterval(() => {
      setTimeout(this.getHistoryCustomer(), 0);
    }, 2000);
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