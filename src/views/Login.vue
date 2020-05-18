// 登陆页
<template>
  <div class="warp">
    <img :src="img" alt />
    <div class="topCorse">
      <img :src="img1" alt />
    </div>
    <span>请登录</span>
    <div class="inputZh">
      <input type="text" placeholder="请输入手机号" />
      <img :src="img2" alt />
    </div>
    <div class="passWord">
      <div class="leftPassword">
        <input type="text" placeholder="请输入验证码" />
        <img :src="img3" alt />
      </div>
      <div class="rightSend">
        <p>发送验证码</p>
      </div>
    </div>
    <div class="bottomText">
      <div class="checkout"></div>
      <div class="text">
        <!-- <p>已阅读并同意</p> -->
        <span>已阅读并同意</span>
        <p>《保险侠服务协议》</p>
        <span>及</span>
        <p>《保险侠隐私</p>
        <p>政策》</p>
      </div>
    </div>
    <div class="loginButton">
      <p>登录</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      img: require("../assets/images/loginimg.png"),
      img1: require("../assets/images/lisfjaiwe.png"),
      img2: require("../assets/images/shouji.png"),
      img3: require("../assets/images/suos.png")
    };
  }
};
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
      background-color: none;
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
        background-color: none;
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
      > p {
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
    background: linear-gradient(
      233deg,
      rgba(41, 161, 172, 0) 0%,
      rgba(106, 237, 255, 1) 100%
    );
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