<template>
  <div>
    <div class="main">
        <div class="wrap" v-for="(i, index) in list" :key="index">
          <div class="left">
            <div class="leftBigLogon">
              <img :src=i.head_icon v-show="i.head_icon != null" alt />
              <img :src=headUrl v-show="i.head_icon == null" alt />
            </div>
            <div class="content">
              <div class="topTitle">
                <!-- <span>{{i.buyer_name}}</span> -->
                <span>{{i.buyer_name}}</span>
                <div class="lelve">购买了你的{{i.goods_name}}</div>
              </div>
            </div>
          </div>
          <div class="got">
            <img :src=money alt="">
            <div>{{i.goods_price}}</div>
          </div>
          <div class="rightLogin" @click="toHomeOther">
            <img :src="img1" alt />
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { reqShowHistory } from "../../../axios/axios-api";

export default {
  name: "mySeller",
  data() {
    return {
      list:[],
      vipShop: require("../../../assets/images/包月会员@2x.png"),
      img1: require("../../../assets/images/next@2x.png"),
      money:require("../../../assets/images/money@2x.png"),
      headUrl:require("../../../assets/images/默认头像@2x.png"),
    };
  },
  methods:{
    toHomeOther(){
      this.$router.replace('/HomeOther')
    }
  },
  mounted() {
      let param = {
          "robot_id":this.$route.query.robot_id,
          "user_id":this.$route.query.broker_id,
          "token":this.$route.query.token,
        }
      let res = reqShowHistory(param)
      res.then(res=>{    
      this.list = res.result.sales_history
      console.log(this.list)
      }).catch(reslove=>{
         console.log('error')
      })
  }
};
</script>
<style lang="scss" scoped>
.main {
  height: 350px;
  overflow-y: auto;
  margin-top: 12px;
}
.wrap {
  width:314px;
  height:80px;
  background:rgba(240,243,247,1);
  border-radius:8px;
  margin-top: 25px;
  margin-left: 41px;
  display: flex;
  justify-content: space-between;
  position: relative;
  > .left {
    display: flex;
    margin-left: 15px;
    margin-top: 15px;
    > .leftBigLogon {
      // margin-top: 15px;
      width: 50px;
      height: 50px;
      > img {
        width: 50px;
        height: 50px;
        border-radius:25px;
      }
    }
    > .content {
      > .topTitle {
        margin-top: -2px;
        // display: flex;
        font-weight:500;
        > span {
          margin-left: 10px;
          display: block;
          font-size:15px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:21px;
        }
        > .lelve {
          white-space: nowrap;
          margin-left: 10px;
          color: #999;
          margin-top: 6px;
        }
        > .dengji {
          margin:3px 0 3px 10px;
          width: 187px;
          height: 18px;
          display: flex;
          .dengji2{
            margin-left: 8px;
            color: #999;
          }
          > img {
            width: 80px;
            height: 18px;
          }
        }
      }
    }
  }
  .got{
    display: flex;
    margin: 29px 0 0 47px;
    img{
      width: 22px;
      height: 22px;
    }
    > div{
        margin-left: 3px;
        font-size:15px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(251,177,27,1);
        line-height:21px;
      }
  }
  > .rightLogin {
      margin: 31px 10px 0 0;
      img{
        width: 18px;
        height: 18px;
      }
  }
}
.bottomLine {
  width: 335px;
  height: 1px;
  background: rgba(239, 239, 239, 1);
  margin: 15px auto 0px auto;
}
</style>