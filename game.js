//Game constants and variables
let gameboard = document.querySelector(".gameboard");
let direction = {x:0, y:0};
let speed=15;
let lastPaintTime = 0;
let snakeArr=[{x:13, y:15}];
let food = {x:10, y:6};
let score=0;
let inputDir = {x:0, y:0};

//Game functions
function main(ctime){
    window.requestAnimationFrame(main); 
   
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine()
    
}
function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i<snake.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
        if(snake[0].x>=25 || snake[0].x<=0 || snake[0].y>=25 || snake[0].y<=0){
            return true;
        }
        
    
}
function gameEngine(){
    //part1:updating the snake array and food
        if(isCollide(snakeArr)){
            inputDir = {x:0, y:0};
            alert("game Over. Press any key");
            snakeArr = [{x:13,y:15}];
            score=0;
        }

if(snakeArr[0].y===food.y && snakeArr[0].x === food.x){
    snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+inputDir.y});
    let a=2;
    let b=16;
    food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
    score++;
    console.log("your score is "+score);
}
//moving the snake
for(let i=snakeArr.length-2;i>=0;i--){
  
    snakeArr[i+1]={...snakeArr[i]};
}
 snakeArr[0].x +=inputDir.x;
 snakeArr[0].y += inputDir.y;
    //part 2:Display the snake and food

    gameboard.innerHTML ="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add("head");
        gameboard.appendChild(snakeElement);

    });
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    gameboard.appendChild(foodElement);
}




















//main logic is here
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir = {x:0, y:1} //start the game
    switch (e.key){
        case "w":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "s":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "a":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "d":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})