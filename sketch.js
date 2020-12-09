
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,ground,bg,backImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg = loadImage("jungle.jpg");
}



function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  //createCanvas(700,700);
  backImage = createSprite(0,0,displayWidth - 20,displayHeight-30);
  backImage.addImage("jungle",bg);
  backImage.scale = 1.7;
  
  monkey = createSprite(80,240,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale = 0.1;
  
  //ground = createSprite(300,250,600,10);
  //ground.visible = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
}


function draw() {
  monkey.velocityX = 0;
  camera.position.x = monkey.x;
  camera.position.y = displayHeight/2;
  if (gameState === PLAY){
  /*
    backImage.velocityX = -6;
    if(backImage.x<0){
      backImage.x = backImage.width/2;
    }
    */
  
    
    //if (keyDown("space") && monkey.y>295){
      //monkey.velocityY = -12;
    //}
    if (keyDown(LEFT_ARROW)) {
    monkey.velocityX = -4;
    }
    if (keyDown(RIGHT_ARROW)) {
    monkey.velocityX = 4;
    }
    //monkey.velocityY = monkey.velocityY + 1;
    survivalTime = Math.round(frameCount/80);

    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    if (foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    
    create_obstacle();
    create_food();
    switch(score) {
      case 3: monkey.scale = 0.12;
              break;
      case 7: monkey.scale = 0.14;
              break;
      case 12: monkey.scale = 0.16;
              break;
      case 15: monkey.scale = 0.18;
              break;
      case 20: monkey.scale = 0.20;
              break;
      default: break;
    }
  }
  if (gameState === END){
    obstacleGroup.setVelocityYEach(0);
    foodGroup.setVelocityYEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  //monkey.collide(ground);
  drawSprites();
  stroke("white");
  fill("white");
  textSize(16);
  text("Survival Time: " + survivalTime,600,50);
  text("Bananas: " + score,50, 50);
  textSize(25);
  if (gameState === END){
    text("Game Over",300,300);
  }
  
}
function create_food(){
  if(frameCount % 100 === 0){
     banana = createSprite(Math.round(random(0, 700)),10,20,20);
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityY = 6;
     banana.lifetime = 70;
     foodGroup.add(banana);
  }
}
function create_obstacle(){
  if(frameCount % 90 === 0){
     obstacle = createSprite(Math.round(random(0, 700)),10,20,20);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityY = 6;
     obstacle.lifetime = 70;
     obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",0,0,170);
  }
}  