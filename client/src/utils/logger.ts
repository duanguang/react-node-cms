/**
 * Created by xiaoduan on 2016/11/12.
 */
type LoggerType = 'info' | 'fatal';

export function logger(error: Error, type = 'info') {
    console.error(error);
}