import APIKit, { clientToken } from "../core/api-kit";
import { 
    API_CONFIG 
} from "../api.config";

function getUserDetails(onSuccess,onFailure) {
    clientToken.getAccessToken().then(accessToken => {
        console.log(accessToken);
        APIKit.get(API_CONFIG.USER_DETAILS,{ params: { 
            token : accessToken
        }})
        .then(onSuccess).catch((e)=>{console.log(e);clientToken.tokenExpired(onFailure)}); 
    }).catch(e => {
        console.log(e); 
     });
}

function updateUserDetails(payload,onSuccess,onFailure) {
    clientToken.getAccessToken().then(accessToken => {
        APIKit.post(API_CONFIG.USER_DETAILS, payload, { params: {
            token : accessToken
        }})
        .then(onSuccess).catch((error)=>{clientToken.tokenExpired(onFailure)}); 
    }).catch(e => {
       console.log(e); 
    });
}

function getVendorList(onSuccess,onFailure) {
    clientToken.getAccessToken().then(accessToken => {
        APIKit.get(API_CONFIG.GET_VENDORS, { params: {
            token : accessToken
        }})
        .then(onSuccess).catch((error)=>{clientToken.tokenExpired(onFailure)}); 
    }).catch(e => {
       console.log(e); 
    });
}

export {
    getUserDetails,
    updateUserDetails,
    getVendorList
};