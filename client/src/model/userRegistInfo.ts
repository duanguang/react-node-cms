
export class UserRegistInfo{
    userPassword:string;
    trueName:string;
    email:string;
    userName:string;
    mobile:string;
    reUserPassword:string;
    constructor(){
        
    }
}
export class UserFormLogin{
    userName:string;
    userPassword:string;
    constructor(){
        this.userName='';
        this.userPassword='';
    }
}