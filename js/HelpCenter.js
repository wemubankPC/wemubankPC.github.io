/* window.onload = function(){
    switchWork()
}
*/

function HelpCenterTab(){//tabs以及下拉
    var tabTit = id('tab_title');
    var titLi = tabTit.getElementsByTagName('li');
    var move = id('move');
    var timer = null;
    var tab_list_wrap = id('tab_list_wrap');
    var aUl = tab_list_wrap.getElementsByTagName('ul');
    var flag = true;
    var outLeft = titLi[0].offsetLeft;//记录点击时候的move的 offsetLeft;
    var objLeft = {}//存贮每一个 aLi[i].children[1]的高度;
    for(var i=0;i<titLi.length;i++){
        titLi[i].index = i;
        titLi[i].onclick = function(){
            for(var i=0;i<titLi.length;i++){
                aUl[i].style.display = 'none';
            }
            aUl[this.index].style.display = 'block';
            //slideToggle(aUl[this.index]);
            outLeft = this.offsetLeft;
        }
        titLi[i].onmouseover = function(){
            stratMoveL(move,this.offsetLeft);
        }
        titLi[i].onmouseout = function(){
            stratMoveL(move,outLeft);
        }
    }
    
    for(var i=0;i<aUl.length;i++){//遍历每一个ul
        objLeft[i] = [];
        slideToggle(aUl[i],objLeft[i]);
        if(i!=0){
          aUl[i].style.display = 'none';
        }
    }

    function slideToggle(obj,objLeft){
        var aLi = obj.getElementsByTagName('li');
        var arr = [];

        for(var i=0;i<aLi.length;i++){//遍历每一个li
            arr.push(true);
            aLi[i].index = i;
            objLeft.push(aLi[i].children[1].offsetHeight); 
            aLi[i].onclick = function(){
                if(arr[this.index]){
                    startMove(this.children[1],{height:objLeft[this.index]});
                    addClass(this.children[0],'active');
                    arr[this.index] = false;
                }else{
                    startMove(this.children[1],{height:0});
                    removeClass(this.children[0],'active');
                    arr[this.index] = true;
                }            
            };
            aLi[i].children[1].style.height = 0;
        }
    }

    //console.log(objLeft)


    function stratMoveL(obj,target){ /* 弹性运动 */
        var iSpeed = 0
        clearTimeout(timer);
        timer = setInterval(function(){
            iSpeed+=(target-obj.offsetLeft)/6;
            iSpeed *=0.75;
            if(Math.abs(iSpeed)<=1 && Math.abs(target-obj.offsetLeft)<=1){
                obj.style.left = target + 'px';
                iSpeed = 0;
                clearInterval(timer);
            }else{
                obj.style.left = obj.offsetLeft + iSpeed + 'px';
            };
        }, 30);
    };  
}