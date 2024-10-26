class Temporizador{
    constructor(tiempo, ctx, imagen){
        this.tiempo = tiempo;
        this.ctx = ctx;
        this.pausado = true;
        this.imagen = imagen;
    }

    dibujar(){
        this.ctx.save();
        document.fonts.load('10pt "Concert One"').then(() => {
            this.ctx.font = '35px "Concert One"';
            this.ctx.fillStyle = "#FBBC05";
            this.ctx.fillRect(width / 2 - 70, height - 60, 140, 50);
            this.ctx.fillStyle = 'black';
            this.ctx.beginPath()
            this.ctx.rect(width / 2 - 70, height - 60, 140, 50)
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.fillText(this.tiempo, width / 2 - 25, height - 25);
        });
    }

    iniciar(){
        this.pausado=false;
        this.decrementarTiempo();
    }

    pausar(){
        this.pausado=true;
    }

    decrementarTiempo(){
        if(this.tiempo==0){
            this.empate();
        }else
        if(!this.pausado){
            this.tiempo--;
            this.dibujar();
            setTimeout(() => {
                this.decrementarTiempo();
            }, 1000);
            }
    }

    empate(){
    ctx.save();
    ctx.drawImage(this.imagen, 0, 0, width, height);
    document.fonts.load('10pt "Concert One"').then(() => {
        ctx.font = '35px "Concert One"';
        ctx.fillText('Empate', width / 2 - 90, height / 2 - 140);
        ctx.restore();
        this.pausar();
        });

    }
}