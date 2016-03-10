$(function () {

    // flexslider
    $('.flexslider').flexslider({
        slideshowSpeed: 4000,  // 自动播放速度毫秒
        pauseOnAction: false,  // 高度推荐
        pauseOnHover: true,    // 鼠标滑向滚动内容时，是否暂停滚动
        directionNav: false    // 是否显示左右方向箭头按钮
    });

    // 火箭
     $(".enrolled-arrow").on("mouseenter", function(){
        $(".enrolled-btn").css("background", "#FFC10A url('content/images/tuiguang/enrolled-btn.png') no-repeat center center");
    });
    $(".enrolled-arrow").on("mouseleave", function(){
        $(".enrolled-btn").css("background", "");
    });

    /*$(".enrolled-arrow").mouseenter(function(){
        $(".enrolled-btn").css("background", "#FFC10A url('content/images/tuiguang/enrolled-btn.png') no-repeat center center");
    });
    $(".enrolled-arrow").mouseleave(function(){
        $(".enrolled-btn").css("background", "");
    });*/

});