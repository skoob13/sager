import createType from '../creators/typeCreator';
import types from '../types';

describe('types.js tests', () => {
  test('should have a default value', () => {
    expect(types).toEqual({});
  });

  test('create type should save type', () => {
    createType({
      type: 'hey',
      reducer: 'reducer',
    });
    expect(types.reducer).toBeTruthy();
    expect(types.reducer.type).toBe('hey');
  });
});
