/**
 * Función principal que ejecuta el algoritmo de backtracking
 *
 * @param {int}   limite   | Límite de iteraciones para que se detenga la busqueda de una solución
 * @param {array} estado   | Matriz que representa el estado actual del tablero
 * @param {array} matrizPasoAnterior   | Matriz que representa el estado anterior del tablero
 * @param {array} posibles_movimientos | array de matrices que contiene todos los movimientos posibles
 * 
 */
 async function backtracking(estado, limite) {
  contador++;
  console.log("contador: " + contador)
  if (contador > 7000) {
    return false;
  }

  mostrarMatriz(estado)
  await sleep(10)

  if (contador <= limite) {
    if (estado.toString() === solucionEsperada.toString()) {
      valoresIniciales(estado)
      matricesOperadas.push(estado)
      await insertarLog(obtenerMovimiento(matrizPasoAnterior, estado))
      alert("Se ha encontrado la solución");
      return true
    }
    else {
      let posibles_movimientos = generarMatricesResultados(estado)
      await insertarLog(obtenerMovimiento(matrizPasoAnterior, estado))
      matricesOperadas.push(estado)
      matrizPasoAnterior = estado
      for (let i = 0; i < posibles_movimientos.length; i++) {
        matrizBacktraking = JSON.parse(JSON.stringify(posibles_movimientos[i]))
        matricesOperando = JSON.parse(JSON.stringify(posibles_movimientos[i]))
        if (!matrizFueOperada(posibles_movimientos[i])) {
          if (await backtracking(posibles_movimientos[i], limite)) {
            return true
          }
        }
      }
    }
    return false
  }
  return true
}

/**
 * Función que setea los valores iniciales del tablero
 * @param {array} estado 
 */
function valoresIniciales(estado) {
  contador = 0;
  // matricesOperadas = JSON.parse(JSON.stringify([]))
  estadoAct = JSON.parse(JSON.stringify(estado))
}
