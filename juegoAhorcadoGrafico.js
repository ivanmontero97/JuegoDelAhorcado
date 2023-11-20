//Inicializacion variables
let wonGame = parseInt(localStorage.getItem("wonGame")) || 0;
let loseGame = parseInt(localStorage.getItem("loseGame")) || 0;
let totalGames = parseInt(localStorage.getItem("totalGames")) || 0 ;
let errorCounter = -1;
let inputWord ="";
let inputWordCode ="";
let lletresUtilitzades =[];
let ventanaEstadisticas ="";


//Función que inicializa el juego . Y establece el valor de las variables globales , en 0 o cadena vacia.
function iniciarPartida(){
    //Reestablecemos los parametros (en caso de ya haber jugado anteriormente)
     document.getElementById("imatgePenjat").src ="";
     document.getElementById("jocPenjat").textContent = "" ;
     document.getElementById("lletresUtilitzades").innerHTML ="";
     inputWord ="";
     inputWordCode ="";
     errorCounter = -1;
     lletresUtilitzades =[];
    // //Hacemos que el usuario escriba la letra a adivinar.
    var vocals = /[a-z]/i;

    do{
    inputWord = prompt("Introduce una palabra : ").split("");
    } while( !vocals.test(inputWord))

    
    //Cifrar input de palabra   
    for( let i =0 ; i < inputWord.length; i++ ){ 
        inputWordCode += "_";
     }
     inputWordCode = inputWordCode.split("");
     //Pintamos en la pantalla la palabra codificada.
     document.getElementById("jocPenjat").textContent = inputWordCode.join(' ');
     showAlphabet(); //Llamamos a la función para crear las letras.
}

//Creamos los botones de la a-z y les añadimos un id y una función onclick asociada a cada boton.
function showAlphabet() {
    // Creamos un string con los botones del abecedario
    let alphabet = "";
    //asignamos un id a cada letra para posteriormente poder ver cual hemos pulsado.
    for (let letter of "abcdefghijklmnopqrstuvwxyz") {
      alphabet += `<button id=${letter} onclick="clickLetter('${letter}')">${letter}</button>`;
    }
    // Añade el string al div alfabeto
    document.getElementById("abecedari").innerHTML = alphabet;
  }

//Desencadena todas las funciones del programa y deshabilita el boton que se acaba de usar.
function clickLetter(letter){
    
    // Bloquea el botón
    let element = document.getElementById(letter);
    element.disabled = true;
    usedLetter(letter);
    //Comprobamos si la letra introducida se encuentra en la palabra.
    checkCharacter(inputWord, letter);
    checkGame(errorCounter);
}

/*Comprueba si la letra pulsada esta incluida en la palabra buscada.
 Si la encuentra, sustituye la letra en la palabra codificada  y la devuelve por pantalla.La función devuelve true.
 Si no la encuentra , comprueba el estado de la partida según el número de errores y devuelve false */
function checkCharacter(inputWord , letter){
    if(inputWord.includes(letter)){
        for( let x = 0 ; x < inputWord.length ; x++)
        {
            if(letter == inputWord[x])
            {
            inputWordCode[x] = inputWord[x];
            }
        } 
        alert( "¡Enhorabuena has acertado una letra !");      
        document.getElementById("jocPenjat").innerHTML = inputWordCode.join(' ');
    } else {
    errorCounter++; 
    alert("Vaya, has fallado la letra...");
        if( errorCounter == 6){
            document.getElementById("imatgePenjat").src = "images/penjat_" + errorCounter +".png"; 
        }
    }
}

//Esta función comprueba el estado del juego en función del número de errores. Devuelve true , si el juego se ha ganado. Y false si se ha fallado el intento , o si se ha perdido.
function checkGame(errorCounter){
    
    document.getElementById("imatgePenjat").src = "images/penjat_" + errorCounter +".png"; 

    if( errorCounter == 6){
        alert("Has perdido");
        localStorage.setItem("loseGame", loseGame++);
        blockAllButtons();
        
    } else if ( errorCounter < 6 && (""+inputWord) == (""+inputWordCode)){            
        document.getElementById("jocPenjat").innerHTML = inputWordCode.join(' ');
        alert("Enhorabuena has ganado , la palabra era " + inputWord.join(' '));
        localStorage.setItem("wonGame", wonGame++);
        const botones = document.querySelectorAll("div#abecedari button");
        blockAllButtons();
    }
}

//Función para bloquear todos los botones de la interfaz y que no surjan excepciones tras terminar o ganar una partida.
function blockAllButtons(){
    const botones = document.querySelectorAll("div#abecedari button");
    botones.forEach((boton) => {
      boton.disabled = true;
    });
}
    //Funcion que añade a un array las letras utilizadas y las pinta por pantalla
function  usedLetter(letter){
        lletresUtilitzades.push(letter);
        document.getElementById("lletresUtilitzades").innerHTML = "Las letras que has utilizado son : " + lletresUtilitzades;

}

//Función que se encarga de recoger las estadisticas de las partidas jugadas
function estadisticas(){

    totalGames = wonGame + loseGame;
    
    if(totalGames == 0 || totalGames == null) {
      return  alert(" No hay partidas suficientes para tener un registro de estadísticas ");
    } else {
        ventanaEstadisticas = window.open("","blank");        
        let estadisticas = " Partidas totales : " + (loseGame + wonGame) + " \nPartidas ganadas : " + wonGame + " , con un " + (wonGame/totalGames)*100 + "% de victorias"
        + " \nPartidas perdidas : " + loseGame + " , con un " +  (loseGame/totalGames)*100 + "% de perdidas"
        ventanaEstadisticas.document.body.innerHTML = estadisticas;
    }
}

//Funcion que se encarga de borrar los datos de juego
function eliminarDatosEstadisticas(){
    alert("Eliminadas las estadísticas del juego");
    localStorage.clear();
    totalGames = 0;
    wonGame =0 ;
    loseGame =0;
}