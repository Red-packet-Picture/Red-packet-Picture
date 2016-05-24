var canvasWidth=window.innerWidth
var canvasHeight=window.innerHeight
//自适应屏幕
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
canvas.width=canvasWidth
canvas.height=canvasHeight
var image=new Image()
var radius=50
var clippingRegion={x:-1,y:-1,r:radius}
var leftMargin=0,topMargin=0
image.src="img0.jpg"

image.onload=function(e){
	$("#blur-image").css("width",image.width+"px")
	$("#blur-image").css("height",image.height+"px")
	if(image.width<canvasWidth){
		canvas.width=image.width
		canvas.height=image.height  //有canvas的语句都不能放在if语句外
		$("#blur-div").css("width",canvas.width+"px")
		$("#blur-div").css("height",canvas.height+"px")
		leftMargin=(image.width-canvas.width)/2
		topMargin=(image.height-canvas.height)/2
		$("#blur-image").css("top",topMargin+"px")
		$("#blur-image").css("left",leftMargin+"px")
	}else{
		$("#blur-div").css("width",canvas.width+"px")
		$("#blur-div").css("height",canvas.height+"px")
		leftMargin=(image.width-canvas.width)/2
		topMargin=(image.height-canvas.height)/2
		$("#blur-image").css("top","-"+topMargin+"px")
		$("#blur-image").css("left","-"+leftMargin+"px")
	}
	initCanvas()
}

function setClippingRegon(clippingRegion){
	context.beginPath()
	context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false)
	context.clip()
}

function initCanvas(){
	clippingRegion={x:Math.random()*(canvas.width-2*radius)+radius,
		y:Math.random()*(canvas.height-2*radius)+radius,r:radius}
	draw(image,clippingRegion)
}

function draw(image,clippingRegion){
	context.clearRect(0,0,canvas.width,canvas.height)
	context.save()
	setClippingRegon(clippingRegion)
	context.drawImage(image,leftMargin,topMargin,canvas.width,canvas.height,0,0,canvas.width,canvas.height)
	context.restore()
}

function reset(){

	initCanvas()
}

function show(){

	var theAnimation=setInterval(
		function(){
			console.log("animation")
			clippingRegion.r+=30
			if(clippingRegion.r>(canvasWidth+canvasHeight)){
				clearInterval(theAnimation)
			}
			draw(image,clippingRegion)
		},
		10)
}
