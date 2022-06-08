cartUser = getAuthenticatedUser().username;

/**
 * Set up for adding items from the shopping cart stored in the backend.
 */
function createCartItems() {
    sendApiRequest("GET", "/users/" + cartUser + "/cartID", requestCartList, null)
}

/**
 * A function for creating a checkout and a new order. It sends a list with the pickupPoint at index 0 and the username
 * of the current user at index 1. The list is sent with a post Http request to the backend where a new order is made.
 */
function finishCheckout() {
    loadingSymbolOn();
    let pickUpSelector = document.getElementById("pickUpPoint");
    let pickUpPoint = pickUpSelector.options[pickUpSelector.selectedIndex].value;

    let toSend = [];

    toSend.push(pickUpPoint);
    toSend.push(cartUser)

    sendOrderApiRequest("post","/orders/new", successfulCheckout, toSend, failedCheckout)
}

/**
 * Simple loading symbol while waiting for order response.
 */
function loadingSymbolOn() {
    document.getElementById("loader").style.visibility = "visible"
}

/**
 * Hides the loading symbol
 */
function loadingSymbolOff() {
    document.getElementById("loader").style.visibility = "hidden"
}

/**
 * Function for a successful checkout, turns off the loading symbol, deletes the cart and sends the user back to the previous page.
 */
function successfulCheckout() {
    loadingSymbolOff();
    deleteCart();
    alert("Order complete");
    window.location.href = "../index.html"
}

/**
 * Simple alert if the checkout failed.
 */
function failedCheckout() {
    loadingSymbolOff();
    alert("Order failed");
}

