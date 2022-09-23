let backtrakingEnUso = false
let matrizBacktraking = []
let dimensionesMatriz = 0
let matrizOptenidas = []

/**
 * Función que permite cambiar el color del botón del algoritmo seleccionado
 *
 * @param {boolean} backtraking | true si se selecciona backtraking, false si se selecciona A estrella
 */
function cambioAlgoritmo(backtraking) {
  let btn_estrella = document.getElementById("btn_estrella");
  let btn_backtracking = document.getElementById("btn_backtracking");

  if (backtraking) {
    btn_estrella.classList.remove("algoritmoActual");
    btn_backtracking.classList.add("algoritmoActual");
    backtrakingEnUso = true;
  }
  else {
    btn_backtracking.classList.remove("algoritmoActual");
    btn_estrella.classList.add("algoritmoActual");
    backtrakingEnUso = false;
  }
}

/**
 * Función que permite cambiar las dimensiones del tablero.
 */
function cambiarDimensionesTablero() {
  let dimensiones = document.getElementById("quantity").value;

  let radios = document.getElementsByName("tipo-tablero");
  let selected = Array.from(radios).find(radio => radio.checked);
  if (selected == null) {
    alert("Debe seleccionar automatico o manual");
    return; 
  }
  console.log(selected.value);

  if (selected) {
    if (selected.value == "manual") {
      selected = false
    }
    else {
      selected = true
    }
    if (dimensiones >= 2 && dimensiones <= 5) {
      dimensiones = parseInt(dimensiones);
      crearTablero(dimensiones, selected);
    }
    else {
      alert("Las dimensiones del tablero deben estar entre 2 y 5");
    }
  }
}

/**
 * Función que permite crear el tablero mxm. Donde m = dimensiones y pertence a {2, 3, 4, 5}
 * @param {int} dimensiones 
 */
function crearTablero(dimensiones, automatico) {
  matrizBacktraking = [];
  console.log(matrizBacktraking);
  dimensionesMatriz = dimensiones
  let tablero_container = document.getElementById("puzzle");
  let tableroHTML = "";
  let numeros = [];

  document.getElementById("board-container").remove()

  for (let i = 0; i < dimensiones; i++) {
    vector = []
    tableroHTML += "<div class='filaTablero'>";
    for (let j = 0; j < dimensiones; j++) {
      let numero = 0;
      if (automatico) {
        numero = obtenerRandom(dimensiones, numeros)
      }
      else {
        valido = false;
        while (!valido) {
          numero = parseInt(prompt("Ingrese un número entre 0 y " + ((dimensiones * dimensiones) -1)));
          if (numero >= 0 && numero <= (dimensiones * dimensiones) -1 && !numeros.includes(numero)) {
            valido = true;
          }
          if (numero == -1) {
            return
          }
          else {
            alert("El número ingresado no es válido. numeros ingresados: " + numeros);
          }
        }
      }
      numeros.push(numero);
      vector.push(numero)
      if (numero != 0) {
        let letra = `<p class="letraTablero">` + numero + `</p>`
        tableroHTML += `<div id="cuadro_` + i + `_` + j + `" class="cuadroTablero">` + letra + `</div>`;
      }
      else {
        let letra = `<p class="letraTablero"></p>`
        tableroHTML += `<div id="cuadro_` + i + `_` + j + `" class="cuadroTablero">` + letra + `</div>`;
      }
    }
    matrizBacktraking.push(vector)  
    tableroHTML += "</div>";
  }

  const modalContentEl = createCustomElement(
    "div",
    {
      id: "board-container",
      class: "board-container",
    },
    [tableroHTML]
  )

  document.body.appendChild(modalContentEl);
  tablero_container.appendChild(modalContentEl);

}
function mostrarMatriz(matriz) {
  let tablero_container = document.getElementById("puzzle");
  let tableroHTML = "";
  document.getElementById("board-container").remove()
  for (let i = 0; i < matriz.length; i++) {
    tableroHTML += "<div class='filaTablero'>";
    for (let j = 0; j < matriz.length; j++) {
      if (matriz[i][j] != 0) {
        let letra = `<p class="letraTablero">` + matriz[i][j] + `</p>`
        tableroHTML += `<div id="cuadro_` + i + `_` + j + `" class="cuadroTablero">` + letra + `</div>`;
      }
      else {
        let letra = `<p class="letraTablero"></p>`
        tableroHTML += `<div id="cuadro_` + i + `_` + j + `" class="cuadroTablero">` + letra + `</div>`;
      }
    }
    tableroHTML += "</div>";
  }
  const modalContentEl = createCustomElement(
    "div",
    {
      id: "board-container",
      class: "board-container",
    },
    [tableroHTML]
  )
  document.body.appendChild(modalContentEl);
  tablero_container.appendChild(modalContentEl);
} 
/**
 * Función que permite obtener un número random entre 1 y maximo, que no se encuentre en el arreglo numeros
 *
 * @param {int} dimensiones | número máximo que puede tomar el número random
 * @param {list} listaNumeros | lista de números que no pueden ser tomados por el número random
 * @return {int} 
 */
