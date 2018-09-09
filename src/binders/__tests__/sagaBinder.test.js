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

  test('should throw console error if there is no type', () => {
    global.console = { error: jest.fn(), log: jest.fn() };

    const type = createType({
      type: 'hey',
      reducer: 'reducer',
    });
    bindSaga({
      ...type,
      type: null,
    }, () => {});
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
