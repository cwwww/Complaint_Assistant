<template>
    <div class="contain">
      <van-popup
        v-model="show1"
        closeable
        roundimg
        position="bottom"
        :style="{ height: '70%' }"
        @close="close"
        >
        <img class="img1" :src=shop alt />
        <div class="title">{{this.$route.query.Othername}}精灵商店<div class="active"></div></div>
        <div class="wrap"  v-if="goodsList.status!=''">
          <div class="left">
            <!-- <div class="leftLittleLogon">
              <img :src=home_mytask alt />
            </div> -->
            <div class="leftBigLogon">
              <img :src=product_zsk alt />
            </div>
            <div class="content">
              <div class="topTitle">
                <span>
                  {{goodsList.name}}
                </span>
                <div class="dengji">
                  <img :src=levelbx alt />
                  <div class="dengji2">{{goodsList.amount}}条词库</div>
                </div>
                <div class="lelve">知识库越多精灵越聪明！</div>
              </div>
              <div class="bottom">
                <van-rate v-model="star" color="#FFAD25" gutter="2px" readonly/>
              </div>
            </div>
          </div>
          <div class="rightLogin" v-show='this.fairyStatus == 0' type="text" @click="open">
            <img style="width:16px;height:16px;" :src=money alt="">
            <div>{{this.goodsList.price}}</div>
          </div>
          <!-- 精灵商店购买弹窗 -->
              <van-popup  
                  class="cont2"
                  v-model="show2"
                >
                  <div class="contwrap">
                    <div class="top">
                      <span>花费</span>
                      <img style="width:16px;height:16px;" :src=money alt="">
                      <span>{{this.goodsList.price}}</span>
                    </div>
                    <div style="margin-bottom:25px;">购买Josen的知识库吗？</div>
                    <div class="isOk">
                      <div class="isNo" @click="isNo"><span style="color:#666;">取消</span></div>
                      <div class="isYes" @click="isYes"><span style="color:#FFF;">好的</span></div>
                    </div>
                  </div>
              </van-popup>
          <!-- 精灵商店购买成功 -->
              <van-popup
                  class="cont3"
                  v-model="show3"
                  click_overlay
                >
                  <div class="contwrap">
                    <img :src=success alt="">
                    <div style="margin:20px 0 3px 0;">获得Josen的知识库</div>
                    <div>请前往知识库查看</div>
                  </div>
              </van-popup>
              <!-- 精灵商店购买失败 -->
              <van-popup
                  class="cont5"
                  v-model="show5"
                >
                  <div class="contwrap">
                    <div style="margin-top:30px;">您的B币不足</div>
                    <div style="margin:8px 0 25px 0;">在「任务」里可以赚取更多B币哦</div>
                    <van-button type="info" style="width:265px;height:42px;margin-left:20px;" @click="konw">知道了</van-button>
                  </div>
              </van-popup>
              <!-- 精灵商店评价 -->
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
                    <van-button type="info" style="width:265px;height:42px;margin:0 auto;" v-show="value != 0" @click="comfirm">提交</van-button>
                    <van-button type="info" style="width:265px;height:42px;margin:0 auto;background:#eee;color:#111;border:none;" v-show="value == 0">提交</van-button>
                  </div>
              </van-popup>
          <div class="rightLogin2" v-show='this.fairyStatus == 1' @click="toEvaluate">
            <div>评价</div>
          </div>
          <div class="rightLogin3" v-show='this.fairyStatus == 2'>
            <div>交易完成</div>
          </div>
        </div>
		<div v-else style="margin-top:40px"><center><font size="3px">商品还没有上架，请稍后再来吧！</font></center></div>
        <div class="bottomLine"  v-if="goodsList.status !=''"></div>
        <router-view></router-view>
      </van-popup>
      
    </div>
