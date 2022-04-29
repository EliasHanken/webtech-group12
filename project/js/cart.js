
//Basic setup for the cart

let cartList = [];

let cartTemplate = document.createElement("template");

cartTemplate.innerHTML = `
<div class="cartDiv">
    <div class="cartContainer">
        <div class="cartHeader">
            <h1 class="cartH1">Shopping Cart</h1>
            <h2 class="removeH2" onclick="addTestItem()">Add Test Item</h2>
        </div>
            <div id="cartItems">
            </div>
        </div>
    </div>
</div>
`
//Functions for showing and hiding the cart

function openCart() {
  document.getElementById("cartModalDiv").appendChild(cartTemplate.content);
  document.getElementById("cartModalDiv").style.display = "block";
}

function requestCartList() {
  let request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8080/user/cart");
  request.send();

  request.onload = parseList;

  function parseList() {
    cartList = request.responseText;
  }
}


function close() {
  document.getElementById("cartModalDiv").style.display = "none";
}

window.onclick = function(event) {
  if (event.target === document.getElementById("cartModalDiv")) {
    document.getElementById("cartModalDiv").style.display = "none";
  }
}

//Functions for adding items to the cart
//TODO images not showing correctly

function addItems() {

  for(let i=0; i < cartList.length; i++) {

    let itemTemplate = document.createElement("template")

    itemTemplate.innerHTML = `
    <div class="item">
        <div class="cartImages">
            <img src="../images/borsalino_helmet.png" alt="helmet">
        </div>
        <div class="itemInfo">
            <h3 class="itemTitle">
                Borsalino Helmet
            </h3>
            <h4 class="itemDescription">
                123 KR     
            </h4>
        </div>
        <div class="itemCounter">
            <div class="addButton">+</div>
            <div class="itemCount">1</div>
            <div class="removeButton">-</div>
        </div>
    </div>
  `

    document.getElementById("cartItems").appendChild(itemTemplate.content)

  }
}

function addTestItem() {
  let itemTemplate = document.createElement("template")

  itemTemplate.innerHTML = `
    <div class="item">
        <div class="cartImages">
            <img src="../images/borsalino_helmet.png" alt="helmet" height="200", width="200">
        </div>
        <div class="itemInfo">
            <h3 class="itemTitle">
                Borsalino Helmet
            </h3>
            <h4 class="itemDescription">
                123 KR     
            </h4>
        </div>
        <div class="itemCounter">
            <div class="addButton">+</div>
            <div class="itemCount">1</div>
            <div class="removeButton">-</div>
        </div>
    </div>
  `

  document.getElementById("cartItems").appendChild(itemTemplate.content)
}
