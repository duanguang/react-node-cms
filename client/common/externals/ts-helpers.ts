export = function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
// function __decorate(decorators, target, key, desc) {
//    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
//    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
//    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
//    return c > 3 && r && Object.defineProperty(target, key, r), r;
//}
// function __metadata(k, v) {
//    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
//}
// function __param(paramIndex, decorator) {
//    return function (target, key) { decorator(target, key, paramIndex); }
//}
// function __awaiter(thisArg, _arguments, Promise, generator) {
//    return new Promise(function (resolve, reject) {
//        generator = generator.call(thisArg, _arguments);
//        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
//        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
//        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
//        function step(verb, value) {
//            var result = generator[verb](value);
//            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
//        }
//        step("next", void 0);
//    });
//}