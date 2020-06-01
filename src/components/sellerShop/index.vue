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

      <myShop
        v-show="curIndex == 0"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
      />
      <vipShop
        v-show="curIndex == 1"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
      />
      <mySeller
        v-show="curIndex == 2"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
      />
    </van-popup>
  </div>
</template>
<script>
import mySeller from "./mySeller";
import myShop from "./myShop";
import vipShop from "./vipShop";
export default {
  name: "sellerShop",
  components: {
    mySeller,
    myShop,
    vipShop
  },
  data() {
    return {
      curIndex: 0,
      show: true,
      img: require("../../assets/images/icon.png"),
      lists: [
        {
          name: "myShop",
          title: "我的商店"
        },
        {
          name: "vipShop",
          title: "会员商店"
        },
        {
          name: "mySeller",
          title: "我卖出的"
        }
      ]
    };
  },
  props: ["sellerShop_show", "broker_id", "robot_id", "token", "class"],
  created() {
    this.show = this.sellerShop_show;
    this.broker_id_prop = this.broker_id;
    this.robot_id_prop = this.robot_id;
    this.token_prop = this.token;
    this.type_prop = this.class
  },
  watch: {
    sellerShop_show(newValue) {
      this.show = newValue;
    }
  },
  methods: {
    changeIndex(i) {
      this.curIndex = i;
    },
    close() {
          alert(JSON.stringify(this.token_prop +'token'))
    alert(JSON.stringify(this.type_prop +'class'))
      this.$emit("sellershopc", false);
      this.curIndex = 0
    }
  },
  mounted() {

    if(this.type_prop == 1){
      this.curIndex = 1
      console.log(this.class)
    }
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
      > ul {
        position: relative;
        display: flex;
        justify-content: space-around;
        padding-left: 63px;
        padding-right: 62px;
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
  > .rightLogin {
    width: 80px;
    height: 32px;
    background: rgba(0, 147, 253, 1);
    border-radius: 16px;
    margin: 29px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      width: 16px;
      height: 16px;
    }
    > div {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
      margin-left: 2px;
    }
  }
}
</style>