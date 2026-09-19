const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerCarImage = new Image();
playerCarImage.src = "assets/sprites/player/player-car.png";
const palmImage = new Image();
palmImage.src = "assets/sprites/environment/palm.png";
const rockImage = new Image();
rockImage.src = "assets/sprites/obstacles/rock.png";
const rivalImage = new Image();
rivalImage.src = "assets/sprites/rivals/rival-car.png";

canvas.width = 1000;
canvas.height = 600;

const track = [
    {
        curve: 0,
        elevation: 0,
        length: 200
    },

    {
        curve: 0.3,
        elevation: 0,
        length: 150
    },

    {
        curve: -0.5,
        elevation: 0,
        length: 200
    },

    {
        curve: 0,
        elevation: 0.4,
        length: 150
    },

    {
        curve: 0.7,
        elevation: 0.2,
        length: 200
    },

    {
        curve: 0,
        elevation: -0.5,
        length: 200
    }
];

// Colores de nuestra pista
const ROAD_COLOR = "#444";
const GRASS_COLOR = "#245c24";
const LINE_COLOR = "#ffffff";

// ===== VELOCIDAD DEL JUGADOR =====

let speed = 0;
const maxSpeed = 10;
const acceleration = 0.2;
const braking = 0.3;
const friction = 0.05;

// ===== POSICIÓN EN LA PISTA =====

let playerPosition = 0;
const rivals = [
    { position: 300, x: 0.2, speed: 3.6 },
    { position: 500, x: -0.2, speed: 4.2 },
    { position: 700, x: 0.4, speed: 3.8 },
    { position: 900, x: -0.4, speed: 4.4 },
    { position: 1100, x: 0.1, speed: 3.7 },
    { position: 1300, x: -0.3, speed: 4.1 },
    { position: 1500, x: 0.3, speed: 3.9 },
    { position: 1700, x: -0.1, speed: 4.3 }
];

const rivalSpeed = 4;

// ===== DIRECCIÓN DEL JUGADOR =====

let playerX = 0;
const steering = 0.05;

let spinAngle = 0;
let spinning = false;
let spinTimer = 0;

// ===== CONTROLES =====

const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});

// ===== FÍSICA DEL JUGADOR =====

function updatePlayer() {

    // Acelerar
    if (keys["w"] || keys["arrowup"]) {
        speed += acceleration;
    }
    
    // Avanzar por la pista
    playerPosition += speed;

    // Frenar
    if (keys["s"] || keys["arrowdown"]) {
        speed -= braking;
    }

    // Fricción
    if (!keys["w"] && !keys["arrowup"] &&
        !keys["s"] && !keys["arrowdown"]) {

        speed -= friction;
    }

    // No superar la velocidad máxima
    if (speed > maxSpeed) {
        speed = maxSpeed;
    }

    // No permitir velocidad negativa
    if (speed < 0) {
        speed = 0;
    }

    // Girar a la izquierda
    if (keys["a"] || keys["arrowleft"]) {
        playerX -= steering;
    }

    // Girar a la derecha
    if (keys["d"] || keys["arrowright"]) {
        playerX += steering;
    }

    // Limitar el movimiento del carro
    if (playerX < -4.6) {
        playerX = -4.6;
    }

    if (playerX > 4.6) {
        playerX = 4.6;
    }
    
    palmOffset = playerPosition % 500;
}

function updateRivals() {

    rivals.forEach((rival) => {
        rival.position += rival.speed;
    });

}

function updateSpin() {

    if (!spinning) {
        return;
    }

    spinAngle += Math.PI / 8;
    spinTimer--;

    if (spinTimer <= 0) {
        spinning = false;
        spinAngle = 0;
    }
}

// ===== CARRO DEL JUGADOR =====

function drawPlayer() {
    const carX = canvas.width / 2 + playerX * 100;
    const carY = 500;

    ctx.save();

    ctx.translate(carX, carY);

    ctx.rotate(spinAngle);

    ctx.drawImage(
        playerCarImage,
        -45,
        -60,
        90,
        120
    );

    ctx.restore();
}

function drawRivals() {


    rivals.forEach((rival) => {

        const distance = rival.position - playerPosition;

        if (distance <= 0) {
            return;
        }

        const depth = Math.max(0.1, 1 - distance / 1000);

        const size = 30 + depth * 70;

        const segmentIndex =
            Math.floor(rival.position / 100) % track.length;

        const currentSegment =
            track[segmentIndex];

        const curveOffset =
            currentSegment.curve * 180 * depth;

        const x =
            canvas.width / 2 +
            curveOffset +
            rival.x * 100;

        const y =
            300 +
            depth * 220;

        ctx.drawImage(
            rivalImage,
            x - size / 2,
            y - size,
            size,
            size * 1.3
        );

    });
}
    function checkRivalCollisions() {

    rivals.forEach((rival) => {

        const distance = Math.abs(rival.position - playerPosition);
        const horizontalDistance = Math.abs(rival.x - playerX);

        if (distance < 80 && horizontalDistance < 0.5) {

                    speed -= 1;
        playerPosition -= 20;

        if (speed < 0) {
            speed = 0;
        }

        }

    });

}
// ===== PALMERAS =====

function drawPalm() {

    const palms = [
        { x: 300, depth: 0.15 },
        { x: 660, depth: 0.15 },

        { x: 180, depth: 0.35 },
        { x: 755, depth: 0.35 },

        { x: 50, depth: 0.65 },
        { x: 850, depth: 0.65 }
    ];

    palms.forEach((palm) => {

        // Mientras más cerca, más grande
        const size = 30 + palm.depth * 100;

        // Mientras más cerca, más abajo
        const movement = (playerPosition % 200) * 0.15;
        const y = 300 + palm.depth * 180 + movement;

        ctx.drawImage(
            palmImage,
            palm.x,
            y,
            size,
            size * 1.6
        );

    });
}

