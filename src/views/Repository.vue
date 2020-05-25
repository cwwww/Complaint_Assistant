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
      <div class="bigContent" v-for="(item, index) in list" :key="index">
        <div class="sonContent">
          <div class="leftBox">
            <p style="max-width:177px;">{{item.name}}</p>
            <span>{{item.amount}}条知识</span>
          </div>
          <div class="rightBox" >
            <div class="buttonAnd" v-if="item.type != 0 && item.enable == false">
              <p>启用</p>
            </div>
            <div class="buttonAnd2" v-if="item.type != 0 && item.enable == true">
              <p>取消启用</p>
            </div>
          </div>
        </div>
        <div class="bottomBox">
          <div class="bottomFooter">
            <img :src=imglevel alt />
            <p>保险配置王</p>
          </div>
          <div class="title" v-if="item.type == 1 && item.status == 1" @click="tovisit">
            <p>前往TA的事务所</p>
            <img :src=next alt="">
          </div>
          <div class="title" v-if="item.type == 1 && item.status == 0" @click="toEvaluate(index)">
            <p>去评价</p>
            <img :src=next alt="">
          </div>
              <van-popup
                  class="cont4"
                  v-model="show4"
                >
                  <div class="contwrap">
                    <div style="margin:30px auto 0;">给知识库的内容质量评个星吧！</div>
                    <van-rate
                      v-model="value"
                      :size="46"
                      color="#FFAD25"
                      void-icon="star"
                      void-color="#eee"
                      style="margin:26px auto 25px ;"
                      @change="onChange"
                    />
                    <van-button type="info" style="width:265px;height:42px;margin:0 auto;" v-show="value != 0" @click="comfirm(index)">提交</van-button>
                    <van-button type="info" style="width:265px;height:42px;margin:0 auto;background:#eee;color:#111;border:none;" v-show="value == 0">提交</van-button>
                  </div>
              </van-popup>
        </div>
      </div>
      <router-view />
    </van-popup>
  </div>
</template>
<script>
import { Popup,Toast } from 'vant';
import { reqShowList,  reqHomeInit,reqEnable_kb,reqDisable_kb,reqReceive_official_kb, reqstarRating } from '../axios/axios-api'
export default {
  name: "Repository",
  data() {
    return {
      show: true,
      show4:false,
      star:Boolean,
      list:[],
      colorList:[0],
      imglevel:'',    
      value:'',  
      type:'',
      isEvaluate:Boolean, //是否评价
      img: require("../assets/images/icon.png"),
      product_zsk: require("../assets/images/product_zsk@2x.png"),
      next: require("../assets/images/next@2x.png"),
      levelbx1: require("../assets/images/level_xinshou@2x.png"),
      levelbx2: require("../assets/images/level_fudu@2x.png"),
      levelbx3: require("../assets/images/level_tiaokuan@2x.png"),
      levelbx4: require("../assets/images/level_peizhi@2x.png"),
      levelbx5: require("../assets/images/level_baike@2x.png"),
      levelbx6: require("../assets/images/level_daka@2x.png"),
      levelbx7: require("../assets/images/level_famous@2x.png")
    };
  },
  // watch: {
  //   star(val) {
  //     if(this.value == 0){
  //       this.star = false
  //     }else{
  //       this.star = true
  //     }
  //     // this.value = this.comfirm;
  //   }
  // },
  methods: {
    close(){
      // this.show = false
      this.$router.replace('/')
    },
    toEvaluate(index){
      this.show4 = true
      console.log(this.list[index].goods_id)
      this.type = this.list[index].goods_id
      console.log(this.type)
    },
    onChange(value) {
      // Toast('当前值：' + value);
    },
    comfirm(index){
        this.show4 = false
        let param = {
          "robot_id":"1",
          "goods_id":this.type,
          "goods_score":this.value,
          "user_id":"1",
          "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"
        }
        console.log(param)
        let res = reqstarRating (param)
        res.then(res=>{
          console.log(res)
          this.getInit()
        }).catch(reslove=>{
              console.log('error')
        })
    },
    tovisit(){
      this.$router.replace('/HomeOther')
    },
    getInit(){
      let param = {
        "robot_id":"1",
        "user_id":"1",
        "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"    
      }
      let result = reqShowList(param)
      result.then(res=>{
      this.list = res.result.kb_list
      for (let i = 0; i < this.list.length; i++) {
       if (this.list[i].level == 1) { //保险等级
          this.imglevel = this.levelbx1
        } else if(this.list[i].level == 2){
          this.imglevel = this.levelbx2
        } else if(this.list[i].level == 3){
          this.imglevel = this.levelbx3
        } else if(this.list[i].level == 4){
          this.imglevel = this.levelbx4
        } else if(this.list[i].level == 5){
          this.imglevel = this.levelbx5
        } else if(this.list[i].level == 6){
          this.imglevel = this.levelbx6
        } else if(this.list[i].level == 7){
          this.imglevel = this.levelbx7
        } 
      }
      }).catch(reslove=>{
         console.log('error')
      })
    },
    changeIndex(i) {
      this.curIndex = i;
    },
    showPopup() {
      this.show = true;
    }
  },
  mounted(){
    this.getInit()
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
            font-size: 14px;
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
          > .buttonAnd2 {
            width: 85px;
            height: 32px;
            background:rgba(0,0,0,0.25);
            border-radius: 16px;
            text-align: center;
            margin-top: 20px;
            line-height: 32;
            > p {
              font-size: 15px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color:#FFFFFF;
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
          position: relative;
          > p {
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 18px;
            margin-top: 7px;
            margin-right: 20px;
          }
          img{
            width: 10px;
            height: 10px;
            position: absolute;
            top: 11px;
            right: 10px;
          }
        }
        .cont4{
          width:305px;
          height:208px;
          background:rgba(255,255,255,1);
          border-radius:15px;
          .contwrap{
            display: flex;
            flex-direction: column;
            text-align: center;
            > img{
              width: 55px;
              height: 55px;
              margin: 25px auto 0; 
            }
            > div{
              font-size:15px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(51,51,51,1);
              line-height:21px;
            }
          }
        }
      }
    }
  }
}
</style>