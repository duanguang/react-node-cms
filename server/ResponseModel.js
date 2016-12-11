"use strict";
(function (ApiStateEnum) {
    ApiStateEnum[ApiStateEnum["Success"] = 1] = "Success";
    ApiStateEnum[ApiStateEnum["Empty"] = 0] = "Empty";
    ApiStateEnum[ApiStateEnum["Error"] = -1] = "Error";
    ApiStateEnum[ApiStateEnum["AuthFail"] = 2] = "AuthFail";
    ApiStateEnum[ApiStateEnum["Timeout"] = -1000] = "Timeout";
    ApiStateEnum[ApiStateEnum["NotFound"] = -404] = "NotFound";
    ApiStateEnum[ApiStateEnum["ServerError"] = 500] = "ServerError";
})(exports.ApiStateEnum || (exports.ApiStateEnum = {}));
var ApiStateEnum = exports.ApiStateEnum;
var ResponseModel = (function () {
    function ResponseModel() {
    }
    // public static getEmptyResponseModel(errMessage:string) {
    //     let responseModel = new ResponseModel();
    //     responseModel.Result = {Message: errMessage};
    //     responseModel.State = ApiStateEnum.Empty;
    //     return responseModel;
    // }
    ResponseModel.getSuccessResponseModel = function (content) {
        var responseModel = new ResponseModel();
        responseModel.Result = content;
        responseModel.State = ApiStateEnum.Success;
        return responseModel;
    };
    ResponseModel.getErrorResponseModel = function (errMessage, state) {
        var responseModel = new ResponseModel();
        responseModel.Result = { Message: errMessage, Code: "" };
        responseModel.State = state ? state : ApiStateEnum.Error;
        return responseModel;
    };
    return ResponseModel;
}());
exports.ResponseModel = ResponseModel;
