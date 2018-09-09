import createType from '../creators/typeCreator';
import types from '../types';

// TODO: Improve tests for api
describe('type index', () => {
  test('create type should save type', () => {
    createType({
      type: 'hey',
      reducer: 'reducer',
    });
    expect(types.reducer).toBeTruthy();
    expect(types.reducer.type).toBe('hey');
  });
});
