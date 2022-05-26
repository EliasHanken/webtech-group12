// All code for sending requests to backend is stored in this file

// The base path where the API is running
// TODO - make this dynamic
const API_BASE_URL = "http://localhost:8080/api";


/**
 * Semd HTTP GET REST-API request to backend
 * @param url relative URL of the API endpoint
 * @param callback  Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param errorCallback A function called when the response code is NOT 200. Two parameters will
 * be passed to the function: HTTP response code and response body (as text)
 */
function sendApiGetRequest(url, callback, errorCallback){
    sendApiRequest("get", url, callback, null, errorCallback)
}

/**
 * Send HTTP PUT RESP-API request to backend
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on seccess, with response data (JSON-encoded) as the parameter
 * @param requestBody When supplied, send this data in the request body.
 * @param errorCallback Function called when the response code is not 200. Two parameters will
 * be passed to the function. HTTP response code and response body (as text)
 */
function sendApiPostRequest(url, callback, requestBody, errorCallback){
    sendApiRequest("put", url, callback, requestBody, errorCallback)
}

/**
 * Send an HTTP GET REST-API request to the backend
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param errorCallback A function called when the response code is not 200. Two parameters will be passed
 * to the function: HTTP response code and response body (as text)
 */
function sendApiDeleteRequest(url, callback, errorCallback) {
    sendApiRequest("delete", url, callback, null, errorCallback)
}

/**
 * Send an HTTP POST REST-API request with multipart form-data to the backend
 * @param url relative URL of the API endpoint
 * @param fileContent Content of the file to upload
 * @param callback Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param errorCallback A function called when the response code is not 200. Two parameters will be passed
 * to the function: HTTP response code and response body (as text)
 */
function sendApiFileUploadRequest(url, fileContent, callback, errorCallback) {
    sendApiRequest("post", url, callback, null, errorCallback, fileContent)
}

/**
 * Send a REST-API request to the backend
 * @param method The method to use: GET, POST, PUT, DELETE
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on success, with response text as the parameter
 * @param requestBody When supplied, send this data in the request body. Does not work with HTTP GET!
 * @param errorCallback A function called when the response code is not 200
 */
function sendApiRequest(method, url, callback, requestBody, errorCallback) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let responseJson = "";
                if (request.responseText) {
                    responseJson = JSON.parse(request.responseText);
                }
                callback(responseJson);
            } else if (errorCallback) {
                errorCallback(request.responseText);
            } else {
                console.error("Error in API request");
            }
        }
    };
    request.open(method, API_BASE_URL + url);
    const jwtToken = getCookie("jwt");
    if (jwtToken) {
        request.setRequestHeader("Authorization", "Bearer " + jwtToken);
    }
    if (requestBody) {
        if (method.toLowerCase() !== "get") {
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(requestBody));
        } else {
            console.error("Trying to send request data with HTTP GET, not allowed!")
            request.send();
        }
    } else {
        request.send();
    }
}
