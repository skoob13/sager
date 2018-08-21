"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "makeRequest", {
  enumerable: true,
  get: function get() {
    return _api.makeRequest;
  }
});
Object.defineProperty(exports, "createType", {
  enumerable: true,
  get: function get() {
    return _types.createType;
  }
});
Object.defineProperty(exports, "typeCreator", {
  enumerable: true,
  get: function get() {
    return _type.default;
  }
});
exports.default = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.reduce");

var _redux =
/*#__PURE__*/
require("redux");

var _api =
/*#__PURE__*/
require("./api");

var _types =
/*#__PURE__*/
require("./types");

var _type =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("./creators/type"));

var _reducer =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("./creators/reducer"));

var _saga =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("./creators/saga"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  authorizationType: '',
  hooks: {},
  path: '',
  tokenSelector: null,
  getHeaders: null
};

var _default = function _default(options) {
  var _Object$keys$reduce = Object.keys(_types.types).reduce(function (data, type) {
    var _objectSpread2;

    var typeConfig = _types.types[type];
    var saga = (0, _saga.default)(typeConfig, _objectSpread({}, defaultOptions, options));
    var reducer = (0, _reducer.default)(typeConfig);
    return {
      reducers: _objectSpread({}, data.reducers, (_objectSpread2 = {}, _objectSpread2[type] = reducer, _objectSpread2)),
      sagas: data.sagas.concat([saga])
    };
  }, {
    reducers: {},
    sagas: []
  }),
      reducers = _Object$keys$reduce.reducers,
      sagas = _Object$keys$reduce.sagas;

  return {
    sagas: sagas,
    reducers: (0, _redux.combineReducers)(reducers)
  };
};

exports.default = _default;