'use strict';

let progress = 0;
        const progressText = document.getElementById("porcentajedeprogreso");
        const body = document.body;

        // Desactiva el scroll
        body.style.overflow = 'hidden';
        
        const interval = setInterval(() => {
            progress += 1;
            progressText.textContent = progress + "%";

            if (progress >=100) {
                clearInterval(interval);
                setTimeout(cargaCompletada,1000);
                
            }
        }, 50);

function cargaCompletada(){
                document.getElementById("pantalladecarga").style.display = "none";
                // Activa el scroll nuevamente
                body.style.overflow = 'auto';
}