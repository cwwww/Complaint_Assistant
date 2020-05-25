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
        <p v-html="bebot">《保险侠服务协议》</p>
        <!-- <a href="https://h5.baoxianxia.com.cn/app/agreement.html">《保险侠服务协议》</a> -->
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
import { reqlogin,reqbebotCode,reqsendMsmCode,reqwxconfig } from '../axios/axios-api'
// import {debounce} from '../assets/js/common'
import { Toast,Checkbox } from 'vant';
export default {
  name: "Login",
  data() {
    return {　　　　
      bebot:'大厦弗兰克教授分了就分了空当接龙开发发动机时空裂缝决定了快速反击李开复第三方，房贷首付。房贷首付',
    };
  }
}
</script>
<style lang="scss" scoped>

</style>