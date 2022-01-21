var trex,trex_running,trex_collided,restartImg,gameoverImg
var edges,ground,groundImage;
var cloud,cloudImage;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var invisibleGround;
var score;
var obstaclesGroup,cloudsGroup;
var Play=1;
var end=0;
var gameState=Play;
var restart,gameOver;
var jumpSound,checkpointSound,dieSound;
function preload (){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  trex_collided=loadImage("trex_collided.png")
  restartImg=loadImage("restart.png")
  gameoverImg=loadImage("gameOver.png")
  jumpSound=loadSound("jump.mp3")
  checkpointSound=loadSound("checkpoint.mp3")
  dieSound=loadSound("die.mp3")
}
function setup (){
  createCanvas(600,200) 
  trex=createSprite(50,160,20,50)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.scale=0.5
   ground=createSprite(300,180,600,20)
  ground.addImage(groundImage)
  invisibleGround=createSprite(300,190,600,10)
  invisibleGround.visible=false
  edges=createEdgeSprites();
  restart=createSprite(300,140)
  restart.addImage(restartImg)
  restart.scale=0.5
  gameOver=createSprite(300,110)
  gameOver.addImage(gameoverImg)
  gameOver.scale=1;
  //var run=Math.round(random(10,60))
  //console.log(run)
  score=0;
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
}
function draw(){
  background("white")
  text("Score: "+score,500,50)
  
  if(gameState===Play){
    gameOver.visible=false
    restart.visible=false
    score=score+Math.round(frameCount/60)
    if(keyDown("space")&& trex.y>160){
      trex.velocityY=-8
      jumpSound.play()
    }
    //console.log(trex.y)
    ground.velocityX=-100
    if(ground.x<0){
      ground.x=ground.width/2
    }
    if(score>0 && score%1000===0){
      checkpointSound.play()
    }
    trex.velocityY=trex.velocityY+0.5;
    spawnObstacles();
spawnClouds();
    if (obstaclesGroup.isTouching(trex)){
      //trex.velocityY=-8
      //jumpSound.play()
    gameState=end  
    dieSound.play()
    }
  }
  else if(gameState===end){
    gameOver.visible=true
    restart.visible=true
   ground.velocityX=0;
   trex.velocityY=0
   trex.changeAnimation("collided",trex_collided)
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    if(mousePressedOver(restart)){
      reset()
    }
  }
  
  
 
  trex.collide(invisibleGround)
  
  drawSprites();
}
function spawnClouds(){
  if(frameCount%60===0){
    cloud=createSprite(600,Math.round(random(20,100)),40,10)
    cloud.addImage(cloudImage)
    cloud.scale=1
    cloud.velocityX=-3
    cloud.lifetime=200
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1
    cloudsGroup.add(cloud)
  }
}
function spawnObstacles(){
if(frameCount%60===0){
  obstacle=createSprite(600,165,10,40)
  obstacle.velocityX=-20-10*(score/100)
  var rand=Math.round(random(1,6))
  switch(rand){
    case 1:obstacle.addImage(obstacle1);
    break;
    case 2:obstacle.addImage(obstacle2);
    break;
    case 3:obstacle.addImage(obstacle3);
    break;
    case 4:obstacle.addImage(obstacle4);
    break;
    case 5:obstacle.addImage(obstacle5);
    break;
    case 6:obstacle.addImage(obstacle6);
    break;
    default:break
  }
  obstacle.lifetime=100
  obstacle.scale=0.5
  obstaclesGroup.add(obstacle)
}

}
function reset(){
  gameState = Play;
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running",trex_collided)
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
}