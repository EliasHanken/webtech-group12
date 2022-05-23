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
        const objectDiv = document.createElement("div");
        objectDiv.classList.add("order-obj");
        const orderElement = document.createElement("li");
        const orderText = document.createElement("a");
        orderText.innerText = order.destination + " (ID: #" + order.transactionId + ")";

        const infoButton = document.createElement("button");
        infoButton.classList.add("order-info-button")
        infoButton.innerText = "info";

        const updateButton = document.createElement("button");
        updateButton.classList.add("order-update-button")
        updateButton.innerText = "update";

        const removeButton = document.createElement("button");
        removeButton.classList.add("order-remove-button")
        removeButton.innerText = "remove";

        orderElement.appendChild(orderText);
        orderContainer.appendChild(orderElement);

        orderText.appendChild(infoButton);
        orderText.appendChild(updateButton);
        orderText.appendChild(removeButton);

        if(order.shippedFlag == true){
            const shippedText = document.createElement("p");
            shippedText.innerText = "Shipped";
            shippedText.style.color = "#36f676";
            orderText.appendChild(shippedText);
        }else{
            const shippedText = document.createElement("p");
            shippedText.innerText = "Not shipped";
            shippedText.style.color = "#fd4646";
            orderText.appendChild(shippedText);
        }

        infoButton.addEventListener("click",showInfo(i));
        updateButton.addEventListener("click",showUpdate(i));
        removeButton.addEventListener("click",removeOrder(i));
    }
}

function showInfo(id){

}

function showUpdate(id){
    
}

function removeOrder(id){
    orderDeleteError;
}

function orderDeleteError(){
    const main = document.querySelector("order-container");
    main.innerHTML = "<p class='error'>Could not delete order</p>";
}

function orderLoadingFailed() {
    const main = document.querySelector("order-container");
    main.innerHTML = "<p class='error'>Could not load orders from the API. Perhaps the backend is not accessible?</p>";
}
