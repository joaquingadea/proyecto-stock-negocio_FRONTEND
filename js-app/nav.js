export function renderNav() {
    const nav = document.getElementById("navBar");
    nav.innerHTML = `
    <nav id="navBar" class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container-fluid">
    <!-- Logo -->
    <a class="navbar-brand" href="#">MiSistema</a>
    <!-- Botón para abrir el menú lateral -->
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Offcanvas -->
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 my-4 gap-3">
          <li class="nav-item">
            <a class="nav-link" role="button" id="inicio" href="index.html">Inicio</a>
          </li>
          <li class="nav-item">
            <button class="nav-link" role="button" id="listadoProductos">Listado de productos</button>
          </li>
          <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Ventas
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><button class="dropdown-item" id="listadoVentas">Historial de ventas</button></li>
              <li><button class="dropdown-item" id="nuevaVenta">Generar nueva venta</button></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Administración
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><button class="dropdown-item" id="listadoVendedores">Listado de vendedores</button></li>
              <li><button class="dropdown-item" id="solicitudAcceso">Solicitudes de acceso</button></li>
            </ul>
          </li>
          <li class="nav-item">
            <button class="nav-link" role="button">Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </nav>
    `;
}
