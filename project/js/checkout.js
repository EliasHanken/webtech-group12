cartUser = getAuthenticatedUser().username;

function createCartItems() {
    sendApiRequest("GET", "/users/" + cartUser + "/cartID", requestCartList, null)
}

function finishCheckout() {
    loadingSymbol();
    let pickUpSelector = document.getElementById("pickUpPoint");
    let pickUpPoint = pickUpSelector.options[pickUpSelector.selectedIndex].value;


    let order = {
        transactionId: null,
        destination: pickUpPoint,
        shippedFlag: false,
        items: null,
        user: null
    };

    let toSend = [];

    toSend.push(pickUpPoint);
    toSend.push(cartUser)

    console.log(toSend[0])
    console.log(toSend[1])

    sendApiRequest("post","/orders/new2", successfulCheckout, toSend, failedCheckout)
}

function loadingSymbol() {

}

function successfulCheckout() {
    emptyCart();
    alert("Order complete");
}

function failedCheckout() {
    alert("Order failed")
}

function getOrder() {
    sendApiGetRequest("/orders/123", console.log)
}

