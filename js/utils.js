var utils = (function() {
    function deepClone(source) {
        if (typeof source !== 'object') {
            return source;
        }

        if (Object.prototype.toString.call(source) === '[object Null]') {
            return null;
        } else if (Object.prototype.toString.call(source) === '[object Date]') {
            return new Date(source.getTime());
        } else if (Object.prototype.toString.call(source) === '[object Array]') {
            return source.slice(0);
        }

        var result = new source.constructor();

        for (var key in source) {
            if (typeof source[key] === 'object') {
                if (Object.prototype.toString.call(source[key]) === '[object Date]') {
                    result[key] = new Date(source[key].getTime());
                } else if (Object.prototype.toString.call(source[key]) === '[object Array]') {
                    result[key] = source[key].slice(0);
                } else if (Object.prototype.toString.call(source[key]) === '[object Null]') {
                    result[key] = null;
                } else {
                    result[key] = deepClone(source[key]);
                }
            } else {
                result[key] = source[key];
            }
        }
        return result;
    }

    //subClass.prototype添加的属性都必须位置 extend之后, 否则子类的同名方法会被父类的覆盖
    function extend(subClass, superClass) {
        var F = function() {};
        F.prototype = superClass.prototype;
        subClass.prototype = new F;
        subClass.prototype.constructor = subClass;

        subClass.superClass = superClass;
        if (superClass.prototype.constructor == Object.prototype.constructor)
            superClass.prototype.constructor = superClass;
    }

    function format() {
        if (arguments.length == 0)
            return null;

        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) { 
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }

        return str;
    }

    return {
        deepCopy: deepClone,
        extend: extend,
        format: format
    }
})()

// var obj = {
//     a: '1',
//     b: 1,
//     c: [1, 2, 3],
//     d: false,
//     date: new Date(),
//     e: {
//         a: '1',
//         b: 1,
//         c: [1, 2, 3],
//         d: false
//     },
//     fn: function() {}
// }

// console.time('xxx');
// for(var i = 0; i<1000000; i++ ) utils.deepCopy(obj)
// console.timeEnd('xxx');