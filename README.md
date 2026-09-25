Nitro Island Racing
Descripción

Nitro Island Racing es un videojuego arcade de carreras desarrollado como proyecto escolar.

El jugador controla un vehículo que compite en una pista mediante una técnica de perspectiva pseudo-3D realizada con Canvas 2D, generando una sensación dinámica de profundidad, velocidad y fluidez.

El escenario principal cuenta con elementos ambientales inmersivos como curvas progresivas, montañas al fondo, gradas con público animado, obstáculos en pista, simulación de físicas de aceleración/reversa, velocímetro, minimapa y vehículos rivales en constante movimiento.

Integrantes

Encarnacion Hernandez Ernesto

Miranda Alatriste Josue Manuel

Requisitos

Para ejecutar el proyecto se necesita:

Navegador web moderno, como Google Chrome, Microsoft Edge o Mozilla Firefox.

Node.js.

Git, para trabajar con el repositorio.

Conexión a Internet para clonar o actualizar el repositorio.

Instalación
Clonar el repositorio
git clone https://github.com/tu-usuario/nitro-island-racing.git

Entrar a la carpeta del proyecto
cd nitro-island-racing

Verificación

Verificar que estén presentes las carpetas y archivos principales del proyecto.

Ejecución

Actualmente, la parte principal del juego puede ejecutarse abriendo index.html en un navegador, preferiblemente mediante un servidor local como Live Server en Visual Studio Code para evitar bloqueos en la carga de recursos multimedia.

El proyecto también cuenta con una carpeta server/, destinada a la implementación de las funciones del servidor mediante Node.js.

Cuando el servidor esté implementado, se podrá iniciar desde la carpeta correspondiente mediante Node.js.

Controles
Tecla	Función
W / Flecha arriba	Acelerar
S / Flecha abajo	Frenar / Reversa
A / Flecha izquierda	Girar a la izquierda
D / Flecha derecha	Girar a la derecha
Estructura del proyecto
nitro-island-racing/
│
├── index.html
├── app.js
│
├── css/
│   └── styles.css
│
├── js/
│   ├── datos/
│   │   └── vehiculo.js
│   │
│   ├── juego/
│   │   ├── audio.js
│   │   ├── jugador.js
│   │   ├── motor.js
│   │   ├── obstaculos.js
│   │   ├── pista.js
│   │   ├── publico.js
│   │   └── rivales.js
│   │
│   └── pantallas/
│       ├── carga.js
│       ├── configuracion.js
│       ├── garaje.js
│       ├── menu.js
│       ├── taller.js
│       └── tutorial.js
│
├── assets/
│   ├── controles/
│   ├── pistas/
│   └── sprites/
│       ├── alerones/
│       ├── autos/
│       ├── garaje/
│       ├── llantas/
│       └── publico/
│
└── server/
    └── server.js

Tecnologías utilizadas

HTML5

CSS3

JavaScript

Canvas 2D

Node.js

Git

GitHub

El proyecto no utiliza frameworks o motores de videojuegos como React, Angular, Vue, Phaser o Three.js.

Características del proyecto

Entre las características previstas y desarrolladas se encuentran:

Carrera arcade en 2D con efecto pseudo-3D.

Carretera con curvas, perspectiva y animación continua de la pista.

Vehículo controlado por el jugador con físicas de aceleración, fricción y reversa.

Vehículos rivales autónomos con detección de colisiones y cambio de carriles.

Gradas con público adaptadas a la curvatura del horizonte.

Obstáculos interactivos en pista.

Menús de garaje, taller y personalización de vehículo (alerones, llantas, etc.).

Tutorial de conducción interactivo.

Sistema de vueltas, cronómetro, minimapa y HUD dinámico con velocímetro en tiempo real.

Pantalla final de posiciones y clasificación de carrera.

Comunicación con un servidor mediante Node.js.

Repositorio

El código fuente del proyecto se encuentra disponible en GitHub:

https://github.com/tu-usuario/nitro-island-racing.git
