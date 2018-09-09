"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = void 0;

var _seamlessImmutable =
/*#__PURE__*/
_interopRequireDefault(
/*#__PURE__*/
require("seamless-immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState =
/*#__PURE__*/
(0, _seamlessImmutable.default)({
  loaded: false,
  loading: false,
  errors: null,
  data: null
});
exports.initialState = initialState;

var reducerCreator = function reducerCreator(_ref) {
  var typeCreator = _ref.typeCreator,
      flushErrorsOnRequest = _ref.flushErrorsOnRequest,
      flushReducerAction = _ref.flushReducerAction;
  return function (state, action) {
    if (state === void 0) {
      state = initialState;
    }

    if (action.type === typeCreator.request) {
      return (0, _seamlessImmutable.default)(state).merge({
        loading: true,
        loaded: false,
        errors: flushErrorsOnRequest ? null : state.errors
      });
    }

    if (action.type === typeCreator.success) {
      return (0, _seamlessImmutable.default)(state).merge({
        loading: false,
        loaded: true,
        data: action.payload,
        errors: null
      });
    }

    if (action.type === typeCreator.failure) {
      return (0, _seamlessImmutable.default)(state).merge({
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

var _default = reducerCreator;
exports.default = _default;