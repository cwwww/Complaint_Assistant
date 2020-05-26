// 邀请页面
<template>
  <div class="warp">
    <img :src="img" alt />
    <div class="topNav">
      <dl>
        <dt>
          <span>{{yaoqList.recommendedlist.length}} </span>
          <p>人</p>
        </dt>
        <dd>已成功邀请</dd>
      </dl>
      <dl>
        <dt>
          <span>{{yaoqList.member_days}}</span>
          <p>天</p>
        </dt>
        <dd>已得会员天数</dd>
      </dl>
      <dl>
        <dt>
          <span>{{yaoqList.lexicons}}</span>
          <p>万</p>
        </dt>
        <dd>已得词库</dd>
      </dl>
    </div>
    <div class="topNavTwo">
      <p v-if="yaoqList.recommendedlist.length <10">每邀请1人即可获得10天会员</p>
		  <span v-if="yaoqList.recommendedlist.length <10">
		    还差
		    <span class="color">{{yaoqList.lack_num}}</span> 人，即可再获得
		    <span class="color">{{yaoqList.expect_lexicon}}万词库</span>
		  </span>
      <div class="boxColor">
        <div class="jdColor" :style="{paddingLeft:'10px'}"></div>
      </div>
      <div class="checkOut">
        <ul>
          <li>
            <div v-show="img1Show"><p>1人</p></div>
			<img :src="img1" alt /> 
          </li>
          <li>
            <div v-show="img3Show"><p>3人</p></div>
			<img :src="img3" alt />
          </li>
          <li>
			<div v-show="img5Show"><p>5人</p></div>
            <img :src="img5" alt /> 
          </li>
          <li>
            <div v-show="img6Show"><p>6人</p></div>
			<img :src="img6" alt /> 
          </li>
          <li>
            <div v-show="img10Show"><p>10人</p></div>
			<img :src="img10" alt /> 
          </li>
        </ul>
      </div>
      <div class="jumpFriend"  @click="shareFriend">去邀请好友</div>
      <div class="footer">活动截止日期 2020/5/20</div>
    </div>
    <div class="threeCentent">
      <span>成功邀请</span>
	  <div v-for="(recommender,index) in yaoqList.recommendedlist"  :key="recommender.id">
		  <div class="content">
		    <div class="left">
		      <p>{{index+1}}</p>
		      <div class="loginImg">
		        <div v-if="recommender.broker_head !=null"><img :src="recommender.broker_head" alt /></div>
				<div v-else><img :src="defaultImg" alt /></div>
		      </div>
		       <div v-if="recommender.broker_name !=null"><span>{{recommender.broker_name}}</span></div>
			   <div v-else><span>Bebot用户_{{recommender.broker_id}}</span></div>
		    </div>
		    <div class="right">
		      <div v-if="recommender.member_day >0"><p>{{recommender.member_day}}天会员</p></div>
		      <div v-if="recommender.lexicon >0"><p>{{recommender.lexicon}}万词库</p></div>
		    </div>
		  </div> 
	  </div>
	  <div class="content">
	          <div class="left">
	            <p>1</p>
	            <div class="loginImg">
	              <img :src="defaultImg" alt />
	            </div>
	            <span>Emilee</span>
	          </div>
	          <div class="right">
				<p>+10天会员</p>
	            <p>+10万词库</p>
	          </div>
	    </div> 
		
		
		<div class="content">
		  <div class="left">
		    <p>2</p>
		    <div class="loginImg">
		     
						<img :src="defaultImg" alt />
		    </div>
		     
					   <span>Bebot用户_2</span>
		  </div>
		  <div class="right">
		   <p>10天会员</p>
		   <p>20万词库</p>
		  </div>
		</div> 
    </div>
    <div class="lastCentent">
      <span>活动规则</span>
      <ul>
        <li>1. 每邀请1位好友注册可领取10天会员使用权，可累加</li>
        <li>2. 邀请3位好友注册，同时可获得10万词库</li>
        <li>3. 邀请5位好友注册，同时可获得20万词库</li>
        <li>4. 邀请6位好友注册，同时可获得50万词库</li>
        <li>5. 邀请10位好友注册，同时可获得100万词库</li>
      </ul>
      <p>活动最终解释权归壹心科技有限公司所有</p>
    </div>
  </div>
</template>
<script>
import { yaoQing } from "../axios/axios-api";

