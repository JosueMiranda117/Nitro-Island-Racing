// js/juego/pista.js

const pista = {
    offsetCarretera: 0,

    actualizar(velocidad) {
        this.offsetCarretera += velocidad * 2;
        if (this.offsetCarretera > 50) this.offsetCarretera = 0;
        if (this.offsetCarretera < 0) this.offsetCarretera = 50;
    },

    dibujar(ctx, ancho, alto) {
        const centroX = ancho / 2;
        const horizonteY = alto / 2;

        // 1. Cielo con degradado realista
        let gradienteCielo = ctx.createLinearGradient(0, 0, 0, horizonteY);
        gradienteCielo.addColorStop(0, "#4a90e2");
        gradienteCielo.addColorStop(1, "#c8e1f8");
        ctx.fillStyle = gradienteCielo;
        ctx.fillRect(0, 0, ancho, horizonteY);

        // 2. Montañas y colinas al fondo
        ctx.fillStyle = "#5c7c59";
        ctx.beginPath();
        ctx.moveTo(0, horizonteY);
        ctx.lineTo(0, horizonteY - 60);
        ctx.lineTo(120, horizonteY - 110);
        ctx.lineTo(250, horizonteY - 50);
        ctx.lineTo(400, horizonteY - 130);
        ctx.lineTo(580, horizonteY - 70);
        ctx.lineTo(750, horizonteY - 140);
        ctx.lineTo(ancho, horizonteY - 40);
        ctx.lineTo(ancho, horizonteY);
        ctx.closePath();
        ctx.fill();

        // 3. Terreno lateral de la isla
        ctx.fillStyle = "#739e48";
        ctx.fillRect(0, horizonteY, ancho, horizonteY);

        // 4. Pista de carreras (Asfalto)
        ctx.beginPath();
        ctx.moveTo(centroX - 70, horizonteY);
        ctx.lineTo(centroX + 70, horizonteY);
        ctx.lineTo(centroX + 340, alto);
        ctx.lineTo(centroX - 340, alto);
        ctx.fillStyle = "#3b3f46";
        ctx.fill();

        // 5. Bordes de Pista Tipo Cebra
        this.dibujarBordesCebra(ctx, centroX, horizonteY, ancho, alto);

        // 6. Línea central segmentada amarilla
        ctx.strokeStyle = "#f1c40f";
        ctx.lineWidth = 5;
        ctx.setLineDash([25, 25]);
        this.offsetCarretera = this.offsetCarretera || 0;
        ctx.lineDashOffset = -this.offsetCarretera;
        
        ctx.beginPath();
        ctx.moveTo(centroX, horizonteY);
        ctx.lineTo(centroX, alto);
        ctx.stroke();
        
        // ¡Corrección clave! Se pasa un arreglo vacío para limpiar el patrón de línea
        ctx.setLineDash([]);
    },

    dibujarBordesCebra(ctx, centroX, horizonteY, ancho, alto) {
        const pasos = 10;
        let yActual = horizonteY;
        let altoPaso = (alto - horizonteY) / pasos;

        for (let i = 0; i < pasos; i++) {
            let ySiguiente = yActual + altoPaso;
            let anchoSup = 70 + (i * 27);
            let anchoInf = 70 + ((i + 1) * 27);

            let colorPianito = (i + Math.floor(this.offsetCarretera / 10)) % 2 === 0 ? "#e74c3c" : "#ffffff";

            ctx.fillStyle = colorPianito;

            // Borde izquierdo
            ctx.beginPath();
            ctx.moveTo(centroX - anchoSup, yActual);
            ctx.lineTo(centroX - anchoSup - 12, yActual);
            ctx.lineTo(centroX - anchoInf - 12, ySiguiente);
            ctx.lineTo(centroX - anchoInf, ySiguiente);
            ctx.fill();

            // Borde derecho
            ctx.beginPath();
            ctx.moveTo(centroX + anchoSup, yActual);
            ctx.lineTo(centroX + anchoSup + 12, yActual);
            ctx.lineTo(centroX + anchoInf + 12, ySiguiente);
            ctx.lineTo(centroX + anchoInf, ySiguiente);
            ctx.fill();

            yActual = ySiguiente;
        }
    }
};