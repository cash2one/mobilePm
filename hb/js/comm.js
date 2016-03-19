/**
 * Created by Administrator on 2016/3/10.
 */

;    /*tab*/
(function () {
    // 等价于html.style.fontSize = windowWidth / 640 * 100 + 'px';
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        html.style.fontSize = windowWidth / 6.4 + 'px';
        if(windowWidth>1000){
            html.style.fontSize = 100 + 'px';
        }
    }, false);
    if ($(".footer-bottom").length > 0) {
        $(".footer-bottom").prev("div").css({
            "margin-bottom": "1.13rem"
        });
    }
})();

/*返回顶部*/
window.onload = function(){
    var oTop = document.getElementById("top-animation");
//        var screenw = document.documentElement.clientWidth || document.body.clientWidth;
//        var screenh = document.documentElement.clientHeight || document.body.clientHeight;
    function topDb(){
        var scrTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrTop<=15){
            oTop.style.display ="none";
        }else{
            oTop.style.display ="block";
        }
    };
    topDb();
    window.onscroll = function(){
        topDb();
    };
    oTop.onclick = function(){
        document.documentElement.scrollTop = document.body.scrollTop =0;
    };
};

