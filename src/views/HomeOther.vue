<template>
	<div class="contain">
		<!-- <div v-if="this.registers.visitor_type == '1'"> -->
			<div class="information">
				<div class="mes">
					<div class="topHalfPart">
						<div class="headPortrait">
							<img :src=homeInit.headimgurl alt="">
						</div>
						<div class="infor">
							<div class="swsName">{{homeInit.name}}&nbsp;事务所</div>
							<!-- <img class="line" :src=line alt=""> -->
							<!-- <img class="experience" :src=experience alt=""> 
				<div class="ArticleExperience">{{homeInit.exp}}/{{homeInit.level_exp}}</div> -->
							<div class="level">Lv.{{homeInit.level}}</div>
							<!-- <div class="leftPart"> -->
							<img :src=homeLevel style="height:18px;line-height:18px;margin-left: 40px;" alt="">
							<!-- </div> -->
						</div>
					</div>
					<div class="bottomHalfPart">
						<div class="leftPart">
							<!-- <img :src=homeLevel style="height:18px;line-height:18px;" alt=""> -->
							<div class="guanzhu" @click="guanzhu">{{guanzhuContent}}</div>
						</div>
						<!-- <div class="rightPart">
				<div class="imgs">
				<img :src=money style="width:16px;height:16px;margin-right:4px;" alt="">
				</div>
				<div class="res">{{homeInit.bcoin}}</div>
			</div> -->
					</div>
				</div>
				<div class="fansAndFriend">
					<div class="friend">
						<span class="num">{{homeInit.fans_num}}</span>
						<img src="../assets/images/friends@2x.png" alt="">
						<span class="design">好友</span>
					</div>
					<div class="fan">
						<span class="num">{{homeInit.fans_num}}</span>
						<img src="../assets/images/fans@2x.png" alt="">
						<span class="design">粉丝</span>
					</div>
				</div>
			</div>
			<div class="rightList">
				<ul>
					<li @click="toFXCP">
						<img :src=home_risktest alt="">
						<div>风险测评</div>
					</li>
					<li @click="toPlan">
						<img :src=home_planbook alt="">
						<div>计划书</div>
					</li>
				</ul>
			</div>
			<div>
				<div class="talk">
					<!-- <div v-show="!answer">Hi，有空么，和我 随便聊聊呗</div>
			{{answer}} -->
					<div class="talkContent" id="talkContent" :class="{active:isOwn}">{{answer}}
					</div>
					<div class="btnTalk">
						<img @click="previousPage" class="leftBtn" :src=nextpage2 alt="">
						<img class="rightBtn" @click="nextPage" :src=nextpage alt="">
					</div>
				</div>
				<div class="triangle"></div>
				<div class="triangle2"></div>
			</div>
			<div class="content">
				<img class="moon" :src=moon alt="">
				<div class="bebot">
					<img :src=bebot alt="">
				</div>
				<div class="answer" id="answer">
					<div v-for="(i,index) in list2" :key="index">
						<div class="ownerAnswer" v-show="index%2 == 1">{{i}}</div>
						<div class="rebotAnswer" v-show="index%2 == 0">{{i}}</div>
					</div>
				</div>
				<ul class="bottomList">
					<li @click="toHome" v-if="isRegister">>
						<img :src=back alt="">
						<span>回家</span>
					</li>
					<li @click="register" v-if="!isRegister">
						<img :src=login alt="">
						<span>去登陆</span>
					</li>
					<li style="visibility:hidden">
						<img :src=home_rankinglist alt="">
					</li>
					<li style="visibility:hidden">
						<img :src=home_browse alt="">
					</li>
					<li @click="FairyShop">
						<img :src=home_store alt="">
						<span>精灵商店</span>
						<router-view></router-view>
					</li>
					<li @click="HomeChat">
						<img :src=home_chatrecord alt="">
						<span>聊天记录</span>
						<router-view></router-view>
					</li>
				</ul>
				<div class="input-bottom">
					<input type="text" ref="input" placeholder="输入“风险测评”试试" style="margin-top:11px;margin-left:15px;overflow:hidden; white-space:nowrap; text-overflow:ellipsis;" />
					<div class="btn" @click="submit">发送</div>
				</div>
			</div>
		<!-- </div> -->
		<!-- <div v-if="this.registers.visitor_type == '0'">
			<img :src=share alt="">
		</div> -->
	</div>

