/**
 * @filename: Observer
 * @author: schhetri
 * @date: 04/08/13
 * @time: 3:52 AM
 */
(function (W, U) {
    var observerList = {},
        toString = Object.prototype.toString,
        typeOf = function (val) {
            return toString.call(val);
        },
        isObject = function (param) {
            return typeOf(param) === '[object Object]';
        },
        clone = function (obj) {
            var fn = function () {};
            fn.prototype = obj;
            return new fn();
        },
        DefineObject = function (param) {
            var cloned;
            function getterSetter(prop, value) {
                var list = observerList[prop],
                    len, i, handler;
                if (value) {
                    param[prop] = value;

                    if (list) {
                        for(i = 0, len = list.length; i < len; i++) {
                            handler = list[i];
                            handler.call(param, value);
                        }
                    }

                    return getterSetter;
                }

                return param[prop];
            };
            if (!isObject(param)) {return;};

            getterSetter.Observe = function (prop, handler) {
                var list = observerList[prop];

                if (!list) {
                    list = observerList[prop] = [];
                }

                list.push(handler);
            };

            return getterSetter;
        };

    //expose the Classes to outer world
    W.DefineObject = DefineObject;
})(this);