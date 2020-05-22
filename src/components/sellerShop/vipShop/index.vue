<template>
  <div>
    <div class="main">
        <div class="wrap">
          <div class="left">
            <div class="leftBigLogon">
              <img :src=vipShop alt />
            </div>
            <div class="content">
              <div class="topTitle">
                <span>限免领取</span>
                <div class="lelve">899 BeBot精灵限免领取，邀请好友即可获限免使用资格</div>
              </div>
            </div>
          </div>
          <div class="smallMoney">
            <span style="color:#FD2929;font-weight:500;font-size:17px;">￥0</span>
            <span style="margin-left:5px;font-size:13px;color:#999;">899</span>
            <div class="line"></div>
          </div>
          <div class="rightLogin" type="text">
            <div>限时领取</div>
          </div>
        </div>
        <div class="bottomLine"></div>
    </div>
  </div>
</template>
<script>
import { reqMyShop } from "../../../axios/axios-api";

export default {
  name: "myShop",
  data() {
    return {
      goodsList:[],
      homeInit:Object,
      bxdj:'',
      levelbx:'',
      homeLevel:'',
      star:'',
      isStatus:'',
      value:0,
      fairyStatus:'',
      vipShop: require("../../../assets/images/包月会员@2x.png"),
    };
  },

  mounted() {
      let param = {
        "robot_id":"1",
        "user_id":"1",
        "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"
      }
      let res = reqMyShop(param)
      res.then(res=>{
      console.log(res)
      var that = this
      that.goodsList = res.result.goods_list[0]
      console.log(that.goodsList)
      if(that.goodsList.status == 1){
        that.goodsList.status = '上架'
        this.isStatus = false
      }else{
        that.goodsList.status = '下架'
        this.isStatus = true
      }
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
      }).catch(reslove=>{
         console.log('error')
      })
  }
};
</script>
<style lang="scss" scoped>
.main {
  height: 350px;
  overflow-y: auto;
  margin-top: 12px;
}
.wrap {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  position: relative;
  > .left {
    display: flex;
    margin-left: 20px;
    margin-top: 8px;
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
        font-weight:500;
        > span {
          margin-left: 10px;
          display: block;
          font-size:15px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:21px;
        }
        > .lelve {
          width: 180px;
          white-space: wrap;
          margin-left: 10px;
          color: #999;
          margin-top: 6px;
        }
        > .dengji {
          margin:3px 0 3px 10px;
          width: 187px;
          height: 18px;
          display: flex;
          .dengji2{
            margin-left: 8px;
            color: #999;
          }
          > img {
            width: 80px;
            height: 18px;
          }
        }
      }
    }
  }
  .smallMoney{
    position: absolute;
    right: 26px;
    top: 5px;
    .line{
      width: 40px;
      height: 2px;
      background: #999;
      position: absolute;
      right: 2px;
      top: 12px;
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
  > .rightLogin2 {
      width:80px;
      height:32px;
      background:#FFF;
      border: 1px solid #0093FD;
      border-radius:16px;
      margin: 17px 20px 0 0;
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
        color:#0093FD;
        
        line-height:21px;
        margin-left: 2px;
      }
  }
}
  .bottomLine {
    width: 335px;
    height: 1px;
    background: rgba(239, 239, 239, 1);
    margin: 15px auto 0px auto;
  }
</style>