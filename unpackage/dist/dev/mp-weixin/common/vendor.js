(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 0:
/*!************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 5));

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 13));

var _request = _interopRequireDefault(__webpack_require__(/*! ./utils/request.js */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.prototype.$store = _store.default;

_vue.default.prototype.$request = _request.default;

_vue.default.config.productionTip = false;

_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 101:
/*!***********************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fcomment-page%2Fcomment-page"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _commentPage = _interopRequireDefault(__webpack_require__(/*! ./pages/comment-page/comment-page.vue */ 102));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_commentPage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 107:
/*!*********************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fmovie-order%2Fmovie-order"} ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _movieOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/movie-order/movie-order.vue */ 108));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_movieOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 113:
/*!***********************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fmovie-order-detail%2Fmovie-order-detail"} ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _movieOrderDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/movie-order-detail/movie-order-detail.vue */ 114));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_movieOrderDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 119:
/*!*************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fselect-cinema%2Fselect-cinema"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _selectCinema = _interopRequireDefault(__webpack_require__(/*! ./pages/select-cinema/select-cinema.vue */ 120));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_selectCinema.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 12:
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 127:
/*!*********************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fsnack-order%2Fsnack-order"} ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _snackOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/snack-order/snack-order.vue */ 128));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_snackOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 13:
/*!*******************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/store/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 8));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    userLocation: null, // 用户的位置信
    selectCity: null, // 用户选择城市
    days: null,
    day: null },

  getters: {},


  mutations: {
    userLocation: function userLocation(state, obj) {
      state.userLocation = obj;
    },
    selectCity: function selectCity(state, obj) {
      state.selectCity = obj;
    },
    getDays: function getDays(state, arr) {
      console.log(arr);
      state.days = arr;
    },
    getDay: function getDay(state, item) {
      state.day = item;
    } },

  actions: {
    // getLocation(context){
    // 	context.commit('')
    // }
  } });var _default =


store;exports.default = _default;

/***/ }),

