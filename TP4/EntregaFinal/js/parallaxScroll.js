"use strict"
document.addEventListener("DOMContentLoaded", () => {
    let sombrapersonaje1 = document.querySelector('.sombrapersonaje1');
    let sombrapersonaje2 = document.querySelector('.sombrapersonaje2');
    let sombrapersonaje3 = document.querySelector('.sombrapersonaje3');
    let logohero = document.querySelector('.logohero');
    let arbol1 = document.querySelector('.arbol1');
    let piedra2 = document.querySelector('.piedra2');
    let arbusto4 = document.querySelector('.arbusto4');
    let planta3 = document.querySelector('.planta3');
    let personaje1 = document.querySelector('.personaje1');
    let personaje2 = document.querySelector('.personaje2');
    let personaje3 = document.querySelector('.personaje3');
    let planta1 = document.querySelector('.planta1');
    let piedra3 = document.querySelector('.piedra3');
    let piedra4 = document.querySelector('.piedra4');
    let piedra1 = document.querySelector('.piedra1');
    let arbol2 = document.querySelector('.arbol2');
    let planta2 = document.querySelector('.planta2');
    let arbol3 = document.querySelector('.arbol3');
    let nav = document.querySelector('nav');
    let logonav = document.querySelector('#logonav');
    window.addEventListener('scroll', () => {
        let value = window.scrollY;
        moverLogoYNav(value);
        personaje2.style.translate = value * 0 + "px " + value * 0.10 + 'px';
        planta1.style.translate = value * 0.005 + "px " + value * 0.005 + 'px';
        arbol3.style.translate = value * 0.01 + "px " + value * 0.01 + 'px';
        personaje3.style.translate = value * 0 + "px " + value * -0.15 + 'px';
        planta2.style.translate = value * 0.02 + "px " + value * 0.02 + 'px';
        arbol2.style.translate = value * 0.03 + "px " + value * 0.03 + 'px';
        piedra3.style.translate = value * 0.04 + "px " + value * 0.04 + 'px';
        personaje1.style.translate = value * 0 + "px " + value * -0.15 + 'px';
        piedra1.style.translate = value * 0.055 + "px " + value * 0.055 + 'px';
        piedra4.style.translate = value * 0.05 + "px " + value * 0.05 + 'px';
        arbusto4.style.translate = value * -0.05 + "px " + value * 0.05 + 'px';
        arbol1.style.translate = value * -0.06 + "px " + value * 0.06 + 'px';
        piedra2.style.translate = value * -0.07 + "px " + value * 0.07 + 'px';
        planta3.style.translate = value * -0.1 + "px " + value * 0.1 + 'px';
    })
    function moverLogoYNav(value){  
        logohero.style.translate = "0 " + value * 0.807 + 'px';
        logohero.style.scale = 1 - value/1200;
        if(value == 0){
            logonav.style.display = "none";
            nav.classList.remove('sticky');
        }else{
            if(value >= 867){
                logohero.style.scale = 0;
                logonav.style.display = "block";
            }else{
                logonav.style.display = "none";
            }
            nav.classList.add('sticky');
        }
    }
});
