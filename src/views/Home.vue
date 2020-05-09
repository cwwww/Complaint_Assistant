<template>
  <div class="contain">
    <div class="information">
      <div class="mes">
        <div class="topHalfPart">
          <div class="headPortrait"></div>
          <div class="infor">
            <div class="swsName">狼行天下&nbsp;事务所</div>
            <img class="line" :src=line alt="">
            <img class="experience" :src=experience alt="">
            <div class="ArticleExperience">130/400</div>
            <div class="level">Lv.50</div>
          </div>
        </div>
        <div class="bottomHalfPart"> 
          <div class="leftPart">
            <img :src=levelbx style="height:18px;line-height:18px;" alt="">
          </div>
          <div class="rightPart">
            <div class="imgs">
            <img :src=money style="width:16px;height:16px;margin-right:4px;" alt="">
            </div>
            <div class="res">145,205</div>
          </div>
        </div>
      </div>
      <div class="fansAndFriend">
        <div class="friend">
          <span class="num">5,296</span>
          <img src="../assets/images/friends@2x.png" alt="">
          <span class="design">好友</span>
        </div>
        <div class="fan">
          <span class="num">15,296</span>
          <img src="../assets/images/fans@2x.png" alt="">
          <span class="design">粉丝</span>
        </div>
      </div>
    </div>
    <div>
      <ul class="rightList">
        <li>
          <img :src=home_medal alt="">
          <span>勋章</span>
        </li>
        <li>
          <img :src=home_discover alt="">
          <span>发现</span>
        </li>
        <li>
          <img :src=home_mytask alt="">
          <span>我的任务</span>
          <img class="new" src="../assets/images/new@2x.png" alt="">
        </li>
        <li>
          <img :src=home_risktest alt="">
          <span>风险测评</span>
        </li>
        <li>
          <img :src=home_planbook alt="">
          <span>计划书</span>
        </li>
      </ul>
    </div>
    <div >
      <ul class="bottomList">
      <li>
        <img :src=home_zsk alt="">
        <span>知识库</span>
      </li>
      <li>
        <img :src=home_store alt="">
        <span>精灵商店</span>
      </li>
      <li>
        <img :src=home_browse alt="">
        <span>谁看过我</span>
      </li>
            <li>
        <img :src=home_chatrecord alt="">
        <span>聊天记录</span>
      </li>
            <li>
        <img :src=home_rankinglist alt="">
        <span>排行榜</span>
      </li>
      </ul>
    </div>
    <div class="input-bottom">
      <input type="text" placeholder="输入“风险测评”试试" style="width:95%;margin-top:11px;margin-left:15px;overflow:hidden; white-space:nowrap; text-overflow:ellipsis;"/>
    </div>
    <div>
    <img class="moon" :src=moon alt="">
    <img class="bebot" :src=bebot alt="">
    <img class="earth" :src=earth alt="">
    </div>
  </div>
