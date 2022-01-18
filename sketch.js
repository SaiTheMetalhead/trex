var trex,trex_running
var edges,ground,groundImage;
var cloud,cloudImage;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var invisibleGround;
var score;
var obstaclesGroup,cloudsGroup;
var Play=1;
var end=0;
var gameState=Play;
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
}
function setup (){
  createCanvas(600,200) 
  trex=createSprite(50,160,20,50)
  trex.addAnimation("running",trex_running)
  trex.scale=0.5
   ground=createSprite(300,180,600,20)
  ground.addImage(groundImage)
  invisibleGround=createSprite(300,190,600,10)
  invisibleGround.visible=false
  edges=createEdgeSprites();
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
    score=score+Math.round(frameCount/60)
    if(keyDown("space")&& trex.y>160){
      trex.velocityY=-8
    }
    //console.log(trex.y)
    ground.velocityX=-5
    if(ground.x<0){
      ground.x=ground.width/2
    }
    trex.velocityY=trex.velocityY+0.5;
    spawnObstacles();
spawnClouds();
    if (obstaclesGroup.isTouching(trex)){
    gameState=end  
    }
  }
  else if(gameState===end){
   ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
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
  obstacle.velocityX=-6
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
