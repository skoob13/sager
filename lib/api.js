'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRequest = exports.prefixUrl = exports.methods = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _validUrl = require('valid-url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var methods = exports.methods = ['get', 'post', 'patch', 'put', 'delete'];
var prefixUrl = exports.prefixUrl = function prefixUrl(path, endpoint) {
  return '' + ((0, _validUrl.isUri)(endpoint) ? '' : path + '/') + endpoint;
};

var request = function request(method) {
  return function (_ref) {
    var path = _ref.path,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options,
        token = _ref.token,
        authorizationType = _ref.authorizationType;
    var body = options.body,
        params = options.params,
        headers = options.headers;


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

  return apiClient[method.toLowerCase()]({
    token: token,
    authorizationType: authorizationType,
    path: prefixUrl(path, url),
    options: requestConfig
  });
};

exports.default = apiClient;