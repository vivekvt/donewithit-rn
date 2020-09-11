import { create } from "apisauce";
import cache from "../utility/cache";
import { replace } from "formik";

const apiClient = create({
    baseURL: "https://donewithit-vt.herokuapp.com/api",
});

const get = apiClient.get;
apiClient.get = async(url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);

    if (response.ok) {
        cache.store(url, response.data);
        return response;
    }

    const data = await cache.get(url);
    return data ? { ok: true, data } : reponse;
};

export default apiClient;