import { isDev } from './application';
const ResourcesHost = isDev() ? 'tstres.360kad.com' : 'res.360kad.com';
export function url(path) {
    return `http://${ResourcesHost}${path}`;
}
