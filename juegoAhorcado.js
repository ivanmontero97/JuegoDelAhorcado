let wonGame = localStorage.getItem("wonGame") ?? 0 ;
let loseGame = localStorage.getItem("loseGame") ?? 0 ;
let totalGames = localStorage.getItem("totalGames") ?? 0 ;
function inicioPrograma(){
    let input;

    do{
    input = parseInt(prompt("Escoge una de las opciones : "));

    if(input != 1 && input!=2 && input != 3){
       console.log( "Por favor selecciona una opción correcta");
    }
    } while (input != 1 && input!=2 && input!=3)
    
    switch(input)
    {
        case 1 :
        juegoAhorcado();
        break;
        case 2:
        estadísticas(wonGame,loseGame);
        break;
        case 3:
        exitGame(); 
        wonGame =0;
        loseGame =0;
        totalGames =0;  
        break;
  
    }
}


function juegoAhorcado(){
    //Input de la palabra y solución del juego
    let inputWord = prompt("Introduce una palabra : ").split("");

    //Cifrar input de palabra
    let inputWordCode ="" ;
    
    for( let i =0 ; i < inputWord.length; i++ ){ 
        inputWordCode += "_";
     }
     inputWordCode = inputWordCode.split("");
     console.log("A continuación deberás adivinar la palabra introduciendo carácteres. Recuerda que tienes hasta 6 fallos")
    
    //Input del carácter
    let character ;
    let adivinarPalabra = false;
    let errorCounter = 0;
   do
    {
        character = checkFormatCharacter();
            for( let x = 0 ; x < inputWord.length ; x++)
            {
                if(character == inputWord[x])
                {
                    inputWordCode[x] = inputWord[x];
                }
            }
        if (!checkSuccesCharacter(inputWord,character)){
            errorCounter++; 
        }        
        adivinarPalabra = checkGame(errorCounter,inputWord , inputWordCode);
    } while (errorCounter < 6 && adivinarPalabra == false)
    inicioPrograma();
}


//Comprueba si el caracter introducido se encuentra en la palabra a adivinar (inputWord)
//Devuelve true , si el caracter se encuentra en la palabra codificada (inputWordCode)
function checkSuccesCharacter(inputWord , character){
    if(inputWord.includes(character)){
        alert(" ¡ La letra introducida es correcta !")
        return true; 
    } 
    alert("La letra introducida es incorrecta , se contabiliza un fallo");
    return false;
}

//Comprueba el estado del juego en función del número de errores.
function checkGame(errorCounter ,inputWord, inputWordCode){
    if( errorCounter == 6){
    alert("Has perdido");
    localStorage.setItem("loseGame", loseGame++);
    return false;
    } else if ( errorCounter < 6 && (""+inputWord) == (""+inputWordCode)){            
    adivinarPalabra = true;
    alert("Enhorabuena has ganado , la palabra era " + inputWord.join(''));
    localStorage.setItem("wonGame", wonGame++);
    return true;
    }
    return false;
}

/* Provoca que el usuario solo pueda introducir un caracter en el formato esperado. El formato esperado esta entre a-z  y es Keysensitive . Solo acepta carácteres individuales
Devuelve el carácter en el formato indicado.*/
function checkFormatCharacter() {
let inputCharacter="";
var vocals = /[a-z]/i; //la i es insensitive
do {
    inputCharacter = prompt("Introduce un carácter :");
    if(!vocals.test(inputCharacter) && inputCharacter.length != 1) {
        alert("Has introducido un carácter inválido , vuelve a intentarlo") } 
} while(!vocals.test(inputCharacter) && inputCharacter.length != 1)
return inputCharacter;  
}


function estadísticas(wonGame,loseGame){
   
    totalGames = parseInt((wonGame + loseGame));

    if(totalGames == 0 || totalGames == null){
      return  alert(" No hay partidas suficientes para tener un registro de estadísticas ");
    } 
    
    return alert( " Partidas totales : " + totalGames + " \n Partidas ganadas : " + wonGame + " , con un " + (wonGame/totalGames)*100 + "% de victorias"
   + " \n Partidas perdidas : " + loseGame + " , con un " +  (loseGame/totalGames)*100 + "% de perdidas"  );
   
}

function exitGame(){
    alert("Has salido  del juego");
}