(function() {
    // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
    document.addEventListener('DOMContentLoaded', function() {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        // if (windowWidth >= 540) {
        //     windowWidth = 540;
        // }
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
    var colorArry = ['rgb(152, 156, 242)','rgb(75, 191, 236)','rgb(80, 213, 154)','rgb(76, 204, 216)','rgb(75, 189, 236)','rgb(152, 156, 242)'];
    $(".processes-explain ul li").on("mousemove", function() {
        var incolor = $(this).index();
        var clr = incolor;
        $(".processes-cont").css("background", colorArry[clr]);
    });
    // $('.processes-explain ul li').click(function() {
    //     $('.processes-explain ul li').removeClass('processes-hit');
    //     $(this).addClass('processes-hit');
    // });

    // 讲师团队
    $.ajax({
        type: 'get',
        url: 'http://www.940.com/teacherList?page=1&line=6&callback=?',
        dataType: 'jsonp',
        processData: false,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(data) {

            var list = $('.lectuers-teacher1');
            var list1 = $('.lectuers-teacher2');
            if (data.count && data.count > 0) {
                list.html("");
                list1.html("");
                var content = "";
                for (var i = 0; i < data.list.length; i++) {
                    var item = data.list[i];
                    content = "";
                    content += "<dl>";
                    content += "<a href=\"lecturer.html?id="+item.id+"\">";
                    content += "<dt><img src=\"" + item.profileUrl + "\"></dt>";
                    content += "<dd>" + item.name + "</dd>";
                    content += "</a>";
                    content += "</dl>";
console.log(data.list.length);
                    if (i < 3) {
                        list.append(content);
                    } else {
                        list1.append(content);
                    }

                }
            }
        }

    });

    // 免费课程
    /**
    * var o = '{"a":"1","b":"2","c":"3"}';
    * var a = '[{"a":"1","b":"2","c":"3"},{"d":"4","e":"5","f":"6"},{"g":"7","h":"8","i":"9"},{"j":"10","k":"11","l":"12"}]';

    * function parse(json) {
    *     var data = JSON.parse(json);
    *     if (data instanceof Array) {
    *         console.log(data[0].a);
    *     } else if (data instanceof Object) {
    *         console.log(data.a);
    *     }
    * }
    * parse(o);
    * parse(a);
    */

    /**
    * [formatData description]
    * @param  {[type]} r [description]
    * @return {[type]}   [description]
    */
    var o = '{"a":"1","b":"2","c":"3"}';
    var a = '[{"a":"1","b":"2","c":"3"},{"d":"4","e":"5","f":"6"},{"g":"7","h":"8","i":"9"},{"j":"10","k":"11","l":"12"}]';

    function formatData(r) {
        var a = new Array();
        var c = Object.prototype.toString.call(r);
        r = /String/.test(c) ? eval('(' + r +')') : r;
        var d = Object.prototype.toString.call(r);
        // console.log(d);   // [object Object]
        a = /Array/.test(d) ? r : a[0]=r;
        return a;
    }

    $.ajax({
        type: 'get',
        url: 'http://www.940.com/videoList?page=1&line=4&type=2&callback=?',
        dataType: 'jsonp',
        processData: false,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(data) {

            data = formatData(data); // 然后在ajax获取到数据后使用它
/*            if(!(data instanceof Array))
            {
              //line等于1的情况
              //处理成和line>1的情况一样的结构
              data.list=[data.list];
            }*/

            var list = $('.free-closure');
            if (data.count && data.count > 0) {
                list.html("");
                var content = "";
                for (var i = 0; i < data.list.length; i++) {
                    var item = data.list[i];
                    // alert( );
                    content = "";
                    if (i % 2 == 0) {
                        content += "<dl class=\"free-dl free-cont1\">";
                    } else {
                        content += "<dl class=\"free-dl free-cont2\">";
                    }

                    content += "<dt class=\"free-dt1\">";
                    content += "<a href=\"shopDetail.html?id="+item.id+"\"><img src=\"" + item.preview + "\"></a>";
                    content += "</dt>";
                    content += "<dd class=\"free-big\"><span>" + item.title + "</span></dd>";
                    content += "<dd class=\"free-small\">";
                    content += "<div class=\"free-date\">发布:&nbsp" + item.time.substr(0,10) + "</div>";
                    content += "<div class=\"free-watch\"><i></i><span>" + item.click_num + "</span></div>";
                    content += "</dd>";
                    content += "</dl>";

                    list.append(content);
                }
            }

        }

    });

    // 开店技巧
    $.ajax({
        type: 'get',
        url: 'http://www.940.com/articleList?page=1&line=8&type=2&callback=?',
        dataType: 'jsonp',
        processData: false,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(data) {

            data = formatData(data); // 然后在ajax获取到数据后使用它

            var list = $('.shop-list');
            if (data.count && data.count > 0) {
                list.html("");
                var content = "";
                /* alert(data.list[1].preview);*/
                for (var i = 0; i < data.list.length; i++) {
                    var item = data.list[i];
                    content = "";
                    content += "<li>";
                    content += "<a href=\"shopDetail.html?id="+item.id+"\">";
                    content += "<dl class=\"shop-stu\">";
                    content += "<dt><img src=\"" + item.preview + "\"></dt>";
                    content += "<dd class=\"shop-big\"><span>" + item.title + "</span></dd>";
                    content += "<dd class=\"shop-small\">";
                    content += "<div class=\"shop-date\">发表日期:&nbsp" + item.time.substr(0,10) + "</div>";
                    content += "<div class=\"shop-watch\"><i></i><span>" + item.clickNum + "</span></div>";
                    content += "</dd>";
                    content += "</dl>";
                    content += "</a>";
                    content += "</li>";

                    list.append(content);
                }
            }

        }

    });

    // 成功案例
    $.ajax({
        type: 'get',
        url: 'http://www.940.com/articleList?page=1&line=8&type=6&callback=?',
        dataType: 'jsonp',
        processData: false,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(data) {

            data = formatData(data); // 然后在ajax获取到数据后使用它
            var list = $('.successes-list');
            if (data.count && data.count > 0) {
                list.html("");
                var content = "";
                for (var i = 0; i < 20; i++) {
                    var item = data.list[i];
                    /* console.log(item.preview);*/
                    content = "";
                    content += "<li>";
                    content += "<a href=\"shopDetail.html?id="+item.id+"\">";
                    content += "<dl class=\"successes-stu\">";
                    content += "<dt><img src=\"" + item.preview + "\"></dt>";
                    content += "<dd class=\"successes-big\"><span>" + item.title + "</span></dd>";
                    content += "<dd class=\"successes-small\">";
                    content += "<div class=\"left\">开店月赚</div>";
                    content += "<div class=\"middle\">";
                    content += "<span>" + item.inCome + "</span>";
                    content += "</div>";
                    content += "<div class=\"right\">入学日期:&nbsp" + item.time.substr(0,10) + "</div>";
                    content += "</dd>";
                    content += "</dl>";
                    content += "</a>";
                    content += "</li>";

                    // console.log(item.inCome);
                    list.append(content);
                }
            }

        }

    });



});

/*function browserRedirect() {

    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        window.location.href = 'http://wap.damays.com/';
    } else {
        window.location = 'http://www.940.com/';
    }

}
browserRedirect();*/