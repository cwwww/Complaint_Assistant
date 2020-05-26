// 登陆页
<template>
  <div class="warp">
    <img :src="img" alt />
    <div class="topCorse">
      <img :src="img1" alt />
    </div>
    <span>请登录</span>
    <div class="inputZh">
      <input class="input phone" type="text" placeholder="请输入手机号" maxlength="11" ref="phone"/>
      <img :src="img2" alt />
    </div>
    <div class="passWord">
      <div class="leftPassword">
        <input class="input research" type="text" placeholder="请输入验证码" ref="research" maxlength="6"/>
        <img :src="img3" alt />
      </div>
      <div class="rightSend" id="box">
        <p @click="loginResearch">发送验证码</p>
      </div>
    </div>
    <div class="bottomText">
      <van-checkbox class="checkout"  v-model="check">复选框</van-checkbox>
      <div class="text">
        <span>已阅读并同意</span>
        <router-link to="/bebotAgree">《保险侠服务协议》</router-link>
        <span>及</span>
        <a href="https://h5.baoxianxia.com.cn/app/secret.html">《保险侠隐私</a>
        <a href="https://h5.baoxianxia.com.cn/app/secret.html">政策》</a>
      </div>
    </div>
    <div class="loginButton" @click="login">
      <p>登录</p>
    </div>
  </div>
</template>
<script>
import { reqlogin,reqbebotCode,reqsendMsmCode,reqwxconfig,reqloginMsmCode } from '../axios/axios-api'
// import {debounce} from '../assets/js/common'
import { Toast,Checkbox } from 'vant';
export default {
  name: "Login",
  data() {
    return {　　　　
      check: true,
      phone: '', //输入框中的手机号
      research: '', //输入框中的验证码
      codeText: '获取验证码',  //倒计时显示文字
      timingBoard: 60,  //倒计时数
      timer: null,  //一个定时器，用来倒数验证码　
      wx_link:'',
      redirect_uri:'',
      appId:'',
      callback:'',
      code:'',
      img: require("../assets/images/loginimg.png"),
      img1: require("../assets/images/lisfjaiwe.png"),
      img2: require("../assets/images/shouji.png"),
      img3: require("../assets/images/suos.png")
    };
  },
  methods:{
    getLogin(){
        let param = {
            "PHONE": "13544668944",
            "OPENID": null,
            "NICKNAME": null,
            "HEADIMGURL":  null,
            "SEX":  null,
            "PROVINCE":  null,
            "CITY": null,
            "COUNTRY": null,
            "PRIVILEGE":  null,
            "code": "1256"
        }
      let res = reqlogin(param)
      res.then(res=>{
        // console.log(res)
      }).catch(reslove=>{
            console.log('error')
      })
    },	
    checked(){
      this.check = false
    },
    // 
    GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return decodeURIComponent(r[2]);
        return null;
    },
    impower(){
        let param = {"code":this.code}
        let res = reqbebotCode (param)
        res.then(res=>{
          console.log(res)
        }).catch(reslove=>{
          console.log('error')
        })
      // }
    },
    loginResearch(){  
      if (this.$refs.phone.value == '') {
        Toast('请输入手机号')
      }else if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.$refs.phone.value)){
        Toast('请输入正确的手机号')
      } else if(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.$refs.phone.value)) {
        let param = {"PHONE": this.$refs.phone.value}
        console.log(param)
        let res = reqsendMsmCode(param)
        res.then(res=>{
          console.log(res)
        }).catch(reslove=>{
          console.log('error')
        })
      }
    },
    login(){
      if(this.$refs.phone.value == '' || this.$refs.research.value == ''){
        Toast('请输入手机号和验证码')
      }else if(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.$refs.phone.value) && this.$refs.research.value.length < 6){
        Toast('请输入正确的验证码')
      }else if(!this.check){
        Toast('请勾选协议')
      }else{
        let param = {"PHONE": this.$refs.phone.value,
        "code":this.$refs.research.value
        }
        console.log(param)
        let res = reqloginMsmCode (param)
        res.then(res=>{
          console.log(res)
          this.$router.replace('/')
        }).catch(reslove=>{
          console.log('error')
        })
      }
    },
  getCode(){ // 非静默授权，第一次有弹框
        this.code = ''
        // var local = window.location.href // 获取页面url
        var local = "https://bebot-web.baoxianxia.com.cn/#/login" // 获取页面url
        var appid = 'wx026553ce8b4e59a3'
        this.code = this.getUrlCode().code // 截取code
        if (this.code == null || this.code === '') { // 如果没有code，则去请求
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
        } else {
            // 你自己的业务逻辑
        }
        console.log(this.code)
  },
  getUrlCode() { // 截取url中的code方法
        var url = window.location.search
        this.winUrl = url
        var theRequest = new Object()
        if (url.indexOf("?") != -1) {
            var str = url.substr(1)
            var strs = str.split("&")
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
            }
        }
        return theRequest
    }
  },
  mounted(){
      if(!window.localStorage.getItem('openId')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
          this.getCode()
          alert(this.getCode())
      } else {
          // 别的业务逻辑
      }
      this.impower()
      console.log(this.getUrlCode().code)
    },
  }
