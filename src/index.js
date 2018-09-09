import { createType } from './types';
import entitiesFactory from './factory';
import { makeRequest } from './api';
import bindSaga from './binders/saga';
import typeCreator from './creators/type';
import reducerCreator from './creators/reducer';
import sagaCreator from './creators/saga';

const creators = {
  typeCreator,
  reducerCreator,
  sagaCreator,
};

export default entitiesFactory;
export {
  createType,
  makeRequest,
  bindSaga,
  creators,
};
