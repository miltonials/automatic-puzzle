let listaAbierta = []
let listaCerrada = []

async function aEstrella(estado, limite) {
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

  while (listaAbierta.length > 0 && limite != 3) {
    let nodoActual = await obtenerMatrizMenorPesoManhattan(listaAbierta)
    listaCerrada.push(nodoActual)
    matrizBacktraking = JSON.parse(JSON.stringify(nodoActual))
    
    insertarLog(obtenerMovimiento(matrizPasoAnterior, nodoActual))
    mostrarMatriz(nodoActual)
    await sleep(100)
    
    if (nodoActual.toString() === solucionEsperada.toString()) {
      alert("Se ha encontrado la solución");
      /*console.log("*******************************")
      console.log(listaCerrada)
      console.log("*******************************")
      */
      return nodoActual
    }
    
    let posibles_movimientos = await generarMatricesResultados(nodoActual)
    for (let i = 0; i < posibles_movimientos.length; i++) {
      if (!matrizFueOperadaa(posibles_movimientos[i])) {
        listaAbierta.push(posibles_movimientos[i])
      }
    }
    matrizPasoAnterior = JSON.parse(JSON.stringify(nodoActual))
    limite++
  }
  listaCerrada = []
  if(listaAbierta.length == 0){
    alert("No se ha encontrado la solución");
  }
}

//funcion para el boton step in
//recibe el id para buscar la matriz (paso) en la lista
//retorna true si funciona, false si no funciona
function stepByStep(id){
  if(listaCerrada.length != 0 && id<=(listaCerrada.length)-1){  
    mostrarMatriz(listaCerrada[id]);
    return true;
  }else{
    return false;
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

function obtenerMatrizMenorPesoManhattan(lista) {
  if (lista.length == 1) {
    return lista[0]
  }
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