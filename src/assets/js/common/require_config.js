var configObj = {
	"baseUrl": "js/",
	"paths": {
		"jquery": "common/jquery",
		"jqueryMobile": "common/jquery.mobile-1.4.5.min",
		"jqueryweui": "common/jquery-weui",
        "weuiJS": "common/weui.min",
		"jweixin": "https://res.wx.qq.com/open/js/jweixin-1.3.2",
		"utils": "common/utils",
		"control": "common/control",
		"httpid": "common/httpid",
		"fastclick": "common/fastclick",
		"iscroll": "common/iscroll",
		"mui": "common/mui.min",
		"pullToRefresh": "common/mui.pullToRefresh",
		"material": "common/mui.pullToRefresh.material",
		"muiPicker": "common/mui.picker.min",
		"sort": "common/sort",
		"qiniuUpload": "common/qiniuUpload",
		"device": "common/device",
		"mobiledetect": "common/mobile-detect.min",
		"useragent": "common/useragent-base",
		"ua": "common/ua-device",
		"index": "common/index",
		"swiper": "common/swiper.min",
		"formReg": "editArticle/formReg",
		"flexible": "editArticle/flexible",
		"flexible_css": "editArticle/flexible_css",
		"common": "editArticle/common",
		"alerttoast": "editArticle/alerttoast",
		"weixinaudio": "editArticle/weixinaudio",
		"chartJS": "common/chart",
        "echarts": "common/echarts",
        "VConsole": "common/vConsole"
	},
	"shim": {
		"jqueryweui": {
			"deps": ["jquery"],
			"exports": "jqueryweui"
		},
		"pullToRefresh": ["mui"],
		"material": ["mui"],
		"muiPicker": ["mui"],
		"httpid": {
			"deps": [],
			"exports": "httpid"
		},
		"sort": {
			"deps": [],
			"exports": "sort"
		},
		"common": {
			"deps": ["jquery"],
			"exports": "common"
		},
		"jqueryMobile": {
			"deps": ["jquery"],
			"exports": "jqueryMobile"
		},
		"device": {
			"deps": ["jquery"],
			"exports": "device"
		},
		"mobiledetect": {
			"deps": ["jquery"],
			"exports": "mobiledetect"
		},
		"useragent": {
			"deps": ["jquery"],
			"exports": "useragent"
		},
		"ua": {
			"deps": ["jquery", "useragent"],
			"exports": "ua"
		},
		"index": {
			"deps": ["jquery", "ua", "useragent", "mobiledetect", "device"],
			"exports": "index"
		},
		"swiper": {
			"deps": ["jquery"],
			"exports": "swiper"
		},
		"chartJS": {
            "deps": ["jquery"],
            "exports": "chartJS"
		},
		"weixinaudio": {
            "deps": ["jquery"],
            "exports": "weixinaudio"
		},
		"iscroll": {
		    "deps": ["jquery"],
		    "exports": "iscroll"
		}
	},
	urlArgs: "v=2.0.8"
};

require.config(configObj);
require(["jqueryweui", "jqueryMobile"]);