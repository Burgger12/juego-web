let yN = 0;

//movimiento/ generar nueve
function nube(){
    var maxX = 98;
    var minX = 1;
    x = Math.floor(Math.random() * (maxX - minX  + 1)) + minX;

    document.getElementById("nube").style.left = (x + "%");
};
function movimientoNube(){
    yN++;
    if(yN < 85){
        document.getElementById("nube").style.top = (yN + "%");
    }
    else{
        yN = 0;
        nube()
    }
    return 0;
}
setInterval('movimientoNube()',50);