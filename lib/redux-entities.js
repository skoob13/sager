(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("redux-entities", [], factory);
	else if(typeof exports === 'object')
		exports["redux-entities"] = factory();
	else
		root["redux-entities"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequest = exports.prefixUrl = exports.methods = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = __webpack_require__(/*! axios */ "axios");

var _axios2 = _interopRequireDefault(_axios);

var _validUrl = __webpack_require__(/*! valid-url */ "valid-url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var methods = exports.methods = ['get', 'post', 'patch', 'put', 'delete'];
var prefixUrl = exports.prefixUrl = function prefixUrl(path, endpoint) {
  return '' + ((0, _validUrl.isUri)(endpoint) ? '' : path + '/') + endpoint;
};

var request = function request(method) {
  return function (path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var token = arguments[2];
    var authorizationType = arguments[3];
    var body = options.body,
        params = options.params,
        _options$headers = options.headers,
        headers = _options$headers === undefined ? {} : _options$headers;


    if (token) {
      headers.Authorization = authorizationType + ' ' + token;
    }

    if (method !== 'get') {
      return _axios2.default[method](path, body, { headers: headers });
    }

    return _axios2.default[method](path, {
      body: body,
      params: params,
      headers: headers
    });
  };
};

var apiClient = methods.reduce(function (reduced, method) {
  return _extends({}, reduced, _defineProperty({}, method, request(method)));
}, {});

var makeRequest = exports.makeRequest = function makeRequest(config) {
  var extenders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _extenders$config = _extends({}, extenders, config),
      authorizationType = _extenders$config.authorizationType,
      method = _extenders$config.method,
      path = _extenders$config.path,
      token = _extenders$config.token,
      url = _extenders$config.url,
      requestConfig = _extenders$config.request;

  return apiClient[method.toLowerCase()](prefixUrl(path, url), requestConfig, token, authorizationType);
};

exports.default = apiClient;

/***/ }),

/***/ "./src/creators/reducer.js":
/*!*********************************!*\
  !*** ./src/creators/reducer.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _seamlessImmutable = __webpack_require__(/*! seamless-immutable */ "seamless-immutable");

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = exports.initialState = (0, _seamlessImmutable2.default)({
  loaded: false,
  loading: false,
  errors: null,
  data: null
});

var reducerCreator = function reducerCreator(_ref) {
  var typeCreator = _ref.typeCreator,
      flushErrorsOnRequest = _ref.flushErrorsOnRequest,
      flushReducerAction = _ref.flushReducerAction;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (action.type === typeCreator.request) {
      return (0, _seamlessImmutable2.default)(state).merge({
        loading: true,
        loaded: false,
        errors: flushErrorsOnRequest ? null : state.errors
      });
    }

    if (action.type === typeCreator.success) {
      return (0, _seamlessImmutable2.default)(state).merge({
        loading: false,
        loaded: true,
        data: action.payload,
        errors: null
      });
    }

    if (action.type === typeCreator.failure) {
      return (0, _seamlessImmutable2.default)(state).merge({
        loading: false,
        loaded: false,
        data: null,
        errors: action.errors
      });
    }

    if (flushReducerAction && action.type === flushReducerAction) {
      return initialState;
    }

    return state;
  };
};

exports.default = reducerCreator;

/***/ }),

/***/ "./src/creators/saga.js":
/*!******************************!*\
  !*** ./src/creators/saga.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSaga = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _effects = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");

var _normalizr = __webpack_require__(/*! normalizr */ "normalizr");

var _api = __webpack_require__(/*! ../api */ "./src/api.js");

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var generateSaga = function generateSaga(_ref2, _ref) {
  var typeCreator = _ref2.typeCreator,
      schema = _ref2.schema,
      dispatchActions = _ref2.dispatchActions,
      saga = _ref2.saga;

  var _marked = /*#__PURE__*/regeneratorRuntime.mark(generatedSaga);

  var hooks = _ref.hooks,
      tokenSelector = _ref.tokenSelector,
      options = _objectWithoutProperties(_ref, ['hooks', 'tokenSelector']);

  function generatedSaga(request) {
    var token, data, result, payload;
    return regeneratorRuntime.wrap(function generatedSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!tokenSelector) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return (0, _effects.select)(tokenSelector);

          case 3:
            _context.t0 = _context.sent;
            _context.next = 7;
            break;

          case 6:
            _context.t0 = '';

          case 7:
            token = _context.t0;
            _context.prev = 8;

            if (!hooks.beforeRequest) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return (0, _effects.call)(hooks.beforeRequest, request);

          case 12:
            _context.next = 14;
            return (0, _effects.call)(saga || _api.makeRequest, _extends({}, request, {
              token: token
            }), options);

          case 14:
            data = _context.sent;

            if (!hooks.request) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return (0, _effects.call)(hooks.request, request);

          case 18:
            result = data.data;
            payload = schema ? (0, _normalizr.normalize)(result, schema) : result;

            if (!hooks.beforeSuccess) {
              _context.next = 24;
              break;
            }

            _context.next = 23;
            return (0, _effects.call)(hooks.beforeSuccess, {
              payload: payload,
              request: request,
              result: result,
              withSchema: !!schema
            });

          case 23:
            payload = _context.sent;

          case 24:
            if (!dispatchActions) {
              _context.next = 27;
              break;
            }

            _context.next = 27;
            return (0, _effects.put)({
              type: typeCreator.success,
              action: request,
              payload: payload
            });

          case 27:
            if (!hooks.success) {
              _context.next = 30;
              break;
            }

            _context.next = 30;
            return (0, _effects.call)(hooks.success, {
              payload: payload,
              request: request,
              result: result,
              withSchema: !!schema
            });

          case 30:
            _context.next = 43;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context['catch'](8);

            if (!hooks.beforeFailure) {
              _context.next = 37;
              break;
            }

            _context.next = 37;
            return (0, _effects.call)(hooks.beforeFailure, {
              error: _context.t1,
              request: request
            });

          case 37:
            if (!dispatchActions) {
              _context.next = 40;
              break;
            }

            _context.next = 40;
            return (0, _effects.put)({ type: typeCreator.failure, errors: _context.t1 });

          case 40:
            if (!hooks.failure) {
              _context.next = 43;
              break;
            }

            _context.next = 43;
            return (0, _effects.call)(hooks.failure, {
              error: _context.t1,
              request: request
            });

          case 43:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this, [[8, 32]]);
  }
  return generatedSaga;
};

