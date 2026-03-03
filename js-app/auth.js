
export const authState = {
  user: null,

  setUser(user) {
    this.user = user;
  },

  clearUser() {
    this.user = null;
  },

  isLogged() {
    return !!this.user;
  },

  hasRole(role) {
    return this.user && this.user.roles.includes(role);
  }
};

export async function loadUser() {
  try {
    const res = await fetch("/auth/me", { credentials: "include" });
    if (!res.ok) throw new Error();

    const data = await res.json();

    authState.setUser({
      name: data.name,
      roles: data.authorities
    });

  } catch {
    authState.clearUser();
  }
}