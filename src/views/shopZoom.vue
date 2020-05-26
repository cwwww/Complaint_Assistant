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
      <p>10-29 08:23
        <span class="add" @click="toAdd">添加+</span>
      </p>
      <div class="contain">
        <div class="centercontent" v-for="(item, index) in list" :key="index">
        <div class="question">
          <div class="topQ">
            <img :src="img" alt />
            <textarea class="text" v-show="isShow" id="myText">
              {{item.question}}
            </textarea> 
            <div class="text2" v-show="!isShow">
              {{item.question}}
              </div>
            <img @click="remove(index)" class="delete" :src="img5" alt="">
          </div>
          <!-- <div class="texts">
            <p>{{$route.query.Question}}</p>
          </div> -->
        </div>
        <div class="assets">
          <img :src="img1" alt />
          <textarea class="text" v-show="isShow" id="myText2">
            {{item.answer}}
            </textarea> 
          <div class="text2" v-show="!isShow">
            {{item.answer}}
          </div>
        </div>
        <div class="buttons">
          <img :src="img2" @click="toEdit(index)" alt />
          <img :src="img3" v-show="isShow" @click="toSave(index)" alt />
          <img @click="listPage(index)" :src="img4" v-show="!isShow" alt="">
        </div>
        <div style="height:20px;"></div>
      </div>
      </div>
      <router-view />
    </van-popup>
  </div>
</template>
<script>
import { Toast } from 'vant';
import { reqlistPage,reqknowledgeList,reqeditList,reqdeleteList,reqaddledgeList } from '../axios/axios-api'
export default {
  name: "shopZoom",
  data() {
    return {
      list:[],
      curIndex: 0,
      show: true,
      isShow:false,
      flag:true,
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
      if(this.$route.query.type == 'type'){
        this.$router.push('/Repository')
      }else{
        this.$router.push('/HomeChat')
      }
    },
    listPage(index){
      console.log(this.list[index])
      let param = {
        "online_data_id":this.list[index].online_data_id,
        "broker_id":33,
        "question":this.$route.query.Qusetion,
        "answer":this.$route.query.Answer,
        "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
      }
      console.log(param)
      let res = reqlistPage(param)
        res.then(res=>{
          Toast(res.msg);
        }).catch(reslove=>{
           console.log('error')
        })
    },
    toAdd(){
      if(this.flag){
        this.Qusetion = this.$route.query.Qusetion
        this.Answer = this.$route.query.Answer
        this.flag = false
      }else{
        this.Qusetion = ''
        this.Answer = ''
      }
      let param = {
        "broker_id":33,
        "question":this.Qusetion,
        "answer":this.Answer,
        "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
      }
      console.log(param)
      let res = reqaddledgeList(param)
        res.then(res=>{
          this.ShoWList()
          console.log(res);
        }).catch(reslove=>{
           console.log('error')
        })
    },
    remove(index){
      let param = {
        "broker_id":33,
        "online_data_id":this.list[index].online_data_id,
        "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
      }
      console.log(param)
      let res = reqdeleteList (param)
        res.then(res=>{
      this.ShoWList()
          console.log(res);
        }).catch(reslove=>{
           console.log('error')
        })
    },
    showPopup() {
      this.show = true;
    },
    toEdit(index){
      this.isShow = true
    },
    toSave(index){
      this.isShow = false
      this.$route.query.Qusetion = document.getElementById("myText").value
      this.$route.query.Answer = document.getElementById("myText2").value
      // if(this.list[index].Qusetion == ''){
      //   this.Qusetion = ' '
      // }
      // if(this.list[index].Answer == ''){
      //   this.Answer = ' '
      // }
      let param = {
        "modified_data_id":this.list[index].online_data_id,
        "broker_id":33,
        "question":this.$route.query.Qusetion,
        "answer":this.$route.query.Answer,
        "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
      }
      let res = reqeditList(param)
        res.then(res=>{
          console.log(res)
          this.list = res.result.data
        }).catch(reslove=>{
           console.log('error')
        })
    },
    ShoWList(){
      let param = {
        "broker_id":33,
        "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
      }
      console.log(param)
      let res = reqknowledgeList (param)
        res.then(res=>{
          console.log(res)
          this.list = res.result.data
        }).catch(reslove=>{
           console.log('error')
        })
    }
  },
  // watch(){
  //   console.log(document.getElementById("myText").value)
  // },
  mounted(){
    this.ShoWList()
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
      position: relative;
    }
    > .line {
      width: 100%;
      height: 6px;
      background: rgba(245, 245, 245, 1);
      margin-top: 10px;
      margin-bottom: 16px;
    }
    .add{
      background: #f1f6fb;
      position: absolute;
      right: 20px;
      font-size: 14px;
    }
    .contain{
      > .centercontent {
      width: 345px;
      height: auto;
      background: rgba(241, 246, 251, 1);
      border-radius: 6px;
      margin: 0 auto;
      margin-top: 18px;
      position: relative;
      > .question {
      > .topQ {
      // display: flex;
      // justify-content: space-between;
          > img {
          width: 24px;
          height: 24px;
          margin-top: 19px;
          margin-left: 20px;
        }
          .delete{
            width: 54px;
            height: 24px;
            position: absolute;
            top: 0;
            right: 20px;
          }
        > .text {
          width: 305px;
          height: auto;
          height: 100px;
          margin-left: 20px;
          margin-top: 9px;
        }
        > .text2 {
          width: 305px;
          height: auto;
          // margin: 0 auto;
          margin-left: 20px;
          margin-top: 6px;
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
}
</style>