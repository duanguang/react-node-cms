/**
 * Created by DuanG on 2016/11/16.
 */
import {JsonProperty, deserialize} from 'json-typescript-mapper';
import {StateEnumResult} from "common/commonResult";

export class VAuthEntity{

    @JsonProperty('Message')
    public message:string;

    @JsonProperty('Token')
    public token:string;

    public constructor(){
        this.token=void 0;
        this.message=void 0;
    }
}

export class VAuthPageEntity{
    public data:VAuthEntity;
    public state:StateEnumResult;
    public constructor(json?){
        json = json || {};
        this.state=json.state;
        this.data=this.parseUserLoginEntities(json.result);
    }
    private parseUserLoginEntities(info: VAuthEntity): VAuthEntity {
        info = info || new VAuthEntity();
        return deserialize(VAuthEntity, info);
    }
}