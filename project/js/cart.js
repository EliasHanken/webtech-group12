//TODO Fix sending cart info to backend
//TODO add waiting symbol when waiting for cart response
//Basic setup for the cart

let cartList = [];

let cartTemplate = document.createElement("template");

cartTemplate.innerHTML = `
<div class="cartDiv">
    <div class="cartContainer">
        <div class="cartHeader">
            <h1 class="cartH1">Shopping Cart</h1>
            <h2 class="removeH2" onclick="addBike(123)">Remove all items</h2>
        </div>
        <div id="cartItems">
        </div>
        <div class="cartFooter">
            <a href="../html/checkout.html"><button class="checkOutButton">To Checkout!</button>
        </div>
    </div>
</div>
`
function requestCartID() {
  let cartID = "";
  let cartUser = getAuthenticatedUser().username;
  let request = new XMLHttpRequest();
  request.open("GET","http://localhost:8080/users/" + cartUser + "/cartID");
  request.send();

  request.onload = extractCartID;

  function extractCartID() {
    cartID = request.responseText;
  }
  return cartID;
}
function requestCartList(cartID) {
  let requestItems = new XMLHttpRequest();
  requestItems.open("GET", "http://localhost:8080/cart/" + cartID + "/items");
  requestItems.send();

  requestItems.onload = parseListItems;

  function parseListItems() {
    let response = requestItems.responseText;
    cartList = JSON.parse(response)
    addItemsFromRetrievedList(cartList)
  }

  let requestBikes = new XMLHttpRequest();
  requestBikes.open("GET", "http://localhost:8080/cart/" + cartID + "/bikes");
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
          if (cartList[i].itemID[2] === "1") {
            addBike(cartList[i].price);
          }
          if (cartList[i].itemID[2] === "2") {
            addHelmet(cartList[i].price);
          }
          if (cartList[i].itemID[2] === "5") {
            addBag(cartList[i].price);
          }
      }
    }
  }
}

//Functions for showing and hiding the cart

  function openCart() {
    document.getElementById("cartModalDiv").appendChild(cartTemplate.content);
    document.getElementById("cartModalDiv").style.display = "block";
    requestCartList(requestCartID());
  }

  function emptyCart() {
    let cartChildren = document.getElementById("cartItems");

    while (cartChildren.hasChildNodes()) {
      cartChildren.removeChild(cartChildren.lastChild)
    }
  }


  function close() {
    document.getElementById("cartModalDiv").style.display = "none";
    emptyCart();
  }

  window.onclick = function (event) {
    if (event.target === document.getElementById("cartModalDiv")) {
      document.getElementById("cartModalDiv").style.display = "none";
      emptyCart();
    }
  }


//Functions for adding independent items to the cart

//TODO images not showing correctly on index
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