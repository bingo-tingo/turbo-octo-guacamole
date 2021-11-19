var bg, bgImg;
var shooter,shooterImg,shooterShooting,shooterImg2;
var zombie,zombieImg,zombieGroup;
var heartImg1,heartImg2,heartImg3,heart2,heart2,heart3,score;


function preload () {
  bgImg = loadImage("assets/bg.jpeg");
  shooterImg = loadImage("assets/shooter_1.png");
  shooterImg2 = loadImage("assets/shooter_2.png");
  shooterShooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  heartImg1 = loadImage("assets/heart_1.png");
  heartImg2 = loadImage("assets/heart_2.png");
  heartImg3 = loadImage("assets/heart_3.png");

}

function setup () {
   createCanvas(windowWidth,windowHeight);

   // adding a background image
   bg = createSprite(displayWidth/2 - 20,displayHeight/2 - 20,590,700);
   bg.addImage(bgImg);
   bg.scale = 0.90;

   // creating player/shooter sprite
   shooter = createSprite(displayWidth - 1150,displayHeight - 300,50,50);
   shooter.addImage(shooterImg);
   shooter.scale = 0.4;
   shooter.setCollider("circle",0,0,80);
   shooter.debug = true

   zombieGroup = new Group();

   heart1 = createSprite(displayWidth - 140,displayHeight - 700,50,50);
   heart1.addImage(heartImg1);
   heart1.scale = 0.3;

   heart2 = createSprite(displayWidth - 230,displayHeight - 700,50,50);
   heart2.addImage(heartImg2);
   heart2.scale = 0.3;

   heart3 = createSprite(displayWidth - 380,displayHeight - 700,50,50);
   heart3.addImage(heartImg3);
   heart3.scale = 0.3;

}

function draw () {
  background(0);

  // moving the shooter in different direction
  if (keyDown("UP_ARROW") || touches.length > 0) {
    shooter.y = shooter.y-30 ;
  }

  if (keyDown("DOWN_ARROW")) {
     shooter.y = shooter.y+30;
  }

  if (keyWentDown("RIGHT_ARROW")) {
    shooter.x = shooter.x+30 ;
    shooter.addImage(shooterImg2);
  }

  if (keyWentUp("RIGHT_ARROW")) {
    shooter.x = shooter.x+30 ;
    shooter.addImage(shooterImg);
  }

  if (keyDown("LEFT_ARROW")) {
    shooter.x = shooter.x-30 ;
  }

  if (keyWentDown("SPACE")) {
    shooter.addImage(shooterShooting);
    shooterShooting.scale = 0.4;
  }

  else if (keyWentUp("SPACE")) {
    shooter.addImage(shooterImg);
  }

  // destroing the zombie when touching the shooter
  if (zombieGroup.isTouching(shooter)) {
     for (var i=0; i < zombieGroup.length ; i++){
       if (zombieGroup[i].isTouching(shooter)){
         zombieGroup[i].destroy();
       }
     }
  }

  // calling the enemy function
  enemy();
  drawSprites();

} 

// spawning zombies at random positions
function enemy (){
if (frameCount % 50 === 0) {
  zombie = createSprite(random(500,1100),random(100,500),70,70);
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = -6;
  zombie.debug = true;
  zombie.setCollider("rectangle",0,0,400,400)
  zombie.lifetime = 400;
  zombieGroup.add(zombie);
}
}
