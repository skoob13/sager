'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = exports.initialState = (0, _seamlessImmutable2.default)({
  loaded: false,
  loading: false,
  errors: null,
  data: null
});

var reducerCreator = function reducerCreator(_ref) {
  var typeCreator = _ref.typeCreator,
      flushErrorsOnRequest = _ref.flushErrorsOnRequest,
      flushReducerAction = _ref.flushReducerAction;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (action.type === typeCreator.request) {
      return (0, _seamlessImmutable2.default)(state).merge({
        loading: true,
        loaded: false,
        errors: flushErrorsOnRequest ? null : state.errors
      });
    }

    if (action.type === typeCreator.success) {
      return (0, _seamlessImmutable2.default)(state).merge({
        loading: false,
        loaded: true,
        data: action.payload,
        errors: null
      });
    }

    if (action.type === typeCreator.failure) {
      return (0, _seamlessImmutable2.default)(state).merge({
        loading: false,
        loaded: false,
        data: null,
        errors: action.errors
      });
    }

    if (flushReducerAction && action.type === flushReducerAction) {
      return initialState;
    }

    return state;
  };
};

exports.default = reducerCreator;