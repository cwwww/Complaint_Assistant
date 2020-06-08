// 邀请页面
<template>
	<div class="warp">
		<img :src="img" alt />
		<div class="topNav">
			<dl>
				<dt>
					<span>{{yaoqList.recommendedlist.length}} </span>
					<p>人</p>
				</dt>
				<dd>已成功邀请</dd>
			</dl>
			<dl>
				<dt>
					<span>{{yaoqList.member_days}}</span>
					<p>天</p>
				</dt>
				<dd>已得会员天数</dd>
			</dl>
			<dl>
				<dt>
					<span>{{yaoqList.lexicons}}</span>
					<p>万</p>
				</dt>
				<dd>已得词库</dd>
			</dl>
		</div>
		<div class="topNavTwo">
			<p v-if="yaoqList.recommendedlist.length <10">每邀请1人即可获得10天会员</p>
			<span v-if="yaoqList.recommendedlist.length <10">
				还差
				<span class="color">{{yaoqList.lack_num}}</span> 人，即可再获得
				<span class="color">{{yaoqList.expect_lexicon}}万词库</span>
			</span>
			<div class="boxColor">
				<div class="jdColor" :style="{paddingLeft:paddingLeft}"></div>
			</div>
			<div class="checkOut">
				<ul>
					<li>
						<div class="checkOutFont" v-show="img1Show">
							<p>1人</p>
						</div>
						<img :src="img1" alt />
					</li>
					<li>
						<div class="checkOutFont" v-show="img3Show">
							<p>3人</p>
						</div>
						<img :src="img3" alt />
					</li>
					<li>
						<div class="checkOutFont" v-show="img5Show">
						<p>5人</p>
						</div>
						<img :src="img5" alt />
					</li>
					<li>
						<div class="checkOutFont" v-show="img6Show">
							<p>6人</p>
						</div>
						<img :src="img6" alt />
					</li>
					<li>
						<div class="checkOutFont" v-show="img10Show">
							<p>10人</p>
						</div>
						<img :src="img10" alt />
					</li>
				</ul>
			</div>
			<div class="jumpFriend" @click="shareFriend">去邀请好友</div>
			<div class="footer">活动截止日期 2021/5/20</div>
		</div>
		<div class="threeCentent"  v-if="yaoqList.recommendedlist.length>0">
			<span>成功邀请</span>
			<div class="content" v-for="(recommender,index) in reverseData "  :key="recommender.id">
				<div class="left">
					<p>{{index+1}}</p>
					<div class="loginImg">
						<img :src="recommender.broker_head" alt v-if="recommender.broker_head !=null" />
						<img :src="defaultImg" alt v-else />
					</div>
					<span v-if="recommender.broker_name !=null">{{recommender.broker_name}}</span>
					<span v-else>Bebot用户_{{recommender.broker_id}}</span>

				</div>
				<div class="right">
					<div class="rightFontColor" v-if="recommender.lexicon >0">
						<p>{{recommender.lexicon}}万词库</p>
					</div>
					<div class="rightFontColor" v-if="recommender.member_day >0">
						<p>{{recommender.member_day}}天会员</p>
					</div>
				</div>
				<!-- <div >
		  </div> -->

				<!-- <div class="content">
		          <div class="left">
		            <p>1</p>
		            <div class="loginImg">
		              <img :src="img" alt />
		            </div>
		            <span>Emilee</span>
		          </div>
		          <div class="right">
		            <p>+10万词库</p>
		            <p>+10天会员</p>
		          </div>
		        </div> -->
			</div>
		</div>
		<div class="emptyList" v-else>
      		<img :src="emptyList" alt />
      		<div class="emptyListFont">你还没有邀请好友哦</div>
    	</div>
		<div class="lastCentent">
			<span>活动规则</span>
			<ul>
				<li>1. 每邀请1位好友注册可领取10天会员使用权，可累加</li>
				<li>2. 邀请3位好友注册，同时可获得10万词库</li>
				<li>3. 邀请5位好友注册，同时可获得20万词库</li>
				<li>4. 邀请6位好友注册，同时可获得50万词库</li>
				<li>5. 邀请10位好友注册，同时可获得100万词库</li>
			</ul>
			<p>活动最终解释权归壹心科技有限公司所有</p>
		</div>
		<div class="m_xpopups" v-show="isInviter">
			<img src="../assets/images/share_1.png" class="lead" />
			<span><img src="../assets/images/share_2.png" v-on:click="close" /></span>
		</div>
	</div>
	
