let backtrakingEnUso = false
let matrizBacktraking = []
let dimensionesMatriz = 0

let matricesOperadas = []
let solucionEsperada = []
let matrizOperando = []
let contador = 0
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
  dimensionesMatriz = dimensiones
  let tablero_container = document.getElementById("puzzle");
  let tableroHTML = "";
  let numeros = [];

  if (document.getElementById("board-container") != null) {
    document.getElementById("board-container").remove()
  }

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
          option = prompt("Ingrese un número entre 0 y " + ((dimensiones * dimensiones) - 1));
          numero = parseInt(option);
          // console.log( 0 <= numero && numero <= ((dimensiones * dimensiones) - 1))
          // console.log()
          if (numero >= 0 && numero <= (dimensiones * dimensiones) - 1 && !numeros.includes(numero)) {
            valido = true;
            break
          }
          if (numero == -1) {
            return
          }if (option == null) {
            return
          }
          else {
            option = alert("El número ingresado no es válido. numeros ingresados: " + numeros);
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
  if (listaNumeros.includes(numero)) { //|| listaNumeros.includes("")) {
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
 */
function run() {
  contador = 0;
  matricesOperadas = JSON.parse(JSON.stringify([]))
  if (matrizBacktraking == null) {
    alert("Debe seleccionar un algoritmo y crear el tablero");
    return
  }
  else if (matrizBacktraking.length == 0) {
    alert("Debe crear el tablero");
    return
  }
  else {
    solucionEsperada = crearSolucionEsperada(dimensionesMatriz);
    if (backtrakingEnUso) {
      let estadoAct = JSON.parse(JSON.stringify(matrizBacktraking))
      backtracking(estadoAct)
    }
    else {
      //aEstrella()
    }
  }
}


//Funcion sleep tomada de https://www.delftstack.com/howto/javascript/javascript-wait-for-x-seconds/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Funcion que permite verificar si la matriz ya fue operada.
 * @param {array} matriz 
 * @returns {boolean} | true si la matriz ya fue operada.
 */
function matrizFueOperada(matriz) {
  for (let i = 0; i < matricesOperadas.length; i++) {
    if (matricesOperadas[i].toString() === matriz.toString()) {
      return true
    }
  }
  return false
}

/**
 * Función que genera una matriz con maximo 4 submatrices, las cuales son los posibles estados
 * de acuerdo al movimiento que se haga en la matriz.
 *
 * @param {array} estado | Estado actual de la matriz
 * @return {array} | Matriz con los posibles estados
 */
function generarMatricesResultados(estado) {
  let posCero = obtenerPosicionVacia(estado)
  let posiblesPasos = [];
  let fila = posCero[0]
  let columna = posCero[1]

  if (fila - 1 >= 0) { //arriba
    posiblesPasos.push(swapPosicionCero(estado, fila, columna, fila - 1, columna))
  }
  if (fila + 1 < estado.length) { //abajo
    posiblesPasos.push(swapPosicionCero(estado, fila, columna, fila + 1, columna))
  }
  if (columna - 1 >= 0) { //izquierda
    posiblesPasos.push(swapPosicionCero(estado, fila, columna, fila, columna - 1))
  }
  if (columna + 1 < estado.length) { //derecha
    posiblesPasos.push(swapPosicionCero(estado, fila, columna, fila, columna + 1))
  }
  return posiblesPasos;
}

/**
 * Función permite mover la posición de un elemento de la matriz a una nueva. 
 * @param {array} matriz  | Matriz a la que se le va a mover un elemento
 * @param {int} filaCero  | Fila en la que se encuentra el elemento a mover
 * @param {int} columnaCero | Columna en la que se encuentra el elemento a mover
 * @param {int} nuevaFila | Fila a la que se va a mover el elemento
 * @param {int} nuevaColumna | Columna a la que se va a mover el elemento
 * @return {array} | Matriz con el elemento movido
 */
function swapPosicionCero(matriz, filaCero, columnaCero, nuevaFila, nuevaColumna) {
  let matrizResultado = JSON.parse(JSON.stringify(matriz))
  let numero = matriz[nuevaFila][nuevaColumna]
  matrizResultado[nuevaFila][nuevaColumna] = 0
  matrizResultado[filaCero][columnaCero] = numero
  return matrizResultado
}

/**
 * Función que permite obtener la posición del elemento vacío (0) en la matriz
 * @param {array} matriz 
 * @returns {array} | Posicion del elemento vacio
 */
function obtenerPosicionVacia(matriz) {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz.length; j++) {
      if (matriz[i][j] == 0) {
        return [i, j];
      }
    }
  }
}

/**
 * Función que genera una matriz n x n con los números del 1 al n^2 - 1 de forma ordenada.
 * @param {int} dimensiones 
 * @return {array} | Matriz con los números ordenados
 */
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