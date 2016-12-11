/**
 * Created by DuanG on 2016/11/24.
 */
import {StateEnumResult} from "commonResult";
export class SuccessEntity{
    public message:string;
    public constructor(){
        this.message=void 0;
    }
}
export class SuccessPageEntity{
    public data:SuccessEntity;
    public state:StateEnumResult;
    public constructor(json?){
        json = json || {};
        this.state=json.state;
        let info=new SuccessEntity();
        info.message=json.result;
        this.data=info;
    }
}