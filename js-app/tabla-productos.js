import { getRoles } from "./auth";

export function renderProductos() {
  const mainContent = document.getElementById("mainContent");
  const isAdmin = getRoles().includes("ROLE_ADMIN");
  mainContent.innerHTML = `
    <div class="card shadow m-3">
      <h5 class="gap-5 text-center">Listado de productos</h5>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-striped mb-0 table-bordered">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio unitario</th>
                <th>Stock</th>
                <th>Descripción</th>
                ${isAdmin ? "<th>Acciones</th>" : ""}
              </tr>
            </thead>
            <tbody id="tablaProductos"></tbody>
          </table>
        </div>
      </div>

      <div class="card-footer">
        <div class="d-flex justify-content-end">
          <ul class="pagination justify-content-end mb-0" id="paginacion"></ul>
        </div>
      </div>
    </div>
  `;

  const tbody = document.getElementById("tablaProductos");

  let paginaActual = 0;
  const size = 5;

  function renderTablaProductos(productos) {
    tbody.innerHTML = productos.map(p => `
      <tr>
        <td>${p.name}</td>
        <td>${p.price.toLocaleString()}</td>
        <td>${p.stock}</td>
        <td>${p.description}</td>
        ${isAdmin ? `<td>
          <button class="btn btn-sm btn-primary editar" data-id="${p.id}">Editar</button>
          <button class="btn btn-sm btn-danger eliminar" data-id="${p.id}">Eliminar</button>
        </td>` : ""}
      </tr>
    `).join("");
  }

  function cargarPaginaProductos(page) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center">Cargando...</td></tr>`;

    fetch(`http://localhost:8080/product?page=${page}&size=${size}`)
      .then(res => res.json())
      .then(data => {
        paginaActual = data.number;
        renderTablaProductos(data.content);
        renderPaginacionProductos(data);
      });
  }

  function renderPaginacionProductos(data) {
    const ul = document.getElementById("paginacion");

    ul.innerHTML = `
      <li class="page-item ${data.first ? 'disabled' : ''}">
        <button class="page-link" id="prev">Anterior</button>
      </li>
      <li class="page-item disabled">
        <span class="page-link">
          Página ${data.number + 1} de ${data.totalPages}
        </span>
      </li>
      <li class="page-item ${data.last ? 'disabled' : ''}">
        <button class="page-link" id="next">Siguiente</button>
      </li>
    `;

    if (!data.first) {
      document.getElementById("prev")
        .addEventListener("click", () => cargarPaginaProductos(paginaActual - 1));
    }

    if (!data.last) {
      document.getElementById("next")
        .addEventListener("click", () => cargarPaginaProductos(paginaActual + 1));
    }
  }

  cargarPaginaProductos(0);
}