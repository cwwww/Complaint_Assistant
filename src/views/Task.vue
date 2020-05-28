<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '70%' }"
      @close="close"
    >
      <img :src="img" alt />
      <div class="title" id="title">
        <ul>
          <router-link
            v-for="(route, index) in lists"
            :key="index"
            data-index="0"
            :class="{'active': index === curIndex}"
            class="bigBox"
            :to="{name: route.name}"
            tag="li"
          >
            <span @click="changeIndex(index)">{{route.title}}</span>
          </router-link>
        </ul>
      </div>
      <router-view />
    </van-popup>
  </div>
</template>
<script>
import { taskStatusUpdate } from "../axios/axios-api";
export default {
  name: "Task",
  data() {
    return {
      curIndex: 0,
      show: true,
      img: require("../assets/images/icon.png"),
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
	  np1:"",
	  np2:"",
	  np3:"",
	  np4:"",
	  np5:"",
    };
  },
  methods: {
    changeIndex(i) {
      this.curIndex = i;
    },

    close() {
      this.$router.replace('/')
    }
  },
  mounted(){
    console.log(this.$route.query.TaskStatus)
	//获取任务所有的状态
	let param = {
	  "broker_id":1,
	  "robot_id":1,
	  "operation_type":99,
	  "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"
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
	    alert(66666);
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