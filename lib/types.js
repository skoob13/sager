"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createType = exports.types = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _effects =
/*#__PURE__*/
require("redux-saga/effects");

var _type =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("./creators/type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var types = {};
exports.types = types;
var defaultConfig = {
  dispatchActions: true,
  effect: _effects.takeEvery,
  flushErrorsOnRequest: false,
  flushReducerAction: null,
  reducer: null,
  saga: null,
  schema: null,
  throttleTime: 0,
  type: null
};

var createType = function createType(config) {
  var reducer = config.reducer,
      type = config.type;

  if (!reducer || !type) {
    // eslint-disable-next-line
    console.error('redux-entities: type or reducer are required fields');
  }

  var typeCreator = (0, _type.default)(type);
  types[reducer] = _objectSpread({}, defaultConfig, config, {
    typeCreator: typeCreator
  });
  return typeCreator;
};

exports.createType = createType;