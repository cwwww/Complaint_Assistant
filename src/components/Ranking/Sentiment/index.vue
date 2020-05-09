<template>
  <div>
      
    <div v-for="(item, idx) in shuju" :key="idx">
      <div class="wrap">
        <div class="left">
          <div class="leftLittleLogon">
            <img :src="item.img" alt />
          </div>
          <div class="leftBigLogon">
            <!-- <img :src="img" alt /> -->
          </div>
          <div class="content">
            <div class="topTitle">
              <span>
                <!-- Walker -->
                {{item.h}}
              </span>
              <div class="lelve">
                <p>Lv.35</p>
              </div>
              <div class="dengji">
                <img :src="item.img2" alt />
              </div>
            </div>
            <div class="bottom">
              <!-- <div class="biaoqian">
                <p>顶级流量</p>
              </div>-->
              <div class="biaoqian">
                <span>粉丝数：{{item.h}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rightLogin">
          <img :src="item.img1" alt />
        </div>
      </div>
      <div class="bottomLine"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sentiment",
  data() {
    return {
      //   img: require("../../../assets/images/金牌@2x.png"),
      //   img1: require("../../../assets/images/next@2x.png"),
      shuju: [
        {
          img: require("../../../assets/images/金牌@2x.png"),
          img1: require("../../../assets/images/next@2x.png"),
          img2: require("../../../assets/images/等级-保险配置王@2x.png"),
          h: "wagma",
          hah: "239",

          //           h: [
          //               {
          //  he: "wagma",

          //               },

          //                {
          //  he: "wagma",

          //               },
          //                {
          //  he: "wagma",

          //               },
          //           ],
          hs: "wagma"
        },
        {
          img: require("../../../assets/images/金牌@2x.png"),
          img1: require("../../../assets/images/next@2x.png"),
          img2: require("../../../assets/images/等级-保险新手@2x.png"),
          h: "wagma",
          hah: "239vdcdcd",
          h: "wagma",
          hs: "wagma"
        }
        //                  {
        //  img: require("../../../assets/images/金牌@2x.png"),
        //  img1: require("../../../assets/images/next@2x.png"),
        //  h: "wagma",
        //  hah: "239",
        //  h: "wagma",
        //  hs: "wagma",
        //           },
        //                  {
        //  img: require("../../../assets/images/金牌@2x.png"),
        //  img1: require("../../../assets/images/next@2x.png"),
        //  h: "wagma",
        //  hah: "239",
        //  h: "wagma",
        //  hs: "wagma",
        //           },
        //                  {
        //  img: require("../../../assets/images/金牌@2x.png"),
        //  img1: require("../../../assets/images/next@2x.png"),
        //  h: "wagma",
        //  hah: "239",
        //  h: "wagma",
        //  hs: "wagma",
        //           },
        //                  {
        //  img: require("../../../assets/images/金牌@2x.png"),
        //  img1: require("../../../assets/images/next@2x.png"),
        //  h: "wagma",
        //  hah: "239",
        //  h: "wagma",
        //  hs: "wagma",
        //           },
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  //   border-bottom: 1px solid #cccccc;
  //   padding-bottom: 15px;
  > .left {
    display: flex;
    margin-left: 20px;
    > .leftLittleLogon {
      margin-top: 12px;
      > img {
        width: 23px;
        height: 27px;
      }
    }
    > .leftBigLogon {
      margin-left: 10px;
      width: 50px;
      height: 50px;
      background-color: darkcyan;
      border-radius: 50%;
      > img {
        width: 50px;
        height: 50px;
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
        //   background: rgba(236, 247, 255, 1);
        //   border-radius: 11px;
         > span {
             display: block;
             font-size:12px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(102,102,102,1);
line-height:17px;
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
  //   margin-top: 15px;
  margin: 15px auto 0px auto;
}
</style>