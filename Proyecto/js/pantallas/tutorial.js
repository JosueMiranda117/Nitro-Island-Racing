// js/pantallas/tutorial.js

let canvasTutorial, ctxTutorial;
let autoTutorial = {
    x: 180,
    y: 120,
    ancho: 40,
    alto: 70,
    velocidad: 3,
    angulo: 0
};

let teclasTutorial = {};

function inicializarTutorial() {
    canvasTutorial = document.getElementById("canvas-tutorial");
    if (!canvasTutorial) return;
    ctxTutorial = canvasTutorial.getContext("2d");

    // Escuchar eventos del teclado
    window.addEventListener("keydown", (e) => {
        teclasTutorial[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
        teclasTutorial[e.key.toLowerCase()] = false;
    });

    // Iniciar bucle de animación del tutorial
    requestAnimationFrame(bucleTutorial);
}

function actualizarTutorial() {
    // Movimiento básico con W, S, A, D o Flechas
    if (teclasTutorial["w"] || teclasTutorial["arrowup"]) {
        autoTutorial.y -= autoTutorial.velocidad;
    }
    if (teclasTutorial["s"] || teclasTutorial["arrowdown"]) {
        autoTutorial.y += autoTutorial.velocidad;
    }
    if (teclasTutorial["a"] || teclasTutorial["arrowleft"]) {
        autoTutorial.x -= autoTutorial.velocidad;
    }
    if (teclasTutorial["d"] || teclasTutorial["arrowright"]) {
        autoTutorial.x += autoTutorial.velocidad;
    }

    // Limites del canvas
    if (autoTutorial.x < 10) autoTutorial.x = 10;
    if (autoTutorial.x > canvasTutorial.width - 50) autoTutorial.x = canvasTutorial.width - 50;
    if (autoTutorial.y < 10) autoTutorial.y = 10;
    if (autoTutorial.y > canvasTutorial.height - 80) autoTutorial.y = canvasTutorial.height - 80;
}

function dibujarTutorial() {
    if (!ctxTutorial) return;

    // Limpiar pantalla
    ctxTutorial.clearRect(0, 0, canvasTutorial.width, canvasTutorial.height);

    // Dibujar pista de práctica (cuadricula o detalles sencillos)
    ctxTutorial.fillStyle = "#1e3024";
    ctxTutorial.fillRect(0, 0, canvasTutorial.width, canvasTutorial.height);

    // Dibujar el carro de práctica (puedes usar el sprite actual o un rectángulo estilizado)
    ctxTutorial.fillStyle = "#6d9fcf";
    ctxTutorial.fillRect(autoTutorial.x, autoTutorial.y, autoTutorial.ancho, autoTutorial.alto);
    
    // Pequeño detalle del parabrisas para simular frente del auto
    ctxTutorial.fillStyle = "#07111f";
    ctxTutorial.fillRect(autoTutorial.x + 5, autoTutorial.y + 10, autoTutorial.ancho - 10, 15);
}

function bucleTutorial() {
    // Solo animar si la pantalla de tutorial está activa
    const pantallaTuto = document.getElementById("pantalla-tutorial");
    if (pantallaTuto && pantallaTuto.classList.contains("activa")) {
        actualizarTutorial();
        dibujarTutorial();
    }
    requestAnimationFrame(bucleTutorial);
}