function obtenerRandom(dimensiones, listaNumeros) {
  let numero = Math.floor(Math.random() * (dimensiones * dimensiones));
  if (listaNumeros.includes(numero)){ //|| listaNumeros.includes("")) {
    return obtenerRandom(dimensiones, listaNumeros);
  }
  else {
    // if (numero == 0) {
    //   return "";
    // }
    return numero;
  }
}
/**
 *Funcion que ejecuta el algoritmo seleccionado
 *
 */
function run() {
  console.log(matrizBacktraking);
  if (matrizBacktraking == null) {
    alert("Debe seleccionar un algoritmo y crear el tablero");
    return
  }
  else if (matrizBacktraking.length == 0) {
    alert("Debe crear el tablero");
    return
  }
  else {
    if (backtrakingEnUso) {
      backtraking()
    }
    else {
      //aEstrella()
    }
  }
}

/**
 * Funcion que permite ejecutar el algoritmo backtraking
 *
 */
function backtraking() {
  console.log(dimensionesMatriz);
  let listaPasos = [];
  let solucionEsperado = crearSolucionEsperada(dimensionesMatriz);
  console.log(solucionEsperado);
  let solucion = backtrakingRecursivo(matrizBacktraking, listaPasos, solucionEsperado);
  //console.log(solucion);) {
  console.log("Solucion encontrada");
    //console.log(listaPasos);
    //mostrarPasos(listaPasos);
}

function backtrakingRecursivo(matriz, listaPasos, solucionEsperado) {
  console.log(matriz);
  //console.log(solucionEsperado);
  if (validarSolucion(matriz, solucionEsperado)) {
    console.log("Solucion encontrada");
    return listaPasos;
  }
  else {
    let posicionVacia = obtenerPosicionVacia(matriz);
    let posicionesPosibles = obtenerPosicionesPosibles(posicionVacia, matriz);
    console.log("Posibles posiciones"+posicionesPosibles);
    for (let i = 0; i < posicionesPosibles.length; i++) {
      let matrizAux = matriz;
      matrizAux[posicionVacia[0]][posicionVacia[1]] = matriz[posicionesPosibles[i][0]][posicionesPosibles[i][1]];
      matrizAux[posicionesPosibles[i][0]][posicionesPosibles[i][1]] = 0;
      listaPasos.push(matrizAux);
      console.log("paso: " + i + " , " + matrizAux);
      setTimeout(mostrarMatriz(matrizAux),500 );
      if (listaPasos.includes(matrizAux)) {
        console.log("Matriz ya obtenida");
      }
      else{
        backtrakingRecursivo(matrizAux, listaPasos, solucionEsperado);
      }
    }
  }
}

function validarSolucion(matriz, solucionEsperado) {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz.length; j++) {
      if (matriz[i][j] != solucionEsperado[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function obtenerPosicionVacia(matriz) {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz.length; j++) {
      if (matriz[i][j] == 0) {
        return [i, j];
      }
    }
  }
}

function obtenerPosicionesPosibles(posicionVacia, matriz) {
  let posicionesPosibles = [];
  if (posicionVacia[0] - 1 >= 0) { //arriba
    posicionesPosibles.push([posicionVacia[0] - 1, posicionVacia[1]]);
  }
  else if (posicionVacia[0] + 1 < matriz.length) { //abajo
    posicionesPosibles.push([posicionVacia[0] + 1, posicionVacia[1]]);
  }
  else if (posicionVacia[1] - 1 >= 0) { //izquierda
    posicionesPosibles.push([posicionVacia[0], posicionVacia[1] - 1]);
  }
  else if (posicionVacia[1] + 1 < matriz.length) { //derecha
    posicionesPosibles.push([posicionVacia[0], posicionVacia[1] + 1]);
  }
  return posicionesPosibles;
}

function crearSolucionEsperada(dimensiones) {
  let matriz = [];
  for (let i = 0; i < dimensiones; i++) {
    let vector = [];
    for (let j = 0; j < dimensiones; j++) {
      vector.push(i * dimensiones + j + 1);
    }
    matriz.push(vector);
  } 
  matriz[dimensiones - 1][dimensiones - 1] = 0;
  return matriz;
}

