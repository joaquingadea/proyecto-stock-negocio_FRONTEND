import { authState } from "./auth.js";

import { renderLogin } from "./login.js";
import { renderInicio } from "./inicio.js";
import { renderProductos } from "./tabla-productos.js";
import { renderVentas } from "./tabla-ventas.js";

// 🔥 ROUTES DEFINIDO ARRIBA
const routes = {
  "/login": renderLogin,
  "/inicio": renderInicio,
  "/productos": renderProductos,
  "/ventas": renderVentas
};


export function goTo(path) {
  history.pushState({}, "", path);
  router();
}

export function router() {
  const path = window.location.pathname;
  const app = document.getElementById("mainContent");

  app.innerHTML = "";

  if (!authState.isLogged() && path !== "/login") {
    history.pushState({}, "", "/login");
    routes["/login"]();
    return;
  }

  const view = routes[path];

  if (!view) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  view();
}