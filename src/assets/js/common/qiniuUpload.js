define(["control", "httpid", 'jquery', 'utils','jqueryweui'], function(control, httpid, jquery, utils,jqueryweui) {
	//	var domain = "http://files.xinjianbao.cn/";
	var domain = "http://pb0eu2gxc.bkt.clouddn.com/";

	/*
	<form id="qiniuForm3" method="post" enctype="multipart/form-data">
		<input name="key" id="key3" type="hidden" value="">
		<input class="imgup" name="token" type="hidden" value="">
		<input id="userfile3" class="userfile" data-index="3" name="file" type="file">
	</form>
	qiniuUpload.upload(function() {
		//上传成功
	}, function() {
		//上传失败
	});
	 */
	var qiniuUpload = {
		upload: function(success, error) {
			//			$.post(httpid + "qiniu/token", function(data, status) { //获取图片处理key
			//				$(".imgup").val(data.upToken);
			//			});
			control.requestFunc('post', httpid + 'qiniu/token', {}, function(res) {
				$(".imgup").val(res.upToken);
			})

			$("body").delegate(".userfile", "change", function() {
				var that = this;
				var selectedFile = $(this).val();
				console.log(selectedFile)
				if(selectedFile) {
					var ramdomName = Math.random().toString(36).substr(2) + $(this).val().match(/\.?[^.\/]+$/);
					$('#key' + $(this).data('index')).val(ramdomName);
				} else {
					return false;
				}
				var f = new FormData(document.getElementById("qiniuForm" + $(this).data('index')));
				var qiniuUploadUrl;
				if(window.location.protocol === 'https:') {
					qiniuUploadUrl = 'https://up-z1.qbox.me';
				} else {
//					qiniu.region.z0: 代表华东区域
//					qiniu.region.z1: 代表华北区域
//					qiniu.region.z2: 代表华南区域
//					qiniu.region.na0: 代表北美区域
//					qiniu.region.as0: 代表东南亚区域
					qiniuUploadUrl = 'http://upload-z0.qiniu.com';
				}
				$.showLoading();
				$.ajax({
					url: qiniuUploadUrl,
					type: 'POST',
					data: f,
					processData: false,
					contentType: false,
					xhr: function() {
						myXhr = $.ajaxSettings.xhr();
						if(myXhr.upload) {
							myXhr.upload.addEventListener('progress', function(e) {
								if(e.lengthComputable) {
									var percent = e.loaded / e.total * 100;
									//@TODO:增加上传进度代码，暂时不加
									//									$progress.html('上传：' + e.loaded + "/" + e.total + " bytes. " + percent.toFixed(2) + "%");
								}
							}, false);
						}
						return myXhr;
					},
					success: function(res) {
						$.hideLoading();
						res.domain = domain;
						res.fileName = domain + res.key;
						success(res, that);
//						alert("上传成功");
//						$.toast('上传成功','text');
					},
					error: function(res) {
						$.hideLoading();
						error(res);
					}
				});
				return false;
			});
			
			
//			uploadRequest:function(qiniuUploadUrl,f){
//				$.ajax({
//					url: qiniuUploadUrl,
//					type: 'POST',
//					data: f,
//					processData: false,
//					contentType: false,
//					xhr: function() {
//						myXhr = $.ajaxSettings.xhr();
//						if(myXhr.upload) {
//							myXhr.upload.addEventListener('progress', function(e) {
//								if(e.lengthComputable) {
//									var percent = e.loaded / e.total * 100;
//									//@TODO:增加上传进度代码，暂时不加
//									//									$progress.html('上传：' + e.loaded + "/" + e.total + " bytes. " + percent.toFixed(2) + "%");
//								}
//							}, false);
//						}
//						return myXhr;
//					},
//					success: function(res) {
//						res.domain = domain;
//						res.fileName = domain + res.key;
//						success(res, that);
////						alert("上传成功");
//						$.toast('上传成功','text');
//					},
//					error: function(res) {
//						error(res);
//					}
//				});
//			}
			
			
			
			
			
			
		},
	};
	return qiniuUpload;
});