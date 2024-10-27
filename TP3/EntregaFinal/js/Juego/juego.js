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
let radioFicha;
let nombreJugador1 = "J1";
let nombreJugador2 = "J2";
let tiempo = 300;
let modosDeJuegos = [
    {
        "nombre": 4,
        "columnas": 7,
        "filas": 6,
        "tamanioCasillero": 60
    },
    {
        "nombre": 5,
        "columnas": 8,
        "filas": 7,
        "tamanioCasillero": 50
    },
    {
        "nombre": 6,
        "columnas": 9,
        "filas": 8,
        "tamanioCasillero": 45
    },
    {
        "nombre": 7,
        "columnas": 10,
        "filas": 9,
        "tamanioCasillero": 40
    }
];

// modoDeJuego/columnas/filas/tamanioCasillero
// 7/10/9/40
// 6/9/8/45
// 5/8/7/50
// 4/7/6/60 

// Variables de funciones //

let itemsCargados = 0;
let itemsTotales = 0;
let tablero;
let fichas = [[], []];
let turno = -1; // -1 para cuando no se especificó un turno, 0 para el jugador 1, y 1 para el jugador 2
let fichaSeleccionada = null; // ficha que el jugador quiere mover
let ganador;
let temporizador;
let pantalla;
let modoDeJuego;


// Botones //

let botones = {
    "modoJuego":[
        {
            "x": width/4.5,
            "y": height/1.36,
            "radio": 35
        },
        {
            "x": width/2.54,
            "y": height/1.32,
            "radio": 35
        },
        {
            "x": width/1.69,
            "y": height/1.32,
            "radio": 35
        },
        {
            "x": width/1.27,
            "y": height/1.36,
            "radio": 35
        }
    ],
    "reiniciar":[
        { // Pantalla pausa
            "x": width/2,
            "y": height/2,
            "width": 200,
            "height": 50
        },
        { // Pantalla juego terminado
            "x": width/1.3,
            "y": height/1.2,
            "width": 200,
            "height": 50
        }
    ],
    "nuevoJuego":[
        { // Pantalla pausa
            "x": width/2.5,
            "y": height/2.6,
            "width": 200,
            "height": 50
        },
        { // Pantalla juego terminado
            "x": width/1.3,
            "y": height/1.4,
            "width": 200,
            "height": 50
        }
    ],
    "pausa":{
        "x": 10,
        "y": 10,
        "width": 30,
        "height": 30
    },
    "desactivarSonido":{
        "x": width - 40,
        "y": 10,
        "width": 30,
        "height": 30
    },
    

}

// Verificacion carga de items //

