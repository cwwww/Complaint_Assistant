<template>
  <div class="bigWrap">
    <div class="topLogon" @click="goInvite">
      <img :src="img3" alt />
    </div>
    <div class="states">
      <div class="show"></div>
      <span>在线</span>
      <div class="show isShow"></div>
      <p>不在线</p>
    </div>
    <div class="main">
	 <div v-for="(item,idx) in friendListe" :key="idx">
      <div class="warp" @click="clickThis(item.robot_id)" >
        <div class="left">
          <div class="littleLeft">
            <img :src="item.headimgurl === null ? img4 : item.headimgurl" alt="error" />
            <div v-if="item.online == true" class="show"></div>
            <div v-if="item.online == false" class="isShow"></div>
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
        <div class="right">
          <img :src="img1" alt />
        </div>
      </div>
	 </div>
    </div>
    <div class="button">发现更多好友</div>
  </div>
</template>
<script>
import { freandaList } from "../../../axios/axios-api";
export default {
  name: "Bean",
  data() {
    return {
      friendListe: [],
      showFriend:true,
      img: require("../../../assets/images/金牌@2x.png"),
      img1: require("../../../assets/images/next@2x.png"),
      img2: require("../../../assets/images/等级-保险配置王@2x.png"),
      img3: require("../../../assets/images/invite@3x.png"),
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
  props: ['broker_id','robot_id','token','Friend_show','name'],
  created(){
      this.showFriend = this.Friend_show
  },
  watch:{
    Friend_show(newValue){
        this.showFriend = newValue
    }
  },
  mounted() {
    let param = {
      robot_id: this.robot_id,
      broker_id: this.broker_id,
      token:this.token
    };
    console.log(param);
    let result = freandaList(param);
    result
      .then(res => {
        this.friendListe = res.result.friends;
        console.log(this.friendListe, "好友列表");
      })
      .catch(reslove => {
        alert(66666);
        console.log("error");
      });
  },
  methods: {
    goInvite() {
      this.$router.replace('/Invite')
    },
	clickThis:function(robot_id){
			  this.$emit('FriendC',false)
	}
  },
};
</script>
<style lang="scss" scoped>
.bigWrap {
.button {
  position: fixed;
  left: 151px;
  bottom: 15px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 147, 253, 1);
  line-height: 17px;
}
.topLogon {
  width: 335px;
  height: 75px;
  background-color: burlywood;
  border-radius: 37.5px;
  margin: 0 auto;
  > img {
    width: 335px;
    height: 75px;
    border-radius: 37.5px;
  }
}
.states {
  margin: 0 auto;
  width: 335px;
  display: flex;
  > .show {
    width: 12px;
    height: 12px;
    background: linear-gradient(
      133deg,
      rgba(45, 204, 132, 1) 0%,
      rgba(30, 210, 100, 1) 100%
    );
    border: 2px solid rgba(255, 255, 255, 1);
    margin-top: 23px;
    border-radius: 50%;
  }
  > .isShow {
    width: 12px;
    height: 12px;
    background: linear-gradient(
      133deg,
      rgba(225, 239, 246, 1) 0%,
      rgba(184, 195, 210, 1) 100%
    );
    border: 2px solid rgba(255, 255, 255, 1);
    margin-top: 23px;
    margin-left: 10px;
    border-radius: 50%;
  }
  > span {
    margin-top: 23px;
    display: block;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
    margin-left: 2px;
  }
  > p {
    margin-top: 23px;
    margin-left: 2px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
  }
}
.main {
  height: 350px;
  overflow-y: auto;
  margin-top: 12px;

  .warp {
    width: 335px;
    height: 80px;
    margin: 0 auto;
    border-top: solid 1px rgba(239, 239, 239, 1);
    border-bottom: solid 1px rgba(239, 239, 239, 1);
    display: flex;
    justify-content: space-between;
    margin-top: 17px;

    > .left {
      display: flex;
      > .littleLeft {
        margin-top: 15px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        position: relative;
        > img {
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
        > .show {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 12px;
          height: 12px;
          background: linear-gradient(
            133deg,
            rgba(45, 204, 132, 1) 0%,
            rgba(30, 210, 100, 1) 100%
          );
          border: 2px solid rgba(255, 255, 255, 1);

          border-radius: 50%;
        }

        > .show {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 12px;
          height: 12px;
          background: linear-gradient(
            133deg,
            rgba(45, 204, 132, 1) 0%,
            rgba(30, 210, 100, 1) 100%
          );
          border: 2px solid rgba(255, 255, 255, 1);

          border-radius: 50%;
        }
        > .isShow {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 12px;
          height: 12px;
          background: linear-gradient(
            133deg,
            rgba(225, 239, 246, 1) 0%,
            rgba(184, 195, 210, 1) 100%
          );
          border: 2px solid rgba(255, 255, 255, 1);
          margin-top: 23px;
          margin-left: 10px;
          border-radius: 50%;
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
      width: 18px;
      height: 18px;
      margin-top: 31px;
      > img {
        width: 18px;
        height: 18px;
      }
    }
  }
}
}
</style>