//age 年龄 paydur缴费期间 insurDur保险期间  payYear领取年龄
var paynum; //缴费期间的个数 0代表没有缴费期间
var insurDuration; //保险期间的个数 
var addfu; //附加险是否有 2代表是主险 1代表附加险可有可无  0代表附加险没有 3代表一直有
var sex;
var thispaydur;
var thisGender;
var thisoption;
var payYears; //领取年龄
var payYear;
var exempt; //投保人豁免 0无 1有
//paydur 缴费期间
//点击年龄更换弹出框的条件
function props(inscode, age, insureAge) { //paydur 缴费期间 payYear领取年龄insureAge投保人生日
	var allage = 0;
	if(inscode == '2000005') {
		addfu = 2;
		exempt = 0;
		//御享人生
		// 年龄限制
		if(age > 55) {
			//缴费期间 5.10.15.20.30
			paynum = 1;
		} else if(age > 50) {
			paynum = 2;
		} else if(age > 35) {
			paynum = 4;
		} else {
			paynum = 5;
		}
	}else if(inscode == 'GY_FJ_001'){
		// 工银安盛附加豁免保费定期2016
		paynum = 0;
		allage = $('#insuredAge').val().replace(/岁/, '');
		reconAge(Number(allage), $('#isSelectGY_FJ_001'), 60);
	}else if(inscode == 'GY_FJ_002'){
		// 工银安盛附加豁免保险费重大疾病保险
		paynum = 0;
		reconAge(Number(allage), $('#isSelectGY_FJ_002'), 60);
	}else if(inscode == 'GY_FJ_003'){
		// 工银安盛附加意外伤害医疗保险
		paynum = 0;
		reconAge(Number(allage), $('#isSelectGY_FJ_003'), 60);
	}else if(inscode == 'GY_FJ_004'){
		// 工银安盛附加住院费用医疗保险
		paynum = 0;
		reconAge(Number(allage), $('#isSelectGY_FJ_004'), 60);
	}else if(inscode == 'GY_FJ_005'){
		// 工银安盛附加住院津贴医疗保险
		paynum = 0;
		reconAge(Number(allage), $('#isSelectGY_FJ_005'), 60);
	}else if(inscode == 'GY_FJ_006'){
		// 工银安盛附加综合意外伤害保险
		paynum = 0;
		reconAge(Number(allage), $('#isSelectGY_FJ_006'), 60);
	}else if(inscode == 'GY_FJ_007'){
		// 工银安盛人寿安康e生医疗保险
		paynum = 0;
		reconAge(Number(allage), $('#isSelectGY_FJ_007'), 60);
	} else if(inscode == '3000001') {
		//中韩保驾护航
		paynum = 3;
		addfu = 2;
		exempt = 0;
	} else if(inscode == '5000002') {
		exempt = 0;
		addfu = 2;
		//尊享世家
		if(age > 70) {
			paynum = 1;
		} else if(age > 67) {
			paynum = 2;
		} else if(age > 63) {
			paynum = 3;
		} else if(age > 59) {
			paynum = 4;
		} else if(age > 55) {
			paynum = 5;
		} else {
			paynum = 6;
		}
	} else if(inscode == '2000008') {
		exempt = 0;
		//孝顺保
		addfu = 2;
		if(age > 70) {
			paynum = 1;
		} else if(age > 60) {
			paynum = 2;
		} else if(age > 49) {
			paynum = 3;
		}
		if(age > 65) {
			var paydurnum = $('.paydur_2000008').parents('.additionalView').find('.J_xamount').val();
			if(parseInt(paydurnum) > 200000) {
				$('.paydur_2000008').parents('.additionalView').find('.J_xamount').val('FJ_XT_001000');
			}
		}
	} else if(inscode == '5000001') {
		exempt = 0;
		//千万传承c
		addfu = 2;
		if(age > 65) {
			paynum = 1;
		} else if(age > 60) {
			paynum = 4;
		} else if(age > 55) {
			paynum = 5;
		} else {
			paynum = 6;
		}
	} else if(inscode == '2000009') {
		exempt = 0;
		addfu = 2;
		//多倍宝至尊版
		if(age > 55) {
			paynum = 2;
			//附加险没有，最高投保年龄是55岁
		} else if(age > 50) {
			paynum = 3;
		} else if(age > 45) {
			paynum = 4;
		} else {
			paynum = 5;
		}
	} else if(inscode == '2000009001') {
		paynum = 0;
		//多倍宝至尊版附加险根据年龄判断
		if(age > 55) {
			addfu = 0;
			//附加险没有，最高投保年龄是55岁
		} else if(age > 50) {
			addfu = 1;
		} else if(age > 45) {
			addfu = 1;
		} else {
			addfu = 1;
		}
	} else if(inscode == '2000003') {
		exempt = 1;
		addfu = 2;
		//华夏福多倍版
		if(age > 50) {
			paynum = 3;
		} else {
			paynum = 6;
		}
	} else if(inscode == '2000003001') {
		//华夏福多倍版附加险  根据主险的缴费期间判断 投保人豁免
		paynum = 0;
		thispaydur = $('.paydur_2000003').val().replace(/年交/, ''); //选中的值
		var allage = parseInt(insureAge) + parseInt(thispaydur);
		var unexp = $('.paydur_2000003').parents('.additionalView').find('#isSelect2000003001');
		if(thispaydur == '1' || thispaydur == '3' || allage >= 70) {
			addfu = 0;
			unexp.parents('h3').css('color', '#cdcdcd');
			unexp.removeClass('on J_xselect').off('click');
		} else {
			addfu = 1;
			unexp.parents('h3').css('color', '#000');
			unexp.addClass('J_xselect').on('click');
		}
	} else if(inscode == '1000002') {
		exempt = 0;
		//千万人生
		addfu = 2;
		if(age > 50) {
			paynum = 3;
		} else {
			paynum = 4;
		}
	} else if(inscode == '1000002001') {
		//千万人生附加险金掌柜年金
		addfu = 1;
		paynum = 0;
	} else if(inscode == '1000001') {
		exempt = 0;
		//华夏红
		addfu = 2;
		if(age > 65) {
			paynum = 1;
		} else if(age > 55) {
			paynum = 3;
		} else {
			paynum = 4;
		}
	} else if(inscode == '1000001001') {
		paynum = 0;
		addfu = 1;
	} else if(inscode == '2000004') {
		exempt = 1;
		//百万无忧
		sex = $('.insuredGender').find('.on').html();
		addfu = 2;
		if(sex == '女') {
			if(age > 55) {
				paynum = 4;
			} else if(age > 50) {
				paynum = 5;
			} else if(age > 40) {
				paynum = 6;
			} else {
				paynum = 7;
			}
		} else {
			if(age > 54) {
				paynum = 3;
			} else if(age > 49) {
				paynum = 4;
			} else if(age > 45) {
				paynum = 5;
			} else if(age > 40) {
				paynum = 6;
			} else {
				paynum = 7;
			}
		}
	} else if(inscode == '2000004001') {
		//百万无忧附加险两全
		thispaydur = $('.paydur_2000004').val().replace(/年交/, ''); //选中的值
		thisGender = $('.insuredGender').find('.on').html(); //性别
		thisoption = ''; //保险期间
		paynum = 0;
		addfu = 1;
		if(age < 51) {
			if(age > 45) {
				if(thispaydur == '1') {
					thisoption += '<option>至65岁</option>';
				}
			} else if(age > 40) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10') {
					thisoption += '<option>至65岁</option>';
				}
			} else if(age > 35) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20') {
					thisoption += '<option>至65岁</option>';
				}
			} else if(age <= 35) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20' || thispaydur == '30') {
					thisoption += '<option>至65岁</option>';
				}
			}
		}
		if(age < 56) {
			if(age > 50) {
				if(thispaydur == '1') {
					thisoption += '<option>至70岁</option>';
				}
			} else if(age > 45) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10') {
					thisoption += '<option>至70岁</option>';
				}
			} else if(age > 35) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20') {
					thisoption += '<option>至70岁</option>';
				}
			} else if(age <= 35) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20' || thispaydur == '30') {
					thisoption += '<option>至70岁</option>';
				}
			}
		}

		if(thisGender == "男") {
			if(age < 61) {
				if(age > 55) {
					if(thispaydur == '1') {
						thisoption += '<option>至75岁</option>';
					}
				} else if(age > 54) {
					if(thispaydur == '1' || thispaydur == '3') {
						thisoption += '<option>至75岁</option>';
					}
				} else if(age > 49) {
					if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10') {
						thisoption += '<option>至75岁</option>';
					}
				} else if(age > 45) {
					if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15') {
						thisoption += '<option>至75岁</option>';
					}
				} else if(age > 40) {
					if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20') {
						thisoption += '<option>至75岁</option>';
					}
				} else if(age < 41) {
					if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20' || thispaydur == '30') {
						thisoption += '<option>至75岁</option>';
					}
				}
			}

		} else {
			if(age < 61) {
				if(age > 55) {
					if(thispaydur == '1') {
						thisoption += '<option>至75岁</option>';
					}
				} else if(age > 50) {
					if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10') {
						thisoption += '<option>至75岁</option>';
					}
				} else if(age > 40) {
					if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20') {
						thisoption += '<option>至75岁</option>';
					}
				} else if(age < 41) {
					if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20' || thispaydur == '30') {
						thisoption += '<option>至75岁</option>';
					}
				}
			}
		}
		var unexp = $('.paydur_2000004').parents('.additionalView').find('#isSelect2000004001');
		if(thisoption == '') {
			addfu = 0;
			unexp.parents('h3').css('color', '#cdcdcd').siblings('.infor').removeClass('on');
			unexp.removeClass('on J_xselect').off('click');
		} else {
			addfu = 1;
			$('.paydur_2000004').parents('.additionalView').find('#insurDur1').html(thisoption);
			unexp.parents('h3').css('color', '#000');
			unexp.addClass('J_xselect').on('click');
			$('.J_xselect').off('click').on('click', function() {
				var $this = $(this),
					infor = $this.parent().siblings();
				if($this.hasClass('on')) {
					$this.removeClass('on');
					infor.removeClass('on');
				} else {
					$this.addClass('on');
					infor.addClass('on');
				}
			})
		}

	} else if(inscode == '2000004002') {
		//百万无忧附加险投保人豁免
		paynum = 0;
		thispaydur = $('.paydur_2000004 option:selected').val().replace(/年交/, ''); //选中的值
		var allage = parseInt(insureAge) + parseInt(thispaydur);
		var unexp = $('.paydur_2000004').parents('.additionalView').find('#isSelect2000004002');
		if(thispaydur == '1' || thispaydur == '3' || allage >= 70) {
			addfu = 0;
			unexp.parents('h3').css('color', '#cdcdcd');
			unexp.removeClass('on J_xselect').off('click');
		} else {
			addfu = 1;
			unexp.parents('h3').css('color', '#000');
			unexp.addClass('J_xselect').on('click');
		}
	} else if(inscode == '1000003') {
		exempt = 1;
		//如意享
		payYears = $('#payYear0').html();
		thisGender = $('.insuredGender').find('.on').html(); //性别
		var thispay = $('.paydur_1000003').val().replace(/年交/, '');
		var term = $('.paydur_1000003').parents('.additionalView').find('#payYear0');
		if(parseInt(age) + parseInt(thispay) > 70) {
			term.html('<option>70</option>');
			$('.paydur_1000003').html('1年交');
		} else if(parseInt(age) + parseInt(thispay) > 65) {
			term.html('<option>70</option>');
		} else if(parseInt(age) + parseInt(thispay) > 60) {
			term.html('<option>65</option><option>70</option>');
		} else if(parseInt(age) + parseInt(thispay) > 55) {
			term.html('<option>60</option><option>65</option><option>70</option>');
		} else {
			if(thisGender == '男') {
				term.html('<option>60</option><option>65</option><option>70</option>');
			}else{
				term.html('<option>55</option><option>60</option><option>65</option><option>70</option>');
			};
		}
		addfu = 2;
		//领取年龄来判断缴费期间的个数
		//payYear当前的领取年龄
		if(thisGender == '女') {
			if(age < 51 && age >= 0) {
				paynum = 6; //0-50
			} else if(age < 56) {
				paynum = 5; //51-55
			} else if(age < 61) {
				paynum = 4; // 56-60
			} else if(age < 66) {
				paynum = 3; // 61-65
			} else if(age < 68) {
				paynum = 2; // 66-67
			} else if(age < 70) {
				paynum = 1; // 68-69
			};
		} else {
			if(age < 51 && age >= 0) {
				paynum = 6; //0-55
			} else if(age < 56) {
				paynum = 5; //0-55
			} else if(age < 61) {
				paynum = 4; // 56-60
			} else if(age < 66) {
				paynum = 3; // 61-65
			} else if(age < 68) {
				paynum = 2; // 66-67
			} else if(age < 70) {
				paynum = 1; // 68-69
			}
		}
	} else if(inscode == '100000301') {
		//如意享附加险
		paynum = 0;
		addfu = 1;
	} else if(inscode == '100000302') {
		//如意享附加险  根据主险的缴费期间判断 投保人豁免
		paynum = 0;
		thispaydur = $('.paydur_1000003').val().replace(/年交/, ''); //选中的值
		var allage = parseInt(insureAge) + parseInt(thispaydur);
		var unexp = $('.paydur_1000003').parents('.additionalView').find('#isSelect100000302');
		if(thispaydur == '1' || thispaydur == '3' || allage >= 70) {
			addfu = 0;
			unexp.parents('h3').css('color', '#cdcdcd');
			unexp.removeClass('on J_xselect').off('click');
		} else {
			addfu = 1;
			unexp.parents('h3').css('color', '#000');
			unexp.addClass('J_xselect').on('click');
		}
	} else if(inscode == '4000002') {
		//华夏医保通
		paynum = 1;
		addfu = 2;
	} else if(inscode == '4000002001') {
		//华夏医保通附加险社保
		paynum = 0;
		addfu = 1;
	} else if(inscode == '4000002002') {
		//华夏医保通附加险质子重离子
		paynum = 0;
		addfu = 1;
	} else if(inscode == '2000011') {
		//人保寿险无忧
		if(age > 60) {
			paynum = 2;
		} else if(age > 55) {
			paynum = 3;
		} else if(age > 50) {
			paynum = 4;
		} else if(age > 40) {
			paynum = 6;
		} else {
			paynum = 8;
		}
	} else if(inscode == '5000002') {
		//千万传承d
		if(age > 70) {
			paynum = 1;
		} else if(age > 65) {
			paynum = 3;
		} else if(age > 60) {
			paynum = 4;
		} else if(age > 55) {
			paynum = 5;
		} else {
			paynum = 6;
		}
	} else if(inscode == '2000012') {
		//康赢佳
		if(age > 60) {
			paynum = 1;
		} else if(age > 55) {
			paynum = 3;
		} else if(age > 45) {
			paynum = 4;
		} else if(age > 40) {
			paynum = 5;
		} else {
			paynum = 6;
		}
	} else if(inscode == '2000013') {
		exempt = 1;
		//百万守护
		sex = $('.insuredGender').find('.on').html();
		addfu = 2;
		if(age > 55) {
			paynum = 3;
		} else if(age > 45) {
			paynum = 6;
		} else {
			paynum = 7;
		}
	} else if(inscode == '2000013001') {
		//百万守护两全
		thispaydur = $('.paydur_2000013').val().replace(/年交/, ''); //选中的值
		thisGender = $('.insuredGender').find('.on').html(); //性别
		thisoption = ''; //保险期间
		paynum = 0;
		addfu = 1;
		if(age < 46) {
			if(age > 40) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5') {
					thisoption += '<option>至65岁</option>';
				}
			} else if(age > 35) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15') {
					thisoption += '<option>至65岁</option>';
				}
			} else if(age > 30) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20') {
					thisoption += '<option>至65岁</option>';
				}
			} else if(age <= 30) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20' || thispaydur == '30') {
					thisoption += '<option>至65岁</option>';
				}
			}
		}
		if(age < 51) {
			if(age > 45) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5') {
					thisoption += '<option>至70岁</option>';
				}
			} else if(age > 40) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15') {
					thisoption += '<option>至70岁</option>';
				}
			} else if(age > 35) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20') {
					thisoption += '<option>至70岁</option>';
				}
			} else if(age <= 35) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20' || thispaydur == '30') {
					thisoption += '<option>至70岁</option>';
				}
			}
		}
		if(age < 56) {
			if(age > 50) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5') {
					thisoption += '<option>至75岁</option>';
				}
			} else if(age > 45) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15') {
					thisoption += '<option>至75岁</option>';
				}
			} else if(age > 40) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20') {
					thisoption += '<option>至75岁</option>';
				}
			} else if(age < 41) {
				if(thispaydur == '1' || thispaydur == '3' || thispaydur == '5' || thispaydur == '10' || thispaydur == '15' || thispaydur == '20' || thispaydur == '30') {
					thisoption += '<option>至75岁</option>';
				}
			}
		}
		var unexp = $('.paydur_2000013').parents('.additionalView').find('#isSelect2000013001');
		if(thisoption == '') {
			addfu = 0;
			unexp.parents('h3').css('color', '#cdcdcd').siblings('.infor').removeClass('on');
			unexp.removeClass('on J_xselect').off('click');
		} else {
			addfu = 1;
			$('.paydur_2000013').parents('.additionalView').find('#insurDur1').html(thisoption);
			unexp.parents('h3').css('color', '#000');
			unexp.addClass('J_xselect').on('click');
			$('.J_xselect').off('click').on('click', function() {
				var $this = $(this),
					infor = $this.parent().siblings();
				if($this.hasClass('on')) {
					$this.removeClass('on');
					infor.removeClass('on');
				} else {
					$this.addClass('on');
					infor.addClass('on');
				}
			})
		}
	} else if(inscode == '2000013002') {
		//百万守护附加险投保人豁免
		paynum = 0;
		thispaydur = $('.paydur_2000013 option:selected').val().replace(/年交/, ''); //选中的值
		var allage = parseInt(insureAge) + parseInt(thispaydur);
		var unexp = $('.paydur_2000013').parents('.additionalView').find('#isSelect2000013002');
		if(thispaydur == '1' || thispaydur == '3' || allage >= 70) {
			addfu = 0;
			unexp.parents('h3').css('color', '#cdcdcd');
			unexp.removeClass('on J_xselect').off('click');
		} else {
			addfu = 1;
			unexp.parents('h3').css('color', '#000');
			unexp.addClass('J_xselect').on('click');
		}
	} else if(inscode == '3000011') {
		// 中韩保驾护航2019
		exempt = 1;
		paynum = 4;
		addfu = 2;
		thisoption = ''; //保险期间
		if(age < 56) {
			if(age > 50) {
				thisoption = '<option>至80岁</option>';
			} else if(age <= 50) {
				thisoption = '<option>30年</option><option>至70岁</option><option>至80岁</option>';
			}
		}
		$('.paydur_3000011').parents('.additionalView').find('#insurDur0').html(thisoption);
	}else if(inscode == '2000015') {
		// 昆仑健康爱无忧C款
		exempt = 1;
		addfu = 2;
		if(age > 60) {
			paynum = 1;
		} else if(age > 55) {
			paynum = 2;
		} else if(age > 50) {
			paynum = 3;
		} else if(age > 40) {
			paynum = 5;
		} else {
			paynum = 6;
		}
	}else if(inscode == 'KL_FJ_001') {
		// 昆仑个人综合意外伤害保险
		paynum = 0;
		addfu = 1;
		allage = $('#insuredAge').val().replace(/岁/, '');
		reconAge(Number(allage), $('#isSelectKL_FJ_001'), 65);
	}else if(inscode == 'KL_FJ_002') {
		// 昆仑个人综合住院医疗保险
		paynum = 0;
		addfu = 1;
		allage = $('#insuredAge').val().replace(/岁/, '');
		reconAge(Number(allage), $('#isSelectKL_FJ_002'), 60);
	}else if(inscode == 'KL_FJ_003') {
		// 昆仑健康e生尊享医疗保险
		paynum = 0;
		addfu = 1;
		allage = $('#insuredAge').val().replace(/岁/, '');
		reconAge(Number(allage), $('#isSelectKL_FJ_003'), 60);
	}else if(inscode == 'KL_FJ_004') {
		// 昆仑无忧豁免
		paynum = 0;
		thispaydur = $('#paydur0 option:selected').val().replace(/年交/, ''); //选中的值
		var allage = parseInt(insureAge) + parseInt(thispaydur);
		var remit = $('#paydur0').parents('.additionalView').find('#isSelectKL_FJ_004');
		if(thispaydur == '趸交' || thispaydur == '3' || allage >= 70) {
			addfu = 0;
			remit.parents('h3').css('color', '#cdcdcd');
			remit.removeClass('on J_xselect').off('click');
		} else {
			addfu = 1;
			remit.parents('h3').css('color', '#000');
			remit.addClass('J_xselect').on('click');
		}
	}else if(inscode == '2000016') {
		// 瑞泰乐享安康
		exempt = 1;
		addfu = 2;
		if(age > 70) {
			paynum = 1;
		} else if(age > 65) {
			paynum = 1;
		} else if(age > 60) {
			paynum = 3;
		} else if(age > 50) {
			paynum = 4;
		} else {
			paynum = 5;
		}
	}else if(inscode == 'FJ_XT_001'){
		// 信泰人寿附加安享无忧意外伤害
		paynum = 0;
		addfu = 1;
		var allage = $('#insuredAge').val().replace(/岁/, '');
		var unexp = $('#paydur0').parents('.additionalView').find('#isSelectFJ_XT_001');
		allage = Number(allage);
		reconAge(allage, unexp, 64);
	}else if(inscode == 'FJ_XT_002'){
		// 信泰附加安享无忧意外医疗
		paynum = 0;
		addfu = 1;
		var allage = $('#insuredAge').val().replace(/岁/, '');
		var unexp = $('#paydur0').parents('.additionalView').find('#isSelectFJ_XT_02');
		allage = Number(allage);
		reconAge(allage, unexp, 60);
	}else if(inscode == 'FJ_XT_003'){
		// 信泰附加安享无忧住院费用补偿医疗
		paynum = 0;
		addfu = 1;
		var allage = $('#insuredAge').val().replace(/岁/, '');
		var unexp = $('#paydur0').parents('.additionalView').find('#isSelectFJ_XT_03');
		allage = Number(allage);
		reconAge(allage, unexp, 60);
	}else if(inscode == 'FJ_XT_004'){
		// 信泰附加安享无忧住院津贴医疗
		paynum = 0;
		addfu = 1;
		var allage = $('#insuredAge').val().replace(/岁/, '');
		var unexp = $('#paydur0').parents('.additionalView').find('#isSelectFJ_XT_04');
		allage = Number(allage);
		reconAge(allage, unexp, 60);
	}else if(inscode == 'FJ_XT_005') {
		// 信泰附加投保人豁免
		paynum = 0;
		thispaydur = $('#paydur0 option:selected').val().replace(/年交/, ''); //选中的值
		var allage = parseInt(insureAge) + parseInt(thispaydur);
		var remit = $('#paydur0').parents('.additionalView').find('#isSelectFJ_XT_005');
		if(thispaydur == '1' || thispaydur == '3' || allage >= 70) {
			addfu = 0;
			remit.parents('h3').css('color', '#cdcdcd');
			remit.removeClass('on J_xselect').off('click');
		} else {
			addfu = 1;
			remit.parents('h3').css('color', '#000');
			remit.addClass('J_xselect').on('click');
		}
	}else if(inscode == 'FJ_XT_006'){
		// 信泰附加信泰如意保医疗保险
		paynum = 0;
		addfu = 1;
		var allage = $('#insuredAge').val().replace(/岁/, '');
		var unexp = $('#paydur0').parents('.additionalView').find('#isSelectFJ_XT_06');
		reconAge(Number(allage), unexp, 65);
	}else if(inscode == '1000004') {
		addfu = 2;
		exempt = 0;
		// 君康颐养金生
		payYears = $('#payYear0').html();
		thisGender = $('.insuredGender').find('.on').html(); //性别
		var thispay = $('#paydur0').val().replace(/年交/, '');
		var term = $('#payYear0');
		if(parseInt(age) + parseInt(thispay) > 70) {
			term.html('<option>70</option>');
			$('#paydur0').html('1年交');
		} else if(parseInt(age) + parseInt(thispay) > 65) {
			term.html('<option>70</option>');
		} else if(parseInt(age) + parseInt(thispay) > 60) {
			term.html('<option>65</option><option>70</option>');
		} else if(parseInt(age) + parseInt(thispay) > 55) {
			term.html('<option>60</option><option>65</option><option>70</option>');
		} else {
			if(thisGender == '男') {
				term.html('<option>60</option><option>65</option><option>70</option>');
			}else{
				term.html('<option>55</option><option>60</option><option>65</option><option>70</option>');
			};
		};
		//领取年龄来判断缴费期间的个数
		var draw = $('#payYear0 option:selected').text();
		var arrNum = [];
		switch(draw) {
			case '55':
				arrNum = [50, 45, 40, 35];
				break;
			case '60':
				arrNum = [55, 50, 45, 40];
				break;
			case '65':
				arrNum = [60, 55, 50, 45];
				break;
			default:
				arrNum = [65, 60, 55, 50];
		} ;
		if(age > arrNum[0]) {
			paynum = 1;
		} else if(age > arrNum[1]) {
			paynum = 3;
		} else if(age > arrNum[2]) {
			paynum = 4;
		} else if(age > arrNum[3]) {
			paynum = 5;
		} else {
			paynum = 6;
		};
	}else if(inscode == 'FJ_JK_001'){
		// 君康附加险安福综合意外伤害
		paynum = 1;
		addfu = 1;
		var allage = $('#insuredAge').val().replace(/岁/, '');
		var unexp = $('#paydur0').parents('.additionalView').find('#isSelectFJ_JK_001');
		allage = Number(allage);
		reconAge(allage, unexp, 70);
	}else if(inscode == 'FJ_JK_002'){
		// 君康附加险安福意外伤害医疗
		paynum = 1;
		addfu = 1;
		var allage = $('#insuredAge').val().replace(/岁/, '');
		var unexp = $('#paydur0').parents('.additionalView').find('#isSelectFJ_JK_002');
		allage = Number(allage);
		reconAge(allage, unexp, 65);
	}else if(inscode == 'FJ_JK_003'){
		// 君康附加险安福住院费用
		paynum = 1;
		addfu = 1;
		var allage = $('#insuredAge').val().replace(/岁/, '');
		var unexp = $('#paydur0').parents('.additionalView').find('#isSelectFJ_JK_003');
		allage = Number(allage);
		reconAge(allage, unexp, 60);
	}else if(inscode == 'FJ_JK_004'){
		// 君康附加险安福住院津贴
		paynum = 1;
		addfu = 1;
		var allage = $('#insuredAge').val().replace(/岁/, '');
		var unexp = $('#paydur0').parents('.additionalView').find('#isSelectFJ_JK_004');
		allage = Number(allage);
		reconAge(allage, unexp, 60);
	};
}

