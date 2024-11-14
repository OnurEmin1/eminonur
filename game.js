const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Boje
const COLORS = {
    WHITE: "#FFFFFF",
    BLACK: "#000000",
    RED: "#FF0000",
    GREEN: "#00FF00"
};

// Igrač
const playerSize = 50;
let playerX = WIDTH / 2;
const playerY = HEIGHT - playerSize - 10;
const playerSpeed = 7;

// Projektili
const bulletSize = 5;
const bulletSpeed = -10;
const bullets = [];

// Neprijatelji
const enemySize = 50;
const enemies = [];
const enemySpeed = { normal: 4 };
let lastEnemySpawn = Date.now();
const enemySpawnTime = 1000;

// Rezultat
let score = 0;
let lives = 3;  // Početni broj života

// Funkcija za stvaranje neprijatelja
function spawnEnemy() {
    const enemyX = Math.random() * (WIDTH - enemySize);
    enemies.push({ x: enemyX, y: -enemySize, type: "normal", direction: Math.random() > 0.5 ? 1 : -1 });
}

// Funkcija za crtanje teksta
function drawText(text, x, y, color = COLORS.WHITE) {
    ctx.fillStyle = color;
    ctx.font = "36px Arial";
    ctx.fillText(text, x, y);
}

// Funkcija za crtanje srca
function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 2, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 2, x + size / 2, y - size / 2, x, y);
    ctx.closePath();
    ctx.fillStyle = COLORS.RED;
    ctx.fill();
}

// Glavna funkcija za ažuriranje stanja igre
function update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Kretanje igrača
    if (keys["ArrowLeft"] && playerX > 0) playerX -= playerSpeed;
    if (keys["ArrowRight"] && playerX < WIDTH - playerSize) playerX += playerSpeed;

    // Ispaljivanje metaka
    if (keys[" "]) bullets.push({ x: playerX + playerSize / 2, y: playerY });

    // Kretanje metaka
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y += bulletSpeed;
        if (bullets[i].y < 0) bullets.splice(i, 1);
    }

    // Generisanje neprijatelja
    if (Date.now() - lastEnemySpawn > enemySpawnTime) {
        spawnEnemy();
        lastEnemySpawn = Date.now();
    }

    // Kretanje neprijatelja
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.y += enemySpeed[enemy.type];
        if (enemy.y > HEIGHT) {
            enemies.splice(i, 1);
            lives--;  // Oduzimanje života
            if (lives <= 0) resetGame();  // Ako nemaš više života, resetuj igru
        }
    }

    // Sudar metaka i neprijatelja
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            const bullet = bullets[i];
            const enemy = enemies[j];
            if (
                bullet.x < enemy.x + enemySize &&
                bullet.x + bulletSize > enemy.x &&
                bullet.y < enemy.y + enemySize &&
                bullet.y + bulletSize > enemy.y
            ) {
                bullets.splice(i, 1);
                enemies.splice(j, 1);
                score++;
                break;
            }
        }
    }

    // Crtanje igrača
    ctx.fillStyle = COLORS.GREEN;
    ctx.fillRect(playerX, playerY, playerSize, playerSize);

    // Crtanje metaka
    ctx.fillStyle = COLORS.WHITE;
    bullets.forEach(bullet => ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize));

    // Crtanje neprijatelja
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.type === "normal" ? COLORS.RED : COLORS.WHITE;
        ctx.fillRect(enemy.x, enemy.y, enemySize, enemySize);
    });

    // Prikaz rezultata
    drawText(`Score: ${score}`, 10, 40);

    // Prikaz života
    for (let i = 0; i < lives; i++) {
        drawHeart(10 + i * 40, 80, 20);  // Crta srca za živote
    }
}

// Postavljanje tipki
const keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// Funkcija za resetovanje igre
function resetGame() {
    playerX = WIDTH / 2;
    score = 0;
    lives = 3;
    enemies.length = 0;  // Očisti neprijatelje
    bullets.length = 0;  // Očisti metke
}

// Glavna petlja igre
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
