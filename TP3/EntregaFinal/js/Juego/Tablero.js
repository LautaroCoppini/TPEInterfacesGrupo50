class Tablero{
    constructor(col,fil,ctx,imagen){
        this.col = col;
        this.fil = fil;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = ctx;
        this.imagen = imagen
        this.matriz = [[]];
        for (let fila = 0; fila < this.fil; fila++) {
            for (let columna = 0; columna < this.col; columna++) {
                this.matriz[[fila, columna]] = null;
            }
        }
    }
    dibujar(){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(width/2-58*(this.col/2),height/2-58*(this.fil/2), this.col*58, this.fil * 58);
        this.ctx.strokeStyle = "#013636";
        this.ctx.lineWidth = 7;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        for (let fila = 0; fila < this.fil; fila++) {
            for (let columna = 0; columna < this.col; columna++) {
                this.ctx.beginPath();
                this.ctx.drawImage(this.imagen,width/2-58*(this.col/2)+columna*58,height/2-58*(this.fil/2)+fila*58, 58, 58);
                this.ctx.closePath();
            }
        }
    }
    insertarFicha(columna, ficha){
        for (let fila = this.fil-1; fila >= 0; fila--) {
            if(this.matriz[[fila, columna]] == null){
                this.matriz[[fila, columna]] = ficha;
                ficha.setPos((width/2-58*(this.col/2)+columna*58)+29,(height/2-58*(this.fil/2)+fila*58)+29);
                ficha.dibujar();
                break;
            }
        }
    }
}