// ===== ROCA =====
const rocks = [
    { side: -1, depth: 0.25 },
    { side: 1, depth: 0.45 },
    { side: -1, depth: 0.70 }
];

function drawRock() {

    rocks.forEach((rock) => {

        // Más cerca = más grande
        const size = 30 + rock.depth * 90;

        // Más cerca = más abajo
        const movement = (playerPosition % 200) * 0.15;
        const y = 300 + rock.depth * 180 + movement;
        const roadCenter = canvas.width / 2;

        const rockX =
            roadCenter +
            rock.side * (260 + rock.depth * 120);

        ctx.drawImage(
            rockImage,
            rockX,
            y,
            size,
            size * 0.75
        );

    });
}


function drawRoad() {

    // ===== FONDO =====

    // Cielo
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, 300);

    // Suelo
    ctx.fillStyle = "#245c24";
    ctx.fillRect(0, 300, canvas.width, 300);

    // ===== MONTAÑAS DEL HORIZONTE =====

    ctx.fillStyle = "#31534a";

    ctx.beginPath();

    ctx.moveTo(0, 300);

    ctx.lineTo(120, 220);
    ctx.lineTo(230, 280);
    ctx.lineTo(350, 190);
    ctx.lineTo(470, 275);
    ctx.lineTo(600, 205);
    ctx.lineTo(730, 270);
    ctx.lineTo(850, 185);
    ctx.lineTo(1000, 260);

    ctx.lineTo(1000, 300);
    ctx.closePath();

    ctx.fill();

    // ===== ENTRADA DE LA CUEVA =====

ctx.fillStyle = "#202020";

ctx.beginPath();

ctx.moveTo(250, 300);
ctx.quadraticCurveTo(500, 170, 750, 300);

ctx.lineTo(750, 360);
ctx.lineTo(250, 360);

ctx.closePath();

ctx.fill();


    // ===== CARRETERA =====

    const horizon = 300;
    const bottom = 600;

    const roadWidthFar = 40;
    const roadWidthNear = 650;

    const centerX = canvas.width / 2;

    // Dibujamos de lejos hacia cerca
   for (let i = 0; i < track.length - 1; i++) {

    const trackIndex =
        Math.floor(playerPosition / 100) + i;

    const current =
        track[trackIndex % track.length];

    const next =
        track[(trackIndex + 1) % track.length];

    // Profundidad
    const depth1 = i / track.length;
    const depth2 = (i + 1) / track.length;

        // Posición vertical + elevación de la pista
    const elevation1 =
        current.elevation * 120 * depth1;

    const elevation2 =
        next.elevation * 120 * depth2;

    const y1 =
        horizon +
        (bottom - horizon) * depth1 -
        elevation1;

    const y2 =
        horizon +
        (bottom - horizon) * depth2 -
        elevation2;

        // Tamaño según distancia
        const width1 =
            roadWidthFar +
            (roadWidthNear - roadWidthFar) * depth1;

        const width2 =
            roadWidthFar +
            (roadWidthNear - roadWidthFar) * depth2;

        // Curva
       const curve1 =
    current.curve * 220 * depth1 * depth1;

    const curve2 =
    curve1 + next.curve * 220 * depth2 * depth2;

        const center1 = centerX + curve1;
        const center2 = centerX + curve2;

        // Bordes de la carretera
        const left1 = center1 - width1 / 2;
        const right1 = center1 + width1 / 2;

        const left2 = center2 - width2 / 2;
        const right2 = center2 + width2 / 2;

        // ===== FRANJAS DE LA CARRETERA =====

if (i % 2 === 0) {
    ctx.fillStyle = "#444";
} else {
    ctx.fillStyle = "#3b3b3b";
}

ctx.beginPath();

ctx.moveTo(left1, y1);
ctx.lineTo(right1, y1);

ctx.lineTo(right2, y2);
ctx.lineTo(left2, y2);

ctx.closePath();

ctx.fill();


// ===== LÍNEA CENTRAL =====

if (i % 2 === 0) {

    ctx.fillStyle = "#ffffff";

    const lineWidth1 = width1 * 0.02;
    const lineWidth2 = width2 * 0.02;

    ctx.beginPath();

    ctx.moveTo(center1 - lineWidth1 / 2, y1);
    ctx.lineTo(center1 + lineWidth1 / 2, y1);

    ctx.lineTo(center2 + lineWidth2 / 2, y2);
    ctx.lineTo(center2 - lineWidth2 / 2, y2);

    ctx.closePath();

    ctx.fill();
}

       // ===== BORDES =====

ctx.lineWidth = 12;

// Elegir color según el segmento
if (i % 2 === 0) {
    ctx.strokeStyle = "#ff3333";
} else {
    ctx.strokeStyle = "#ffffff";
}

// Borde izquierdo
ctx.beginPath();
ctx.moveTo(left1, y1);
ctx.lineTo(left2, y2);
ctx.stroke();

// Borde derecho
ctx.beginPath();
ctx.moveTo(right1, y1);
ctx.lineTo(right2, y2);
ctx.stroke();
    }
}

    function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePlayer();

    checkRivalCollisions();

    updateRivals();

    drawRoad();

    drawPalm();

    drawRock();

    drawRivals();

    drawPlayer();

    requestAnimationFrame(gameLoop);
}

gameLoop();