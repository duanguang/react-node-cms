import {StringComparison} from "./EnumTool";
/**
 * Created by xiaoduan on 2016/11/7.
 */
export function equal(a:string,b:string,stringComparison?:StringComparison){
    switch (stringComparison){
        case StringComparison.OrdinalIgnoreCase:
            if(b.toLowerCase()===a.toLowerCase()){
                return true;
            }
        default:
            if(a===b){
                return true;
            }
    }
    return false;
}