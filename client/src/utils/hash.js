import * as objectHash from 'object-hash';
import { isTargetType } from "./general";
class MD5Hash {
    hash(data) {
        if (isTargetType(data, "Null", "Undefined")) {
            return void 0;
        }
        if (data === "") {
            return "";
        }
        return objectHash.keysMD5(data);
    }
}
export let md5Hash = new MD5Hash();
