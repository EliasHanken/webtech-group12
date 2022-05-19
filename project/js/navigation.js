

const BASE_URL = calculatePath(2); // Set this to whatever your BASE URL is

/**
 * Calculate absolute path.
 * @returns the directory of the project in absolute path.
 */
function calculatePath(parents){
    var currentPath = window.location.pathname;
    var newDir = currentPath.substring(0,currentPath.lastIndexOf("/"));
    var newDir2 = newDir.substring(0,newDir.lastIndexOf("/"));
    if(currentPath.split("/")[currentPath.split("/").length-1] == "index.html"){
        return newDir;
    }
    if(parents === 1){
        console.log(newDir);
        return newDir;
    }else if(parents === 2){
        console.log(newDir2);
        return newDir2;
    }
    console.log(currentPath);
    return currentPath;
}

/**
 * Create the navigation, adding links based on current user permission level
 */
function createNavigation() {
    addNavigationLink("Home", "/");
    addNavigationLink("Products", "/products.html");
    const authenticatedUser = getAuthenticatedUser();
    if (authenticatedUser) {
        if (isAdmin(authenticatedUser)) {
            addNavigationLink("Administration", "/admin.html");
        }
        addNavigationLink(`Welcome, ${authenticatedUser.username}!`, "/profile.html");
        addNavigationLink("Logout", null, doLogout);
    } else {
        addNavigationLink("Login", "/login.html");
        addNavigationLink("Sign up", "/signup.html");
    }
}

function createItems(){
    const authenticatedUser = getAuthenticatedUser();
    const testUser = parseJwtUser("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0FETUlOIn1dLCJpYXQiOjE2NTI5ODI3NzYsImV4cCI6MTY1Mjk4NjM3Nn0.c8jNbE9mHJyHc9q0tISKePPyYiqW5KKp5oRWK31wavQ");
    if(testUser){
        if(!isAdmin(testUser)){
            addNavDiv("Admin","/html/admin.html");
        }else{
            addNavDiv("About","/html/about.html");
            addNavDiv("Store","/html/store.html");
            addNavDiv("Support","/html/support.html");
            addNavDivCustom(`Welcome ${testUser.username}!`,null,".nav-personal-box");
            addNavDivCustom("Logout",null,".nav-personal-box",null,doLogout);
            addNavDivCustomWithI(".nav-personal-box","<a class=icons><i size=0.5rem id=login class='fa-solid fa-cart-shopping fa-2x'></i></a>",openCart);
        }

        //addNavDiv(`Welcome, ${authenticatedUser.username}!`, "html/profile.html");
        //addNavDiv("Logout", null, doLogout);
    }else{
        addNavDiv("About","/html/about.html");
        addNavDiv("Store","/html/store.html");
        addNavDiv("Support","/html/support.html");
        addNavDivCustom("Login","/html/login.html",".nav-personal-box");
        //addNavDivCustomWithI(".nav-personal-box","<a href=html/login.html class=icons><i size=0.5rem id=login class='fa-solid fa-circle-user fa-2x'></i></a>");
    }
}

/**
 * Add a single navigation link to the navigation area
 * @param title Title to be displayed
 * @param relativeUrl relative URL of the link
 * @param handlerFunction A function to be called on-click (instead of a link)
 */
function addNavigationLink(title, relativeUrl, handlerFunction) {
    const navList = document.querySelector(".navigation");
    const navItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = relativeUrl ? (BASE_URL + relativeUrl) : "#";
    if (handlerFunction) {
        anchor.addEventListener("click", handlerFunction);
    }
    anchor.innerText = title;
    navItem.appendChild(anchor);
    navList.appendChild(navItem);
}

function addNavDiv(title, relativeUrl,handlerFunction){
    const navContent = document.querySelector(".nav-bar-content");
    const navDiv = document.createElement("div");
    const anchor = document.createElement("a");
    anchor.href = relativeUrl ? (BASE_URL + relativeUrl) : "#";
    if (handlerFunction) {
        anchor.addEventListener("click", handlerFunction);
    }
    anchor.innerText = title;
    navDiv.appendChild(anchor);
    navContent.appendChild(navDiv);
}

function addNavDivCustom(title, relativeUrl,querySelector,customElement,handlerFunction){
    const navContent = document.querySelector(querySelector);
    const navDiv = document.createElement("div");
    const anchor = document.createElement("a");
    anchor.href = relativeUrl ? (BASE_URL + relativeUrl) : "#";
    if (handlerFunction) {
        anchor.addEventListener("click", handlerFunction);
    }
    anchor.innerText = title;
    if(customElement){
        anchor.innerHTML = customElement;
    }
    navDiv.appendChild(anchor);

    navDiv.style.display = "flex";
    navDiv.style.justifyContent = "center";
    navDiv.style.alignItems = "center";

    anchor.style.textAlign = "center";
    anchor.style.width = "100%";
    anchor.style.fontSize = "2rem";
    navContent.appendChild(navDiv);
}

function addNavDivCustomWithI(querySelector,customElement,handlerFunction){
    const navContent = document.querySelector(querySelector);
    const navDiv = document.createElement("div");
    
    if(customElement){
        navDiv.innerHTML = customElement;
    }
    if (handlerFunction) {
        navDiv.addEventListener("click", handlerFunction);
    }
    navContent.appendChild(navDiv);
}

/**
 * Redirect browser to given relative URL
 * @param frontendUrl URL, relative to frontend base URL
 */
function redirectTo(frontendUrl) {
    window.location = BASE_URL + frontendUrl;
}

function redirectToNoBase(frontendUrl) {
    window.location = frontendUrl;
}
