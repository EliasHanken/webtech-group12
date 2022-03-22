

document.getElementById("login-button").onclick = loginButton;
document.getElementById("register").onclick = registerButton;


function registerButton() {
    window.location.href = "../html/register.html";
}

function loginButton() {
    alert("You tried to log in :)")
}
