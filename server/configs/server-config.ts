/**
 * Created by DuanG on 2016/8/26.
 */
export const PROD="prod";
export const DEV='dev';
interface IserverConfig{
    timeout:number;
    port:number;
    env:"prod"|"dev";
}
export const SERVER_CONFIG:IserverConfig=require('../server-config.json');