const config_btn = document.getElementById("conf-btn");

config_btn.addEventListener("click", () => {
  printModal(`
  <form>
  <h2 class="title">Configuraciones</h2>
  <h3 class>Dimensiones de tablero</h3>
  <div class="spinner-container">
    <input type="number" id="quantity" name="quantity" min="2" max="5">
  </div>
  <h3>Ingresar Tablero</h3>
  <div>
    <input type="radio" id="manual" name="tipo-tablero" value="manual" class="tipo-tablero">
    <label for="manual">Manual</label><br>
    <input type="radio" id="automatico" name="tipo-tablero" value="automatico" class="tipo-tablero">
    <label for="automatico">Automático</label>
    </input>
  </div>
  </form>
  <div class="config-btn-container">
    <button id = "btn-cancelar" class="button cancelar">Cancelar</button>
    <button class="button guardar" onClick="cambiarDimensionesTablero()">Guardar</button>
  </div>
  `);
}); 


