<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '75%' }"
      @close="close"
    >
      <img :src="img" alt />
      <div class="title" id="title">
        <ul>
          <!-- data-index="0" -->
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
      <Friends
        v-show="curIndex == 1"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
        v-bind="$attrs"
        v-on="$listeners"
        ref="friendsRank"
      />
      <Sentiment
        v-show="curIndex == 2"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
        v-bind="$attrs"
        v-on="$listeners"
        ref='fansRank'
      />
      <Theglobal
        v-show="curIndex == 0"
        :broker_id_prop="broker_id_prop"
        :robot_id_prop="robot_id_prop"
        :token_prop="token_prop"
        v-bind="$attrs"
        v-on="$listeners"
        ref="globalRank"
      />
    </van-popup>
  </div>
</template>
<script>
import Friends from "./Friends";
import Sentiment from "./Sentiment";
import Theglobal from "./Theglobal";
export default {
  name: "Ranking",
  components: {
    Friends,
    Sentiment,
    Theglobal
  },
  data() {
    return {
      curIndex: 0,
      broker_id_prop: "",
      robot_id_prop: "",
      token_prop: "",
      show: true,
      img: require("../../assets/images/icon.png"),
      lists: [
        {
          name: "Sentiment",
          title: "全球排行"
        },
        {
          name: "Friends",
          title: "好友排行"
        },
        {
          name: "Theglobal",
          title: "人气排行"
        }
      ]
    };
  },
  props: ["ranking_show", "broker_id", "robot_id", "token"],
  inheritAttrs: false,
  created() {
    this.show = this.ranking_show;
    // this.broker_id_prop = 93;
    // this.robot_id_prop = 93;
    // this.token_prop = "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqZXg3VDowZHo1d0pIQjVxbTh6WmI4MWhVVVhmNnV5Nkk.ZXlKUVNFOU9SU0k2SWpFNE1qRXdNRGt4T0Rnd0lpd2lTVVFpT2prekxDSnBZWFFpT2pFMU9UQTRNamd6TXpFdU56VXlORGd3TTMwOjFqZXg3VDpnQVJNdGhFYkZDM0I4ZXVTZ1lJN2w4QXN0Snc.7f927d6cc7ad46abb0be8e52483a6d02";
    this.broker_id_prop = this.broker_id;
    this.robot_id_prop = this.robot_id;
    this.token_prop = this.token;
  },
  watch: {
    ranking_show(newValue) {
      this.show = newValue;
    }
  },
  mounted() {},
  methods: {
    changeIndex(i) {
      this.curIndex = i;
    },
    close() {
      this.$emit("rankingc", false);
    },
    updateRanks(){
      this.$refs.globalRank.updateGlobalRank();
      this.$refs.fansRank.updateFansRank();
      this.$refs.friendsRank.updateFriendsRank();
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
}
</style>