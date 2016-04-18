var list = document.getElementsByTagName("span");
var container = document.getElementsByClassName("container");

//实现向左移动和向右移动
function prev(){
	var left = parseInt(document.getElementById("picture").style.left);
	move(left,0);
}

function next(){
	var left = parseInt(document.getElementById("picture").style.left);
	move(left,1);
}

//实现左移和右移，其中aim为当前位置的left值，sign为0表示左移，1表示右移
function move(aim,sign){
	//根据传入sign值判断左移还是右移
	if(sign == 0){
		aim += 32;		
	}
	else{
		aim -= 32;
	}
	if(aim%1024 == 0){
		//实现无限循环，当切换到第五和第一张图片的时候需要做处理
		if(aim == -6144){
			aim = -1024;
		}
		if(aim == 0){
			aim = -5120;
		}
		document.getElementById("picture").style.left = aim + 'px';
		//实现按前一张和后一张的按钮高亮状态
		for(var i=0;i<5;i++){
			list[i].setAttribute('class','cirbutton'); 
			}
			var index = -(aim/1024)-1;
			list[index].setAttribute('class','on cirbutton');
	}
	else{
		document.getElementById("picture").style.left = aim + 'px';
		setTimeout(function(){move(aim,sign)},10);
	}
}

window.onload = function(){
	for(i=0;i<list.length;i++){
		list[i].onclick = function(){
			var index = parseInt(this.getAttribute("index"));
			changePic(index);
			//更新按钮高亮状态
			for(var j=0;j<5;j++){
				list[j].setAttribute('class','cirbutton');
			}
			list[index - 1].setAttribute('class','on cirbutton');
		}
	}
	//实现自动切换图片
	container[0].onmouseout = function(){
 		timer = setInterval('next()',2600);
	}	
	container[0].onmouseover = function(){
		clearInterval(timer);
	}
}

//实现点击按钮切换图片，num为所按下的按钮的序数
function changePic(num){
	var addNum = num*-1024;
	document.getElementById("picture").style.left = addNum + 'px';	
}








