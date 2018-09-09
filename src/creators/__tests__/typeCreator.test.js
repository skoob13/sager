import createType, { defaultTypeConfig } from '../typeCreator';
import types from '../../types';

describe('type creator tests', () => {
  test('it should create a type', () => {
    const type = createType({
      type: 'type',
      reducer: 'reducer',
    });
    expect(types.reducer).toEqual({
      ...defaultTypeConfig,
      type: 'type',
      reducer: 'reducer',
      typeCreator: type,
    });
  });

  test('it should merge a type', () => {
    createType({
      type: 'type',
      reducer: 'reducer',
    });
    const type2 = createType({
      type: 'type2',
      reducer: 'reducer',
    });
    expect(types.reducer).toEqual({
      ...defaultTypeConfig,
      type: 'type2',
      reducer: 'reducer',
      typeCreator: type2,
    });
  });
});
