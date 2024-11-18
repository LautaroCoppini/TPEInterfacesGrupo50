"use strict"

document.addEventListener("mousemove", parallax);

let imagen = document.querySelector(".parallaxMouse");

function parallax(e) {
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;

    let _depth1 = `${-100 - (_mouseX - _w) * 0.01}px ${0 - (_mouseY - _h) * 0.01}px`;

    imagen.style.translate = _depth1;
}
