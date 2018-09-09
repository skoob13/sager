import { combineReducers } from 'redux';
import { makeRequest } from './api';
import { types, createType } from './types';
import bindSaga from './binders/saga';
import typeCreator from './creators/type';
import reducerCreator from './creators/reducer';
import sagaCreator from './creators/saga';

const defaultOptions = {
  authorizationType: '',
  hooks: {},
  path: '',
  tokenSelector: null,
  getHeaders: null,
};

export default (options) => {
  const { reducers, sagas } = Object.keys(types).reduce((data, type) => {
    const typeConfig = types[type];
    const saga = sagaCreator(typeConfig, { ...defaultOptions, ...options });
    const reducer = reducerCreator(typeConfig);
    return {
      reducers: {
        ...data.reducers,
        [type]: reducer,
      },
      sagas: [...data.sagas, saga],
    };
  }, { reducers: {}, sagas: [] });

  return {
    sagas,
    reducers: combineReducers(reducers),
  };
};

export {
  createType,
  makeRequest,
  typeCreator,
  bindSaga,
};
