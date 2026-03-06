export function renderCrearProducto() {

    const mainContent = document.getElementById("mainContent");

    mainContent.innerHTML = `
    <div class="container d-flex justify-content-center">
      <div class="card shadow mt-4 w-50">
        
        <div class="card-header text-center">
          <h5>Crear producto</h5>
        </div>

        <div class="card-body">

          <form id="formCrearProducto">

            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input 
                type="text" 
                class="form-control" 
                id="nombreProducto"
                required
              >
            </div>

            <div class="mb-3">
              <label class="form-label">Precio unitario</label>
              <input 
                type="number" 
                class="form-control" 
                id="precioProducto"
                required
              >
            </div>

            <div class="mb-3">
              <label class="form-label">Stock incial</label>
              <input 
                type="number" 
                class="form-control" 
                id="stockProducto"
                required
              >
            </div>

            <div class="mb-3">
              <label class="form-label">Descripción (opcional)</label>
              <textarea 
                class="form-control" 
                id="descripcionProducto"
                rows="3">
              </textarea>
            </div>

            <div class="d-grid">
              <button class="btn btn-primary" type="submit">
                Crear producto
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  `;


    const form = document.getElementById("formCrearProducto");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const producto = {
            name: document.getElementById("nombreProducto").value,
            price: parseFloat(document.getElementById("precioProducto").value),
            stock: parseInt(document.getElementById("stockProducto").value),
            description: document.getElementById("descripcionProducto").value || null
        };

        fetch("http://localhost:8080/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(producto)
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al crear producto");
                return res.json();
            })
            .then(data => {
                alert("Producto creado correctamente");
                console.log(data);
            })
            .catch(err => {
                console.error(err);
                alert("Error al crear producto");
            });

    });

}