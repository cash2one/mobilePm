var __k ={
	Arrid:Array(),
	gid:'',
	mid:'0',
	p:[],
	n:"key",
	_$:function (n){
		return document.getElementById(n);
	},
	_a:function (v,n){//添加新值
		var l=this._$(n).value.length;
		if(n=='number'&&l>=3){this._b('money');} if(n=='money'&&l>=8||n=='money'&&v=='X')return ;
		if(n=='money'&&this.mid==1){
			this.mid=0;
			this._$(n).value = v;
		}else
			this._$(n).value += v;
		//numbercacke(this._$('number').value);
	},
	//退格
	_s:function (n){
		var l=this._$(n).value.length;
		var num=this._$(n).value.substr(0,l-1);
		this._$(n).value=num;
	},
	//关闭
	_o:function (n){
		this._$(this.n+n).style.display="none";
		v = this._$('money').value-0;
		if(v>0&&n=='money'){
			wait_soonsend();
			//this._b('number');
		}else{
			this.mid=1;
			this._$('money').select();
			this._b('money');
			numbercacke(this._$('number').value);
		}
	},
	//显示
	_b:function (n){
		for(i=0;i<=(this.Arrid.length-1);i++) {
			this._$(this.n+this.Arrid[i]).style.display="none";
		}
		if(n=='number')this._$('number').value='';
		if(n=='money'){
			this.mid=1;
			this._$('money').select();
			//this._$('money').value='';
		}
		//alert(this.p.x+"="+this.p.y)
		this._$(this.n+n).style.top = this.p.x;
		this._$(this.n+n).style.left = this.p.y;
		this._$(this.n+n).style.display="block";
	},
	_p:function (e){
		var o=e.getBoundingClientRect(),a=[];
		b = document.body.getBoundingClientRect();
        if(o){
            var a = {
               x: o.top+35,
               y: b.left+0.5
            };
        }
		this.p=a;
	},
	_int:function (n){
		this.gid = this.n+n;
		this.Arrid.push(n);
		this._$(n).onclick=function() {__k._p(this); __k._b(n);}
		var _keynumberhtml = "<div id=\""+this.gid+"\">\n"
		+ "<table id=\"main2\"><tr>\n"
		//+ "<td  id=\"esc"+this.gid+"\" onclick=\"__k._o('"+n+"');\">退出</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'1\','"+n+"');\">1</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'2\','"+n+"');\">2</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'3\','"+n+"');\">3</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'4\','"+n+"');\">4</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'5\','"+n+"');\">5</td>"
		+ "<td class=\"key\" id=\"X"+this.gid+"\" onclick=\"__k._a(\'X\','"+n+"');\">X</td></tr>\n"
		+ "</table>\n"       
		+ "<table id=\"main\"><tr>\n"
		//+ "<td id=\"back"+this.gid+"\" onclick=\"__k._s('"+n+"');\">退格</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'6\','"+n+"');\">6</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'7\','"+n+"');\">7</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'8\','"+n+"');\">8</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'9\','"+n+"');\">9</td>"
		+ "<td class=\"key\" onclick=\"__k._a(\'0\','"+n+"');\">0</td>"
		+ "<td  id=\"enter"+this.gid+"\" onclick=\"__k._o('"+n+"');\">确定</td></tr>\n"
		+ "</table>\n"
		+ "</div>\n";

        var div = document.createElement("div");
        div.innerHTML = _keynumberhtml;
        document.getElementById('keypan').appendChild(div);

	}
}

__k._int('number');
__k._int('money');