/**
 * Created by XD on 2016/9/10.
 */
import * as objectHash from 'object-hash';
import {isTargetType} from "./general";

export interface IHash{
    hash(data:string|any):string;
}

class MD5Hash implements IHash{
    public hash(data:any):string{
        if(isTargetType(data,"Null","Undefined")){
            return void 0;
        }
        if(data===""){
            return "";
        }
        return objectHash.keysMD5(data);
    }
}
export let md5Hash=new MD5Hash();