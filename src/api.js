import axios from 'axios';
import { isUri } from 'valid-url';

export const methods = ['get', 'post', 'patch', 'put', 'delete'];
export const prefixUrl = (path, endpoint) => `${isUri(endpoint) ? '' : `${path}/`}${endpoint}`;

const request = method => ({
  path,
  options = {},
  token,
  authorizationType,
}) => {
  const { body, params, headers = {} } = options;

  if (token) {
    headers.Authorization = `${authorizationType} ${token}`;
  }

  if (!(method === 'get' || method === 'delete')) {
    return axios[method](path, body, { headers });
  }

  return axios[method](path, {
    body,
    params,
    headers,
  });
};

const apiClient = methods.reduce((reduced, method) => ({
  ...reduced,
  [method]: request(method),
}), {});

export const makeRequest = (config, extenders = {}) => {
  const {
    authorizationType,
    method,
    path,
    token,
    url,
    request: requestConfig,
  } = { ...extenders, ...config };
  return apiClient[method.toLowerCase()]({
    token,
    authorizationType,
    path: prefixUrl(path, url),
    options: requestConfig,
  });
};

export default apiClient;
