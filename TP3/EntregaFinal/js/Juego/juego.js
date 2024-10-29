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
let jugador1;
let jugador2;
let tiempo = 300;
let volumen = 0.1;
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
let muteado = false;
let pausado;
let hintCaida;
let posHint = {
    "x": width / 2 - 10,
    "y": -30
};
let columnasLlenas;
let personajes;



// Botones //

let botones = {
    "modoJuego": [
        {
            "x": width / 4.5,
            "y": height / 1.36,
            "radio": 35
        },
        {
            "x": width / 2.54,
            "y": height / 1.32,
            "radio": 35
        },
        {
            "x": width / 1.69,
            "y": height / 1.32,
            "radio": 35
        },
        {
            "x": width / 1.27,
            "y": height / 1.36,
            "radio": 35
        }
    ],
    "reiniciar": [
        { // Pantalla pausa
            "x": width / 2.5,
            "y": height / 2,
            "width": 200,
            "height": 50
        },
        { // Pantalla juego terminado
            "x": width / 1.3,
            "y": height / 1.2,
            "width": 200,
            "height": 50
        }
    ],
    "nuevoJuego": [
        { // Pantalla opening
            "x": width / 2 - 100,
            "y": height / 1.1,
            "width": 200,
            "height": 50
        },
        { // Pantalla pausa
            "x": width / 2.5,
            "y": height / 2.6,
            "width": 200,
            "height": 50
        },
        { // Pantalla juego terminado
            "x": width / 1.3,
            "y": height / 1.4,
            "width": 200,
            "height": 50
        }
    ],
    "pausa": {
        "x": 10,
        "y": 10,
        "width": 30,
        "height": 30
    },
    "desactivarSonido": {
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
    if (itemsCargados < itemsTotales) {
        dibujarProgresoCarga();
    } else {
        audioJuego.removeEventListener("canplaythrough", cargaCompleta);
        audioMenu.removeEventListener("canplaythrough", cargaCompleta);
        audioSeleccionJake.removeEventListener("canplaythrough", cargaCompleta);
        audioSeleccionBmo.removeEventListener("canplaythrough", cargaCompleta);
        audioSeleccionDulcePrincesa.removeEventListener("canplaythrough", cargaCompleta);
        audioSeleccionFinn.removeEventListener("canplaythrough", cargaCompleta);
        audioSeleccionMentita.removeEventListener("canplaythrough", cargaCompleta);
        audioSeleccionReyHelado.removeEventListener("canplaythrough", cargaCompleta);

        opening();
    }
}

function dibujarProgresoCarga() {
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "White";
    ctx.fillRect(width / 4, height / 2 - 10, (width / 2) * (itemsCargados / itemsTotales), 20);
    let texto = itemsCargados + "/" + itemsTotales;
    let anchoTexto = ctx.measureText(texto).width;
    ctx.font = '20px Arial';
    ctx.fillText(texto, width / 2 - anchoTexto / 2, height / 1.8)
    ctx.restore();
}

// Carga de items //

let fondo = new Image();
fondo.src = "./img/Juego/fondoTablero.jpg";
itemsTotales++;
fondo.addEventListener("load", cargaCompleta);

let fichaBmo = new Image()
fichaBmo.src = "./img/Juego/Fichas/fichaBmo.png";
itemsTotales++;
fichaBmo.addEventListener("load", cargaCompleta);

let fichaDulcePrincesa = new Image()
fichaDulcePrincesa.src = "./img/Juego/Fichas/fichaDulce.png";
itemsTotales++;
fichaDulcePrincesa.addEventListener("load", cargaCompleta);

let fichaFinn = new Image()
fichaFinn.src = "./img/Juego/Fichas/fichaFinn.png";
itemsTotales++;
fichaFinn.addEventListener("load", cargaCompleta);

let fichaJake = new Image()
fichaJake.src = "./img/Juego/Fichas/fichaJake.png";
itemsTotales++;
fichaJake.addEventListener("load", cargaCompleta);

let fichaMentita = new Image()
fichaMentita.src = "./img/Juego/Fichas/fichaMentita.png";
itemsTotales++;
fichaMentita.addEventListener("load", cargaCompleta);

let fichaReyHelado = new Image()
fichaReyHelado.src = "./img/Juego/Fichas/fichaReyHelado.png";
itemsTotales++;
fichaReyHelado.addEventListener("load", cargaCompleta);

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

let pjBmo = new Image();
pjBmo.src = "./img/Juego/Personajes/bmo.jpg";
itemsTotales++;
pjBmo.addEventListener("load", cargaCompleta);

let pjDulcePrincesa = new Image();
pjDulcePrincesa.src = "./img/Juego/Personajes/dulcePrincesa.jpg";
itemsTotales++;
pjDulcePrincesa.addEventListener("load", cargaCompleta);

let pjFinn = new Image();
pjFinn.src = "./img/Juego/Personajes/finn.jpg";
itemsTotales++;
pjFinn.addEventListener("load", cargaCompleta);

let pjJake = new Image();
pjJake.src = "./img/Juego/Personajes/jake.jpg";
itemsTotales++;
pjJake.addEventListener("load", cargaCompleta);

let pjMentita = new Image();
pjMentita.src = "./img/Juego/Personajes/mentita.jpg";
itemsTotales++;
pjMentita.addEventListener("load", cargaCompleta);

let pjReyHelado = new Image();
pjReyHelado.src = "./img/Juego/Personajes/reyHelado.jpg";
itemsTotales++;
pjReyHelado.addEventListener("load", cargaCompleta);

let hint = new Image();
hint.src = "./img/Juego/hint.png";
itemsTotales++;
hint.addEventListener("load", cargaCompleta);

let fondoMadera = new Image();
fondoMadera.src = "./img/Juego/fondoMadera.png";
itemsTotales++;
fondoMadera.addEventListener("load", cargaCompleta);

let fondoOpening = new Image();
fondoOpening.src = "./img/Juego/fondoOpening.jpg";
itemsTotales++;
fondoOpening.addEventListener("load", cargaCompleta);

let audioMenu = new Audio();
audioMenu.src = "./audio/Juego/menu.mp3";
audioMenu.loop = true;
audioMenu.volume = volumen;
itemsTotales++;
audioMenu.addEventListener("canplaythrough", cargaCompleta);

let audioJuego = new Audio();
audioJuego.src = "./audio/Juego/juego.mp3";
audioJuego.loop = true;
audioJuego.volume = volumen;
itemsTotales++;
audioJuego.addEventListener("canplaythrough", cargaCompleta);

let audioSeleccionBmo = new Audio();
audioSeleccionBmo.src = "./audio/Juego/seleccionBmo.mp3";
audioSeleccionBmo.volume = 1;
itemsTotales++;
audioSeleccionBmo.addEventListener("canplaythrough", cargaCompleta);

let audioSeleccionDulcePrincesa = new Audio();
audioSeleccionDulcePrincesa.src = "./audio/Juego/seleccionDulcePrincesa.mp3";
audioSeleccionDulcePrincesa.volume = 1;
itemsTotales++;
audioSeleccionDulcePrincesa.addEventListener("canplaythrough", cargaCompleta);

let audioSeleccionFinn = new Audio();
audioSeleccionFinn.src = "./audio/Juego/seleccionFinn.mp3";
audioSeleccionFinn.volume = 1;
itemsTotales++;
audioSeleccionFinn.addEventListener("canplaythrough", cargaCompleta);

let audioSeleccionJake = new Audio();
audioSeleccionJake.src = "./audio/Juego/seleccionJake.mp3";
audioSeleccionJake.volume = 1;
itemsTotales++;
audioSeleccionJake.addEventListener("canplaythrough", cargaCompleta);

let audioSeleccionMentita = new Audio();
audioSeleccionMentita.src = "./audio/Juego/seleccionMentita.mp3";
audioSeleccionMentita.volume = 1;
itemsTotales++;
audioSeleccionMentita.addEventListener("canplaythrough", cargaCompleta);

let audioSeleccionReyHelado = new Audio();
audioSeleccionReyHelado.src = "./audio/Juego/seleccionReyHelado.mp3";
audioSeleccionReyHelado.volume = 1;
itemsTotales++;
audioSeleccionReyHelado.addEventListener("canplaythrough", cargaCompleta);

// Funciones //
function opening() {
    pantalla = 0;
    dibujarOpening();
}

function dibujarOpening() {
    ctx.drawImage(fondoOpening, 0, 0, width, height);
    ctx.drawImage(imagenJugar, botones.nuevoJuego[0].x, botones.nuevoJuego[0].y, botones.nuevoJuego[0].width, botones.nuevoJuego[0].height)
}

function seleccionarModo() {
    audioMenu.volume = volumen;
    pantalla = 1;
    audioMenu.play();
    audioMenu.currentTime = 0;
    jugador1 = null;
    jugador2 = null;
    dibujarSeleccionModo();
}

function dibujarSeleccionModo() {
    ctx.drawImage(pantallaModoDeJuego, 0, 0, width, height);
    document.fonts.load('10pt "Concert One"').then(() => {
        ctx.font = '35px "Concert One"';
        ctx.fillStyle = "black";
        ctx.fillText("Elige el modo de juego!", width / 3.2, 70);
        dibujarBotonModoJuego(width / 4.5, height / 1.36, 4);
        dibujarBotonModoJuego(width / 2.54, height / 1.32, 5);
        dibujarBotonModoJuego(width / 1.69, height / 1.32, 6);
        dibujarBotonModoJuego(width / 1.27, height / 1.36, 7);
    })
    audioMenu.play();
}

function dibujarBotonModoJuego(x, y, m, fondo = "transparent") {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2, true);
    ctx.lineWidth = 3;
    ctx.fillStyle = fondo;
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(m, x - 10, y + 10);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.restore();
}

