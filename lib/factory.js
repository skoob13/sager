"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultOptions = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.reduce");

var _effects =
/*#__PURE__*/
require("redux-saga/effects");

var _types =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("./types"));

var _reducerCreator =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("./creators/reducerCreator"));

var _sagaCreator =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("./creators/sagaCreator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  authorizationType: '',
  hooks: {},
  path: '',
  tokenSelector: null,
  extendRequest: null
};
exports.defaultOptions = defaultOptions;

var _default = function _default(options) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(rootReduxEntitiesSaga);

  var mergedOptions = _objectSpread({}, defaultOptions, options);

  var _Object$keys$reduce = Object.keys(_types.default).reduce(function (data, reducer) {
    var _objectSpread2;

    var typeConfig = _types.default[reducer];
    var saga = (0, _sagaCreator.default)(typeConfig, mergedOptions);
    var generatedReducer = (0, _reducerCreator.default)(typeConfig);
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
            return (0, _effects.all)(sagas.map(function (saga) {
              return (0, _effects.fork)(saga);
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
};

exports.default = _default;