import { authState } from "./auth.js";

import { renderInicio } from "./inicio.js";
import { renderLogin } from "./login.js";
import { renderProductos } from "./tabla-productos.js";
import { renderVentas } from "./tabla-ventas.js";

const routes = {
  "/login": renderLogin,
  "/inicio": renderInicio,
  "/productos": renderProductos,
  "/ventas": renderVentas
};

export function goTo(path) {
  window.location.hash = path;
}

export function router() {
  const path = window.location.hash.slice(1) || "/login";
  const app = document.getElementById("mainContent");

  app.innerHTML = "";

  // 🔥 Si no está logueado → forzar login usando hash
  if (!authState.isLogged() && path !== "/login") {
    window.location.hash = "/login";
    return;
  }

  const view = routes[path];

  if (!view) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  view();
}