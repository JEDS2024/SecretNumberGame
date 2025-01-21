// Declaración de variables globales
let numeroSecreto = 0;
let intentos = 0;
let maxIntentos = 5;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

// Función para asignar texto a un elemento HTML específico
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

// Función para verificar el intento del usuario
function verificarIntento() {
  let numeroUsuario = parseInt(document.getElementById("valorDeUsuario").value);

  // Si el número ingresado por el usuario coincide con el número secreto
  if (numeroUsuario === numeroSecreto) {
    asignarTextoElemento(
      "p",
      `¡Felicidades! Has acertado el número secreto en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }`
    );
    document.getElementById("reiniciar").removeAttribute("disabled");

    // Verificar si se han adivinado todos los números disponibles
    if (listaNumerosSorteados.length === numeroMaximo) {
      asignarTextoElemento(
        "p",
        "¡Felicidades! Has acertado todos los números. No hay más números disponibles."
      );
      document.getElementById("reiniciar").setAttribute("disabled", true);
    }
  }
  // Si el usuario ha alcanzado el número máximo de intentos
  else if (intentos >= maxIntentos) {
    asignarTextoElemento(
      "p",
      `¡Lo siento! Has superado el número de intentos permitidos. El número secreto era ${numeroSecreto}`
    );
  }
  // Si el número ingresado no coincide con el número secreto y aún hay intentos disponibles
  else {
    intentos++;
    if (numeroUsuario > numeroSecreto) {
      asignarTextoElemento(
        "p",
        `El número secreto es menor, intento ${intentos} de ${maxIntentos}`
      );
    } else {
      asignarTextoElemento(
        "p",
        `El número secreto es mayor, intento ${intentos} de ${maxIntentos}`
      );
    }
    limpiarCaja(); // Limpiar la caja de entrada
  }
  return;
}

// Función para limpiar la caja de entrada del usuario
function limpiarCaja() {
  document.querySelector("#valorDeUsuario").value = "";
}

// Función para generar un número aleatorio entre 1 y el número máximo definido
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  console.log(numeroGenerado);
  console.log(listaNumerosSorteados);

  // Verificar si ya se han sorteado todos los números disponibles
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "No hay más números disponibles.");
  } else {
    // Verificar si el número generado ya ha sido sorteado anteriormente
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

// Función para inicializar los parámetros del juego
function parametrosIniciales() {
  intentos = 1;
  numeroSecreto = generarNumeroSecreto();
  console.log(numeroSecreto);
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento(
    "p",
    `Indica un número del 1 al ${numeroMaximo}, tienes ${maxIntentos} intentos`
  );
}

// Función para reiniciar el juego
function reiniciarJuego() {
  limpiarCaja();
  parametrosIniciales();
  document.querySelector("#reiniciar").setAttribute("disabled", true);
}

// Llamada inicial para establecer los parámetros del juego
parametrosIniciales();
