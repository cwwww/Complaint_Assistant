<template>
  <div class="contain">
    <van-popup class="cont2" v-model="vipNotification">
      <div class="contwrap">
        <div class="top">
          <span>{{vipExpiryTime}}</span>
          <!-- <img style="width:16px;height:16px;" :src=money alt=""> -->
          <!-- <span>请前往【会员商店】领取</span> -->
        </div>
        <div style="margin-bottom:25px;">请前往【会员商店】领取</div>
        <div class="isOk">
          <div class="isNo" @click="noGet">
            <span style="color:#666;">忽略</span>
          </div>
          <div class="isYes" @click="toGet">
            <span style="color:#FFF;">去领取</span>
          </div>
        </div>
      </div>
    </van-popup>
    <div class="information">
      <div class="mes">
        <div class="topHalfPart">
          <div class="headPortrait">
            <img :src="homeInit.headimgurl" alt />
          </div>
          <div class="infor">
            <div class="swsName">{{homeInit.name}}&nbsp;事务所</div>
            <img class="line" :src="line" alt />

            <div class="linebg" :style="{'width': linewidthData}"></div>

            <img class="experience" :src="experience" alt />

            <div class="ArticleExperience">{{homeInit.exp}}/{{homeInit.level_exp}}</div>
            <div class="level">Lv.{{homeInit.level}}</div>
            <div class="invitation" @click="toInvite">
              <img class="invitationicon" src="../assets/images/邀请@2x.png" alt />
            </div>
          </div>
        </div>
        <div class="bottomHalfPart">
          <div class="leftPart">
            <img :src="homeLevel" style="height:18px;line-height:18px;" alt />
          </div>
          <div class="rightPart">
            <div class="imgs">
              <img :src="money" style="width:16px;height:16px;margin-right:4px;" alt />
            </div>
            <div class="res">{{homeInit.bcoin}}</div>
          </div>
        </div>
      </div>
      <div class="fansAndFriend">
        <div class="friend" @click="frang(curIndex)">
          <span class="num">{{homeInit.friends_num}}</span>
          <img src="../assets/images/friends@2x.png" alt />
          <span class="design">好友</span>
        </div>
        <div class="fan" @click="lists(curIndex)">
          <span class="num">{{homeInit.fans_num}}</span>
          <img src="../assets/images/fans@2x.png" alt />
          <span class="design">粉丝</span>
          <div>
            <img class="new" src="../assets/images/new@2x.png" alt />
          </div>
        </div>
      </div>
    </div>

    <div class="rightList">
      <ul>
        <li @click="toHope">
          <img :src="home_medal" alt />
          <div>勋章</div>
        </li>
        <li @click="toHope">
          <img :src="home_discover" alt />
          <div>发现</div>
        </li>
        <li @click="Task" style="position:relative;">
          <img :src="home_mytask" alt />
          <div>我的任务</div>
          <img v-show="showNewIcon" class="new" src="../assets/images/new@2x.png" alt />
        </li>
        <li @click="toFXCP">
          <img :src="home_risktest" alt />
          <div>风险测评</div>
        </li>
        <li @click="toPlan">
          <img :src="home_planbook" alt />
          <div>计划书</div>
        </li>
      </ul>
    </div>
    <div>
      <div class="talk">
        <div class="talkContent" id="talkContent" :class="{active:isOwn}">{{answer}}</div>
        <div class="btnTalk">
          <img @click="previousPage" class="leftBtn" :src="nextpage2" alt />
          <img class="rightBtn" @click="nextPage" :src="nextpage" alt />
        </div>
      </div>
      <div class="triangle"></div>
      <div class="triangle2"></div>
    </div>
    <div class="content">
      <img class="moon" :src="moon" alt />
      <div class="bebot">
        <img :src="bebot" alt />
      </div>
      <div class="answer" id="answer">
        <div v-for="(i,index) in list2" :key="index">
          <div class="ownerAnswer" v-show="index%2 == 1">{{i}}</div>
          <div class="rebotAnswer" v-show="index%2 == 0">{{i}}</div>
        </div>
      </div>
      <ul class="bottomList">
        <li @click="Repository">
          <img :src="home_zsk" alt />
          <span>知识库</span>
        </li>
        <li @click="FairyShop">
          <img :src="home_store" alt />
          <span>精灵商店</span>
        </li>
        <li @click="WhoLookMe">
          <img :src="home_browse" alt />
          <span>谁看过我</span>
        </li>
        <li @click="HomeChat">
          <img :src="home_chatrecord" alt />
          <span>聊天记录</span>
        </li>
        <li @click="Ranking">
          <img :src="home_rankinglist" alt />
          <span>排行榜</span>
        </li>
      </ul>
      <div class="input-bottom-content">
        <van-popup class="cont3" v-model="showName" click_overlay>
          <div class="contwrap">
            <img class="headImg" :src="bebot_head" alt />
            <img class="handImg" :src="bebot_hand" alt />
            <div id="title">给你的精灵起个名字吧！</div>
            <div id="warn">名字确定后不可更改哦～</div>
            <input type="text" style="text-align:center" name="name" maxlength="10" />
            <div id="line"></div>
            <div id="limit" v-show="showIimit" style="height: 0.34667rem;">{{warnInfo}}</div>
            <van-button
              type="info"
              style="width:265px;height:42px;margin:6px auto;"
              @click="getName"
            >确定</van-button>
          </div>
        </van-popup>

        <div class="input-bottom">
          <input
            type="text"
            v-model="question"
            placeholder="输入“风险测评”试试"
            style="margin-top:11px;margin-left:15px;overflow:hidden; white-space:nowrap; text-overflow:ellipsis;"
          />
          <div class="btn" @click="submit(numIndex)">发送</div>
          <!-- <div class="btn"  @click="open7">发送</div> -->
        </div>
      </div>
    </div>
    <van-overlay :showoverlay="showoverlay" v-show="showoverlay" @click="showoverlay = false">
      <div class="wrapper" @click.stop>
        <div class="block" />ffe
      </div>
    </van-overlay>
    <HomeChat
      v-show="homeChat"
      @showChatC="showChatP"
      :show_chat="homeChat"
      :broker_id="$route.query.broker_id"
      :robot_id="$route.query.robot_id"
      :token="$route.query.token"
      :val="question"
      :HistoryList="HistoryList"
    />
    <WhoLookMe
      v-show="WhoLook"
      @WhoLookC="WhoLookP"
      :Who_Look="WhoLook"
      :broker_id="$route.query.broker_id"
      :robot_id="$route.query.robot_id"
      :token="$route.query.token"
    />
    <Repository
      v-show="isRep"
      @RepositoryC="RepositoryP"
      :Repository_show="isRep"
      :broker_id="$route.query.broker_id"
      :robot_id="$route.query.robot_id"
      :token="$route.query.token"
    />
    <List
      v-show="isList"
      @listc="ListP"
      :list_show="isList"
      :broker_id="$route.query.broker_id"
      :robot_id="$route.query.robot_id"
      :token="$route.query.token"
      :curIndex="curIndex"
    />
    <Ranking
      v-show="isRanking"
      @rankingc="RankingP"
      :ranking_show="isRanking"
      @rankgohome="rankgohome"
      :broker_id="$route.query.broker_id"
      :robot_id="$route.query.robot_id"
      :token="$route.query.token"
    />
    <Task
      v-show="isTask"
      @taskc="TaskP"
      :task_show="isTask"
      :broker_id="$route.query.broker_id"
      :robot_id="$route.query.robot_id"
      :token="$route.query.token"
    />
    <SellerShop
      v-show="isSellerShop"
      @sellershopc="SellerShopP"
      :sellerShop_show="isSellerShop"
      :broker_id="$route.query.broker_id"
      :robot_id="$route.query.robot_id"
      :token="$route.query.token"
      :type="toget"
    />
  </div>
