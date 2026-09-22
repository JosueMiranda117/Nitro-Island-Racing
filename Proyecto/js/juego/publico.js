// js/juego/publico.js

const publico = {
    inicializar() {
        // Configuraciones iniciales si las necesitas
    },

    dibujar(ctx, ancho, alto) {
        const centroX = ancho / 2;
        const horizonteY = alto / 2;

        // Dibujar gradas / vallas decorativas en el horizonte superior de los laterales
        ctx.fillStyle = "#34495e";
        // Grada izquierda
        ctx.fillRect(50, horizonteY - 30, centroX - 120, 30);
        // Grada derecha
        ctx.fillRect(centroX + 70, horizonteY - 30, centroX - 120, 30);

        // Pequeños puntos simulando personas en las gradas
        ctx.fillStyle = "#f1c40f";
        for (let i = 0; i < 15; i++) {
            let posX = 70 + (i * 15);
            if (posX < centroX - 90) {
                ctx.fillRect(posX, horizonteY - 20, 4, 8);
            }
            let posXDerecha = centroX + 90 + (i * 15);
            if (posXDerecha < ancho - 70) {
                ctx.fillRect(posXDerecha, horizonteY - 20, 4, 8);
            }
        }
    }
};