function seleccionarPersonaje() {
    pantalla = 2;
    cargarPersonajes();
    dibujarSeleccionPersonaje();
}

function cargarPersonajes() {
    personajes = [];
    personajes.push({
        "imagen": pjBmo,
        "nombre": "BMO",
        "jugador": -1,
        "ficha": fichaBmo,
        "sonido": audioSeleccionBmo
    });
    personajes.push({
        "imagen": pjDulcePrincesa,
        "nombre": "Dulce Princesa",
        "jugador": -1,
        "ficha": fichaDulcePrincesa,
        "sonido": audioSeleccionDulcePrincesa
    });
    personajes.push({
        "imagen": pjFinn,
        "nombre": "Finn el humano",
        "jugador": -1,
        "ficha": fichaFinn,
        "sonido": audioSeleccionFinn
    });
    personajes.push({
        "imagen": pjJake,
        "nombre": "Jake el perro",
        "jugador": -1,
        "ficha": fichaJake,
        "sonido": audioSeleccionJake
    });
    personajes.push({
        "imagen": pjMentita,
        "nombre": "Mentita",
        "jugador": -1,
        "ficha": fichaMentita,
        "sonido": audioSeleccionMentita
    });
    personajes.push({
        "imagen": pjReyHelado,
        "nombre": "Rey Helado",
        "jugador": -1,
        "ficha": fichaReyHelado,
        "sonido": audioSeleccionReyHelado
    });
}

