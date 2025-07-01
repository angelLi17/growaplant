//home button font not changing, not working. make mouse cursor change to plant, not working. center it, but its not working. randomize grow quotes

/* VARIABLES */
let catcher, fallingObject, plant1, plant2, plant3, plantE; 
let water, button1, button2, backButton, song; 
let score = 0;
let level = 1;
let screen=0;
let bg1, bg2, bg3;

/* PRELOAD LOADS FILES */
function preload(){
  plant1 = loadImage("assets/plant1.png");
  plant2 = loadImage("assets/plant2.png");
  plant3 = loadImage("assets/plant3.png");
  plantE = loadImage("assets/plantE.png");
  water = loadImage("assets/water.png");
  title = loadFont("assets/Leaves-Yy4a.ttf");
  //bg1 = createImg("assets/Untitled_Artwork.gif");
  bg2 = loadImage("assets/bg2.png");
  bg3 = loadImage("assets/bg3.png");
  // cursor = loadImage("assets/cursor.png");
  // song = loadSound("assets/song.mp3");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  // song.play();
  // song.loop();
  
  //resize images
  plant1.resize(75,0);
  plant2.resize(75,0);
  plant3.resize(75,0);
  plantE.resize(75,0);
  bg2.resize(400,0);
  water.resize(30,0);
  
  backButton = new Sprite(100, 100, 100, 50);
  backButton.color = "0,0,0";
  backButton.textSize = 20;
  backButton.textFont = 'Sans-Serif';
  backButton.stroke = "0,0,0";
  backButton.textColor = color("DarkSeaGreen"); 
  backButton.text = "Back";

  // textFont('Sans-Serif');
  //buttons
  button1 = new Sprite(width/2-100, height/2+100, 120, 50, 'k');
  button1.color = "0,0,0";
  button1.textSize = 15;
  button1.color = "0,0,0";
  //button1.stroke = "0,0,0";
  button1.textFont = 'Sans-Serif';
  button1.textColor = color("DarkSeaGreen");
  button1.text = "Directions";

  button2 = new Sprite(width/2+100, height/2+100, 120, 50, 'k');
  button2.textSize = 15;
  button2.text = "Play";
  button2.color = "0,0,0";
  button2.textFont = 'Sans-Serif';
  //button2.stroke = "0,0,0";
  button2.textColor = color("DarkSeaGreen");

  catcher = new Sprite(plant1, -200,-200,"k");
  fallingObject = new Sprite(water, -100,-100,30);

  screen0();
}

/* DRAW LOOP REPEATS */
function draw() {
  if (screen==0) {
    if (button1.mouse.presses()) {
      screen=1;
      screen1();
    } else if(button2.mouse.presses()) {
      screen=2;
      screen2();
    }
  } else if(screen==1){
    if (backButton.mouse.presses() && (score!=0 || level != 1)) {
      screen2();
      screen=2;
    } else if (backButton.mouse.presses()) {
      screen0();
      screen=0;
    }
  } else if(screen==2) {
    background(bg2);

    if (button1.mouse.presses()) {
      screen=1;
      screen1();
    }

    // Type scoring and level
    textSize(15);
    textFont("Sans-Serif");
    fill("0,0,0");
    textAlign(LEFT);
    text("Score: "+score+"\nLevel: " + level, 10, 20);
    
    // Controls for moving catcher
    if(kb.presses("left")) {
      catcher.vel.x=-(4+level);
    } else if(kb.presses("right")) {
      catcher.vel.x=4+level;
    }
    
    // Catching the object
    if(fallingObject.overlaps(catcher)) {
      score++;
      fallingObject.y=0;
      fallingObject.x = random(15,width-15);
      fallingObject.vel.y = random(level+2,level+5);
      fallingObject.direction = "down";
    }

    if(fallingObject.overlaps(button1)) {
      fallingObject.y=70;
      fallingObject.direction = "down";
    }
    
    // Not catching the object
    if(fallingObject.y >= height) {
      score--;
      fallingObject.y = -15;
      fallingObject.x = random(15,width-15);
      fallingObject.vel.y = random(level+2,level+5);
      fallingObject.direction = "down";
    }
    
    // Level up
    if(score==10) {
      level++;
      score=0;
      screen=5;
      screen5();
    }
    
    //Preventing catcher movement beyond the screen
    if (catcher.x < -60) {
      catcher.pos.x = width;
    } else if (catcher.x > width+60) {
      catcher.pos.x = 0;
    }

    // game ends
    if (level==4) {
      screen=3; 
      screen3();
    } else if(score==-5) {
      screen=3;
      screen4();
    }
  } else if(screen==3) {
    // restart
    if (mouse.presses()) {
      screen=2;
      score=0;
      level=1;
      catcher.image=plant1;
      screen2();
    }
  }
  else if (screen == 5) {
    if (mouse.presses()) {
      screen=2;
      screen2();
    }
  }
}

