/**
 * Created by XD on 2016/8/27.
 */
import {routeConfig} from '../routes/routeConfig';
import {staticResourceInit,staticConfig} from './staticConfig';
import {whmConfig} from './whmConfig';
import {bundlerConfig} from './bundlerConfig';
import {app} from '../routes/app';
export let webpackInit=()=>{

    bundlerConfig(app);
    whmConfig(app);
    staticResourceInit();
    routeConfig(app);

    webpackInit = ()=> {
        throw new Error('server/index.ts: server has been initialised.');
    }
}