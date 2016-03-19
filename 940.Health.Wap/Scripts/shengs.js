(function () {
    // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
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

    // Swiper
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        // 4到1
        loop: true,
        centeredSlides: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
    });

    // Processes-bgcolor
    var colorArry=['rgb(152, 156, 242)','rgb(75, 191, 236)','rgb(80, 213, 154)','rgb(76, 204, 216)','rgb(75, 189, 236)','rgb(152, 156, 242)'];
    alert(colorArry[0]);
    $(".processes-explain ul li").on("mouseenter", function () {
        var intext=$(this).index();
       var d=intext;
        $(".processes-cont").css("background",colorArry[d]);
    });
   /* $(".processes-color1").on("mouseenter", function() {
        $(".processes-cont").css("background", "rgb(152, 156, 242)");
    });
    $(".processes-color2").on("mouseenter", function() {
        $(".processes-cont").css("background", "rgb(75, 191, 236)");
    });
    $(".processes-color3").on("mouseenter", function() {
        $(".processes-cont").css("background", "rgb(80, 213, 154)");
    });
    $(".processes-color4").on("mouseenter", function() {
        $(".processes-cont").css("background", "rgb(76, 204, 216)");
    });
    $(".processes-color5").on("mouseenter", function() {
        $(".processes-cont").css("background", "rgb(75, 189, 236)");
    });
    $(".processes-color6").on("mouseenter", function() {
        $(".processes-cont").css("background", "rgb(152, 156, 242)");
    });*/

    // shop
    var LanMu = $(".shop-list");
    var lanMuSun = LanMu.children('li');
    if ((lanMuSun.size()) > 5) {
        LanMu.children("li:gt(3)").hide();
        $(".listmore").show();
    }
    $(".listmore").bind("click", function() {
        if (!$(".listmore").hasClass('ListMoreOn')) {
            $(".listmore").addClass('ListMoreOn');
            LanMu.children("li:gt(3)").slideDown();
            $(".s-xguide-down").css("background-image","url('Content/images/940/s-xguide-up.png')");

        } else {
            $(".listmore").removeClass('ListMoreOn');
            LanMu.children("li:gt(3)").slideUp();
            $(".s-xguide-down").css("background-image","url('Content/images/940/s-xguide-down.png')");
        }
    });

    // successes
    var LanMt = $(".successes-list");
    var lanMtSun = LanMt.children('li');
    if ((lanMtSun.size()) > 5) {
        LanMt.children("li:gt(3)").hide();
        $(".listmoru").show();
    }
    $(".listmoru").bind("click", function() {
        if (!$(".listmoru").hasClass('listmoruOn')) {
            $(".listmoru").addClass('listmoruOn');
            LanMt.children("li:gt(3)").slideDown();
            $(".s-xguide-down2").css("background-image","url('Content/images/940/s-xguide-up.png')");

        } else {
            $(".listmoru").removeClass('listmoruOn');
            LanMt.children("li:gt(3)").slideUp();
            $(".s-xguide-down2").css("background-image","url('Content/images/940/s-xguide-down.png')");
        }
    });

});