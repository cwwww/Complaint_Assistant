<template>
  <div class="main">
    <div  v-for="(item, idx) in baenstList" :key="idx"  >
	 <div class="warp" @click="clickThis(item.robot_id)">
      <div class="left">
        <div class="littleLeft">
          <img :src="item.headimgurl === null ? img4 : item.headimgurl" alt="error" />
        </div>
        <div class="littleRight">
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
            <div class="biaoqian" v-for="(items, idxs) in item.medals" :key="idxs">
              <p>{{items}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.followed == false" class="right">
        <span>关注</span>
      </div>
      <div v-if="item.followed == true" class="rightNo">
        <span>已关注</span>
      </div>
	 </div>
    </div>
  </div>
</template>
<script>
import { BeanList } from "../../../axios/axios-api";
export default {
  name: "Bean",
  data() {
    return {
      baenstList: [],
      img: require("../../../assets/images/金牌@2x.png"),
      img2: require("../../../assets/images/等级-保险配置王@2x.png"),
      img4: require("../../../assets/images/默认头像@2x.png"),
      gradeOne: require("../../../assets/images/等级-保险新手@2x.png"),
      gradeTwo: require("../../../assets/images/等级-保险复读机@2x.png"),
      gradeThree: require("../../../assets/images/等级-保险条款王@2x.png"),
      gradeFour: require("../../../assets/images/等级-保险配置王@2x.png"),
      gradeFive: require("../../../assets/images/等级-保险百科@2x.png"),
      gradeSix: require("../../../assets/images/等级-保险大咖@2x.png"),
      gradeSeven: require("../../../assets/images/等级-保险名人堂@2x.png")
    };
  },
  mounted() {
    let param = {
      robot_id: 33,
      operation_type: 1,
      broker_id: 33,
      token:
        "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
    };
    console.log(param);
    let result = BeanList(param);
    result
      .then(res => {
        this.baenstList = res.result.followers;
        console.log(this.baenstList, "粉丝");
      })
      .catch(reslove => {
        alert(66666);
        console.log("error");
      });
  },
  
  methods:{
  	 clickThis:function(robot_id){
  	 		  this.$router.push({
  	 		    path:'/HomeOther',
  	 		    query:{
  	 		      robot_id: 33,
  	 			  broker_id:33,
  				  robot_visitId:robot_id,
  	 			  token:"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
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

  .warp {
    width: 335px;
    height: 80px;
    //   background-color: aqua;
    margin: 0 auto;
    border-top: solid 1px rgba(239, 239, 239, 1);
    border-bottom: solid 1px rgba(239, 239, 239, 1);
    display: flex;
    justify-content: space-between;

    > .left {
      display: flex;
      > .littleLeft {
        margin-top: 15px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        > img {
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
      }
      > .littleRight {
        > .topTitle {
          // margin-top: 3px;
          display: flex;
          > span {
            margin-left: 8px;
            margin-top: 18px;
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
            margin-top: 19px;
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
            margin-top: 19px;
            width: 80px;
            height: 18px;
            > img {
              width: 80px;
              height: 18px;
            }
          }
        }
        > .bottom {
          display: flex;
          > .biaoqian {
            margin-left: 8px;
            margin-top: 3px;
            background: rgba(236, 247, 255, 1);
            border-radius: 11px;
            > p {
              padding: 2px 8px 3px 8px;
              font-size: 12px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(0, 134, 231, 1);
              line-height: 17px;
            }
          }
        }
      }
    }
    > .right {
      margin-top: 24px;
      width: 70px;
      height: 32px;
      background: rgba(0, 147, 253, 1);
      border-radius: 16px;
      > span {
        display: block;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 32px;
        text-align: center;
      }
      > .isNoe {
        display: block;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 32px;
        text-align: center;
      }
    }

    > .rightNo {
      margin-top: 24px;
      width: 70px;
      height: 32px;
      background: rgba(255, 255, 255, 1);

      border-radius: 16px;
      border: 1px solid rgba(153, 153, 153, 1);
      > span {
        display: block;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 32px;
        text-align: center;
      }
    }
  }
}
</style>