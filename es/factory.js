import "core-js/modules/es6.array.for-each";
import "core-js/modules/es6.array.filter";
import "core-js/modules/es6.object.define-property";
import "core-js/modules/es6.array.map";
import "regenerator-runtime/runtime";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.array.reduce";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { all, fork } from 'redux-saga/effects';
import types from './types';
import reducerCreator from './creators/reducerCreator';
import sagaCreator from './creators/sagaCreator';
export var defaultOptions = {
  authorizationType: '',
  hooks: {},
  path: '',
  tokenSelector: null,
  extendRequest: null
};
export default (function (options) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(rootReduxEntitiesSaga);

  var mergedOptions = _objectSpread({}, defaultOptions, options);

  var _Object$keys$reduce = Object.keys(types).reduce(function (data, reducer) {
    var _objectSpread2;

    var typeConfig = types[reducer];
    var saga = sagaCreator(typeConfig, mergedOptions);
    var generatedReducer = reducerCreator(typeConfig);
    return {
      reducers: _objectSpread({}, data.reducers, (_objectSpread2 = {}, _objectSpread2[reducer] = generatedReducer, _objectSpread2)),
      sagas: data.sagas.concat([saga])
    };
  }, {
    reducers: {},
    sagas: []
  }),
      reducers = _Object$keys$reduce.reducers,
      sagas = _Object$keys$reduce.sagas;

  function rootReduxEntitiesSaga() {
    return regeneratorRuntime.wrap(function rootReduxEntitiesSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return all(sagas.map(function (saga) {
              return fork(saga);
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _marked, this);
  }

  return {
    reducers: reducers,
    rootSaga: rootReduxEntitiesSaga
  };
});