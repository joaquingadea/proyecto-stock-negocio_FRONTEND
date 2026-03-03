import { loadUser } from "./auth.js";
import { router, goTo } from "./router.js";

async function initApp() {
  await loadUser();  // 🔥 primero verificar sesión
  router();          // 🔥 después renderizar vista correcta
}

window.addEventListener("DOMContentLoaded", initApp);