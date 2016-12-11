const iOS = 'iOS';
const ANDROID = 'ANDROID';
const BLACKBERRY = 'BLACKBERRY';
const UNKNOWN = 'UNKNOWN';
export class DeviceUtil {
    static getPlatform() {
        if (!DeviceUtil.devicePlatForm) {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
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
    static isAndroid() {
        return DeviceUtil.getPlatform() === ANDROID;
    }
    static isIOS() {
        return DeviceUtil.getPlatform() === iOS;
    }
}
