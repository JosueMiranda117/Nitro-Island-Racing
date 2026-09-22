// js/juego/jugador.js

const jugador = {
    x: 500,
    y: 450,
    ancho: 60,
    alto: 150,
    velocidad: 0,
    maxVelocidad: 8,
    aceleracion: 0.15,
    spriteImg: null,

    inicializar() {
        if (typeof vehiculoSeleccionado !== 'undefined' && vehiculoSeleccionado && vehiculoSeleccionado.sprite) {
            this.spriteImg = new Image();
            this.spriteImg.src = vehiculoSeleccionado.sprite;
        } else {
            this.spriteImg = new Image();
            this.spriteImg.src = "assets/sprites/autos/rayo-azul.png";
        }

        const canvas = document.getElementById("canvas-juego");
        if (canvas) {
            this.x = canvas.width / 2 - this.ancho / 2;
            this.y = canvas.height - 140;
        }
        this.velocidad = 0;
    },

    actualizar(controles) {
        if (controles["w"] || controles["arrowup"]) {
            this.velocidad += this.aceleracion;
            if (this.velocidad > this.maxVelocidad) this.velocidad = this.maxVelocidad;
        } else if (controles["s"] || controles["arrowdown"]) {
            this.velocidad -= this.aceleracion;
            if (this.velocidad < -3) this.velocidad = -3;
        } else {
            this.velocidad *= 0.98;
        }

        if (controles["a"] || controles["arrowleft"]) {
            this.x -= 6;
        }
        if (controles["d"] || controles["arrowright"]) {
            this.x += 6;
        }

        const canvas = document.getElementById("canvas-juego");
        if (canvas) {
            const limiteIzquierdo = canvas.width / 2 - 280;
            const limiteDerecho = canvas.width / 2 + 200;
            if (this.x < limiteIzquierdo) this.x = limiteIzquierdo;
            if (this.x > limiteDerecho) this.x = limiteDerecho;
        }
    },

    dibujar(ctx) {
        // Renderizamos únicamente la imagen del sprite transparente
        if (this.spriteImg && this.spriteImg.complete && this.spriteImg.naturalWidth !== 0) {
            ctx.drawImage(this.spriteImg, this.x, this.y, this.ancho, this.alto);
        }
    }
};