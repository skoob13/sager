import { all, fork } from 'redux-saga/effects';
import types from './types';
import reducerCreator from './creators/reducerCreator';
import sagaCreator from './creators/sagaCreator';

export const defaultOptions = {
  authorizationType: '',
  hooks: {},
  path: '',
  tokenSelector: null,
  extendRequest: null,
};

export default (options) => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const { reducers, sagas } = Object.keys(types).reduce((data, reducer) => {
    const typeConfig = types[reducer];
    const saga = sagaCreator(typeConfig, mergedOptions);
    const generatedReducer = reducerCreator(typeConfig);

    return {
      reducers: {
        ...data.reducers,
        [reducer]: generatedReducer,
      },
      sagas: [...data.sagas, saga],
    };
  }, { reducers: {}, sagas: [] });

  function* rootReduxEntitiesSaga() {
    yield all(sagas.map(saga => fork(saga)));
  }

  return {
    reducers,
    rootSaga: rootReduxEntitiesSaga,
  };
};
