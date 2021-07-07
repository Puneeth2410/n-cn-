const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base;
var bridge;
var stones=[];
var zombie1;
var zombie2;
var zombie3;
var zombie4;
var zombiesad;
var backgroundImage;
var leftwall,rightwall,jointPoint,jointLink,breakButton,ground,zombie;


function preload() {
  zombie1 = loadImage("./assets/zombie1.png")
  zombie2 = loadImage("./assets/zombie2.png")

  zombie3 = loadImage("./assets/zombie3.png")
  zombie4 = loadImage("./assets/zombie4.png")
  zombiesad = loadImage("./assets/zombiesad.png")

  backgroundImage = loadImage("./assets/background.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
   
  ground= new Base(0,height-10,width*2,20)
  leftWall= new Base(100,height-300,200,height/2+100)
  rightWall= new Base(width-100,height-300,200,height/2+100)
  bridge= new Bridge(30,{x:50,y:height/2-142})
  jointPoint= new Base(width-250,height/2-100,40,20)

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for(var i = 0;i <=8; i++) {
    var x= random(width /2 - 200, width/ 2 +300)
     var y= random(-10, 140);
     var stone = new Stone(x,y,80,80)
     stones.push(stone)
    }

  zombie = createSprite(width / 2,height -100);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1)
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3)
  zombie.scale= 0.1;
  zombie.velocityX= 10;
  zombiesad.addImage("./assets/zombiesad.png");

  breakButton = createButton("");
  breakButton.position(width -200, height /2 -50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
    
 
}

function draw() {
  background(backgroundImage);
  
  Engine.update(engine);
   bridge.show()
   for(var stone of stones){
     stone.show()
   }
   if(zombie.position.x >= width-300){
     zombie.velocityX= -10;
     zombie.changeAnimation("righttoleft")
   }
   if(zombie.position.x <= width-300){
    zombie.velocityX= 10;
    zombie.changeAnimation("lefttoright")

  }

   for(var stone of stone) {
     stone.show();
     var pos = stone.body.position;
     var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
     if(distance <= 50) {
       zombie.velocityX = 0;
       Matter.body.velocity{ stone.body, { x: 10, y:-10}};
       zombie.chaneImage("sad");
       collided = true;
     }
   }
   

  drawSprites()

}

function handleButtonPress() {
  jointLink.dettach();
  setTimeout(() => {
  bridge.break();
     }, 1500);
  }