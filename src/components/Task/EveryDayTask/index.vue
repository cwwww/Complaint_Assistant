<template>
  <div class="wrap">
    <div class="main">
      <div class="content" v-for="(item, index) in EverydayList" :key="item.index">
        <div class="leftBox">
          <div class="leftLogon">
            <img v-if="index == 'daily1'" src="../../../assets/images/hi@2x.png" alt />
            <img v-if="index == 'daily2'" src="../../../assets/images/baifang@2x.png" alt />
            <img v-if="index == 'daily3'" src="../../../assets/images/login@2x.png" alt />
          </div>
          <div class="textContent">
            <span>
              <!-- 每日登陆 -->
              {{item.task_name}}
            </span>
            <p>{{item.task_desc}}</p>
          </div>
        </div>
        <div class="rightBox">
          <div
            v-if="bxmove"
            v-show="itemSelected==item.task_id"
            class="topTitle"
            :class="{ 'movetransition': bxmove?'movetransition':'' }"
          >
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <div class="tanchutext" v-if="showTitle">+{{item.awarded_bcoin}}</div>

            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <div class="tanchutext" v-if="showTitle">+{{item.awarded_exp}}</div>
          </div>
          <div class="topTitle" :class="{'moveTitle':itemSelected==item.task_id?'':'moveTitle'}">
            <div class="leftImg">
              <img :src="img1" alt />
            </div>
            <p>+{{item.awarded_bcoin}}</p>

            <div class="rightImg">
              <img :src="img2" alt />
            </div>
            <span>+{{item.awarded_exp}}</span>
          </div>

          <div class="rightBox" v-show="boxshow">
            <div class="topTitle" v-if="itemSelected!=item.task_id">
              <div class="leftImg">
                <img :src="img1" alt />
              </div>

              <div class="tanchutext" v-if="showTitle">+{{item.awarded_bcoin}}</div>
              <div class="rightImg">
                <img :src="img2" alt />
              </div>

              <div class="tanchutext" v-if="showTitle">+{{item.awarded_exp}}</div>
            </div>
          </div>

          <div class="bottomButton twos" v-if="item.status == '0'">
            <p v-if="item.status == '0'">未完成</p>
          </div>
          <div class="bottomButton" v-if="item.status == '1'">
            <p
              v-if="item.status == '1'"
              @click="getTaskStatus(broker_id,robot_id,item.task_id,token,item.index)"
            >领取</p>
          </div>
          <div class="bottomButton threes" v-if="item.status == '2'">
            <p v-if="item.status == '2'">已完成</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getTaskList,
  reqDialogAgent,
  taskStatusUpdate
} from "../../../axios/axios-api";
export default {
  name: "EveryDayTask",
  data() {
    return {
      boxshow: false,
      EverydayList: {},
      status: "",
      result: Object,
      type: "",
      img: require("../../../assets/images/login@2x.png"),
      img1: require("../../../assets/images/jingyan.png"),
      img2: require("../../../assets/images/jignhangs.png"),
      bxmove: false,
      showTitle: true,
      itemSelected: "",
      newTaskNotification: false
    };
  },
  props: ["broker_id_prop", "robot_id_prop", "token_prop"],

  methods: {
    //领取任务完成
    getTaskStatus(broker_id, robot_id, task_id, token, index) {
      this.bxmove = !this.bxmove;
      this.itemSelected = task_id;
      setTimeout(() => {
        this.bxmove = false;
        this.itemSelected = "";
      }, 1000);
      let _this = this;
      //领取金币，更新金币和经验
      let param = {
        broker_id: broker_id,
        robot_id: robot_id,
        operation_type: 7,
        token: token,
        task_id: task_id
      };
      let result = taskStatusUpdate(param);
      result
        .then(res => {
          console.log(res, "领取任务信息");
          let result = res.result[task_id];
          if (res.result.level > _this.level) {
            this.$alert("恭喜你升级了！", "提示");
          }
          this.queryDailyTask();
        })
        .catch(reslove => {
          console.log("error");
        });
    },

    queryDailyTask() {
      this.newTaskNotification = false;
      let param2 = {
        broker_id: this.broker_id,
        robot_id: this.robot_id,
        token: this.token
        // "robot_id": 33,
        // "broker_id":33,
        // "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
      };
      console.log("getDailyTaskList!!");
      let res2 = getTaskList(param2);
      res2
        .then(res => {
          console.log("每日工作领取：" + res);
          this.EverydayList = res.result;
          console.log("EverydayList", this.EverydayList);
          for (var task_id in this.EverydayList) {
            console.log("status: ",task_id,":",this.EverydayList[task_id].status);
            if (this.EverydayList[task_id].status == 1) {
              this.newTaskNotification = true;
              break;
            }
          }
          this.$emit("dailyNotification", this.newTaskNotification);
          console.log("in daily component: ", this.newTaskNotification);
        })
        .catch(reslove => {
          console.log("error");
        });

      
      // alert("query_dailytask")
    }

    // addcoins() {
    //   // this.bxmove = !this.bxmove;
    //   // setTimeout(() => {
    //   //   this.bxmove=false;
    //   // }, 1200);
    // }
  },
  mounted() {
    this.robot_id = this.robot_id_prop;
    this.broker_id = this.broker_id_prop;
    this.token = this.token_prop;
    // this.robot_id = 33;
    //   this.broker_id = 33;
    //   this.token = "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1";
    this.queryDailyTask();
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
    color: rgba(245, 160, 21, 1);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    &:nth-child(2) {
      background: rgba(76, 208, 105, 1);
      color: rgba(76, 208, 105, 1);
    }
    &:nth-child(3) {
      background: rgba(246, 94, 94, 1);
      color: rgba(76, 208, 105, 1);
    }
    &:nth-child(4) {
      background: rgba(40, 201, 181, 1);
      color: rgba(40, 201, 181, 1);
    }
    &:last-child {
      background: rgba(99, 117, 254, 1);
      color: rgba(99, 117, 254, 1);
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
      // transition: all .2s;
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
          // color: rgba(245, 160, 21, 1);
          line-height: 21px;
          text-align: center;
          margin-top: 6px;
        }
      }
      > .twos {
        border: 1px solid rgba(255, 255, 255, 1);
        background: none;
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
        background: rgba(40, 201, 181, 1);
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
  100% {
    -webkit-transform: translateY(-40px);

    opacity: 0;
  }
}
</style>