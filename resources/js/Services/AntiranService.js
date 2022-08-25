import Axios from 'axios';

export const crudAntrian = (token, data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token, "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/api/antrian"
    });
    return Promise.resolve(request);
};
export const callAntrian = (token, data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token, "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/api/antrian/call"
    });
    return Promise.resolve(request);
};
export const guestAntrian = (data) => {
    let request = Axios({
        headers : { "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/api/antrian"
    });
    return Promise.resolve(request);
};
