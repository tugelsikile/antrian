import Axios from 'axios';

export const getPoli = () => {
    let request = Axios({
        headers : { "Accept" : "application/json" },
        method : "post", url : window.origin + "/api/tamu/poli"
    });
    return Promise.resolve(request);
};
export const submitAntrian = (data) => {
    let request = Axios({
        headers : { "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/api/tamu/submit-antrian"
    });
    return Promise.resolve(request);
};
export const currentAntrian = (data) => {
    let request = Axios({
        headers : { "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/api/tamu/current-antrian"
    });
    return Promise.resolve(request);
};
