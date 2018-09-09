import type from '../typeConstantCreator';

describe('type constant creator tests', () => {
  test('it should return correct type', () => {
    expect(type('type', 'type')).toEqual({
      request: '@@api/type/request',
      success: '@@api/type/success',
      failure: '@@api/type/failure',
      type: 'type',
    });
  });
  
  test('it should return correct type with empty string', () => {
    expect(type('')).toEqual({
      request: '@@api//request',
      success: '@@api//success',
      failure: '@@api//failure',
      type: undefined,
    });
  });
});
