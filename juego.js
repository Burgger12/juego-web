var disparoEnemigo =[];
var player = {
    x: 325, 
    y: 500
};
var juego= {
    estado: 'iniciando'
};
var enemigos =[];
var teclado ={};
//movimiento 
var flag = false;
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
    if(teclado[38]){
        
         
    }

    if(teclado[32]){
        if(!flag){
            disparo();
            flag = true;
        }
    }
    else{
        flag = false;
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

//dibujos 

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

function dibujarEnemigo(){
    for(var i in enemigos){
        var enemigo = enemigos[i];
        ctx.save();
        if(enemigo.estado == 'vivo'){
            ctx.fillStyle = "red";
        }
        if(enemigo.estado == 'muerto'){
            ctx.fillStyle = "transparent "
        }
        ctx.fillRect(enemigo.x,enemigo.y,enemigo.width,enemigo.height);
    }
    ctx.restore();
}

//movimientos de los elementos 

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
    //crea el disparo 
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
        disparo.y -= 8;
        console.log(disparo.y);
    }
    disparos = disparos.filter(
        function(disparo){
            return disparo.y > 0;
        }
    );
}
//arreglo de disparos del enemigo

function dibujarDisparoEnemigo(){
    for(var i in disparoEnemigo){
        console.log(i);
        var disparo = disparoEnemigo[i];
        ctx.save();
        ctx.fillStyle = "red";
        ctx.fillRect(disparo.x,disparo.y, disparo.width, disparo.height);
        ctx.restore();
    }
}

function moverDisparosEnemigos(){
    for(var i in disparoEnemigo){
        var disparo = disparoEnemigo[i];
        disparo.y += 3;
    }
    disparoEnemigo = disparoEnemigo.filter(function(disparo){
        return disparoEnemigo.y < canvas;
    });
}

function actualizaEnemigo(){
    function agregarDisparosEnemigos(enemigo){
        return {
            x: enemigo.x,
            y: enemigo.y,
            width: 10,
            height:33,
            contador: 0
        };
    }
    if(juego.estado == 'iniciando'){
        for(var i = 0; i < 10;i++){
            enemigos.push({
                x: 10 +(i * 55),
                y: 10,
                width: 35,
                height:30,
                estado:'vivo',
                contador: 0
            });
        }
    }
    juego.estado = 'jugando';
    for(var i in enemigos){
        var enemigo = enemigos[i];
        if(!enemigo) continue;
        if(enemigo && enemigo.estado == 'vivo'){
            enemigo.contador++;
            enemigo.x += Math.sin(  enemigo.contador * Math.PI/80)*5;
            if(enemigo.x >= player.x){
                disparoEnemigo.push(agregarDisparosEnemigos(enemigo));
            }
        }
        if(enemigo && enemigo.estado == 'hit'){
            enemigo.contador++;
            if( enemigo.contador >= 20 ){
                enemigo.estado = 'muerto';
                enemigo.contador = 0;
            }
        }

    }
    enemigos = enemigos.filter( function(enemigo){
        if(event && enemigo.estado == 'vivo') {
            return false;
        }
        return true;
    });
}

function aleatorio(inferior, superior){
    var posi = superior - inferior;
    var a = Math.random() * posi;
    a = Math.floor(a);
    return parseInt(inferior) + a;
}

function hit(a,b){
    var hit = false;

    if(b.x + b.width >= a.x && b.x < a.x + a.width){
        if(b.y + b.height >= a.y  && b.y < a.y + a.height){
            hit = true;
        }
    }
    if(b.x <= a.x && b.x + b.width >= a.x +a.width){
        if(b.y <= a.y && b.y + b.height >= a.y + a.height){
            hit = true;
        }
    }
    if(a.x <= b.x && a.x +a.width >= b.x + b.width){
        if(a.y <= b.y && a.y + a.height >= b.y + b.height){
            hit = true;
        }
    }

    return hit;
}

function verificarContacto(){
    for(var i in disparos){
        var disparo = disparos[i];
        for(var j in enemigos){
            var enemigo = enemigos[j];
            if(hit(disparo,enemigo)){
                enemigo.estado = 'hit';
                enemigo.contador = 0;
            }
        }
    }
}

//bucle principal

var FPS = 50;
setInterval(function(){
    principal();
},1000/FPS);


function principal(){
    moverNave();
    borrarCanvas();
    dibujarDisparoEnemigo();
    dibujarNube();
    actualizaEnemigo();
    dibujarEnemigo();
    movimientoNube();
    dibujarPlayer();
    Moverdisparo();
    dibujarbala();
    verificarContacto();
    moverDisparosEnemigos();
}
agregarEventosTeclado();
