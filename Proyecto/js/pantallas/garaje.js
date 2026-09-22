/* =================================
   LÓGICA DEL GARAJE Y SPRITES
================================= */

let indiceAutoActual = 0;
let indiceLlanta = 0;
let indiceAleron = 0;

const opcionesLlantas = [
    { nombre: "Deportiva", ruta: "assets/sprites/llantas/deportiva.png" },
    { nombre: "Todoterreno", ruta: "assets/sprites/llantas/todoterreno.png" },
    { nombre: "Nitro", ruta: "assets/sprites/llantas/nitro.png" }
];

const opcionesAlerones = [
    { nombre: "Normal", ruta: "assets/sprites/alerones/normal.png" },
    { nombre: "Deportivo", ruta: "assets/sprites/alerones/deportivo.png" },
    { nombre: "Carrera", ruta: "assets/sprites/alerones/carrera.png" }
];

function inicializarGaraje() {
    console.log("Garaje inicializado correctamente.");
    
    if (typeof vehiculoSeleccionado === 'undefined' || !vehiculoSeleccionado) {
        if (typeof vehiculos !== 'undefined' && vehiculos.length > 0) {
            vehiculoSeleccionado = vehiculos[0];
        } else {
            return;
        }
    }

    if (typeof vehiculos !== 'undefined') {
        indiceAutoActual = vehiculos.findIndex(v => v.nombre === vehiculoSeleccionado.nombre);
        if (indiceAutoActual === -1) indiceAutoActual = 0;
    }

    actualizarInterfazGaraje();
}

function actualizarInterfazGaraje() {
    if (typeof vehiculos === 'undefined' || vehiculos.length === 0) return;

    const autoActual = vehiculos[indiceAutoActual];
    vehiculoSeleccionado = autoActual;

    const nombreGaraje = document.getElementById("nombre-garaje");
    const carroImg = document.getElementById("carro-garaje");
    const txtNombreAuto = document.getElementById("txt-nombre-auto");
    const imgLlanta = document.getElementById("img-llanta-preview");
    const imgAleron = document.getElementById("img-aleron-preview");

    if (nombreGaraje) nombreGaraje.textContent = autoActual.nombre;
    if (txtNombreAuto) txtNombreAuto.textContent = autoActual.nombre;
    if (carroImg) carroImg.src = autoActual.sprite;

    if (imgLlanta && opcionesLlantas[indiceLlanta]) {
        imgLlanta.src = opcionesLlantas[indiceLlanta].ruta;
    }

    if (imgAleron && opcionesAlerones[indiceAleron]) {
        imgAleron.src = opcionesAlerones[indiceAleron].ruta;
    }
}

function cambiarAuto(direccion) {
    if (typeof vehiculos !== 'undefined' && vehiculos.length > 0) {
        indiceAutoActual = (indiceAutoActual + direccion + vehiculos.length) % vehiculos.length;
        actualizarInterfazGaraje();
        console.log("Auto cambiado a:", vehiculos[indiceAutoActual].nombre);
    }
}

function cambiarLlanta(direccion) {
    indiceLlanta = (indiceLlanta + direccion + opcionesLlantas.length) % opcionesLlantas.length;
    actualizarInterfazGaraje();
    console.log("Llanta cambiada a:", opcionesLlantas[indiceLlanta].nombre);
}

function cambiarAleron(direccion) {
    indiceAleron = (indiceAleron + direccion + opcionesAlerones.length) % opcionesLlantas.length;
    actualizarInterfazGaraje();
    console.log("Alerón cambiado a:", opcionesAlerones[indiceAleron].nombre);
}

function guardarPersonalizacion() {
    alert("¡Personalización guardada correctamente!");
    console.log("Personalización guardada para:", vehiculoSeleccionado.nombre);
}

// Vincular los eventos de las flechas de forma segura al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-auto-prev")?.addEventListener("click", () => cambiarAuto(-1));
    document.getElementById("btn-auto-sig")?.addEventListener("click", () => cambiarAuto(1));

    document.getElementById("btn-llanta-prev")?.addEventListener("click", () => cambiarLlanta(-1));
    document.getElementById("btn-llanta-sig")?.addEventListener("click", () => cambiarLlanta(1));

    document.getElementById("btn-aleron-prev")?.addEventListener("click", () => cambiarAleron(-1));
    document.getElementById("btn-aleron-sig")?.addEventListener("click", () => cambiarAleron(1));
});