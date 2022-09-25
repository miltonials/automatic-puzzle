let listaAbierta = []
let listaCerrada = []
//solucionEsperada
//matrizbacktracking
async function aEstrella(estado) {
  listaAbierta.push(estado)
  while (listaAbierta.length > 0) {
    let nodoActual = obtenerMatrizMayorPeso()//listaAbierta.shift()
    estadoAct = JSON.parse(JSON.stringify(nodoActual))
    listaCerrada.push(nodoActual)
    
    mostrarMatriz(nodoActual)
    await sleep(5)
    
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
}

function matrizFueOperadaa(matriz) {
  for (let i = 0; i < listaCerrada.length; i++) {
    if (listaCerrada[i].toString() === matriz.toString()) {
      return true
    }
  }
  return false
}

function obtenerMatrizMayorPeso() {
  let pesoXindice = []
  listaAbierta.forEach(matriz => {
    pesoXindice.push(cantidadDeIguales(matriz))
  });
  let max = Math.max(...pesoXindice);
  let indice = pesoXindice.indexOf(max);
  let matriz = listaAbierta[indice]
  listaAbierta.splice(indice, 1)
  quitarPesosMenores(pesoXindice, max)
  return matriz
}

function quitarPesosMenores(pesoXindice, max) {
  for (let i = 0; i < pesoXindice.length; i++) {
    if (pesoXindice[i] < max) {
      listaCerrada.push(listaAbierta.splice(i, 1))
    }
  }
}
/*
*/

function cantidadDeIguales(matriz){
  let contador = 0;
  for(let i = 0; i < matriz.length; i++){
      for(let j = 0; j < matriz.length; j++){
          if(matriz[i][j] == solucionEsperada[i][j]){
              contador++;
          }
      }
  }
  return contador;
}