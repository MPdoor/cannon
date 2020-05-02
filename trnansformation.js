const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//variables
const cannon = {
w: 160,
h: 75,
x:0,
y:0
}

const cannonball = {
x: 25,
y: 590,
r:25,
dx:0,
dy:0,
cmx:0,
cmy:0,
icx: 1
}

const cannonRotate = {
degree: -54,
add: 0.5
}

const gravity = {
  g:0
}

const power = {
  power:0
}

const powerSelect = {
  x:25,
  y:195,
  w:10,
  h:10,
  dy: 5
}

let pChange = 0;

let dif;

//running the whole function
function animate(){
c.clearRect(0,0,innerWidth,innerHeight);
//cannon
c.save();
c.translate(-25,615);
c.rotate(cannonRotate.degree * Math.PI / 180);
c.fillStyle = '#000';
c.fillRect(cannon.x,cannon.y,cannon.w,cannon.h);
c.restore();

//cannonball
c.beginPath();
c.arc(cannonball.x,cannonball.y, cannonball.r, 0, Math.PI * 2, false);
c.fillStyle = '#000';
c.fill();

cannonball.x += cannonball.dx;
cannonball.y -= cannonball.dy;

cannonball.dy += gravity.g


//stoping the ball from going through the ground
if(cannonball.y + cannonball.r >= innerHeight){
  gravity.g = 0;
  for(i = 0; i < 10; i++){
    cannonball.dx -= 0.03;
  
    if(cannonball.dx <= 0){
      cannonball.dx = 0
    }
  }
  cannonball.dy = 0;
}

//the power select backgroung
c.fillStyle = ('#888')
c.fillRect(20,55, 20, 155)
//the power select of the cannonball
c.fillStyle = ('#000')
c.fillRect(powerSelect.x,powerSelect.y,powerSelect.w,powerSelect.h)


//moving the powerSelect
function movePS(){
  powerSelect.y -= powerSelect.dy
  if(powerSelect.y <= 60){
    powerSelect.dy = -powerSelect.dy
    powerSelect.dy -= 0.5
    if (powerSelect.dy < -10){
      powerSelect.dy = -10
    }
  }
  if(powerSelect.y >= 195){
    powerSelect.dy = -powerSelect.dy
    powerSelect.dy += 0.5
    if (powerSelect.dy > 10){
      powerSelect.dy = 10
    }
  }

}
movePS();

requestAnimationFrame(animate)
}

//reseting the cannonball and cannon
function reset(){
  gravity.g = 0;
  cannonball.dx = 0;
  cannonball.dy = 0;
  cannonball.x = 25;
  cannonball.y = 590;
  cannonball.cmy = 0;
  cannonball.cmx = 0;
  cannonRotate.degree = -52;
  cannonRotate.add = 0.5;
  power.power = 0;
  powerSelect.y = 195;
  powerSelect.dy = 5;
}

// setting timeout for ball right when its left
function wait(){
  cannonball.icx = 1.2;
}

//fireing the cannon ball
let ignoreKeyPress = false;

document.onkeydown = (e) => {
  e.preventDefault();
  const { key } = e;

  switch(key) {
    case 'ArrowUp':
     if (e.repeat || ignoreKeyPress) return; // Do nothing
     ignoreKeyPress = true;
     setTimeout(() => ignoreKeyPress = false, 1500); // change the 1000 to the interval between keypresses that you want in miliseconds.

      gravity.g = -0.25
      cannonball.dx += 6 + cannonball.cmx + power.power,
      cannonball.dy += 8 + cannonball.cmy + power.power;
      
      setTimeout(reset,1500);
      break;
  }


  switch(key) {
    case 'ArrowLeft':
      cannonRotate.degree -= cannonRotate.add;
      cannonball.x -= cannonball.icx;
      
      //making sure the cannon doesn't go off screan
      if (cannonRotate.degree >= -81){
        cannonRotate.add = 0.5
      }
      if (cannonRotate.degree <= -81){
        cannonRotate.add = 0
      }
      //making sure that the ball stays in the cannon
      if (cannonball.x >= 0 + 10){
                cannonball.icx = 1
              }
      if (cannonball.x <= 0 + 20){
        cannonball.icx = 0
      }
      //making sure that the ball movement doesn't change when cannon hits the wall
      if(cannonball.x<= 32.2 && cannonRotate.degree <= -81){
        cannonball.cmx += 0;
        cannonball.cmy += 0;
      }
      //regular cannonball movement
      else{
        cannonball.cmx += -0.08 + -pChange;
        cannonball.cmy += 0.08;
      }
      // stopping ball move after it's shot
      if(cannonball.x > 100){
        cannonball.icx = 0,
        cannonball.icx = 0
      }

      break;
  }
  
  switch(key) {
    case 'ArrowRight':
      cannonRotate.degree += cannonRotate.add;
      cannonball.x += cannonball.icx;
    
      //making sure the cannon doesn't go off screen
      if (cannonRotate.degree <= -26){
        cannonRotate.add = 0.5;
      }
      if (cannonRotate.degree >= -26){
      cannonRotate.add = 0
      }
      //making sure that the ball stays in the cannon
      if (cannonball.x <= 90 ){
        //setting a delay for the ball movement
        if(cannonball.x<= 32.2 && cannonball.x >19 && cannonRotate.degree <= -57){
          setTimeout(wait,2000)
        }
        else{
          cannonball.icx = 1.2
        }
              }
      if (cannonball.x >= 90 ){
        cannonball.icx = 0
              }
              //make sure the ball movement doesn't change when the cannon hits a wall
              if(cannonRotate.degree >= -26){
                cannonball.cmx += 0;
                cannonball.cmy += 0;
              }
              //regular movement of cannon ball
              else{
                cannonball.cmx += 0.08;
                cannonball.cmy += -0.08 -pChange;
              }
      break;
  }
  //stoping the powerSelector and exicuting the power
switch(key){
  case ('ArrowDown'):
   powerSelect.dy = 0;
   
//power strength
let dif =195 - powerSelect.y

power.power = dif/15
let test = power.power/0.12

//adjusting the change in x and y of cannonball acording to power
if(dif < 60){
  pChange = 0}
  //x and y change with power change
else{pChange = power.power / test}
    break;
}
}

