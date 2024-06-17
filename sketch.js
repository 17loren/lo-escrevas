let leftPaddle;
let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;
let backgroundColor = 0;

function setup() {
  createCanvas(600, 400);
  leftPaddle = new Paddle(20, height / 2);
  rightPaddle = new Paddle(width - 20, height / 2);
  ball = new Ball();
}

function draw() {
  background(backgroundColor);
  
  // Desenha as paletas e a bola
  leftPaddle.show();
  rightPaddle.show();
  ball.show();
  
  // Move as paletas
  leftPaddle.update();
  rightPaddle.update();
  
  // Move e verifica a colisão da bola
  ball.update();
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);
  
  // Verifica se a bola saiu da tela e marca o ponto
  if (ball.isOffScreen()) {
    if (ball.x < 0) {
      rightScore++;
      backgroundColor = color(255, 0, 0); // Muda o fundo para vermelho
    } else {
      leftScore++;
      backgroundColor = color(0, 255, 0); // Muda o fundo para verde
    }
    ball.reset();
    setTimeout(() => { backgroundColor = color(0); }, 1000); // Volta para a cor preta depois de 1 segundo
  }
  
  // Exibe a pontuação
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, 3 * width / 4, 50);
}

// Função para controlar as paletas com as teclas
function keyPressed() {
  if (keyCode === UP_ARROW) {
    rightPaddle.move(-10);
  } else if (keyCode === DOWN_ARROW) {
    rightPaddle.move(10);
  }
  
  if (key === 'w' || key === 'W') {
    leftPaddle.move(-10);
  } else if (key === 's' || key === 'S') {
    leftPaddle.move(10);
  }
}

// Função para parar as paletas quando as teclas são soltas
function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    rightPaddle.move(0);
  }
  
  if (key === 'w' || key === 'W' || key === 's' || key === 'S') {
    leftPaddle.move(0);
  }
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 80;
    this.speed = 0;
  }
  
  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
  
  update() {
    this.y += this.speed;
    this.y = constrain(this.y, this.h / 2, height - this.h / 2);
  }
  
  move(step) {
    this.speed = step;
  }
}

class Ball {
  constructor() {
    this.reset();
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, 20);
  }
  
  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1;
    }
  }
  
  checkCollision(paddle) {
    if (this.x - 10 < paddle.x + paddle.w / 2 && this.x + 10 > paddle.x - paddle.w / 2 && this.y - 10 < paddle.y + paddle.h / 2 && this.y + 10 > paddle.y - paddle.h / 2) {
      this.xspeed *= -1;
    }
  }
  
  isOffScreen() {
    return this.x < 0 || this.x > width;
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = random(3, 5) * (random() > 0.5 ? 1 : -1);
    this.yspeed = random(2, 4) * (random() > 0.5 ? 1 : -1);
  }
}