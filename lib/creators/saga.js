"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.generateSaga = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

var _effects =
/*#__PURE__*/
require("redux-saga/effects");

var _normalizr =
/*#__PURE__*/
require("normalizr");

var _deepmerge =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("deepmerge"));

var _api =
/*#__PURE__*/
require("../api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var generateSaga = function generateSaga(_ref2, _ref) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(generatedSaga);

  var typeCreator = _ref2.typeCreator,
      schema = _ref2.schema,
      dispatchActions = _ref2.dispatchActions,
      saga = _ref2.saga;

  var hooks = _ref.hooks,
      tokenSelector = _ref.tokenSelector,
      getHeaders = _ref.getHeaders,
      options = _objectWithoutPropertiesLoose(_ref, ["hooks", "tokenSelector", "getHeaders"]);

  function generatedSaga(request) {
    var token, requestParams, data, result, payload;
    return regeneratorRuntime.wrap(function generatedSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!tokenSelector) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return (0, _effects.select)(tokenSelector);

          case 3:
            _context.t0 = _context.sent;
            _context.next = 7;
            break;

          case 6:
            _context.t0 = '';

          case 7:
            token = _context.t0;
            requestParams = {};

            if (!getHeaders) {
              _context.next = 13;
              break;
            }

            _context.next = 12;
            return (0, _effects.call)(getHeaders, request);

          case 12:
            requestParams.headers = _context.sent;

          case 13:
            _context.prev = 13;

            if (!hooks.beforeRequest) {
              _context.next = 17;
              break;
            }

            _context.next = 17;
            return (0, _effects.call)(hooks.beforeRequest, request);

          case 17:
            _context.next = 19;
            return (0, _effects.call)(saga || _api.makeRequest, _objectSpread({}, request, {
              request: (0, _deepmerge.default)(request.request || {}, requestParams),
              token: token
            }), options);

          case 19:
            data = _context.sent;

            if (!hooks.request) {
              _context.next = 23;
              break;
            }

            _context.next = 23;
            return (0, _effects.call)(hooks.request, request);

          case 23:
            result = data.data;
            payload = schema ? (0, _normalizr.normalize)(result, schema) : result;

            if (!hooks.beforeSuccess) {
              _context.next = 29;
              break;
            }

            _context.next = 28;
            return (0, _effects.call)(hooks.beforeSuccess, {
              payload: payload,
              request: request,
              result: result,
              withSchema: !!schema
            });

          case 28:
            payload = _context.sent;

          case 29:
            if (!dispatchActions) {
              _context.next = 32;
              break;
            }

            _context.next = 32;
            return (0, _effects.put)({
              type: typeCreator.success,
              action: request,
              payload: payload
            });

          case 32:
            if (!hooks.success) {
              _context.next = 35;
              break;
            }

            _context.next = 35;
            return (0, _effects.call)(hooks.success, {
              payload: payload,
              request: request,
              result: result,
              withSchema: !!schema
            });

          case 35:
            _context.next = 48;
            break;

          case 37:
            _context.prev = 37;
            _context.t1 = _context["catch"](13);

            if (!hooks.beforeFailure) {
              _context.next = 42;
              break;
            }

            _context.next = 42;
            return (0, _effects.call)(hooks.beforeFailure, {
              error: _context.t1,
              request: request
            });

          case 42:
            if (!dispatchActions) {
              _context.next = 45;
              break;
            }

            _context.next = 45;
            return (0, _effects.put)({
              type: typeCreator.failure,
              errors: _context.t1
            });

          case 45:
            if (!hooks.failure) {
              _context.next = 48;
              break;
            }

            _context.next = 48;
            return (0, _effects.call)(hooks.failure, {
              error: _context.t1,
              request: request
            });

          case 48:
          case "end":
            return _context.stop();
        }
      }
    }, _marked, this, [[13, 37]]);
  }

  return generatedSaga;
}; // TODO: make as FORK
// TODO: test this


exports.generateSaga = generateSaga;

var sagaCreator = function sagaCreator(params, options) {
  var _marked2 =
  /*#__PURE__*/
  regeneratorRuntime.mark(saga);

  var effect = params.effect,
      throttleTime = params.throttleTime,
      typeCreator = params.typeCreator;

  function saga() {
    var generatedSaga;
    return regeneratorRuntime.wrap(function saga$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            generatedSaga = generateSaga(params, options);

            if (!(throttleTime > 0)) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return effect(throttleTime, typeCreator.request, generatedSaga);

          case 4:
            _context2.next = 8;
            break;

          case 6:
            _context2.next = 8;
            return effect(typeCreator.request, generatedSaga);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _marked2, this);
  }

  return saga;
};

var _default = sagaCreator;
exports.default = _default;