function screen0() {
  clear();
  // bg1.position(0,0);
  // bg1.size(400,400);
  // bg1.class('behind');
  background(bg2);

  //remove backbutton
  backButton.pos = {x:-100, y:-100};  

  fill("DarkSeaGreen");
  noStroke();
  rect(width/2-150, 50,300,30);
  
  //Create title
  textSize(30);
  textAlign(CENTER);
  textFont(title);
  fill(255);
  text("Grow A Plant", width/2, 80);
}

function screen1() {
  clear();
  background(bg2);
  textSize(15);
  textAlign(CENTER);
  textFont("Sans-Serif");
  fill("0,0,0");
  text("\[ Keyboard Controls: ArrowLeft, ArrowRight \]\nCatch the water drops. 1 drop = 1 pt. Not catching \n 1 drop = -1 pt. 10 pt = level up. -5 pt = plant wilted.", width/2, height/2-140);
  
  backButton.pos = {x:width/2, y:height/2+100};
  
  catcher.vel.x=0;
  catcher.pos = {x : -200, y : -200};
  fallingObject.vel.y=0;
  fallingObject.pos = {x : -100, y : -100};
  button1.pos = {x:-200, y:-200};
  button2.pos = {x:-200, y:-200};

  //background
}

function screen2() {
  // Delete prev stuff
  clear();
  background(bg2);
  button2.pos = {x:-100, y:-100};
  backButton.pos = {x:-100, y:-100};

  //move directions
  button1.pos = {x:width-65, y:30};
  
  //Create catcher 
  catcher.pos = {x:200,y:height-50}
  if (level==2) {
    catcher.image = plant2;
    catcher.pos.y = height-60;
  } else if (level==3) {
    catcher.image = plant3;
    catcher.pos.y = height-68; //edit 50 and 40 values 
  }

  //Create falling object
  fallingObject.vel.y = random(level+2,level+4);
  fallingObject.y=0;
  fallingObject.pos.x = random(15,width-130);
  fallingObject.rotationLock = true;
  fallingObject.direction = "down";
}

function screen3() {
  // clear prev
  clear();
  catcher.image = plantE;
  catcher.vel.x=0;
  fallingObject.vel.y=0;
  catcher.x = width/2;
  catcher.pos.y = width-75;
  fallingObject.pos = {x : -100, y : -100};
  button1.pos = {x:-200, y:-200};
  
  //background
  bg1.style('display', 'block');

  // text
  textAlign(CENTER);
  textSize(25);
  textFont("Sans-Serif");
  fill("0,0,0");
  text("Yay! Your plant has \ngrown so big.", width/2, height/2-120);
  textSize(15);
  text("Click to grow another plant.", width/2, height/2-70);
  textAlign(LEFT);
  //fill("#354036");
  text("Hope: the capabality \nof perceiving \noneself or situation \nas changeable and \nwith potential.", width/2-190, height-160);
  textAlign(RIGHT);
  text("Life will throw hills \nand valleys your way. \nSee that your life \nis full of hope, so \nthat you may bloom.", width-10, height-160);
}

function screen4() { 
  // clear prev
  clear();
  catcher.vel.x=0;
  catcher.pos = {x : -200, y : -200};
  fallingObject.vel.y=0;
  fallingObject.pos = {x : -100, y : -100};
  button1.pos = {x:-200, y:-200};
  
  //background
  bg1.style('display', 'block');

  // text
  textSize(25);
  textAlign(CENTER);
  textFont("Sans-Serif");
  fill("0,0,0");
  text("Your plant wilted :\'\(", width/2, height/2-130);
  textSize(15);
  text("Click to revive it with hope!", width/2, height/2-110);
}

function screen5() {
  clear();
  catcher.vel.x=0;
  catcher.pos = {x : -200, y : -200};
  fallingObject.vel.y=0;
  fallingObject.pos = {x : -100, y : -100};
  button1.pos = {x:-200, y:-200};
  
  background(bg3);

  textSize(30);
  textAlign(LEFT);
  fill("DarkSeaGreen");
  textFont(title);
  //text("Grow \nQuote", width/2-150, height/2-120);
  
  textFont("title");
  textAlign(LEFT);
  textSize(20);
  if (level==2) {
    text("To plant a garden \nis to believe in tomorrow.", width/2-150, height/2+90);
  } else if (level==3) {
    text("If there is a will, \nthere is a way.", width/2-150, height/2+90);
  }
  textSize(15);
  text("Level " + level + ": Click to continue.", width/2-150, height/2+160);
}