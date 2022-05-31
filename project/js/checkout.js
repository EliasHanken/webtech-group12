function createCartItems() {
    requestCartList();
}

function finishCheckout() {
    loadingSymbol();
    sendApiPostRequest("/orders/new", successfulCheckout())
}

function loadingSymbol() {

}

function successfulCheckout() {

}

