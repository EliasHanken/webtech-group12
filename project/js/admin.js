// Scripts related to admin page

runOnLoad(protectAdminArea);

/**
 * Redirect the user away from this page when admin permissions not present
 */
function protectAdminArea() {
    if (!isAdmin(getAuthenticatedUser())) {
        console.log("Is not admin");
        redirectTo("/index.html");
    }else{
        createAdminPage();
    }
}


/**
 * Create admin elements
 */
function createAdminPage(){
    createOrderElement();
}

/**
 * Creates the html structure for the admin page
 */
function createOrderElement(){
    const content = document.querySelector(".admin-content");
    const div = document.createElement("div");
    div.classList.add("order-container")
    const header = document.createElement("div");
    header.classList.add("order-header","order-div-element");
    const headerText = document.createElement("p");
    headerText.classList.add("order-header-text");
    header.appendChild(headerText);
    const orderDataDiv = document.createElement("div");
    orderDataDiv.classList.add("order-data","order-div-element");

    headerText.innerText = "Edit orders";

    div.appendChild(header);
    div.appendChild(orderDataDiv);
    content.appendChild(div);
    
}


