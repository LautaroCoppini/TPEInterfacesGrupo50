"use strict"

let btnMenuHamburguesa = document.getElementById("btn-menuHamburguesa");
let btnMenuUsuario = document.getElementById("btn-menuUsuario");
let btnMenuCarrito = document.getElementById("btn-menuCarrito");

console.log(btnMenuHamburguesa);
console.log(btnMenuUsuario);
console.log(btnMenuCarrito);

btnMenuHamburguesa.addEventListener("click",()=>{
    mostrar("menuHamburguesa");
});
btnMenuUsuario.addEventListener("click",()=>{
    mostrar("menuUsuario");
});
btnMenuCarrito.addEventListener("click",()=>{
    mostrar("menuCarrito");
});

function mostrar(id){
    let menu = document.getElementById(id);
    menu.classList.toggle("menu-oculto");
}