/***/ 133:
/*!*******************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fsnack-page%2Fsnack-page"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _snackPage = _interopRequireDefault(__webpack_require__(/*! ./pages/snack-page/snack-page.vue */ 134));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_snackPage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 14:
/*!*********************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/utils/request.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var baseUrl = 'https://m.maoyan.com';

var request = function request(url, params, method) {
  return uni.request({
    url: baseUrl + url,
    data: params,
    header: {},
    method: method || 'GET' });

};var _default =

request;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!*********************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fmovie%2Fmovie"} ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _movie = _interopRequireDefault(__webpack_require__(/*! ./pages/movie/movie.vue */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_movie.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 23:
/*!***********************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fmovie-detail%2Fmovie-detail"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _movieDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/movie-detail/movie-detail.vue */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_movieDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 29:
/*!******************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/utils/util.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.throttle = exports.getRandom = exports.calcTime = exports.getToday = exports.formatNumber = exports.formatTime = void 0;var formatTime = function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};exports.formatTime = formatTime;

var formatNumber = function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
};exports.formatNumber = formatNumber;

var getToday = function getToday() {
  var today = new Date();
  return formatTime(new Date()).split(' ')[0];
};exports.getToday = getToday;

var calcTime = function calcTime(time) {
  if (!time) {
    return;
  }
  var day = new Date(time);
  var now = new Date();
  var result = now.getTime() - day.getTime();
  if (now.getFullYear() !== day.getFullYear()) {
    return time.split(' ')[0];
  }
  //一分钟前评论
  if (result < 60000) {
    return '刚刚';
  }
  if (60000 <= result && result < 3600000) {
    return "".concat(Math.floor(result / 60000), "\u5206\u949F\u524D");
  }
  if (3600000 <= result && result < 86400000) {
    return "".concat(Math.floor(result / 3600000), "\u5C0F\u65F6\u524D");
  }
  if (86400000 <= result && result < 604800000) {
    return "".concat(Math.floor(result / 86400000), "\u5929\u524D");
  }
  return "".concat(formatNumber(day.getMonth() + 1), "-").concat(formatNumber(day.getDate()));

};

//获取指定区间的随机整数
exports.calcTime = calcTime;var getRandom = function getRandom(lowerValue, upperValue, isFormat) {
  var num = Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
  if (isFormat) {
    return formatNumber(num);
  } else {
    return num;
  }
};
//节流函数
exports.getRandom = getRandom;var throttle = function throttle(func) {var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var timeout;
  var startTime = new Date();
  return function (event) {var _this = this;
    clearTimeout(timeout);
    var curTime = new Date();
    if (curTime - startTime <= interval) {
      //小于规定时间间隔时，用setTimeout在指定时间后再执行
      timeout = setTimeout(function () {
        func.call(_this, event);
      }, interval);
    } else {
      //重新计时并执行函数
      startTime = curTime;
      func.call(this, event);
    }
  };
};exports.throttle = throttle;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 32:
/*!***********************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fcinema%2Fcinema"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _cinema = _interopRequireDefault(__webpack_require__(/*! ./pages/cinema/cinema.vue */ 33));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_cinema.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 4:
/*!***************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/pages.json ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 40:
/*!*******************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fuser%2Fuser"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _user = _interopRequireDefault(__webpack_require__(/*! ./pages/user/user.vue */ 41));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_user.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 46:
/*!*********************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fcity-select%2Fcity-select"} ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _citySelect = _interopRequireDefault(__webpack_require__(/*! ./pages/city-select/city-select.vue */ 47));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_citySelect.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 52:
/*!*******************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/utils/citys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.citys = void 0;var citys = [{
  'id': '1',
  'city_name': '上海',
  'city_pre': 'S',
  'city_pinyin': 'Shanghai',
  'city_short': 'sh',
  'count': '311' },

{
  'id': '2',
  'city_name': '北京',
  'city_pre': 'B',
  'city_pinyin': 'Beijing',
  'city_short': 'bj',
  'count': '208' },

{
  'id': '3',
  'city_name': '深圳',
  'city_pre': 'S',
  'city_pinyin': 'Shenzhen',
  'city_short': 'sz',
  'count': '260' },

{
  'id': '4',
  'city_name': '重庆',
  'city_pre': 'C',
  'city_pinyin': 'Chongqing',
  'city_short': 'cq',
  'count': '227' },

{
  'id': '5',
  'city_name': '广州',
  'city_pre': 'G',
  'city_pinyin': 'Guangzhou',
  'city_short': 'gz',
  'count': '182' },

{
  'id': '6',
  'city_name': '成都',
  'city_pre': 'C',
  'city_pinyin': 'Chengdu',
  'city_short': 'cd',
  'count': '165' },

{
  'id': '7',
  'city_name': '武汉',
  'city_pre': 'W',
  'city_pinyin': 'Wuhan',
  'city_short': 'wh',
  'count': '122' },

{
  'id': '8',
  'city_name': '东莞',
  'city_pre': 'D',
  'city_pinyin': 'Dongguan',
  'city_short': 'dg',
  'count': '135' },

{
  'id': '9',
  'city_name': '天津',
  'city_pre': 'T',
  'city_pinyin': 'Tianjin',
  'city_short': 'tj',
  'count': '96' },

{
  'id': '10',
  'city_name': '杭州',
  'city_pre': 'H',
  'city_pinyin': 'Hangzhou',
  'city_short': 'hz',
  'count': '152' },

{
  'id': '11',
  'city_name': '沈阳',
  'city_pre': 'S',
  'city_pinyin': 'Shenyang',
  'city_short': 'sy',
  'count': '70' },

{
  'id': '12',
  'city_name': '佛山',
  'city_pre': 'F',
  'city_pinyin': 'Foshan',
  'city_short': 'fs',
  'count': '119' },

{
  'id': '13',
  'city_name': '合肥',
  'city_pre': 'H',
  'city_pinyin': 'Hefei',
  'city_short': 'hf',
  'count': '83' },

{
  'id': '14',
  'city_name': '南京',
  'city_pre': 'N',
  'city_pinyin': 'Nanjing',
  'city_short': 'nj',
  'count': '95' },

{
  'id': '15',
  'city_name': '长沙',
  'city_pre': 'C',
  'city_pinyin': 'Changsha',
  'city_short': 'cs',
  'count': '90' },

{
  'id': '16',
  'city_name': '西安',
  'city_pre': 'X',
  'city_pinyin': 'Xian',
  'city_short': 'xa',
  'count': '103' },

{
  'id': '17',
  'city_name': '郑州',
  'city_pre': 'Z',
  'city_pinyin': 'Zhengzhou',
  'city_short': 'zz',
  'count': '94' },

{
  'id': '18',
  'city_name': '宁波',
  'city_pre': 'N',
  'city_pinyin': 'Ningbo',
  'city_short': 'nb',
  'count': '68' },

{
  'id': '19',
  'city_name': '大连',
  'city_pre': 'D',
  'city_pinyin': 'Dalian',
  'city_short': 'dl',
  'count': '53' },

{
  'id': '20',
  'city_name': '青岛',
  'city_pre': 'Q',
  'city_pinyin': 'QingDao',
  'city_short': 'qd',
  'count': '63' },

{
  'id': '21',
  'city_name': '苏州',
  'city_pre': 'S',
  'city_pinyin': 'Suzhou',
  'city_short': 'sz',
  'count': '76' },

{
  'id': '22',
  'city_name': '温州',
  'city_pre': 'W',
  'city_pinyin': 'Wenzhou',
  'city_short': 'wz',
  'count': '79' },

{
  'id': '23',
  'city_name': '厦门',
  'city_pre': 'X',
  'city_pinyin': 'Xiamen',
  'city_short': 'xm',
  'count': '48' },

{
  'id': '24',
  'city_name': '惠州',
  'city_pre': 'H',
  'city_pinyin': 'Huizhou',
  'city_short': 'hz',
  'count': '52' },

{
  'id': '25',
  'city_name': '福州',
  'city_pre': 'F',
  'city_pinyin': 'Fuzhou',
  'city_short': 'fz',
  'count': '47' },

{
  'id': '26',
  'city_name': '昆明',
  'city_pre': 'K',
  'city_pinyin': 'Kunming',
  'city_short': 'km',
  'count': '70' },

{
  'id': '27',
  'city_name': '无锡',
  'city_pre': 'W',
  'city_pinyin': 'Wuxi',
  'city_short': 'wx',
  'count': '66' },

{
  'id': '28',
  'city_name': '烟台',
  'city_pre': 'Y',
  'city_pinyin': 'Yantai',
  'city_short': 'yt',
  'count': '36' },

{
  'id': '29',
  'city_name': '南昌',
  'city_pre': 'N',
  'city_pinyin': 'Nanchang',
  'city_short': 'nc',
  'count': '52' },

{
  'id': '30',
  'city_name': '石家庄',
  'city_pre': 'S',
  'city_pinyin': 'Shijiazhuang',
  'city_short': 'sjz',
  'count': '66' },

{
  'id': '31',
  'city_name': '常州',
  'city_pre': 'C',
  'city_pinyin': 'Changzhou',
  'city_short': 'cz',
  'count': '44' },

{
  'id': '32',
  'city_name': '济南',
  'city_pre': 'J',
  'city_pinyin': 'Jinan',
  'city_short': 'jn',
  'count': '45' },

{
  'id': '33',
  'city_name': '兰州',
  'city_pre': 'L',
  'city_pinyin': 'Lanzhou',
  'city_short': 'lz',
  'count': '35' },

{
  'id': '34',
  'city_name': '台州',
  'city_pre': 'T',
  'city_pinyin': 'Taizhou',
  'city_short': 'tz',
  'count': '58' },

{
  'id': '35',
  'city_name': '南宁',
  'city_pre': 'N',
  'city_pinyin': 'Nanning',
  'city_short': 'nn',
  'count': '47' },

{
  'id': '36',
  'city_name': '中山',
  'city_pre': 'Z',
  'city_pinyin': 'Zhongshan',
  'city_short': 'zs',
  'count': '63' },

{
  'id': '37',
  'city_name': '贵阳',
  'city_pre': 'G',
  'city_pinyin': 'Guiyang',
  'city_short': 'gy',
  'count': '36' },

{
  'id': '38',
  'city_name': '太原',
  'city_pre': 'T',
  'city_pinyin': 'Taiyuan',
  'city_short': 'ty',
  'count': '34' },

{
  'id': '39',
  'city_name': '南通',
  'city_pre': 'N',
  'city_pinyin': 'Nantong',
  'city_short': 'nt',
  'count': '61' },

{
  'id': '40',
  'city_name': '丽水',
  'city_pre': 'L',
  'city_pinyin': 'Lishui',
  'city_short': 'ls',
  'count': '30' },

{
  'id': '41',
  'city_name': '芜湖',
  'city_pre': 'W',
  'city_pinyin': 'Wuhu',
  'city_short': 'wh',
  'count': '41' },

{
  'id': '42',
  'city_name': '乌鲁木齐',
  'city_pre': 'W',
  'city_pinyin': 'Wulumuqi',
  'city_short': 'wlmq',
  'count': '38' },

{
  'id': '43',
  'city_name': '盐城',
  'city_pre': 'Y',
  'city_pinyin': 'Yancheng',
  'city_short': 'yc',
  'count': '34' },

{
  'id': '44',
  'city_name': '新乡',
  'city_pre': 'X',
  'city_pinyin': 'Xinxiang',
  'city_short': 'xx',
  'count': '31' },

{
  'id': '45',
  'city_name': '江门',
  'city_pre': 'J',
  'city_pinyin': 'Jiangmen',
  'city_short': 'jm',
  'count': '39' },

{
  'id': '46',
  'city_name': '长春',
  'city_pre': 'C',
  'city_pinyin': 'Changchun',
  'city_short': 'cc',
  'count': '54' },

{
  'id': '47',
  'city_name': '洛阳',
  'city_pre': 'L',
  'city_pinyin': 'Luoyang',
  'city_short': 'ly',
  'count': '28' },

{
  'id': '48',
  'city_name': '赣州',
  'city_pre': 'G',
  'city_pinyin': 'Ganzhou',
  'city_short': 'gz',
  'count': '44' },

{
  'id': '49',
  'city_name': '淄博',
  'city_pre': 'Z',
  'city_pinyin': 'Zibo',
  'city_short': 'zb',
  'count': '24' },

{
  'id': '50',
  'city_name': '银川',
  'city_pre': 'Y',
  'city_pinyin': 'Yinchuan',
  'city_short': 'yc',
  'count': '28' },

{
  'id': '51',
  'city_name': '淮安',
  'city_pre': 'H',
  'city_pinyin': 'Huaian',
  'city_short': 'ha',
  'count': '33' },

{
  'id': '52',
  'city_name': '哈尔滨',
  'city_pre': 'H',
  'city_pinyin': 'Harbin',
  'city_short': 'heb',
  'count': '51' },

{
  'id': '53',
  'city_name': '衢州',
  'city_pre': 'Q',
  'city_pinyin': 'Quzhou',
  'city_short': 'qz',
  'count': '23' },

{
  'id': '54',
  'city_name': '威海',
  'city_pre': 'W',
  'city_pinyin': 'Weihai',
  'city_short': 'wh',
  'count': '23' },

{
  'id': '55',
  'city_name': '泉州',
  'city_pre': 'Q',
  'city_pinyin': 'Quanzhou',
  'city_short': 'qz',
  'count': '40' },

{
  'id': '56',
  'city_name': '唐山',
  'city_pre': 'T',
  'city_pinyin': 'Tangshan',
  'city_short': 'ts',
  'count': '31' },

{
  'id': '57',
  'city_name': '湖州',
  'city_pre': 'H',
  'city_pinyin': 'Huzhou',
  'city_short': 'hz',
  'count': '36' },

{
  'id': '58',
  'city_name': '徐州',
  'city_pre': 'X',
  'city_pinyin': 'Xuzhou',
  'city_short': 'xz',
  'count': '43' },

{
  'id': '59',
  'city_name': '大庆',
  'city_pre': 'D',
  'city_pinyin': 'Daqing',
  'city_short': 'dq',
  'count': '31' },

{
  'id': '60',
  'city_name': '临沂',
  'city_pre': 'L',
  'city_pinyin': 'Linyi',
  'city_short': 'ly',
  'count': '41' },

{
  'id': '61',
  'city_name': '株洲',
  'city_pre': 'Z',
  'city_pinyin': 'Zhuzhou',
  'city_short': 'zz',
  'count': '22' },

{
  'id': '62',
  'city_name': '上饶',
  'city_pre': 'S',
  'city_pinyin': 'Shangrao',
  'city_short': 'sr',
  'count': '42' },

{
  'id': '63',
  'city_name': '常德',
  'city_pre': 'C',
  'city_pinyin': 'Changde',
  'city_short': 'cd',
  'count': '40' },

{
  'id': '64',
  'city_name': '榆林',
  'city_pre': 'Y',
  'city_pinyin': 'Yulin',
  'city_short': 'yl',
  'count': '25' },

{
  'id': '65',
  'city_name': '潍坊',
  'city_pre': 'W',
  'city_pinyin': 'Weifang',
  'city_short': 'wf',
  'count': '25' },

{
  'id': '66',
  'city_name': '邯郸',
  'city_pre': 'H',
  'city_pinyin': 'Handan',
  'city_short': 'hd',
  'count': '30' },

{
  'id': '67',
  'city_name': '岳阳',
  'city_pre': 'Y',
  'city_pinyin': 'Yueyang',
  'city_short': 'yy',
  'count': '27' },

{
  'id': '68',
  'city_name': '衡阳',
  'city_pre': 'H',
  'city_pinyin': 'Hengyang',
  'city_short': 'hy',
  'count': '28' },

{
  'id': '69',
  'city_name': '珠海',
  'city_pre': 'Z',
  'city_pinyin': 'Zhuhai',
  'city_short': 'zh',
  'count': '30' },

{
  'id': '70',
  'city_name': '东营',
  'city_pre': 'D',
  'city_pinyin': 'Dongying',
  'city_short': 'dy',
  'count': '17' },

{
  'id': '71',
  'city_name': '郴州',
  'city_pre': 'C',
  'city_pinyin': 'Chenzhou',
  'city_short': 'cz',
  'count': '34' },

{
  'id': '72',
  'city_name': '绍兴',
  'city_pre': 'S',
  'city_pinyin': 'Shaoxing',
  'city_short': 'sx',
  'count': '27' },

{
  'id': '73',
  'city_name': '南充',
  'city_pre': 'N',
  'city_pinyin': 'Nanchong',
  'city_short': 'nc',
  'count': '30' },

{
  'id': '74',
  'city_name': '扬州',
  'city_pre': 'Y',
  'city_pinyin': 'Yangzhou',
  'city_short': 'yz',
  'count': '31' },

{
  'id': '75',
  'city_name': '马鞍山',
  'city_pre': 'M',
  'city_pinyin': 'Maanshan',
  'city_short': 'mas',
  'count': '26' },

{
  'id': '76',
  'city_name': '宜春',
  'city_pre': 'Y',
  'city_pinyin': 'Yichun',
  'city_short': 'yc',
  'count': '26' },

{
  'id': '77',
  'city_name': '湛江',
  'city_pre': 'Z',
  'city_pinyin': 'Zhanjiang',
  'city_short': 'zj',
  'count': '24' },

{
  'id': '78',
  'city_name': '十堰',
  'city_pre': 'S',
  'city_pinyin': 'Shiyan',
  'city_short': 'sy',
  'count': '20' },

{
  'id': '79',
  'city_name': '海口',
  'city_pre': 'H',
  'city_pinyin': 'Haikou',
  'city_short': 'hk',
  'count': '31' },

{
  'id': '80',
  'city_name': '运城',
  'city_pre': 'Y',
  'city_pinyin': 'Yuncheng',
  'city_short': 'yc',
  'count': '28' },

{
  'id': '81',
  'city_name': '菏泽',
  'city_pre': 'H',
  'city_pinyin': 'Heze',
  'city_short': 'hz',
  'count': '22' },

{
  'id': '82',
  'city_name': '九江',
  'city_pre': 'J',
  'city_pinyin': 'Jiujiang',
  'city_short': 'jj',
  'count': '39' },

{
  'id': '83',
  'city_name': '南阳',
  'city_pre': 'N',
  'city_pinyin': 'Nanyang',
  'city_short': 'ny',
  'count': '35' },

{
  'id': '84',
  'city_name': '昆山',
  'city_pre': 'K',
  'city_pinyin': 'Kunshan',
  'city_short': 'ks',
  'count': '20' },

{
  'id': '85',
  'city_name': '桂林',
  'city_pre': 'G',
  'city_pinyin': 'Guilin',
  'city_short': 'gl',
  'count': '34' },

{
  'id': '86',
  'city_name': '金华',
  'city_pre': 'J',
  'city_pinyin': 'Jinhua',
  'city_short': 'jh',
  'count': '31' },

{
  'id': '87',
  'city_name': '湘潭',
  'city_pre': 'X',
  'city_pinyin': 'Xiangtan',
  'city_short': 'xt',
  'count': '21' },

{
  'id': '88',
  'city_name': '济宁',
  'city_pre': 'J',
  'city_pinyin': 'Jining',
  'city_short': 'jn',
  'count': '22' },

{
  'id': '89',
  'city_name': '西宁',
  'city_pre': 'X',
  'city_pinyin': 'Xining',
  'city_short': 'xn',
  'count': '19' },

{
  'id': '90',
  'city_name': '遵义',
  'city_pre': 'Z',
  'city_pinyin': 'Zunyi',
  'city_short': 'zy',
  'count': '29' },

{
  'id': '91',
  'city_name': '红河',
  'city_pre': 'H',
  'city_pinyin': 'Honghe',
  'city_short': 'hh',
  'count': '22' },

{
  'id': '92',
  'city_name': '张家口',
  'city_pre': 'Z',
  'city_pinyin': 'Zhangjiakou',
  'city_short': 'zjk',
  'count': '24' },

{
  'id': '93',
  'city_name': '呼和浩特',
  'city_pre': 'H',
  'city_pinyin': 'Hohhot',
  'city_short': 'hhht',
  'count': '32' },

{
  'id': '94',
  'city_name': '娄底',
  'city_pre': 'L',
  'city_pinyin': 'Loudi',
  'city_short': 'ld',
  'count': '14' },

{
  'id': '95',
  'city_name': '滁州',
  'city_pre': 'C',
  'city_pinyin': 'Chuzhou',
  'city_short': 'cz',
  'count': '25' },

{
  'id': '96',
  'city_name': '安庆',
  'city_pre': 'A',
  'city_pinyin': 'Anqing',
  'city_short': 'aq',
  'count': '22' },

{
  'id': '97',
  'city_name': '肇庆',
  'city_pre': 'Z',
  'city_pinyin': 'Zhaoqing',
  'city_short': 'zq',
  'count': '21' },

{
  'id': '98',
  'city_name': '宿迁',
  'city_pre': 'S',
  'city_pinyin': 'Suqian',
  'city_short': 'sq',
  'count': '25' },

{
  'id': '99',
  'city_name': '汕头',
  'city_pre': 'S',
  'city_pinyin': 'Shantou',
  'city_short': 'st',
  'count': '27' },

{
  'id': '100',
  'city_name': '绵阳',
  'city_pre': 'M',
  'city_pinyin': 'Mianyang',
  'city_short': 'my',
  'count': '24' },

{
  'id': '101',
  'city_name': '信阳',
  'city_pre': 'X',
  'city_pinyin': 'Xinyang',
  'city_short': 'xy',
  'count': '20' },

{
  'id': '102',
  'city_name': '新余',
  'city_pre': 'X',
  'city_pinyin': 'Xinyu',
  'city_short': 'xy',
  'count': '12' },

{
  'id': '103',
  'city_name': '嘉兴',
  'city_pre': 'J',
  'city_pinyin': 'Jiaxing',
  'city_short': 'jx',
  'count': '32' },

{
  'id': '104',
  'city_name': '怀化',
  'city_pre': 'H',
  'city_pinyin': 'Huaihua',
  'city_short': 'hh',
  'count': '24' },

{
  'id': '105',
  'city_name': '保定',
  'city_pre': 'B',
  'city_pinyin': 'Baoding',
  'city_short': 'bd',
  'count': '30' },

{
  'id': '106',
  'city_name': '黄石',
  'city_pre': 'H',
  'city_pinyin': 'Huangshi',
  'city_short': 'hs',
  'count': '13' },

{
  'id': '107',
  'city_name': '黄山',
  'city_pre': 'H',
  'city_pinyin': 'Huangshan',
  'city_short': 'hs',
  'count': '16' },

{
  'id': '108',
  'city_name': '平顶山',
  'city_pre': 'P',
  'city_pinyin': 'Pingdingshan',
  'city_short': 'pds',
  'count': '24' },

{
  'id': '109',
  'city_name': '焦作',
  'city_pre': 'J',
  'city_pinyin': 'Jiaozuo',
  'city_short': 'jz',
  'count': '21' },

{
  'id': '110',
  'city_name': '镇江',
  'city_pre': 'Z',
  'city_pinyin': 'Zhenjiang',
  'city_short': 'zj',
  'count': '19' },

{
  'id': '111',
  'city_name': '日照',
  'city_pre': 'R',
  'city_pinyin': 'Rizhao',
  'city_short': 'rz',
  'count': '16' },

{
  'id': '112',
  'city_name': '安阳',
  'city_pre': 'A',
  'city_pinyin': 'Anyang',
  'city_short': 'ay',
  'count': '14' },

{
  'id': '113',
  'city_name': '龙岩',
  'city_pre': 'L',
  'city_pinyin': 'Longyan',
  'city_short': 'ly',
  'count': '15' },

{
  'id': '114',
  'city_name': '六安',
  'city_pre': 'L',
  'city_pinyin': 'luan',
  'city_short': 'la',
  'count': '24' },

{
  'id': '115',
  'city_name': '吴江',
  'city_pre': 'W',
  'city_pinyin': 'Wujiang',
  'city_short': 'wj',
  'count': '8' },

{
  'id': '116',
  'city_name': '吉安',
  'city_pre': 'J',
  'city_pinyin': 'Jian',
  'city_short': 'ja',
  'count': '25' },

{
  'id': '117',
  'city_name': '舟山',
  'city_pre': 'Z',
  'city_pinyin': 'Zhoushan',
  'city_short': 'zs',
  'count': '15' },

{
  'id': '118',
  'city_name': '滨州',
  'city_pre': 'B',
  'city_pinyin': 'Binzhou',
  'city_short': 'bz',
  'count': '14' },

{
  'id': '119',
  'city_name': '柳州',
  'city_pre': 'L',
  'city_pinyin': 'Liuzhou',
  'city_short': 'lz',
  'count': '20' },

{
  'id': '120',
  'city_name': '连云港',
  'city_pre': 'L',
  'city_pinyin': 'Lianyungang',
  'city_short': 'lyg',
  'count': '20' },

{
  'id': '121',
  'city_name': '三明',
  'city_pre': 'S',
  'city_pinyin': 'Sanming',
  'city_short': 'sm',
  'count': '18' },

{
  'id': '122',
  'city_name': '包头',
  'city_pre': 'B',
  'city_pinyin': 'Baotou',
  'city_short': 'bt',
  'count': '20' },

{
  'id': '123',
  'city_name': '盘锦',
  'city_pre': 'P',
  'city_pinyin': 'Panjin',
  'city_short': 'pj',
  'count': '11' },

{
  'id': '124',
  'city_name': '江阴',
  'city_pre': 'J',
  'city_pinyin': 'Jiangyin',
  'city_short': 'jy',
  'count': '18' },

{
  'id': '125',
  'city_name': '余姚',
  'city_pre': 'Y',
  'city_pinyin': 'Yuyao',
  'city_short': 'yy',
  'count': '10' },

{
  'id': '126',
  'city_name': '枣庄',
  'city_pre': 'Z',
  'city_pinyin': 'Zaozhuang',
  'city_short': 'zz',
  'count': '17' },

{
  'id': '127',
  'city_name': '抚州',
  'city_pre': 'F',
  'city_pinyin': 'Fuzhou',
  'city_short': 'fz',
  'count': '25' },

{
  'id': '128',
  'city_name': '呼伦贝尔',
  'city_pre': 'H',
  'city_pinyin': 'Hulun Buir',
  'city_short': 'hlbe',
  'count': '14' },

{
  'id': '129',
  'city_name': '开封',
  'city_pre': 'K',
  'city_pinyin': 'Kaifeng',
  'city_short': 'kf',
  'count': '17' },

{
  'id': '130',
  'city_name': '乐山',
  'city_pre': 'L',
  'city_pinyin': 'Leshan',
  'city_short': 'ls',
  'count': '19' },

{
  'id': '131',
  'city_name': '泰安',
  'city_pre': 'T',
  'city_pinyin': 'Taian',
  'city_short': 'ta',
  'count': '17' },

{
  'id': '132',
  'city_name': '泰州',
  'city_pre': 'T',
  'city_pinyin': 'Taizhou',
  'city_short': 'tz',
  'count': '22' },

{
  'id': '133',
  'city_name': '遂宁',
  'city_pre': 'S',
  'city_pinyin': 'Suining',
  'city_short': 'sn',
  'count': '15' },

{
  'id': '134',
  'city_name': '漳州',
  'city_pre': 'Z',
  'city_pinyin': 'Zhangzhou',
  'city_short': 'zz',
  'count': '22' },

{
  'id': '135',
  'city_name': '抚顺',
  'city_pre': 'F',
  'city_pinyin': 'Fushun',
  'city_short': 'fs',
  'count': '11' },

{
  'id': '136',
  'city_name': '韶关',
  'city_pre': 'S',
  'city_pinyin': 'Shaoguan',
  'city_short': 'sg',
  'count': '21' },

{
  'id': '137',
  'city_name': '鄂尔多斯',
  'city_pre': 'E',
  'city_pinyin': 'Eerduosi',
  'city_short': 'eeds',
  'count': '20' },

{
  'id': '138',
  'city_name': '黄冈',
  'city_pre': 'H',
  'city_pinyin': 'Huanggang',
  'city_short': 'hg',
  'count': '23' },

{
  'id': '139',
  'city_name': '宜兴',
  'city_pre': 'Y',
  'city_pinyin': 'Yixing',
  'city_short': 'yx',
  'count': '10' },

{
  'id': '140',
  'city_name': '德州',
  'city_pre': 'D',
  'city_pinyin': 'Dezhou',
  'city_short': 'dz',
  'count': '18' },

{
  'id': '141',
  'city_name': '聊城',
  'city_pre': 'L',
  'city_pinyin': 'Liaocheng',
  'city_short': 'lc',
  'count': '16' },

{
  'id': '142',
  'city_name': '晋江',
  'city_pre': 'J',
  'city_pinyin': 'Jinjiang',
  'city_short': 'jj',
  'count': '11' },

{
  'id': '143',
  'city_name': '鞍山',
  'city_pre': 'A',
  'city_pinyin': 'Anshan',
  'city_short': 'as',
  'count': '16' },

{
  'id': '144',
  'city_name': '梅州',
  'city_pre': 'M',
  'city_pinyin': 'Meizhou',
  'city_short': 'mz',
  'count': '18' },

{
  'id': '145',
  'city_name': '义乌',
  'city_pre': 'Y',
  'city_pinyin': 'Yiwu',
  'city_short': 'yw',
  'count': '22' },

{
  'id': '146',
  'city_name': '眉山',
  'city_pre': 'M',
  'city_pinyin': 'Meishan',
  'city_short': 'ms',
  'count': '16' },

{
  'id': '147',
  'city_name': '益阳',
  'city_pre': 'Y',
  'city_pinyin': 'Yiyang',
  'city_short': 'yy',
  'count': '24' },

{
  'id': '148',
  'city_name': '吕梁',
  'city_pre': 'L',
  'city_pinyin': 'Lvliang',
  'city_short': 'll',
  'count': '17' },

{
  'id': '149',
  'city_name': '浏阳',
  'city_pre': 'L',
  'city_pinyin': 'Liuyang',
  'city_short': 'ly',
  'count': '15' },

{
  'id': '150',
  'city_name': '即墨',
  'city_pre': 'J',
  'city_pinyin': 'Jimo',
  'city_short': 'jm',
  'count': '6' },

{
  'id': '151',
  'city_name': '荆州',
  'city_pre': 'J',
  'city_pinyin': 'Jingzhou',
  'city_short': 'jz',
  'count': '25' },

{
  'id': '152',
  'city_name': '慈溪',
  'city_pre': 'C',
  'city_pinyin': 'Cixi',
  'city_short': 'cx',
  'count': '10' },

{
  'id': '153',
  'city_name': '潮州',
  'city_pre': 'C',
  'city_pinyin': 'Chaozhou',
  'city_short': 'cz',
  'count': '9' },

{
  'id': '154',
  'city_name': '咸宁',
  'city_pre': 'X',
  'city_pinyin': 'Xianning',
  'city_short': 'xn',
  'count': '16' },

{
  'id': '155',
  'city_name': '巴彦淖尔',
  'city_pre': 'B',
  'city_pinyin': 'Bayannaoer',
  'city_short': 'byze',
  'count': '12' },

{
  'id': '156',
  'city_name': '蚌埠',
  'city_pre': 'B',
  'city_pinyin': 'Bengbu',
  'city_short': 'bb',
  'count': '22' },

{
  'id': '157',
  'city_name': '阜阳',
  'city_pre': 'F',
  'city_pinyin': 'Fuyang',
  'city_short': 'fy',
  'count': '26' },

{
  'id': '158',
  'city_name': '恩施',
  'city_pre': 'E',
  'city_pinyin': 'Enshi',
  'city_short': 'es',
  'count': '15' },

{
  'id': '159',
  'city_name': '常熟',
  'city_pre': 'C',
  'city_pinyin': 'Changshu',
  'city_short': 'cs',
  'count': '16' },

{
  'id': '160',
  'city_name': '晋城',
  'city_pre': 'J',
  'city_pinyin': 'Jincheng',
  'city_short': 'jc',
  'count': '11' },

{
  'id': '161',
  'city_name': '寿光',
  'city_pre': 'S',
  'city_pinyin': 'Shouguang',
  'city_short': 'sg',
  'count': '7' },

{
  'id': '162',
  'city_name': '海宁',
  'city_pre': 'H',
  'city_pinyin': 'Haining',
  'city_short': 'hn',
  'count': '9' },

{
  'id': '163',
  'city_name': '靖江',
  'city_pre': 'J',
  'city_pinyin': 'Jingjiang',
  'city_short': 'jj',
  'count': '12' },

{
  'id': '164',
  'city_name': '营口',
  'city_pre': 'Y',
  'city_pinyin': 'Yingkou',
  'city_short': 'yk',
  'count': '15' },

{
  'id': '165',
  'city_name': '邵阳',
  'city_pre': 'S',
  'city_pinyin': 'Shaoyang',
  'city_short': 'sy',
  'count': '20' },

{
  'id': '166',
  'city_name': '荆门',
  'city_pre': 'J',
  'city_pinyin': 'Jingmen',
  'city_short': 'jm',
  'count': '18' },

{
  'id': '167',
  'city_name': '大同',
  'city_pre': 'D',
  'city_pinyin': 'Datong',
  'city_short': 'dt',
  'count': '21' },

{
  'id': '168',
  'city_name': '张家港',
  'city_pre': 'Z',
  'city_pinyin': 'Zhangjiagang',
  'city_short': 'zjg',
  'count': '20' },

{
  'id': '169',
  'city_name': '六盘水',
  'city_pre': 'L',
  'city_pinyin': 'Liupanshui',
  'city_short': 'lps',
  'count': '10' },

{
  'id': '170',
  'city_name': '宝鸡',
  'city_pre': 'B',
  'city_pinyin': 'Baoji',
  'city_short': 'bj',
  'count': '28' },

{
  'id': '171',
  'city_name': '永州',
  'city_pre': 'Y',
  'city_pinyin': 'Yongzhou',
  'city_short': 'yz',
  'count': '19' },

{
  'id': '172',
  'city_name': '亳州',
  'city_pre': 'B',
  'city_pinyin': 'Bozhou',
  'city_short': 'bz',
  'count': '13' },

{
  'id': '173',
  'city_name': '泸州',
  'city_pre': 'L',
  'city_pinyin': 'Luzhou',
  'city_short': 'lz',
  'count': '16' },

{
  'id': '174',
  'city_name': '茂名',
  'city_pre': 'M',
  'city_pinyin': 'Maoming',
  'city_short': 'mm',
  'count': '16' },

{
  'id': '175',
  'city_name': '沧州',
  'city_pre': 'C',
  'city_pinyin': 'Cangzhou',
  'city_short': 'cz',
  'count': '19' },

{
  'id': '176',
  'city_name': '咸阳',
  'city_pre': 'X',
  'city_pinyin': 'Xianyang',
  'city_short': 'xy',
  'count': '23' },

{
  'id': '177',
  'city_name': '桐乡',
  'city_pre': 'T',
  'city_pinyin': 'Tongxiang',
  'city_short': 'tx',
  'count': '9' },

{
  'id': '178',
  'city_name': '葫芦岛',
  'city_pre': 'H',
  'city_pinyin': 'Huludao',
  'city_short': 'hld',
  'count': '12' },

{
  'id': '179',
  'city_name': '周口',
  'city_pre': 'Z',
  'city_pinyin': 'Zhoukou',
  'city_short': 'zk',
  'count': '23' },

{
  'id': '180',
  'city_name': '濮阳',
  'city_pre': 'P',
  'city_pinyin': 'Puyang',
  'city_short': 'py',
  'count': '19' },

{
  'id': '181',
  'city_name': '莆田',
  'city_pre': 'P',
  'city_pinyin': 'Putian',
  'city_short': 'pt',
  'count': '16' },

{
  'id': '182',
  'city_name': '清远',
  'city_pre': 'Q',
  'city_pinyin': 'Qingyuan',
  'city_short': 'qy',
  'count': '15' },

{
  'id': '183',
  'city_name': '萍乡',
  'city_pre': 'P',
  'city_pinyin': 'Pingxiang',
  'city_short': 'px',
  'count': '12' },

{
  'id': '184',
  'city_name': '秦皇岛',
  'city_pre': 'Q',
  'city_pinyin': 'Qinhuangdao',
  'city_short': 'qhd',
  'count': '13' },

{
  'id': '185',
  'city_name': '宜昌',
  'city_pre': 'Y',
  'city_pinyin': 'Yichang',
  'city_short': 'yc',
  'count': '18' },

{
  'id': '186',
  'city_name': '宜宾',
  'city_pre': 'Y',
  'city_pinyin': 'Yibin',
  'city_short': 'yb',
  'count': '24' },

{
  'id': '187',
  'city_name': '瑞安',
  'city_pre': 'R',
  'city_pinyin': 'Ruian',
  'city_short': 'ra',
  'count': '7' },

{
  'id': '188',
  'city_name': '揭阳',
  'city_pre': 'J',
  'city_pinyin': 'Jieyang',
  'city_short': 'jy',
  'count': '20' },

{
  'id': '189',
  'city_name': '赤峰',
  'city_pre': 'C',
  'city_pinyin': 'Chifeng',
  'city_short': 'cf',
  'count': '19' },

{
  'id': '190',
  'city_name': '诸暨',
  'city_pre': 'Z',
  'city_pinyin': 'Zhuji',
  'city_short': 'zj',
  'count': '12' },

{
  'id': '191',
  'city_name': '商丘',
  'city_pre': 'S',
  'city_pinyin': 'Shangqiu',
  'city_short': 'sq',
  'count': '28' },

{
  'id': '192',
  'city_name': '许昌',
  'city_pre': 'X',
  'city_pinyin': 'Xuchang',
  'city_short': 'xc',
  'count': '10' },

{
  'id': '193',
  'city_name': '河源',
  'city_pre': 'H',
  'city_pinyin': 'Heyuan',
  'city_short': 'hy',
  'count': '21' },

{
  'id': '194',
  'city_name': '内江',
  'city_pre': 'N',
  'city_pinyin': 'Neijiang',
  'city_short': 'nj',
  'count': '13' },

{
  'id': '195',
  'city_name': '北海',
  'city_pre': 'B',
  'city_pinyin': 'Beihai',
  'city_short': 'bh',
  'count': '11' },

{
  'id': '196',
  'city_name': '襄阳',
  'city_pre': 'X',
  'city_pinyin': 'Xiangyang',
  'city_short': 'xy',
  'count': '26' },

{
  'id': '197',
  'city_name': '玉林',
  'city_pre': 'Y',
  'city_pinyin': 'Yulin',
  'city_short': 'yl',
  'count': '17' },

{
  'id': '198',
  'city_name': '宣城',
  'city_pre': 'X',
  'city_pinyin': 'Xuancheng',
  'city_short': 'xc',
  'count': '16' },

{
  'id': '199',
  'city_name': '渭南',
  'city_pre': 'W',
  'city_pinyin': 'Weinan',
  'city_short': 'wn',
  'count': '18' },

{
  'id': '200',
  'city_name': '仙桃',
  'city_pre': 'X',
  'city_pinyin': 'Xiantao',
  'city_short': 'xt',
  'count': '11' },

{
  'id': '201',
  'city_name': '如皋',
  'city_pre': 'R',
  'city_pinyin': 'Rugao',
  'city_short': 'rg',
  'count': '8' },

{
  'id': '202',
  'city_name': '太仓',
  'city_pre': 'T',
  'city_pinyin': 'Taicang',
  'city_short': 'tc',
  'count': '6' },

{
  'id': '203',
  'city_name': '邢台',
  'city_pre': 'G',
  'city_pinyin': 'Xingtai',
  'city_short': 'gt',
  'count': '15' },

{
  'id': '204',
  'city_name': '承德',
  'city_pre': 'C',
  'city_pinyin': 'Chengde',
  'city_short': 'cd',
  'count': '15' },

{
  'id': '205',
  'city_name': '南平',
  'city_pre': 'N',
  'city_pinyin': 'Nanping',
  'city_short': 'np',
  'count': '13' },

{
  'id': '206',
  'city_name': '大理',
  'city_pre': 'D',
  'city_pinyin': 'Dali',
  'city_short': 'dl',
  'count': '30' },

{
  'id': '207',
  'city_name': '阿克苏',
  'city_pre': 'A',
  'city_pinyin': 'Akesu',
  'city_short': 'aks',
  'count': '8' },

{
  'id': '208',
  'city_name': '齐齐哈尔',
  'city_pre': 'Q',
  'city_pinyin': 'Qiqihar',
  'city_short': 'qqhe',
  'count': '13' },

{
  'id': '209',
  'city_name': '阳江',
  'city_pre': 'Y',
  'city_pinyin': 'Yangjiang',
  'city_short': 'yj',
  'count': '18' },

{
  'id': '210',
  'city_name': '泰兴',
  'city_pre': 'T',
  'city_pinyin': 'Taixing',
  'city_short': 'tx',
  'count': '7' },

{
  'id': '211',
  'city_name': '延安',
  'city_pre': 'Y',
  'city_pinyin': 'Yanan',
  'city_short': 'ya',
  'count': '25' },

{
  'id': '212',
  'city_name': '锦州',
  'city_pre': 'J',
  'city_pinyin': 'Jinzhou',
  'city_short': 'jz',
  'count': '16' },

{
  'id': '213',
  'city_name': '自贡',
  'city_pre': 'Z',
  'city_pinyin': 'Zigong',
  'city_short': 'zg',
  'count': '14' },

{
  'id': '214',
  'city_name': '廊坊',
  'city_pre': 'L',
  'city_pinyin': 'Langfang',
  'city_short': 'lf',
  'count': '20' },

{
  'id': '215',
  'city_name': '淮北',
  'city_pre': 'H',
  'city_pinyin': 'Huaibei',
  'city_short': 'hb',
  'count': '8' },

{
  'id': '216',
  'city_name': '莱芜',
  'city_pre': 'L',
  'city_pinyin': 'Laiwu',
  'city_short': 'lw',
  'count': '5' },

{
  'id': '217',
  'city_name': '安顺',
  'city_pre': 'A',
  'city_pinyin': 'Anshun',
  'city_short': 'as',
  'count': '14' },

{
  'id': '218',
  'city_name': '济源',
  'city_pre': 'J',
  'city_pinyin': 'Jiyuan',
  'city_short': 'jy',
  'count': '5' },

{
  'id': '219',
  'city_name': '达州',
  'city_pre': 'D',
  'city_pinyin': 'Dazhou',
  'city_short': 'dz',
  'count': '15' },

{
  'id': '220',
  'city_name': '海门',
  'city_pre': 'H',
  'city_pinyin': 'Haimen',
  'city_short': 'hm',
  'count': '8' },

{
  'id': '221',
  'city_name': '吉林市',
  'city_pre': 'J',
  'city_pinyin': 'Jilin',
  'city_short': 'jls',
  'count': '18' },

{
  'id': '222',
  'city_name': '资阳',
  'city_pre': 'Z',
  'city_pinyin': 'Ziyang',
  'city_short': 'zy',
  'count': '9' },

{
  'id': '223',
  'city_name': '玉溪',
  'city_pre': 'Y',
  'city_pinyin': 'Yuxi',
  'city_short': 'yx',
  'count': '16' },

{
  'id': '224',
  'city_name': '德阳',
  'city_pre': 'D',
  'city_pinyin': 'Deyang',
  'city_short': 'dy',
  'count': '22' },

{
  'id': '225',
  'city_name': '胶州',
  'city_pre': 'J',
  'city_pinyin': 'Jiaozhou',
  'city_short': 'jz',
  'count': '2' },

{
  'id': '226',
  'city_name': '梧州',
  'city_pre': 'W',
  'city_pinyin': 'Wuzhou',
  'city_short': 'wz',
  'count': '11' },

{
  'id': '227',
  'city_name': '东港',
  'city_pre': 'D',
  'city_pinyin': 'Donggang',
  'city_short': 'dg',
  'count': '2' },

{
  'id': '228',
  'city_name': '宁德',
  'city_pre': 'N',
  'city_pinyin': 'Ningde',
  'city_short': 'nd',
  'count': '12' },

{
  'id': '229',
  'city_name': '三亚',
  'city_pre': 'S',
  'city_pinyin': 'Sanya',
  'city_short': 'sy',
  'count': '16' },

{
  'id': '230',
  'city_name': '驻马店',
  'city_pre': 'Z',
  'city_pinyin': 'Zhumadian',
  'city_short': 'zmd',
  'count': '23' },

{
  'id': '231',
  'city_name': '东阳',
  'city_pre': 'D',
  'city_pinyin': 'Dongyang',
  'city_short': 'dy',
  'count': '7' },

{
  'id': '232',
  'city_name': '三河',
  'city_pre': 'S',
  'city_pinyin': 'Sanhe',
  'city_short': 'sh',
  'count': '8' },

{
  'id': '233',
  'city_name': '扬中',
  'city_pre': 'Y',
  'city_pinyin': 'Yangzhong',
  'city_short': 'yz',
  'count': '4' },

{
  'id': '234',
  'city_name': '攀枝花',
  'city_pre': 'P',
  'city_pinyin': 'Panzhihua',
  'city_short': 'pzh',
  'count': '11' },

{
  'id': '235',
  'city_name': '佳木斯',
  'city_pre': 'J',
  'city_pinyin': 'Jiamusi',
  'city_short': 'jms',
  'count': '14' },

{
  'id': '236',
  'city_name': '迁安',
  'city_pre': 'Q',
  'city_pinyin': 'Qianan',
  'city_short': 'qa',
  'count': '3' },

{
  'id': '237',
  'city_name': '钦州',
  'city_pre': 'Q',
  'city_pinyin': 'Qinzhou',
  'city_short': 'qz',
  'count': '9' },

{
  'id': '238',
  'city_name': '延边',
  'city_pre': 'Y',
  'city_pinyin': 'Yanbian',
  'city_short': 'yb',
  'count': '8' },

{
  'id': '239',
  'city_name': '宁国',
  'city_pre': 'N',
  'city_pinyin': 'Ningguo',
  'city_short': 'ng',
  'count': '3' },

{
  'id': '240',
  'city_name': '曲靖',
  'city_pre': 'Q',
  'city_pinyin': 'Qujing',
  'city_short': 'qj',
  'count': '22' },

{
  'id': '241',
  'city_name': '保山',
  'city_pre': 'B',
  'city_pinyin': 'Baoshan',
  'city_short': 'bs',
  'count': '11' },

{
  'id': '242',
  'city_name': '通化',
  'city_pre': 'T',
  'city_pinyin': 'Tonghua',
  'city_short': 'th',
  'count': '12' },

{
  'id': '243',
  'city_name': '通辽',
  'city_pre': 'T',
  'city_pinyin': 'Tongliao',
  'city_short': 'tl',
  'count': '15' },

{
  'id': '244',
  'city_name': '孝感',
  'city_pre': 'X',
  'city_pinyin': 'Xiaogan',
  'city_short': 'xg',
  'count': '19' },

{
  'id': '245',
  'city_name': '防城港',
  'city_pre': 'F',
  'city_pinyin': 'Fangchenggang',
  'city_short': 'fcg',
  'count': '8' },

{
  'id': '246',
  'city_name': '贵港',
  'city_pre': 'G',
  'city_pinyin': 'Guigang',
  'city_short': 'gg',
  'count': '5' },

{
  'id': '247',
  'city_name': '铜仁',
  'city_pre': 'T',
  'city_pinyin': 'Tongren',
  'city_short': 'tr',
  'count': '15' },

{
  'id': '248',
  'city_name': '阜新',
  'city_pre': 'F',
  'city_pinyin': 'Fuxin',
  'city_short': 'fx',
  'count': '9' },

{
  'id': '249',
  'city_name': '福清',
  'city_pre': 'F',
  'city_pinyin': 'Fuqing',
  'city_short': 'fq',
  'count': '8' },

{
  'id': '250',
  'city_name': '文山',
  'city_pre': 'W',
  'city_pinyin': 'Wenshan',
  'city_short': 'ws',
  'count': '13' },

{
  'id': '251',
  'city_name': '高平',
  'city_pre': 'G',
  'city_pinyin': 'Gaoping',
  'city_short': 'gp',
  'count': '3' },

{
  'id': '252',
  'city_name': '温岭',
  'city_pre': 'W',
  'city_pinyin': 'Wenling',
  'city_short': 'wl',
  'count': '13' },

{
  'id': '253',
  'city_name': '安康',
  'city_pre': 'A',
  'city_pinyin': 'Ankang',
  'city_short': 'ak',
  'count': '17' },

{
  'id': '254',
  'city_name': '海盐',
  'city_pre': 'H',
  'city_pinyin': 'Haiyan',
  'city_short': 'hy',
  'count': '4' },

{
  'id': '255',
  'city_name': '长治',
  'city_pre': 'C',
  'city_pinyin': 'Changzhi',
  'city_short': 'cz',
  'count': '23' },

{
  'id': '256',
  'city_name': '鹤壁',
  'city_pre': 'H',
  'city_pinyin': 'Hebi',
  'city_short': 'hb',
  'count': '7' },

{
  'id': '257',
  'city_name': '汉中',
  'city_pre': 'H',
  'city_pinyin': 'Hanzhong',
  'city_short': 'hz',
  'count': '21' },

{
  'id': '258',
  'city_name': '石嘴山',
  'city_pre': 'S',
  'city_pinyin': 'Shizuishan',
  'city_short': 'szs',
  'count': '8' },

{
  'id': '259',
  'city_name': '随州',
  'city_pre': 'S',
  'city_pinyin': 'Suizhou',
  'city_short': 'sz',
  'count': '7' },

{
  'id': '260',
  'city_name': '宿州',
  'city_pre': 'S',
  'city_pinyin': 'Suzhou',
  'city_short': 'sz',
  'count': '16' },

{
  'id': '261',
  'city_name': '绥化',
  'city_pre': 'S',
  'city_pinyin': 'Suihua',
  'city_short': 'sh',
  'count': '13' },

{
  'id': '262',
  'city_name': '海安',
  'city_pre': 'H',
  'city_pinyin': 'Haian',
  'city_short': 'ha',
  'count': '3' },

{
  'id': '263',
  'city_name': '思茅',
  'city_pre': 'S',
  'city_pinyin': 'Simao',
  'city_short': 'sm',
  'count': '7' },

{
  'id': '264',
  'city_name': '龙口',
  'city_pre': 'L',
  'city_pinyin': 'Longkou',
  'city_short': 'lk',
  'count': '3' },

{
  'id': '265',
  'city_name': '临汾',
  'city_pre': 'L',
  'city_pinyin': 'Linfen',
  'city_short': 'lf',
  'count': '29' },

{
  'id': '266',
  'city_name': '丹东',
  'city_pre': 'D',
  'city_pinyin': 'Dandong',
  'city_short': 'dd',
  'count': '8' },

{
  'id': '267',
  'city_name': '耒阳',
  'city_pre': 'L',
  'city_pinyin': 'Leiyang',
  'city_short': 'ly',
  'count': '3' },

{
  'id': '268',
  'city_name': '辽阳',
  'city_pre': 'L',
  'city_pinyin': 'Liaoyang',
  'city_short': 'ly',
  'count': '8' },

{
  'id': '269',
  'city_name': '鹰潭',
  'city_pre': 'Y',
  'city_pinyin': 'Yingtan',
  'city_short': 'yt',
  'count': '6' },

{
  'id': '270',
  'city_name': '临海',
  'city_pre': 'L',
  'city_pinyin': 'Linhai',
  'city_short': 'lh',
  'count': '7' },

{
  'id': '271',
  'city_name': '丹阳',
  'city_pre': 'D',
  'city_pinyin': 'Danyang',
  'city_short': 'dy',
  'count': '8' },

{
  'id': '272',
  'city_name': '景德镇',
  'city_pre': 'J',
  'city_pinyin': 'Jingdezhen',
  'city_short': 'jdz',
  'count': '7' },

{
  'id': '273',
  'city_name': '溧阳',
  'city_pre': 'L',
  'city_pinyin': 'Liyang',
  'city_short': 'ly',
  'count': '5' },

{
  'id': '274',
  'city_name': '陇南',
  'city_pre': 'L',
  'city_pinyin': 'Longnan',
  'city_short': 'ln',
  'count': '10' },

{
  'id': '275',
  'city_name': '仪征',
  'city_pre': 'Y',
  'city_pinyin': 'Yizheng',
  'city_short': 'yz',
  'count': '4' },

{
  'id': '276',
  'city_name': '云浮',
  'city_pre': 'Y',
  'city_pinyin': 'Yunfu',
  'city_short': 'yf',
  'count': '10' },

{
  'id': '277',
  'city_name': '廉江',
  'city_pre': 'L',
  'city_pinyin': 'Lianjiang',
  'city_short': 'lj',
  'count': '4' },

{
  'id': '278',
  'city_name': '辽源',
  'city_pre': 'L',
  'city_pinyin': 'Liaoyuan',
  'city_short': 'ly',
  'count': '9' },

{
  'id': '279',
  'city_name': '涿州',
  'city_pre': 'Z',
  'city_pinyin': 'Zhuozhou',
  'city_short': 'zz',
  'count': '4' },

{
  'id': '280',
  'city_name': '固原',
  'city_pre': 'G',
  'city_pinyin': 'Guyuan',
  'city_short': 'gy',
  'count': '2' },

{
  'id': '281',
  'city_name': '儋州市',
  'city_pre': 'D',
  'city_pinyin': 'danzhou',
  'city_short': 'dzs',
  'count': '3' },

{
  'id': '282',
  'city_name': '永康',
  'city_pre': 'Y',
  'city_pinyin': 'Yongkang',
  'city_short': 'yk',
  'count': '6' },

{
  'id': '283',
  'city_name': '汕尾',
  'city_pre': 'S',
  'city_pinyin': 'Shanwei',
  'city_short': 'sw',
  'count': '12' },

{
  'id': '284',
  'city_name': '鄂州',
  'city_pre': 'E',
  'city_pinyin': 'Ezhou',
  'city_short': 'ez',
  'count': '6' },

{
  'id': '285',
  'city_name': '兴化',
  'city_pre': 'X',
  'city_pinyin': 'Xinghua',
  'city_short': 'xh',
  'count': '4' },

{
  'id': '286',
  'city_name': '松滋',
  'city_pre': 'S',
  'city_pinyin': 'Songzi',
  'city_short': 'sz',
  'count': '2' },

{
  'id': '287',
  'city_name': '峨眉山',
  'city_pre': 'E',
  'city_pinyin': 'Emeishan',
  'city_short': 'ems',
  'count': '3' },

{
  'id': '288',
  'city_name': '朝阳',
  'city_pre': 'C',
  'city_pinyin': 'Chaoyang',
  'city_short': 'cy',
  'count': '9' },

{
  'id': '289',
  'city_name': '喀什',
  'city_pre': 'K',
  'city_pinyin': 'Kashgar',
  'city_short': 'ks',
  'count': '7' },

{
  'id': '290',
  'city_name': '巢湖',
  'city_pre': 'C',
  'city_pinyin': 'Chaohu',
  'city_short': 'ch',
  'count': '3' },

{
  'id': '291',
  'city_name': '永安',
  'city_pre': 'Y',
  'city_pinyin': 'Yongan',
  'city_short': 'ya',
  'count': '2' },

{
  'id': '292',
  'city_name': '四平',
  'city_pre': 'S',
  'city_pinyin': 'Siping',
  'city_short': 'sp',
  'count': '13' },

{
  'id': '293',
  'city_name': '松原',
  'city_pre': 'S',
  'city_pinyin': 'Songyuan',
  'city_short': 'sy',
  'count': '10' },

{
  'id': '294',
  'city_name': '西双版纳',
  'city_pre': 'X',
  'city_pinyin': 'Xishuangbanna',
  'city_short': 'xsbn',
  'count': '6' },

{
  'id': '295',
  'city_name': '莱阳',
  'city_pre': 'L',
  'city_pinyin': 'Laiyang',
  'city_short': 'ly',
  'count': '4' },

{
  'id': '296',
  'city_name': '长葛',
  'city_pre': 'C',
  'city_pinyin': 'Changge',
  'city_short': 'cg',
  'count': '2' },

{
  'id': '297',
  'city_name': '盖州',
  'city_pre': 'G',
  'city_pinyin': 'Gaizhou',
  'city_short': 'gz',
  'count': '3' },

{
  'id': '298',
  'city_name': '湘西',
  'city_pre': 'X',
  'city_pinyin': 'Xiangxi',
  'city_short': 'xx',
  'count': '13' },

{
  'id': '299',
  'city_name': '奉化',
  'city_pre': 'F',
  'city_pinyin': 'Fenghua',
  'city_short': 'fh',
  'count': '3' },

{
  'id': '300',
  'city_name': '利川',
  'city_pre': 'L',
  'city_pinyin': 'Lichuan',
  'city_short': 'lc',
  'count': '3' },

{
  'id': '301',
  'city_name': '邹城',
  'city_pre': 'Z',
  'city_pinyin': 'Zoucheng',
  'city_short': 'zc',
  'count': '2' },

{
  'id': '302',
  'city_name': '高邮',
  'city_pre': 'G',
  'city_pinyin': 'Gaoyou',
  'city_short': 'gy',
  'count': '4' },

{
  'id': '303',
  'city_name': '本溪',
  'city_pre': 'B',
  'city_pinyin': 'Benxi',
  'city_short': 'bx',
  'count': '10' },

{
  'id': '304',
  'city_name': '拉萨',
  'city_pre': 'L',
  'city_pinyin': 'Lhasa',
  'city_short': 'ls',
  'count': '5' },

{
  'id': '305',
  'city_name': '北流',
  'city_pre': 'B',
  'city_pinyin': 'Beiliu',
  'city_short': 'bl',
  'count': '3' },

{
  'id': '306',
  'city_name': '毕节',
  'city_pre': 'B',
  'city_pinyin': 'Bijie',
  'city_short': 'bj',
  'count': '13' },

{
  'id': '307',
  'city_name': '富阳',
  'city_pre': 'F',
  'city_pinyin': 'Fuyang',
  'city_short': 'fy',
  'count': '4' },

{
  'id': '308',
  'city_name': '五家渠',
  'city_pre': 'W',
  'city_pinyin': 'Wujiaqu',
  'city_short': 'wgq',
  'count': '4' },

{
  'id': '309',
  'city_name': '铜陵',
  'city_pre': 'T',
  'city_pinyin': 'Tongling',
  'city_short': 'tl',
  'count': '8' },

{
  'id': '310',
  'city_name': '广元',
  'city_pre': 'G',
  'city_pinyin': 'Guangyuan',
  'city_short': 'gy',
  'count': '14' },

{
  'id': '311',
  'city_name': '天门',
  'city_pre': 'T',
  'city_pinyin': 'Tianmen',
  'city_short': 'tm',
  'count': '4' },

{
  'id': '312',
  'city_name': '天水',
  'city_pre': 'T',
  'city_pinyin': 'Tianshui',
  'city_short': 'ts',
  'count': '12' },

{
  'id': '313',
  'city_name': '肥城',
  'city_pre': 'F',
  'city_pinyin': 'Feicheng',
  'city_short': 'fc',
  'count': '2' },

{
  'id': '314',
  'city_name': '西昌',
  'city_pre': 'X',
  'city_pinyin': 'Xichang',
  'city_short': 'xc',
  'count': '3' },

{
  'id': '315',
  'city_name': '滕州',
  'city_pre': 'T',
  'city_pinyin': 'Tengzhou',
  'city_short': 'tz',
  'count': '4' },

{
  'id': '316',
  'city_name': '铜川',
  'city_pre': 'T',
  'city_pinyin': 'Tongchuan',
  'city_short': 'tc',
  'count': '5' },

{
  'id': '317',
  'city_name': '临安',
  'city_pre': 'L',
  'city_pinyin': 'Linan',
  'city_short': 'la',
  'count': '4' },

{
  'id': '318',
  'city_name': '百色',
  'city_pre': 'B',
  'city_pinyin': 'Baise',
  'city_short': 'bs',
  'count': '16' },

{
  'id': '319',
  'city_name': '孝义',
  'city_pre': 'X',
  'city_pinyin': 'Xiaoyi',
  'city_short': 'xy',
  'count': '3' },

{
  'id': '320',
  'city_name': '铁岭',
  'city_pre': 'T',
  'city_pinyin': 'Tieling',
  'city_short': 'tl',
  'count': '8' },

{
  'id': '321',
  'city_name': '禹州',
  'city_pre': 'Y',
  'city_pinyin': 'Yuzhou',
  'city_short': 'yz',
  'count': '2' },

{
  'id': '322',
  'city_name': '淮南',
  'city_pre': 'H',
  'city_pinyin': 'Huainan',
  'city_short': 'hn',
  'count': '12' },

{
  'id': '323',
  'city_name': '青州',
  'city_pre': 'Q',
  'city_pinyin': 'Qingzhou',
  'city_short': 'qz',
  'count': '4' },

{
  'id': '324',
  'city_name': '张掖',
  'city_pre': 'Z',
  'city_pinyin': 'Zhangye',
  'city_short': 'zy',
  'count': '3' },

{
  'id': '325',
  'city_name': '潜江',
  'city_pre': 'Q',
  'city_pinyin': 'Qianjiang',
  'city_short': 'qj',
  'count': '9' },

{
  'id': '326',
  'city_name': '启东',
  'city_pre': 'Q',
  'city_pinyin': 'Qidong',
  'city_short': 'qd',
  'count': '11' },

{
  'id': '327',
  'city_name': '化州',
  'city_pre': 'H',
  'city_pinyin': 'Huazhou',
  'city_short': 'hz',
  'count': '4' },

{
  'id': '328',
  'city_name': '诸城',
  'city_pre': 'Z',
  'city_pinyin': 'Zhucheng',
  'city_short': 'zc',
  'count': '1' },

{
  'id': '329',
  'city_name': '满洲里',
  'city_pre': 'M',
  'city_pinyin': 'Manzhouli',
  'city_short': 'mzl',
  'count': '7' },

{
  'id': '330',
  'city_name': '芒市',
  'city_pre': 'M',
  'city_pinyin': 'Mangshi',
  'city_short': 'ms',
  'count': '3' },

{
  'id': '331',
  'city_name': '阳泉',
  'city_pre': 'Y',
  'city_pinyin': 'Yangquan',
  'city_short': 'yq',
  'count': '10' },

{
  'id': '332',
  'city_name': '侯马',
  'city_pre': 'H',
  'city_pinyin': 'Houma',
  'city_short': 'hm',
  'count': '3' },

{
  'id': '333',
  'city_name': '赤壁',
  'city_pre': 'C',
  'city_pinyin': 'Chibi',
  'city_short': 'cb',
  'count': '3' },

{
  'id': '334',
  'city_name': '金坛',
  'city_pre': 'J',
  'city_pinyin': 'Jintan',
  'city_short': 'jt',
  'count': '3' },

{
  'id': '335',
  'city_name': '从化',
  'city_pre': 'C',
  'city_pinyin': 'Conghua',
  'city_short': 'ch',
  'count': '3' },

{
  'id': '336',
  'city_name': '英德',
  'city_pre': 'Y',
  'city_pinyin': 'Yingde',
  'city_short': 'yd',
  'count': '2' },

{
  'id': '337',
  'city_name': '江油',
  'city_pre': 'J',
  'city_pinyin': 'Jiangyou',
  'city_short': 'jy',
  'count': '4' },

{
  'id': '338',
  'city_name': '嘉峪关',
  'city_pre': 'J',
  'city_pinyin': 'Jiayuguan',
  'city_short': 'jyg',
  'count': '5' },

{
  'id': '339',
  'city_name': '白山',
  'city_pre': 'B',
  'city_pinyin': 'Baishan',
  'city_short': 'bs',
  'count': '9' },

{
  'id': '340',
  'city_name': '伊犁',
  'city_pre': 'Y',
  'city_pinyin': 'Yili',
  'city_short': 'yl',
  'count': '13' },

{
  'id': '341',
  'city_name': '平湖',
  'city_pre': 'P',
  'city_pinyin': 'Pinghu',
  'city_short': 'ph',
  'count': '3' },

{
  'id': '342',
  'city_name': '江都',
  'city_pre': 'J',
  'city_pinyin': 'Jiangdu',
  'city_short': 'jd',
  'count': '4' },

{
  'id': '343',
  'city_name': '兖州',
  'city_pre': 'Y',
  'city_pinyin': 'Yanzhou',
  'city_short': 'yz',
  'count': '2' },

{
  'id': '344',
  'city_name': '南安',
  'city_pre': 'N',
  'city_pinyin': 'Nanan',
  'city_short': 'na',
  'count': '4' },

{
  'id': '345',
  'city_name': '姜堰',
  'city_pre': 'J',
  'city_pinyin': 'Jiangyan',
  'city_short': 'jy',
  'count': '2' },

{
  'id': '346',
  'city_name': '牡丹江',
  'city_pre': 'M',
  'city_pinyin': 'Mudanjiang',
  'city_short': 'mdj',
  'count': '13' },

{
  'id': '347',
  'city_name': '东台',
  'city_pre': 'D',
  'city_pinyin': 'Dongtai',
  'city_short': 'dt',
  'count': '2' },

{
  'id': '348',
  'city_name': '三门峡',
  'city_pre': 'S',
  'city_pinyin': 'Sanmenxia',
  'city_short': 'smx',
  'count': '9' },

{
  'id': '349',
  'city_name': '都江堰',
  'city_pre': 'D',
  'city_pinyin': 'Dujiangyan',
  'city_short': 'djy',
  'count': '2' },

{
  'id': '350',
  'city_name': '鹤岗',
  'city_pre': 'H',
  'city_pinyin': 'Hegang',
  'city_short': 'hg',
  'count': '4' },

{
  'id': '351',
  'city_name': '凯里',
  'city_pre': 'K',
  'city_pinyin': 'Kaili',
  'city_short': 'kl',
  'count': '5' },

{
  'id': '352',
  'city_name': '沙河',
  'city_pre': 'S',
  'city_pinyin': 'Shahe',
  'city_short': 'sh',
  'count': '3' },

{
  'id': '353',
  'city_name': '衡水',
  'city_pre': 'H',
  'city_pinyin': 'Hengshui',
  'city_short': 'hs',
  'count': '13' },

{
  'id': '354',
  'city_name': '宣威',
  'city_pre': 'X',
  'city_pinyin': 'Xuanwei',
  'city_short': 'xw',
  'count': '4' },

{
  'id': '355',
  'city_name': '河津',
  'city_pre': 'H',
  'city_pinyin': 'Hejin',
  'city_short': 'hj',
  'count': '2' },

{
  'id': '356',
  'city_name': '商洛',
  'city_pre': 'S',
  'city_pinyin': 'Shangluo',
  'city_short': 'sl',
  'count': '13' },

{
  'id': '357',
  'city_name': '鹤山',
  'city_pre': 'H',
  'city_pinyin': 'Heshan',
  'city_short': 'hs',
  'count': '3' },

{
  'id': '358',
  'city_name': '上虞',
  'city_pre': 'S',
  'city_pinyin': 'Shangyu',
  'city_short': 'sy',
  'count': '4' },

{
  'id': '359',
  'city_name': '雅安',
  'city_pre': 'Y',
  'city_pinyin': 'Yaan',
  'city_short': 'ya',
  'count': '10' },

{
  'id': '360',
  'city_name': '开原',
  'city_pre': 'K',
  'city_pinyin': 'Kaiyuan',
  'city_short': 'ky',
  'count': '2' },

{
  'id': '361',
  'city_name': '张家界',
  'city_pre': 'Z',
  'city_pinyin': 'Zhangjiajie',
  'city_short': 'zgj',
  'count': '7' },

{
  'id': '362',
  'city_name': '句容',
  'city_pre': 'J',
  'city_pinyin': 'Jurong',
  'city_short': 'jr',
  'count': '5' },

{
  'id': '363',
  'city_name': '贺州',
  'city_pre': 'H',
  'city_pinyin': 'Hezhou',
  'city_short': 'hz',
  'count': '4' },

{
  'id': '364',
  'city_name': '白城',
  'city_pre': 'B',
  'city_pinyin': 'Baicheng',
  'city_short': 'bc',
  'count': '5' },

{
  'id': '365',
  'city_name': '汾阳',
  'city_pre': 'F',
  'city_pinyin': 'Fenyang',
  'city_short': 'fy',
  'count': '2' },

{
  'id': '366',
  'city_name': '白银',
  'city_pre': 'B',
  'city_pinyin': 'Baiyin',
  'city_short': 'by',
  'count': '10' },

{
  'id': '367',
  'city_name': '遵化',
  'city_pre': 'Z',
  'city_pinyin': 'Zunhua',
  'city_short': 'zh',
  'count': '2' },

{
  'id': '368',
  'city_name': '漳平',
  'city_pre': 'Z',
  'city_pinyin': 'Zhangping',
  'city_short': 'zp',
  'count': '1' },

{
  'id': '369',
  'city_name': '招远',
  'city_pre': 'Z',
  'city_pinyin': 'Zhaoyuan',
  'city_short': 'zy',
  'count': '1' },

{
  'id': '370',
  'city_name': '霸州',
  'city_pre': 'B',
  'city_pinyin': 'Bazhou',
  'city_short': 'bz',
  'count': '2' },

{
  'id': '371',
  'city_name': '宜都',
  'city_pre': 'Y',
  'city_pinyin': 'Yidu',
  'city_short': 'yd',
  'count': '2' },

{
  'id': '372',
  'city_name': '项城',
  'city_pre': 'X',
  'city_pinyin': 'Xiangcheng',
  'city_short': 'xc',
  'count': '4' },

{
  'id': '373',
  'city_name': '湘乡',
  'city_pre': 'X',
  'city_pinyin': 'Xiangxiang',
  'city_short': 'xx',
  'count': '3' },

{
  'id': '374',
  'city_name': '应城',
  'city_pre': 'Y',
  'city_pinyin': 'Yingcheng',
  'city_short': 'yc',
  'count': '1' },

{
  'id': '375',
  'city_name': '忻州',
  'city_pre': 'X',
  'city_pinyin': 'Xinzhou',
  'city_short': 'xz',
  'count': '16' },

{
  'id': '376',
  'city_name': '兴宁',
  'city_pre': 'X',
  'city_pinyin': 'Xingning',
  'city_short': 'xn',
  'count': '1' },

{
  'id': '377',
  'city_name': '洋浦市',
  'city_pre': 'X',
  'city_pinyin': 'yangpushi',
  'city_short': 'xps',
  'count': '1' },

{
  'id': '378',
  'city_name': '兴平',
  'city_pre': 'X',
  'city_pinyin': 'Xingping',
  'city_short': 'xp',
  'count': '1' },

{
  'id': '379',
  'city_name': '伊宁',
  'city_pre': 'Y',
  'city_pinyin': 'Yining',
  'city_short': 'yn',
  'count': '5' },

{
  'id': '380',
  'city_name': '锡林浩特',
  'city_pre': 'X',
  'city_pinyin': 'Xilinhot',
  'city_short': 'xlht',
  'count': '4' },

{
  'id': '381',
  'city_name': '永城',
  'city_pre': 'Y',
  'city_pinyin': 'Yongcheng',
  'city_short': 'yc',
  'count': '1' },

{
  'id': '382',
  'city_name': '安陆',
  'city_pre': 'A',
  'city_pinyin': 'Anlu',
  'city_short': 'al',
  'count': '1' },

{
  'id': '383',
  'city_name': '樟树',
  'city_pre': 'Z',
  'city_pinyin': 'Zhangshu',
  'city_short': 'zs',
  'count': '4' },

{
  'id': '384',
  'city_name': '兴城',
  'city_pre': 'X',
  'city_pinyin': 'Xingcheng',
  'city_short': 'xc',
  'count': '1' },

{
  'id': '385',
  'city_name': '枝江',
  'city_pre': 'Z',
  'city_pinyin': 'Zhijiang',
  'city_short': 'zj',
  'count': '2' },

{
  'id': '386',
  'city_name': '安达',
  'city_pre': 'A',
  'city_pinyin': 'Anda',
  'city_short': 'ad',
  'count': '3' },

{
  'id': '387',
  'city_name': '信宜',
  'city_pre': 'X',
  'city_pinyin': 'Xinyi',
  'city_short': 'xy',
  'count': '2' },

{
  'id': '388',
  'city_name': '宜州',
  'city_pre': 'Y',
  'city_pinyin': 'Yizhou',
  'city_short': 'yz',
  'count': '2' },

{
  'id': '389',
  'city_name': '安宁',
  'city_pre': 'A',
  'city_pinyin': 'Anning',
  'city_short': 'an',
  'count': '1' },

{
  'id': '390',
  'city_name': '兴义',
  'city_pre': 'X',
  'city_pinyin': 'Xingyi',
  'city_short': 'xy',
  'count': '5' },

{
  'id': '391',
  'city_name': '钟祥',
  'city_pre': 'Z',
  'city_pinyin': 'Zhongxiang',
  'city_short': 'zx',
  'count': '2' },

{
  'id': '392',
  'city_name': '中卫',
  'city_pre': 'Z',
  'city_pinyin': 'Zhongwei',
  'city_short': 'zw',
  'count': '3' },

{
  'id': '393',
  'city_name': '巴中',
  'city_pre': 'B',
  'city_pinyin': 'Bazhong',
  'city_short': 'bz',
  'count': '10' },

{
  'id': '394',
  'city_name': '大石桥',
  'city_pre': 'D',
  'city_pinyin': 'Dashiqiao',
  'city_short': 'ddq',
  'count': '2' },

{
  'id': '395',
  'city_name': '兰溪',
  'city_pre': 'L',
  'city_pinyin': 'Lanxi',
  'city_short': 'lx',
  'count': '2' },

{
  'id': '396',
  'city_name': '莱州',
  'city_pre': 'L',
  'city_pinyin': 'Laizhou',
  'city_short': 'lz',
  'count': '2' },

{
  'id': '397',
  'city_name': '涟源',
  'city_pre': 'L',
  'city_pinyin': 'Lianyuan',
  'city_short': 'ly',
  'count': '2' },

{
  'id': '398',
  'city_name': '乐平',
  'city_pre': 'L',
  'city_pinyin': 'Leping',
  'city_short': 'lp',
  'count': '3' },

{
  'id': '399',
  'city_name': '冷水江',
  'city_pre': 'L',
  'city_pinyin': 'Lengshuijiang',
  'city_short': 'lsj',
  'count': '2' },

{
  'id': '400',
  'city_name': '鸡西',
  'city_pre': 'J',
  'city_pinyin': 'Jixi',
  'city_short': 'jx',
  'count': '3' },

{
  'id': '401',
  'city_name': '酒泉',
  'city_pre': 'J',
  'city_pinyin': 'Jiuquan',
  'city_short': 'jq',
  'count': '14' },

{
  'id': '402',
  'city_name': '登封',
  'city_pre': 'D',
  'city_pinyin': 'Dengfeng',
  'city_short': 'df',
  'count': '1' },

{
  'id': '403',
  'city_name': '来宾',
  'city_pre': 'L',
  'city_pinyin': 'Laibin',
  'city_short': 'lb',
  'count': '7' },

{
  'id': '404',
  'city_name': '库尔勒',
  'city_pre': 'K',
  'city_pinyin': 'Korla',
  'city_short': 'kel',
  'count': '4' },

{
  'id': '405',
  'city_name': '开平',
  'city_pre': 'K',
  'city_pinyin': 'Kaiping',
  'city_short': 'kp',
  'count': '4' },

{
  'id': '406',
  'city_name': '丽江',
  'city_pre': 'L',
  'city_pinyin': 'Lijiang',
  'city_short': 'lj',
  'count': '5' },

{
  'id': '407',
  'city_name': '鹿泉',
  'city_pre': 'L',
  'city_pinyin': 'Luquan',
  'city_short': 'lq',
  'count': '1' },

{
  'id': '408',
  'city_name': '漯河',
  'city_pre': 'L',
  'city_pinyin': 'Luohe',
  'city_short': 'lh',
  'count': '15' },

{
  'id': '409',
  'city_name': '丹江口',
  'city_pre': 'D',
  'city_pinyin': 'Danjiangkou',
  'city_short': 'djk',
  'count': '3' },

{
  'id': '410',
  'city_name': '孟州',
  'city_pre': 'M',
  'city_pinyin': 'Mengzhou',
  'city_short': 'mz',
  'count': '3' },

{
  'id': '411',
  'city_name': '梅河口',
  'city_pre': 'M',
  'city_pinyin': 'Meihekou',
  'city_short': 'mhk',
  'count': '3' },

{
  'id': '412',
  'city_name': '麻城',
  'city_pre': 'M',
  'city_pinyin': 'Macheng',
  'city_short': 'mc',
  'count': '3' },

{
  'id': '413',
  'city_name': '陵水',
  'city_pre': 'L',
  'city_pinyin': 'Lingshui',
  'city_short': 'ls',
  'count': '1' },

{
  'id': '414',
  'city_name': '临沧',
  'city_pre': 'L',
  'city_pinyin': 'Lincang',
  'city_short': 'lc',
  'count': '15' },

{
  'id': '415',
  'city_name': '醴陵',
  'city_pre': 'L',
  'city_pinyin': 'Liling',
  'city_short': 'll',
  'count': '3' },

{
  'id': '416',
  'city_name': '龙泉',
  'city_pre': 'L',
  'city_pinyin': 'Longquan',
  'city_short': 'lq',
  'count': '1' },

{
  'id': '417',
  'city_name': '龙海',
  'city_pre': 'L',
  'city_pinyin': 'Longhai',
  'city_short': 'lh',
  'count': '1' },

{
  'id': '418',
  'city_name': '临清',
  'city_pre': 'L',
  'city_pinyin': 'Linqing',
  'city_short': 'lq',
  'count': '2' },

{
  'id': '419',
  'city_name': '河池',
  'city_pre': 'H',
  'city_pinyin': 'Hechi',
  'city_short': 'hc',
  'count': '13' },

{
  'id': '420',
  'city_name': '都匀',
  'city_pre': 'D',
  'city_pinyin': 'Duyun',
  'city_short': 'dy',
  'count': '1' },

{
  'id': '421',
  'city_name': '汉川',
  'city_pre': 'H',
  'city_pinyin': 'Hanchuan',
  'city_short': 'hc',
  'count': '1' },

{
  'id': '422',
  'city_name': '洪湖',
  'city_pre': 'H',
  'city_pinyin': 'Honghu',
  'city_short': 'hh',
  'count': '4' },

{
  'id': '423',
  'city_name': '合作',
  'city_pre': 'G',
  'city_pinyin': 'Hezuo',
  'city_short': 'gz',
  'count': '1' },

{
  'id': '424',
  'city_name': '敦煌',
  'city_pre': 'D',
  'city_pinyin': 'Dunhuang',
  'city_short': 'dh',
  'count': '1' },

{
  'id': '425',
  'city_name': '格尔木',
  'city_pre': 'G',
  'city_pinyin': 'Geermu',
  'city_short': 'gem',
  'count': '2' },

{
  'id': '426',
  'city_name': '高安',
  'city_pre': 'G',
  'city_pinyin': 'Gaoan',
  'city_short': 'ga',
  'count': '3' },

{
  'id': '427',
  'city_name': '丰城',
  'city_pre': 'F',
  'city_pinyin': 'Fengcheng',
  'city_short': 'fc',
  'count': '4' },

{
  'id': '428',
  'city_name': '韩城',
  'city_pre': 'H',
  'city_pinyin': 'Hancheng',
  'city_short': 'hc',
  'count': '2' },

{
  'id': '429',
  'city_name': '贵溪',
  'city_pre': 'G',
  'city_pinyin': 'Guixi',
  'city_short': 'gx',
  'count': '4' },

{
  'id': '430',
  'city_name': '广汉',
  'city_pre': 'G',
  'city_pinyin': 'Guanghan',
  'city_short': 'gh',
  'count': '1' },

{
  'id': '431',
  'city_name': '迪庆',
  'city_pre': 'D',
  'city_pinyin': 'Diqing',
  'city_short': 'dq',
  'count': '2' },

{
  'id': '432',
  'city_name': '金昌',
  'city_pre': 'J',
  'city_pinyin': 'Jinchang',
  'city_short': 'jc',
  'count': '4' },

{
  'id': '433',
  'city_name': '德兴',
  'city_pre': 'D',
  'city_pinyin': 'Dexing',
  'city_short': 'dx',
  'count': '1' },

{
  'id': '434',
  'city_name': '界首',
  'city_pre': 'J',
  'city_pinyin': 'Jieshou',
  'city_short': 'js',
  'count': '1' },

{
  'id': '435',
  'city_name': '晋中',
  'city_pre': 'J',
  'city_pinyin': 'Jinzhong',
  'city_short': 'jz',
  'count': '18' },

{
  'id': '436',
  'city_name': '灯塔',
  'city_pre': 'D',
  'city_pinyin': 'Dengta',
  'city_short': 'dd',
  'count': '1' },

{
  'id': '437',
  'city_name': '邓州',
  'city_pre': 'D',
  'city_pinyin': 'Dengzhou',
  'city_short': 'dz',
  'count': '1' },

{
  'id': '438',
  'city_name': '定西',
  'city_pre': 'D',
  'city_pinyin': 'Dingxi',
  'city_short': 'dx',
  'count': '11' },

{
  'id': '439',
  'city_name': '珲春',
  'city_pre': 'H',
  'city_pinyin': 'Huichun',
  'city_short': 'hc',
  'count': '4' },

{
  'id': '440',
  'city_name': '华蓥',
  'city_pre': 'H',
  'city_pinyin': 'Huaying',
  'city_short': 'hy',
  'count': '1' },

{
  'id': '442',
  'city_name': '建德',
  'city_pre': 'J',
  'city_pinyin': 'Jiande',
  'city_short': 'jd',
  'count': '3' },

{
  'id': '443',
  'city_name': '虎林',
  'city_pre': 'H',
  'city_pinyin': 'Hulin',
  'city_short': 'hl',
  'count': '1' },

{
  'id': '444',
  'city_name': '朔州',
  'city_pre': 'S',
  'city_pinyin': 'Shuozhou',
  'city_short': 'sz',
  'count': '8' },

{
  'id': '445',
  'city_name': '双鸭山',
  'city_pre': 'S',
  'city_pinyin': 'Shuangyashan',
  'city_short': 'sys',
  'count': '9' },

{
  'id': '446',
  'city_name': '石狮',
  'city_pre': 'S',
  'city_pinyin': 'Shishi',
  'city_short': 'ss',
  'count': '3' },

{
  'id': '447',
  'city_name': '塔城',
  'city_pre': 'D',
  'city_pinyin': 'Tacheng',
  'city_short': 'dc',
  'count': '10' },

{
  'id': '448',
  'city_name': '长乐',
  'city_pre': 'C',
  'city_pinyin': 'Changle',
  'city_short': 'cl',
  'count': '5' },

{
  'id': '449',
  'city_name': '四会',
  'city_pre': 'S',
  'city_pinyin': 'Sihui',
  'city_short': 'sh',
  'count': '1' },

{
  'id': '450',
  'city_name': '射阳',
  'city_pre': 'S',
  'city_pinyin': 'Sheyangshi',
  'city_short': 'sys',
  'count': '2' },

{
  'id': '451',
  'city_name': '神农架',
  'city_pre': 'S',
  'city_pinyin': 'Shennongjia',
  'city_short': 'snjlo',
  'count': '1' },

{
  'id': '452',
  'city_name': '嵊州',
  'city_pre': 'S',
  'city_pinyin': 'Shengzhou',
  'city_short': 'sz',
  'count': '5' },

{
  'id': '453',
  'city_name': '昌邑',
  'city_pre': 'C',
  'city_pinyin': 'Changyi',
  'city_short': 'cy',
  'count': '3' },

{
  'id': '454',
  'city_name': '石河子',
  'city_pre': 'D',
  'city_pinyin': 'Shihezi',
  'city_short': 'dhz',
  'count': '6' },

{
  'id': '455',
  'city_name': '什邡',
  'city_pre': 'S',
  'city_pinyin': 'Shifang',
  'city_short': 'sf',
  'count': '1' },

{
  'id': '456',
  'city_name': '昌吉',
  'city_pre': 'C',
  'city_pinyin': 'Changji',
  'city_short': 'cj',
  'count': '8' },

{
  'id': '457',
  'city_name': '乌海',
  'city_pre': 'W',
  'city_pinyin': 'Wuhai',
  'city_short': 'wh',
  'count': '5' },

{
  'id': '458',
  'city_name': '吴川',
  'city_pre': 'W',
  'city_pinyin': 'Wuchuan',
  'city_short': 'wc',
  'count': '2' },

{
  'id': '459',
  'city_name': '武安',
  'city_pre': 'W',
  'city_pinyin': 'Wuan',
  'city_short': 'wa',
  'count': '2' },

{
  'id': '460',
  'city_name': '吴忠',
  'city_pre': 'W',
  'city_pinyin': 'Wuzhong',
  'city_short': 'wz',
  'count': '5' },

{
  'id': '461',
  'city_name': '武威',
  'city_pre': 'W',
  'city_pinyin': 'Wuwei',
  'city_short': 'ww',
  'count': '6' },

{
  'id': '462',
  'city_name': '乌兰浩特',
  'city_pre': 'W',
  'city_pinyin': 'Wulanhot',
  'city_short': 'wlht',
  'count': '10' },

{
  'id': '463',
  'city_name': '桐城',
  'city_pre': 'T',
  'city_pinyin': 'Tongcheng',
  'city_short': 'tc',
  'count': '2' },

{
  'id': '464',
  'city_name': '铁力',
  'city_pre': 'T',
  'city_pinyin': 'Tieli',
  'city_short': 'tl',
  'count': '1' },

{
  'id': '465',
  'city_name': '岑溪',
  'city_pre': 'C',
  'city_pinyin': 'Cenxi',
  'city_short': 'cx',
  'count': '1' },

{
  'id': '466',
  'city_name': '博乐',
  'city_pre': 'B',
  'city_pinyin': 'Bole',
  'city_short': 'bl',
  'count': '2' },

{
  'id': '467',
  'city_name': '泊头',
  'city_pre': 'B',
  'city_pinyin': 'Botou',
  'city_short': 'bt',
  'count': '2' },

{
  'id': '468',
  'city_name': '瓦房店',
  'city_pre': 'W',
  'city_pinyin': 'Wafangdian',
  'city_short': 'wfd',
  'count': '3' },

{
  'id': '469',
  'city_name': '平凉',
  'city_pre': 'P',
  'city_pinyin': 'Pingliang',
  'city_short': 'pl',
  'count': '13' },

{
  'id': '470',
  'city_name': '平度',
  'city_pre': 'P',
  'city_pinyin': 'Pingdu',
  'city_short': 'pd',
  'count': '2' },

{
  'id': '471',
  'city_name': '蓬莱',
  'city_pre': 'P',
  'city_pinyin': 'Penglai',
  'city_short': 'pl',
  'count': '3' },

{
  'id': '472',
  'city_name': '黔南',
  'city_pre': 'Q',
  'city_pinyin': 'Qiannan',
  'city_short': 'qn',
  'count': '14' },

{
  'id': '473',
  'city_name': '普兰店',
  'city_pre': 'P',
  'city_pinyin': 'Pulandian',
  'city_short': 'pld',
  'count': '2' },

{
  'id': '474',
  'city_name': '邳州',
  'city_pre': 'P',
  'city_pinyin': 'Pizhou',
  'city_short': 'pz',
  'count': '4' },

{
  'id': '475',
  'city_name': '楚雄',
  'city_pre': 'C',
  'city_pinyin': 'Chuxiong',
  'city_short': 'cx',
  'count': '16' },

{
  'id': '476',
  'city_name': '大丰',
  'city_pre': 'D',
  'city_pinyin': 'Dafeng',
  'city_short': 'df',
  'count': '3' },

{
  'id': '477',
  'city_name': '绵竹',
  'city_pre': 'M',
  'city_pinyin': 'Mianzhu',
  'city_short': 'mz',
  'count': '2' },

{
  'id': '478',
  'city_name': '池州',
  'city_pre': 'C',
  'city_pinyin': 'Chizhou',
  'city_short': 'cz',
  'count': '8' },

{
  'id': '479',
  'city_name': '讷河',
  'city_pre': 'N',
  'city_pinyin': 'Nehe',
  'city_short': 'nh',
  'count': '1' },

{
  'id': '480',
  'city_name': '崇州',
  'city_pre': 'C',
  'city_pinyin': 'Chongzhou',
  'city_short': 'cz',
  'count': '4' },

{
  'id': '481',
  'city_name': '庆阳',
  'city_pre': 'Q',
  'city_pinyin': 'Qingyang',
  'city_short': 'qy',
  'count': '11' },

{
  'id': '482',
  'city_name': '汝州',
  'city_pre': 'R',
  'city_pinyin': 'Ruzhou',
  'city_short': 'rz',
  'count': '1' },

{
  'id': '483',
  'city_name': '乳山',
  'city_pre': 'R',
  'city_pinyin': 'Rushan',
  'city_short': 'rs',
  'count': '1' },

{
  'id': '484',
  'city_name': '瑞昌',
  'city_pre': 'R',
  'city_pinyin': 'Ruichang',
  'city_short': 'rc',
  'count': '3' },

{
  'id': '485',
  'city_name': '邵武',
  'city_pre': 'S',
  'city_pinyin': 'Shaowu',
  'city_short': 'sw',
  'count': '3' },

{
  'id': '486',
  'city_name': '尚志',
  'city_pre': 'S',
  'city_pinyin': 'Shangzhi',
  'city_short': 'sz',
  'count': '2' },

{
  'id': '487',
  'city_name': '上高市',
  'city_pre': 'S',
  'city_pinyin': 'Shanggaoshi',
  'city_short': 'sgs',
  'count': '1' },

{
  'id': '488',
  'city_name': '曲阜',
  'city_pre': 'Q',
  'city_pinyin': 'Qufu',
  'city_short': 'qf',
  'count': '2' },

{
  'id': '489',
  'city_name': '邛崃',
  'city_pre': 'Q',
  'city_pinyin': 'Qionglai',
  'city_short': 'ql',
  'count': '1' },

{
  'id': '490',
  'city_name': '琼海',
  'city_pre': 'Q',
  'city_pinyin': 'Qionghai',
  'city_short': 'qh',
  'count': '4' },

{
  'id': '491',
  'city_name': '荣成',
  'city_pre': 'R',
  'city_pinyin': 'Rongcheng',
  'city_short': 'rc',
  'count': '2' },

{
  'id': '492',
  'city_name': '仁怀',
  'city_pre': 'R',
  'city_pinyin': 'Renhuai',
  'city_short': 'rh',
  'count': '1' },

{
  'id': '493',
  'city_name': '澄迈县',
  'city_pre': 'C',
  'city_pinyin': 'Chengmaixian',
  'city_short': 'cmx',
  'count': '2' },

{
  'id': '494',
  'city_name': '调兵山',
  'city_pre': 'D',
  'city_pinyin': 'Diaobingshan',
  'city_short': 'dbs',
  'count': '2' },

{
  'id': '495',
  'city_name': '巩义',
  'city_pre': 'G',
  'city_pinyin': 'Gongyi',
  'city_short': 'gy',
  'count': '2' },

{
  'id': '496',
  'city_name': '万宁',
  'city_pre': 'W',
  'city_pinyin': 'Wanning',
  'city_short': 'wn',
  'count': '1' },

{
  'id': '975',
  'city_name': '高州',
  'city_pre': 'G',
  'city_pinyin': 'Gaozhou',
  'city_short': 'gz',
  'count': '3' },

{
  'id': '976',
  'city_name': '伊春',
  'city_pre': 'Y',
  'city_pinyin': 'Yichun',
  'city_short': 'yc',
  'count': '4' },

{
  'id': '977',
  'city_name': '章丘',
  'city_pre': 'Z',
  'city_pinyin': 'Zhangqiu',
  'city_short': 'zq',
  'count': '3' },

{
  'id': '978',
  'city_name': '常宁',
  'city_pre': 'C',
  'city_pinyin': 'Changning',
  'city_short': 'cn',
  'count': '1' },

{
  'id': '979',
  'city_name': '福鼎',
  'city_pre': 'F',
  'city_pinyin': 'Fuding',
  'city_short': 'fd',
  'count': '1' },

{
  'id': '980',
  'city_name': '广水',
  'city_pre': 'G',
  'city_pinyin': 'Guangshui',
  'city_short': 'as',
  'count': '4' },

{
  'id': '981',
  'city_name': '广安',
  'city_pre': 'G',
  'city_pinyin': 'Guangan',
  'city_short': 'ga',
  'count': '9' },

{
  'id': '982',
  'city_name': '介休',
  'city_pre': 'J',
  'city_pinyin': 'Jiexiu',
  'city_short': 'jx',
  'count': '2' },

{
  'id': '983',
  'city_name': '临夏',
  'city_pre': 'L',
  'city_pinyin': 'Linxia',
  'city_short': 'lx',
  'count': '9' },

{
  'id': '984',
  'city_name': '海东',
  'city_pre': 'h',
  'city_pinyin': 'haidong',
  'city_short': 'hd',
  'count': '6' },

{
  'id': '985',
  'city_name': '乐清',
  'city_pre': 'L',
  'city_pinyin': 'Leqing',
  'city_short': 'lq',
  'count': '6' },

{
  'id': '986',
  'city_name': '吐鲁番',
  'city_pre': 'T',
  'city_pinyin': 'Turpan',
  'city_short': 'tlf',
  'count': '3' },

{
  'id': '987',
  'city_name': '屯昌县',
  'city_pre': 'T',
  'city_pinyin': 'Tunchangxian',
  'city_short': 'tcx',
  'count': '2' },

{
  'id': '988',
  'city_name': '双辽',
  'city_pre': 'S',
  'city_pinyin': 'Shuangliao',
  'city_short': 'sl',
  'count': '3' },

{
  'id': '989',
  'city_name': '定州',
  'city_pre': 'D',
  'city_pinyin': 'Dingzhou',
  'city_short': 'dz',
  'count': '4' },

{
  'id': '990',
  'city_name': '黔西南州',
  'city_pre': 'Q',
  'city_pinyin': 'Qianxinan',
  'city_short': 'qxn',
  'count': '10' },

{
  'id': '991',
  'city_name': '崇左',
  'city_pre': 'C',
  'city_pinyin': 'Chongzuo',
  'city_short': 'cz',
  'count': '8' },

{
  'id': '992',
  'city_name': '乌兰察布',
  'city_pre': 'W',
  'city_pinyin': 'Wulanchabu',
  'city_short': 'wlcb',
  'count': '12' },

{
  'id': '993',
  'city_name': '昭通',
  'city_pre': 'Z',
  'city_pinyin': 'Zhaotong',
  'city_short': 'zt',
  'count': '7' },

{
  'id': '994',
  'city_name': '德宏',
  'city_pre': 'D',
  'city_pinyin': 'Dehong',
  'city_short': 'dh',
  'count': '8' },

{
  'id': '995',
  'city_name': '七台河',
  'city_pre': 'Q',
  'city_pinyin': 'Qitaihe',
  'city_short': 'qth',
  'count': '3' },

{
  'id': '996',
  'city_name': '敦化',
  'city_pre': 'D',
  'city_pinyin': 'Dunhua',
  'city_short': 'dh',
  'count': '7' },

{
  'id': '997',
  'city_name': '克拉玛依',
  'city_pre': 'K',
  'city_pinyin': 'Karamay',
  'city_short': 'klmy',
  'count': '4' },

{
  'id': '998',
  'city_name': '东方',
  'city_pre': 'd',
  'city_pinyin': 'dongfang',
  'city_short': 'df',
  'count': '3' },

{
  'id': '999',
  'city_name': '高密',
  'city_pre': 'G',
  'city_pinyin': 'Gaomi',
  'city_short': 'gm',
  'count': '1' },

{
  'id': '1000',
  'city_name': '公主岭',
  'city_pre': 'G',
  'city_pinyin': 'Gongzhuling',
  'city_short': 'gzl',
  'count': '5' },

{
  'id': '1001',
  'city_name': '海城',
  'city_pre': 'H',
  'city_pinyin': 'Haicheng',
  'city_short': 'hc',
  'count': '2' },

{
  'id': '1002',
  'city_name': '阿勒泰',
  'city_pre': 'A',
  'city_pinyin': 'Aletai',
  'city_short': 'alt',
  'count': '3' },

{
  'id': '1003',
  'city_name': '任丘',
  'city_pre': 'R',
  'city_pinyin': 'Renqiu',
  'city_short': 'rq',
  'count': '3' },

{
  'id': '1004',
  'city_name': '双城',
  'city_pre': 'S',
  'city_pinyin': 'Shuangcheng',
  'city_short': 'sc',
  'count': '2' },

{
  'id': '1005',
  'city_name': '庄河',
  'city_pre': 'Z',
  'city_pinyin': 'Zhuanghe',
  'city_short': 'zh',
  'count': '2' },

{
  'id': '1006',
  'city_name': '当阳',
  'city_pre': 'D',
  'city_pinyin': 'Dangyang',
  'city_short': 'dy',
  'count': '2' },

{
  'id': '1007',
  'city_name': '华阴',
  'city_pre': 'H',
  'city_pinyin': 'Huayin',
  'city_short': 'hy',
  'count': '1' },

{
  'id': '1008',
  'city_name': '阆中',
  'city_pre': 'L',
  'city_pinyin': 'Langzhong',
  'city_short': 'lz',
  'count': '2' },

{
  'id': '1009',
  'city_name': '霍州',
  'city_pre': 'H',
  'city_pinyin': 'Huozhou',
  'city_short': 'hz',
  'count': '1' },

{
  'id': '1010',
  'city_name': '桦甸',
  'city_pre': 'H',
  'city_pinyin': 'Huadian',
  'city_short': 'hd',
  'count': '3' },

{
  'id': '1011',
  'city_name': '吉首',
  'city_pre': 'J',
  'city_pinyin': 'Jishou',
  'city_short': 'js',
  'count': '1' },

{
  'id': '1012',
  'city_name': '哈密',
  'city_pre': 'H',
  'city_pinyin': 'Hami',
  'city_short': 'hm',
  'count': '6' },

{
  'id': '1013',
  'city_name': '河间',
  'city_pre': 'H',
  'city_pinyin': 'Hejian',
  'city_short': 'hj',
  'count': '1' },

{
  'id': '1014',
  'city_name': '巴音郭楞',
  'city_pre': 'b',
  'city_pinyin': 'bayinguoleng',
  'city_short': 'bygl',
  'count': '3' },

{
  'id': '1015',
  'city_name': '简阳',
  'city_pre': 'J',
  'city_pinyin': 'Jianyang',
  'city_short': 'jy',
  'count': '2' },

{
  'id': '1016',
  'city_name': '北安',
  'city_pre': 'B',
  'city_pinyin': 'Beian',
  'city_short': 'ba',
  'count': '2' },

{
  'id': '1017',
  'city_name': '沅江',
  'city_pre': 'Y',
  'city_pinyin': 'Yuanjiang',
  'city_short': 'yj',
  'count': '1' },

{
  'id': '1018',
  'city_name': '天长',
  'city_pre': 'T',
  'city_pinyin': 'Tianchang',
  'city_short': 'tc',
  'count': '1' },

{
  'id': '1019',
  'city_name': '洮南',
  'city_pre': 'T',
  'city_pinyin': 'Taonan',
  'city_short': 'tn',
  'count': '2' },

{
  'id': '1020',
  'city_name': '大兴安岭',
  'city_pre': 'D',
  'city_pinyin': 'Daxinganling',
  'city_short': 'dxal',
  'count': '4' },

{
  'id': '1021',
  'city_name': '图门',
  'city_pre': 'T',
  'city_pinyin': 'Tumen',
  'city_short': 'tm',
  'count': '1' },

{
  'id': '1022',
  'city_name': '甘南',
  'city_pre': 'G',
  'city_pinyin': 'Gannan',
  'city_short': 'gn',
  'count': '9' },

{
  'id': '1023',
  'city_name': '福安',
  'city_pre': 'F',
  'city_pinyin': 'Fuan',
  'city_short': 'fa',
  'count': '3' },

{
  'id': '1024',
  'city_name': '大冶',
  'city_pre': 'D',
  'city_pinyin': 'Daye',
  'city_short': 'dy',
  'count': '1' },

{
  'id': '1025',
  'city_name': '时光市',
  'city_pre': 'S',
  'city_pinyin': 'Shiguangshi',
  'city_short': 'sgs',
  'count': '7' },

{
  'id': '1026',
  'city_name': '东兴',
  'city_pre': 'D',
  'city_pinyin': 'Dongxing',
  'city_short': 'dx',
  'count': '2' },

{
  'id': '1027',
  'city_name': '瑞金',
  'city_pre': 'R',
  'city_pinyin': 'Ruijin',
  'city_short': 'rj',
  'count': '2' },

{
  'id': '1028',
  'city_name': '汨罗',
  'city_pre': 'M',
  'city_pinyin': 'Miluo',
  'city_short': 'ml',
  'count': '2' },

{
  'id': '1029',
  'city_name': '辛集',
  'city_pre': 'X',
  'city_pinyin': 'Xinji',
  'city_short': 'xj',
  'count': '1' },

{
  'id': '1030',
  'city_name': '新密',
  'city_pre': 'X',
  'city_pinyin': 'Xinmi',
  'city_short': 'xm',
  'count': '1' },

{
  'id': '1031',
  'city_name': '延吉',
  'city_pre': 'Y',
  'city_pinyin': 'Yanji',
  'city_short': 'yj',
  'count': '3' },

{
  'id': '1032',
  'city_name': '老河口',
  'city_pre': 'L',
  'city_pinyin': 'Laohekou',
  'city_short': 'lhk',
  'count': '2' },

{
  'id': '1033',
  'city_name': '昌江',
  'city_pre': 'c',
  'city_pinyin': 'changjiang',
  'city_short': 'cj',
  'count': '1' },

{
  'id': '1034',
  'city_name': '乐东',
  'city_pre': 'l',
  'city_pinyin': 'ledong',
  'city_short': 'ld',
  'count': '3' },

{
  'id': '1035',
  'city_name': '锡林郭勒',
  'city_pre': 'X',
  'city_pinyin': 'Xilinguole',
  'city_short': 'xlgl',
  'count': '6' },

{
  'id': '1036',
  'city_name': '五常',
  'city_pre': 'W',
  'city_pinyin': 'Wuchang',
  'city_short': 'wc',
  'count': '1' },

{
  'id': '1037',
  'city_name': '五大连池',
  'city_pre': 'W',
  'city_pinyin': 'Wudalianchi',
  'city_short': 'wdlc',
  'count': '1' },

{
  'id': '1038',
  'city_name': '文昌',
  'city_pre': 'w',
  'city_pinyin': 'wenchang',
  'city_short': 'wc',
  'count': '3' },

{
  'id': '1039',
  'city_name': '临湘',
  'city_pre': 'L',
  'city_pinyin': 'Linxiang',
  'city_short': 'lx',
  'count': '1' },

{
  'id': '1040',
  'city_name': '龙井',
  'city_pre': 'L',
  'city_pinyin': 'Longjing',
  'city_short': 'lj',
  'count': '1' },

{
  'id': '1041',
  'city_name': '高碑店',
  'city_pre': 'G',
  'city_pinyin': 'Gaobeidian',
  'city_short': 'gbd',
  'count': '2' },

{
  'id': '1042',
  'city_name': '潞城',
  'city_pre': 'L',
  'city_pinyin': 'Lucheng',
  'city_short': 'lc',
  'count': '1' },

{
  'id': '1589',
  'city_name': '恩平',
  'city_pre': 'E',
  'city_pinyin': 'Enping',
  'city_short': 'ep',
  'count': '1' },

{
  'id': '2634',
  'city_name': '台山',
  'city_pre': 'T',
  'city_pinyin': 'Taishan',
  'city_short': 'ts',
  'count': '1' },

{
  'id': '3194',
  'city_name': '雷州',
  'city_pre': 'L',
  'city_pinyin': 'Leizhou',
  'city_short': 'lz',
  'count': '1' },

{
  'id': '3735',
  'city_name': '黑河',
  'city_pre': 'H',
  'city_pinyin': 'Heihe',
  'city_short': 'hh',
  'count': '3' },

{
  'id': '3777',
  'city_name': '新郑',
  'city_pre': 'X',
  'city_pinyin': 'Xinzheng',
  'city_short': 'xz',
  'count': '3' },

{
  'id': '4277',
  'city_name': '德惠',
  'city_pre': 'D',
  'city_pinyin': 'Dehui',
  'city_short': 'dh',
  'count': '2' },

{
  'id': '4295',
  'city_name': '蛟河',
  'city_pre': 'J',
  'city_pinyin': 'Jiaohe',
  'city_short': 'jh',
  'count': '2' },

{
  'id': '4304',
  'city_name': '林州',
  'city_pre': 'L',
  'city_pinyin': 'Linzhou',
  'city_short': 'lz',
  'count': '1' },

{
  'id': '4311',
  'city_name': '磐石',
  'city_pre': 'P',
  'city_pinyin': 'Panshi',
  'city_short': 'pd',
  'count': '3' },

{
  'id': '5398',
  'city_name': '二连浩特',
  'city_pre': 'E',
  'city_pinyin': 'Elianhot',
  'city_short': 'elht',
  'count': '1' },

{
  'id': '5968',
  'city_name': '莱西',
  'city_pre': 'L',
  'city_pinyin': 'Laixi',
  'city_short': 'lx',
  'count': '1' },

{
  'id': '5982',
  'city_name': '黔东南',
  'city_pre': 'Q',
  'city_pinyin': 'Qiandongnan',
  'city_short': 'qdn',
  'count': '13' },

{
  'id': '6536',
  'city_name': '陆丰',
  'city_pre': 'L',
  'city_pinyin': 'Lufeng',
  'city_short': 'lf',
  'count': '1' },

{
  'id': '7658',
  'city_name': '清镇',
  'city_pre': 'Q',
  'city_pinyin': 'Qingzhen',
  'city_short': 'qz',
  'count': '1' },

{
  'id': '8197',
  'city_name': '辉县',
  'city_pre': 'H',
  'city_pinyin': 'Huixian',
  'city_short': 'hx',
  'count': '2' },

{
  'id': '9039',
  'city_name': '甘孜',
  'city_pre': 'G',
  'city_pinyin': 'Ganzi',
  'city_short': 'gz',
  'count': '10' },

{
  'id': '9117',
  'city_name': '凉山',
  'city_pre': 'L',
  'city_pinyin': 'Liangshan',
  'city_short': 'ls',
  'count': '5' },

{
  'id': '9161',
  'city_name': '阿拉善',
  'city_pre': 'A',
  'city_pinyin': 'Alashan',
  'city_short': 'als',
  'count': '4' },

{
  'id': '9293',
  'city_name': '兴安',
  'city_pre': 'X',
  'city_pinyin': 'Xingan',
  'city_short': 'xa',
  'count': '2' },

{
  'id': '9294',
  'city_name': '新乐',
  'city_pre': 'X',
  'city_pinyin': 'Xinle',
  'city_short': 'xl',
  'count': '2' },

{
  'id': '9306',
  'city_name': '白沙',
  'city_pre': 'b',
  'city_pinyin': 'baisha',
  'city_short': 'bs',
  'count': '1' },

{
  'id': '9316',
  'city_name': '定安县',
  'city_pre': 'd',
  'city_pinyin': 'dinganxian',
  'city_short': 'dax',
  'count': '1' },

{
  'id': '9334',
  'city_name': '凌源',
  'city_pre': 'L',
  'city_pinyin': 'Lingyuan',
  'city_short': 'ly',
  'count': '1' },

{
  'id': '9343',
  'city_name': '密山',
  'city_pre': 'M',
  'city_pinyin': 'Mishan',
  'city_short': 'ms',
  'count': '1' },

{
  'id': '9344',
  'city_name': '南雄',
  'city_pre': 'N',
  'city_pinyin': 'Nanxiong',
  'city_short': 'nx',
  'count': '1' },

{
  'id': '9346',
  'city_name': '彭州市',
  'city_pre': 'P',
  'city_pinyin': 'Pengzhoushi',
  'city_short': 'pzs',
  'count': '1' },

{
  'id': '9645',
  'city_name': '阿坝',
  'city_pre': 'A',
  'city_pinyin': 'Aba',
  'city_short': 'ab',
  'count': '8' },

{
  'id': '9672',
  'city_name': '普洱',
  'city_pre': 'p',
  'city_pinyin': 'puer',
  'city_short': '',
  'count': '7' },

{
  'id': '9767',
  'city_name': '德令哈',
  'city_pre': 'D',
  'city_pinyin': 'Delingha',
  'city_short': 'dlh',
  'count': '3' },

{
  'id': '9795',
  'city_name': '怒江',
  'city_pre': 'N',
  'city_pinyin': 'Nujiang',
  'city_short': 'nj',
  'count': '3' },

{
  'id': '9822',
  'city_name': '阿拉尔',
  'city_pre': 'A',
  'city_pinyin': 'Alaer',
  'city_short': 'ale',
  'count': '2' },

{
  'id': '9825',
  'city_name': '博尔塔拉',
  'city_pre': 'b',
  'city_pinyin': 'boertala',
  'city_short': 'bedl',
  'count': '2' },

{
  'id': '9846',
  'city_name': '海南藏族自治州',
  'city_pre': 'H',
  'city_pinyin': 'Hainanzangzuzizhizhou',
  'city_short': 'hnczzzz',
  'count': '2' },

{
  'id': '9856',
  'city_name': '克孜勒',
  'city_pre': 'k',
  'city_pinyin': 'kezile',
  'city_short': 'kzl',
  'count': '2' },

{
  'id': '9875',
  'city_name': '沭阳',
  'city_pre': 'S',
  'city_pinyin': 'Shuyang',
  'city_short': 'sy',
  'count': '2' },

{
  'id': '9898',
  'city_name': '昌都',
  'city_pre': 'C',
  'city_pinyin': 'Changdu',
  'city_short': 'cd',
  'count': '1' },

{
  'id': '9910',
  'city_name': '海北',
  'city_pre': 'h',
  'city_pinyin': 'haibei',
  'city_short': 'hb',
  'count': '1' },

{
  'id': '9917',
  'city_name': '井冈山',
  'city_pre': 'J',
  'city_pinyin': 'Jinggangshan',
  'city_short': 'jgs',
  'count': '1' },

{
  'id': '9922',
  'city_name': '林芝',
  'city_pre': 'L',
  'city_pinyin': 'Linzhi',
  'city_short': 'lz',
  'count': '1' },

{
  'id': '9932',
  'city_name': '栖霞',
  'city_pre': 'Q',
  'city_pinyin': 'Qixia',
  'city_short': 'qx',
  'count': '2' },

{
  'id': '9934',
  'city_name': '瑞丽',
  'city_pre': 'R',
  'city_pinyin': 'Ruili',
  'city_short': 'rl',
  'count': '1' },

{
  'id': '9937',
  'city_name': '山南',
  'city_pre': 'S',
  'city_pinyin': 'Shannan',
  'city_short': 'sn',
  'count': '1' },

{
  'id': '9944',
  'city_name': '卫辉',
  'city_pre': 'W',
  'city_pinyin': 'Weihui',
  'city_short': 'wh',
  'count': '1' },

{
  'id': '9953',
  'city_name': '玉树',
  'city_pre': 'y',
  'city_pinyin': 'yushu',
  'city_short': 'ys',
  'count': '1' },

{
  'id': '11695',
  'city_name': '舒兰',
  'city_pre': 'S',
  'city_pinyin': 'Shulan',
  'city_short': 'sl',
  'count': '1' },

{
  'id': '11703',
  'city_name': '武夷山',
  'city_pre': 'W',
  'city_pinyin': 'Wuyishan',
  'city_short': 'wys',
  'count': '1' },

{
  'id': '12272',
  'city_name': '石首',
  'city_pre': 'S',
  'city_pinyin': 'Shishou',
  'city_short': 'ds',
  'count': '1' }];exports.citys = citys;

/***/ }),

