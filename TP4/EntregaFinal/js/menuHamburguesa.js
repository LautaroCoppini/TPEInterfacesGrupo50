"use strict"

let menuHamburguesaBtn = document.getElementById("menuHamburguesa");

menuHamburguesaBtn.addEventListener("click", ()=>{
    if(menuHamburguesaBtn.classList.contains("mostrar")){
        menuHamburguesaBtn.classList.remove("mostrar");
        menuHamburguesaBtn.classList.add("ocultar");
    }else{
        menuHamburguesaBtn.classList.remove("ocultar");
        menuHamburguesaBtn.classList.add("mostrar");
    }
})