// 附加险被保人年龄判断
// allage 被保人年龄  unexp 附加险勾选按钮 num 投保最大年龄
function reconAge(allage, unexp, num){
	if(allage > num) {
		addfu = 0;
		unexp.parents('h3').css('color', '#cdcdcd');
		unexp.removeClass('on J_xselect').off('click');
	} else {
		addfu = 1;
		unexp.parents('h3').css('color', '#000');
		unexp.addClass('J_xselect').on('click');
	};
}

var aftpremium;
var aftamount;
var qianwan;
//premium保费 amount保额
//弹出框信息的判断
function editprops(inscode, premium, amount) {
	if(inscode == '2000005') {
		//御享人生
		//保额
		if(parseInt(amount) < 50000 || amount == '' || parseInt(amount) % 1 != 0) {
			aftamount = '御享人生:最低为50000元';
		} else {
			aftamount = amount;
		}
	} else if(inscode == 'GY_FJ_006'){
		// 工银安盛附加综合意外伤害保险
		// 保额
		var zuRisks = parseInt($('#insTab0 tr:first td').eq(1).text()); // 主险基本保险金额
		if(parseInt(amount) < 50000 || parseInt(amount) > 3000000 || amount == '') {
			aftamount = '工银安盛附加综合意外伤害保险:最低为50000元，最高为300万元';
		}else if(parseInt(amount) > (5*zuRisks)){
			aftamount = '附加于寿险主险保额的比例不得超过5：1';
		}else{
			aftamount = amount;
		}
	} else if(inscode == '3000001') {
		//中韩保驾护航
		//保额
		if(amount < 100000 || amount == '' || parseInt(amount) % 1 != 0) {
			aftamount = '中韩保驾护航:最低为100000元';
		} else {
			aftamount = amount;
		}
	} else if(inscode == '5000002') {
		//尊享世家
		//保额
		if(parseInt(amount) < 100000 || parseInt(amount) % 10000 != 0 || amount == '') {
			aftamount = '尊享世家:最低为100000元，且为万元整数倍';
		} else {
			aftamount = amount;
		}
	} else if(inscode == '2000008') {
		//孝顺保6.30之后最高为15万
		//保额
		if(parseInt($('#insuredAge').val().replace(/岁/, '')) > 51 || parseInt($('#insuredAge').val().replace(/岁/, '')) < 66) {
			qianwan = '250000';
		} else {
			qianwan = '200000';
		}
		if(parseInt(amount) < 50000 || parseInt(amount) > parseInt(qianwan) || amount == '' || parseInt(amount) % 1 != 0) {
			aftamount = '孝顺保:保额最低50000元，最高' + qianwan + '元';
		} else {
			aftamount = amount;
		}
	} else if(inscode == '5000001') {
		//千万传承c
		//保费
		if(parseInt(premium) < 50000 || premium == '' || parseInt(premium) % 1000 != 0) {
			aftpremium = '千万传承c:保费最低为50000元，且为千元整数倍';
		} else {
			aftpremium = premium;
		}
	} else if(inscode == '2000009') {
		//多倍宝至尊版
		//保额
		if(parseInt(amount) < 50000 || amount == '' || parseInt(amount) % 10000 != 0) {
			aftamount = '多倍宝至尊版:保额最低为50000元，且为万元整数倍';
		} else {
			aftamount = amount;
		}
	} else if(inscode == '2000003') {
		//华夏福多倍版
		//保额
		if(parseInt(amount) < 10000 || amount == '' || parseInt(amount) % 1000 != 0) {
			aftamount = '华夏福多倍版:保额最低为10000元，且为千元整数倍';
		} else {
			aftamount = amount;
		}
	} else if(inscode == '1000002') {
		//千万人生
		//保费
		if($('.paydur_1000002 option:selected').text() == '1年交') {
			qianwan = 50000;
		} else {
			qianwan = 10000;
		}
		if(parseInt(premium) < qianwan || premium == '' || parseInt(premium) % 1000 != 0) {
			aftpremium = '千万人生:保费最低为' + qianwan + '元，且为千元整数倍';
		} else {
			aftpremium = premium;
		}
	} else if(inscode == '1000002001') {
		//千万人生附加险金掌柜年金
		//保费
		if(parseInt(premium) < 1000 || premium == '' || parseInt(premium) % 1000 != 0) {
			aftpremium = '千万人生金掌柜年金:保费最低为1000元，且为千元整数倍';
		} else {
			aftpremium = premium;
		}
	} else if(inscode == '1000001') {
		//华夏红
		//保费
		if($('.paydur_1000001 option:selected').text() == '1年交') {
			qianwan = 10000;
		} else {
			qianwan = 3000;
		}
		if(parseInt(premium) < qianwan || premium == '' || parseInt(premium) % 500 != 0) {
			aftpremium = '华夏红:保费最低为' + qianwan + '元，且为500元整数倍';
		} else {
			aftpremium = premium;
		}
	} else if(inscode == '1000001001') {
		//华夏红附加险
		//保费
		if(parseInt(premium) < 1 || premium == '' || parseInt(premium) % 1 != 0) {
			aftpremium = '华夏红金管家:保费最低为1元';
		} else {
			aftpremium = premium;
		}
	} else if(inscode == '2000004') {
		//百万无忧
		//保额
		if(parseInt(amount) < 50000 || amount == '' || parseInt(amount) % 1000 != 0) {
			aftamount = '百万无忧:保额最低为50000元，且为千元整数倍';
		} else {
			aftamount = amount;
		}
	} else if(inscode == '1000003') {
		//如意享
		//保费
		if($('.paydur_1000003 option:selected').text() == '1年交') {
			qianwan = 10000;
		} else {
			qianwan = 5000;
		}
		if(parseInt(premium) < qianwan || premium == '' || parseInt(premium) % 1000 != 0) {
			aftpremium = '如意享:保费最低为' + qianwan + '元，且为千元整数倍';
		} else {
			aftpremium = premium;
		}
	} else if(inscode == '100000301') {
		//如意享附加险金掌柜年金
		//保费
		if(parseInt(premium) < 1 || premium == '' || parseInt(premium) % 1 != 0) {
			aftpremium = '如意享金掌柜年金:保费最低为1元';
		} else {
			aftpremium = premium;
		}
	} else if(inscode == '2000011') {
		//无忧人生
		//保额
		if($('.paydur_2000011 option:selected').text() == '1年交') {
			qianwan = 50000;
		} else {
			qianwan = 10000;
		}
		if(parseInt(amount) < qianwan || amount == '' || parseInt(amount) % 1 != 0) {
			aftamount = '无忧人生:保费最低为' + qianwan + '元';
		} else {
			aftamount = amount;
		}

	} else if(inscode == '5000002') {
		//千万传承d
		//保费
		if($('.paydur_5000002 option:selected').text() == '1年交') {
			qianwan = 50000;
		} else {
			qianwan = 10000;
		}
		if(parseInt(premium) < qianwan || premium == '' || parseInt(premium) % 1000 != 0) {
			aftpremium = '千万传承D:保费最低为' + qianwan + '元，且为千元整数倍';
		} else {
			aftpremium = premium;
		}
	} else if(inscode == '2000012') {
		//康赢佳
		//保额
		if(parseInt(amount) < 10000 || amount == '' || parseInt(amount) % 10000 != 0) {
			aftamount = '康赢佳:保额最低为10000元，且为万元整数倍';
		} else if(parseInt(amount) > 2000000) {
			aftamount = '康赢佳:保额最高为200万元，且为万元整数倍';
		} else {
			aftamount = amount;
		}
	} else if(inscode == '2000013') {
		//百万守护
		//保额
		if(parseInt(amount) < 50000 || amount == '' || parseInt(amount) % 1000 != 0) {
			aftamount = '百万守护:保额最低为50000元，且为千元整数倍';
		} else {
			aftamount = amount;
		}
	} else if(inscode == '3000011') {
		//中韩保驾护航2019
		//保额
		if(parseInt(amount) < 100000 || amount == '' || parseInt(amount) % 1000 != 0) {
			aftamount = '中韩保驾护航(2019):保额最低为100000元，且为千元整数倍';
		} else {
			aftamount = amount;
		}
	}else if(inscode == '2000015') {
		//昆仑健康爱无忧C款
		//保额
		if(parseInt(amount) < 50000 || parseInt(amount) % 10000 != 0 || amount == '') {
			aftamount = '昆仑健康爱无忧C款:最低为50000元，且为万元整数倍';
		} else {
			aftamount = amount;
		}
	}else if(inscode == 'KL_FJ_001') {
		//昆仑个人综合意外伤害保险
		//保额
		var zuRisks = parseInt($('#insTab0 tr:first td').eq(1).text()); // 主险基本保险金额
		if(parseInt(amount) < 100000 || amount == '') {
			aftamount = '昆仑个人综合意外伤害保险:最低为100000元';
		}else {
			aftamount = amount;
		}
		// if(parseInt(amount) > (0.1*zuRisks)){
		// 	aftamount = '昆仑意外伤害医疗保险金不得大于基本保险金额的10%';
		// }
	}else if(inscode == 'KL_FJ_002') {
		//昆仑个人综合住院医疗保险
		//保额
		var treaPay = parseInt(amount);
		if(treaPay <= 30000){
			if(treaPay < 20000){
				if(treaPay == 5000 || treaPay == 10000){
					aftamount = amount;
				}else{
					aftamount = '昆仑个人综合住院医疗保险:2万以下为5000、10000';
				};
			}else if(treaPay >= 20000 && treaPay % 1000 != 0){
				aftamount = '昆仑个人综合住院医疗保险:2万以上为1000元的整数倍，最高限3万元';
			}else{
				aftamount = amount;
			};
		}else{
			aftamount = '昆仑个人综合住院医疗保险:最高限3万元';
		}
	}else if(inscode == '2000016') {
		//瑞泰乐享安康
		//保额
		if(parseInt(amount) < 100000 || parseInt(amount) % 10000 != 0 || amount == '') {
			aftamount = '瑞泰乐享安康:最低为100000元，且为万元整数倍';
		} else {
			aftamount = amount;
		}
	}else if(inscode == 'FJ_XT_001'){
		// 信泰人寿附加安享无忧意外伤害
		// 保额
		var zuRisks = parseInt($('#insTab0 tr:first td').eq(1).text()); // 主险基本保险金额
		if(parseInt(amount) < 10000 || parseInt(amount) % 1000 != 0 || amount == '') {
			aftamount = '信泰附加安享无忧意外伤害:最低为1万元，且为千元整数倍';
		}else{
			aftamount = amount;
		}
		// if(parseInt(amount) > (5*zuRisks)){
		// 	aftamount = '本险种的基本保险金额不得高于主险的基本保险金额5倍';
		// }
	}else if(inscode == 'FJ_XT_002'){
		// 信泰人寿附加安享无忧意外医疗
		// 保额
		if(parseInt(amount) < 1000 || parseInt(amount) > 50000 || parseInt(amount) % 1000 != 0 || amount == ''){
			aftamount = '信泰附加安享无忧意外医疗:1000元到50000元，且为千元整数倍';
		}else{
			aftamount = amount;
		}
	}else if(inscode == 'FJ_XT_003'){
		// 信泰人寿附加安享无忧住院费用补偿医疗
		// 保额
		if(parseInt(amount) < 10000 || parseInt(amount) % 5000 != 0 || amount == '') {
			aftamount = '信泰附加安享无忧住院费用补偿医疗:最低为10000元，且为5千元整数倍';
		}else{
			aftamount = amount;
		}
	}else if(inscode == 'FJ_XT_004'){
		// 信泰人寿附加安享无忧住院津贴医疗
		// 保额
		if(parseInt(amount) < 100 || parseInt(amount) % 10 != 0 || amount == '') {
			aftamount = '信泰附附加安享无忧住院津贴医疗:最低为100元，且为10元整数倍';
		}else{
			aftamount = amount;
		}
	}else if(inscode == '1000004'){
		// 君康颐养金生
		// 保额
		var way = $('#paydur0 option:selected').text();
		if(way == '1年交'){
			if(parseInt(premium) < 10000 || premium == '') {
				aftpremium = '君康颐养金生养老年金保险:趸交10000元起';
			}else{
				aftpremium = premium;
			}
		}else{
			if(parseInt(premium) < 5000 || premium == '') {
				aftpremium = '君康颐养金生养老年金保险:期交5000元起';
			}else{
				aftpremium = premium;
			}
		};
	}else if(inscode == 'FJ_JK_001'){
		// 君康附加险安福综合意外伤害
		// 保额
		if(parseInt(amount) < 10000 || parseInt(amount) % 10000 != 0 || amount == '') {
			aftamount = '君康附加险安福综合意外伤害:最低为10000元，且为万元整数倍';
		}else{
			aftamount = amount;
		}
	}else if(inscode == 'FJ_JK_002'){
		// 君康附加险安福意外伤害医疗
		// 保额
		if(parseInt(amount) < 5000 || parseInt(amount) % 1000 != 0 || amount == '') {
			aftamount = '君康附加险安福综合意外伤害:最低为5000元，且为1000元整数倍';
		}else{
			aftamount = amount;
		}
	}
}