/*
Cada vez que se agrega un nuevo recurso, hay que llamar a esta funcion para que asincronicamente vaya 
sumando el contador cuando se termina de cargar cada uno y lo compare con la cantidad total de recursos
*/
function cargaCompleta() {
    itemsCargados++;
    if (itemsCargados === itemsTotales) {
        seleccionarModo();
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

let imagenEmpate = new Image();
imagenEmpate.src = "./img/Juego/empate.png";
itemsTotales++;
imagenEmpate.addEventListener("load", cargaCompleta);

let imagenReiniciar = new Image();
imagenReiniciar.src = "./img/Juego/Botones/reiniciar.png";
itemsTotales++;
imagenReiniciar.addEventListener("load", cargaCompleta);

let imagenJugar = new Image();
imagenJugar.src = "./img/Juego/Botones/jugar.png";
itemsTotales++;
imagenJugar.addEventListener("load", cargaCompleta);

let imagenActivarSonido = new Image();
imagenActivarSonido.src = "./img/Juego/Botones/sonido.png";
itemsTotales++;
imagenActivarSonido.addEventListener("load", cargaCompleta);

let imagenDesactivarSonido = new Image();
imagenDesactivarSonido.src = "./img/Juego/Botones/mutear.png";
itemsTotales++;
imagenDesactivarSonido.addEventListener("load", cargaCompleta);

let imagenPausar = new Image();
imagenPausar.src = "./img/Juego/Botones/pause.png";
itemsTotales++;
imagenPausar.addEventListener("load", cargaCompleta);


let imagenReanudar = new Image();
imagenReanudar.src = "./img/Juego/Botones/inpause.png";
itemsTotales++;
imagenReanudar.addEventListener("load", cargaCompleta);

let pantallaModoDeJuego = new Image();
pantallaModoDeJuego.src = "./img/Juego/modosJuego.png";
itemsTotales++;
pantallaModoDeJuego.addEventListener("load", cargaCompleta);

let audioMenu = new Audio();
audioMenu.src = "./audio/Juego/menu.mp3";
audioMenu.loop = true;
itemsTotales++;
audioMenu.addEventListener("canplaythrough", cargaCompleta);

let audioJuego = new Audio();
audioJuego.src = "./audio/Juego/juego.mp3";
audioJuego.loop = true;
itemsTotales++;
audioJuego.addEventListener("canplaythrough", cargaCompleta);
// Funciones //

function seleccionarModo() {
    pantalla = 0;
    dibujarSeleccionModo();
}

function dibujarSeleccionModo() {
    ctx.drawImage(pantallaModoDeJuego, 0, 0, width, height);
    document.fonts.load('10pt "Concert One"').then(() => {
        ctx.font = '35px "Concert One"';
        ctx.fillStyle = "black";
        ctx.fillText("Elije el modo de juego!", width/3.2, 70);
        dibujarBotonModoJuego(width/4.5, height/1.36, 4);
        dibujarBotonModoJuego(width/2.54, height/1.32, 5);
        dibujarBotonModoJuego(width/1.69, height/1.32, 6);
        dibujarBotonModoJuego(width/1.27, height/1.36, 7);
    })
    audioMenu.play();
}

function dibujarBotonModoJuego(x,y,m, fondo = "transparent"){
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2, true);
    ctx.lineWidth = 3;
    ctx.fillStyle = fondo;
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(m, x-10, y+10);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.restore();
}

/*
Asigna las fichas, el tablero, el turno inicial y dibuja los componentes
*/
function iniciarJuego() {
    pantalla = 2;
    fichas[0] = asignarFichaJugador(imagenFicha1, nombreJugador1);
    fichas[1] = asignarFichaJugador(imagenFicha2, nombreJugador2);
    tablero = new Tablero(modosDeJuegos[modoDeJuego].columnas, modosDeJuegos[modoDeJuego].filas, ctx, imagenCeldaTablero, modosDeJuegos[modoDeJuego].tamanioCasillero);
    temporizador = new Temporizador(tiempo, ctx, imagenEmpate);
    temporizador.iniciar();
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
function asignarFichaJugador(imagen, nombreJugador) {
    let fichasAsignadas = [];
    for (let i = 0; i < modosDeJuegos[modoDeJuego].columnas * modosDeJuegos[modoDeJuego].filas / 2; i++) {
        let fichaAAsignar = new Ficha(0, 0, radioFicha, imagen, ctx, nombreJugador, true)
        fichasAsignadas.push(fichaAAsignar);
    }
    return fichasAsignadas;
}

/*
Dibuja ambos grupos de fichas y asigna las coordenadas de cada uno
*/
function dibujarGruposFichas() {
    dibujarGrupoFichas(75, height / 2.63, fichas[0]);
    dibujarGrupoFichas((width - tamanioGrupoFichas) - 75, height / 2.63, fichas[1]);
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
        fichas[i].setPos(x + tamanioGrupoFichas / 2, (y - i * 3) + tamanioGrupoFichas / 1.5);
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
        for (let i = modosDeJuegos[modoDeJuego].columnas - 1; i >= 0; i--) {
            if (x > width / 2 - modosDeJuegos[modoDeJuego].tamanioCasillero * (modosDeJuegos[modoDeJuego].columnas / 2) + i * modosDeJuegos[modoDeJuego].tamanioCasillero) {
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
    return (x > width / 2 - modosDeJuegos[modoDeJuego].tamanioCasillero * (modosDeJuegos[modoDeJuego].columnas / 2) && x < width / 2 + modosDeJuegos[modoDeJuego].tamanioCasillero * (modosDeJuegos[modoDeJuego].columnas / 2) && y > 0 && y < height / 2 - modosDeJuegos[modoDeJuego].tamanioCasillero * (modosDeJuegos[modoDeJuego].filas / 2));
};

/*
Le pregunta al tablero si hay un ganador
*/
function hayGanador() {
    return tablero.hayGanador();
}

/*
Dibuja los botones
*/

function dibujarBotones() {
    dibujarBotonPausa();
    dibujarBotonDesactivarSonido();
}

function dibujarBotonPausa() {
    ctx.drawImage(imagenPausar, botones.pausa.x, botones.pausa.y, botones.pausa.width, botones.pausa.height);
}

function dibujarBotonDesactivarSonido() {
    ctx.drawImage(imagenDesactivarSonido, botones.desactivarSonido.x, botones.desactivarSonido.y, botones.desactivarSonido.width, botones.desactivarSonido.height);
}

function dibujarBotonReiniciar() {
    ctx.drawImage(imagenReiniciar, botones.reiniciar[1].x, botones.reiniciar[1].y, botones.reiniciar[1].width, botones.reiniciar[1].height);
}

function dibujarBotonNuevoJuego() {
    ctx.drawImage(imagenJugar, botones.nuevoJuego[1].x, botones.nuevoJuego[1].y, botones.nuevoJuego[1].width, botones.nuevoJuego[1].height);
}

/*
Presenta la pantalla con el ganador
*/
function terminarJuego(ficha) {
    dibujarFondo();
    ctx.save();
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
        ctx.restore();
        temporizador.pausar();
        mostrarGanador(ficha);
    });
};

/*
Muestra la ficha del ganador
*/
function mostrarGanador(ficha) {
    ficha.setPos(width / 2, height / 2 + radioFicha);
    ficha.setRadio(0);
    ficha.dibujar();
    ganador = ficha;
    animate();
}

/*
Animacion para la ficha del ganador, se hace mas grande
*/
function animate() {
    requestAnimationFrame(animate);
    if (ganador.getRadio() <= 50) {
        ganador.setRadio(ganador.getRadio() + 1);
        ganador.dibujar();
    }
}

/*
Setea el turno principal de forma aleatoria y alterna los turnos siguientes
*/
function cambioTurno() {
    if (turno == -1) {
        turno = Math.floor(Math.random() * 2);
    } else
        if (turno == 0) {
            turno = 1;
        } else {
            turno = 0;
        }
    fichas[turno][fichas[turno].length - 1].setBloqueada(false);
    reDibujar();
};

function cambiarModoDeJuego(modo) {
    modoDeJuego = modo;
    radioFicha = (41 * modosDeJuegos[modoDeJuego].tamanioCasillero / 100);
}

function distanciaEntreDosPuntos(x,y,x2,y2){
    let dx = x - x2;
    let dy = y - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function mouseDentroArea(x,y,x2,y2,w,h){
    return (x > x2 && x < x2 + w && y > y2 && y < y2 + h);
}

/*
Evento para cuando el usuario presiona el click
*/
canvas.addEventListener("mousedown", (e) => { mousedown(e) });

/*
Selecciona la ficha que el usuario clickeó y la saca de la pila de fichas
*/
function mousedown(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    switch (pantalla) {
        case 0:
            for (let index = 0; index < botones.modoJuego.length; index++) {
                let distancia = distanciaEntreDosPuntos(x,y,botones.modoJuego[index].x,botones.modoJuego[index].y);
                if(distancia <= botones.modoJuego[index].radio){
                    cambiarModoDeJuego(index);
                    audioMenu.pause();
                    audioJuego.play();
                    iniciarJuego();
                }
            }
            break;
        case 1:

        case 2:
            if (turno != -1) {
                let ficha = fichas[turno][fichas[turno].length - 1];
                if (ficha.mouseDentro(x, y) && !ficha.isBloqueada()) {
                    fichaSeleccionada = ficha;
                    fichas[turno].pop();
                }
            }
            break;
        case 3:

        case 4:

    }
}

/*
Evento para cuando el usuario mueve el mouse
*/
canvas.addEventListener("mousemove", (e) => { mousemove(e) });

/*
Actualiza la posicion de la ficha y redibuja lo demás
*/
function mousemove(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    switch (pantalla) {
        case 0:
            audioMenu.play();
            for (let index = 0; index < botones.modoJuego.length; index++) {
                let distancia = distanciaEntreDosPuntos(x,y,botones.modoJuego[index].x,botones.modoJuego[index].y);
                if(distancia <= botones.modoJuego[index].radio){
                    dibujarBotonModoJuego(botones.modoJuego[index].x, botones.modoJuego[index].y,modosDeJuegos[index].nombre,"#FBBC05")
                }
                else{
                    dibujarBotonModoJuego(botones.modoJuego[index].x, botones.modoJuego[index].y,modosDeJuegos[index].nombre, "white")
                }
            }
            break;
        case 1:

        case 2:
            audioMenu.pause();
            audioJuego.play();
            if (fichaSeleccionada != null) {
                reDibujar();
                let x = e.offsetX;
                let y = e.offsetY;
                fichaSeleccionada.setPos(x, y);
                fichaSeleccionada.dibujar();
            }
        case 3:

        case 4:

    }
 
}

/*
Evento para cuando el usuario levanta el click
*/
canvas.addEventListener("mouseup", (e) => { soltarFicha(e) });

/*
Pregunta si el usuario quiere soltar la ficha en la zona correcta y la inserta, de caso contrario, la
vuelve a poner en la pila correspondiente
*/
function soltarFicha(e) {
    if (fichaSeleccionada != null) {
        let x = e.offsetX;
        let y = e.offsetY;
        if (zonaParaSoltarFicha(x, y)) {
            fichaSeleccionada.setBloqueada(true);
            colocarFicha(e);
        } else {
            fichas[turno].push(fichaSeleccionada);
            reDibujar();
        }
        fichaSeleccionada = null;
    }
}

/*
Redibuja todos los componentes
*/
function reDibujar() {
    dibujarFondo();
    tablero.dibujar();
    dibujarGruposFichas();
    dibujarBotones();
    temporizador.dibujar();

}