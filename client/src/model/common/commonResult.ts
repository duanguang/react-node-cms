
export enum StateEnumResult{
    Success=1,
    Empty=0,
    Error=-1,
    Timeout=-1000,
    NotFound=-404,
    ServerError=500,
    AuthFail=2
}
export interface IResponseErrorInnerModel{
    Message:string;
    Code:string;
}

export  interface IResponseOuterModel{
    Result?:string;
    State?:number;
}
export class ResponseOuterModel{
   public result:string;
    public state:number;
    constructor(fromService:any = {}){
        this.state=fromService.State;
        this.result=fromService.Result;
    }
}
export interface IResponseSuccessModel<T>{
    result:string;
    state:number;
    resultObject?:T;
}
export class ResponseSuccessModel<T> implements IResponseSuccessModel<T>{
    public result:string;
    public state:number;
    public resultObject:T;

    constructor(fromService:IResponseOuterModel) {
        this.result = fromService.Result;
        this.state = fromService.State;
        this.resultObject = this.getResultObject(this.result);
    }

    //noinspection JSMethodCanBeStatic
    protected getResultObject(result:string):T {
        if (result) {
            try {
                return JSON.parse(result)
            } catch (err) {
                console.error(err);
            }
        }
        return null;
    }
}
export class ResponseErrorModel extends ResponseSuccessModel<IResponseErrorInnerModel> {
    public static getErrorResponseModel(params:{message:string,code:string,state:number}):ResponseErrorModel {
        let responseInnerModel:IResponseErrorInnerModel = {
            Message: params.message,
            Code: params.code
        };
        let responseOuterModel:IResponseOuterModel = {
            Result: JSON.stringify(responseInnerModel),
            State: params.state
        };
        return new ResponseErrorModel(responseOuterModel)
    }
}