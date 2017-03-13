
$(function(){
   /* placeholder 信息提示 兼容js*/
  (function(){
      if(!!window.ActiveXObject || "ActiveXObject" in window) {
            $(".int-wrap .placeholder").css('display', 'block');
            $(".int-wrap .int").focus(function(event) {
                $(this).siblings('.placeholder').hide();
            }).blur(function(event) {
                if(!$(this).val()){
                    $(this).siblings('.placeholder').show();
                };
            });
            $('.placeholder-wrap').click(function(event) {
                $(this).children('.int-wrap .int').focus();
            });
        }else{
            $(".int-wrap .int").each(function(index,el) {
                var values = $(el).siblings('.placeholder').html();
                $(el).siblings('.placeholder').css('display', 'none');
                $(el).attr({placeholder:values})
            });
        };
  })();

  /*首页slidetoggle*/
  slidetoggle()
})


function id(obj) {
    return document.getElementById(obj);
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

//获取scrollTop
function getTop()
{
	return document.documentElement.scrollTop || document.body.scrollTop;
}

//设置scrollTop
function setTop(iTop)
{
	document.documentElement.scrollTop = document.body.scrollTop = iTop;
}

function pzMove(obj,iTarget){  //弹性运动height++ or height--

    obj.iSpeed = 0;
    obj.iNow = 0;

    var num = 4;

    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        if( obj.offsetWidth < iTarget ){
            num = 4;
        }
        else if(obj.offsetWidth > iTarget){
            num = -4;
        }

        obj.iSpeed += num;

        var H = obj.offsetWidth + obj.iSpeed;

        if( (H > iTarget && num > 0) || (H < iTarget && num < 0) ){

            obj.iNow++;

            H = iTarget;
            obj.iSpeed *= -1;
            obj.iSpeed *= 0.33;

            if(obj.iNow==2){
                clearInterval(obj.timer);
            }
        }
        else{

            obj.iNow = 0;
        }

        obj.style.width = H + 'px';

    },30);
}

function bind(obj, ev, fn) { //绑定事件
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}



function autoPlay(obj){
	var num = 60;
	var timer = null;
	clearInterval(timer);
	$(obj).unbind('click');
	timer = setInterval(function (){
		num--;
		if (num<=0) {
			num = 60;
			$(obj).bind('click', autoPlay);
			$(obj).text('重新获取验证码');
			$(obj).removeAttr("disabled");
			clearInterval(timer);
		}else{
			$(obj).text(num+'s，后重新获取');
		}
	}, 1000);
};

function setCookie(key,value,t){//封装设置cookie
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + t);
    document.cookie = key+'='+encodeURI(value)+';expires='+oDate.toGMTString();
};

function getCookie(key){ //封装获取cookie
    arr1 = document.cookie.split('; ');
    for(var i=0;i<arr1.length;i++){
        arr2 = arr1[i].split('=');
        if(arr2[0] == key){
            return decodeURI(arr2[1]);
        };
    };
};


/* 返回顶部 */
	window.onscroll = function(){
		scrollTop()
	};



	function scrollTop(){
		if(getTop()>view().h/2){
			id('scrollBack').style.display = 'block';
		}else{
			id('scrollBack').style.display = 'none';
			id('scrollBack').onclick = function(){
				var obj = document.documentElement.body || document.body;
				setTop(0);
			};
		};
		//调用导航滚动效果
		var oHead = id('header-wrap');
        if(getTop()>100){
            addClass(oHead,'bg_white');
        }else{
            removeClass(oHead,'bg_white');
        };
	}
    /*鼠标以上图片显示*/
    function certificate(){
        var Acertificate = id('certificate');
        var aImg = Acertificate.getElementsByTagName('img');
        console.log(Acertificate)
        for(var i=0;i<aImg.length;i++){
            aImg[i].index = i;
            aImg[i].onmouseover = function(){
                for(var i=0;i<aImg.length;i++){
                    aImg[i].src= './images/certificate'+(i+1)+'.png';
                }
                this.src = './images/certificate_'+(this.index+1)+'.png'
            }
             aImg[i].onmouseout = function(){
                for(var i=0;i<aImg.length;i++){
                    aImg[i].src= './images/certificate'+(i+1)+'.png';
                }
             }
        }
    }
    /*首页slidetoggle*/
    function slidetoggle(){
        $('.header-wrap .nav li').hover(function() {
            $(this).find('.slideToggle').fadeIn(200)
        }, function() {
             $(this).find('.slideToggle').fadeOut(200);
        });
    }

function bannerLunBo(){//轮播banner部分
    var DragWarp = id('Drag-wrap');
    var oUl = DragWarp.getElementsByTagName('ul')[0];
    var oDiv = oUl.getElementsByTagName('div');
    var aUlLi = oUl.getElementsByTagName('li');
    var oOl = DragWarp.getElementsByTagName('ol')[0];
    var aOlLi = oOl.getElementsByTagName('li') ;
    var len = aUlLi.length;
    var bannerW = view().w;
    var timer = null;
    var iNum = 0;
    var iNum1 = 0;

    oUl.style.width = bannerW*len+'px';//设置ul总长
    for(var i=0;i<len;i++){
        //创建ol li
        var oli = document.createElement('li');
        if(i==0){oli.className = 'active'}
        oOl.appendChild(oli);
        aOlLi[i].index = i;
        aUlLi[i].style.width = bannerW+'px';
        aOlLi[i].onclick = function(){
            iNum = this.index;
            for(var i=0;i<len;i++){
                aOlLi[i].className = '';
            };
            this.className = 'active';
            startMove(oUl,{left:-iNum*bannerW});
            iNum1 = iNum;
        };
    };

    DragWarp.onmouseover = function(){
        clearInterval(timer);
    }

    DragWarp.onmouseout = function(){
        clearInterval(timer);
        timer = setInterval(autoPlay, 3000);
    }

    timer = setInterval(autoPlay, 3000);//无缝滚动

    function autoPlay(){

        if(iNum>=len-1){
            aUlLi[0].style.position = 'relative';
            aUlLi[0].style.left = len*bannerW+'px';
            iNum = 0;
        }else{
            iNum++;
        }
        for(var i=0;i<len;i++){
            aOlLi[i].className = '';
        };
        aOlLi[iNum].className = 'active';
        iNum1++;
        startMove(oUl,{left:-iNum1*bannerW},function(){
            if(iNum == 0){
                aUlLi[0].style.position = 'static';
                oUl.style.left = 0;
                iNum1=0;
            };
        });
    };
};

    