function dibujarSeleccionPersonaje() {

    ctx.save();
    for (let index = 0; index < personajes.length; index++) {
        ctx.drawImage(personajes[index].imagen, width / personajes.length * index, height / 2 - height / 1.3 / 2, width / personajes.length, height / 1.3);
        if (personajes[index].jugador == -1) {
            ctx.save();
            ctx.filter = 'blur(2px)';
            ctx.drawImage(personajes[index].imagen, width / personajes.length * index, height / 2 - height / 1.3 / 2, width / personajes.length, height / 1.3);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(width / personajes.length * index - 2, height / 2 - height / 1.3 / 2, width / personajes.length + 6, height / 1.3);
            ctx.restore();
        }
        ctx.beginPath();
        ctx.rect(width / personajes.length * index, height / 2 - height / 1.3 / 2, width / personajes.length, height / 1.3);
        ctx.fillStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
    ctx.beginPath();
    ctx.ellipse(width / 2, 0, width / 1.5, width / 8, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "#004D4D"; // Color de relleno
    ctx.ellipse(width / 2, height, width / 1.5, width / 8, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "white";
    let texto = "Elige tu personaje";
    let anchoTexto = ctx.measureText(texto).width;
    ctx.fillText("Elige tu personaje", width / 2 - anchoTexto / 2, 70)
    ctx.restore();

}

/*
Asigna las fichas, el tablero, el turno inicial y dibuja los componentes
*/
function iniciarJuego() {
    pantalla = 3;
    audioJuego.currentTime = 0;
    audioJuego.play();
    fichas[0] = asignarFichaJugador(jugador1.ficha, 1);
    fichas[1] = asignarFichaJugador(jugador2.ficha, 2);
    tablero = new Tablero(modosDeJuegos[modoDeJuego].columnas, modosDeJuegos[modoDeJuego].filas, ctx, imagenCeldaTablero, modosDeJuegos[modoDeJuego].tamanioCasillero, modosDeJuegos[modoDeJuego].nombre);
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
    ctx.drawImage(fondoMadera, x, y, tamanioGrupoFichas, tamanioGrupoFichas);
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].setPos(x + tamanioGrupoFichas / 2, (y - i * 3) + tamanioGrupoFichas / 2);
        fichas[i].dibujar()
    }
};

/*
Calcula en que columna quiere el usuario colocar la ficha y la ubica en su posicion correspondiente
*/
function colocarFicha(e) {
    let x = e.offsetX;
    if (!hayGanador()) {
        for (let i = modosDeJuegos[modoDeJuego].columnas - 1; i >= 0; i--) {
            if (x > width / 2 - modosDeJuegos[modoDeJuego].tamanioCasillero * (modosDeJuegos[modoDeJuego].columnas / 2) + i * modosDeJuegos[modoDeJuego].tamanioCasillero) {
                if (columnasLlenas[i]) {
                    return false;
                }
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
                return true;
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
    if (muteado) {
        dibujarBotonDesactivarSonido();
    } else {
        dibujarBotonActivarSonido();
    }
    if (pausado) {
        dibujarBotonReanudar();
    } else {
        dibujarBotonPausa();
    }
}

function dibujarBotonPausa() {
    ctx.drawImage(imagenPausar, botones.pausa.x, botones.pausa.y, botones.pausa.width, botones.pausa.height);
}

function dibujarBotonReanudar() {
    ctx.drawImage(imagenReanudar, botones.pausa.x, botones.pausa.y, botones.pausa.width, botones.pausa.height);
}

function dibujarBotonDesactivarSonido() {
    ctx.drawImage(imagenDesactivarSonido, botones.desactivarSonido.x, botones.desactivarSonido.y, botones.desactivarSonido.width, botones.desactivarSonido.height);
}

function dibujarBotonActivarSonido() {
    ctx.drawImage(imagenActivarSonido, botones.desactivarSonido.x, botones.desactivarSonido.y, botones.desactivarSonido.width, botones.desactivarSonido.height);
}

function dibujarBotonReiniciar() {
    let index = 1;
    if (pausado) {
        index = 0;
    }
    ctx.drawImage(imagenReiniciar, botones.reiniciar[index].x, botones.reiniciar[index].y, botones.reiniciar[index].width, botones.reiniciar[index].height);
}

function dibujarBotonNuevoJuego() {
    let index = 2;
    if (pausado) {
        index = 1;
    }
    ctx.drawImage(imagenJugar, botones.nuevoJuego[index].x, botones.nuevoJuego[index].y, botones.nuevoJuego[index].width, botones.nuevoJuego[index].height);
}

function dibujarHint() {
    let hintX = (width / 2 - modosDeJuegos[modoDeJuego].columnas * modosDeJuegos[modoDeJuego].tamanioCasillero / 2) + 10;
    if (fichaSeleccionada != null) {
        for (let index = 0; index < modosDeJuegos[modoDeJuego].columnas; index++) {
            if (!columnasLlenas[index])
                ctx.drawImage(hint, hintX + modosDeJuegos[modoDeJuego].tamanioCasillero * index, posHint.y, 40, 60);
        }
    }
}

function animarHint() {
    if (fichaSeleccionada != null) {
        requestAnimationFrame(animarHint);
        if (posHint.y == 0) {
            hintCaida = false
        }
        if (posHint.y == -60) {
            hintCaida = true;
        }
        if (hintCaida) {
            posHint.y++;
        } else {
            posHint.y--;
        }
        reDibujar();
        dibujarHint();
        fichaSeleccionada.dibujar();
    }
}
/*
Presenta la pantalla con el ganador
*/
function terminarJuego(ficha) {
    pantalla = 4;
    dibujarFondo();
    ctx.save();
    ctx.drawImage(imagenJugadorGanador, 0, 0, width, height);
    document.fonts.load('10pt "Concert One"').then(() => {
        ctx.font = '35px "Concert One"';
        ctx.drawImage(fondoMadera, width / 2 - 125, height / 2.2, 250, 220);
        ctx.fillStyle = 'black';
        let texto = "Ganador:";
        let anchoTexto = ctx.measureText(texto).width;
        ctx.fillText(texto, width / 2 - anchoTexto / 2, height / 1.9);
        ctx.restore();
        temporizador.pausar();
        mostrarGanador(ficha);
    });
    dibujarBotonNuevoJuego();
    dibujarBotonReiniciar();
};

/*
Muestra la ficha del ganador
*/
function mostrarGanador(ficha) {
    ficha.setPos(width / 2, height / 1.5);
    ficha.setRadio(0);
    ficha.dibujar();
    ganador = ficha;
    animate();
}

/*
Animacion para la ficha del ganador, se hace mas grande
*/
function animate() {
    if (pantalla == 4) {
        requestAnimationFrame(animate);
        if (ganador.getRadio() <= 50) {
            ganador.setRadio(ganador.getRadio() + 1);
            ganador.dibujar();
        }
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

function distanciaEntreDosPuntos(x, y, x2, y2) {
    let dx = x - x2;
    let dy = y - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function mouseDentroArea(x, y, x2, y2, w, h) {
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
        case 0: // Opening
            if (mouseDentroArea(x, y, botones.nuevoJuego[0].x, botones.nuevoJuego[0].y, botones.nuevoJuego[0].width, botones.nuevoJuego[0].height)) {
                seleccionarModo();
            }
            break;
        case 1: // Seleccion de modo de juego
            for (let index = 0; index < botones.modoJuego.length; index++) {
                let distancia = distanciaEntreDosPuntos(x, y, botones.modoJuego[index].x, botones.modoJuego[index].y);
                if (distancia <= botones.modoJuego[index].radio) {
                    cambiarModoDeJuego(index);
                    audioMenu.volume = 0.015;
                    seleccionarPersonaje();
                }
            }
            break;
        case 2: // Seleccion de personaje
            for (let index = 0; index < personajes.length; index++) {
                if (mouseDentroArea(x, y, width / personajes.length * index, height / 2 - height / 1.3 / 2 + 50, width / personajes.length, height / 1.3 - 105)) {
                    if (personajes[index].jugador <= 0) {
                        if (jugador1 == null) {
                            personajes[index].jugador = 1;
                            jugador1 = personajes[index];
                            personajes[index].sonido.play();
                            
                        } else if(jugador2 == null) {
                            jugador1.sonido.pause();
                            jugador1.sonido.currentTime = 0;
                            personajes[index].jugador = 2;
                            jugador2 = personajes[index];
                            personajes[index].sonido.play();
                            setTimeout(iniciarJuego,jugador2.sonido.duration*1000);
                        }
                    }
                }
            }
            break;
        case 3: // Juego
            if (turno != -1) {
                let ficha = fichas[turno][fichas[turno].length - 1];
                if (ficha.mouseDentro(x, y) && !ficha.isBloqueada() && !pausado) {
                    fichaSeleccionada = ficha;
                    fichas[turno].pop();
                    animarHint();
                }
            }
            if (mouseDentroArea(x, y, botones.desactivarSonido.x, botones.desactivarSonido.y, botones.desactivarSonido.width, botones.desactivarSonido.height)) {
                if (muteado) {
                    audioJuego.volume = volumen;
                    muteado = false;
                } else {
                    audioJuego.volume = 0;
                    muteado = true;
                }
                reDibujar();
            }
            if (mouseDentroArea(x, y, botones.pausa.x, botones.pausa.y, botones.pausa.width, botones.pausa.height)) {
                if (pausado) {
                    pausado = false;
                    temporizador.reanudar();
                } else {
                    pausado = true;
                    temporizador.pausar();
                }
                reDibujar();
            }
            if (pausado) {
                if (mouseDentroArea(x, y, botones.nuevoJuego[1].x, botones.nuevoJuego[1].y, botones.nuevoJuego[1].width, botones.nuevoJuego[1].height)) {
                    pausado = false;
                    audioJuego.pause();
                    audioJuego.currentTime = 0;
                    audioMenu.currentTime = 0;
                    seleccionarModo();
                }
                if (mouseDentroArea(x, y, botones.reiniciar[0].x, botones.reiniciar[0].y, botones.reiniciar[0].width, botones.reiniciar[0].height)) {
                    pausado = false;
                    audioJuego.currentTime = 0;
                    iniciarJuego();
                }
            }
            break;
        case 4: // Ganador
            if (mouseDentroArea(x, y, botones.nuevoJuego[2].x, botones.nuevoJuego[2].y, botones.nuevoJuego[2].width, botones.nuevoJuego[2].height)) {
                pausado = false;
                audioJuego.pause();
                seleccionarModo();
            }
            if (mouseDentroArea(x, y, botones.reiniciar[1].x, botones.reiniciar[1].y, botones.reiniciar[1].width, botones.reiniciar[1].height)) {
                pausado = false;
                audioJuego.currentTime = 0;
                iniciarJuego();
            }
            break;
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
        case 1: // Seleccionar modo de juego
            audioMenu.play();
            for (let index = 0; index < botones.modoJuego.length; index++) {
                let distancia = distanciaEntreDosPuntos(x, y, botones.modoJuego[index].x, botones.modoJuego[index].y);
                if (distancia <= botones.modoJuego[index].radio) {
                    dibujarBotonModoJuego(botones.modoJuego[index].x, botones.modoJuego[index].y, modosDeJuegos[index].nombre, "#FBBC05")
                }
                else {
                    dibujarBotonModoJuego(botones.modoJuego[index].x, botones.modoJuego[index].y, modosDeJuegos[index].nombre, "white")
                }
            }
            break;
        case 2: // Seleccionar personaje
            if(jugador2==null){
            for (let index = 0; index < personajes.length; index++) {
                if (mouseDentroArea(x, y, width / personajes.length * index, height / 2 - height / 1.3 / 2 + 50, width / personajes.length + 1, height / 1.3 - 105)) {
                    for (let index2 = 0; index2 < personajes.length; index2++) {
                        if (index2 != index && personajes[index2].jugador == 0) {
                            personajes[index2].jugador = -1;
                        }
                        else if (index2 == index && personajes[index2].jugador == -1) {
                            personajes[index2].jugador = 0;
                        }
                    }
                    dibujarSeleccionPersonaje();
                    let texto;
                    if(jugador1 == null){
                        texto = personajes[index].nombre;
                    }else if(jugador2!=null){
                        texto = jugador1.nombre + " VS " + jugador2.nombre;
                    }else{
                        texto = jugador1.nombre + " VS " + personajes[index].nombre;
                    }
                    ctx.save();
                    ctx.fillStyle = "white";
                    let anchoTexto = ctx.measureText(texto).width;
                    ctx.fillText(texto, width / 2 - anchoTexto / 2, height - 50);
                    ctx.restore();
                    return;
                }
            }
            for (let index2 = 0; index2 < personajes.length; index2++) {
                if (personajes[index2].jugador == 0) {
                    personajes[index2].jugador = -1;
                    dibujarSeleccionPersonaje();
                }

            }}
            break;
        case 3: // Juego
            audioMenu.pause();
            audioJuego.play();
            if (fichaSeleccionada != null && !pausado) {
                fichaSeleccionada.setPos(x, y);
            }
            break;
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
    if (fichaSeleccionada != null && !pausado && pantalla == 3) {
        let x = e.offsetX;
        let y = e.offsetY;
        if (zonaParaSoltarFicha(x, y) && colocarFicha(e)) {
            fichaSeleccionada.setBloqueada(true);
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
    temporizador.dibujar();
    if (pausado) {
        dibujarJuegoPausado();
        dibujarBotonNuevoJuego();
        dibujarBotonReiniciar();
    }
    dibujarBotones();

}

function dibujarJuegoPausado() {
    ctx.save();
    ctx.filter = 'blur(2px)';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FBBC05";
    ctx.filter = 'none';
    let texto = "Juego pausado";
    let anchoTexto = ctx.measureText(texto).width;
    ctx.fillText("Juego pausado", width / 2 - anchoTexto / 2, height / 4)
    ctx.restore();
}