// ===============================
// Redirect jika sudah login
// ===============================

if (
  window.location.pathname.includes("index.html") ||
  window.location.pathname === "/"
) {
  if (getToken()) {
    window.location.href = "dashboard.html";
  }
}

// ===============================
// Login
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);

        return;
      }

      saveToken(result.token);

      alert("Login Berhasil");

      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Tidak dapat terhubung ke server.");
    }
  });
}

// ===============================
// Logout
// ===============================

function logout() {
  removeToken();

  window.location.href = "index.html";
}
