// ===============================
// Backend API
// ===============================

const BASE_URL = "http://localhost:3000/api";

// ===============================
// Token
// ===============================

function getToken() {
  return localStorage.getItem("token");
}

function saveToken(token) {
  localStorage.setItem("token", token);
}

function removeToken() {
  localStorage.removeItem("token");
}

// ===============================
// Header JWT
// ===============================

function authHeader() {
  return {
    "Content-Type": "application/json",

    Authorization: "Bearer " + getToken(),
  };
}
