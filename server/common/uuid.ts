/**
 * Created by xiaoduan on 2016/11/23.
 */
const UUID = require('uuid-js');

export function generateUUID(): string {
    return UUID.create().toString();
}