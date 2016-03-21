(function() {
    // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
    document.addEventListener('DOMContentLoaded', function() {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        if (windowWidth >= 540) {
            windowWidth = 540;
        }
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
       /* loop: true,*/
        centeredSlides: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
    });

    // Processes-bgcolor
    var colorArry = ['rgb(152, 156, 242)','rgb(75, 191, 236)','rgb(80, 213, 154)','rgb(76, 204, 216)','rgb(75, 189, 236)','rgb(152, 156, 242)'];
    $(".processes-explain ul li").on("click", function() {
        var incolor = $(this).index();
        var clr = incolor;
        $(".processes-cont").css("background", colorArry[clr]);
    });
    $('.processes-explain ul li').click(function() {
        $('.processes-explain ul li').removeClass('processes-hit');
        $(this).addClass('processes-hit');
    });

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
            $(".s-xguide-down").css("background-image","url('content/images/940/s-xguide-up.png')");

        } else {
            $(".listmore").removeClass('ListMoreOn');
            LanMu.children("li:gt(3)").slideUp();
            $(".s-xguide-down").css("background-image","url('content/images/940/s-xguide-down.png')");
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
            $(".s-xguide-down2").css("background-image","url('content/images/940/s-xguide-up.png')");

        } else {
            $(".listmoru").removeClass('listmoruOn');
            LanMt.children("li:gt(3)").slideUp();
            $(".s-xguide-down2").css("background-image","url('content/images/940/s-xguide-down.png')");
        }
    });

    // ajax
/*    var param = $.param({
        ClubId: 1
    });
    $.ajax({
        url: "http://api.damays.com/club/GetShopProductByClubForGroup",
        data: param,
        cache: false,
        type: 'Post',
        dataType: 'json',
        processData: false,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(data) {
            if (data && data.Response && data.Response.ErrorCode == 0) {
                var list = $('.free-closure');
                if (data.Response.Result && data.Response.Result.length > 0) {
                    list.html("");
                    var content = "";
                    for (var i = 0; i < data.Response.Result.length; i++) {
                        var item = data.Response.Result[i];
                        content = "";
                        if (i % 2 == 0) {
                            content += "<dl class=\"free-dl free-cont1\">";
                        } else {
                            content += "<dl class=\"free-dl free-cont2\">";
                        }

                        content += "<dt class=\"free-dt1\">";
                        content += "<a href=\"###\"><img src=\"" + item.Photo + "\"></a>";
                        content += "</dt>";
                        content += "<dd class=\"free-big\"><span>三步&mdash;&mdash;快速抠出头发丝的技巧</span></dd>";
                        content += "<dd class=\"free-small\">";
                        content += "<div class=\"free-date\">发布：2016-02-04</div>";
                        content += "<div class=\"free-watch\"><i></i><span>19845</span></div>";
                        content += "</dd>";
                        content += "</dl>";

                        list.append(content);
                    }
                } else {
                    $(".list_empty").show();
                }
            }
        }
    });*/

});