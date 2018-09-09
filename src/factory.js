import { fork } from 'redux-saga/effects';
import { types } from './types';
import reducerCreator from './creators/reducer';
import sagaCreator from './creators/saga';

const defaultOptions = {
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
    yield sagas.map(saga => fork(saga));
  }

  return {
    reducers,
    rootSaga: rootReduxEntitiesSaga,
  };
};
