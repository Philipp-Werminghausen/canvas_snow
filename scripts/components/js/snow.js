/*     
	Random Snowflate Generator

    Coded By Philipp Werminghausen
    12/22/2014

    Did you know no two snowflates are the same?
    *also see the stand alone single snoeflake generator at : http://jsfiddle.net/me2loveit2/uvvz0n20/
        
*/
$(function () {
	var snowflakeTipCount = 6;
	if(Modernizr.canvas){
		var myVar = setInterval(function(){snowflake(snowflakeTipCount);},1000);
	}else{
		alert("Please use a browser that supports the canvas element to view this project.");
	}
});
function snowflake(snowflakeTipCount){
	//only make it now in viewport
	var width = $('body').width()+200;
	var height = $('body').height()+200;
	//pick a random size between 15 and 45 for this snowflake
	var size = random(15,45);
	//choose a speed based on height
	var speed = ((7-(size/10))+random(.5,1))*5000;
	//set a random starting point
	var start_width = Math.floor(Math.random()*(width-size));
	var start_height = size*-1;
	//inject snowflake into DOM
	$('body').append('<img src="' + getSnowflateURL(size,snowflakeTipCount) + '" style="width:' + size + 'px;height:' + size + 'px;margin-top:' + start_height + 'px;margin-left:' + start_width + 'px;" class="snowflake start">');
	//start animating all snowflakes they are not moving yet
	animateLatestSnowflakes(height, speed);
}
function animateLatestSnowflakes(height, speed){
    $('img.start').removeClass('start').animate({'margin-top':height},speed,function(){$(this).fadeOut(function(){$(this).remove();})}).animateRotate((random(0,1)>.5?random(0,250):random(0,-250)),speed,'linear', function () {});
}
function getSnowflateURL(dimension,num){
    var canvas = $('<canvas width="' + dimension + '" height="' + dimension + '">Canvas not supported.</canvas>').appendTo('body').get(0);
    var context = canvas.getContext("2d");
    
    var arr = getDrawPattern(dimension/2);
    drawSnowflake(arr,num,[dimension/2,dimension/2],"blue",context);
    var snowflateSrc = canvas.toDataURL();
    $(canvas).remove();
    return snowflateSrc;
}
function getDrawPattern(dimension){
    return [
        [0,0],
        [(.283*dimension),random(0,(dimension/20))],
        [(.17*dimension),random(0,(dimension/6))],
        [(.22*dimension),random(0,(dimension/4))],
        [(.33*dimension),0],
        [(.45*dimension),random(0,(dimension/12))],
        [(.5*dimension),random((dimension/24),(dimension/6))],
        [(.5*dimension),random(0,(dimension/12))],
        [(.67*dimension),0],
        [(.75*dimension),random(0,(dimension/12))],
        [(.83*dimension),random((dimension/12),(dimension/6))],
        [(.92*dimension),random(0,(dimension/12))],
        [(1*dimension),0]
    ];
}
function drawSnowflake(arr,ends,origin,color,context){
    var degrees = (360/ends);
    var radians = radiansOf(degrees);
    context.translate(origin[0],origin[1]);
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.beginPath();
    context.rotate(random(0,radians));
    for(var i = 0;i< 360;i+=degrees){
        context.rotate(radians);
        context.moveTo(arr[0][0],arr[0][1]);
        drawPattern(arr,1,context);
        drawPattern(arr,-1,context);
    }
    context.stroke();
}
function drawPattern(arr,direction,context){
    for(var j=0;j<arr.length;j++){
        context.lineTo(arr[j][0],(direction *arr[j][1]));
    }
}
function radiansOf(degrees){
    return (Math.PI / 180) *  degrees;
}
function random(from,to){
    return (Math.random() * to) + from;
}