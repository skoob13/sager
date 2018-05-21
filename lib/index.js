'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeCreator = exports.makeRequest = exports.createType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _api = require('./api');

var _types = require('./types');

var _type = require('./creators/type');

var _type2 = _interopRequireDefault(_type);

var _reducer = require('./creators/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _saga = require('./creators/saga');

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