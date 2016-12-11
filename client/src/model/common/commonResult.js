export var StateEnumResult;
(function (StateEnumResult) {
    StateEnumResult[StateEnumResult["Success"] = 1] = "Success";
    StateEnumResult[StateEnumResult["Empty"] = 0] = "Empty";
    StateEnumResult[StateEnumResult["Error"] = -1] = "Error";
    StateEnumResult[StateEnumResult["Timeout"] = -1000] = "Timeout";
    StateEnumResult[StateEnumResult["NotFound"] = -404] = "NotFound";
    StateEnumResult[StateEnumResult["ServerError"] = 500] = "ServerError";
    StateEnumResult[StateEnumResult["AuthFail"] = 2] = "AuthFail";
})(StateEnumResult || (StateEnumResult = {}));
export class ResponseOuterModel {
    constructor(fromService = {}) {
        this.state = fromService.State;
        this.result = fromService.Result;
    }
}
export class ResponseSuccessModel {
    constructor(fromService) {
        this.result = fromService.Result;
        this.state = fromService.State;
        this.resultObject = this.getResultObject(this.result);
    }
    //noinspection JSMethodCanBeStatic
    getResultObject(result) {
        if (result) {
            try {
                return JSON.parse(result);
            }
            catch (err) {
                console.error(err);
            }
        }
        return null;
    }
}
export class ResponseErrorModel extends ResponseSuccessModel {
    static getErrorResponseModel(params) {
        let responseInnerModel = {
            Message: params.message,
            Code: params.code
        };
        let responseOuterModel = {
            Result: JSON.stringify(responseInnerModel),
            State: params.state
        };
        return new ResponseErrorModel(responseOuterModel);
    }
}
