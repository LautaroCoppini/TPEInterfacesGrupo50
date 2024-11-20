"use strict"

let personajes = [
    "img/0.png",
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png",
    "img/9.png",
    "img/10.png"
]

let personajeAnterior = -1;

let personajeActual;

let articulos = document.querySelectorAll('.masamigos article');

function calcularScrollMitad(element) {
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY;
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height-267;
    const scrollPos = elementTop - (windowHeight / 2) + (elementHeight / 2);
    return scrollPos;
}

let personaje = document.getElementById("imagenmasamigos");

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    for (let index = 0; index < articulos.length; index++) {
        if (value >= calcularScrollMitad(articulos[index])) {
            personajeActual=index;
        }
    }
    if (personajeActual >= personajes.length) {
        personajeActual = personajes.length - 1;
    }
    if(personajeActual != personajeAnterior){
        personaje.style.animationName = 'cambioPersonajeSaliente';
        setTimeout(() => {
            personaje.setAttribute('src', personajes[personajeActual])
            personaje.style.animationName = 'cambioPersonajeEntrante';
            personajeAnterior = personajeActual;
    
        }, 200);
    }
})