/**
 * Created by DuanG on 2016/11/14.
 */
import {JsonProperty, deserialize} from 'json-typescript-mapper';
import {StateEnumResult} from "commonResult";
export class ErrorEntity{
    @JsonProperty('Code')
    public code:string;

    @JsonProperty('Message')
    public message:string;


    public constructor(){
        this.code=void 0;
        this.message=void 0;
    }
}
export class ErrorPageEntity{
    public data:ErrorEntity;
    public state:StateEnumResult;
    public constructor(json?){
        json = json || {};
        this.state=json.state;
        this.data=this.parseErrorEntities(json.result);
    }
    private parseErrorEntities(error: ErrorEntity): ErrorEntity {
        error = error || new ErrorEntity();
        return deserialize(ErrorEntity, error);
    }
}