import APIKit from "../core/api-kit";
import { 
    API_CONFIG 
} from "../api.config";

function RegisterService(payload,onSuccess,onFailure) {
    APIKit.post(API_CONFIG.REGISTER, payload)
    .then(onSuccess).catch(onFailure);
}

function getRolesMasterService(onSuccess,onFailure) {
    APIKit.get(API_CONFIG.ROLES, payload={})
    .then(onSuccess).catch(onFailure);
}

function getStatesMasterService(onSuccess,onFailure) {
    APIKit.get(API_CONFIG.STATES, payload={})
    .then(onSuccess).catch(onFailure);
}

function getDistrictsMasterService(onSuccess,onFailure) {
    APIKit.get(API_CONFIG.DISTRICTS, payload={})
    .then(onSuccess).catch(onFailure);
}

export {
    RegisterService,
    getRolesMasterService,
    getStatesMasterService,
    getDistrictsMasterService
}