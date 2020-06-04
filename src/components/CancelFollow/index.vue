<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '36%',color:'black'}"
      @close="close"
    >
      <div class="centerContent">
        <center>
          <div class="loginImg">
            <img :src="followImg" alt style="width: 45px;margin-top: 10px;" />
          </div>
          <div class="cancelFollow">不再关注&nbsp;@{{followName}}？</div>
        </center>
      </div>
      <div class="line"></div>
      <div class="centerContentSize">
        <div class="cancelFollowSize" @click="cancelFollows">
          <font color="#FD2929">取消关注</font>
        </div>
      </div>
      <div class="bottomLine"></div>
      <center>
        <div class="centerContentSize">
          <div class="cancelFollowSize" @click="close">
            <font color="#333333">取消</font>
          </div>
        </div>
      </center>
      <router-view />
    </van-popup>
  </div>
</template>
<script>
import { Popup, Toast } from "vant";
import {
  reqShowList,
  reqHomeInit,
  reqEnable_kb,
  reqDisable_kb,
  reqReceive_official_kb,
  reqstarRating,
  guanZhu
} from "../../axios/axios-api";
export default {
  name: "Repository",
  data() {
    return {
      // robot_id: "",
      followed_robot_id: "",
      // broker_id: "",
      followName: "",
      show: true,
      followImg: "",
      // token: ""
    };
  },
    props: ['cancelfollow','robot_visitId','broker_id','robot_id','token'],
  created(){
      this.show = this.cancelfollow
  },
  watch:{
    cancelfollow(newValue){
        this.show = newValue
    }
  },
  methods: {
    close() {
      this.$emit('cancelfollowC',false)
    },
    cancelFollows() {
      let param = {
        robot_id: this.robot_id,
        followed_robot_id: this.robot_visitId,
        operation_type: "1",
        broker_id: this.broker_id,
        token:this.token
      };
      let result = guanZhu(param);
      console.log("[cancelFollow param]:",JSON.stringify(param))
      result
        .then(res => {
          console.log("guanzhu:" + res);
          let content = res.result.info;
          if (content == "已取消关注") {
            this.$emit('cancelfollowC',false)
            this.$emit('changeStatus')
          }
        })
        .catch(reslove => {
          console.log("error");
        });
    }
  },
  mounted() {
    // this.followName = this.$route.query.follow_name;
    // this.followImg = this.$route.query.follow_img;
    // this.robot_id = this.$route.query.robot_id;
    // this.followed_robot_id = this.$route.query.followed_robot_id;
    // this.broker_id = this.$route.query.broker_id;
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
  font-family: PingFangSC-Medium, PingFang SC;
  width: 100%;
  height: 100%;
  .cancelFollow {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 400;
    // color: rgba(155, 155, 155, 1);
    color: #666666;
    line-height: 22px;
    margin-top: 5px;
  }
  .centerContentSize {
    position: relative;
  }
  .cancelFollowSize {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 22px;
    margin-top: 5px;
  }
  > .line {
    width: 100%;
    height: 6px;
    background: rgba(245, 245, 245, 1);
    margin-top: 30px;
    margin-bottom: 16px;
  }
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

      margin-bottom: 5px;
    }
    > .bigContent {
      width: 305px;
      height: 120px;
      background: rgba(233, 70, 70, 1);
      border-radius: 15px;
      margin: 20px auto 0px auto;
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
          margin-right: 20px;
          > .buttonAnd {
            width: 85px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border-radius: 16px;
            text-align: center;
            margin-top: 20px;
            line-height: 32;
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
  }
}
.line {
  width: 335px;
  height: 2px;
  background: rgba(245, 245, 245, 1);
  margin-top: 25px;
  margin: 15px auto 0px auto;
}
.bottomLine {
  width: 100%;
  height: 10px;
  background: rgba(239, 239, 239, 1);
  margin: 15px auto 0px auto;
}
</style>