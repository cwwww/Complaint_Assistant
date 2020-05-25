define(["httpid", "jquery", "utils", "jweixin", "jqueryweui"], function(httpid, jquery, utils, jweixin, jqueryweui) {
	var control = {
		goBack: function() { //回跳一页，并刷新页面
			history.go(-1);
		},
		wxSDK: function(title, desc, link, imageUrl){
            control.requestFunc('post', 'callback/wxconfig/yxbxx', {u: window.location.href}, function(res) {
                jweixin.config({
                    appId: res.appId,
                    // appId: 'wxce3c7bc68ac7298f',
                    timestamp: res.timestamp,
                    nonceStr: res.noncestr,
                    // signature: res.yxyy_sign,
                    signature: res.yxbxx_sign,
                    jsApiList: [
                        "onMenuShareTimeline", //分享给好友
                        "onMenuShareAppMessage", //分享到朋友圈
                        "closeWindow"
                    ]
                });
                link = (undefined == link || null == link ? url : link);
                jweixin.ready(function() {
                    var shareData = {
                        title: (undefined == title || null == title ? "壹心保险侠" : title),
                        desc: (undefined == desc || null == desc ? "为保险代理人提供更专业的数据化展业平台" : desc),
                        link: link,
                        imgUrl: (undefined == imageUrl || null == imageUrl ? "http://pb0eu2gxc.bkt.clouddn.com/test/share_logo.png" : imageUrl)
                    };
                    jweixin.onMenuShareAppMessage(shareData);
                    jweixin.onMenuShareTimeline(shareData);
                });
            })
		},
		wxshare: function(title, desc, link, imageUrl) {
			//微信朋友圈好友分享
			var url = window.location.href;
			var urlto = "api/callback/wxconfig/bebot/";
			var that = this;
			var parasData = {
				"url": url
			}
			control.rebootFunc('post', urlto, parasData, function(res) {
				var res = res.result;
				jweixin.config({
					appId: res.appId,
					// appId: 'wxce3c7bc68ac7298f',
					timestamp: res.timestamp,
					nonceStr: res.nonceStr,
                    signature: res.signature,
					jsApiList: [
						"onMenuShareTimeline", //分享给好友 
						"onMenuShareAppMessage", //分享到朋友圈 
						"getLocation",
						"openLocation",
						"getNetworkType"
					]
				});
				link = (undefined == link || null == link ? url : link);
				jweixin.ready(function() {
					var shareData = {
						title: (undefined == title || null == title ? "BeBot精灵" : title),
						desc: (undefined == desc || null == desc ? "为保险代理人提供更专业的数据化展业平台" : desc),
						link: link,
						imgUrl: (undefined == imageUrl || null == imageUrl ? "https://img.baoxianxia.com.cn/share/spotShare.png" : imageUrl)
					};
					jweixin.onMenuShareAppMessage(shareData);
					jweixin.onMenuShareTimeline(shareData);
					jweixin.getLocation({
						success: function(res) {
							localStorage.lat = res.latitude;
							localStorage.lon = res.longitude;
						}
					});
                    jweixin.getNetworkType({
                        success: function (res) {
                            localStorage.networkType = res.networkType;
							
                        }
                    });
				});
			})
		},
		requestFunc: function(type, httpUrl, parData, callback) {
			var isHaveToken = utils.getCookie('token');
			// var platCode = utils.GetQueryString('platCode');
			// if(platCode == 'iOS' || platCode == 'Android') {
			// 	platCode = platCode;
			// } else {
			// 	platCode = 'H5';
			// }
			var parameter = {
				"version": "1.6.9",
				"platCode": 'H5',
				"body": JSON.stringify(parData)
			}
			if(isHaveToken != null) {
				parameter.token = isHaveToken;
			}
			$.ajax({
				type: type,
				url: bxxHttp + httpUrl,
				dataType: "json",
				async: true,
				data: parameter,
				success: function(res) {
					if(res.code == 401) {
		
					} else if(res.code == 200) {
						callback(res);
					} else {
						callback(res);
						if(httpUrl.indexOf('callback/wxconfig') < 0) {
							// $.toast(res.msg, "text");
						}
					}
				}
			})
		},
		rebootFunc: function(type, httpUrl, parData, callback) {
			$.ajax({
				type: type,
				url: httpid + httpUrl,
				dataType: "json",
				async: true,
				data: parData,
				error : function(res){
					// console.log(res)
				},
				success: function(res){
					if(res.status == 400){
						if(res.msg == '无效的token' || res.msg == 'token错误'){
							$.toast('请重新登录', "text");
							location.replace('login.html?isShare=true');
						}else if(res.msg == '您不在白名单'){
							$('.m_xhints').addClass('show');
						}else{
							callback(res);
						};
					}else if(res.status == 200) {
						callback(res);
					}else{
						callback(res);
						if(httpUrl.indexOf('callback/wxconfig') < 0) {
							// $.toast(res.msg, "text");
						}
					}
				}
			})
		},
		network: function(httpUrl, parData, callback) {
			var parameter = {
				"body": JSON.stringify(parData)
			}
			$.ajax({
				type: 'post',
				url: httpid + httpUrl,
				dataType: "json",
				async: true,
				data: parameter,
				success: function(res) {
					if(res.code == 200) {
						callback(res);
					} else {
						callback(res);
						if(httpUrl.indexOf('callback/wxconfig') < 0) {
							// $.toast(res.msg, "text");
						}
					}
				}
			})
		},
		abnormal: function() { // 网络异常
			var abnrHtml = '<div class="m_xabnormal">' +
				'<img src="images/nodata_5.png" class="zan" />' +
				'<p>网络异常，请点击重新加载</p>' +
				'</div>';
			$('body').append(abnrHtml);
		},
		wabao: function (brokerId, pageLevel, fromId , callback) {
			//fromId(show:是否显示红包,open:开启红包)
			if(fromId == 'show') {
		        control.requestFunc('post', 'oper/redbag/show', {brokerId:brokerId,pageLevel:pageLevel}, function (res) {
		            if(res.code == 200){
		                callback(res)
		            } else {
		                $.toast(res.msg, 'text');
		            }
		        })
			}else if(fromId == 'open') {
		        control.requestFunc('post', 'oper/redbag/open', {brokerId:brokerId,pageLevel:pageLevel}, function (res) {
		            if(res.code == 200){
		                callback(res)
		            } else {
		                $.toast(res.msg, 'text');
		            }
		        })
			}
		}
	}
	return control;

})