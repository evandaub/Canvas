//Javascript Document
var canvas;
var ctx;


//give the canvas a variable
canvas=document.getElementById('myCanvas');
//obtain the rendering context and its drawing function.  Focusing on 2d rendering context
ctx=canvas.getContext('2d');


//invoke to draw a particle every so often
setInterval(function(){draw();}, 33);

var particles=[];
for(var i=0; i<50; i++){
	//make a particle and add it to the array
	particles.push(new createParticle())
}//end for loop

//this function makes a new particle with its own x y velocity color etc
function createParticle(){
	//random x y position for each particle
	this.x=Math.random()*500;
	this.y=Math.random()*500;
	//random x y velocity for each particle
	//subtracting 10 should make half of them get negative number, making them move the opposite way
	this.vx=Math.random()*20-10;
	this.vy=Math.random()*20-10;
	//random color for each particle
	var r=Math.random()*255>>0;
	var g=Math.random()*255>>0;
	var b=Math.random()*255>>0;
	this.color='rgba('+ r +',' + g +',' + b + ',0.5)'
	//random size
	this.radius=Math.random()*20+20;
	
}

function draw(){
	ctx.globalCompositeOperation = 'source-over';
	//paint the canvas with a black rectangle
	ctx.fillStyle='rgba(0,0,0,0.5)';
	ctx.fillRect(0,0,500,500);
	//now blend the backgroun with the particles
	ctx.globalCompositeOperation = 'lighter';
	//loop through each of the 50 particles in our array and move each one
	for(var t=0; t<particles.length; t++){
		//variable to refer to the current particle the loop is working on
		p=particles[t];
		//lets draw a circle particle
		ctx.beginPath();
		var gradient=ctx.createRadialGradient(p.x, p.y, 0,p.x, p.y, p.radius);
		gradient.addColorStop(0,'white')
		gradient.addColorStop(0.4,'white')
		gradient.addColorStop(0.4,p.color)
		gradient.addColorStop(1,'black')
		//specify a gradient fill
		ctx.fillStyle=gradient;
		//make a circle
		ctx.arc(p.x, p.y, p.radius, Math.PI*2,false);
		ctx.fill();
		//move this particle a little bit
		p.x+=p.vx;
		p.y+=p.vy;	
		
		//if particle is off the screen, reset x or y value
		if(p.x<-50)p.x=550;
		if(p.y<-50)p.y=550;
		if(p.x>550)p.x=-50;
		if(p.y>550)p.y=-50;
	}//close for loop	

}