"use strict"
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('juego');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
let height = canvas.height;
let width = canvas.width;

// Variables //

let columnas = 7;
let filas = 6;
let tamanioCasillero = 60;
let radioFicha = (41 * tamanioCasillero / 100);

// Verificacion carga de items //

let itemsCargados = 0;
let itemsTotales = 0;
function cargaCompleta() {
    itemsCargados++;
    if (itemsCargados === itemsTotales) {
        iniciarJuego();
    }
}

// Carga de items //

let fondo = new Image();
fondo.src = "./img/Juego/fondoTablero.jpg";
itemsTotales++;
fondo.addEventListener("load", cargaCompleta);

let imagenFicha1 = new Image()
imagenFicha1.src = "./img/Juego/Fichas/fichaJake.png";
itemsTotales++;
imagenFicha1.addEventListener("load", cargaCompleta);

let imagenFicha2 = new Image()
imagenFicha2.src = "./img/Juego/Fichas/fichaMentita.png";
itemsTotales++;
imagenFicha2.addEventListener("load", cargaCompleta);

let imagenCeldaTablero = new Image();
imagenCeldaTablero.src = "./img/Juego/Fichas/secciontablero.jpg";
itemsTotales++;
imagenCeldaTablero.addEventListener("load", cargaCompleta);

let imagenJugadorGanador = new Image();
imagenJugadorGanador.src = "./img/Juego/fondoGanador.jpeg";
itemsTotales++;
imagenJugadorGanador.addEventListener("load", cargaCompleta);

let tablero;

let fichaJugador1;

let fichaJugador2;

let turno;

function iniciarJuego() {
    dibujarFondo();
    fichaJugador1 = new Ficha(50, 50, radioFicha, imagenFicha1, ctx, "J1");
    fichaJugador2 = new Ficha(800, 50, radioFicha, imagenFicha2, ctx, "J2");
    dibujarGrupoFichas(fichaJugador1, 30, height/2.63);
    dibujarGrupoFichas(fichaJugador2, (width-60*3)-30, height/2.63);
    turno = fichaJugador1;
    dibujarTablero();
};

// modoDeJuego/columnas/filas/tamanioCasillero
// 7/10/9/40
// 6/9/8/45
// 5/8/7/50
// 4/7/6/60 

function dibujarFondo() {
    ctx.save();

    // Aplicar blur
    ctx.filter = 'blur(2px)';  // Ajusta la cantidad de desenfoque
    ctx.drawImage(fondo, 0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';  // Color negro con 50% de opacidad
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
};

function dibujarGrupoFichas(ficha, x, y) {
    ctx.fillStyle = "#FBBC05";
    ctx.fillRect(x, y, 60 * 3, 60 * 4);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(x, y, 60 * 3, 60 * 4);
    ctx.stroke();
    ctx.closePath();
    for (let i = 0; i < columnas * filas / 2; i++) {

    }
};

function dibujarTablero() {
    tablero = new Tablero(columnas, filas, ctx, imagenCeldaTablero, tamanioCasillero);
    tablero.dibujar();
};

canvas.addEventListener('mousedown', function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if (seClickeoAdentro(x, y) && !hayGanador()) {
        for (let i = columnas - 1; i >= 0; i--) {
            if (x > width / 2 - tamanioCasillero * (columnas / 2) + i * tamanioCasillero) {
                tablero.insertarFicha(i, turno);
                if (hayGanador()) {
                    setTimeout(() => {
                        terminarJuego();
                    }, 1000);
                } else {
                    cambioTurno();
                }
                break;
            }
        }
    }
});

function hayGanador() {
    return tablero.hayGanador();
};

function terminarJuego() {
    dibujarFondo();
    ctx.drawImage(imagenJugadorGanador, 0, 0, width, height);
    document.fonts.load('10pt "Concert One"').then(() => {
        ctx.font = '35px "Concert One"';
        ctx.fillStyle = "#FBBC05";
        ctx.fillRect(width / 2 - 125, height / 2 - 100, 250, 210);
        ctx.fillStyle = 'black';
        ctx.beginPath()
        ctx.rect(width / 2 - 125, height / 2 - 100, 250, 210)
        ctx.stroke();
        ctx.closePath();
        ctx.fillText('Ganador:', width / 2 - 70, height / 2 - 65);
        turno.setPos(width / 2, height / 2 + radioFicha);
        turno.setRadio(50);
        turno.dibujar();
    });
};

function cambioTurno() {
    if (turno == fichaJugador1) {
        turno = fichaJugador2;
    } else {
        turno = fichaJugador1;
    }
};

function seClickeoAdentro(x, y) {
    return (x > width / 2 - tamanioCasillero * (columnas / 2) && x < width / 2 + tamanioCasillero * (columnas / 2) && y > height / 2 - tamanioCasillero * (filas / 2) && y < height / 2 + tamanioCasillero * (filas / 2));
};