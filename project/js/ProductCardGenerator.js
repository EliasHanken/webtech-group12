/*
@Author: Thomas Ystenes
Class for generating and add product cards to HTML.
 */

/* Lists containing bikes/products/images for generating product cards */
let PRODUCT_CARD_BIKES = [];
let PRODUCT_CARD_PRODUCTS = [];

/**
 * Generates product card skeleton, with ids for easy access to elements
 */
function generateProductCardSkeleton(){
    document.getElementById("owl-carousel-index-page").innerHTML =
        //FIRST CARD
        '<article class="card" id="carousel-card-1">' +
        '<a href="' + BASE_URL + '/html/store.html#commuter">' +
            '<div class="card-img-div">' +
                '<img src="" alt="" id="card-img-1" height="150px" width="200px">' +
            '</div>' +
        '</a>' +
        '<div class="card-name" id="card-name-1">' +
            '<P>' + PRODUCT_CARD_BIKES[0].bikeModelName + '</P>' +
        '</div>' +
        '<div class="card-precis">' +
        '   <div>' +
        '       <span class="card-price" id="card-price-1">' + PRODUCT_CARD_BIKES[0].price + ' kroner /min</span>' +
        '   </div>' +
        '</div>' +
        '</article>' +
        //SECOND CARD
        '<article class="card" id="carousel-card-2">' +
        '<a href="' + BASE_URL + '/html/store.html#textile-bag">' +
            '<div class="card-img-div">' +
                '<img src="" alt="" id="card-img-2" height="150px" width="200px">' +
            '</div>' +
        '</a>' +
        '<div class="card-name" id="card-name-2">' +
            '<p>' + PRODUCT_CARD_PRODUCTS[0].name + '</p>' +
        '</div>' +
        '<div class="card-precis">' +
        '   <div>' +
        '       <span class="card-price" id="card-price-2">' + PRODUCT_CARD_PRODUCTS[0].price + ' kroner</span>' +
        '   </div>' +
        '</div>' +
        '</article>' +
        //THIRD CARD
        '<article class="card" id="carousel-card-3">' +
        '<a href="' + BASE_URL + '/html/store.html#bicycle-helmet">' +
            '<div class="card-img-div">' +
                '<img src="" alt="" id="card-img-3" height="150px" width="200px">' +
            '</div>' +
        '</a>' +
        '<div class="card-name" id="card-name-3">' +
            '<p>' + PRODUCT_CARD_PRODUCTS[1].name +'</p>' +
        '</div>' +
        '<div class="card-precis">' +
        '   <div>' +
        '       <span class="card-price" id="card-price-3">' + PRODUCT_CARD_PRODUCTS[1].price + ' kroner</span>' +
        '   </div>' +
        '</div>' +
        //FOURTH CARD
        '</article>' +
        '<article class="card" id="carousel-card-4">' +
        '<a href="' + BASE_URL + '/html/store.html#custom-customization">' +
            '<div class="card-img-div">' +
                '<img src="" alt="" id="card-img-4" height="150px" width="200px">' +
            '</div>' +
        '</a>' +
        '<div class="card-name" id="card-name-4">' +
            '<p>' + PRODUCT_CARD_PRODUCTS[2].name +'</p>' +
        '</div>' +
        '<div class="card-precis">' +
        '   <div>' +
        '       <span class="card-price" id="card-price-4">' + PRODUCT_CARD_PRODUCTS[2].price + ' kroner</span>' +
        '   </div>' +
        '</div>'
}

/**
 * Helper function to be called by generateProductCards().
 * Adds img-tags to the cards created by generateProductCardSkeleton.
 * @param imgTag1 img tag for the first card
 * @param imgTag2 img tag for the second card
 * @param imgTag3 img tag for the third card
 * @param imgTag4 img tag for the fourth card
 */
function generateProductCardImgTags(){
    const dataType = "data:image/jpg;base64,"
    let imgTag1 = document.getElementById("card-img-1");
    imgTag1.src = dataType + PRODUCT_CARD_BIKES[0].imgData;
    imgTag1.alt = PRODUCT_CARD_BIKES[0].description;

    let imgTag2 = document.getElementById("card-img-2");
    imgTag2.src = dataType + PRODUCT_CARD_PRODUCTS[0].imgData;
    imgTag2.alt = PRODUCT_CARD_PRODUCTS[0].description;

    let imgTag3 = document.getElementById("card-img-3");
    imgTag3.src = dataType + PRODUCT_CARD_PRODUCTS[1].imgData;
    imgTag3.alt = PRODUCT_CARD_PRODUCTS[1].description;

    let imgTag4 = document.getElementById("card-img-4");
    imgTag4.src = dataType + PRODUCT_CARD_PRODUCTS[2].imgData;
    imgTag4.alt = PRODUCT_CARD_PRODUCTS[2].description;
}

function generateProductCardsTotal(products){
    getProductDataForCards();
    generateProductCardSkeleton();

    generateProductCardImgTags()
}


/**
 * Attempts to asynchronously fetch bike and product data + image from backend, and assign them
 * to the PRODUCT_CARD_PRODUCTS array.
 */
function getProductDataForCards(){
    sendApiGetRequest("/bikes", assignBikesToProductCardProducts, productCallbackOnFail, false);
    sendApiGetRequest("/products", assignProductsToProductCardProducts, productCallbackOnFail, false);
    console.log("End of getProductDataForCards()");
}

/**
 * Assigns the supplied products to the PRODUCT_CARD_PRODUCTS array.
 * Should NOT be used for adding bikes; use assignBikesToProductCardProducts() for that.
 * @param products Products to be assigned to list.
 */
function assignProductsToProductCardProducts(products){
    for(i = 0; i < products.length; i++){
        PRODUCT_CARD_PRODUCTS.push(products[i])
    }
}

/**
 * Assigns bikes in bikes to the PRODUCT_CARD_PRODUCTS array.
 * @param bikes Array of Bikes, the objects of which will be added to
 * PRODUCT_CARD_PRODUCTS.
 */
function assignBikesToProductCardProducts(bikes){
    for(i = 0; i < bikes.length; i++){
        PRODUCT_CARD_BIKES.push(bikes[i]);
    }
}

function productCallbackOnFail(){
    console.log("An error occurred on sendApiGetRequest.")
}


