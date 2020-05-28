<template>
  <div class="wrap">

    <div class="main">
      <div class="content">
        <div class="leftBox">
          <div class="leftLogon">
            <img :src="img" alt>
          </div>
          <div class="textContent">
            <span>和机器人第一次聊天</span>
            <p>和机器人说第一句话</p>
          </div>
        </div>
        <div class="rightBox">
          <div v-if="bxmove" class="topTitle" :class="{ 'movetransition': bxmove?'movetransition':'' }">
            <div class="leftImg">
              <img :src="img1" alt>
            </div>
            <p v-if="showTitle">+100</p>
            <!-- <p v-else  style="width:19px"></p> -->
            <div class="rightImg">
              <img :src="img2" alt>
            </div>
            <span v-if="showTitle">+10</span>
            <!-- <span v-else style="width:19px"></span> -->
          </div>
          <div class="topTitle" :class="{'moveTitle':bxmove?'':'moveTitle'}">
            <div class="leftImg">
              <img :src="img1" alt>
            </div>
            <p>+100</p>
            <div class="rightImg">
              <img :src="img2" alt>
            </div>
            <span>+10</span>
          </div>
          <!--  <transition name="move">
		   <div v-show="showFlag" class='food'>
		     <div class="food-content">
		       <div class="image-header">
		         <img :src="img2" alt="">
		       </div>
		     </div>
		   </div>
          </transition>-->
          <transition name="move">
            <div class="rightBox" v-show="boxshow">
              <div class="topTitle">
                <div class="leftImg">
                  <img :src="img1" alt>
                </div>
                <p>+100</p>
                <div class="rightImg">
                  <img :src="img2" alt>
                </div>
                <span>+10</span>
              </div>
            </div>
          </transition>
          <div class="bottomButton" @click="addcoins">
            <p>{{this.status}}</p>
          </div>
        </div>
      </div>

  

    <div class="content" v-for="(item, index) in EverudayList" :key="item.index">
      <div class="leftBox">
        <div class="leftLogon">
		 <div v-if= "index == 'daily1'">
			 <img  src="../../../assets/images/chat@2x.png" alt />
		 </div>
		 <div v-if="index == 'daily2'">
			 <img src="../../../assets/images/baifang@2x.png" alt />
		 </div>
		 <div v-if="index == 'daily3'">
			 <img src="../../../assets/images/login@2x.png" alt />
		 </div>
		</div>
        <div class="textContent">
          <span>
            <!-- 每日登陆 -->
            {{item.task_name}}
            </span>
          <p>{{item.task_desc}}</p>
        </div>
      </div>
      <div class="rightBox">
        <div class="topTitle">
          <div class="leftImg">
            <img :src="img1" alt />
          </div>
          <p>+{{item.awarded_bcoin}}</p>
          <div class="rightImg">
            <img :src="img2" alt />
          </div>
          <span>+{{item.awarded_exp}}</span>
        </div>
        <div class="bottomButton">
          <p v-if="item.status == '0'">去完成</p>
		  <p v-if="item.status == '1'"  @click="getTaskStatus(broker_id,robot_id,item.task_id,token)" >领取</p>
		  <p v-if="item.status == '2'">已完成</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { getTaskList,reqDialogAgent,taskStatusUpdate } from "../../../axios/axios-api";
