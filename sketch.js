var trex,trex_running
var edges,ground,groundImage;
var cloud,cloudImage
var invisibleGround;
function preload (){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
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
}
function draw(){
  background("white")
  if(keyDown("space")&& trex.y>160){
    trex.velocityY=-8
  }
  //console.log(trex.y)
  ground.velocityX=-5
  if(ground.x<0){
    ground.x=ground.width/2
  }
  trex.velocityY=trex.velocityY+0.5;
  trex.collide(invisibleGround)
spawnClouds();
  drawSprites();
}
function spawnClouds(){
  if(frameCount%60===0){
    cloud=createSprite(600,Math.round(random(20,100)),40,10)
    cloud.addImage(cloudImage)
    cloud.scale=1
    cloud.velocityX=-3
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1
  }
}
