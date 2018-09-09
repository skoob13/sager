"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.makeRequest = exports.prefixUrl = exports.methods = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

var _axios =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("axios"));

var _validUrl =
/*#__PURE__*/
require("valid-url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var methods = ['get', 'post', 'patch', 'put', 'delete'];
exports.methods = methods;

var prefixUrl = function prefixUrl(path, endpoint) {
  return "" + ((0, _validUrl.isUri)(endpoint) ? '' : path + "/") + endpoint;
};

exports.prefixUrl = prefixUrl;

var request = function request(method) {
  return function (_ref) {
    var path = _ref.path,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options,
        token = _ref.token,
        authorizationType = _ref.authorizationType;
    var body = options.body,
        params = options.params,
        _options$headers = options.headers,
        headers = _options$headers === void 0 ? {} : _options$headers;

    if (token) {
      headers.Authorization = authorizationType + " " + token;
    }

    if (!(method === 'get' || method === 'delete')) {
      return _axios.default[method](path, body, {
        headers: headers
      });
    }

    return _axios.default[method](path, {
      body: body,
      params: params,
      headers: headers
    });
  };
};

var apiClient =
/*#__PURE__*/
methods.reduce(function (reduced, method) {
  var _objectSpread2;

  return _objectSpread({}, reduced, (_objectSpread2 = {}, _objectSpread2[method] = request(method), _objectSpread2));
}, {});

var makeRequest = function makeRequest(config, extenders) {
  if (extenders === void 0) {
    extenders = {};
  }

  var _extenders$config = _objectSpread({}, extenders, config),
      authorizationType = _extenders$config.authorizationType,
      method = _extenders$config.method,
      path = _extenders$config.path,
      token = _extenders$config.token,
      url = _extenders$config.url,
      requestConfig = _extenders$config.request;

  return apiClient[method.toLowerCase()]({
    token: token,
    authorizationType: authorizationType,
    path: prefixUrl(path, url),
    options: requestConfig
  });
};

exports.makeRequest = makeRequest;
var _default = apiClient;
exports.default = _default;