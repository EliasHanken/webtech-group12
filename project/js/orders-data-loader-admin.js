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
 * @param orders orders retrieved from the backend.
 */
function showOrders(orders) {
    const orderContainer = document.querySelector(".order-data");
    for (let i = 0; i < orders.length; ++i) {
        const order = orders[i];
        const objectDiv = document.createElement("div");
        objectDiv.classList.add("order-obj");
        const orderElement = document.createElement("li");
        const orderBlockContainer = document.createElement("div")
        orderBlockContainer.classList.add("order-block");
        const orderText = document.createElement("a");
        orderText.innerText = order.destination + " (ID: #" + order.transactionId + ") ";

        const infoButton = document.createElement("button");
        infoButton.classList.add("order-info-button")
        infoButton.innerText = "INFO";

        const updateButton = document.createElement("button");
        updateButton.classList.add("order-update-button")
        updateButton.innerText = "UPDATE";

        const removeButton = document.createElement("button");
        removeButton.classList.add("order-remove-button")
        removeButton.innerText = "DELETE";

        orderBlockContainer.appendChild(orderText);
        orderElement.appendChild(orderBlockContainer);
        orderContainer.appendChild(orderElement);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");


        buttonContainer.appendChild(infoButton);
        buttonContainer.appendChild(updateButton);
        buttonContainer.appendChild(removeButton);

        orderBlockContainer.appendChild(buttonContainer);

        const shippedText = document.createElement("span");

        if(order.shippedFlag == true){
            shippedText.innerText = "Shipped";
            shippedText.style.color = "rgb(0,128,0)";
            orderText.appendChild(shippedText);

            removeButton.innerText = "CONFIRM";
        }else{
            shippedText.innerText = "Not shipped";
            shippedText.style.color = "rgb(128,0,0)";
            orderText.appendChild(shippedText);
        }

        
        shippedText.style.backgroundColor = "rgb(128,128,128,0.4)";
        shippedText.style.padding = "0.2rem 0.7rem";
        shippedText.style.borderRadius = "2rem";
        shippedText.style.fontWeight = "500";

        infoButton.addEventListener('click',function(){
            showInfo(order);
        })
        updateButton.addEventListener('click',function(){
            showUpdate(order);
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

/**
 * Show info of order on page.
 * @param order order retrieved from the backend
 */
function showInfo(order){
    const div = document.createElement("div");
    const id = order.transactionId;
    //sendApiRequest("GET","/orders/"+id+"",showInfoSuccessfull,null,showInfoError);
    showInfoSuccessfull(order);
}

/**
 * Show update of order on page.
 * @param order order retrieved from the backend
 */
function showUpdate(order){
    const div = document.createElement("div");
    const id = order.transactionId;
    //sendApiRequest("GET","/orders/"+id+"",showUpdateSuccessfull,null,showOrderError);
    showUpdateSuccessfull(order);
}

/**
 * When retrieving order from backend is successfull it will display the order
 * as a form on the page.
 * @param order order retrieved from the backend.
 */
function showUpdateSuccessfull(order){
    document.querySelector(".popup").classList.add("active");

    document.getElementById("form-order-id").value = "";
    document.getElementById("form-destination").value = "";
    document.getElementById("form-shipped").disabled = false;
    var isChecked = false;
    document.getElementById("order-items").innerHTML = "<option></option>";

    document.getElementById("form-order-id").value = order.transactionId;
    document.getElementById("form-destination").value = order.destination;
    document.getElementById("form-customer").value = order.userId;
    if(order.userId !== null){
        sendApiRequest("GET","/userbyid/"+order.userId,function(userData){
            document.getElementById("form-customer").value = "USERNAME: "+userData.username + ", ID:"+userData.id;
        },null,function(){console.log})
    }
    
    var isChecked = false;
    if(order.shippedFlag == true){
        isChecked = true;
        document.getElementById("form-destination").disabled = true;
        document.getElementById("form-shipped").disabled = true;
    }else{
        document.getElementById("form-destination").disabled = false;
        document.getElementById("form-shipped").disabled = false;
    }
    document.getElementById("form-shipped").checked = isChecked;

    var str = "";
    var i = order.items.length;
    console.log(order)
    if(i > 0){
        for(var index = 0; index<i; index++){
            str += "<option>Item -> id: " + order.itemId[index]['itemID'] +", model: "+ 
            order.itemId[index]['modelNumber'] +", price: " +
            order.itemId[index]['price'] + "</option>";
        }
        document.getElementById("order-items").innerHTML = str;
    }

    var bikeStr = "";
    var x = order.bikes.length;
    if(x > 0){
        for(var index = 0; index<x; index++){
            bikeStr += "<option>Bike -> id: " + order.bikes[index]['bikeID'] +", model: "+ 
            order.bikes[index]['bikeModel'] +", price: " +
            order.bikes[index]['price'] + "</option>";
        }
        document.getElementById("order-items").innerHTML += bikeStr;
    }

    var hasItems = i + x;
    if(hasItems <= 0){
        document.getElementById("order-items").innerHTML = "<option>none</option>";
    }

    //document.getElementById("order-items").innerHTML = str;

    
    
    document.querySelector(".form-button-submit").addEventListener("click",function(){
        var newDestination = document.getElementById("form-destination").value;
        var newShippedFlag = "false";
        if(document.getElementById("form-shipped").checked){
            newShippedFlag = "true";
        }
        /*
        sendApiRequest("POST","/orders/"+order.transactionId+"",orderSuccessfullyUpdated,{
            "transactionId":order.transactionId,
            "destination":newDestination,
            "shippedFlag":newShippedFlag
        },orderUpdateError);
        */
       sendApiRequest("PUT","/orders/"+order.transactionId,orderSuccessfullyUpdated,
       {"id":order.transactionId,"destination":newDestination,"shippedFlag":newShippedFlag},orderUpdateError);
    })

    document.querySelector(".popup .close-btn").addEventListener("click",function(){
        document.querySelector(".popup").classList.remove("active");
        document.querySelector(".submit-message").innerText = "";
    });
}

async function getUserData(id){
    let res =  axios.get('https://localhost:8080/api/userbyid/' + id);

    console.log(res);

}

/**
 * Function to update order with order body.
 * @param {*} endpoint endpoint in backend
 * @param {*} method the http request method
 * @param {*} successCallback function for success
 * @param {*} order order to be updated
 * @param {*} errorCallback function for error
 */
async function sendOrderUpdateRequest(endpoint,method,successCallback,id,newDest,newShipFlag,errorCallback){
    try {
        await axios.put('https://localhost:8080'+endpoint,{
            "transactionId":id,
            "destination":newDest,
            "shippedFlag":newShipFlag
        })
        successCallback();
    } catch (err) {
        errorCallback();
        console.log(err.message);
    }
}

function removeOrder(id){
    sendApiRequest("DELETE","/orders/delete/"+id+"",orderSuccessfullyDeleted,{"transactionId":id},orderDeleteError);
}

function orderSuccessfullyUpdated(id){
    document.querySelector(".submit-message").innerText = "Order successfully updated";
    document.querySelector(".submit-message").style.color = "rgb(17, 189, 17)";
    setTimeout(function(){
        document.querySelector(".popup").classList.remove("active");
        document.querySelector(".submit-message").innerText = "";
        location.reload(true);
    },1000);
}

function orderUpdateError(id){
    document.querySelector(".submit-message").innerText = "Error updating order";
    document.querySelector(".submit-message").style.color = "rgb(255, 77, 77)";
    setTimeout(function(){
        document.querySelector(".popup").classList.remove("active");
        document.querySelector(".submit-message").innerText = "";
        location.reload(true);
    },100000);
}

function orderSuccessfullyDeleted(id){
    alert("Deleted order #"+id+"");
    location.reload(true);
}

/**
 * When retrieving order from backend is successfull it will display the order
 * as a form on the page.
 * @param order retrieved from the backend.
 */
function showInfoSuccessfull(order){
    document.querySelector(".popup").classList.add("active");

    document.getElementById("form-order-id").value = "";
    document.getElementById("form-destination").value = "";
    var isChecked = false;
    document.getElementById("order-items").innerHTML = "<option></option>";

    document.getElementById("form-order-id").value = order.transactionId;
    document.getElementById("form-destination").value = order.destination;
    var isChecked = false;
    if(order.shippedFlag == true){
        isChecked = true;
    }
    document.getElementById("form-destination").disabled = true;
    document.getElementById("form-shipped").disabled = true;
    document.getElementById("form-shipped")

    var str = "";
    var i = order.itemId.length;
    var index = i-1;
    if(i > 0){
        for(var index = i-1; index<i; index++){
            str += "<option>id: " + order.itemId[index]['itemID'] +", model: "+ 
            order.itemId[index]['modelNumber'] +", price: " +
            order.itemId[index]['price'] + "</option>";
        }
    
        document.getElementById("order-items").innerHTML = str;
    }else{
        document.getElementById("order-items").innerHTML = "<option>none</option>";
    }
    

    document.querySelector(".popup .close-btn").addEventListener("click",function(){
        document.querySelector(".popup").classList.remove("active");
    });
}

function showInfoError(id){
    alert("Error getting data from order #"+id+"");
}

function orderDeleteError(){
    alert("Error deleting order");
    location.reload(true);
}

function showOrderError(){
    alert("Error deleting order");
    location.reload(true);
}

function orderLoadingFailed() {
    const main = document.querySelector(".order-container");
    main.innerHTML = "<p class='error'>Could not load orders from the API. Perhaps the backend is not accessible?</p>";
}