export default {
  name: "Invite",
  data() {
    return {
      yaoqList: {
		  lexicon: "",
		  member_days:"",
		  recommendedlist:[],
	  },
	  paddingLeft:"",
      img: require("../assets/images/bg.png"),
	  defaultImg: require("../assets/images/默认头像@2x.png"),
      img1: "",
	  img3: "",
	  img5: "",
	  img6: "",
	  img10: "",
	  img1Show:true,
	  img3Show:true,
	  img5Show:true,
	  img6Show:true,
	  img10Show:true,
    };
  },
    mounted() {
    let param = {
      broker_id: 33,
    };
    console.log(param);
    let result = yaoQing(param);
    result
      .then(res => {
        this.yaoqList = res.result;
		console.log(this.yaoqList)
		let recommenders = this.yaoqList.recommendedlist.length;
		if(recommenders == 1){
			this.img1 = require("../assets/images/one@2x.png");
			this.paddingLeft = 285*10%+"px";
			this.img1Show = false;
		}else if(recommenders == 3){
			this.paddingLeft = 285*30%+"px";
			this.img3 = require("../assets/images/three@2x.png");
			this.img3Show = false;
		}else if (recommenders == 5){
			this.paddingLeft = 285*50%+"px";
			this.img5 = require("../assets/images/five@2x.png");
			this.img5Show = false;
		}else if(recommenders == 6){
			this.paddingLeft = 285*60%+"px";
			this.img6 = require("../assets/images/six@2x.png");
			this.img6Show = false;
		}else{
			this.paddingLeft = 285*100%+"px";
			this.img10 = require("../assets/images/ten@2x.png");
			this.img10Show = false;
		}
        console.log(this.yaoqList, "邀请好友");
      })
      .catch(reslove => {
        alert(66666);
        console.log("error");
      });
  },
  methods:{
	  shareFriend:function(){
		 // wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
		 //   wx.updateAppMessageShareData({ 
		 //     title: '分享', // 分享标题
		 //     desc: '分享内容', // 分享描述
		 //     link: 'http://api-bebot.baoxianxia.com.cn/api/callback/wxconfig/bebot/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		 //     imgUrl: '', // 分享图标
		 //     success: function () {
		 //       // 设置成功
		 //     }
		 //   })
		 // }); 
	  }
	  
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
  position: relative;
  > img {
    width: 100%;
    height: 310px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -999;
  }
  > .topNav {
    width: 325px;
    height: 108px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 83, 143, 0.15);
    border-radius: 10px;
    margin-top: 233px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    > dl {
      > dt {
        display: flex;
        justify-content: center;
        > span {
          display: block;
          font-size: 30px;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: rgba(253, 41, 41, 1);
          line-height: 35px;
        }
        > p {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 21px;
          margin-top: 11px;
        }
      }
      > dd {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
        margin-top: 6px;
      }
    }
  }
  > .topNavTwo {
    width: 325px;
    height: 229px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 83, 143, 0.15);
    border-radius: 10px;
    margin-top: 15px;
    > p {
      margin-top: 15px;
      margin-left: 20px;
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
    }
    > span {
      display: block;
      margin-top: 5px;
      margin-left: 20px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 18px;
      > .color {
        color: #fd2929;
      }
    }
    > .boxColor {
      width: 285px;
      height: 6px;
      background: rgba(230, 230, 236, 1);
      border-radius: 5px;
      margin-left: 20px;
      margin-top: 20px;
      > .jdColor {
        width: 143px;
        height: 6px;
        background: linear-gradient(
          90deg,
          rgba(249, 188, 33, 1) 0%,
          rgba(255, 103, 26, 1) 100%
        );
        border-radius: 5px;
      }
    }
    > .checkOut {
      width: 285px;
      margin: auto;
      > ul {
        width: 285px;
        display: flex;
        justify-content: space-between;

        > li {
          margin-top: 7px;
          > p {
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
            margin-top: 5px;
          }

          > img {
            width: 32px;
            height: 24px;
          }
        }
      }
    }
    > .jumpFriend {
      width: 285px;
      line-height: 48px;
      background: linear-gradient(
        270deg,
        rgba(0, 112, 255, 1) 0%,
        rgba(0, 147, 253, 1) 100%
      );
      box-shadow: 0px 2px 10px 0px rgba(1, 110, 188, 0.37);
      border-radius: 24px;
      margin: 21px auto 10px auto;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      text-align: center;
    }
    > .footer {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      text-align: center;
    }
  }
  > .threeCentent {
    width: 325px;
    height: 417px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 83, 143, 0.15);
    border-radius: 10px;
    margin-top: 15px;
    > span {
      display: block;
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
      margin-top: 15px;
      margin-left: 20px;
      margin-bottom: 15px;
    }
    > .content {
      width: 285px;
      height: 65px;
      border-bottom: rgba(239, 239, 239, 1) solid 1px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > .left {
        display: flex;
        align-items: center;
        > p {
          padding-left: 10px;
          font-size: 15px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 21px;
        }
        > .loginImg {
          margin-left: 15px;
          > img {
            display: block;
            width: 35px;
            height: 35px;
            border-radius: 25px;
          }
        }
        > span {
          margin-left: 10px;
          display: block;
          font-size: 15px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
      }
      > .right {
        padding-right: 10px;
        > p {
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(253, 41, 41, 1);
          line-height: 17px;
        }
      }
    }
  }
  > .lastCentent {
    width: 325px;
    height: 245px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 83, 143, 0.15);
    border-radius: 10px;
    margin-top: 15px;
    margin-bottom: 25px;
    > span {
      display: block;
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
      margin-top: 15px;
      margin-left: 20px;
    }
    > ul {
      width: 285px;
      margin: 0 auto;
      margin-top: 10px;
      > li {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 24px;
      }
    }
    > p {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 17px;
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>