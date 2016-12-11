import * as request from 'superagent';
const DefaultOption = {
    processData: false,
    dataType: 'json',
    contentType: 'application/json'
};
export function post(url, data, option) {
    return new Promise((resolve, reject) => {
        request.post(url)
            .set(option == undefined ? DefaultOption : option)
            .send(data)
            .withCredentials()
            .end(function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.body);
        });
    });
}
export function get(url, data, option) {
    return new Promise((resolve, reject) => {
        request.get(url)
            .set(DefaultOption)
            .query(data)
            .end(function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.body);
        });
    });
}