</template>
<script>
	import { yaoQing } from "../axios/axios-api";
	import wx from 'weixin-js-sdk';
	export default {
		name: "Invite",
		data() {
			return {
				yaoqList: {
					lexicon: "",
					member_days: "",
					recommendedlist: [],
				},
				paddingLeft: "",
				img: require("../assets/images/bg.png"),
				defaultImg: require("../assets/images/默认头像@2x.png"),
				img1: "",
				img3: "",
				img5: "",
				img6: "",
				img10: "",
				img1Show: true,
				img3Show: true,
				img5Show: true,
				img6Show: true,
				img10Show: true,
				isInviter: false,
				emptyList: require("@/assets/images/emptyList@2x.png")
			};
		},
		methods: {
			wxconfig() {
			  let param = { url: window.location.href.split("#")[0] };
			  let res = reqwxconfig(param);
			  res
			    .then(res => {
			      console.log(res);
			      this.shareMessages = res.result;
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
			          title: "你好，我是BeBot小精灵，我能为您解答专业保险问题，也能陪您聊天哦！", // 分享标题
			          desc: "我拥有2万+保险条款，覆盖上千类病种分析，24h在线，有事没事都来找我聊聊吧！", // 分享描述
			          link:
			            "https://test-bebot-web.baoxianxia.com.cn/#/" +
			            `inviteShare?broker_id=${that.$route.query.broker_id}&robot_id=${that.$route.query.robot_id}&token=${that.$route.query.token}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			          imgUrl: "https://img.baoxianxia.com.cn/share/spotShare.png", // 分享图标
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
			          title: "你好，我是BeBot小精灵，我能为您解答专业保险问题，也能陪您聊天哦！", // 分享标题
			          desc: "我拥有2万+保险条款，覆盖上千类病种分析，24h在线，有事没事都来找我聊聊吧！", // 分享描述
			          link:
			            "https://test-bebot-web.baoxianxia.com.cn/#/" +
			            `inviteShare?broker_id=${that.$route.query.broker_id}&robot_id=${that.$route.query.robot_id}&token=${that.$route.query.token}`, 
			          imgUrl: "https://img.baoxianxia.com.cn/share/spotShare.png", // 分享图标
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
			shareFriend: function() {
				var that = this;
				that.isInviter = true;
				// wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
				//   wx.updateAppMessageShareData({ 
				//     title: '分享', // 分享标题
				//     desc: '分享内容', // 分享描述
				//     link: 'http://api-bebot.baoxianxia.com.cn/api/callback/wxconfig/bebot/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				//     imgUrl: '', // 分享图标
				//     success: function () {
				//       // 设置成功
				//     }
				//   })
				// }); 
			},
			close : function(){
				this.isInviter = false;
			},
			putStorge(){
			const info = { name: 'hou', age: 24, id: '001' };
			const str="haha";
			localStorage.setItem('hou', JSON.stringify(info));
			localStorage.setItem('zheng', str);
			},
			getStorge(){
			var data1 = JSON.parse(localStorage.getItem('hou'));
			var data2 = localStorage.getItem('zheng');
			// alert(data2);
			}
		},
		// created() {
		// 	this.putStorge();
      	// 	this.getStorge();
		// },
		computed: {

                reverseData() {

					return this.yaoqList.recommendedlist.reverse();
				}
		 },
		mounted() {
			let param = {
				broker_id: this.$route.query.broker_id
			};
			console.log(param);
			let result = yaoQing(param);
			result
				.then(res => {
					this.yaoqList = res.result;
					let recommenders = this.yaoqList.recommendedlist.length;
					// if (recommenders == 1) {
					// 	this.img1 = require("../assets/images/one@2x.png");
					// 	this.paddingLeft = 285 * 0.1 +"px";
					// 	this.img1Show = false;
					// } else if (recommenders == 3) {
					// 	this.paddingLeft = 285 * 0.3 +"px";
					// 	this.img3 = require("../assets/images/three@2x.png");
					// 	this.img3Show = false;
					// } else if (recommenders == 5) {
					// 	this.paddingLeft = 285 * 0.5 +"px";
					// 	this.img5 = require("../assets/images/five@2x.png");
					// 	this.img5Show = false;
					// } else if (recommenders == 6) {
					// 	this.paddingLeft = 285 * 0.8 +"px";
					// 	this.img6 = require("../assets/images/six@2x.png");
					// 	this.img6Show = false;
					// } else {
					// 	this.paddingLeft = 285 * 1 +"px";
					// 	this.img10 = require("../assets/images/ten@2x.png");
					// 	this.img10Show = false;
					// }
					if (recommenders >= 10) {
						this.paddingLeft = 285 * 1 +"px";
						this.img10 = require("../assets/images/ten@2x.png");
						this.img10Show = false;
					} else if (recommenders >= 6) {
						this.paddingLeft = 285 * 0.8 +"px";
						this.img6 = require("../assets/images/six@2x.png");
						this.img6Show = false;
					} else if (recommenders == 5) {
						this.paddingLeft = 285 * 0.5 +"px";
						this.img5 = require("../assets/images/five@2x.png");
						this.img5Show = false;
					} else if (recommenders >= 3) {
						this.paddingLeft = 285 * 0.3 +"px";
						this.img3 = require("../assets/images/three@2x.png");
						this.img3Show = false;
					} else if (recommenders >= 1){
						this.img1 = require("../assets/images/one@2x.png");
						this.paddingLeft = 285 * 0.1 +"px";
						this.img1Show = false;
					}
					else{
						//其他
					}
					console.log(this.yaoqList, "邀请好友");
					// alert(this.paddingLeft)
				})
				.catch(reslove => {
					console.log("error");
				});
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
		position: relative;

		>img {
			width: 100%;
			height: 310px;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -999;
		}

		>.topNav {
			width: 325px;
			height: 108px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 10px 0px rgba(0, 83, 143, 0.15);
			border-radius: 10px;
			margin-top: 233px;
			display: flex;
			justify-content: space-evenly;
			align-items: center;

			>dl {
				>dt {
					display: flex;
					justify-content: center;

					>span {
						display: block;
						font-size: 30px;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						color: rgba(253, 41, 41, 1);
						line-height: 35px;
					}

					>p {
						font-size: 15px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(102, 102, 102, 1);
						line-height: 21px;
						margin-top: 11px;
					}
				}

				>dd {
					font-size: 13px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					line-height: 18px;
					margin-top: 6px;
				}
			}
		}

		>.topNavTwo {
			width: 325px;
			padding-bottom: 15px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 10px 0px rgba(0, 83, 143, 0.15);
			border-radius: 10px;
			margin-top: 15px;

			>p {
				margin-top: 15px;
				margin-left: 20px;
				font-size: 17px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 700;
				color: rgba(51, 51, 51, 1);
				line-height: 24px;
			}

			>span {
				display: block;
				margin-top: 5px;
				margin-left: 20px;
				font-size: 13px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 18px;

				>.color {
					color: #fd2929;
				}
			}

			>.boxColor {
				width: 285px;
				height: 6px;
				background: rgba(230, 230, 236, 1);
				border-radius: 5px;
				margin-left: 20px;
				margin-top: 20px;

				>.jdColor {
					width: 0px;
					height: 6px;
					background: linear-gradient(90deg,
						rgba(249, 188, 33, 1) 0%,
						rgba(255, 103, 26, 1) 100%);
					border-radius: 5px;
				}
			}

			>.checkOut {
				width: 285px;
				margin: auto;

				>ul {
					width: 285px;
					display: flex;
					justify-content: space-between;

					>li {
						margin-top: 7px;

						>p {
							font-size: 13px;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: rgba(153, 153, 153, 1);
							line-height: 18px;
							margin-top: 5px;
						}

						>img {
							width: 32px;
							height: 24px;
						}
					}
				}
			}

			>.jumpFriend {
				width: 285px;
				line-height: 48px;
				background: linear-gradient(270deg,
					rgba(0, 112, 255, 1) 0%,
					rgba(0, 147, 253, 1) 100%);
				box-shadow: 0px 2px 10px 0px rgba(1, 110, 188, 0.37);
				border-radius: 24px;
				margin: 21px auto 10px auto;
				font-size: 15px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				text-align: center;
			}

			>.footer {
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 17px;
				text-align: center;
			}
		}

		>.threeCentent {
			overflow-y: auto;
			width: 325px;
			height: 417px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 10px 0px rgba(0, 83, 143, 0.15);
			border-radius: 10px;
			margin-top: 15px;

			>span {
				display: block;
				font-size: 17px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 24px;
				margin-top: 15px;
				margin-left: 20px;
				margin-bottom: 15px;
			}

			>.content {
				width: 285px;
				height: 65px;
				border-bottom: rgba(239, 239, 239, 1) solid 1px;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;

				>.left {
					display: flex;
					align-items: center;

					>p {
						padding-left: 10px;
						font-size: 15px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						line-height: 21px;
					}

					>.loginImg {
						margin-left: 15px;

						>img {
							display: block;
							width: 35px;
							height: 35px;
							border-radius: 25px;
						}
					}

					>span {
						margin-left: 10px;
						display: block;
						font-size: 15px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(51, 51, 51, 1);
						line-height: 21px;
					}
				}

				>.right {
					padding-right: 10px;

					>p {
						font-size: 12px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(253, 41, 41, 1);
						line-height: 17px;
					}
				}

			}
		}

		.emptyList {
			overflow-y: auto;
			width: 325px;
			height: 317px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 10px 0px rgba(0, 83, 143, 0.15);
			border-radius: 10px;
			margin-top: 15px;
			margin: 10 auto;

			// width: 150px;
			// height: 300px;
			// border-radius: 37.5px;
			text-align: center;
			// margin: 0 auto;
			> img {
			//width: 150px;
			height: 150px;
			margin-top: 150px;
			margin-top: 100px;
			}
			.emptyListFont {
			font-size: 15px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 21px;
			}
		}
		.checkOutFont {
			font-size: 15px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 18px;
			margin-top: 5px;
		}

		.rightFontColor {
			font-size: 12px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(253, 41, 41, 1);
			line-height: 17px;
		}

		>.lastCentent {
			width: 325px;
			height: 245px;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2px 10px 0px rgba(0, 83, 143, 0.15);
			border-radius: 10px;
			margin-top: 15px;
			margin-bottom: 25px;

			>span {
				display: block;
				font-size: 17px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 24px;
				margin-top: 15px;
				margin-left: 20px;
			}

			>ul {
				width: 285px;
				margin: 0 auto;
				margin-top: 10px;

				>li {
					font-size: 13px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					line-height: 24px;
				}
			}

			>p {
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 17px;
				margin-top: 20px;
				text-align: center;
			}
		}
	}
	
	.m_xpopups{position:fixed;background:rgba(0,0,0,.85);top:0;bottom:0;left:0;right:0;}
	.m_xpopups .lead{display:block;width:100%;}
	.m_xpopups span{display:block;width:100%;text-align:center;margin:15px 0;}
	.m_xpopups span img{display:inline-block;cursor:pointer;width:43%;}
</style>
