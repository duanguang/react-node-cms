/**
 * Created by XD on 2016/9/10.
 */
const protoObj2String:Function=(val:any)=>Object.prototype.toString.call(val);
type VariableType = "Object"|"Number"|"Null"|"String"|"Boolean"|"Undefined"|"Array";

export function getType(val):string{
    return protoObj2String(val).replace(/^\[object (\w+)\]$/ig,'$1').toLowerCase();
}

export function isTargetType(val:any,...targetArr:VariableType[]){
    return targetArr.some((target:VariableType)=>{
        return protoObj2String(val) ===`[object ${target}]`;
    })
}

export function isUndefined(val:any):boolean{
    return typeof val==='undefined';
}

export function isString(val:any):boolean{
    return typeof val==='string';
}