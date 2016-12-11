"use strict";
/**
 * Created by XD on 2016/7/12.
 */
var Platform;
(function (Platform) {
    Platform.open = "demo";
    Platform.admin = "src";
})(Platform = exports.Platform || (exports.Platform = {}));
exports.compilePath = './client/' + Platform.admin + "/index";
exports.serverProtocol = "http";
exports.serverHost = "127.0.0.1";
exports.serverPort = 3006;
exports.serverUri = exports.serverProtocol + "://" + exports.serverHost + ":" + exports.serverPort;
exports.serverHostClient = "127.0.0.1";
exports.serverPortClient = 3008;
exports.serverUriClient = exports.serverProtocol + "://" + exports.serverHostClient + ":" + exports.serverPortClient;
exports.hotReloadServerProtocol = 'http';
exports.hotReloadServerHost = '127.0.0.1';
exports.hotReloadServerPort = 3007;
exports.hotReloadServerUri = exports.hotReloadServerProtocol + "://" + exports.hotReloadServerHost + ":" + exports.hotReloadServerPort;
