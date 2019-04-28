var player = {
    x: 325, 
    y: 500
};
//movimiento 
var teclado ={};

function agregarEventosTeclado(){
    agregarEvento(document,"keydown",function(e){
        teclado[e.keyCode] = true;
    });
    agregarEvento(document,"keyup",function(e){
        teclado[e.keyCode] = false;
    });
    function agregarEvento(elemento, nombreEvent, funcion){
        if(elemento.addEventListener){
            elemento.addEventListener(nombreEvent,funcion,false);
        }
        else if(elemento.attachEvent){
            elemento.attachEvent(nombreEvent,funcion);
        }
    }
}

function moverNave(){
    if(teclado[37]){
        player.x -= 10;
        if(player.x < -100){
            player.x = ancho + 100
        } 
    }
    if(teclado[39]){
        player.x += 10;
        if(player.x > ancho + 50){
            player.x = -10
        } 
    }

    if(teclado[32]){
        disparo(); 
    }
}

var canvas, ctx;

var imgPlayer, imgNube, imgEnemigo,imgBala;
function cargarImagenes(){
    imgPlayer = new Image();
    imgNube = new Image();
    imgBala = new Image();

    imgPlayer.src = 'img/AvionEnemigo.png';
    imgNube.src = 'img/nube.png';
    imgBala.src = 'img/bala.png';

}

function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    cargarImagenes();
}

var alto = 657;
var ancho = 800;

function borrarCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}
function dibujarPlayer(){
    ctx.drawImage(imgPlayer,0,0,1234,1074,player.x,player.y,150,150);
}

var nube = {
    y: -50,
    x:0
};
var disparos = [];

function  dibujarbala(){
    ctx.fillStyle = "white";
    for(var i in disparos){
        var disparo = disparos[i];
        ctx.fillRect(disparo.x,disparo.y, disparo.width, disparo.height);
    }
}
function  dibujarNube(){
    ctx.drawImage(imgNube,10,0,640,640,nube.x,nube.y,250,250);
}

function movimientoNube(){
    if(nube.y > alto ){
        nube.y = -100;
        nube.x = Math.floor(Math.random() * (ancho - 20) + 1);
    }
    else{
        nube.y += 4;
    }
}

function disparo(){
    disparos.push({
        x: player.x + 10,
        y: player.y -10,
        width: 10,
        height: 20
    });
}

function Moverdisparo(){
    for(var i in disparos){
        var disparo = disparos[i];
        disparo.y -= 2;
    }
    disparos = disparos.filter(
        function(disparo){
            return disparo.y > 0;
        }
    );
}
//bucle principal

var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);


function principal(){
    moverNave();
    borrarCanvas();
    dibujarNube();
    movimientoNube();
    dibujarPlayer();
    Moverdisparo();
    dibujarbala();
}
agregarEventosTeclado();
