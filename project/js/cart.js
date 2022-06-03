
//Basic setup for the cart
cartUser = getAuthenticatedUser().username;

let cartTemplate = document.createElement("template");

cartTemplate.innerHTML = `
<div class="cartDiv">
    <div class="cartContainer">
        <div class="cartHeader">
            <h1 class="cartH1">Shopping Cart</h1>
            <h2 class="removeH2" onclick="emptyCart()">Remove all items</h2>
        </div>
        <div id="cartItems">
        </div>
        <div class="cartFooter">
            <button onclick="addItem(2)">Add Test Item</button>
            <a href=`+calculatePath(2)+`/html/checkout.html><button class="checkOutButton">To Checkout!</button>
        </div>
    </div>
</div>
`

/**
 * Sends a GET XML request to the backend to retrieve the id of the cart belonging to the user.
 */
function requestCartID() {
  alert(cartUser)
  sendApiRequest("GET", "/users/" + cartUser + "/cartID", requestCartList, null)
}

/**
 * Sends two different XML GET requests to retrieve the item and bike content that is stored in the cart in the backend.
 * @param cartID the ID of the cart belonging to the current user.
 */
function requestCartList(cartID) {
  sendApiGetRequest("/cart/" + cartID + "/items", setItemList)

  sendApiGetRequest("/cart/" + cartID + "/bikes", setBikeList)

  /**
   * Simple function that sends the Items from the cart XML GET requests to the addItemsFromRetrievedList() function.
   * @param response ArrayList from the cart containing the items
   */
  function setItemList(response) {
    addItemsFromRetrievedList(response)
  }

  /**
   * Simple function that sends the Bikes from the cart XML GET requests to the addItemsFromRetrievedList() function.
   * @param response ArrayList from the cart containing the bikes
   */
  function setBikeList(response) {
    addItemsFromRetrievedList(response)
  }

  /**
   * Takes a list from the Cart and adds items or bikes depending on the model ID
   * @param cartList the list from the cart containing items/bikes.
   */
  function addItemsFromRetrievedList(cartList) {
    if (cartList.length <= 0) {
      //Empty cart
    } else {
      for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].modelNumber === "1") {
          addBike(cartList[i].price);
        }
        if (cartList[i].modelNumber === "2") {
          addHelmet(cartList[i].price);
        }
        if (cartList[i].modelNumber === "3") {
        }
        if (cartList[i].modelNumber === "4") {
          addBag(cartList[i].price);
        }
        if (cartList[i].modelNumber === "5") {
          addChalk(cartList[i].price);
        }
      }
    }
  }
}
/*
function requestCartList(cartID) {
  let requestItems = new XMLHttpRequest();
  requestItems.open("GET", "http://localhost:8080/api/cart/" + cartID + "/items");
  requestItems.send();

  requestItems.onload = parseListItems;

  function parseListItems() {
    let response = requestItems.responseText;
    cartList = JSON.parse(response)
    console.log(cartList)
    addItemsFromRetrievedList(cartList)
  }

  let requestBikes = new XMLHttpRequest();
  requestBikes.open("GET", "http://localhost:8080/api/cart/" + cartID + "/bikes");
  requestBikes.send();

  requestBikes.onload = parseListBikes;

  function parseListBikes() {
    let response = requestBikes.responseText;
    cartList = JSON.parse(response)
    addItemsFromRetrievedList(cartList)
  }

  function addItemsFromRetrievedList(cartList) {
    if (cartList.length <= 0) {
      //Empty cart
    } else {
      for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].modelNumber === "1") {
          addBike(cartList[i].price);
        }
        if (cartList[i].modelNumber === "2") {
          addHelmet(cartList[i].price);
        }
        if (cartList[i].modelNumber === "3") {
        }
        if (cartList[i].modelNumber === "4") {
          addBag(cartList[i].price);
        }
        if (cartList[i].modelNumber === "5") {
          addChalk(cartList[i].price);
        }
      }
    }
  }
}
*/

//Functions for showing and hiding the cart
/**
 * Opens the cart by appending the cart-template to the CartModalDiv, sets it to block to make it shown, then calls on
 * further cart requests to set up its content.
 */
  function openCart() {
    document.getElementById("cartModalDiv").appendChild(cartTemplate.content);
    document.getElementById("cartModalDiv").style.display = "block";
    requestCartID();
  }

/**
 * Empties the cart of its HTML content by deleting every child of cartItems class.
 */
function emptyHTMLCart() {
    let cartChildren = document.getElementById("cartItems");

    while (cartChildren.hasChildNodes()) {
      cartChildren.removeChild(cartChildren.lastChild)
    }
  }


