// inicializacion de variabless
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let Hits=0;
let temporizador = false;
let tiempo = 30;
let tiempoRegresivoid = null;
let clickaudio = new Audio('./sounds/click.wav');
let failaudio = new Audio('./sounds/fail.wav');
let incorrectoaudio = new Audio('./sounds/incorrecto.wav');
let winaudio = new Audio('./sounds/wind.wav');
//apuntando a documento html

let mostarmovimientos = document.getElementById('movimientos');
let mostrarHits = document.getElementById('Hits');
let mostrarTiempo = document.getElementById('Time');
// generador de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

function contarTiempo(){
    tiempoRegresivoid = setInterval(()=>{
        tiempo--;
       mostrarTiempo.innerHTML = `time: ${tiempo} s`;
        if(tiempo == 0){
            clearInterval(tiempoRegresivoid);
            bloqueartarjetas();
            failaudio.play();
        }
    },1200)
}

function bloqueartarjetas(){
   for (let i = 0; i<=15; i++){
    let tarjetabloqueada = document.getElementById(i);
    tarjetabloqueada.innerHTML = numeros[i];
    tarjetabloqueada.disabled = true;
   } 
}


// funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

tarjetasDestapadas++;
console.log(tarjetasDestapadas);

if (tarjetasDestapadas == 1){
tarjeta1 = document.getElementById(id);
primerResultado = numeros[id];
tarjeta1.innerHTML = primerResultado;
clickaudio.play();

tarjeta1.disabled = true;
}else if(tarjetasDestapadas == 2){
    tarjeta2  = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = segundoResultado;
    clickaudio.play();
    tarjeta2.disabled = true;

    movimientos++;
    mostarmovimientos.innerHTML = `movimientos: ${movimientos}`;

    if(primerResultado == segundoResultado){
        tarjetasDestapadas = 0;
        
        Hits++;       
        mostrarHits.innerHTML = `Hits: ${Hits}`;

        if(Hits==8){
            winaudio.play();
            clearInterval(tiempoRegresivoid);
            mostrarHits.innerHTML = `Hits: ${Hits} 😱`;
            mostarmovimientos.innerHTML = `movimientos: ${movimientos} 😎`;
            
        }

    }else{
        incorrectoaudio.play(); 
        setTimeout(()=>[
            tarjeta1.innerHTML = '',
            tarjeta2.innerHTML = '',
            tarjeta1.disabled = false,
            tarjeta2.disabled = false,
            tarjetasDestapadas = 0
        ],800);
       
    }

}
}