import { authState, getRoles } from "./auth.js";

/*export function renderNav() {
    const nav = document.getElementById("navBar");
    
    if (!authState.user) {
      nav.innerHTML = "";
      return;
    }

    const roles = getRoles();

    let adminLinks = "";
    let sellerLinks = "";

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
            <button class="nav-link" role="button" id="inicio">Inicio</button>
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
            <button class="nav-link" id="logout" role="button">Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </nav>
    `;
}

export function renderNav() {

  const nav = document.getElementById("navBar");

  if (!authState.user) {
    nav.innerHTML = "";
    return;
  }

  const roles = authState.user.roles;

  let menu = `
  <li><a id="inicio">Inicio</a></li>
  `;

  if (roles.includes("ROLE_ADMIN")) {

    menu += `
    <li><a id="listadoProductos">Productos</a></li>
    <li><a id="listadoVendedores">Vendedores</a></li>
    <li><a id="solicitudAcceso">Solicitudes</a></li>
    `;
  }

  if (roles.includes("ROLE_USER")) {

    menu += `
    <li><a id="listadoVentas">Ventas</a></li>
    <li><a id="nuevaVenta">Nueva venta</a></li>
    `;
  }

  nav.innerHTML = `
  <div class="container-fluid">

    <a class="navbar-brand">MiSistema</a>

    <ul class="navbar-nav">
      ${menu}
    </ul>

    <button id="logout">Cerrar sesión</button>

  </div>
  `;
}*/

export function renderNav() {

  const nav = document.getElementById("navBar");

  if (!authState.user) {
    nav.innerHTML = "";
    return;
  }

  const roles = getRoles();

  let ventasLinks = "";
  let adminLinks = "";
  let productosLinks = "";

  // ADMIN ve todo
  if (roles.includes("ROLE_ADMIN")) {
    productosLinks = `
    <li class="nav-item dropdown">
      <button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
        Productos
      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <li><button class="dropdown-item" id="listadoProductos">Listado de productos</button></li>
        <li><button class="dropdown-item" id="crearProducto">Crear producto</button></li>
      </ul>
    `;
    ventasLinks = `
      <li class="nav-item dropdown">
        <button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
          Ventas
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li><button class="dropdown-item" id="listadoVentas">Historial de ventas</button></li>
          <li><button class="dropdown-item" id="nuevaVenta">Generar nueva venta</button></li>
        </ul>
      </li>
    `;

    adminLinks = `
      <li class="nav-item dropdown">
        <button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
          Administración
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li><button class="dropdown-item" id="listadoVendedores">Listado de vendedores</button></li>
          <li><button class="dropdown-item" id="solicitudAcceso">Solicitudes de acceso</button></li>
        </ul>
      </li>
    `;
  }

  // VENDEDOR
  if (roles.includes("ROLE_USER") && !roles.includes("ROLE_ADMIN")) {
    productosLinks = `
      <li><button class="nav-link" id="listadoProductos">Listado de productos</button></li>
    `;
    ventasLinks = `
      <li class="nav-item dropdown">
        <button class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
          Ventas
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li><button class="dropdown-item" id="listadoVentas">Mis ventas</button></li>
          <li><button class="dropdown-item" id="nuevaVenta">Generar nueva venta</button></li>
        </ul>
      </li>
    `;
  }

  nav.innerHTML = `
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container-fluid">

      <a class="navbar-brand" href="#">MiSistema</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">Menú</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>

        <div class="offcanvas-body">

          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 my-4 gap-3">

            <li class="nav-item">
              <button class="nav-link" id="inicio">Inicio</button>
            </li>

            ${productosLinks}

            ${ventasLinks}

            ${adminLinks}

            <li class="nav-item">
              <button class="nav-link" id="logout">Cerrar sesión</button>
            </li>

          </ul>

        </div>
      </div>
    </div>
  </nav>
  `;
}