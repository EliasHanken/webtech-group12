

const BASE_URL = calculatePath(); // Set this to whatever your BASE URL is

/**
 * Calculate absolute path.
 * @returns the directory of the project in absolute path.
 */
function calculatePath(){
    var currentPath = window.location.pathname;
    var newDir = currentPath.substring(0,currentPath.lastIndexOf("/"));
    return newDir;
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
    if(authenticatedUser){
        if(isAdmin(authenticatedUser)){
            addNavDiv("Admin","/admin.html");
        }
        addNavigationLink(`Welcome, ${authenticatedUser.username}!`, "/profile.html");
        addNavigationLink("Logout", null, doLogout);
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
