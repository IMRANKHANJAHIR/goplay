const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
    { x: 200, y: 200 }
];

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", changeDirection);

// Save score to MongoDB
async function saveScore() {

    try {

        await fetch("/snake/score", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                score: score
            })

        });

    } catch (err) {
        console.log(err);
    }

    alert(
`💀 Game Over!

Score : ${score}

Coins Earned : ${score * 5}

XP Earned : ${score * 2}`
    );

    location.reload();
}

function changeDirection(event) {

    if (event.key === "ArrowLeft" && direction !== "RIGHT")
        direction = "LEFT";

    if (event.key === "ArrowUp" && direction !== "DOWN")
        direction = "UP";

    if (event.key === "ArrowRight" && direction !== "LEFT")
        direction = "RIGHT";

    if (event.key === "ArrowDown" && direction !== "UP")
        direction = "DOWN";
}

function draw() {

    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, 400, 400);

    // Draw Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw Snake
    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = (i === 0) ? "#00ff66" : "#55ff99";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );
    }

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;

    // Eat Food
    if (headX === food.x && headY === food.y) {

        score++;

        document.getElementById("score").innerHTML = score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

    } else {

        snake.pop();

    }

    const newHead = {
        x: headX,
        y: headY
    };

    // Wall Collision
    if (
        headX < 0 ||
        headY < 0 ||
        headX >= 400 ||
        headY >= 400
    ) {

        clearInterval(game);

        saveScore();

        return;

    }

    // Self Collision
    for (let i = 1; i < snake.length; i++) {

        if (
            snake[i].x === headX &&
            snake[i].y === headY
        ) {

            clearInterval(game);

            saveScore();

            return;

        }

    }

    snake.unshift(newHead);

}

const game = setInterval(draw, 150);