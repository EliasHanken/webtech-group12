window.onload = startUp;

function startUp() {
    document.getElementById("login").onclick = login;
    document.getElementById("login-html").onclick = loginHTML;



}

function login() {
    window.location.href = "html/login.html";
}

function loginHTML() {
    window.location.href = "login.html";
}