import { router } from "./router.js";
import { loadUser } from "./auth.js";
import { goTo } from "./router.js";
import { authState } from "./auth.js";

async function initApp() {
  await loadUser();  // 🔥 primero verificar sesión
  router();                       // 🔥 después renderizar vista correcta
}

document.addEventListener("click", async (e) => {
  if (e.target.id === "inicio") { goTo("/inicio");}
  if (e.target.id === "listadoProductos") { goTo("/productos");}
  if (e.target.id === "listadoVentas") { goTo("/ventas"); }
  if (e.target.id === "solicitudAcceso") { goTo("/solicitudes-vendedores"); }
  if (e.target.id === "listadoVendedores") { goTo("/vendedores"); }
  if (e.target.id === "nuevaVenta") { goTo("/nueva-venta"); }
  if (e.target.id === "logout") {
    await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    authState.user = null;
    
    window.location.href = "#/login";
    window.location.reload();
  }
});

window.addEventListener("DOMContentLoaded", initApp);
window.addEventListener("hashchange", router);