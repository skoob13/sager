import { testSaga } from 'redux-saga-test-plan';
import factory from '../factory';
import createType from '../creators/typeCreator';

describe('type index', () => {
  test('should create a root saga and reducer', () => {
     createType({
      type: 'hey',
      reducer: 'reducer',
    });
    const result = factory({});
    expect(result).toHaveProperty('reducers');
    expect(result.reducers).toHaveProperty('reducer');
    expect(result).toHaveProperty('rootSaga');

    testSaga(result.rootSaga)
      .next()
      .inspect((fn) => {
        expect(fn).toHaveProperty('ALL');
        expect(fn.ALL.length).toEqual(1);
        expect(fn.ALL[0]).toHaveProperty('FORK');
      })
      .next()
      .isDone();
  });

  test('should create a root saga and reducers', () => {
    createType({
      type: 'hey',
      reducer: 'reducer',
    });
    createType({
      type: 'hey2',
      reducer: 'reducer2',
    });
    const result = factory({});
    expect(result).toHaveProperty('reducers');
    expect(result.reducers).toHaveProperty('reducer');
    expect(result.reducers).toHaveProperty('reducer2');
    expect(Object.keys(result.reducers).length).toEqual(2);
    expect(result).toHaveProperty('rootSaga');
  });
});
