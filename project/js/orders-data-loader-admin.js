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
        infoButton.innerText = "INFO";

        const updateButton = document.createElement("button");
        updateButton.classList.add("order-update-button")
        updateButton.innerText = "UPDATE";

        const removeButton = document.createElement("button");
        removeButton.classList.add("order-remove-button")
        removeButton.innerText = "DELETE";

        orderElement.appendChild(orderText);
        orderContainer.appendChild(orderElement);

        orderText.appendChild(infoButton);
        orderText.appendChild(updateButton);
        orderText.appendChild(removeButton);

        const shippedText = document.createElement("p");

        if(order.shippedFlag == true){
            shippedText.innerText = "Shipped";
            shippedText.style.color = "#36f676";
            orderText.appendChild(shippedText);

            removeButton.innerText = "CONFIRM SHIPMENT";
        }else{
            shippedText.innerText = "Not shipped";
            shippedText.style.color = "#fd4646";
            orderText.appendChild(shippedText);
        }

        infoButton.addEventListener('click',function(){
            showInfo(order.transactionId);
        })
        updateButton.addEventListener('click',function(){
            showUpdate(order.transactionId);
        })
        removeButton.addEventListener('click',function(){
            
            var shipped = false;
            if(shippedText.innerText == "Shipped"){
                shipped = true;
            }

            
            if(shipped){
                let confirmCheck = confirm("\nYou are about to confirm order #"+order.transactionId+"\n\nRemember checking the details.\n\nProceed?");
                if(confirmCheck){
                    removeOrder(order.transactionId);
                }
            }else{
                let deleteCheck = confirm("\nConfirm deleting order #"+order.transactionId+"?\n\nThis can't be undone.");
                if(deleteCheck){
                    removeOrder(order.transactionId);
                }
            }

        })
    }
}

function showInfo(id){

}

function showUpdate(id){
    
}

function removeOrder(id){
    
    sendApiRequest("DELETE","/orders/"+id+"",orderSuccessfullyDeleted(id),{"transactionId":id},orderDeleteError);
}

function orderSuccessfullyDeleted(id){
    alert("Deleted order #"+id+"");
    location.reload(true);
}

function orderDeleteError(){
    alert("Error deleting order");
    location.reload(true);
}

function orderLoadingFailed() {
    const main = document.querySelector("order-container");
    main.innerHTML = "<p class='error'>Could not load orders from the API. Perhaps the backend is not accessible?</p>";
}
