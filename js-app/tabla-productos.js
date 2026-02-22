
const size = 15;
let paginaActual = 0;

document.addEventListener("DOMContentLoaded", () => {
    cargarPaginaProductos(0);
});

function cargarPaginaProductos(page) {
    fetch(`/product?page=${page}&size=${size}`)
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
                ⬅ Anterior
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
                ${data.last ? '' : `onclick="cargarPagina(${paginaActual + 1})"`}>
                Siguiente ➡
            </button>
        </li>
    `;
}