/*     
	Random Snowflate Generator

    Coded By Philipp Werminghausen
    12/22/2014

    Did you know no two snowflates are the same?
        
*/
$(function () {
	var myVar = setInterval(function(){snow();},1000);
});
function snow(){
	snowflake();
}
function snowflake(){
	var width = $('body').width()+200;
	var height = $('body').height()+200;
    console.log(width + ' -> width and height -> ' + height);
	var size = (Math.floor(Math.random()*5)*10)+10;//10, 20, 30 , 40 or 50
	var speed = (6-(size/10))*10000;
	var start_width = Math.floor(Math.random()*(width-size));
	var start_height = size*-1;
	$('body').append('<img src="' + getSnowflateURL(size,6) + '" style="width:' + size + 'px;height:' + size + 'px;margin-top:' + start_height + 'px;margin-left:' + start_width + 'px;" class="snowflake start">');
	animate(height, speed);
}
function animate(height, speed){
	$('img.start').removeClass('start').animate({'margin-top':height},speed,function(){$(this).fadeOut(function(){$(this).remove();})});
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