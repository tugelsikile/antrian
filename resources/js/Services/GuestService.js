import Axios from 'axios';

export const getPoli = () => {
    let request = Axios({
        headers : { "Accept" : "application/json" },
        method : "post", url : window.origin + "/api/tamu/poli"
    });
    return Promise.resolve(request);
};
export const submitAntrian = () => {
    let request = Axios({
        headers : { "Accept" : "application/json" },
        method : "post", url : window.origin + "/api/tamu/submit-antrian"
    });
    return Promise.resolve(request);
};
