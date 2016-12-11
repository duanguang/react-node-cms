/**
 * Created by XD on 2016/9/11.
 */
import {Reducer, Store, IAction} from "redux";
import  hash from 'object-hash';
import History=HistoryModule.History;
import {number} from "./format";

const RouteStateStorageKey="@@route_state";
const MaxRouteStateStorageCount=2;

export const ROUTE_STATE_CHANGE="@routeState/ROUTE_STATE_CHANGE";

type RouteStateChangeActionType='INIT'|'PUSH'|'POP'|'REPLACE';

const RouteStateInitAction:RouteStateChangeActionType='INIT';
const RouteStatePushAction:RouteStateChangeActionType='PUSH';
const RouteStatePopAction:RouteStateChangeActionType='POP';
const RouteStateReplaceAction:RouteStateChangeActionType='REPLACE';

export interface IRouteStateChangeAction extends IAction{
    payload:IRouteStateChangeActionPayload
}
export interface IRouteStateChangeActionPayload{
    action:RouteStateChangeActionType;
    number?:number;
}
interface IRouteStateStorageData{
    historyIndex:number;
    routeStates:RouteStateHistory[];
    locationKeys:string[];
}
class RouteStateHistory{
    key:string;
    states:any[];//State的各个版本
    stack:number[];//每个版本对应的路由数
    constructor(key:string){
        this.key=key;
        this.states=[undefined];
        this.stack=[1];
    }
    get state(){
        return this.states[this.states.length-1];
    }
    load(data:RouteStateHistory){
        this.states=data.states;
        this.stack=data.stack;
    }

    push(){
        this.stack[this.stack.length-1]+=1;
    }

    pop(number:number){
        if(number>0){
            let index=this.stack.length-1;
            while (index>=0&&number>0){
                if(this.stack[index]>number){
                    this.stack[index]-=number;
                    break
                }
                if(index==0){
                    this.stack[index]=1;
                    break;
                }
                number-=this.stack[index];
                index--;
            }
            index++;
            if(index<this.stack.length){
                this.stack.splice(index);
                this.states.splice(index);
            }
        }
    }
    
    update(state:any){
        if(this.stack[this.stack.length-1]>1){
            this.states.push(state);
            this.stack[this.stack.length-1]-=1;
            this.stack.push(1);
        }else {
            this.states[this.states.length-1]=state;
        }
    }
}

let topPath=(state)=>state.topPath;
class RouteStateManage{
    private storage:Storage;
    private routeStates:RouteStateHistory[];
    private locationKeys:string[];
    
    constructor(storage:Storage){
        this.storage=storage;
        this.routeStates=[];
        this.locationKeys=[];
    }
    
    init(history:History,store:Store){

        history.listenBefore((location,callback:Function)=>{
           if(location.state&&topPath(location.state)){
               store.dispatch(this.routeStatePop(this.locationKeys.length));
           }
            callback();
        });
        history.listen((location)=>{
           if(this.locationKeys.length==0){
               let data=this.restore(location.key);
               if(data){
                   this.locationKeys=data.locationKeys;
                   data.routeStates.forEach((item)=>{
                      let routeStateHistory=this.routeStates.find((q)=>q.key==item.key);
                       if(routeStateHistory){
                           routeStateHistory.load(item);
                       }
                   });
               }
           }
            const locationKeys=this.locationKeys;
            switch (location.action){
                case "POP":
                    let index=locationKeys.length-1;
                    while (index>=0&&locationKeys[index]!=location.key){
                        index--;
                    }

                    let number=locationKeys.length-index-1;
                    if(number>0){
                        locationKeys.splice(index+1);
                        store.dispatch(this.routeStatePop(number));
                    }
                    if(locationKeys.length==0){
                        locationKeys.push(location.key);
                        store.dispatch(this.routeStatePush());
                    }
                    break;
                case "REPLACE":
                    store.dispatch(this.routeStateReplace());
                    break;
                case "PUSH":
                    locationKeys.push(location.key);
                    store.dispatch(this.routeStatePush());
                    break;
                default:
                    throw new Error('unknow location action');
            }
            console.log("locationKeys:"+this.locationKeys);
            console.log(this.routeStates);
            console.log("location.action:"+location.action);
        });
        window.onbeforeunload=(e)=>{
            this.store();
        }
    }
    register(reducer:Reducer):Reducer{
        let routeStateHistory:RouteStateHistory=new RouteStateHistory(hash(reducer));
        this.routeStates.push(routeStateHistory);
        return function (state,action) {
            if(action.type==ROUTE_STATE_CHANGE){
                let payload:IRouteStateChangeActionPayload=action.payload;
                switch (payload.action){
                    case RouteStatePushAction:
                        routeStateHistory.push();
                        break;
                    case RouteStatePopAction:
                        routeStateHistory.pop(payload.number);
                        break;
                    case RouteStateReplaceAction:
                        routeStateHistory.pop(1);
                        routeStateHistory.push();
                        break;
                }
                return routeStateHistory.state;
            }
            let newState=reducer(state,action);
            if(newState!=state){
                routeStateHistory.update(newState);
            }
            return newState;
        };
    }
    private store(){
        try {
            let data=this.getStorageData();
            if(data.length>=MaxRouteStateStorageCount){
                data.splice(0,data.length-MaxRouteStateStorageCount+1);
            }
            data.push({
                historyIndex: window.history.length,
                routeStates: this.routeStates,
                locationKeys: this.locationKeys
            });
            this.saveStorageData(data);
        }catch (e){
            console.log('store error:' + e);
        }
    }
    private restore(locationKey:string):IRouteStateStorageData{
        try {
            let result=null;
            let data=this.getStorageData();
            for(let i=0;i<data.length;i++){
                if(data[i].locationKeys.indexOf(locationKey)>=0){
                    result=data[i];
                    data.splice(i,1);
                    this.saveStorageData(data);
                    break;
                }
            }
            return result;
        }catch (e){
            console.log('restore error:'+e);
        }

    }
    private getStorageData():IRouteStateStorageData[]{
        let data:IRouteStateStorageData[]=[];
        let value=this.storage.getItem(RouteStateStorageKey);
        if(value){
            data=JSON.parse(value);
        }
        return data;
    }
    private saveStorageData(data:IRouteStateStorageData[]){
        this.storage.setItem(RouteStateStorageKey,JSON.stringify(data));
    }
    private routeStateReplace():IRouteStateChangeAction{
        return{
            type:ROUTE_STATE_CHANGE,
            payload:{
                action:RouteStateReplaceAction
            }
        }
    }

    private routeStatePop(number:number):IRouteStateChangeAction{
        return {
            type:ROUTE_STATE_CHANGE,
            payload:{
                action:RouteStatePopAction,
                number:number
            }
        }
    }
    private routeStatePush():IRouteStateChangeAction{
        return{
            type:ROUTE_STATE_CHANGE,
            payload:{
                action:RouteStatePushAction,
            }
        }
    }
}
const routeStateManage=new RouteStateManage(window.sessionStorage);

export function syncRouteState(history:HistoryModule.History,store:Store){
    routeStateManage.init(history,store);
}
export function routeState(reducer:Reducer){
    return routeStateManage.register(reducer);
}