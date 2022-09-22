let backtrakingEnUso = false

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
  let tablero_container = document.getElementById("puzzle");
  let tableroHTML = "";
  let numeros = [];

  document.getElementById("board-container").remove()

  for (let i = 0; i < dimensiones; i++) {
    tableroHTML += "<div class='filaTablero'>";
    for (let j = 0; j < dimensiones; j++) {
      let numero = 0;
      if (automatico) {
        numero = obtenerRandom(dimensiones, numeros)
      }
      else {
        numero = prompt("Ingresa un número")
      }

      numeros.push(numero);

      let letra = `<p class="letraTablero">` + numero + `</p>`
      tableroHTML += `<div id="cuadro_` + i + `_` + j + `" class="cuadroTablero">` + letra + `</div>`;
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
  if (listaNumeros.includes(numero)) {
    return obtenerRandom(dimensiones, listaNumeros);
  }
  else {
    return numero;
  }
}