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
let tamanioCasillero = 58;
let radioFicha = 24;

// Verificacion carga de items //

let itemsCargados = 0;
let itemsTotales = 0;
function cargaCompleta(){
    itemsCargados++;
    if(itemsCargados === itemsTotales){
        iniciarJuego();
    }
}

// Carga de items //

let fondo = new Image();
fondo.src = "./img/Juego/fondoTablero.jpg";
itemsTotales ++;
fondo.addEventListener("load", cargaCompleta);

let imagenFicha1 = new Image()
imagenFicha1.src = "./img/Juego/Fichas/fichaJake.png";
itemsTotales ++;
imagenFicha1.addEventListener("load", cargaCompleta);

let imagenFicha2 = new Image()
imagenFicha2.src = "./img/Juego/Fichas/fichaMentita.png";
itemsTotales ++;
imagenFicha2.addEventListener("load", cargaCompleta);

let imagenCeldaTablero = new Image();
imagenCeldaTablero.src = "./img/Juego/Fichas/secciontablero.jpg";
itemsTotales ++;
imagenCeldaTablero.addEventListener("load", cargaCompleta);

let imagenJugadorGanador = new Image();
imagenJugadorGanador.src = "./img/Juego/fondoGanador.jpeg";
itemsTotales ++;
imagenJugadorGanador.addEventListener("load", cargaCompleta);

let tablero;

let fichaJugador1;

let fichaJugador2;

let turno;

function iniciarJuego(){
    dibujarFondo();
    fichaJugador1 = new Ficha(50,50, radioFicha, imagenFicha1, ctx, "J1");
    fichaJugador2 = new Ficha(800,50, radioFicha, imagenFicha2, ctx, "J2");
    turno = fichaJugador1;
    dibujarTablero();
}

function dibujarFondo(){
    ctx.drawImage(fondo, 0, 0, width, height);
}

function dibujarTablero(){
    tablero = new Tablero(columnas,filas,ctx,imagenCeldaTablero);
    tablero.dibujar();
}

canvas.addEventListener('mousedown', function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if(seClickeoAdentro(x,y)&&!hayGanador()){
        for (let i = columnas-1; i >= 0; i--) {
            if (x>width/2-tamanioCasillero*(columnas/2)+i*tamanioCasillero){
                tablero.insertarFicha(i, turno);
                if(hayGanador()){
                    setTimeout(() => {
                        terminarJuego();
                      }, 1000);
                }else{
                    cambioTurno();
                }
                break;
            }
        }
    }
})

function hayGanador(){
    return tablero.hayGanador();
}

function terminarJuego(){
    dibujarFondo();
    ctx.drawImage(imagenJugadorGanador, 0, 0, width, height);
    document.fonts.load('10pt "Concert One"').then(() => {
        ctx.font = '35px "Concert One"';
        ctx.fillStyle = "#FBBC05";
        ctx.fillRect(width/2-125, height/2-100, 250, 210);
        ctx.fillStyle = 'black';
        ctx.beginPath()
        ctx.rect(width/2-125, height/2-100, 250, 210)
        ctx.stroke();
        ctx.closePath();
        ctx.fillText('Ganador:', width/2-70, height/2-65);
        turno.setPos(width/2, height/2+radioFicha);
        turno.setRadio(50);
        turno.dibujar();
    });
}

function cambioTurno(){
    if(turno == fichaJugador1){
        turno = fichaJugador2;
    }else{
        turno = fichaJugador1;
    }
}

function seClickeoAdentro(x,y){
    return (x>width/2-tamanioCasillero*(columnas/2) && x< width/2+tamanioCasillero*(columnas/2) && y>height/2-tamanioCasillero*(filas/2) && y< height/2+tamanioCasillero*(filas/2));
}