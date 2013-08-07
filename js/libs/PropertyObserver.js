/**
 * @filename: PropertyObserver
 * @author: schhetri
 * @date: 08/08/13
 * @time: 2:50 AM
 */
(function (W, U) {
    var typeOf = function (type) {
            var toString = Object.prototype.toString;

            return function (val) {
                return toString.call(val).match(/\[object (.*?)\]/)[1] === type;
            };
        },
        isString = typeOf('String'),
        listenerList = {},
        callHandler = function (list) {
            var argsList = Array.prototype.slice.call(arguments, 1),
                len, i, handler;
            for(i = 0, len = list.length; i < len; i++) {
                handler = list[i];
                handler.apply(this, argsList);
            }
        },
        getGUID = (function (d) {
            var prefix,
                count = 1;

            prefix = ['GUID', (+new d()), ''].join('_');
            return function () {
                return prefix + (count++);
            };
        })(Date),
        ObserveProp = function (obj) {
            var id = getGUID(),
                c = function (prop, handler) {
                var list;
                if (isString(prop)) {
                    prop = id+[prop];
                    list = listenerList[prop];

                    if (!list) {
                        list = listenerList[prop] = [];
                    }
                } else {
                    throw new Error('Unexpected Error');
                }

                list.push(handler);
            };
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    c[i] = (function (prop) {
                        var _self = arguments.callee;
                        return function (v) {
                            var oldVal, list, key;
                            if (v) {
                                oldVal = obj[prop];
                                obj[prop] = v;
                                key = id+prop;
                                list = listenerList[key];
                                list && callHandler.call(obj, list, v, oldVal);

                                return _self;
                            }
                            return obj[prop];
                        };
                    })(i);
                }
            }
            return c;
        };

    //Pulish Classes for external Access
    W.ObserveProp = ObserveProp;
})(this)