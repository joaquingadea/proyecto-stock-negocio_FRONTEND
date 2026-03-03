const mainContent = document.getElementById("mainContent");
const size = 15;
let paginaActual = 0;
let tBody = null;

export function renderInicio() {
  mainContent.innerHTML = `
  <div class="card">
    <div class="card-header">
      <h3>Bienvenido al sistema de gestión de stock</h3>
    </div>
    <div class="card-body">
      <p>Utilice el menú para navegar por las diferentes secciones del sistema.</p>`
}