let contadorProductos = 0;
let productosConStockCache = [];
let productosAgregadosALaVenta = [];

function buscarNombresProductos() {
    return fetch("http://localhost:8080/product/names")
        .then(res => res.json())
        .then(productos => {
            productosConStockCache = productos;
        });
}
export function renderNuevaVenta() {

  const main = document.getElementById("mainContent");
    mainContent.innerHTML = `
        <h4 class="p-3 text-center">Nueva venta</h4>

        <div class="container d-flex justify-content-center">
            <div class="card shadow mt-4 w-75 text-center">
                <div class="card-body">

                    <h5 class="mb-3">Agregar productos</h5>
                    <hr class="w-75 mx-auto">

                    <form class="d-flex flex-column align-items-center">

                        <div class="mb-3 w-100 d-flex flex-column align-items-center" id="productosContainer">
                        </div>

                        <div class="mb-3">
                            <button type="button" class="btn btn-primary mt-3" id="agregarProductoVentaBtn">
                                +
                            </button>
                        </div>

                    </form>

                    <button type="button" class="btn btn-primary mt-3 w-100" id="venderBtn">
                        Vender
                    </button>

                </div>
            </div>
        </div>
    `;

    buscarNombresProductos().then(() => {

        document.getElementById("agregarProductoVentaBtn")
            .addEventListener("click", function () {

                const container = document.getElementById("productosContainer");

                // 🔎 VALIDAR ÚLTIMO PRODUCTO
                const ultimoProducto = container.lastElementChild;

                if (ultimoProducto) {
                    const selectPrevio = ultimoProducto.querySelector(".producto-select");

                    if (!selectPrevio.value) {
                        alert("Debes seleccionar un producto antes de agregar otro.");
                        selectPrevio.classList.add("is-invalid");
                        return;
                    }
                }

                // 🆕 Crear nuevo bloque producto
                const productoHTML = `
                    <div class="position-relative d-flex w-75 card p-3 mt-3 producto-item flex-column align-items-center gap-3">

                        <button type="button"
                          class="btn btn-sm btn-outline-danger eliminar-producto position-absolute top-0 end-0 m-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                          </svg>
                        </button>

                        <span class="stock">Stock disponible: --</span>    

                        <select class="w-75 form-select producto-select">
                        </select>

                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <button type="button" class="btn btn-danger btn-sm restar">-</button>
                            <span class="cantidad">1</span>
                            <button type="button" class="btn btn-success btn-sm sumar">+</button>
                        </div>

                    </div>
                `;

                container.insertAdjacentHTML("beforeend", productoHTML);

                const nuevoProducto = container.lastElementChild;
                const select = nuevoProducto.querySelector(".producto-select");

                cargarNombresProductosEnSelect(select);

                // 🔢 Manejo cantidad
                let cantidadSpan = nuevoProducto.querySelector(".cantidad");

                nuevoProducto.querySelector(".sumar").addEventListener("click", () => {
                    cantidadSpan.textContent = parseInt(cantidadSpan.textContent) + 1;
                });

                nuevoProducto.querySelector(".restar").addEventListener("click", () => {
                    let valor = parseInt(cantidadSpan.textContent);
                    if (valor > 1) {
                        cantidadSpan.textContent = valor - 1;
                    }
                });

                nuevoProducto.querySelector(".eliminar-producto")
                .addEventListener("click", () => {
                  const confirmacion = confirm("¿Seguro que quieres eliminar este producto de la venta?");
                  if (!confirmacion) return;
                    const idProducto = nuevoProducto.querySelector(".producto-select").value;

                    productosAgregadosALaVenta = productosAgregadosALaVenta.filter(p => p.id !== idProducto);

                    nuevoProducto.remove();
                });
            });
    });
}

// 🗑 Eliminar producto


function cargarNombresProductosEnSelect(select) {

    select.innerHTML = `<option value="" disabled selected>Elige un producto</option>`;

    productosConStockCache.forEach(p => {
        let option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        select.appendChild(option);
    });

    // quitar rojo si elige algo
    select.addEventListener("change", function () {
        if (this.value) {
            this.classList.remove("is-invalid");
        }
    });
}

function agregarProductoAVenta() {
    return;
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "venderBtn") {
        generarVenta();
    }
});

function generarVenta() {

    const productos = document.querySelectorAll(".producto-item");

    let productosParaEnviar = [];

    productos.forEach(item => {
        const select = item.querySelector(".producto-select");
        const cantidad = item.querySelector(".cantidad").textContent;

        if (!select.value) {
            select.classList.add("is-invalid");
            return;
        }

        productosParaEnviar.push({
            productId: parseInt(select.value),
            quantity: parseInt(cantidad)
        });
    });

    if (productosParaEnviar.length === 0) {
        alert("Debes agregar al menos un producto");
        return;
    }

    const ventaDTO = {
        sellerId: 1, // ID del vendedor (fijo por ahora)
        details: productosParaEnviar
    };

    console.log("JSON a enviar:", ventaDTO);

    fetch("http://localhost:8080/sale", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ventaDTO)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al crear venta");
        return res.json();
    })
    .then(data => {
        console.log("Venta creada:", data);
        alert("Venta realizada correctamente");
    })
    .catch(err => {
        console.error(err);
        alert("Error al realizar la venta");
    });
}

