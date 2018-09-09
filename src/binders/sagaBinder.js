import types from '../types';

export default (type, saga) => {
  if (!type.type) {
    console.error('redux-entities: saga binding failed, internal type is missing');
  }

  const config = types[type] || {};
  types[type] = {
    ...config,
    saga,
  };
};
