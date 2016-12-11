import {CurrentMenu} from "../../model/menu/currentMenu";
import {resolve} from "url";
/**
 * Created by xiaoduan on 2016/11/17.
 */

export function getCurrentMenu(currentMenu:CurrentMenu){
    return new Promise((resolve)=>{
        resolve(currentMenu);
    });
}