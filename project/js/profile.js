// Scripts related to the profile page

runOnLoad(loadProfileData);
runOnLoad(loadOrderData);

const profileSaveButton = document.getElementById("profile-save-button");
const bioElement = document.getElementById("bio");
const ordersDiv = document.getElementById("orders");

profileSaveButton.onclick = function(event) {
    event.preventDefault(); // Don't submit the form
    const profileData = {
        "bio": bioElement.value
    };
    const username = getCookie("current_username");
    bioElement.disabled = true;
    profileSaveButton.disabled = true;
    sendApiRequest("PUT", "/users/" + username, profileSaveSuccess, profileData, profileSaveError);
}

/**
 * Send request to backend, load user profile data
 */
function loadProfileData() {
    console.log("Loading profile data from API...");
    bioElement.disabled = true;
    profileSaveButton.disabled = true;
    const user = getAuthenticatedUser();
    if (user) {
        sendApiRequest("GET", "/users/" + user.username, showProfileData);
    } else {
        redirectTo("/no-access.html");
    }
}

function loadOrderData(){
    console.log("Loading order data from API...");
    const user = getAuthenticatedUser();
    if (user) {
        console.log(user);
        sendApiRequest("GET", "/userId/" + user.username, showOrderData);
    } else {
        redirectTo("/no-access.html");
    }
}

function showOrderData(profileId){
    console.log(profileId);
    sendOrderDataRequest(profileId);
}

function sendOrderDataRequest(profileId) {
    console.log("Loading orders data...");
    sendApiRequest("GET", "/orderbyuserid/" + profileId, showUserOrders, null, function(){document.getElementById("orders").innerHTML = "<h2>Failed to retrieve order data</p>"});
}

/**
 * Show orders on the page
 * @param orders
 */
function showUserOrders(orders) {
    console.log(orders);
    document.getElementById("orders").innerHTML = "<p id=profile-info-text>Orders are shown under:</p>";
    for (let i = 0; i < orders.length; ++i) {
        const order = orders[i];
        const div = document.createElement("div");
        div.classList.add("order-element");
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignContent = "center";
        div.style.flexDirection = "column";
        const p = document.createElement("p");
        p.innerHTML = "Invoice ID: #"+order.transactionId+" " + "<span id=order-status-"+i+">Order-Status</span>";
        div.appendChild(p);
        document.getElementById("orders").appendChild(div);
        document.getElementById("order-status-"+i+"").style.margin = "1rem";

        const select = document.createElement("select");
        select.classList.add("order-items-"+i);
        div.appendChild(select);

        var str = "";
        var x = order.items.length;
        console.log(order)
        if(x > 0){
            for(var index = 0; index<x; index++){
                str += "<option>Items -> id: " + order.itemId[index]['itemID'] +", model: "+ 
                order.itemId[index]['modelNumber'] +", price: " +
                order.itemId[index]['price'] + "</option>";
            }
            document.querySelector(".order-items-"+i).innerHTML += str;
        }


        var bikeStr = "";
        var z = order.bikes.length;
        if(z > 0){
            for(var index = 0; index<z; index++){
                bikeStr += "<option>Bike -> id: " + order.bikes[index]['bikeID'] +", model: "+ 
                order.bikes[index]['bikeModel'] +", price: " +
                order.bikes[index]['price'] + "</option>";
            }
            document.querySelector(".order-items-"+i).innerHTML += bikeStr;   
        }

        var hasItems = x + z;
        if(hasItems <= 0){
            document.querySelector(".order-items-"+i).innerHTML = "<option>none</option>";
            document.getElementById("order-status-"+i).innerText = "No items";
            document.getElementById("order-status-"+i+"").style.color = "rgb(240,0,25)";
        }

        var status = order.shippedFlag;
        var statusMessage = "";
        if(status == false){
            statusMessage = "In process";
            document.getElementById("order-status-"+i+"").style.color = "rgb(128,0,0)";
            document.getElementById("order-status-"+i+"").style.backgroundColor = "rgb(128,128,128,0.4)";
            document.getElementById("order-status-"+i+"").style.padding = "0.2rem 0.7rem";
            document.getElementById("order-status-"+i+"").style.borderRadius = "2rem";
            document.getElementById("order-status-"+i+"").style.fontWeight = "500";
        }else{
            statusMessage = "Delivered to pickup";
            document.getElementById("order-status-"+i+"").style.color = "rgb(0,128,0)";
            document.getElementById("order-status-"+i+"").style.backgroundColor = "rgb(128,128,128,0.4)";
            document.getElementById("order-status-"+i+"").style.padding = "0.2rem 0.7rem";
            document.getElementById("order-status-"+i+"").style.borderRadius = "2rem";
            document.getElementById("order-status-"+i+"").style.fontWeight = "500";
        }
        document.getElementById("order-status-"+i).innerText = statusMessage;
    }
}

/**
 * Show user profile data on the page
 * @param profileData User profile data received from the backend
 */
function showProfileData(profileData) {
    console.log(profileData);
    if (profileData) {
        bioElement.innerText = profileData.bio ? profileData.bio : "";
        bioElement.disabled = false;
        profileSaveButton.disabled = false;
    }
}

/**
 * This function is called when profile was successfully saved (response from API received)
 */
function profileSaveSuccess() {
    showFormSuccess("Profile saved");
    bioElement.disabled = false;
    profileSaveButton.disabled = false;
}

/**
 * This function is called when profile-saving failed
 * @param error Error message received from the API
 */
function profileSaveError(error) {
    showFormError(error);
}
