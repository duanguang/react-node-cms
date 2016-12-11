/**
 * Created by xiaoduan on 2016/11/14.
 */
import {JsonProperty, deserialize} from 'json-typescript-mapper';
import {StateEnumResult} from "common/commonResult";
export class UserLoginEntity{

    @JsonProperty('Message')
    public message:string;

    @JsonProperty('MemberCK')
    public memberCK:string;

    public constructor(){
        this.memberCK=void 0;
        this.message=void 0;
    }
}

export class UserLoginPageEntity{
    public data:UserLoginEntity;
    public state:StateEnumResult;
    public constructor(json?){
        json = json || {};
        this.state=json.state;
        this.data=this.parseUserLoginEntities(json.result);
    }
    private parseUserLoginEntities(info: UserLoginEntity): UserLoginEntity {
        info = info || new UserLoginEntity();
        return deserialize(UserLoginEntity, info);
    }
}