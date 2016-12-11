export class SuccessEntity {
    constructor() {
        this.message = void 0;
    }
}
export class SuccessPageEntity {
    constructor(json) {
        json = json || {};
        this.state = json.state;
        let info = new SuccessEntity();
        info.message = json.result;
        this.data = info;
    }
}
