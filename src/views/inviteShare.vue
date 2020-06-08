<style lang="scss" scoped>
	.m_xbrain{background:url(../assets/images/aptBg.png) no-repeat 0 0;background-size:100% 100%;position:fixed;left:0;top:0;width:100%;bottom:0;padding-top:20px;}
	.m_xbrain span{position:absolute;cursor:pointer;text-align:center;bottom:35px;left:0;width:100%;}
	.m_xbrain span img{display:inline-block;width:40%;}
	.m_xbrain .title{width:90%;margin:0 auto;background:rgba(212,237,252,.75);overflow:hidden;border-radius:5px;padding:12px 0;}
	.m_xbrain .title img{float:left;width:36px;height:36px;border-radius:50%;margin-left:18px;}
	.m_xbrain .right{margin-left:64px;}
	.m_xbrain .right p,
	.m_xbrain .right h3{font-size:11px;color:#000;}
	.m_xbrain .right h3{font-size:12px;font-weight:bold;}
</style>
<template>
	<div class="m_xbrain">
		<div class="title">
			<img :src="hadeurl" alt />
			<div class="right">
				<p>{{name}}</p>
				<h3>我的机器人事务所开张啦，快来看看吧！</h3>
			</div>
		</div>
		<span><img src="../assets/images/btn_1.png" v-on:click="draw"></span>
	</div>
</template>
<script>
	import { reqHomeInit } from "../axios/axios-api";
	import wx from 'weixin-js-sdk';
import InviteVue from './Invite.vue';
	export default {
		name: "inviteShare",
		data() {
			return {
				hadeurl : '',
				name : ''
			};
		},
		mounted() {
			let name, value, str = location.href,
			num = str.indexOf("?"); //取得整个地址栏
			str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]
			let arr = str.split("&"); //各个参数放到数组里
			var linkArr = [];
			for (let i = 0; i < arr.length; i++) {
				num = arr[i].indexOf("=");
				if (num > 0) {
					name = arr[i].substring(0, num);
					value = arr[i].substr(num + 1);
					this[name] = value;
				}
				linkArr.push(value)
			}
			this.broker_id = linkArr[0].split("=")[1]
			let param = {
				broker_id: this.broker_id,
				robot_id: linkArr[1],
				token: linkArr[2]
			};
			alert(JSON.stringify(param))
			let result = reqHomeInit(param);
			result
				.then(result => {
					var res = result.result;
					this.hadeurl = res.headimgurl;
					this.name = res.name;
				})
				.catch(reslove => {
					
				});
		},
		methods: {
			draw : function(){
				this.$router.push({
				  path: "/Login",
				  query:{
					share_broker_id:this.broker_id
				  }
				});
			}
		}
	};
</script>
