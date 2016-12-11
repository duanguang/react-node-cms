export enum ApiStateEnum{
    Success = 1,
    Empty = 0,
    Error = -1,
    AuthFail=2,
    Timeout=-1000,
    NotFound=-404,
    ServerError=500
}

export interface ErrorResponseInnerModel {
    Message:string;
    Code:string;
}


export class ResponseModel {
    public Result:any|ErrorResponseInnerModel;
    public State:ApiStateEnum;

    // public static getEmptyResponseModel(errMessage:string) {
    //     let responseModel = new ResponseModel();
    //     responseModel.Result = {Message: errMessage};
    //     responseModel.State = ApiStateEnum.Empty;
    //     return responseModel;
    // }

    public static getSuccessResponseModel(content:any) {
        let responseModel = new ResponseModel();
        responseModel.Result = content;
        responseModel.State = ApiStateEnum.Success;
        return responseModel;
    }

     public static getErrorResponseModel(errMessage,state?:ApiStateEnum) {
         let responseModel = new ResponseModel();
         responseModel.Result = {Message: errMessage,Code:""};
         responseModel.State =state?state:ApiStateEnum.Error;
         return responseModel;
     }
}