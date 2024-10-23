class Ficha{
    constructor(posX,posY,radio,fondo,ctx){
        this.posX = posX;
        this.posY = posY;
        this.fondo = fondo;
        this.radio = radio;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
    }

    dibujar() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.drawImage(this.fondo, this.posX - this.radio, this.posY - this.radio, this.radio * 2, this.radio * 2);
        this.ctx.restore();
    }

    setPos(x,y){
        this.posX = x;
        this.posY = y;
    }

}