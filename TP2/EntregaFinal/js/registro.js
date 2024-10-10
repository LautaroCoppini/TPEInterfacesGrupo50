"use strict"

let btn = document.getElementById("btn-registrarse");
btn.addEventListener("click", (e)=>{
    e.preventDefault();
    redireccionar;
})

function redireccionar() {
        window.location.href = "index.html";
}