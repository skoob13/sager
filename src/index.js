import createType from './creators/typeCreator';
import entitiesFactory from './factory';
import { makeRequest } from './api';
import bindSaga from './binders/sagaBinder';
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
  bindSaga,
  createType,
  creators,
  makeRequest,
};
