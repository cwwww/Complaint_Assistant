define([], function() {
    return {
        //获取地址栏参数
        GetQueryString: function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r != null) return decodeURIComponent(r[2]);
            return null;
        },
        //判断手机操作系统
        GetPhoneSystem: function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                return 'isAndroid';
            }
            if (isIOS) {
                return 'isIOS';
            }
        },
        //根据身份证获取出生日期
        getBirthdayFromCardCode: function(cardCode) {
            var err = "";
            if(cardCode == undefined || cardCode.length != 18) {
                err = "身份证号码错误";
                return {
                    "data": "",
                    "err": err
                };
            }
            var year = cardCode.substr(6, 4);
            var month = cardCode.substr(10, 2);
            var day = cardCode.substr(12, 2);
            return {
                "data": year + '-' + month + '-' + day,
                "err": ""
            };
        },
        //身份证或者年龄
        getAgeFromCardCode: function(cardCode) {
            var returnAge;
            var strBirthday = this.getBirthdayFromCardCode(cardCode);
            if(strBirthday.err.length > 1) {
                return {
                    "data": "",
                    "err": strBirthday.err
                };
            }
            strBirthday = strBirthday.data;
            return this.getAgeFunc(strBirthday);
        },
        getSexFromCardCode: function(cardCode) {
            var err = "";
            if(cardCode.length != 18) {
                err = "身份证号码错误";
                return {
                    "data": "",
                    "err": err
                };
            }
            return {
                "data": cardCode.substr(16, 1) % 2 == 1 ? 1 : 0,
                "err": ""
            };
        },
        verifyCardCode: function(userId) {
            var city = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外 "
            };
            if(!userId || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|x|X)$/i.test(userId)) {

                return {
                    "data": '',
                    "err": "身份证号格式错误"
                };
            } else if(!city[userId.substr(0, 2)]) {
                return {
                    "data": '',
                    "err": "身份证号格式错误"
                };
            } else {
                //18位身份证需要验证最后一位校验位
                if(userId.length == 18) {
                    userId = userId.split('');
                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                    //校验位
                    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;
                    for(var i = 0; i < 17; i++) {
                        ai = userId[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }
                    var last = parity[sum % 11];
                    if(parity[sum % 11] != userId[17].toUpperCase()) {
                        return {
                            "data": '',
                            "err": "身份证号格式错误"
                        };
                    }
                }
            }
            return true;
        },
        verifyEmail: function(email) {
            var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            if(re.test(email)) {
                return true;
            } else {
                return {
                    "data": '',
                    "err": "邮箱格式错误"
                };;
            }
        },
        getPlusDateStr: function(plusDay) {
            var nowDate = new Date();
            var startDate = new Date(nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate());
            var startTime = startDate.getTime() + plusDay * 24 * 60 * 60 * 1000;
            startDate.setTime(startTime);
            var month = startDate.getMonth() + 1;
            var day = startDate.getDate();
            var startDateStr = startDate.getFullYear() + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day);
            return startDateStr;
        },
        //根据出生年月日计算年龄,2020-01-01
        getAgeFunc: function(birthdayStr) {
            var birthdayArr = birthdayStr.split("-");
            var birthYear = birthdayArr[0];
            var birthMonth = birthdayArr[1];
            var birthDay = birthdayArr[2];
            d = new Date();
            var nowYear = d.getFullYear();
            var nowMonth = d.getMonth() + 1;
            var nowDay = d.getDate();
            if(nowYear == birthYear) {
                returnAge = 0; //同年 则为0岁
            } else {
                var ageDiff = nowYear - birthYear; //年之差
                if(ageDiff > 0) {
                    if(nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay; //日之差
                        if(dayDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    } else {
                        var monthDiff = nowMonth - birthMonth; //月之差
                        if(monthDiff < 0) {
                            returnAge = ageDiff - 1;
                        } else {
                            returnAge = ageDiff;
                        }
                    }
                } else {
                    return {
                        "data": -1,
                        "err": "出生日期输入错误 晚于今天"
                    }; //返回-1 表示出生日期输入错误 晚于今天
                }
            }
            return {
                "data": returnAge,
                "err": ""
            }; //返回周岁年龄
        },

        setCookie: function(name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
        },

        getCookie: function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if(arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },

        deleteCookie: function(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
            var cval = getCookie(name);
            if(cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
        },
        conversion:function conversion(value){
            sumPrem=Math.round(value);//去除零小数点
            var attr='';
            var one='';
            var afternum='';
            attr=sumPrem.toString();
            var length=attr.length;
//				console.log(attr.length);
            if(length>8){
                //以亿为单位
                one=sumPrem / 100000000;
                var ex = /^\d+$/;
                if (ex.test(one)) {
// 则为整数
                    afternum=one+'亿';
                }else{
                    afternum=(one).toFixed(2)+'亿';
                }
            }else if(length>4&&length<9){
                //以万为单位
                one=sumPrem / 10000;
//				afternum=one+'万';
                var ex = /^\d+$/;
                if (ex.test(one)) {
// 则为整数
                    afternum=one+'万';
                }else{
                    afternum=(one).toFixed(2)+'万';
                }

            }else{
                afternum=sumPrem;
            }
            return afternum;
        },

        shareInfo: function (shareData) {
        	var equipment = this.GetPhoneSystem()
            try {
                if(equipment == 'isAndroid'){
                    mobile_obj.initShare(JSON.stringify(shareData))
                }else if(equipment == 'isIOS'){
                    window.webkit.messageHandlers.initShare.postMessage({
                        "body": shareData
                    })
                }
            }catch (e) {
                console.log(e)
            }
        },

        getCurrentDate: function () {
            var year = new Date().getFullYear(),
                month = new Date().getMonth() + 1,
                day = new Date().getDate(),
                currentTime;
            month = month < 10 ? ('0' + month) : month;
            day = day < 10 ? ('0' + day) : day;
            currentTime = year + '-' + month + '-' + day;
            return currentTime
        },

        getMobile: function(){
            var os = this.GetPhoneSystem(),
                u = navigator.userAgent,
                model = '';
            if(os == 'isAndroid'){
                var uArr = u.split(";"),
                    i = this.arrContains(uArr,'Build/');
                if(i > -1){
                    model = uArr[i].substring(0, uArr[i].indexOf("Build/"));
                    model = model.replace(/^\s*|\s*$/g,"");
                }else{
                    model = '安卓机型'
                }
            }else if(os == 'isIOS'){
                model = this.getiPhoneModel();
            }
            return model;
        },

        //检测数组中是否包含某字符串
        arrContains: function(arr,needle){
            for(var i in arr){
                if(arr[i].indexOf(needle)>0)return i;
            }
            return -1;
        },


        getiPhoneModel: function () {
            var canvas = document.createElement('canvas'),
                gl = canvas.getContext('webgl'),
                debugInfo = gl.getExtension('WEBGL_debug_renderer_info'),
                GPU_model = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                screenWidth = window.screen.width,
                screenHeight = window.screen.height,
                heightRatio = screenHeight * window.devicePixelRatio,
                phoneModel = 'iPhone';
            //Apple A7 GPU:iPhone 5s           320 x 568
            //Apple A8 GPU:iPhone 6 / 6 Plus       375 x 667、414 x 736
            //Apple A9 GPU:iPhone 6s / 6s Plus / SE     375 x 667、414 x 736、320 x 568
            //Apple A10 GPU:iPhone 7 / 7 Plus     375 x 667、414 x 736
            //Apple A11 GPU:iPhone 8 / 8 Plus/X      375 x 667、	414 x 736、375 x 812
            //Apple A12 GPU:iPhone XR/Xs/Xs Max     414 x 896 、  375 x 812、 414 x 896
            //Apple A13 GPU:iPhone 11/11 Pro/11 Pro Max    414x896、   375x812、   414x896
            if(GPU_model == 'Apple A7 GPU' && screenWidth == 320){
                phoneModel = 'iPhone 5s'
            }else if(GPU_model == 'Apple A8 GPU' && screenWidth == 375){
                phoneModel = 'iPhone 6'
            }else if(GPU_model == 'Apple A8 GPU' && screenWidth == 414){
                phoneModel = 'iPhone 6P'
            }else if(GPU_model == 'Apple A9 GPU' && screenWidth == 320){
                phoneModel = 'iPhone SE'
            }else if(GPU_model == 'Apple A9 GPU' && screenWidth == 375){
                phoneModel = 'iPhone 6S'
            }else if(GPU_model == 'Apple A9 GPU' && screenWidth == 414){
                phoneModel = 'iPhone 6SP'
            }else if(GPU_model == 'Apple A10 GPU' && screenWidth == 375){
                phoneModel = 'iPhone 7'
            }else if(GPU_model == 'Apple A10 GPU' && screenWidth == 414){
                phoneModel = 'iPhone 7P'
            }else if(GPU_model == 'Apple A11 GPU' && screenWidth == 375 && screenHeight == 812){
                phoneModel = 'iPhone X'
            }else if(GPU_model == 'Apple A11 GPU' && screenWidth == 375){
                phoneModel = 'iPhone 8'
            }else if(GPU_model == 'Apple A11 GPU' && screenWidth == 414){
                phoneModel = 'iPhone 8P'
            }else if(GPU_model == 'Apple A12 GPU' && heightRatio == 1792){
                phoneModel = 'iPhone XR'
            }else if(GPU_model == 'Apple A12 GPU' && heightRatio == 2436){
                phoneModel = 'iPhone XS'
            }else if(GPU_model == 'Apple A12 GPU' && heightRatio == 2688){
                phoneModel = 'iPhone XS Max'
            }else if(GPU_model == 'Apple A13 GPU' && heightRatio == 1792){
                phoneModel = 'iPhone 11'
            }else if(GPU_model == 'Apple A13 GPU' && heightRatio == 2436){
                phoneModel = 'iPhone 11 Pro'
            }else if(GPU_model == 'Apple A13 GPU' && heightRatio == 2688){
                phoneModel = 'iPhone 11 Pro Max'
            }else if(GPU_model == 'Apple GPU' && heightRatio == 1334){
                phoneModel = 'iPhone 8'
            }else if(GPU_model == 'Apple GPU' && heightRatio == 2208){
                phoneModel = 'iPhone 8P'
            }else if(GPU_model == 'Apple GPU' && heightRatio == 2436){
                phoneModel = 'iPhone X'
            }else if(GPU_model == 'Apple GPU' && heightRatio == 1792){
                phoneModel = 'iPhone XR'
            }else if(GPU_model == 'Apple GPU' && heightRatio == 2688){
                phoneModel = 'iPhone XS Max'
            }
            return phoneModel;
        },


    };
});