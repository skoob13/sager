import * as index from '../index';
import factory from '../factory';
import reducerCreator from '../creators/reducerCreator';
import sagaCreator from '../creators/sagaCreator';
import typeConstantCreator from '../creators/typeConstantCreator';
import createType from '../creators/typeCreator';
import bindSaga from '../binders/sagaBinder';
import { makeRequest } from '../api';

describe('index.js tests', () => {
  test('should export base functions', () => {
    expect(index.default).toBe(factory);
    expect(index.creators).toBeTruthy();
    expect(index.creators.reducerCreator).toBe(reducerCreator);
    expect(index.creators.typeCreator).toBe(typeConstantCreator);
    expect(index.creators.sagaCreator).toBe(sagaCreator);
    expect(index.createType).toBe(createType);
    expect(index.bindSaga).toBe(bindSaga);
    expect(index.makeRequest).toBe(makeRequest);
  });
});
