import { goTo } from "./router.js";
export function renderRegister() {
    mainContent.innerHTML = 
    `<div class="login-container">
    <h2>Register</h2>
    <form id="register-form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" required>
        <button type="submit">Register</button>
    </form>
    
    </div>`;
}
document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "register-form") {
        e.preventDefault();
        register();
    }
});

function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
             username : username,
             password : password,
             confirmPassword : confirmPassword 
            }
            )
    })
    .then(res => {
        if (!res.ok) throw new Error("Registration failed");
        return res.json();
    })
    .then(data => {
        goTo("/inicio");
    }
    )
    .catch(err => {
        alert("Registration failed: " + err.message);
    });
}