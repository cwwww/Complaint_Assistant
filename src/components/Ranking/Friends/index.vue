<template>
  <div>
    <!-- 人气 -->
    <div class="main">
      <div v-for="(item, idx) in theglobalListe" :key="idx">
        <div class="wrap"  @click="clickThis(item.broker_id,item.robot_id)">
          <div class="left">
            <div class="leftLittleLogon">
              <img v-if="idx == 0" :src="img" alt />
              <img v-if="idx == 1" :src="img2" alt />
              <img v-if="idx == 2" :src="img3" alt />
              <p v-if="idx > 2">{{ idx > 2 ? idx+1 : ''}}</p>
            </div>
            <div class="leftBigLogon">
              <img :src="item.headimgurl === null ? img4 : item.headimgurl" alt="error" />
            </div>

            <div class="content">
              <div class="topTitle">
                <span>{{item.name}}</span>
                <div class="lelve">
                  <p>Lv.{{item.level}}</p>
                </div>
                <div class="dengji">
                  <img v-if="item.level == 0" :src="gradeOne" alt />
                  <img v-if="item.level == 1" :src="gradeTwo" alt />
                  <img v-if="item.level == 2" :src="gradeThree" alt />
                  <img v-if="item.level == 3" :src="gradeFour" alt />
                  <img v-if="item.level == 4" :src="gradeFive" alt />
                  <img v-if="item.level == 5" :src="gradeSix" alt />
                  <img v-if="item.level == 6" :src="gradeSeven" alt />
                </div>
              </div>
              <div class="bottom">
                <div class="biaoqian">
                  <span>粉丝数：{{item.fans_num}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="rightLogin">
            <img :src="img1" alt />
          </div>
        </div>
        <div class="bottomLine"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { RanlingDatasQi } from "../../../axios/axios-api";
export default {
  name: "Sentiment",
  data() {
    return {
      theglobalListe: [],
      paiming: "1",
      img: require("../../../assets/images/金牌@2x.png"),
      img1: require("../../../assets/images/next@2x.png"),
      img2: require("../../../assets/images/银牌@2x.png"),
      img3: require("../../../assets/images/铜牌@2x.png"),
      img4: require("../../../assets/images/默认头像@2x.png"),
      gradeOne: require("../../../assets/images/等级-保险新手@2x.png"),
      gradeTwo: require("../../../assets/images/等级-保险复读机@2x.png"),
      gradeThree: require("../../../assets/images/等级-保险条款王@2x.png"),
      gradeFour: require("../../../assets/images/等级-保险配置王@2x.png"),
      gradeFive: require("../../../assets/images/等级-保险百科@2x.png"),
      gradeSix: require("../../../assets/images/等级-保险大咖@2x.png"),
      gradeSeven: require("../../../assets/images/等级-保险名人堂@2x.png"),
    };
  },

  mounted() {
    let param = {
      robot_id: 33,
      broker_id: 33,
      token:
        "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
    };
    console.log(param);
    let result = RanlingDatasQi(param);
    result
      .then(res => {
        this.theglobalListe = res.result.fans;
        console.log(this.theglobalListe, "人气");
      })
      .catch(reslove => {
        alert(66666);
        console.log("error");
      });
  },
  methods:{
	  clickThis:function(broker_id,robot_id,token){
		  alert("broker_id:"+broker_id +  "robot_id:" + robot_id+"token:"+token);
		  this.$router.push({
		    path:'/HomeOther',
		    query:{
		      robot_id: robot_id,
			  broker_id:broker_id,
			  token:"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT"
		    }
		  })
	  }
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
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  > .left {
    display: flex;
    margin-left: 20px;
    > .leftLittleLogon {
      margin-top: 12px;
      > img {
        width: 23px;
        height: 27px;
      }
      > p {
        width: 23px;
        height: 27px;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        text-align: center;
      }
    }
    > .leftBigLogon {
      margin-left: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: aqua;
      > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    > .content {
      > .topTitle {
        margin-top: 3px;
        display: flex;
        > span {
          margin-left: 8px;
          display: block;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
        > .lelve {
          height: 17px;
          background: linear-gradient(
            139deg,
            rgba(255, 186, 79, 1) 0%,
            rgba(255, 146, 13, 1) 100%
          );
          border-radius: 2px;
          margin-left: 5px;
          > p {
            padding: 1px 3px 1px 3px;
            height: 17px;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;
          }
        }
        > .dengji {
          margin-left: 5px;
          width: 80px;
          height: 18px;
          > img {
            width: 80px;
            height: 18px;
          }
        }
      }
      > .bottom {
        margin-top: 6px;
        display: flex;
        > .biaoqian {
          margin-left: 8px;
          > span {
            display: block;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 17px;
          }
        }
      }
    }
  }
  > .rightLogin {
    width: 18px;
    height: 18px;
    float: right;
    margin-right: 20px;
    margin-top: 13px;
    > img {
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