let listaCerrada = []

async function aEstrella(estado) {
  let listaAbierta = []
  listaAbierta.push(estado)
  while (listaAbierta.length > 0) {
    let nodoActual = obtenerMatrizMenorPesoManhattan(listaAbierta)
    listaCerrada.push(nodoActual)
    matrizBacktraking = JSON.parse(JSON.stringify(nodoActual))

    mostrarMatriz(nodoActual)
    await sleep(1)

    if (nodoActual.toString() === solucionEsperada.toString()) {
      alert("Se ha encontrado la solución");
      return nodoActual
    }

    let posibles_movimientos = generarMatricesResultados(nodoActual)
    for (let i = 0; i < posibles_movimientos.length; i++) {
      if (!matrizFueOperadaa(posibles_movimientos[i])) {
        listaAbierta.push(posibles_movimientos[i])
      }
    }
  }
  listaCerrada = []
  alert("No se ha encontrado la solución");
}

function matrizFueOperadaa(matriz) {
  for (let i = 0; i < listaCerrada.length; i++) {
    if (listaCerrada[i].toString() === matriz.toString()) {
      return true
    }
  }
  return false
}

function obtenerMatrizMenorPesoManhattan(lista) {
  let pesoXindice = []
  lista.forEach(matriz => {
    pesoXindice.push(manhattan(matriz))
  })
  let min = Math.min(...pesoXindice);
  let indice = pesoXindice.indexOf(min);
  let matriz = lista[indice]
  // console.log(matriz + " => " + indice + " => " + min)
  lista.splice(indice, 1)
  quitarPesosMayores(pesoXindice, min)
  // console.log(min)
  return matriz
}


function quitarPesosMayores(pesoXindice, min) {
  for (let i = 0; i < pesoXindice.length; i++) {
    if (pesoXindice[i] > min) {
      listaAbierta.splice(i, 1)
      // listaCerrada.push(listaAbierta.splice(i, 1))
    }
  }
}

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

function getPosicion(valor) {
  for (let i = 0; i < solucionEsperada.length; i++) {
    for (let j = 0; j < solucionEsperada.length; j++) {
      if (solucionEsperada[i][j] === valor) {
        return [i, j]
      }
    }
  }
}