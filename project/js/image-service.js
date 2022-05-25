//handles business logic for images

import {API_BASE_URL, sendApiDeleteRequest, sendApiFileUploadRequest} from "./requests";

const IMAGE_URL = "/images";

/**
 * Send request to server to delete an image based on image id.
 * @param imageId ID of the image to be deleted
 * @param callback Callback function to call when operation is successful
 * @param errorCallback Callback function to call when operation fails
 */
export function deleteImageOnServer(imageId, callback, errorCallback){
    sendApiDeleteRequest(IMAGE_URL + "/" + imageId, callback, errorCallback)
}

/**
 * Upload image to server
 * @param image Image data
 * @param callback Callback function to call when operation is successful
 * @param errorCallback Callback function to call when operation fails
 */
export function uploadImageToServer(image, callback, errorCallback) {
    sendApiFileUploadRequest(IMAGE_URL, image, callback, errorCallback)
}

/**
 * Generate URL for fetching image with given ID
 * @param imageId ID of the image to fetch
 * @returns {string|null} full image URL or null if image ID is invalid (not an int number > 0)
 */
export function generateImageUrl(imageId) {
    if (imageId > 0) {
        return API_BASE_URL + IMAGE_URL + "/" + imageId
    } else {
        return null;
    }
}