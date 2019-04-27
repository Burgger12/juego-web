let yN = 0;

//movimiento/ generar nueve
function nube(y){
    var maxX = 100;
    var minX = 1;
    x = Math.floor(Math.random() * (maxX - minX  + 1)) + minX;
    document.getElementById("nube").style.marginTop = (y + "%");
    document.getElementById("nube").style.marginLeft = (x + "%");
};
function movimientoNube(){
    yN++;
    nube(yN);
    
}
setInterval('movimientoNube()',1000);