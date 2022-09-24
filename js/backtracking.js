/**
 * Funcion que permite ejecutar el algoritmo backtraking
 */
//async
function backtracking(estado) {
  contador++;
  console.log("contador: " + contador)
  if (contador > 7000) {
    alert("Se ha superado el límite de iteraciones");
    valoresIniciales(estado)
    return false;
  }

  mostrarMatriz(estado)
  // await sleep(100)

  if (estado.toString() === solucionEsperada.toString()) {
    valoresIniciales(estado)
    alert("Se ha encontrado la solución");
    return estado
  }
  else {
    let posibles_movimientos = generarMatricesResultados(estado)
    matricesOperadas.push(estado)

    for (let i = 0; i < posibles_movimientos.length; i++) {
      matrizBacktraking = JSON.parse(JSON.stringify(posibles_movimientos[i]))
      matricesOperando = JSON.parse(JSON.stringify(posibles_movimientos[i]))
      if (matrizFueOperada(posibles_movimientos[i])) {
        continue
      }
      else {
        let solucion = backtracking(posibles_movimientos[i]);
        if (solucion != null) {
          return solucion
        }
      }
    }
  }
  return null
}

/**
 * Función que setea los valores iniciales del tablero
 * @param {array} estado 
 */
function valoresIniciales(estado) {
  contado = 0;
    matricesOperadas = JSON.parse(JSON.stringify([]))
    estadoAct = JSON.parse(JSON.stringify(estado))
}