import Axios from "axios";

export const crudPoli = (token, data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token, "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/api/poli"
    });
    return Promise.resolve(request);
};
