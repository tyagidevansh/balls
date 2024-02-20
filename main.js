const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function randomRGB() {
    return `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
}

class Ball {
    constructor(x, y, velx, vely, color, size) {
        this.x = x;
        this.y = y;
        this.velx = velx;
        this.vely = vely;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velx = -(this.velx);
        }

        if ((this.x - this.size) <= 0) {
            this.velx = -(this.velx);
        }

        if ((this.y + this.size) >= height) {
            this.vely = -(this.vely);
        }
        
        if ((this.y - this.size) <= 0) {
            this.vely = -(this.vely);
        }

        this.x += this.velx;
        this.y += this.vely;
    }

    collision() {
        for (const ball of balls) {
            if (this !== ball) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                    const tempVelX = this.velx;
                    const tempVelY = this.vely;
                    this.velx = ball.velx;
                    this.vely = ball.vely;
                    ball.velx = tempVelX;
                    ball.vely = tempVelY;
                }
            }
        }
    }
}

const balls = [];

while (balls.length < 100) {
    const size = random(10,20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collision();
    }

    requestAnimationFrame(loop);
}

loop();