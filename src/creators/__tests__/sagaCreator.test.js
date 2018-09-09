import { testSaga } from 'redux-saga-test-plan';
import { schema, normalize } from 'normalizr';
import { makeRequest } from '../../api';
import { generateSaga } from '../sagaCreator';
import typeCreator from '../typeCreator';

const sagaType = typeCreator({
  type: 'type',
  reducer: 'type',
});

describe('test saga creator', () => {
  test('test default successful saga lifecycle with actions', () => {
    const hooks = {
      beforeRequest: () => {},
      request: () => {},
      beforeSuccess: () => {},
      success: () => {},
      beforeFailure: () => {},
      failure: () => {},
    };

    const s = generateSaga({ typeCreator: sagaType, dispatchActions: true }, { hooks });

    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };

    testSaga(s, req)
      .next()
      .call(hooks.beforeRequest, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, {})
      .next({ data: {} })
      .call(hooks.request, req)
      .next()
      .call(hooks.beforeSuccess, {
        payload: {},
        request: req,
        result: {},
        withSchema: false,
      })
      .next({})
      .put({
        type: sagaType.success,
        payload: {},
        action: req,
      })
      .next()
      .call(hooks.success, {
        payload: {},
        request: req,
        result: {},
        withSchema: false,
      })
      .next()
      .isDone();
  });

  test('test default unsuccessful saga lifecycle with actions', () => {
    const hooks = {
      beforeRequest: () => {},
      request: () => {},
      beforeSuccess: () => {},
      success: () => {},
      beforeFailure: () => {},
      failure: () => {},
    };

    const s = generateSaga({ typeCreator: sagaType, dispatchActions: true }, { hooks });

    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };

    testSaga(s, req)
      .next()
      .call(hooks.beforeRequest, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, {})
      .next()
      .call(hooks.request, req)
      .throw()
      .call(hooks.beforeFailure, {
        error: undefined,
        request: req,
      })
      .next()
      .put({
        type: sagaType.failure,
        errors: undefined,
      })
      .next()
      .call(hooks.failure, {
        error: undefined,
        request: req,
      })
      .next()
      .isDone();
  });

  test('test default successful saga lifecycle without actions and success payload changing', () => {
    const hooks = {
      beforeRequest: () => {},
      request: () => {},
      beforeSuccess: () => {},
      success: () => {},
      beforeFailure: () => {},
      failure: () => {},
    };

    const s = generateSaga({ typeCreator: sagaType, dispatchActions: false }, { hooks });

    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };

    testSaga(s, req)
      .next()
      .call(hooks.beforeRequest, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, {})
      .next({ data: {} })
      .call(hooks.request, req)
      .next()
      .call(hooks.beforeSuccess, {
        payload: {},
        request: req,
        result: {},
        withSchema: false,
      })
      .next('')
      .call(hooks.success, {
        payload: '',
        request: req,
        result: {},
        withSchema: false,
      })
      .next()
      .isDone();
  });

  test('test default unsuccessful saga lifecycle without actions', () => {
    const hooks = {
      beforeRequest: () => {},
      request: () => {},
      beforeSuccess: () => {},
      success: () => {},
      beforeFailure: () => {},
      failure: () => {},
    };

    const s = generateSaga({ typeCreator: sagaType, dispatchActions: false }, { hooks });

    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };

    testSaga(s, req)
      .next()
      .call(hooks.beforeRequest, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, {})
      .next()
      .call(hooks.request, req)
      .throw()
      .call(hooks.beforeFailure, {
        error: undefined,
        request: req,
      })
      .next()
      .call(hooks.failure, {
        error: undefined,
        request: req,
      })
      .next()
      .isDone();
  });

  test('test successful saga without lifecycle and actions', () => {
    const hooks = {};
    const s = generateSaga({ typeCreator: sagaType, dispatchActions: false }, { hooks });
    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };

    testSaga(s, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, {})
      .next({ data: {} })
      .next()
      .isDone();
  });

  test('test unsuccessful saga without lifecycle and actions', () => {
    const hooks = {};
    const s = generateSaga({ typeCreator: sagaType, dispatchActions: false }, { hooks });

    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };

    testSaga(s, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, {})
      .throw()
      .next()
      .isDone();
  });

  test('test default successful saga withou lifecycle with actions', () => {
    const hooks = {};
    const s = generateSaga({ typeCreator: sagaType, dispatchActions: true }, { hooks });
    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };

    testSaga(s, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, {})
      .next({ data: {} })
      .put({
        type: sagaType.success,
        payload: {},
        action: req,
      })
      .next()
      .isDone();
  });

  test('test default unsuccessful saga without lifecycle with actions', () => {
    const hooks = {};
    const s = generateSaga({ typeCreator: sagaType, dispatchActions: true }, { hooks });
    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };

    testSaga(s, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, {})
      .throw()
      .put({
        type: sagaType.failure,
        errors: undefined,
      })
      .next()
      .isDone();
  });

  test('test saga normalization', () => {
    const hooks = {};
    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };
    const e = [new schema.Entity('key')];
    const data = [{ id: 1 }, { id: 2 }];
    const result = normalize(data, e);
    const s = generateSaga({ typeCreator: sagaType, dispatchActions: true, schema: e }, { hooks });

    testSaga(s, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, {})
      .next({ data })
      .put({
        type: sagaType.success,
        payload: result,
        action: req,
      })
      .next()
      .isDone();
  });

  test('test saga with custom saga or with custom function', () => {
    const hooks = {};
    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };

    function* customGenerator() {}
    const newType = typeCreator({
      type: 'new type',
      reducer: 'new type reducer',
      saga: customGenerator,
    });
    let s = generateSaga({ typeCreator: newType, dispatchActions: true }, { hooks });

    testSaga(s, req)
      .next()
      .call(customGenerator, { ...req, token: '' }, {})
      .next({ data: [] })
      .put({
        type: newType.success,
        payload: [],
        action: req,
      })
      .next()
      .isDone();

    const customFunction = () => {};
    const newTypeFunc = typeCreator({
      type: 'new type',
      reducer: 'new type reducer',
      saga: customFunction,
    });
    s = generateSaga({ typeCreator: newTypeFunc, dispatchActions: true }, { hooks });

    testSaga(s, req)
      .next()
      .call(customFunction, { ...req, token: '' }, {})
      .next({ data: [] })
      .put({
        type: newTypeFunc.success,
        payload: [],
        action: req,
      })
      .next()
      .isDone();
  });

  test("test saga's token selector", () => {
    const hooks = {};
    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };
    const tokenSelector = () => 'token';
    const s = generateSaga({ typeCreator: sagaType, dispatchActions: true }, { hooks, tokenSelector });

    testSaga(s, req)
      .next()
      .select(tokenSelector)
      .next('token')
      .call(makeRequest, { ...req, token: 'token' }, {})
      .next({ data: [] })
      .put({
        type: sagaType.success,
        payload: [],
        action: req,
      })
      .next()
      .isDone();
  });

  test('test saga passes options', () => {
    const hooks = {};
    const req = {
      request: {
        path: '',
        method: 'GET',
      },
    };
    const s = generateSaga({ typeCreator: sagaType, dispatchActions: true }, { hooks, option: 1 });

    testSaga(s, req)
      .next()
      .call(makeRequest, { ...req, token: '' }, { option: 1 })
      .next({ data: [] })
      .put({
        type: sagaType.success,
        payload: [],
        action: req,
      })
      .next()
      .isDone();
  });
});
