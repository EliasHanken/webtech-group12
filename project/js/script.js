window.onload = startUp();

function startUp() {
    document.getElementById("login").onclick = login;
}

function login() {
    window.location.href = "html/login.html";
}