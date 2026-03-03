import { goTo, router } from "./router.js";

async function initApp() {
  //await loadUser();  // 🔥 primero verificar sesión
  router();          // 🔥 después renderizar vista correcta
  document.getElementById("listadoProductos")
    ?.addEventListener("click", () => goTo("/productos"));

  document.getElementById("inicio")
    ?.addEventListener("click", () => goTo("/inicio"));

  document.getElementById("ventas")
    ?.addEventListener("click", () => goTo("/ventas"));
}

window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("hashchange", router);