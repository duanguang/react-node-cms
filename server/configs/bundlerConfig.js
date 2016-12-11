"use strict";
exports.bundlerConfig = function (app) {
    // We require the bundler inside the if block because
    // it is only needed in a development environment. Later
    // you will see why this is a good idea
    require('../../webpack-dev-server')(app);
};
