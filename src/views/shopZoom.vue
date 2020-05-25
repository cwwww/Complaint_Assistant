<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '70%' }"
      @close="close"
    >
      <span>知识库</span>
      <div class="line"></div>
      <p>10-29 08:23</p>
      <div class="centercontent">
        <div class="question">
          <div class="topQ">
            <img :src="img" alt />
            <img :src="img5" alt="">
          </div>
          <div class="texts">
            <p>{{this.$route.query.Question}}</p>
          </div>
        </div>
        <div class="assets">
          <img :src="img1" alt />
          <textarea class="text" v-show="this.isShow" id="myText">
            {{this.$route.query.Answer}}
            </textarea> 
          <div class="text2" v-show="!this.isShow">
            {{this.$route.query.Answer}}
          </div>
          <!-- <textarea class="text">
            </textarea> -->
        </div>
        <div class="buttons">
          <img :src="img2" @click="toEdit" alt />
          <img :src="img3" v-show="this.isShow" @click="toSave" alt />
          <img :src="img4" v-show="!this.isShow" alt="">
        </div>
          <div style="height:20px;"></div>
        
      </div>
      <router-view />
    </van-popup>
  </div>
</template>
<script>

export default {
  name: "shopZoom",
  data() {
    return {
      curIndex: 0,
      show: true,
      isShow:false,
      img: require("../assets/images/Q_small_icon@2x.png"),
      img1: require("../assets/images/A_small_icon@2x.png"),
      img2: require("../assets/images/biajide.png"),
      img3: require("../assets/images/bachkdjfi.png"),
      img4: require("../assets/images/fabude.png"),
      img5:require("../assets/images/delete@3x.png")
    };
  },
  methods: {
    close(){
      this.$router.replace('/HomeChat')
    },
    showPopup() {
      this.show = true;
    },
    toEdit(){
      this.isShow = true
    },
    toSave(){
      this.isShow = false
      this.$route.query.Answer = document.getElementById("myText").value
    }
  },
  // watch(){
  //   console.log(document.getElementById("myText").value)
  
  // },
  mounted(){
    console.log(document.getElementById("myText").value)
  }
};
</script>
<style lang="scss" scoped>
.warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  > .content {
    width: 100%;
    height: 100%;
    > span {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(74, 74, 74, 1);
      line-height: 24px;
      display: block;
      text-align: center;
      margin-top: 10px;
    }
    > p {
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 16px;
      text-align: center;
      margin-top: 10px;
    }
    > .line {
      width: 100%;
      height: 6px;
      background: rgba(245, 245, 245, 1);
      margin-top: 10px;
      margin-bottom: 16px;
    }
    > .centercontent {
      width: 345px;
      height: auto;
      background: rgba(241, 246, 251, 1);
      border-radius: 6px;
      margin: 0 auto;
      margin-top: 18px;
      > .question {
    > .topQ {
      display: flex;
      justify-content: space-between;
          > img {
          width: 24px;
          height: 24px;
          margin-top: 19px;
          margin-left: 20px;
          &:last-child {
            width: 54px;
            height: 24px;
            margin-top: 19px;
          margin-right: 20px;
          }
        }
    }
        > .texts {
          width: 295px;
          margin-left: 20px;
          margin-top: 5px;
          > p {
            font-size: 17px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(74, 74, 74, 1);
            line-height: 24px;
          }
        }
      }
      > .assets {
        > img {
          width: 24px;
          height: 23px;
          margin-top: 20px;
          margin-left: 20px;
        }
        > .text {
          width: 305px;
          height: auto;
          height: 100px;
          margin-left: 20px;
          margin-top: 6px;
        }
        > .text2 {
          width: 305px;
          height: auto;
          // margin: 0 auto;
          margin-left: 20px;
          margin-top: 6px;
        }
      }
      > .buttons {
          margin-top: 27px;
          display: flex;
          justify-content: space-around;
        > img {
          width: 126px;
          height: 38px;
          border-radius: 19px;
          &:first-child {
            margin-left: 15px;
          }
          &:last-child {
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>