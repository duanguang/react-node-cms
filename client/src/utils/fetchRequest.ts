/**
 * Created by xiaoduan on 2016/11/10.
 */
import  fetch from 'isomorphic-fetch';
import {requestFactory} from "./requestFactory";
import {ResponseOuterModel,StateEnumResult} from "../model/common/commonResult";
import {ErrorPageEntity} from "../model/common/errorEntity";
export type IResponseModel = ResponseOuterModel;

export interface IFetchRequestOption extends RequestInit{
    params?:Object;
    body?:string;
    method?:'get'|'post';
    Clazz?:new (json?)=>any;
}

interface IRequestConfigs{
    url:string;
    options:IFetchRequestOption;
}

interface Interceptor{
    request?:(config:IRequestConfigs)=>IPromise|any;
    response?:(response)=>IPromise|any;
    responseReject?:(response)=>IPromise|any;
}

class RequestInterceptor{

    public requests:Array<(config:IRequestConfigs)=>IPromise|any>;
    public responses:Array<(response)=>IPromise|any>;
    public responseRejects:Array<(response)=>IPromise|any>;

    public constructor(){
        this.requests=[];
        this.responses=[];
        this.responseRejects=[];
    }

    public register(interceptor:Interceptor){
        const {requests,responses,responseRejects}=this;
        const {request,response,responseReject}=interceptor;
        request&&requests.push(request);
        response&&responses.push(response);
        responseReject&&responseRejects.push(responseReject);
    }

    private wrapClazzPromise(promise:IPromise,Clazz?:new (json?)=>any){
        if(Clazz){
            return promise.then((data:any)=>{
                if(data.state===StateEnumResult.Error){
                    Clazz=ErrorPageEntity;
                }
                return new Clazz(data);
            },(error)=>{//处理Promise.reject
                Clazz=ErrorPageEntity;
                return new Clazz(error);
            })
        }
        return promise;
    }
    public get(url: string, Clazz?: new (json?)=>void);
    public get(url: string, data?: Object, options?: IFetchRequestOption);
    public get(url:string,data?:Object,Clazz?:new (json?)=>any,options?:IFetchRequestOption){
        // 重载
        if (typeof data === 'function') {
            Clazz = data as any;
        }
        if (typeof Clazz === `object`) {
            options = Clazz;
        }
        options=options||{};
        data&&(options.params=data);
        options.method='get';
        let promise=this.send({url,options});
        promise = this.wrapClazzPromise(promise, Clazz);
        return promise;
    }

    public post(url: string, Clazz?: new (json?)=>void);
    public post(url: string, data?: Object, options?: IFetchRequestOption);
    public post(url: string, data?: Object, Clazz?: new (json?)=>void, options?: IFetchRequestOption) {
        // 重载
        if (typeof data === 'function') {
            Clazz = data as any;
        }
        if (typeof Clazz === `object`) {
            options = Clazz;
        }
        options = options || {};
        data && (options.body = JSON.stringify(data));
        options.method = 'post';
        let promise = this.send({url, options});
        promise = this.wrapClazzPromise(promise, Clazz);
        return promise;
    }

    public send(configs:IRequestConfigs){
        const {requests,responses,responseRejects}=this;
        //遍历请求前的拦截方法
        const requestPromise=requests.reduce((prev:IPromise,cur)=>{
            //console.log(cur);
            //console.log(prev);
            return prev.then(cur);
        },Promise.resolve(configs));

        //请求
        let response=requestPromise.then((configs:IRequestConfigs)=>{
            var paramsArray=[];
            let params=configs.options.params;
            if(params instanceof Object){
                Object.keys(params).forEach(key =>{
                        paramsArray.push(`${key}=${params[key]}`)
                });
                if(paramsArray.length>0) {
                    configs.url = configs.url.concat('?', paramsArray.join('&'));
                }
            }
            //
            return fetch(configs.url,configs.options);
        });
        // 遍历返回后的拦截失败方法
        response = responses.reduce((prev: IPromise, cur)=> {
            return prev.then(cur);
        }, response);
        // 遍历返回后的拦截失败方法
        return responseRejects.reduce((prev: IPromise, cur)=> {
            return prev.then(void 0, cur);
        }, response);
    }
}

const requestInterceptor = new RequestInterceptor();

//注册拦截请求, 默认所有请求返回json格式
requestInterceptor.register({
    request: (configs: IRequestConfigs)=> {
        let headers = configs.options.headers = configs.options.headers || {};
        headers[`Content-Type`] = `application/json`;
        configs.options.credentials='include';
        return configs;
    },
});

//注册请求, 请求默认携带验证参数
requestInterceptor.register({
    request: (configs: IRequestConfigs)=> {
        let headers = configs.options.headers = configs.options.headers || {};
       // headers['Kad_O2O_LoginName'] = VAuthEntity.getAuth().loginName;
       // headers['Kad_O2O_Token'] = VAuthEntity.getAuth().token;
        return configs;
    }
});

requestInterceptor.register({
    response: (response: IResponse)=> {
        return response.json();
    }
});

requestInterceptor.register({
    //response已经被反序列化, 返回了对应对象
    response: (response: Object)=> {
        const responseModel = new ResponseOuterModel(response);
        if (responseModel.state === StateEnumResult.ServerError) {
            return Promise.reject(responseModel);
        }
        else if(responseModel.state === StateEnumResult.AuthFail){
            return Promise.reject(responseModel);
        }
        return responseModel;
    }
});

requestInterceptor.register({
    responseReject: (response: any)=> {
        //类型转换失败
        if (response instanceof TypeError) {
            console.error(response);
        }
        //请求失败
        else if (response instanceof ResponseOuterModel) {
            requestFactory.emitErrorHandler(response);
        }

        return Promise.reject(response);
    }
});

export const get = requestInterceptor.get.bind(requestInterceptor);
export const post = requestInterceptor.post.bind(requestInterceptor);