</template>
<script>
import { Popup } from 'vant';
import { reqFairyShop } from '../axios/axios-api'
export default{
  components: {},
  data(){
    return {
      show: false,
      home_zsk:require("../assets/images/home_zsk@2x.png"),
      home_store:require("../assets/images/home_store@2x.png"),
      home_browse:require("../assets/images/home_browse@2x.png"),
      home_chatrecord:require("../assets/images/home_chatrecord@2x.png"),
      home_rankinglist:require("../assets/images/home_rankinglist@2x.png"),
      home_medal:require("../assets/images/home_medal@2x.png"),
      home_discover:require("../assets/images/home_discover@2x.png"),
      home_mytask:require("../assets/images/home_mytask@2x.png"),
      home_risktest:require("../assets/images/home_risktest@2x.png"),
      home_planbook:require("../assets/images/home_planbook@2x.png"),
      moon:require("../assets/images/moon@2x.png"),
      bebot:require("../assets/images/bebot@2x.png"),
      earth:require("../assets/images/earth@2x.png"),
      experience:require("../assets/images/experience@2x.png"),
      line:require("../assets/images/jindu@2x.png"),
      famous:require("../assets/images/famous@2x.png"),
      money:require("../assets/images/money@2x.png"),
      levelbx:require("../assets/images/levelbx@2x.png")
    };
  },

 methods: {
  showPopup() {
      this.show = true;
    },
    FairyShop() {
    let param = {"robot_id":"1"}
    let res = reqFairyShop(param)
    res.then(res=>{
     console.log(res)
    }).catch(reslove=>{
      console.log(1111)
    })
  
     }
  }
}
</script>
<style lang="scss" scoped>
 .contain{
   display: flex;
   width: 100%;
   height: 100%;
   background-color: #0B2733;
   background-image: url(../assets/images/light@2x.png);
   background-repeat: no-repeat;
   background-position: -300px -170px;
  .information{
     width: 100%;  
     height: 90px;
     margin: 18px 0 0 20px;
     display: flex;
     .mes{
       background-image:url(../assets/images/bg@2x.png);
       width: 198px;
     }
     .topHalfPart{
       display: flex;
       margin-bottom: 6px;
       .headPortrait{
         width: 45px;
         height: 45px;
         border-radius: 50%;
         background: palevioletred;
         margin: 15px 5px 0 7px;
       }
       .infor{
         display: flex;
         flex-direction: column;
         margin-top: 13px;
         position: relative;
        //  background-image: url(../assets/images/jindu@2x.png);
         background-repeat: no-repeat;
         background-size: 99px 16px;
         background-position: 61px 37px;
         .swsName{
          font-size:13px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(122,234,234,1);
          line-height:18px;
          display: flex;
          margin-bottom: 6px;
         }
         .line{
           float: left;
           width: 99px;
           height: 16px;
         }
         .ArticleExperience{
          font-size:10px;
          font-family:DINAlternate-Bold,DINAlternate;
          font-weight:bold;
          color:rgba(122,234,234,1);
          line-height:11px;
          position: absolute;
          top: 27px;
          left: 6px;
         }
         .experience{
           width: 16px; 
           height: 20px;
           position: absolute;
           left: -6px;
           top: 24px;
         }
         .level{
           position: absolute;
           top: 26px;
           right:-34px;
           font-size:11px;
            font-family:DINAlternate-Bold,DINAlternate;
            font-weight:bold;
            color:rgba(122,234,234,1);
            line-height:12px;
         }
       }
     }
    .bottomHalfPart{
        display: flex;
        justify-content: space-between;
        // align-items: center;
       .leftPart{
          padding: 0 5px 0 3px;
          flex-direction: column;
          height: 18px;
          line-height: 18px;
          background:rgba(197,146,62,1);
          border-radius:2px;
          margin-left: 6px;
        }
        .imgs{
          display: inline-block;
          vertical-align:middle;
        }
        .res{
          display: inline-block;
        }
        .rightPart{
          // margin-left:auto;
          flex-direction: column;
          flex: 1;
          text-align: right;
          font-size:13px;
          font-family:DINAlternate-Bold,DINAlternate;
          font-weight:bold;
          color:rgba(122,234,234,1);
          line-height:15px;
          margin-right:8px;
        }
      }
    .fansAndFriend{
      display: flex;
      flex-direction: column;
      margin-right: 14px;
      flex: 1;
      text-align: right;
      align-items: flex-end;
      .friend{
        margin-top: 26px;
      }
      .num{
        color:rgba(255,255,255,1);
        font-size:13px;
      }
      img{
        width: 20px;
        height: 20px;
        line-height:15px;
        font-weight:bold;
        margin: 0 2px 0 4px;
      }
      .design{
        font-size:11px;
        color:rgba(82,207,209,1);
        line-height:16px;
        font-weight:400;
      }


  }
    }

  .rightList{
    display: flex;
    flex-direction:column;
    width: 52px;
    height: 360px;
    position: absolute;
    top: 95px;
    right: 8px;
    li{
      text-align: center;
      margin-top: 15px;
      position: relative;
      img{
        width: 40px;
        height: 40px;
      }
      span{
        height:18px;
        font-size:13px;
        font-weight:500;
        color:rgba(45,226,230,1);
        line-height:18px;
        text-shadow:0px 1px 1px rgba(0,0,0,0.5);
      }
      .new{
        width: 12px;
        height: 12px;
        position: absolute;
        top: -6px;
        right: 0px;
      }
    }
  }
  .bottomList{
    display: flex;
    flex-direction:row;
    // height: 360px;
    position: absolute;
    left: 25px;
    bottom: 69px;
    z-index: 999;
    justify-content: space-around;
    li{
      display: flex;
      text-align: center;
      opacity: 1;
      margin-right: 15px;
      flex-direction: column;
      justify-content: space-around;
      img{
        width: 53px;
        height: 53px;
      }
      span{
        height:18px;
        font-size:13px;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:18px;
        text-shadow:0px 1px 1px rgba(0,0,0,0.5);
        font-family:PingFangSC-Medium,PingFang SC;
      }
    }
  }
  .input-bottom{
    width:86.7%;
    height:42px;
    background:rgba(92,191,191,0.25);
    border-radius:8px;
    border:1px solid rgba(45,226,230,1);
    position: absolute;
    left: 25px;
    bottom: 17px;
    z-index: 999;
    input{
      width: 100%;
      font-size:15px;
      font-weight:400;
      color:rgba(122,234,234,1);
      line-height:21px;
      background:none;  
      outline:none;  
      border:none;
      overflow:hidden; white-space:nowrap; text-overflow:ellipsis;
  }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
    color:rgba(122,234,234,1);
    }
  }
  .moon{
    position: absolute;
    left: 0;
    top: 247px;
    width: 70px;
    height: 92px;
  }
  .bebot{
    position: absolute;
    left: 123px;
    top: 323px;
    width: 128px;
    height: 201px;
  }
  .earth{
    // z-index: -1;
    opacity: 0.8;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 239px;
  }
 }
</style>