</script>
<style lang="scss" scoped>
.warp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  > img {
    width: 100%;
    height: 667px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -999;
  }
  > .topCorse {
    margin-top: 90px;
    margin-left: 30px;
    width: 110px;
    height: 85px;

    > img {
      width: 110px;
      height: 85px;
    }
  }
  > span {
    margin-top: 6px;
    margin-left: 30px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(99, 226, 245, 1);
    line-height: 28px;
  }
  > .inputZh {
    width: 317px;
    height: 46px;
    background-image: url("../assets/images/ipntuZhs.png");
    background-size: cover;
    margin-left: 29px;
    margin-top: 13px;
    position: relative;
    > input {
      width: 317px;
      height: 46px;
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(148, 240, 255, 1);
      line-height: 21px;
      text-indent: 2em;
    }
    > img {
      width: 26px;
      height: 32px;
      position: absolute;
      top: 8px;
      left: 7px;
    }
  }
  > .passWord {
    display: flex;
    margin-left: 29px;
    margin-top: 13px;
    > .leftPassword {
      width: 194px;
      height: 46px;
      background-image: url("../assets/images/psssword.png");
      background-size: cover;
      position: relative;
      > input {
        width: 194px;
        height: 46px;
        border: none;
        outline: none;
        background-color:transparent;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(148, 240, 255, 1);
        line-height: 21px;
        text-indent: 2em;
      }
      > img {
        width: 26px;
        height: 32px;
        position: absolute;
        top: 8px;
        left: 7px;
      }
    }
    > .rightSend {
      width: 104px;
      height: 44px;
      border-radius: 4px;
      border: 1px solid rgba(145, 233, 244, 1);
      margin-left: 18px;
      > p {
        text-align: center;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(152, 241, 255, 1);
        line-height: 21px;
        margin-top: 12px;
      }
    }
  }
  > .bottomText {
    display: flex;
    margin-left: 30px;
    margin-top: 14px;
    > .checkout {
      width: 14px;
      height: 14px;
      border: 1px solid blue;
      border-radius: 50%;
      margin-top: 2px;
    }
    > .text {
      width: 297px;
      // display: flex;
      margin-left: 6px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 18px;
      float: left;
      > span {
        display: block;
        float: left;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
      > a {
        float: left;
        display: block;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6aedff;
        line-height: 18px;
      }
    }
  }
  > .loginButton {
    width: 315px;
    height: 44px;
    // background: linear-gradient(
    //   233deg,
    //   rgba(41, 161, 172, 0) 0%,
    //   rgba(106, 237, 255, 1) 100%
    // );
    background: rgba(106, 237, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(142, 236, 255, 0.25);
    border-radius: 4px;
    margin-top: 39px;
    margin-left: 30px;
    > p {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(16, 88, 98, 1);
      line-height: 24px;
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>