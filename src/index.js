import createType from './types';
import entitiesFactory from './factory';
import { makeRequest } from './api';
import bindSaga from './binders/saga';
import typeCreator from './creators/typeConstantCreator';
import reducerCreator from './creators/reducerCreator';
import sagaCreator from './creators/sagaCreator';

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
