import Immutable from 'seamless-immutable';
import typeCreator from '../typeConstantCreator';
import createReducer, { initialState } from '../reducerCreator';

const type = typeCreator('T');

const actions = {
  request: {
    type: type.request,
  },
  success: {
    type: type.success,
    payload: 'test',
  },
  failure: {
    type: type.failure,
    errors: 'test',
  },
};

describe('redux reducer creator', () => {
  it('should create reducer', () => {
    expect(typeof createReducer({
      typeCreator: type,
      flushErrorsOnRequest: false,
    })).toBe('function');
  });

  it('should have initial state', () => {
    const reducer = createReducer({
      typeCreator: type,
      flushErrorsOnRequest: false,
      flushReducerAction: false,
    });
    expect(reducer(undefined, {})).toBe(initialState);
  });

  it('should handle request action', () => {
    const reducer = createReducer({
      typeCreator: type,
      flushErrorsOnRequest: false,
    })(undefined, actions.request);
    expect(reducer).toEqual(Immutable(initialState).merge({
      loading: true,
    }));
  });

  it('should handle success action', () => {
    const reducer = createReducer({
      typeCreator: type,
      flushErrorsOnRequest: false,
    })(undefined, actions.success);
    expect(reducer).toEqual(Immutable(initialState).merge({
      loading: false,
      loaded: true,
      data: actions.success.payload,
    }));
  });

  it('should handle failure action', () => {
    const reducer = createReducer({
      typeCreator: type,
      flushErrorsOnRequest: false,
    })(undefined, actions.failure);
    expect(reducer).toEqual(Immutable(initialState).merge({
      loading: false,
      loaded: false,
      errors: actions.failure.errors,
    }));
  });

  it('should flush error on request action', () => {
    const reducer = createReducer({
      typeCreator: type,
      flushErrorsOnRequest: true,
    })(Immutable(initialState).merge({
      errors: 'test',
    }), actions.request);
    expect(reducer).toEqual(Immutable(initialState).merge({
      loading: true,
    }));
  });

  it('should not flush error on request action', () => {
    const reducer = createReducer({
      typeCreator: type,
      flushErrorsOnRequest: false,
    })(Immutable(initialState).merge({
      errors: 'test',
    }), actions.request);
    expect(reducer).toEqual(Immutable(initialState).merge({
      loading: true,
      errors: 'test',
    }));
  });

  it('should generate reducer with flush action', () => {
    const reducer = createReducer({
      typeCreator: type,
      flushErrorsOnRequest: false,
      flushReducerAction: 'flush',
    })(Immutable(initialState).merge({
      errors: 'test',
    }), { type: 'flush' });
    expect(reducer).toEqual(initialState);
  });
});
