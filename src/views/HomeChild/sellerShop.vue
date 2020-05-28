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
            v-for="(route, index) in routes"
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
export default {
  name: "sellerShop",
  data() {
    return {
      // flag:0,
      curIndex: 0,
      show: true,
      img: require("../../assets/images/icon.png"),
      routes: [
        {
          name: "myShop",
          title: "我的商店",
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
  methods: {
    changeIndex(i) {
      this.curIndex = i;
    },
    close() {
      this.$router.replace('/')
    }
  },
  mounted(){
    // this.curIndex = i
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
  > .rightLogin {
    width:80px;
    height:32px;
    background:rgba(0,147,253,1);
    border-radius:16px;
    margin: 29px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;

    > img{
      width: 16px;
      height: 16px;  
    }
    > div{
      font-size:15px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:21px;
      margin-left: 2px;
    }
  }
}
</style>