</template>
<script>
import { Popup, Toast, Overlay } from "vant";
// import wxapi from '../assets/js/common/wxapi';
import wx from "weixin-js-sdk";
import HomeChat from "../components/HomeChat";
import WhoLookMe from "../components/WhoLookMe";
import Repository from "../components/Repository";
import List from "../components/List";
import Ranking from "../components/Ranking";
import Task from "../components/Task";
import SellerShop from "../components/SellerShop";
import {
  reqHomeInit,
  reqCusayrob,
  reqRobotDetail,
  BeanList,
  reqHomeName,
  reqtaskStatus,
  reqisunlocked,
  reqbebotCode,
  reqwxconfig,
  reqcustomerlogin,
  reqRobotHistory
} from "../axios/axios-api";
export default {
  components: {
    HomeChat,
    WhoLookMe,
    Repository,
    List,
    Ranking,
    Task,
    SellerShop
  },
  data() {
    return {
      HistoryList: [],
      toget: "",
      showoverlay: true,
      isSellerShop: false,
      isTask: false,
      isRanking: false,
      curIndex: Number,
      warnInfo: "",
      linewidthData: "",
      isList: false,
      isBean: false,
      isRep: false,
      WhoLook: false,
      homeChat: false,
      vipExpiryTime: "",
      vipNotification: false,
      vipValid: "",
      showNew: false,
      data: "",
      newData: "",
      option: "",
      showNew: false,
      showIimit: false,
      wx_link: "",
      redirect_uri: "",
      appId: "",
      callback: "",
      code: "",
      count: "",
      link: "",
      url: "",
      show1: false,
      isOwn: true,
      answerHight: "",
      homeInit: Object,
      bxdj: "",
      numIndex: 0,
      showName: false,
      isInput: "",
      flag: true,
      question: "",
      list: [],
      list2: [],
      answer: "",
      levelbx: "",
      homeLevel: "",
      star: "",
      isStatus: "",
      fairyStatus: "",
      messages: "",
      shareMessages: "",
      showNewIcon: false,
      ezgif: require("../assets/images/ezgif.gif"),
      bebot_head: require("../assets/images/bebot_head@2x.png"),
      bebot_hand: require("../assets/images/bebot_hand@2x.png"),
      img: require("../assets/images/icon.png"),
      shop: require("../assets/images/shop@2x.png"),
      home_zsk: require("../assets/images/home_zsk@2x.png"),
      product_zsk: require("../assets/images/product_zsk@2x.png"),
      home_store: require("../assets/images/home_store@2x.png"),
      home_browse: require("../assets/images/home_browse@2x.png"),
      home_chatrecord: require("../assets/images/home_chatrecord@2x.png"),
      home_rankinglist: require("../assets/images/home_rankinglist@2x.png"),
      home_medal: require("../assets/images/home_medal@2x.png"),
      home_discover: require("../assets/images/home_discover@2x.png"),
      home_mytask: require("../assets/images/home_mytask@2x.png"),
      home_risktest: require("../assets/images/home_risktest@2x.png"),
      home_planbook: require("../assets/images/home_planbook@2x.png"),
      moon: require("../assets/images/moon@2x.png"),
      bebot: require("../assets/images/bebot@2x.png"),
      earth: require("../assets/images/earth@2x.png"),
      experience: require("../assets/images/experience@2x.png"),
      line: require("../assets/images/jindu@2x.png"),
      famous: require("../assets/images/famous@2x.png"),
      money: require("../assets/images/money@2x.png"),
      levelbx1: require("../assets/images/等级-保险新手@2x.png"),
      levelbx2: require("../assets/images/等级-保险复读机@2x.png"),
      levelbx3: require("../assets/images/等级-保险条款王@2x.png"),
      levelbx4: require("../assets/images/等级-保险配置王@2x.png"),
      levelbx5: require("../assets/images/等级-保险百科@2x.png"),
      levelbx6: require("../assets/images/等级-保险大咖@2x.png"),
      levelbx7: require("../assets/images/等级-保险名人堂@2x.png"),
      nextpage: require("../assets/images/nextpage@2x.png"),
      nextpage2: require("../assets/images/上一页@2x.png"),
      success: require("../assets/images/success@2x.png")
    };
  },
  methods: {
    SellerShopP(data) {
      this.isSellerShop = data;
    },
    TaskP(data) {
      this.isTask = data;
    },
    rankgohome(data) {
      this.isRanking = data;
    },
    RankingP(data) {
      this.isRanking = data;
    },
    ListP(data) {
      this.isList = data;
    },
    showChatP(data) {
      this.homeChat = data;
      if (!this.homeChat) {
        this.list2 = this.HistoryList.slice(-4).content;
        alert(JSON.stringify(this.HistoryList.slice(-4).content));
      }
    },
    WhoLookP(data) {
      this.WhoLook = data;
    },
    RepositoryP(data) {
      // 知识库
      this.isRep = data;
    },
    BeanP() {
      //粉丝
      this.isBean = data;
    },
    FriendP() {
      //好友
      this.isFriend = data;
    },
    toInvite() {
      this.$router.push("/invite");
    },
    open7() {
      this.$router.push("/LevelUp");
      //       this.$confirm(
    },
    Repository() {
      // 知识库

      this.isRep = true;
      // this.destoryTimer();
    },
    FairyShop() {
      // 买家精灵商店
      this.toget = 0;
      this.isSellerShop = true;
      // this.destoryTimer();
    },
    isNo() {
      //买家精灵商店取消购买
      this.vipNotification = false;
    },
    isYes() {
      //买家精灵商店确定购买
      this.vipNotification = false;
      // this.$router.push({
      //   path: "/sellerShop/vipShop",
      //   query: {
      //     broker_id: this.$route.query.visitor_id,
      //     robot_id: this.$route.query.robot_id,
      //     token: this.$route.query.token
      //   }
      // });
    },
    toGet() {
      this.toget = 1;
      this.isSellerShop = true;
      this.vipNotification = false;
    },
    noGet() {
      this.vipNotification = false;
    },
    toHope() {
      Toast("施工中,敬请期待");
    },
    HomeChat() {
      this.HomeChat = true;
      let param = {
        broker_id: this.$route.query.broker_id,
        token: this.$route.query.token
        // robot_id : this.robot_id,
        // speaker : '2',
        // content : this.hisChat,
        // create_time : new Date().toLocaleString(),
      };
      alert(JSON.stringify(param));
      let res = reqRobotHistory(param);
      res
        .then(res => {
          this.HistoryList = res.result;
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    HomeChat() {
      // 聊天记录
      this.homeChat = true;
      // this.getHistory();
      this.destoryTimer();
    },
    WhoLookMe() {
      // 谁看过我
      this.WhoLook = true;
      this.destoryTimer();
    },
    Ranking() {
      this.isRanking = true;
      this.destoryTimer();
    },
    Task() {
      // 任务
      this.isTask = true;
      this.destoryTimer();
    },
    toFXCP() {
      window.parent.location.href =
        "https://m.baoxianxia.com.cn/risk/index.html";
      this.destoryTimer();
    },
    toPlan() {
      window.parent.location.href =
        "https://h5.baoxianxia.com.cn/app/businessList.html?brokerId=4a68acc421cf419084a3017af9730379&token=b4cb258a-b569-445b-b297-34d9f1503c16";
      this.destoryTimer();
    },
    frang(curIndex) {
      // 好友
      this.curIndex = 0;
      this.isList = true;
      this.destoryTimer();
    },
    lists(curIndex) {
      // 粉丝
      this.curIndex = 1;
      this.isList = true;
      // this.destoryTimer();
    },
    previousPage() {
      talkContent.scrollTop += -138;
      this.isOwn = true;
    },
    nextPage() {
      talkContent.scrollTop += 138;
      this.isOwn = false;
    },
    getName() {
      if (document.getElementsByName("name")[0].value.length == 0) {
        this.warnInfo = "请输入昵称";
        this.showIimit = true;
        this.showName = true;
      } else {
        if (document.getElementsByName("name")[0].value.length >= 7) {
          this.showIimit = true;
          this.warnInfo = "名字最长不能超过7个字符，请重新输入";
          this.showName = true;
          return false;
        }
        this.showIimit = false;
        let param = {
          broker_id: this.$route.query.broker_id,
          robot_id: this.$route.query.robot_id,
          robot_name: document.getElementsByName("name")[0].value,
          token: this.$route.query.token
        };
        let res = reqHomeName(param);
        res
          .then(res => {
            console.log(res);
            //this.list = res.result.dialog_history
            if (res.result.robot_name == "") {
              this.showIimit = true;
              this.warnInfo = res.result.info;
              this.showName = true;
            } else {
              this.showName = false;
            }
            this.getHomeInit();
          })
          .catch(reslove => {
            console.log("error");
          });
      }
    },
    wxconfig() {
      let param = { url: window.location.href.split("#")[0] };
      let res = reqwxconfig(param);
      res
        .then(res => {
          console.log(res);
          this.shareMessages = res.result;
          // alert($route.query.visitor_id)
          var that = this;
          wx.config({
            debug: false,
            appId: "wx026553ce8b4e59a3", // 和获取Ticke的必须一样------必填，公众号的唯一标识
            timestamp: that.shareMessages.timestamp, // 必填，生成签名的时间戳
            nonceStr: that.shareMessages.nonceStr, // 必填，生成签名的随机串
            signature: that.shareMessages.signature, // 必填，签名，见附录1
            //需要分享的列表项:发送给朋友，分享到朋友圈
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
          });
          //处理验证失败的信息
          wx.error(function(res) {
            console.log("验证失败返回的信息:", res);
          });
          //处理验证成功的信息
          wx.ready(function() {
            //分享到朋友圈
            // wx.onMenu
            wx.onMenuShareTimeline({
              title: "朋友圈", // 分享标题
              desc: "描述yiuy朋友", // 分享描述
              // link: window.location.href,
              link:
                "https://test-bebot-web.baoxianxia.com.cn/#/" +
                `HomeOther?broker_id=${that.$route.query.broker_id}&robot_id=${that.$route.query.robot_id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "https://img.baoxianxia.com.cn/share/spotShare.png", // 分享图标
              // type: '', // 分享类型,music、video或link，不填默认为link
              // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function(res) {
                // 用户确认分享后执行的回调函数
                console.log("分享给朋友成功返回的信息为:", res);
              },
              cancel: function(res) {
                // 用户取消分享后执行的回调函数
                console.log("取消分享给朋友返回的信息为:", res);
              }
            });
            // 分享给朋友
            wx.onMenuShareAppMessage({
              title: "bebot朋友", // 分享标题
              desc: "描述yiuy朋友", // 分享描述
              // link: window.location.href,
              link:
                "https://test-bebot-web.baoxianxia.com.cn/#/" +
                `HomeOther?broker_id=${that.$route.query.broker_id}&robot_id=${that.$route.query.robot_id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "https://img.baoxianxia.com.cn/share/spotShare.png", // 分享图标
              // type: '', // 分享类型,music、video或link，不填默认为link
              // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function(res) {
                // 用户确认分享后执行的回调函数
                console.log("分享给朋友成功返回的信息为:", res);
              },
              cancel: function(res) {
                // 用户取消分享后执行的回调函数
                console.log("取消分享给朋友返回的信息为:", res);
              }
            });
          });
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    // 授权
    impower() {
      let param = { code: this.code };
      let res = reqbebotCode(param);
      res
        .then(res => {
          console.log(res);
          this.messages = res.result;
          this.customerLogin();
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    //   customerLogin(){
    //         let param = {
    //           "OPENID": this.messages.openid,
    //           "NICKNAME": this.messages.nickname,
    //           "HEADIMGURL":  this.messages.headimgurl,
    //           "SEX":  this.messages.sex,
    //           "PROVINCE":  this.messages.province,
    //           "CITY": this.messages.city,
    //           "COUNTRY": this.messages.country,
    //           "PRIVILEGE":  this.messages.privilege,
    //         }
    // },
    getFensi() {
      let param = {
        robot_id: 33,
        operation_type: 0,
        broker_id: 33,
        token:
          "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
      };
      let res = BeanList(param);
      res
        .then(res => {
          console.log(res);
          let showNotification = res.result.notification;
          if (showNotification) {
            this.showNew = true;
          }
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    submit(numIndex) {
      this.numIndex += 1;
      if (this.question == "") {
        Toast("请输入聊天内容");
      } else {
        this.getDetail();
        this.getReqtaskStatus();
      }
    },
    getDetail() {
      // if(this.val != ''){
      //   alert('val')
      //   this.flag = false
      // }
      let param;
      if (this.flag) {
        param = {
          dialog_type: "0",
          broker_id: this.$route.query.broker_id,
          robot_id: this.$route.query.robot_id,
          speaker: "2",
          content: ".",
          token: this.$route.query.token
        };
        this.flag = false;
      } else {
        param = {
          dialog_type: "1",
          broker_id: this.$route.query.broker_id,
          robot_id: this.$route.query.robot_id,
          speaker: "2",
          content: this.question,
          token: this.$route.query.token
        };
      }
      console.log(param);
      let res = reqRobotDetail(param);
      res
        .then(res => {
          console.log(res);
          this.answer = res.result.content;
          this.list.push(this.question);
          this.list.push(this.answer);
          this.list2 = this.list.slice(-4);
          if (this.list2[0] == "") {
          }
          this.question = "";
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    //与机器人聊天任务
    getReqtaskStatus() {
      let param = {
        broker_id: this.$route.query.broker_id,
        robot_id: this.$route.query.robot_id,
        operation_type: 1,
        token: this.$route.query.token
      };
      console.log("任务的param:" + param);

      let result = reqtaskStatus(param);
      result
        .then(res => {
          //更新金币
          this.homeInit.bcoin = res.result.bcoin;
          //更新等级
          this.homeInit.level = res.result.level;
          //更新“我的”经验
          this.homeInit.exp = res.result.exp;
          //更新总经验
          this.homeInit.level_exp = res.result.level_exp;
          //任务状态为“1”表示任务已经完成，可以领取奖励，任务图标右上角有个“新”字
          this.showNewIcon = res.result.task_notification;
        })
        .catch(reslove => {
          console.log("error");
        });
    },

    getACchat() {
      let param;
      if (this.isInput) {
        param = {
          dialog_type: "2",
          customer_id: 1,
          customer_type: 0,
          broker_id: 33,
          robot_id: 33,
          speaker: "1",
          content: ".",
          token: "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT"
        };
        this.isInput = false;
      } else {
        param = {
          dialog_type: "2",
          customer_id: 1,
          customer_type: 2,
          broker_id: 33,
          robot_id: 33,
          speaker: "1",
          content: "第二版测试",
          token: "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT"
        };
      }
      console.log(param);
      let res = reqCusayrob(param);
      res
        .then(res => {
          console.log(res);
          this.list = res.result.dialog_history;
          this.$refs.input.value = "";
        })
        .catch(reslove => {
          console.log("error");
        });
    },

    // 初始化页面
    getHomeInit() {
      if (this.$route.query.broker_id == undefined) {
        this.$route.query.broker_id = this.$route.query.visitor_id;
      }
      let param = {
        // robot_id: 93,
        // broker_id: 93,
        // token:"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqZlpIRDpqQjEzUDk5dDItM2cxZjFmWmZYOFFSSFlqUms.ZXlKUVNFOU9SU0k2SWpFNE1qRXdNRGt4T0Rnd0lpd2lTVVFpT2prekxDSnBZWFFpT2pFMU9UQTVOelV3TURjdU1URTRNakV4TjMwOjFqZlpIRDpBRU1Bem9xdzFqRFE4VGhkQlpJdHRJaGc2Q0U.ab251255b191fc234c523c3d14b8888c"

        robot_id: this.$route.query.robot_id,
        broker_id: this.$route.query.broker_id,
        token: this.$route.query.token
      };
      console.log(param);
      let result = reqHomeInit(param);
      result
        .then(res => {
          console.log(res);
          this.homeInit = res.result;

          if (this.homeInit.name == "") {
            this.showName = true;
          }
          console.log(this.homeInit);
          if (this.vipNotification == true) {
          } else {
            this.vipNotification = this.homeInit.vip_notification;
            if (this.homeInit.vip_valid == false) {
              this.vipExpiryTime = "您的会员已到期";
              // this.vipExpiryTime ='您的会员将于'+times+'到期'
            } else {
              var time = this.homeInit.vip_expiry_time;
              var d = new Date(time);
              var times =
                d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
              this.vipExpiryTime = "您的会员将于" + times + "到期";
            }
          }
          var expLine = 0;
          //99为进度条px值
          expLine = (this.homeInit.exp / this.homeInit.level_exp) * 99;
          (this.linewidthData = expLine + "px"),
            console.log("this.linewidthData", this.linewidthData);
          // alert(JSON.stringify(this.homeInit))
          if (this.homeInit.title == 1) {
            //保险等级
            this.homeLevel = this.levelbx1;
          } else if (this.homeInit.title == 2) {
            this.homeLevel = this.levelbx2;
          } else if (this.homeInit.title == 3) {
            this.homeLevel = this.levelbx3;
          } else if (this.homeInit.title == 4) {
            this.homeLevel = this.levelbx4;
          } else if (this.homeInit.title == 5) {
            this.homeLevel = this.levelbx5;
          } else if (this.homeInit.title == 6) {
            this.homeLevel = this.levelbx6;
          } else if (this.goodsList.title == 7) {
            this.homeLevel = this.levelbx7;
          }
        })
        .catch(reslove => {
          console.log("error");
        });
    },

    destoryTimer() {
      clearInterval(this.timer);
    }

    // getCode(){ // 非静默授权，第一次有弹框
    //     this.code = ''
    //     // var local = window.location.href // 获取页面url
    //     var local = "https://bebot-web.baoxianxia.com.cn/#/" // 获取页面url
    //     var appid = 'wx026553ce8b4e59a3'
    //     this.code = this.getUrlCode().code // 截取code
    //     if (this.code == null || this.code === '') { // 如果没有code，则去请求
    //         window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    //     } else {
    //         // 你自己的业务逻辑
    //     }
    // },
    // getUrlCode() { // 截取url中的code方法
    //     var url = window.location.search
    //     this.winUrl = url
    //     var theRequest = new Object()
    //     if (url.indexOf("?") != -1) {
    //         var str = url.substr(1)
    //         var strs = str.split("&")
    //         for(var i = 0; i < strs.length; i ++) {
    //             theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
    //         }
    //     }
    //     return theRequest
    // }
  },
  created() {
    // this.getCode()
    // this.getUrlCode()
    // alert(this.$route.query.broker_id)
    this.url = window.location.href.split("#")[0];
    var start = this.url.indexOf("=");
    var end = this.url.indexOf("&");
    this.code = this.url.substring(start + 1, end);
    console.log(this.url);
    this.impower();
    this.wxconfig();
  },
  mounted() {
    // if(!window.localStorage.getItem('openId')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
    //     this.getCode()
    // } else {
    //     // 别的业务逻辑
    // }
    this.getHomeInit();
    this.getDetail();
    //定时获取粉丝数据
    this.timer = setInterval(this.getFensi, 60000); //定时间隔，
  }
};
</script>
<style lang="scss" scoped>
@import url("//unpkg.com/element-ui@2.13.1/lib/theme-chalk/index.css");
/deep/ .van-popup {
  overflow: visible;
}

.contain {
  height: 100vh;
  display: flex;
  background-color: #0b2733;
  background-image: url(../assets/images/ezgif.gif);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 100%;
  justify-content: space-between;
  flex-direction: column;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
  .information {
    height: 90px;
    margin: 18px 0 0 20px;
    display: flex;
    .mes {
      background-image: url(../assets/images/txbg@2x.png);
      width: 198px;
    }
    .topHalfPart {
      display: flex;
      margin-bottom: 6px;
      .invitation {
        // margin-left: 6px;
        top: 98px;
        left: -62px;
        position: absolute;
        .invitationicon {
          width: 61px;
          height: 79px;
        }
      }
      .headPortrait {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin: 15px 5px 0 7px;
        > img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
      }
      .infor {
        display: flex;
        flex-direction: column;
        margin-top: 13px;
        position: relative;
        background-repeat: no-repeat;
        background-size: 99px 16px;
        background-position: 61px 37px;
        .swsName {
          font-size: 13px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(122, 234, 234, 1);
          line-height: 18px;
          display: flex;
          margin-bottom: 6px;
        }
        .line {
          position: absolute;
          top: 23px;
          left: 0px;
          height: 16px;
          z-index: 20;
          // background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(rgba(45, 226, 230,0.09) ), to( rgba(45, 226, 230,0.46 )));
        }
        .linebg {
          z-index: 10;
          // width: 99px;
          position: absolute;
          top: 23px;
          left: 0px;
          height: 16px;

          background: -webkit-gradient(
            linear,
            0% 25%,
            75% 100%,
            from(rgba(45, 226, 230, 0.09)),
            to(rgba(45, 226, 230, 0.46))
          );
        }

        .ArticleExperience {
          font-size: 10px;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: rgba(122, 234, 234, 1);
          line-height: 11px;
          position: absolute;
          top: 27px;
          left: 6px;
        }
        .experience {
          width: 16px;
          height: 20px;
          position: absolute;
          left: -6px;
          top: 24px;
        }
        .level {
          position: absolute;
          top: 26px;
          right: -52px;
          font-size: 11px;
          font-family: DINAlternate-Bold, DINAlternate;
          font-weight: bold;
          color: rgba(122, 234, 234, 1);
          line-height: 12px;
        }
      }
    }
    .bottomHalfPart {
      display: flex;
      justify-content: space-between;
      .leftPart {
        flex-direction: column;
        height: 18px;
        line-height: 18px;
        background: rgba(197, 146, 62, 1);
        border-radius: 2px;
        margin-left: 6px;
      }
      .imgs {
        display: inline-block;
        vertical-align: middle;
      }
      .res {
        display: inline-block;
      }
      .rightPart {
        flex-direction: column;
        flex: 1;
        text-align: right;
        font-size: 13px;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: rgba(122, 234, 234, 1);
        line-height: 15px;
        margin-right: 8px;
      }
    }
    .fansAndFriend .new {
      width: 12px;
      height: 11px;
      position: absolute;
      top: -3px;
      right: 0;
    }
    .fansAndFriend {
      position: fixed;
      right: 0;
      display: flex;
      flex-direction: column;
      // margin-right: 14px;
      flex: 1;
      text-align: right;
      align-items: flex-end;
      .friend {
        display: flex;
        justify-content: center;
        margin: 8px 10px 10px 0;
      }
      .fan {
        position: relative;
        display: flex;
        justify-content: center;
        padding-right: 12px;
      }
      .num {
        color: rgba(255, 255, 255, 1);
        font-size: 13px;
      }
      img {
        width: 20px;
        height: 20px;
        line-height: 15px;
        font-weight: bold;
        margin: -4px 2px 0 4px;
      }
      .design {
        font-size: 11px;
        color: rgba(82, 207, 209, 1);
        line-height: 16px;
        font-weight: 400;
      }
      .newIcon {
        position: absolute;
        color: #176c75;
        font-size: 3px;
        background-color: #ffd87e;
        /*height: 24px;改前*/
        min-height: 4px; /*改后新增的代码*/
        min-width: 4px; /*改后新增的代码*/
        right: -25%;
        top: -12px;
        text-align: center;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        padding: 2px;
      }
    }
  }
}
.rightList {
  display: flex;
  flex-direction: column;
  width: 52px;
  align-self: flex-end;
  margin-right: 14px;
  position: absolute;
  top: 14.2%;
  right: 0;
  color: #2de2e6;
  li {
    text-align: center;
    margin-top: 15px;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      height: 18px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(45, 226, 230, 1);
      line-height: 18px;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    }
    .new {
      width: 12px;
      height: 12px;
      position: absolute;
      right: 0;
      top: -4px;
    }
  }
  a {
    text-align: center;
    margin-top: 15px;
    img {
      width: 40px;
      height: 40px;
    }
    span {
      height: 18px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(45, 226, 230, 1);
      line-height: 18px;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    }
    .new {
      width: 12px;
      height: 12px;
      position: absolute;
      right: 0;
      top: -4px;
    }
  }
}
.talk {
  max-height: 28.5%;
  width: 60.6%;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
  position: absolute;
  bottom: 54%;
  margin-left: 18.7%;
  text-align: center;
  font-weight: 400;
  color: rgba(101, 201, 201, 1);
  line-height: 19px;
  height: auto;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 4px 0px rgba(45, 226, 230, 0.75);
  border: 2px solid rgba(45, 226, 230, 1);
  border-radius: 10px;
  padding: 14px 15px 0 15px;
  box-sizing: border-box;
  .talkContent {
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    // max-height: 22.7%;
    // height: auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
    /*! autoprefixer: off */
  }
  .active {
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    // max-height: 22.7%;
    // height: auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 0;
  }
  .btnTalk {
    margin-top: 4px;
    .leftBtn {
      width: 24px;
      height: 18px;
      display: inline-block;
    }
    .rightBtn {
      width: 24px;
      height: 18px;
      display: inline-block;
      margin-left: 92px;
    }
  }
}
.triangle {
  width: 0;
  height: 0;
  // border-width: 0 40px 40px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px dashed #2de2e6;
  position: absolute;
  bottom: 52.8%;
  left: 48%;
  // box-shadow:0px 0px 4px 0px rgba(45,226,230,0.75);
}
.triangle2 {
  width: 0;
  height: 0;
  // border-width: 0 40px 40px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px dashed #000;
  position: absolute;
  bottom: 53.4%;
  left: 48%;
  // box-shadow:0px 0px 4px 0px rgba(45,226,230,0.75);
}
.content {
  overflow: hidden;
  background-image: url(../assets/images/earth@2x.png);
  background-size: 100% 54.7%;
  background-repeat: no-repeat;
  background-position: 0 100%;
  .bebot {
    margin: 0 auto;
    // margin-top: -161px;
    text-align: center;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // margin-left: -64px;
    // margin-top: -9.5px;
    img {
      width: 128px;
      height: 201px;
    }
  }
  .answer {
    width: 117px;
    height: 90px;
    position: absolute;
    left: 25px;
    bottom: 154px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 18px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    text-align: left;
    height: auto;
    .ownerAnswer {
      color: rgba(45, 226, 230, 1);
      max-height: 36px;
      overflow: hidden;
    }
    .rebotAnswer {
      color: rgba(254, 187, 8, 1);
      max-height: 36px;
      overflow: hidden;
    }
  }
  .bottomList {
    display: flex;
    flex-direction: row;
    z-index: 999;
    padding: 0 25px;
    margin-left: 15px;
    margin-bottom: 10px;
    justify-content: space-around;

    li {
      display: flex;
      text-align: center;
      opacity: 1;
      margin-right: 15px;
      flex-direction: column;
      justify-content: space-around;
      img {
        width: 53px;
        height: 53px;
      }
      span {
        height: 18px;
        font-size: 13px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
        text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
        font-family: PingFangSC-Medium, PingFang SC;
      }
    }
  }

  .input-bottom-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .input-bottom {
    width: 86.7%;
    height: 42px;
    background: rgba(92, 191, 191, 0.25);
    border-radius: 8px;
    border: 1px solid rgba(45, 226, 230, 1);
    flex: 0 0 auto;
    z-index: 999;
    justify-content: space-between;
    input {
      float: left;
      width: 68.3%;
      font-size: 15px;
      font-weight: 400;
      color: rgba(122, 234, 234, 1);
      line-height: 21px;
      background: none;
      outline: none;
      border: none;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .btn {
      float: right;
      width: 16.7%;
      height: 42px;
      line-height: 42px;
      color: #2de2e6;
      // position: fixed;
      // right: 24px;
      // bottom: 15px;
      text-align: center;
      font-size: 13px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      border: 1px solid #2de2e6;
      border-radius: 0 8px 8px 0;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: rgba(122, 234, 234, 1);
    }
  }
  .cont3 {
    width: 305px;
    height: 224px;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    .contwrap {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-family: PingFangSC-Regular, PingFang SC;
      position: relative;
      .headImg {
        width: 81px;
        height: 64px;
        position: absolute;
        top: -64px;
        left: 115px;
      }
      .handImg {
        width: 100px;
        height: 10px;
        position: absolute;
        top: -4px;
        left: 106px;
      }
      #title {
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
        margin-top: 30px;
      }
      #warn {
        font-size: 13px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
        margin-top: 5px;
      }
      #line {
        width: 265px;
        height: 1px;
        background: rgba(239, 239, 239, 1);
        margin-left: 20px;
        margin-top: 7px;
      }
      input {
        width: 265px;
        height: 25px;
        margin-top: 25px;
        border: 0;
        margin-left: 20px;
      }
      #limit {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(253, 41, 41, 1);
        line-height: 18px;
        margin-top: 6px;
      }
    }
  }
  .moon {
    margin-bottom: -16px;
    width: 70px;
    height: 92px;
    position: absolute;
    top: 50%;
    margin-top: -32px;
  }
}
.earth {
  opacity: 0.4;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 239px;
}
.img1 {
  display: block;
  width: 65px;
  height: 65px;
  margin: 0 auto;
  margin-top: -31px;
}
.title {
  font-size: 17px;
  font-weight: 500;
  color: rgba(0, 147, 253, 1);
  line-height: 24px;
  text-align: center;
  margin-top: 20px;
  text-decoration: rgba(239, 239, 239, 1);
  position: relative;
  .active {
    width: 35px;
    height: 3px;
    background: rgba(0, 147, 253, 1);
    border-radius: 2px;
    position: absolute;
    bottom: -5px;
    left: 50%;
    margin-left: -17.5px;
  }
}
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
          margin: 3px 0 3px 10px;
          width: 187px;
          height: 18px;
          display: flex;
          .dengji2 {
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
        > div img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  .cont2 {
    width: 305px;
    height: 174px;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    .contwrap {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      .top {
        margin-bottom: 7px;
      }
      .isOk {
        display: flex;
        // align-items: center;
        // justify-content: center;
        .isNo {
          width: 125px;
          height: 42px;
          background: rgba(234, 234, 234, 1);
          border-radius: 4px;
          text-align: center;
          line-height: 42px;
        }
        .isYes {
          width: 125px;
          height: 42px;
          background: rgba(0, 147, 253, 1);
          border-radius: 4px;
          text-align: center;
          line-height: 42px;
          margin-left: 20px;
        }
      }
    }
  }
  .cont3 {
    width: 170px;
    height: 170px;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    .contwrap {
      display: flex;
      flex-direction: column;
      text-align: center;
      > img {
        width: 55px;
        height: 55px;
        margin: 25px auto 0;
      }
      > div {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
    }
  }
  .cont4 {
    width: 305px;
    height: 208px;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    .contwrap {
      display: flex;
      flex-direction: column;
      text-align: center;
      > img {
        width: 55px;
        height: 55px;
        margin: 25px auto 0;
      }
      > div {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
    }
  }
  .cont5 {
    width: 305px;
    height: 173px;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    color: #333;
    .contwrap {
      display: flex;
      flex-direction: column;
      text-align: center;
      > img {
        width: 55px;
        height: 55px;
        margin: 25px auto 0;
      }
      > div {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
    }
  }
  > .rightLogin {
    width: 80px;
    height: 32px;
    background: rgba(0, 147, 253, 1);
    border-radius: 16px;
    margin: 29px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      width: 16px;
      height: 16px;
    }
    > div {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
      margin-left: 2px;
    }
  }
  .rightLogin2 {
    width: 80px;
    height: 32px;
    background: rgba(236, 236, 236, 1);
    border-radius: 16px;
    margin: 29px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-family: PingFangSC-Medium, PingFang SC;
    > div {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(0, 147, 253, 1);
      line-height: 21px;
    }
  }
  .rightLogin3 {
    width: 80px;
    height: 32px;
    background: rgba(236, 236, 236, 1);
    border-radius: 16px;
    margin: 29px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(172, 172, 172, 1);
      line-height: 21px;
    }
  }
}
.bottomLine {
  width: 335px;
  height: 1px;
  background: rgba(239, 239, 239, 1);
  //   margin-top: 15px;
  margin: 20px auto 0px auto;
}

.cont2 {
  width: 305px;
  height: 174px;
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;
  .contwrap {
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    .top {
      margin-bottom: 7px;
    }
    .isOk {
      display: flex;
      // align-items: center;
      // justify-content: center;
      .isNo {
        width: 125px;
        height: 42px;
        background: rgba(234, 234, 234, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 42px;
      }
      .isYes {
        width: 125px;
        height: 42px;
        background: rgba(0, 147, 253, 1);
        border-radius: 4px;
        text-align: center;
        line-height: 42px;
        margin-left: 20px;
      }
    }
  }
}
</style>