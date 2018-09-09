import "core-js/modules/es6.array.for-each";
import "core-js/modules/es6.array.filter";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.object.define-property";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { takeEvery } from 'redux-saga/effects';
import makeType from './typeConstantCreator';
import types from '../types';
export var defaultTypeConfig = {
  dispatchActions: true,
  effect: takeEvery,
  flushErrorsOnRequest: false,
  flushReducerAction: null,
  reducer: null,
  saga: null,
  schema: null,
  throttleTime: 0,
  type: null
};
export default (function (typeConfig) {
  var reducer = typeConfig.reducer,
      type = typeConfig.type;
  var existingConfig = types[reducer];

  if (!reducer || !type) {
    // eslint-disable-next-line
    console.error('redux-entities: type or reducer are required fields');
  }

  if (existingConfig && existingConfig.type !== type) {
    // eslint-disable-next-line
    console.error("redux-entities: reducer with name " + reducer + " exists already");
  }

  var typeCreator = makeType(type, reducer);
  types[reducer] = _objectSpread({}, defaultTypeConfig, existingConfig, typeConfig, {
    typeCreator: typeCreator
  });
  return typeCreator;
});