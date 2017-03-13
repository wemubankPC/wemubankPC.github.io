$(function(){
    /* 注册验证 */
    $('#mobile,#mobileCode,#regpassword').blur(function(event) {
        $(this).parent('label').removeClass('active');
        if($(this).val()==''){
            if($(this).attr('id')=='mobile'){
                layer.tips('请输入电话', $(this),{tips: [2, '#a4d4e8']});
            }else if($(this).attr('id')=='mobileCode'){
                layer.tips('请输电话验证码', $(this),{tips: [2, '#a4d4e8']});
            }else if($(this).attr('id')=='regpassword'){
                layer.tips('请输注册密码', $(this),{tips: [2, '#a4d4e8']});
            }
        };
    }).focus(function(event) {
       $(this).parent('label').addClass('active');
    });



   (function(){//点击获取验证码
        $('#VerificationCode').click(function(event) {  
            autoPlay($(this));
        });
    })();

    /*协议是否选中*/
   (function(){
      var falg = true;
      $('.Agreement').click(function(event) {
          if(falg){
              $(this).removeClass('checked');
              $('.form-wrap .btn').css('cursor', 'not-allowed').attr('disabled', false);
               falg = false;
          }else{
              $(this).addClass('checked');
              $('.form-wrap .btn').css('cursor', 'pointer').attr('disabled', true);
              falg = true;
          }
      });
   })()


    


})


