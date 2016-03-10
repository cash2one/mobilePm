/**
 * Created by Administrator on 2016/3/9.
 */
    //导航滑动（只支持移动端）
$(".nav ul li").width($(".nav").width() / 4);
$(window).resize(function () {
    $(".nav ul li").width($(".nav").width() / 4);
    //slider = new Swipe(document.getElementById('nav'), { speed: 500, auto: 0, width: ($(".nav").width() / 4), col: 4 });
});

//导航滑动_插件
window.Swipe = function (b, a) {
    if (!b) {
        return null;
    }
    var c = this;
    this.options = a || {};
    this.index = this.options.startSlide || 0;
    this.speed = this.options.speed || 300;
    this.lwidth = this.options.width || 80; //导航li宽度
    this.delay = this.options.auto || 0; //自动滚动菜单速度0为不自动滚动
    this.col = this.options.auto || 4; //每排显示个数
    this.container = b;
    this.element = this.container.children[0];
    this.container.style.overflow = "hidden";
    this.element.style.listStyle = "none";
    this.element.style.margin = 0;
    this.setup();
    if (this.delay != 0) {
        this.begin();
    }
    if (this.element.addEventListener) {
        this.element.addEventListener("touchstart", this, false);
        this.element.addEventListener("touchmove", this, false);
        this.element.addEventListener("touchend", this, false);
        this.element.addEventListener("touchcancel", this, false);
        this.element.addEventListener("webkitTransitionEnd", this, false);
        this.element.addEventListener("msTransitionEnd", this, false);
        this.element.addEventListener("oTransitionEnd", this, false);
        this.element.addEventListener("transitionend", this, false);
        window.addEventListener("resize", this, false);
    }
};
Swipe.prototype = {
    setup: function () {
        this.slides = this.element.children;

        this.width = Math.ceil(("getBoundingClientRect" in this.container) ? this.container.getBoundingClientRect().width : this.container.offsetWidth);
        if (!this.width) {
            return null;
        }
        this.length = this.slides.length;
        this.length = Math.ceil(this.slides.length / 4);
        if (this.length < 1) {
            return null;
        }

        this.container.style.visibility = "hidden";
        this.element.style.width = Math.ceil(this.slides.length * this.lwidth) + "px";
        var a = this.slides.length;
        while (a--) {
            var b = this.slides[a];
            b.style.width = this.lwidth + "px";
            b.style.display = "table-cell";
            b.style.verticalAlign = "top";
        }
        this.slide(this.index, 0);
        this.container.style.visibility = "visible";
    },
    slide: function (a, c) {
        var b = this.element.style;
        if (c == undefined) {
            c = this.speed;
        }
        b.webkitTransitionDuration = b.MozTransitionDuration = b.msTransitionDuration = b.OTransitionDuration = b.transitionDuration = c + "ms";
        b.MozTransform = b.webkitTransform = "translate3d(" + -(a * this.width) + "px,0,0)";
        b.msTransform = b.OTransform = "translateX(" + -(a * this.width) + "px)";
        this.index = a;
    },
    getPos: function () {
        return this.index;
    },
    prev: function (a) {
        this.delay = a || 0;
        clearTimeout(this.interval);
        if (this.index) {
            this.slide(this.index - 1, this.speed);
        } else {
            this.slide(this.length - 1, this.speed);
        }
    },
    next: function (a) {
        this.delay = a || 0;
        clearTimeout(this.interval);
        if (this.index < this.length - 1) {
            this.slide(this.index + 1, this.speed);
        } else {
            this.slide(0, this.speed);
        }
    },
    begin: function () {
        var a = this;
        this.interval = (this.delay) ? setTimeout(function() {
                a.next(a.delay);
            },
            this.delay) : 0;
    },
    stop: function () {
        this.delay = 0;
        clearTimeout(this.interval);
    },
    resume: function () {
        this.delay = this.options.auto || 0;
        this.begin();
    },
    handleEvent: function (a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchcancel":
            case "touchend":
                this.onTouchEnd(a);
                break;
            case "webkitTransitionEnd":
            case "msTransitionEnd":
            case "oTransitionEnd":
            case "transitionend":
                this.transitionEnd(a);
                break;
            case "resize":
                this.setup();
                break;
        }
    },
    transitionEnd: function (a) {
        if (this.delay) {
            this.begin();
        }

    },
    onTouchStart: function (a) {
        this.start = {
            pageX: a.touches[0].pageX,
            pageY: a.touches[0].pageY,
            time: Number(new Date())
        };
        this.isScrolling = undefined;
        this.deltaX = 0;
        this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;
        a.stopPropagation();
    },
    onTouchMove: function (a) {
        if (a.touches.length > 1 || a.scale && a.scale !== 1) {
            return;
        }
        this.deltaX = a.touches[0].pageX - this.start.pageX;
        if (typeof this.isScrolling == "undefined") {
            this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(a.touches[0].pageY - this.start.pageY));
        }
        if (!this.isScrolling) {
            a.preventDefault();
            clearTimeout(this.interval);
            this.deltaX = this.deltaX / ((!this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0) ? (Math.abs(this.deltaX) / this.width + 1) : 1);
            this.element.style.MozTransform = this.element.style.webkitTransform = "translate3d(" + (this.deltaX - this.index * this.width) + "px,0,0)";
            a.stopPropagation();
        }
    },
    onTouchEnd: function (c) {
        var b = Number(new Date()) - this.start.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width / 2,
            a = !this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0;
        if (!this.isScrolling) {
            this.slide(this.index + (b && !a ? (this.deltaX < 0 ? 1 : -1) : 0), this.speed);
        }
        c.stopPropagation();
    }
};

//开始调用'导航滑动_插件'
var slider = null;
slider = new Swipe(document.getElementById('sliderNav'), { speed: 300, auto: 0, width: ($("#sliderNav").width() /4), col: 4 });





