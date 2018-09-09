import { put, call, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import merge from 'deepmerge';
import types from '../types';
import { makeRequest } from '../api';

export const generateSaga = ({
  reducer,
  typeCreator,
  schema,
  dispatchActions,
}, {
  hooks,
  tokenSelector,
  extendRequest,
  ...options
}) => {
  function* generatedSaga(request) {
    const token = tokenSelector ? yield select(tokenSelector) : '';

    let requestParams = {};
    if (extendRequest) {
      requestParams = yield call(extendRequest, request);
    }

    try {
      if (hooks.beforeRequest) {
        yield call(hooks.beforeRequest, request);
      }

      const data = yield call(types[reducer].saga || makeRequest, {
        ...request,
        request: merge(request.request || {}, requestParams),
        token,
      }, options);

      if (hooks.request) {
        yield call(hooks.request, request);
      }

      const { data: result } = data;
      let payload = schema ? normalize(result, schema) : result;
      if (hooks.beforeSuccess) {
        payload = yield call(hooks.beforeSuccess, {
          payload,
          request,
          result,
          withSchema: !!schema,
        });
      }

      if (dispatchActions) {
        yield put({
          type: typeCreator.success,
          action: request,
          payload,
        });
      }

      if (hooks.success) {
        yield call(hooks.success, {
          payload,
          request,
          result,
          withSchema: !!schema,
        });
      }
    } catch (error) {
      if (hooks.beforeFailure) {
        yield call(hooks.beforeFailure, {
          error,
          request,
        });
      }

      if (dispatchActions) {
        yield put({ type: typeCreator.failure, errors: error });
      }

      if (hooks.failure) {
        yield call(hooks.failure, {
          error,
          request,
        });
      }
    }
  }
  return generatedSaga;
};

// TODO: make as FORK
// TODO: test this
const sagaCreator = (params, options) => {
  const { effect, throttleTime, typeCreator } = params;

  function* saga() {
    const generatedSaga = generateSaga(params, options);
    if (throttleTime > 0) {
      yield effect(throttleTime, typeCreator.request, generatedSaga);
    } else {
      yield effect(typeCreator.request, generatedSaga);
    }
  }

  return saga;
};

export default sagaCreator;
