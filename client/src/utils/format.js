/**
 * @ngdoc filter
 * @name number
 * @kind function
 *
 * @description
 * Formats a number as text.
 *
 * If the input is null or undefined, it will just be returned.
 * If the input is infinite (Infinity/-Infinity) the Infinity symbol '∞' is returned.
 * If the input is not a number an empty string is returned.
 *
 *
 * @param {number|string} number Number to format.
 * @param {(number|string)=} fractionSize Number of decimal places to round the number to.
 * If this is not provided then the fraction size is computed from the current locale's number
 * formatting pattern. In the case of the default locale, it will be 3.
 * @returns {string} Number rounded to decimalPlaces and places a “,” after each third digit.
 *
 * @example
 */
export function number(number, fractionSize) {
    const formats = $locale.NUMBER_FORMATS;
    return (number == null)
        ? number
        : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
}
export function amount(value) {
    return number(value, 2);
}
/*export function number() {
 var formats = $locale.NUMBER_FORMATS;
 return function (number, fractionSize) {

 // if null or undefined pass it through
 return (number == null)
 ? number
 : formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP,
 fractionSize);
 };
 }*/
var DECIMAL_SEP = '.';
function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
    if (isObject(number))
        return '';
    var isNegative = number < 0;
    number = Math.abs(number);
    var isInfinity = number === Infinity;
    if (!isInfinity && !isFinite(number))
        return '';
    var numStr = number + '', formatedText = '', hasExponent = false, parts = [];
    if (isInfinity)
        formatedText = '\u221e';
    if (!isInfinity && numStr.indexOf('e') !== -1) {
        var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
        if (match && match[2] == '-' && match[3] > fractionSize + 1) {
            number = 0;
        }
        else {
            formatedText = numStr;
            hasExponent = true;
        }
    }
    if (!isInfinity && !hasExponent) {
        var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;
        // determine fractionSize if it is not specified
        if (isUndefined(fractionSize)) {
            fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
        }
        // safely round numbers in JS without hitting imprecisions of floating-point arithmetics
        // inspired by:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
        number = +(Math.round(+(number.toString() + 'e' + fractionSize)).toString() + 'e' + -fractionSize);
        var temp = ('' + number).split(DECIMAL_SEP);
        var whole = temp[0];
        let fraction = temp[1] || '';
        var i, pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
        if (whole.length >= (lgroup + group)) {
            pos = whole.length - lgroup;
            for (i = 0; i < pos; i++) {
                if ((pos - i) % group === 0 && i !== 0) {
                    formatedText += groupSep;
                }
                formatedText += whole.charAt(i);
            }
        }
        for (i = pos; i < whole.length; i++) {
            if ((whole.length - i) % lgroup === 0 && i !== 0) {
                formatedText += groupSep;
            }
            formatedText += whole.charAt(i);
        }
        // format fraction part.
        while (fraction.length < fractionSize) {
            fraction += '0';
        }
        if (fractionSize && fractionSize !== "0")
            formatedText += decimalSep + fraction.substr(0, fractionSize);
    }
    else {
        if (fractionSize > 0 && number < 1) {
            formatedText = number.toFixed(fractionSize);
            number = parseFloat(formatedText);
            formatedText = formatedText.replace(DECIMAL_SEP, decimalSep);
        }
    }
    if (number === 0) {
        isNegative = false;
    }
    parts.push(isNegative ? pattern.negPre : pattern.posPre, formatedText, isNegative ? pattern.negSuf : pattern.posSuf);
    return parts.join('');
}
var DATE_FORMATS = {
    yyyy: dateGetter('FullYear', 4),
    yy: dateGetter('FullYear', 2, 0, true),
    y: dateGetter('FullYear', 1),
    MMMM: dateStrGetter('Month'),
    MMM: dateStrGetter('Month', true),
    MM: dateGetter('Month', 2, 1),
    M: dateGetter('Month', 1, 1),
    dd: dateGetter('Date', 2),
    d: dateGetter('Date', 1),
    HH: dateGetter('Hours', 2),
    H: dateGetter('Hours', 1),
    hh: dateGetter('Hours', 2, -12),
    h: dateGetter('Hours', 1, -12),
    mm: dateGetter('Minutes', 2),
    m: dateGetter('Minutes', 1),
    ss: dateGetter('Seconds', 2),
    s: dateGetter('Seconds', 1),
    // while ISO 8601 requires fractions to be prefixed with `.` or `,`
    // we can be just safely rely on using `sss` since we currently don't support single or two digit fractions
    sss: dateGetter('Milliseconds', 3),
    EEEE: dateStrGetter('Day'),
    EEE: dateStrGetter('Day', true),
    a: ampmGetter,
    Z: timeZoneGetter,
    ww: weekGetter(2),
    w: weekGetter(1),
    G: eraGetter,
    GG: eraGetter,
    GGG: eraGetter,
    GGGG: longEraGetter
};
var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/, NUMBER_STRING = /^\-?\d+$/;
export function date(date, format, timezone) {
    var text = '', parts = [], fn, match;
    format = format || 'mediumDate';
    format = $locale.DATETIME_FORMATS[format] || format;
    if (isString(date)) {
        date = Date.parse(date);
        date = NUMBER_STRING.test(date) ? toInt(date) : jsonStringToDate(date);
    }
    if (isNumber(date)) {
        date = new Date(date);
    }
    if (!isDate(date) || !isFinite(date.getTime())) {
        return date;
    }
    while (format) {
        match = DATE_FORMATS_SPLIT.exec(format);
        if (match) {
            parts = concat(parts, match, 1);
            format = parts.pop();
        }
        else {
            parts.push(format);
            format = null;
        }
    }
    var dateTimezoneOffset = date.getTimezoneOffset();
    if (timezone) {
        dateTimezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
        date = convertTimezoneToLocal(date, timezone, true);
    }
    parts.forEach(function (value) {
        fn = DATE_FORMATS[value];
        text += fn ? fn(date, $locale.DATETIME_FORMATS, dateTimezoneOffset)
            : value.replace(/(^'|'$)/g, '').replace(/''/g, "'");
    });
    return text;
}
//增加对2015/10/12格式日期的识别
var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
// 1        2       3         4          5          6          7          8  9     10      11
function jsonStringToDate(string) {
    var match;
    if (match = string.match(R_ISO8601_STR)) {
        var date = new Date(0), tzHour = 0, tzMin = 0, dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear, timeSetter = match[8] ? date.setUTCHours : date.setHours;
        if (match[9]) {
            tzHour = toInt(match[9] + match[10]);
            tzMin = toInt(match[9] + match[11]);
        }
        dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
        var h = toInt(match[4] || 0) - tzHour;
        var m = toInt(match[5] || 0) - tzMin;
        var s = toInt(match[6] || 0);
        var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
        timeSetter.call(date, h, m, s, ms);
        return date;
    }
    return string;
}
var msie, // holds major version number for IE, or NaN if UA is not IE.
jqLite, // delay binding since jQuery could be loaded after us.
jQuery, // delay binding
slice = [].slice, splice = [].splice, push = [].push, toString = Object.prototype.toString;
function isObject(value) {
    return Object(value) === value;
}
function isUndefined(value) {
    return value === undefined;
}
function isNumber(value) {
    return typeof value === 'number';
}
function isDate(value) {
    return toString.call(value) === '[object Date]';
}
function isString(value) {
    return typeof value === 'string';
}
function concat(array1, array2, index) {
    return array1.concat(slice.call(array2, index));
}
function toInt(str) {
    return parseInt(str, 10);
}
function padNumber(num, digits, trim) {
    var neg = '';
    if (num < 0) {
        neg = '-';
        num = -num;
    }
    num = '' + num;
    while (num.length < digits)
        num = '0' + num;
    if (trim) {
        num = num.substr(num.length - digits);
    }
    return neg + num;
}
function dateGetter(name, size, offset = 0, trim) {
    return function (date) {
        var value = date['get' + name]();
        if (offset > 0 || value > -offset) {
            value += offset;
        }
        if (value === 0 && offset == -12)
            value = 12;
        return padNumber(value, size, trim);
    };
}
function dateStrGetter(name, shortForm) {
    return function (date, formats) {
        var value = date['get' + name]();
        var get = (shortForm ? ('SHORT' + name) : name).toUpperCase();
        return formats[get][value];
    };
}
function timeZoneGetter(date, formats, offset) {
    var zone = -1 * offset;
    var paddedZone = (zone >= 0) ? "+" : "";
    paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) +
        padNumber(Math.abs(zone % 60), 2);
    return paddedZone;
}
function getFirstThursdayOfYear(year) {
    // 0 = index of January
    var dayOfWeekOnFirst = (new Date(year, 0, 1)).getDay();
    // 4 = index of Thursday (+1 to account for 1st = 5)
    // 11 = index of *next* Thursday (+1 account for 1st = 12)
    return new Date(year, 0, ((dayOfWeekOnFirst <= 4) ? 5 : 12) - dayOfWeekOnFirst);
}
function getThursdayThisWeek(datetime) {
    return new Date(datetime.getFullYear(), datetime.getMonth(), 
    // 4 = index of Thursday
    datetime.getDate() + (4 - datetime.getDay()));
}
function weekGetter(size) {
    return function (date) {
        var firstThurs = getFirstThursdayOfYear(date.getFullYear()), thisThurs = getThursdayThisWeek(date);
        var diff = +thisThurs - +firstThurs, result = 1 + Math.round(diff / 6.048e8); // 6.048e8 ms per week
        return padNumber(result, size);
    };
}
function ampmGetter(date, formats) {
    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
}
function eraGetter(date, formats) {
    return date.getFullYear() <= 0 ? formats.ERAS[0] : formats.ERAS[1];
}
function longEraGetter(date, formats) {
    return date.getFullYear() <= 0 ? formats.ERANAMES[0] : formats.ERANAMES[1];
}
/**
 * @ngdoc function
 * @name angular.toJson
 * @module ng
 * @kind function
 *
 * @description
 * Serializes input into a JSON-formatted string. Properties with leading $$ characters will be
 * stripped since angular uses this notation internally.
 *
 * @param {Object|Array|Date|string|number} obj Input to be serialized into JSON.
 * @param {boolean|number} [pretty=2] If set to true, the JSON output will contain newlines and whitespace.
 *    If set to an integer, the JSON output will contain that many spaces per indentation.
 * @returns {string|undefined} JSON-ified string representing `obj`.
 */
