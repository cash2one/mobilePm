(function() {
    // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
    document.addEventListener('DOMContentLoaded', function() {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
/*        if (windowWidth >= 540) {
            windowWidth = 540;
        }*/
        html.style.fontSize = windowWidth / 6.4 + 'px';
    }, false);
})();

$(function() {
    // 不能加高度，要不然中间区域跟随不到底部：style="padding-bottom: 1.13rem;"
    if ($("footer").length > 0) {
        $("footer").prev("div").css({
            "padding-bottom": "1.13rem"
        });
    }

    // 左侧栏菜单
    var slideout = new Slideout({
        'panel': document.getElementById('main'),
        'menu': document.getElementById('menu'),
        'padding': 5,
        'tolerance': 70,
        'touch': false     //禁用触摸滑动
    });
    document.querySelector('.js-slideout-toggle').addEventListener('click', function() {
        slideout.toggle();
    });
    document.querySelector('.menu').addEventListener('click', function(eve) {
        if (eve.target.nodeName === 'A') {
            slideout.close();
        }
    });
    function aload(t) {
        "use strict";
        t = t || window.document.querySelectorAll("[data-aload]"), void 0 === t.length && (t = [t]);
        var a, e = 0,
            r = t.length;
        for (e; r > e; e += 1) a = t[e], a["LINK" !== a.tagName ? "src" : "href"] = a.getAttribute("data-aload"), a.removeAttribute("data-aload");
        return t;
    }

    // login
    // 滑入效果
    $(".login-animation p").eq(0).animate({"left":"0%"}, 600);
    $(".login-animation p").eq(1).animate({"left":"0%"}, 400);

    // 登陆表单验证
    $(".login-form").validate({
        rules:{
            username:{
                required:true,  // 必填
                minlength:6,    // 最少6个字符
                maxlength:20,   // 最多20个字符
            },
            password:{
                required:true,
                minlength:6,
                maxlength:20,
            },
        },
        // 错误信息提示
        messages:{
            username:{
                required:"必须填写用户名",
                minlength:"用户名至少为6个字符",
                maxlength:"用户名至多为20个字符",
                remote: "用户名已存在",
            },
            password:{
                required:"必须填写密码",
                minlength:"密码至少为6个字符",
                maxlength:"密码至多为20个字符",
            },
        },

    });
    // 注册表单验证
    $("#registerForm").validate({
        rules:{
            username:{
                required:true,  // 必填
                minlength:3,    // 最少6个字符
                maxlength:32,   // 最多20个字符
                remote:{
                    url:"http://kouss.com/demo/Sharelink/remote.json",  // 用户名重复检查，别跨域调用
                    type:"post",
                },
            },
            password:{
                required:true,
                minlength:3,
                maxlength:32,
            },
            email:{
                required:true,
                email:true,
            },
            confirm_password:{
                required:true,
                minlength:3,
                equalTo:'.password'
            },
            phone_number:{
                required:true,
                phone_number:true,  // 自定义的规则
                digits:true,        // 整数
            }
        },
        // 错误信息提示
        messages:{
            username:{
                required:"必须填写用户名",
                minlength:"用户名至少为3个字符",
                maxlength:"用户名至多为32个字符",
                remote: "用户名已存在",
            },
            password:{
                required:"必须填写密码",
                minlength:"密码至少为3个字符",
                maxlength:"密码至多为32个字符",
            },
            email:{
                required:"请输入邮箱地址",
                email: "请输入正确的email地址"
            },
            confirm_password:{
                required: "请再次输入密码",
                minlength: "确认密码不能少于3个字符",
                equalTo: "两次输入密码不一致",   // 与另一个元素相同
            },
            phone_number:{
                required:"请输入手机号码",
                digits:"请输入正确的手机号码",
            },

        },
    });
    // 添加自定义验证规则
    jQuery.validator.addMethod("phone_number", function(value, element) {
        var length = value.length;
        var phone_number = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
        return this.optional(element) || (length == 11 && phone_number.test(value));
    }, "手机号码格式错误");




});
