c = document.getElementById("myCanvas");
ctx = c.getContext("2d");
window.addEventListener("keydown", addKeydown);
window.addEventListener("keyup", addKeyup);

let tid = 60;
let score = 0;
let playerX = Math.random();
let playerY = Math.random();
let circleX = Math.random();
let circleY = Math.random();
let playerSpeed = 5;
const circleRadius = 20;
const playerRadius = 10;
let intervallId;


function timer()
{
    if(tid > 0)
    {
        tid--;
        document.getElementById("tid").innerHTML = "tid: " + tid;
    }
    else
    {
        alert("Game over " + "poäng: " + score);
        clearInterval(intervallId);
        location.reload();//Uppdaterar webbsidan
    }
    
}
intervallId = setInterval(timer,1000);

/*array som har koll på
vilka tangenter som är nedtryckta.*/
let keyPressed = new Array();

//funktion som laddar bilden
function uppdatera()
{
    ctx.clearRect(0, 0, c.width, c.height);
    drawCircle(playerX, playerY, playerRadius); //anropar min funktion.
    drawCircle(circleX, circleY, circleRadius);
}

//funktion för att rita cirklar
function drawCircle(x, y, r)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    ctx.fill();
}

/*Funktioner som lägger till och 
tar bort tangenter
från keyPressed[]*/
function addKeydown(evt)
{
    keyPressed[evt.key] = true;
}

function addKeyup(evt)
{
    keyPressed[evt.key] = false;
}

/*funktion för manuell ändring av 
variablerna*/
function randomizeVariables()
{
    playerX = Math.random() * c.width;
    playerY = Math.random() * c.height;
    circleX = Math.random() * c.width;
    circleY = Math.random() * c.height;
}

function movePlayer()
{
    if (keyPressed["w"])
        playerY -= playerSpeed;

    if (keyPressed["a"])
        playerX -= playerSpeed;

    if (keyPressed["s"])
        playerY += playerSpeed;

    if (keyPressed["d"])
        playerX += playerSpeed;

    
    
    if(playerX > c.width)
        playerX = 5;

    if (playerX < 0)
        playerX = c.width - 5;

    if(playerY > c.height)
        playerY = 5;

    if (playerY < 0)
        playerY = c.height - 5;
    

    /*Räknar ut avståndet 
    med pythagoras sats. */
    let distX = playerX - circleX;
    let distY = playerY - circleY;
    let distance = Math.sqrt(distX ** 2 + distY ** 2);
    if (distance < (playerRadius + circleRadius))
    {
        randomizeVariables();//egen funktion
        
        document.getElementById("score").innerHTML = "poäng: " + score;
        score += 1;
        playerSpeed += 0.5;
    }

    //egen funktion.
    uppdatera();
}
/*anropa movePlayer() var 
tjugonde millisekund*/
setInterval(movePlayer, 20);