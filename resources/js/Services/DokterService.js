import Axios from "axios";

export const crudDokter = (token, data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token, "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/api/dokter"
    });
    return Promise.resolve(request);
};
