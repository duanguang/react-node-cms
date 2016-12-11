import {DeviceUtil} from './device';
export class WXUtil {
    public static setWxTitle(title:string):void {
        if (title) {
            document.title = title;
            if (DeviceUtil.isIOS()) {
                var iframe = document.createElement("iframe");
                iframe.setAttribute("src", "/favicon.ico");
                iframe.setAttribute("style", "display:none;");
                iframe.addEventListener('load', function () {
                    setTimeout(()=> {
                        iframe.removeEventListener('load', null);
                        document.body.removeChild(iframe);
                    }, 0);
                });
                document.body.appendChild(iframe);
            }
        }
    }
}