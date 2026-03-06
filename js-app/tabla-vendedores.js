let tbody;
let paginaActual = 0;
const size = 5;
export function renderVendedores() {

    const main = document.getElementById("mainContent");
    mainContent.innerHTML = `
  <div class="card shadow m-3 w-75 m-auto mt-4">
  
    <h5 class="p-3 gap-5 text-center">Listado de vendedores</h5>

  <div class="card-body p-0 ">
    <div class="table-responsive">
      <table class="table table-striped mb-0 table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ventas realizadas</th>
            <th>Rol</th>
            <th>Permisos</th>
          </tr>
        </thead>
        <tbody id="tablaVendedores">

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
    tbody = document.getElementById("tablaVendedores");
    cargarPaginaVendedores(0);
}


function renderTablaVendedores(vendedores) {
    let filas = "";
    tbody.innerHTML = ``;
    vendedores.forEach(s => {
        filas += `
            <tr>
                <td>${s.name}</td>
                <td>${s.countSales}</td>
                <td class="text-center p-3">
                    <div class="d-flex flex-column flex-md-row justify-content-center">
                        <button class="btn btn-sm btn-success m-1" onclick="setearAdmin(${s.id})">
                            Dar administrador
                        </button>

                        <button class="btn btn-sm btn-warning m-1" onclick="revocarPermisos(${s.id})">
                            Revocar permisos
                        </button>

                        <button class="btn btn-sm btn-danger m-1" onclick="revocarAdmin(${s.id})">
                            Revocar administrador
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = filas;
}

function setearAdmin(id) {
    // falta agregar confirmación
    fetch(`http://localhost:8080/admin/set-admin/${id}`, {
        method: "PATCH",
        credentials: "include"
    })
}

function revocarPermisos(id) {
    //falta confirmación
    fetch(`http://localhost:8080/admin/revoke-user/${id}`, {
        method: "PATCH",
        credentials: "include"
    })
}

function cargarPaginaVendedores(page) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center">Cargando...</td></tr>`;

    fetch(`http://localhost:8080/admin/sellers?page=${page}&size=${size}`, {
        credentials: "include"
    })
        .then(res => res.json())
        .then(data => {
            paginaActual = data.number;
            renderTablaVendedores(data.content);
            renderPaginacionVendedores(data);
        });
}

function renderPaginacionVendedores(data) {
    const ul = document.getElementById("paginacion");
    ul.innerHTML = "";

    // Botón Anterior
    ul.innerHTML += `
        <li class="page-item ${data.first ? 'disabled' : ''}">
            <button class="page-link"
                ${data.first ? '' : `onclick="cargarPaginaVendedores(${paginaActual - 1})"`}>
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
                ${data.last ? '' : `onclick="cargarPaginaVendedores(${paginaActual + 1})"`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                </svg>
            </button>
        </li>
    `;
}