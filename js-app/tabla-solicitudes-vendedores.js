document.getElementById("solicitudAcceso").addEventListener("click", function() {
 mainContent.innerHTML = `
  <div class="card shadow m-3 w-75 m-auto mt-4">
  
    <h5 class="p-3 gap-5 text-center">Listado de solicitudes de acceso</h5>

  <div class="card-body p-0 ">
    <div class="table-responsive">
      <table class="table table-striped mb-0 table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Solicitud de acceso</th>
          </tr>
        </thead>
        <tbody id="tablaSolicitudesVendedores">

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
 tbody = document.getElementById("tablaSolicitudesVendedores");
 cargarPaginaSolicitudesVendedores(0);
});




function renderTablaSolicitudesVendedores(solicitudes) {
    let filas = "";
    tbody.innerHTML = ``;
    solicitudes.forEach(s => {
        filas += `
            <tr>
                <td>${s.name}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-success" onclick="aceptarSolicitud(${s.id})">Aceptar</button>
                    <button class="btn btn-sm btn-danger" onclick="denegarSolicitud(${s.id})">Denegar</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = filas;
}

function aceptarSolicitud(id) {
    // falta agregar confirmación
    fetch(`http://localhost:8080/admin/set-user/${id}`, {
        method: "PATCH"
    })
}

function denegarSolicitud(id) {
    //falta confirmación
    fetch(`http://localhost:8080/admin/deny-user/${id}`, {
        method: "DELETE"
    })
}

function cargarPaginaSolicitudesVendedores(page) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center">Cargando...</td></tr>`;

    fetch(`http://localhost:8080/admin/guests?page=${page}&size=${size}`)
        .then(res => res.json())
        .then(data => {
            paginaActual = data.number;
            renderTablaSolicitudesVendedores(data.content);
            renderPaginacionSolicitudesVendedores(data);
        });
}

function renderPaginacionSolicitudesVendedores(data) {
    const ul = document.getElementById("paginacion");
    ul.innerHTML = "";

    // Botón Anterior
    ul.innerHTML += `
        <li class="page-item ${data.first ? 'disabled' : ''}">
            <button class="page-link"
                ${data.first ? '' : `onclick="cargarPaginaSolicitudesVendedores(${paginaActual - 1})"`}>
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
                ${data.last ? '' : `onclick="cargarPaginaSolicitudesVendedores(${paginaActual + 1})"`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                </svg>
            </button>
        </li>
    `;
}