document.getElementById("logout").onclick = async () => {
  await fetch("/auth/logout", { method: "POST", credentials: "include" });
  goTo("/login");
};