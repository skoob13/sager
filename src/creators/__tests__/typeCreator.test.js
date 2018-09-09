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
    global.console = { error: jest.fn(), log: jest.fn() };
    createType({
      type: 'type',
      reducer: 'reducer',
    });
    const type2 = createType({
      type: 'type2',
      reducer: 'reducer',
    });
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(types.reducer).toEqual({
      ...defaultTypeConfig,
      type: 'type2',
      reducer: 'reducer',
      typeCreator: type2,
    });
  });

  test('it should throw error on empty reducer or type', () => {
    global.console = { error: jest.fn(), log: jest.fn() };
    createType({
      reducer: 'reducer_test_throw',
    });
    createType({
      type: 'reducer_test_throw',
    });
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});