/*function toJson(obj, pretty) {
    if (typeof obj === 'undefined') return undefined;
    if (!isNumber(pretty)) {
        pretty = pretty ? 2 : null;
    }
    return JSON.stringify(obj, toJsonReplacer, pretty);
}*/
/**
 * @ngdoc function
 * @name angular.fromJson
 * @module ng
 * @kind function
 *
 * @description
 * Deserializes a JSON string.
 *
 * @param {string} json JSON string to deserialize.
 * @returns {Object|Array|string|number} Deserialized JSON string.
 */
/*function fromJson(json) {
    return isString(json)
        ? JSON.parse(json)
        : json;
}*/
function timezoneToOffset(timezone, fallback) {
    var requestedTimezoneOffset = Date.parse('Jan 01, 1970 00:00:00 ' + timezone) / 60000;
    return isNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
}
function addDateMinutes(date, minutes) {
    date = new Date(date.getTime());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}
function convertTimezoneToLocal(date, timezone, reverse) {
    reverse = reverse ? -1 : 1;
    var timezoneOffset = timezoneToOffset(timezone, date.getTimezoneOffset());
    return addDateMinutes(date, reverse * (timezoneOffset - date.getTimezoneOffset()));
}
const $locale = {
    "DATETIME_FORMATS": {
        "AMPMS": [
            "AM",
            "PM"
        ],
        "DAY": [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        "ERANAMES": [
            "Before Christ",
            "Anno Domini"
        ],
        "ERAS": [
            "BC",
            "AD"
        ],
        "FIRSTDAYOFWEEK": 6,
        "MONTH": [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        "SHORTDAY": [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ],
        "SHORTMONTH": [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        "WEEKENDRANGE": [
            5,
            6
        ],
        "fullDate": "EEEE, MMMM d, y",
        "longDate": "MMMM d, y",
        "medium": "MMM d, y h:mm:ss a",
        "mediumDate": "MMM d, y",
        "mediumTime": "h:mm:ss a",
        "short": "M/d/yy h:mm a",
        "shortDate": "M/d/yy",
        "shortTime": "h:mm a"
    },
    "NUMBER_FORMATS": {
        "CURRENCY_SYM": "$",
        "DECIMAL_SEP": ".",
        "GROUP_SEP": ",",
        "PATTERNS": [
            {
                "gSize": 3,
                "lgSize": 3,
                "maxFrac": 3,
                "minFrac": 0,
                "minInt": 1,
                "negPre": "-",
                "negSuf": "",
                "posPre": "",
                "posSuf": ""
            },
            {
                "gSize": 3,
                "lgSize": 3,
                "maxFrac": 2,
                "minFrac": 2,
                "minInt": 1,
                "negPre": "-\u00a4",
                "negSuf": "",
                "posPre": "\u00a4",
                "posSuf": ""
            }
        ]
    }
};
