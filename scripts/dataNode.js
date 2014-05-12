 /*
 Name: dataNode.js
 Author: Carl Domingo
 Last Modified: 5/7/2014
 Description: Singleton object representing data nodes
 Dependencies:
*/

"use strict";
window.dataNode = (function(){
  function dataNode(genre, title, details) {
    this.color = "yellow";
    this.height = 50;
    this.width = 50;
    this.x = 50;
    this.y = 200;
    this.active = false;
    this.genre = genre;
    this.title = title;
    this.info = details;
    this.nextNode = null;
  };

  dataNode.prototype.draw = function(ctx) {
		var halfW = this.width/2;
		var halfH = this.height/2;
		//ctx.drawImage(images["nodeImage"], this.x - halfW, this.y - halfH, this.width, this.height);
    if(this.genre == "Video Game")
    {
      ctx.drawImage(images["gameImage"], this.x - halfW, this.y - halfH, this.width, this.height);
    }
    if(this.genre == "Graphic Novel")
    {
      ctx.drawImage(images["novelImage"], this.x - halfW, this.y - halfH, this.width, this.height);
    }

    if(this.active) this.showParticles(ctx);

	};

	dataNode.prototype.initParticle = function(p){
		var halfW = this.width / 2;
    var halfH = this.height / 2;

		p.x = getRandom(-halfW, halfW);
		p.y = -halfH;
		p.r = getRandom(0.5, 1);
		p.xSpeed = getRandom(-2,2);
		p.ySpeed = getRandom(-2,2);
		return p;
	}; // end of initParticle

	dataNode.prototype.createParticles = function(){
    // initialize particle array
    this.particles = [];

    // create 20 exhaust particles
    for(var i=0;i<10;i++){

      // create an "empty" particle object
      var p = {};

      // give it a random age when first created
      p.age = getRandomInt(0,74);

      // add to array
      this.particles.push(this.initParticle(p));

    } // end for
  }; // end createParticles()

  dataNode.prototype.showParticles = function(ctx){
   var halfW = this.width/2;
   var halfH = this.height/2;

   // if necessary - create particles
   if (!this.particles) this.createParticles();

  	for(var i=0;i<this.particles.length;i++){
  	 var p = this.particles[i];

  	 p.age += 2.5;
  	 p.r += 0.30;
  	 p.x += p.xSpeed;
  	 p.y += p.ySpeed;
     var red = Math.floor(getRandom(0, 255));
     var green = Math.floor(getRandom(0, 255));
     var blue = Math.floor(getRandom(0, 255));
  	 var alpha = 1 - p.age/75;

    //console.log(red + " " + green + " " + blue);

  	 // set fill color
  	 ctx.fillStyle = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";

  	ctx.beginPath();
  	ctx.arc(p.x + this.x, p.y + this.y + halfH, p.r, Math.PI * 2, false);
  	ctx.closePath();
  	ctx.fill();

  	 // if the particle is too old, recycle it
  	 if(p.age >= 50){
  		 p.age = 0;
  		 this.initParticle(p);
  	 }

   } // end for loop of this.particles

 }; // end showExhaust()

 return dataNode;

})(); // self exectuing anonymous function
