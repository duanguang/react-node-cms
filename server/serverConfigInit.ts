/**
 * Created by DuanG on 2016/8/26.
 */
import {routesInit} from './routes/routeInit';
import {parserInit} from './configs/parserInit';
import {staticResourceInit} from './configs/staticConfig';
import {bearcatInit} from './configs/bearcatConfig';
import {app} from './routes/app';
export let serverInit=()=>{
    parserInit();
    staticResourceInit();
    routesInit();
    bearcatInit(app);
    serverInit = ()=> {
        throw new Error('server/index.ts: server has been initialised.');
    }
}