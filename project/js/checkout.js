cartUser = getAuthenticatedUser().username;

function createCartItems() {
    sendApiRequest("GET", "/users/" + cartUser + "/cartID", requestCartList, null)
}

function finishCheckout() {
    loadingSymbol();
    sendApiPostRequest("/orders/new", successfulCheckout, cartUser, failedCheckout)
}

function loadingSymbol() {

}

function successfulCheckout() {
    alert("Order complete")
}

function failedCheckout() {
    alert("Order failed")
}

