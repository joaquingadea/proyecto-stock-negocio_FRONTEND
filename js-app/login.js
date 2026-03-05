import { goTo } from "./router.js";
import { loadUser } from "./auth.js";

export function renderLogin() {
    mainContent.innerHTML = 
    `<div class="login-container">
        <h2>Login</h2>
        <form id="login-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Login</button>
        </form>
        <button id="go-register">No tenés cuenta? Registrate</button>
    </div>`;
}

document.addEventListener("click", function(e) {
    // Botón de ir a register
    if (e.target && e.target.id === "go-register") {
        goTo("/register");
    }
});

document.addEventListener("submit", async function (e) {
    if (e.target && e.target.id === "login-form") {
        e.preventDefault();

        try{
            await login();      // 1️⃣ login backend
            await loadUser();   // 2️⃣ cargar usuario en authState
            goTo("/inicio");    // 3️⃣ navegar
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    }
});

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
             username: username,
             password: password 
        }),
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Credenciales incorrectas");
    }

    return true; // 🔥 solo confirmar login
}

