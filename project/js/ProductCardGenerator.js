/*
@Author: Thomas Ystenes
Class for generating and add product cards to HTML.
 */

/* List containing products for generating product cards */
let PRODUCT_CARD_PRODUCTS = [];
let PRODUCT_CARD_IMAGES = [];

/**
 * Generates product card skeleton, with ids for easy access to elements
 */
function generateProductCardSkeleton(){
    document.getElementById("owl-carousel-index-page").innerHTML =
        //FIRST CARD
        '<article class="card" id="carousel-card-1">' +
        '<div class="card-img-div" id="card-img-1">' +
        '<!-- Img tag goes here -->' +
        '</div>' +
        '<div class="card-name" id="card-name-1">' +
        '<P>' + PRODUCT_CARD_PRODUCTS[0].bikeModelName + '</P>' +
        '</div>' +
        '<div class="card__precis">' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="heart-outline"></ion-icon>' +
        '   </a>' +
        '   <div>' +
        '       <span class="card-price" id="card-price-1">' + PRODUCT_CARD_PRODUCTS[0].price + ' /min</span>' +
        '   </div>' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="cart-outline"></ion-icon>' +
        '   </a>' +
        '</div>' +
        //SECOND CARD
        '</article>' +'<article class="card" id="carousel-card-2">' +
        '<div class="card-img-div" id="card-img-2">' +
        '<!-- Img tag goes here -->' +
        '</div>' +
        '<div class="card-name" id="card-name-2">' +
        '<p>' + PRODUCT_CARD_PRODUCTS[1].name + '</p>' +
        '</div>' +
        '<div class="card__precis">' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="heart-outline"></ion-icon>' +
        '   </a>' +
        '   <div>' +
        '       <span class="card-price" id="card-price-2">' + PRODUCT_CARD_PRODUCTS[1].price + '</span>' +
        '   </div>' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="cart-outline"></ion-icon>' +
        '   </a>' +
        '</div>' +
        //THIRD CARD
        '</article>' +'<article class="card" id="carousel-card-3">' +
        '<div class="card-img-div" id="card-img-3">' +
        '<!-- Img tag goes here -->' +
        '</div>' +
        '<div class="card-name" id="card-name-3">' +
        '<p>' + PRODUCT_CARD_PRODUCTS[2].name +'</p>' +
        '</div>' +
        '<div class="card__precis">' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="heart-outline"></ion-icon>' +
        '   </a>' +
        '   <div>' +
        '       <span class="card-price" id="card-price-3">' + PRODUCT_CARD_PRODUCTS[2].price + '</span>' +
        '   </div>' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="cart-outline"></ion-icon>' +
        '   </a>' +
        '</div>' +
        //FOURTH CARD
        '</article>' +'<article class="card" id="carousel-card-4">' +
        '<div class="card-img-div" id="card-img-4">' +
        '<!-- Img tag goes here -->' +
        '</div>' +
        '<div class="card-name" id="card-name-4">' +
        '<p>' + PRODUCT_CARD_PRODUCTS[3].name + '</p>' +
        '</div>' +
        '<div class="card__precis">' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="heart-outline"></ion-icon>' +
        '   </a>' +
        '   <div>' +
        '       <span class="card-price" id="card-price-4">' + PRODUCT_CARD_PRODUCTS[3].price + '</span>' +
        '   </div>' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="cart-outline"></ion-icon>' +
        '   </a>' +
        '</div>' +
        '</article>'
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
    //document.getElementById("card-img-1").src = "fasd";
    //document.getElementById("card-img-1").innerHTML =
    //    '<img src="images/textile-bag-cropped.jpg" alt="Image of a canvas bag">'
    document.getElementById("card-img-1").innerHTML =
        '<img src="' + PRODUCT_CARD_IMAGES[0] + '" alt="Image of a canvas bag">'
        document.getElementById("card-img-2").innerHTML =
            '<img src="images/textile-bag-cropped.jpg" alt="Image of a canvas bag">'
    document.getElementById("card-img-3").innerHTML =
        '<img src="images/bike-helmet-cropped.jpg" alt="Image of a borsalino helmet">',
    document.getElementById("card-img-4").innerHTML =
        '<img src="images/chalk.jpg" alt="Image of sticks of chalk">'

    /*
    const imgTag = document.getElementById("card-img-1")
    console.log("src before: " + imgTag.src);
    //document.getElementById("card-img-1").src = PRODUCT_CARD_IMAGES[0].src;
    console.log("src after: " + document.getElementById("card-img-1").src)
     */
}

