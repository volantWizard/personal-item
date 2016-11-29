$(document).ready(function(){
	//验证昵称
	$('#nick').focus();
	$('#nick_bg').addClass('bg-focus');
	$('.box-1 .info').css('display','block');
	$('#nick').on('focus',function (){
		$('#nick_info').removeClass('error');
	})
	
	//当获取焦点的时候--全部的都添加.bg-focus
	$('.bg-text .new_txt').on('focus',function (ev){
	    $(this).parent().addClass('bg-focus');
	    $(this).parents('#ipt_box').next().css('display','block');
	})
	
	//#nick的input 输入的时候
	$('#nick').on('input',function (){
	    $('#nick_info').html('昵称不可以为空');
	    $('.box-1 .info').css('display','block');
	});
	
	//#nick的input 失去焦点的时候
	$('#nick').on('blur',function (){
	    if (!!$('#nick').val()) {
	    	//有内容
	    	$('#nick_info').html('');
	    	$('#nick_info').addClass('ok').removeClass('error');
	    	$('#nick_bg').removeClass('bg-focus').removeClass('error');
	    }else {
	    	//没内容
	    	$('#nick_info').html('昵称不可以为空').addClass('error').removeClass('ok');
	    	$('#nick_bg').removeClass('bg-focus').addClass('error');
	    }
	})
	
	
	//验证密码
	//#password_bg的input 输入的时候
    
	$('#password').on('input',function (){
		var val = $('#password').val(),
    		num = val.length,
    		reg = /\s+/g,
    		regNum = /^\d{0,8}$/g;
    	console.log(val);
	    if (6<= num && num <=16) {
	    	//添加ok
	    	$('#pwd_tip1').addClass('yes').removeClass('no');
	    }else {
	    	$('#pwd_tip1').removeClass('yes').addClass('no');
	    }
	    if (!reg.test(val)) {
	    	$('#pwd_tip2').addClass('yes').removeClass('no');
	    } else{
	    	$('#pwd_tip2').removeClass('yes').addClass('no');
	    }
	   	if (regNum.test(val)) {
	   		$('#pwd_tip3').removeClass('yes').addClass('no');
	   	} else{
	   		$('#pwd_tip3').addClass('yes').removeClass('no');
	   	}
	});
	
	//获取焦点时
	$('#password').on('focus',function (){
	    $('#pwd-tips').removeClass('hide').addClass('pwd_tips');
	    $('#pwd_result').addClass('hide');
	})
	//#password_bg的input 失去焦点的时候,验证强度
	$('#password').on('blur',function (){
		
		//如果有3个yes就可以关闭pwd_tips
		
	    if (countYes()===3) {
	    	//去掉父级的被选中
	    	$(this).parent().removeClass('bg-focus').removeClass('error');
	    	
	    	$('#pwd-tips').addClass('hide').removeClass('pwd_tips');
	    	$('#pwd_result').removeClass('hide');
		    //判断密码的强弱
		    var val = $('#password').val(),
		    	reg = /^\d{9,}$|(^[A-Za-z]{9,}$)/g,
		    	reg0 = /\d+/g,
		    	reg1 = /[A-Za-z]+/g,
		    	reg2 = /((?=[\x21-\x7e]+)[^A-Za-z0-9])+/g;
//		    	console.log(reg0.test(val) , reg1.test(val) , reg2.test(val));
		    //low全为数字
		    if (reg.test(val)) {
		    	console.log(1);
		    	$('#password_pic').attr("class","").addClass('rankLow').html('弱');
		    	$('#password_info').html('试试字母、数字、标点的组合吧');
		    }else if (reg0.test(val) && reg1.test(val)) {
		    	console.log(2);
		    	$('#password_pic').attr("class","").addClass('rankMiddle').html('中等');
		    	$('#password_info').html('复杂度还行，在加强下等级？');
		    }else if (reg0.test(val) && reg1.test(val) && reg2.test(val)) {
		    	console.log(3);
		    	$('#password_pic').attr('class','').addClass('rankHigh').html('强');
		    	$('#password_info').html('密码强度好，请记牢！');
		    }	
	    }else {
	    	//去掉父级的标鸿
	    	$(this).parent().removeClass('bg-focus').addClass('error');
	    }
	    
	});
	
	//确认密码
	$('#password-again').on('input',function (){
	    var pa = $(this).val(),
	    	val = $('#password').val();
	    if (!val.match(pa)) {
	    	$('#password_again_info').addClass('error').removeClass('ok').html('密码不一致');
	    }else {
	    	$('#password_again_info').removeClass('error').removeClass('ok').html('请输入密码');
	    }
	});
	
	//失去焦点时
	$('#password-again').on('blur',function (){
	    $(this).parent().removeClass('bg-focus');
	    
	    var pa = $(this).val(),
	    	val = $('#password').val();
	    if (pa === val && pa !== '') {
	    	$('#password_again_info').addClass('ok').removeClass('error').html('');
	    	$(this).parent().addClass('bg-focus').removeClass('error');
	    }else {
	    	$('#password_again_info').addClass('error').removeClass('ok');
	    	$(this).parent().removeClass('bg-focus').addClass('error');
	    }
	});
	
	//点击 agree
	
	$('#agree').on('click',function (ev){
		ev.stopPropagation();
	    if ($(this).hasClass('checked')) {
	    	$(this).removeClass('checked').addClass('unchecked');
	    	//注册按钮
	    	$("#submit").prop("disabled", true).addClass('disabled');
	    }else {
	    	$(this).removeClass('unchecked').addClass('checked');
	    	$("#submit").prop("disabled", false).removeClass('disabled');
	    }
	})
	
	//提交注册
	$('#submit').on('click',function (){
	    //模拟发送post请求，存放到本地
	    //当满足下面条件才能注册
	    if ($('#nick_info').hasClass('ok') && $('#password_again_info').hasClass('ok') && countYes()===3) {
		    var userName =  $('#nick').val();
		    //获取storage数据,比对是否重复
		    var stroData = localStorage.getItem(userName);
		    if (!!stroData) {
		    	$('.alert-tip').html('该用户已被占用,请重新输入').animate(
		    		{top:0},'slow',function (){
		    		    setTimeout(function (){
		    		        $('.alert-tip').animate({top:-50},'slow');
		    		    },1000);
		    		}
		    	);
		    }else {
		    	//没被占用
		    	var uuid = new Date().getTime();
		    	var defaultData = 
			    	[
						{
							id:0,
							pid:-1,
							title:"微云",
							type:"file",
							lastModified:uuid
						},
						{
							id:1,
							pid:0,
							title:"文档",
							type:"file",
							lastModified:uuid
						},
						{
							id:2,
							pid:0,
							title:"视频",
							type:"file",
							lastModified:uuid
						},
						{
							id:3,
							pid:0,
							title:"音乐",
							type:"file",
							lastModified:uuid
						},
						{
							id:4,
							pid:0,
							title:"图片",
							type:"file",
							lastModified:uuid
						}
						
					];
				var jsonObj = 
			    {
			    	'password':$('#password').val(),
			    	'data':JSON.stringify(defaultData)
			    };
			    var data = JSON.stringify(jsonObj);
			    //存储数据
			    localStorage.setItem(userName,data);
		    	$('.alert-tip').html('恭喜您，注册成功！').animate(
		    		{top:0},'slow',function (){
		    		    setTimeout(function (){
		    		        $('.alert-tip').animate({top:-50},'slow');
		    		        $('#login').removeClass('ry-90');
							$('#register').removeClass('ry-0');
		    		    },1000);
		    		}
		    	);
		    }
	    }else {
	    	$('.alert-tip').html('不符合规则,继续填写').animate(
		    		{top:0},'slow',function (){
		    		    setTimeout(function (){
		    		        $('.alert-tip').animate({top:-50},'slow');
		    		    },1000);
		    		}
	    	);
	    }
	});
	function countYes(){
	    var count = 0 ;
	    console.log(222,$('.pwd_tips .default'));
	    $('.default').each(function (){
	    	console.log($(this));
	        if($(this).hasClass('yes')){
	        	count++;
	        	return true;
	        }
	    })
	    return count;
	}
});