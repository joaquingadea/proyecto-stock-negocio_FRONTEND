import { goTo } from "./router.js";

export function renderProductos() {
  document.getElementById("listadoProductos").addEventListener("click", function () {
    goTo("/productos");
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
          </tr>
        </thead>
        <tbody id="tablaProductos">

        </tbody>
      </table>
    </div>
  </div>
  
    <div class="card-footer">
      <div class="d-flex justify-content-end">
        <ul class="pagination justify-content-end mb-0" id="paginacion">
        </ul>
      </div>
    </div>
 </div>`;
    tbody = document.getElementById("tablaProductos");
    cargarPaginaProductos(0);
  });


  function renderTablaProductos(productos) {
    let filas = "";
    tbody.innerHTML = ``;
    productos.forEach(p => {
      filas += `
            <tr>
                <td>${p.name}</td>
                <td>${p.price.toLocaleString()}</td>
                <td>${p.stock}</td>
                <td class="w-25">
                    ${p.description}
                </td>
                <td class="text-center p-3">
                    <button class="m-1 btn btn-sm btn-primary col-12 col-md-6 col-lg-4"
                            data-id="${p.id}">
                          Editar  
                    </button>
                    
                    <button class="m-1 btn btn-sm btn-danger col-12 col-md-6 col-lg-4"
                            data-id="${p.id}">
                        Eliminar
                    </button>
                </td>
            </tr>
            
        `;
    });

    tbody.innerHTML = filas;
  }

  function cargarPaginaProductos(page) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center">Cargando...</td></tr>`;

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
    ul.innerHTML = "";

    // Botón Anterior
    ul.innerHTML += `
        <li class="page-item ${data.first ? 'disabled' : ''}">
            <button class="page-link"
                ${data.first ? '' : `onclick="cargarPaginaProductos(${paginaActual - 1})"`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                </svg> 
            </button>
        </li>
    `;

    // Texto Página X de Y
    ul.innerHTML += `
        <li class="page-item disabled">
            <span class="page-link bg-white border-0 fw-bold">
                Página ${data.number + 1} de ${data.totalPages}
            </span>
        </li>
    `;

    // Botón Siguiente
    ul.innerHTML += `
        <li class="page-item ${data.last ? 'disabled' : ''}">
            <button class="page-link"
                ${data.last ? '' : `onclick="cargarPaginaProductos(${paginaActual + 1})"`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                </svg>
            </button>
        </li>
    `;
  }
}