import { takeEvery } from 'redux-saga';
import makeType from './creators/type';

export const types = {};

const defaultConfig = {
  dispatchActions: true,
  effect: takeEvery,
  flushErrorsOnRequest: false,
  flushReducerAction: null,
  reducer: null,
  saga: null,
  schema: null,
  throttleTime: 500,
  type: null,
};

export const createType = (config) => {
  const { reducer, type } = config;
  const typeCreator = makeType(type);

  types[reducer] = {
    ...defaultConfig,
    ...config,
    typeCreator,
  };

  return typeCreator;
};
