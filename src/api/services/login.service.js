import APIKit from "../core/api-kit";
import { 
    API_CONFIG 
} from "../api.config";

export default function LoginService(payload,onSuccess,onFailure) {
    APIKit.post(API_CONFIG.LOGIN,payload)
    .then(onSuccess).catch(onFailure);
}