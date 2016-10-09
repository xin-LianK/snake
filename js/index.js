$(function(){
	$('.jiemian .star').on('click',function(){
		$('.jiemian').css('display','none')
		star();
	})

	$('.roler').on('click',function(){
		$('.jieshao').css('display','block')
	})


	$('.jieshao .close').on('click',function(){
		$('.jieshao').css('display','none')

	})



	//做背景
	function star(){
		for(var i=0;i<20;i++){
		for(var j=0;j<30;j++){
			var r=Math.floor(Math.random()*155);
			var g=Math.floor(Math.random()*120);
			var b=Math.floor(Math.random()*255);

			var w=Math.floor(Math.random()*20+5);
			var h=Math.floor(Math.random()*20+5);

			var color="rgba("+r+","+g+","+b+",0.8)"
			$('<div>').css({
				width:'30',
				height:'30',
				float:'left',
				// backgroundColor:color
			})
			.addClass('kuai')
			.appendTo('.sen')
			.attr('id',''+i+'_'+j+'')
		}
	}
	//创建一个数组用来表示蛇本身
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
	var shebiao={'0_0':true,'0_1':true,'0_2':true}
	//找见id名字  用选择器选中
	function findDiv(x,y){
		return $("#"+x+"_"+y+"")
	}

	$.each(she,function(i,v){
		findDiv(v.x,v.y).addClass('she')
	})


	var direction="r";
	move = function(){
		var oldTou=she[she.length-1]
		if(direction=="r"){
			var newTou={x:oldTou.x,y:oldTou.y+1}
		}
		if(direction=="l"){
			var newTou={x:oldTou.x,y:oldTou.y-1}
		}
		if(direction=="t"){
			var newTou={x:oldTou.x-1,y:oldTou.y}
		}
		if(direction=="b"){
			var newTou={x:oldTou.x+1,y:oldTou.y}
		}

		if (shebiao[newTou.x+'_'+newTou.y]) {
			clearInterval(t)
			alert('撞到自己了')
			return;
		}




		if (newTou.x<0||newTou.x>19||newTou.y<0||newTou.y>29) {
			clearInterval(t)
			alert('撞墙了')
			return;
		}



		she.push(newTou);
		shebiao[newTou.x+'_'+newTou.y]=true;
		findDiv(newTou.x,newTou.y).addClass('she')



		if (newTou.x==food.x && newTou.y==food.y) {
			findDiv(food.x,food.y).removeClass('food')
			food=addFood();
		}else{
			var weiba=she.shift(); //获取数组中的第一个对象
			delete shebiao[weiba.x+'_'+weiba.y]
			findDiv(weiba.x,weiba.y).removeClass('she')
		}


		
	}

	t=setInterval(move,500)

	$(document).on('keyup',function(e){
		var fanbiao={'l':37,'t':38,'r':39,'b':40}
		var biao={37:'l',38:'t',39:'r',40:'b'};
		if (Math.abs(e.keyCode-fanbiao[direction])==2) {
			return;
		}
		if (biao[e.keyCode]) {
			direction=biao[e.keyCode]
		}
	})



	function addFood(){
		do{
			var x=Math.floor(Math.random()*19);
			var y=Math.floor(Math.random()*19);
		}while(shebiao[x+'_'+y])	
		findDiv(x,y).addClass('food')
		return { x : x , y : y };
	}
	var food=addFood();
	}

	// star()
})