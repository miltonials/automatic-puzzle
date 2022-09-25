
# PUZZLE-N | Backtracking y A*

El objetivo del juego es alcanzar una determinada disposición de las fichas a partir de una disposición inicial realizando solo los movimientos permitidos, que son mover una ficha adyacente a la posición vacía de forma horizontal o vertical, ocupando la posición vacía y quedando en su lugar vacía la casilla ocupada anteriormente por la ficha movida.
## Instrucciones de uso

1. Ir a la dirección [Puzzle automático](https://miltonials.github.io/automatic-puzzle/) y seleccionar el tipo de algoritmo que se desea utilizar (A* estará seleccionado por defecto).
![image](https://user-images.githubusercontent.com/66586151/192166577-52520833-eb05-4430-b495-8561576bdfd1.png)

2. Abrir "Configuracion" y seleccionar las carácterísticas del tablero que deseamos solucionar.
![image](https://user-images.githubusercontent.com/66586151/192166706-e2e3b60c-8f35-43b5-8b34-381ed0e2b926.png)

_Tener en cuenta que las dimensiones va desde 2x2 y 5x5._

* Podemos seleccionar ingresar los datos que debe tener el tablero de forma manual o automática.
* En caso de seleccionar "Manual" se solicitarán uno por uno los valores desde _0_ a _(m * n) - 1_. Donde m * n = elementos que puede contener el tablero.
![image](https://user-images.githubusercontent.com/66586151/192166933-05f45a10-9343-410b-b117-656917475bef.png)
![image](https://user-images.githubusercontent.com/66586151/192167184-73ddc6fa-4df9-444a-8974-4a99d5f919df.png)

_En caso de querer cancelar el ingreso manual de datos se debe digitar -1_

3. Presionar Step_in para avanzar paso a paso hacia la solución del tablero. Si no, presionar Run para llegar a la solución en un solo click.
![image](https://user-images.githubusercontent.com/66586151/192167225-a944334e-25ac-419c-b7a0-70b3dada9e22.png)

Durante la ejecución del algoritmo seleccionado se generando un log con la secuencia de pasos para solucionar el tablero. Al momento de encontrar una solución habrá una alerta notificándolo.

**Excepcion**: hay tableros que nos es posible encontrar solución. Para ello se valida las solubilidad del tablero antes de ejecutarse. En caso de que el programa detecte que no se puede solucionar, entonces, habrá que generar un tablero diferente.
