// js/juego/motor.js

let canvasJuego, ctxJuego;
let teclasActivas = {};
let idAnimacion = null;
let tiempoInicio = Date.now();

let estadoConteo = "3";
let tiempoUltimoConteo = 0;

function iniciarMotorJuego() {
    canvasJuego = document.getElementById("canvas-juego");
    if (!canvasJuego) {
        console.error("No se encontró el canvas-juego");
        return;
    }
    ctxJuego = canvasJuego.getContext("2d");

    tiempoInicio = Date.now();
    estadoConteo = "3";
    tiempoUltimoConteo = Date.now();

    // Inicializar jugador
    if (typeof jugador !== 'undefined' && typeof jugador.inicializar === 'function') {
        jugador.inicializar();
    }

    if (typeof rivales !== 'undefined' && typeof rivales.inicializar === 'function') {
        rivales.inicializar();
    }

    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    if (idAnimacion) cancelAnimationFrame(idAnimacion);
    bucleMotor();
}

function onKeyDown(e) {
    teclasActivas[e.key.toLowerCase()] = true;
}

function onKeyUp(e) {
    teclasActivas[e.key.toLowerCase()] = false;
}

function actualizarMotor() {
    // Si estamos en conteo, permitimos que la pista y los rivales se dibujen, 
    // pero evitamos que el jugador se mueva hasta que termine el "YA".
    if (estadoConteo !== "activo") {
        let ahora = Date.now();
        if (ahora - tiempoUltimoConteo >= 1000) {
            if (estadoConteo === "3") estadoConteo = "2";
            else if (estadoConteo === "2") estadoConteo = "1";
            else if (estadoConteo === "1") estadoConteo = "YA";
            else if (estadoConteo === "YA") {
                estadoConteo = "activo";
                tiempoInicio = Date.now();
            }
            tiempoUltimoConteo = ahora;
        }
        
        // ¡Importante! Actualizamos la posición estática de los rivales para que aparezcan en pantalla durante el conteo
        if (typeof rivales !== 'undefined' && typeof rivales.actualizar === 'function') {
            rivales.actualizar(0); // Velocidad 0 para que estén quietos en la salida
        }
        return; // Detiene solo el movimiento del jugador hasta que acabe el conteo
    }

    if (typeof jugador !== 'undefined' && typeof jugador.actualizar === 'function') {
        jugador.actualizar(teclasActivas);
    }

    if (typeof pista !== 'undefined' && typeof pista.actualizar === 'function') {
        pista.actualizar(jugador.velocidad || 0);
    }

    if (typeof rivales !== 'undefined' && typeof rivales.actualizar === 'function') {
        rivales.actualizar(jugador.velocidad || 0);
    }
}

    function actualizarMotor() {
    if (estadoConteo !== "activo") {
        let ahora = Date.now();
        if (ahora - tiempoUltimoConteo >= 1000) {
            if (estadoConteo === "3") estadoConteo = "2";
            else if (estadoConteo === "2") estadoConteo = "1";
            else if (estadoConteo === "1") estadoConteo = "YA";
            else if (estadoConteo === "YA") {
                estadoConteo = "activo";
                tiempoInicio = Date.now();
            }
            tiempoUltimoConteo = ahra = ahora;
        }
        
        // ¡Listo! Ya no actualizamos a los rivales durante el conteo para que permanezcan estáticos en la salida
        return;
    }

    if (typeof jugador !== 'undefined' && typeof jugador.actualizar === 'function') {
        jugador.actualizar(teclasActivas);
    }

    if (typeof pista !== 'undefined' && typeof pista.actualizar === 'function') {
        pista.actualizar(jugador.velocidad || 0);
    }

    if (typeof rivales !== 'undefined' && typeof rivales.actualizar === 'function') {
        rivales.actualizar(jugador.velocidad || 0);
    }
}


