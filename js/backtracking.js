/**
 * Funcion que permite ejecutar el algoritmo backtraking
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
      alert("Se ha encontrado la solución");
      return true
    }
    else {
      let posibles_movimientos = generarMatricesResultados(estado)
      matricesOperadas.push(estado)

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