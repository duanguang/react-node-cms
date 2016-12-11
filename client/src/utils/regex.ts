export function RegExChk(type:validatorType, value:string){
    // let $pintu=value.replace(/(^\s*)|(\s*$)/g, "");
    let $pintu=value;
    let regex;
    switch(type){
        case validatorType.required:
            regex=/[^(^\s*)|(\s*$)]/;
            return regex.test($pintu);
        case validatorType.chinese:
            regex=/^[\u0391-\uFFE5]+$/;
            return regex.test($pintu);
        case validatorType.number:
            regex=/^[\d]+$/;//或者/^\d+$/
            return regex.test(regex);
        case validatorType.integer:
            regex=/^[-\+]?\d$/;//正负整数
            return regex.test($pintu);
        case validatorType.plusInteger:
            regex=/^[+]?\d$/;
            return regex.test($pintu);
        case validatorType.double:
            regex=/^[-\+]?\d+(\.\d+)?$/;
            return regex.test($pintu);
        case validatorType.plusDouble:
            regex=/[+]?\d+(\.\d+)?$/;
            return regex.test($pintu);
        case validatorType.english:
            regex=/^[A-Z a-z]+$/;
            return regex.test($pintu);
        case validatorType.username:
            regex=/^[a-z]\w{3,}$/i;
            return regex.test($pintu);
        case validatorType.mobile:
            regex=/^1[3|4|5|7|8][0-9]\d{8}$/;
            return regex.test($pintu);
        case validatorType.phone:
            regex=/^\d{3}-\d{8}|\d{4}-\d{7,8}$/;//手机号
            return regex.test($pintu);
        case validatorType.email:
            regex=/^[\w\.]+([-]\w+)*@\w+[\.]\w*$/;
            return regex.test($pintu);
        case validatorType.url:
            regex=/^http|https:\/\/\w+\.\w+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
            return regex.test($pintu);
        case validatorType.ip:
            regex=/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
            return regex.test($pintu);
        case validatorType.qq:
            regex=/^[1-9]\d{4,10}$/;
            return regex.test($pintu);
        case validatorType.decimal:
            regex=/^\d+(\.\d+)*$/;
            return regex.test($pintu);
        case validatorType.zipCode:
            regex=/^[1-9]\d{5}$/;
            return regex.test($pintu);
        default:
            return false;
    }
}

export enum validatorType{
    required=0,
    chinese=1,
    number=2,
    integer=3,
    plusInteger=4,
    double=5,
    plusDouble=6,
    english=7,
    username=8,
    mobile=9,
    phone=10,
    email=11,
    url=12,
    ip=13,
    qq=14,
    decimal=15,
    zipCode=16
}
/*export function  getRegexRule(rules:IRule[]){
    if(rules)  {
        return rules.map((rule:IRule)=> {
            if(rule.regex||rule.validatorType) {
                return {validator: regexValidator(rule)}
            }

        })
    }
    return [];
}*/