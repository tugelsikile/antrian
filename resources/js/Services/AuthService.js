import Axios from "axios";

export const loginSubmit = (data) => {
    let request = Axios({
        headers : { "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/auth/login"
    });
    return Promise.resolve(request);
};
export const me = (token) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token, "Accept" : "application/json" },
        method : "post", url : window.origin + "/api/auth/me"
    });
    return Promise.resolve(request);
};
