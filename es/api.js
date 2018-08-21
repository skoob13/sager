import "core-js/modules/es6.array.for-each";
import "core-js/modules/es6.array.filter";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.object.define-property";
import "core-js/modules/es6.array.reduce";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import axios from 'axios';
import { isUri } from 'valid-url';
export var methods = ['get', 'post', 'patch', 'put', 'delete'];
export var prefixUrl = function prefixUrl(path, endpoint) {
  return "" + (isUri(endpoint) ? '' : path + "/") + endpoint;
};

var request = function request(method) {
  return function (_ref) {
    var path = _ref.path,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options,
        token = _ref.token,
        authorizationType = _ref.authorizationType;
    var body = options.body,
        params = options.params,
        headers = options.headers;

    if (token) {
      headers.Authorization = authorizationType + " " + token;
    }

    if (!(method === 'get' || method === 'delete')) {
      return axios[method](path, body, {
        headers: headers
      });
    }

    return axios[method](path, {
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
export var makeRequest = function makeRequest(config, extenders) {
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
export default apiClient;