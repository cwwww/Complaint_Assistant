<template>
  <div class="wrap">
    <div class="main">
      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img" alt />
          </div>
          <div class="textContent">
            <span>和机器人第一次聊天</span>
            <p>和机器人说第一句话</p>
          </div>
        </div>

        <div class="rightBox">
          <div
            v-if="bxmove"
            v-show="itemSelected==='np1'"
            class="topTitle"
            :class="{ 'movetransition': bxmove?'movetransition':'' }"
          >
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p class="tanchutext" v-if="showTitle">+100</p>
            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span class="tanchutext" v-if="showTitle">+10</span>
          </div>
          <div class="topTitle" :class="{'moveTitle':itemSelected==='np1' ?'':'moveTitle'}">
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p>+100</p>
            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span>+10</span>
          </div>
          <div class="bottomButton" :class="[statusWar]">
            <p @click="getTaskStatus(broker_id,robot_id,status,'np1',token)">{{status}}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img_sec" alt />
          </div>
          <div class="textContent">
            <span>教机器人的第一条知识</span>
            <p>在知识库增加一条对话</p>
          </div>
        </div>
        <div class="rightBox">
          <div
            v-if="bxmove"
            v-show="itemSelected==='np2'"
            class="topTitle"
            :class="{ 'movetransition': bxmove?'movetransition':'' }"
          >
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p class="tanchutext" v-if="showTitle">+100</p>

            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span class="tanchutext" v-if="showTitle">+10</span>
          </div>
          <div class="topTitle" :class="{'moveTitle':itemSelected==='np2' ?'':'moveTitle'}">
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p>+100</p>
            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span>+10</span>
          </div>
          <div class="bottomButton" :class="[status1War]">
            <p @click="getTaskStatus(broker_id,robot_id,status2,'np2',token)">{{status2}}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img_thir" alt />
          </div>
          <div class="textContent">
            <span>在商店里边上架你的知识库吧</span>
            <p>去精灵商店上架知识库</p>
          </div>
        </div>
        <div class="rightBox">
          <div
            v-if="bxmove"
            v-show="itemSelected==='np3'"
            class="topTitle"
            :class="{ 'movetransition': bxmove?'movetransition':'' }"
          >
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p class="tanchutext" v-if="showTitle">+4000</p>

            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span class="tanchutext" v-if="showTitle">+10</span>
          </div>
          <div class="topTitle" :class="{'moveTitle':itemSelected==='np3' ?'':'moveTitle'}">
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p>+4000</p>
            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span>+10</span>
          </div>
          <div class="bottomButton" :class="[status2War]">
            <p @click="getTaskStatus(broker_id,robot_id,status3,'np3',token)">{{status3}}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img_thir" alt />
          </div>
          <div class="textContent">
            <span>找到第一位好友</span>
            <p>到“发现好友”找到一位朋友，并关注他</p>
          </div>
        </div>
        <div class="rightBox">
          <div
            v-if="bxmove"
            v-show="itemSelected==='np4'"
            class="topTitle"
            :class="{ 'movetransition': bxmove?'movetransition':'' }"
          >
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p class="tanchutext" v-if="showTitle">+100</p>

            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span class="tanchutext" v-if="showTitle">+10</span>
          </div>
          <div class="topTitle" :class="{'moveTitle':itemSelected==='np4' ?'':'moveTitle'}">
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p>+100</p>
            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span>+10</span>
          </div>
          <div class="bottomButton" :class="[status3War]">
            <p @click="getTaskStatus(broker_id,robot_id,status4,'np4',token)">{{status4}}</p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img_thir" alt />
          </div>
          <div class="textContent">
            <span>购买一个知识库，收获别人的智慧</span>
            <p>拜访一位朋友，并且购买他的知识库</p>
          </div>
        </div>

        <div class="rightBox">
          <div
            v-if="bxmove"
            v-show="itemSelected==='np5'"
            class="topTitle"
            :class="{ 'movetransition': bxmove?'movetransition':'' }"
          >
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p class="tanchutext" v-if="showTitle">+100</p>

            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span class="tanchutext" v-if="showTitle">+20</span>
          </div>
          <div class="topTitle" :class="{'moveTitle':itemSelected==='np5' ?'':'moveTitle'}">
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p>+100</p>
            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span>+20</span>
          </div>
          <div class="bottomButton" :class="[status4War]">
            <p @click="getTaskStatus(broker_id,robot_id,status5,'np5',token)">{{status5}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { taskStatusUpdate } from "../../../axios/axios-api";
export default {
  name: "NewTask",
  data() {
    return {
      status: "",
      status2: "",
      status3: "",
      status4: "",
      status5: "",
      statusWar: "",
      status1War: "",
      status2War: "",
      status3War: "",
      status4War: "",
      result: Object,
      type: "",
      img: require("../../../assets/images/login@2x.png"),
      img_sec: require("../../../assets/images/hi@2x.png"),
      img_thir: require("../../../assets/images/baifang@2x.png"),
      img1: require("../../../assets/images/jingyan.png"),
      img2: require("../../../assets/images/jignhangs.png"),
      token: "",
      level: "",
      bxmove: false,
      showTitle: true,
      itemSelected: ""
    };
  },
  props: ["broker_id_prop", "robot_id_prop", "token_prop"],

  mounted() {
    this.broker_id = this.broker_id_prop;
    this.robot_id = this.robot_id_prop;
    this.token = this.token_prop
    // this.broker_id = 1;
    // this.robot_id = 1;
    // this.token = "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np";
    //获取任务所有的状态
    let param = {
      broker_id: this.broker_id_prop,
      robot_id: this.robot_id_prop,
      operation_type: 99,
      token: this.token_prop
      // "broker_id": 1,
      // "robot_id": 1,
      // "operation_type": 99,
      // "token": "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"
    };
    let result = taskStatusUpdate(param);
    result
      .then(res => {
        console.log(res, "任务列表");
        this.np1 = res.result.np1;
        if (this.np1 == "0") {
          this.status = "去完成";
          this.statusWar = "twos";
        } else if (this.np1 == "1") {
          this.status = "领取";
          this.statusWar = "";
        } else if (this.np1 == "2") {
          this.status = "已完成";
          this.statusWar = "threes";
        }
        this.np2 = res.result.np2;
        if (this.np2 == "0") {
          this.status2 = "去完成";
          this.status1War = "twos";
        } else if (this.np2 == "1") {
          this.status2 = "领取";
          this.status1War = "";
        } else if (this.np2 == "2") {
          this.status2 = "已完成";
          this.status1War = "threes";
        }
        this.np3 = res.result.np3;
        if (this.np3 == "0") {
          this.status3 = "去完成";
          this.status2War = "twos";
        } else if (this.np3 == "1") {
          this.status3 = "领取";
          this.status2War = "";
        } else if (this.np3 == "2") {
          this.status3 = "已完成";
          this.status2War = "threes";
        }
        this.np4 = res.result.np4;
        if (this.np4 == "0") {
          this.status4 = "去完成";
          this.status3War = "twos";
        } else if (this.np4 == "1") {
          this.status4 = "领取";
          this.status3War = "";
        } else if (this.np4 == "2") {
          this.status4 = "已完成";
          this.status3War = "threes";
        }
        this.np5 = res.result.np5;
        if (this.np5 == "0") {
          this.status5 = "去完成";
          this.status4War = "twos";
        } else if (this.np5 == "1") {
          this.status5 = "领取";
          this.status4War = "";
        } else if (this.np5 == "2") {
          this.status5 = "已完成";
          this.status4War = "threes";
        }
        this.level = res.result.level;
      })
      .catch(reslove => {
        console.log("error");
      });
  },
  methods: {
    getTaskStatus(broker_id, robot_id, status, task_id, token) {
      if (status == "领取") {
        //动画状态
        this.bxmove = !this.bxmove;
        this.itemSelected = task_id;
        setTimeout(() => {
          //延时关闭UI状态
          this.bxmove = false;
          this.itemSelected = "";
        }, 1000);
        //领取金币，更新金币和经验
        let param = {
          broker_id: this.broker_id_prop,
          robot_id: this.robot_id_prop,
          operation_type: 7,
          token: this.token_prop,
          task_id: task_id

          // "broker_id": broker_id,
          // "robot_id": robot_id,
          // "operation_type": 7,
          // "token": token,
          // "task_id": task_id,
        };
        let result = taskStatusUpdate(param);
        result
          .then(res => {
            console.log(res, "领取任务信息");
            let result = res.result[task_id];
            if (result == "2") {
              if (task_id == "np1") {
                this.status = "已完成";
              } else if (task_id == "np2") {
                this.status2 = "已完成";
              } else if (task_id == "np3") {
                this.status3 = "已完成";
              } else if (task_id == "np4") {
                this.status4 = "已完成";
              } else if (task_id == "np5") {
                this.status5 = "已完成";
              }
              if (res.result.level > this.level) {
                this.$alert("恭喜你升级了！", "提示");
              }
            }
          })
          .catch(reslove => {
            console.log("error");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main {
    height: 350px;
    overflow-y: auto;
  }

  .main::-webkit-scrollbar {
    display: none;
  }

  .content {
    margin: 12px 0;
    width: 335px;
    height: 100px;
    background: rgba(245, 160, 21, 1);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;

    &:nth-child(2) {
      background: rgba(76, 208, 105, 1);
    }

    &:nth-child(3) {
      background: rgba(246, 94, 94, 1);
    }

    &:nth-child(4) {
      background: rgba(40, 201, 181, 1);
    }

    &:last-child {
      background: rgba(99, 117, 254, 1);
    }

    > .leftBox {
      display: flex;

      > .leftLogon {
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        margin-top: 18px;
        margin-left: 12px;

        > img {
          width: 30px;
          height: 30px;
          margin: 10px;
        }
      }

      > .textContent {
        margin-left: 5px;

        > span {
          margin-top: 20px;
          display: block;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 21px;
        }

        > p {
          margin-top: 4px;
          width: 130px;
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

        // margin-top: 23px;
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

        // &:nth-of-type(2) {
        // border:1px solid rgba(255,255,255,1);
        // background:rgba(76,208,105,1);
        // }
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

      > .twos {
        border: 1px solid rgba(255, 255, 255, 1);
        background: rgba(76, 208, 105, 1);
        > p {
          color: rgba(255, 255, 255, 1);
        }
      }

      > .threes {
        background: rgba(0, 0, 0, 0.25);
        > p {
          color: rgba(255, 255, 255, 1);
        }
      }

      > .four {
        // background:rgba(40,201,181,1);
        background: rgba(0, 0, 0, 0.25);

        > p {
          color: rgba(255, 255, 255, 1);
        }
      }

      > .fives {
        background:rgba(99, 117, 254, 1) > p {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}

.tanchutext {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #484848;
  line-height: 17px;
}

.moveTitle {
  margin-top: 20px;
  margin-left: 5px;
}

.movetransition {
  animation: iconmove 1s linear infinite;
  animation-iteration-count: 1;
}

@keyframes iconmove {
  0% {
    -webkit-transform: translateY(3px);
    opacity: 1;
  }

  25% {
    -webkit-transform: translateY(-10px);
    opacity: 0.75;
  }

  50% {
    -webkit-transform: translateY(-20px);
    opacity: 0.5;
  }

  75% {
    -webkit-transform: translateY(-30px);
    opacity: 0.25;
  }

  100% {
    -webkit-transform: translateY(-40px);

    opacity: 0;
  }
}
</style>
