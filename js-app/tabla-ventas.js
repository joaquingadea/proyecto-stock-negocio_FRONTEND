let ventasGlobal = [];


document.getElementById("listadoVentas").addEventListener("click", function() {
 mainContent.innerHTML = `
  <div class="card shadow m-3">
  
    <h5 class="gap-5 text-center">Listado de ventas</h5>

  <div class="card-body p-0">
    <div class="table-responsive">
      <table class="table table-striped mb-0 table-bordered">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Total</th>
            <th>Vendedor</th>
            <th>Ticket</th>
          </tr>
        </thead>
        <tbody id="tablaVentas">

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
 tbody = document.getElementById("tablaVentas");
 cargarPaginaVentas(0);
});




function renderTablaVentas(ventas) {
    let filas = "";
    tbody.innerHTML = ``;
    ventasGlobal = ventas;
    ventas.forEach((v,index) => {
        filas += `
            <tr>
                <td>${v.date}</td>
                <td>${v.total.toLocaleString()}</td>
                <td>${v.sellerName}</td>
                <td class="text-center p-3">
                    <button class="btn btn-sm btn-primary col-12 col-md-6 col-lg-4"
                            onclick="mostrarTicket(${index})">
                        Ver ticket
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = filas;
}

function mostrarTicket(index) {

    const modalBody = document.getElementById("ticketBody");

    modalBody.innerHTML = ventasGlobal[index].ticket.map(detail => `
        <div class="border-bottom mb-2 pb-2">
            <p><strong>Producto:</strong> ${detail.productName}</p>
            <p><strong>Cantidad:</strong> ${detail.quantity}</p>
            <p><strong>Precio:</strong> $${detail.unitPrice.toLocaleString()}</p>
            <p><strong>Total por item:</strong> $${detail.itemTotal.toLocaleString()}</p>
        </div>
    `).join("");
    modalBody.innerHTML += `<h5 class="text-end">Total: $${ventasGlobal[index].total.toLocaleString()}</h5>`;

    const modal = new bootstrap.Modal(document.getElementById("miModal"));
    modal.show();
}


function cargarPaginaVentas(page) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center">Cargando...</td></tr>`;

    fetch(`http://localhost:8080/sale?page=${page}&size=${size}`)
        .then(res => res.json())
        .then(data => {
            paginaActual = data.number;
            renderTablaVentas(data.content);
            renderPaginacionVentas(data);
        });
}

function renderPaginacionVentas(data) {
    const ul = document.getElementById("paginacion");
    ul.innerHTML = "";

    // Botón Anterior
    ul.innerHTML += `
        <li class="page-item ${data.first ? 'disabled' : ''}">
            <button class="page-link"
                ${data.first ? '' : `onclick="cargarPaginaVentas(${paginaActual - 1})"`}>
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
                ${data.last ? '' : `onclick="cargarPaginaVentas(${paginaActual + 1})"`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                </svg>
            </button>
        </li>
    `;
}