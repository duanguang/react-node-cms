
import {errRouter} from "./error-handler";
export const routeConfig = (app)=> {
    app.get('/image-proxy', require('./image-proxy'));
    app.get('/', require('./index'));
    //app.get('*', require('./index'));
    app.get("/bearcat",require("./bearcat"));
    app.post("/regist",require("../api/user/regist"))
    app.post("/registTest",require("../api/user/registTest"));
    app.use(errRouter);
};