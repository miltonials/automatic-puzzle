/** 
 * Variables globales
 * @param {list} listaAbierta Guarda posibles resultados
 * @param {list} listaCerrada Guarda resultados certeros
 */
let listaAbierta = []
let listaCerrada = []

/**
 * Algoritmo de A*
 * genera los pasos necesarios para poder armar el puzzle
 * @param {list} estado La matriz que sera manipulada
 * @param {int} limite un limite de iteraciones
 * @returns Null
 */
async function aEstrella(estado, limite) {
  if (limite > 3) {
    listaAbierta = []
    listaCerrada = []
  }

  try {
    let childs = document.getElementById("logs-history").childNodes
    for (let i = 0; i < childs.length; i++) {
      childs[i].remove()
    }
  } catch (error) {
    console.log("No se ha encontrado el elemento logs-container")
  }

  listaAbierta.push(estado)
  console.log("contador: " + limite)
  matrizPasoAnterior = JSON.parse(JSON.stringify(estado))

  while (listaAbierta.length > 0 && contador <= limite) {
    contador++

    let nodoActual = await obtenerMatrizMenorPesoManhattan(listaAbierta)
    listaCerrada.push(nodoActual)
    matrizBacktraking = JSON.parse(JSON.stringify(nodoActual))
    
    await insertarLog(obtenerMovimiento(matrizPasoAnterior, nodoActual))
    await mostrarMatriz(nodoActual)
    await sleep(100)
    
    if (nodoActual.toString() === solucionEsperada.toString()) {
      alert("Se ha encontrado la solución");
      return nodoActual
    }
    
    let posibles_movimientos = await generarMatricesResultados(nodoActual)
    for (let i = 0; i < posibles_movimientos.length; i++) {
      if (!matrizFueOperadaa(posibles_movimientos[i])) {
        listaAbierta.push(posibles_movimientos[i])
      }
    }
    matrizPasoAnterior = JSON.parse(JSON.stringify(nodoActual))
  }
  if(listaAbierta.length == 0 && limite > 3){
    listaCerrada = []
    // // listaCerrada = []
    alert("No se ha encontrado la solución");
  }
  if(listaAbierta.length == 0){
    listaCerrada = []
  }
}

/**
 * recibe una matriz y valida si dicha matriz ya existe o ha sido operada anteriormente
 * @param {list} matriz la matriz que será usada
 * @returns true si la matriz ha sido usada anteriormente
 * @returns false sino
 */
function matrizFueOperadaa(matriz) {
  for (let i = 0; i < listaCerrada.length; i++) {
    if (listaCerrada[i].toString() === matriz.toString()) {
      return true
    }
  }
  return false
}

/**
 * utiliza el algoritmo de manhattan para obtener la matriz con menor peso
 * @param {list} lista lista de matrices
 * @returns matriz con menor peso
 */
function obtenerMatrizMenorPesoManhattan(lista) {
  let pesoXindice = []
  lista.forEach(matriz => {
    pesoXindice.push(manhattan(matriz))
  })
  let min = Math.min(...pesoXindice);
  let indice = pesoXindice.indexOf(min);
  let matriz = lista[indice]
  lista.splice(indice, 1)
  quitarPesosMayores(pesoXindice, min)
  // console.log(min)
  return matriz
}


/**
 * elimina las matrices con mayor peso de la lista cerrada
 * @param {list} pesoXindice el peso que posee cada indice, almacenado en una matriz
 * @param {int} min  el peso minimo a considerar
 */
function quitarPesosMayores(pesoXindice, min) {
  for (let i = 0; i < pesoXindice.length; i++) {
    if (pesoXindice[i] > min) {
      // listaAbierta.splice(i, 1)
      listaCerrada.push(listaAbierta.splice(i, 1))
    }
  }
}

/**
 * algoritmo de manhattan, genera una matriz con el peso por cada indice 
 * @param {list} matriz matriz que sera utilizada
 * @returns una lista con los pesos 
 */
function manhattan(matriz) {
  let contador = 0;
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz.length; j++) {
      let valor = matriz[i][j]
      let posicion = getPosicion(valor)
      contador += Math.abs(posicion[0] - i) + Math.abs(posicion[1] - j)
    }
  }
  return contador;
}

/**
 * retorna las coordenadas de un valor almacenado en una matriz
 * @param {int} valor valor a buscar
 * @returns lista con las coordenadas del valor
 */
function getPosicion(valor) {
  for (let i = 0; i < solucionEsperada.length; i++) {
    for (let j = 0; j < solucionEsperada.length; j++) {
      if (solucionEsperada[i][j] === valor) {
        return [i, j]
      }
    }
  }
}