// 附加险投保份数
// copies 投保份数
var aftcopy;
function copyprop(inscode , copies){
	if(inscode == 'GY_FJ_003'){
		// 工银安盛附加意外伤害医疗保险
		// 投保份数
		if(parseInt(copies) < 2 || parseInt(copies) > 20 || copies == '') {
			aftcopy = '工银安盛附加意外伤害医疗保险:最低份数为2份，最高份数为20份';
		}else{
			aftcopy = copies;
		}
	}else if(inscode == 'GY_FJ_004'){
		// 工银安盛附加住院费用医疗保险
		// 投保份数
		if(parseInt(copies) < 2 || parseInt(copies) > 30 || copies == '') {
			aftcopy = '工银安盛附加住院费用医疗保险:最低份数为2份，最高份数为30份';
		}else{
			aftcopy = copies;
		}
	}else if(inscode == 'GY_FJ_005'){
		// 工银安盛附加住院津贴医疗保险
		// 投保份数
		if(parseInt(copies) < 1 || parseInt(copies) > 10 || copies == '') {
			aftcopy = '工银安盛附加住院津贴医疗保险:最低份数为1份，最高份数为10份';
		}else{
			aftcopy = copies;
		}
	}else if(inscode == 'FJ_JK_003'){
		// 君康附加险安福意外伤害医疗
		// 投保份数
		if(parseInt(copies) < 1 || parseInt(copies) > 10 || copies == '') {
			aftcopy = '君康附加险安福意外伤害医疗:最低份数为1份，最高份数为10份';
		}else{
			aftcopy = copies;
		}
	}else if(inscode == 'FJ_JK_004'){
		// 君康附加险安福住院津贴
		// 投保份数
		if(parseInt(copies) < 1 || parseInt(copies) > 25 || copies == '') {
			aftcopy = '君康附加险安福住院津贴:最低份数为1份，最高份数为25份';
		}else{
			aftcopy = copies;
		}
	}
}

