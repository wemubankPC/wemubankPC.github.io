/* window.onload = function(){
    switchWork()
}
*/

function switchWork(){//工作信息切换
	var oSwitch=id('switch-wrap');
    var aLabel=oSwitch.getElementsByTagName('label');
    var aWorkInformation = id('workInformation');
    var aDiv = aWorkInformation.getElementsByTagName('div');
    for(var i=0;i<aLabel.length;i++){
    	aLabel[i].index = i;
    	aLabel[i].onchange = function(){
    		for(var i=0;i<aLabel.length;i++){
    			if(aLabel[i].children[0].checked == true){
    				aDiv[2].style.display = 'block';
    				aDiv[2].style.opacity = 0;
    				startMove(aDiv[2],{left:0,opacity:100});
    				startMove(aDiv[1],{left:-620,opacity:0},function(){
    					aDiv[1].style.display = 'none';
    				});
    			}else{
    				aDiv[1].style.display = 'block';
    				aDiv[1].style.opacity = 0;
    				startMove(aDiv[1],{left:0,opacity:100});
    				startMove(aDiv[2],{left:620,opacity:0},function(){
    					aDiv[2].style.display = 'none';
    				});
    			}
    		}
    	}
    }
}

function confirmMoney(){//显示弹框以及切换额度确认与等待审核
	var ConfirmMoney = id('ConfirmMoney');
	var aDiv = ConfirmMoney.getElementsByTagName('div');
	var aInput = ConfirmMoney.getElementsByTagName('input');
	var Complete = id('Complete');

	Complete.onclick = function(){
		id('Bombbox-wrap').style.cssText = 'display:block;opacity:0';
		startMove(id('Bombbox-wrap'),{opacity:100});
	}

	aInput[0].onclick = function(){//切换确认额度和等待审核
		aDiv[0].style.display = 'none';
		aDiv[1].style.cssText='display:block;opacity:0;';
		startMove(aDiv[1],{opacity:100});
	};

	aInput[1].onclick = function(){//前往个人中心页面
		/*startMove(id('Bombbox-wrap'),{opacity:0},function(){
			id('Bombbox-wrap').style.display = 'none';
			aDiv[0].style.display = 'block';
			aDiv[1].style.display = 'none';
		});*/
		window.location.href = './myAccount.html';
	};

	id('close').onclick = function(){//前往个人中心页面
		startMove(id('Bombbox-wrap'),{opacity:0},function(){
            this.style.display = 'none';
        });
	}
}



$(function(){
    //滚动插件
    (function($){
    $.fn.extend({
        Scroll:function(opt,callback){
            //参数初始化
            if(!opt) var opt={};
            var _this=this.eq(0).find("table:first");
            var lineH=_this.find("tr:first").height(), //获取行高
            line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),
            speed=opt.speed?parseInt(opt.speed,10):5000, //卷动速度，数值越大，速度越慢（毫秒）
            timer=opt.timer?parseInt(opt.timer,10):5000; //滚动的时间间隔（毫秒）
            if(line==0) line=1;
            var upHeight=0-line*lineH;
            //滚动函数
            scrollUp=function(){
                _this.animate({
                    marginTop:upHeight
                },speed,function(){
                    for(i=1;i<=line;i++){
                        _this.find("tr:first").appendTo(_this);
                    }
                    _this.css({marginTop:0});
                });
            }
            //鼠标事件绑定
            _this.hover(function(){
                clearInterval(timerID);
            },function(){
                timerID=setInterval("scrollUp()",timer);
            }).mouseout();
        }        
    })
    })(jQuery);
    $(document).ready(function(){
        $("#scrollDiv").Scroll({line:1,speed:500,timer:1000});
    }); 
});
