import Immutable from 'seamless-immutable';

export const initialState = Immutable({
  loaded: false,
  loading: false,
  errors: null,
  data: null,
});

const reducerCreator = ({
  typeCreator,
  flushErrorsOnRequest,
  flushReducerAction,
}) =>
  (state = initialState, action) => {
    if (action.type === typeCreator.request) {
      return Immutable(state).merge({
        loading: true,
        loaded: false,
        errors: flushErrorsOnRequest ? null : state.errors,
      });
    }

    if (action.type === typeCreator.success) {
      return Immutable(state).merge({
        loading: false,
        loaded: true,
        data: action.payload,
        errors: null,
      });
    }

    if (action.type === typeCreator.failure) {
      return Immutable(state).merge({
        loading: false,
        loaded: false,
        data: null,
        errors: action.errors,
      });
    }

    if (flushReducerAction && action.type === flushReducerAction) {
      return initialState;
    }

    return state;
  };

export default reducerCreator;
