// API Backend melalui Nginx Reverse Proxy
const BASE_URL = "/api";

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

function authHeader() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getToken(),
  };
}
