 window.onload = function(){
    borrowSwitch();
}


function borrowSwitch(){
    var oMoney=id('money');
    var aSpan=oMoney.getElementsByTagName('span');
    var application = id('application');
    var aLi = application.getElementsByTagName('li');
    var aDiv = application.getElementsByTagName('div');
    var aInput = application.getElementsByTagName('input');

   for(var i=0;i<aSpan.length;i++){
        //aSpan[i].index = i;
        aSpan[i].onclick = function(){ //添加类
            for(var i=0;i<aSpan.length;i++){
                aSpan[i].className = '';
            };
            this.className = 'active';
        }
    }

   aInput[0].onclick = function(){
        aLi[0].className = 'none';
        aLi[1].className = 'active';
        addClass(application,'back');
        setTimeout(function(){
            aDiv[0].style.display = 'none';
        }, 300);
    };

    /*A.onclick = function(){
        aDiv[0].style.display = 'block';
        removeClass(application,'back');
    };*/

    for(var i=0;i<aLi.length;i++){
        aLi[i].index = i;
        aLi[i].onclick = function(){
            for(var i=0;i<aLi.length;i++){
                aLi[i].className = '';
            }
             this.className='active';
            if(this.index==0){
                aDiv[0].style.display = 'block';
                removeClass(application,'back');
            }else if(this.index==1){
                addClass(application,'back');
                setTimeout(function(){
                    aDiv[0].style.display = 'none';
                }, 300);
            }
        }
    }
    aInput[1].onclick = function(){
        layer.confirm('您还未完成认证资料，请先填写资料', {
          btn: ['确定','取消'] //按钮
        }, function(){
          window.location.href="./PersonalInformation.html"
        }, function(){});
    }


};
