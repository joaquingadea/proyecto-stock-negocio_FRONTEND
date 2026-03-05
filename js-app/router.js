import { authState } from "./auth.js";
import { renderInicio } from "./inicio.js";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";
import { renderProductos } from "./tabla-productos.js";
import { renderVentas } from "./tabla-ventas.js";
import { renderSolicitudes } from "./tabla-solicitudes-vendedores.js";
import { renderVendedores } from "./tabla-vendedores.js";
import { renderNuevaVenta } from "./nueva-venta.js";
import { renderNav } from "./nav.js";

const routes = {
  "/login": renderLogin,
  "/register": renderRegister,
  "/inicio": renderInicio,
  "/productos": renderProductos,
  "/ventas": renderVentas,
  "/solicitudes-vendedores": renderSolicitudes,
  "/vendedores": renderVendedores,
  "/nueva-venta": renderNuevaVenta
};

export function goTo(path) {
  window.location.hash = path;
}

export function router() {
  const path = window.location.hash.slice(1) || "/login";
  const app = document.getElementById("mainContent");

  app.innerHTML = "";

  if (!authState.isLogged() && path !== "/login" && path !== "/register") {
    goTo("/login");
    return;
  }

  renderNav();

  const view = routes[path];

  if (!view) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  view();
}