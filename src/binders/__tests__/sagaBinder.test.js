import createType from '../../creators/typeCreator';
import types from '../../types';
import bindSaga from '../sagaBinder';

// TODO: Improve tests for api
describe('saga binder', () => {
  test('should add saga to types', () => {
    const type = createType({
      type: 'hey',
      reducer: 'reducer',
    });
    expect(types.reducer).toBeTruthy();
    expect(types.reducer.type).toBe('hey');
    bindSaga(type, () => {});
    expect(types.reducer.saga).toBeTruthy();
  });
});
