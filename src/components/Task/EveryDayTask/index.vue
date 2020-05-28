<template>
  <div class="wrap">
    <div class="main">
      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img" alt>
          </div>
          <div class="textContent">
            <span>和机器人第一次聊天</span>
            <p>和机器人说第一句话</p>
          </div>
        </div>
        <div class="rightBox">
          <div v-if="bxmove" class="topTitle" :class="{ 'movetransition': bxmove?'movetransition':'' }">
            <div class="leftImg">
              <img :src="img1" alt>
            </div>
            <p v-if="showTitle">+100</p>
            <!-- <p v-else  style="width:19px"></p> -->
            <div class="rightImg">
              <img :src="img2" alt>
            </div>
            <span v-if="showTitle">+10</span>
            <!-- <span v-else style="width:19px"></span> -->
          </div>
          <div class="topTitle" :class="{'moveTitle':bxmove?'':'moveTitle'}">
            <div class="leftImg">
              <img :src="img1" alt>
            </div>
            <p>+100</p>
            <div class="rightImg">
              <img :src="img2" alt>
            </div>
            <span>+10</span>
          </div>
          <!--  <transition name="move">
		   <div v-show="showFlag" class='food'>
		     <div class="food-content">
		       <div class="image-header">
		         <img :src="img2" alt="">
		       </div>
		     </div>
		   </div>
          </transition>-->
          <transition name="move">
            <div class="rightBox" v-show="boxshow">
              <div class="topTitle">
                <div class="leftImg">
                  <img :src="img1" alt>
                </div>
                <p>+100</p>
                <div class="rightImg">
                  <img :src="img2" alt>
                </div>
                <span>+10</span>
              </div>
            </div>
          </transition>
          <div class="bottomButton" @click="addcoins">
            <p>{{this.status}}</p>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img" alt>
          </div>
          <div class="textContent">
            <span>教机器人的第一条知识</span>
            <p>在知识库增加一条对话</p>
          </div>
        </div>
        <div class="rightBox">
          <div class="topTitle">
            <div class="leftImg">
              <img :src="img1" alt>
            </div>
            <p>+100</p>
            <div class="rightImg">
              <img :src="img2" alt>
            </div>
            <span>+10</span>
          </div>
          <div class="bottomButton twos">
            <p>领取</p>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img" alt>
          </div>
          <div class="textContent">
            <span>在商店里边上架你的知识库吧</span>
            <p>去精灵商店上架知识库</p>
          </div>
        </div>
        <div class="rightBox">
          <div class="topTitle">
            <div class="leftImg">
              <img :src="img1" alt>
            </div>
            <p>+4000</p>
            <div class="rightImg">
              <img :src="img2" alt>
            </div>
            <span>+10</span>
          </div>
          <div class="bottomButton threes">
            <p>领取</p>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img" alt>
          </div>
          <div class="textContent">
            <span>找到第一位好友</span>
            <p>到“发现好友”找到一位朋友，并关注他</p>
          </div>
        </div>
        <div class="rightBox">
          <div class="topTitle">
            <div class="leftImg">
              <img :src="img1" alt>
            </div>
            <p>+100</p>
            <div class="rightImg">
              <img :src="img2" alt>
            </div>
            <span>+10</span>
          </div>
          <div class="bottomButton four">
            <p>领取</p>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img" alt>
          </div>
          <div class="textContent">
            <span>购买一个知识库，收获别人的智慧</span>
            <p>拜访一位朋友，并且购买他的知识库</p>
          </div>
        </div>
        <div class="rightBox">
          <div class="topTitle">
            <div class="leftImg">
              <img :src="img1" alt>
            </div>
            <p>+100</p>
            <div class="rightImg">
              <img :src="img2" alt>
            </div>
            <span>+20</span>
          </div>
          <div class="bottomButton fives">
            <p>领取</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EveryDayTask",
  data() {
    return {
      boxshow: false,

      status: "",
      result: Object,
      type: "",
      img: require("../../../assets/images/login@2x.png"),
      img1: require("../../../assets/images/jingyan.png"),
      img2: require("../../../assets/images/jignhangs.png"),
      bxmove: false,
      showTitle:true,
    };
  },
  methods: {
    addcoins() {
      this.bxmove = !this.bxmove;
      setTimeout(() => {
        this.bxmove=false;
        
      }, 1200);
    }
  },
  mounted() {
    console.log(this.type);
    // console.log(this.$route.query.TaskStatus.np2)
    // this.result = this.$route.query.TaskStatus
    // if(this.result.np2 == 2){
    //     this.status = '已领取'
    // }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    height: 350px;
    overflow-y: auto;
  }
  .content {
    margin: 12px 0;
    width: 335px;
    height: 100px;
    background: rgba(245, 160, 21, 1);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    &:nth-child(2) {
      background: rgba(76, 208, 105, 1);
    }
    &:nth-child(3) {
      background: rgba(246, 94, 94, 1);
    }
    &:nth-child(4) {
      background: rgba(40, 201, 181, 1);
    }
    &:last-child {
      background: rgba(99, 117, 254, 1);
    }
    > .leftBox {
      display: flex;
      > .leftLogon {
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        margin-top: 25px;
        margin-left: 15px;
        > img {
          width: 30px;
          height: 30px;
          margin: 10px;
        }
      }
      > .textContent {
        margin-left: 5px;
        > span {
          margin-top: 20px;
          display: block;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 21px;
        }
        > p {
          margin-top: 4px;
          width: 130px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
        }
      }
    }
    > .rightBox {
      margin-right: 15px;
      // transition: all .2s;
      > .topTitle {
        display: flex;
        // margin-top: 23px;
        > .leftImg {
          width: 18px;
          height: 18px;
          margin-right: 1px;
          > img {
            width: 18px;
            height: 18px;
          }
        }
        > p {
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 17px;
          margin-right: 7px;
        }
        > .rightImg {
          width: 15px;
          height: 20px;
          margin-right: 1px;
          > img {
            width: 15px;
            height: 20px;
          }
        }
        > span {
          display: block;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 17px;
        }
      }
      > .bottomButton {
        width: 80px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border-radius: 16px;
        float: right;
        margin-top: 8px;
        // &:nth-of-type(2) {
        // border:1px solid rgba(255,255,255,1);
        // background:rgba(76,208,105,1);
        // }
        > p {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(245, 160, 21, 1);
          line-height: 21px;
          text-align: center;
          margin-top: 6px;
        }
      }
      > .twos {
        border: 1px solid rgba(255, 255, 255, 1);
        background: rgba(76, 208, 105, 1);
        > p {
          color: rgba(255, 255, 255, 1);
        }
      }
      > .threes {
        background: rgba(246, 94, 94, 1);
        > p {
          color: rgba(255, 255, 255, 1);
        }
      }
      > .four {
        background: rgba(40, 201, 181, 1);
        > p {
          color: rgba(255, 255, 255, 1);
        }
      }
      > .fives {
        background:rgba(99, 117, 254, 1) > p {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
.box {
  overflow: hidden;
  transition: all 0.25s ease-in;
  -moz-transition: all 0.25s ease-in;
  -webkit-transition: all 0.25s ease-in;
}
.moveTitle{
        margin-top: 23px;

}
.box:hover {
  border: 3px solid #ef8d0e;
  /*Y轴上表示上升*/
  transform: translateY(-100px);
}
//给过渡的name加样式

// .mybox-leave-active,.mybox-enter-active{
//  transition: all  .25s  ease-in;
// }
// .mybox-leave-active,.mybox-enter{
//  height:0px !important;
// }
// .mybox-leave,.mybox-enter-active{
//  height: 500px;
// }
.movetransition {
  animation: iconmove .3s linear 4;
 
}
@keyframes iconmove {
  0% {
    -webkit-transform: translateY(3.4667px);
     opacity: 0;
  }
  25% {
    -webkit-transform: translateY(-6.4667px);

  }
  // 50% {
  //   -webkit-transform: translateY(-9.4667px);
  // }
  // 75% {
  //   -webkit-transform: translateY(-12.4667px);
  // }
  100% {
    -webkit-transform: translateY(-15.4667px);
    //  opacity: 1;
  }
}
.move-enter,
.move--leave {
  transform: translate(100%, 0, 0);
}
.demo_transform4 {
  // -webkit-transform: translate(120px, 0);
  // -moz-transform: translate(120px, 0);
}
.menu ul li.translate a:hover {
  -moz-transform: translate(-10px, -10px);
  -webkit-transform: translate(-10px, -10px);
  -o-transform: translate(-10px, -10px);
  -ms-transform: translate(-10px, -10px);
  transform: translate(-10px, -10px);
}
</style>