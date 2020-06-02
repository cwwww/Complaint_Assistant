<template>
  <div class="warp">
    <van-popup
      class="content"
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '80%' }"
      @close="close"
    >
      <span>知识库</span>
      <div class="line"></div>
      <p>
        10-29 08:23
        <span class="add" @click="toAdd">添加+</span>
      </p>
      <div class="contain">
        <div class="centercontent" v-for="(item, index) in list" :key="index">
          <div class="question">
            <div class="topQ">
              <img :src="img" alt />
              <textarea class="text" v-show="index == showIndex ?true:false" id="myText">
              {{item.question}}
            </textarea>
              <div class="text2" v-show="index != showIndex ?true:false">{{item.question}}</div>
              <img
                @click="remove(index)"
                class="delete"
                :src="img5"
                alt
                v-if="item.online_data_id!=''"
              />
            </div>
            <!-- <div class="texts">
            <p>{{$route.query.Question}}</p>
            </div>-->
          </div>
          <div class="assets">
            <img :src="img1" alt />
            <textarea class="text" v-show="index == showIndex ?true:false" id="myText2">
            {{item.answer}}
            </textarea>
            <div class="text2" v-show="index != showIndex ?true:false">{{item.answer}}</div>
          </div>
          <div class="buttons">
            <img :src="img2" @click="toEdit(index)" alt />
            <img :src="img3" v-show="index == showIndex ?true:false" @click="toSave(index)" alt />
            <img @click="listPage(index)" :src="img4" v-show="index != showIndex ?true:false" alt />
          </div>
          <div style="height:20px;"></div>
        </div>
      </div>
      <router-view />
    </van-popup>
  </div>
