import Axios from 'axios';

export const crudSettingAplikasi = (token, data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token, "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/api/setting/aplikasi"
    });
    return Promise.resolve(request);
};
export const crudSettingPrinter = (token, data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token, "Accept" : "application/json" },
        method : "post", data : data, url : window.origin + "/api/setting/printer"
    });
    return Promise.resolve(request);
};
