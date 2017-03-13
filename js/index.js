window.onload = function(){
    //调用导航滚动效果
  /*  window.onscroll = function(){
        isNavShow('bg_white');
    }*/


    /* 首页banner */
    bannerChange();
    window.onresize = function(){
        bannerChange();
        toResize();
    };
    //执行登录注册切换效果;
    //switchLoginReg();

    //banner自动轮播
    //bannerLunBo();


/*    function isNavShow(className){//导航滚动效果
        var oHead = id('header-wrap');
        if(getTop()>100){
            addClass(oHead,'bg_white');
        }else{
            removeClass(oHead,'bg_white')
        };
    };*/

    /*执行小广告*/
      Advertisement();

}

 function bannerChange(){//首页banner 以及dody宽度控制;
        var oBanner = id('banner-wrap');
        var viewW  = view().w;
        var viewH = view().h;
        if(viewW<=1200){
            viewW = 1200;
        }else{
            viewW  = view().w;
        }

        if(viewH<=800){
           viewH = 800;
        }else{
           viewH = view().h;
        }
        oBanner.style.width = viewW +'px';
        document.body.style.width = viewW+'px';
        oBanner.style.height = viewH +'px';
    }

    //登录注册切换效果;
    function switchLoginReg(){
        var oBtn  = id('switch');
        var oReg = id('reg-wrap');
        var oLogin = id('login-wrap');
        var rH = oReg.offsetHeight+2;
        var lH = oLogin.offsetHeight;
        var flag = true;

        oReg.style.height = rH+'px';
        oLogin.style.height = 0;
        oLogin.style.display = 'none';
        oBtn.onclick = function(){
            if(flag){
               oLogin.style.display = 'block';//登录显示
               startMove(oLogin,{height:lH,top:0});//执行登录动画
               startMove(oReg,{height:0,top:lH},function(){//执行注册动画
                    this.style.display = 'none';
                    this.style.top = 0;
                });
               id('switch').innerHTML = '注册';
                flag = false;
            }else{
                oReg.style.display = 'block';//注册显示
                startMove(oReg,{height:rH,top:0});//执行注册动画
                startMove(oLogin,{height:0,top:rH},function(){//执行登录动画
                     this.style.display = 'none';
                     this.style.top = 0;
                 });
                id('switch').innerHTML = '登录';
                flag = true;
            };
        };
    };

    //banner部分可视区域缩放
     function toResize(){
       var clientWidth = view().w;
       var DragWarp = id('Drag-wrap');
       var oUl = DragWarp.getElementsByTagName('ul')[0];
       var oDiv = oUl.getElementsByTagName('div');
       var divWidth = oDiv[0].offsetWidth;
       for(var i=0;i<oDiv.length;i++){
          oDiv[i].style.left = -(divWidth-clientWidth)/2+'px';
       };
    };

    /*小广告*/
    function Advertisement(){
      var obj = id('Advertisement-fixed');
      var aA = obj.getElementsByTagName('a');
      obj.style.left = -view().w+'px';
      aA[1].style.cssText = 'display:none;right:0;'

      if(!getCookie('Advertisement')){
        setCookie('Advertisement','show',1)//每天一进来自动出来访问小广告一次
        startMove(obj,{left:0});
      }else{
        aA[1].style.display = 'block';
        aA[1].style.right = -aA[1].offsetWidth+'px';
      }

      aA[0].onclick = function(){//关闭广告
         startMove(obj,{left:-view().w},function(){
          aA[1].style.display = 'block';
          startMove(aA[1],{right:-aA[1].offsetWidth})
         });
      }
      aA[1].onclick = function(){//打开广告
        startMove(aA[1],{right:0},function(){
          aA[1].style.display = 'none';
          startMove(obj,{left:0});
        })
      }



    }