var remove;
//计划书是否符合年龄条件
function removeinsured(inscode, age) {
	if(inscode == '2000005') {
		//御享人生
		if(age < 0 || age > 60) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '3000001') {
		//中韩保驾护航
		if(age < 18 || age > 55) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '5000002') {
		//尊享世家
		if(age < 0 || age > 75) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '2000008') {
		//孝顺保
		if(age < 50 || age > 75) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '5000001') {
		//千万传承c
		if(age < 0 || age > 70) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '2000009') {
		//多倍宝至尊版
		if(age < 0 || age > 60) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '2000003') {
		//华夏福多倍版
		if(age < 0 || age > 55) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '1000002') {
		//千万人生
		if(age < 0 || age > 55) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '1000001') {
		//华夏红
		if(age < 0 || age > 70) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '1000003') {
		//如意享
		if(age < 0 || age > 69) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '2000004') {
		//百万无忧
		if(age < 0 || age > 55) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '4000002') {
		//医保通
		if(age < 0 || age > 65) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '2000011') {
		//无忧人生
		if(age < 0 || age > 65) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '5000002') {
		//千万传承d
		if(age < 0 || age > 80) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '2000012') {
		//康赢佳
		if(age < 0 || age > 65) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '2000013') {
		//百万守护
		if(age < 0 || age > 60) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '3000011') {
		//中韩保驾护航2019
		if(age < 18 || age > 55) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '2000015') {
		//昆仑健康爱无忧C款
		if(age < 0 || age > 60) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '2000016') {
		// 瑞泰乐享安康
		if(age < 0 || age > 70) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	} else if(inscode == '1000004') {
		// 君康颐养金生
		if(age < 0 || age > 65) {
			remove = 0; //不符合条件 移除计划书
		} else {
			remove = 1;
		}
	}
}
//保费试算
function preCount(inscode, age, insureAge) {
	if(inscode == '2000005') {
		exempt = 0;
		//御享人生
		//		年龄限制
		if(age > 55) {
			//缴费期间 5.10.15.20.30
			paynum = 1;
		} else if(age > 50) {
			paynum = 2;
		} else if(age > 35) {
			paynum = 4;
		} else {
			paynum = 5;
		}
	} else if(inscode == '2000003') {
		exempt = 1;
		//华夏福
		if(age > 50) {
			paynum = 3;
		} else {
			paynum = 6;
		}
		thispaydur = $('.paydur_2000003').val().replace(/年交/, ''); //选中的值
		var allage = parseInt(insureAge) + parseInt(thispaydur);
		if(thispaydur == '1' || thispaydur == '3' || allage >= 70) {
			addfu = 0;
		} else {
			addfu = 1;
		}
	} else if(inscode == '2000004') {
		exempt = 1;
		//百万无忧
		sex = $('.insuredGender').find('.on').html();
		if(sex == '女') {
			if(age > 55) {
				paynum = 4;
			} else if(age > 50) {
				paynum = 5;
			} else if(age > 40) {
				paynum = 6;
			} else {
				paynum = 7;
			}
		} else {
			if(age > 54) {
				paynum = 3;
			} else if(age > 49) {
				paynum = 4;
			} else if(age > 45) {
				paynum = 5;
			} else if(age > 40) {
				paynum = 6;
			} else {
				paynum = 7;
			}
		}
		thispaydur = $('.paydur_2000004').val().replace(/年交/, ''); //选中的值
		var allage = parseInt(insureAge) + parseInt(thispaydur);
		if(thispaydur == '1' || thispaydur == '3' || allage >= 70) {
			addfu = 0;
		} else {
			addfu = 1;
		}
	} else if(inscode == '1000001') {
		exempt = 0;
		//华夏红
		if(age > 65) {
			paynum = 1;
		} else if(age > 55) {
			paynum = 3;
		} else {
			paynum = 4;
		}
	} else if(inscode == '1000002') {
		exempt = 0;
		//千万人生
		if(age > 50) {
			paynum = 3;
		} else {
			paynum = 4;
		}
	} else if(inscode == '1000003') {
		exempt = 1;
		//如意享
		var thispay = $('.paydur_1000003').val().replace(/年交/, '');
		thisGender = $('.insuredGender').find('.on').html(); //性别
		if(parseInt(age) + parseInt(thispay) > 70) {
			$('#getYear0').html('<option>70</option>');
			$('.paydur_1000003').html('<option>1年交</option>');
		} else if(parseInt(age) + parseInt(thispay) > 65) {
			$('#getYear0').html('<option>70</option>');
		} else if(parseInt(age) + parseInt(thispay) > 60) {
			$('#getYear0').html('<option>65</option><option>70</option>');
		} else if(parseInt(age) + parseInt(thispay) > 55) {
			$('#getYear0').html('<option>60</option><option>65</option><option>70</option>');
		} else {
			if(thisGender == '女') {
				$('#getYear0').html('<option>55</option><option>60</option><option>65</option><option>70</option>');
			} else {
				$('#getYear0').html('<option>60</option><option>65</option><option>70</option>');
			}
		}
		//领取年龄来判断缴费期间的个数
		//payYear当前的领取年龄
		if(thisGender == '女') {
			if(age < 51 && age >= 0) {
				paynum = 6;//0-50
			} else if(age < 56) {
				paynum = 5;//51-55
			} else if(age < 61) {
				paynum = 4;// 56-60
			} else if(age < 66) {
				paynum = 3;// 61-65
			} else if(age < 68) {
				paynum = 2;// 66-67
			} else if(age < 70) {
				paynum = 1;// 68-69
			}
		} else {
			if(age < 51 && age >= 0) {
				paynum = 6;//0-50
			} else if(age < 56) {
				paynum = 5;	//0-55
			} else if(age < 61) {
				paynum = 4;	// 56-60
			} else if(age < 66) {
				paynum = 3;	// 61-65
			} else if(age < 68) {
				paynum = 2;// 66-67
			} else if(age < 70) {
				paynum = 1;// 68-69
			}
		}
		thispaydur = $('.paydur_1000003').val().replace(/年交/, ''); //选中的值
		var allage = parseInt(insureAge) + parseInt(thispaydur);
		if(thispaydur == '1' || thispaydur == '3' || allage >= 70) {
			addfu = 0;
		} else {
			addfu = 1;
		}
	}else if(inscode == '2000015') {
		// 昆仑健康爱无忧C款
		exempt = 0;
		if(age > 60) {
			paynum = 1;
		} else if(age > 55) {
			paynum = 2;
		} else if(age > 50) {
			paynum = 3;
		} else if(age > 40) {
			paynum = 5;
		} else {
			paynum = 6;
		}
	}else if(inscode == '2000016') {
		// 瑞泰乐享安康
		exempt = 1;
		if(age > 70) {
			paynum = 1;
		} else if(age > 65) {
			paynum = 1;
		} else if(age > 60) {
			paynum = 3;
		} else if(age > 50) {
			paynum = 4;
		} else {
			paynum = 5;
		}
	} else if(inscode == '3000011') {
		// 中韩保驾护航2019
		exempt = 1;
		addfu = 2;
		thisoption = ''; //保险期间
		if(age < 56) {
			if(age > 50) {
				thisoption = '<option>至80岁</option>';
			} else if(age <= 50) {
				thisoption = '<option>30年</option><option>至70岁</option><option>至80岁</option>';
			};
			$('.paydur_3000011').parents('.additionalView').find('.insurDur').html(thisoption);
		};
	}else if(inscode == '1000004') {
		addfu = 2;
		exempt = 1;
		// 君康颐养金生
		payYears = $('#getYear0').html();
		var thispay = $('.paydur_1000004').val().replace(/年交/, '');
		thisGender = $('.insuredGender em.on').text(); //性别
		var term = $('#getYear0');
		if(parseInt(age) + parseInt(thispay) > 70) {
			term.html('<option>70</option>');
			$('.paydur_1000004').html('1年交');
		} else if(parseInt(age) + parseInt(thispay) > 65) {
			term.html('<option>70</option>');
		} else if(parseInt(age) + parseInt(thispay) > 60) {
			term.html('<option>65</option><option>70</option>');
		} else if(parseInt(age) + parseInt(thispay) > 55) {
			term.html('<option>60</option><option>65</option><option>70</option>');
		} else {
			if(thisGender == '男') {
				term.html('<option>60</option><option>65</option><option>70</option>');
			}else{
				term.html('<option>55</option><option>60</option><option>65</option><option>70</option>');
			};
		};
		//领取年龄来判断缴费期间的个数
		var draw = $('#getYear0 option:selected').text();
		var arrNum = [];
		switch(draw) {
			case '55':
				arrNum = [50, 45, 40, 35];
				break;
			case '60':
				arrNum = [55, 50, 45, 40];
				break;
			case '65':
				arrNum = [60, 55, 50, 45];
				break;
			default:
				arrNum = [65, 60, 55, 50];
		};
		if(age > arrNum[0]) {
			paynum = 1;
		} else if(age > arrNum[1]) {
			paynum = 3;
		} else if(age > arrNum[2]) {
			paynum = 4;
		} else if(age > arrNum[3]) {
			paynum = 5;
		} else {
			paynum = 6;
		};
	}
}