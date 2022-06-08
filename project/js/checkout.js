cartUser = getAuthenticatedUser().username;

function createCartItems() {
    sendApiRequest("GET", "/users/" + cartUser + "/cartID", requestCartList, null)
}

function finishCheckout() {
    loadingSymbolOn();
    let pickUpSelector = document.getElementById("pickUpPoint");
    let pickUpPoint = pickUpSelector.options[pickUpSelector.selectedIndex].value;

    let toSend = [];

    toSend.push(pickUpPoint);
    toSend.push(cartUser)

    sendOrderApiRequest("post","/orders/new", successfulCheckout, toSend, failedCheckout)
}

function loadingSymbolOn() {
    document.getElementById("loader").style.visibility = "visible"
}

function loadingSymbolOff() {
    document.getElementById("loader").style.visibility = "hidden"
}

function successfulCheckout() {

    loadingSymbolOff();
    deleteCart();
    alert("Order complete");
    window.location.href = "../index.html"
}

function failedCheckout() {
    loadingSymbolOff();
    alert("Order failed");
}

function getOrder() {
    sendApiGetRequest("/orders", console.log);
}

