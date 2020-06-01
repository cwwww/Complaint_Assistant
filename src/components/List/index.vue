<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show1"
      closeable
      round
      position="bottom"
      :style="{ height: '85%' }"
      @close="close1"
    >
      <div class="title" id="title">
        <ul>
          <li
            :class="{'active': index === curIndex}"
            class="bigBox"
            v-for="(item, index) in lists"
            :key="index"
          >
            <span @click="changeIndex(index)">{{item.title}}</span>
          </li>
        </ul>
      </div>
         <Bean v-show='curIndex == 1'  :broker_id_prop='broker_id_prop' :robot_id_prop="robot_id_prop" :token_prop="token_prop"/>
         <Friend v-show='curIndex == 0' :broker_id_prop='broker_id_prop' :robot_id_prop="robot_id_prop" :token_prop="token_prop"/>
    </van-popup>
  </div>
</template>
<script>
import Bean from './Bean'
import Friend from './Friend'
export default {
    components:{
        Bean,Friend
    },
  name: "List",
  
  data() {
    return {
      show1: true,
      broker_id_prop:'',
      robot_id_prop:'',
      token_prop:'',
      lists: [
        {
          name: "Friend",
          title: "好友列表"
        },
        {
          name: "Bean",
          title: "粉丝列表"
        }
      ]
    };
  },
  props: ["list_show", "broker_id", "robot_id", "token",'curIndex'],
  created() {
    this.show1 = this.list_show;
    this.broker_id_prop=this.broker_id;
    this.robot_id_prop=this.robot_id;
    this.token_prop=this.token;
  },
  watch: {
    list_show(newValue) {
      this.show1 = newValue;
    }
  },
  mounted() {
  },
  
  methods: {
    changeIndex(i) {
      this.curIndex = i;
    },
    close1() {
      this.$emit("listc", false);
    }
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
      margin-top: 37px;
      margin-bottom: 34px;
      > ul {
        position: relative;
        display: flex;
        justify-content: space-around;
        padding-left: 108px;
        padding-right: 108px;
        > li.active {
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