</template>
<script>
import { Popup,Toast,Button  } from 'vant';
import { reqHomeInit, reqFairyShop, reqstarRating, reqFairyBuy } from '../../axios/axios-api'
export default {
  name: "FairyShop",
  data(){
    return {
      show1: false,
      name:'',
      show2: false, // 购买弹框
      show3: false, // 购买成功弹框
      show4: false, // 评价弹框
      show5: false, // 金币不足弹框
      goodsList:{
		  status : ""
	  },
      homeInit:Object,
      bxdj:'',
      levelbx:'',
      homeLevel:'',
      star:'',
      isStatus:'',
      value:0,
      fairyStatus:'',
      img: require("../../assets/images/icon.png"),
      shop: require("../../assets/images/shop@2x.png"),
      home_zsk:require("../../assets/images/home_zsk@2x.png"),
      product_zsk:require("../../assets/images/product_zsk@2x.png"),
      home_store:require("../../assets/images/home_store@2x.png"),
      home_browse:require("../../assets/images/home_browse@2x.png"),
      home_chatrecord:require("../../assets/images/home_chatrecord@2x.png"),
      home_rankinglist:require("../../assets/images/home_rankinglist@2x.png"),
      home_medal:require("../../assets/images/home_medal@2x.png"),
      home_discover:require("../../assets/images/home_discover@2x.png"),
      home_mytask:require("../../assets/images/home_mytask@2x.png"),
      home_risktest:require("../../assets/images/home_risktest@2x.png"),
      home_planbook:require("../../assets/images/home_planbook@2x.png"),
      moon:require("../../assets/images/moon@2x.png"),
      bebot:require("../../assets/images/bebot@2x.png"),
      earth:require("../../assets/images/earth@2x.png"),
      experience:require("../../assets/images/experience@2x.png"),
      line:require("../../assets/images/jindu@2x.png"),
      famous:require("../../assets/images/famous@2x.png"),
      money:require("../../assets/images/money@2x.png"),
      levelbx1:require("../../assets/images/等级-保险新手@2x.png"),
      levelbx2:require("../../assets/images/等级-保险复读机@2x.png"),
      levelbx3:require("../../assets/images/等级-保险条款王@2x.png"),
      levelbx4:require("../../assets/images/等级-保险配置王@2x.png"),
      levelbx5:require("../../assets/images/等级-保险百科@2x.png"),
      levelbx6:require("../../assets/images/等级-保险大咖@2x.png"),
      levelbx7:require("../../assets/images/等级-保险名人堂@2x.png"),
      nextpage:require("../../assets/images/nextpage@2x.png"),
      nextpage2:require("../../assets/images/上一页@2x.png"),
      success:require("../../assets/images/success@2x.png")
    };
  },
  methods: {
    close(){
      this.$router.push({
        path:'/HomeOther',
        query:{
          robot_id: this.$route.query.robot_id,
          broker_id:this.$route.query.broker_id,
          robot_visitId:this.$route.query.robot_visitId,
		  token:this.$route.query.token
          }
      })
      
    },
    open() {
      this.show2 = true
    },
    isNo(){   //买家精灵商店取消购买
      this.show2 = false
    },
    isYes(){  //买家精灵商店确定购买
        let param = {
          "robot_id":"1",
          "goods_id":this.goodsList.id,
          "user_id":"1",
          "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"
        }
        let res = reqFairyBuy(param)
        res.then(res=>{
        console.log(res.result.status)
        if (res.result.status == 0) {
          this.show2 = false
          this.show3 = true
          // if (this.show3 == false) {
            this.fairyStatus = 1
          // } 
        } else {
          this.show2 = false
          this.show5 = true
        }
        }).catch(reslove=>{
           console.log('error')
        })
    },
    
    onChange(value) {
      // Toast('当前值：' + value);
    },
    toEvaluate(){  // 买家精灵商店评价
      this.show4 = true
    },
    comfirm(){
        this.show4 = false
        let param = {
          "robot_id":"1",
          "goods_id":this.goodsList.id,
          "goods_score":this.value,
          "user_id":"1",
          "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"
        }
        console.log(param)
        let res = reqstarRating (param)
        res.then(res=>{
          this.fairyStatus = 2
          // console.log(res)
        }).catch(reslove=>{
              console.log('error')
        })
    },
    onChange(value) {
      // alert(value)
      // Toast('当前值：' + value);
    },
    konw(){
      this.show5 = false
    }
  },
  mounted(){
      console.log(this.$route.query.Othername)
      // this.name = this.$route.query.OtherName
      this.show1 = true;
      let param = {
        "seller_id":"33",
        "buyer_id":"1",
        "user_id":"33",
        "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
      }
	  
      let res = reqFairyShop(param)
      res.then(res=>{
      var that = this
	  let length = res.result.goods_list.length ;
	  if(length > 0){
		  that.goodsList = res.result.goods_list[0]
		      console.log(that.goodsList)
		      this.fairyStatus = that.goodsList.status
		      if (that.goodsList.level == 1) { //保险等级
		          that.levelbx = this.levelbx1
		        } else if(that.goodsList.level == 2){
		          that.levelbx = this.levelbx2
		        } else if(that.goodsList.level == 3){
		          that.levelbx = this.levelbx3
		        } else if(that.goodsList.level == 4){
		          that.levelbx = this.levelbx4
		        } else if(that.goodsList.level == 5){
		          that.levelbx = this.levelbx5
		        } else if(that.goodsList.level == 6){
		          that.levelbx = this.levelbx6
		        } else if(that.goodsList.level == 7){
		          that.levelbx = this.levelbx7
		        }
		        this.star = that.goodsList.score
	    }
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
.contain{
  .img1{
      display: block;
      width: 65px;
      height: 65px;
      margin: 0 auto;
      margin-top: -31px;}
    .title{
      font-size:17px;
      font-weight:500;
      color:rgba(0,147,253,1);
      line-height:24px;
      text-align: center;
      margin-top: 20px;
      text-decoration:rgba(239, 239, 239, 1);
      position: relative;
      .active{
        width:35px;
        height:3px;
        background:rgba(0,147,253,1);
        border-radius:2px;
        position: absolute;
        bottom:-5px;
        left:50%;
        margin-left:-17.5px;
      }}
  .wrap {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  //   border-bottom: 1px solid #cccccc;
  //   padding-bottom: 15px;
  > .left {
    display: flex;
    margin-left: 20px;
    margin-top: 20px;
    > .leftLittleLogon {
      margin-top: 12px;
      > img {
        width: 23px;
        height: 27px;
      }
    }
    > .leftBigLogon {
      // margin-left: 10px;
      width: 50px;
      height: 50px;
      > img {
        width: 50px;
        height: 50px;
      }
    }
    > .content {
      > .topTitle {
        margin-top: -3px;
        // display: flex;
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
          white-space: nowrap;
          margin-left: 10px;
        }
        > .dengji {
          margin:3px 0 3px 10px;
          width: 187px;
          height: 18px;
          display: flex;
          .dengji2{
            margin-left: 8px;
          }
          > img {
            width: 80px;
            height: 18px;
          }
        }
      }
      > .bottom {
        margin-top: 3px;
        margin-left: 10px;
        display: flex;
        > div img{
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  .cont2{
    width: 305px;
    height: 174px;
    background:rgba(255,255,255,1);
    border-radius:15px;
    .contwrap{
      font-size:17px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      .top{
        margin-bottom: 7px;
      }
      .isOk{
        display: flex;
        // align-items: center;
        // justify-content: center;
        .isNo{
          width:125px;
          height:42px;
          background:rgba(234,234,234,1);
          border-radius:4px;
          text-align: center;
          line-height: 42px;
        }
        .isYes{
          width:125px;
          height:42px;
          background:rgba(0,147,253,1);
          border-radius:4px;
          text-align: center;
          line-height: 42px;
          margin-left: 20px;
        }
      }
    }
  }
  .cont3{
    width: 170px;
    height: 170px;
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
  .cont5{
    width:305px;
    height:173px;
    background:rgba(255,255,255,1);
    border-radius:15px;
    color: #333;
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
  
  > .rightLogin {
      width:80px;
      height:32px;
      background:rgba(0,147,253,1);
      border-radius:16px;
      margin: 29px 20px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;

      > img{
        width: 16px;
        height: 16px;  
      }
      > div{
        font-size:15px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:21px;
        margin-left: 2px;
      }
  }
  .rightLogin2{
      width:80px;
      height:32px;
      background:rgba(236,236,236,1);
      border-radius:16px;
      margin: 29px 20px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight:500;
      font-family:PingFangSC-Medium,PingFang SC;
      > div{
          font-size:15px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,147,253,1);
          line-height:21px;
      }
  }
  .rightLogin3{
      width:80px;
      height:32px;
      background:rgba(236,236,236,1);
      border-radius:16px;
      margin: 29px 20px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      > div{
        font-size:15px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(172,172,172,1);
        line-height:21px;
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
}
</style>