// TODO: make as FORK
// TODO: test this
exports.generateSaga = generateSaga;
var sagaCreator = function sagaCreator(params, options) {
  var _marked2 = /*#__PURE__*/regeneratorRuntime.mark(saga);

  var effect = params.effect,
      throttleTime = params.throttleTime,
      typeCreator = params.typeCreator;


  function saga() {
    var generatedSaga;
    return regeneratorRuntime.wrap(function saga$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            generatedSaga = generateSaga(params, options);

            if (!(effect === _effects.throttle)) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return effect(throttleTime, typeCreator.request, generatedSaga);

          case 4:
            _context2.next = 8;
            break;

          case 6:
            _context2.next = 8;
            return effect(typeCreator.request, generatedSaga);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked2, this);
  }

  return saga;
};

exports.default = sagaCreator;

/***/ }),

/***/ "./src/creators/type.js":
/*!******************************!*\
  !*** ./src/creators/type.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var prefix = '@@api';

/**
 * The action creator helper function.
 * Receives the basic type name and returns object containing request,
 * success and failure types.
 * @param {string} type
 * @returns {Object}
 */
var typeCreator = function typeCreator(type) {
  return {
    request: prefix + '/' + type + '/request',
    success: prefix + '/' + type + '/success',
    failure: prefix + '/' + type + '/failure'
  };
};

exports.default = typeCreator;
module.exports = exports['default'];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeCreator = exports.makeRequest = exports.createType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = __webpack_require__(/*! redux */ "redux");

var _api = __webpack_require__(/*! ./api */ "./src/api.js");

var _types = __webpack_require__(/*! ./types */ "./src/types.js");

var _type = __webpack_require__(/*! ./creators/type */ "./src/creators/type.js");

var _type2 = _interopRequireDefault(_type);

var _reducer = __webpack_require__(/*! ./creators/reducer */ "./src/creators/reducer.js");

var _reducer2 = _interopRequireDefault(_reducer);

var _saga = __webpack_require__(/*! ./creators/saga */ "./src/creators/saga.js");

var _saga2 = _interopRequireDefault(_saga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  authorizationType: '',
  hooks: {},
  path: '',
  tokenSelector: null
};

exports.default = function (options) {
  var _Object$keys$reduce = Object.keys(_types.types).reduce(function (data, type) {
    var typeConfig = _types.types[type];
    var saga = (0, _saga2.default)(typeConfig, _extends({}, defaultOptions, options));
    var reducer = (0, _reducer2.default)(typeConfig);
    return {
      reducers: _extends({}, data.reducers, _defineProperty({}, type, reducer)),
      sagas: [].concat(_toConsumableArray(data.sagas), [saga])
    };
  }, { reducers: {}, sagas: [] }),
      reducers = _Object$keys$reduce.reducers,
      sagas = _Object$keys$reduce.sagas;

  return {
    sagas: sagas,
    reducers: (0, _redux.combineReducers)(reducers)
  };
};

exports.createType = _types.createType;
exports.makeRequest = _api.makeRequest;
exports.typeCreator = _type2.default;

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createType = exports.types = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxSaga = __webpack_require__(/*! redux-saga */ "redux-saga");

var _type = __webpack_require__(/*! ./creators/type */ "./src/creators/type.js");

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = exports.types = {};

var defaultConfig = {
  dispatchActions: true,
  effect: _reduxSaga.takeEvery,
  flushErrorsOnRequest: false,
  flushReducerAction: null,
  reducer: null,
  saga: null,
  schema: null,
  throttleTime: 500,
  type: null
};

var createType = exports.createType = function createType(config) {
  var reducer = config.reducer,
      type = config.type;

  if (!reducer || !type) {
    // eslint-disable-next-line
    console.error('redux-entities: type or reducer are required fields');
  }
  var typeCreator = (0, _type2.default)(type);

  types[reducer] = _extends({}, defaultConfig, config, {
    typeCreator: typeCreator
  });

  return typeCreator;
};

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "normalizr":
/*!****************************!*\
  !*** external "normalizr" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("normalizr");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-saga":
/*!*****************************!*\
  !*** external "redux-saga" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "redux-saga/effects":
/*!*************************************!*\
  !*** external "redux-saga/effects" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "seamless-immutable":
/*!*************************************!*\
  !*** external "seamless-immutable" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("seamless-immutable");

/***/ }),

/***/ "valid-url":
/*!****************************!*\
  !*** external "valid-url" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("valid-url");

/***/ })

/******/ });
});
//# sourceMappingURL=redux-entities.js.map