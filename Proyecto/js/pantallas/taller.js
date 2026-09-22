// taller.js - Lógica para cambiar partes y reflejar los sprites
function cambiarLlanta(nuevoTipo) {
    if (vehiculoSeleccionado) {
        vehiculoSeleccionado.llanta = nuevoTipo;
        console.log("Llanta cambiada a: " + nuevoTipo);
        // Opcional: actualizar vista previa en tiempo real si estás en el taller
    }
}

function cambiarAleron(nuevoTipo) {
    if (vehiculoSeleccionado) {
        vehiculoSeleccionado.aleron = nuevoTipo;
        console.log("Alerón cambiado a: " + nuevoTipo);
    }
}