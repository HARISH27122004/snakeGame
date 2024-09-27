const gameBoard = document.getElementById("gameBoard");
const scoreValue = document.getElementById("scoreValue");
const context = gameBoard.getContext('2d');
const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25

let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = true;
let started = false;
let paused = false;
let timing = 500;

let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];

window.addEventListener("keydown",pressKey)
startGame();

function startGame(){
    context.fillStyle = "#212121";
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayFood();
    drawSnake();
}

function clearBoard(){
    context.fillStyle = "#212121";
    context.fillRect(0,0,WIDTH,HEIGHT);
}

function createFood(){
    let validPosition = false;

    while(!validPosition){
        foodX = Math.floor(Math.random() * WIDTH / UNIT) * UNIT;
        foodY = Math.floor(Math.random() * HEIGHT / UNIT) * UNIT
        validPosition = true; 
        for (let i = 0; i < snake.length; i++){
            if (snake[i].x === foodX && snake[i].y === foodY){
                validPosition = false;
                break;
            }
        }
    }
}

function displayFood(){
    context.fillStyle = "red";
    context.fillRect(foodX,foodY,UNIT,UNIT);
}

function drawSnake(){
    context.fillStyle = "aqua";
    context.strokeStyle = "#212121"
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xVel,
                  y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score+=1
        scoreValue.textContent = score
        createFood();
    }
    else
    snake.pop()
}

function nextTick(){
    if(active && !paused){
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    },timing)
}

else if(!active){
    clearBoard()
    context.font = "bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("GAME OVER!!!",WIDTH/2,HEIGHT/2)
}
}

function pressKey(event){
    if(!started){
        started = true;
        nextTick();
    }
    if(event.keyCode === 32){
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }

    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    switch(true){
        case(event.keyCode==LEFT && xVel!==UNIT):
        xVel=-UNIT;
        yVel=0;
        break;
        case(event.keyCode==RIGHT && xVel!==-UNIT):
        xVel=UNIT;
        yVel=0;
        break;
        case(event.keyCode==UP && yVel!==UNIT):
        xVel=0;
        yVel=-UNIT;
        break;
        case(event.keyCode==DOWN && yVel!==-UNIT):
        xVel=0;
        yVel=UNIT;
        break;
    }
}

function checkGameOver(){
    if(snake[0].x < 0 || snake[0].x >= WIDTH || snake[0].y < 0 || snake[0].y >= HEIGHT) {
        active = false;
    }
        for(let i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                active = false;
                break;
    }
}
}

function easy(){
    timing = 400
}

function medium(){
    timing = 100
}

function hard(){
    timing = 50
}

function pressKey(event){
    if(!started){
        started = true;
        nextTick();
    }
    if(event.keyCode === 32){
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }

    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    switch(true){
        case(event.keyCode==LEFT && xVel!==UNIT):
        xVel=-UNIT;
        yVel=0;
        break;
        case(event.keyCode==RIGHT && xVel!==-UNIT):
        xVel=UNIT;
        yVel=0;
        break;
        case(event.keyCode==UP && yVel!==UNIT):
        xVel=0;
        yVel=-UNIT;
        break;
        case(event.keyCode==DOWN && yVel!==-UNIT):
        xVel=0;
        yVel=UNIT;
        break;
    }
}

function forDown(){
    if(yVel!==-UNIT){
        xVel=0;
        yVel=UNIT;
    }
}

function forUp(){
    if(yVel!==UNIT){
        xVel=0;
        yVel=-UNIT;
    }
}

function forRight(){
    if(xVel!==-UNIT){
        xVel=UNIT;
        yVel=0;
    }
}

function forLeft(){
    if(xVel!==UNIT){
        xVel=-UNIT;
        yVel=0;
    }
}

function start(){
    const st = document.getElementById("start")
    st.style.display="none"
    if(!started){
        started = true;
        nextTick();
    }
}
