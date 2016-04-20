window.onload = function(){
	waterfall();
	
	var dataInt = {'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},
					      {'src':'6.jpeg'},{'src':'7.jpg'},{'src':'8.jpg'},{'src':'9.jpg'},{'src':'10.jpg'}]};
	
	//鼠标滚动时检测是否需要加载图片
	window.onscroll = function(){
		if(checkAddPic()){
			var container = document.getElementsByClassName('container')[0];
			for(var i = 0; i<dataInt.data.length; i++){
				var box = document.createElement('div');
				box.className = 'box';
				container.appendChild(box);
				var imgbox = document.createElement('div');
				imgbox.className = 'imgbox';
				box.appendChild(imgbox);
				var img = document.createElement('img');
				img.src = dataInt.data[i].src;
				imgbox.appendChild(img);
			}
		}	
		waterfall();
	}
}

//实现瀑布流布局
function waterfall(){
	var list = document.getElementsByClassName("box");
	var groupHeight = [];//存放每一排的高度
	for(var i = 0; i<list.length; i++){
		var listHeight = list[i].offsetHeight;
		if(i<5){
			groupHeight[i] = listHeight;
		}else{
			var minH = Math.min.apply(null,groupHeight);
			var minindex = findMinIndex(groupHeight,minH);
			list[i].style.position = 'absolute';
			list[i].style.left = list[minindex].offsetLeft + 'px'; 
			list[i].style.top = minH + 'px';
			groupHeight[minindex] += list[i].offsetHeight;
		}
	}
}

//找到高度最小的索引，arr为目前所有组的高度，minH为最小的高度
function findMinIndex(arr,minH){
	for(var i in arr){
		if(arr[i] == minH){
			return i;
		}
	}
}

//检测是否需要加载图片
function checkAddPic(){
	var list = document.getElementsByClassName('box');
	var lastPicH = list[list.length-1].offsetTop+Math.floor(list[list.length-1].offsetHeight/2);
	var Top = document.documentElement.clientHeight;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	return (lastPicH < Top + scrollTop)?true:false;
}















