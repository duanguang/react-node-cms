const iOS = 'iOS';
const ANDROID = 'ANDROID';
const BLACKBERRY = 'BLACKBERRY';
const UNKNOWN = 'UNKNOWN';

export class DeviceUtil {
    private static devicePlatForm:string;

    private static getPlatform():string {
        if (!DeviceUtil.devicePlatForm) {
            var userAgent = navigator.userAgent || navigator.vendor || (<any>window).opera;
            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
                DeviceUtil.devicePlatForm = iOS;
            }
            else if (userAgent.match(/Android/i)) {
                DeviceUtil.devicePlatForm = ANDROID;
            }
            else if (userAgent.match(/BlackBerry/i)) {
                DeviceUtil.devicePlatForm = BLACKBERRY;
            }
            else {
                DeviceUtil.devicePlatForm = UNKNOWN;
            }
        }
        return DeviceUtil.devicePlatForm;
    }

    public static isAndroid():boolean {
        return DeviceUtil.getPlatform() === ANDROID;
    }

    public static isIOS():boolean {
        return DeviceUtil.getPlatform() === iOS;
    }
}