/* =================================
   REFERENCIAS A LAS PANTALLAS
================================= */

const pantallaCarga = document.getElementById("pantalla-carga");
const menuPrincipal = document.getElementById("menu-principal");
const pantallaVehiculos = document.getElementById("pantalla-vehiculos");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaGaraje = document.getElementById("pantalla-garaje");
const pantallaConfiguracion = document.getElementById("pantalla-configuracion");
const pantallaTutorial = document.getElementById("pantalla-tutorial");


/* =================================
   ELEMENTOS DE CARGA
================================= */

const progresoCarga = document.getElementById("progreso-carga");
const textoCarga = document.getElementById("texto-carga");


/* =================================
   BOTONES
================================= */

const btnCarrera = document.getElementById("btn-carrera");
const btnGaraje = document.getElementById("btn-garaje");
const btnTutorial = document.getElementById("btn-tutorial");
const btnConfiguracion = document.getElementById("btn-configuracion");

const btnVolverGaraje = document.getElementById("btn-volver-garaje");
const btnGuardarGaraje = document.getElementById("btn-guardar-garaje");

const btnVolverConfiguracion = document.getElementById("btn-volver-configuracion");
const btnGuardarConfiguracion = document.getElementById("btn-guardar-configuracion");

const btnVolverTutorial = document.getElementById("btn-volver-tutorial");

const btnComenzarCarrera = document.getElementById("btn-comenzar-carrera");
const btnVolverVehiculos = document.getElementById("btn-volver-vehiculos");
const btnVolverMenu = document.getElementById("btn-volver-menu");


/* =================================
   VARIABLES DEL JUEGO
================================= */

let vehiculoSeleccionado = null;


/* =================================
   CAMBIAR DE PANTALLA
================================= */

function mostrarPantalla(pantalla) {
    pantallaCarga.classList.remove("activa");
    menuPrincipal.classList.remove("activa");
    pantallaVehiculos.classList.remove("activa");
    pantallaGaraje.classList.remove("activa");
    pantallaConfiguracion.classList.remove("activa");
    pantallaTutorial.classList.remove("activa");
    pantallaJuego.classList.remove("activa");

    pantalla.classList.add("activa");
}


/* =================================
   PANTALLA DE CARGA
================================= */

let progreso = 0;

const intervaloCarga = setInterval(() => {
    progreso += 2;
    progresoCarga.style.width = progreso + "%";
    textoCarga.textContent = "Cargando... " + progreso + "%";

    if (progreso >= 100) {
        clearInterval(intervaloCarga);
        textoCarga.textContent = "¡Listo!";

        setTimeout(() => {
            mostrarPantalla(menuPrincipal);
        }, 500);
    }
}, 30);


/* =================================
   MOSTRAR VEHÍCULOS
================================= */

function mostrarVehiculos() {
    const listaVehiculos = document.getElementById("lista-vehiculos");
    listaVehiculos.innerHTML = "";

    vehiculos.forEach((vehiculo) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-vehiculo");

        tarjeta.innerHTML = `
            <img
                class="sprite-vehiculo-seleccion"
                src="${vehiculo.sprite}"
                alt="${vehiculo.nombre}"
            >
            <h2>${vehiculo.nombre}</h2>
            <p>Velocidad: ${vehiculo.velocidadMaxima}</p>
            <p>Aceleración: ${vehiculo.aceleracion}</p>
            <button class="btn-seleccionar">
                SELECCIONAR
            </button>
        `;

        const btnSeleccionar = tarjeta.querySelector(".btn-seleccionar");

        btnSeleccionar.addEventListener("click", () => {
            vehiculoSeleccionado = vehiculo;

            document.querySelectorAll(".tarjeta-vehiculo").forEach((tarjetaActual) => {
                tarjetaActual.classList.remove("seleccionado");
            });

            tarjeta.classList.add("seleccionado");
            console.log("Vehículo seleccionado:", vehiculo.nombre);
        });

        listaVehiculos.appendChild(tarjeta);
    });
}


/* =================================
   BOTÓN CARRERA RÁPIDA
================================= */

btnCarrera.addEventListener("click", () => {
    mostrarVehiculos();
    mostrarPantalla(pantallaVehiculos);
});


/* =================================
   BOTÓN COMENZAR CARRERA
================================= */

btnComenzarCarrera.addEventListener("click", () => {
    if (vehiculoSeleccionado === null) {
        alert("Selecciona un vehículo primero.");
        return;
    }

    console.log("Comenzando carrera con:", vehiculoSeleccionado.nombre);
    mostrarPantalla(pantallaJuego);
});


/* =================================
   VOLVER DESDE VEHÍCULOS
================================= */

btnVolverVehiculos.addEventListener("click", () => {
    mostrarPantalla(menuPrincipal);
});


/* =================================
   VOLVER DEL JUEGO
================================= */

btnVolverMenu.addEventListener("click", () => {
    mostrarPantalla(menuPrincipal);
});


/* =================================
   GARAJE
================================= */

btnGaraje.addEventListener("click", () => {
    console.log("Botón GARAJE presionado.");

    if (!vehiculoSeleccionado && vehiculos.length > 0) {
        vehiculoSeleccionado = vehiculos[0];
    }

    mostrarPantalla(pantallaGaraje);

    if (typeof inicializarGaraje === "function") {
        inicializarGaraje();
    }
});


/* =================================
   GUARDAR GARAJE
================================= */

btnGuardarGaraje.addEventListener("click", () => {
    if (typeof guardarPersonalizacion === "function") {
        guardarPersonalizacion();
    }
});


/* =================================
   VOLVER DEL GARAJE
================================= */

btnVolverGaraje.addEventListener("click", () => {
    mostrarPantalla(menuPrincipal);
});


/* =================================
   TUTORIAL
================================= */

btnTutorial.addEventListener("click", () => {
    mostrarPantalla(pantallaTutorial);
    if (typeof inicializarTutorial === "function") {
        inicializarTutorial();
    }
});

btnVolverTutorial.addEventListener("click", () => {
    mostrarPantalla(menuPrincipal);
});


/* =================================
   CONFIGURACIÓN
================================= */

btnConfiguracion.addEventListener("click", () => {
    mostrarPantalla(pantallaConfiguracion);
});


/* =================================
   VOLVER DE CONFIGURACIÓN
================================= */

btnVolverConfiguracion.addEventListener("click", () => {
    mostrarPantalla(menuPrincipal);
});


/* =================================
   GUARDAR CONFIGURACIÓN
================================= */

btnGuardarConfiguracion.addEventListener("click", () => {
    alert("Configuración guardada.");
});

btnComenzarCarrera.addEventListener("click", () => {
    if (vehiculoSeleccionado === null) {
        alert("Selecciona un vehículo primero.");
        return;
    }

    mostrarPantalla(pantallaJuego);

    if (typeof iniciarMotorJuego === "function") {
        iniciarMotorJuego();
    }
});
