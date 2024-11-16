'use strict';
document.addEventListener("DOMContentLoaded", () => {
    let personajes = document.querySelectorAll(".personajeCarga");
    let progreso = document.getElementById("progreso");
    console.log(personajes)
    let progress = 0;
            const progressText = document.getElementById("porcentajedeprogreso");
            const body = document.body;
            body.style.overflow = 'hidden';
            let personajeActual = 0;
            const interval = setInterval(() => {
                progress++;
                //progreso.style.width = progress + "%";
                personajeActual = Math.floor(progress/10);
                if(personajeActual > 0){
                    personajes[personajeActual-1].style.display = "none";
                }
                if(personajeActual<10){
                    personajes[personajeActual].style.display = "block";
                }else{
                    personajes[10].style.display = "block";
                }
                progressText.textContent = progress + "%";
                if (progress >=100) {
                    clearInterval(interval);
                    setTimeout(cargaCompletada,200);
                }
            }, 50);
    
    function cargaCompletada(){
        document.getElementById("pantalladecarga").style.display = "none";
        body.style.overflow = 'auto';
    }
});