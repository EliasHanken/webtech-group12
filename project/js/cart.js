
let cartTemplate = document.createElement("template");

cartTemplate.innerHTML = `
<div class="cartDiv">
    <div class="cartContainer">
        <div class="cartHeader">
            <h1 class="cartH1">Shopping Cart</h1>
            <h2 class="removeH2">Remove all</h2>
        </div>
    </div>
</div>
`

function append() {
  document.getElementById("cartModalDiv").appendChild(cartTemplate.content);
  document.getElementById("cartModalDiv").style.display = "block";
}

function close() {
  document.getElementById("cartModalDiv").style.display = "none";
}

window.onclick = function(event) {
  if (event.target === document.getElementById("cartModalDiv")) {
    document.getElementById("cartModalDiv").style.display = "none";
  }
}
