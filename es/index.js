import "core-js/modules/es6.array.for-each";
import "core-js/modules/es6.array.filter";
import "core-js/modules/es6.object.define-property";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.array.reduce";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { combineReducers } from 'redux';
import { makeRequest } from './api';
import { types, createType } from './types';
import typeCreator from './creators/type';
import reducerCreator from './creators/reducer';
import sagaCreator from './creators/saga';
var defaultOptions = {
  authorizationType: '',
  hooks: {},
  path: '',
  tokenSelector: null,
  getHeaders: null
};
export default (function (options) {
  var _Object$keys$reduce = Object.keys(types).reduce(function (data, type) {
    var _objectSpread2;

    var typeConfig = types[type];
    var saga = sagaCreator(typeConfig, _objectSpread({}, defaultOptions, options));
    var reducer = reducerCreator(typeConfig);
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
    reducers: combineReducers(reducers)
  };
});
export { createType, makeRequest, typeCreator };