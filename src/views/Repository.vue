<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ height: '70%',color:'black'}"
      @close="close"
    >
      <img :src=product_zsk alt />
      <div class="bigContent">
        <div class="sonContent">
          <div class="leftBox">
            <p>我的知识库</p>
            <span>20万条词库</span>
          </div>
          <div class="rightBox">
            <!-- <div class="buttonAnd">
              <p>启用</p>
            </div> -->
          </div>
        </div>
        <div class="bottomBox">
          <div class="bottomFooter">
            <img :src="img" alt />
            <p>保险配置王</p>
          </div>
          <div class="title">
          </div>
        </div>
      </div>

      <div class="bigContent">
        <div class="sonContent">
          <div class="leftBox">
            <p>我的知识库</p>
            <span>20万条词库</span>
          </div>
          <div class="rightBox">
            <div class="buttonAnd">
              <p>启用</p>
            </div>
          </div>
        </div>
        <div class="bottomBox">
          <div class="bottomFooter">
            <img :src="img" alt />
            <p>保险配置王</p>
          </div>
          <div class="title">
            <p>前往TA的事务所</p>
            <img :src=next alt="">
          </div>
        </div>
      </div>

      <router-view />
    </van-popup>
  </div>
</template>
<script>
import { reqShowList,  reqHomeInit,reqEnable_kb,reqDisable_kb,reqReceive_official_kb} from '../axios/axios-api'
export default {
  name: "Repository",
  data() {
    return {
      show: true,
      img: require("../assets/images/icon.png"),
      product_zsk: require("../assets/images/product_zsk@2x.png"),
      next: require("../assets/images/next@2x.png")
    };
  },
  methods: {
    close(){
      // this.show = false
      this.$router.replace('/')
    },
    changeIndex(i) {
      this.curIndex = i;
    },
    showPopup() {
      this.show = true;
    }
  },
  mounted(){
      let param = {
        "robot_id":"1",
        "user_id":"1",
        "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"    
      }
      let result = reqShowList(param)
      result.then(res=>{
      console.log(res)
      }).catch(reslove=>{
         console.log('error')
      })
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

      margin-bottom: 5px;
    }
    > .bigContent {
       width: 305px;
        height: 120px;
        background: rgba(233, 70, 70, 1);
        border-radius: 15px;
        margin: 20px auto 0px auto;
        
      > .sonContent {
       display: flex;
        justify-content: space-between;
        > .leftBox {
          > p {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 28px;
            padding-top: 15px;
            margin-left: 20px;
          }
          > span {
            display: block;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;
            margin-top: 5px;
            margin-left: 20px;
          }
        }
        > .rightBox {
          margin-right: 20px;
          > .buttonAnd {
            width: 85px;
            height: 32px;
            background: rgba(255, 255, 255, 1);
            border-radius: 16px;
            text-align: center;
            margin-top: 20px;

            line-height: 32;

            > p {
              font-size: 15px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgba(77, 96, 243, 1);
              line-height: 21px;
              padding-top: 6px;
            }
          }
        }
      }

      > .bottomBox {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        // background-color: aqua;
        > .bottomFooter {
          margin-left: 20px;
          display: flex;
          > img {
            width: 30px;
            height: 30px;
          } 
          > p {
            font-size: 15px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 21px;
            margin-left: 8px;
            margin-top: 5px;
          }
        }
        > .title {
          > p {
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 18px;
            margin-top: 7px;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>