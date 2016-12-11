export function set(key, value, options:any = {}) {
    options = Object.assign({}, options);

    if (value === null || value === undefined) {
        options.expires = -1;
    }

    if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
    }

    value = String(value);

    return (document.cookie = [
        encodeURIComponent(key), '=',
        options.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
/*        options.httpOnly?'; httpOnly='+true:true*/
    ].join(''));
}

export function get(key, options:any = {}) {
    var result, decode = options.raw ? function (s) {
        return s;
    } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
}

export function clear(key){
   return set(key,'',{expires: -1});
}