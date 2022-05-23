// Dynamically load product data

runOnLoad(sendOrderDataRequest);

/**
 * Send an Ajax request to backend, fetch product data
 */
function sendOrderDataRequest() {
    console.log("Loading orders data...");
    sendApiRequest("GET", "/orders", showOrders, null, orderLoadingFailed);
}

/**
 * Show orders on the page
 * @param orders
 */
function showOrders(orders) {
    const orderContainer = document.querySelector(".order-data");
    for (let i = 0; i < orders.length; ++i) {
        const order = orders[i];
        const orderElement = document.createElement("li");
        const orderText = document.createElement("a");
        orderText.innerText = order.destination + " (ID: #" + order.transactionId + ")";
        orderElement.appendChild(orderText);
        orderContainer.appendChild(orderElement);
    }
}

function orderLoadingFailed() {
    const main = document.querySelector("order-container");
    main.innerHTML = "<p class='error'>Could not load orders from the API. Perhaps the backend is not accessible?</p>";
}