function dibujarMotor() {
    if (!ctxJuego || !canvasJuego) return;

    const ancho = canvasJuego.width;
    const alto = canvasJuego.height;

    // 1. Limpiar canvas por seguridad
    ctxJuego.clearRect(0, 0, ancho, alto);

    // 2. Dibujar Pista (Fondo y Montañas)
    if (typeof pista !== 'undefined' && typeof pista.dibujar === 'function') {
        pista.dibujar(ctxJuego, ancho, alto);
    }

    // 3. Dibujar Público
    if (typeof publico !== 'undefined' && typeof publico.dibujar === 'function') {
        publico.dibujar(ctxJuego, ancho, alto);
    }

    // 4. Dibujar Rivales
    if (typeof rivales !== 'undefined' && typeof rivales.dibujar === 'function') {
        rivales.dibujar(ctxJuego);
    }

    // 5. Dibujar Jugador (Aseguramos que pinte el rectángulo azul o el sprite)
    if (typeof jugador !== 'undefined' && typeof jugador.dibujar === 'function') {
        jugador.dibujar(ctxJuego);
    }

    // 6. Dibujar HUD (Barra superior, minimapa y tacómetro)
    dibujarHUDPro(ctxJuego, ancho, alto);

    // 7. Conteo Regresivo
    if (estadoConteo !== "activo") {
        ctxJuego.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctxJuego.fillRect(0, 0, ancho, alto);

        ctxJuego.fillStyle = estadoConteo === "YA" ? "#2ecc71" : "#e74c3c";
        ctxJuego.font = "bold 90px Arial";
        ctxJuego.textAlign = "center";
        ctxJuego.textBaseline = "middle";
        ctxJuego.fillText(estadoConteo, ancho / 2, alto / 2);
        ctxJuego.textAlign = "left";
        ctxJuego.textBaseline = "alphabetic";
    }
}

function dibujarHUDPro(ctx, ancho, alto) {
    // Barra superior
    ctx.fillStyle = "rgba(10, 15, 25, 0.9)";
    ctx.fillRect(0, 0, ancho, 50);
    ctx.strokeStyle = "#e74c3c";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, ancho, 50);

    dibujarCajaHUD(ctx, 15, 8, 100, 34, "Vuelta 1/3");

    let segundosTranscurridos = 0;
    if (estadoConteo === "activo") {
        segundosTranscurridos = ((Date.now() - tiempoInicio) / 1000).toFixed(1);
    } else {
        segundosTranscurridos = "00.0";
    }
    dibujarCajaHUD(ctx, 125, 8, 85, 34, `${segundosTranscurridos}s`);

    dibujarCajaHUD(ctx, ancho / 2 - 50, 8, 100, 34, "⏸ Pausa");
    dibujarCajaHUD(ctx, ancho - 190, 8, 60, 34, "1°", "#f1c40f");

    // Minimapa
    const mapX = ancho - 115;
    const mapY = 8;
    const mapW = 100;
    const mapH = 34;

    ctx.fillStyle = "rgba(15, 25, 35, 0.9)";
    ctx.fillRect(mapX, mapY, mapW, mapH);
    ctx.strokeStyle = "#3498db";
    ctx.lineWidth = 2;
    ctx.strokeRect(mapX, mapY, mapW, mapH);

    ctx.strokeStyle = "#e74c3c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapX + 15, mapY + 20);
    ctx.lineTo(mapX + 45, mapY + 10);
    ctx.lineTo(mapX + 85, mapY + 20);
    ctx.lineTo(mapX + 60, mapY + 28);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "#2ecc71";
    ctx.beginPath();
    ctx.arc(mapX + 50, mapY + 18, 3, 0, Math.PI * 2);
    ctx.fill();

    // Tacómetro (Abajo Derecha)
    const velocidadActual = Math.abs(Math.round((window.jugador ? window.jugador.velocidad : 0) * 20));
    
    ctx.fillStyle = "rgba(15, 20, 30, 0.9)";
    ctx.fillRect(ancho - 180, alto - 75, 165, 65);
    ctx.strokeStyle = "#e74c3c";
    ctx.lineWidth = 2;
    ctx.strokeRect(ancho - 180, alto - 75, 165, 65);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px Arial";
    ctx.fillText("VELOCÍMETRO", ancho - 165, alto - 52);

    ctx.fillStyle = "#f1c40f";
    ctx.font = "bold 18px Arial";
    ctx.fillText(velocidadActual + " KM/H", ancho - 165, alto - 25);
}

function dibujarCajaHUD(ctx, x, y, w, h, texto, colorBorde = "#3e5268") {
    ctx.fillStyle = "#162231";
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = colorBorde;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(texto, x + w / 2, y + h / 2);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
}

function bucleMotor() {
    const pantallaJuegoActiva = document.getElementById("pantalla-juego");
    if (pantallaJuegoActiva && pantallaJuegoActiva.classList.contains("activa")) {
        actualizarMotor();
        dibujarMotor();
        idAnimacion = requestAnimationFrame(bucleMotor);
    }
}