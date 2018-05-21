'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createType = exports.types = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _effects = require('redux-saga/effects');

var _type = require('./creators/type');

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = exports.types = {};

var defaultConfig = {
  dispatchActions: true,
  effect: _effects.takeEvery,
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