// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed)*dt;
    if(this.x>500)
    this.x=0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = 0;
    this.level = 0;
};
Player.prototype.update = function(dt){
};
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(code){

    switch(code){
      case 'left':
      this.x-=this.speed;
      break;
      case 'up':
      this.y-=this.speed;
      break;
      case 'right':
      this.x+=this.speed;
      break;
      case 'down':
      this.y+=this.speed;
      break;
    }
    if(this.x<2.5){
      this.x = 2.5;
    }else if(this.x>400){
      this.x=400;
    } else if (this.y<1){
      this.y = -10;
    }else if(this.y>405){
      this.y=405;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


var allEnemies = [new Enemy(0,220,100)];

// Place the player object in a variable called player
var player = new Player(200,405,85);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
// Other functionalities on the game


// Check Collisions
var checkCollisions=function(){
    allEnemies.forEach(function(e){
      // Check the current position of player and enemies
      if ((e.x+80>player.x && e.x+85<player.x+80||e.x>player.x&&e.x<player.x+70)&&(e.y+70>player.y && e.y-70<player.y)){
        player.reset(false);
        console.log("collision detected");
      }else if(player.y<1){
        player.reset(true);
        console.log("winner");
      }
    });
};

//Reset player on collision
Player.prototype.reset = function(bool){
  if(bool){
    this.score+=10;
    this.x = 200;
    this.y = 405;
    this.level++;
  }else{
  this.x = 200;
  this.y = 405;
  this.score = 0;
  this.level = 0;
}
this.changeLevel();
document.getElementById("score").innerHTML="Score: "+this.score;
document.getElementById("level").innerHTML="Level: "+this.level;
};

//increase difficulty currently 5 levels

Player.prototype.changeLevel = function(){
  switch (this.level) {
    case 6:
      alert("Congratulations! You have won.");
      player.reset(false);
      break;
    case 5:
    allEnemies[6] = new Enemy(0,50,150);
    break;
    case 4:
    allEnemies[5] = new Enemy(0,50,100);
    break;
    case 3:
    allEnemies[4] = new Enemy(0,135,150);
    break;
    case 2:
    allEnemies[3] = new Enemy(0,220,250);
    break;
    case 1:
    allEnemies[0] = new Enemy(0,50,50);
    allEnemies[1] = new Enemy(0,135,75);
    allEnemies[2] = new Enemy(0,220,100);
    break;
    default:
    allEnemies = [];
    allEnemies[0] = new Enemy(0,220,100);
  }
};
