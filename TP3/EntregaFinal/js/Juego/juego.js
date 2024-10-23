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

let tablero;

let ficha1;

let ficha2;

let turno;

function iniciarJuego(){
    dibujarFondo();
    dibujarTablero();
}

function dibujarFondo(){
    ctx.drawImage(fondo, 0, 0, width, height);
    ficha1 = new Ficha(50,50, 24, imagenFicha1, ctx);
    ficha1.dibujar();
    ficha2 = new Ficha(800,50, 24, imagenFicha2, ctx);
    ficha2.dibujar();
    turno = ficha1;
}

function dibujarTablero(){
    tablero = new Tablero(columnas,filas,ctx,imagenCeldaTablero);
    tablero.dibujar();
}

canvas.addEventListener('mousedown', function (e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if(seClickeoAdentro(x,y)){
        for (let i = columnas-1; i >= 0; i--) {
            if (x>width/2-58*(columnas/2)+i*58){
                tablero.insertarFicha(i, turno);
                cambioTurno();
                break;
            }
        }
    }
})

function cambioTurno(){
    if(turno == ficha1){
        turno = ficha2;
    }else{
        turno = ficha1;
    }
}

function seClickeoAdentro(x,y){
    return (x>width/2-58*(columnas/2) && x< width/2+58*(columnas/2) && y>height/2-58*(filas/2) && y< height/2+58*(filas/2));
}