/**
 * Created by XD on 2016/7/12.
 */
export module Platform{
    export var open="demo";
    export var admin="src";
}
export const compilePath='./client/'+Platform.admin+"/index";
export const serverProtocol="http";

export const serverHost="127.0.0.1";
export const serverPort=3006;
export const serverUri=serverProtocol+"://"+serverHost+":"+serverPort;

export const serverHostClient="127.0.0.1";
export const serverPortClient=3008;
export const serverUriClient=serverProtocol+"://"+serverHostClient+":"+serverPortClient;

export const hotReloadServerProtocol = 'http';
export const hotReloadServerHost = '127.0.0.1';
export const hotReloadServerPort = 3007;
export const hotReloadServerUri = hotReloadServerProtocol + "://" + hotReloadServerHost + ":" + hotReloadServerPort;