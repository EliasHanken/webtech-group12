// Login-form related stuff


const loginFormButton = document.getElementById("sign-up-button");

if (loginFormButton) {
    loginFormButton.addEventListener("click", submitRegisterForm);
}

/**
 * Submit the login form
 * @param event
 */
function submitRegisterForm(event) {
    event.preventDefault(); // Don't submit the form using the regular HTTP POST
    const username = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;
    const email = document.getElementById("email-input").value;
    //const name = document.getElementById("name").value;
    sendRegisterRequest(username, password, onRegisterSuccess, showFormError);
}

/**
 * This function will be called when login was successful
 */
function onRegisterSuccess() {
    showFormSuccess("Successfully created an account!");
    setTimeout(() =>{
        redirectTo("/html/login.html");
    },1500);
    
}

function sendRegisterRequest(username, password, successCallback, errorCallback){
    const postData = {
        "username": username,
        "password": password
    };
    sendApiRequest(
        "POST", "/signup",
        function (registerResponse) {
            successCallback();
        },
        postData,
        function (responseText) {
            errorCallback(responseText);
        }
    );
}
