<template>
  <div class="wrap">
    <div class="main">
    <div class="content">
      <div class="leftBox">
        <div class="leftLogon">
          <img :src="img" alt />
        </div>
        <div class="textContent">
          <span>和机器人第一次聊天</span>
          <p>和机器人说第一句话</p>
        </div>
      </div>
      <div class="rightBox">
        <div class="topTitle">
          <div class="leftImg">
            <img :src="img1" alt />
          </div>
          <p>+100</p>
          <div class="rightImg">
            <img :src="img2" alt />
          </div>
          <span>+10</span>
        </div>
        <div class="bottomButton">
          <p>领取</p>
        </div>
      </div>
    </div>

 <div class="content">
      <div class="leftBox">
        <div class="leftLogon">
          <img :src="img" alt />
        </div>
        <div class="textContent">
          <span>教机器人的第一条知识</span>
          <p>在知识库增加一条对话</p>
        </div>
      </div>
      <div class="rightBox">
        <div class="topTitle">
          <div class="leftImg">
            <img :src="img1" alt />
          </div>
          <p>+100</p>
          <div class="rightImg">
            <img :src="img2" alt />
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
          <img :src="img" alt />
        </div>
        <div class="textContent">
          <span>在商店里边上架你的知识库吧</span>
          <p>去精灵商店上架知识库</p>
        </div>
      </div>
      <div class="rightBox">
        <div class="topTitle">
          <div class="leftImg">
            <img :src="img1" alt />
          </div>
          <p>+4000</p>
          <div class="rightImg">
            <img :src="img2" alt />
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
          <img :src="img" alt />
        </div>
        <div class="textContent">
          <span>找到第一位好友</span>
          <p>到“发现好友”找到一位朋友，并关注他</p>
        </div>
      </div>
      <div class="rightBox">
        <div class="topTitle">
          <div class="leftImg">
            <img :src="img1" alt />
          </div>
          <p>+100</p>
          <div class="rightImg">
            <img :src="img2" alt />
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
          <img :src="img" alt />
        </div>
        <div class="textContent">
          <span>购买一个知识库，收获别人的智慧</span>
          <p>拜访一位朋友，并且购买他的知识库</p>
        </div>
      </div>
      <div class="rightBox">
        <div class="topTitle">
          <div class="leftImg">
            <img :src="img1" alt />
          </div>
          <p>+100</p>
          <div class="rightImg">
            <img :src="img2" alt />
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
      img: require("../../../assets/images/login@2x.png"),
      img1: require("../../../assets/images/jingyan.png"),
      img2: require("../../../assets/images/jignhangs.png")
    };
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main{
    height:350px;
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
      background:rgba(76,208,105,1);
    }
    &:nth-child(3) {
     background:rgba(246,94,94,1);
    }
    &:nth-child(4) {
      background:rgba(40,201,181,1);
    }
    &:last-child {
background:rgba(99,117,254,1);
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

      > .topTitle {
        display: flex;
        margin-top: 23px;
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
   border:1px solid rgba(255,255,255,1);
          background:rgba(76,208,105,1);
          > p {
            color:rgba(255,255,255,1);
          }
      }
      > .threes {
        background:rgba(246,94,94,1);
        > p {
           color:rgba(255,255,255,1);
        }
      }
      > .four {
        background:rgba(40,201,181,1);
         > p {
           color:rgba(255,255,255,1);
        }
      }
      > .fives {
        background:rgba(99,117,254,1)
         > p {
           color:rgba(255,255,255,1);
        }
      }
    }
  }
}
</style>