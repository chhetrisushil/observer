/**
 * @filename: Observer
 * @author: schhetri
 * @date: 04/08/13
 * @time: 3:52 AM
 */
(function (W, U) {
    var typeOf = function (type) {
            var toString = Object.prototype.toString;

            return function (val) {
                return toString.call(val).match(/\[object (.*?)\]/)[1] === type;
            };
        },
        isObject = typeOf('Object'),
        isArray = typeOf('Array'),
        isString = typeOf('String'),
        isFunction = typeOf('Function'),
        clone = function (obj) {
            var fn = function () {};
            fn.prototype = obj;
            return new fn();
        },
        toObject = function (arr) {
            var i, len;
            if (isArray(arr)) {
                for (i = 0, len = arr.length; i < len; i++) {
                    this[i] = arr[i];
                }

                this.length = len;

                return this;
            } else if (isObject(arr)) {
                return arr;
            }

            throw new Error('Unexpected Error');
        },
        callHandler = function () {
            var argsList = Array.prototype.slice.call(arguments),
                len, i, handler, list = argsList.shift();
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
        Define = function (param) {
            var observerList = {},
                toString = Object.prototype.toString,
                _type = toString.call(param).match(/\[object (.*?)\]/)[1],
                _isArray = (_type === 'Array'),
                _isArrChangeApplied = false,
                id = getGUID();
            function getterSetter(prop, value) {
                var list, oldVal;

                if (_isArray) {
                    if (!prop && !value) {
                        return toObject.call({}, param);
                    } else if (value) {
                        oldVal = param[prop];
                        param[prop] = value;
                        list = observerList[id]; //this is an array change observer

                        list && callHandler.call(param, list, value, oldVal);

                        return value;
                    }
                }

                list = observerList[prop];
                if (value) {
                    oldVal = param[prop];
                    param[prop] = value;

                    list && callHandler.call(param, list, value, oldVal);

                    return getterSetter;
                }

                return (!prop && !value) ? clone(param) : param[prop];
            };

            getterSetter.Observe = function (prop, handler) {
                var list;
                if (isString(prop)) {
                    list = observerList[prop];

                    if (!list) {
                        list = observerList[prop] = [];
                    }
                } else if (isFunction(prop) && _isArray) {
                    _isArrChangeApplied = true;
                    list = observerList[id];

                    handler = prop;

                    if (!list) {
                        list = observerList[id] = [];
                    }
                } else {
                    throw new Error('Unexpected Error');
                }

                list.push(handler);
            };

            if (_isArray) {
                getterSetter.push = function (val) {
                    var list, _cList = observerList;

                    param.push(val);
                    list = _cList['push'];

                    if (_isArrChangeApplied) {
                        list = list ? list.concat(_cList[id]) : _cList[id];
                    }

                    list && callHandler.call(param, list, val);

                    return param.length;
                };

                getterSetter.pop = function () {
                    var list, _cList = observerList,
                        removedVal = param.pop();

                    list = _cList['pop'];

                    if (_isArrChangeApplied) {
                        list = list ? list.concat(_cList[id]) : _cList[id];
                    }

                    list && callHandler.call(param, list, removedVal);

                    return removedVal;
                };

                getterSetter.shift = function () {
                    var list, _cList = observerList,
                        removedVal = param.shift();

                    list = _cList['shift'];

                    if (_isArrChangeApplied) {
                        list = list ? list.concat(_cList[id]) : _cList[id];
                    }

                    list && callHandler.call(param, list, removedVal);

                    return removedVal;
                };

                getterSetter.unshift = function (val) {
                    var list, _cList = observerList;

                    param.unshift(val);
                    list = _cList['unshift'];

                    if (_isArrChangeApplied) {
                        list = list ? list.concat(_cList[id]) : _cList[id];
                    }

                    list && callHandler.call(param, list, val);

                    return param.length;
                };

                getterSetter.splice= function (index, noOfItem) {
                    var list, _cList = observerList, result;

                    var result = param.splice.apply(param, arguments);
                    list = _cList['splice'];

                    if (_isArrChangeApplied) {
                        list = list ? list.concat(_cList[id]) : _cList[id];
                    }

                    list && callHandler.call(param, list, result, index, noOfItem);

                    return param.length;
                };
            }

            return getterSetter;
        };

    //expose the Classes to outer world
    W.Define = Define;
})(this);