/**
 * Sets the cartModalDiv display to "None" to it when the cart is closed. Also calls on emptyHTMLCart() to clear the html
 * cart of its content.
 */
function close() {
    document.getElementById("cartModalDiv").style.display = "none";
    emptyHTMLCart();
  }

/**
 * Closes the cart when something outside the cartModalDiv is clicked.
 * @param event the type of event
 */
  window.onclick = function (event) {
    if (event.target === document.getElementById("cartModalDiv")) {
      document.getElementById("cartModalDiv").style.display = "none";
      emptyHTMLCart();
    }
  }


//Functions for adding independent items to the cart
//TODO Combine functions
/**
 * Creates and adds a Bike html template to the cart
 * @param price the price of the bike
 */
  function addBike(price) {
    let itemTemplate = document.createElement("template")

    itemTemplate.innerHTML = `
    <div class="item">
        <div class="cartImages">
            <img src="../images/bike.png" alt="helmet" height="50rem" width="50rem">
        </div>
        <div class="itemInfo">
            <h3 class="itemTitle">
                Bike
            </h3>
            <h4 class="itemDescription">
                ${price} KR     
            </h4>
        </div>
        <div class="itemCounter">
            <div class="addButton">-</div>
            <div class="itemCount">1</div>
            <div class="removeButton">+</div>
        </div>
    </div>
  `

    document.getElementById("cartItems").appendChild(itemTemplate.content)
  }

/**
 * Creates and adds a helmet html template to the cart
 * @param price the price of the helmet
 */
  function addHelmet(price) {
    let itemTemplate = document.createElement("template")

    itemTemplate.innerHTML = `
    <div class="item">
        <div class="cartImages">
            <img src="../images/borsalino_helmet.png" alt="helmet" height="50rem" width="50rem">
        </div>
        <div class="itemInfo">
            <h3 class="itemTitle">
                Borsalino Helmet
            </h3>
            <h4 class="itemDescription">
                ${price} KR     
            </h4>
        </div>
        <div class="itemCounter">
            <div class="addButton">-</div>
            <div class="itemCount">1</div>
            <div class="removeButton">+</div>
        </div>
    </div>
  `

    document.getElementById("cartItems").appendChild(itemTemplate.content)
  }

/**
 * Creates and adds a bag html template to the cart
 * @param price the price of the bag
 */
  function addBag(price) {
    let itemTemplate = document.createElement("template")

    itemTemplate.innerHTML = `
    <div class="item">
        <div class="cartImages">
            <img src="../images/canvas-bag.png" alt="helmet" height="50rem" width="50rem">
        </div>
        <div class="itemInfo">
            <h3 class="itemTitle">
                Bag
            </h3>
            <h4 class="itemDescription">
                ${price} KR     
            </h4>
        </div>
        <div class="itemCounter">
            <div class="addButton">-</div>
            <div class="itemCount">1</div>
            <div class="removeButton">+</div>
        </div>
    </div>
  `
  }

/**
 * Creates and adds a chalk html template to the cart
 * @param price the price of the chalk
 */
  function addChalk(price) {
    let itemTemplate = document.createElement("template")

    itemTemplate.innerHTML = `
    <div class="item">
        <div class="cartImages">
            <img src="../images/canvas-bag.png" alt="helmet" height="50rem" width="50rem">
        </div>
        <div class="itemInfo">
            <h3 class="itemTitle">
                Bag
            </h3>
            <h4 class="itemDescription">
                ${price} KR     
            </h4>
        </div>
        <div class="itemCounter">
            <div class="addButton">-</div>
            <div class="itemCount">1</div>
            <div class="removeButton">+</div>
        </div>
    </div>
  `
  }
//TODO combine into 1 method
//Functions to add or remove items to the shopping cart backend
/**
 * Methods for adding items to the cart in the backend. First sends a GET request for the cart ID to the current user
 * then sends a PUT request with the model Number of the item to be added to the cart backend.
 * @param modelNumber the model number of the item to be added to the cart backend.
 */
  function addItem(modelNumber) {
    sendApiRequest("GET", "/users/" + cartUser + "/cartID", sendItem, null)

    function sendItem(cartID) {
      sendApiRequest("PUT", "/cart/" + cartID + "/addItem/" + modelNumber, addedSuccess)
    }

    function addedSuccess() {
      alert("Item was successfully added to cart")
    }
}

function emptyCart() {
  sendApiRequest("GET", "/users/" + cartUser + "/cartID", sendRequest, null)

  function sendRequest(cartID){
    sendApiRequest("PUT", "/api/cart/" + cartID + "/emptyCart", console.log, null)
    emptyHTMLCart();
  }
}