/**
 * Master function calling all other functions related to generating product cards.
 */
function generateProductCardsTotalOld(){
    generateProductCardSkeleton();

    generateProductCardImgTags(
        '<img src="images/bike.jpg" alt="Image of a bike">',
        '<img src="images/textile-bag-cropped.jpg" alt="Image of a canvas bag">',
        '<img src="images/bike-helmet-cropped.jpg" alt="Image of a borsalino helmet">',
        '<img src="images/chalk.jpg" alt="Image of sticks of chalk">'
    )

    generateProductCardNameTags(
        '<p>Bike</p>',
        '<p>Canvas bag</p>',
        '<p>Borsalino helmet</p>',
        '<p>Chalk</p>'
    )

    generateProductCardPriceTags(
        "1/min",
        "100",
        "150",
        "250"
    )
}

function generateProductCardsTotal(products){
    getProductDataForCards();
    generateProductCardSkeleton();
    //generateProductCardSkeleton(products);


    generateProductCardImgTags(
        //'<img src="images/bike.jpg" alt="Image of a bike">',
    //'<img src="https://i5.walmartimages.com/asr/3f3091dd-b7fe-4182-8596-87fc0aa7f83f.ef8ba555d0f1375798000d14d92bc733.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" alt="Picture of bike">',
        '<img src="images/textile-bag-cropped.jpg" alt="Image of a canvas bag">',
        '<img src="images/bike-helmet-cropped.jpg" alt="Image of a borsalino helmet">',
        '<img src="images/chalk.jpg" alt="Image of sticks of chalk">'
    )
}


/**
 * Attempts to asynchronously fetch bike and product data + image from backend, and assign them
 * to the PRODUCT_CARD_PRODUCTS array.
 */
function getProductDataForCards(){
    console.log("Requesting product data for cards...");
    sendApiGetRequest("/bikes/8", assignToProductCardProducts, productCallbackOnFail, false);
    sendApiGetRequest("/products", assignToProductCardProducts, productCallbackOnFail, false);
    console.log("Request done - > " + PRODUCT_CARD_PRODUCTS)
    //sendApiGetRequest("/images/" + PRODUCT_CARD_PRODUCTS[0].imgId,
    //    populateImageTag, productCallbackOnFail, false);
    let image  = null;
    image = sendApiGetImageRequest("/images/" + PRODUCT_CARD_PRODUCTS[0].imgId,
        assignToProductCardImages, productCallbackOnFail, false);
}

/**
 * Assigns the supplied products to the PRODUCT_CARD_PRODUCTS array.
 * @param products Products to be assigned to list.
 */
function assignToProductCardProducts(products){
    //If products is an array:
    if(Array.isArray(products)) {
        for (let i = 0; i < products.length; i++) {
            //console.log(products[i]);
            PRODUCT_CARD_PRODUCTS.push(products[i]);
        }
    } else { //Of products is NOT an array, I.E, single item
        PRODUCT_CARD_PRODUCTS.push(products)
    }
}

/**
 * Assigns the supplied image(s) to the PRODUCT_CARD_IMAGES array;
 * @param image Images to be assigned to the list.
 */
function assignToProductCardImages(images){
    //console.log("Is this it?: " + image)
    //document.getElementById("card-img-1").src = image.src;

    //If images is an array
    if(Array.isArray(images)) {
        for (let i = 0; i < images.length; i++) {
            PRODUCT_CARD_IMAGES.push((images[i]))
        }
    } else {    //If images is NOT an array, I.E, single item
        PRODUCT_CARD_IMAGES.push(images);
    }
}

function productCallbackOnFail(){
    console.log("An error occurred on sendApiGetRequest.")
}


