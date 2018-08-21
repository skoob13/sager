import Immutable from 'seamless-immutable';
export var initialState =
/*#__PURE__*/
Immutable({
  loaded: false,
  loading: false,
  errors: null,
  data: null
});

var reducerCreator = function reducerCreator(_ref) {
  var typeCreator = _ref.typeCreator,
      flushErrorsOnRequest = _ref.flushErrorsOnRequest,
      flushReducerAction = _ref.flushReducerAction;
  return function (state, action) {
    if (state === void 0) {
      state = initialState;
    }

    if (action.type === typeCreator.request) {
      return Immutable(state).merge({
        loading: true,
        loaded: false,
        errors: flushErrorsOnRequest ? null : state.errors
      });
    }

    if (action.type === typeCreator.success) {
      return Immutable(state).merge({
        loading: false,
        loaded: true,
        data: action.payload,
        errors: null
      });
    }

    if (action.type === typeCreator.failure) {
      return Immutable(state).merge({
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

export default reducerCreator;