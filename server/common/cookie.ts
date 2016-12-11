/**
 * Created by XD on 2016/9/16.
 */
export function setCookie(key,value,res:any,options?:any){
    const DefaultOption = {
        expires:15,path:'/',httpOnly:true,secure:false
    };
    options=options?options:DefaultOption;

    options=Object.assign({},options);
    if(value===null||value===undefined){
        options.expires=-1;
    }
    if(typeof options.expires==='number'){
        var days=options.expires,t=options.expires=new Date();
        t.setDate(t.getDate()+days);
    }
    value=String(value);
    
    res.cookie(key,value,options);
}

export function getCookie(key,req:any){
    let cookieValue=req.cookies[key];
    return cookieValue?decodeURIComponent(cookieValue):null;
}

export function clearCookie(key:string,res:any){
    res.clearCookie(key,null);
}