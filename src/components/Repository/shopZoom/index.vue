<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '80%' }"
      @close="close"
    >
      <span>{{name}}知识库</span>
      <div class="line"></div>
      <p v-if="list.length > 0">
        {{list[0].update_time}}
        <span class="add" @click="toAdd">添加+</span>
      </p>
      <p v-else>
        <span class="add" @click="toAdd">添加+</span>
      </p>
      <div class="contain">
        <div
          class="topTitle start"
          v-if="bxmove"
          :class="{movetransition: bxmove ? 'movetransition':'' }"
        >
          <p>新增知识</p>
          <div class="leftImg">
            <img :src="money" alt />
          </div>
          <p>+{{addStatus.award_bcoin}}</p>

          <div class="rightImg">
            <img :src="experience" alt />
          </div>
          <span>+{{addStatus.award_exp}}</span>
        </div>
        <div class="centercontent" v-for="(item, index) in list" :key="index">
          <div class="question">
            <div class="topQ">
              <img :src="img" alt />
              <textarea class="text" v-show="index == showIndex ?true:false" id="myText">
              {{item.question}}
              </textarea>
              <div class="text2" v-show="index != showIndex ?true:false">{{item.question}}</div>
              <img
                @click="remove(index)"
                class="delete"
                :src="img5"
                alt
                v-if="item.online_data_id!=''"
              />
            </div>
            <!-- <div class="texts">
            <p>{{$route.query.Question}}</p>
            </div>-->
          </div>

          <div class="assets">
            <img :src="img1" alt />
            <textarea class="text" v-show="index == showIndex ?true:false" id="myText2">
            {{item.answer}}
            </textarea>
            <div class="text2" v-show="index != showIndex ?true:false">{{item.answer}}</div>
          </div>

          <div class="buttons">
            <img :src="img2" @click="toEdit(index)" alt />
            <img :src="img3" v-show="index == showIndex ?true:false" @click="toSave(index)" alt />
            <img @click="listPage(index)" :src="img4" v-show="index != showIndex ?true:false" alt />
          </div>
          <div style="height:20px;"></div>
        </div>
      </div>
    </van-popup>
    <van-popup class="cont2" v-model="toPulish">
      <div class="contwrap">
        <!-- <div class="top">
                <span>{{vipExpiryTime}}</span>
        </div>-->
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
import { Toast } from "vant";
import Bus from "./../../../assets/js/common/Bus";
import {
  reqlistPage,
  reqknowledgeList,
  reqeditList,
  reqdeleteList,
  reqaddledgeList,
  reqtaskStatus,
  reqhisknowledgeList,
  reqChathist
} from "../../../axios/axios-api";
export default {
  name: "shopZoom",
  data() {
    return {
      addStatus: Object,
      bxmove: false,
      ques: "",
      list: [],
      curIndex: 0,
      show: true,
      isShow: false,
      showIndex: 0,
      isEdit: false,
      flag: true,
      toPulish: false,
      money: require("../../../assets/images/money@2x.png"),
      experience: require("../../../assets/images/experience@2x.png"),
      img: require("../../../assets/images/Q_small_icon@2x.png"),
      img1: require("../../../assets/images/A_small_icon@2x.png"),
      img2: require("../../../assets/images/biajide.png"),
      img3: require("../../../assets/images/bachkdjfi.png"),
      img4: require("../../../assets/images/fabude.png"),
      img5: require("../../../assets/images/delete@3x.png")
    };
  },
  props: [
    "broker_id_prop",
    "robot_id_prop",
    "token_prop",
    "shopZoomC_show",
    "type",
    "name",
    "Answer",
    "Question",
    "sentence_id",
    "teach"
  ],
  created() {
    this.show = this.shopZoomC_show;
    this.broker_id = this.broker_id_prop;
    this.robot_id = this.robot_id_prop;
    this.token = this.token_prop;
  },
  watch: {
    Question(newValue) {
      this.Question = newValue;
    },
    Answer(newValue) {
      this.Answer = newValue;
    },
    shopZoomC_show(newValue) {
      this.show = newValue;
    },
    data(newValue) {
      this.show = newValue;
    }
  },
  mounted() {
    // if(this.teach != ''){
    //   this.showIndex = 0
    //   this.toEdit(0)
    // }
    let questionT = this.Question;
    let answerT = this.Answer;
    if (questionT != "") {
      this.showListAdd(questionT, answerT);
    } else {
      this.ShoWList();
    }
  },
  methods: {
    close() {
      if (this.type == "1") {
        this.$emit("shopZoomC", false);
      }
    },
    //显示
    ShoWList() {
      this.showIndex = -1;
      let param = {
        broker_id: this.broker_id,
        token: this.token
      };
      let res = reqknowledgeList(param);
      res
        .then(res => {
          console.log(res);
          this.list = res.result.data;
          // if(this.list.length == 0){
          //   Toast('请添加您得知识库哦')
          // }
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    cancel() {
      this.toPulish = false;
    },
    confirm() {
      if (this.online_data_id == "") {
        Toast("请编辑保存后再发布！");
      } else {
        let param = {
          online_data_id: this.online_data_id,
          broker_id: this.$route.query.broker_id,
          question: this.Question,
          answer: this.Answer,
          token: this.$route.query.token
        };
        let res = reqlistPage(param);
        res
          .then(res => {
            Toast(res.msg);
            this.toPulish = false;
            window.parent.location.href =
              "https://m.baoxianxia.com.cn/app/answers/index.html?brokerId=a0afe56ef17a4ea1b80a1629c7e828c6&token=feb91d31-a186-45a0-ba11-097075ebb041";
          })
          .catch(reslove => {
            Toast(res.msg);
          });
      }
    },
    listPage(index) {
      this.online_data_id = this.list[index].online_data_id;
      this.Question = document.getElementById("myText").value;
      this.Answer = document.getElementById("myText2").value;
      this.toPulish = true;
      // alert(this.Question)
      //  if (this.teach == 'teach') {
      //    let param = {
      //     sentence_id: this.sentence_id,
      //     broker_id: this.$route.query.broker_id,
      //     question: this.Question,
      //     answer: this.Answer,
      //     token: this.$route.query.token
      //   };
      //   console.log(JSON.stringify(param))
      //   let res = reqChathist(param);
      //   res
      //     .then(res => {
      //       Toast(res.msg);
      //     })
      //     .catch(reslove => {
      //       // Toast(res.msg);
      //     });
      //  }else{
      //    this.toPulish = true;
      //  }
    },
    //添加
    toAdd() {
      // 不为0时置空文本框
      if (this.list.length > 0) {
        document.getElementById("myText").value = "";
        document.getElementById("myText2").value = "";
      }
      if (this.flag) {
        this.Qusetion = this.$route.query.Qusetion;
        this.Answer = this.$route.query.Answer;
        this.flag = false;
      } else {
        this.Qusetion = "";
        this.Answer = "";
      }
      // let param = {
      //   broker_id: this.broker_id,
      //   question: this.Qusetion,
      //   answer: this.Answer,
      //   token: this.token
      // };
      // console.log(param);
      //   let res = reqaddledgeList(param)
      //     res.then(res=>{
      // debugger;

      //       console.log(res);
      //     }).catch(reslove=>{
      //        console.log('error')
      //     })
      this.showListAdd("", "");
      // this.$set(this.list, this.list.length,{
      // question : null,
      // answer:null,
      //    online_data_id:"",
      //    });
    },
    //删除
    remove(index) {
      let param = {
        broker_id: this.broker_id,
        online_data_id: this.list[index].online_data_id,
        token: this.token
      };
      console.log(param);
      let res = reqdeleteList(param);
      res
        .then(res => {
          this.ShoWList();
          console.log(res);
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    showPopup() {
      this.show = true;
    },
    //编辑
    toEdit(index) {
      this.showIndex = index;
      this.isEdit = true;
    },
    // 保存
    toSave(index) {
      //this.isShow = false
      this.showIndex = -1;
      this.$route.query.Qusetion = document.getElementById("myText").value;
      this.$route.query.Answer = document.getElementById("myText2").value;
      // if(this.list[index].Qusetion == ''){
      //   this.Qusetion = ' '
      // }
      // if(this.list[index].Answer == ''){
      //   this.Answer = ' '
      // }
      let canSave = true;
      if (
        this.trim(this.$route.query.Qusetion) == "" ||
        this.trim(this.$route.query.Answer) == ""
      ) {
        Toast("内容不能为空");
        this.showIndex = index;
        canSave = false;
      }
      if (this.list[index].online_data_id != "") {
        let param = {
          modified_data_id: this.list[index].online_data_id,
          broker_id: this.broker_id,
          question: this.$route.query.Qusetion,
          answer: this.$route.query.Answer,
          token: this.token
        };
        let res = reqeditList(param);
        res
          .then(res => {
            this.list = res.result.data;
            this.ShoWList();
          })
          .catch(reslove => {
            console.log("error");
          });
      } else {
        if (canSave) {
          let param2 = {
            broker_id: this.broker_id,
            question: this.$route.query.Qusetion,
            answer: this.$route.query.Answer,
            token: this.token
          };
          let res = reqaddledgeList(param2);
          res
            .then(res => {
              this.list = res.result.data;
              this.ShoWList();
            })
            .catch(reslove => {
              console.log("error");
            });
          //增加知识的任务
          this.getReqtaskStatus();
          if (this.addStatus.award_bcoin > 0) {
            this.bxmove = true;
            setTimeout(() => {
              this.bxmove = false;
            }, 1000);
          }
        }
      }
    },
    showListAdd(questionT, answerT) {
      this.showIndex = -1;
      let param = {
        broker_id: this.broker_id,
        token: this.token
      };
      console.log(param);
      let res = reqknowledgeList(param);
      res
        .then(res => {
          this.list = res.result.data;
          this.list.splice(0, 0, {
            question: questionT,
            answer: answerT,
            online_data_id: ""
          });
          //this.list.push();
        })
        .catch(reslove => {
          console.log("error");
        });
    },

    trim(data) {
      return data.replace(/(^\s*)|(\s*$)/g, "");
    },
    //与机器人聊天任务
    getReqtaskStatus() {
      let param = {
        broker_id: this.broker_id,
        robot_id: this.robot_id,
        operation_type: 2,
        token: this.token
      };
      let result = reqtaskStatus(param);
      result
        .then(res => {
          this.addStatus = res.result;
        })
        .catch(reslove => {
          console.log("error");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
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
    top: 120px;
    opacity: 1;
  }
  100% {
    top: 90px;
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
    > p {
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 16px;
      text-align: center;
      margin-top: 10px;
      position: relative;
    }
    > .line {
      width: 100%;
      height: 6px;
      background: rgba(245, 245, 245, 1);
      margin-top: 10px;
      margin-bottom: 16px;
    }
    .add {
      background: #f1f6fb;
      position: absolute;
      right: 20px;
      font-size: 14px;
    }
    .contain {
      overflow-y: hidden;
      overflow: scroll;
      height: 390px;
      .topTitle {
        display: flex;
        position: absolute;
        margin-left: 40%;
        top: 180px;
        z-index: 999;
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
      > .centercontent {
        width: 345px;
        height: auto;
        background: rgba(241, 246, 251, 1);
        border-radius: 6px;
        margin: 0 auto;
        margin-top: 18px;
        position: relative;
        > .question {
          > .topQ {
            // display: flex;
            // justify-content: space-between;
            > img {
              width: 24px;
              height: 24px;
              margin-top: 19px;
              margin-left: 20px;
            }
            .delete {
              width: 54px;
              height: 24px;
              position: absolute;
              top: 0;
              right: 20px;
            }
            > .text {
              width: 305px;
              height: auto;
              height: 100px;
              margin-left: 20px;
              margin-top: 9px;
            }
            > .text2 {
              width: 305px;
              height: auto;
              // margin: 0 auto;
              margin-left: 20px;
              margin-top: 6px;
            }
          }
          > .texts {
            width: 295px;
            margin-left: 20px;
            margin-top: 5px;
            > p {
              font-size: 17px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(74, 74, 74, 1);
              line-height: 24px;
            }
          }
        }

        > .assets {
          > img {
            width: 24px;
            height: 23px;
            margin-top: 20px;
            margin-left: 20px;
          }
          > .text {
            width: 305px;
            height: auto;
            height: 100px;
            margin-left: 20px;
            margin-top: 6px;
          }
          > .text2 {
            width: 305px;
            height: auto;
            // margin: 0 auto;
            margin-left: 20px;
            margin-top: 6px;
          }
        }
        > .buttons {
          margin-top: 27px;
          display: flex;
          justify-content: space-around;
          > img {
            width: 126px;
            height: 38px;
            border-radius: 19px;
            &:first-child {
              margin-left: 15px;
            }
            &:last-child {
              margin-right: 15px;
            }
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
      }
    }
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