requestAnimationFrame(animate)


//waves waves waves waves waves waves waves waves waves waves waves waves waves waves waves waves waves waves

// wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 wave1 
//variables
let eBall = {
  x:1000,
  y:300,
  r: 50,
  dx:1.5,
  dy:0.25
}

let eGravity = {
g:0.5
}

function animateWaves(){
 
  //making the first enemy
  c.beginPath();
  c.arc(eBall.x,eBall.y, eBall.r, 0, Math.PI * 2, false);
  c.fillStyle = '#000';
  c.fill();

  //moving the eBall
  eBall.x -= eBall.dx;
  eBall.y -= eBall.dy
  eBall.dy -= eGravity.g

  //making it bounce
  if(eBall.y + eBall.r >= innerHeight){
      eBall.dy = -eBall.dy
  }

  //alerting if you lose
  if(eBall.x - eBall.r + 10 <=0){
    alert('you lose'); {
      eBall.x = 10000
    }
  }

//distance between the two objects
 var distx = cannonball.x - eBall.x;
 var disty = cannonball.y - eBall.y;

//collision detection
    var distance = Math.sqrt(distx * distx + disty * disty);
    if(distance < eBall.r){
    eBall.r = 0, eBall.dx = 0, eBall.dy = 0,  wave2();
  }

  requestAnimationFrame(animateWaves)
}
requestAnimationFrame(animateWaves)


//wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2 wave2

//variables 

const eBall2 = {
x:1000,
y:300,
r:25,
dx:1.5,
dy:0.25
}


const eBall3 = {
  x:1000,
  y:100,
  r:25,
  dx:1.5,
  dy:0.25
}


const eBall4 = {
x:1000,
y:500,
r:25,
dx:1.5,
dy:0.25
}


function wave2(){
console.log('working')
//first enemy
c.beginPath();
c.arc(eBall2.x,eBall2.y, eBall2.r, 0, Math.PI * 2, false);
c.fillStyle = '#000';
c.fill();

//second enemy
c.beginPath();
c.arc(eBall3.x,eBall3.y, eBall3.r, 0, Math.PI * 2, false);
c.fillStyle = '#000';
c.fill();

//third enemy
c.beginPath();
c.arc(eBall4.x,eBall4.y, eBall4.r, 0, Math.PI * 2, false);
c.fillStyle = '#000';
c.fill();

//gravity for first enemy
 eBall2.x -= eBall2.dx;
 eBall2.y -= eBall2.dy
 eBall2.dy -= eGravity.g

 //gravity for the second enemy
  eBall3.x -= eBall3.dx;
  eBall3.y -= eBall3.dy
  eBall3.dy -= eGravity.g

  //gravity for the third enemy
   eBall4.x -= eBall4.dx;
   eBall4.y -= eBall4.dy
   eBall4.dy -= eGravity.g
 

   //bouncing the balls
     
  if(eBall2.y + eBall2.r >= innerHeight){
    eBall2.dy = -eBall2.dy
}

if(eBall3.y + eBall3.r >= innerHeight){
  eBall3.dy = -eBall3.dy
}

if(eBall4.y + eBall4.r >= innerHeight){
  eBall4.dy = -eBall4.dy
}

//distance between the two objects
var dist2x = cannonball.x - eBall2.x;
var dist2y = cannonball.y - eBall2.y;

//collision detection
var distance = Math.sqrt(dist2x * dist2x + dist2y * dist2y);
    if(distance < eBall2.r){
    eBall2.r = 0, eBall2.dx = 0, eBall2.dy = 0
  }

  //distance between the two objects
var dist3x = cannonball.x - eBall3.x;
var dist3y = cannonball.y - eBall3.y;

//collision detection
var distance = Math.sqrt(dist3x * dist3x + dist3y * dist3y);
    if(distance < eBall3.r){
    eBall3.r = 0, eBall3.dx = 0, eBall3.dy = 0
  }

  //distance between the two objects
var dist4x = cannonball.x - eBall4.x;
var dist4y = cannonball.y - eBall4.y;

//collision detection
var distance = Math.sqrt(dist4x * dist4x + dist4y * dist4y);
    if(distance < eBall4.r){
    eBall4.r = 0, eBall4.dx = 0, eBall4.dy = 0
  }

  //alerting if you lose
  if(eBall2.x - eBall2.r + 10 <=0){
    alert('you lose'); {
      eBall2.x = 10000
    }
  }
  if(eBall3.x - eBall3.r + 10 <=0){
    alert('you lose'); {
      eBall3.x = 10000
    }
  }
  if(eBall4.x - eBall4.r + 10 <=0){
    alert('you lose'); {
      eBall4.x = 10000
    }
  }
requestAnimationFrame(wave2)
  }