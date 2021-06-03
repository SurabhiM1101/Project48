var PLAY=1;
var END=0;
var gameState=PLAY;

var score;
function preload(){
  bgImage=loadImage("bg.png");
  doraImage=loadAnimation("d1.jpg","d2.jpg","d3.jpg","d4.jpg","d5.jpg","d6.jpg");
  obstacle1Image=loadImage("rock1.png");
  obstacle2Image=loadImage("r2.png");
  obstacle3Image=loadImage("r3.png");
  obstacle4Image=loadImage("r4.png");
  obstacle5Image=loadImage("r5.png");
  obstacle6Image=loadImage("r6.png");
  obstacle7Image=loadImage("r7.png");
  gadget1Image=loadImage("door.png");
  gadget2Image=loadImage("light.png");
  gadget3Image=loadImage("camera.png");
  gadget4Image=loadImage("wheel.png");
  gadget5Image=loadImage("remote.png");
  gadget6Image=loadImage("gun.png");
  gameoverImage=loadImage("gameoverimg.png");
  restartImage=loadImage("restartimg.png");
  jumpSound=loadSound("jump.mp3");
  gadgetSound=loadSound("gadget.wav");
  restartSound=loadSound("restart.wav");

  

}
function setup(){
  createCanvas(1200,750);
  bg=createSprite(450,500,1200,800);
  bg.addImage("scrolling",bgImage);
  bg.scale=2.0;
  bg.velocityX=-2;

  doraemon=createSprite(100,650,10,20);
  doraemon.addAnimation("running",doraImage);
  doraemon.scale=0.6;
  
  gameover=createSprite(600,300);
  gameover.addImage(gameoverImage);

  restart=createSprite(600,500);
  restart.addImage(restartImage);
  restart.scale=0.2;

  invisibleground=createSprite(600,730,1200,10);
  invisibleground.visible=false;

  obstaclesGroup=new Group();
  gadgetsGroup=new Group();

  score=0;
  
}
//function starts
function draw(){
  background("lightblue");
  //play state starting
  if (gameState==PLAY){

       if(bg.x<430){
          bg.x=470;
         }
         if(keyDown("space")&& doraemon.y>=350){
        doraemon.velocityY=-10;
        
        
          }
          doraemon.velocityY=doraemon.velocityY+0.8;
  
          if(gadgetsGroup.isTouching(doraemon)){
    
               gadgetsGroup.destroyEach();
               score=score+1;
               gadgetSound.play();
    
            }
           doraemon.collide(invisibleground);
           gameover.visible=false;
           restart.visible=false;

           spawnobstacles();
           spawngadgets();
           
           if(obstaclesGroup.isTouching(doraemon)){
             gameState=END;
             jumpSound.play();
             }
  }
  //play state ending
   


  //end state starting
   else if(gameState==END){
         gameover.visible=true;
         restart.visible=true;
        
         bg.velocityX=0;
          obstaclesGroup.destroyEach();
          gadgetsGroup.destroyEach();
          doraemon.destroy();
           if(mousePressedOver(restart)){
             reset();
             restartSound.play();
           }
  
          
            }
            //end state ending
  
            drawSprites(); 
            fill(0);
            textSize(30);
            text("No of Gadgets Collected:"+score,750,50);
          
          //function ends
  
          }


          //restart starts
 function reset(){
   gameState=PLAY;
   bg.velocityX=-2;
   score=0;
   doraemon=createSprite(100,650,10,20);
  doraemon.addAnimation("running",doraImage);
  doraemon.scale=0.6;

   gameover.visible=false;
  restart.visible=false;


 } 
 //restart ends


function spawnobstacles(){
   if(frameCount%200==0){
    var obstacle=createSprite(1200,650,10,10);
    obstacle.velocityX=-3;
    obstacle.scale=1.2;
    obstacle.lifetime=500;
    var rand=Math.round(random(1,7));
    switch(rand){
      case 1:obstacle.addImage(obstacle1Image);
      break;
      case 2:obstacle.addImage(obstacle2Image);
      break;
      case 3:obstacle.addImage(obstacle3Image);
      break;
      case 4:obstacle.addImage(obstacle4Image);
      break;
      case 5:obstacle.addImage(obstacle5Image);
      break;
      case 6:obstacle.addImage(obstacle6Image);
      break;
      case 7:obstacle.addImage(obstacle7Image);
      break;
    }
    obstaclesGroup.add(obstacle);
  }
}
function spawngadgets(){
  if(frameCount%300==0){
    var gadget=createSprite(1000,250,10,10);
    gadget.velocityX=-3;
    gadget.scale=0.6;
    gadget.lifetime=500;
    //gadget.debug=true;
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1:gadget.addImage(gadget1Image);
      break;
      case 2:gadget.addImage(gadget2Image);
      break;
      case 3:gadget.addImage(gadget3Image);
      break;
      case 4:gadget.addImage(gadget4Image);
      break;
      case 5:gadget.addImage(gadget5Image);
      break;
      case 6:gadget.addImage(gadget6Image);
      break;
      
    }
    gadgetsGroup.add(gadget);
  }
}

