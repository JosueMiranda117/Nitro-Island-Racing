// js/juego/rivales.js

const rivales = {
    lista: [],

    inicializar() {
        // Posicionados dentro del asfalto y visibles desde el inicio del conteo
        this.lista = [
            { 
                carril: -1,   // Lado izquierdo
                y: 320,       // Posición en la pista
                baseAncho: 60,
                baseAlto: 150,
                velocidad: 5.5, 
                sprite: this.crearSprite("assets/sprites/garaje/muscle.png") 
            },
            { 
                carril: 1,    // Lado derecho
                y: 260,       // Intercalado más adelante
                baseAncho: 60,
                baseAlto: 150,
                velocidad: 6.0, 
                sprite: this.crearSprite("assets/sprites/garaje/hyperauto.png") 
            },
            { 
                carril: -0.5, // Centro-izquierda
                y: 200, 
                baseAncho: 60,
                baseAlto: 150,
                velocidad: 5.8, 
                sprite: this.crearSprite("assets/sprites/garaje/muscle.png") 
            }
        ];
    },

    crearSprite(ruta) {
        let img = new Image();
        img.src = ruta;
        return img;
    },

    actualizar(velocidadJugador) {
        const canvas = document.getElementById("canvas-juego");
        if (!canvas) return;

        const centroX = canvas.width / 2;
        const horizonteY = canvas.height / 2;
        const sueloY = canvas.height;

        this.lista.forEach(rival => {
            // Mover según la velocidad relativa al jugador
            rival.y += (rival.velocidad - velocidadJugador) * 0.15;

            // Calcular escala de perspectiva basada en la Y (más arriba = más pequeño, más abajo = más grande)
            let factorPerspectiva = (rival.y - horizonteY) / (sueloY - horizonteY);
            if (factorPerspectiva < 0.1) factorPerspectiva = 0.1;

            // Ancho del asfalto en ese punto Y para mantenerlos dentro de la pista
            let anchoCarreteraEnY = 70 + (factorPerspectiva * 270);
            
            // Posicionar X interpolando según el carril y el ancho del asfalto
            rival.x = centroX + (rival.carril * (anchoCarreteraEnY * 0.45));
            
            // Escalar tamaño del auto acorde a la distancia 3D
            rival.ancho = rival.baseAncho * (0.4 + (factorPerspectiva * 0.6));
            rival.alto = rival.baseAlto * (0.4 + (factorPerspectiva * 0.6));

            // Si el rival pasa al jugador por abajo, reaparece al fondo de la pista
            if (rival.y > sueloY + 50) {
                rival.y = horizonteY + 10;
                rival.carril = rival.carril < 0 ? 1 : -1; // Alternar carril
            }
            // Si sube demasiado, regresa
            if (rival.y < horizonteY) {
                rival.y = sueloY - 50;
            }
        });
    },

    dibujar(ctx) {
        this.lista.forEach(rival => {
            if (rival.sprite && rival.sprite.complete && rival.sprite.naturalWidth > 0) {
                ctx.drawImage(rival.sprite, rival.x - (rival.ancho / 2), rival.y, rival.ancho, rival.alto);
            } else {
                ctx.fillStyle = "#e74c3c";
                ctx.fillRect(rival.x - 25, rival.y, 50, 50);
            }
        });
    }
};