</template>
<script>
	import {
		Popup,
		Toast
	} from 'vant';
	// import {
	// 	MessageBox
	// } from 'element-ui';
	import {
		reqHomeInit,
		reqCusayrob,
		reqRobotDetail,
		reqVisitedInit,
		guanZhu,
		reqtaskStatus,
		reqisregistered,
		reqbebotCode,
		reqcustomerlogin
	} from '../axios/axios-api'
	export default {
		components: {},
		data() {
			return {
				visitList:'',
				mes:'',
				registers:'',
				isRegister:Boolean,
				show1: false,
				goodsList: [],
				isOwn: true,
				answerHight: '',
				homeInit: Object,
				bxdj: '',
				guanzhuContent:'关注TA',
				numIndex: 0,
				isInput: '',
				flag: true,
				question: '',
				list: [],
				list2: [],
				answer: '',
				levelbx: '',
				homeLevel: '',
				star: '',
				isStatus: '',
				fairyStatus: '',
				share: require("../assets/images/share@2x.png"),
				img: require("../assets/images/icon.png"),
				register: require("../assets/images/register@2x.png"),
				ezgif: require("../assets/images/ezgif.gif"),
				shop: require("../assets/images/shop@2x.png"),
				home_zsk: require("../assets/images/home_zsk@2x.png"),
				back: require("../assets/images/back@2x.png"),
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
			toFXCP(){
				window.parent.location.href = 'https://m.baoxianxia.com.cn/risk/index.html'
			},
			toPlan(){
				window.parent.location.href = 'https://h5.baoxianxia.com.cn/app/businessList.html?brokerId=4a68acc421cf419084a3017af9730379&token=b4cb258a-b569-445b-b297-34d9f1503c16'
			},
			FairyShop() { //买家精灵商店
				this.$router.push({
					path: '/FairyShop',
					query: {
						robot_id:this.$route.query.robot_id,
						broker_id:this.$route.query.broker_id,
						robot_visitId:this.$route.query.robot_visitId,
						Othername: this.homeInit.name,
						token:this.$route.query.token
					}
				})
			},
			HomeChat() { // 聊天记录
				this.$router.replace('/ACVisitor')
			},
			toHome() {
				this.$router.replace('/')
			},
			previousPage() {
				talkContent.scrollTop += -138
				this.isOwn = true
			},
			nextPage() {
				talkContent.scrollTop += 138
				this.isOwn = false
			},
			submit(numIndex) {
				this.numIndex += 1
				if (this.$refs.input.value == '') {
					Toast('请输入聊天内容');
				} else {
					this.getCusayrob()
				}
			},
			getCusayrob() {
				this.question = this.$refs.input.value
				let param
				if (this.flag) {
					param = {
						"dialog_type": "0",
						"customer_type": 0,
						"customer_id": 51,
						"broker_id": 33,
						"robot_id": 33,
						"speaker": "1",
						"content": '.',
						"token": "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqV0VhOTpHVjZOd2N0dVVzYmt5UnNkRHFNMkFsZkw2MUE.ZXlKd1lYbHNiMkZrSWpvMU1Td2lhV0YwSWpveE5UZzROelV3TlRBMUxqY3pOREk0TlgwOjFqV0VhOTpIa25FQi1Dc3lONTRDbk1ZcTd3NEtQUGhlQjA.934b2fd1932fa276b566133364ee9d89"
					}
					this.flag = false
				} else {
					param = {
						"dialog_type": "1",
						"customer_type": 0,
						"customer_id": 51,
						"broker_id": 33,
						"robot_id": 33,
						"speaker": "1",
						"content": this.question,
						"token": "ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqV0VhOTpHVjZOd2N0dVVzYmt5UnNkRHFNMkFsZkw2MUE.ZXlKd1lYbHNiMkZrSWpvMU1Td2lhV0YwSWpveE5UZzROelV3TlRBMUxqY3pOREk0TlgwOjFqV0VhOTpIa25FQi1Dc3lONTRDbk1ZcTd3NEtQUGhlQjA.934b2fd1932fa276b566133364ee9d89"
					}
				}
				let res = reqCusayrob(param)
				res.then(res => {
					this.answer = res.result.dialog_history.content
					this.list.push(this.question)
					this.list.push(this.answer)
					this.list2 = this.list.slice(-4)
					if (this.list2[0] == '') {}
					this.$refs.input.value = ''
				}).catch(reslove => {
					console.log('error')
				})
			},
			guanzhu() {
				if(this.guanzhuContent=="关注TA"){
					let param = {
						"robot_id": 33,
						"followed_robot_id":this.$route.query.robot_visitId,
						"operation_type":"0",
						"broker_id":33,
						"token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
                    }
					let result = guanZhu(param)
					result.then(res => {
						console.log("guanzhu:" + res)
						if(res.result.info=="关注成功"){
							this.guanzhuContent ="已关注";
							//更新关注任务状态，领取经验和金币
							this.guanzhuUpdateTask();
							
						}
					}).catch(reslove => {
						console.log('error')
					})
				}else if(this.guanzhuContent=="已关注"){
					 this.$router.push({
					   path:'/CancelFollow',
					   query:{
					     "robot_id": 33,
					     "followed_robot_id": this.$route.query.robot_visitId,
						 "broker_id":33,
						 "follow_name":this.homeInit.name,
						 "follow_img":this.homeInit.headimgurl,
						 "token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2NpT2lKa1pXWmhkV3gwSW4wOjFqVzlDcDpsal9zdVlrR0V6T3lMY1dSTnFkcXdWc2Z3V00.ZXlKUVNFOU9SU0k2SWpFM05qRXdNREkzT0Rjeklpd2lTVVFpT2pNekxDSnBZWFFpT2pFMU9EZzNNams0TXprdU1UWTVPRFF4TTMwOjFqVzlDcDptdDVjeWExajBWSG9XMzlOMVN2WGhVQ1otQzQ.0ee1173f3a6a0489b64ec92e22c60cd1"
					   }
					 })
				}	
			},		
			//关注好友
			guanzhuUpdateTask(){
				let param = {
					"broker_id":this.$route.query.broker_id,
					"robot_id":this.$route.query.robot_id,
					"operation_type":6,
					"followed_robot_id":this.$route.query.robot_visitId,
					"token":"ZXlKMGVYQWlPaUpLVjFBaUxDSmhiR2Np"
				}
				console.log("任务的param:"+param);
				
				let result = reqtaskStatus(param);
				result
				  .then(res => {
				   // //更新金币
				   // this.homeInit.bcoin = res.result.bcoin;
				   // //更新等级
				   // this.homeInit.level = res.result.level
				   // //更新“我的”经验
				   // this.homeInit.exp = res.result.exp
				   // //更新总经验
				   // this.homeInit.level_exp = res.result.level_exp
				   // //任务状态为“1”表示任务已经完成，可以领取奖励，任务图标右上角有个“新”字
				   // this.showNewIcon = res.result.task_notification;
				  })
				  .catch(reslove => {
				    console.log("error");
				  });
			},
			getHomeInit() {
				var that = this
				if(that.registers.visitor_type == '0'){
					that.customer_type = 0
					that.customer_robot_id = that.visitList.robot_id
				}else if(that.registers.visitor_type == '1'){
					that.customer_type = 1
					that.customer_robot_id = that.visitList.robot_id
				}else if(that.registers.visitor_type == '-1'){
					that.customer_type = 0
					that.customer_robot_id = ''
				}
				let param = {
					"customer_id": that.visitList.visitor_id,
					"customer_robot_id": that.customer_robot_id,
					"customer_type": that.customer_type,

					"visited_robot_id": that.$route.query.broker_id,
					"token": that.visitList.token
				}
				alert(JSON.stringify(param))
				let result = reqVisitedInit(param)
				result.then(res => {
					alert(JSON.stringify(res.result))
					alert('初始化')
					this.homeInit = res.result
					if(this.homeInit.followed){
						this.guanzhuContent ="已关注";
					}else{
						this.guanzhuContent ="关注TA";
					}
					if (this.homeInit.title == 1) { //保险等级
						this.homeLevel = this.levelbx1
						} else if (this.homeInit.title == 2) {
							this.homeLevel = this.levelbx2
						} else if (this.homeInit.level == 3) {
							this.homeLevel = this.levelbx3
						} else if (this.homeInit.level == 4) {
							this.homeLevel = this.levelbx4
						} else if (this.homeInit.level == 5) {
							this.homeLevel = this.levelbx5
						} else if (this.homeInit.level == 6) {
							this.homeLevel = this.levelbx6
						} else if (this.homeInit.level == 7) {
							this.homeLevel = this.levelbx7
						}
				}).catch(reslove => {
					console.log('error')
				})
			},
			//串门成功调更新任务接口
			chuanmen(){
				let param = {
					"broker_id": this.$route.query.broker_id,
					"robot_id": this.$route.query.robot_id,
					"operation_type":4,
					"visited_robot_id":this.$route.query.robot_visitId,
					"token":this.$route.query.token
				}
				console.log("任务的param:"+param);
				let result = reqtaskStatus(param);
				result
				  .then(res => {
				   // //更新金币
				   // this.homeInit.bcoin = res.result.bcoin;
				   // //更新等级
				   // this.homeInit.level = res.result.level
				   // //更新“我的”经验
				   // this.homeInit.exp = res.result.exp
				   // //更新总经验
				   // this.homeInit.level_exp = res.result.level_exp
				   // //任务状态为“1”表示任务已经完成，可以领取奖励，任务图标右上角有个“新”字
				   // this.showNewIcon = res.result.task_notification;
				  })
				  .catch(reslove => {
				    console.log("error");
				  });
			},
		// 	impower(){
		// 	let param = {"code":this.code}
		//     let res = reqbebotCode(param)
		//     res.then(res=>{
		// 		console.log(res)
		// 		this.mes = res.result
		// 	}).catch(reslove=>{
		// 	  console.log('error')
		// 	})
		// 	},
			impower(code){
				let param = {"code":code}
			    let res = reqbebotCode (param)
			    res.then(res=>{
				console.log('授权回来的'+res)
				this.messages = res.result
				let param = {
	            "openid": this.messages.openid,
		//           "NICKNAME": this.messages.nickname,
		//           "HEADIMGURL":  this.messages.headimgurl,
		//           "SEX":  this.messages.sex,
		//           "PROVINCE":  this.messages.province,
		//           "CITY": this.messages.city,
		//           "COUNTRY": this.messages.country,
		//           "PRIVILEGE":  this.messages.privilege,
				}
				let result = reqisregistered(param)
				result.then(res => {
					alert(JSON.stringify(res.result))
					this.registers = res.result
					if(this.registers.visitor_type == '0'){
						this.isRegister = false
					}else if(this.registers.visitor_type == '1'){
						this.isRegister = true
					}else if(this.registers.visitor_type == '-1'){
						// this.isRegister = true  
						let param = {
							"openid": this.messages.openid,
							"nickname": this.messages.nickname,
							"sex": this.messages.sex,
							"province": this.messages.province,
							"city": this.messages.city,
							"country":this.messages.country,
							"headimgurl":this.messages.headimgurl,
							"privilege":this.messages.privilege
						}
						let result = reqcustomerlogin(param)
						result.then(res => {
							alert(JSON.stringify(res.result))
							this.visitList = res.result
						}).catch(reslove => {
							console.log('error')
						})
					}
				}).catch(reslove => {
					console.log('error')
				})
				}).catch(reslove=>{
				  console.log('error')
				})
			},
			getCode(){ // 非静默授权，第一次有弹框
				this.code = ''
				// var local = window.location.href // 获取页面url
				alert(this.$route.query.broker_id)
				var local = 'https://test-bebot-web.baoxianxia.com.cn/#/'+`HomeOther?broker_id=${this.$route.query.broker_id}&robot_id=${this.$route.query.robot_id}` // 获取页面url
				var appid = 'wx026553ce8b4e59a3'
				this.code = this.getUrlCode().code // 截取code
				if (this.code == null || this.code === '') { // 如果没有code，则去请求
					window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
				} else {
					// 你自己的业务逻辑
				}
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
		mounted() {

			// let param = {
			// 	"openid": this.openid
			// }
			// let result = reqisregistered(param)
			// result.then(res => {
			// 	console.log('创前：'+ res)
			// 	this.registers = res.result
				// if(this.registers.visitor_type == '0'){
				// 	this.isRegister = false
				// 	this.$router.push('/login')
				// 	this.$route.query.broker_id = this.registers.visitor_id
				// 	this.$route.query.robot_id = this.registers.robot_id
				// 	this.$route.query.token = this.registers.token
				// }else if(this.registers.visitor_type == '1'){
				// 	this.isRegister = true
				// }
			// }).catch(reslove => {
			// 	console.log('error')
			// })
			

		},
		created(){
			if(!window.localStorage.getItem('openId')){ // 如果缓存localStorage中没有微信openId，则需用code去后台获取
				this.getCode()
			} else {
				// 别的业务逻辑
			}
			
			this.impower(this.code)
			alert('授权完成')
			this.getHomeInit()
			this.getCusayrob()
			//串门成功后，增加金币和经验
			this.chuanmen();
		}

	}
</script>
<style lang="scss" scoped>
	@import url("//unpkg.com/element-ui@2.13.1/lib/theme-chalk/index.css");

	/deep/ .van-popup {
		overflow: visible;
	}

	.contain {
		height: 100vh;
		display: flex;
		background-color: #0B2733;
		background-image: url(../assets/images/ezgif.gif);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: 0 100%;
		justify-content: space-between;
		flex-direction: column;

		.information {
			height: 90px;
			margin: 18px 0 0 20px;
			display: flex;

			//  align-self: flex-start;
			.mes {
				background-image: url(../assets/images/txbg@2x.png);
				width: 198px;
			}

			.topHalfPart {
				display: flex;
				margin-bottom: 1px;

				.headPortrait {
					width: 45px;
					height: 45px;
					border-radius: 50%;
					margin: 10px 5px 0 7px;

					>img {
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
					//  background-image: url(../assets/images/jindu@2x.png);
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
						width: 99px;
						height: 16px;
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
						//right:-34px;
						font-size: 11px;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						color: rgba(122, 234, 234, 1);
						line-height: 12px;
					}
				}
			}

			.bottomHalfPart {
				  position: relative;
				
				.leftPart {
				 display: flex;
				   align-items: center;
				   justify-content: center;
					padding: 0 1px 0 1px;
					flex-direction: column;
					width: 20%;
					height: 20px;
					line-height: 18px;
					// background: rgba(252, 106, 82, 1);
					background-color: #FC6A52;
					border-radius: 12px;
					margin-left: 8px;
					
				}

				.guanzhu {
				
					color: white;
				}

				.imgs {
					display: inline-block;
					vertical-align: middle;
				}

				.res {
					display: inline-block;
				}

				.rightPart {
					// margin-left:auto;
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

			.fansAndFriend {
				display: flex;
				flex-direction: column;
				margin-right: 14px;
				flex: 1;
				text-align: right;
				align-items: flex-end;

				.friend {
					display: flex;
					justify-content: center;
					margin: 8px 0 10px 0;
				}

				.fan {
					display: flex;
					justify-content: center;
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
			color: #2DE2E6;

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
			border-top: 10px dashed #2DE2E6;
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

			.input-bottom {
				width: 86.7%;
				height: 42px;
				background: rgba(92, 191, 191, 0.25);
				border-radius: 8px;
				border: 1px solid rgba(45, 226, 230, 1);
				flex: 0 0 auto;
				z-index: 999;
				margin: 0 auto 15px;
				justify-content: space-between;

				input {
					width: 78.3%;
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
					width: 50px;
					height: 42px;
					line-height: 42px;
					color: #2DE2E6;
					position: fixed;
					right: 24px;
					bottom: 15px;
					text-align: center;
					font-size: 13px;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					border: 1px solid #2DE2E6;
					border-radius: 0 8px 8px 0;
				}

				input::-webkit-input-placeholder,
				textarea::-webkit-input-placeholder {
					color: rgba(122, 234, 234, 1);
				}
			}

			.moon {
				margin-bottom: -16px;
				width: 70px;
				height: 92px;
				flex-shrink: 0
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
			>.left {
				display: flex;
				margin-left: 20px;
				margin-top: 20px;

				>.leftLittleLogon {
					margin-top: 12px;

					>img {
						width: 23px;
						height: 27px;
					}
				}

				>.leftBigLogon {
					// margin-left: 10px;
					width: 50px;
					height: 50px;

					>img {
						width: 50px;
						height: 50px;
					}
				}

				>.content {
					>.topTitle {
						margin-top: -3px;

						// display: flex;
						>span {
							margin-left: 8px;
							display: block;
							font-size: 15px;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: rgba(51, 51, 51, 1);
							line-height: 21px;
						}

						>.lelve {
							white-space: nowrap;
							margin-left: 10px;
						}

						>.dengji {
							margin: 3px 0 3px 10px;
							width: 187px;
							height: 18px;
							display: flex;

							.dengji2 {
								margin-left: 8px;
							}

							>img {
								width: 80px;
								height: 18px;
							}
						}
					}

					>.bottom {
						margin-top: 3px;
						margin-left: 10px;
						display: flex;

						>div img {
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

					>img {
						width: 55px;
						height: 55px;
						margin: 25px auto 0;

					}

					>div {
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

					>img {
						width: 55px;
						height: 55px;
						margin: 25px auto 0;
					}

					>div {
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

					>img {
						width: 55px;
						height: 55px;
						margin: 25px auto 0;
					}

					>div {
						font-size: 15px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						line-height: 21px;
					}
				}

			}

			>.rightLogin {
				width: 80px;
				height: 32px;
				background: rgba(0, 147, 253, 1);
				border-radius: 16px;
				margin: 29px 20px 0 0;
				display: flex;
				justify-content: center;
				align-items: center;

				>img {
					width: 16px;
					height: 16px;
				}

				>div {
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

				>div {
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

				>div {
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
	}
</style>
