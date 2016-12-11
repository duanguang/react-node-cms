"use strict";
var error_handler_1 = require("./error-handler");
exports.routeConfig = function (app) {
    app.get('/image-proxy', require('./image-proxy'));
    app.get('/', require('./index'));
    //app.get('*', require('./index'));
    app.get("/bearcat", require("./bearcat"));
    app.post("/regist", require("../api/user/regist"));
    app.post("/registTest", require("../api/user/registTest"));
    app.use(error_handler_1.errRouter);
};
