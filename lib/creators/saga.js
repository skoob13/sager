'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSaga = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _effects = require('redux-saga/effects');

var _normalizr = require('normalizr');

var _api = require('../api');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var generateSaga = function generateSaga(_ref2, _ref) {
  var typeCreator = _ref2.typeCreator,
      schema = _ref2.schema,
      dispatchActions = _ref2.dispatchActions,
      saga = _ref2.saga;

  var _marked = /*#__PURE__*/regeneratorRuntime.mark(generatedSaga);

  var hooks = _ref.hooks,
      tokenSelector = _ref.tokenSelector,
      options = _objectWithoutProperties(_ref, ['hooks', 'tokenSelector']);

  function generatedSaga(request) {
    var token, data, result, payload;
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
            _context.prev = 8;

            if (!hooks.beforeRequest) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return (0, _effects.call)(hooks.beforeRequest, request);

          case 12:
            _context.next = 14;
            return (0, _effects.call)(saga || _api.makeRequest, _extends({}, request, {
              token: token
            }), options);

          case 14:
            data = _context.sent;

            if (!hooks.request) {
              _context.next = 18;
              break;
            }

            _context.next = 18;
            return (0, _effects.call)(hooks.request, request);

          case 18:
            result = data.data;
            payload = schema ? (0, _normalizr.normalize)(result, schema) : result;

            if (!hooks.beforeSuccess) {
              _context.next = 24;
              break;
            }

            _context.next = 23;
            return (0, _effects.call)(hooks.beforeSuccess, {
              payload: payload,
              request: request,
              result: result,
              withSchema: !!schema
            });

          case 23:
            payload = _context.sent;

          case 24:
            if (!dispatchActions) {
              _context.next = 27;
              break;
            }

            _context.next = 27;
            return (0, _effects.put)({
              type: typeCreator.success,
              action: request,
              payload: payload
            });

          case 27:
            if (!hooks.success) {
              _context.next = 30;
              break;
            }

            _context.next = 30;
            return (0, _effects.call)(hooks.success, {
              payload: payload,
              request: request,
              result: result,
              withSchema: !!schema
            });

          case 30:
            _context.next = 43;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context['catch'](8);

            if (!hooks.beforeFailure) {
              _context.next = 37;
              break;
            }

            _context.next = 37;
            return (0, _effects.call)(hooks.beforeFailure, {
              error: _context.t1,
              request: request
            });

          case 37:
            if (!dispatchActions) {
              _context.next = 40;
              break;
            }

            _context.next = 40;
            return (0, _effects.put)({ type: typeCreator.failure, errors: _context.t1 });

          case 40:
            if (!hooks.failure) {
              _context.next = 43;
              break;
            }

            _context.next = 43;
            return (0, _effects.call)(hooks.failure, {
              error: _context.t1,
              request: request
            });

          case 43:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this, [[8, 32]]);
  }
  return generatedSaga;
};

// TODO: make as FORK
// TODO: test this
exports.generateSaga = generateSaga;
var sagaCreator = function sagaCreator(params, options) {
  var _marked2 = /*#__PURE__*/regeneratorRuntime.mark(saga);

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

            if (!(effect === _effects.throttle)) {
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
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked2, this);
  }

  return saga;
};

exports.default = sagaCreator;