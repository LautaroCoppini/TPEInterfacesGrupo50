"use strict"
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('juego');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
let height = canvas.height;
let width = canvas.width;

// Constantes //

const tamanioGrupoFichas = 90; // para el cuadrado que contiene el monton de fichas

// Variables de configuracion general//

let columnas = 7;
let filas = 6;
let tamanioCasillero = 60;
let radioFicha = (41 * tamanioCasillero / 100);
let nombreJugador1 = "J1";
let nombreJugador2 = "J2";

// Variables de funciones //

let itemsCargados = 0;
let itemsTotales = 0;
let tablero;
let fichas = [[],[]];
let turno = -1; // -1 para cuando no se especificó un turno, 0 para el jugador 1, y 1 para el jugador 2
let fichaSeleccionada = null; // ficha que el jugador quiere mover
let ganador;

// modoDeJuego/columnas/filas/tamanioCasillero
// 7/10/9/40
// 6/9/8/45
// 5/8/7/50
// 4/7/6/60 

// Verificacion carga de items //

/*
Cada vez que se agrega un nuevo recurso, hay que llamar a esta funcion para que asincronicamente vaya 
sumando el contador cuando se termina de cargar cada uno y lo compare con la cantidad total de recursos
*/
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

// Funciones //

/*
Asigna las fichas, el tablero, el turno inicial y dibuja los componentes
*/
function iniciarJuego() {
    fichas[0] = asignarFichaJugador(imagenFicha1, nombreJugador1);
    fichas[1] = asignarFichaJugador(imagenFicha2, nombreJugador2);
    tablero = new Tablero(columnas, filas, ctx, imagenCeldaTablero, tamanioCasillero);
    reDibujar();
    cambioTurno();
};

/*
Dibuja el fondo a partir de una imagen, aplicandole blur y oscureciendola
*/
function dibujarFondo() {
    ctx.save();
    ctx.filter = 'blur(2px)';
    ctx.drawImage(fondo, 0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
};

/*
Crea las fichas para cada jugador
*/
function asignarFichaJugador(imagen, nombreJugador){
    let fichasAsignadas = [];
    for (let i = 0; i < columnas * filas / 2; i++) {
        let fichaAAsignar = new Ficha(0, 0, radioFicha, imagen, ctx, nombreJugador, true)
        fichasAsignadas.push(fichaAAsignar);
    }
    return fichasAsignadas;
}

/*
Dibuja ambos grupos de fichas y asigna las coordenadas de cada uno
*/
function dibujarGruposFichas(){
    dibujarGrupoFichas(75, height/2.63, fichas[0]);
    dibujarGrupoFichas((width-tamanioGrupoFichas)-75, height/2.63, fichas[1]);
}

/*
Dibuja el contenedor para las fichas y las ubica una arriba de la otra
*/
function dibujarGrupoFichas(x, y, fichas) {
    ctx.save();
    ctx.fillStyle = "#FBBC05";
    ctx.fillRect(x, y, tamanioGrupoFichas, tamanioGrupoFichas);
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(x, y, tamanioGrupoFichas, tamanioGrupoFichas);
    ctx.stroke();
    ctx.closePath();
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].setPos(x + tamanioGrupoFichas / 2, (y-i*3) + tamanioGrupoFichas / 1.5);
        fichas[i].dibujar()
    }
    ctx.restore();
};

/*
Calcula en que columna quiere el usuario colocar la ficha y la ubica en su posicion correspondiente
*/
function colocarFicha(e) {
    let x = e.offsetX;
    if (!hayGanador()) {
        for (let i = columnas - 1; i >= 0; i--) {
            if (x > width / 2 - tamanioCasillero * (columnas / 2) + i * tamanioCasillero) {
                tablero.insertarFicha(i, fichaSeleccionada);
                ganador = fichaSeleccionada;
                reDibujar();
                if (hayGanador()) {
                    setTimeout(() => {
                        terminarJuego(ganador);
                    }, 1000);
                } else {
                    cambioTurno();
                }
                break;
            }
        }
    }
};

/*
Calcula si la posición que el usuario quiere soltar la ficha es valida
*/
function zonaParaSoltarFicha(x, y) {
    return (x > width / 2 - tamanioCasillero * (columnas / 2) && x < width / 2 + tamanioCasillero * (columnas / 2) && y > 0 && y < height / 2 - tamanioCasillero * (filas / 2));
};

/*
Le pregunta al tablero si hay un ganador
*/
function hayGanador() {
    return tablero.hayGanador();
};

/*
Presenta la pantalla con el ganador
*/
function terminarJuego(ficha) {
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
        mostrarGanador(ficha);
    });
};

/*
Muestra la ficha del ganador
*/
function mostrarGanador(ficha){
    ficha.setPos(width / 2, height / 2 + radioFicha);
    ficha.setRadio(0);
    ficha.dibujar();
    ganador = ficha;
    animate();
}

/*
Animacion para la ficha del ganador, se hace mas grande
*/
function animate(){
    requestAnimationFrame(animate);
    if(ganador.getRadio()<=50){
        ganador.setRadio(ganador.getRadio()+1);
        ganador.dibujar();
    }
}

/*
Setea el turno principal de forma aleatoria y alterna los turnos siguientes
*/
function cambioTurno() {
    if(turno == -1){
        turno = Math.floor(Math.random() * 2);
    }else
    if (turno == 0) {
        turno = 1;
    } else {
        turno = 0;
    }
    fichas[turno][fichas[turno].length-1].setBloqueada(false);
    reDibujar();
};

/*
Evento para cuando el usuario presiona el click
*/
canvas.addEventListener("mousedown", (e)=>{seleccionarFicha(e)});

/*
Selecciona la ficha que el usuario clickeó y la saca de la pila de fichas
*/
function seleccionarFicha(e){
    let x = e.offsetX;
    let y = e.offsetY;
    let ficha = fichas[turno][fichas[turno].length-1];
    if (ficha.mouseDentro(x,y)&&!ficha.isBloqueada()){
        fichaSeleccionada = ficha;
        fichas[turno].pop();
    }
}

/*
Evento para cuando el usuario mueve el mouse
*/
canvas.addEventListener("mousemove", (e)=>{moverFicha(e)});

/*
Actualiza la posicion de la ficha y redibuja lo demás
*/
function moverFicha(e){
    if(fichaSeleccionada!=null){
        reDibujar();
        let x = e.offsetX;
        let y = e.offsetY;
        fichaSeleccionada.setPos(x,y);
        fichaSeleccionada.dibujar();
    }
}

/*
Evento para cuando el usuario levanta el click
*/
canvas.addEventListener("mouseup", (e)=>{soltarFicha(e)});

/*
Pregunta si el usuario quiere soltar la ficha en la zona correcta y la inserta, de caso contrario, la
vuelve a poner en la pila correspondiente
*/
function soltarFicha(e){
    if(fichaSeleccionada!=null){
        let x = e.offsetX;
        let y = e.offsetY;
        if(zonaParaSoltarFicha(x, y)){
            fichaSeleccionada.setBloqueada(true);
            colocarFicha(e);
        }else{
            fichas[turno].push(fichaSeleccionada);
            reDibujar();
        }
        fichaSeleccionada = null;
    }
}

/*
Redibuja todos los componentes
*/
function reDibujar(){
    dibujarFondo();
    tablero.dibujar();
    dibujarGruposFichas();
}