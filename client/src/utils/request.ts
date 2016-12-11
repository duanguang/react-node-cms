import * as request from 'superagent';

const DefaultOption = {
    processData: false,
    dataType: 'json',
    contentType: 'application/json'
};

export interface IRequestOption {

}

export function post(url:string, data?:Object, option?:IRequestOption):Promise<any> {
    return new Promise<any>((resolve, reject) => {
        request.post(url)
            .set(option==undefined?DefaultOption:option)
            //.set(option)
            .send(data)
            .withCredentials()
            .end(function (err, res) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.body);
            })
    });
}

export function get(url:string, data?:Object, option?:IRequestOption):Promise<any> {
    return new Promise((resolve, reject) => {
        request.get(url)
            .set(DefaultOption)
            //.set(option)
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