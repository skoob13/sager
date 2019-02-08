import { put, call, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import merge from 'deepmerge';
import types from '../types';
import { makeRequest } from '../api';

export const generateSaga = ({
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
      requestParams = extendRequest(request);
    }

    try {
      if (hooks.beforeRequest) {
        yield call(hooks.beforeRequest, request);
      }

      const { body, ...requestParts } = request.request || {};
      const mergedRequest = merge(requestParts, requestParams);

      const data = yield call(types[typeCreator.type].saga || makeRequest, {
        ...request,
        request: body ? {
          ...merge(requestParts, requestParams),
          body,
        } : mergedRequest,
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
        yield put({
          type: typeCreator.failure,
          action: request,
          errors: error,
        });
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
