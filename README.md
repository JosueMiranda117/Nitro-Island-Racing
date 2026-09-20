\# Turbo Circuit 117



\## Descripción



Turbo Circuit 117 es un videojuego arcade de carreras desarrollado como proyecto escolar.



El jugador controla un vehículo que compite en una pista con curvas, cambios de elevación, obstáculos y vehículos rivales. El juego utiliza una técnica de perspectiva pseudo-3D realizada mediante Canvas 2D para generar la sensación de profundidad y velocidad.



El escenario principal del juego es \*\*Isla Calavera\*\*, una pista ambientada en una isla con elementos como rocas, palmeras, cuevas y obstáculos.



\## Integrantes



\* Encarnacion Hernandez Ernesto

\* Miranda Alatriste Josue Manuel



\## Requisitos



Para ejecutar el proyecto se necesita:



\* Navegador web moderno, como Google Chrome, Microsoft Edge o Mozilla Firefox.

\* Node.js.

\* Git, para trabajar con el repositorio.

\* Conexión a Internet para clonar o actualizar el repositorio.



\## Instalación



1\. Clonar el repositorio:



```bash

git clone https://github.com/JosueMiranda117/Turbo-Circuit-117.git

```



2\. Entrar a la carpeta del proyecto:



```bash

cd Turbo-Circuit-117

```



3\. Verificar que estén presentes las carpetas y archivos principales del proyecto.



\## Ejecución



Actualmente, la parte principal del juego puede ejecutarse abriendo `index.html` en un navegador.



El proyecto también cuenta con una carpeta `server/`, destinada a la implementación de las funciones del servidor mediante Node.js.



Cuando el servidor esté implementado, se podrá iniciar desde la carpeta correspondiente mediante Node.js.



\## Controles



| Tecla                | Función              |

| -------------------- | -------------------- |

| W / Flecha arriba    | Acelerar             |

| S / Flecha abajo     | Frenar               |

| A / Flecha izquierda | Girar a la izquierda |

| D / Flecha derecha   | Girar a la derecha   |



\## Estructura del proyecto



```text

Turbo-Circuit-117/

│

├── index.html

│

├── css/

│   └── styles.css

│

├── js/

│   ├── main.js

│   ├── Game.js

│   ├── core/

│   │   ├── AssetManager.js

│   │   ├── GameLoop.js

│   │   └── Input.js

│   ├── entities/

│   │   ├── Player.js

│   │   └── Rival.js

│   └── systems/

│       ├── Checkpoint.js

│       ├── Collision.js

│       └── Road.js

│

├── assets/

│   └── sprites/

│       ├── Obstacles/

│       ├── Player/

│       ├── Rivals/

│       └── environment/

│

└── server/

&#x20;   └── server.js

```



\## Tecnologías utilizadas



\* HTML5

\* CSS3

\* JavaScript

\* Canvas 2D

\* Node.js

\* Git

\* GitHub



El proyecto no utiliza frameworks o motores de videojuegos como React, Angular, Vue, Phaser o Three.js.



\## Características del proyecto



Entre las características previstas para el desarrollo se encuentran:



\* Carrera arcade.

\* Carretera con perspectiva pseudo-3D.

\* Curvas y cambios de elevación.

\* Vehículo controlado por el jugador.

\* Vehículos rivales.

\* Obstáculos.

\* Colisiones.

\* Sistema de vueltas y tiempo.

\* Checkpoints.

\* Diferentes modos de juego.

\* Sistema de puntuación y clasificación.

\* Elementos ambientales.

\* Efectos de sonido y música.

\* Comunicación con un servidor mediante Node.js.



\## Repositorio



El código fuente del proyecto se encuentra disponible en GitHub:



https://github.com/JosueMiranda117/Turbo-Circuit-117.git



