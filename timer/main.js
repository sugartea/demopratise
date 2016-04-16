var marginTop = 60;
var marginLeft = 30;
var windowHeight = 500;
var windowWidth = 1024;
var radius = 8;
var balls = [];
//endTime.setTime(endTime.getTime()+3600*1000);
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00",
				"#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
var endTimeVal = prompt("请按格式输入倒计时的时间，如需倒计时1分钟，则输入00：01：00","00:01:00");
var totalTimeArr = endTimeVal.split(":");
var hval = parseInt(totalTimeArr[0])*3600*1000;
var mval = parseInt(totalTimeArr[1])*60*1000;
var sval = parseInt(totalTimeArr[2])*1000;
var totalTime = hval + mval +sval;

window.onload = function(){
    var endTime = new Date();
	endTime.setTime(endTime.getTime()+totalTime);
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	canvas.width = windowWidth;
	canvas.height = windowHeight;
  	curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function(){
    	render(context);
    	update();
    	},50)//使用匿名函数可以解决定时器的执行函数不能传参的问题
    
    //与时间有关的函数需要等待用户输入时间后才获取当前的时间，因此放在页面加载之后
	//获取剩余时间
	function getCurrentShowTimeSeconds() {
	    var curTime = new Date();
	    var ret = endTime.getTime() - curTime.getTime();
	    ret = Math.round( ret/1000 )
	    return ret >= 0 ? ret : 0;
	}
	//获取时间
	function render(cxt){
	cxt.clearRect(0,0,windowWidth,windowHeight);
    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
    var seconds = curShowTimeSeconds % 60;
	renderDigit(marginLeft,marginTop,parseInt(hours/10),cxt);
	renderDigit(marginLeft+15*(radius+1),marginTop,hours%10,cxt);
	renderDigit(marginLeft+30*(radius+1),marginTop,10,cxt);
	renderDigit(marginLeft+39*(radius+1),marginTop,parseInt(minutes/10),cxt);
	renderDigit(marginLeft+54*(radius+1),marginTop,parseInt(minutes%10),cxt);
	renderDigit(marginLeft+69*(radius+1),marginTop,10,cxt);
	renderDigit(marginLeft+78*(radius+1),marginTop,parseInt(seconds/10),cxt);
	renderDigit(marginLeft+93*(radius+1),marginTop,parseInt(seconds%10),cxt);

	//画新加入的小球
    for(var i = 0;i < balls.length;i++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x , balls[i].y , radius , 0 , 2*Math.PI , true );
        cxt.closePath();
        cxt.fill();
		}
	}

	//生成小球
	function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
    var curSeconds = curShowTimeSeconds % 60
	
    if(nextSeconds!=curSeconds){
        if(parseInt(curHours/10)!= parseInt(nextHours/10) ){
           addBalls( marginLeft + 0 , marginTop , parseInt(curHours/10) );
        }
        if(parseInt(curHours%10)!= parseInt(nextHours%10) ){
           addBalls( marginLeft + 15*(radius+1) , marginTop , parseInt(curHours/10) );
        }

        if(parseInt(curMinutes/10)!= parseInt(nextMinutes/10) ){
           addBalls( marginLeft + 39*(radius+1) , marginTop , parseInt(curMinutes/10) );
        }
        if(parseInt(curMinutes%10)!= parseInt(nextMinutes%10) ){
           addBalls( marginLeft + 54*(radius+1) , marginTop , parseInt(curMinutes%10) );
        }

        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
           addBalls( marginLeft + 78*(radius+1) , marginTop , parseInt(curSeconds/10) );
        }
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
           addBalls( marginLeft + 93*(radius+1) , marginTop , parseInt(nextSeconds%10) );
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}

}


//绘制数字
function renderDigit(x,y,num,cxt){
	for(var i = 0 ; i<digit[num].length;i++){
		for(var j = 0 ;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
			cxt.beginPath();
			cxt.arc( x+j*2*(radius+1)+(radius+1),
					 y+i*2*(radius+1)+(radius+1),
					radius,0,2*Math.PI);			
			cxt.closePath();
			cxt.fillStyle = "rgb(255,127,0)";//填充橙色			
			cxt.fill();
			}
		}
	}
}

//更新小球的运动状态
function updateBalls(){
    for(var i = 0 ;i < balls.length;i ++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= windowHeight-radius){
           balls[i].y = windowHeight-radius;
           balls[i].vy = - balls[i].vy*0.75;
        }  
    }
    
 //优化性能，减少小球的数目  
	var cnt= 0;
    for(var i = 0 ;i < balls.length;i++){
    	if(balls[i].x+radius > 0&&balls[i].x-radius<windowWidth){
    		balls[cnt++] = balls[i];
    	}
    }
	while(balls.length > cnt){
		balls.pop();
	}
}

//增加小球的方法
function addBalls(x,y,num){
    for(var i = 0;i < digit[num].length;i++)
        for(var j = 0;j < digit[num][i].length;j++)
            if(digit[num][i][j] == 1){
                var aBall = {
                    x:x+j*2*(radius+1)+(radius+1),
                    y:y+i*2*(radius+1)+(radius+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil( Math.random()*1000))*4,//决定小球下落的方向左或右
                    vy:-5,
                    color:colors[Math.floor( Math.random()*colors.length)]//决定小球的颜色
                }
        balls.push(aBall);
            }
}






