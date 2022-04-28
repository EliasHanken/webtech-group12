/*
@Author: Thomas Ystenes
Class for generating and add product cards to HTML.
 */

function generateProductCard(){
    /* First product card */
    const PC1 = document.getElementById("carousel-card-1");
    let PC1ImgDiv = PC1.getElementsByClassName("card__img");
    PC1ImgDiv[0].innerHTML = "<img src='images/bike.png' alt='Image of a bike'>";

    /* Second product card */
    const PC2 = document.getElementById("carousel-card-2");
    let PC2ImgDiv = PC2.getElementsByClassName("card__img");
    PC2ImgDiv[0].innerHTML = "<img src='images/canvas-bag.png' alt='Image of a canvas bag'>";

    /* Third product card */
    const PC3 = document.getElementById("carousel-card-3");
    let PC3ImgDiv = PC3.getElementsByClassName("card__img");
    PC3ImgDiv[0].innerHTML = "<img src='images/borsalino_helmet.png' alt='Image of a borsalino helmet'>";

    /* Fourth product card */
    const PC4 = document.getElementById("carousel-card-4");
    let PC4ImgDiv = PC4.getElementsByClassName("card__img");
    PC4ImgDiv[0].innerHTML = "<img src='images/chalk.png' alt='Image of sticks of chalk'>";
}