export default {
  name: "EveryDayTask",
  data() {
    return {
      boxshow: false,

      status: "",
      result: Object,
      type: "",
      img: require("../../../assets/images/login@2x.png"),
      img1: require("../../../assets/images/jingyan.png"),
      img2: require("../../../assets/images/jignhangs.png"),
      bxmove: false,
      showTitle:true,
    };
  },
  methods: {
    addcoins() {
      this.bxmove = !this.bxmove;
      setTimeout(() => {
        this.bxmove=false;
        
      }, 1200);
    }
  },
 
  mounted() {
	this.robot_id = 33;
	this.broker_id = 33;
	this.token = "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1";
    this.queryDailyTask();
  },
  methods:{
	  //领取任务完成
	  getTaskStatus(broker_id,robot_id,task_id,token){
		         let _this = this;
	  			//领取金币，更新金币和经验
	  			let param = {
	  			  "broker_id":broker_id,
	  			  "robot_id":robot_id,
	  			  "operation_type":7,
	  			  "token": token,
	  			  "task_id":task_id
	  			};
	  			let result = taskStatusUpdate(param);
	  			result
	  			  .then(res => {
	  			    console.log(res, "领取任务信息");
	  				let result = res.result[task_id];
	  				if(res.result.level > _this.level){
	  					this.$alert("恭喜你升级了！","提示");
	  				}
					this.queryDailyTask();
	  			  })
	  			  .catch(reslove => {
	  			    console.log("error");
	  			  });
	  		
	  },
	  
	  queryDailyTask(){
		  let param2 = {
		    "robot_id": 33,
		    "broker_id":33,
		    "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
		    }     
		      let res2 = getTaskList(param2)
		      res2.then(res=>{
		        console.log("每日工作领取："+res)
		  		this.EverudayList = res.result;
		      }).catch(reslove=>{
		         console.log('error')
		      })
	  }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    height: 350px;
    overflow-y: auto;
  }
  .content {
    margin: 12px 0;
    width: 335px;
    height: 100px;
    background: rgba(245, 160, 21, 1);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    &:nth-child(2) {
      background: rgba(76, 208, 105, 1);
    }
    &:nth-child(3) {
      background: rgba(246, 94, 94, 1);
    }
    &:nth-child(4) {
      background: rgba(40, 201, 181, 1);
    }
    &:last-child {
      background: rgba(99, 117, 254, 1);
    }
  > .content {
    margin-top: 12px;
    width: 335px;
    height: 100px;
    background: rgba(76,208,105,1);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
	&:nth-child(2) {
	  background:rgba(246,94,94,1);
	}
	&:nth-child(3) {
	 background:rgba(245, 160, 21, 1);
	}
    > .leftBox {
      display: flex;
      > .leftLogon {
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        margin-top: 25px;
        margin-left: 15px;
        div > img {
          width: 30px;
          height: 30px;
          margin: 10px;
        }
      }
      > .textContent {
        margin-left: 5px;
        > span {
          margin-top: 29px;
          display: block;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 21px;
        }
        > p {
          margin-top: 4px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
        }
      }
    }
    > .rightBox {
      margin-right: 15px;
      // transition: all .2s;
      > .topTitle {
        display: flex;
        // margin-top: 23px;
        > .leftImg {
          width: 18px;
          height: 18px;
          margin-right: 1px;
          > img {
            width: 18px;
            height: 18px;
          }
        }
        > p {
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 17px;
          margin-right: 7px;
        }
        > .rightImg {
          width: 15px;
          height: 20px;
          margin-right: 1px;
          > img {
            width: 15px;
            height: 20px;
          }
        }
        > span {
          display: block;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 17px;
        }
      }
      > .bottomButton {
        width: 80px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border-radius: 16px;
        float: right;
        margin-top: 8px;

        // &:nth-of-type(2) {
        // border:1px solid rgba(255,255,255,1);
        // background:rgba(76,208,105,1);
        // }

        > p {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(76,208,105,1);
          line-height: 21px;
          text-align: center;
          margin-top: 6px;
        }
      }

      > .twos {
        border: 1px solid rgba(255, 255, 255, 1);
        background: rgba(76, 208, 105, 1);
        > p {
          color: rgba(255, 255, 255, 1);
        }
      }
      > .threes {
        background: rgba(246, 94, 94, 1);
        > p {
          color: rgba(255, 255, 255, 1);
        }
      }
      > .four {
        background: rgba(40, 201, 181, 1);
        > p {
          color: rgba(255, 255, 255, 1);
        }
      }
      > .fives {
        background:rgba(99, 117, 254, 1) > p {
          color: rgba(255, 255, 255, 1);
        }
      }

    }
  }
}
.box {
  overflow: hidden;
  transition: all 0.25s ease-in;
  -moz-transition: all 0.25s ease-in;
  -webkit-transition: all 0.25s ease-in;
}
.moveTitle{
        margin-top: 23px;

}
.box:hover {
  border: 3px solid #ef8d0e;
  /*Y轴上表示上升*/
  transform: translateY(-100px);
}
//给过渡的name加样式

// .mybox-leave-active,.mybox-enter-active{
//  transition: all  .25s  ease-in;
// }
// .mybox-leave-active,.mybox-enter{
//  height:0px !important;
// }
// .mybox-leave,.mybox-enter-active{
//  height: 500px;
// }
.movetransition {
  animation: iconmove .3s linear 4;
 
}
@keyframes iconmove {
  0% {
    -webkit-transform: translateY(3.4667px);
     opacity: 0;
  }
  25% {
    -webkit-transform: translateY(-6.4667px);

  }
  // 50% {
  //   -webkit-transform: translateY(-9.4667px);
  // }
  // 75% {
  //   -webkit-transform: translateY(-12.4667px);
  // }
  100% {
    -webkit-transform: translateY(-15.4667px);
    //  opacity: 1;
  }
}
.move--leave {
  transform: translate(100%, 0, 0);
}
.demo_transform4 {
  // -webkit-transform: translate(120px, 0);
  // -moz-transform: translate(120px, 0);
}
.menu ul li.translate a:hover {
  -moz-transform: translate(-10px, -10px);
  -webkit-transform: translate(-10px, -10px);
  -o-transform: translate(-10px, -10px);
  -ms-transform: translate(-10px, -10px);
  transform: translate(-10px, -10px);
  }
}
</style>