"use strict";
function response(res, result, statusCode, headers) {
    var defaultHeaders = {
        'Content-Type': 'application/json'
    };
    var defaultStatusCode = 200;
    res.writeHead(statusCode ? statusCode : defaultStatusCode, headers ? headers : defaultHeaders);
    res.end(result);
}
exports.response = response;
