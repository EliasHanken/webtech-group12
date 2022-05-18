/*
@Author: Thomas Ystenes
Class for generating and add product cards to HTML.
 */
/**
 * Generates product card skeleton, with ids for easy access to elements
 */
function generateProductCardSkeleton(){
    document.getElementById("owl-carousel-index-page").innerHTML =
        //FIRST CARD
        '<article class="card" id="carousel-card-1">' +
        '<div class="card-img" id="card-img-1">' +
        '<!-- Img tag goes here -->' +
        '</div>' +
        '<div class="card-name" id="card-name-1">' +
        '<!-- p tag with card name goes here --> ' +
        '</div>' +
        '<div class="card__precis">' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="heart-outline"></ion-icon>' +
        '   </a>' +
        '   <div>' +
        '       <span class="card-price" id="card-price-1"></span>' +
        '   </div>' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="cart-outline"></ion-icon>' +
        '   </a>' +
        '</div>' +
        //SECOND CARD
        '</article>' +'<article class="card" id="carousel-card-2">' +
        '<div class="card-img" id="card-img-2">' +
        '<!-- Img tag goes here -->' +
        '</div>' +
        '<div class="card-name" id="card-name-2">' +
        '<!-- p tag with card name goes here --> ' +
        '</div>' +
        '<div class="card__precis">' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="heart-outline"></ion-icon>' +
        '   </a>' +
        '   <div>' +
        '       <span class="card-price" id="card-price-2"></span>' +
        '   </div>' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="cart-outline"></ion-icon>' +
        '   </a>' +
        '</div>' +
        //THIRD CARD
        '</article>' +'<article class="card" id="carousel-card-3">' +
        '<div class="card-img" id="card-img-3">' +
        '<!-- Img tag goes here -->' +
        '</div>' +
        '<div class="card-name" id="card-name-3">' +
        '<!-- p tag with card name goes here --> ' +
        '</div>' +
        '<div class="card__precis">' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="heart-outline"></ion-icon>' +
        '   </a>' +
        '   <div>' +
        '       <span class="card-price" id="card-price-3"></span>' +
        '   </div>' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="cart-outline"></ion-icon>' +
        '   </a>' +
        '</div>' +
        //FOURTH CARD
        '</article>' +'<article class="card" id="carousel-card-4">' +
        '<div class="card-img" id="card-img-4">' +
        '<!-- Img tag goes here -->' +
        '</div>' +
        '<div class="card-name" id="card-name-4">' +
        '<!-- p tag with card name goes here --> ' +
        '</div>' +
        '<div class="card__precis">' +
        '   <a href="" class="card-icon">' +
        '       <ion-icon name="heart-outline"></ion-icon>' +
        '   </a>' +
        '   <div>' +
        '       <span class="card-price" id="card-price-4"></span>' +
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
function generateProductCardImgTags(imgTag1, imgTag2, imgTag3, imgTag4){
    document.getElementById("card-img-1").innerHTML =
        imgTag1
    document.getElementById("card-img-2").innerHTML =
        imgTag2
    document.getElementById("card-img-3").innerHTML =
        imgTag3
    document.getElementById("card-img-4").innerHTML =
        imgTag4
}

/**
 * Helper function to be called by generateProductCards().
 * Adds <p>-tags containing the name of the product displayed on the product cards.
 * @param nameTag1 tag for the first card
 * @param nameTag2 tag for the second card
 * @param nameTag3 tag for the third card
 * @param nameTag4 tag for the fourth card
 */
function generateProductCardNameTags(nameTag1, nameTag2, nameTag3, nameTag4){
    document.getElementById("card-name-1").innerHTML =
        nameTag1;
    document.getElementById("card-name-2").innerHTML =
        nameTag2;
    document.getElementById("card-name-3").innerHTML =
        nameTag3;
    document.getElementById("card-name-4").innerHTML =
        nameTag4;
}

/**
 * Helper function to be called by generateProductCards().
 * Adds price tags for the product displayed on the product cards.
 * @param priceTag1
 * @param priceTag2
 * @param priceTag3
 * @param priceTag4
 */
function generateProductCardPriceTags(priceTag1, priceTag2, priceTag3, priceTag4){
    document.getElementById("card-price-1").innerHTML =
        priceTag1;
    document.getElementById("card-price-2").innerHTML =
        priceTag2;
    document.getElementById("card-price-3").innerHTML =
        priceTag3;
    document.getElementById("card-price-4").innerHTML =
        priceTag4;
}

/**
 * Master function calling all other functions related to generating product cards.
 */
function generateProductCardsTotal(){
    generateProductCardSkeleton();

    generateProductCardImgTags(
        '<img src="images/bike.png" alt="Image of a bike">',
        '<img src="images/canvas-bag.png" alt="Image of a canvas bag">',
        '<img src="images/borsalino_helmet.png" alt="Image of a borsalino helmet">',
        '<img src="images/chalk.png" alt="Image of sticks of chalk">'
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