/***/ 55:
/*!*********************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fsearch-page%2Fsearch-page"} ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _searchPage = _interopRequireDefault(__webpack_require__(/*! ./pages/search-page/search-page.vue */ 56));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_searchPage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 63:
/*!*******************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fvideo-page%2Fvideo-page"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _videoPage = _interopRequireDefault(__webpack_require__(/*! ./pages/video-page/video-page.vue */ 64));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_videoPage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 71:
/*!*******************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fabout-page%2Fabout-page"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _aboutPage = _interopRequireDefault(__webpack_require__(/*! ./pages/about-page/about-page.vue */ 72));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_aboutPage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 77:
/*!*****************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fbuy-snack%2Fbuy-snack"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _buySnack = _interopRequireDefault(__webpack_require__(/*! ./pages/buy-snack/buy-snack.vue */ 78));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_buySnack.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 8:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 83:
/*!*******************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fbuy-ticket%2Fbuy-ticket"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _buyTicket = _interopRequireDefault(__webpack_require__(/*! ./pages/buy-ticket/buy-ticket.vue */ 84));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_buyTicket.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 89:
/*!*************************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fcinema-detail%2Fcinema-detail"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _cinemaDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/cinema-detail/cinema-detail.vue */ 90));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_cinemaDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 9:
/*!**************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/static/libs/qqmap-wx-jssdk.min.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass = function () {function a(e, c) {for (var b = 0; b < c.length; b++) {var d = c[b];d.enumerable = d.enumerable || false;d.configurable = true;if ("value" in d) {d.writable = true;}Object.defineProperty(e, d.key, d);}}return function (d, b, c) {if (b) {a(d.prototype, b);}if (c) {a(d, c);}return d;};}();function _classCallCheck(a, b) {if (!(a instanceof b)) {throw new TypeError("Cannot call a class as a function");}}var ERROR_CONF = { KEY_ERR: 311, KEY_ERR_MSG: "key格式错误", PARAM_ERR: 310, PARAM_ERR_MSG: "请求参数信息有误", SYSTEM_ERR: 600, SYSTEM_ERR_MSG: "系统错误", WX_ERR_CODE: 1000, WX_OK_CODE: 200 };var BASE_URL = "https://apis.map.qq.com/ws/";var URL_SEARCH = BASE_URL + "place/v1/search";var URL_SUGGESTION = BASE_URL + "place/v1/suggestion";var URL_GET_GEOCODER = BASE_URL + "geocoder/v1/";var URL_CITY_LIST = BASE_URL + "district/v1/list";var URL_AREA_LIST = BASE_URL + "district/v1/getchildren";var URL_DISTANCE = BASE_URL + "distance/v1/";var Utils = { location2query: function location2query(c) {if (typeof c == "string") {return c;}var b = "";for (var a = 0; a < c.length; a++) {var e = c[a];if (!!b) {b += ";";}if (e.location) {b = b + e.location.lat + "," + e.location.lng;}if (e.latitude && e.longitude) {b = b + e.latitude + "," + e.longitude;}}return b;}, getWXLocation: function getWXLocation(c, b, a) {wx.getLocation({ type: "gcj02", success: c, fail: b, complete: a });}, getLocationParam: function getLocationParam(b) {if (typeof b == "string") {var a = b.split(",");if (a.length === 2) {b = { latitude: b.split(",")[0], longitude: b.split(",")[1] };} else {b = {};}}return b;}, polyfillParam: function polyfillParam(a) {a.success = a.success || function () {};a.fail = a.fail || function () {};a.complete = a.complete || function () {};}, checkParamKeyEmpty: function checkParamKeyEmpty(c, b) {if (!c[b]) {var a = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + b + "参数格式有误");c.fail(a);c.complete(a);return true;}return false;}, checkKeyword: function checkKeyword(a) {return !this.checkParamKeyEmpty(a, "keyword");}, checkLocation: function checkLocation(c) {var a = this.getLocationParam(c.location);if (!a || !a.latitude || !a.longitude) {var b = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + " location参数格式有误");c.fail(b);c.complete(b);return false;}return true;}, buildErrorConfig: function buildErrorConfig(a, b) {return { status: a, message: b };}, buildWxRequestConfig: function buildWxRequestConfig(c, a) {var b = this;a.header = { "content-type": "application/json" };a.method = "GET";a.success = function (d) {var e = d.data;if (e.status === 0) {c.success(e);} else {c.fail(e);}};a.fail = function (d) {d.statusCode = ERROR_CONF.WX_ERR_CODE;c.fail(b.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, result.errMsg));};a.complete = function (d) {var e = +d.statusCode;switch (e) {case ERROR_CONF.WX_ERR_CODE:c.complete(b.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, d.errMsg));break;case ERROR_CONF.WX_OK_CODE:var f = d.data;if (f.status === 0) {c.complete(f);} else {c.complete(b.buildErrorConfig(f.status, f.message));}break;default:c.complete(b.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));}};return a;}, locationProcess: function locationProcess(f, e, c, a) {var d = this;c = c || function (g) {g.statusCode = ERROR_CONF.WX_ERR_CODE;f.fail(d.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, g.errMsg));};a = a || function (g) {if (g.statusCode == ERROR_CONF.WX_ERR_CODE) {f.complete(d.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, g.errMsg));}};if (!f.location) {d.getWXLocation(e, c, a);} else {if (d.checkLocation(f)) {var b = Utils.getLocationParam(f.location);e(b);}}} };var QQMapWX = function () {function b(i) {_classCallCheck(this, b);if (!i.key) {throw Error("key值不能为空");}this.key = i.key;}_createClass(b, [{ key: "search", value: function f(i) {var l = this;i = i || {};Utils.polyfillParam(i);if (!Utils.checkKeyword(i)) {return;}var k = { keyword: i.keyword, orderby: i.orderby || "_distance", page_size: i.page_size || 10, page_index: i.page_index || 1, output: "json", key: l.key };if (i.address_format) {k.address_format = i.address_format;}if (i.filter) {k.filter = i.filter;}var n = i.distance || "1000";var j = i.auto_extend || 1;var m = function m(o) {k.boundary = "nearby(" + o.latitude + "," + o.longitude + "," + n + "," + j + ")";wx.request(Utils.buildWxRequestConfig(i, { url: URL_SEARCH, data: k }));};Utils.locationProcess(i, m);} }, { key: "getSuggestion", value: function h(i) {var k = this;i = i || {};Utils.polyfillParam(i);if (!Utils.checkKeyword(i)) {return;}var j = { keyword: i.keyword, region: i.region || "全国", region_fix: i.region_fix || 0, policy: i.policy || 0, output: "json", key: k.key };wx.request(Utils.buildWxRequestConfig(i, { url: URL_SUGGESTION, data: j }));} }, { key: "reverseGeocoder", value: function a(i) {var k = this;i = i || {};Utils.polyfillParam(i);var j = { coord_type: i.coord_type || 5, get_poi: i.get_poi || 0, output: "json", key: k.key };if (i.poi_options) {j.poi_options = i.poi_options;}var l = function l(m) {j.location = m.latitude + "," + m.longitude;wx.request(Utils.buildWxRequestConfig(i, { url: URL_GET_GEOCODER, data: j }));};Utils.locationProcess(i, l);} }, { key: "geocoder", value: function g(i) {var k = this;i = i || {};Utils.polyfillParam(i);if (Utils.checkParamKeyEmpty(i, "address")) {return;}var j = { address: i.address, output: "json", key: k.key };wx.request(Utils.buildWxRequestConfig(i, { url: URL_GET_GEOCODER, data: j }));} }, { key: "getCityList", value: function c(i) {var k = this;i = i || {};Utils.polyfillParam(i);var j = { output: "json", key: k.key };
      wx.request(Utils.buildWxRequestConfig(i, { url: URL_CITY_LIST, data: j }));} }, { key: "getDistrictByCityId", value: function d(i) {var k = this;i = i || {};Utils.polyfillParam(i);if (Utils.checkParamKeyEmpty(i, "id")) {return;}var j = { id: i.id || "", output: "json", key: k.key };wx.request(Utils.buildWxRequestConfig(i, { url: URL_AREA_LIST, data: j }));} }, { key: "calculateDistance", value: function e(i) {var k = this;i = i || {};Utils.polyfillParam(i);if (Utils.checkParamKeyEmpty(i, "to")) {return;}var j = { mode: i.mode || "walking", to: Utils.location2query(i.to), output: "json", key: k.key };var l = function l(m) {j.from = m.latitude + "," + m.longitude;wx.request(Utils.buildWxRequestConfig(i, { url: URL_DISTANCE, data: j }));};if (i.from) {i.location = i.from;}Utils.locationProcess(i, l);} }]);return b;}();module.exports = QQMapWX;

/***/ }),

/***/ 95:
/*!*******************************************************************************************!*\
  !*** C:/Users/admin/Desktop/movie-app/main.js?{"page":"pages%2Fcinema-map%2Fcinema-map"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _cinemaMap = _interopRequireDefault(__webpack_require__(/*! ./pages/cinema-map/cinema-map.vue */ 96));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_cinemaMap.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map