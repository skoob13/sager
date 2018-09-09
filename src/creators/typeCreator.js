import { takeEvery } from 'redux-saga/effects';
import makeType from './typeConstantCreator';
import types from '../types';

const defaultTypeConfig = {
  dispatchActions: true,
  effect: takeEvery,
  flushErrorsOnRequest: false,
  flushReducerAction: null,
  reducer: null,
  saga: null,
  schema: null,
  throttleTime: 0,
  type: null,
};

export default (typeConfig) => {
  const { reducer, type } = typeConfig;
  const existingConfig = types[reducer];

  if (!reducer || !type) {
    // eslint-disable-next-line
    console.error('redux-entities: type or reducer are required fields');
  }

  if (existingConfig && existingConfig.type !== type) {
    // eslint-disable-next-line
    console.error(`redux-entities: reducer with name ${reducer} exists already`);
  }

  const typeCreator = makeType(type, reducer);

  types[reducer] = {
    ...defaultTypeConfig,
    ...existingConfig,
    ...typeConfig,
    typeCreator,
  };

  return typeCreator;
};
