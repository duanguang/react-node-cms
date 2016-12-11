"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (StateEnumResult) {
    StateEnumResult[StateEnumResult["Success"] = 1] = "Success";
    StateEnumResult[StateEnumResult["Empty"] = 0] = "Empty";
    StateEnumResult[StateEnumResult["Error"] = -1] = "Error";
    StateEnumResult[StateEnumResult["Timeout"] = -1000] = "Timeout";
    StateEnumResult[StateEnumResult["NotFound"] = -1010] = "NotFound";
    StateEnumResult[StateEnumResult["ServerError"] = 500] = "ServerError";
})(exports.StateEnumResult || (exports.StateEnumResult = {}));
var StateEnumResult = exports.StateEnumResult;
var ResponseOuterModel = (function () {
    function ResponseOuterModel(fromService) {
        if (fromService === void 0) { fromService = {}; }
        this.state = fromService.State;
        this.result = fromService.Result;
    }
    return ResponseOuterModel;
}());
exports.ResponseOuterModel = ResponseOuterModel;
var ResponseSuccessModel = (function () {
    function ResponseSuccessModel(errResponse) {
        this.result = errResponse.Result;
        this.state = errResponse.State;
        this.resultObject = this.getResultObject(this.result);
    }
    //noinspection JSMethodCanBeStatic
    ResponseSuccessModel.prototype.getResultObject = function (result) {
        if (result) {
            try {
                return JSON.parse(result);
            }
            catch (err) {
                console.error(err);
            }
        }
        return null;
    };
    return ResponseSuccessModel;
}());
exports.ResponseSuccessModel = ResponseSuccessModel;
var ResponseErrorModel = (function (_super) {
    __extends(ResponseErrorModel, _super);
    function ResponseErrorModel() {
        _super.apply(this, arguments);
    }
    ResponseErrorModel.getErrorResponseModel = function (params) {
        var responseInnerModel = {
            Message: params.message,
            Code: params.code
        };
        var responseOuterModel = {
            Result: JSON.stringify(responseInnerModel),
            State: params.state
        };
        return new ResponseErrorModel(responseOuterModel);
    };
    return ResponseErrorModel;
}(ResponseSuccessModel));
exports.ResponseErrorModel = ResponseErrorModel;
