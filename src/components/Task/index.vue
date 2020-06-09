<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '78%' }"
      @close="close"
    >
      <img :src="img" alt />
      <div class="title" id="title">
        <ul>
          <li
            v-for="(item, index) in lists"
            :key="index"
            :class="{'active': index === curIndex}"
            class="bigBox"
          >
            <span @click="changeIndex(index)">{{item.title}}</span>
          </li>
        </ul>
      </div>
      <EveryDayTask
        v-show="curIndex == 1"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
        :dailyTaskList="DailyTaskList"
        ref="dailytask"
        v-bind="$attrs"
        v-on="$listeners"
      />
      <NewTask
        v-show="curIndex == 0"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
        ref="nptask"
        v-bind="$attrs"
        v-on="$listeners"
      />
      <ProfessionTask
        v-show="curIndex == 2"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
        ref="proTask"
      />
    </van-popup>
  </div>
</template>
<script>
import EveryDayTask from "./EveryDayTask";
import NewTask from "./NewTask";
import ProfessionTask from "./ProfessionTask";
import { taskStatusUpdate, getTaskList } from "../../axios/axios-api";
export default {
  name: "Task",
  components: {
    EveryDayTask,
    NewTask,
    ProfessionTask
  },
  data() {
    return {
      curIndex: 0,
      DailyTaskList: [],
      show: true,
      broker_id_prop: "",
      robot_id_prop: "",
      token_prop: "",
      img: require("../../assets/images/icon.png"),
      lists: [
        {
          name: "NewTask",
          title: "新手任务"
        },
        {
          name: "EveryDayTask",
          title: "每日任务"
        },
        {
          name: "ProfessionTask",
          title: "职业任务"
        }
      ],
      np1: "",
      np2: "",
      np3: "",
      np4: "",
      np5: "",
      newTaskNtn:false
    };
  },
  props: ["task_show", "broker_id", "robot_id", "token"],
  created() {
    this.show = this.task_show;
    // this.broker_id_prop = 93;
    // this.robot_id_prop = 93;
    // this.token_prop = "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqZXg3VDowZHo1d0pIQjVxbTh6WmI4MWhVVVhmNnV5Nkk.ZXlKUVNFOU9SU0k2SWpFNE1qRXdNRGt4T0Rnd0lpd2lTVVFpT2prekxDSnBZWFFpT2pFMU9UQTRNamd6TXpFdU56VXlORGd3TTMwOjFqZXg3VDpnQVJNdGhFYkZDM0I4ZXVTZ1lJN2w4QXN0Snc.7f927d6cc7ad46abb0be8e52483a6d02";
    this.broker_id_prop = this.broker_id;
    this.robot_id_prop = this.robot_id;
    this.token_prop = this.token;
  },
  watch: {
    task_show(newValue) {
      this.show = newValue;
    }
  },
  methods: {
    changeIndex(i) {
      this.curIndex = i;
    },
    close() {
      this.$emit("taskc", false);
      this.allTaskStatus()      
    },
    queryTaskStatus() {
      this.$refs.nptask.getTaskStatus();
      this.$refs.dailytask.queryDailyTask();
    },
    allTaskStatus() {
      let param = {
        broker_id: this.broker_id_prop,
        robot_id: this.robot_id_prop,
        operation_type: 99,
        token: this.token_prop
      };
      let result = taskStatusUpdate(param);
      console.log("get all task status");
      result.then(res => {
        this.newTaskNtn = res.result.task_notification;
        this.$emit("taskNotification",this.newTaskNtn);
        console.log("[allTaskStatus]:this.newTaskNtn= ",this.newTaskNtn)
      });
    }
  },
  mounted() {
    //获取任务所有的状态
    let param = {
      broker_id: this.broker_id_prop,
      robot_id: this.robot_id_prop,
      operation_type: 99,
      token: this.token_prop
      //   broker_id: 1,
      //   robot_id: 1,
      //   operation_type: 99,
      //   token: "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"
    };
    let result = taskStatusUpdate(param);
    result
      .then(res => {
        console.log(res, "任务列表");
        this.np1 = res.result.np1;
        this.np2 = res.result.np2;
        this.np3 = res.result.np3;
        this.np4 = res.result.np4;
        this.np5 = res.result.np5;
      })
      .catch(reslove => {
        console.log("error");
      });
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
  // margin-bottom: 34px;
  > .content {
    width: 100%;
    height: 466px;
    background: rgba(255, 255, 255, 1);
    > img {
      display: block;
      width: 65px;
      height: 65px;
      margin: 0 auto;
      margin-top: -31px;
    }
    .title {
      margin-top: 20px;
      margin-bottom: 21px;
      > ul {
        position: relative;
        display: flex;
        justify-content: space-around;
        padding-left: 63px;
        padding-right: 63px;
        & > li.active {
          font-size: 17px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: rgba(0, 147, 253, 1);
          position: relative;
          &::after {
            content: "";
            width: 35px;
            height: 3px;
            background: rgba(0, 147, 253, 1);
            border-radius: 2px;
            position: absolute;
            top: 30px;
            left: 13px;
          }
        }
        > .bigBox {
          height: 21px;
          font-size: 17px;
          font-family: PingFangSC-Medium, PingFang SC;
          color: rgba(102, 102, 102, 1);
          line-height: 21px;
        }
      }
    }
  }
}
</style>