</template>
<script>
import { Toast } from "vant";
import Bus from "./../../../assets/js/common/Bus";
import {
  reqlistPage,
  reqknowledgeList,
  reqeditList,
  reqdeleteList,
  reqaddledgeList,
  reqtaskStatus
} from "../../../axios/axios-api";
export default {
  name: "shopZoom",
  data() {
    return {
      list: [],
      curIndex: 0,
      show: true,
      isShow: false,
      showIndex: 0,
      isEdit: false,
      flag: true,
      img: require("../../../assets/images/Q_small_icon@2x.png"),
      img1: require("../../../assets/images/A_small_icon@2x.png"),
      img2: require("../../../assets/images/biajide.png"),
      img3: require("../../../assets/images/bachkdjfi.png"),
      img4: require("../../../assets/images/fabude.png"),
      img5: require("../../../assets/images/delete@3x.png")
    };
  },
  props: [
    "broker_id_prop",
    "robot_id_prop",
    "token_prop",
    "shopZoomC_show",
    "type"
  ],
  created() {
    Bus.$on("teachyou", data => {
      alert(JSON.stringify(data));
      let question = data.Question;
      let answer = data.Answer;
    });
    this.show = this.shopZoomC_show;
    this.broker_id_prop = this.broker_id;
    this.robot_id_prop = this.robot_id;
    this.token_prop = this.token;
    this.type_prop = this.type;
  },
  watch: {
    shopZoomC_show(newValue) {
      this.show = newValue;
    },
    data(newValue){
      this.show = newValue;
    }
  },
  methods: {
    close() {
      if (this.$route.query.type == "type") {
        this.$emit("shopZoomC", false);
        // this.$router.push({
        //   path: "/Repository",
        //   query: {
        //     broker_id: this.$route.query.broker_id,
        //     robot_id: this.$route.query.robotId,
        //     token: this.$route.query.token,
        //     type: "type"
        //   }
        // });
      }
      // else {
      // this.$emit('HomeChatC',false)
      //   this.$router.push({
      //     path: "/HomeChat",
      //     query: {
      //       broker_id: this.$route.query.broker_id,
      //       robot_id: this.$route.query.robotId,
      //       token: this.$route.query.token
      //     }
      //   });
      // }
    },
    listPage(index) {
      console.log(this.list[index]);
      if (this.list[index].online_data_id == "") {
        Toast("请编辑保存后再发布！");
      } else {
        let param = {
          online_data_id: this.list[index].online_data_id,
          broker_id: this.$route.query.broker_id,
          question: this.$route.query.Qusetion,
          answer: this.$route.query.Answer,
          token: this.$route.query.token
        };
        console.log(param);
        let res = reqlistPage(param);
        res
          .then(res => {
            Toast(res.msg);
          })
          .catch(reslove => {
            console.log("error");
          });
      }
    },
    toAdd() {
      if (this.flag) {
        this.Qusetion = this.$route.query.Qusetion;
        this.Answer = this.$route.query.Answer;
        this.flag = false;
      } else {
        this.Qusetion = "";
        this.Answer = "";
      }
      let param = {
        broker_id: this.$route.query.broker_id,
        question: this.Qusetion,
        answer: this.Answer,
        token: this.$route.query.token
      };
      console.log(param);
      //   let res = reqaddledgeList(param)
      //     res.then(res=>{
      // debugger;

      //       console.log(res);
      //     }).catch(reslove=>{
      //        console.log('error')
      //     })

      this.showListAdd("", "");
      // this.$set(this.list, this.list.length,{
      // question : null,
      // answer:null,
      //    online_data_id:"",
      //    });
    },
    remove(index) {
      let param = {
        broker_id: this.$route.query.broker_id,
        online_data_id: this.list[index].online_data_id,
        token: this.$route.query.token
      };
      console.log(param);
      let res = reqdeleteList(param);
      res
        .then(res => {
          this.ShoWList();
          console.log(res);
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    showPopup() {
      this.show = true;
    },
    toEdit(index) {
      this.showIndex = index;
      //this.isShow = true
      this.isEdit = true;
    },
    toSave(index) {
      //this.isShow = false
      this.showIndex = -1;
      this.$route.query.Qusetion = document.getElementById("myText").value;
      this.$route.query.Answer = document.getElementById("myText2").value;
      // if(this.list[index].Qusetion == ''){
      //   this.Qusetion = ' '
      // }
      // if(this.list[index].Answer == ''){
      //   this.Answer = ' '
      // }
      let canSave = true;
      if (
        this.trim(this.$route.query.Qusetion) == "" ||
        this.trim(this.$route.query.Answer) == ""
      ) {
        Toast("内容不能为空");
        this.showIndex = index;
        canSave = false;
      }

      if (this.list[index].online_data_id != "") {
        let param = {
          modified_data_id: this.list[index].online_data_id,
          broker_id: this.$route.query.broker_id,
          question: this.$route.query.Qusetion,
          answer: this.$route.query.Answer,
          token: this.$route.query.token
        };
        let res = reqeditList(param);
        res
          .then(res => {
            console.log(res);
            this.list = res.result.data;
            this.ShoWList();
          })
          .catch(reslove => {
            console.log("error");
          });
      } else {
        if (canSave) {
          let param2 = {
            broker_id: this.$route.query.broker_id,
            question: this.$route.query.Qusetion,
            answer: this.$route.query.Answer,
            token: this.$route.query.token
          };
          let res = reqaddledgeList(param2);
          res
            .then(res => {
              console.log(res);
              this.list = res.result.data;
              this.ShoWList();
            })
            .catch(reslove => {
              console.log("error");
            });
          //增加知识的任务
          this.getReqtaskStatus();
        }
      }
    },
    showListAdd(question, answer) {
      this.showIndex = -1;
      let param = {
        broker_id: this.$route.query.broker_id,
        token: this.$route.query.token
      };
      console.log(param);
      let res = reqknowledgeList(param);
      res
        .then(res => {
          console.log(res);
          this.list = res.result.data;
          this.list.splice(0, 0, {
            question: question,
            answer: answer,
            online_data_id: ""
          });
          //this.list.push();
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    ShoWList() {
      this.showIndex = -1;
      let param = {
        broker_id: this.$route.query.broker_id,
        token: this.$route.query.token
      };
      console.log(param);
      let res = reqknowledgeList(param);
      res
        .then(res => {
          console.log(res);
          this.list = res.result.data;
        })
        .catch(reslove => {
          console.log("error");
        });
    },
    trim(data) {
      return data.replace(/(^\s*)|(\s*$)/g, "");
    },
    //与机器人聊天任务
    getReqtaskStatus() {
      let param = {
        broker_id: 1,
        robot_id: 1,
        operation_type: 2,
        token: "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"
      };
      console.log("任务的param:" + param);

      let result = reqtaskStatus(param);
      result
        .then(res => {})
        .catch(reslove => {
          console.log("error");
        });
    }
  },
  // watch(){
  //   console.log(document.getElementById("myText").value)
  // },
  mounted() {
    // let question = this.$route.query.Question;
    // let answer = this.$route.query.Answer;
    if (question != "") {
      this.showListAdd(question, answer);
    } else {
      this.ShoWList();
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
    .add {
      background: #f1f6fb;
      position: absolute;
      right: 20px;
      font-size: 14px;
    }
    .contain {
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
            .delete {
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