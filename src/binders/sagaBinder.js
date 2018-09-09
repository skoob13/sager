import types from '../types';

export default (typeCreator, saga) => {
  if (!typeCreator.type) {
    console.error('redux-entities: saga binding failed, internal type is missing');
  }

  const { type } = typeCreator;

  const config = types[type] || {};
  types[type] = {
    ...config,
    saga,
  };
};
